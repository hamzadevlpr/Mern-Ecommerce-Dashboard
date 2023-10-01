import React, { useContext, useState } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { X } from "lucide-react";
import initialRoutes from "../../routes/sidebar";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const { isOpen, toggleSidebar } = useContext(SidebarContext);
    const [routes, setRoutes] = useState(initialRoutes);

    // Function to toggle the selected state of a route
    const toggleSelected = (index) => {
        const updatedRoutes = [...routes];
        updatedRoutes.forEach((route, i) => {
            route.selected = i === index;
        });
        setRoutes(updatedRoutes);
    };

    return (
        <>
            <div
                className={`z-50 shadow-2xl fixed top-0 left-0 h-screen w-72 text-gray-700 duration-700 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col items-center w-full h-full overflow-hidden text-gray-700 bg-white rounded">
                    <div className="absolute top-5 right-5">
                        <button
                            className="focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <X size={30} />
                        </button>
                    </div>
                    <div className="w-full px-2">
                        <h1 className="font-bold text-4xl ml-16 mt-5 text-blue-600">MERN</h1>
                        <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
                            <ul className="w-full flex flex-col gap-2 mt-10 px-3">
                                {routes.map((route, index) => (
                                    <div key={index}>
                                        <NavLink
                                            to={route.path}
                                            className={`flex items-center justify-start gap-4 px-2 py-3 text-sm rounded hover:bg-blue-200 hover:text-blue-700 font-medium ${route.selected ? 'bg-blue-200 text-blue-700 font-bold' : ''
                                                }`}
                                            onClick={() => toggleSelected(index)}
                                        >
                                            <span type="submit" className="">
                                                {route.icon}
                                            </span>
                                            {route.name}
                                        </NavLink>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <a
                        className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300"
                        href="#"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        <span className="ml-2 text-sm font-medium">Account</span>
                    </a>
                </div>


            </div>
        </>
    );
};

export default Sidebar;
