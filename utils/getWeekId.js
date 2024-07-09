export const getWeekId = (date = new Date()) => {
  const startOfWeek = date.getDate() - date.getDay();
  const weekStart = new Date(date.setDate(startOfWeek));
  return `${weekStart.getFullYear()}-${
    weekStart.getMonth() + 1
  }-${weekStart.getDate()}`;
};
