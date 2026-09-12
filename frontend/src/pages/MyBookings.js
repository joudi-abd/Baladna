import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FiSliders } from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingsHero from "../components/BookingsHero";
import BookingStatusTabs from "../components/BookingStatusTabs";
import BookingCard from "../components/BookingCard";
import Pagination from "../components/Pagination";
import TripReviewModal from "../components/TripReviewModal";

import { bookingStatusLabels } from "../data/bookingsMockData";
import { apiRequest } from "../api/api";

import "../styles/MyBookings.css";

const PAGE_SIZE = 4;

/*
 * الحالات التي يدعمها Laravel في:
 *
 * GET /my-bookings
 *
 * status:
 * pending
 * confirmed
 * cancelled
 * completed
 */

const VALID_API_STATUSES = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
];

function MyBookings() {
  /*
   * ==========================================
   * MAIN STATE
   * ==========================================
   */

  const [activeStatus, setActiveStatus] =
    useState("upcoming");

  const [sortBy, setSortBy] =
    useState("date");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [bookings, setBookings] =
    useState([]);

  const [lastPage, setLastPage] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  /*
   * ==========================================
   * HERO COUNTS
   * ==========================================
   */

  const [bookingsCounts, setBookingsCounts] =
    useState({
      upcoming: 0,
      completed: 0,
      cancelled: 0,
    });

  const [loadingCounts, setLoadingCounts] =
    useState(false);

  /*
   * ==========================================
   * REVIEW
   * ==========================================
   */

  const [reviewBooking, setReviewBooking] =
    useState(null);

  const [reviews, setReviews] =
    useState({});

  const reviewTriggerRef =
    useRef(null);

  /*
   * ==========================================
   * NORMALIZE BOOKING
   * ==========================================
   */

  const normalizeBooking = useCallback(
    (booking) => {
      /*
       * الرحلة داخل الحجز
       */
      const trip =
        booking?.trip ||
        booking?.trip_data ||
        {};

      /*
       * معرف الرحلة
       */
      const tripId =
        booking?.trip_id ??
        booking?.tripId ??
        trip?.id ??
        null;

      /*
       * مهم جدًا:
       *
       * status = حالة الحجز
       *
       * وليس:
       * trip.status
       */
      const status =
        booking?.status ||
        "pending";

      /*
       * السعر
       */
      const totalPrice =
        booking?.total_price ??
        booking?.totalPrice ??
        booking?.price ??
        trip?.price ??
        0;

      /*
       * الصورة
       */
      const image = trip?.cover_image ??
        null;

      /*
       * عنوان الرحلة
       */
      const title =
        booking?.title ??
        trip?.title ??
        "رحلة";

      /*
       * رقم / مرجع الحجز
       */
      const reference =
        booking?.reference ??
        booking?.booking_reference ??
        booking?.booking_number ??
        booking?.id ??
        "-";

      /*
       * نقطة التجمع
       */
      const location =
        booking?.location ??
        booking?.meeting_point ??
        trip?.meeting_point ??
        booking?.city?.name ??
        trip?.city?.name ??
        "-";

      /*
       * تاريخ الرحلة
       */
      const dateValue =
        booking?.date ??
        booking?.trip_date ??
        trip?.trip_date ??
        null;

      const date = dateValue
        ? new Date(
            dateValue
          ).toLocaleDateString(
            "ar-SY"
          )
        : "-";

      /*
       * المدة
       */
      const durationValue =
        booking?.duration ??
        trip?.duration ??
        null;

      const duration =
        durationValue !== null &&
        durationValue !== undefined &&
        durationValue !== ""
          ? `${durationValue} ساعة`
          : "-";

      /*
       * النوع
       */
      const type =
        booking?.type ??
        booking?.category?.name ??
        trip?.category?.name ??
        trip?.category ??
        "-";

      /*
       * المواصلات
       */
      const transportation =
        booking?.transportation ??
        booking?.transportation_type ??
        trip?.transportation_type ??
        "-";

      /*
       * التقييم
       */
      const rating =
        booking?.rating ??
        booking?.rating_avg ??
        trip?.rating_avg ??
        0;

      /*
       * عدد الأشخاص
       */
      const people =
        booking?.participants_count ??
        booking?.people ??
        booking?.participants ??
        0;

      return {
        ...booking,

        id: booking?.id,

        tripId,

        title,

        reference,

        image,

        totalPrice:
          Number(
            totalPrice || 0
          ).toLocaleString(
            "en-US"
          ),

        location,

        date,

        duration,

        type,

        transportation,

        rating:
          Number(
            rating || 0
          ),

        people,

        /*
         * حالة الحجز الحقيقية
         */
        status,

        /*
         * نحتفظ بالتاريخ الخام
         */
        rawTripDate:
          dateValue,

        /*
         * نحتفظ ببيانات الرحلة
         * حتى يستطيع BookingCard استخدام
         * trip.status عند الحاجة.
         */
        trip,
      };
    },
    []
  );

  /*
   * ==========================================
   * FETCH HERO COUNTS
   * ==========================================
   *
   * الـ API لا يملك endpoint خاص بالإحصائيات،
   * لذلك نستخدم /my-bookings.
   */

  const fetchBookingCounts =
    useCallback(async () => {
      setLoadingCounts(true);

      try {
        /*
         * ======================================
         * COMPLETED
         * ======================================
         */

        const completedResult =
          await apiRequest(
            "/my-bookings?status=completed&per_page=100&page=1"
          );

        /*
         * ======================================
         * CANCELLED
         * ======================================
         */

        const cancelledResult =
          await apiRequest(
            "/my-bookings?status=cancelled&per_page=100&page=1"
          );

        /*
         * ======================================
         * PENDING
         * ======================================
         */

        const pendingResult =
          await apiRequest(
            "/my-bookings?status=pending&per_page=100&page=1"
          );

        /*
         * ======================================
         * CONFIRMED
         * ======================================
         */

        const confirmedResult =
          await apiRequest(
            "/my-bookings?status=confirmed&per_page=100&page=1"
          );

        /*
         * ======================================
         * DATA
         * ======================================
         */

        const completedBookings =
          completedResult.ok &&
          Array.isArray(
            completedResult.data?.data
          )
            ? completedResult.data.data
            : [];

        const cancelledBookings =
          cancelledResult.ok &&
          Array.isArray(
            cancelledResult.data?.data
          )
            ? cancelledResult.data.data
            : [];

        const pendingBookings =
          pendingResult.ok &&
          Array.isArray(
            pendingResult.data?.data
          )
            ? pendingResult.data.data
            : [];

        const confirmedBookings =
          confirmedResult.ok &&
          Array.isArray(
            confirmedResult.data?.data
          )
            ? confirmedResult.data.data
            : [];

        /*
         * ======================================
         * UPCOMING
         * ======================================
         */

        const now =
          new Date();

        const upcomingBookings = [
          ...pendingBookings,
          ...confirmedBookings,
        ].filter(
          (booking) => {
            const trip =
              booking?.trip ||
              booking?.trip_data ||
              {};

            const tripDate =
              booking?.trip_date ??
              booking?.date ??
              trip?.trip_date ??
              null;

            if (!tripDate) {
              return false;
            }

            const parsedDate =
              new Date(
                tripDate
              );

            return (
              !Number.isNaN(
                parsedDate.getTime()
              ) &&
              parsedDate >= now
            );
          }
        );

        /*
         * ======================================
         * COUNTS
         * ======================================
         */

        setBookingsCounts({
          upcoming:
            upcomingBookings.length,

          completed:
            Number(
              completedResult.data?.meta?.total ??
              completedResult.data?.total ??
              completedBookings.length
            ),

          cancelled:
            Number(
              cancelledResult.data?.meta?.total ??
              cancelledResult.data?.total ??
              cancelledBookings.length
            ),
        });
      } catch (error) {
    console.error(
      "Error fetching booking counts:",
      error
    );

    setBookingsCounts({
      upcoming: 0,
      completed: 0,
      cancelled: 0,
    });
  }
}, []);

  /*
   * ==========================================
   * FETCH BOOKINGS
   * ==========================================
   */

  const fetchBookings = useCallback(async () => {
  setLoading(true);

  try {
    // ==========================================
    // UPCOMING
    // ==========================================
    if (activeStatus === "upcoming") {
      const [pendingResult, confirmedResult] =
        await Promise.all([
          apiRequest(
            `/my-bookings?status=pending&per_page=100&page=1`
          ),
          apiRequest(
            `/my-bookings?status=confirmed&per_page=100&page=1`
          ),
        ]);

      console.log("PENDING:", pendingResult);
      console.log("CONFIRMED:", confirmedResult);

      if (!pendingResult.ok || !confirmedResult.ok) {
        throw new Error("فشل جلب الحجوزات القادمة");
      }

      const pendingBookings = Array.isArray(
        pendingResult.data?.data
      )
        ? pendingResult.data.data
        : [];

      const confirmedBookings = Array.isArray(
        confirmedResult.data?.data
      )
        ? confirmedResult.data.data
        : [];

      // دمج pending + confirmed
      let normalizedBookings = [
        ...pendingBookings,
        ...confirmedBookings,
      ].map(normalizeBooking);

      // ==========================================
      // FILTER BY TRIP DATE
      // ==========================================
      const now = new Date();

      normalizedBookings =
        normalizedBookings.filter((booking) => {
          if (!booking.rawTripDate) {
            return false;
          }

          const tripDate = new Date(
            booking.rawTripDate
          );

          return (
            !Number.isNaN(tripDate.getTime()) &&
            tripDate >= now
          );
        });

      // ==========================================
      // SORT BY DATE
      // ==========================================
      normalizedBookings.sort((a, b) => {
        const dateA = a.rawTripDate
          ? new Date(a.rawTripDate).getTime()
          : 0;

        const dateB = b.rawTripDate
          ? new Date(b.rawTripDate).getTime()
          : 0;

        return dateB - dateA;
      });

      console.log(
        "UPCOMING BOOKINGS:",
        normalizedBookings
      );

      setBookings(normalizedBookings);

      // بما أننا جلبنا pending + confirmed معًا
      setLastPage(1);

      return;
    }

    // ==========================================
    // OTHER STATUSES
    // ==========================================
    const params = new URLSearchParams();

    if (VALID_API_STATUSES.includes(activeStatus)) {
      params.append("status", activeStatus);
    }

    params.append(
      "per_page",
      String(PAGE_SIZE)
    );

    params.append(
      "page",
      String(currentPage)
    );

    const requestUrl =
      `/my-bookings?${params.toString()}`;

    console.log(
      "MY BOOKINGS REQUEST:",
      requestUrl
    );

    const result = await apiRequest(requestUrl);

    console.log(
      "MY BOOKINGS RESPONSE:",
      result
    );

    if (!result.ok) {
      throw new Error(
        `حدث خطأ أثناء جلب الحجوزات (${result.status})`
      );
    }

    const responseData = result.data;

    console.log(
      "ACTIVE STATUS:",
      activeStatus
    );

    console.log(
      "BOOKINGS DATA:",
      responseData?.data
    );

    const apiBookings =
      Array.isArray(responseData?.data)
        ? responseData.data
        : [];

    const normalizedBookings =
      apiBookings.map(normalizeBooking);

    setBookings(normalizedBookings);

    const apiLastPage =
      Number(
        responseData?.meta?.last_page ??
          responseData?.last_page ??
          1
      );

    setLastPage(
      apiLastPage > 0
        ? apiLastPage
        : 1
    );

  } catch (error) {
    console.error(
      "Error fetching bookings:",
      error
    );

    setBookings([]);
    setLastPage(1);

  } finally {
    setLoading(false);
  }
}, [
  activeStatus,
  currentPage,
  normalizeBooking,
]);

  /*
   * ==========================================
   * INITIAL LOAD
   * ==========================================
   */

  useEffect(() => {
    fetchBookings();
  }, [
    fetchBookings,
  ]);

  /*
   * ==========================================
   * LOAD HERO COUNTS
   * ==========================================
   */

  useEffect(() => {
    fetchBookingCounts();
  }, [
    fetchBookingCounts,
  ]);

  /*
   * ==========================================
   * CANCEL BOOKING
   * ==========================================
   */

  const handleCancelBooking =
    async (booking) => {
      /*
       * لا يمكن إلغاء:
       *
       * completed
       * cancelled
       */

      if (
        booking.status !==
          "pending" &&
        booking.status !==
          "confirmed"
      ) {
        window.alert(
          "لا يمكن إلغاء هذا الحجز."
        );

        return;
      }

      const confirmed =
        window.confirm(
          `هل أنت متأكد من إلغاء حجز "${booking.title}"؟`
        );

      if (!confirmed) {
        return;
      }

      try {
        const result =
          await apiRequest(
            `/bookings/${booking.id}`,
            {
              method: "DELETE",
            }
          );

        console.log(
          "CANCEL BOOKING RESPONSE:",
          result
        );

        if (!result.ok) {
          throw new Error(
            result.data?.message ||
              `حدث خطأ أثناء إلغاء الحجز (${result.status})`
          );
        }

        /*
         * إعادة تحميل القائمة
         */
        if (
          currentPage === 1
        ) {
          await fetchBookings();
        } else {
          setCurrentPage(1);
        }

        /*
         * تحديث الأعداد في Hero
         */
        await fetchBookingCounts();

        window.alert(
          result.data?.message ||
            "تم إلغاء الحجز بنجاح."
        );
      } catch (error) {
        console.error(
          "Error cancelling booking:",
          error
        );

        window.alert(
          error?.message ||
            "حدث خطأ أثناء إلغاء الحجز. حاول مرة أخرى."
        );
      }
    };

  /*
   * ==========================================
   * REVIEW
   * ==========================================
   */

  const handleOpenReview = (
    booking,
    event
  ) => {
    reviewTriggerRef.current =
      event.currentTarget;

    setReviewBooking(
      booking
    );
  };

  const handleCloseReview =
    () => {
      setReviewBooking(
        null
      );

      reviewTriggerRef.current?.focus();
    };

  const handleSubmitReview =
    ({
      rating,
      comment,
    }) => {
      if (
        !reviewBooking
      ) {
        return;
      }

      setReviews(
        (previous) => ({
          ...previous,

          [reviewBooking.id]: {
            bookingId:
              reviewBooking.id,

            tripId:
              reviewBooking.tripId,

            rating,

            comment,

            createdAt:
              new Date().toISOString(),
          },
        })
      );

      handleCloseReview();
    };

  /*
   * ==========================================
   * STATUS CHANGE
   * ==========================================
   */

  const handleStatusChange =
    (status) => {
      console.log(
        "BOOKING STATUS CHANGED:",
        status
      );

      setActiveStatus(
        status
      );

      setCurrentPage(1);
    };

  /*
   * ==========================================
   * SORT CHANGE
   * ==========================================
   */

  const handleSortChange =
    (event) => {
      setSortBy(
        event.target.value
      );

      setCurrentPage(1);
    };

  /*
   * ==========================================
   * SORT BOOKINGS
   * ==========================================
   */

  const sortedBookings =
    useMemo(() => {
      const result =
        [...bookings];

      /*
       * DATE
       */
      if (
        sortBy === "date"
      ) {
        result.sort(
          (a, b) => {
            const dateA =
              a.rawTripDate
                ? new Date(
                    a.rawTripDate
                  ).getTime()
                : 0;

            const dateB =
              b.rawTripDate
                ? new Date(
                    b.rawTripDate
                  ).getTime()
                : 0;

            return (
              dateB -
              dateA
            );
          }
        );
      }

      /*
       * RATING
       */
      else if (
        sortBy === "rating"
      ) {
        result.sort(
          (a, b) =>
            Number(
              b.rating || 0
            ) -
            Number(
              a.rating || 0
            )
        );
      }

      /*
       * PRICE
       */
      else if (
        sortBy === "price"
      ) {
        result.sort(
          (a, b) => {
            const priceA =
              Number(
                String(
                  a.totalPrice ||
                    "0"
                ).replace(
                  /,/g,
                  ""
                )
              );

            const priceB =
              Number(
                String(
                  b.totalPrice ||
                    "0"
                ).replace(
                  /,/g,
                  ""
                )
              );

            return (
              priceB -
              priceA
            );
          }
        );
      }

      return result;
    }, [
      bookings,
      sortBy,
    ]);

  const visibleBookings =
    sortedBookings;

  /*
   * ==========================================
   * HEADER TEXT
   * ==========================================
   */

  const {
    heading,
    subtitle,
  } =
    bookingStatusLabels[
      activeStatus
    ] || {
      heading:
        "حجوزاتي",

      subtitle:
        "",
    };

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <div className="mybookings-page">

      <Header />

      {/* ======================================
          HERO
      ====================================== */}

      <BookingsHero
  bookingsCounts={bookingsCounts}
  loading={loadingCounts}
/>

      {/* ======================================
          TABS
      ====================================== */}

      <div className="booking-tabs-wrapper">

        <BookingStatusTabs
          activeStatus={
            activeStatus
          }
          onChange={
            handleStatusChange
          }
        />

      </div>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="booking-main">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="booking-list-header">

          <div className="booking-list-heading">

            <h2>
              {heading}
            </h2>

            <p>
              {subtitle}
            </p>

          </div>

          {/* ==================================
              SORT
          ================================== */}

          <label className="booking-sort">

            <FiSliders />

            <span>
              ترتيب حسب
            </span>

            <select
              value={sortBy}
              onChange={
                handleSortChange
              }
            >
              <option value="date">
                الأحدث
              </option>

              <option value="rating">
                التقييم
              </option>

              <option value="price">
                السعر
              </option>
            </select>

          </label>

        </div>

        {/* ====================================
            BOOKINGS LIST
        ==================================== */}

        {loading ? (
          <div className="booking-empty">
            جاري تحميل الحجوزات...
          </div>
        ) : visibleBookings.length ===
          0 ? (
          <div className="booking-empty">
            لا توجد حجوزات في هذا القسم حاليًا.
          </div>
        ) : (
          <div className="booking-list">

            {visibleBookings.map(
              (booking) => (
                <BookingCard
                  key={
                    booking.id
                  }

                  booking={
                    booking
                  }

                  onRate={
                    handleOpenReview
                  }

                  onCancel={
                    handleCancelBooking
                  }

                  isReviewed={Boolean(
                    reviews[
                      booking.id
                    ]
                  )}
                />
              )
            )}

          </div>
        )}

        {/* ====================================
            PAGINATION
        ==================================== */}

        <Pagination
          currentPage={
            currentPage
          }

          lastPage={
            lastPage
          }

          onPageChange={
            setCurrentPage
          }
        />

      </main>

      <Footer />

      {/* ======================================
          REVIEW MODAL
      ====================================== */}

      {reviewBooking && (
        <TripReviewModal
          key={
            reviewBooking.id
          }

          booking={
            reviewBooking
          }

          existingReview={
            reviews[
              reviewBooking.id
            ]
          }

          onClose={
            handleCloseReview
          }

          onSubmit={
            handleSubmitReview
          }
        />
      )}

    </div>
  );
}

export default MyBookings;