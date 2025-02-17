import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blog/blockContentType";
import { categoryType } from "./blog/categoryType";
import { postType } from "./blog/postType";
import { authorType } from "./blog/authorType";
import { productType } from "./store/productType";
import { materialType } from "./store/materialType";
import { stoneType } from "./store/stoneType";
import { wishlistType } from "./store/wishlistType";
import { productImageType } from "./store/productImageType";
import { orderType } from "./store/orderType";
import { orderItemType } from "./store/orderItemType";
import { userType } from "./store/userType";
import { productCategoryType } from "./store/productCategoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Blog schemas
    blockContentType,
    categoryType,
    postType,
    authorType,
    // Store schemas
    productCategoryType,
    materialType,
    stoneType,
    orderItemType,
    orderType,
    productImageType,
    productType,
    userType,
    wishlistType,
  ],
};
