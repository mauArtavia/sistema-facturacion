import { useEffect, useState } from "react";
import API from "@/services/api";

export default function useReport(startDate, endDate) {
  const [report, setReport] = useState({
    total: 0,
    totalCash: 0,
    totalCard: 0,
    totalSinpe: 0
  });

  const fetchReport = async () => {
    try {
      const res = await API.getReportByRange(startDate, endDate);
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

  return { report, refetchReport: fetchReport };
}