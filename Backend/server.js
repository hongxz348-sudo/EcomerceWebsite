const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
  } else {
    console.log("MySQL Connected!");
  }
});

//Searching API and Fetching all Products
app.get("/backend/search/products", (req, res) => {
  const search = req.query.search || "";

  const sql = `
    SELECT * FROM products
    WHERE brand LIKE ?
      OR description LIKE ?
  `;
  const values = [
    `%${search}%`,
    `%${search}%`,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result);
  });
});



//fetch all Categories
app.get("/backend/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

//fetch Categories According Category ID
app.get("/products/:category_id", (req, res) => {
  const catgoryId = req.params.category_id;
  db.query(
    "SELECT * FROM products WHERE category_id= ?",
    [catgoryId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

// CHECKOUT API
app.post("/checkout", (req, res) => {
  const { fullName, email, phone, address, payment, cart, total } = req.body;

  // Insert order first
  const orderSql = `
    INSERT INTO orders (full_name, email, phone, address, payment_method, total)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    orderSql,
    [fullName, email, phone, address, payment, total],
    (err, result) => {
      if (err) throw err;

      const orderId = result.insertId;

      // Insert all cart items
      const itemsSql =
        "INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES ?";

      const itemsData = cart.map((item) => [
        orderId,
        item.id,
        item.name,
        item.price,
        item.quantity,
      ]);

      db.query(itemsSql, [itemsData], (err2) => {
        if (err2) throw err2;

        res.json({
          success: true,
          message: "Order placed successfully",
          order_id: orderId,
        });
      });
    }
  );
});

// GET cart items
app.get("/cart", (req, res) => {
  db.query("SELECT * FROM cart", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// ADD to cart
app.post("/cart", (req, res) => {
  const { product_id, description, brand, price, quantity, image } = req.body;

  const sql = `
    INSERT INTO cart (product_id,description, brand , price,quantity, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [product_id, description, brand, price, quantity, image],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    }
  );
});

// REMOVE item
app.delete("/cart/:id", (req, res) => {
  db.query("DELETE FROM cart WHERE id = ?", [req.params.id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

//Get Login Users
app.get("/backend/users", (req, res) => {
  const sql = "SELECT * FROM user ";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    return res.json(result);
  });
});

//Dash Board showing

// GET /backend/users
app.get("/backend/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// GET /backend/orders
app.get("/backend/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

//Register API
// REGISTER USER
app.post("/backend/register", (req, res) => {
  const { username, password, phone } = req.body;

  // Check if username exists
  const checkSql = "SELECT * FROM user WHERE username = ?";
  db.query(checkSql, [username], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }

    if (result.length > 0) {
      return res.json({ success: false, message: "Username already exists!" });
    }
    // Insert new user
    const insertSql =
      "INSERT INTO user (username, password, Phone, role) VALUES (?, ?, ?, ?)";
    db.query(
      insertSql,
      [username, password, phone, "user"],
      (err2, result2) => {
        if (err2) {
          return res.json({ success: false, message: err2.message });
        }
        return res.json({
          success: true,
          message: "User registered successfully!",
        });
      }
    );
  });
});

//Delete Users from dashbord
app.delete("/backend/user/:userid", (req, res) => {
  const { userid } = req.params;

  const DeleteSql = "DELETE FROM user WHERE userid = ?";

  db.query(DeleteSql, [userid], (err, result) => {
    if (err) {
      return res.json({ success: false, message: err.message });
    }

    if (result.affectedRows === 0) {
      return res.json({ success: false, message: "User not found." });
    }

    return res.json({ success: true, message: "User deleted successfully." });
  });
});
//Update Users
app.put("/backend/user/:id", (req, res) => {
  const { id } = req.params;
  const { username, password, Phone } = req.body;

  const sql = "UPDATE user SET username=?, password=?, Phone=? WHERE userid=?";
  db.query(sql, [username, password, Phone, id], (err, result) => {
    if (err) return res.json({ success: false, message: err.message });

    return res.json({ success: true, message: "User updated successfully!" });
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
