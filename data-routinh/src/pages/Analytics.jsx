export default function Analytics() {
  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>    

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Visitors</p>
          <h2 className="text-xl font-bold mt-2">12,340</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-xl font-bold mt-2">$8,540</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Conversions</p>
          <h2 className="text-xl font-bold mt-2">4.2%</h2>
        </div>
      </div>
    </div>
  );
}