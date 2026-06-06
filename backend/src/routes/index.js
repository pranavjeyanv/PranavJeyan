import express from 'express';
import authRoutes from './auth.js';
import messageRoutes from './messages.js';
import projectRoutes from './projects.js';
import resumeRoutes from './resumes.js';
import aboutRoutes from './about.js';
import skillRoutes from './skills.js';
import otherSkillRoutes from './otherSkills.js';
import experienceRoutes from './experience.js';
import educationRoutes from './education.js';
import certificationRoutes from './certifications.js';
import achievementRoutes from './achievements.js';
import settingsRoutes from './settings.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/messages', messageRoutes);
router.use('/projects', projectRoutes);
router.use('/resumes', resumeRoutes);
router.use('/about', aboutRoutes);
router.use('/skills', skillRoutes);
router.use('/other-skills', otherSkillRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/certifications', certificationRoutes);
router.use('/achievements', achievementRoutes);
router.use('/settings', settingsRoutes);

export default router;
