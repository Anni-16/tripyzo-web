export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.clear(); // Clear all session data
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("token");
  }
  return false;
};
