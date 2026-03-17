import StatCards from '@/components/admin/StatCards'
import RevenueChart from '@/components/admin/RevenueChart'
import RightPanel from '@/components/admin/RightPanel'
import RecentActivity from '@/components/admin/RecentActivity'
export default function DashboardPage() {
  return (
    <div className="max-w-[1300px] mx-auto p-5 space-y-6">
      
      {/* Top Row - Stat Cards */}
      <StatCards />

      {/* Middle Row - Revenue chart + Right panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="min-w-0">
          <RevenueChart />
        </div>
        <div className="min-w-0">
          <RightPanel />
        </div>
      </div>

      {/* Bottom Row - Recent Activity */}
      <RecentActivity />
    </div>
  )
}