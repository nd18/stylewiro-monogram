/*
===================================================
================ PDP DOM Elements ================
===================================================
*/
const embroideredNameInput = document.querySelector(".product__info-container #embroidered_name");
const hiddenNameInput = document.querySelector(".product__info-container #hidden_embroidered_name");

const embroideredColorInputs = document.querySelectorAll(".product__info-container .product-color input[type='radio']");
const hiddenColorInput = document.querySelector(".product__info-container #hidden_embroidered_color");
const hiddenProductColorInput = document.querySelector(".product__info-container #hidden_embroidered_color_product");
const hiddenProductColorIDInput = document.querySelector(".product__info-container #hidden_embroidered_color_varID");
const productPriceDOM = document.querySelector(".product__info-container #embroidered_option .accordion-title .product-price");

const hiddenColorProductTime = document.querySelector(".product__info-container #hidden_embroidered_color_product_time");
const productUnikTime = document.querySelector(".product__info-container #hidden_embroidered_time");

const embroideredFontInputs = document.querySelectorAll(".product__info-container .product-font-option input[type='radio']");
const hiddenFontInput = document.querySelector(".product__info-container #hidden_embroidered_font");

// Toggles the accordion visibility and resets associated inputs.
function toggleAccordion(element) {
  const checkbox = element.querySelector('input[type="checkbox"]');
  const content = element.nextElementSibling;

  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    if (!checkbox.checked) {
      resetHiddenInputs();
    } else {
      hiddenColorProductTime.removeAttribute("disabled");
      productUnikTime.removeAttribute("disabled");
    }
  }

  if (content) {
    content.classList.toggle("hidden");
  }
}

// Toggles the accordion visibility and resets associated inputs.
function editEmbroidered(element, parentElement) {
  const content = parentElement.nextElementSibling;

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
  if (hiddenProductColorIDInput) {
    hiddenProductColorIDInput.value = "";
    hiddenProductColorIDInput.setAttribute("disabled", "disabled");
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

  // Time Inputs
  hiddenColorProductTime.setAttribute("disabled", "disabled");
  productUnikTime.setAttribute("disabled", "disabled");
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
    hiddenProductColorIDInput.value = currentVarId;
    productPriceDOM.textContent = currentVarPrice;

    hiddenColorInput.removeAttribute("disabled");
    hiddenProductColorInput.removeAttribute("disabled");
    hiddenProductColorIDInput.removeAttribute("disabled");

    if (![...embroideredColorInputs].some((input) => input.checked)) {
      hiddenColorInput.setAttribute("disabled", "disabled");
      hiddenProductColorInput.setAttribute("disabled", "disabled");
      hiddenProductColorIDInput.setAttribute("disabled", "disabled");
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

setInterval(function () {
  // Get the current timestamp in milliseconds
  var c_seconds = new Date().getTime();

  // Select the hidden input elements
  var inputs = document.querySelectorAll("#hidden_embroidered_color_product_time, #hidden_embroidered_time");

  // Set the value attribute for each selected input
  inputs?.forEach(function (input) {
    input.setAttribute("value", c_seconds);
  });
}, 1000);

/*
===================================================
================ Cart DOM Elements ================
===================================================
*/
const cartEmbroideredNameInput = document.querySelectorAll(".drawer__contents .cart_embroidered_name");
const cartEmbroideredColorInputs = document.querySelectorAll(".drawer__contents .product-color input[type='radio']");
const cartEmbroideredFontInputs = document.querySelectorAll(".drawer__contents .product-font-option input[type='radio']");

const cartUpdateButton = document.querySelectorAll(".drawer__contents .update_btn");

// Helper function to check changes and toggle update button
function toggleUpdateButton(prentDOM) {
  const updateBtn = prentDOM.querySelector(".update_btn");
  let isChanged = false;

  // Check name input
  const embroideredName = prentDOM.querySelector("input.cart_embroidered_name");
  const embroideredNameVal = embroideredName.value.trim();
  const embroideredNameDeVal = embroideredName.parentElement.getAttribute('data-default-name');

  // Check color input
  const embroideredColor = prentDOM.querySelector(".product-color input:checked");
  const embroideredColorVal = embroideredColor ? embroideredColor.value.trim() : "";
  const embroideredColorDeVal = embroideredColor ? embroideredColor.parentElement.getAttribute('data-default-color') : "";

  // Check font input
  const embroideredFont = prentDOM.querySelector(".product-font-option input:checked");
  const embroideredFontVal = embroideredFont ? embroideredFont.value.trim() : "";
  const embroideredFontDeVal = embroideredFont ? embroideredFont.parentElement.getAttribute('data-default-font') : "";

  // Compare values and check for changes
  if (embroideredNameVal !== embroideredNameDeVal) {
    isChanged = true;
  }
  if (embroideredColorVal !== embroideredColorDeVal) {
    isChanged = true;
  }
  if (embroideredFontVal !== embroideredFontDeVal) {
    isChanged = true;
  }

  // Toggle the update button visibility based on changes
  if (isChanged) {
    updateBtn.classList.remove("hidden");
    updateBtn.classList.add("inline-block");
  } else {
    updateBtn.classList.add("hidden");
    updateBtn.classList.remove("inline-block");
  }
}

// Name: Trigger change on input
cartEmbroideredNameInput.forEach((input) => {
  input.addEventListener("input", function (event) {
    const prentDOM = event.currentTarget.closest("#embroidered_cart_option");
    toggleUpdateButton(prentDOM);
  });
});

// Color: Trigger change on radio button selection
cartEmbroideredColorInputs.forEach((radioInput) => {
  radioInput.addEventListener("change", function (event) {
    const prentDOM = event.currentTarget.closest("#embroidered_cart_option");
    toggleUpdateButton(prentDOM);
  });
});

// Fonts: Trigger change on radio button selection
cartEmbroideredFontInputs.forEach((input) => {
  input.addEventListener("change", function (event) {
    const prentDOM = event.currentTarget.closest("#embroidered_cart_option");
    toggleUpdateButton(prentDOM);
  });
});

// Update Data
cartUpdateButton.forEach((updatebtn) => {
  updatebtn.addEventListener("click", function (event) {
    const prentDOM = event.currentTarget.closest("#embroidered_cart_option");
    const item_key = prentDOM.getAttribute("data-line-key");

    const newProperties = [];

    // Check name input
    const embroideredName = prentDOM.querySelector("input.cart_embroidered_name");
    const embroideredNameVal = embroideredName.value.trim();
    const embroideredNameDeVal = embroideredName.parentElement.getAttribute('data-default-name');
    if (embroideredNameVal !== embroideredNameDeVal) {
      newProperties.push({ 'Embroidered Name': embroideredNameVal });
    }

    // Check color input
    const embroideredColor = prentDOM.querySelector(".product-color input:checked");
    const embroideredColorVal = embroideredColor ? embroideredColor.value.trim() : "";
    const embroideredColorDeVal = embroideredColor ? embroideredColor.parentElement.getAttribute('data-default-color') : "";
    const embroideredColorVarID = embroideredColor ? embroideredColor.parentElement.getAttribute('data-var-id') : "";
    const embroideredUnikTime = prentDOM.getAttribute('data-embroidered_unik_time');
    if (embroideredColorVal !== embroideredColorDeVal) {
      newProperties.push({ 'Embroidered Color': embroideredColorVal });
      newProperties.push({ 'Embroidered Color Variant ID': embroideredColorVarID });
      newProperties.push({ 'Embroidered Unik Time': embroideredUnikTime });
    }

    // Check font input
    const embroideredFont = prentDOM.querySelector(".product-font-option input:checked");
    const embroideredFontVal = embroideredFont ? embroideredFont.value.trim() : "";
    const embroideredFontDeVal = embroideredFont ? embroideredFont.parentElement.getAttribute('data-default-font') : "";
    if (embroideredFontVal !== embroideredFontDeVal) {
      newProperties.push({ 'Embroidered Font': embroideredFontVal });
    }

    console.log(newProperties);
    // updateEmbroideredProduct(embroideredUnikTime, false, true)

  });
});

// Toggles the accordion visibility and resets associated inputs.
function toggleCartAccordion(event, element, unikTime) {
  event.preventDefault();
  const checkbox = element.querySelector('input[type="checkbox"]');
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
  }
  if (checkbox.checked) {
  } else {
    if (unikTime !== 0) {
      updateEmbroideredProduct(unikTime, true)
    }
  }
}

function updateEmbroideredProduct(unikTime, MainProductReset) {
  // Fetch cart data
  fetch('/cart.js', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      return response.json(); // Parse the JSON response
    })
    .then(cartData => {
      let updateData = {};
      cartData.items.forEach(item => {
        if (item.properties && Object.keys(item.properties).length > 0) {
          for (const [key, value] of Object.entries(item.properties)) {
            const intValue = parseInt(value, 10);
            if (key === 'time' && intValue === unikTime) {
              updateData[item.key] = 0;
              break;
            }
            if (MainProductReset && key === 'Embroidered Unik Time' && intValue === unikTime) {
              const main_product_key = item.key;
              const newProperties = { '_properties': '' };
              updateProductproperties(main_product_key, newProperties)
            }
          }
        }
      });
      if (updateData != '') {
        var cartDrawer = document.querySelector('cart-drawer');
        setTimeout(function () {
          fetch('/cart/update.js?cart_data_update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              updates: updateData,
              sections: getSectionsToRenderDrawer().map((section) => section.section),
            }),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to update cart data');
              }
              return response.json();
            })
            .then(cart => {
              console.log('Embroidered Color Product Removed');
              getSectionsToRenderDrawer().forEach((section) => {
                const elementToReplace = document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
                elementToReplace.innerHTML = cartDrawer.getSectionInnerHTML(
                  cart.sections[section.section],
                  section.selector
                );
              });
            })
            .catch(error => {
              console.error('Update Data Error:', error);
            });
        }, 500);
      }
    })
    .catch(error => {
      console.error('Error fetching cart data:', error);
    });
}

function updateProductproperties(lineItemKey, newProperties) {
  fetch('/cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: lineItemKey,
      properties: newProperties,
    }),
  })
    .then((response) => response.json())
    .then((cart) => {
      console.log('Update Product Properties');
    })
    .catch((error) => {
      console.error('Error updating line item properties:', error);
    });
}

function getSectionsToRenderDrawer() {
  return [
    {
      id: 'CartDrawer',
      section: 'cart-drawer',
      selector: '.drawer__inner',
    },
    {
      id: 'cart-icon-bubble',
      section: 'cart-icon-bubble',
      selector: '.shopify-section',
    },
  ];
}

// Add to cart with callback
function addToCartAjax(varId) {
  const data = {
    items: [
      {
        id: varId,
        quantity: 1,
      },
    ],
  };

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error adding data to cart: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error adding data to cart:', error);
    });
}
