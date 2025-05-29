import React, { useContext } from "react";
import { IoSearch } from "react-icons/io5";
import { ProductContext } from "../context/ProductContext";

const ProductSearch = () => {
    const { setSearchQuery } = useContext(ProductContext);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2 border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <input 
                type="text" 
                placeholder="Search products..."
                onChange={handleSearch}
                className="bg-transparent outline-none border-none w-64 text-gray-700 placeholder-gray-400" 
            />
            <IoSearch size={24} className="text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" />
        </div>
    );
};

export default ProductSearch;
