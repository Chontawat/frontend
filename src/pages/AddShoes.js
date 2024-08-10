import React, { useState } from "react";
import { addShoes } from "../services/api"; // Import the addShoes function

function AddShoes() {
  const [shoes, setShoes] = useState({
    name: "",
    sizes: "",
    price: "",
    amount: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoes((prevShoes) => ({
      ...prevShoes,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm("คุณแน่ใจหรือว่าต้องการเพิ่มข้อมูลนี้?");

    if (confirmed) {
      try {
        await addShoes(shoes); // Use the addShoes function from the api.js file
        setMessage("เพิ่มข้อมูลสำเร็จ!");
        setShoes({
          name: "",
          sizes: "",
          price: "",
          amount: "",
        });
      } catch (error) {
        console.error("There was an error adding the shoes!", error);
        setMessage("Error adding shoes!");
      }
    } else {
      setMessage("การเพิ่มข้อมูลถูกยกเลิก");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">เพิ่มข้อมูล</h2>

          {message && <p className="alert alert-info text-center">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">ชื่อรองเท้า:</label>
              <input type="text" className="form-control" name="name" value={shoes.name} onChange={handleChange} required placeholder="กรอกชื่อรองเท้า"/>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">ไซส์รองเท้า:</label>
              <input
                type="text"
                className="form-control"
                name="sizes"
                value={shoes.sizes}
                onChange={handleChange}
                required
                placeholder="กรอกไซส์รองเท้า"
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">ราคา (บาท):</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={shoes.price}
                onChange={handleChange}
                required
                placeholder="กรอกราคา"
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label">จำนวน (คู่):</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={shoes.amount}
                onChange={handleChange}
                required
                placeholder="กรอกจำนวนคู่"
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-block">
                เพิ่มข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddShoes;
