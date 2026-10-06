import { useNavigate } from "react-router-dom";

function BackButton({ to, label = "Back" }) {
    const navigate = useNavigate();

    return (
        <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-700 mb-6 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            {label}
        </button>
    );
}

export default BackButton;