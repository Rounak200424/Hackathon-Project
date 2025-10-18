document.addEventListener("DOMContentLoaded", fetchRights);

// Fetch and display all fundamental rights
async function fetchRights(category = "all") {
    try {
        let url = "http://localhost:5000/api/rights";
        if (category !== "all") {
            url += `?category=${category}`;
        }
        let response = await fetch(url);
        let rights = await response.json();

        displayRights(rights);
    } catch (error) {
        console.error("Error fetching rights:", error);
    }
}

// Display rights in the container
function displayRights(rights) {
    let container = document.getElementById("rightsContainer");
    container.innerHTML = ""; // Clear existing content

    if (rights.length === 0) {
        container.innerHTML = "<p>No rights found for this category.</p>";
        return;
    }

    rights.forEach(right => {
        let div = document.createElement("div");
        div.classList.add("right-item");
        div.innerHTML = `<h3>${right.title}</h3><p>${right.description}</p>`;
        container.appendChild(div);
    });
}

// Search rights when the button is clicked
async function searchRights() {
    let input = document.getElementById("searchInput").value.trim().toLowerCase();
    
    if (!input) {
        alert("Please enter a search term!");
        return;
    }

    try {
        let response = await fetch(`http://localhost:5000/api/rights/search?q=${input}`);
        let results = await response.json();
        displayRights(results);
    } catch (error) {
        console.error("Error searching rights:", error);
    }
}

// Filter by category
function filterByCategory() {
    let selectedCategory = document.getElementById("category").value;
    fetchRights(selectedCategory);
}

// Fetch and display a specific right when a recommended option is clicked
async function fetchRight(rightTitle) {
    try {
        let response = await fetch(`http://localhost:5000/api/rights/search?q=${rightTitle}`);
        let results = await response.json();
        displayRights(results);
    } catch (error) {
        console.error("Error fetching right:", error);
    }
}
