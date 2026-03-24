let sales = [];

const createSale = (req, res) => {
  console.log("🔥 BODY:", req.body);

  const { amount, method } = req.body;

  if (!amount || !method) {
    return res.status(400).json({
      message: "Amount and method are required"
    });
  }

  const newSale = {
    id: Date.now(),
    amount,
    method,
    createdAt: new Date()
  };

  sales.push(newSale);

  console.log("✅ SALE CREATED");

  res.status(201).json(newSale);
};

const getSales = (req, res) => {
  res.json(sales);
};

// 👇 EXPORTACIÓN CLARA (CLAVE)
module.exports = {
  createSale: createSale,
  getSales: getSales
};