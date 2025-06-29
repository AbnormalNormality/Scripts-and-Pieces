export function openRepository() {
  const hostname = currentUrl.hostname;
  const pathParts = currentUrl.pathname.split("/").filter(Boolean);

  if (hostname.endsWith(".github.io")) {
    const username = hostname.split(".")[0];
    const repo = pathParts.length > 0 ? pathParts[0] : username;
    window.open(`https://github.com/${username}/${repo}`, "_blank");
  }
}

export const keybindListener = document.addEventListener("keyup", (event) => {
  if (event.altKey && event.code === "KeyG") openRepository;
});
