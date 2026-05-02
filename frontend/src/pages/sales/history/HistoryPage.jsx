import { useMemo } from "react";
import useSales from "@/hooks/useSales";
import SalesHistoryCard from "../components/SalesHistoryCard";

import styles from "@/styles/styles";
import { METHOD_LABELS } from "@/constants/paymentMethods";

import { formatCRC, formatDate, formatTime } from "@/utils/formatters";

function HistoryPage() {
  const { sales } = useSales();

  const sortedSales = useMemo(() => {
    return [...sales].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [sales]);

  return (
    <SalesHistoryCard
      filteredSales={sortedSales}
      methodLabels={METHOD_LABELS}
      styles={styles}
      formatCRC={formatCRC}
      formatDate={formatDate}
      formatTime={formatTime}
    />
  );
}

export default HistoryPage;