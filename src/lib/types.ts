import { Product } from "../../sanity.types";

export type ProductCategory = {
  _id: string;
  name: string;
  slug: string;
};

export type ProductMaterial = {
  _id: string;
  name: string;
  description: string;
  slug: string;
};

export type ProductPreview = {
  _id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  image: any;
  slug: string;
};

export type ProductURLParams = {
  sort?: string;
  minprice?: string;
  maxprice?: string;
  search?: string;
  gender?: string;
  stone?: string;
  category?: string;
  material?: string;
};
