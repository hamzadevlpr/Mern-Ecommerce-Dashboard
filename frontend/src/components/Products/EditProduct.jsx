import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import { API_BASE_URL } from '../../config';

function EditProduct() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [categorys, setCategory] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [formData, setFormData] = useState({
        title: "",
        imageURL: "",
        price: "",
        percent: "",
        category: "",
        desc: "",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/api/products/${productId}`
                );

                const productData = response.data;
                setFormData({
                    title: productData.title,
                    imageURL: productData.imageURL,
                    price: productData.price,
                    percent: productData.percent,
                    category: productData.category,
                    desc: productData.desc,
                });
                setLoading(false); // Mark loading as false when data is fetched
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        setLoading(true);
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/category`);
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching category data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch the original product data based on the productId
            const response1 = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
            const originalProductData = response1.data;

            // Compare formData with originalProductData
            if (
                formData.title === originalProductData.title &&
                formData.imageURL === originalProductData.imageURL &&
                parseFloat(formData.price) === originalProductData.price &&
                parseFloat(formData.percent) === originalProductData.percent &&
                formData.category === originalProductData.category &&
                formData.desc === originalProductData.desc
            ) {
                navigate('/products');
                toast("No changes were made.", {
                    // Your toast configuration here
                });
            } else {
                // Changes were made, perform the update
                await axios.put(`${API_BASE_URL}/api/products/${productId}`, {
                    title: formData.title,
                    imageURL: formData.imageURL,
                    price: parseFloat(formData.price),
                    percent: parseFloat(formData.percent),
                    category: formData.category,
                    desc: formData.desc,
                });

                // Redirect to the product list page after a successful update
                navigate('/products');
                toast.success("Product Updated Successfully", {
                    // Your toast configuration here
                });
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    //

    return (
        <>
            <h3 className="text-gray-800 font-bold py-5 text-2xl">Edit Product</h3>
            {loading ? (
                <div className="flex justify-center mt-20 h-screen">
                    <ClipLoader color="#000" size={80} className='h-96' />
                </div>
            ) : (
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
                                <div className="flex justify-between">
                                    <div className="w-full mr-5">
                                        <label
                                            className="block mb-1 text-sm font-medium text-gray-900"
                                            htmlFor="imageURL"
                                        >
                                            Image URL
                                        </label>
                                        <textarea
                                            className="block w-full px-4 py-2 mt-2 text-gray-700
                        bg-white border-gray-300 border rounded-md focus:ring-none focus:outline-none h-32"
                                            id="imageURL"
                                            type="url"
                                            name="imageURL"
                                            value={formData.imageURL}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <img className="flex items-end justify-start h-40 w-full object-contain "
                                            src={formData.imageURL} />
                                    </div>
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
                                            {
                                                categorys.map((category) => (
                                                    <option key={category._id} value={category.title}>{category.title}</option>
                                                ))}
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
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditProduct;
