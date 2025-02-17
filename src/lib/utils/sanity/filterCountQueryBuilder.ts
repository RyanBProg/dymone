import { ProductURLParams } from "../../types";
import { groqSafeString } from "./groqSafeString";

export function filterCountQueryBuilder(
  params: ProductURLParams,
  excludeFilter?: "category" | "material" | "stone"
) {
  // Base filter conditions
  const conditions: string[] = [];

  // Add search condition if present
  if (params.search) {
    conditions.push(`name match "${groqSafeString(params.search)}*"`);
  }

  // Add gender condition if present
  if (params.gender) {
    conditions.push(`gender == "${groqSafeString(params.gender)}"`);
  }

  // Add price range conditions if present
  if (params.minprice) {
    conditions.push(`price >= ${params.minprice}`);
  }
  if (params.maxprice) {
    conditions.push(`price <= ${params.maxprice}`);
  }

  // Add category condition unless excluded
  if (params.category && excludeFilter !== "category") {
    conditions.push(`category._ref == "${params.category}"`);
  }

  // Add material condition unless excluded
  if (params.material && excludeFilter !== "material") {
    conditions.push(`material._ref == "${params.material}"`);
  }

  // Add stone condition unless excluded
  if (params.stone && excludeFilter !== "stone") {
    conditions.push(`stones[]._ref == "${params.stone}"`);
  }

  // Combine conditions
  const filterCondition = conditions.length
    ? ` && ${conditions.join(" && ")}`
    : "";

  // Build the complete GROQ query
  return `{
    "categories": *[_type == "productCategory"] {
      _id,
      name,
      "count": count(*[_type == "product"${filterCondition} && productCategory._ref == ^._id])
    },
    "materials": *[_type == "material"] {
      _id,
      name,
      "count": count(*[_type == "product"${filterCondition} && material._ref == ^._id])
    },
    "stones": *[_type == "stone"] {
      _id,
      name,
      "count": count(*[_type == "product"${filterCondition} && stone._ref == ^._id])
    }
  }`;
}
