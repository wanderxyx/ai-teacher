/**
 * GitHub项目信息
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  fullName: string;
  htmlUrl: string;
  stargazersCount: number;
  language: string;
  topics: string[];
  lastUpdated: string;
  category: 'nlp' | 'image' | 'code' | 'tool' | 'other';
}

/**
 * 项目详细信息
 */
export interface ProjectDetails extends Project {
  readme: string;
  owner: {
    name: string;
    avatarUrl: string;
  };
  license: string;
  issues: number;
  forks: number;
}

/**
 * 用户收藏
 */
export interface Favorite {
  projectId: string;
  addedAt: Date;
  notes?: string;
}

/**
 * 学习进度
 */
export interface LearningProgress {
  projectId: string;
  readTime: number;
  completed: boolean;
  notes: string[];
}

/**
 * 用户信息
 */
export interface User {
  id: string;
  preferences: {
    darkMode: boolean;
    autoSync: boolean;
  };
  learningPath: {
    currentLevel: string;
    completedProjects: string[];
  };
}

/**
 * API响应类型
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/**
 * 错误类型
 */
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
} 