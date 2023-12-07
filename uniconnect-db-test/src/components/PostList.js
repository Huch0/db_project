import PostCard from "./PostCard";

export default function PostList({
  fetchedData,
  setFetchedData,
  selectedUser,
}) {
  if (
    fetchedData &&
    fetchedData.dataType === "post" &&
    fetchedData.data.length === 0
  ) {
    return (
      <div className="mx-auto mt-10 max-w-2xl gap-x-8 border-t border-gray-200 pt-10">
        <h1 className="text-2xl font-bold text-center">게시글이 없습니다.</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {fetchedData &&
        fetchedData.dataType === "post" &&
        fetchedData.data.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            setFetchedData={setFetchedData}
            selectedUser={selectedUser}
          />
        ))}
    </div>
  );
}
