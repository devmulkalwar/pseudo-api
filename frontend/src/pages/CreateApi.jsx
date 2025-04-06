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
import { Link, useNavigate } from "react-router-dom";
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
import useGlobalContext from "@/hooks/useGlobalContext";
import { useAuth } from "@clerk/clerk-react";

const API_CATEGORIES = [
  { value: "commerce", label: "Commerce" },
  { value: "person", label: "Person" },
  { value: "animal", label: "Animal" },
  { value: "location", label: "Location" },
  { value: "finance", label: "Finance" },
  { value: "company", label: "Company" },
  { value: "internet", label: "Internet" },
  { value: "vehicle", label: "Vehicle" },
  { value: "other", label: "Other" },
];
const CreateApi = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState([
    { id: 1, fieldName: "fullName", fieldType: "person.fullName" },
  ]);
  const [apiDetails, setApiDetails] = useState({
    isPublic: true,
    name: "",
    description: "",
    tags: [],
    category: "other",
  });
  const [entries, setEntries] = useState(10);
  const [generatedEndpoint, setGeneratedEndpoint] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiData, setApiData] = useState("");
  const [schema, setSchema] = useState("");

  // Global Context function for creating API
  const { createApi, user, defineSchema } = useGlobalContext();
  const { getToken } = useAuth();

  const addField = () => {
    setFields([
      ...fields,
      { id: fields.length + 1, fieldName: "", fieldType: "person.fullName" },
    ]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const generateFakeData = () => {
    return fields.reduce(
      (acc, field) => {
        let [namespace, method] = field.fieldType.split(".");
        // Replace deprecated namespace "name" with "person"
        if (namespace === "name") {
          namespace = "person";
        }
        if (faker[namespace] && faker[namespace][method]) {
          acc[field.fieldName || `field_${field.id}`] =
            faker[namespace][method]();
        }
        return acc;
      },
      { id: faker.string.uuid() }
    );
  };

  const generateEndpoint = async () => {
    try {
      const token = await getToken();

      const apiResponse = await createApi(apiData, token);
      console.log(apiResponse);
      const endpointId = apiResponse?.apiId;
      if (!endpointId) {
        throw new Error("API creation failed: Missing API id.");
      }
      // Remove the id property and ensure each fieldType has the "faker." prefix.
      const schemaFields = fields.map(({ id, fieldName, fieldType }) => {
        // If the fieldType does not start with "faker.", add it.
        const updatedFieldType = fieldType.startsWith("faker.")
          ? fieldType
          : `faker.${fieldType}`;
        return { fieldName, fieldType: updatedFieldType };
      });

      const schemaPayload = {
        entries: entries,
        schema: schemaFields,
      };

      console.log(schemaPayload);
      await defineSchema(endpointId, schemaPayload, token);

      setStep(2);
      setErrorMessage("");
      setGeneratedEndpoint(
        `${import.meta.env.VITE_SERVER_URL}/pseudoapi/${endpointId}`
      );
      navigate(`/api-details/${endpointId}`);
    } catch (err) {
      setErrorMessage(err?.message || "Error creating API. Please try again.");
    }
  };

  const handleAddTag = (newTag) => {
    if (apiDetails.tags.length >= 5) return;
    setApiDetails({
      ...apiDetails,
      tags: [...new Set([...apiDetails.tags, newTag])],
    });
  };

  // Function to call createApi on step 1 completion.
  const handleContinueToStructure = async () => {
    try {
      const data = {
        owner: user._id,
        ownerClerkId: user.clerkUserId,
        name: apiDetails.name,
        description: apiDetails.description,
        isPublic: apiDetails.isPublic,
        tags: apiDetails.tags,
        category: apiDetails.category,
        starredBy: [] // Add this explicitly
      };
      setApiData(data);
      setStep(2);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error?.message || "Error preparing API data");
    }
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
                  setApiDetails({ ...apiDetails, description: e.target.value })
                }
              />
            </div>
            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={apiDetails.category}
                onValueChange={(value) =>
                  setApiDetails({ ...apiDetails, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {API_CATEGORIES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}

            <Button
              className="w-full mt-4"
              onClick={handleContinueToStructure}
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
                    value={field.fieldName}
                    onChange={(e) => {
                      const newFields = [...fields];
                      newFields[index].fieldName = e.target.value;
                      setFields(newFields);
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <Select
                      value={field.fieldType}
                      onValueChange={(value) => {
                        const newFields = [...fields];
                        newFields[index].fieldType = value;
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
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg max-w-full">
              <code className="flex-1 text-xs sm:text-sm overflow-x-auto break-all">
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
            <Link to="/docs">
              <Button className="w-full">View API Documentation</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateApi;
