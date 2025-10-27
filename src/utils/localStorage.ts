export const getBookmarks = (): number[] => {
  const data = localStorage.getItem("bookmarks");
  return data ? JSON.parse(data) : [];
};

export const saveBookmarks = (ids: number[]) => {
  localStorage.setItem("bookmarks", JSON.stringify(ids));
};
