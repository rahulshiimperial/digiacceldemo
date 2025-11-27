export const getDaysOfWeek = (currentDate) => {
  const dates = [];
  const curr = new Date(currentDate); 
  const first = curr.getDate() - curr.getDay(); 
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(curr.setDate(first + i));
    dates.push(day);
  }
  return dates; 
};

export const isSameDay = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return date1.getDate() === date2.getDate() && 
         date1.getMonth() === date2.getMonth() && 
         date1.getFullYear() === date2.getFullYear();
};