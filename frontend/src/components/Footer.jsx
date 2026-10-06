export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
                <p>&copy; 2026 PetHeaven. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-gray-600">Privacy</a>
                    <a href="#" className="hover:text-gray-600">Terms</a>
                    <a href="#" className="hover:text-gray-600">Contact</a>
                </div>
            </div>
        </footer>
    );
}