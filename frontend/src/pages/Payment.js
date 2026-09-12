import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useParams,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";

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

import {
  FaBuildingColumns,
  FaMoneyBillWave,
} from "react-icons/fa6";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingStepper from "../components/BookingStepper";
import BookingSummary from "../components/BookingSummary";

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

import { apiRequest } from "../api/api";

import "../styles/BookingConfirmation.css";

const NOTES_MAX_LENGTH = 120;

const METHOD_ICONS = {
  shamCash: FiSmartphone,
  bank: FaBuildingColumns,
  cash: FaMoneyBillWave,
};

/*
 * Frontend payment method
 * =>
 * Backend payment method
 */
const PAYMENT_API_METHODS = {
  sham_cash: "sham_cash",
  bank_transfer: "bank_transfer",
  cash: "cash_on_arrival",
};

const Payment = () => {
  const { tripId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const bookingState = location.state;

  /*
   * booking يتم إنشاؤه في BookingConfirmation
   * بعد نجاح POST /bookings
   */
  const booking = bookingState?.booking || null;

  const bookingId =
    booking?.id ||
    bookingState?.bookingId ||
    null;

  /*
   * ==========================================
   * TRIP STATE
   * ==========================================
   */

  const [trip, setTrip] = useState(null);

  const [loadingTrip, setLoadingTrip] =
    useState(true);

  const [tripError, setTripError] =
    useState("");

  /*
   * ==========================================
   * PAYMENT STATE
   * ==========================================
   */

  const [participantCount] = useState(
    bookingState?.participantCount ?? 1
  );

  const [notes, setNotes] = useState(
    bookingState?.notes ?? ""
  );

  const [paymentMethod, setPaymentMethod] =
    useState(PAYMENT_METHODS.SHAM_CASH);

  const [proofFile, setProofFile] =
    useState(null);

  const [fileError, setFileError] =
    useState("");

  const [submitError, setSubmitError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  /*
   * ==========================================
   * GET /trips/{tripId}
   * ==========================================
   */

  useEffect(() => {
    let cancelled = false;

    const fetchTrip = async () => {
      setLoadingTrip(true);
      setTripError("");

      try {
        const response = await apiRequest(
          `/trips/${tripId}`,
          {
            method: "GET",
          }
        );

        console.log(
          "Payment trip response:",
          response
        );

        if (cancelled) return;

        if (!response.ok) {
          setTripError(
            response.data?.message ||
              `فشل تحميل الرحلة (${response.status})`
          );

          setTrip(null);
          return;
        }

        const apiTrip =
          response.data?.data;

        if (!apiTrip) {
          setTripError(
            "لم يتم العثور على بيانات الرحلة."
          );

          setTrip(null);
          return;
        }

        /*
         * Normalize API trip
         */
        const normalizedTrip = {
          ...apiTrip,

          id: apiTrip.id,

          title:
            apiTrip.title ||
            "رحلة بدون اسم",

          description:
            apiTrip.description || "",

          unitPrice:
            Number(apiTrip.price || 0),

          tripDate:
            apiTrip.trip_date || null,

          availableSeats:
            Number(
              apiTrip.available_seats ??
                apiTrip.max_participants ??
                1
            ),

          meetingPoint:
            apiTrip.meeting_point ||
            "غير محددة",

          duration:
            apiTrip.duration || "",

          transportationType:
            apiTrip.transportation_type ||
            "",

          ratingAvg:
            Number(
              apiTrip.rating_avg || 0
            ),

          reviewsCount:
            Number(
              apiTrip.reviews_count || 0
            ),

          coverImage:
            apiTrip.cover_image || null,

          places: Array.isArray(
            apiTrip.places
          )
            ? apiTrip.places
            : [],
        };

        setTrip(normalizedTrip);
      } catch (error) {
        console.error(
          "Failed to load payment trip:",
          error
        );

        if (!cancelled) {
          setTripError(
            error?.message ||
              "تعذر الاتصال بالخادم."
          );

          setTrip(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingTrip(false);
        }
      }
    };

    if (!tripId) {
      setTripError(
        "معرّف الرحلة غير موجود."
      );

      setLoadingTrip(false);
      return;
    }

    fetchTrip();

    return () => {
      cancelled = true;
    };
  }, [tripId]);

  /*
   * ==========================================
   * TOTAL
   * ==========================================
   */

  const totalPrice = useMemo(() => {
    if (!trip) return 0;

    return (
      Number(trip.unitPrice || 0) *
      Number(participantCount || 0)
    );
  }, [trip, participantCount]);

  const formattedDate = useMemo(() => {
    if (!trip?.tripDate) return "";

    return formatBookingDate(
      trip.tripDate
    );
  }, [trip]);

  const selectedMethod =
    paymentMethods.find(
      (method) =>
        method.id === paymentMethod
    );

  /*
   * ==========================================
   * FILE VALIDATION
   * ==========================================
   */

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !PROOF_ACCEPTED_TYPES.includes(
        file.type
      )
    ) {
      setFileError(
        "صيغة الملف غير مدعومة. الصيغ المقبولة: PNG, JPG, PDF"
      );

      setProofFile(null);
      return;
    }

    if (
      file.size >
      PROOF_MAX_FILE_SIZE_MB *
        1024 *
        1024
    ) {
      setFileError(
        `حجم الملف يتجاوز الحد الأقصى المسموح (${PROOF_MAX_FILE_SIZE_MB} ميغابايت)`
      );

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

  /*
   * ==========================================
   * POST /payments
   * ==========================================
   */

  const handleSubmitPayment = async () => {
    setSubmitError("");

    /*
     * Booking ID required
     */
    if (!bookingId) {
      setSubmitError(
        "لم يتم العثور على رقم الحجز. ارجع إلى صفحة تأكيد الحجز وأكمل العملية من جديد."
      );

      return;
    }

    /*
     * Token required
     */
    const token =
      localStorage.getItem("token");

    if (!token) {
      setSubmitError(
        "يجب تسجيل الدخول أولاً لإتمام الدفع."
      );

      return;
    }

    /*
     * Payment method mapping
     */
    const apiPaymentMethod =
      PAYMENT_API_METHODS[
        paymentMethod
      ];

    if (!apiPaymentMethod) {
      setSubmitError(
        "طريقة الدفع غير صالحة."
      );

      return;
    }

    /*
     * Proof required for:
     * sham_cash
     * bank_transfer
     */
    const requiresProof =
      paymentMethod ===
        PAYMENT_METHODS.SHAM_CASH ||
      paymentMethod ===
        PAYMENT_METHODS.BANK_TRANSFER;

    if (requiresProof && !proofFile) {
      setSubmitError(
        "يرجى إرفاق صورة إثبات الدفع قبل الإرسال."
      );

      return;
    }

    setSubmitting(true);

    try {
      /*
       * FormData لأن proof_image ملف
       */
      const formData =
        new FormData();

      formData.append(
        "booking_id",
        String(bookingId)
      );

      formData.append(
        "payment_method",
        apiPaymentMethod
      );

      if (proofFile) {
        formData.append(
          "proof_image",
          proofFile
        );
      }

      console.log(
        "Creating payment for booking:",
        bookingId
      );

      console.log(
        "Payment method:",
        apiPaymentMethod
      );

      console.log(
        "Proof file:",
        proofFile?.name || "none"
      );

      /*
       * apiRequest يتولى:
       * Authorization
       * Accept
       * Content-Type للـ JSON
       *
       * وبما أن body FormData:
       * لا نضع Content-Type يدويًا.
       */
      const response =
        await apiRequest(
          `/payments`,
          {
            method: "POST",

            headers: {
              Accept:
                "application/json",
            },

            body: formData,
          }
        );

      console.log(
        "Payment response:",
        response
      );

      const data =
        response.data;

      console.log(
        "Payment response status:",
        response.status
      );

      console.log(
        "Payment response data:",
        data
      );

      /*
       * Failed
       */
      if (!response.ok) {
        const message =
          data?.message ||
          data?.errors?.booking_id?.[0] ||
          data?.errors?.payment_method?.[0] ||
          data?.errors?.proof_image?.[0] ||
          "تعذر إنشاء عملية الدفع.";

        setSubmitError(message);

        return;
      }

      /*
       * Success
       */
      const payment =
        data?.data || null;

      /*
       * بعد نجاح الدفع:
       * الانتقال إلى صفحة تم الحجز
       */
      navigate(
        "/booking-success",
        {
          replace: true,
          state: {
            payment,
            booking,
            bookingId,
            tripId: trip.id,
            trip,
            participantCount,
            totalPrice,
            paymentMethod,
            notes,
          },
        }
      );
    } catch (error) {
      console.error(
        "Failed to create payment:",
        error
      );

      setSubmitError(
        error?.message ||
          "حدث خطأ أثناء إرسال الدفع."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (loadingTrip) {
    return (
      <>
        <Header />

        <div className="booking-confirmation-error">
          <h2>
            جاري تحميل تفاصيل الرحلة...
          </h2>
        </div>

        <Footer />
      </>
    );
  }

  /*
   * ==========================================
   * ERROR
   * ==========================================
   */

  if (!trip) {
    return (
      <>
        <Header />

        <div className="booking-confirmation-error">
          <h2>
            {tripError ||
              "لم يتم العثور على الرحلة"}
          </h2>

          <Link to="/trips">
            العودة إلى الرحلات
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="booking-confirmation-page">

        <section className="booking-confirmation-top">

          <nav className="breadcrumb booking-confirmation-breadcrumb">

            <Link to="/home">
              الرئيسية
            </Link>

            <Link
              to="/trips"
              className="breadcrumb-pill"
            >
              الرحلات
            </Link>

            <Link
              to={`/trips/${trip.id}`}
              className="breadcrumb-pill"
            >
              تفاصيل الرحلة
            </Link>

            <Link
              to={`/booking/${trip.id}`}
              className="breadcrumb-pill"
            >
              تأكيد الحجز
            </Link>

            <span className="breadcrumb-pill breadcrumb-pill-active">
              الدفع
            </span>

          </nav>

          <div className="booking-title-block">

            <FiMapPin className="booking-title-decoration-icon booking-title-pin" />

            <div
              className="booking-title-decoration-line"
              aria-hidden="true"
            ></div>

            <FiSend className="booking-title-decoration-icon booking-title-plane" />

            <h1>
              عملية إتمام الدفع
            </h1>

            <p>
              اختر طريقة الدفع المناسبة وارسل إثبات الدفع لإكمال عملية حجزك.
            </p>

          </div>

          <BookingStepper activeStep={2} />

        </section>

        <div className="booking-main-grid">

          <BookingSummary
            trip={trip}
            participantCount={
              participantCount
            }
            formattedDate={
              formattedDate
            }
          />

          <section className="booking-info-card">

            <h2 className="booking-card-heading">
              <FiCreditCard /> تفاصيل الدفع
            </h2>

            <div className="payment-amount-panel">
              <strong>
                {formatSYP(totalPrice)}
              </strong>

              <span>
                التكلفة الكلية لهذه الفاتورة
              </span>
            </div>

            <h3 className="booking-field-label">
              طريقة الدفع
            </h3>

            <div
              className="payment-method-options"
              role="radiogroup"
              aria-label="طريقة الدفع"
            >
              {paymentMethods.map(
                (method) => {
                  const Icon =
                    METHOD_ICONS[
                      method.icon
                    ];

                  const isSelected =
                    paymentMethod ===
                    method.id;

                  return (
                    <label
                      key={method.id}
                      className={`payment-method-option ${
                        isSelected
                          ? "is-selected"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={
                          isSelected
                        }
                        disabled={
                          submitting
                        }
                        onChange={() =>
                          setPaymentMethod(
                            method.id
                          )
                        }
                      />

                      <span className="payment-method-icon">
                        <Icon />
                      </span>

                      <span className="payment-method-text">
                        <strong>
                          {method.title}
                        </strong>

                        <span>
                          {
                            method.description
                          }
                        </span>
                      </span>

                    </label>
                  );
                }
              )}
            </div>

            {paymentMethod ===
              PAYMENT_METHODS.SHAM_CASH && (
              <div className="payment-transfer-info">

                <div className="payment-transfer-details">

                  <h4>
                    <FiInfo /> بيانات التحويل على شام كاش
                  </h4>

                  <div className="payment-transfer-field">

                    <span>
                      اسم الحساب :
                    </span>

                    <strong>
                      {
                        shamCashTransferInfo.accountName
                      }
                    </strong>

                  </div>

                  <div className="payment-transfer-field">

                    <span>
                      رمز الحساب :
                    </span>

                    <strong className="payment-transfer-code">
                      {
                        shamCashTransferInfo.accountId
                      }
                    </strong>

                  </div>

                  <p className="payment-transfer-note">
                    يرجى إرسال إثبات بعد إتمام عملية الدفع .
                  </p>

                </div>

                <div className="payment-qr-placeholder">
                  <div
                    className="payment-qr-pattern"
                    aria-hidden="true"
                  ></div>
                </div>

              </div>
            )}

            {paymentMethod ===
              PAYMENT_METHODS.BANK_TRANSFER && (
              <div className="payment-transfer-info payment-transfer-info-single">

                <div className="payment-transfer-details">

                  <h4>
                    <FiInfo /> بيانات التحويل البنكي
                  </h4>

                  {bankTransferInfo ? (
                    <>

                      <div className="payment-transfer-field">

                        <span>
                          اسم البنك :
                        </span>

                        <strong>
                          {
                            bankTransferInfo.bankName
                          }
                        </strong>

                      </div>

                      <div className="payment-transfer-field">

                        <span>
                          رقم الحساب :
                        </span>

                        <strong className="payment-transfer-code">
                          {
                            bankTransferInfo.accountNumber
                          }
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

            {paymentMethod ===
              PAYMENT_METHODS.CASH && (
              <div className="payment-transfer-info payment-transfer-info-single">

                <div className="payment-transfer-details">

                  <p className="payment-transfer-note">
                    يتم الدفع نقدًا عند نقطة التجمع في يوم الرحلة، ولا حاجة لإرفاق إثبات دفع مسبق.
                  </p>

                </div>

              </div>
            )}

            {selectedMethod?.requiresProof && (
              <>
                <h3 className="booking-field-label">
                  إثبات الدفع
                </h3>

                <div className="payment-upload-area">

                  {proofFile ? (
                    <div className="payment-upload-file">

                      <span className="payment-upload-filename">
                        {proofFile.name}
                      </span>

                      <button
                        type="button"
                        onClick={
                          handleRemoveFile
                        }
                        disabled={
                          submitting
                        }
                        aria-label="إزالة الملف"
                        className="payment-upload-remove"
                      >
                        <FiX />
                      </button>

                    </div>
                  ) : (
                    <>

                      <FiUploadCloud className="payment-upload-icon" />

                      <p className="payment-upload-title">
                        ارفع صورة إثبات الدفع
                      </p>

                      <p className="payment-upload-subtitle">
                        يمكنك رفع صورة أو التقاط شاشة PDF, PNG, JPG, JPEG
                      </p>

                      <button
                        type="button"
                        className="payment-upload-button"
                        disabled={
                          submitting
                        }
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                      >
                        اختر ملف
                      </button>

                    </>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={PROOF_ACCEPTED_TYPES.join(
                      ","
                    )}
                    onChange={
                      handleFileChange
                    }
                    disabled={
                      submitting
                    }
                    hidden
                  />

                </div>

                {fileError && (
                  <p className="payment-upload-error">
                    {fileError}
                  </p>
                )}

              </>
            )}

            <h3 className="booking-field-label">
              ملاحظات إضافية (اختياري)
            </h3>

            <textarea
              className="booking-notes-input"
              value={notes}
              maxLength={
                NOTES_MAX_LENGTH
              }
              disabled={submitting}
              placeholder="اكتب الملاحظات التي تود إضافتها مع حجزك"
              onChange={(event) =>
                setNotes(
                  event.target.value
                )
              }
            />

            <div className="booking-notes-counter">
              {NOTES_MAX_LENGTH}/
              {notes.length}
            </div>

            {submitError && (
              <p className="payment-upload-error">
                {submitError}
              </p>
            )}

            <button
              type="button"
              className="btn-confirm-booking"
              onClick={
                handleSubmitPayment
              }
              disabled={submitting}
            >
              {submitting
                ? "جاري إرسال الدفع..."
                : "إرسال الدفع"}
            </button>

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