export function filterSalesByDate(sales, startDate, endDate) {
  return sales.filter((sale) => {
    const saleDate = new Date(sale.createdAt);

    const [y1, m1, d1] = startDate.split("-");
    const start = new Date(y1, m1 - 1, d1, 0, 0, 0);

    const [y2, m2, d2] = endDate.split("-");
    const end = new Date(y2, m2 - 1, d2, 23, 59, 59);

    return saleDate >= start && saleDate <= end;
  });
}