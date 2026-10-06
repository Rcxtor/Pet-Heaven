import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getallPet } from "../services/petService"
import { getImageUrl } from "../utils/imageUrl";
import PetCard from "../components/PetCard";

import pet1 from "../assets/image/pet1.jpg";
import pet2 from "../assets/image/pet2.jpg";
import pet3 from "../assets/image/pet3.jpg";
import pet4 from "../assets/image/pet4.jpg";
import pet5 from "../assets/image/pet5.jpg";

const heroImages = [pet1, pet2, pet3, pet4, pet5];


const features = [
    {
        text: "Find Your Perfect Companion",
        path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    },
    {
        text: "Support Animal Welfare",
        path: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
        text: "Simple & Safe Adoption Process",
        path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
        text: "A Brighter Future for Pets",
        path: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    },
];

const steps = [
    { title: "Browse", text: "Look through pets waiting for a home and find your match." },
    { title: "Apply", text: "Send an adoption request and tell the owner about yourself." },
    { title: "Meet & Adopt", text: "Once you're selected, the owner shares their contact details." },
];

function Home() {
    const { user } = useAuth();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        document.title = "Pet Heaven";
        async function loadPets() {
            try {
                const data = await getallPet();
                const list = Array.isArray(data) ? data : data.pets || data.data || [];
                setPets(list.filter((p) => p.status !== "adopted").slice(0, 3));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        
        loadPets();
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length);
        }, 5000);
    
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fade-in">

            {/* Hero */}
            <section className="bg-gradient-to-br from-brand-50 via-white to-green-50 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 flex flex-col-reverse lg:flex-row items-center gap-12">

                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
                            {user ? `🐾 Welcome back, ${user.name.split(" ")[0]}` : "🐾 #AdoptDontShop"}
                        </span>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Better Homes<br />for Happier <span className="text-brand-700">Pets</span>
                        </h1>

                        <p className="text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 mb-8">
                            Adopt, don't shop. Give a pet a second chance at a loving home.
                            Thousands of furry friends are waiting for someone just like you.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <Link
                                to="/pets"
                                className="bg-brand-700 hover:bg-brand-800 text-white font-semibold px-8 py-3.5 rounded-lg transition shadow-md hover:shadow-lg text-base text-center"
                            >
                                Browse Pets
                            </Link>
                            <Link
                                to={user ? "/add-pet" : "/register"}
                                className="border-2 border-gray-200 hover:border-brand-700 text-gray-700 hover:text-brand-700 font-semibold px-8 py-3.5 rounded-lg transition text-base text-center"
                            >
                                {user ? "Post a Pet" : "Join Free"}
                            </Link>
                        </div>
                    </div>

                    {/* <div className="flex-1 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-200/30 rounded-[2rem] rotate-3"></div>
                            <img
                                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80"
                                alt="Happy dog"
                                className="relative rounded-2xl shadow-xl w-full max-w-md object-cover aspect-[4/5]"
                            />
                        </div>
                    </div> */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-full max-w-md">
                            <div className="absolute -inset-4 bg-brand-200/30 rounded-[2rem] rotate-3"></div>

                            <div className="relative aspect-[4/5] rounded-2xl shadow-xl overflow-hidden">
                                {heroImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt="Happy pet"
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                                            index === current ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {features.map((f) => (
                            <div key={f.text} className="flex flex-col items-center gap-3">
                                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center">
                                    <svg className="w-7 h-7 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={f.path} />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-gray-800 max-w-[10rem]">{f.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured pets */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Pets Looking for Homes</h2>
                            <p className="text-gray-500 mt-1">Meet some of our adorable friends</p>
                        </div>
                        <Link
                            to="/pets"
                            className="hidden sm:flex items-center gap-1 text-brand-700 font-semibold text-sm hover:text-brand-800"
                        >
                            View all
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-400 py-10">Loading pets...</p>
                    ) : pets.length === 0 ? (
                        <p className="text-center text-gray-400 py-10">No pets listed yet. Be the first to post one!</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pets.map((pet) => (
                                <PetCard
                                    key={pet.id}
                                    pet={pet}
                                    imageUrl={
                                        pet.images && pet.images.length > 0
                                            ? getImageUrl(pet.images[0].image_path)
                                            : null
                                    }
                                />
                            ))}
                        </div>
                    )}

                    <div className="mt-8 text-center sm:hidden">
                        <Link to="/pets" className="text-brand-700 font-semibold text-sm">
                            View all pets →
                        </Link>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How It Works</h2>
                        <p className="text-gray-500 mt-1">Three simple steps to a new best friend</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="bg-white rounded-xl border border-gray-100 p-6 shadow-soft text-center hover:shadow-card transition"
                            >
                                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
                                    {index + 1}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                                <p className="text-sm text-gray-500">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-brand-700">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
                    <p className="text-brand-200 mb-8 text-lg">
                        Whether you want to adopt or find a home for a pet, every action helps save a life.
                    </p>
                    <Link
                        to={user ? "/add-pet" : "/register"}
                        className="inline-block bg-white hover:bg-brand-50 text-brand-700 font-semibold px-10 py-4 rounded-lg transition shadow-md text-base"
                    >
                        {user ? "Post a Pet" : "Get Started Free"}
                    </Link>
                </div>
            </section>

        </div>
    );
}

export default Home;