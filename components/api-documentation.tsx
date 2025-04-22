"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ApiDocumentation() {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Learn how to use our ingredient data API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Your API Key</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => handleCopy("sk_test_51NXxXXXXXXXXXXXXXXXXXXXX")}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="mt-2 flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-mono text-gray-100">
                <span className="truncate">sk_test_51NXxXXXXXXXXXXXXXXXXXXXX</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Keep your API key secure. Do not share it in publicly accessible areas.
              </p>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-sm font-medium">Introduction</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    The Food Pandora API provides access to comprehensive nutritional and ingredient data. Each API
                    request consumes tokens from your account balance.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Authentication</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    All API requests require authentication using your API key. Include your API key in the request
                    header as follows:
                  </p>
                  <div className="mt-2 rounded-md bg-gray-900 p-3 font-mono text-xs text-gray-100">
                    <pre>Authorization: Bearer YOUR_API_KEY</pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Token Usage</h3>
                  <p className="mt-1 text-sm text-gray-500">Different endpoints consume different amounts of tokens:</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-500 space-y-1">
                    <li>Basic ingredient lookup: 1 token per request</li>
                    <li>Detailed nutrition data: 5 tokens per request</li>
                    <li>Batch operations: 1 token per ingredient</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="endpoints" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-sm font-medium">Available Endpoints</h3>
                  <div className="mt-2 space-y-3">
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">GET</span>
                        <code className="text-sm">/api/ingredients</code>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        List all available ingredients with pagination support.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Token cost: 1 token</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">GET</span>
                        <code className="text-sm">/api/ingredients/{"{id}"}</code>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Get detailed information about a specific ingredient.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Token cost: 1 token</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">GET</span>
                        <code className="text-sm">/api/ingredients/{"{id}"}/nutrition</code>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Get detailed nutritional information including macros, amino acids, vitamins, and minerals.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Token cost: 5 tokens</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">GET</span>
                        <code className="text-sm">/api/ingredients/search</code>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Search for ingredients by name, category, or nutritional properties.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Token cost: 1 token</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">GET</span>
                        <code className="text-sm">/api/ingredients/batch</code>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Get information about multiple ingredients in a single request.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Token cost: 1 token per ingredient</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="examples" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-sm font-medium">Example Requests</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-gray-700">Get all ingredients (paginated)</h4>
                      <div className="mt-1 rounded-md bg-gray-900 p-3 font-mono text-xs text-gray-100">
                        <div className="flex items-center justify-between">
                          <pre>
                            curl -X GET "https://api.foodpandora.com/api/ingredients?page=1&limit=10" \ -H
                            "Authorization: Bearer YOUR_API_KEY"
                          </pre>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-gray-100"
                            onClick={() =>
                              handleCopy(
                                'curl -X GET "https://api.foodpandora.com/api/ingredients?page=1&limit=10" -H "Authorization: Bearer YOUR_API_KEY"',
                              )
                            }
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-700">Get specific ingredient</h4>
                      <div className="mt-1 rounded-md bg-gray-900 p-3 font-mono text-xs text-gray-100">
                        <div className="flex items-center justify-between">
                          <pre>
                            curl -X GET "https://api.foodpandora.com/api/ingredients/123" \ -H "Authorization: Bearer
                            YOUR_API_KEY"
                          </pre>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-gray-100"
                            onClick={() =>
                              handleCopy(
                                'curl -X GET "https://api.foodpandora.com/api/ingredients/123" -H "Authorization: Bearer YOUR_API_KEY"',
                              )
                            }
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-700">Get detailed nutrition data</h4>
                      <div className="mt-1 rounded-md bg-gray-900 p-3 font-mono text-xs text-gray-100">
                        <div className="flex items-center justify-between">
                          <pre>
                            curl -X GET "https://api.foodpandora.com/api/ingredients/123/nutrition" \ -H "Authorization:
                            Bearer YOUR_API_KEY"
                          </pre>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 hover:text-gray-100"
                            onClick={() =>
                              handleCopy(
                                'curl -X GET "https://api.foodpandora.com/api/ingredients/123/nutrition" -H "Authorization: Bearer YOUR_API_KEY"',
                              )
                            }
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Example Responses</h3>
                  <div className="mt-2 space-y-4">
                    <div>
                      <h4 className="text-xs font-medium text-gray-700">Ingredient details response</h4>
                      <div className="mt-1 rounded-md bg-gray-900 p-3 font-mono text-xs text-gray-100 overflow-auto max-h-60">
                        <pre>{`{
  "id": 123,
  "name": "Wheat Flour",
  "description": "Refined wheat flour, all-purpose",
  "category": "Grains",
  "macros": {
    "carbohydrates": 76.3,
    "proteins": 10.3,
    "fats": 1.4
  },
  "aminoAcids": {
    "leucine": 0.78,
    "isoleucine": 0.42,
    "valine": 0.44,
    "lysine": 0.25,
    "methionine": 0.17,
    "phenylalanine": 0.57,
    "threonine": 0.29,
    "tryptophan": 0.12,
    "histidine": 0.21
  }
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Error Handling</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    The API uses standard HTTP status codes to indicate the success or failure of requests.
                  </p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">200</span>
                      <span className="text-sm text-gray-500">Success</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">400</span>
                      <span className="text-sm text-gray-500">Bad Request - Invalid parameters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">401</span>
                      <span className="text-sm text-gray-500">Unauthorized - Invalid API key</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">403</span>
                      <span className="text-sm text-gray-500">Forbidden - Insufficient tokens</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">404</span>
                      <span className="text-sm text-gray-500">Not Found - Resource not found</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">500</span>
                      <span className="text-sm text-gray-500">Server Error</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Quick guide to start using the API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium">1. Authentication</h3>
              <p className="mt-1 text-sm text-gray-500">
                Include your API key in all requests using the Authorization header.
              </p>
              <div className="mt-2 rounded-md bg-gray-50 p-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-gray-500" />
                  <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium">2. Make Your First Request</h3>
              <p className="mt-1 text-sm text-gray-500">Try fetching the list of ingredients to verify your setup.</p>
              <div className="mt-2 rounded-md bg-gray-50 p-3">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-gray-500" />
                  <code className="text-sm">GET /api/ingredients?limit=10</code>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium">3. Monitor Your Token Usage</h3>
              <p className="mt-1 text-sm text-gray-500">
                Check your token balance regularly in your dashboard to avoid service interruptions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
