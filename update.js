/*
Written by Alia
Optimised using ChatGPT
*/

async function checkForUpdates() {
  const savedSha = localStorage.getItem("savedSha");
  const currentUrl = new URL(location.href);

  const hostname = currentUrl.hostname;
  const pathParts = currentUrl.pathname.split("/").filter(Boolean);

  if (hostname.endsWith(".github.io")) {
    const username = hostname.split(".")[0];
    const repo = pathParts.length > 0 ? pathParts[0] : username;

    const commitUrl = `https://api.github.com/repos/${username}/${repo}/commits/main`;

    try {
      const response = await fetch(commitUrl);
      const data = await response.json();

      if ("sha" in data) {
        const sha = data.sha;

        if (!savedSha) {
          localStorage.setItem("savedSha", sha);
        } else if (sha !== savedSha) {
          const update = confirm("A new version is available. Reload?");

          if (update) {
            if ("caches" in window) {
              const cacheNames = await caches.keys();
              await Promise.all(cacheNames.map((name) => caches.delete(name)));
            }
            window.location.reload();
          }
        }
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  }
}

checkForUpdates();
