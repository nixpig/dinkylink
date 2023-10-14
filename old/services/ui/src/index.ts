import {
  fromEvent,
  tap,
  map,
  filter,
  switchMap,
  distinctUntilChanged,
} from "rxjs";

const CREATE_BASE_URL = `https://${process.env.CREATE_HOST ?? "dinkylink.xyz"}`;
const VIEW_BASE_URL = `wss://${process.env.VIEW_HOST ?? "view.dinkylink.xyz"}`;
const STATS_BASE_URL = `wss://${
  process.env.STATS_HOST ?? "stats.dinkylink.xyz"
}`;

// const CREATE_BASE_URL = `https://${
//   process.env.CREATE_HOST ?? "create.localhost"
// }`;
// const VIEW_BASE_URL = `wss://${process.env.VIEW_HOST ?? "view.localhost"}`;

const urlInput = document.getElementById("url-input") as HTMLInputElement;
const outputPanel = document.getElementById("output-panel") as HTMLDivElement;
const copyButton = document.getElementById("copy-link") as HTMLButtonElement;

const generateButton = document.getElementById(
  "generate-link"
) as HTMLButtonElement;

const outputAnchor = document.getElementById(
  "output-link-tag"
) as HTMLAnchorElement;

const stats = document.getElementById("stats") as HTMLDivElement;

const inputKeyups$ = fromEvent<InputEvent>(urlInput, "keyup");
const generateButtonClicks$ = fromEvent<MouseEvent>(generateButton, "click");
const copyButtonClicks$ = fromEvent<MouseEvent>(copyButton, "click");

inputKeyups$
  .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
  .pipe(map((value: string) => value.trim()))
  .pipe(distinctUntilChanged())
  .pipe(
    switchMap((value: string) => {
      handleGenerateButtonState(value.length > 0);
      return generateButtonClicks$
        .pipe(
          tap((e) => {
            e.preventDefault();
          })
        )
        .pipe(map(() => value));
    })
  )
  .subscribe(async (value) => {
    try {
      handleGenerateButtonState(false);

      const res = await createDinkyLink(value);

      if (res.status >= 400) {
        alert(res?.message);
        handleGenerateButtonState(true);

        return;
      }
    } catch (error: any) {
      alert(`Error creating link: ${error?.message}`);
      handleGenerateButtonState(true);
    }

    copyButtonClicks$.subscribe(async () => {
      try {
        await navigator.clipboard.writeText(outputAnchor.textContent);
        alert("Link copied to clipboard.");
      } catch (error: any) {
        alert(`Failed to copy link to clipboard: ${error?.message}`);
      }
    });
  });

const handleGenerateButtonState = (enabled: boolean): boolean => {
  if (!enabled && !generateButton.hasAttribute("disabled")) {
    generateButton.setAttribute("disabled", "disabled");
    return;
  }

  if (enabled && generateButton.hasAttribute("disabled")) {
    generateButton.removeAttribute("disabled");
    return;
  }
};

const createDinkyLink = async (url: string) => {
  try {
    const res = await fetch(CREATE_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUrl: url }),
    }).then((res) => res.json());

    return res;
  } catch (error: any) {
    alert(`Error creating link: ${error?.message}`);
  }
};

// TODO: convert to rxjs stream and integrate with pipeline above
try {
  const ws = new WebSocket(VIEW_BASE_URL);

  ws.onmessage = (event) => {
    console.log(event);

    const shortUrl = `https://${process.env.VISIT_HOST}/${
      JSON.parse(event.data).shortCode
    }`;

    outputPanel.style.display = "block";
    outputAnchor.textContent = shortUrl;
    outputAnchor.setAttribute("href", shortUrl);
  };
} catch (error: any) {
  console.error(`Error creating web socket connection: ${error?.message}`);
}

try {
  const ws = new WebSocket(STATS_BASE_URL);

  ws.onmessage = (event) => {
    console.log(event);

    stats.textContent = stats.textContent + "\n" + event.data;
  };
} catch (error: any) {
  console.error(`Error creating web socket connection: ${error?.message}`);
}
