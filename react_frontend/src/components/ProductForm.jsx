import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const ProductForm = ({ show, handleClose, isEdit, productData: initialProductData, onRefreshProducts }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [productData, setProductData] = useState({
    productId: '',
    productName: '',
    productOwnerName: '',
    Developers: [],
    startDate: '',
    methodology: ''
  });

  const formatErrors = (errors) => {
    const formattedErrors = Object.keys(errors).map((key) => {
      return `${key} : ${errors[key].join(', ')}`
    });
    return formattedErrors;
  }

  useEffect(() => {
    if (isEdit) {
      setProductData(initialProductData);
    }
  }, [isEdit, initialProductData]);

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        // API call to update the product
      } else {
        const response = await fetch(`http://localhost:3000/api/product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
  
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
          setErrorMessage(formatErrors(errorData) || 'Failed to create new product.');
        }
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
    <Modal show={show} onHide={handleClose}>
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
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              value={productData.productId}
              onChange={handleChange}
            />
          </Form.Group>
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
            <Form.Label>productOwnerName</Form.Label>
            <Form.Control
              type="text"
              name="productOwnerName"
              value={productData.productOwnerName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Developers</Form.Label>
            <Form.Control
              type="text"
              name="Developers"
              value={productData.Developers}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>startDate</Form.Label>
            <Form.Control
              type="text"
              name="startDate"
              value={productData.startDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>methodology</Form.Label>
            <Form.Control
              type="text"
              name="methodology"
              value={productData.methodology}
              onChange={handleChange}
            />
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
      top: 0, 
      right: 0, 
      zIndex: 9999, 
      maxWidth: '400px'
    }} 
    onClose={() => setShowSuccessAlert(false)} 
    dismissible
  >
    Product successfully created!
  </Alert>
}
  </>
  
  );
};

export default ProductForm;
