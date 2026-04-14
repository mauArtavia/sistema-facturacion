// ========================
// FORMATTERS
// ========================

export const formatCRC = (amount) =>
  new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 0
  }).format(amount);

export const formatDate = (date) =>
  new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(date));

export const formatTime = (date) =>
  new Intl.DateTimeFormat("es-CR", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));