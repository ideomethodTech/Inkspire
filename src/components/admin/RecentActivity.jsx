'use client'

const orders = [
  { id: '#8830', initials: 'JD', name: 'Jane Doe',    amount: '$145.00', status: 'DELIVERED',  color: '#5b8dee' },
  { id: '#8829', initials: 'MK', name: 'Marcus King', amount: '$82.50',  status: 'SHIPPED',    color: '#2e9e8a' },
  { id: '#8828', initials: 'SC', name: 'Sarah Chen',  amount: '$210.00', status: 'PROCESSING', color: '#9b59b6' },
]

const statusConfig = {
  DELIVERED:  { bg: 'bg-green-50', color: 'text-green-600' },
  SHIPPED:    { bg: 'bg-blue-50',  color: 'text-blue-500' },
  PROCESSING: { bg: 'bg-purple-50',color: 'text-purple-600' },
}

const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
)

export default function RecentActivity() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900 -tracking-[0.2px]">Recent Activity</h2>
        <button className="text-sm font-semibold text-teal-600 hover:opacity-75 transition">View all</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              {['ORDER ID','CUSTOMER','AMOUNT','STATUS','ACTION'].map((th, i) => (
                <th
                  key={i}
                  className={`text-xs font-bold text-gray-400 uppercase text-left pb-3 ${i===4 ? 'text-right' : ''}`}
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const s = statusConfig[order.status]
              return (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="py-4 pr-3 font-mono font-bold text-gray-900 text-sm">{order.id}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: order.color }}
                      >
                        {order.initials}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{order.name}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-3 text-sm font-semibold text-gray-900">{order.amount}</td>
                  <td className="py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${s.bg} ${s.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-900 transition">
                      <DotsIcon />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}