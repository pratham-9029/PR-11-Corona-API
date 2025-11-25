let allStates = [];
let lastUpdated = "";

async function loadData() {
    try {
        const res = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
        const data = await res.json();

        allStates = data.data.regional;
        lastUpdated = data.lastRefreshed;

        const stateSelect = document.getElementById("stateSelect");
        
        
        stateSelect.innerHTML = '<option value="">-- Select a State --</option>';
        
        allStates.forEach(state => {
            const option = document.createElement("option");
            option.value = state.loc;
            option.textContent = state.loc;
            stateSelect.appendChild(option);
        });

        document.getElementById("loading").style.display = "none";
        document.getElementById("statsContainer").style.display = "grid";
        document.getElementById("updatedInfo").innerHTML = `Last updated: ${new Date(lastUpdated).toLocaleString()}`;
    } catch (error) {
        console.error(error.message);
        document.getElementById("loading").innerHTML = "Error loading data. Please try again later.";
    }
}

function displayStateData() {
    const selected = document.getElementById("stateSelect").value;
    const state = allStates.find(s => s.loc === selected);

    if (state) {
        document.getElementById("confirmed").innerText = state.totalConfirmed.toLocaleString();
        document.getElementById("recovered").innerText = state.discharged.toLocaleString();
        document.getElementById("deaths").innerText = state.deaths.toLocaleString();
    } else {
        document.getElementById("confirmed").innerText = "--";
        document.getElementById("recovered").innerText = "--";
        document.getElementById("deaths").innerText = "--";
    }
}


window.onload = loadData;