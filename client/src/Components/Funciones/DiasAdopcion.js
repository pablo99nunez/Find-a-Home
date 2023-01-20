export const calculateAdoptionDays = (date) => {
  const dateOf = date.slice(0,10)
  const today = new Date().toISOString().slice(0,10)
  const day1 = new Date(today); 
  const day2 = new Date(dateOf);
  const difference= Math.abs(day2-day1);
  const days = difference/(1000 * 3600 * 24)
  return days
}
