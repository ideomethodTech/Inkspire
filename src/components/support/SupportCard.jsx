"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupportCard({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}) {
  return (
    <Card className="rounded-xl border border-neutral-200 bg-[#FAFAFA] shadow-none">
      <CardContent className="flex h-full flex-col items-center text-center p-6">
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7DDDD] text-[#E11B1B]">
          {icon}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-[16px] font-semibold text-[#20262B]">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-[13px] text-[#6D6D6D] max-w-xs">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-auto w-full space-y-3">
          {primaryAction && (
            <Button
              asChild
              className="w-full rounded-md bg-[#20262B] text-white hover:bg-[#20262B]/90"
            >
              <Link href={primaryAction.href}>
                {primaryAction.label}
              </Link>
            </Button>
          )}

          {secondaryAction && (
            <Button
              variant="outline"
              asChild
              className="w-full rounded-md"
            >
              <Link href={secondaryAction.href}>
                {secondaryAction.label}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
