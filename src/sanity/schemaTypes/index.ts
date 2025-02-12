import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blog/blockContentType";
import { categoryType } from "./blog/categoryType";
import { postType } from "./blog/postType";
import { authorType } from "./blog/authorType";
import { productType } from "./store/productType";
import { materialType } from "./store/materialType";
import { wishlistType } from "./store/wishlistType";
import { productImageType } from "./store/productImageType";
import { orderType } from "./store/orderType";
import { orderItemType } from "./store/orderItemType";
import { userType } from "./store/userType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Blog schemas
    blockContentType,
    categoryType,
    postType,
    authorType,
    // Store schemas
    categoryType,
    materialType,
    orderItemType,
    orderType,
    productImageType,
    productType,
    userType,
    wishlistType,
  ],
};
