import fetchData from "@/utils/fetchData";

function UserCard({ user, setFetchedData, selectedUser }) {
  const handleBan = async () => {
    let method = "";
    if (user.role === "banned") {
      method = "unBanUser";
    } else {
      method = "banUser";
    }
    await fetchData(
      `/api/banUser/${user.id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "PUT",
        body: JSON.stringify({
          method: method,
        }),
      },
      "user"
    );
  };
  let cardColor = "bg-white";
  let statusMessage = "정지";

  if (user && user.role === "banned") {
    cardColor = "bg-red-200";
    statusMessage = "정지 해제";
  }

  return (
    <div
      className={`flex ${cardColor} shadow-lg rounded-lg mx-4 md:mx-auto my-1 w-full flex-col justify-between`}
    >
      <div className="flex items-start px-4 py-6">
        <div className="">
          <h1 className="text-lg font-semibold">{user.user_name}</h1>
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-900 -mt-1">{user.role}</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 p-4">
        <button
          onClick={handleBan}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {statusMessage}
        </button>
      </div>
    </div>
  );
}

export default function UserList({
  fetchedData,
  setFetchedData,
  selectedUser,
}) {
  return (
    <div className="flex flex-col">
      {fetchedData &&
        fetchedData.dataType === "user" &&
        fetchedData.data.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            setFetchedData={setFetchedData}
            selectedUser={selectedUser}
          />
        ))}
    </div>
  );
}
