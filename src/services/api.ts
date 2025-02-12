import axios from "axios";
import { Post } from "./../types/post";

const Base_URL = "http://localhost:4001";

const axiosInstance = axios.create({ baseURL: Base_URL });
export const getPostsId = async () => {
  return (await axiosInstance.get<Post[]>("posts")).data.map(
    (post) => post.id
  );
};

// export const getPosts = async ()=>{
//     const res = await axiosInstance.get<Post[]>("posts");
//     return res.data.map((post) => post?.id);
// }

export const getPosts = async (id: number   ) => {
    return (await axiosInstance.get<Post>(`posts/${id}`)).data;
}


export const createPost = async (data: Post) => {
    return (await axiosInstance.post<Post>("posts", data));
}

