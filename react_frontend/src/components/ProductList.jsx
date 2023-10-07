import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { usePersona } from '../controllers/PersonaContext';
import Container from 'react-bootstrap/esm/Container';

function ProductList() {
  const { currentPersona } = usePersona();
  const [products, setProducts] = useState([]); // State for storing products

  useEffect(() => {
    // Define a function to fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Update the products state with fetched data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call the fetchProducts function when the component mounts
  }, []); // The empty dependency array ensures this effect runs only once


  return (
    <Container fluid>
      <h1>List of Products at ECC</h1>
      <p>Total number of products at ECC: {products.length}</p>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Scrum Master</th>
            <th>Product Owner</th>
            <th>Developer Names</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.productOwnerName}</td>
              <td>{product.Developers.join(', ')}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>
              <a href={`https://github.com/bcgov/${product.location}`} target="_blank" rel="noopener noreferrer">
                  {product.location}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductList;
