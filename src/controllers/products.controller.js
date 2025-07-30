import pool from "../db/index.js";
// Function to add products
export const addProducts = async (req, res) => {
  try {
    const { name, price } = req.body;
    const lowerCaseName = name.toLowerCase();
    const picurl = req.files?.image[0].path;
    // const picurl = await uploadCloudinary(pic);
    console.log(req.body);
    console.log(picurl);
    if (!lowerCaseName || !price || !picurl) {
      return res.status(400).json({
        message: "Please fill all the fields",
        fields: [lowerCaseName, price, picurl],
      });
    }

    const result = await pool.query(
      "INSERT INTO products (name,price,image) VALUES ($1,$2,$3) RETURNING *",
      [lowerCaseName, price, picurl]
    );
    res.json({
      message: "Product created",
      product: result.rows[0],
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Function to get all products

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Function to delete product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    res.json({
      message: "Product deleted",
      product: result.rows[0],
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Function to search product

export const searchProduct = async (req, res) => {
  try {
    const { name } = req.params;
    const lowerCaseName = name.toLowerCase();
    const result = await pool.query("SELECT * FROM products WHERE name=$1", [
      lowerCaseName,
    ]);
    res.json(result.rows);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Function to add to cart products

export const addToCart = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
    const checkCart = await pool.query("SELECT * FROM addtocart WHERE id=$1", [
      id,
    ]);
    if (checkCart.rows.length > 0) {
      res.json({
        message: "Product already in cart",
        data: checkCart.rows[0].name,
      });
    }
    const cart = await pool.query(
      "INSERT INTO addtocart(name,price,image,id) SELECT name,price,image,id FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    res.json({ message: "Product add to cart", data: cart.rows });
    console.log(result);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Search from cart

export const searchCart = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM addtocart WHERE id=$1", [
      id,
    ]);
    res.json(result.rows);
    if (result.rows.length === 0) {
      return res.json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Delete from cart

export const deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM addtocart WHERE id=$1 RETURNING *",
      [id]
    );
    res.json({
      message: "Product deleted from cart",
      data: result.rows[0],
    });

    if (result.rows.lenght === 0) {
      res.send("Item not found");
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Add to wishlist

export const addToWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
    console.log(result);
    const checkWishlist = await pool.query(
      "SELECT * FROM wishlist WHERE id = $1",
      [id]
    );
    if (checkWishlist.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Product is already in the wishlist" });
    }
    const wishlist = await pool.query(
      "INSERT INTO wishlist (name , price , image, id) SELECT name , price , image , id FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    res.json({
      message: "Product added to wishlist",
      data: wishlist.rows[0].name,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// get all items from wishlist

export const getWishlist = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM wishlist");
    res.json({
      message: "All items from wishlist",
      data: result.rows,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Search from Wishlist

export const searchWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM wishlist WHERE id=$1", [id]);
    res.json(result.rows);
    if (result.rows.length === 0) {
      return res.json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Delete from wishlist

export const deleteFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteItem = await pool.query(
      "DELETE FROM wishlist WHERE id=$1 RETURNING *",
      [id]
    );

    if (deleteItem.rows.length === 0) {
      return res.json({
        message: "Item not found",
      });
    }
    const result = await pool.query("DELETE FROM wishlist WHERE id=$1", [id]);
    res.json({
      message: "Item deleted from wishlist",
      data: result.rows,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
