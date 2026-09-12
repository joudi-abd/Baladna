import React, { useEffect, useState } from "react";
import "../styles/Profile.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import {
    FaUser,
    FaIdCard,
    FaPhone,
    FaEnvelope,
    FaHeart,
    FaBookOpen,
    FaStar,
    FaCog,
    FaCamera,
    FaTrash,
    FaPen,
    FaLock,
    FaTimes,
    FaSave,
    FaImage,
    FaCheck,
} from "react-icons/fa";

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

const API = {
    profile: "http://127.0.0.1:8000/api/profile",
    editProfile: "http://127.0.0.1:8000/api/profile",
    editPassword: "http://127.0.0.1:8000/api/profile/password",
    editEmail: "http://127.0.0.1:8000/api/profile/email",
    editImage: "http://127.0.0.1:8000/api/profile/image",
    deleteImage: "http://127.0.0.1:8000/api/profile/image",
    deleteAccount: "http://127.0.0.1:8000/api/profile",
};

const API_ORIGIN = "http://127.0.0.1:8000";

/*
|--------------------------------------------------------------------------
| Image URL
|--------------------------------------------------------------------------
*/

const normalizeImageUrl = (image) => {
    if (!image || typeof image !== "string") {
        return "";
    }

    const cleanImage = image.trim();

    if (!cleanImage) {
        return "";
    }

    if (
        cleanImage.startsWith("http://") ||
        cleanImage.startsWith("https://")
    ) {
        try {
            const url = new URL(cleanImage);

            // نخلي الصور من نفس Laravel backend
            url.protocol = new URL(API_ORIGIN).protocol;
            url.host = new URL(API_ORIGIN).host;

            return url.toString();
        } catch {
            return cleanImage;
        }
    }

    let path = cleanImage.replace(/^\/+/, "");

    if (/^storage\//i.test(path)) {
        return `${API_ORIGIN}/${path}`;
    }

    if (/^images\//i.test(path)) {
        path = `storage/${path}`;
    } else {
        path = `storage/Images/${path}`;
    }

    return `${API_ORIGIN}/${path}`;
};

/*
|--------------------------------------------------------------------------
| PROFILE COMPONENT
|--------------------------------------------------------------------------
*/

const Profile = () => {

    /*
    |--------------------------------------------------------------------------
    | USER
    |--------------------------------------------------------------------------
    */

    const [user, setUser] = useState({
        name: "",
        username: "",
        phone: "",
        email: "",
        bio: "",
        favorites_count: 0,
        bookings_count: 0,
        reviews_count: 0,
        avatar: "",
        cover_image: "",
    });

    /*
    |--------------------------------------------------------------------------
    | STATES
    |--------------------------------------------------------------------------
    */

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [showPasswordModal, setShowPasswordModal] =
        useState(false);

    const [showEmailModal, setShowEmailModal] =
        useState(false);

    const [showDeleteAccountModal, setShowDeleteAccountModal] =
        useState(false);

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [emailData, setEmailData] = useState({
        email: "",
    });

    /*
    |--------------------------------------------------------------------------
    | TOKEN
    |--------------------------------------------------------------------------
    */

    const getToken = () => {
        return localStorage.getItem("token");
    };

    /*
    |--------------------------------------------------------------------------
    | HEADERS
    |--------------------------------------------------------------------------
    */

    const getHeaders = () => {
        const token = getToken();

        return {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    };

    /*
    |--------------------------------------------------------------------------
    | MESSAGES
    |--------------------------------------------------------------------------
    */

    const showMessage = (text) => {
        setMessage(text);
        setError("");

        setTimeout(() => {
            setMessage("");
        }, 4000);
    };

    const showError = (text) => {
        setError(text);
        setMessage("");

        setTimeout(() => {
            setError("");
        }, 5000);
    };

    /*
    |--------------------------------------------------------------------------
    | GET PROFILE
    |--------------------------------------------------------------------------
    */

    const fetchProfile = async () => {

        try {

            setLoading(true);

            const token = getToken();

            if (!token) {
                throw new Error(
                    "يجب تسجيل الدخول أولاً."
                );
            }

            const response = await fetch(
                API.profile,
                {
                    method: "GET",
                    headers: getHeaders(),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل جلب بيانات الملف الشخصي."
                );
            }

            const profileData =
                data.data || data;

            setUser({
                name: profileData.name || "",
                username:
                    profileData.username || "",
                phone:
                    profileData.phone || "",
                email:
                    profileData.email || "",
                bio:
                    profileData.bio || "",

                favorites_count:
                    profileData.favorites_count || 0,

                bookings_count:
                    profileData.bookings_count || 0,

                reviews_count:
                    profileData.reviews_count || 0,

                avatar:
                    normalizeImageUrl(
                        profileData.avatar ||
                        profileData.profile_image
                    ),

                cover_image:
                    normalizeImageUrl(
                        profileData.cover_image
                    ),
            });

        } catch (err) {

            console.error(
                "PROFILE ERROR:",
                err
            );

            showError(
                err.message ||
                "فشل الاتصال بالـ Backend."
            );

        } finally {

            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | USE EFFECT
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        fetchProfile();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | INPUT
    |--------------------------------------------------------------------------
    */

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | EDIT PROFILE
    |--------------------------------------------------------------------------
    */

    const handleSaveProfile = async () => {

        try {

            setSaving(true);

            const response = await fetch(
                API.editProfile,
                {
                    method: "PUT",
                    headers: getHeaders(),

                    body: JSON.stringify({
                        name: user.name,
                        phone: user.phone,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل تعديل بيانات الحساب."
                );
            }

            const updatedUser =
                data.data || data;

            setUser((prev) => ({
                ...prev,
                ...updatedUser,
            }));

            localStorage.setItem(
                "user",
                JSON.stringify({
                    ...user,
                    ...updatedUser,
                })
            );

            setIsEditing(false);

            showMessage(
                "تم تحديث بياناتك بنجاح"
            );

        } catch (err) {

            console.error(err);

            showError(
                err.message ||
                "حدث خطأ أثناء تعديل البيانات."
            );

        } finally {

            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | IMAGE UPLOAD
    |--------------------------------------------------------------------------
    */

    const handleImageChange = async (e) => {

        const file =
            e.target.files?.[0];

        if (!file) return;

        try {

            setSaving(true);

            const token = getToken();

            const formData =
                new FormData();

            formData.append(
                "image",
                file
            );

            const response = await fetch(
                API.editImage,
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        Accept:
                            "application/json",
                    },

                    body: formData,
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل رفع الصورة."
                );
            }

            const updatedUser =
                data.data || data;

            setUser((prev) => ({
                ...prev,
                ...updatedUser,

                avatar:
                    normalizeImageUrl(
                        updatedUser.avatar ||
                        updatedUser.profile_image
                    ),
            }));

            showMessage(
                "تم تحديث الصورة الشخصية بنجاح"
            );

        } catch (err) {

            console.error(err);

            showError(
                err.message ||
                "فشل رفع الصورة."
            );

        } finally {

            setSaving(false);

            e.target.value = "";
        }
    };

    /*
    |--------------------------------------------------------------------------
    | DELETE IMAGE
    |--------------------------------------------------------------------------
    */

    const handleDeleteImage = async () => {

        const confirmDelete =
            window.confirm(
                "هل أنت متأكد من حذف الصورة الشخصية؟"
            );

        if (!confirmDelete) return;

        try {

            setSaving(true);

            const response = await fetch(
                API.deleteImage,
                {
                    method: "DELETE",
                    headers: getHeaders(),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل حذف الصورة."
                );
            }

            setUser((prev) => ({
                ...prev,
                avatar: "",
            }));

            showMessage(
                "تم حذف الصورة الشخصية"
            );

        } catch (err) {

            console.error(err);

            showError(
                err.message ||
                "فشل حذف الصورة."
            );

        } finally {

            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | PASSWORD
    |--------------------------------------------------------------------------
    */

    const handlePasswordChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        if (
            passwordData.password !==
            passwordData.password_confirmation
        ) {
            showError(
                "كلمتا المرور غير متطابقتين."
            );

            return;
        }

        try {

            setSaving(true);

            const response = await fetch(
                API.editPassword,
                {
                    method: "PUT",
                    headers: getHeaders(),

                    body: JSON.stringify(
                        passwordData
                    ),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل تغيير كلمة المرور."
                );
            }

            setShowPasswordModal(false);

            setPasswordData({
                current_password: "",
                password: "",
                password_confirmation: "",
            });

            showMessage(
                "تم تغيير كلمة المرور بنجاح"
            );

        } catch (err) {

            console.error(err);

            showError(
                err.message ||
                "حدث خطأ أثناء تغيير كلمة المرور."
            );

        } finally {

            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | EMAIL
    |--------------------------------------------------------------------------
    */

    const openEmailModal = () => {

        setEmailData({
            email: user.email || "",
        });

        setShowEmailModal(true);
    };

    const handleEmailSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const response = await fetch(
                API.editEmail,
                {
                    method: "PUT",
                    headers: getHeaders(),

                    body: JSON.stringify({
                        email:
                            emailData.email,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل تعديل البريد الإلكتروني."
                );
            }

            setUser((prev) => ({
                ...prev,
                email:
                    data.data?.email ||
                    emailData.email,
            }));

            setShowEmailModal(false);

            showMessage(
                "تم تحديث البريد الإلكتروني"
            );

        } catch (err) {

            console.error(err);

            showError(
                err.message ||
                "حدث خطأ أثناء تعديل البريد."
            );

        } finally {

            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | DELETE ACCOUNT
    |--------------------------------------------------------------------------
    */

    const handleDeleteAccount = async () => {

        try {

            setSaving(true);

            const response = await fetch(
                API.deleteAccount,
                {
                    method: "DELETE",
                    headers: getHeaders(),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل حذف الحساب."
                );
            }

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "user"
            );

            window.location.href =
                "/login";

        } catch (err) {

            console.error(err);

            showError(
                err.message ||
                "فشل حذف الحساب."
            );

            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <>
                <Header />

                <main
                    className="profile-page"
                    dir="rtl"
                >
                    <div className="profile-loading">
                        <div className="loading-spinner"></div>

                        <p>
                            جاري تحميل
                            الملف الشخصي...
                        </p>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Header />

            <main
                className="profile-page"
                dir="rtl"
            >

                {/* =====================================================
                    ALERTS
                ===================================================== */}

                {message && (
                    <div className="profile-alert success-alert">
                        <FaCheck />
                        <span>{message}</span>
                    </div>
                )}

                {error && (
                    <div className="profile-alert error-alert">
                        <FaTimes />
                        <span>{error}</span>
                    </div>
                )}

                {/* =====================================================
                    PROFILE HERO
                ===================================================== */}

                <section className="profile-hero">

                    {/* COVER */}

                    <div className="profile-cover">

                        {user.cover_image ? (

                            <img
                                src={user.cover_image}
                                alt="صورة الغلاف"
                            />

                        ) : (

                            <div className="cover-placeholder">
                                <FaImage />
                            </div>

                        )}

                        <div className="cover-overlay"></div>

                    </div>

                    {/* PROFILE INFO */}

                    <div className="profile-main-info">

                        <div className="avatar-section">

                            <div className="avatar-container">

                                <img
                                    src={
                                        user.avatar ||
                                        "https://via.placeholder.com/160"
                                    }
                                    alt={user.name}
                                    className="profile-avatar"
                                />

                                <label className="avatar-camera">

                                    <FaCamera />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={
                                            handleImageChange
                                        }
                                        hidden
                                    />

                                </label>

                                {user.avatar && (

                                    <button
                                        type="button"
                                        className="avatar-delete"
                                        onClick={
                                            handleDeleteImage
                                        }
                                        disabled={saving}
                                    >
                                        <FaTrash />
                                    </button>

                                )}

                            </div>

                        </div>

                        <div className="profile-name-block">

                            <div className="profile-name-row">

                                <h1>
                                    {user.name ||
                                        "مستخدم Baladna"}
                                </h1>

                                <button
                                    type="button"
                                    className="profile-edit-icon"
                                    onClick={() =>
                                        setIsEditing(
                                            !isEditing
                                        )
                                    }
                                >
                                    <FaPen />
                                </button>

                            </div>

                            {user.username && (

                                <span className="username">
                                    @{user.username}
                                </span>

                            )}

                            {user.bio && (

                                <p className="profile-bio">
                                    {user.bio}
                                </p>

                            )}

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    STATS
                ===================================================== */}

                <section className="profile-stats">

                    <div className="profile-stat-card">

                        <div className="stat-icon">
                            <FaHeart />
                        </div>

                        <div>
                            <strong>
                                {user.favorites_count}
                            </strong>

                            <span>
                                الأماكن المفضلة
                            </span>
                        </div>

                    </div>

                    <div className="profile-stat-card">

                        <div className="stat-icon">
                            <FaBookOpen />
                        </div>

                        <div>
                            <strong>
                                {user.bookings_count}
                            </strong>

                            <span>
                                الرحلات المحجوزة
                            </span>
                        </div>

                    </div>

                    <div className="profile-stat-card">

                        <div className="stat-icon">
                            <FaStar />
                        </div>

                        <div>
                            <strong>
                                {user.reviews_count}
                            </strong>

                            <span>
                                التقييمات
                            </span>
                        </div>

                    </div>

                </section>

                {/* =====================================================
                    CONTENT
                ===================================================== */}

                <section className="profile-content">

                    {/* PERSONAL INFORMATION */}

                    <div className="profile-card">

                        <div className="profile-card-header">

                            <div>
                                <span className="card-small-title">
                                    حسابك في Baladna
                                </span>

                                <h2>
                                    المعلومات الشخصية
                                </h2>
                            </div>

                            <div className="card-header-icon">
                                <FaUser />
                            </div>

                        </div>

                        <div className="profile-form-grid">

                            {/* NAME */}

                            <div className="profile-field">

                                <label>
                                    <FaUser />
                                    الاسم الكامل
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        user.name || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    readOnly={
                                        !isEditing
                                    }
                                />

                            </div>

                            {/* USERNAME */}

                            <div className="profile-field">

                                <label>
                                    <FaIdCard />
                                    اسم الحساب
                                </label>

                                <input
                                    type="text"
                                    value={
                                        user.username ||
                                        ""
                                    }
                                    readOnly
                                />

                            </div>

                            {/* PHONE */}

                            <div className="profile-field">

                                <label>
                                    <FaPhone />
                                    رقم الهاتف
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={
                                        user.phone || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    readOnly={
                                        !isEditing
                                    }
                                />

                            </div>

                            {/* EMAIL */}

                            <div className="profile-field email-field">

                                <label>
                                    <FaEnvelope />
                                    البريد الإلكتروني
                                </label>

                                <div className="email-input-wrapper">

                                    <input
                                        type="email"
                                        value={
                                            user.email ||
                                            ""
                                        }
                                        readOnly
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            openEmailModal
                                        }
                                    >
                                        تعديل
                                    </button>

                                </div>

                            </div>

                        </div>

                        {isEditing && (

                            <div className="profile-save-area">

                                <button
                                    type="button"
                                    className="save-btn"
                                    onClick={
                                        handleSaveProfile
                                    }
                                    disabled={saving}
                                >

                                    <FaSave />

                                    {saving
                                        ? "جاري الحفظ..."
                                        : "حفظ التعديلات"
                                    }

                                </button>

                            </div>

                        )}

                    </div>

                    {/* ACCOUNT SETTINGS */}

                    <div className="profile-card settings-card">

                        <div className="profile-card-header">

                            <div>
                                <span className="card-small-title">
                                    إدارة الحساب
                                </span>

                                <h2>
                                    إعدادات الحساب
                                </h2>
                            </div>

                            <div className="card-header-icon">
                                <FaCog />
                            </div>

                        </div>

                        <div className="settings-list">

                            {/* PASSWORD */}

                            <button
                                type="button"
                                className="setting-item"
                                onClick={() =>
                                    setShowPasswordModal(
                                        true
                                    )
                                }
                            >

                                <div className="setting-icon">
                                    <FaLock />
                                </div>

                                <div className="setting-text">

                                    <strong>
                                        تغيير كلمة المرور
                                    </strong>

                                    <span>
                                        قم بتحديث كلمة المرور
                                        لحماية حسابك
                                    </span>

                                </div>

                                <span className="setting-arrow">
                                    ←
                                </span>

                            </button>

                            {/* DELETE */}

                            <button
                                type="button"
                                className="setting-item danger-setting"
                                onClick={() =>
                                    setShowDeleteAccountModal(
                                        true
                                    )
                                }
                            >

                                <div className="setting-icon">
                                    <FaTrash />
                                </div>

                                <div className="setting-text">

                                    <strong>
                                        حذف الحساب
                                    </strong>

                                    <span>
                                        حذف حسابك وجميع
                                        بياناتك نهائياً
                                    </span>

                                </div>

                                <span className="setting-arrow">
                                    ←
                                </span>

                            </button>

                        </div>

                    </div>

                </section>

            </main>

            {/* =====================================================
                PASSWORD MODAL
            ===================================================== */}

            {showPasswordModal && (

                <div className="modal-overlay">

                    <div className="profile-modal">

                        <button
                            type="button"
                            className="modal-close"
                            onClick={() =>
                                setShowPasswordModal(
                                    false
                                )
                            }
                        >
                            <FaTimes />
                        </button>

                        <div className="modal-icon">
                            <FaLock />
                        </div>

                        <h2>
                            تغيير كلمة المرور
                        </h2>

                        <p>
                            أدخل كلمة المرور الحالية
                            ثم اختر كلمة مرور جديدة.
                        </p>

                        <form
                            onSubmit={
                                handlePasswordSubmit
                            }
                        >

                            <div className="modal-field">

                                <label>
                                    كلمة المرور الحالية
                                </label>

                                <input
                                    type="password"
                                    name="current_password"
                                    value={
                                        passwordData.current_password
                                    }
                                    onChange={
                                        handlePasswordChange
                                    }
                                    required
                                />

                            </div>

                            <div className="modal-field">

                                <label>
                                    كلمة المرور الجديدة
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={
                                        passwordData.password
                                    }
                                    onChange={
                                        handlePasswordChange
                                    }
                                    required
                                />

                            </div>

                            <div className="modal-field">

                                <label>
                                    تأكيد كلمة المرور
                                </label>

                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={
                                        passwordData.password_confirmation
                                    }
                                    onChange={
                                        handlePasswordChange
                                    }
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="modal-save-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "جاري الحفظ..."
                                    : "تغيير كلمة المرور"
                                }
                            </button>

                        </form>

                    </div>

                </div>

            )}

            {/* =====================================================
                EMAIL MODAL
            ===================================================== */}

            {showEmailModal && (

                <div className="modal-overlay">

                    <div className="profile-modal">

                        <button
                            type="button"
                            className="modal-close"
                            onClick={() =>
                                setShowEmailModal(
                                    false
                                )
                            }
                        >
                            <FaTimes />
                        </button>

                        <div className="modal-icon">
                            <FaEnvelope />
                        </div>

                        <h2>
                            تعديل البريد الإلكتروني
                        </h2>

                        <p>
                            أدخل البريد الإلكتروني
                            الجديد لحسابك.
                        </p>

                        <form
                            onSubmit={
                                handleEmailSubmit
                            }
                        >

                            <div className="modal-field">

                                <label>
                                    البريد الإلكتروني
                                </label>

                                <input
                                    type="email"
                                    value={
                                        emailData.email
                                    }
                                    onChange={(e) =>
                                        setEmailData({
                                            email:
                                                e.target.value,
                                        })
                                    }
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="modal-save-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "جاري الحفظ..."
                                    : "حفظ البريد الإلكتروني"
                                }
                            </button>

                        </form>

                    </div>

                </div>

            )}

            {/* =====================================================
                DELETE ACCOUNT MODAL
            ===================================================== */}

            {showDeleteAccountModal && (

                <div className="modal-overlay">

                    <div className="profile-modal delete-modal">

                        <button
                            type="button"
                            className="modal-close"
                            onClick={() =>
                                setShowDeleteAccountModal(
                                    false
                                )
                            }
                        >
                            <FaTimes />
                        </button>

                        <div className="modal-icon danger-modal-icon">
                            <FaTrash />
                        </div>

                        <h2>
                            حذف الحساب
                        </h2>

                        <p>
                            هل أنت متأكد من حذف حسابك؟
                            سيتم حذف بيانات الحساب ولا
                            يمكن التراجع عن هذه العملية.
                        </p>

                        <div className="modal-actions">

                            <button
                                type="button"
                                className="cancel-modal-btn"
                                onClick={() =>
                                    setShowDeleteAccountModal(
                                        false
                                    )
                                }
                            >
                                إلغاء
                            </button>

                            <button
                                type="button"
                                className="delete-confirm-btn"
                                onClick={
                                    handleDeleteAccount
                                }
                                disabled={saving}
                            >
                                {saving
                                    ? "جاري الحذف..."
                                    : "نعم، احذف الحساب"
                                }
                            </button>

                        </div>

                    </div>

                </div>

            )}

            <Footer />
        </>
    );
};

export default Profile;