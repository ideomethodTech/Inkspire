'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import api from '@/lib/api'

const statusConfig = {
  delivered:  { bg: 'bg-green-50',  color: 'text-green-600' },
  shipped:    { bg: 'bg-blue-50',   color: 'text-blue-500' },
  processing: { bg: 'bg-purple-50', color: 'text-purple-600' },
  pending:    { bg: 'bg-yellow-50', color: 'text-yellow-600' },
  cancelled:  { bg: 'bg-red-50',    color: 'text-red-500' },
}

const avatarColors = ['#5b8dee','#2e9e8a','#9b59b6','#e67e22','#e74c3c','#1abc9c']

const getInitials = (name) =>
  name?.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || '?'

const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
)

export default function RecentActivity() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await api.get('/api/orders/admin/all', {
          params: { page: 1, limit: 5 },
        })
        setOrders(res.data?.data?.orders || [])
      } catch (err) {
        console.error('Failed to fetch recent orders:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecent()
  }, [])

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900 -tracking-[0.2px]">Recent Activity</h2>
        <Link
          href="/admin/orders"
          className="text-sm font-semibold text-teal-600 hover:opacity-75 transition"
        >
          View all
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-sm text-gray-400 py-4">Loading recent orders...</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                {['ORDER ID', 'CUSTOMER', 'AMOUNT', 'STATUS', 'ACTION'].map((th, i) => (
                  <th
                    key={i}
                    className={`text-xs font-bold text-gray-400 uppercase text-left pb-3 ${i === 4 ? 'text-right' : ''}`}
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => {
                const statusKey = order.status?.current?.toLowerCase() || 'pending'
                const s = statusConfig[statusKey] || { bg: 'bg-gray-50', color: 'text-gray-500' }
                const name = order.user?.name || order.user?.email || 'Unknown'
                const initials = getInitials(name)
                const color = avatarColors[i % avatarColors.length]

                return (
                  <tr key={order._id} className="border-b last:border-b-0">
                    <td className="py-4 pr-3 font-mono font-bold text-gray-900 text-sm">
                      {order.orderNumber}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: color }}
                        >
                          {initials}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-3 text-sm font-semibold text-gray-900">
                      ${order.totals?.total?.toFixed(2) || '0.00'}
                    </td>
                    <td className="py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${s.bg} ${s.color}`}>
                        {statusKey}
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

              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-sm text-gray-400">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}