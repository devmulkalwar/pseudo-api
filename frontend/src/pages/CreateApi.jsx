import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Check,
  ChevronRight,
  Clipboard,
  RefreshCw,
  CheckCircle,
  SkipBackIcon,
  ChevronLeft,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { fakerTypes } from "@/data/fakerTypes";
import { Switch } from "@/components/ui/switch";
import { faker } from "@faker-js/faker";
import { ScrollArea } from "@/components/ui/scroll-area";
import CodeBlock from "@/components/CodeBlock";

const CreateApi = () => {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState([
    { id: 1, name: "", type: "name.firstName" },
  ]);
  const [apiDetails, setApiDetails] = useState({
    isPublic: true,
    name: "",
    description: "",
    tags: [],
  });
  const [entries, setEntries] = useState(10);
  const [generatedEndpoint, setGeneratedEndpoint] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const addField = () => {
    setFields([
      ...fields,
      { id: fields.length + 1, name: "", type: "name.firstName" },
    ]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const generateFakeData = () => {
    return fields.reduce(
      (acc, field) => {
        const [namespace, method] = field.type.split(".");
        if (faker[namespace] && faker[namespace][method]) {
          acc[field.name || `field_${field.id}`] = faker[namespace][method]();
        }
        return acc;
      },
      { id: faker.string.uuid() }
    );
  };

  const generateEndpoint = () => {
    const endpointId = Math.random().toString(36).substr(2, 9);
    setGeneratedEndpoint(`${import.meta.env.VITE_SERVER_URL}/pseudoapi/${endpointId}`);
    setShowDialog(true);
  };

  const handleAddTag = (newTag) => {
    if (apiDetails.tags.length >= 5) return;
    setApiDetails({
      ...apiDetails,
      tags: [...new Set([...apiDetails.tags, newTag])],
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mb-6">
        <div
          className={`flex items-center gap-2 ${
            step >= 1 ? "text-primary" : ""
          }`}
        >
          <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {step === 1 ? "1" : <Check className="h-4 w-4" />}
          </span>
          <span className="text-sm sm:text-base">API Configuration</span>
        </div>

        <ChevronRight className="h-4 w-4" />

        <div
          className={`flex items-center gap-2 ${
            step === 2 ? "text-primary" : ""
          }`}
        >
          <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            2
          </span>
          <span className="text-sm sm:text-base">Define Structure</span>
        </div>
      </div>

      {step === 1 ? (
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg sm:text-xl">API Details</CardTitle>
            <div className="flex items-center gap-2">
              <Switch
                id="api-visibility"
                checked={apiDetails.isPublic}
                onCheckedChange={(checked) =>
                  setApiDetails({ ...apiDetails, isPublic: checked })
                }
              />
              <Label htmlFor="api-visibility" className="text-sm">
                {apiDetails.isPublic ? "Public" : "Private"}
              </Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">API Name *</Label>
              <Input
                id="name"
                placeholder="e.g., User Profile API"
                value={apiDetails.name}
                onChange={(e) =>
                  setApiDetails({ ...apiDetails, name: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your API (optional)"
                value={apiDetails.description}
                onChange={(e) =>
                  setApiDetails({
                    ...apiDetails,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Tags</label>
                <span className="text-xs text-muted-foreground">
                  {apiDetails.tags.length}/5
                </span>
              </div>

              <div className="flex flex-wrap gap-2 border rounded-md p-3 w-full max-h-32 overflow-y-auto bg-muted/10">
                {apiDetails.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1 rounded-md"
                  >
                    {tag}
                    <Trash2
                      className="h-4 w-4 cursor-pointer hover:text-destructive transition"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}

                {apiDetails.tags.length < 5 && (
                  <Input
                    className="w-full sm:w-48 h-9 flex-shrink-0 border-none focus-visible:ring-0 bg-transparent text-sm placeholder:text-muted-foreground"
                    placeholder="Add tag (press enter)"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        handleAddTag(e.target.value.trim());
                        e.target.value = "";
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => setStep(2)}
              disabled={!apiDetails.name}
            >
              Continue to Structure
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          {/* API Fields Section */}

          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setStep(1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-lg sm:text-xl">API Fields</CardTitle>
            </div>
            <Button
              variant="outline"
              onClick={addField}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Field</span>
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Required ID Field */}
            <div className="rounded-lg border bg-muted/10 p-3">
              <div className="grid grid-cols-2 gap-2">
                <Input value="id" disabled />
                <div className="flex items-center gap-2">
                  <Input value="Auto-generated UUID" disabled />
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            {/* Dynamic Fields */}
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Field name"
                    value={field.name}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index].name = e.target.value;
                      setFields(newFields);
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <Select
                      value={field.type}
                      onValueChange={(value) => {
                        const newFields = [...fields];
                        newFields[index].type = value;
                        setFields(newFields);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fakerTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-sm"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(field.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Entries Input */}
            <div className="space-y-2">
              <Label>Number of Entries</Label>
              <Input
                type="number"
                value={entries}
                onChange={(e) =>
                  setEntries(
                    Math.min(1000, Math.max(1, Number(e.target.value)))
                  )
                }
                min="1"
                max="1000"
                className="w-full sm:w-32"
              />
              <p className="text-xs text-muted-foreground">
                Maximum: 1000 entries
              </p>
            </div>
          

          {/* Data Preview Section */}
          
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
              <CardTitle className="text-lg sm:text-xl">Data Preview</CardTitle>
            </CardHeader>
            
              <CodeBlock
                code={JSON.stringify(
                  [generateFakeData(), generateFakeData(), generateFakeData()],
                  null,
                  2
                )}
                className="text-sm"
              />
           
          

          {/* Action Buttons */}

          <Button
            className="w-full sm:flex-1 order-1 sm:order-2"
            onClick={generateEndpoint}
          >
            Generate API
          </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API Created Successfully!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <code className="flex-1 text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
                {generatedEndpoint}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigator.clipboard.writeText(generatedEndpoint)}
                title="Copy to clipboard"
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full">View API Documentation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateApi;
