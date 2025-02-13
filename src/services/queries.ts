import { useQueries, useQuery } from "@tanstack/react-query";
import { getPosts, getPostsId,  } from "./api";

export function usePostsIds() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPostsId,
  });
}

export function usePosts(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["post", {id}],
        queryFn: () => getPosts(id!),
      };
    }),
  });
}
