import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isAuthenticated: !!localStorage.getItem('token'),

  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null, isAuthenticated: false });
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token, isAuthenticated: !!token });
  },
}));

export const useThemeStore = create((set) => ({
  isDarkMode: localStorage.getItem('theme') !== 'light',

  toggleTheme: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.body.classList.toggle('light-mode', !newMode);
      return { isDarkMode: newMode };
    }),

  setTheme: (isDark) => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('light-mode', !isDark);
    set({ isDarkMode: isDark });
  },
}));

export const useUIStore = create((set) => ({
  scrollProgress: 0,
  activeSection: 'home',
  isSidebarOpen: false,

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
