

import React, { useState, useEffect } from 'react';
import { Button, Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
// import SaleOrderForm from './SaleOrderForm.js';
import SaleOrderForm from './SaleOrderForm'
import SaleOrderList from './saleOrderList';
import { getSaleOrders } from '../api/api'; // Ensure correct path

const SaleOrders = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [saleOrders, setSaleOrders] = useState([]);

  const openModal = (data = {}) => {
    setInitialData(data);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  const fetchSaleOrders = async () => {
    const data = await getSaleOrders();
    setSaleOrders(data);
  };

  useEffect(() => {
    fetchSaleOrders();
  }, []);

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
            <Button onClick={() => openModal()} colorScheme="blue">+ Sale Order</Button>
            <SaleOrderList status="active" saleOrders={saleOrders} openModal={openModal} />
          </TabPanel>
          <TabPanel>
            <SaleOrderList status="completed" saleOrders={saleOrders} openModal={openModal} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <SaleOrderForm isOpen={isOpen} onClose={closeModal} initialData={initialData} refreshSaleOrders={fetchSaleOrders} />
    </Box>
  );
};

export default SaleOrders;

