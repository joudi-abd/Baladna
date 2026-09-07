// بيانات وهمية مؤقتة لصفحة "تفاصيل المكان"
// يمكن استبدالها لاحقًا ببيانات قادمة من API الخاص بـ Laravel عبر معرف المكان (id)
// دون الحاجة لتعديل مكونات العرض (TripCard / PlaceCard / TestimonialCard)

import { places as explorationPlaces } from "./explorationMockData";
import { canonicalTrips } from "./tripsMockData";
import { testimonials } from "./homeMockData";

// نحوّل الرحلات من المصدر الموحّد (tripsMockData) إلى الشكل الذي يتوقعه TripCard
// بدل الاحتفاظ بنسخة منفصلة من نفس محتوى الرحلات (العنوان/الوصف/التقييم/الشارة)
// أرقام المدة/المقاعد/السعر هنا خاصة بهذه الصفحة (تختلف عن أرقام صفحة الرحلات في التصميم المرجعي)
function toTripCardShape(trip) {
  return {
    id: trip.id,
    title: trip.title,
    description: trip.description,
    cover_image: trip.image,
    rating_avg: trip.rating,
    trip_date: "2026-07-15",
    duration: 30,
    available_seats: 15,
    transportation_type: "tour_bus",
    price: 450000,
    status: "upcoming",
    badgeLabel: trip.badge,
  };
}

const featureIcons = {
  family: "مناسب للعائلة",
  walk: "مريح للمشي",
  cost: "تكلفة منخفضة",
  time: "زيارة قصيرة",
};

const placeDetails = {
  name: "حي الشعلان - دمشق",
  city: "دمشق",
  // لا تتوفر صور حقيقية لحي الشعلان داخل frontend/assets حاليًا
  images: [null, null, null, null, null, null, null, null],
  description:
    "يُعد حي الشعلان من أشهر أحياء دمشق الحديثة، ويقع في قلب المدينة الحيوية، جامعًا بين الحيوية العصرية والطابع الدمشقي الأنيق. يتميز بشوارعه النابضة بالحياة، ومبانيه ذات الطابع الكلاسيكي، إضافةً إلى تنوّع كبير في المحال التجارية والمقاهي والمطاعم.\n\nيُعتبر الشعلان وجهة مثالية للتسوّق والتنزّه، حيث تنتشر فيه المتاجر المحلية والعلامات المعروفة، إلى جانب مقاهٍ هادئة تناسب الجلسات العائلية والقاءات الودية، كما يتميّز الحي بسهولة الوصول وقربه من عدة مناطق حيوية في دمشق.\n\nسواء كنت تبحث عن تجربة تسوّق ممتعة، أو نزهة خفيفة في شوارع أنيقة، أو استراحة في مقهى فإن الشعلان يقدّم تجربة متوازنة تجمع بين الراحة والأناقة وروح المدينة.",
  features: [
    { icon: "family", label: featureIcons.family },
    { icon: "walk", label: featureIcons.walk },
    { icon: "cost", label: featureIcons.cost },
    { icon: "time", label: featureIcons.time },
  ],
  relatedTrips: canonicalTrips.map(toTripCardShape),
  testimonials: testimonials,
  relatedPlaces: explorationPlaces.slice(0, 3),
};

// نبني تفاصيل المكان انطلاقًا من هوية المكان (id/name/city/image) عند توفرها في بيانات الاستكشاف،
// مع إبقاء محتوى العرض الغني (الوصف/المميزات/الرحلات المرتبطة) موحدًا حاليًا لحين ربط API حقيقي
export function getPlaceDetails(id) {
  const basePlace = explorationPlaces.find(
    (place) => String(place.id) === String(id)
  );

  return {
    id: basePlace?.id ?? Number(id) ?? 1,
    ...placeDetails,
  };
}
