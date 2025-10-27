export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  owner: {
    avatar_url: string;
  };
  html_url: string;
}