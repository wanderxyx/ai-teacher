import axios, { AxiosInstance } from 'axios';
import type { Project, ProjectDetails, ApiResponse } from '../types';

/**
 * GitHub API 响应类型
 */
interface GitHubSearchResponse {
  items: Array<GitHubRepoData>;
  total_count: number;
}

interface GitHubRepoData {
  id: number;
  name: string;
  description: string | null;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  license: {
    name: string;
  } | null;
  open_issues_count: number;
  forks_count: number;
}

/**
 * GitHub API 服务类
 * @class GitHubService
 */
export class GitHubService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
      }
    });
  }

  /**
   * 搜索AI相关项目
   * @param query 搜索关键词
   * @param page 页码
   * @param perPage 每页数量
   */
  async searchProjects(
    query: string,
    page = 1,
    perPage = 30
  ): Promise<ApiResponse<Project[]>> {
    const q = `${query} topic:artificial-intelligence`;
    const { data } = await this.api.get<GitHubSearchResponse>('/search/repositories', {
      params: {
        q,
        page,
        per_page: perPage,
        sort: 'stars',
        order: 'desc'
      }
    });

    return {
      data: data.items.map(this.transformProject),
      status: 200,
      message: 'Success'
    };
  }

  /**
   * 获取项目详情
   * @param owner 仓库所有者
   * @param repo 仓库名称
   */
  async getProjectDetails(
    owner: string,
    repo: string
  ): Promise<ApiResponse<ProjectDetails>> {
    const [{ data: repoData }, { data: readmeData }] = await Promise.all([
      this.api.get<GitHubRepoData>(`/repos/${owner}/${repo}`),
      this.api.get<string>(`/repos/${owner}/${repo}/readme`, {
        headers: { Accept: 'application/vnd.github.html' }
      })
    ]);

    return {
      data: {
        ...this.transformProject(repoData),
        readme: readmeData,
        owner: {
          name: repoData.owner.login,
          avatarUrl: repoData.owner.avatar_url
        },
        license: repoData.license?.name || 'No License',
        issues: repoData.open_issues_count,
        forks: repoData.forks_count
      },
      status: 200,
      message: 'Success'
    };
  }

  /**
   * 转换项目数据格式
   * @private
   */
  private transformProject(data: GitHubRepoData): Project {
    return {
      id: data.id.toString(),
      name: data.name,
      description: data.description || '',
      fullName: data.full_name,
      htmlUrl: data.html_url,
      stargazersCount: data.stargazers_count,
      language: data.language || 'Unknown',
      topics: data.topics || [],
      lastUpdated: data.updated_at,
      category: this.determineCategory(data.topics)
    };
  }

  /**
   * 根据主题确定项目类别
   * @private
   */
  private determineCategory(topics: string[]): Project['category'] {
    if (topics.some(t => t.includes('nlp') || t.includes('language'))) {
      return 'nlp';
    }
    if (topics.some(t => t.includes('image') || t.includes('vision'))) {
      return 'image';
    }
    if (topics.some(t => t.includes('code') || t.includes('programming'))) {
      return 'code';
    }
    if (topics.some(t => t.includes('tool') || t.includes('utility'))) {
      return 'tool';
    }
    return 'other';
  }
} 