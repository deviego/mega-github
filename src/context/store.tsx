// src/store/githubStore.ts
import { create } from 'zustand';
import { fetchUserProfile, fetchUserRepos, fetchUserStarred } from '@/lib/api';
import { GithubProfile, GithubRepo, GithubStarred } from '@/types/githubAPITypes';
interface GithubState {
  username: string;
  profile: GithubProfile | null;
  repos: GithubRepo[] | null;
  starred: GithubStarred[] | null;
  activeTab: 'repos' | 'starred';
  searchQuery: string;
  filters: {
    language: string;
    type: string;
  };
  setUsername: (username: string) => void;
  setActiveTab: (tab: 'repos' | 'starred') => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<GithubState['filters']>) => void;
  fetchProfile: () => Promise<void>;
  fetchRepos: () => Promise<void>;
  fetchStarred: () => Promise<void>;
  setRepos: (repos: GithubRepo[]) => void;
  setStarred: (starred: GithubStarred[]) => void;
}

export const useGithubStore = create<GithubState>((set, get) => ({
  username: 'octocat',
  profile: null,
  repos: null,
  starred: null,
  activeTab: 'repos',
  searchQuery: '',
  filters: {
    language: '',
    type: '',
  },
  setUsername: (username) => set({ username }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),
  fetchProfile: async () => {
    const { username } = get();
    const profile = await fetchUserProfile(username);
    set({ profile });
  },
  fetchRepos: async () => {
    const { username } = get();
    const repos = await fetchUserRepos(username);
    set({ repos });
  },
  fetchStarred: async () => {
    const { username } = get();
    const starred = await fetchUserStarred(username);
    set({ starred });
  },
  setRepos: (repos: GithubRepo[]) => set({ repos }),
  setStarred: (starred: GithubStarred[]) => set({ starred }),
}));