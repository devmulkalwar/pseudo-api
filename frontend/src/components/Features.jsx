import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ChevronRight, Code, Database, Globe, HardDrive, Plus, Search, Share2, Star } from 'lucide-react'

const Features = () => {
  return (
    <Card id="features" className="transition-shadow duration-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Core Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Create API</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Visual builder with 300+ faker types
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Customize field names and types
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Set entries count (1-1000)
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Save templates for reuse
                    </li>
                  </ul>
                </div>
                
                {/* Feature 2 */}
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Share API</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Public/Private visibility options
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Generate shareable links
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Collaborative team access
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Version history tracking
                    </li>
                  </ul>
                </div>
                
                {/* Feature 3 */}
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Discover APIs</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Browse public API library
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Filter by category or popularity
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Fork existing APIs as templates
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      Preview data before using
                    </li>
                  </ul>
                </div>
              </div>
              
            </CardContent>
          </Card>
  )
}

export default Features