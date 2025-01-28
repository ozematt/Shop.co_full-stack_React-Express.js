export const getDate = (date: string) => {
  const newDate = new Date(date);
  const mysqlDate =
    newDate.getFullYear() +
    "-" +
    String(newDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(newDate.getDate()).padStart(2, "0") +
    " " +
    String(newDate.getHours()).padStart(2, "0") +
    ":" +
    String(newDate.getMinutes()).padStart(2, "0") +
    ":" +
    String(newDate.getSeconds()).padStart(2, "0");
  return mysqlDate;
};
