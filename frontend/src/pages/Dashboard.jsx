import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/imageUrl";
import Loading from "../components/Loading";


const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    available: "bg-green-100 text-green-700",
    adopted: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
};

function StatusBadge({ status }) {
    const style = statusStyles[status] || "bg-gray-100 text-gray-600";
    return (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${style}`}>
            {status}
        </span>
    );
}

function ReceivedRequestList({ requests, emptyText }) {
    if (requests.length === 0) {
        return <p className="text-sm text-gray-400 py-4">{emptyText}</p>;
    }

    return (
        <div className="divide-y divide-gray-100">
            {requests.map((request) => {
                const pet = request.pet;

                const imagePath =
                    pet?.images?.length > 0
                        ? pet.images[0]?.image_path
                        : pet?.image;

                const submittedDate = new Date(
                    request.created_at
                ).toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                });

                return (
                    <Link to={`/received-adoptions/${request.id}`} key={request.id} className="flex hover:bg-gray-200 -mx-2 px-2 rounded-lg transition items-center justify-between gap-3 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                                {imagePath ? (
                                    <img
                                    src={getImageUrl(imagePath)}
                                    alt={pet?.name || "Pet"}
                                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                    />
                                ) : (
                                    <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs text-gray-400">
                                            No image
                                        </span>
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="text-sm text-gray-800">
                                        <span className="font-semibold">
                                            {request.user?.name || "User"}
                                        </span>{" "}
                                        wants to adopt{" "}
                                        <span className="font-semibold">
                                            {pet?.name || "Pet"}
                                        </span>
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Submitted on {submittedDate}
                                    </p>
                                </div>
                        </div>

                        <span
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0 ${
                                request.status === "Selected"
                                ? "bg-green-100 text-green-700"
                                : request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : request.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                            >
                            {request.status}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
function SentRequestList({ requests, emptyText }) {
    if (requests.length === 0) {
        return <p className="text-sm text-gray-400 py-4">{emptyText}</p>;
    }

    return (
        <div className="divide-y divide-gray-100">
            {requests.map((request) => {
                const pet = request.pet;
                const imagePath = pet?.images?.length > 0 ? pet.images[0]?.image_path : pet?.image;

                return (
                    <div key={request.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            {imagePath ? (
                                <img src={getImageUrl(imagePath)} alt={pet?.name || "Pet"} className="w-11 h-11 rounded-full object-cover" onError={(e) => {e.currentTarget.style.display = "none";}}/>
                            ) : (
                                <div className="pl-2 w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-xs text-gray-400">
                                        No image
                                    </span>
                                </div>
                            )}

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    {pet?.name || "Unknown Pet"}
                                </p>

                                <p className="text-xs text-gray-400 capitalize">
                                    {pet?.species || "Unknown"}
                                </p>

                                <p className="text-xs text-gray-400">
                                    Request #{request.id}
                                </p>
                            </div>
                        </div>

                        <span
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                                request.status === "Selected"
                                ? "bg-green-100 text-green-700"
                                : request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : request.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                            >
                            {request.status}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

function Dashboard() {
    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Dashboard - PetHeaven";
        async function loadDashboard() {
            try {
                const data = await getDashboard();
                setDashboard(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load dashboard.");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <p className="text-center text-red-600 py-20">{error}</p>;
    }

    const stats = [
        {
            label: "My Pets",
            value: dashboard.stats.myPets,
            box: "bg-brand-50",
            icon: "text-brand-700",
            path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
            label: "Requests Sent",
            value: dashboard.stats.requestsSent,
            box: "bg-blue-50",
            icon: "text-blue-600",
            path: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
        },
        {
            label: "Requests Received",
            value: dashboard.stats.requestsReceived,
            box: "bg-yellow-50",
            icon: "text-yellow-600",
            path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
        },
        {
            label: "Adopted Pets",
            value: dashboard.stats.adoptedPets,
            box: "bg-pink-50",
            icon: "text-pink-600",
            path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        },
    ];

    return (
        <div className="fade-in max-w-6xl mx-auto px-4 sm:px-6 py-10">

            {/* Welcome */}
            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xl">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                        <p className="text-gray-500 text-sm">Here's what's happening with your account.</p>
                    </div>
                </div>

                <Link
                    to="/add-pet"
                    className="hidden sm:flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Pet
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white shadow-md  rounded-xl border border-gray-100 p-5 text-center shadow-soft">
                        <div className={`w-10 h-10 ${stat.box} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                            <svg className={`w-5 h-5 ${stat.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.path} />
                            </svg>
                        </div>
                        <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* My Pets */}
                    <div className="bg-white shadow-md rounded-xl border border-gray-100 p-6 shadow-soft">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-gray-900">My Pets</h2>

                            <Link
                                to="/my-pets"
                                className="text-sm text-brand-700 font-medium hover:underline"
                            >
                                View all →
                            </Link>
                        </div>

                        {dashboard.myPets.length === 0 ? (
                            <p className="text-sm text-gray-400 py-4">
                                You haven't added any pets yet.
                            </p>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {dashboard.myPets.map((pet) => {
                                    // Get image from images relationship first
                                    const imagePath =
                                        pet.images?.length > 0
                                            ? pet.images[0]?.image_path
                                            : pet.image;

                                    return (
                                        <Link
                                            key={pet.id}
                                            to={`/pet/${pet.id}`}
                                            className="flex items-center justify-between py-3 hover:bg-gray-200 -mx-2 px-2 rounded-lg transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                {imagePath ? (
                                                    <img
                                                        src={getImageUrl(imagePath)}
                                                        alt={pet.name}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = "none";
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <span className="text-xs text-gray-400">
                                                            No image
                                                        </span>
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {pet.name}
                                                    </p>

                                                    <p className="text-xs text-gray-400 capitalize">
                                                        {pet.species}
                                                    </p>
                                                </div>
                                            </div>

                                            <StatusBadge status={pet.status} />
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                {/* Requests received */}
                <div className="bg-white shadow-md rounded-xl border border-gray-100 p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-bold text-gray-900">Recent Adoption Requests</h2>
                        <Link to="/received-adoptions" className="text-sm text-brand-700 font-medium hover:underline">
                            View all →
                        </Link>
                    </div>
                    <ReceivedRequestList
                        requests={dashboard.requestsReceived}
                        emptyText="No adoption requests received yet."
                    />
                </div>

                {/* Requests sent */}
                <div className="bg-white shadow-md rounded-xl border border-gray-100 p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-bold text-gray-900">Requests I Have Sent</h2>
                        <Link to="/my-requests" className="text-sm text-brand-700 font-medium hover:underline">
                            View all →
                        </Link>
                    </div>
                    <SentRequestList
                        requests={dashboard.requestsSent}
                        emptyText="You haven't submitted any adoption requests."
                    />
                </div>

                {/* Quick actions */}
                <div className="bg-white shadow-md rounded-xl border border-gray-100 p-6 shadow-soft">
                    <h2 className="font-bold text-gray-900 mb-5">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { to: "/add-pet", label: "Add Pet" },
                            { to: "/pets", label: "Browse Pets" },
                            { to: "/my-requests", label: "My Requests" },
                            { to: "/adoption-history", label: "Adoption History" },
                        ].map((action) => (
                            <Link
                                key={action.to}
                                to={action.to}
                                className="text-center text-sm font-semibold border-2 border-gray-200 hover:border-brand-700 text-gray-700 hover:text-brand-700 py-3 rounded-lg transition"
                            >
                                {action.label}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;

