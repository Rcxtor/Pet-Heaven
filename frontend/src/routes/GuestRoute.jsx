import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

function GuestRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading/>;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default GuestRoute;