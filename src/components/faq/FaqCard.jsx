import { Card, CardContent } from "@/components/ui/card";

export default function FaqCard({ icon, title, description }) {
  return (
    <Card className="rounded-2xl border bg-[#fafafa] hover:shadow-md transition">
      <CardContent className="p-6 space-y-4">
        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-[#FA2020]">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-black">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
