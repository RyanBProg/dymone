import {
  CATEGORIES_QUERYResult,
  MATERIALS_QUERYResult,
  STONES_QUERYResult,
} from "../../../../sanity.types";
import { ProductURLParams } from "../../types";
import { groqSafeString } from "./groqSafeString";

// Helper function to build a filter for category, material, or stone
function buildFilter(
  paramValue: string | undefined,
  items: CATEGORIES_QUERYResult | MATERIALS_QUERYResult | STONES_QUERYResult,
  fieldName: string
): string {
  if (!paramValue) {
    return "";
  }

  const queryValues = paramValue.split(",").map((v) => v.trim().toLowerCase());

  const validIds = items
    .filter((item) => queryValues.includes(item.name!.toLowerCase()))
    .map((item) => item._id);

  if (validIds.length === 0) {
    return ""; // No valid IDs found, so don't add a filter
  }

  return `${fieldName}._ref in [${validIds
    .map((id) => `"${groqSafeString(id)}"`)
    .join(",")}]`;
}

export function productQueryBuilder(
  params: ProductURLParams,
  categories: CATEGORIES_QUERYResult,
  materials: MATERIALS_QUERYResult,
  stones: STONES_QUERYResult
): string {
  // Pagination
  const ITEM_LIMIT = 12;
  const currentPage = parseInt(groqSafeString(params.page || "1"));
  const resultsStart = (currentPage - 1) * ITEM_LIMIT;
  const resultsEnd = resultsStart + ITEM_LIMIT;

  // Query start
  let sanityQueryStart = `*[_type == "product"`;
  const filters: string[] = [];

  // Searching
  if (params.search) {
    filters.push(`name match "${groqSafeString(params.search)}*"`);
  }

  // Gender filtering
  if (params.gender) {
    const genderValues = params.gender
      .split(",")
      .map((g) => `"${groqSafeString(g.trim())}"`)
      .join(",");
    filters.push(`gender in [${genderValues}]`);
  }

  // Category filtering
  const categoryFilter = buildFilter(
    params.category,
    categories,
    "productCategory"
  );
  if (categoryFilter) {
    filters.push(categoryFilter);
  }

  // Material filtering
  const materialFilter = buildFilter(params.material, materials, "material");
  if (materialFilter) {
    filters.push(materialFilter);
  }

  // Stone filtering
  const stoneFilter = buildFilter(params.stone, stones, "stone");
  if (stoneFilter) {
    filters.push(stoneFilter);
  }

  // Price filtering
  if (params.minprice) {
    filters.push(`price >= ${params.minprice}`);
  }
  if (params.maxprice) {
    filters.push(`price <= ${params.maxprice}`);
  }

  if (filters.length) {
    sanityQueryStart += ` && (${filters.join(" && ")})`;
  }
  let sortQuery = "_createdAt desc"; // Default sort
  if (params.sort) {
    switch (params.sort) {
      case "new":
        sortQuery = `_createdAt desc`;
        break;
      case "pricedes":
        sortQuery = `price desc`;
        break;
      case "priceasc":
        sortQuery = `price asc`;
        break;
    }
  }

  const fullQuery = `{
    "total": count(${sanityQueryStart}]),
    "products": ${sanityQueryStart}] {
        _id,
        sku,
        "slug": slug.current,
        name,
        "image": { "alt": images[0].alt, "url": images[0].asset->url },
        price,
        discountPrice,
        gender,
        productCategory,
        material,
        stone,
        stock,
        _updatedAt,
        _createdAt,
        isFeatured
      } | order(${sortQuery}) [${resultsStart}...${resultsEnd}]
  }`;

  return fullQuery;
}
