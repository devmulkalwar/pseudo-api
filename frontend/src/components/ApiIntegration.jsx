import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import CodeBlock from './CodeBlock'
import { Code } from 'lucide-react'

const ApiIntegration = () => {
  return (
     <Card id="integration">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                API Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="axios" className="w-full">
                <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="axios">Axios</TabsTrigger>
                  <TabsTrigger value="fetch">Fetch</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="axios" className="mt-4">
                  <CodeBlock
                    code={`// Install axios: npm install axios
import axios from 'axios';

// Make request to your PseudoAPI endpoint
axios.get('https://pseudoapi.com/api/your-api-id')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });`}
                    language="javascript"
                  />
                </TabsContent>

                <TabsContent value="fetch" className="mt-4">
                  <CodeBlock
                    code={`// Using native fetch API
fetch('https://pseudoapi.com/api/your-api-id')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  }).catch(error => {
    console.error('Error fetching data:', error);
  });`}
                    language="javascript"
                  />
                </TabsContent>

                <TabsContent value="python" className="mt-4">
                  <CodeBlock
                    code={`# Using requests library
import requests

# Make request to your PseudoAPI endpoint
response = requests.get('https://pseudoapi.com/api/your-api-id')

# Check if request was successful
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
    print(response.text)`}
                    language="python"
                  />
                </TabsContent>

                <TabsContent value="curl" className="mt-4">
                  <CodeBlock
                    code={`# Simple GET request
curl -X GET https://pseudoapi.com/api/your-api-id

# Get request with pretty-printed JSON output
curl -X GET https://pseudoapi.com/api/your-api-id | json_pp`}
                    language="bash"
                  />
                </TabsContent>
              </Tabs>
              
              <div className="p-4 border rounded-md bg-muted">
                <h4 className="font-medium mb-2">Response Format</h4>
                <CodeBlock
                  code={`
  [
    {
      "id": "1",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@example.net",
      "address": "4218 Maple Avenue",
      "phone": "555-123-4567"
    },
    {
      "id": "2",
      "name": "Michael Rodriguez",
      "email": "m.rodriguez@example.org",
      "address": "729 Pine Street",
      "phone": "555-987-6543"
    }
    // ... more entries based on your configuration
  ]
`}
                  language="json"
                />
              </div>
            </CardContent>
          </Card>
  )
}

export default ApiIntegration