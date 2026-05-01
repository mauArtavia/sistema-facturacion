export function groupSales(sales) {
  const groups = new Map();

  sales.forEach((sale) => {
    if (!sale.transactionId) return;

    if (!groups.has(sale.transactionId)) {
      groups.set(sale.transactionId, []);
    }

    groups.get(sale.transactionId).push(sale);
  });

  return Array.from(groups.values()).sort((a, b) => {
    return new Date(b[0].createdAt) - new Date(a[0].createdAt);
  });
}