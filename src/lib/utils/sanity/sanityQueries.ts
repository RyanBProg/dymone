import { defineQuery } from "next-sanity";

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "productCategory"] {
    _id,
    name,
    "slug": slug.current
  } | order(name asc)
`);

export const MATERIALS_QUERY = defineQuery(`
  *[_type == "material"] {
    _id,
    name,
    description,
    "slug": slug.current
  } | order(name asc)
`);

export const STONES_QUERY = defineQuery(`
  *[_type == "stone"] {
    _id,
    name,
    description,
    "slug": slug.current
  } | order(name asc)
`);

export const ALL_PRODUCTS_PREVIEW_QUERY = defineQuery(`
{
    "total": count(*[_type == "product"]),
    "products": *[_type == "product"] {
    _id,
    name,
    price,
    discountPrice,
    "image": images[0].asset->url,
    "slug": slug.current
  } | order(price desc) [0...12]
  }
`);
