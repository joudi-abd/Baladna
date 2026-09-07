// بيانات وهمية مؤقتة لصفحة "حجوزاتي"
// يمكن استبدالها لاحقًا ببيانات قادمة من API الخاص بـ Laravel
// دون الحاجة لتعديل مكونات العرض (BookingCard / BookingStatusTabs)

// أعداد الحجوزات المعروضة في الهيدر (Hero) - قيمة وهمية مستقلة عن طول القوائم أدناه
export const bookingsCounts = {
  upcoming: 8,
  completed: 8,
  cancelled: 8,
};

const baseBooking = {
  reference: "BND-2024-00046",
  // معرّف الرحلة الموحّد (tripsMockData) لربط الحجز بنفس بيانات الرحلة الكنسية
  // تُستخدم مثلاً لعرض معاينة الرحلة داخل نافذة "تقييم الرحلة"
  tripId: "trip-damascus-umayyad",
  title: "رحلة اكتشاف دمشق القديمة",
  image: null,
  rating: 4.7,
  location: "دمشق",
  date: "15 يوليو 2026",
  duration: "يوم كامل",
  type: "رحلة ثقافية",
  transportation: "حافلة سياحية",
  people: 2,
  totalPrice: "300,000",
};

// نولّد عناصر متكررة (بنفس بيانات الشاشة المرجعية) لتفعيل الصفحات (Pagination)
function buildBookings(status, count) {
  return Array.from({ length: count }, (_, index) => ({
    ...baseBooking,
    id: `${status}-${index + 1}`,
    status,
  }));
}

export const bookingsByStatus = {
  upcoming: buildBookings("upcoming", 16),
  completed: buildBookings("completed", 6),
  cancelled: buildBookings("cancelled", 3),
};

export const bookingStatusLabels = {
  upcoming: {
    tabLabel: "الحجوزات القادمة",
    heading: "الحجوزات القادمة",
    subtitle: "الرحلات التي تم تأكيد حجزها ولم يحن موعدها بعد",
    pill: "تم الحجز",
  },
  completed: {
    tabLabel: "الحجوزات المكتملة",
    heading: "الحجوزات المكتملة",
    subtitle: "الرحلات التي أتممتها بنجاح مع Baladna",
    pill: "مكتملة",
  },
  cancelled: {
    tabLabel: "الحجوزات الملغاة",
    heading: "الحجوزات الملغاة",
    subtitle: "الحجوزات التي تم إلغاؤها ولم تكتمل",
    pill: "ملغاة",
  },
};
