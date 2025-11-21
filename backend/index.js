const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Luxe Wireless Headphones",
    price: 12999,
    category: "Audio",
    rating: 4.7,
    badge: "Bestseller",
    inStock: true,
    image:
      "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=800",
    shortDescription: "Deep bass, active noise cancelling, 30h battery life.",
    description:
      "Premium wireless headphones with active noise cancellation, 30 hours of battery, soft memory foam earcups and dual-device pairing.",
  }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend running" });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
