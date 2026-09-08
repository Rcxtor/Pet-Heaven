import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddPet from "./pages/AddPet";
import ViewPet from "./pages/PetDetails";
import Pets from "./pages/Pets";
import EditPet from "./pages/EditPet";

import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";


function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="/pet/:id" element={<ViewPet />} />
                <Route path="/pets/" element={<Pets />} />
                
                {/* auth routes */}
                <Route path="/addPet" element={ <ProtectedRoute>< AddPet/></ProtectedRoute> } />
                <Route path="/pet/:id/edit" element={<ProtectedRoute><EditPet/></ProtectedRoute>} />


                {/* non-auth routes */}
                <Route path="/register" element={ <GuestRoute><Register /></GuestRoute> } />
                <Route path="/login" element={ <GuestRoute><Login /></GuestRoute>} />
            </Route>
        </Routes>
    );
}

function App() {
    return <AppRoutes />;
}

export default App;