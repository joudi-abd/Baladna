import React, { useMemo, useRef, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  FiMapPin,
  FiSend,
  FiCreditCard,
  FiSmartphone,
  FiUploadCloud,
  FiX,
  FiShield,
  FiInfo,
} from "react-icons/fi";
import { FaBuildingColumns, FaMoneyBillWave } from "react-icons/fa6";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingStepper from "../components/BookingStepper";
import BookingSummary from "../components/BookingSummary";

import { getTripDetails } from "../data/tripDetailsMockData";
import {
  paymentMethods,
  PAYMENT_METHODS,
  shamCashTransferInfo,
  bankTransferInfo,
  PROOF_MAX_FILE_SIZE_MB,
  PROOF_ACCEPTED_TYPES,
} from "../data/paymentMethodsConfig";
import { formatSYP } from "../utils/formatCurrency";
import { formatBookingDate } from "../utils/formatBookingDate";

import "../styles/BookingConfirmation.css";

const NOTES_MAX_LENGTH = 120;

const METHOD_ICONS = {
  shamCash: FiSmartphone,
  bank: FaBuildingColumns,
  cash: FaMoneyBillWave,
};

const Payment = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const trip = useMemo(() => getTripDetails(tripId), [tripId]);

  // بيانات الحجز القادمة من صفحة "تأكيد الحجز"، مع قيم افتراضية آمنة
  // في حال الدخول المباشر لهذا الرابط أو فقدان حالة التنقّل بعد التحديث
  const bookingState = location.state;
  const [participantCount] = useState(bookingState?.participantCount ?? 1);
  const [notes, setNotes] = useState(bookingState?.notes ?? "");

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.SHAM_CASH);
  const [proofFile, setProofFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!trip) {
    return (
      <>
        <Header />

        <div className="booking-confirmation-error">
          <h2>لم يتم العثور على الرحلة</h2>
          <Link to="/trips">العودة إلى الرحلات</Link>
        </div>

        <Footer />
      </>
    );
  }

  // السعر يُشتق دائمًا من سعر الرحلة الموحّد × عدد المشاركين، ولا يُعتمد على أي قيمة إجمالية محفوظة مسبقًا
  const totalPrice = trip.unitPrice * participantCount;
  const formattedDate = formatBookingDate(trip.tripDate);

  const selectedMethod = paymentMethods.find((method) => method.id === paymentMethod);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!PROOF_ACCEPTED_TYPES.includes(file.type)) {
      setFileError("صيغة الملف غير مدعومة. الصيغ المقبولة: PNG, JPG, PDF");
      setProofFile(null);
      return;
    }

    if (file.size > PROOF_MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`حجم الملف يتجاوز الحد الأقصى المسموح (${PROOF_MAX_FILE_SIZE_MB} ميغابايت)`);
      setProofFile(null);
      return;
    }

    setFileError("");
    setSubmitError("");
    setProofFile(file);
  };

  const handleRemoveFile = () => {
    setProofFile(null);
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitPayment = () => {
    if (selectedMethod.requiresProof && !proofFile) {
      setSubmitError("يرجى إرفاق صورة إثبات الدفع قبل الإرسال.");
      return;
    }

    setSubmitError("");
    setSubmitted(true);
  };

  return (
    <>
      <Header />

      <main className="booking-confirmation-page">

        {/* =========================
            TOP: BREADCRUMB + TITLE + STEPPER
        ========================= */}

        <section className="booking-confirmation-top">

          <nav className="breadcrumb booking-confirmation-breadcrumb">
            <Link to="/home">الرئيسية</Link>

            <Link to="/trips" className="breadcrumb-pill">
              الرحلات
            </Link>

            <Link to={`/trips/${trip.id}`} className="breadcrumb-pill">
              تفاصيل الرحلة
            </Link>

            <Link to={`/booking/${trip.id}`} className="breadcrumb-pill">
              تأكيد الحجز
            </Link>

            <span className="breadcrumb-pill breadcrumb-pill-active">
              الدفع
            </span>
          </nav>

          <div className="booking-title-block">
            <FiMapPin className="booking-title-decoration-icon booking-title-pin" />

            <div className="booking-title-decoration-line" aria-hidden="true"></div>

            <FiSend className="booking-title-decoration-icon booking-title-plane" />

            <h1>عملية إتمام الدفع</h1>
            <p>اختر طريقة الدفع المناسبة وارسل إثبات الدفع لإكمال عملية حجزك.</p>
          </div>

          <BookingStepper activeStep={2} />

        </section>

        {/* =========================
            MAIN GRID
        ========================= */}

        <div className="booking-main-grid">

          <BookingSummary
            trip={trip}
            participantCount={participantCount}
            formattedDate={formattedDate}
          />

          {/* =========================
              PAYMENT DETAILS
          ========================= */}

          <section className="booking-info-card">

            <h2 className="booking-card-heading">
              <FiCreditCard /> تفاصيل الدفع
            </h2>

            <div className="payment-amount-panel">
              <strong>{formatSYP(totalPrice)}</strong>
              <span>التكلفة الكلية لهذه الفاتورة</span>
            </div>

            <h3 className="booking-field-label">طريقة الدفع</h3>

            <div className="payment-method-options" role="radiogroup" aria-label="طريقة الدفع">
              {paymentMethods.map((method) => {
                const Icon = METHOD_ICONS[method.icon];
                const isSelected = paymentMethod === method.id;

                return (
                  <label
                    key={method.id}
                    className={`payment-method-option ${isSelected ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={isSelected}
                      onChange={() => setPaymentMethod(method.id)}
                    />

                    <span className="payment-method-icon">
                      <Icon />
                    </span>

                    <span className="payment-method-text">
                      <strong>{method.title}</strong>
                      <span>{method.description}</span>
                    </span>
                  </label>
                );
              })}
            </div>

            {paymentMethod === PAYMENT_METHODS.SHAM_CASH && (
              <div className="payment-transfer-info">
                <div className="payment-transfer-details">
                  <h4>
                    <FiInfo /> بيانات التحويل على شام كاش
                  </h4>

                  <div className="payment-transfer-field">
                    <span>اسم الحساب :</span>
                    <strong>{shamCashTransferInfo.accountName}</strong>
                  </div>

                  <div className="payment-transfer-field">
                    <span>رمز الحساب :</span>
                    <strong className="payment-transfer-code">
                      {shamCashTransferInfo.accountId}
                    </strong>
                  </div>

                  <p className="payment-transfer-note">
                    يرجى إرسال إثبات بعد إتمام عملية الدفع .
                  </p>
                </div>

                <div className="payment-qr-placeholder">
                  <div className="payment-qr-pattern" aria-hidden="true"></div>
                </div>
              </div>
            )}

            {paymentMethod === PAYMENT_METHODS.BANK_TRANSFER && (
              <div className="payment-transfer-info payment-transfer-info-single">
                <div className="payment-transfer-details">
                  <h4>
                    <FiInfo /> بيانات التحويل البنكي
                  </h4>

                  {bankTransferInfo ? (
                    <>
                      <div className="payment-transfer-field">
                        <span>اسم البنك :</span>
                        <strong>{bankTransferInfo.bankName}</strong>
                      </div>

                      <div className="payment-transfer-field">
                        <span>رقم الحساب :</span>
                        <strong className="payment-transfer-code">
                          {bankTransferInfo.accountNumber}
                        </strong>
                      </div>
                    </>
                  ) : (
                    <p className="payment-transfer-note">
                      سيتم توفير بيانات الحساب البنكي هنا.
                    </p>
                  )}
                </div>
              </div>
            )}

            {paymentMethod === PAYMENT_METHODS.CASH && (
              <div className="payment-transfer-info payment-transfer-info-single">
                <div className="payment-transfer-details">
                  <p className="payment-transfer-note">
                    يتم الدفع نقدًا عند نقطة التجمع في يوم الرحلة، ولا حاجة لإرفاق إثبات دفع مسبق.
                  </p>
                </div>
              </div>
            )}

            {selectedMethod.requiresProof && (
              <>
                <h3 className="booking-field-label">إثبات الدفع</h3>

                <div className="payment-upload-area">
                  {proofFile ? (
                    <div className="payment-upload-file">
                      <span className="payment-upload-filename">{proofFile.name}</span>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        aria-label="إزالة الملف"
                        className="payment-upload-remove"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUploadCloud className="payment-upload-icon" />

                      <p className="payment-upload-title">ارفع صورة إثبات الدفع</p>

                      <p className="payment-upload-subtitle">
                        يمكنك رفع صورة أو التقاط شاشة PDF, PNG, JPG, JPEG
                      </p>

                      <button
                        type="button"
                        className="payment-upload-button"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        اختر ملف
                      </button>
                    </>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={PROOF_ACCEPTED_TYPES.join(",")}
                    onChange={handleFileChange}
                    hidden
                  />
                </div>

                {fileError && <p className="payment-upload-error">{fileError}</p>}
              </>
            )}

            <h3 className="booking-field-label">ملاحظات إضافية (اختياري)</h3>

            <textarea
              className="booking-notes-input"
              value={notes}
              maxLength={NOTES_MAX_LENGTH}
              placeholder="اكتب الملاحظات التي تود إضافتها مع حجزك"
              onChange={(event) => setNotes(event.target.value)}
            />

            <div className="booking-notes-counter">
              {NOTES_MAX_LENGTH}/{notes.length}
            </div>

            {submitError && <p className="payment-upload-error">{submitError}</p>}

            {submitted ? (
              <div className="payment-submitted-notice">
                تم استلام طلب الدفع الخاص بك، وسيتم التحقق منه يدويًا خلال 24 ساعة عمل.
              </div>
            ) : (
              <button
                type="button"
                className="btn-confirm-booking"
                onClick={handleSubmitPayment}
              >
                إرسال الدفع
              </button>
            )}

            <p className="payment-verification-notice">
              <FiShield /> يتم التحقق من الدفع خلال 24 ساعة عمل.
            </p>

          </section>

        </div>

      </main>

      <Footer />
    </>
  );
};

export default Payment;
