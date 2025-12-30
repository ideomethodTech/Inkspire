import FaqCard from "@/components/faq/FaqCard";
import { FAQ_ITEMS } from "@/lib/faq-data";

export default function FaqPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-24">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="mt-4 text-gray-500 text-sm md:text-base">
          Find answers to our most common questions. We&apos;re here to help you
          get the most out of our platform.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FAQ_ITEMS.map((item, index) => (
          <FaqCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

    </main>
  );
}
