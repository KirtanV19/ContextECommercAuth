
import Categories from "./Categories";
import ProductSearch from "./ProductSearch";

const ProductHeader = () => {
    return (
        <div className="w-[70%] mx-auto my-8 flex justify-between items-center bg-white rounded-lg shadow-md p-4">
            <Categories />
            <ProductSearch />
        </div>
    );
};

export default ProductHeader;
