const CREATE_API_HOST = "localhost";
const CREATE_API_PORT = "8081";
const CREATE_API_CONTEXT = "api/create";

const $createInputEl = document.getElementById(
  "create__input"
) as HTMLInputElement;

const $createButtonEl = document.getElementById(
  "create__button"
) as HTMLButtonElement;

$createInputEl.addEventListener("input", (event) => {
  if ((event.target as HTMLInputElement).value !== "") {
    $createButtonEl.removeAttribute("disabled");
  } else {
    $createButtonEl.setAttribute("disabled", "disabled");
  }
});

$createButtonEl.addEventListener("click", async (event) => {
  event.preventDefault();

  const res = await createDinkyLink($createInputEl.value);
  console.log({ res });
});

const createDinkyLink = async (url: string) => {
  try {
    const res = await fetch(
      `http://${CREATE_API_HOST}:${CREATE_API_PORT}/${CREATE_API_CONTEXT}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: url }),
      }
    ).then((res) => {
      if (res.status < 400) {
        return res.statusText;
      } else {
        throw new Error(res.statusText);
      }
    });
  } catch (error: any) {
    alert(`Error creating link: ${error}`);
  }
};