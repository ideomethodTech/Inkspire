"use client";

import Link from "next/link";
<<<<<<< HEAD
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
>>>>>>> dev-fe
import { User, ShoppingBag, Tag, Wallet, CreditCard, LogOut } from "lucide-react";
import clsx from "clsx";
import { Caption, Subheading2 } from "@/components/typography";
import { getProfile } from "@/api/profile";

const NAV_ITEMS = [
  { label: "My Profile", href: "/user/profile", icon: User },
  { label: "My Orders", href: "/user/orders", icon: ShoppingBag },
  { label: "My Coupons", href: "/user/coupons", icon: Tag },
  { label: "My Wallets", href: "/user/wallets", icon: Wallet },
  { label: "My Saved Payment", href: "/user/payments", icon: CreditCard },
];

export default function AccountSidebar() {
  const pathname = usePathname();
<<<<<<< HEAD
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("Hello");

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Set dynamic greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/"); // go back to homepage
  };
=======
  const [displayName, setDisplayName] = useState("User");

  useEffect(() => {
    const loadUser = async () => {
      const token =
        typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
      if (!token) return;

      try {
        const stored = window.localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          setDisplayName(
            parsed?.displayName ||
              parsed?.name ||
              (parsed?.email ? parsed.email.split("@")[0] : "User")
          );
        }
      } catch (err) {
        console.warn("Failed to parse stored user", err);
      }

      try {
        const res = await getProfile();
        const data = res?.data || res?.user || res;
        if (data) {
          setDisplayName(
            data?.displayName ||
              data?.name ||
              (data?.email ? data.email.split("@")[0] : "User")
          );
        }
      } catch (err) {
        console.warn("Failed to load profile", err);
      }
    };

    loadUser();
  }, []);
>>>>>>> dev-fe

  return (
    <aside className="w-full max-w-[240px] space-y-6">
      {/* Greeting */}
      <div>
        <Caption className="text-[14px] text-[#6D6D6D] uppercase tracking-[0.16em]">
          {greeting},
        </Caption>
        <Subheading2 className="text-[32px] font-semibold text-[#20262B] italic leading-tight">
<<<<<<< HEAD
          {user?.displayName || "Guest"}
=======
          {displayName}
>>>>>>> dev-fe
        </Subheading2>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative flex w-full items-center gap-3 rounded-md px-4 py-3 text-[14px] font-medium uppercase tracking-[0.08em] transition-colors",
                active
                  ? "text-[#E11B1B]"
                  : "text-[#6D6D6D] hover:bg-neutral-100"
              )}
            >
              {active && (
                <div className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-[#E11B1B]" />
              )}
              <Icon size={18} className={active ? "text-[#E11B1B]" : "text-[#6D6D6D]"} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-[14px] font-medium uppercase tracking-[0.08em] text-[#6D6D6D] transition-colors hover:bg-neutral-100"
      >
        <LogOut size={18} className="text-[#6D6D6D]" />
        <span>Logout</span>
      </button>
    </aside>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> dev-fe
