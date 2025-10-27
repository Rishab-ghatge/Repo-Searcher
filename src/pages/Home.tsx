import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import RepoCard from "../components/RepoCard";
import BookmarkFilter from "../components/BookmarkFilter";
import useDebounce from "../hooks/useDebounce";
import { Repo } from "../types";
import { getBookmarks, saveBookmarks } from "../utils/localStorage";

const Home: React.FC = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [bookmarkedRepos, setBookmarkedRepos] = useState<Repo[]>([]);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  // ✅ Load bookmarks from localStorage when app starts
  useEffect(() => {
    const saved = getBookmarks();
    setBookmarks(saved);
  }, []);

  // ✅ Fetch bookmarked repo details on first load
  useEffect(() => {
    const savedIds = getBookmarks();
    if (savedIds.length === 0) return;

    // Fetch each bookmarked repo individually from GitHub API
    const fetchBookmarkedRepos = async () => {
      try {
        const responses = await Promise.all(
          savedIds.map((id) => axios.get(`https://api.github.com/repositories/${id}`))
        );
        setBookmarkedRepos(responses.map((res) => res.data));
      } catch (err) {
        console.error("Error fetching bookmarked repos:", err);
      }
    };

    fetchBookmarkedRepos();
  }, []);

  // ✅ Normal search logic
  useEffect(() => {
    if (!debouncedQuery) {
      setRepos([]);
      return;
    }
    setLoading(true);
    setError("");
    axios
      .get(
        `https://api.github.com/search/repositories?q=${debouncedQuery}&per_page=30`
      )
      .then((res) => setRepos(res.data.items))
      .catch(() => setError("Failed to fetch repositories."))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const toggleBookmark = useCallback(
    (id: number) => {
      const updated = bookmarks.includes(id)
        ? bookmarks.filter((b) => b !== id)
        : [...bookmarks, id];
      setBookmarks(updated);
      saveBookmarks(updated);

      // Update bookmarkedRepos instantly
      if (!bookmarks.includes(id)) {
        axios
          .get(`https://api.github.com/repositories/${id}`)
          .then((res) => setBookmarkedRepos((prev) => [...prev, res.data]))
          .catch(() => {});
      } else {
        setBookmarkedRepos((prev) => prev.filter((r) => r.id !== id));
      }
    },
    [bookmarks]
  );

  // ✅ Choose what to show
  const visibleRepos = showOnlyBookmarks
    ? bookmarkedRepos
    : repos;

  return (
    <div className="container">
      <h1>Repo Searcher</h1>
      <SearchBar value={query} onChange={setQuery} />
      <BookmarkFilter
        showOnlyBookmarks={showOnlyBookmarks}
        onToggle={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && visibleRepos.length === 0 && !error && <p>No results.</p>}

      <div className="repo-list">
        {visibleRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isBookmarked={bookmarks.includes(repo.id)}
            onToggle={toggleBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
