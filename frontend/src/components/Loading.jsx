const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-14 h-14 border-4",
};

function Spinner({ size = "md", label }) {
    return (
        <div
            className={`${sizeClasses[size]} border-gray-200 border-t-brand-700 rounded-full animate-spin`}
            role="status"
            aria-label={label}
        />
    );
}

export default function Loading({ message = "Loading...", size = "md" }) {
    return (
        <div className="fade-in flex flex-col items-center justify-center pt-40 pb-16">
            <Spinner size={size} label={message} />
            {message && (
                <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
            )}
        </div>
    );
}

export function LoadingOverlay({ message = "Loading..." }) {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white border border-gray-200 px-8 py-6 rounded-2xl shadow-lg flex flex-col items-center gap-4">
                <Spinner size="md" label={message} />
                <p className="text-gray-700 text-sm font-medium">{message}</p>
            </div>
        </div>
    );
}