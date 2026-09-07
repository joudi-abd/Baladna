import React, { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import TripCard from '../components/TripCard';
import CarouselArrows from '../components/CarouselArrows';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  tripsListing,
  tripCityOptions,
  tripTypeOptions,
  budgetOptions,
  transportationOptions,
} from '../data/tripsMockData';
import '../styles/Trips.css';

// نحوّل رحلة من المصدر الموحّد (tripsMockData) إلى الشكل الذي يتوقعه TripCard بواجهة "listing" الكثيفة
function toListingTripCardShape(trip) {
  return {
    id: trip.id,
    title: trip.title,
    description: trip.description,
    cover_image: trip.image,
    rating_avg: trip.rating,
    trip_date: trip.tripDate,
    duration_hours: trip.durationHours,
    available_seats: trip.availableSeats,
    transportation_type: trip.transportationType,
    meeting_point: trip.meetingPoint,
    price_per_person: trip.pricePerPersonUSD,
    status: 'upcoming',
    badgeLabel: trip.badge,
    city: trip.city,
    type: trip.type,
    budget: trip.priceSYP,
  };
}

const allTrips = tripsListing.map(toListingTripCardShape);

const Trips = () => {

  // نقرأ استعلام البحث القادم من حقل بحث الرئيسية (Hero) عبر ?q= إن وُجد
  const [searchParams] = useSearchParams();

  // =========================
  // البحث
  // =========================
  const [search, setSearch] = useState(() => searchParams.get('q') || '');

  const resultsRef = useRef(null);

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // =========================
  // قيم الفلاتر (قيد الاختيار)
  // =========================
  const [cityId, setCityId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [budget, setBudget] = useState('');
  const [transportationType, setTransportationType] = useState('');
  const [tripDate, setTripDate] = useState('');

  // =========================
  // قيم الفلاتر المطبّقة فعليًا
  // =========================
  const [appliedFilters, setAppliedFilters] = useState({
    cityId: '',
    typeId: '',
    budget: '',
    transportationType: '',
    tripDate: '',
  });

  const handleApplyFilters = () => {
    setAppliedFilters({ cityId, typeId, budget, transportationType, tripDate });
  };

  const trips = useMemo(() => {
    return allTrips.filter((trip) => {
      const matchesSearch =
        !search.trim() ||
        trip.title.includes(search.trim()) ||
        trip.city.includes(search.trim()) ||
        trip.type.includes(search.trim());

      const matchesCity = !appliedFilters.cityId || trip.city === appliedFilters.cityId;
      const matchesType = !appliedFilters.typeId || trip.type === appliedFilters.typeId;

      const matchesBudget = (() => {
        if (!appliedFilters.budget) return true;

        if (appliedFilters.budget === 'under1000') return trip.budget < 1000;
        if (appliedFilters.budget === '1000-2500') return trip.budget >= 1000 && trip.budget <= 2500;
        if (appliedFilters.budget === '2500-5000') return trip.budget >= 2500 && trip.budget <= 5000;
        if (appliedFilters.budget === 'over5000') return trip.budget > 5000;

        return true;
      })();

      const matchesTransportation =
        !appliedFilters.transportationType ||
        trip.transportation_type === appliedFilters.transportationType;

      const matchesDate =
        !appliedFilters.tripDate || trip.trip_date === appliedFilters.tripDate;

      return (
        matchesSearch &&
        matchesCity &&
        matchesType &&
        matchesBudget &&
        matchesTransportation &&
        matchesDate
      );
    });
  }, [search, appliedFilters]);

  return (

    <div className="trips-page-container">

      <Header />

      <div className="trips-decoration trips-decoration-right" aria-hidden="true"></div>
      <div className="trips-decoration trips-decoration-left" aria-hidden="true"></div>

      <header className="trips-hero">

        <div className="hero-overlay">

          <h1>
            الرحلات السياحية
          </h1>

          <p>
            اكتشف مجموعة متنوعة من الرحلات السياحية المصمّمة بعناية لتناسب أبرز الوجهات والمعالم، واختر التجربة التي تناسب اهتماماتك وابدأ رحلتك بكل سهولة.
          </p>


          {/* البحث */}

          <div className="search-bar-container">

            <input
              type="text"
              placeholder="ابحث عن رحلة ...."
              className="search-input"

              value={search}

              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />


            <button
              className="search-btn"
              type="button"
              aria-label="بحث"
              onClick={scrollToResults}
            >
              <FiSearch />
            </button>

          </div>

        </div>

      </header>



      {/* =================================================
          Filters
      ================================================= */}

      <section className="filter-section">

        <div className="filter-bar">


          {/* =========================
              المدينة
          ========================= */}

          <div className="filter-group">

            <label>
              المدينة
            </label>

            <select
              value={cityId}
              onChange={(event) => {
                setCityId(event.target.value);
              }}
            >

              <option value="">
                اختر مدينة
              </option>


              {tripCityOptions.map((city) => (

                <option
                  key={city}
                  value={city}
                >
                  {city}
                </option>

              ))}

            </select>

          </div>



          {/* =========================
              نوع المكان
          ========================= */}

          <div className="filter-group">

            <label>
              نوع المكان
            </label>

            <select
              value={typeId}
              onChange={(event) => {
                setTypeId(event.target.value);
              }}
            >

              <option value="">
                اختر نوع
              </option>


              {tripTypeOptions.map((type) => (

                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>

              ))}

            </select>

          </div>



          {/* =========================
              الميزانية
          ========================= */}

          <div className="filter-group">

            <label>
              الميزانية
            </label>

            <select
              value={budget}
              onChange={(event) => {
                setBudget(event.target.value);
              }}
            >

              <option value="">
                اختر مجال
              </option>


              {budgetOptions.map((option) => (

                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>

              ))}

            </select>

          </div>



          {/* =========================
              نوع النقل
          ========================= */}

          <div className="filter-group">

            <label>
              نوع النقل
            </label>

            <select
              value={transportationType}
              onChange={(event) => {
                setTransportationType(
                  event.target.value
                );
              }}
            >

              <option value="">
                اختر مجال
              </option>


              {transportationOptions.map((option) => (

                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>

              ))}

            </select>

          </div>



          {/* =========================
              تاريخ الرحلة
          ========================= */}

          <div className="filter-group">

            <label>
              تاريخ الرحلة
            </label>

            <input
              type="date"
              value={tripDate}
              onChange={(event) => {
                setTripDate(
                  event.target.value
                );
              }}
            />

          </div>



          {/* =========================
              تطبيق الفلتر
          ========================= */}

          <button
            className="btn-apply-filters"
            onClick={handleApplyFilters}
            type="button"
          >
            تطبيق الفلاتر
          </button>


        </div>

      </section>



      {/* =================================================
          الرحلات
      ================================================= */}

      <main className="trips-main-content" ref={resultsRef}>


        <div className="section-header">

          <div>
            <h2>الرحلات المتاحة</h2>
            <p className="section-subtitle">
              اختر من بين مجموعة من الرحلات المتوفرة واحجز الرحلة التي تناسبك
            </p>
          </div>

          <CarouselArrows
            label="الرحلات"
            onPrevious={() => {}}
            onNext={() => {}}
            canGoPrevious={false}
            canGoNext={false}
          />

        </div>



        {trips.length === 0 ? (

          <div className="no-trips">
            لا توجد رحلات مطابقة للبحث أو الفلاتر.
          </div>

        ) : (

          <div className="trips-grid">

            {trips.map((trip) => (

              <TripCard
                key={trip.id}
                trip={trip}
                badgeLabel={trip.badgeLabel}
                variant="listing"
              />

            ))}

          </div>

        )}


      </main>

      <Footer />

    </div>

  );

};

export default Trips;
