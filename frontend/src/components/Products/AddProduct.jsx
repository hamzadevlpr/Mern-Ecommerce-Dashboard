import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config';

function AddProduct(props) {
    // Form Handle
    const [formData, setFormData] = useState({
        title: "",
        imageURL: "",
        price: "",
        percent: "",
        category: "Men's Shoes", // Set default category
        desc: "",
    });

    // handleChange
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const { title, imageURL, price, percent, category, desc } = formData;

        if (!title || !imageURL || !price || !percent || !category || !desc) {
            toast.error("Fields Cannot be Empty");
        } else {
            try {
                const url = `${API_BASE_URL}/api/add`;
                const response = await axios.post(url, {
                    title,
                    imageURL,
                    price: parseFloat(price),
                    percent: parseFloat(percent),
                    category,
                    desc,
                });
                toast("Product Added Successfully", {
                    style: {
                        background: '#4BB543',
                        color: '#fff',
                    },
                });
                navigate('/products')
            } catch (error) {
                toast.error("Error occurred while adding product", {
                    style: {
                        background: 'rgb(220 38 38)',
                        color: '#fff',
                    },
                });
            }
        }
    }

    return (
        <>
            <h3 className="text-gray-800 font-bold py-5 text-2xl">{props.title}</h3>
            <div className="bg-white p-5" >
                <div className="mt-8 md:mx-14 mx-5 sm:mx-auto flex justify-center">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-5">
                            <div>
                                <label
                                    className="block mb-1 text-sm font-medium text-gray-900"
                                    htmlFor="title"
                                >
                                    Product Name
                                </label>
                                <input
                                    className="block w-full px-4 py-2 mt-2 text-gray-700
                            bg-white border-gray-300 border rounded-md focus:ring-none focus:outline-none"
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-1 text-sm font-medium text-gray-900"
                                    htmlFor="imageURL"
                                >
                                    Image URL
                                </label>
                                <input
                                    className="block w-full px-4 py-2 mt-2 text-gray-700
                            bg-white border-gray-300 border rounded-md focus:ring-none focus:outline-none"
                                    id="imageURL"
                                    type="url"
                                    name="imageURL"
                                    value={formData.imageURL}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex w-full gap-5 sm:flex-nowrap flex-wrap">
                                <div className="w-full">
                                    <label
                                        className="block mb-1 text-sm font-medium text-gray-900"
                                        htmlFor="price"
                                    >
                                        Price
                                    </label>
                                    <input
                                        className="block w-full px-4 py-2 mt-2 text-gray-700
                            bg-white border-gray-300 border rounded-md focus:ring-none focus:outline-none"
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        className="block mb-1 text-sm font-medium text-gray-900"
                                        htmlFor="percent"
                                    >
                                        Percentage
                                    </label>
                                    <input
                                        className="block w-full px-4 py-2 mt-2 text-gray-700
                            bg-white border-gray-300 border rounded-md focus:ring-none focus:outline-none"
                                        id="percent"
                                        type="number"
                                        name="percent"
                                        value={formData.percent}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full">
                                    <label
                                        className="block mb-1 text-sm font-medium text-gray-900"
                                        htmlFor="category"
                                    >
                                        Category
                                    </label>
                                    <select
                                        className="block w-full px-4 py-2 mt-2 text-gray-700
                                    bg-white border-gray-300 border rounded-md focus:ring-none focus:outline-none"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="Men's Shoes">Men's Shoes</option>
                                        <option value="Women's Shoes">Women's Shoes</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label
                                    className="block mb-1 text-sm font-medium text-gray-900"
                                    htmlFor="desc"
                                >
                                    Description
                                </label>
                                <textarea
                                    className="w-full h-40 block px-4 py-2 mt-2 text-gray-700
                            bg-white border-gray-300 border rounded-md focus:ring-none focus:outline-none"
                                    id="desc"
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="my-5">
                            <button
                                type="submit"
                                className="px-10 py-1.5  bg-blue-600 rounded-lg text-white outline-none shadow-lg transform active:scale-x-75 transition-transform"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
