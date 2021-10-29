export function convertDate(commentDate) {
  const date = new Date(parseInt(commentDate));
  const currentDate = new Date();
  const differenceInYears = currentDate.getFullYear() - date.getFullYear();
  if (differenceInYears === 0) {
    const differenceInDays = currentDate.getDay() - date.getDay();
    if (differenceInDays === 0) {
      const differenceInHours = currentDate.getHours() - date.getHours();
      if (differenceInHours === 0) {
        const differenceInMinuts = currentDate.getMinutes() - date.getMinutes();
        if (differenceInMinuts >= 0 && differenceInMinuts < 5) {
          return "1 минуту назад";
        }
        if (differenceInMinuts >= 5 && differenceInMinuts < 10) {
          return "5 минут назад";
        }
        if (differenceInMinuts >= 10 && differenceInMinuts <= 30) {
          return "10 минут назад";
        }
        return "30 минут назад";
      }
      return `${date.getHours()}: ${date.getMinutes()}`;
    }
    return `${date.getDay()} ${date.toLocaleString("defaut", {
      month: "long",
    })}`;
  }
  return `${date.getFullYear()} . ${
    `${date.getMonth()}` + 1
  } _ ${date.getDate()}`;
}
