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
   Persisted in localStorage so items survive page navigation.
   Items are objects: { name: string, price: number }
------------------------------------------------------------------- */
function loadCart() {
  try {
    var stored = localStorage.getItem("techlovers_cart");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem("techlovers_cart", JSON.stringify(cart));
  } catch (e) { /* storage unavailable */ }
}

window.cart = loadCart();

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------------
     1. CONTACT FORM VALIDATION (contact.html)
  --------------------------------------------------------------- */
  var contactForm = document.getElementById("contact-form");

  if (contactForm) {
    var statusBox = document.getElementById("form-status");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name    = document.getElementById("contact-name");
      var email   = document.getElementById("contact-email");
      var phone   = document.getElementById("contact-phone");
      var type    = document.getElementById("message-type");
      var message = document.getElementById("contact-message");

      var errors = [];

      if (!name.value.trim() || name.value.trim().length < 2) {
        errors.push("Please enter your full name (at least 2 characters).");
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  var repairForm = document.getElementById("repair-form");

  if (repairForm) {
    var repairStatus = document.getElementById("repair-form-status");
    var dateInput    = document.getElementById("repair-date");

    var today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    repairForm.addEventListener("submit", function (e) {
      var serviceChosen = repairForm.querySelector('input[name="repair_service"]:checked');
      var problem       = document.getElementById("problem-details");
      var time          = document.getElementById("repair-time");

      var errors = [];

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
      } else {
        // Prevent the default GET submission so we can handle the cart first
        e.preventDefault();
        
        var currentCart = loadCart();
        
        // Add the repair booking as an item for R1000
        currentCart.push({
            name: "Repair Booking",
            price: 1000
        });
        
        saveCart(currentCart);
        window.cart = currentCart;
        
        // Redirect the user to the checkout page
        window.location.href = "checkout.html";
        }
    });
  }

  /* ---------------------------------------------------------------
     3. SHOP QUICK FILTERS + SEARCH (shop.html)
  --------------------------------------------------------------- */
  var filterButtons = document.querySelectorAll("[data-filter]");

  if (filterButtons.length > 0) {
    var productCards = document.querySelectorAll("#product-list > div[data-category]");
    var noResults    = document.getElementById("no-results");

    function applyVisibility(matchFn) {
      var visibleCount = 0;
      productCards.forEach(function (card) {
        var show = matchFn(card);
        card.hidden = !show;
        if (show) visibleCount++;
      });
      if (noResults) noResults.hidden = visibleCount > 0;
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("filter-active"); });
        btn.classList.add("filter-active");

        var chosen = btn.getAttribute("data-filter");
        applyVisibility(function (card) {
          return chosen === "All Items" || card.getAttribute("data-category") === chosen;
        });
      });
    });

    var shopSearchForm  = document.getElementById("shop-search-form");
    var shopSearchInput = document.getElementById("shop-search-input");

    if (shopSearchForm && shopSearchInput) {
      shopSearchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var term = shopSearchInput.value.trim().toLowerCase();

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

  /* Price range slider */
  var priceRange      = document.getElementById("price-range");
  var priceRangeValue = document.getElementById("price-range-value");

  if (priceRange && priceRangeValue) {
    priceRange.addEventListener("input", function () {
      var amount = Number(priceRange.value) * 1000;
      priceRangeValue.textContent = "R" + amount.toLocaleString("en-ZA");
    });
  }

  /* ---------------------------------------------------------------
     ADD TO CART BUTTONS (shop.html)
     Saves item to localStorage cart and shows confirmation.
  --------------------------------------------------------------- */
  var cartButtons = document.querySelectorAll(".add-to-cart-btn");

  cartButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var itemName  = btn.getAttribute("data-item") || "Item";
      var itemPrice = parseInt(btn.getAttribute("data-price") || "0", 10);

      /* Reload cart fresh from storage, push new item, save back */
      var currentCart = loadCart();
      currentCart.push({ name: itemName, price: itemPrice });
      saveCart(currentCart);
      window.cart = currentCart;

      var statusSpan = btn.parentElement.querySelector(".cart-status");
      if (statusSpan) {
        statusSpan.style.color = "green";
        statusSpan.textContent = "Added to cart!";
        setTimeout(function () { statusSpan.textContent = ""; }, 3000);
      }
    });
  });

  /* ---------------------------------------------------------------
     4. CUSTOM BUILD LIVE PREVIEW (custom.html)
     - Updates component image preview when a radio is selected
     - Updates the running total and part name list
  --------------------------------------------------------------- */
  var buildParts = document.querySelectorAll(".build-part");

  if (buildParts.length > 0) {
    var previewImg  = document.getElementById("component-preview-img");
    var previewName = document.getElementById("preview-name");
    var buildTotal  = document.getElementById("build-total");
    var buildStatus = document.getElementById("build-status");
    var addBuildBtn = document.getElementById("add-build-btn");

    function recalcBuild(changedRadio) {
      /* Update image preview from the radio that just changed */
      if (previewImg && changedRadio) {
        var imgSrc = changedRadio.getAttribute("data-img");
        if (imgSrc) {
          previewImg.src = imgSrc;
          previewImg.removeAttribute("srcset");
          previewImg.alt = "Preview of " + (changedRadio.getAttribute("data-name") || "component");
        }
      }

/* Recalculate total and name list from ALL currently checked radios */
      var chosenParts = document.querySelectorAll(".build-part:checked");
      // 1. Start the total at R500 to account for the custom build fee
      var total = 500; 
      var names = [];

      chosenParts.forEach(function (part) {
        total += Number(part.getAttribute("data-price") || 0);
        names.push(part.getAttribute("data-name") || "");
      });

      if (chosenParts.length === 0) {
        total = 0;
      }
      if (previewName) {
        previewName.textContent = names.length > 0 ? names.join(", ") : "......";
      }
      if (buildTotal) {
        buildTotal.textContent = "R" + total.toLocaleString("en-ZA");
      }
    }

    buildParts.forEach(function (part) {
      part.addEventListener("change", function () {
        recalcBuild(part);
      });
    });

    /* Add full custom build to cart */
    if (addBuildBtn) {
      addBuildBtn.addEventListener("click", function () {
        var chosenParts = document.querySelectorAll(".build-part:checked");
        if (chosenParts.length === 0) {
          if (buildStatus) {
            buildStatus.style.color = "#b00020";
            buildStatus.textContent = "Please select at least one component before adding your build to the cart.";
          }
          return;
        }

        var currentCart = loadCart();
        var partsTotal = 0;

        // Calculate the total of all selected parts
        chosenParts.forEach(function (part) {
           partsTotal += Number(part.getAttribute("data-price") || 0);
        });

        // Add as a single "Custom build" item with the R500 build fee
        currentCart.push({
          name:  "Custom build",
          price: partsTotal + 500
        });

        saveCart(currentCart);
        window.cart = currentCart;
         
        if (buildStatus) {
          buildStatus.style.color  = "green";
          buildStatus.textContent  = "Your custom build has been added to the cart!";
        }
      });
    }
  }
  /* ---------------------------------------------------------------
     5. CUSTOM BUILD COMPONENT SEARCH (custom.html)
  --------------------------------------------------------------- */
  var searchBoxes = document.querySelectorAll("[data-list]");

  searchBoxes.forEach(function (box) {
    var list = document.getElementById(box.getAttribute("data-list"));
    if (!list) return;

    var unavailableMsg = list.parentElement.querySelector(".unavailable-msg");
    var items          = list.querySelectorAll("li");

    box.addEventListener("input", function () {
      var term = box.value.trim().toLowerCase();
      var visibleCount = 0;

      items.forEach(function (item) {
        var matches = item.textContent.toLowerCase().includes(term);
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
     - Reads cart from localStorage (survives page navigation)
     - Clears hardcoded demo items and renders real cart contents
     - Remove buttons update the summary table and grand total live
     - Shows empty-cart state when all items are removed
  --------------------------------------------------------------- */
  var emptyState        = document.getElementById("empty-cart-state");
  var cartItemsState    = document.getElementById("cart-items-state");
  var cartItemList      = document.getElementById("cart-item-list");
  var summaryTableBody  = document.getElementById("summary-table-body");
  var grandTotalEl      = document.getElementById("cart-grand-total");
  var orderSummaryAside = document.getElementById("order-summary-aside");

  if (emptyState && cartItemsState && cartItemList) {

    function formatPrice(p) {
      return "R" + Number(p).toLocaleString("en-ZA");
    }

    function rebuildSummary() {
      var articles = cartItemList.querySelectorAll("article[data-cart-item]");

      if (summaryTableBody) {
        summaryTableBody.innerHTML = "";
        var total = 0;

        articles.forEach(function (article) {
          var name  = article.getAttribute("data-cart-item");
          var price = parseInt(article.getAttribute("data-cart-price") || "0", 10);
          total += price;

          var tr = document.createElement("tr");
          tr.innerHTML =
            "<td>" + name + "</td>" +
            "<td><span class='price'>" + (price > 0 ? formatPrice(price) : "TBC") + "</span></td>";
          summaryTableBody.appendChild(tr);
        });

        if (grandTotalEl) {
          grandTotalEl.textContent = formatPrice(total);
        }
      }

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

    function syncCartStorage() {
      /* Keep localStorage in sync after a removal */
      var articles = cartItemList.querySelectorAll("article[data-cart-item]");
      var updatedCart = [];
      articles.forEach(function (article) {
        updatedCart.push({
          name:  article.getAttribute("data-cart-item"),
          price: parseInt(article.getAttribute("data-cart-price") || "0", 10)
        });
      });
      saveCart(updatedCart);
      window.cart = updatedCart;
    }

    function attachRemoveListeners() {
      cartItemList.querySelectorAll(".remove-item-btn").forEach(function (btn) {
        btn.replaceWith(btn.cloneNode(true));
      });

      cartItemList.querySelectorAll(".remove-item-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var article = btn.closest("article");
          if (article) {
            article.remove();
            syncCartStorage();
            rebuildSummary();
          }
        });
      });
    }

    cartItemList.innerHTML = "";

    var savedCart = loadCart();

    if (savedCart.length > 0) {
      savedCart.forEach(function (item) {
        var article = document.createElement("article");
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

    attachRemoveListeners();
    rebuildSummary();
  }

  /* Pay button (checkout.html) */
  var payBtn = document.getElementById("pay-btn");

  if (payBtn) {
    payBtn.addEventListener("click", function () {
      var articles = cartItemList ? cartItemList.querySelectorAll("article[data-cart-item]") : [];
      var payStatus = document.getElementById("pay-status");

      if (articles.length === 0) {
        payStatus.style.color = "#b00020";
        payStatus.textContent = "Your cart is empty. Please add items before paying.";
        return;
      }

      payStatus.style.color = "green";
      payStatus.textContent = "Payment successful! Thank you for shopping with Tech Lover's. Your order is confirmed.";

      /* Clear cart from storage after payment */
      saveCart([]);
      window.cart = [];
    });
  }

});
