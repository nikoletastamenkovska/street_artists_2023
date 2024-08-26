
export function generateDateLabels(passedDays) {
  let arr = [];

  for (let i = 0; i < passedDays; i++) {
    const now = new Date();

    const startDate = now.getDate();
    const currentDate = now.setDate(startDate - i);

    const formattedDate = formatDate(currentDate);

    arr.push(formattedDate);
  }

  return arr;
}

export function formatDate(dateNumber) {
  const date = new Date(dateNumber);
  return date.toLocaleDateString("en-gb").replace(/\//g, ".");
}
