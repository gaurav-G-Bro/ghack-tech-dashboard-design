function loadClientData() {
    fetch('http://localhost:3000/api/clients') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(clients => {
            const tableBody = document.getElementById('client-data');
            tableBody.innerHTML = ''; 

            clients.forEach((client, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>  <!-- Serial number -->
                        <td style="max-width: 5vw; overflow-x: scroll;">${client._id}</td>
                        <td>${client.name}</td>
                        <td>${client.contact}</td>
                        <td>${new Date(client.receivedDate).toLocaleDateString()}</td>
                        <td>${client.inventory}</td>
                        <td>${client.issues}</td>
                        <td>${client.notes}</td>
                        <td>${client.technician}</td>
                        <td>${client.amount || 'None'}</td>
                        <td>${new Date(client.deadline).toLocaleDateString()}</td>
                        <td>${client.status}</td>
                        <td class="actions">
                            <button class="view-btn">View</button>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

window.onload = loadClientData;

document.getElementById("search-btn").addEventListener("click", function(){
  const searchValue = document.getElementById("search-input").value.toLowerCase();
        const tableRows = document.querySelectorAll(".client-table tbody tr");

        tableRows.forEach(row => {
            const clientId = row.cells[1].textContent.toLowerCase();
            const clientName = row.cells[2].textContent.toLowerCase();

            if (clientId.includes(searchValue) || clientName.includes(searchValue)) {
                row.style.display = ""; 
            } else {
                row.style.display = "none"; 
            }
        });
});


document.getElementById('client-data').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        if (confirm("Are you sure you want to delete this client?")) {
            const row = event.target.closest("tr");
            row.remove(); 

            const clientId = row.cells[1].textContent.trim();

fetch(`/api/clients/${clientId}`, { method: 'DELETE' })
    .then(response => {
        if (response.ok) {
            alert("Client deleted successfully.");
        } else {
            return response.text().then(text => {
                throw new Error(text);
            });
        }
    })
    .catch(error => {
        console.error('Failed to delete client:', error);
        alert("Failed to delete client.");
    });
        }
    }
});


document.getElementById('client-data').addEventListener('click', function(event) {
    if (event.target.classList.contains('view-btn')) {
        const row = event.target.closest("tr");
        const clientId = row.cells[1].textContent.trim();
        const clientName = row.cells[0].textContent.trim();
        const contactInfo = row.cells[1].textContent.trim();
        const receivedDate = row.cells[2].textContent.trim();
        const inventoryReceived = row.cells[3].textContent.trim();
        const reportedIssues = row.cells[4].textContent.trim();
        const clientNotes = row.cells[5].textContent.trim();
        const assignedTechnician = row.cells[6].textContent.trim();
        const estimatedAmount = row.cells[7].textContent.trim();
        const deadline = row.cells[8].textContent.trim();
        const status = row.cells[9].textContent.trim();

        const url = `/jobsheet/${clientId}`;

        window.location.href = url;
    }
});


document.getElementById('client-data').addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest("tr");
        const clientId = row.cells[1].textContent.trim();

        const url = `/jobsheet/${clientId}/edit`;
        window.location.href = url;  
    }
});

document.getElementById('jobSheetForm').addEventListener('submit', function(event) {
    const clientName = document.getElementById('clientName').value.trim();
    if (!clientName) {
        event.preventDefault();  
        alert("Client name is required!");
    }
});


