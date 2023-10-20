const CREATE_API_CONTEXT = "api/create";

const uuid = new URL(window.location.href).searchParams.get("uuid");

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
      `http://create.localhost/${CREATE_API_CONTEXT}?uuid=${uuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUrl: url }),
      }
    );

    if (res.status < 400) {
      return res;
    } else {
      throw new Error(res.statusText);
    }
  } catch (error: any) {
    alert(`Error creating link: ${error}`);
  }
};
