export function groupSales(sales) {
  const grouped = [];

  const sorted = [...sales].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  let currentGroup = [];
  let lastTime = null;

  sorted.forEach((sale) => {
    const saleTime = new Date(sale.createdAt).getTime();

    if (!lastTime || Math.abs(lastTime - saleTime) <= 3000) {
      currentGroup.push(sale);
    } else {
      grouped.push(currentGroup);
      currentGroup = [sale];
    }

    lastTime = saleTime;
  });

  if (currentGroup.length) {
    grouped.push(currentGroup);
  }

  return grouped;
}