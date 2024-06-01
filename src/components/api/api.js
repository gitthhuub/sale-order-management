// import customers from '../data/customers.json';
import customers from '../data/customer.json';
import products from '../data/product.json';
// import products from '../data/products.json';
import saleOrders from '../data/saleOrders.json';

export const getCustomers = async () => {
  return customers;
};

export const getProducts = async () => {
  return products;
};

export const getSaleOrders = async () => {
  return saleOrders;
};

// export const addSaleOrder = async (order) => {
//   saleOrders.push(order);
//   return order;
// };

export const addSaleOrder = async (order) => {
  const updatedSaleOrders = [...saleOrders, order];
  return updatedSaleOrders;
};
