import api from "../../app/api";
import ListItems from "./ListItems";

const ListItemsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListItems: build.query({
      query: () => "/listItems",
      transformResponse: (response) => response,
      providesTags: ["listItem"],
    }),
    // getListItems: build.query({
    //   query: (id) => "/ListItems/" + id,
    //   transformResponse: (response) => response.ListItems,
    //   providesTags: ["ListItems"],
    // }),
    updateListItems: build.mutation({
      query: ({ id, ...listItem }) => ({
        url: "/listItem/" + id,
        method: "PATCH",
        body: ListItems,
      }),
      invalidatesTags: ["listItem"],
    }),
    addListItems: build.mutation({
      query: (ListItems) => ({
        url: "/listItem",
        method: "POST",
        body: ListItems,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["listItem"],
    }),
    deleteListItems: build.mutation({
      query: (id) => ({
        url: "listItems/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["listItem"],
    }),
  }),
});
export const {
  useGetListItemsQuery,
  useAddListItemsMutation,
  useDeleteListItemsMutation,
  useUpdateListItemsMutation,
} = ListItemsApi;

//for queries, it may need ListItems, but may also be listItem
