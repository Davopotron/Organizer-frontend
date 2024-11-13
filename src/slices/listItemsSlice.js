import api from "./api";

const ListItemsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListItems: build.query({
      query: () => "/list-items",
      transformResponse: (response) => response,
      providesTags: ["listItem", "MyList"],
    }),
    getListItemsId: build.query({
      query: (id) => `/my-lists/${id}`,
      transformResponse: (response) => response,
      providesTags: ["listItem", "MyList"],
    }),
    updateListItems: build.mutation({
      query: ({ id, ...listItem }) => ({
        url: "/list-items/" + id,
        method: "PATCH",
        body: listItem,
      }),
      invalidatesTags: ["listItem", "MyList"],
    }),
    addListItems: build.mutation({
      query: (listItem) => ({
        url: "/list-items",
        method: "POST",
        body: listItem,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["listItem", "MyList"],
    }),
    deleteListItems: build.mutation({
      query: (id) => ({
        url: "list-items/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["listItem", "MyList"],
    }),
  }),
});
export const {
  useGetListItemsQuery,
  useAddListItemsMutation,
  useDeleteListItemsMutation,
  useUpdateListItemsMutation,
  useGetListItemsIdQuery,
} = ListItemsApi;
