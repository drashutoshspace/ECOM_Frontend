export interface Product {
	guid: string;
	Product_ID: string;
	Product_Name: string;
	Product_MRP: number;
	Product_SellingPrice: number;
	Product_WholeSale_SellingPrice: number;
	Product_Discount: number;
	Product_Category: Product_Category[];
	Product_Contents: string;
	Product_Stock_Quantity: string;
	Product_Specs: string;
	Product_Brand: string;
	Product_Video: string;
	Product_Rating: number;
	Product_Reviews: Product_Reviews[];
	Meta_Tags: string;
	Meta_Description: string;
	Product_Description: string;
	Product_Images: Product_Images[];
	in_stock: boolean;
	is_featured: boolean;
	is_special: boolean;
	is_trending: boolean;
	slug: string;
	is_visible: boolean;
}

export interface Product_Category {
	category: string;
}

export interface Product_Reviews {
	id: number;
	guid: string;
	user_dp: string;
	user_id: number;
	user_name: string;
	rating: number;
	review: string;
}

export interface Product_Images {
	Image_ID: number;
	Image_Title: string;
	Image_Alt_Text: string;
	dbImage: string;
}
