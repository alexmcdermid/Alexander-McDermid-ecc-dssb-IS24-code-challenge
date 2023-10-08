import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, InputGroup } from 'react-bootstrap';

const ProductForm = ({ show, handleClose, isEdit, productData: initialProductData, initialProductLength, onRefreshProducts }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [productData, setProductData] = useState({
    productId: '',
    productName: '',
    scrumMasterName: '',
    productOwnerName: '',
    Developers: Array(5).fill(''),
    startDate: '',
    methodology: ''
  });

  const resetForm = () => {
    setProductData({
      productId: '',
      productName: '',
      scrumMasterName: '',
      productOwnerName: '',
      Developers: Array(5).fill(''),
      startDate: '',
      methodology: ''
    });
    setErrorMessage([]) // remove error messages if any
  };

  const formatErrors = (errors) => {
    const formattedErrors = Object.keys(errors).map((key) => {
      return `${key} : ${errors[key].join(', ')}`
    });
    return formattedErrors;
  }


  useEffect(() => {
    if (!show) {
      resetForm();
    } else {
      if (isEdit) {
        setProductData(initialProductData);
      }
    }
  }, [isEdit, initialProductData, show]);

  const handleSubmit = async () => {
    try {
      let response;
      if (isEdit) {
        response = await fetch(`http://localhost:3000/api/product/${initialProductData.productId}`, {
          method: 'PATCH',
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
        const data = await response.json();
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('Developer')) {
      const index = parseInt(name.replace('Developer', ''), 10);
      const newDevelopers = [...productData.Developers];
      newDevelopers[index] = value;
      setProductData({ ...productData, Developers: newDevelopers, productId: initialProductLength + 1 });
    } else {
      setProductData({ ...productData, [name]: value, productId: initialProductLength + 1 });
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
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Scrum Master</Form.Label>
            <Form.Control
              type="text"
              name="scrumMasterName"
              value={productData.scrumMasterName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Owner</Form.Label>
            <Form.Control
              type="text"
              name="productOwnerName"
              value={productData.productOwnerName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Developer Names</Form.Label>
            <InputGroup className="mb-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Form.Control
                  key={index}
                  aria-label={`Developer ${index + 1}`}
                  name={`Developer${index}`}
                  value={productData.Developers[index] || ''}
                  onChange={handleChange}
                />
              ))}
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="text"
              name="startDate"
              value={productData.startDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Methodology</Form.Label>
            <Form.Select 
              name="methodology" 
              value={productData.methodology} 
              onChange={handleChange}
            >
              <option value="" disabled>Select Methodology</option>
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Form.Select>
          </Form.Group>
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
