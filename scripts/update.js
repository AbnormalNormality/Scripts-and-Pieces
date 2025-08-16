async function checkForUpdates() {
  const updateIdKey = "savedSha";

  const savedSha = localStorage.getItem(updateIdKey);
  const currentUrl = new URL(location.href);

  const hostname = currentUrl.hostname;
  const pathParts = currentUrl.pathname.split("/").filter(Boolean);

  if (hostname.endsWith(".github.io")) {
    const username = hostname.split(".")[0];
    const repo = pathParts.length > 0 ? pathParts[0] : hostname;

    const commitUrl = `https://api.github.com/repos/${username}/${repo}/commits/main`;

    try {
      const response = await fetch(commitUrl);
      const data = await response.json();

      if ("sha" in data) {
        const sha = data.sha;
        let update = false;

        if (!savedSha)
          update = confirm("There may be a new version available. Reload?");
        else if (sha !== savedSha)
          update = confirm("A new version is available. Reload?");

        if (update) {
          localStorage.setItem(updateIdKey, sha);
          doUpdate();
        }
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  }
}

async function doUpdate() {
  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
  }
  window.location.reload();
}

checkForUpdates();
