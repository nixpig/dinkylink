const VIEW_API_PUBLIC_HOST = "go.localhost";
const $viewLinkAnchorEl = document.getElementById("view__link");
const $viewClipboardButtonEl = document.getElementById("view__clipboard");

const uuid = new URL(window.location.href).searchParams.get("uuid");

$viewClipboardButtonEl?.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("copy to clipboard");
});

try {
  console.log(
    `[view] connecting to web socket: ws://${VIEW_API_PUBLIC_HOST}?uuid=${uuid}`
  );
  const ws = new WebSocket(`ws://${VIEW_API_PUBLIC_HOST}?uuid=${uuid}`);

  console.log("[view] connected to web socket: ", ws);

  let shortUrl: string;

  $viewClipboardButtonEl?.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(shortUrl);
      alert(`link copied to clipboard: ${shortUrl}`);
    } catch (e) {
      alert(`failed to copy link to clipboard: ${shortUrl} - ${e.message}`);
    }
  });

  ws.onmessage = (event) => {
    console.log(
      `[view] web socket client received event: ${JSON.stringify(event)}`
    );

    shortUrl = `https://${VIEW_API_PUBLIC_HOST}/${
      JSON.parse(event.data).shortCode
    }`;

    if (shortUrl && $viewLinkAnchorEl) {
      $viewLinkAnchorEl.textContent = shortUrl;
      $viewLinkAnchorEl.setAttribute("href", shortUrl);
    }
  };
} catch (e) {
  console.error(
    `[view] failed to connect to web socket server from ui: ${e.message}`
  );
}
