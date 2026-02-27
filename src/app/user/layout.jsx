import AccountSidebar from "@/components/user/AccountSidebar";
import MobileProfilePage from "./profile/mobile";

export default function UserLayout({ children }) {
  return (
    <>
      {/* Mobile Layout (handles all tabs internally) */}
      <div className="md:hidden">
        <MobileProfilePage />
      </div>

      {/* Desktop Layout */}
      <div className="hidden min-h-screen bg-[#F7F7F7] md:block">
        <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-6 lg:px-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <AccountSidebar />
          </div>

          {/* Main content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}

