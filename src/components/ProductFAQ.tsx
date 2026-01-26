import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "Are these shoes true to size?",
      answer:
        "Yes. Our shoes follow standard sizing. If you are between sizes, we recommend choosing the larger size for optimal comfort.",
    },
    {
      question: "What materials are used?",
      answer:
        "We use premium breathable mesh, durable rubber soles, and cushioned midsoles designed for all-day comfort and longevity.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Orders are typically delivered within 3-5 business days. Express shipping options are available at checkout.",
    },
    {
      question: "What is the return policy?",
      answer:
        "You can return or exchange unworn shoes within 14 days of delivery. Items must be in original packaging.",
    },
    {
      question: "How should I care for my shoes?",
      answer:
        "Clean using a soft brush or cloth. Avoid machine washing and prolonged exposure to water to maintain durability.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-0 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="hidden md:block">
          <img
            src="https://www.campusshoes.com/cdn/shop/files/VESPER_VESPER_WHT-NAVY_07.webp?v=1758174770"
            alt="Comfortable performance shoes"
            className="w-full max-h-130 object-cover rounded-2xl
							border border-border bg-surface"
          />
        </div>

        {/* Right Column */}
        <div>
          {/* Heading */}
          <p className="text-sm font-medium text-primary">FAQs</p>
          <h2 className="mt-2 text-3xl font-heading font-semibold">
            Need help choosing?
          </h2>
          <p className="mt-3 mb-6 text-text-muted max-w-md">
            Everything you need to know about fit, materials, delivery, and care
            — before you place your order.
          </p>

          {/* FAQ List */}
          <div className="divide-y divide-border rounded-xl border border-border bg-surface">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="px-6 py-5 cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-medium">{faq.question}</h3>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden text-sm text-text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
