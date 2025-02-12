import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../types/post";
import { createPost } from "./api";


export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Post) => createPost(data),
      onMutate: () => {
        console.log("mutate");
      },
      onError: () => {
        console.log("error");
      },
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries({ queryKey: ["posts"] }); // Refetch posts
      },
      onSettled: () => {
        console.log("settled");
      },
    });
};