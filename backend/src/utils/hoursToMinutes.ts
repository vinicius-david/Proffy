export default function hourToMinutes(fullHour: string): number {
  const [hour, minutes] = fullHour.split(':').map(Number);

  return hour * 60 + minutes;
}
