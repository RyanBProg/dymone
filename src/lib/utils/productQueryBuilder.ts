import {
  CATEGORIES_QUERYResult,
  MATERIALS_QUERYResult,
  STONES_QUERYResult,
} from "../../../sanity.types";
import { ProductURLParams } from "../types";

function multiQuerySplit(query: string) {
  if (query.includes(",")) {
    const queries = query.split(",");
    return `${queries.map((query) => `"${query}"`).join(",")}`;
  } else return `"${query}"`;
}

export function productQueryBuilder(
  params: ProductURLParams,
  categories: CATEGORIES_QUERYResult,
  materials: MATERIALS_QUERYResult,
  stones: STONES_QUERYResult
) {
  let sanityQuery = `*[_type == "product"`;

  // sorting
  let sortQuery = "";
  if (params.sort) {
    switch (params.sort) {
      case "new":
        sortQuery = `_updatedAt desc`;
        break;
      case "pricedes":
        sortQuery = `price desc`;
        break;
      case "priceasc":
        sortQuery = `price asc`;
        break;
      default:
        sortQuery = `_updatedAt desc`;
        break;
    }
  } else {
    sortQuery = `_updatedAt desc`;
  }

  // Add filters
  const filters = [];

  // searching
  if (params.search) {
    filters.push(`name match "${params.search}*"`);
  }

  // gender filtering
  if (params.gender) {
    const query = multiQuerySplit(params.gender);
    filters.push(`gender in [${query}]`);
  }

  // category filtering
  if (params.category) {
    if (!params.category.includes(",")) {
      const matching = categories.find(
        (category) =>
          category.name?.toLowerCase() === params.category?.toLowerCase()
      );

      filters.push(`productCategory._ref in ["${matching?._id}"]`);
    } else {
      const categoryQueries = params.category.split(",");
      const categoryIds = categoryQueries.map((query) => {
        return categories.find(
          (category) => category.name?.toLowerCase() === query.toLowerCase()
        );
      });

      filters.push(
        `productCategory._ref in [${categoryIds.map((category) => `"${category!._id}"`).join(",")}]`
      );
    }
  }

  // material filtering
  if (params.material) {
    if (!params.material.includes(",")) {
      const matching = materials.find(
        (material) =>
          material.name?.toLowerCase() === params.material?.toLowerCase()
      );

      filters.push(`material._ref in ["${matching?._id}"]`);
    } else {
      const materialQueries = params.material.split(",");
      const materialIds = materialQueries.map((query) => {
        return materials.find(
          (material) => material.name?.toLowerCase() === query.toLowerCase()
        );
      });

      filters.push(
        `material._ref in [${materialIds.map((material) => `"${material!._id}"`).join(",")}]`
      );
    }
  }

  // stone filtering
  if (params.stone) {
    if (!params.stone.includes(",")) {
      const matching = stones.find(
        (stone) => stone.name?.toLowerCase() === params.stone?.toLowerCase()
      );

      filters.push(`stones._ref in ["${matching?._id}"]`);
    } else {
      const stoneQueries = params.stone.split(",");
      const stoneIds = stoneQueries.map((query) => {
        return stones.find(
          (stone) => stone.name?.toLowerCase() === query.toLowerCase()
        );
      });

      filters.push(
        `stones._ref in [${stoneIds.map((stone) => `"${stone!._id}"`).join(",")}]`
      );
    }
  }

  // price filtering
  if (params.minprice) {
    filters.push(`price >= ${params.minprice}`);
  }
  if (params.maxprice) {
    filters.push(`price <= ${params.maxprice}`);
  }

  if (filters.length) {
    sanityQuery += ` && (${filters.join(" && ")})`;
  }

  return (sanityQuery += `] {
      _id,
      name,
      price,
      discountPrice,
      "image": images[0].asset->url,
      "slug": slug.current
    } | order(${sortQuery})`);
}
