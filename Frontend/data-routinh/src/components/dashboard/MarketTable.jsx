const data = [
  { coin: "ETH", price: "0.023", change: "+1.91" },
  { coin: "XRP", price: "0.0002", change: "+0.64" },
  { coin: "LTC", price: "0.0048", change: "+1.88" },
  { coin: "XMR", price: "0.0070", change: "-1.26" },
];

export default function MarketTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="font-semibold mb-4">Markets</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="text-left py-2">Coin</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{item.coin}</td>
              <td className="text-center">{item.price}</td>
              <td
                className={`text-center ${
                  item.change.includes("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}