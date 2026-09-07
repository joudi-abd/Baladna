// أداة تنسيق موحّدة للمبالغ المالية (ل.س) تُستخدم في تدفق الحجز
// تبقي القيم الرقمية هي مصدر الحقيقة، والتنسيق فقط للعرض
export function formatSYP(amount) {
  return `${Number(amount).toLocaleString("en-US")} ل.س`;
}
