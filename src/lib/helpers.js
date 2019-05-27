export function formatTime(seconds) {
  const displaySeconds = seconds % 60;
  const displayMinutes = (seconds - displaySeconds) / 60;

  return `${padNumber(displayMinutes)}:${padNumber(displaySeconds)}`;
}

function padNumber(number) {
  const stringNumber = String(number);
  return stringNumber.length > 1 ? stringNumber : `0${stringNumber}`;
}
