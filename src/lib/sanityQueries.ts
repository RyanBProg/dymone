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

export const PRODUCTGRID_QUERY = defineQuery(`
  *[_type == "product"] {
    _id,
    name,
    price,
    discountPrice,
    "image": images[0],
    "slug": slug.current
  } | order(name asc)
`);
