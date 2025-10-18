// Function to fetch legal term definition
async function searchTerm() {
    let input = document.getElementById("searchBox").value.trim();
    let resultDiv = document.getElementById("result");

    // If input is empty, show an alert
    if (!input) {
        resultDiv.innerHTML = "<p class='error'>Please enter a legal term.</p>";
        return;
    }

    // Show loading text
    resultDiv.innerHTML = "<p class='loading'>Searching...</p>";

    // Fetch data from API
    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
        let data = await response.json();

        // If no results found
        if (data.title === "No Definitions Found") {
            resultDiv.innerHTML = "<p class='error'>No definition found. Try another legal term.</p>";
            return;
        }

        // Extract meaning and example
        let definition = data[0]?.meanings[0]?.definitions[0]?.definition || "Definition not available.";
        let example = data[0]?.meanings[0]?.definitions[0]?.example || "Example not available.";

        // Display result
        resultDiv.innerHTML = `
            <h3>${input.toUpperCase()}</h3>
            <p><strong>Definition:</strong> ${definition}</p>
            <p><strong>Example:</strong> ${example}</p>
        `;

    } catch (error) {
        resultDiv.innerHTML = "<p class='error'>Error fetching data. Please try again later.</p>";
    }
}
