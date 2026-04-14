import API from "../services/api";

export const getSales = () => API.getSales();

export const createSale = (data) => API.createSale(data);

export const getReportByRange = (startDate, endDate) =>
  API.getReportByRange(startDate, endDate);