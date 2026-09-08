export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-indigo-600 mb-4">Pet Heaven</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Connecting loving homes with pets in need. Every adoption saves a life.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/" className="hover:text-indigo-600">Home</a></li>
                            <li><a href="/pets" className="hover:text-indigo-600">Browse Pets</a></li>
                            <li><a href="/adoptions" className="hover:text-indigo-600">Adoptions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Contact Us</a></li>
                            <li><a href="#" className="hover:text-indigo-600">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Pet Heaven. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}