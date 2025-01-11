// DOM Elements
const embroideredNameInput = document.getElementById("embroidered_name");
const hiddenNameInput = document.getElementById("hidden_embroidered_name");

const embroideredColorInputs = document.querySelectorAll(".product-color input[type='radio']");
const hiddenColorInput = document.getElementById("hidden_embroidered_color");
const hiddenProductColorInput = document.getElementById("hidden_embroidered_color_product");
const productPriceDOM = document.querySelector("#embroidered_option .accordion-title .product-price");

const embroideredFontInputs = document.querySelectorAll(".product-font-option input[type='radio']");
const hiddenFontInput = document.getElementById("hidden_embroidered_font");


// Toggles the accordion visibility and resets associated inputs.
function toggleAccordion(element) {
  const checkbox = element.querySelector('input[type="checkbox"]');
  const content = element.nextElementSibling;

  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    if (!checkbox.checked) {
      resetHiddenInputs();
    }
  }

  if (content) {
    content.classList.toggle("hidden");
  }
}


// Resets all hidden inputs to their default states.
function resetHiddenInputs() {
  // Reset the text input
  if (embroideredNameInput) {
    embroideredNameInput.value = "";
  }
  if (hiddenNameInput) {
    hiddenNameInput.value = "";
    hiddenNameInput.setAttribute("disabled", "disabled");
  }

  // Reset radio inputs for color
  if (embroideredColorInputs) {
    embroideredColorInputs.forEach((input) => {
      input.checked = false;
    });
  }
  if (hiddenColorInput) {
    hiddenColorInput.value = "";
    hiddenColorInput.setAttribute("disabled", "disabled");
  }
  if (hiddenProductColorInput) {
    hiddenProductColorInput.value = "";
    hiddenProductColorInput.setAttribute("disabled", "disabled");
  }

  // Reset radio inputs for font
  if (embroideredFontInputs) {
    embroideredFontInputs.forEach((input) => {
      input.checked = false;
    });
  }
  if (hiddenFontInput) {
    hiddenFontInput.value = "";
    hiddenFontInput.setAttribute("disabled", "disabled");
  }
}


// Event Listener for Embroidered Name Input
embroideredNameInput?.addEventListener("input", function () {
  hiddenNameInput.value = this.value.trim();
  hiddenNameInput.toggleAttribute("disabled", this.value.trim() === "");
});

// Event Listener for Embroidered Color Inputs
embroideredColorInputs.forEach((radioInput) => {
  radioInput.addEventListener("change", function () {
    const currentVarId = this.parentElement.dataset.varId || "";
    const currentVarPrice = this.parentElement.dataset.varPrice || "";

    hiddenColorInput.value = this.value;
    hiddenProductColorInput.value = currentVarId;
    productPriceDOM.textContent = currentVarPrice;

    hiddenColorInput.removeAttribute("disabled");
    hiddenProductColorInput.removeAttribute("disabled");

    if (![...embroideredColorInputs].some((input) => input.checked)) {
      hiddenColorInput.setAttribute("disabled", "disabled");
      hiddenProductColorInput.setAttribute("disabled", "disabled");
    }
  });
});

// Event Listener for Embroidered Font Inputs
embroideredFontInputs.forEach((input) => {
  input.addEventListener("change", function () {
    hiddenFontInput.value = this.value.trim();
    hiddenFontInput.toggleAttribute("disabled", this.value.trim() === "");
  });
});
