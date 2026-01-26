import { useEffect } from "react";
import { useParams } from "react-router";
import { Loader2 } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/features/products/productSlice";
import { selectProductStatus } from "../store/features/products/productSelectors";

import ProductDetailsView from "../components/ProductDetails";
import NotFound from "./NotFound";

export default function ProductDetailsPage() {
	const { id } = useParams();
	const dispatch = useAppDispatch();

	// Get from redux store
	const status = useAppSelector(selectProductStatus);
	const products = useAppSelector((state) => state.products.items);

	// Find the specific product derived from the URL ID
	const product = products.find((p) => p.id === Number(id));

	// Load data if not already present
	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchProducts());
		}
	}, [status, dispatch]);

	// LOADING STATE
	if (status === "loading" || status === "idle") {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-primary" />
			</div>
		);
	}

	// Handle Missing Product
	if (!product) return <NotFound />;

	// Presentation Component
	return <ProductDetailsView product={product} />;
}
