import api from "../../app/api";

const ShopCartApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Query to fetch all shopping items
    getShoppingItems: build.query({
      query: () => "/shopping/items",
      transformResponse: (response) => response,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ShoppingItem", id })), // Tag each item
              { type: "ShoppingItem", id: "LIST" }, // General tag for the list
            ]
          : [{ type: "ShoppingItem", id: "LIST" }],
    }),

    // Mutation to add items to the cart and calculate total
    addToCart: build.mutation({
      query: (selectedItems) => ({
        url: "/shopping/cart",
        method: "POST",
        body: { selectedItems }, // Send the array of selected item IDs
      }),
      transformResponse: (response) => response,
      invalidatesTags: [{ type: "ShoppingItem", id: "LIST" }], // Invalidate the list to refetch
    }),
  }),
});

export const { useGetShoppingItemsQuery, useAddToCartMutation } = ShopCartApi;
