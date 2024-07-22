"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

const data = [
  {
    label: "Can i rent with my debit card?",
    content:
      "Renters have the option to prepay for a rental online with a debit card. Some locations may require a credit card at the time of pickup, but you can still pay",
  },
  {
    label: "What information do I need to book a rental car?",
    content:
      "Renters have the option to prepay for a rental online with a debit card. Some locations may require a credit card at the time of pickup, but you can still pay",
  },
  {
    label: "Can I modify or cancel my reservation online?",
    content:
      "Renters have the option to prepay for a rental online with a debit card. Some locations may require a credit card at the time of pickup, but you can still pay",
  },
  {
    label: "What are your cancellation fees?",
    content:
      "Renters have the option to prepay for a rental online with a debit card. Some locations may require a credit card at the time of pickup, but you can still pay",
  },
  {
    label: "How can I pay for my rental car?",
    content:
      "Renters have the option to prepay for a rental online with a debit card. Some locations may require a credit card at the time of pickup, but you can still pay",
  },
  {
    label: "What are your late return fees?",
    content:
      "Renters have the option to prepay for a rental online with a debit card. Some locations may require a credit card at the time of pickup, but you can still pay",
  },
  {
    label: "Do you offer roadside assistance?",
    content:
      "Renters have the option to prepay for a rental online with a debit card. Some locations may require a credit card at the time of pickup, but you can still pay",
  },
  {
    label: "Can I add additional drivers to my rental agreement?",
    content:
      "Renters have the option to prepay for a rental online with a debit card. Some locations may require a credit card at the time of pickup, but you can still pay",
  },
];

export default function FrequentlyAskedQuestions() {
  return (
    <div className="container py-20">
      <h2 className="text-center text-2xl font-semibold">
        Frequently Asked Questions
      </h2>

      <Accordion selectionMode="multiple">
        {data.map((item, index) => (
          <AccordionItem
            classNames={{ indicator: "transform -rotate-180" }}
            startContent={
              <div className="flex size-[40px] items-center justify-center rounded-full bg-primary text-white">
                {index + 1}
              </div>
            }
            key={index + 1}
            aria-label={item.label}
            title={item.label}
            className="text-black/50"
          >
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
