function UserCard({ username, firstName, lastName, phoneNumber }) {
  const defaultAvatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?backgroundType=gradientLinear&seed=${username}`;

  return (
    <div className="flex w-sm rounded-2xl bg-gray-800 shadow-lg overflow-hidden shadow-emerald-500">
      <div className="flex items-center justify-center bg-emerald-700/80 p-6">
        <img
          src={defaultAvatarUrl}
          alt={`${firstName} ${lastName} Profile Picture`}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      <div className="flex-1 p-4 text-white text-center flex flex-col h-full">
        <div className="flex-1 flex flex-col space-y-4">
          <p className="text-xl font-semibold">{firstName} {lastName}</p>
          <p className="text-lg font-medium text-gray-700">{phoneNumber}</p>
        </div>
        <button className="bg-black/20 cursor-pointer active:scale-105 transition-transform duration-300 ease-in-out text-lg mx-4 px-4 py-2 rounded-lg">Send Money</button>
      </div>
    </div>
  );
}

export default UserCard;
