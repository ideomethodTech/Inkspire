"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const userStr = localStorage.getItem("user");

      if (!userStr) {
        router.push("/login");
        return;
      }

      const user = JSON.parse(userStr);

      if (user.role !== "admin") {
        router.push("/user/profile");
        return;
      }

      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  return loading; // true while checking, false when allowed
}