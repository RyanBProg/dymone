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
