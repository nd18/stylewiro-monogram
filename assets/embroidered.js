function toggleAccordion(element) {
  // Ensure the checkbox is not toggled when clicking on other areas
  const checkbox = element.querySelector('input[type="checkbox"]');
  if (!checkbox.checked) {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }

  // Toggle the content visibility
  const content = element.nextElementSibling;
  content.classList.toggle('hidden');
}

// Get the input and hidden input elements
const embroideredNameInput = document.getElementById("embroidered_name");
const hiddenNameInput = document.getElementById("hidden_embroidered_name");

// Add an event listener to track input events
embroideredNameInput.addEventListener("input", function () {
  // Remove 'disabled' attribute from the hidden input if it exists
  if (hiddenNameInput.hasAttribute("disabled")) {
    hiddenNameInput.removeAttribute("disabled");
  }

  // Update the hidden input value with the entered text
  hiddenNameInput.value = this.value;

  // If the text input is empty, add 'disabled' attribute back to the hidden input
  if (this.value.trim() === "") {
    hiddenNameInput.setAttribute("disabled", "disabled");
  }
});


// Get all radio input elements and the hidden input element
const embroideredColorInputs = document.querySelectorAll(".product-color input[type='radio']");
const hiddenColorInput = document.getElementById("hidden_embroidered_color");
const hiddenProductColorInput = document.getElementById("hidden_embroidered_color_product");

// Loop through each radio input and add an event listener
embroideredColorInputs.forEach((radioInput) => {
  radioInput.addEventListener("change", function () {
    var currentVarId = this.parentElement.attributes['data-var-id'].value;
    var currentVarPrice = this.parentElement.attributes['data-var-price'].value;

    // Remove 'disabled' attribute from the hidden input if it exists
    if (hiddenColorInput.hasAttribute("disabled")) {
      hiddenColorInput.removeAttribute("disabled");
    }

    if (hiddenProductColorInput.hasAttribute("disabled")) {
      hiddenProductColorInput.removeAttribute("disabled");
    }

    // Update the hidden input value with the selected radio's value
    hiddenColorInput.value = this.value;
    
    // Update the hidden input value with the selected radio's value
    hiddenProductColorInput.value = currentVarId;

    // If no radio is selected, add 'disabled' attribute back to the hidden input
    const anyChecked = [...embroideredColorInputs].some((input) => input.checked);
    if (!anyChecked) {
      hiddenColorInput.setAttribute("disabled", "disabled");
      hiddenProductColorInput.setAttribute("disabled", "disabled");
    }
  });
});

