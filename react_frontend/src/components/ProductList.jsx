import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import { usePersona } from '../controllers/PersonaContext';
import Container from 'react-bootstrap/esm/Container';
import {MdClear} from 'react-icons/md'
import ProductForm from './ProductForm'

// Main ProductList component
function ProductList() {
  // Persona context
  const { currentPersona } = usePersona();

  // State variables
  const [products, setProducts] = useState([]); // List of products
  const [searchQuery, setSearchQuery] = useState(''); // Search query string
  const [showModal, setShowModal] = useState(false); // Show/Hide modal
  const [isEdit, setIsEdit] = useState(false); // Edit/Create mode for modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for edit
  const [isDescending, setIsDescending] = useState(false); // Sort order

  // Helper Functions
  // Function to open create form
  const handleCreate = () => {
    setIsEdit(false);
    setShowModal(true);
  };

  // Function to open edit form
  const handleEdit = (product) => {
    setIsEdit(true);
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Function to close modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to check if the name contains all the words in the query
  const doesNameContainQuery = (name, query) => {
    const nameParts = name.toLowerCase().split(' ');
    const queryParts = query.toLowerCase().split(' ');

    return queryParts.every((queryPart) => 
      nameParts.some((namePart) => namePart.startsWith(queryPart))
    );
  };

  // Function to toggle sort order
  const handleSortToggle = () => {
    const newIsDescending = !isDescending;
    setIsDescending(newIsDescending);
    localStorage.setItem('isDescending', JSON.stringify(newIsDescending));
  };  

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/product');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Logic for filtering products based on persona and query
  let filteredProducts;

  if (searchQuery === ''){
    filteredProducts = products;
  } else if (currentPersona === 'Lisa') {
    // Lisa's search logic (filter by scrumMasterName)
    filteredProducts = products.filter((product) =>
    product.scrumMasterName && doesNameContainQuery(product.scrumMasterName, searchQuery))
  } else if (currentPersona === 'Alan') {
    // Alan's search logic (filter by Developers)
    filteredProducts = products.filter((product) =>
      product.Developers && (
      product.Developers
        .some((name) => doesNameContainQuery(name, searchQuery))
      )
    );
  }

  // Effect for initialization
  useEffect(() => {
    // Set the 'isDescending' flag in local storage
    const isDescendingFromStorage = localStorage.getItem('isDescending');
    if (isDescendingFromStorage) {
      setIsDescending(JSON.parse(isDescendingFromStorage));
    }  

    // Fetch initial product data
    fetchProducts();
  }, []);

  // Final list of products to display
  const displayedProducts = isDescending ? [...filteredProducts].reverse() : filteredProducts;

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
              style={{ minWidth: '220px'}}
            />
            <Button variant="outline-secondary" onClick={() => {setSearchQuery("")}}>
              <MdClear />
            </Button>
            {currentPersona === "Lisa" && <Button onClick={handleCreate} variant='outline-primary'>Create Product</Button>}
          </InputGroup>
        </Container>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>
            Product Number
              <Button 
                variant="btn btn-link" 
                size="sm" 
                className="p-0 ms-1 mb-1"
                onClick={handleSortToggle}>
                {isDescending ? "(↓Desc)" : "(↑Asc)"}
              </Button>
            </th>            
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
          {displayedProducts.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.productOwnerName}</td>
              <td>{product.Developers.filter(Boolean).join(', ')}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>
              <a href={`https://github.com/bcgov/${product.location}`} target="_blank" rel="noopener noreferrer">
                  {product.location}
                </a>
              </td>
              {currentPersona === 'Alan' && (
                <td><Button variant="link" className="pt-0" onClick={() => handleEdit(product)}> Edit</Button></td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      {filteredProducts.length < products.length && <p>Total number of search results: {filteredProducts.length}</p>}
      {/* modal jsx component for create and edit */}
      <ProductForm show={showModal} handleClose={handleClose} isEdit={isEdit} productData={selectedProduct} onRefreshProducts={fetchProducts}/>
    </Container>
  );
}

export default ProductList;
