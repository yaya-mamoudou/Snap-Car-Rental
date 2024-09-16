import UsersList from "~/components/pages/users";

export default function UsersPage() {
  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Users</h1>
      <UsersList />
    </div>
  );
}
