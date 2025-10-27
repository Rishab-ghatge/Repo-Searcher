import React from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      className="search-input"
      placeholder="Search GitHub repositories..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default React.memo(SearchBar);
