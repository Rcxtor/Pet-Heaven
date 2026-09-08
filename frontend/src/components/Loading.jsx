export default function Loading({ message = "Loading...", size = "md" }) {
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div
                className={`${sizeClasses[size]} border-indigo-600 border-t-transparent rounded-full animate-spin`}
                role="status"
                aria-label={message}
            />
            {message && (
                <p className="mt-3 text-gray-600 text-sm">{message}</p>
            )}
        </div>
    );
}

export function LoadingOverlay({ message = "Loading..." }) {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center space-y-3">
                <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    );
}