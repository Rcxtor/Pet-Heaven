import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
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
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="dashboard">
            <section className="dashboard-welcome">
                <div>
                    <h1>Welcome back, {user?.name}!</h1>
                    <p>
                        Manage your pets and keep track of your adoption
                        activity.
                    </p>
                </div>

                <Link to="/add-pet">
                    + Add Pet
                </Link>
            </section>
{/* stats */}
            <section className="dashboard-stats">

                <div className="stat-card">
                    <h3>My Pets</h3>
                    <p>{dashboard.stats.myPets}</p>
                </div>

                <div className="stat-card">
                    <h3>Requests Sent</h3>
                    <p>{dashboard.stats.requestsSent}</p>
                </div>

                <div className="stat-card">
                    <h3>Requests Received</h3>
                    <p>{dashboard.stats.requestsReceived}</p>
                </div>

                <div className="stat-card">
                    <h3>Adopted Pets</h3>
                    <p>{dashboard.stats.adoptedPets}</p>
                </div>

            </section>
{/* mypets */}
            <section className="dashboard-section">

                <div className="section-header">
                    <h2>My Pets</h2>

                    <Link to="/my-pets">
                        View All
                    </Link>
                </div>

                {dashboard.myPets.length === 0 ? (
                    <p>You haven't added any pets yet.</p>
                ) : (
                    <div className="dashboard-pets">

                        {dashboard.myPets.map((pet) => (
                            <div
                                className="dashboard-pet-card"
                                key={pet.id}
                            >
                                <h3>{pet.name}</h3>

                                <p>
                                    Species: {pet.species}
                                </p>

                                <p>
                                    Status: {pet.status}
                                </p>
                            </div>
                        ))}

                    </div>
                )}

            </section>

{/* Adoption Req Receive */}
            <section className="dashboard-section">

                <div className="section-header">
                    <h2>Recent Adoption Requests</h2>

                    <Link to="/received-adoptions">
                        View All
                    </Link>
                </div>

                {dashboard.requestsReceived.length === 0 ? (
                    <p>No adoption requests received yet.</p>
                ) : (
                    <div className="dashboard-request-list">

                        {dashboard.requestsReceived.map((request) => (
                            <div
                                className="dashboard-request"
                                key={request.id}
                            >
                                <p>
                                    Request #{request.id}
                                </p>

                                <p>
                                    Status: {request.status}
                                </p>
                            </div>
                        ))}

                    </div>
                )}

            </section>

{/* My request */}
            <section className="dashboard-section">

                <div className="section-header">
                    <h2>Requests I Have Sent</h2>

                    <Link to="/my-requests">
                        View All
                    </Link>
                </div>

                {dashboard.requestsSent.length === 0 ? (
                    <p>You haven't submitted any adoption requests.</p>
                ) : (
                    <div className="dashboard-request-list">

                        {dashboard.requestsSent.map((request) => (
                            <div
                                className="dashboard-request"
                                key={request.id}
                            >
                                <p>
                                    Request #{request.id}
                                </p>

                                <p>
                                    Status: {request.status}
                                </p>
                            </div>
                        ))}

                    </div>
                )}

            </section>

{/* quick actions  */}
            <section className="dashboard-section">

                <h2>Quick Actions</h2>

                <div className="quick-actions">

                    <Link to="/add-pet">
                        Add Pet
                    </Link>

                    <Link to="/pets">
                        Browse Pets
                    </Link>

                    <Link to="/my-requests">
                        My Requests
                    </Link>

                    <Link to="/adoption-history">
                        Adoption History
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;

