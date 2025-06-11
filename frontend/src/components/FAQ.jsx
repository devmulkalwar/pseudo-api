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
    value: "is-free",
    question: "Is PseudoAPI really free?",
    answer: (
      <p>
        Yes, PseudoAPI is completely free to use. You can create and use mock APIs without any subscription or payment.
      </p>
    )
  },
  {
    value: "signup-required",
    question: "Do I need to sign up to use it?",
    answer: (
      <p>
        While you can explore the platform without signing up, creating and saving APIs requires a free account for managing and accessing your endpoints.
      </p>
    )
  },
  {
    value: "public-private",
    question: "Can I make my APIs public or private?",
    answer: (
      <p>
        Absolutely. You can choose whether your APIs are visible only to you or can be shared publicly with others.
      </p>
    )
  },
  {
    value: "data-types",
    question: "What types of data can I generate?",
    answer: (
      <p>
        PseudoAPI supports over 300+ faker types like names, emails, phone numbers, products, companies, and more. It's great for testing and prototyping.
      </p>
    )
  },
  {
    value: "integration",
    question: "How do I integrate it into my app?",
    answer: (
      <p>
        Simply copy the API URL and use it with <code className="bg-muted px-1 py-0.5 rounded text-sm">fetch</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm">axios</code>, or any HTTP client of your choice. No authentication needed.
      </p>
    )
  }
];

export default FAQ;