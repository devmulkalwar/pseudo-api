import SyntaxHighlighter from "react-syntax-highlighter";
import { Button } from "./ui/button";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ code, language = "json" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={dracula}
        className="rounded-lg"
      >
        {code}
      </SyntaxHighlighter>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 flex items-center gap-1 dark:text-white"
        aria-live="polite"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-green-500" />
        ) : (
          <ClipboardIcon className="h-4 w-4" />
        )}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};

export default CodeBlock;
