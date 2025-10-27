import React from "react";
import { Repo } from "../types";

interface Props {
  repo: Repo;
  isBookmarked: boolean;
  onToggle: (id: number) => void;
}

const RepoCard: React.FC<Props> = ({ repo, isBookmarked, onToggle }) => {
  return (
    <div className="repo-card">
      <img src={repo.owner.avatar_url} alt="avatar" />
      <div className="repo-info">
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          <h3>{repo.name}</h3>
        </a>
        <p>{repo.description || "No description"}</p>
        <div className="repo-meta">
          ⭐ {repo.stargazers_count} • {repo.language || "N/A"}
        </div>
      </div>
      <button
        className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
        onClick={() => onToggle(repo.id)}
      >
        ★ {isBookmarked ? "Bookmarked" : "Bookmark"}
      </button>
    </div>
  );
};

export default React.memo(RepoCard);
