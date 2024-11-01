import api from "../../app/api";
import ListItems from "./ListItems";

const ListItemsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListItems: build.query({
      query: () => "/listItems",
      transformResponse: (response) => response,
      providesTags: ["listItem", "MyList"],
    }),
    // getListItems: build.query({
    //   query: (id) => "/ListItems/" + id,
    //   transformResponse: (response) => response.ListItems,
    //   providesTags: ["ListItems"],
    // }),
    updateListItems: build.mutation({
      query: ({ id, ...listItem }) => ({
        url: "/listItems/" + id,
        method: "PATCH",
        body: listItem,
      }),
      invalidatesTags: ["listItem", "MyList"],
    }),
    addListItems: build.mutation({
      query: (ListItems) => ({
        url: "/listItems",
        method: "POST",
        body: ListItems,
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
} = ListItemsApi;

//for queries, it may need ListItems, but may also be listItem
