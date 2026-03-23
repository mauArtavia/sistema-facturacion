let sales = [];

const createSale = (req, res) => {
  const { amount, method } = req.body;

  if (!amount || !method) {
    return res.status(400).json({
      message: "Amount and method are required"
    });
  }

  const newSale = {
    id: sales.length + 1,
    amount,
    method,
    createdAt: new Date()
  };

  sales.push(newSale);

  res.status(201).json(newSale);
};

const getSales = (req, res) => {
  res.json(sales);
};

module.exports = {
  createSale,
  getSales
};
