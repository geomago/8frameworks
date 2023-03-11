const productTable = document.getElementById("product-table");
const modal = document.getElementById("edit-modal");
const modalTitle = modal.querySelector(".modal-title");
const modalInputs = modal.querySelectorAll(".modal-body input");
const saveButton = modal.querySelector(".save-button");
let editingProductId;

// Fetch data from API and populate table
fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data => {
    data.products.forEach(product => {
      const row = document.createElement("tr");
	  row.setAttribute('id',`row-${product.id}`); // human
      // Create ID cell
      const idCell = document.createElement("td");
      idCell.textContent = product.id;
      row.appendChild(idCell);

      // Create title cell
      const titleCell = document.createElement("td");
      titleCell.textContent = product.title;
      row.appendChild(titleCell);

      // Create description cell
      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = product.description;
      row.appendChild(descriptionCell);

      // Create price cell
      const priceCell = document.createElement("td");
      priceCell.textContent = product.price;
      row.appendChild(priceCell);

      // Create thumbnail cell
      const thumbnailCell = document.createElement("td");
      const thumbnailImg = document.createElement("img");
      thumbnailImg.src = product.thumbnail;
      thumbnailCell.classList.add("thumbnail");
      thumbnailCell.appendChild(thumbnailImg);
      row.appendChild(thumbnailCell);

      // Create action cell
      const actionCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => openEditModal(product));
      actionCell.appendChild(editButton);
      row.appendChild(actionCell);

      productTable.querySelector("tbody").appendChild(row);
    });
  })
  .catch(error => {
    console.error(error);
    const errorRow = document.createElement("tr");
    const errorCell = document.createElement("td");
    errorCell.textContent = "Failed to fetch data";
    errorCell.colSpan = 6;
    errorCell.classList.add("error");
    errorRow.appendChild(errorCell);
    productTable.querySelector("tbody").appendChild(errorRow);
  });

// Open edit modal with pre-filled values
function openEditModal(product) {
  editingProductId = product.id;
  modalTitle.textContent = `Edit Product #${editingProductId}`;
  modalInputs[0].value = product.title;
  modalInputs[1].value = product.description;
  modalInputs[2].value = product.price;
  modal.style.display = "block";
}

// Close edit modal without saving changes
function closeEditModal() {
  modal.style.display = "none";
}

// Save changes and update table cell values
function saveChanges() {
  const title = modalInputs[0].value;
  const description = modalInputs[1].value;
  const price = modalInputs[2].value;
  const row = document.getElementById(`row-${editingProductId}`);
  row.querySelector("td:nth-child(2)").textContent = title;
  row.querySelector("td:nth-child(3)").textContent = description;
  row.querySelector("td:nth-child(4)").textContent = price;
  closeEditModal();
}

// Attach event listeners to modal buttons
saveButton.addEventListener("click", saveChanges);
modal.querySelector(".cancel-button").addEventListener("click", closeEditModal);
modal.querySelector(".close-button").addEventListener("click", closeEditModal);
window.addEventListener("click", event => {
  if (event.target == modal) {
    closeEditModal();
  }
});
