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
                </div>
            </div>
        </>
    );
};

export default Sidebar;
