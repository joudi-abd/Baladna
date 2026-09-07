import React, { useEffect, useState } from "react";
import "../styles/Profile.css";

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
} from "react-icons/fa";

/*
|--------------------------------------------------------------------------
| API CONFIG
|--------------------------------------------------------------------------
| عدلي فقط الروابط الموجودة هون حسب توثيق الـ API عندكم.
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

const Profile = () => {

    /* ============================================================
       USER
    ============================================================ */

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

    /* ============================================================
       STATES
    ============================================================ */

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    const [passwordData, setPasswordData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [emailData, setEmailData] = useState({
        email: "",
    });

    /* ============================================================
       TOKEN
    ============================================================ */

    const getToken = () => {
        return localStorage.getItem("token");
    };

    /* ============================================================
       HEADERS
    ============================================================ */

    const getHeaders = () => {
        const token = getToken();

        return {
            Authorization:` Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    };

    /* ============================================================
       SHOW MESSAGE
    ============================================================ */

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

    /* ============================================================
       GET PROFILE
    ============================================================ */

    const fetchProfile = async () => {

        try {

            setLoading(true);

            const token = getToken();

            if (!token) {
                throw new Error("لم يتم العثور على Token.");
            }

            const response = await fetch(API.profile, {
                method: "GET",
                headers: getHeaders(),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message || "فشل جلب بيانات الملف الشخصي."
                );
            }

            /*
             * بعض APIs ترجع:
             * data.data
             *
             * وبعضها:
             * data
             */

            const profileData = data.data || data;

            setUser({
                name: profileData.name || "",
                username: profileData.username || "",
                phone: profileData.phone || "",
                email: profileData.email || "",
                bio: profileData.bio || "",

                favorites_count:
                    profileData.favorites_count || 0,

                bookings_count:
                    profileData.bookings_count || 0,

                reviews_count:
                    profileData.reviews_count || 0,

                avatar:
                    profileData.avatar ||
                    profileData.profile_image ||
                    "",

                cover_image:
                    profileData.cover_image ||
                    "",
            });

        } catch (err) {

            console.error(err);

            showError(
                err.message ||
                "فشل الاتصال بالـ Backend."
            );

        } finally {

            setLoading(false);
        }
    };

    /* ============================================================
       USE EFFECT
    ============================================================ */

    useEffect(() => {
        fetchProfile();
    }, []);

    /* ============================================================
       HANDLE INPUT
    ============================================================ */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /* ============================================================
       EDIT PROFILE
    ============================================================ */

    const handleSaveProfile = async () => {

        try {

            setSaving(true);

            const response = await fetch(API.editProfile, {
                method: "PUT",
                headers: getHeaders(),

                body: JSON.stringify({
                    name: user.name,
                    phone: user.phone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل تعديل بيانات الحساب."
                );
            }

            const updatedUser = data.data || data;

            setUser((prev) => ({
                ...prev,
                ...updatedUser,
            }));

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setIsEditing(false);

            showMessage(
                "تم تحديث البيانات بنجاح!"
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

    /* ============================================================
       IMAGE UPLOAD
    ============================================================ */

    const handleImageChange = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            setSaving(true);

            const token = getToken();

            const formData = new FormData();

            formData.append("image", file);

            const response = await fetch(
                API.editImage,
                {
                    method: "POST",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                    body: formData,
                }
            );

            const data = await response.json();

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
            }));

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            showMessage(
                "تم تحديث الصورة الشخصية بنجاح!"
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

    /* ============================================================
       DELETE IMAGE
    ============================================================ */

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

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "فشل حذف الصورة."
                );
            }

            const updatedUser =
                data.data || data;

            setUser((prev) => ({
                ...prev,
                ...updatedUser,
                avatar: "",
            }));

            showMessage(
                "تم حذف الصورة بنجاح!"
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

    /* ============================================================
       PASSWORD
    ============================================================ */

    const handlePasswordChange = (e) => {

        const { name, value } = e.target;

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

            const data = await response.json();

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
                "تم تغيير كلمة المرور بنجاح!"
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
    /* ============================================================
       EMAIL
    ============================================================ */

    const handleEmailChange = (e) => {

        setEmailData({
            email: e.target.value,
        });
    };

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
                        email: emailData.email,
                    }),
                }
            );

            const data = await response.json();

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
                "تم تحديث البريد الإلكتروني بنجاح!"
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

    /* ============================================================
       DELETE ACCOUNT
    ============================================================ */

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

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "فشل حذف الحساب."
                );
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";

        } catch (err) {

            console.error(err);

            showError(
                err.message ||
                "حدث خطأ أثناء حذف الحساب."
            );

            setSaving(false);
        }
    };

    /* ============================================================
       LOADING
    ============================================================ */

    if (loading) {

        return (
            <div
                className="profile-loading"
                dir="rtl"
            >
                جاري تحميل بيانات الملف الشخصي...
            </div>
        );
    }

    /* ============================================================
       UI
    ============================================================ */

    return (

        <div
            className="profile-container"
            dir="rtl"
        >

            {/* ALERTS */}

            {message && (
                <div className="profile-alert success-alert">
                    {message}
                </div>
            )}

            {error && (
                <div className="profile-alert error-alert">
                    {error}
                </div>
            )}

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="profile-header-section">

                {/* COVER */}

                <div className="cover-wrapper">

                    {user.cover_image ? (<img
                            src={user.cover_image}
                            alt="Cover"
                            className="cover-img"
                        />

                    ) : (

                        <div className="cover-placeholder">
                            <FaImage />
                        </div>
                    )}

                    <label className="edit-cover-btn">

                        <FaCamera />

                        تعديل صورة الغلاف

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />

                    </label>

                </div>

                {/* AVATAR */}

                <div className="avatar-wrapper">

                    <div className="avatar-container">

                        <img
                            src={
                                user.avatar ||
                                "https://via.placeholder.com/150"
                            }
                            alt="Avatar"
                            className="avatar-img"
                        />

                        {/* UPLOAD */}

                        <label className="avatar-upload-badge">

                            <FaCamera />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                hidden
                            />

                        </label>

                        {/* DELETE */}

                        {user.avatar && (

                            <button
                                type="button"
                                onClick={handleDeleteImage}
                                className="avatar-delete-badge"
                                disabled={saving}
                            >
                                <FaTrash />
                            </button>

                        )}

                    </div>

                    {/* USER INFO */}

                    <div className="user-info-text">

                        <h2>

                            {user.name}

                            <span
                                onClick={() =>
                                    setIsEditing(
                                        !isEditing
                                    )
                                }
                                className="pen-edit-btn"
                            >
                                <FaPen />
                            </span>

                        </h2>

                        {user.bio && (
                            <p>{user.bio}</p>
                        )}

                    </div>

                </div>

            </div>

            {/* ==================================================
                STATS
            ================================================== */}

            <div className="stats-cards-grid">

                <div className="stat-card">

                    <span className="card-icon">
                        <FaHeart />
                    </span>

                    <h3>
                        الأماكن المفضلة
                    </h3>

                    <p>
                        {user.favorites_count} مكان
                    </p>

                </div>

                <div className="stat-card">

                    <span className="card-icon">
                        <FaBookOpen />
                    </span>

                    <h3>
                        حجوزاتي
                    </h3>

                    <p>
                        {user.bookings_count} رحلات
                    </p>

                </div>

                <div className="stat-card">
                <span className="card-icon">
                        <FaStar />
                    </span>

                    <h3>
                        تقييماتي
                    </h3>

                    <p>
                        {user.reviews_count} تقييمات
                    </p>

                </div>

                <div className="stat-card">

                    <span className="card-icon">
                        <FaCog />
                    </span>

                    <h3>
                        الإعدادات
                    </h3>

                    <p>
                        كل الإعدادات
                    </p>

                </div>

            </div>

            {/* ==================================================
                USER DETAILS
            ================================================== */}

            <div className="user-details-form">

                <div className="form-grid">

                    {/* NAME */}

                    <div className="form-group">

                        <label>
                            <FaUser />
                            الاسم الكامل
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={user.name || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    {/* USERNAME */}

                    <div className="form-group">

                        <label>
                            <FaIdCard />
                            اسم الحساب
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={user.username || ""}
                            readOnly
                        />

                    </div>

                    {/* PHONE */}

                    <div className="form-group">

                        <label>
                            <FaPhone />
                            رقم الهاتف
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={user.phone || ""}
                            onChange={handleChange}
                            readOnly={!isEditing}
                        />

                    </div>

                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            <FaEnvelope />
                            البريد الإلكتروني
                        </label>

                        <input
                            type="email"
                            value={user.email || ""}
                            readOnly
                        />

                        <button
                            type="button"
                            className="edit-email-btn"
                            onClick={openEmailModal}
                        >
                            تعديل البريد
                        </button>

                    </div>

                </div>

                {/* SAVE */}

                {isEditing && (

                    <div className="form-actions-btn">

                        <button
                            type="button"
                            className="save-profile-btn"
                            onClick={handleSaveProfile}
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
            {/* ==================================================
                FOOTER ACTIONS
            ================================================== */}

            <div className="profile-footer-actions">

                {/* PASSWORD */}

                <button
                    type="button"
                    onClick={() =>
                        setShowPasswordModal(true)
                    }
                    className="reset-password-btn"
                >

                    <FaLock />

                    تغيير كلمة المرور

                </button>

                {/* DELETE ACCOUNT */}

                <button
                    type="button"
                    onClick={() =>
                        setShowDeleteAccountModal(true)
                    }
                    className="delete-account-btn"
                >

                    <FaTrash />

                    حذف الحساب

                </button>

            </div>

            {/* ==================================================
                PASSWORD MODAL
            ================================================== */}

            {showPasswordModal && (

                <div className="modal-overlay">

                    <div className="profile-modal">

                        <button
                            className="modal-close"
                            onClick={() =>
                                setShowPasswordModal(false)
                            }
                        >
                            <FaTimes />
                        </button>

                        <h2>
                            تغيير كلمة المرور
                        </h2>

                        <form
                            onSubmit={
                                handlePasswordSubmit
                            }
                        >

                            <div className="form-group">

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

                            <div className="form-group">

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

                            <div className="form-group">

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
                                className="save-profile-btn"
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

            {/* ==================================================
                EMAIL MODAL
            ================================================== */}

            {showEmailModal && (

                <div className="modal-overlay">

                    <div className="profile-modal">

                        <button
                            className="modal-close"
                            onClick={() =>
                                setShowEmailModal(false)
                            }
                        >
                            <FaTimes />
                        </button>

                        <h2>
                            تعديل البريد الإلكتروني
                        </h2>

                        <form
                            onSubmit={
                                handleEmailSubmit
                            }
                        >

                            <div className="form-group">

                                <label>
                                    البريد الإلكتروني الجديد
                                </label>

                                <input
                                    type="email"
                                    value={
                                        emailData.email
                                    }
                                    onChange={
                                        handleEmailChange
                                    }
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="save-profile-btn"
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

            {/* ==================================================
                DELETE ACCOUNT MODAL
            ================================================== */}

            {showDeleteAccountModal && (

                <div className="modal-overlay">

                    <div className="profile-modal delete-modal">

                        <button
                            className="modal-close"
                            onClick={() =>
                                setShowDeleteAccountModal(false)
                            }
                        >
                            <FaTimes />
                        </button>

                        <h2>
                            حذف الحساب
                        </h2>

                        <p>
                            هل أنت متأكد من حذف حسابك؟
                            لا يمكن التراجع عن هذه العملية.
                        </p>

                        <div className="modal-actions">
                        <button
                                type="button"
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
                                onClick={
                                    handleDeleteAccount
                                }
                                disabled={saving}
                                className="delete-confirm-btn"
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

        </div>
    );
};

export default Profile;