import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Chip,
    IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ProductHeader from "./ProductHeader";
import { AuthContext } from "../context/AuthContext";
import PageWrapper from "../utils/PageWrapper";

const Products = () => {
    const {
        products,
        addToCart,
        currentPage,
        setCurrentPage,
        totalPages,
        selectedCategories,
        searchQuery,
    } = useContext(ProductContext);
    const { user } = useContext(AuthContext);

    let navigate = useNavigate();

    const next = () => {
        if (currentPage === totalPages) return;
        setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    // Filter products based on selected category and search query
    const filteredProducts = products
        .filter(
            (product) =>
                !selectedCategories || product.category === selectedCategories
        )
        .filter((product) => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        });

    const handleAddToCart = (item) => {
        if (user) {
            addToCart(item);
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <ProductHeader />
            <PageWrapper>
                <div className="container mx-auto px-4 py-8">
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ">
                            {filteredProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    className="w-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 "
                                >
                                    <CardHeader
                                        floated={false}
                                        color="blue-gray"
                                        className="relative h-56"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                                        <div className="absolute top-4 right-4">
                                            <Chip
                                                value={product.category}
                                                className="bg-inherit text-inherit"
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardBody className="p-6">
                                        <div className="flex flex-col gap-4">
                                            <Typography
                                                variant="h5"
                                                color="blue-gray"
                                                className="font-medium line-clamp-1"
                                            >
                                                {product.title.length > 30
                                                    ? product.title.slice(0, 30) + "...."
                                                    : product.title}
                                            </Typography>

                                            <Typography color="gray" className="line-clamp-3">
                                                {product.description.length > 30
                                                    ? product.description.slice(0, 30) + "..."
                                                    : product.description}
                                            </Typography>
                                        </div>
                                    </CardBody>
                                    <CardFooter className="pt-3 px-6 pb-6 flex flex-col">
                                        <div className="flex justify-between items-center">
                                            <Typography
                                                variant="paragraph"
                                                className="text-red-900 line-through"
                                            >
                                                ${product.price}
                                            </Typography>
                                            <Typography variant="lead" className="text-blue-gray-900">
                                                {product.discount
                                                    ? product.price -
                                                    (product.price * product.discount) / 100
                                                    : product.price}
                                            </Typography>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="flex items-center gap-8 justify-center mt-8">
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={prev}
                                disabled={currentPage === 1}
                            >
                                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                            </IconButton>
                            <Typography color="gray" className="font-normal">
                                Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
                                <strong className="text-gray-900">{totalPages}</strong>
                            </Typography>
                            <IconButton
                                size="sm"
                                variant="outlined"
                                onClick={next}
                                disabled={currentPage === totalPages}
                            >
                                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                            </IconButton>
                        </div>
                    </>
                </div>
            </PageWrapper>
        </>
    );
};

export default Products;
