// المصدر الموحّد لبيانات الرحلات الوهمية المؤقتة
// تُستمد منه بيانات الرحلات المعروضة في: الرئيسية، تفاصيل المكان، وصفحة الرحلات
// حتى لا يتم الاحتفاظ بأكثر من نسخة من نفس محتوى الرحلة على عدة صفحات
// يمكن استبداله لاحقًا ببيانات قادمة من API الخاص بـ Laravel

export const canonicalTrips = [
  {
    id: "trip-idlib-historical",
    title: "رحلة أدلب التاريخية",
    city: "إدلب",
    type: "تاريخي",
    badge: "الأكثر حجزاً",
    badgeType: "popular",
    rating: 4.7,
    image: null,
    description:
      "استمتع بجولة تشمل أبرز المعالم التاريخية والأسواق القديمة، رحلة مميزة تجمع بين الجمال التاريخي والأجواء التراثية الأصيلة.",
    tripDate: "2026-07-15",
    durationDays: 1,
    durationHours: 8,
    availableSeats: 20,
    transportationType: "tour_bus",
    meetingPoint: "وسط المدينة",
    priceSYP: 450000,
    pricePerPersonUSD: 25,
  },
  {
    id: "trip-damascus-old-alleys",
    title: "رحلة دمشق التاريخية",
    city: "دمشق",
    type: "تاريخي",
    badge: "الأكثر حجزاً",
    badgeType: "popular",
    rating: 4.7,
    image: null,
    description:
      "جولة حرة بين أزقة دمشق القديمة وأسواقها التراثية، فرصة مميزة للاستمتاع بالمعالم التاريخية والأجواء الأصيلة.",
    tripDate: "2026-07-15",
    durationDays: 1,
    durationHours: 8,
    availableSeats: 20,
    transportationType: "tour_bus",
    meetingPoint: "وسط المدينة",
    priceSYP: 450000,
    pricePerPersonUSD: 25,
  },
  {
    id: "trip-damascus-umayyad",
    title: "رحلة دمشق التاريخية",
    city: "دمشق",
    type: "ديني",
    badge: "جديد",
    badgeType: "new",
    rating: 4.7,
    image: null,
    description:
      "استمتع بجولة تشمل أبرز المعالم التاريخية والأسواق القديمة في قلب دمشق القديمة وأجواء تراثية أصيلة.",
    tripDate: "2026-07-15",
    durationDays: 1,
    durationHours: 8,
    availableSeats: 20,
    transportationType: "tour_bus",
    meetingPoint: "وسط المدينة",
    priceSYP: 450000,
    pricePerPersonUSD: 25,
  },
];

// شبكة صفحة "الرحلات" (٣ صفوف × نفس الرحلات الثلاث، بأرقام معرّفات مميزة)
export const tripsListing = Array.from({ length: 3 }, (_, row) =>
  canonicalTrips.map((trip) => ({
    ...trip,
    id: `${trip.id}-row${row + 1}`,
  }))
).flat();

export const tripCityOptions = ["إدلب", "دمشق"];

export const tripTypeOptions = ["تاريخي", "ديني", "ثقافي", "طبيعي"];

export const budgetOptions = [
  { value: "under1000", label: "أقل من 1000" },
  { value: "1000-2500", label: "1000 - 2500" },
  { value: "2500-5000", label: "2500 - 5000" },
  { value: "over5000", label: "أكثر من 5000" },
];

export const transportationOptions = [
  { value: "bus", label: "باص" },
  { value: "mini_bus", label: "ميني باص" },
  { value: "train", label: "قطار" },
  { value: "tour_bus", label: "باص سياحي" },
];
