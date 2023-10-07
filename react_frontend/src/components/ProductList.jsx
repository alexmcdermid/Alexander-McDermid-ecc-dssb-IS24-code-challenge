import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { usePersona } from '../controllers/PersonaContext';
import Container from 'react-bootstrap/esm/Container';

function ProductList() {
  const { currentPersona } = usePersona();
  const [products, setProducts] = useState([]); // State for storing products
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let filteredProducts;

  if (currentPersona === 'Lisa') {
    // Lisa's search logic (filter by scrumMasterName)
    filteredProducts = products.filter((product) =>
      product.scrumMasterName
        .toLowerCase()
        .split(' ')
        .some((namePart) => namePart.startsWith(searchQuery.toLowerCase()))
        );
  } else if (currentPersona === 'Alan') {
    // Alan's search logic (filter by Developers)
    filteredProducts = products.filter((product) =>
      product.Developers
        .map((name) => name.toLowerCase())
        .some((name) => name.startsWith(searchQuery.toLowerCase()))
    );
  }

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
        <Container>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">{currentPersona === 'Lisa' ? 'Search by Scrum Master Name' : 'Search by Developer Name'}</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder='Example: Alex McDermid'
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label={currentPersona === 'Lisa' ? 'Search by Scrum Master Name' : 'Search by Developer Name'}
              aria-describedby="basic-addon1"
              style={{ minWidth: '150px'}}
            />
          </InputGroup>
        </Container>
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
            {currentPersona === 'Alan' && (
              <th>Edit</th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
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
              {currentPersona === 'Alan' && (
                <th>Edit</th>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {filteredProducts.length < products.length && <p>Total number of search results: {filteredProducts.length}</p>}
    </Container>
  );
}

export default ProductList;
