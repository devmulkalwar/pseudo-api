import { useEffect, useState, useMemo, useCallback, memo } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Plus,
  Trash2,
  Check,
  ChevronRight,
  Clipboard,
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
import CodeBlock from "@/components/CodeBlock";
import useGlobalContext from "@/hooks/useGlobalContext";
import { useAuth } from "@clerk/clerk-react";
import { debounce } from "lodash";

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

// Create a memoized field component
const Field = memo(({ field, index, onFieldChange, onRemove, fakerTypes }) => (
  <div className="grid grid-cols-2 gap-2">
    <Input
      placeholder="Field name"
      value={field.fieldName}
      onChange={(e) => onFieldChange(index, "fieldName", e.target.value)}
    />
    <div className="flex items-center gap-2">
      <Select
        value={field.fieldType}
        onValueChange={(value) => onFieldChange(index, "fieldType", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select data type" />
        </SelectTrigger>
        <SelectContent>
          {fakerTypes.map((type) => (
            <SelectItem key={type} value={type} className="text-sm">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="ghost" size="icon" onClick={() => onRemove(field.id)}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  </div>
));

const EditApi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState([]);
  const [apiDetails, setApiDetails] = useState({
    isPublic: true,
    name: "",
    description: "",
    tags: [],
  });
  const [entries, setEntries] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { getApiById, editApi, editSchema, user, showToast } = useGlobalContext();
  const { getToken } = useAuth();

  useEffect(() => {
    const loadApiData = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        const response = await getApiById(id, token);
        const api = response.data;

        // Set basic details
        setApiDetails({
          isPublic: api.isPublic,
          name: api.name,
          description: api.description,
          tags: api.tags || [],
          category: api.category || "other",
        });

        // Set schema fields
        const initialFields = api.schema.map((field, index) => ({
          id: index + 1,
          fieldName: field.fieldName,
          fieldType: field.fieldType.replace("faker.", ""),
        }));
        setFields(initialFields);

        // Set entries
        setEntries(api.entries || 10);
        setErrorMessage("");
      } catch (err) {
        const errorMsg =
          err?.response?.data?.message || "Failed to load API data";
        setErrorMessage(errorMsg);
        showToast(errorMsg, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadApiData();
  }, [id, getToken, getApiById, showToast]);

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
        if (namespace === "name") namespace = "person";
        if (faker[namespace] && faker[namespace][method]) {
          acc[field.fieldName || `field_${field.id}`] =
            faker[namespace][method]();
        }
        return acc;
      },
      { id: faker.string.uuid() }
    );
  };

  const handleUpdateApi = async () => {
    try {
      if (!apiDetails.name) {
        showToast("API name is required", "error");
        return;
      }

      const token = await getToken();

      // Update basic API info
      const apiData = {
        name: apiDetails.name,
        description: apiDetails.description,
        isPublic: apiDetails.isPublic,
        category: apiDetails.category || "other",
        tags: apiDetails.tags,
      };

      await editApi(id, apiData, token);

      // Update schema
      const schemaData = {
        entries,
        schema: fields.map(({ fieldName, fieldType }) => ({
          fieldName: fieldName || `field_${Date.now()}`,
          fieldType: `faker.${fieldType}`,
        })),
      };

      await editSchema(id, schemaData, token);
      showToast("API updated successfully", "success");
      navigate(`/api-details/${id}`);
      setErrorMessage("");
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || err?.message || "Error updating API";
      setErrorMessage(errorMsg);
      showToast(errorMsg, "error");
    }
  };

  // Optimized field update handler
  const handleFieldChange = useCallback((index, key, value) => {
    setFields((prev) =>
      prev.map((field, i) => (i === index ? { ...field, [key]: value } : field))
    );
  }, []);

  const handleAddTag = (newTag) => {
    if (apiDetails.tags.length >= 5) return;
    setApiDetails({
      ...apiDetails,
      tags: [...new Set([...apiDetails.tags, newTag])],
    });
  };

  // Memoize fields rendering
  const renderedFields = useMemo(
    () =>
      fields.map((field, index) => (
        <Field
          key={field.id}
          field={field}
          index={index}
          onFieldChange={handleFieldChange}
          onRemove={removeField}
          fakerTypes={fakerTypes}
        />
      )),
    [fields, handleFieldChange, removeField]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mb-6">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : ""}`}>
          <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {step === 1 ? "1" : <Check className="h-4 w-4" />}
          </span>
          <span className="text-sm sm:text-base">API Configuration</span>
        </div>

        <ChevronRight className="h-4 w-4" />

        <div className={`flex items-center gap-2 ${step === 2 ? "text-primary" : ""}`}>
          <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            2
          </span>
          <span className="text-sm sm:text-base">Update Structure</span>
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
                value={apiDetails.name}
                onChange={(e) =>
                  setApiDetails({ ...apiDetails, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={apiDetails.description}
                onChange={(e) =>
                  setApiDetails({ ...apiDetails, description: e.target.value })
                }
              />
            </div>

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
              onClick={() => setStep(2)}
              disabled={!apiDetails.name}
            >
              Continue to Structure
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setStep(1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-lg sm:text-xl">API Structure</CardTitle>
            </div>
            <Button variant="outline" onClick={addField}>
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-lg border bg-muted/10 p-3">
              <div className="grid grid-cols-2 gap-2">
                <Input value="id" disabled />
                <div className="flex items-center gap-2">
                  <Input value="Auto-generated UUID" disabled />
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            {/* Replace the fields mapping with the memoized version */}
            {renderedFields}

            <div className="space-y-2">
              <Label>Number of Entries</Label>
              <Input
                type="number"
                value={entries}
                onChange={(e) =>
                  setEntries(Math.min(1000, Math.max(0, e.target.value)))
                }
                min="0"
                max="1000"
                className="w-full sm:w-32"
              />
              <p className="text-xs text-muted-foreground">Max 1000 entries</p>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg sm:text-xl">Data Preview</CardTitle>
            </CardHeader>
            <CodeBlock
              code={JSON.stringify(
                [generateFakeData(), generateFakeData(), generateFakeData()],
                null,
                2
              )}
            />

            <Button className="w-full" onClick={handleUpdateApi}>
              Update API
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EditApi;