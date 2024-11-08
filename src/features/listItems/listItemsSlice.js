import api from "../../app/api";

const ListItemsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListItems: build.query({
      query: () => "/listItems",
      transformResponse: (response) => response,
      providesTags: ["listItem", "MyList"],
    }),
    getListItemsId: build.query({
      query: (id) => `/myLists/${id}`,
      transformResponse: (response) => response,
      providesTags: ["listItem", "MyList"],
    }),
    updateListItems: build.mutation({
      query: ({ id, ...listItem }) => ({
        url: "/listItems/" + id,
        method: "PATCH",
        body: listItem,
      }),
      invalidatesTags: ["listItem", "MyList"],
    }),
    addListItems: build.mutation({
      query: (listItem) => ({
        url: "/listItems",
        method: "POST",
        body: listItem,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["listItem", "MyList"],
    }),
    deleteListItems: build.mutation({
      query: (id) => ({
        url: "listItems/" + id,
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
