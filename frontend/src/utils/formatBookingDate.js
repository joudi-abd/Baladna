const ARABIC_MONTHS = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

// تنسيق تاريخ موحّد لتدفق الحجز بأكمله (تأكيد الحجز + الدفع)
export function formatBookingDate(isoDate) {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "غير محدد";
  }

  return `${date.getFullYear()} ${ARABIC_MONTHS[date.getMonth()]} ${date.getDate()}`;
}
