/**
 * Calculates the number of interest periods (months) elapsed for a loan.
 * 
 * Rule 1: 1st month added 1 minute after creation.
 * Rule 2: 1 month added on the 1st of every calendar month after creation.
 * 
 * @param {string} createdAt - ISO timestamp of when the loan was added
 * @param {string} applicationDate - Date string from the form (fallback)
 * @returns {number} Number of interest months
 */
export const calculateElapsedInterestMonths = (createdAt, applicationDate) => {
  const now = new Date();
  
  // Use createdAt if available, otherwise fallback to applicationDate at 00:00:00
  const start = createdAt 
    ? new Date(createdAt) 
    : new Date(applicationDate + "T00:00:00");

  if (isNaN(start.getTime())) return 0;
  if (now < start) return 0;

  // RULE 1: Initial month after 1 minute
  let months = 0;
  const oneMinuteMs = 60 * 1000;
  if (now.getTime() >= start.getTime() + oneMinuteMs) {
    months += 1;
  } else {
    // Hasn't even been a minute yet
    return 0;
  }

  // RULE 2: Recurring months on every 1st of the month
  // We count how many "1st of the month" dates exist in the range (start, now]
  let current = new Date(start.getFullYear(), start.getMonth() + 1, 1); // Next 1st of month
  
  while (current <= now) {
    months += 1;
    current.setMonth(current.getMonth() + 1);
  }

  return months;
};

export const calculateMonthlyInterestAmount = (principal, rate) => {
  const p = parseFloat(principal);
  const r = parseFloat(rate);
  if (isNaN(p) || isNaN(r) || r <= 0) return 0;
  return (p * r) / 100;
};
