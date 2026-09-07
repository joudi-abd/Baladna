// بيانات وهمية مؤقتة لصفحة "تفاصيل الرحلة"
// يمكن استبدالها لاحقًا ببيانات قادمة من API الخاص بـ Laravel عبر معرف الرحلة (id)
// دون الحاجة لتعديل مكونات العرض (TripStatCard / PlaceCard / TestimonialCard)

import { canonicalTrips } from "./tripsMockData";
import { places as explorationPlaces } from "./explorationMockData";
import { testimonials as homeTestimonials } from "./homeMockData";

// بطاقات "الرحلات" في /trips تستخدم معرّفات مثل "trip-xxx-row2"
// نعيدها إلى المعرّف الأساسي لإيجاد الرحلة المطابقة في المصدر الموحّد
function getBaseTripId(id) {
  return String(id).replace(/-row\d+$/, "");
}

// محتوى تفصيلي غني (البرنامج/نقطة التجمع/الأماكن المضمنة) متوفر حاليًا لتصميم مرجعي واحد فقط،
// لذلك يُطبَّق على أي رحلة يتم فتحها، مثلما جرى سابقًا في صفحة تفاصيل المكان
const richDetails = {
  heroTitle: "رحلة اكتشف دمشق القديمة",
  heroSubtitle: "يوم كامل بين التاريخ والثقافة والجمال",
  // قيم رقمية بحتة (وليست نصوصًا منسّقة) ليعاد استخدامها في تدفق الحجز (BookingConfirmation)
  unitPrice: 150000,
  durationLabel: "يوم كامل",
  introDescription:
    "اكتشف قلب دمشق القديمة في رحلة تجمع بين التاريخ وروح المدينة، وتجوّل بين أزقتها العريقة وأسواقها التاريخية. واستمتع بزيارة أبرز معالمها التاريخية والثقافية، في تجربة تأخذك بجولة بين ماضي دمشق وحاضرها.",
  summary: [
    { icon: "duration", label: "مدة الرحلة", value: "رحلة ليوم واحد" },
    { icon: "price", label: "السعر", value: "150.000 ل.س" },
    { icon: "transport", label: "وسيلة النقل", value: "حافلة سياحية" },
    { icon: "participants", label: "المشاركون", value: "حتى 30 شخصاً" },
  ],
  meetingPoint: {
    name: "ساحة الأمويين - دمشق",
    time: "موعد التجمع: 08:30 صباحاً",
  },
  itinerary: [
    { time: "08:30 ص", title: "نقطة التجمع", description: "الانطلاق" },
    { time: "09:00 ص", title: "الجامع الأموي", description: "جولة واستكشاف" },
    { time: "11:30 ص", title: "سوق الحميدية", description: "وقت حر للتسوق" },
    { time: "13:30 م", title: "استراحة الغداء", description: "وقت لراحة وتناول الطعام" },
    { time: "15:30 م", title: "قصر العظم", description: "جولة تعريفية" },
    { time: "17:30 م", title: "العودة", description: "العودة الى نقطة التجمع" },
  ],
};

const includedPlaceIds = explorationPlaces.slice(0, 3).map((place) => place.id);

// نبني تفاصيل الرحلة انطلاقًا من هوية الرحلة (id/title/rating/badge) من المصدر الموحّد،
// مع إبقاء المحتوى الغني (البرنامج/نقطة التجمع/الأماكن المضمنة) موحدًا حاليًا لحين ربط API حقيقي
export function getTripDetails(id) {
  const baseId = getBaseTripId(id);
  const trip = canonicalTrips.find((item) => item.id === baseId);

  if (!trip) {
    return null;
  }

  return {
    ...trip,
    ...richDetails,
    includedPlaces: explorationPlaces.filter((place) =>
      includedPlaceIds.includes(place.id)
    ),
    testimonials: homeTestimonials,
  };
}
