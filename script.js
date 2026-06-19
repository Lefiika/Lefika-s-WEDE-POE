/* ===================================================================
   Tech Lover's - script.js
   Part 3: JavaScript Enhancements
   - Contact form validation (contact.html)
   - Repair booking form validation (repair.html)
   - Shop quick filters & search - dynamic content (shop.html)
   - Custom build live preview - DOM manipulation (custom.html)
   - Cart management: add to cart, remove items, empty-cart state (checkout.html)
=================================================================== */

/* -------------------------------------------------------------------
   SHARED CART STATE
   A simple in-memory cart stored on the window object so it persists
   across script.js functions within a single browsing session.
   Items are objects: { name: string, price: number }
------------------------------------------------------------------- */
window.cart = window.cart || [];

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------------
     1. CONTACT FORM VALIDATION (contact.html)
  --------------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    const statusBox = document.getElementById("form-status");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name    = document.getElementById("contact-name");
      const email   = document.getElementById("contact-email");
      const phone   = document.getElementById("contact-phone");
      const type    = document.getElementById("message-type");
      const message = document.getElementById("contact-message");

      const errors = [];

      if (!name.value.trim() || name.value.trim().length < 2) {
        errors.push("Please enter your full name (at least 2 characters).");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        errors.push("Please enter a valid email address.");
      }

      if (phone.value.trim() && !phone.checkValidity()) {
        errors.push("Please enter a valid phone number.");
      }

      if (!type.value) {
        errors.push("Please choose the type of message you are sending.");
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        errors.push("Your message should be at least 10 characters long.");
      }

      if (errors.length > 0) {
        statusBox.textContent = errors.join(" ");
        statusBox.style.color = "#b00020";
        return;
      }

      statusBox.style.color = "green";
      statusBox.textContent =
        "Message sent! Thank you, " + name.value.trim() + ". Our team will get back to you soon.";
      contactForm.reset();
    });
  }

  /* ---------------------------------------------------------------
     2. REPAIR BOOKING FORM VALIDATION (repair.html)
  --------------------------------------------------------------- */
  const repairForm = document.getElementById("repair-form");

  if (repairForm) {
    const repairStatus = document.getElementById("repair-form-status");
    const dateInput    = document.getElementById("repair-date");

    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    repairForm.addEventListener("submit", function (e) {
      const serviceChosen = repairForm.querySelector('input[name="repair_service"]:checked');
      const problem       = document.getElementById("problem-details");
      const time          = document.getElementById("repair-time");

      const errors = [];

      if (!serviceChosen) {
        errors.push("Please select a repair service.");
      }

      if (!problem.value.trim() || problem.value.trim().length < 10) {
        errors.push("Please describe the problem in at least 10 characters.");
      }

      if (!dateInput.value) {
        errors.push("Please select a preferred completion date.");
      } else if (dateInput.value < today) {
        errors.push("The completion date cannot be in the past.");
      }

      if (!time.value) {
        errors.push("Please select a preferred time.");
      }

      if (errors.length > 0) {
        e.preventDefault();
        repairStatus.textContent = errors.join(" ");
        repairStatus.style.color = "#b00020";
      }
    });
  }

  /* ---------------------------------------------------------------
     3. SHOP QUICK FILTERS + SEARCH (shop.html)
  --------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll("[data-filter]");

  if (filterButtons.length > 0) {
    const productCards = document.querySelectorAll("#product-list > div[data-category]");
    const noResults    = document.getElementById("no-results");

    function applyVisibility(matchFn) {
      let visibleCount = 0;
      productCards.forEach(function (card) {
        const show = matchFn(card);
        card.hidden = !show;
        if (show) visibleCount++;
      });
      if (noResults) noResults.hidden = visibleCount > 0;
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Highlight the active filter button
        filterButtons.forEach(function (b) { b.classList.remove("filter-active"); });
        btn.classList.add("filter-active");

        const chosen = btn.getAttribute("data-filter");
        applyVisibility(function (card) {
          return chosen === "All Items" || card.getAttribute("data-category") === chosen;
        });
      });
    });

    // Search bar
    const shopSearchForm  = document.getElementById("shop-search-form");
    const shopSearchInput = document.getElementById("shop-search-input");

    if (shopSearchForm && shopSearchInput) {
      shopSearchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const term = shopSearchInput.value.trim().toLowerCase();

        // Clear active filter highlight on search
        filterButtons.forEach(function (b) { b.classList.remove("filter-active"); });

        if (term === "") {
          applyVisibility(function () { return true; });
          return;
        }

        applyVisibility(function (card) {
          return card.textContent.toLowerCase().includes(term);
        });
      });
    }
  }

  // Price range slider
  const priceRange      = document.getElementById("price-range");
  const priceRangeValue = document.getElementById("price-range-value");

  if (priceRange && priceRangeValue) {
    priceRange.addEventListener("input", function () {
      const amount = Number(priceRange.value) * 1000;
      priceRangeValue.textContent = "R" + amount.toLocaleString("en-ZA");
    });
  }

  /* ---------------------------------------------------------------
     ADD TO CART BUTTONS (shop.html + custom.html)
     Stores item in window.cart and shows confirmation.
  --------------------------------------------------------------- */
  const cartButtons = document.querySelectorAll(".add-to-cart-btn");

  cartButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const itemName  = btn.getAttribute("data-item") || btn.closest("[data-category]") && btn.closest("[data-category]").querySelector("h3").textContent.trim() || "Item";
      const itemPrice = parseInt(btn.getAttribute("data-price") || "0", 10);

      // Add to shared cart array
      window.cart.push({ name: itemName, price: itemPrice });

      // Show confirmation text next to button
      const statusSpan = btn.parentElement.querySelector(".cart-status");
      if (statusSpan) {
        statusSpan.style.color = "green";
        statusSpan.textContent = "Added to cart!";
        setTimeout(function () { statusSpan.textContent = ""; }, 3000);
      }
    });
  });

  /* ---------------------------------------------------------------
     4. CUSTOM BUILD LIVE PREVIEW (custom.html)
  --------------------------------------------------------------- */
  const buildParts = document.querySelectorAll(".build-part");

  if (buildParts.length > 0) {
    const previewName  = document.getElementById("preview-name");
    const buildTotal   = document.getElementById("build-total");
    const buildStatus  = document.getElementById("build-status");
    const addBuildBtn  = document.getElementById("add-build-btn");

    function recalcBuild() {
      const chosenParts = document.querySelectorAll(".build-part:checked");
      let total = 0;
      const names = [];

      chosenParts.forEach(function (part) {
        total += Number(part.getAttribute("data-price"));
        names.push(part.getAttribute("data-name"));
      });

      previewName.textContent = names.length > 0 ? names.join(", ") : "......";
      buildTotal.textContent  = "R" + total.toLocaleString("en-ZA");
    }

    buildParts.forEach(function (part) {
      part.addEventListener("change", recalcBuild);
    });

    if (addBuildBtn) {
      addBuildBtn.addEventListener("click", function () {
        const chosenParts = document.querySelectorAll(".build-part:checked");
        if (chosenParts.length === 0) {
          buildStatus.style.color = "#b00020";
          buildStatus.textContent = "Please select at least one component before adding your build to the cart.";
          return;
        }
        // Add each chosen part to the cart
        chosenParts.forEach(function (part) {
          window.cart.push({
            name:  part.getAttribute("data-name"),
            price: Number(part.getAttribute("data-price"))
          });
        });
        buildStatus.style.color  = "green";
        buildStatus.textContent  = "Your custom build has been added to the cart!";
      });
    }
  }

  /* ---------------------------------------------------------------
     5. CUSTOM BUILD COMPONENT SEARCH (custom.html)
  --------------------------------------------------------------- */
  const searchBoxes = document.querySelectorAll("[data-list]");

  searchBoxes.forEach(function (box) {
    const list = document.getElementById(box.getAttribute("data-list"));
    if (!list) return;

    const unavailableMsg = list.parentElement.querySelector(".unavailable-msg");
    const items          = list.querySelectorAll("li");

    box.addEventListener("input", function () {
      const term = box.value.trim().toLowerCase();
      let visibleCount = 0;

      items.forEach(function (item) {
        const matches = item.textContent.toLowerCase().includes(term);
        item.hidden = !matches;
        if (matches) visibleCount++;
      });

      if (term === "") {
        items.forEach(function (item) { item.hidden = false; });
        list.hidden = false;
        if (unavailableMsg) unavailableMsg.hidden = true;
        return;
      }

      if (visibleCount === 0) {
        list.hidden = true;
        if (unavailableMsg) unavailableMsg.hidden = false;
      } else {
        list.hidden = false;
        if (unavailableMsg) unavailableMsg.hidden = true;
      }
    });
  });

  /* ---------------------------------------------------------------
     6. CHECKOUT PAGE (checkout.html)
     - Reads window.cart (populated by Add to Cart buttons)
     - Falls back to demo items already in the HTML if cart is empty
     - Renders remove buttons that work
     - Updates the order summary table and grand total live
     - Shows empty-cart state when all items are removed
  --------------------------------------------------------------- */
  const emptyState        = document.getElementById("empty-cart-state");
  const cartItemsState    = document.getElementById("cart-items-state");
  const cartItemList      = document.getElementById("cart-item-list");
  const summaryTableBody  = document.getElementById("summary-table-body");
  const grandTotalEl      = document.getElementById("cart-grand-total");
  const orderSummaryAside = document.getElementById("order-summary-aside");

  if (emptyState && cartItemsState && cartItemList) {

    /* ---------- helpers ---------- */
    function formatPrice(p) {
      return "R" + Number(p).toLocaleString("en-ZA");
    }

    function rebuildSummary() {
      const articles = cartItemList.querySelectorAll("article[data-cart-item]");

      if (summaryTableBody) {
        summaryTableBody.innerHTML = "";
        let total = 0;

        articles.forEach(function (article) {
          const name  = article.getAttribute("data-cart-item");
          const price = parseInt(article.getAttribute("data-cart-price") || "0", 10);
          total += price;

          const tr = document.createElement("tr");
          tr.innerHTML =
            "<td>" + name + "</td>" +
            "<td><span class='price'>" + (price > 0 ? formatPrice(price) : "TBC") + "</span></td>";
          summaryTableBody.appendChild(tr);
        });

        if (grandTotalEl) {
          grandTotalEl.textContent = formatPrice(total);
        }
      }

      // Toggle empty / filled state
      if (articles.length === 0) {
        emptyState.hidden     = false;
        cartItemsState.hidden = true;
        if (orderSummaryAside) orderSummaryAside.hidden = true;
      } else {
        emptyState.hidden     = true;
        cartItemsState.hidden = false;
        if (orderSummaryAside) orderSummaryAside.hidden = false;
      }
    }

    /* ---------- wire up remove buttons (including any already in the HTML) ---------- */
    function attachRemoveListeners() {
      cartItemList.querySelectorAll(".remove-item-btn").forEach(function (btn) {
        // remove any old listener before adding new one (avoid duplicates)
        btn.replaceWith(btn.cloneNode(true));
      });

      cartItemList.querySelectorAll(".remove-item-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const article = btn.closest("article");
          if (article) {
            article.remove();
            rebuildSummary();
          }
        });
      });
    }

    /* ---------- if items were added via window.cart on another page, render them ---------- */
    if (window.cart && window.cart.length > 0) {
      // Clear the demo HTML items and replace with cart contents
      cartItemList.innerHTML = "";

      window.cart.forEach(function (item) {
        const article = document.createElement("article");
        article.setAttribute("data-cart-item", item.name);
        article.setAttribute("data-cart-price", item.price);
        article.innerHTML =
          "<div>" +
            "<p><strong>" + item.name + "</strong></p>" +
            "<p><span class='price'>" + (item.price > 0 ? formatPrice(item.price) : "Price TBC") + "</span></p>" +
          "</div>" +
          "<button type='button' class='remove-item-btn' aria-label='Remove " + item.name + " from cart'>&#10005; Remove</button>";
        cartItemList.appendChild(article);
      });
    }

    // Attach remove listeners and build summary for whatever is currently in the list
    attachRemoveListeners();
    rebuildSummary();
  }

  /* ---------- Pay button (checkout.html) ---------- */
  const payBtn = document.getElementById("pay-btn");

  if (payBtn) {
    payBtn.addEventListener("click", function () {
      const articles = cartItemList ? cartItemList.querySelectorAll("article[data-cart-item]") : [];
      if (articles.length === 0) {
        const payStatus = document.getElementById("pay-status");
        payStatus.style.color   = "#b00020";
        payStatus.textContent   = "Your cart is empty. Please add items before paying.";
        return;
      }
      const payStatus = document.getElementById("pay-status");
      payStatus.style.color = "green";
      payStatus.textContent = "Payment successful! Thank you for shopping with Tech Lover's. Your order is confirmed.";
      // Clear the cart after successful payment
      window.cart = [];
    });
  }

/* ---------------------------------------------------------------
  7. CUSTOM BUILD LIVE IMAGE & DETAIL PREVIEW
--------------------------------------------------------------- */
// Global state variables for tracking the selected part's data
var activePreviewImage = "";
var activePreviewName = "";
var activeComponentPrice = 0;

// Target the preview DOM elements
var previewImgElement = document.getElementById("component-preview-img");
var previewNameElement = document.getElementById("preview-name");
var buildTotalElement = document.getElementById("build-total");

// Target all component radio buttons
var buildPartRadios = document.querySelectorAll(".build-part");

if (buildPartRadios.length > 0) {
    buildPartRadios.forEach(function (radio) {
        radio.addEventListener("change", function () {
            
            // 1. Grab data attributes from the clicked element into global variables
            activePreviewImage = radio.getAttribute("data-img");
            activePreviewName = radio.getAttribute("data-name");
            activeComponentPrice = parseInt(radio.getAttribute("data-price") || "0", 10);

            // 2. Update the Image Preview Source and Alt Text
            if (previewImgElement && activePreviewImage) {
                previewImgElement.src = activePreviewImage;
                previewImgElement.alt = "Preview of " + activePreviewName;
            }

            // 3. Update the text below the image to show what is selected
            if (previewNameElement && activePreviewName) {
                previewNameElement.textContent = activePreviewName;
            }

            /* -------------------------------------------------------
               OPTIONAL: Calculate total price of ALL checked elements
               ------------------------------------------------------- */
            var totalBuildAccumulator = 0;
            var allCheckedParts = document.querySelectorAll(".build-part:checked");

            allCheckedParts.forEach(function (checkedRadio) {
                totalBuildAccumulator += parseInt(checkedRadio.getAttribute("data-price") || "0", 10);
            });

            // Update the live running total on the page
            if (buildTotalElement) {
                buildTotalElement.textContent = "R" + totalBuildAccumulator.toLocaleString("en-ZA");
            }
        });
    });
}
});
