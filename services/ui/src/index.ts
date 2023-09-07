import {
  fromEvent,
  tap,
  map,
  filter,
  switchMap,
  distinctUntilChanged,
} from "rxjs";

const API_BASE_URL = `https://${process.env.API_HOST ?? "dinkylink.xyz"}`;

const urlInput = document.getElementById("url-input") as HTMLInputElement;
const outputPanel = document.getElementById("output-panel") as HTMLDivElement;
const copyButton = document.getElementById("copy-link") as HTMLButtonElement;

const generateButton = document.getElementById(
  "generate-link"
) as HTMLButtonElement;

const outputAnchor = document.getElementById(
  "output-link-tag"
) as HTMLAnchorElement;

const inputKeyups$ = fromEvent<InputEvent>(urlInput, "keyup");
const generateButtonClicks$ = fromEvent<MouseEvent>(generateButton, "click");
const copyButtonClicks$ = fromEvent<MouseEvent>(copyButton, "click");

const saomething = () => {
  console.log("something");
};

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
      } else {
        outputAnchor.textContent = `${API_BASE_URL}/${res?.shortCode}`;
        outputAnchor.setAttribute("href", `${API_BASE_URL}/${res?.shortCode}`);
        outputPanel.style.display = "block";
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

const createDinkyLink = async (url: string) =>
  await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetUrl: url }),
  }).then((res) => res.json());
