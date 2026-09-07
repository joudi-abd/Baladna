// بيانات وهمية مؤقتة لصفحة "استكشاف"
// يمكن استبدالها لاحقًا ببيانات قادمة من API الخاص بـ Laravel
// دون الحاجة لتعديل مكونات العرض (PlaceCard / ExplorationFilters)

export const cityOptions = ["دمشق", "حلب", "حمص", "اللاذقية", "طرطوس"];

export const typeOptions = ["ديني", "تاريخي", "ثقافي", "عائلي", "طبيعي"];

export const ratingOptions = [
  { value: "4.5", label: "٤.٥ فأكثر" },
  { value: "4", label: "٤ فأكثر" },
  { value: "3", label: "٣ فأكثر" },
];

const basePlace = {
  name: "الجامع الأموي",
  city: "دمشق",
  type: "ديني",
  rating: 4.8,
  image: null,
  tags: ["زيارة مجانية", "ثقافي", "عائلي"],
  description:
    "مكان يجمع بين التاريخ والثقافة ويعد من أبرز الوجهات السياحية في دمشق.",
  isFavorite: false,
};

// نولّد عناصر متكررة (بنفس بيانات الشاشة المرجعية) لتفعيل الصفحات (Pagination)
export const places = Array.from({ length: 60 }, (_, index) => ({
  ...basePlace,
  id: index + 1,
}));
