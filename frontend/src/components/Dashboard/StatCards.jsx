import { ShoppingBasket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import axios from 'axios';

function StatCards() {
    // fetching total products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    return (
        <>
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                    <div className="p-4 flex items-center">
                        <div className="p-3 rounded-full text-orange-500 bg-orange-100 mr-4">
                            <ShoppingBasket />
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">
                                Total Products
                            </p>
                            <p className="text-lg font-semibold text-gray-700">
                                {products.length}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                    <div className="p-4 flex items-center">
                        <div className="p-3 rounded-full text-green-500 bg-green-100 mr-4">
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">
                                Account balance
                            </p>
                            <p className="text-lg font-semibold text-gray-700">
                                $ 46,760.89
                            </p>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                    <div className="p-4 flex items-center">
                        <div className="p-3 rounded-full text-blue-500 bg-blue-100 mr-4">
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">
                                New sales
                            </p>
                            <p className="text-lg font-semibold text-gray-700">
                                376
                            </p>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                    <div className="p-4 flex items-center">
                        <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 mr-4">
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                                <path
                                    fillRule="evenodd"
                                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-600">
                                Pending Orders
                            </p>
                            <p className="text-lg font-semibold text-gray-700">
                                35
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default StatCards