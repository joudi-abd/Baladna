import React, { useState, useEffect } from 'react';
import TripCard from '../components/TripCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Trips.css';

const API_URL = 'http://127.0.0.1:8000/api';

const Trips = () => {

  // =========================
  // الرحلات
  // =========================
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // البحث
  // =========================
  const [search, setSearch] = useState('');

  // =========================
  // بيانات الفلاتر
  // =========================
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  // =========================
  // قيم الفلاتر
  // =========================
  const [cityId, setCityId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [budget, setBudget] = useState('');
  const [transportationType, setTransportationType] = useState('');
  const [tripDate, setTripDate] = useState('');

  // =====================================================
  // جلب الرحلات
  // =====================================================
  const fetchTrips = async (filters = {}) => {

    setLoading(true);

    try {

      const url = new URL(`${API_URL}/trips`);

      // نستخدم القيم المرسلة للدالة
      // وإذا لم نرسلها نستخدم قيم الـ state الحالية
      const currentSearch =
        filters.search !== undefined ? filters.search : search;

      const currentCityId =
        filters.cityId !== undefined ? filters.cityId : cityId;

      const currentCategoryId =
        filters.categoryId !== undefined
          ? filters.categoryId
          : categoryId;

      const currentBudget =
        filters.budget !== undefined ? filters.budget : budget;

      const currentTransportationType =
        filters.transportationType !== undefined
          ? filters.transportationType
          : transportationType;

      const currentTripDate =
        filters.tripDate !== undefined
          ? filters.tripDate
          : tripDate;


      // =========================
      // البحث
      // =========================
      if (currentSearch.trim() !== '') {
        url.searchParams.append(
          'search',
          currentSearch.trim()
        );
      }


      // =========================
      // فلتر المدينة
      // =========================
      if (currentCityId !== '') {
        url.searchParams.append(
          'city_id',
          currentCityId
        );
      }


      // =========================
      // فلتر نوع المكان
      // =========================
      if (currentCategoryId !== '') {
        url.searchParams.append('category_id' ,
          currentCategoryId
        );
      }


      // =========================
      // فلتر الميزانية
      // =========================
      if (currentBudget !== '') {

        if (currentBudget === 'under1000') {

          url.searchParams.append('budget_min', '0');
          url.searchParams.append('budget_max', '1000');

        }

        else if (currentBudget === '1000-2500') {

          url.searchParams.append('budget_min', '1000');
          url.searchParams.append('budget_max', '2500');

        }

        else if (currentBudget === '2500-5000') {

          url.searchParams.append('budget_min', '2500');
          url.searchParams.append('budget_max', '5000');

        }

        else if (currentBudget === 'over5000') {

          url.searchParams.append('budget_min', '5000');

        }
      }


      // =========================
      // فلتر نوع النقل
      // =========================
      if (currentTransportationType !== '') {

        url.searchParams.append(
          'transportation_type',
          currentTransportationType
        );

      }


      // =========================
      // فلتر تاريخ الرحلة
      // =========================
      if (currentTripDate !== '') {

        url.searchParams.append(
          'trip_date',
          currentTripDate
        );

      }


      // =========================
      // الرابط النهائي
      // =========================
      console.log(
        'API URL:',
        url.toString()
      );


      // =========================
      // Request
      // =========================
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          'حدث خطأ أثناء جلب الرحلات'
        );
      }


      const data = await response.json();

      console.log(
        'API RESPONSE:',
        data
      );


      // Laravel يرجع البيانات داخل data
      setTrips(
        data.data || []
      );


    } catch (error) {

      console.error(
        'Error fetching trips:',
        error
      );

      setTrips([]);

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // جلب المدن والتصنيفات
  // =====================================================
  const fetchFilterData = async () => {

    try {

      const [
        citiesResponse,
        categoriesResponse
      ] = await Promise.all([

        fetch(`${API_URL}/cities`),

        fetch(`${API_URL}/categories`)

      ]);


      if (!citiesResponse.ok) {
        throw new Error(
          'فشل جلب المدن'
        );
      }

      if (!categoriesResponse.ok) {
        throw new Error(
          'فشل جلب التصنيفات'
        );
      }


      const citiesData =
        await citiesResponse.json();

      const categoriesData =
        await categoriesResponse.json();


      console.log(
        'Cities:',
        citiesData
      );

      console.log(
        'Categories:',
        categoriesData
      );


      setCities(
        citiesData.data || []
      );

      setCategories(
        categoriesData.data || []
      );


    } catch (error) {

      console.error(
        'Error fetching filter data:',
        error
      );

    }

  };


  // =====================================================
  // عند فتح الصفحة
  // =====================================================
  useEffect(() => {

    fetchTrips();

    fetchFilterData();

  }, []);


  // =====================================================
  // تطبيق الفلاتر
  // =====================================================
  const handleApplyFilters = () => {

    fetchTrips();

  };


  // =====================================================
  // إعادة ضبط
  // =====================================================
  const handleResetFilters = () => {

    // نمسح القيم من الشاشة
    setSearch('');
    setCityId('');
    setCategoryId('');
    setBudget('');
    setTransportationType('');
    setTripDate('');


    // نجلب كل الرحلات بقيم فارغة
    fetchTrips({
      search: '',
      cityId: '',
      categoryId: '',
      budget: '',
      transportationType: '',
      tripDate: ''
    });

  };


  // =====================================================
  // البحث عند الضغط على Enter
  // =====================================================
  const handleKeyDown = (event) => {

    if (event.key === 'Enter') {

      fetchTrips();

    }

  };


  return (

    <div className="trips-page-container">

      <Header />

      <header className="trips-hero">

        <div className="hero-overlay">

          <h1>
            الرحلات السياحية
          </h1>

          <p>
            اكتشف مجموعة متنوعة من الوجهات السياحية
            المجمعة بعناية لتناسب كل الأذواق
            بأفضل الأسعار المعقولة
          </p>


          {/* البحث */}

          <div className="search-bar-container">

            <input
              type="text"
              placeholder="ابحث عن رحلة..."
              className="search-input"

              value={search}

              onChange={(event) => {
                setSearch(event.target.value);
              }}

              onKeyDown={handleKeyDown}
            />


            <button
              className="search-btn"
              onClick={fetchTrips}
            >
              🔍
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


              {cities.map((city) => (

                <option
                  key={city.id}
                  value={city.id}
                >
                  {city.name}
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
              value={categoryId}
              onChange={(event) => {
                setCategoryId(event.target.value);
              }}
            >

              <option value="">
                اختر نوع
              </option>


              {categories.map((category) => (

                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
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


              <option value="under1000">
                أقل من 1000
              </option>


              <option value="1000-2500">
                1000 - 2500
              </option>


              <option value="2500-5000">
                2500 - 5000
              </option>


              <option value="over5000">
                أكثر من 5000
              </option>

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
                اختر نوع
              </option>


              <option value="bus">
                باص
              </option>


              <option value="mini_bus">
                ميني باص
              </option>


              <option value="train">
                قطار
              </option>


              <option value="tour_bus">
                باص سياحي
              </option>

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
          >
            تطبيق الفلتر
          </button>



          {/* =========================
              إعادة ضبط
          ========================= */}

          <button
            className="btn-reset-filters"
            onClick={handleResetFilters}
          >
            إعادة ضبط
          </button>


        </div>

      </section>



      {/* =================================================
          الرحلات
      ================================================= */}

      <main className="trips-main-content">


        <div className="section-title-container">

          <h2>
            الرحلات المتاحة
          </h2>

          <p>
            اختر من بين مجموعة من الرحلات المتوفرة
            واحجز لرحلتك القادمة
          </p>

        </div>



        {loading ? (

          <div className="loading-spinner">
            جاري تحميل الرحلات...
          </div>

        ) : trips.length === 0 ? (

          <div className="no-trips">
            لا توجد رحلات مطابقة للبحث أو الفلاتر.
          </div>

        ) : (

          <div className="trips-grid">

            {trips.map((trip) => (

              <TripCard
                key={trip.id}
                trip={trip}
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