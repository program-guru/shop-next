export interface Stock {
	[size: string]: number;
}

export interface Product {
	id: number;
	name: string;
	brand: string;
	description: string;
	price: number;
	rating: number;
	category: string[];
	mainImage: string;
	images: string[];
	stock: Stock;
	isFeatured: boolean;
}
