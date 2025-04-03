import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

export async function fetchUserProfile(username: string) {
  const { data } = await githubApi.get(`/users/${username}`);
  return data;
}

export async function fetchUserRepos(username: string) {
  const { data } = await githubApi.get(`/users/${username}/repos`);
  return data;
}

export async function fetchUserStarred(username: string) {
  const { data } = await githubApi.get(`/users/${username}/starred`);
  return data;
}

export async function fetchRepoDetails(username: string, repo: string) {
  const { data } = await githubApi.get(`/repos/${username}/${repo}`);
  return data;
}

export async function searchRepos(username: string, query: string) {
  const { data } = await githubApi.get(`/search/repositories`, {
    params: {
      q: `${query} user:${username}`,
    },
  });
  return data.items;
}
