// src/pages/SupportPage.tsx
import { memo } from "react";
import { Icon } from "@iconify/react";
import SubPageLayout from "../components/layout/SubPageLayout";

interface FAQItem {
  id: string;
  question: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "Why is my airtime purchase pending?",
  },
  {
    id: "2",
    question: "How do I get cashback?",
  },
  {
    id: "3",
    question: "How do I set a monthly budget?",
  },
  {
    id: "4",
    question: "How do I reset my PIN?",
  },
];

function SupportPage() {
  return (
    <SubPageLayout title="Help & support">
      <div className="flex flex-col justify-between pt-2 pb-6">
        <div className="space-y-6">
          {/* How can we help? Search Box */}
          <div className="rounded-2xl bg-primary/6 px-4 py-6">
            <h2 className="text-base font-bold text-gray-dark">
              How can we help?
            </h2>
            <p className="text-xs">Search FAQs, payments, deposits and more</p>
          </div>

          {/* Popular Questions Section */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-dark">
              Popular questions
            </h3>

            <div className="space-y-3">
              {faqs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {}}
                  className="flex w-full items-center justify-between rounded-xl bg-white py-5 px-4 text-left transition-colors hover:bg-gray-50 active:bg-gray-extra-light"
                >
                  <span className="text-sm font-semibold text-gray-semi-dark sm:text-sm">
                    {item.question}
                  </span>
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="h-4 w-4 shrink-0 text-gray-semi-dark"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat with support Action Button */}
        <div className="pt-8">
          <button
            type="button"
            onClick={() => {}}
            className="flex w-full items-center justify-center rounded-full bg-primary py-4 text-sm font-semibold text-white transition-opacity hover:opacity-95 active:opacity-90"
          >
            Chat with support
          </button>
        </div>
      </div>
    </SubPageLayout>
  );
}

export default memo(SupportPage);
