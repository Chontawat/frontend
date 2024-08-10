import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getShoes, deleteShoes } from '../services/api';  // Import API functions
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchShoes() {
  const [shoes, setShoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = () => {
    getShoes().then(response => {
      setShoes(response.data);
    }).catch(error => {
      console.error('There was an error fetching the shoes!', error);
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('คุณแน่ใจหรือว่าต้องการลบข้อมูลนี้?');
  
    if (confirmed) {
      try {
        await deleteShoes(id);
        setMessage('ลบข้อมูลสำเร็จ!');
        fetchShoes();  // Refresh the shoe list after deletion
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบข้อมูล!', error);
        setMessage('Error deleting shoes!');
      }
    } else {
      setMessage('การลบถูกยกเลิก');
    }
  };

  const filteredShoes = shoes.filter(shoe =>
    shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shoe.id.toString().includes(searchTerm)
  );

  return (
    <div className="container mt-5">
  <h2 className="mb-4 text-center">รายการรองเท้า</h2>
  
  <div className="input-group mb-4">
    <input
      type="text"
      className="form-control"
      placeholder="ค้นหารองเท้า"
      value={searchTerm}
      onChange={handleSearch}
    />  
  </div>

  {message && <p className="alert alert-info text-center">{message}</p>}

  <ul className="list-group">
    {filteredShoes.map((shoe) => (
      <li key={shoe.id} className="list-group-item">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-2">
              <i className="fas fa-shoe-prints"></i> {shoe.name} (รหัส: {shoe.id})
            </h5>
            <p className="mb-1"><strong>ไซส์รองเท้า:</strong> {shoe.sizes}</p>
            <p className="mb-1"><strong>ราคา:</strong> {shoe.price.toLocaleString()} บาท</p>
            <p className="mb-1"><strong>จำนวน:</strong> {shoe.amount} คู่</p>
          </div>
          <div>
            <Link to={`/edit-shoes/${shoe.id}`} className="btn btn-primary btn-sm mr-2">
              <i className="fas fa-edit"></i> Edit
            </Link>
            <button onClick={() => handleDelete(shoe.id)} className="btn btn-danger btn-sm">
              <i className="fas fa-trash-alt"></i> Delete
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
 

}

export default SearchShoes;
