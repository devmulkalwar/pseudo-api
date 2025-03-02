import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Check, ChevronRight, Clipboard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {fakerTypes} from "@/data/fakerTypes"

const CreateApi = () => {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState([{ id: 1, name: '', type: 'name' }]);
  const [apiDetails, setApiDetails] = useState({
    name: '',
    description: '',
    tags: [],
  });
  const [entries, setEntries] = useState(10);
  const [generatedEndpoint, setGeneratedEndpoint] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  

  const addField = () => {
    setFields([...fields, { id: fields.length + 1, name: '', type: 'name.firstName' }]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const generateEndpoint = () => {
    const endpointId = Math.random().toString(36).substr(2, 9);
    setGeneratedEndpoint(`https://pseudoapi.com/api/${endpointId}`);
    setShowDialog(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : ''}`}>
          <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            {step === 1 ? '1' : <Check className="h-4 w-4" />}
          </span>
          <span>API Configuration</span>
        </div>
        
        <ChevronRight className="h-4 w-4" />
        
        <div className={`flex items-center gap-2 ${step === 2 ? 'text-primary' : ''}`}>
          <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">2</span>
          <span>Define Structure</span>
        </div>
      </div>

      {step === 1 ? (
        /* Step 1: API Configuration */
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <Label>API Name *</Label>
            <Input 
              placeholder="e.g., User Profile API" 
              value={apiDetails.name}
              onChange={(e) => setApiDetails({...apiDetails, name: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your API (optional)"
              value={apiDetails.description}
              onChange={(e) => setApiDetails({...apiDetails, description: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {apiDetails.tags.map(tag => (
                <Badge key={tag} className="gap-2">
                  {tag}
                  <Trash2 className="h-3 w-3 cursor-pointer" />
                </Badge>
              ))}
              <Input 
                placeholder="Add tags (press enter)" 
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    setApiDetails({...apiDetails, tags: [...apiDetails.tags, e.target.value]});
                    e.target.value = '';
                  }
                }}
              />
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
      ) : (
        /* Step 2: Define API Structure */
        <div className="space-y-8">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">API Fields</h3>
                <Button variant="outline" onClick={addField}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              {/* Mandatory ID Field */}
              <div className="space-y-2 border p-4 rounded-lg bg-muted/10">
                <div className="flex items-center gap-4">
                  <Input value="id" disabled className="flex-1" />
                  <Input value="Auto-generated UUID" disabled className="flex-1" />
                  <div className="w-32">
                    <Badge variant="secondary" className="w-full justify-center">
                      Required
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Dynamic Fields */}
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
                        {fakerTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.split('.')[1]}
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

          {/* Preview Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Data Preview</h3>
              <Button variant="ghost" size="sm">
                Refresh Preview
              </Button>
            </div>
            <pre className="bg-muted/10 p-4 rounded-lg text-sm overflow-x-auto">
              {JSON.stringify(
                Array.from({ length: 3 }).map(() => ({
                  id: "123e4567-e89b-12d3-a456-426614174000",
                  ...fields.reduce((acc, field) => ({
                    ...acc,
                    [field.name || `field_${field.id}`]: "sample_value"
                  }), {})
                })),
                null,
                2
              )}
            </pre>
          </Card>

          <Button className="w-full" onClick={generateEndpoint}>
            Generate API
          </Button>
        </div>
      )}

      {/* Endpoint Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Created Successfully!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-muted/10 rounded-lg">
              <code className="flex-1">{generatedEndpoint}</code>
              <Button variant="ghost" size="icon">
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