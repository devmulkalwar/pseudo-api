import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

const FAQ = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="rate-limits">
            <AccordionTrigger>What are the rate limits?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Free tier: 100 requests/day
                <br />
                Pro tier: 5,000 requests/day
                <br />
                Enterprise tier: Custom limits available
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-refresh">
            <AccordionTrigger>How often does data refresh?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                By default, data regenerates on every API call. If you need
                consistent data between calls, use the <code>seed</code>{" "}
                parameter with a consistent value.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="custom-types">
            <AccordionTrigger>Can I create custom data types?</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes, Pro and Enterprise users can create custom data types with
                JavaScript functions. These can be saved to your account and
                reused across multiple APIs.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-relationships">
            <AccordionTrigger>
              Can I create relationships between data?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                Yes, you can create parent-child relationships between data
                models using references. This allows for complex data structures
                like users with orders or products with categories.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQ;
