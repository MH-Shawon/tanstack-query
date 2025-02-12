import { useForm } from "react-hook-form";
import { useCreatePost } from "../services/mutations";
import { usePosts, usePostsIds } from "../services/queries";
import { Post } from "../types/post";

export default function PostPage() {
  const postIdsQuery = usePostsIds();
  const postQueries = usePosts(postIdsQuery.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();

  const createPostMutation = useCreatePost();
  const handleCreatePostSubmit: SubmitHandler<Post> = async (data) => {
    createPostMutation.mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleCreatePostSubmit)}
        className="w-[70%] bg-white shadow-md rounded-xl p-6 mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">
          Create a New Post
        </h2>

        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Content Field */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-1">
            Content
          </label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your post content here..."
            rows={4}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={createPostMutation.isPending}
        >
          {createPostMutation.isPending ? "Submitting..." : "Create Post"}
        </button>
      </form>

      <ul className="space-y-4 p-4 bg-gray-100 rounded-lg">
        {postQueries.map((postQuery) => (
          <li
            key={postQuery?.data?.id}
            className="p-5 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong className="text-gray-900">Id:</strong>{" "}
                {postQuery?.data?.id}
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Title:</strong>
                <span className="text-blue-600"> {postQuery?.data?.title}</span>
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Content:</strong>{" "}
                {postQuery?.data?.content}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
