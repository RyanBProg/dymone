import {
  CATEGORIES_QUERYResult,
  MATERIALS_QUERYResult,
  STONES_QUERYResult,
} from "../../../sanity.types";
import { ProductURLParams } from "../types";

// Helper function to sanitize input and create a GROQ-safe string
function groqSafeString(input: string): string {
  if (!input) return "";

  // Escape special characters
  let escapedString = input
    .replace(/\\/g, "\\\\") // Escape backslashes
    .replace(/"/g, '\\"'); // Escape double quotes

  // Limit to a set of allowed characters
  const allowedCharacters = /^[a-zA-Z0-9\s\-&]*$/; // Allow alphanumeric, spaces, hyphens, and ampersands
  if (!allowedCharacters.test(escapedString)) {
    // If the string contains disallowed characters, return an empty string or a safe default
    console.warn("Input contains disallowed characters:", input);
    return ""; // Or return a safe default, like "invalid"
  }

  return escapedString;
}

// Helper function to build a filter for category, material, or stone
function buildFilter(
  paramValue: string | undefined,
  items: any[],
  fieldName: string
): string {
  if (!paramValue) {
    return "";
  }

  const queryValues = paramValue.split(",").map((v) => v.trim().toLowerCase());

  const validIds = items
    .filter((item) => queryValues.includes(item.name?.toLowerCase()))
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
  let sanityQuery = `*[_type == "product"`;
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
  const stoneFilter = buildFilter(params.stone, stones, "stones");
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
    sanityQuery += ` && (${filters.join(" && ")})`;
  }

  let sortQuery = "_updatedAt desc"; // Default sort
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
    }
  }

  sanityQuery += `] {
    _id,
    name,
    price,
    discountPrice,
    "image": images[0].asset->url,
    "slug": slug.current
  } | order(${sortQuery}) [0...5]`;

  return sanityQuery;
}
