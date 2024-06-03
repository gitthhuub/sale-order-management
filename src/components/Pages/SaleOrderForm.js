


import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Select,
  Box,
  Text,
} from '@chakra-ui/react';

const SaleOrderForm = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weight, setWeight] = useState('');

  const products = [
    { id: 1, name: 'Product 1', price: 100, stock: 104, weight: '1 kg' },
    { id: 2, name: 'Product 2', price: 200, stock: 46, weight: '2 kg' },
    { id: 3, name: 'Product 3', price: 300, stock: 234, weight: '1.5 kg' },
    {id:4, name:'product 4', price:350, stock:345, weight: '2.4 kg'},
    {id:5, name:'product 5', price:400, stock:385, weight: '2.0 kg'},
    {id:6, name:'product 6', price:500, stock:455, weight: '3.4 kg'},
  ];

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    const product = products.find(p => p.id === parseInt(e.target.value));
    if (product) {
      setWeight(product.weight);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (product) {
      console.log({
        product: product.name,
        price: product.price,
        quantity,
        weight,
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product Sale Order</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormLabel>All Products</FormLabel>
            <Select placeholder="Select product" value={selectedProduct} onChange={handleProductChange}>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Select>
            {selectedProduct && (
              <>
                <Box mt={4}>
                  <Text>Sales Price: ₹{products.find(p => p.id === parseInt(selectedProduct)).price}</Text>
                  <Text>Stock: {products.find(p => p.id === parseInt(selectedProduct)).stock} items remaining</Text>
                  <Text>Weight: {weight}</Text>
                </Box>
                <FormLabel mt={4}>Quantity</FormLabel>
                <Input type="number" value={quantity} onChange={handleQuantityChange} />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;

