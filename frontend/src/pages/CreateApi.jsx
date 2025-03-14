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
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Check, ChevronRight, Clipboard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fakerTypes } from "@/data/fakerTypes";
import { Switch } from "@/components/ui/switch";
import { faker } from "@faker-js/faker";

const CreateApi = () => {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState([
    { id: 1, name: "", type: "name.firstName" },
  ]);
  const [apiDetails, setApiDetails] = useState({
    isPublic: false,
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
    setGeneratedEndpoint(`https://pseudoapi.com/api/${endpointId}`);
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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <div
          className={`flex items-center gap-2 ${
            step >= 1 ? "text-primary" : ""
          }`}
        >
          <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {step === 1 ? "1" : <Check className="h-4 w-4" />}
          </span>
          <span>API Configuration</span>
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
          <span>Define Structure</span>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-8 w-full">
          <Card className="p-6 space-y-6 w-full">
            <div className="space-y-4">
              {/* API Visibility Toggle */}
              <div className="flex justify-between items-center space-x-2">
                <Label htmlFor="api-visibility">API Visibility</Label>
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
              </div>

              {/* API Name */}
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
                <Label>Tags (max 5)</Label>
                <div className="flex flex-wrap gap-2 border rounded p-2 w-full max-h-32 overflow-y-auto">
                  {apiDetails.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <Trash2
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setApiDetails({
                            ...apiDetails,
                            tags: apiDetails.tags.filter((t) => t !== tag),
                          })
                        }
                      />
                    </Badge>
                  ))}
                  {apiDetails.tags.length < 5 && (
                    <Input
                      className="w-48 h-8 flex-shrink-0"
                      placeholder="Add tags (press enter)"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.target.value) {
                          handleAddTag(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  )}
                </div>
                {apiDetails.tags.length >= 5 && (
                  <p className="text-xs text-muted-foreground">
                    Maximum 5 tags reached
                  </p>
                )}
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!apiDetails.name}
            >
              Continue to Structure
            </Button>
          </Card>
        </div>
      ) : (
        <div className="space-y-8 w-full">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">API Fields</h3>
                <Button variant="outline" onClick={addField}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              <div className="space-y-2 border p-4 rounded-lg bg-muted/10">
                <div className="flex items-center gap-4">
                  <Input value="id" disabled className="flex-1" />
                  <Input
                    value="Auto-generated UUID"
                    disabled
                    className="flex-1"
                  />
                  <div className="w-32">
                    <Badge
                      variant="secondary"
                      className="w-full justify-center"
                    >
                      Required
                    </Badge>
                  </div>
                </div>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Input
                      placeholder="Field name"
                      value={field.name}
                      onChange={(e) => {
                        const newFields = [...fields];
                        newFields[index].name = e.target.value;
                        setFields(newFields);
                      }}
                      className="flex-1"
                    />
                    <Select
                      value={field.type}
                      onValueChange={(value) => {
                        const newFields = [...fields];
                        newFields[index].type = value;
                        setFields(newFields);
                      }}
                    >
                      <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fakerTypes.map((type) => (
                          <SelectItem key={type} value={type}>
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

            <div className="space-y-4">
              <Label>Number of Entries *</Label>
              <Input
                type="number"
                value={entries}
                onChange={(e) => setEntries(e.target.value)}
                min="1"
                max="1000"
              />
            </div>
          </Card>

          <Card className="p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Data Preview</h3>
              <Button variant="ghost" size="sm">
                Refresh Preview
              </Button>
            </div>
            <pre className="bg-muted/10 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(generateFakeData(), null, 2)}
            </pre>
          </Card>

          <Button className="w-full" onClick={generateEndpoint}>
            Generate API
          </Button>
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Created Successfully!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-muted/10 rounded-lg">
              <code className="flex-1">{generatedEndpoint}</code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigator.clipboard.writeText(generatedEndpoint)}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
            <Button className="w-full">View API Documentation</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateApi;
