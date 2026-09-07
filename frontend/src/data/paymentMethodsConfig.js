// إعدادات وسائل الدفع الخاصة بهذه المرحلة الأمامية فقط
// جميع بيانات الحسابات هنا هي بيانات وهمية للتصميم فقط وليست بيانات حساب فعلية أو منتَجة
// عند ربط الخلفية لاحقًا يجب أن تأتي هذه القيم من إعدادات Laravel وليس من هذا الملف

export const PAYMENT_METHODS = {
  SHAM_CASH: "sham_cash",
  BANK_TRANSFER: "bank_transfer",
  CASH: "cash",
};

export const paymentMethods = [
  {
    id: PAYMENT_METHODS.SHAM_CASH,
    title: "تحويل عبر شام كاش",
    description: "حول المبلغ الى حساب شام كاش التالي",
    icon: "shamCash",
    requiresProof: true,
  },
  {
    id: PAYMENT_METHODS.BANK_TRANSFER,
    title: "تحويل عبر حساب بنكي",
    description: "حول المبلغ الى الحساب البنكي التالي",
    icon: "bank",
    requiresProof: true,
  },
  {
    id: PAYMENT_METHODS.CASH,
    title: "دفع نقدي",
    description: "ادفع المبلغ نقدًا عند نقطة التجمع يوم الرحلة",
    icon: "cash",
    requiresProof: false,
  },
];

// بيانات وهمية (Placeholder) فقط لعرض تصميم لوحة التحويل — وليست حساب شام كاش حقيقي
export const shamCashTransferInfo = {
  accountName: "Baladna Travel",
  accountId: "331e4acdc5e3d9a886d3b057d35a3089",
};

// لم تُوفَّر بيانات حساب بنكي فعلية بعد؛ تُعرض رسالة بديلة صريحة بدل اختلاق رقم حساب
export const bankTransferInfo = null;

export const PROOF_MAX_FILE_SIZE_MB = 5;
export const PROOF_ACCEPTED_TYPES = ["image/png", "image/jpeg", "application/pdf"];
