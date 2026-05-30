import useUser from "../feature/authentication/useUser";

function UserAvatar() {
  const { user } = useUser();
  return (
    <div className="flex items-center gap-3 text-xl font-medium">
      <img className="w-9 object-cover object-center rounded-full" src="default-user.jpg" alt="avatar" />
      <span className="text-pri-text">{user.name}</span>
    </div>
  );
}

export default UserAvatar;
