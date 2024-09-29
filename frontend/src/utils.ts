function convertToTimeZone(date: Date, timeZone: string): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  // Get the locale-specific date string
  const localeString = date.toLocaleString("id-ID", options);

  // Split the date and time
  const [datePart, timePart] = localeString.split(", ");

  // Return formatted as YYYY-MM-DD HH:mm:ss
  return formatDateString(datePart, timePart);
}

function formatDateString(datePart: string, timePart: string): string {
  // Convert the date part from "DD/MM/YYYY" to "YYYY-MM-DD"
  const [day, month, year] = datePart.split("/");
  const formattedDate = `${year}-${month}-${day}`;

  // Replace time separators and return the final format
  return `${formattedDate} ${timePart.replace(/:/g, ":")}`;
}

export function toLocaleDateTime(
  date: Date | string,
  currency: string
): string {
  // Convert string to Date if necessary
  if (typeof date === "string") {
    date = new Date(date);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided.");
  }

  switch (currency) {
    case "SGD":
      return convertToTimeZone(date, "Asia/Singapore");
    case "HKD":
      return convertToTimeZone(date, "Asia/Hong_Kong"); // Corrected time zone
    case "USD":
      return convertToTimeZone(date, "America/New_York"); // Use a more specific time zone for the US
    default:
      return convertToTimeZone(date, "Asia/Jakarta");
  }
}
