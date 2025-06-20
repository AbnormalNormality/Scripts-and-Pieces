/** @param {string} path */
async function JSONLoad(path) {
  try {
    const res = await fetch(path);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to load JSON:", err);
    return null;
  }
}

export { JSONLoad };
