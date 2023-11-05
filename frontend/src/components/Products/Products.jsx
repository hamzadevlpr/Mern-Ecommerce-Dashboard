import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import Filter from '../../Pages/Filter';
import { ClipLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';
import { SidebarContext } from '../../context/SidebarContext';
import Pagination from './Pagination';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config';
import Spinner from '../Default/Spinner';

function Products() {
    const [products, setProducts] = useState([]);
    const { setProd } = useContext(SidebarContext);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Function to open the delete confirmation modal
    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    // Function to close the delete confirmation modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    // Function to handle product deletion
    const handleDelete = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/api/products/${productToDelete._id}`);
            closeDeleteModal();
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productToDelete._id));
            toast.error("Product Deleted Successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products`);
                setProducts(response.data);
                setLoading(false);
                setProd(response.data.length);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Calculate the indexes for the products to display on the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            <div className="flex justify-center flex-wrap sm:justify-between">
                <h3 className="text-gray-800 font-bold py-5 text-2xl">Products Gallery</h3>
                <div className=" flex justify-center gap-2 py-4">
                    <button className="inline-flex items-center px-4 py-1 border-2  text-gray-800 text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        Export
                    </button>

                    <NavLink to={'/products/add'} className="inline-flex items-center px-4 py-1 border-2 bg-blue-600 text-white text-sm font-medium rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        Create New
                    </NavLink>
                </div>
            </div>
            <main className="bg-white p-5">
                <Filter title="Search Products" />
                <div className="container mx-auto px-6">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                            {currentProducts.map((item) => {
                                return (
                                    <div key={item._id} className="flex flex-col justify-end relative w-full max-w-sm mx-auto rounded-md overflow-hidden border-2">
                                        {/* Product Image */}
                                        <div>
                                            <img className="flex items-end justify-start h-40 w-full object-cover "
                                                src={item.imageURL} alt={item.title} />

                                        </div>
                                        {/* Product Name, Price, Discount */}
                                        <div className="px-5 py-3">
                                            <h3 className="text-gray-700">{item.title}</h3>
                                            <div className="flex justify-between items-center text-center">
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-gray-800 font-bold">
                                                        ${((item.price - item.percent) / item.price * 100).toFixed(2)}
                                                    </span>
                                                    <span className="text-gray-400 font-medium text-xs line-through">$ {item.price}</span>
                                                </div>
                                                <div className="text-gray-800 uppercase font-bold">{item.percent} %</div>
                                            </div>
                                        </div>
                                        {/* Product Edit/Delete Buttons */}
                                        <div className="flex justify-center gap-2 py-4">
                                            <NavLink to={`/edit/${item._id}`} className="inline-flex items-center px-4 py-1 border-2 text-gray-800 text-sm font-medium">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                                Edit
                                            </NavLink>
                                            <button onClick={() => openDeleteModal(item)} className="inline-flex items-center px-4 py-1 border-2 text-red-600 text-sm font-medium rounded-md">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 mr-2 text-red-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <Pagination
                        productsPerPage={productsPerPage}
                        totalProducts={products.length}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationModal
                        isOpen={isDeleteModalOpen}
                        onClose={closeDeleteModal}
                        onDelete={handleDelete}
                        productName={productToDelete?.title}
                    />
                </div>
            </main>
        </>
    );
}

export default Products;
