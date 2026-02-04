import AccountSidebar from "@/components/user/AccountSidebar";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 md:px-6 lg:px-8">
        <AccountSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

