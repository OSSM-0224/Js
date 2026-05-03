let express = require("express");

let app = express();

let products = [];
app.use(express.json());

//Create PRODUCT
// {
//             "name": "Socks",
//             "price": 80,
//             "description": "THIS IS OYSM FABRICS",
//             "category": "Socks",
//             "stock": 100
//         }
//         {
//             "name": "Football KIT",
//             "price": 750,
//             "description": "THIS IS OYSM FABRICS",
//             "category": "Jersey, Shorts",
//             "stock": 50
//         }
//         {
//             "name": "Track pant",
//             "price": 500,
//             "description": "THIS IS OYSM FABRICS",
//             "category": "Pant",
//             "stock": 15
//         }
//         {
//             "name": "jersey",
//             "price": 200,
//             "description": "THIS IS OYSM FABRICS",
//             "category": "Tshirt",
//             "stock": 20
//         }
// use POST method and use this uri http://localhost:3000/create-products
app.post("/create-products", (req, res) => {
  try {
    let { name, price, description, category, stock } = req.body;

    if (!name || !price || !description || !category || !stock)
      return res.status(400).json({
        message:
          "all fields are reuired let me tell you what are the fields name, price, description, category, stock",
      });
    price = Number(price);
    stock = Number(stock);

    let product = {
      name,
      price,
      description,
      category,
      stock,
      createdAt: new Date(),
    };

    products.push(product);

    return res.status(201).json({
      message: `porduct created successfully. Total products: ${products.length}`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// use this uri to fetch all products http://localhost:3000/get-products and use GET method
app.get("/get-products", (req, res) => {
  let { index } = req.params;
  let product = products[index];

  try {
    return res.status(200).json({
      message: `Products fetched sucessfully. Total products: ${products.length}`,
      data: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error hai mere ladle" });
  }
  if (!product)
    return res.status(404).json({
      message: "product not found",
    });
});

// use this uri to fetch single product http://localhost:3000/get-products/0 and use GET method
app.get("/get-products/:index", (req, res) => {
  try {
    let { index } = req.params;
    let product = products[index];
    if (!product)
      return res.status(404).json({
        message: "product not found",
      });
    return res.status(200).json({
      message: `product fetched sucessfully. Single Product fetched index => ${index}`,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "innternal server error",
    });
  }
});

// use this uri to update the product http://localhost:3000/update-products/0 and use PATCH method
app.patch("/products/update/:index", (req, res) => {
  let { index } = req.params;
  console.log(index);

  products[index].stock = 80;

  return res.status(200).json({
    message: `product updated sucessfully. product updated index => ${index}`,
    data: products[index],
  });
});
// use this uri to delete the product http://localhost:3000/delete-products/0 and use DELETE method
app.delete("/products/delete/:index", (req, res) => {
  let { index } = req.params;
  let product = products[index];
  if(!product)
    return res.status(404).json({message:`products not found for the index ${index}`})

    return res.status(200).json({
        data: product,
        message: `product deleted sucessfully. product deleted index => ${index} and remaining products`
    });
});
module.exports = app;
