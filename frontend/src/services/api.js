import axios from 'axios';
import { useAuthStore } from '../store/index.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (email, password) => apiClient.post('/auth/register', { email, password }),
};

// About APIs
export const aboutAPI = {
  getAbout: () => apiClient.get('/about'),
  updateAbout: (data) => apiClient.put('/about', data),
};

// Skills APIs
export const skillAPI = {
  getSkills: () => apiClient.get('/skills'),
  createSkill: (data) => apiClient.post('/skills', data),
  updateSkill: (id, data) => apiClient.put(`/skills/${id}`, data),
  deleteSkill: (id) => apiClient.delete(`/skills/${id}`),
};

// Other Skills APIs
export const otherSkillAPI = {
  getOtherSkills: () => apiClient.get('/other-skills'),
  createOtherSkill: (data) => apiClient.post('/other-skills', data),
  updateOtherSkill: (id, data) => apiClient.put(`/other-skills/${id}`, data),
  deleteOtherSkill: (id) => apiClient.delete(`/other-skills/${id}`),
};

// Experience APIs
export const experienceAPI = {
  getExperiences: () => apiClient.get('/experience'),
  createExperience: (data) => apiClient.post('/experience', data),
  updateExperience: (id, data) => apiClient.put(`/experience/${id}`, data),
  deleteExperience: (id) => apiClient.delete(`/experience/${id}`),
};

// Education APIs
export const educationAPI = {
  getEducations: () => apiClient.get('/education'),
  createEducation: (data) => apiClient.post('/education', data),
  updateEducation: (id, data) => apiClient.put(`/education/${id}`, data),
  deleteEducation: (id) => apiClient.delete(`/education/${id}`),
};

// Certification APIs
export const certificationAPI = {
  getCertifications: () => apiClient.get('/certifications'),
  createCertification: (data) => apiClient.post('/certifications', data),
  updateCertification: (id, data) => apiClient.put(`/certifications/${id}`, data),
  deleteCertification: (id) => apiClient.delete(`/certifications/${id}`),
};

// Achievement APIs
export const achievementAPI = {
  getAchievements: () => apiClient.get('/achievements'),
  createAchievement: (data) => apiClient.post('/achievements', data),
  updateAchievement: (id, data) => apiClient.put(`/achievements/${id}`, data),
  deleteAchievement: (id) => apiClient.delete(`/achievements/${id}`),
};

// Settings APIs
export const settingsAPI = {
  getSettings: () => apiClient.get('/settings'),
  updateSettings: (data) => apiClient.put('/settings', data),
};

// Message APIs
export const messageAPI = {
  sendMessage: (data) => apiClient.post('/messages', data),
  getMessages: () => apiClient.get('/messages'),
  deleteMessage: (id) => apiClient.delete(`/messages/${id}`),
  markAsRead: (id) => apiClient.put(`/messages/${id}/read`),
};

// Project APIs
export const projectAPI = {
  getProjects: () => apiClient.get('/projects'),
  createProject: (data) => apiClient.post('/projects', data),
  updateProject: (id, data) => apiClient.put(`/projects/${id}`, data),
  deleteProject: (id) => apiClient.delete(`/projects/${id}`),
  testAllLinks: () => apiClient.post('/projects/test-links/all'),
  testSingleLink: (id) => apiClient.post(`/projects/test-links/${id}`),
};

// Resume APIs
export const resumeAPI = {
  getResumes: () => apiClient.get('/resumes'),
  updateResume: (type, data) => apiClient.put('/resumes', { type, ...data }),
};

export default apiClient;
