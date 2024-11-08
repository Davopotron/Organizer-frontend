import api from "../../app/api";
const MyListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyLists: build.query({
      query: () => "/myLists",
      transformResponse: (response) => response,
      providesTags: ["MyList"],
    }),
    getMyList: build.query({
      query: (id) => "/myLists/" + id,
      transformResponse: (response) => response,
      providesTags: ["MyList"],
    }),
    updateMyList: build.mutation({
      query: ({ id, ...myList }) => ({
        url: "/myLists/" + id,
        method: "PATCH",
        body: myList,
      }),
      invalidatesTags: ["MyList"],
    }),
    addMyList: build.mutation({
      query: (myList) => ({
        url: "/myLists",
        method: "POST",
        body: myList,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyList"],
    }),
    deleteMyList: build.mutation({
      query: (id) => ({
        url: "myLists/" + id,
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
