export default function Users() {
  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-white p-5 rounded-xl shadow">
        <ul className="space-y-3">
          <li className="flex justify-between border-b pb-2">
            <span>Om Mhatre</span>
            <span className="text-gray-500">Admin</span>
          </li>

          <li className="flex justify-between border-b pb-2">
            <span>Rahul</span>
            <span className="text-gray-500">User</span>
          </li>

          <li className="flex justify-between border-b pb-2">
            <span>Aman</span>
            <span className="text-gray-500">User</span>
          </li>
        </ul>
      </div>
    </div>
  );
}