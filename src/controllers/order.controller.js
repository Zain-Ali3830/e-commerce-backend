import pool from "../db/index.js";

export const addOrder = async (req, res) => {
  try {
    const { id } = req.query;
    const searchItem = await pool.query("SELECT * FROM products WHERE id=$1", [
      id,
    ]);
    console.log(id)
    const checkOrder= await pool.query("SELECT * FROM orders WHERE id=$1", [
      id
    ])
    if(checkOrder.rows.length>0){
      return res.json({
        message:"Product already ordered"
      })
    }
    if (searchItem.rows.length === 0) {
      return res.json({
        message: "Product not found",
      });
    }
    const result = await pool.query(
      "INSERT INTO orders(name,price,image,id) SELECT name,price,image,id FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    res.json({
      message: "Order Placed Successfully",
      data: result.rows[0],
    });
    console.log(result.rows)
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
