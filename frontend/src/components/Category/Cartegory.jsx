import React, { useState, useEffect } from 'react';
import Filter from '../../Pages/Filter';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import toast from 'react-hot-toast';
import CategoryList from './CategoryList';
import Spinner from '../Default/Spinner';

function Category() {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target.result;
                setFormData((prev) => ({
                    ...prev,
                    image: base64String,
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.image) {
            toast.error('Fields Cannot be Empty');
        } else {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/category/add`, formData);
                if (response.status === 200) {
                    toast.success('Category Added successfully');
                    window.location.reload();
                } else if (response.status === 401) {
                    toast.error('Category Already Exists');
                } else {
                    toast.error('Error occurred while adding Category');
                }
                console.log(response.data);
            } catch (error) {
                toast.error('Error occurred while adding Category');
            }
        }
    };

    return (
        <main className="bg-white p-5 mt-5 container mx-auto px-6">
            <div className="my-10">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <div className="sm:w-1/2 w-full">
                            <label className="form-label" htmlFor="title">
                                Category Name
                            </label>
                            <input
                                className="form-inputs"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                id="title"
                            />
                        </div>
                        <div className="sm:w-1/2 w-full">
                            <label className="form-label" htmlFor="image">
                                Category Image
                            </label>
                            <input
                                className="form-inputs file:bg-blue-500 file:cursor-pointer file:rounded-xl file:text-sm file:font-medium file:border-none file:text-white file:mr-2 file:px-5 file:py-1"
                                type="file"
                                name="image"
                                onChange={(e) => handleImageChange(e)}
                                id="image"
                            />
                        </div>
                    </div>
                    <div className="my-5 text-center">
                        <button
                            type="submit"
                            className="px-10 py-1.5 bg-blue-600 rounded-lg text-white outline-none shadow-lg transform active:scale-x-75 transition-transform"
                        >
                            Add Category
                        </button>
                    </div>
                </form>
            </div>

            <CategoryList />

        </main>
    );
}

export default Category;
