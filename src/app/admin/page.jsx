import Sidebar from '@/components/admin/SideBar'
import Topbar from '@/components/admin/TopBar'
import StatCards from '@/components/admin/StatCards'
import RevenueChart from '@/components/admin/RevenueChart'
import RightPanel from '@/components/admin/RightPanel'
import RecentActivity from '@/components/admin/RecentActivity'

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main content - offset by sidebar width */}
      <div className="flex flex-col flex-1 ml-16 overflow-hidden">
        
        {/* Topbar */}
        <Topbar />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-5">
          <div className="max-w-[1300px] mx-auto space-y-6">
            
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
        </main>

      </div>
    </div>
  )
}