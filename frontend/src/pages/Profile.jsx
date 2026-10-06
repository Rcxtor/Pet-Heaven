import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {getProfile, updateProfile, changePassword, deleteAccount,} from "../services/profileService";
import Loading from "../components/Loading";

const inputClass ="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:border-brand-700 focus:ring-1 focus:ring-brand-700 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed";
const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
const primaryBtn ="bg-brand-700 hover:bg-brand-800 text-white font-semibold px-6 py-2.5 rounded-lg transition shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";
const secondaryBtn = "border-2 border-gray-200 hover:border-brand-700 text-gray-700 hover:text-brand-700 font-semibold px-6 py-2.5 rounded-lg transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";
const cardClass = "bg-white border border-gray-200 rounded-2xl p-6 shadow-sm";

function Profile() {

    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteText, setDeleteText] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);

            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const loadProfile = async () => {
        try {
            const data = await getProfile();

            setUser(data.user);

            setName(data.user.name || "");
            setPhone(data.user.phone || "");
            setCity(data.user.city || "");

        } catch (error) {
            console.error(error);
            setError("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user?.name) {
            document.title = `${user.name.split(' ')[0]+"'s Profile"} - PetHeaven`;
        }
        }, [user]);
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");
        setSaving(true);

        try {
            const data = await updateProfile({
                name,
                phone,
                city,
            });

            setUser(data.user);

            setName(data.user.name || "");
            setPhone(data.user.phone || "");
            setCity(data.user.city || "");

            setEditing(false);
            setMessage("Profile updated successfully.");

        } catch (error) {
            console.error(error);

            if (error.response?.data?.errors) {
                setError(
                    Object.values(error.response.data.errors)
                        .flat()
                        .join(" ")
                );
            } else {
                setError(
                    error.response?.data?.message ||
                    "Failed to update profile."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setName(user.name || "");
        setPhone(user.phone || "");
        setCity(user.city || "");

        setEditing(false);
        setError("");
        setMessage("");
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setPasswordError("");
        setPasswordMessage("");
        setChangingPassword(true);

        try {
            await changePassword({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            });

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setPasswordMessage("Password changed successfully.");

        } catch (error) {
            console.error(error);

            if (error.response?.data?.errors) {
                setPasswordError(
                    Object.values(error.response.data.errors)
                        .flat()
                        .join(" ")
                );
            } else {
                setPasswordError(
                    error.response?.data?.message ||
                    "Failed to change password."
                );
            }
        } finally {
            setChangingPassword(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteText !== "DELETE") {
            setDeleteError("Please type DELETE to confirm.");
            return;
        }

        setDeleteError("");
        setDeleting(true);

        try {
            await deleteAccount();

            localStorage.removeItem("token");

            window.location.href = "/login";

        } catch (error) {
            console.error(error);

            setDeleteError(
                error.response?.data?.message ||
                "Failed to delete account."
            );

        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
            return <Loading/>;
    }

    if (!user) {
        return <p>Unable to load profile.</p>;
    }

    return (
        <div className="fade-in max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            {location.state?.returnTo && (
                <button type="button" onClick={() => { navigate(location.state.returnTo); }} className="text-sm font-semibold text-brand-700 hover:underline">
                    ← Back
                </button>
            )}

            {message && (
                <p className="bg-green-100 text-green-700 text-sm font-medium px-4 py-3 rounded-lg">
                    {message}
                </p>
            )}
            {error && (
                <p className="bg-red-100 text-red-700 text-sm font-medium px-4 py-3 rounded-lg">
                    {error}
                </p>
            )}

            {/* Personal info */}
            <div className={cardClass}>
                {!editing ? (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            Personal Information
                        </h2>

                        <dl className="space-y-3 text-gray-600">
                            <div className="flex gap-2">
                                <dt className="w-20 font-semibold text-gray-900">Name</dt>
                                <dd>{user.name}</dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="w-20 font-semibold text-gray-900">Email</dt>
                                <dd>{user.email}</dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="w-20 font-semibold text-gray-900">Phone</dt>
                                <dd>{user.phone || "Not provided"}</dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="w-20 font-semibold text-gray-900">City</dt>
                                <dd>{user.city || "Not provided"}</dd>
                            </div>
                        </dl>

                        <button
                            type="button"
                            onClick={() => setEditing(true)}
                            className={`${secondaryBtn} mt-6`}
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>

                        <div>
                            <label className={labelClass}>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Email</label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className={inputClass}
                            />
                            <small className="text-gray-500 text-xs mt-1 block">
                                Email cannot be changed here.
                            </small>
                        </div>

                        <div>
                            <label className={labelClass}>Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={saving} className={primaryBtn}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                disabled={saving}
                                className={secondaryBtn}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Change password */}
            <div className={cardClass}>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Change Password</h2>

                {passwordMessage && (
                    <p className="bg-green-100 text-green-700 text-sm font-medium px-4 py-3 rounded-lg mb-4">
                        {passwordMessage}
                    </p>
                )}
                {passwordError && (
                    <p className="bg-red-100 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-4">
                        {passwordError}
                    </p>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className={labelClass}>Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={inputClass}
                        />
                    </div>

                    <button type="submit" disabled={changingPassword} className={primaryBtn}>
                        {changingPassword ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>

            {/* Delete account */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-red-700 mb-2">Danger Zone</h2>

                <p className="text-gray-700 text-sm">Deleting your account is permanent.</p>
                <p className="text-gray-600 text-sm mt-1">
                    You cannot delete your account while you own pets or have adoption history.
                </p>

                {!deleteOpen ? (
                    <button
                        type="button"
                        onClick={() => {
                            setDeleteOpen(true);
                            setDeleteError("");
                        }}
                        className="mt-5 border-2 border-red-300 hover:bg-red-600 hover:border-red-600 text-red-600 hover:text-white font-semibold px-6 py-2.5 rounded-lg transition cursor-pointer"
                    >
                        Delete Account
                    </button>
                ) : (
                    <div className="mt-5 space-y-3">
                        <h3 className="font-bold text-gray-900">Confirm Account Deletion</h3>

                        <p className="text-sm text-gray-700">
                            Type <strong>DELETE</strong> to confirm.
                        </p>

                        <input
                            type="text"
                            value={deleteText}
                            onChange={(e) => setDeleteText(e.target.value)}
                            placeholder="Type DELETE"
                            className={inputClass}
                        />

                        {deleteError && (
                            <p className="bg-red-100 text-red-700 text-sm font-medium px-4 py-3 rounded-lg">
                                {deleteError}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                disabled={deleting}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-lg transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {deleting ? "Deleting..." : "DELETE ACCOUNT"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setDeleteOpen(false);
                                    setDeleteText("");
                                    setDeleteError("");
                                }}
                                disabled={deleting}
                                className={secondaryBtn}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;