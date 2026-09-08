import { useAuth } from "../context/AuthContext";

function Home() {
    const { user } = useAuth();
    return(
        <h1>
                Welcome, {user ? user.name : "Guest"}
            </h1>
    )
}

export default Home;