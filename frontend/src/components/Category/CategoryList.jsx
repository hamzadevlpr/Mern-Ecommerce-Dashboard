import React, { useEffect, useState } from 'react';
import Spinner from '../Default/Spinner';
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import Filter from '../../Pages/Filter';
function CategoryList() {
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/category`);
                console.log(response.data)
                setCategory(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching category:", error);
            }
        };
        fetchCategory();
    }, []);
    return (
        <>
            <Filter title="Search Category" />
            {loading ? (
                <Spinner />
            ) : (
                <ul className="flex flex-col p-1">
                    {
                        category.map((item) => (
                            <li className="border-gray-400 flex flex-row mb-2">
                                <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                    <img src={item.image} className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4" />
                                    <div className="flex-1 pl-1 mr-16">
                                        <div className="font-medium">{item.title}</div>
                                    </div>
                                    <div className="text-gray-600 text-xs">Added by Admin</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )}

        </>
    );
}

export default CategoryList;
