import pool from "../db/index.js";

export const addOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const quantity = req.body.quantity;
    const searchItem = await pool.query("SELECT * FROM products WHERE id=$1", [
      id,
    ]);
    if (searchItem.rows.length === 0) {
      return res.json({
        message: "Product not found",
      });
    }
    const totalPrice = searchItem.rows[0].price * quantity;
    const result = await pool.query(
      "INSERT INTO orders(name,price,image,id,t_price) SELECT name,price,image,id,$1 FROM products WHERE id=$2 RETURNING *",
      [totalPrice, id]
    );
    res.json({
      message: "Order created",
      data: result.rows[0],
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Cancel Order

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM orders WHERE id=$1 RETURNING *",
      [id]
    );
    res.json({
      message: "Order cancelled",
      data: result.rows[0],
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// Get all orders

export const getOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders");
    res.json({
      message: "All orders",
      data: result.rows,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
