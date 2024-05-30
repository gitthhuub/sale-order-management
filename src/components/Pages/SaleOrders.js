import React from 'react';
import { Button, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {useAuth} from '../hooks/useAuth';
// import SaleOrderForm from '../components/SaleOrderForm';
import { useState } from 'react';
import SaleOrderForm from '../SaleOrderForm';

const SaleOrders = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <Box>
      <Button onClick={logout} colorScheme="red" mt="4">Logout</Button>
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Button onClick={openModal} colorScheme="blue">+ Sale Order</Button>
          
          </TabPanel>
          <TabPanel>
          
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SaleOrderForm isOpen={isOpen} onClose={closeModal} initialData={{}} />
    </Box>
  );
};

export default SaleOrders;
