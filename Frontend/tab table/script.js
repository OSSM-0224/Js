const inventory = [
  {
    productName: "Classic Steam Veg Momo",
    category: "Veg",
    type: "Steam",
    sellingPrice: 120,
    quantityInStock: 80,
    piecesPerPlate: 6
  },
  {
    productName: "Paneer Steam Momo",
    category: "Veg",
    type: "Steam",
    sellingPrice: 150,
    quantityInStock: 60,
    piecesPerPlate: 6
  },
  {
    productName: "Cheese Corn Momo",
    category: "Veg",
    type: "Fry",
    sellingPrice: 160,
    quantityInStock: 45,
    piecesPerPlate: 6
  },
  {
    productName: "Classic Chicken Steam Momo",
    category: "Non-Veg",
    type: "Steam",
    sellingPrice: 170,
    quantityInStock: 70,
    piecesPerPlate: 6
  }
];

var form = document.querySelector("#momoForm");
var allData = document.querySelector(".all-data");

let editIndex = null;

function printData() {
  let sum = "";

  inventory.forEach(function (item, index) {
    sum += `
      <div class="item">
          <h3>${item.productName}</h3>
          <h4>Category : <span>${item.category}</span></h4> 
          <h4>Type : <span>${item.type}</span></h4> 
          <h4>Quantity in Stock : <span>${item.quantityInStock}</span></h4>
          <h4>Pieces Per Plate : <span>${item.piecesPerPlate}</span></h4>
          <h4>Price : <span>₹${item.sellingPrice}</span></h4>
          <div>
            <button class="editBtn" data-id="${index}">Edit</button>
            <button class="deleteBtn" data-id="${index}">Delete</button>
          </div>
        </div>
    `;
  });

  allData.innerHTML = sum;
}

printData();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var newProduct = {
    productName: form.name.value,
    category: form.category.value,
    type: form.type.value,
    sellingPrice: Number(form.price.value),
    quantityInStock: Number(form.quantityInStock.value),
    piecesPerPlate: Number(form.piecesPerPlate.value)
  };

  if (editIndex === null) {
    inventory.push(newProduct);
  } else {
    inventory[editIndex] = newProduct;
    editIndex = null;
    form.querySelector("button").textContent = "Add Momo";
  }

  form.reset();
  printData();
});

allData.addEventListener("click", function (e) {

  if (e.target.classList.contains("deleteBtn")) {
    const index = e.target.getAttribute("data-id");
    inventory.splice(index, 1);
    printData();
  }

  if (e.target.classList.contains("editBtn")) {
    const index = e.target.getAttribute("data-id");
    const item = inventory[index];

    form.name.value = item.productName;
    form.category.value = item.category;
    form.type.value = item.type;
    form.price.value = item.sellingPrice;
    form.quantityInStock.value = item.quantityInStock;
    form.piecesPerPlate.value = item.piecesPerPlate;

    editIndex = index;
    form.querySelector("button").textContent = "Update Momo";
  }

});