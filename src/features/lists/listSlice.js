import api from "../../app/api";
const MyListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyLists: build.query({
      query: () => "/MyList",
      transformResponse: (response) => response,
      providesTags: ["MyList"],
    }),
    getMyList: build.query({
      query: (id) => "/MyList/" + id,
      transformResponse: (response) => response.MyLists,
      providesTags: ["MyList"],
    }),
    updateMyList: build.mutation({
      query: ({ id, ...MyList }) => ({
        url: "/MyList/" + id,
        method: "PATCH",
        body: MyList,
      }),
      invalidatesTags: ["MyList"],
    }),
    addMyList: build.mutation({
      query: (MyList) => ({
        url: "/MyList",
        method: "POST",
        body: MyList,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyList"],
    }),
    deleteMyList: build.mutation({
      query: (id) => ({
        url: "MyList/" + id,
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
