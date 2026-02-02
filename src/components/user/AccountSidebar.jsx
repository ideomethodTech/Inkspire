"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, Tag, Wallet, CreditCard } from "lucide-react";
import clsx from "clsx";
import { Caption, Subheading2 } from "@/components/typography";

const NAV_ITEMS = [
  { label: "My Profile", href: "/user/profile", icon: User },
  { label: "My Orders", href: "/user/orders", icon: ShoppingBag },
  { label: "My Coupons", href: "/user/coupons", icon: Tag },
  { label: "My Wallets", href: "/user/wallets", icon: Wallet },
  { label: "My Saved Payment", href: "/user/payments", icon: CreditCard },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-[240px] space-y-6">
      {/* Greeting */}
      <div>
        <Caption className="text-[14px] text-[#6D6D6D] uppercase tracking-[0.16em]">
          Good Morning,
        </Caption>
        <Subheading2 className="text-[32px] font-semibold text-[#20262B] italic leading-tight">
          Georgia
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
                "flex items-center gap-3 rounded-md px-4 py-3 text-[14px] font-medium uppercase tracking-[0.08em] transition-colors",
                active
                  ? "bg-[#E11B1B] text-white"
                  : "text-[#6D6D6D] hover:bg-neutral-100"
              )}
            >
              <Icon size={18} className={active ? "text-white" : "text-[#6D6D6D]"} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

