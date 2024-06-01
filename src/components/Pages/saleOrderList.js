// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// // import { fetchSaleOrders } from '../api/api';

// import { Box, Button, Text, useColorMode } from '@chakra-ui/react';
// // import SaleOrderModal from './SaleOrderModal';

// const SaleOrderList = ({ status }) => {
//   const { data: saleOrders, isLoading, error } = useQuery(['saleOrders', status], () => fetchSaleOrders(status));
//   const { colorMode } = useColorMode();

//   if (isLoading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error: {error.message}</Text>;

//   return (
//     <Box>
//       {saleOrders.map(order => (
//         <Box
//           key={order.id}
//           p={4}
//           mb={4}
//           borderWidth={1}
//           borderRadius="md"
//           borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
//           bg={colorMode === 'light' ? 'white' : 'gray.800'}
//         >
//           <Text>Invoice No: {order.invoice_no}</Text>
//           <Text>Customer: {order.customer_id}</Text>
//           <Text>Invoice Date: {order.invoice_date}</Text>
//           <SaleOrderModal order={order} readOnly={status === 'completed'} />
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default SaleOrderList;


// import React from 'react';
// import { Box, Text, Button, useDisclosure } from '@chakra-ui/react';
// // import SaleOrderForm from './SaleOrderForm';
// import SaleOrderForm from '../SaleOrderForm';
// import { useQuery } from '@tanstack/react-query';
// import { getSaleOrders } from '../api/api';  // Correct import

// const SaleOrderList = ({ status }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { data: saleOrders, isLoading } = useQuery(['saleOrders', status], getSaleOrders);

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <Box>
//       {saleOrders.filter(order => order.paid === (status === 'completed')).map(order => (
//         <Box key={order.id} p={4} shadow="md" borderWidth="1px">
//           <Text>Order ID: {order.id}</Text>
//           <Text>Customer: {order.customer_profile.name}</Text>
//           <Button onClick={onOpen}>Edit</Button>
//           <SaleOrderForm isOpen={isOpen} onClose={onClose} initialData={order} />
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default SaleOrderList;


// import React, { useEffect, useState } from 'react';
// import { getSaleOrders } from '../api/api';
// import { Box, Text, Spinner } from '@chakra-ui/react';

// const SaleOrderList = ({ isCompleted }) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSaleOrders = async () => {
//       try {
//         const saleOrders = await getSaleOrders();
//         setData(saleOrders);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSaleOrders();
//   }, []);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (error) {
//     return <Text>Error loading sale orders</Text>;
//   }

//   const filteredOrders = data.filter(order => order.paid === isCompleted);

//   return (
//     <Box>
//       {filteredOrders.length === 0 ? (
//         <Text>No {isCompleted ? 'completed' : 'active'} sale orders</Text>
//       ) : (
//         filteredOrders.map(order => (
//           <Box key={order.id} borderWidth="1px" borderRadius="lg" p="4" mb="4">
//             <Text>Invoice No: {order.invoice_no}</Text>
//             <Text>Invoice Date: {order.invoice_date}</Text>
//             <Text>Paid: {order.paid ? 'Yes' : 'No'}</Text>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// };

// export default SaleOrderList;




import React, { useEffect, useState } from 'react';
import { getSaleOrders } from '../api/api';
import { Box, Text, Spinner } from '@chakra-ui/react';

const SaleOrderList = ({ status }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaleOrders = async () => {
      try {
        const saleOrders = await getSaleOrders();
        setData(saleOrders);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleOrders();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error loading sale orders</Text>;
  }

  const isCompleted = status === 'completed';
  const filteredOrders = data.filter(order => order.paid === isCompleted);

  return (
    <Box>
      {filteredOrders.length === 0 ? (
        <Text>No {isCompleted ? 'completed' : 'active'} sale orders</Text>
      ) : (
        filteredOrders.map(order => (
          <Box key={order.id} borderWidth="1px" borderRadius="lg" p="4" mb="4">
            <Text>Invoice No: {order.invoice_no}</Text>
            <Text>Invoice Date: {order.invoice_date}</Text>
            <Text>Paid: {order.paid ? 'Yes' : 'No'}</Text>
          </Box>
        ))
      )}
    </Box>
  );
};

export default SaleOrderList;
