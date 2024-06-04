document.addEventListener("DOMContentLoaded", function() {
    const knockoutSelectionForm = document.getElementById("knockout-selection");
    const matchesDiv = document.getElementById("matches");

    knockoutSelectionForm.addEventListener("change", function() {
        const selectedGroups = document.querySelectorAll('input[name="group-winner"]:checked');
        if (selectedGroups.length > 4) {
            alert("You can only select 4 group winners for the knockout stage!");
            this.reset();
        } else if (selectedGroups.length === 4) {
            generateKnockoutMatches(selectedGroups);
        }
    });

    function generateKnockoutMatches(selectedGroups) {
    matchesDiv.innerHTML = ""; // Clear previous matches
    const matchPairs = Array.from(selectedGroups).map(input => input.value);
    for (let i = 0; i < matchPairs.length; i += 2) {
        const match = document.createElement("div");
        match.className = "match";
        match.innerHTML = `
            <p>${matchPairs[i]} vs ${matchPairs[i + 1]}</p>
            <label><input type="radio" name="match${i}" value="${matchPairs[i]}"> ${matchPairs[i]}</label>
            <label><input type="radio" name="match${i}" value="${matchPairs[i + 1]}"> ${matchPairs[i + 1]}</label>
        `;
        matchesDiv.appendChild(match);
    }
}

function savePredictions() {
    const predictions = [];
    document.querySelectorAll('#matches .match').forEach(match => {
        const winner = match.querySelector('input[type="radio"]:checked');
        if (winner) {
            predictions.push(winner.value);
        }
    });
    fetch('/predictions/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ predictions })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(err => {
        console.error('Error:', err);
    });
}
