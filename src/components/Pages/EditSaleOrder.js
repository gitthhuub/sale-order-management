
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react';

const EditSaleOrder = ({ isOpen, onClose, order, status, onSave }) => {
  const [formState, setFormState] = useState({
    id: order.id,
    customerName: order.customer_profile.name,
    customerEmail: order.customer_profile.email,
    price: order.price,
    lastModified: order.last_modified,
  });

  useEffect(() => {
    if (order) {
      setFormState({
        id: order.id,
        customerName: order.customer_profile.name,
        customerEmail: order.customer_profile.email,
        price: order.price,
        lastModified: order.last_modified,
      });
    }
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedOrder = {
      ...order,
      customer_profile: {
        ...order.customer_profile,
        name: formState.customerName,
        email: formState.customerEmail,
      },
      price: formState.price,
      last_modified: formState.lastModified,
    };
    onSave(updatedOrder);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isReadOnly>
            <FormLabel>ID</FormLabel>
            <Input value={formState.id} isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Customer Name</FormLabel>
            <Input
              name="customerName"
              value={formState.customerName}
              onChange={handleInputChange}
              isReadOnly={status === 'completed'}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Customer Email</FormLabel>
            <Input
              name="customerEmail"
              value={formState.customerEmail}
              onChange={handleInputChange}
              isReadOnly={status === 'completed'}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price (₹)</FormLabel>
            <Input
              name="price"
              value={formState.price}
              onChange={handleInputChange}
              isReadOnly={status === 'completed'}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Modified</FormLabel>
            <Input
              name="lastModified"
              value={formState.lastModified}
              onChange={handleInputChange}
              isReadOnly={status === 'completed'}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {status !== 'completed' && (
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditSaleOrder;



