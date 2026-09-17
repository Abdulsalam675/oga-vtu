import { memo, useState } from "react";
import { Icon } from "@iconify/react";
import SubPageLayout from "../../components/layout/SubPageLayout";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "Why is my airtime or data purchase pending?",
    answer:
      "Purchases can stay pending for a few minutes while the network confirms the transaction. If it remains pending for more than 30 minutes, contact support with your transaction ID.",
  },
  {
    id: "2",
    question: "How do I fund my wallet?",
    answer:
      "On the home screen, tap Fund on your balance card and follow the steps to add money. Your wallet balance updates once the payment is confirmed.",
  },
  {
    id: "3",
    question: "How do I reset or change my PIN?",
    answer:
      "Go to Profile → Security → Change PIN. You’ll need your current PIN to create a new one.",
  },
  {
    id: "4",
    question: "How do I change my password?",
    answer:
      "Go to Profile → Security → Change Password. Enter your current password, then set and confirm a new one.",
  },
  {
    id: "5",
    question: "I didn’t receive my electricity token. What should I do?",
    answer:
      "Check the success receipt and transaction history for your token. If it’s missing after a successful payment, contact support with the transaction ID and meter number.",
  },
];

const SUPPORT_WHATSAPP = "2347030521327";

function SupportPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  function handleToggle(id: string) {
    setOpenId(function (current) {
      return current === id ? null : id;
    });
  }

  function handleChatSupport() {
    window.open(
      `https://wa.me/${SUPPORT_WHATSAPP}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <SubPageLayout title="Help & support">
      <div className="flex flex-col justify-between pt-2 pb-6">
        <div className="space-y-6">
          <div className="rounded-2xl bg-primary/6 px-4 py-6">
            <h2 className="text-base font-bold text-gray-dark">
              How can we help?
            </h2>
            <p className="mt-1 text-xs text-gray-semi-dark">
              Browse common questions or chat with support
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-gray-dark">
              Popular questions
            </h3>

            <div className="space-y-3">
              {faqs.map(function (item) {
                const isOpen = openId === item.id;

                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl bg-white"
                  >
                    <button
                      type="button"
                      onClick={function () {
                        handleToggle(item.id);
                      }}
                      className="flex w-full cursor-pointer items-center justify-between px-4 py-4 text-left transition-colors active:bg-gray-extra-light"
                    >
                      <span className="pr-3 text-sm font-semibold text-gray-semi-dark">
                        {item.question}
                      </span>
                      <Icon
                        icon={
                          isOpen
                            ? "solar:alt-arrow-up-linear"
                            : "solar:alt-arrow-down-linear"
                        }
                        className="h-4 w-4 shrink-0 text-gray-semi-dark"
                      />
                    </button>

                    <div
                      className={
                        "grid transition-all duration-300 ease-out " +
                        (isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0")
                      }
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-gray-lightest px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-light">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="pt-8">
          <button
            type="button"
            onClick={handleChatSupport}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-semibold text-white transition-opacity hover:opacity-95 active:opacity-90"
          >
            <Icon icon="logos:whatsapp-icon" className="h-5 w-6" />
            Chat with support
          </button>
        </div>
      </div>
    </SubPageLayout>
  );
}

export default memo(SupportPage);
