function getToken() {
  const tokenString = localStorage.getItem("token");
  if (!tokenString) return null;
  try {
    const { token, type } = JSON.parse(tokenString);
    return `${type} ${token}`; // Bearer nhjfujdf6738hjdsf.jjkkjg.jdkg
  } catch (error) {
    return null;
  }
}

function setToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

function clearToken() {
  localStorage.removeItem("token");
}

export { setToken, getToken, clearToken };
