const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  const marked = []
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  dates.forEach(day => {
  marked[day] = {
    marked: true,
    color: "red",
  };
});

  return marked;
};