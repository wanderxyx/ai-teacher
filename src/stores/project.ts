import { create } from 'zustand';
import type { Project, ProjectDetails } from '../types';
import { GitHubService } from '../services/github';

interface ProjectState {
  // 状态
  projects: Project[];
  selectedProject: ProjectDetails | null;
  loading: boolean;
  error: string | null;

  // 动作
  searchProjects: (query: string) => Promise<void>;
  getProjectDetails: (owner: string, repo: string) => Promise<void>;
  clearSelectedProject: () => void;
  clearError: () => void;
}

const githubService = new GitHubService();

export const useProjectStore = create<ProjectState>((set) => ({
  // 初始状态
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,

  // 搜索项目
  searchProjects: async (query: string) => {
    try {
      set({ loading: true, error: null });
      const response = await githubService.searchProjects(query);
      set({ projects: response.data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '搜索项目时出错',
        loading: false
      });
    }
  },

  // 获取项目详情
  getProjectDetails: async (owner: string, repo: string) => {
    try {
      set({ loading: true, error: null });
      const response = await githubService.getProjectDetails(owner, repo);
      set({ selectedProject: response.data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '获取项目详情时出错',
        loading: false
      });
    }
  },

  // 清除选中的项目
  clearSelectedProject: () => {
    set({ selectedProject: null });
  },

  // 清除错误
  clearError: () => {
    set({ error: null });
  }
})); 