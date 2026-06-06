import Project from '../models/Project.js';

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const checkUrlStatus = async (url) => {
  if (!url) return { status: 'missing', statusCode: null };

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      timeout: 5000,
    });

    if (response.status === 200) {
      return { status: 'working', statusCode: response.status };
    } else if ([301, 302, 303, 307, 308].includes(response.status)) {
      return { status: 'redirect', statusCode: response.status };
    } else {
      return { status: 'broken', statusCode: response.status };
    }
  } catch (error) {
    return { status: 'broken', statusCode: null };
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, image, technologies, liveLink, githubLink, featured, status } =
      req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ message: 'Title, description, and image are required' });
    }

    // Check for duplicate project name
    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return res.status(400).json({ message: 'Project with this title already exists' });
    }

    // Validate URLs
    if (liveLink && !validateUrl(liveLink)) {
      return res.status(400).json({ message: 'Invalid live URL format' });
    }

    if (githubLink && !validateUrl(githubLink)) {
      return res.status(400).json({ message: 'Invalid GitHub URL format' });
    }

    const newProject = new Project({
      title,
      description,
      image,
      technologies: Array.isArray(technologies) ? technologies : (technologies ? [technologies] : []),
      liveLink: liveLink || '',
      githubLink: githubLink || '',
      featured: featured || false,
      status: status || 'Active',
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error) {
    console.error('Create project error:', error.message);
    res.status(500).json({ message: error.message || 'Server error creating project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, technologies, liveLink, githubLink, featured, status } =
      req.body;

    // Validate URLs
    if (liveLink && !validateUrl(liveLink)) {
      return res.status(400).json({ message: 'Invalid live URL format' });
    }

    if (githubLink && !validateUrl(githubLink)) {
      return res.status(400).json({ message: 'Invalid GitHub URL format' });
    }

    // Check for duplicate project name (excluding current project)
    if (title) {
      const existingProject = await Project.findOne({ title, _id: { $ne: id } });
      if (existingProject) {
        return res.status(400).json({ message: 'Project with this title already exists' });
      }
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
        technologies: Array.isArray(technologies) ? technologies : (technologies ? [technologies] : []),
        liveLink,
        githubLink,
        featured,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    console.error('Update project error:', error.message);
    res.status(500).json({ message: error.message || 'Server error updating project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error.message);
    res.status(500).json({ message: error.message || 'Server error deleting project' });
  }
};

export const testProjectLinks = async (req, res) => {
  try {
    const projects = await Project.find();

    const results = await Promise.all(
      projects.map(async (project) => {
        const liveStatus = await checkUrlStatus(project.liveLink);
        const githubStatus = await checkUrlStatus(project.githubLink);

        await Project.findByIdAndUpdate(project._id, {
          lastChecked: new Date(),
          linkStatus: {
            live: { ...liveStatus, lastChecked: new Date() },
            github: { ...githubStatus, lastChecked: new Date() },
          },
        });

        return {
          projectId: project._id,
          title: project.title,
          live: liveStatus,
          github: githubStatus,
        };
      })
    );

    res.json({
      success: true,
      message: 'All project links tested successfully',
      data: results,
    });
  } catch (error) {
    console.error('Test links error:', error.message);
    res.status(500).json({ message: error.message || 'Server error testing links' });
  }
};

export const testSingleProjectLink = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const liveStatus = await checkUrlStatus(project.liveLink);
    const githubStatus = await checkUrlStatus(project.githubLink);

    await Project.findByIdAndUpdate(id, {
      lastChecked: new Date(),
      linkStatus: {
        live: { ...liveStatus, lastChecked: new Date() },
        github: { ...githubStatus, lastChecked: new Date() },
      },
    });

    res.json({
      success: true,
      message: 'Project link tested successfully',
      data: {
        projectId: id,
        title: project.title,
        live: liveStatus,
        github: githubStatus,
      },
    });
  } catch (error) {
    console.error('Test single link error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error testing link' });
  }
};

