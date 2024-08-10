// src/pages/EditShoes.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getShoesbyId, updateShoes } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditShoes() {
  const { id } = useParams();
  const [shoes, setShoes] = useState({
    id: '',
    name: '',
    sizes: '',
    price: '',
    amount: ''
  });

  useEffect(() => {
    getShoesbyId(id).then(response => {
      setShoes(response.data);
    }).catch(error => {
      console.error('There was an error fetching the shoes data!', error);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoes({
      ...shoes,
      [name]: value,
    });
  };

  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    
    e.preventDefault();
    const confirmed = window.confirm('คุณแน่ใจหรือว่าต้องการแก้ข้อมูลนี้?');

    if (confirmed) {
      updateShoes(id, shoes).then(response => {
        setMessage('อัพเดทข้อมูลสำเร็จ!');
        console.log('Shoes updated:', response.data);
        // Add logic to handle the response, e.g., redirect or show a success message
      }).catch(error => {
        console.error('There was an error updating the shoes!', error);
      });
    } else {
      setMessage('ยกเบิกการอัพเดทข้อมูล!');
    }
  };

  return (
    <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4 text-center">แก้ไขข้อมูล</h2>
        
        {message && <p className="alert alert-info text-center">{message}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">รหัส:</label>
            <input 
              type="text" 
              className="form-control" 
              name="id" 
              value={shoes.id} 
              onChange={handleChange} 
              readOnly 
            />
          </div>
  
          <div className="form-group mb-3">
            <label className="form-label">ชื่อรองเท้า:</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={shoes.name} 
              onChange={handleChange} 
              required 
              placeholder="กรอกชื่อรองเท้า"
            />
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
            <button type="submit" className="btn btn-primary btn-block">อัพเดตข้อมูล</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
}

export default EditShoes;
