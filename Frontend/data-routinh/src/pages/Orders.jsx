export default function Orders() {
  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white p-5 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th>ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td>#1234</td>
              <td>Om</td>
              <td className="text-green-500">Delivered</td>
              <td>$120</td>
            </tr>

            <tr className="border-t">
              <td>#1235</td>
              <td>Rahul</td>
              <td className="text-yellow-500">Pending</td>
              <td>$80</td>
            </tr>

            <tr className="border-t">
              <td>#1236</td>
              <td>Aman</td>
              <td className="text-red-500">Cancelled</td>
              <td>$45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}