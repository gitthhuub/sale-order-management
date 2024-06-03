
export const getSaleOrders = async () => {
  const response = await fetch('/saleOrders.json');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const orders = await response.json();

  localStorage.setItem('saleOrders', JSON.stringify(orders));
  return orders;
};

export const saveSaleOrders = async (orders) => {
  localStorage.setItem('saleOrders', JSON.stringify(orders));
};
