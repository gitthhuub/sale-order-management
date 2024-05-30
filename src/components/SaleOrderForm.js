import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Button, FormLabel, Input
} from '@chakra-ui/react';

const SaleOrderForm = ({ isOpen, onClose, initialData }) => {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });

  const onSubmit = (data) => {
    
    console.log(data);
    
  };

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
            {/* Add other form fields as needed */}
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
