// North Star Bakery - Touchstone 4

// Product information
const products = [
    { name: "Traditional Sourdough", category: "Bread" },
    { name: "Honey Oat Loaf", category: "Bread" },
    { name: "Country Multigrain", category: "Bread" },
    { name: "Signature Loaf", category: "Bread" },
    { name: "Butter Croissants", category: "Pastry" },
    { name: "Cinnamon Rolls", category: "Pastry" },
    { name: "Seasonal Fruit Muffins", category: "Pastry" },
    { name: "Celebration Cakes", category: "Cake" },
    { name: "Event Cakes", category: "Cake" }
];

// Load saved favorites or start with an empty array
let favorites = JSON.parse(localStorage.getItem("bakeryFavorites")) || [];

// Save favorites in localStorage
function saveFavorites() {
    localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}

// Add or remove a product from favorites
function toggleFavorite(productName) {
    if (favorites.includes(productName)) {
        favorites = favorites.filter(function (item) {
            return item !== productName;
        });
    } else {
        favorites.push(productName);
    }

    saveFavorites();
    displayFavorites();
    updateFavoriteButtons();
}

// Display favorites on the Products page
function displayFavorites() {
    const favoritesList = document.querySelector("#favorites-list");

    if (!favoritesList) {
        return;
    }

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent =
            "You have not selected any favorites yet.";
        favoritesList.appendChild(emptyMessage);
        return;
    }

    favorites.forEach(function (favorite) {
        const listItem = document.createElement("li");
        listItem.textContent = favorite;
        favoritesList.appendChild(listItem);
    });
}

// Update favorite button text
function updateFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-btn");

    buttons.forEach(function (button) {
        const productName = button.dataset.product;

        if (favorites.includes(productName)) {
            button.textContent = "Remove from Favorites";
        } else {
            button.textContent = "Add to Favorites";
        }
    });
}

// Set up favorite buttons
function setupFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-btn");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            toggleFavorite(button.dataset.product);
        });
    });
}


// Contact form validation and storage

const contactForm = document.querySelector("#contact-form");
const customerName = document.querySelector("#customer-name");
const customerEmail = document.querySelector("#customer-email");
const itemDetails = document.querySelector("#item-details");

// Display an error message near a form field
function showError(errorElement, message) {
    errorElement.textContent = message;
}

// Clear an error message
function clearError(errorElement) {
    errorElement.textContent = "";
}

// Validate the customer's name
function validateName() {
    const nameError = document.querySelector("#name-error");

    if (customerName.value.trim().length < 2) {
        showError(
            nameError,
            "Please enter a name with at least 2 characters."
        );
        return false;
    }

    clearError(nameError);
    return true;
}

// Validate the customer's email address
function validateEmail() {
    const emailError = document.querySelector("#email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(customerEmail.value.trim())) {
        showError(
            emailError,
            "Please enter a valid email address."
        );
        return false;
    }

    clearError(emailError);
    return true;
}

// Validate the order or inquiry details
function validateDetails() {
    const detailsError = document.querySelector("#details-error");

    if (itemDetails.value.trim().length < 10) {
        showError(
            detailsError,
            "Please enter at least 10 characters describing your request."
        );
        return false;
    }

    clearError(detailsError);
    return true;
}

// Save customer information in localStorage
function saveCustomerInfo() {
    const customerInfo = {
        name: customerName.value,
        email: customerEmail.value
    };

    localStorage.setItem(
        "bakeryCustomerInfo",
        JSON.stringify(customerInfo)
    );
}

// Load previously saved customer information
function loadCustomerInfo() {
    const savedInfo = JSON.parse(
        localStorage.getItem("bakeryCustomerInfo")
    );

    if (savedInfo) {
        customerName.value = savedInfo.name || "";
        customerEmail.value = savedInfo.email || "";
    }
}


// Start favorites feature if the Products page is open

setupFavoriteButtons();
displayFavorites();
updateFavoriteButtons();


// Start form features if the Contact page is open

if (contactForm) {
    loadCustomerInfo();

    customerName.addEventListener("input", function () {
        saveCustomerInfo();
        validateName();
    });

    customerEmail.addEventListener("input", function () {
        saveCustomerInfo();
        validateEmail();
    });

    itemDetails.addEventListener("input", function () {
        validateDetails();
    });

    contactForm.addEventListener("submit", function (event) {
        const nameIsValid = validateName();
        const emailIsValid = validateEmail();
        const detailsAreValid = validateDetails();

        if (!nameIsValid || !emailIsValid || !detailsAreValid) {
            event.preventDefault();
        }
    });
}