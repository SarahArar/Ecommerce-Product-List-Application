const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/products", (req, res) => {
  res.json([
    {
      image: {
        thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
        mobile: "./assets/images/image-waffle-mobile.jpg",
        tablet: "./assets/images/image-waffle-tablet.jpg",
        desktop: "./assets/images/image-waffle-desktop.jpg",
      },
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
      id: 0,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
        mobile: "./assets/images/image-creme-brulee-mobile.jpg",
        tablet: "./assets/images/image-creme-brulee-tablet.jpg",
        desktop: "./assets/images/image-creme-brulee-desktop.jpg",
      },
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7.0,
      id: 1,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
        mobile: "./assets/images/image-macaron-mobile.jpg",
        tablet: "./assets/images/image-macaron-tablet.jpg",
        desktop: "./assets/images/image-macaron-desktop.jpg",
      },
      name: "Macaron Mix of Five",
      category: "Macaron",
      price: 8.0,
      id: 2,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
        mobile: "./assets/images/image-tiramisu-mobile.jpg",
        tablet: "./assets/images/image-tiramisu-tablet.jpg",
        desktop: "./assets/images/image-tiramisu-desktop.jpg",
      },
      name: "Classic Tiramisu",
      category: "Tiramisu",
      price: 5.5,
      id: 3,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
        mobile: "./assets/images/image-baklava-mobile.jpg",
        tablet: "./assets/images/image-baklava-tablet.jpg",
        desktop: "./assets/images/image-baklava-desktop.jpg",
      },
      name: "Pistachio Baklava",
      category: "Baklava",
      price: 4.0,
      id: 4,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
        mobile: "./assets/images/image-meringue-mobile.jpg",
        tablet: "./assets/images/image-meringue-tablet.jpg",
        desktop: "./assets/images/image-meringue-desktop.jpg",
      },
      name: "Lemon Meringue Pie",
      category: "Pie",
      price: 5.0,
      id: 5,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-cake-thumbnail.jpg",
        mobile: "./assets/images/image-cake-mobile.jpg",
        tablet: "./assets/images/image-cake-tablet.jpg",
        desktop: "./assets/images/image-cake-desktop.jpg",
      },
      name: "Red Velvet Cake",
      category: "Cake",
      price: 4.5,
      id: 6,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
        mobile: "./assets/images/image-brownie-mobile.jpg",
        tablet: "./assets/images/image-brownie-tablet.jpg",
        desktop: "./assets/images/image-brownie-desktop.jpg",
      },
      name: "Salted Caramel Brownie",
      category: "Brownie",
      price: 4.5,
      id: 7,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
        mobile: "./assets/images/image-panna-cotta-mobile.jpg",
        tablet: "./assets/images/image-panna-cotta-tablet.jpg",
        desktop: "./assets/images/image-panna-cotta-desktop.jpg",
      },
      name: "Vanilla Panna Cotta",
      category: "Panna Cotta",
      price: 6.5,
      id: 8,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "",
        mobile: "./assets/images/sticky-toffee-pudding-sauce-pour-desktop.jpg",
        tablet: "./assets/images/sticky-toffee-pudding-sauce-pour-mobile.jpg",
        desktop: "./assets/images/sticky-toffee-pudding-sauce-pour-tablet.jpg",
      },
      name: "Sticky Toffee Pudding",
      category: "British Desserts",
      price: 12,
      id: 9,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "",
        mobile: "./assets/images/Creme-Brulee-Cheesecake-3-scaled-mobile.jpg",
        tablet: "./assets/images/Creme-Brulee-Cheesecake-3-scaled-tablet.jpg",
        desktop: "./assets/images/Creme-Brulee-Cheesecake-3-scaled-desktop.jpg",
      },
      name: "Crème Brûlée",
      category: "French Desserts",
      price: 20,
      id: 10,
      quantity: 0,
    },
    {
      image: {
        thumbnail: "./assets/images/lemon-tart-thumbnail.jpeg",
        mobile: "./assets/images/lemon-tart-mobile.jpeg",
        tablet: "./assets/images/lemon-tart-tablet.jpeg",
        desktop: "./assets/images/lemon-tart-desktop.jpeg",
      },
      name: "Lemon Tart",
      category: "Dessert",
      price: 6.0,
      id: 11,
      quantity: 0,
    },
    {
      image: {
        mobile: "./assets/images/white-chocolate-blueberry-mobile.jpg",
        tablet: "./assets/images/white-chocolate-blueberry-tablet.jpg",
        desktop: "./assets/images/white-chocolate-blueberry-desktop.jpg",
      },
      name: "White Chocolate Blueberry",
      category: "Dessert",
      price: 9.0,
      id: 12,
      quantity: 0,
    },
  ]);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
