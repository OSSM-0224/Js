export default function StatCard({ title, value, change }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-bold mt-2">{value}</h2>
        <p className="text-green-500 text-sm mt-1">{change}</p>
      </div>

      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
    </div>
  );
}