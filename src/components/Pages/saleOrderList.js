

import React, { useEffect, useState } from 'react';
import { getSaleOrders, saveSaleOrders } from '../api/api';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
// import { EditIcon } from '@chakra-ui/icons';
import EditSaleOrder from './EditSaleOrder';

import { createIcon } from "@chakra-ui/icons";

const ThreeDotsIcon = createIcon({
  displayName: 'ThreeDotsIcon',
  viewBox: '0 0 24 24',
  path: (
    <g fill="white">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </g>
  ),
});

const SaleOrderList = ({ status }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getSaleOrders();
        setOrders(result);
      } catch (error) {
        setErr(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSave = async (updatedOrder) => {
    const updatedOrders = orders.map((order) =>
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(updatedOrders);
    await saveSaleOrders(updatedOrders);
  };

  if (loading) {
    return <Spinner />;
  }

  if (err) {
    return <Text>Error loading sale orders: {err.message}</Text>;
  }

  const filteredOrders = orders.filter(order =>
    status === 'completed' ? order.paid : !order.paid
  );

  return (
    <Box>
      {filteredOrders.length === 0 ? (
        <Text>No {status === 'completed' ? 'completed' : 'active'} sale orders</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer Name</Th>
              <Th>Email</Th>
              <Th>Price (₹)</Th>
              <Th>Last Modified</Th>
              <Th>Edit/View</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredOrders.map(order => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>
                  {order.customer_profile ? (
                    <Box display="flex" alignItems="center">
                      <Avatar name={order.customer_profile.name} src={order.customer_profile.profile_pic} size="sm" />
                      <Box ml="3">
                        <Text fontWeight="bold">{order.customer_profile.name}</Text>
                        <Text fontSize="sm">{order.customer_profile.email}</Text>
                      </Box>
                    </Box>
                  ) : (
                    <Text>No customer profile</Text>
                  )}
                </Td>
                <Td>{order.customer_profile.email}</Td>
                <Td>₹{order.price}</Td>
                <Td>{new Date(order.last_modified).toLocaleString()}</Td>
                <Td>
                  <Menu>
                    <MenuButton as={IconButton} icon={<ThreeDotsIcon />} />
                    <MenuList>
                      <MenuItem onClick={() => handleEditClick(order)}>Edit/View</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {editModalOpen && selectedOrder && (
        <EditSaleOrder
          isOpen={editModalOpen}
          onClose={handleModalClose}
          order={selectedOrder}
          status={status}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default SaleOrderList;
