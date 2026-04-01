export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6 ml-64">
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-2 rounded w-64"
      />

      <div className="flex items-center gap-4">
        <button className="bg-gray-200 px-4 py-2 rounded">
          Invite a Friend
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          New Project
        </button>
      </div>
    </div>
  );
}