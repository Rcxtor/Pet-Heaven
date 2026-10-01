import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {getProfile, updateProfile, changePassword, deleteAccount,} from "../services/profileService";

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
        return <p>Loading profile...</p>;
    }

    if (!user) {
        return <p>Unable to load profile.</p>;
    }

    return (
        <div>

            <h1>My Profile</h1>

            {location.state?.returnTo && (
                <button type="button" onClick={() => { navigate(location.state.returnTo);}}>
                    ← Back
                </button>
            )}

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            {!editing ? (
                <div>

                    <h2>Personal Information</h2>

                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>

                    <p>
                        <strong>Phone:</strong>{" "}
                        {user.phone || "Not provided"}
                    </p>

                    <p>
                        <strong>City:</strong>{" "}
                        {user.city || "Not provided"}
                    </p>

                    <button
                        type="button"
                        onClick={() => setEditing(true)}
                    >
                        Edit Profile
                    </button>

                </div>
            ) : (
                <form onSubmit={handleUpdateProfile}>

                    <h2>Edit Profile</h2>

                    <div>
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            value={user.email}
                            disabled
                        />

                        <small>
                            Email cannot be changed here.
                        </small>
                    </div>

                    <div>
                        <label>Phone</label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>City</label>

                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                </form>
            )}
            <div>
                <h2>Change Password</h2>

                {passwordMessage && (
                    <p>{passwordMessage}</p>
                )}

                {passwordError && (
                    <p>{passwordError}</p>
                )}

                <form onSubmit={handleChangePassword}>

                    <div>
                        <label>Current Password</label>

                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                            <label>New Password</label>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label>Confirm New Password</label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={changingPassword}
                    >
                        {changingPassword
                            ? "Changing..."
                            : "Change Password"}
                    </button>

                </form>
            </div>

            {/* delete account */}
            <div>
                <h2>Danger Zone</h2>

                <p>
                    Deleting your account is permanent.
                </p>

                <p>
                    You cannot delete your account while you own
                    pets or have adoption history.
                </p>

                {!deleteOpen ? (
                    <button
                        type="button"
                        onClick={() => {
                            setDeleteOpen(true);
                            setDeleteError("");
                        }}
                    >
                        Delete Account
                    </button>
                ) : (
                    <div>
                        <h3>Confirm Account Deletion</h3>

                        <p>
                            Type <strong>DELETE</strong> to confirm.
                        </p>

                        <input
                            type="text"
                            value={deleteText}
                            onChange={(e) => setDeleteText(e.target.value)}
                            placeholder="Type DELETE"
                        />

                        {deleteError && (
                            <p>{deleteError}</p>
                        )}

                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                        >
                            {deleting
                                ? "Deleting..."
                                : "DELETE ACCOUNT"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setDeleteOpen(false);
                                setDeleteText("");
                                setDeleteError("");
                            }}
                            disabled={deleting}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;