export type ProductURLParams = {
  sort?: string;
  minprice?: string;
  maxprice?: string;
  search?: string;
  gender?: string;
  stone?: string;
  category?: string;
  material?: string;
  page?: string;
};

// SANITY
export declare const internalGroqTypeReferenceTo: unique symbol;

export type CATEGORIES_QUERYResult = Array<{
  _id: string;
  name: string;
  slug: string;
}>;

export type MATERIALS_QUERYResult = Array<{
  _id: string;
  name: string;
  description: string;
  slug: string;
}>;

export type STONES_QUERYResult = Array<{
  _id: string;
  name: string;
  description: string;
  slug: string;
}>;

export type SINGLE_PRODUCT_FULLResult = {
  _id: string;
  sku: string;
  slug: string;
  name: string;
  images: Array<{ url: string; alt: string | null }>;
  description: string;
  price: number;
  discountPrice: number;
  gender: "Female" | "Male" | "Unisex";
  productCategory: {
    _id: string;
    name: string;
  };
  material: {
    _id: string;
    name: string;
    description: string;
  };
  stone: {
    _id: string;
    name: string;
    description: string;
  } | null;
  stock: number;
  weight: number | null;
  _updatedAt: string;
  _createdAt: string;
  isFeatured: boolean;
} | null;

export type ALL_PRODUCTS_PREVIEWResult = {
  total: number;
  products: Array<{
    _id: string;
    sku: string;
    slug: string;
    name: string;
    image: { url: string; alt: string | null };
    price: number;
    discountPrice: number;
    gender: "Female" | "Male" | "Unisex";
    productCategory: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "productCategory";
    };
    material: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "material";
    };
    stone: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "stone";
    };
    stock: number;
    _updatedAt: string;
    _createdAt: string;
    isFeatured: boolean;
  }>;
};

// default value for is featured
