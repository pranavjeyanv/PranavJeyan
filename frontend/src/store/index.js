import { create } from 'zustand';

// UI Store - for scroll progress and active section tracking
export const useUIStore = create((set) => ({
  scrollProgress: 0,
  activeSection: 'hero',
  isSidebarOpen: false,

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
