import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  // 状态
  darkMode: boolean;
  language: string;
  autoSync: boolean;
  favorites: string[];

  // 动作
  toggleDarkMode: () => void;
  setLanguage: (lang: string) => void;
  toggleAutoSync: () => void;
  addFavorite: (projectId: string) => void;
  removeFavorite: (projectId: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // 初始状态
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      language: 'zh-CN',
      autoSync: true,
      favorites: [],

      // 切换暗色模式
      toggleDarkMode: () => {
        set((state) => ({ darkMode: !state.darkMode }));
      },

      // 设置语言
      setLanguage: (lang: string) => {
        set({ language: lang });
      },

      // 切换自动同步
      toggleAutoSync: () => {
        set((state) => ({ autoSync: !state.autoSync }));
      },

      // 添加收藏
      addFavorite: (projectId: string) => {
        set((state) => ({
          favorites: [...new Set([...state.favorites, projectId])]
        }));
      },

      // 移除收藏
      removeFavorite: (projectId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== projectId)
        }));
      }
    }),
    {
      name: 'ai-teacher-settings',
      version: 1
    }
  )
); 