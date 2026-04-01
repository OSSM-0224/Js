export default function Crypto() {
  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Crypto Market</h1>

      <div className="bg-white p-5 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th>Coin</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody className="mt-3">
            <tr className="border-t">
              <td>BTC</td>
              <td>$63,000</td>
              <td className="text-green-500">+2.3%</td>
            </tr>
            <tr className="border-t">
              <td>ETH</td>
              <td>$3,200</td>
              <td className="text-green-500">+1.8%</td>
            </tr>
            <tr className="border-t">
              <td>XRP</td>
              <td>$0.62</td>
              <td className="text-red-500">-0.9%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}