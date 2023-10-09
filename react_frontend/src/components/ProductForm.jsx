import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, InputGroup } from 'react-bootstrap';

const ProductForm = ({ show, handleClose, isEdit, productData: initialProductData, onRefreshProducts }) => {
  // State variables
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [productData, setProductData] = useState({
    productId: '',
    productName: '',
    scrumMasterName: '',
    productOwnerName: '',
    Developers: Array(5).fill(''),
    startDate: '',
    methodology: '',
    location: ''
  });

  // Helper Functions
  // Resets form to default state
  const resetForm = () => {
    setProductData({
      productId: '',
      productName: '',
      scrumMasterName: '',
      productOwnerName: '',
      Developers: Array(5).fill(''),
      startDate: '',
      methodology: '',
      location: ''
    });
    setErrorMessage([]) // remove error messages if any
  };

  // Function to format errors for display
  const formatErrors = (errors) => {
    const formattedErrors = Object.keys(errors).map((key) => {
      return `${key} : ${errors[key].join(', ')}`
    });
    return formattedErrors;
  }

  // Effect for initialization
  useEffect(() => {
    // Resets the form on modal close or sets data when editing
    if (!show) {
      resetForm();
    } else {
      if (isEdit) {
        setProductData(initialProductData);
      }
    }
  }, [isEdit, initialProductData, show]);

  // Event Handlers
  // Handles form submission
  const handleSubmit = async () => {
    try {
      let response;
      if (isEdit) {
        response = await fetch(`http://localhost:3000/api/product/${initialProductData.productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      } else {
        response = await fetch(`http://localhost:3000/api/product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      }
  
      if (response.ok) {
        onRefreshProducts(); // Refresh the product list in the parent component
        setShowSuccessAlert(true);  
        setTimeout(() => {
          setShowSuccessAlert(false); // Hide success alert after 5 seconds
        }, 5000);
  
        handleClose();
      } else {
        const errorData = await response.json();
        setErrorMessage(formatErrors(errorData) || 'Failed to create or update the product.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    }
  };  
  
  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('Developer')) {
      const index = parseInt(name.replace('Developer', ''), 10);
      const newDevelopers = [...productData.Developers];
      newDevelopers[index] = value;
      setProductData({ ...productData, Developers: newDevelopers });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  return (
    <>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Product' : 'Create Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage.length > 0 && (
          <ol className='alert alert-danger' style={{ paddingLeft: '2em' }}>
            {errorMessage.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ol>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="productName">Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              id="productName"
              value={productData.productName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="scrumMasterName">Scrum Master</Form.Label>
            <Form.Control
              type="text"
              name="scrumMasterName"
              id="scrumMasterName"
              value={productData.scrumMasterName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="productOwnerName">Product Owner</Form.Label>
            <Form.Control
              type="text"
              name="productOwnerName"
              id="productOwnerName"
              value={productData.productOwnerName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="Developer1">Developer Names</Form.Label>
            <InputGroup className="mb-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Form.Control
                  key={index}
                  aria-label={`Developer ${index + 1}`}
                  name={`Developer${index}`}
                  id={`Developer${index}`}
                  value={productData.Developers[index] || ''}
                  onChange={handleChange}
                />
              ))}
            </InputGroup>
          </Form.Group>
          {!isEdit && 
            <Form.Group className="mb-3">
              <Form.Label htmlFor="startDate">Start Date</Form.Label>
              <Form.Control
                type="text"
                name="startDate"
                id="startDate"
                value={productData.startDate}
                onChange={handleChange}
              />
            </Form.Group>
          }
          <Form.Group className="mb-3">
            <Form.Label htmlFor="methodology">Methodology</Form.Label>
            <Form.Select 
              name="methodology" 
              id="methodology"
              value={productData.methodology} 
              onChange={handleChange}
            >
              <option value="" disabled>Select Methodology</option>
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Form.Select>
          </Form.Group>
          {isEdit && 
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>https://github.com/bcgov/</InputGroup.Text>
                  <Form.Control
                          type="text"
                          name="location"
                          value={productData.location}
                          onChange={handleChange}
                        />
              </InputGroup>
            </Form.Group>
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
    {showSuccessAlert && 
      <Alert 
        variant="success" 
        style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          zIndex: 9999, 
          maxWidth: '300px',
        }} 
        onClose={() => setShowSuccessAlert(false)} 
        dismissible>
        Product successfully created!
      </Alert>
    }
  </>
  
  );
};

export default ProductForm;
