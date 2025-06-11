import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQ = () => {
  return (
    <Card id="faq">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion 
          type="single" 
          collapsible 
          className="w-full space-y-4"
        >
          {faqItems.map((item) => (
            <AccordionItem 
              key={item.value} 
              value={item.value}
              className="border rounded-lg px-4 transition-all hover:border-primary"
            >
              <AccordionTrigger className="py-4 text-left font-medium text-base md:text-lg [&[data-state=open]>svg]:rotate-180">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

const faqItems = [
  {
    value: "rate-limits",
    question: "What are the rate limits?",
    answer: (
      <>
        <p>Free tier: 100 requests/day</p>
        <p>Pro tier: 5,000 requests/day</p>
        <p>Enterprise tier: Custom limits available</p>
      </>
    )
  },
  {
    value: "data-refresh",
    question: "How often does data refresh?",
    answer: (
      <p>
        By default, data regenerates on every API call. If you need
        consistent data between calls, use the <code className="bg-muted px-1 py-0.5 rounded text-sm">seed</code>{" "}
        parameter with a consistent value.
      </p>
    )
  },
  {
    value: "custom-types",
    question: "Can I create custom data types?",
    answer: (
      <p>
        Yes, Pro and Enterprise users can create custom data types with
        JavaScript functions. These can be saved to your account and
        reused across multiple APIs.
      </p>
    )
  },
  {
    value: "data-relationships",
    question: "Can I create relationships between data?",
    answer: (
      <p>
        Yes, you can create parent-child relationships between data
        models using references. This allows for complex data structures
        like users with orders or products with categories.
      </p>
    )
  }
];

export default FAQ;