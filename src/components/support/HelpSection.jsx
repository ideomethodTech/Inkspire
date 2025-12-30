import SupportCard from "./SupportCard";
import { Phone, HelpCircle, MessageCircle, CircleUserRound } from "lucide-react";
import { Headline, BodyMD } from "../typography";

export default function HelpSection() {
  return (
    <section className="bg-white py-20">
      {/* Header */}
      <div className="mb-14 text-center">
        <Headline>
          HOW CAN WE HELP?
        </Headline>
        <BodyMD className="mt-3 text-[#6D6D6D] max-w-md mx-auto">
          Our Client Advisors are here to assist — from styling tips to special
          orders. Connect with us anytime, your way.
        </BodyMD>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {/* FAQs */}
        <SupportCard
          icon={<HelpCircle size={22} />}
          title="Check Our FAQs"
          description="You might find your answers in our FAQs, we’ve covered the most common queries there."
          primaryAction={{
            label: "Go to FAQs",
            href: "/faqs",
          }}
        />

        {/* Contact */}
        <SupportCard
          icon={<CircleUserRound size={22} />}
          title="Contact Us Directly"
          description={
            <>
              <span className="block mb-1 font-medium text-[#20262B]">
                Customer Services Hours:
              </span>
              Call/chat: 9:00 AM – 6:00 PM every day
              <br />
              <span className="block mt-2 font-medium text-[#20262B]">
                Contact Numbers:
              </span>
              (11) 3060-5099
            </>
          }
          primaryAction={{
            label: "Call Now",
            href: "tel:1130605099",
          }}
        />

        {/* Other channels */}
        <SupportCard
          icon={<MessageCircle size={22} />}
          title="Other Channels"
          description="Reach us through our other available communication channels."
          primaryAction={{
            label: "Chat on WhatsApp",
            href: "https://wa.me/XXXXXXXXXX",
          }}
          secondaryAction={{
            label: "info@inkspires.com",
            href: "mailto:info@inkspires.com",
          }}
        />
      </div>
    </section>
  );
}
