import api from "./api";
const MyListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyLists: build.query({
      query: () => "/my-lists",
      transformResponse: (response) => response,
      providesTags: ["MyList"],
    }),
    getMyList: build.query({
      query: (id) => "/my-lists/" + id,
      transformResponse: (response) => response,
      providesTags: ["MyList"],
    }),
    updateMyList: build.mutation({
      query: ({ id, ...myList }) => ({
        url: "/my-lists/" + id,
        method: "PATCH",
        body: myList,
      }),
      invalidatesTags: ["MyList"],
    }),
    addMyList: build.mutation({
      query: (myList) => ({
        url: "/my-lists",
        method: "POST",
        body: myList,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyList"],
    }),
    deleteMyList: build.mutation({
      query: (id) => ({
        url: "my-lists/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["MyList"],
    }),
  }),
});
export const {
  useGetMyListsQuery,
  useGetMyListQuery,
  useAddMyListMutation,
  useDeleteMyListMutation,
  useUpdateMyListMutation,
} = MyListApi;
