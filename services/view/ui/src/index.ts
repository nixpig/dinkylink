const $viewLinkAnchorEl = document.getElementById("view__link");

const $viewClipboardButtonEl = document.getElementById("view__clipboard");

$viewClipboardButtonEl?.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("copy to clipboard");
});
