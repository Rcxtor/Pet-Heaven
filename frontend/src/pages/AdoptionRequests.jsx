import { useState,useEffect } from "react";
import ReceivedAdoptions from "./ReceivedAdoptions";
import MyAdoptions from "./MyAdoptionsRequest";

function AdoptionRequests() {
    const [activeTab, setActiveTab] = useState("sent");
    useEffect(() => {
        document.title = "Adoption Requests - PetHeaven";
    }, []);
    return (
        <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 py-10">

    <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Adoption Requests</h1>
        <p className="text-gray-500 text-sm mt-1">
            Manage and track all of your adoption requests
        </p>
    </div>

    {/* Tabs */}
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-8">
        <button
            type="button"
            onClick={() => setActiveTab("sent")}
            className={`px-5 py-2 text-sm rounded-md transition cursor-pointer ${
                activeTab === "sent"
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
            }`}
        >
            Requests Sent
        </button>

        <button
            type="button"
            onClick={() => setActiveTab("received")}
            className={`px-5 py-2 text-sm rounded-md transition cursor-pointer ${
                activeTab === "received"
                    ? "bg-white text-brand-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
            }`}
            // className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition ${
            //             activeTab === "received"
            //                 ? "bg-white text-brand-700 shadow-sm"
            //                 : "text-gray-500 hover:text-gray-700"
            //         }`}
        >
            Requests Received
        </button>
    </div>

    {/* Content */}
    <div key={activeTab} className="fade-in -mt-10">
        {activeTab === "sent" ? <MyAdoptions embedded={true} /> : <ReceivedAdoptions embedded={true} />}
    </div>
</div>
    );
}

export default AdoptionRequests;