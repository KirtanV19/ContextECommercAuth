import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Categories = () => {
    const { categories, setSelectedCategories, selectedCategories } = useContext(ProductContext);

    return (
        <div className="w-1/2 flex gap-2 p-4 ">
            <button
                onClick={() => setSelectedCategories(null)}
                className={`rounded-full hover:bg-blue-600 hover:text-white ${selectedCategories === null ? 'bg-blue-600 text-white' : 'bg-white'
                    } border border-gray-500 py-2 px-4 text-center text-sm transition-all shadow-lg text-slate-600 hover:scale-110 duration-300 hover:shadow-xl`}
            >
                All
            </button>
            {categories.map((category, index) => (
                <button
                    onClick={() => setSelectedCategories(category)}
                    key={index}
                    className={`rounded-full hover:bg-blue-600 hover:text-white ${selectedCategories === category ? 'bg-blue-600 text-white' : 'bg-white'
                        } border border-gray-500 py-2 px-4 text-center text-sm transition-all shadow-lg text-slate-600 hover:scale-110 duration-300 hover:shadow-xl`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default Categories;