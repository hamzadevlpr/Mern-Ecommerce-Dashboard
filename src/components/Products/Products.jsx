import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Filter from '../Pages/Filter';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';


function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://mern-ecommerce-413i.onrender.com/api/products");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    return (
        <>
            <div className="flex justify-center flex-wrap sm:justify-between">
                <h3 className="text-gray-800 font-bold py-5 text-2xl">Products Gallery</h3>
                <div className=" flex justify-center gap-2 py-4">
                    <button class="inline-flex items-center px-4 py-1 border-2  text-gray-800 text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        Export
                    </button>

                    <NavLink to={'/add'} className="inline-flex items-center px-4 py-1 border-2 bg-blue-600 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        Create New
                    </NavLink>
                </div>
            </div>
            <main className="bg-white p-5">
                <Filter />
                <div className="container mx-auto px-6">
                    {loading ? (
                        // Render loading spinner while products are being fetched
                        <div className="flex justify-center mt-20 h-screen">
                            <ClipLoader color="#000" size={80} className='h-96' />
                        </div>
                    ) : (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                            {
                                products.map((item) => {
                                    return (
                                        <div className="w-full max-w-sm mx-auto rounded-md overflow-hidden border-2">
                                            <img
                                                className="flex items-end justify-end h-52 w-full object-cover "
                                                src={item.imageURL} alt={item.title}
                                            />
                                            <div className="px-5 py-3">
                                                <h3 className="text-gray-700">{item.title}</h3>
                                                <span className="text-gray-800 mt-2 font-bold">$ {item.price}</span>
                                            </div>
                                            <div className="flex justify-center gap-2 py-4">
                                                <button class="inline-flex items-center px-4 py-1 border-2 text-gray-800 text-sm font-medium rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                    </svg>
                                                    Edit
                                                </button>
                                                <button class="inline-flex items-center px-4 py-1 border-2 text-red-600 text-sm font-medium rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                    <div className="flex justify-center">
                        <div className="flex rounded-md mt-8">
                            <a
                                href="#"
                                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white"
                            >
                                <span>Previous</span>
                            </a>
                            <a
                                href="#"
                                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
                            >
                                <span>1</span>
                            </a>
                            <a
                                href="#"
                                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
                            >
                                <span>2</span>
                            </a>
                            <a
                                href="#"
                                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white"
                            >
                                <span>3</span>
                            </a>
                            <a
                                href="#"
                                className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white"
                            >
                                <span>Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Products