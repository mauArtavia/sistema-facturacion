import { useState } from "react";
import useReport from "@/hooks/useReport";
import DateRangeCard from "../components/DateRangeCard";
import PieChartCard from "@/components/charts/PieChartCard";

import styles from "@/styles/styles";
import { getPresetRange } from "@/utils/datePresets";
import { formatCRC } from "@/utils/formatters";

function ReportsPage() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { report } = useReport(startDate, endDate);

  const applyPreset = (type) => {
    const range = getPresetRange(type);
    if (!range) return;

    setStartDate(range.start);
    setEndDate(range.end);
  };

  return (
    <div style={styles.column}>
      <DateRangeCard
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        applyPreset={applyPreset}
        report={report}
        styles={styles}
        formatCRC={formatCRC}
      />

      <PieChartCard report={report} styles={styles} />
    </div>
  );
}

export default ReportsPage;