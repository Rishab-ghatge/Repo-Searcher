import React from "react";

interface Props {
  showOnlyBookmarks: boolean;
  onToggle: () => void;
}

const BookmarkFilter: React.FC<Props> = ({ showOnlyBookmarks, onToggle }) => (
  <div className="filter-toggle">
    <label>
      <input
        type="checkbox"
        checked={showOnlyBookmarks}
        onChange={onToggle}
      />
      Show Bookmarked Only
    </label>
  </div>
);

export default React.memo(BookmarkFilter);
