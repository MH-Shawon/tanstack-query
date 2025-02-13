import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../types/post";
import { createPost, deletePost, updatePost } from "./api";

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
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onSettled: () => {
      console.log("settled");
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Post) => updatePost(data),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log("settled");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
       await queryClient.invalidateQueries({
          queryKey: ["post", { id: variables.id }],
        });
      }
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onSettled: () => {
      console.log("settled");
    },
  });
}
