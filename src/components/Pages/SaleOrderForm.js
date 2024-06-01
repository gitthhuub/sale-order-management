



import React from 'react';
import { useForm} from 'react-hook-form';
import {useState} from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Button, FormLabel, Input
} from '@chakra-ui/react';
import { addSaleOrder } from '../api/api.js';

const SaleOrderForm = ({ isOpen, onClose, initialData }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialData });
  const [isNavigating, setIsNavigating] = useState(false);

  const onSubmit = async (data) => {
    try{
    await addSaleOrder(data); 
     setIsNavigating(true);
     setTimeout(() => {
      // Redirect to login page
      window.location.href = '/login'; // Replace '/login' with the desired route
    }, 0);
  } catch (error) {
    console.error('Error adding sale order:', error);
  }
} 


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create/Edit Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>Customer ID</FormLabel>
            <Input {...register('customer_id')} required />
            <FormLabel>Invoice No</FormLabel>
            <Input {...register('invoice_no')} required />
            <FormLabel>Invoice Date</FormLabel>
            <Input {...register('invoice_date')} type="date" required />
            <Button type="submit" colorScheme="blue" mt="4">Submit</Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;
