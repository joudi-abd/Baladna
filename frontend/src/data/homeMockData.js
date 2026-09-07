// بيانات وهمية مؤقتة لصفحة الرئيسية
// يمكن استبدالها لاحقًا ببيانات قادمة من API الخاص بـ Laravel
// دون الحاجة لتعديل مكونات العرض (Cards / Sections)

import { canonicalTrips } from "./tripsMockData";

export const services = [
  {
    id: 1,
    icon: "shield",
    title: "ثقة وطمأنينة",
    description:
      "إجراءات مبنية على أسس واضحة وموثوقة، تمنحك الشعور بالراحة في كل خطوة.",
  },
  {
    id: 2,
    icon: "compass",
    title: "وضوح من البداية",
    description:
      "نقدم لك معلومات مختصرة وواضحة لمساعدتك في اختيار ما يناسبك دون تعقيد.",
  },
  {
    id: 3,
    icon: "message",
    title: "توصيات تناسبك",
    description:
      "نقترح عليك حلولًا بناءً على احتياجاتك وتفضيلاتك، وليس فقط الخيارات الأكثر شيوعًا.",
  },
  {
    id: 4,
    icon: "flag",
    title: "رحلات جاهزة",
    description:
      "استمتع برحلات سياحية منظمة وجاهزة، تشمل أبرز الوجهات لتجربة سياحية مميزة.",
  },
];

// لا تتوفر صور حقيقية لهذه الأماكن داخل frontend/assets حاليًا
// لذلك تم استخدام image: null ليعرض الكرت بديل بصري مؤقت (placeholder)
export const featuredPlaces = [
  {
    id: 1,
    name: "حي الشعبان",
    image: null,
    description:
      "حي عريق يجمع بين العمارة القديمة، طابع تاريخي وأجواء مميزة تجمع بين الماضي والحاضر بأسلوب أصيل.",
    tags: ["تاريخي", "حي قديم"],
  },
  {
    id: 2,
    name: "حي الشعبان",
    image: null,
    description:
      "حي عريق يجمع بين العمارة القديمة، طابع تاريخي وأجواء مميزة تجمع بين الماضي والحاضر بأسلوب أصيل.",
    tags: ["تاريخي", "حي قديم"],
  },
  {
    id: 3,
    name: "الجامع الأموي",
    image: null,
    description:
      "معلم إسلامي وتاريخي بارز، يجمع بين روعة العمارة القديمة وأجواء الأصالة في قلب دمشق.",
    tags: ["ديني", "تاريخي"],
  },
];

// بيانات ثابتة الخاصة بصفحة الرئيسية (شارة/مدة/مقاعد/سعر) لا تتطابق رقميًا مع صفحة الرحلات في التصميم المرجعي
// لذلك تبقى هنا كتخصيص فوق الهوية المشتركة القادمة من tripsMockData (العنوان/الوصف/التقييم)
const homeTripOverrides = [
  { badge: "الأكثر حجزاً", badgeType: "popular", duration: "٣٠ يوم", seats: "١٥ مقعد متاح", price: "٤٥٠,٠٠٠" },
  { badge: "الأقل حجزاً", badgeType: "low", duration: "٣٠ يوم", seats: "١٥ مقعد متاح", price: "٤٥٠,٠٠٠" },
  { badge: "جديد", badgeType: "new", duration: "٣٠ يوم", seats: "١٥ مقعد متاح", price: "٤٥٠,٠٠٠" },
];

// لا تتوفر صور حقيقية لهذه الرحلات داخل frontend/assets حاليًا
export const availableTrips = canonicalTrips.map((trip, index) => ({
  id: index + 1,
  // المعرّف الكنسي الحقيقي للرحلة، يُستخدم للربط مع /trips/:id و /booking/:tripId
  tripId: trip.id,
  title: trip.title,
  image: trip.image,
  rating: trip.rating,
  description: trip.description,
  ...homeTripOverrides[index],
}));

// لا تتوفر صور شخصية حقيقية للزوار، لذلك يتم عرض الأحرف الأولى من الاسم كبديل
export const testimonials = [
  {
    id: 1,
    name: "نور موفق",
    role: "زائرة",
    rating: 4,
    comment:
      "كنت مترددة، ولكن Baladna وفرت لي كل التفاصيل وسهلت علي اتخاذ القرار بسهولة وثقة.",
  },
  {
    id: 2,
    name: "سيلينوفيتش سان",
    role: "زائر لأول مرة",
    rating: 4,
    comment:
      "كنت مسافراً وبين أوقاتي القصيرة وضغط العمل، ووجدت في Baladna حلاً مريحاً بسيطاً في كل مرة.",
  },
  {
    id: 3,
    name: "لينا حياني",
    role: "زائرة",
    rating: 5,
    comment:
      "كنت مترددة ولم أكن أعرف أين أبدأ، ولكن Baladna وفرت لي كل التفاصيل وسهلت علي اتخاذ القرار بثقة.",
  },
];
