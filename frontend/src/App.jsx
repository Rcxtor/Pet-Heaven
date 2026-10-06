import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddPet from "./pages/AddPet";
import ViewPet from "./pages/PetDetails";
import Pets from "./pages/Pets";
import EditPet from "./pages/EditPet";
import AdoptionForm from "./pages/AdoptionForm";
import MyAdoptions from "./pages/MyAdoptionsRequest";
import ReceivedAdoptions from "./pages/ReceivedAdoptions";
import NotFound from "./pages/NotFound";
import AdoptionRequestDetails from "./pages/AdoptionRequestDetails";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import MyPets from "./pages/MyPets";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import AdoptionRequests from "./pages/AdoptionRequests";

import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="/pet/:id" element={<ViewPet />} />
                <Route path="/pets/" element={<Pets />} />
                <Route path="*" element={<NotFound/>}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                {/* auth routes */}
                <Route path="/add-pet" element={ <ProtectedRoute>< AddPet/></ProtectedRoute> } />
                <Route path="/pet/:id/edit" element={<ProtectedRoute><EditPet/></ProtectedRoute>} />
                <Route path="/pet/:petId/adoption-form" element={<ProtectedRoute><AdoptionForm/></ProtectedRoute>} />
                <Route path="/my-requests" element={<ProtectedRoute><MyAdoptions/></ProtectedRoute>} />
                <Route path="/received-adoptions" element={<ProtectedRoute><ReceivedAdoptions/></ProtectedRoute>} />
                <Route path="/received-adoptions/:id" element={<ProtectedRoute><AdoptionRequestDetails/></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                <Route path="/my-pets" element={<ProtectedRoute><MyPets/></ProtectedRoute>} />
                <Route path="/adoption-requests" element={<ProtectedRoute><AdoptionRequests/></ProtectedRoute>} />
                


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