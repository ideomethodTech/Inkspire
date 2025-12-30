import {
  User,
  ShieldCheck,
  Rocket,
  CreditCard,
  Settings,
  Wrench,
} from "lucide-react";

export const FAQ_ITEMS = [
  {
    title: "Account & Profile",
    description: "Information About Managing Your Account Settings",
    icon: <User size={18} />,
  },
  {
    title: "Billing & Subscriptions",
    description: "Details On Payments, Plans, And Invoices.",
    icon: <CreditCard size={18} />,
  },
  {
    title: "Security & Privacy",
    description: "Information About How We Protect Your Data.",
    icon: <ShieldCheck size={18} />,
  },
  {
    title: "Getting Started",
    description: "Guides And Tutorials For New Users.",
    icon: <Rocket size={18} />,
  },
  {
    title: "Using Features",
    description: "How To Use The Core Functionalities Of The App.",
    icon: <Settings size={18} />,
  },
  {
    title: "Troubleshooting",
    description: "Solutions For Common Technical Issues.",
    icon: <Wrench size={18} />,
  },
];
