export const getTodayRange = () => {
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  return { start: date, end: date };
};

export const getYesterdayRange = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const date = yesterday.toISOString().split("T")[0];
  return { start: date, end: date };
};

export const getWeekRange = () => {
  const today = new Date();
  const day = today.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: monday.toISOString().split("T")[0],
    end: sunday.toISOString().split("T")[0]
  };
};

export const getMonthRange = () => {
  const today = new Date();

  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return {
    start: firstDay.toISOString().split("T")[0],
    end: lastDay.toISOString().split("T")[0]
  };
};

export const getLast7DaysRange = () => {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 6);

  return {
    start: past.toISOString().split("T")[0],
    end: today.toISOString().split("T")[0]
  };
};

export const getLast30DaysRange = () => {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 29);

  return {
    start: past.toISOString().split("T")[0],
    end: today.toISOString().split("T")[0]
  };
};

export const getPresetRange = (type) => {
  const map = {
    today: getTodayRange,
    yesterday: getYesterdayRange,
    week: getWeekRange,
    month: getMonthRange,
    last7: getLast7DaysRange,
    last30: getLast30DaysRange
  };

  return map[type]?.();
};