import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface IngredientDetailProps {
  ingredient: any
}

export function IngredientDetail({ ingredient }: IngredientDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-fsw-blue/20">
        <CardHeader className="border-b border-fsw-blue/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl text-fsw-blue">{ingredient.name}</CardTitle>
              <CardDescription>
                ID: {ingredient.id} • Source: {ingredient.source} •{" "}
                <Badge variant="outline" className="bg-fsw-green/10 text-fsw-green border-fsw-green/20">
                  {ingredient.type}
                </Badge>
              </CardDescription>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm text-gray-500">Added: {formatDate(ingredient.createdAt)}</div>
              <div className="text-sm text-gray-500">Last Updated: {formatDate(ingredient.updatedAt)}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="bg-fsw-blue/10 mb-6">
              <TabsTrigger value="basic" className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="macros" className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white">
                Macronutrients
              </TabsTrigger>
              <TabsTrigger value="minerals" className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white">
                Minerals
              </TabsTrigger>
              <TabsTrigger value="vitamins" className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white">
                Vitamins
              </TabsTrigger>
              {ingredient.aminoAcids && (
                <TabsTrigger value="amino" className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white">
                  Amino Acids
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-fsw-blue mb-2">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Product ID</div>
                        <div className="font-medium">{ingredient.id}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Name</div>
                        <div className="font-medium">{ingredient.name}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Source</div>
                        <div className="font-medium">{ingredient.source}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Type</div>
                        <div className="font-medium">{ingredient.type}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Allergen</div>
                        <div className="font-medium">{ingredient.allergen || "None"}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Glycemic Index</div>
                        <div className="font-medium">{ingredient.glycemicIndex}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-fsw-blue mb-2">Nutritional Summary</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Energy</div>
                        <div className="font-medium">{ingredient.energy} kcal</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Protein</div>
                        <div className="font-medium">{ingredient.protein} g</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Carbohydrates</div>
                        <div className="font-medium">{ingredient.carbohydrate} g</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Fat</div>
                        <div className="font-medium">{ingredient.fat} g</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Fibre</div>
                        <div className="font-medium">{ingredient.fibre} g</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-500">Moisture</div>
                        <div className="font-medium">{ingredient.moisture} g</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="macros">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-fsw-blue">Macronutrient Composition</h3>
                <div className="rounded-md border border-fsw-blue/20">
                  <Table>
                    <TableHeader className="bg-fsw-blue/5">
                      <TableRow>
                        <TableHead>Nutrient</TableHead>
                        <TableHead>Amount (per 100g)</TableHead>
                        <TableHead>% of Energy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Protein</TableCell>
                        <TableCell>{ingredient.protein} g</TableCell>
                        <TableCell>{(((ingredient.protein * 4) / ingredient.energy) * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Carbohydrates</TableCell>
                        <TableCell>{ingredient.carbohydrate} g</TableCell>
                        <TableCell>{(((ingredient.carbohydrate * 4) / ingredient.energy) * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fat</TableCell>
                        <TableCell>{ingredient.fat} g</TableCell>
                        <TableCell>{(((ingredient.fat * 9) / ingredient.energy) * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fibre</TableCell>
                        <TableCell>{ingredient.fibre} g</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Moisture</TableCell>
                        <TableCell>{ingredient.moisture} g</TableCell>
                        <TableCell>-</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Energy</TableCell>
                        <TableCell>{ingredient.energy} kcal</TableCell>
                        <TableCell>100%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="minerals">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-fsw-blue">Mineral Content</h3>
                <div className="rounded-md border border-fsw-blue/20">
                  <Table>
                    <TableHeader className="bg-fsw-blue/5">
                      <TableRow>
                        <TableHead>Mineral</TableHead>
                        <TableHead>Amount (mg per 100g)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ingredient.minerals &&
                        Object.entries(ingredient.minerals).map(([key, value]: [string, any]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                            <TableCell>{value} mg</TableCell>
                          </TableRow>
                        ))}
                      {(!ingredient.minerals || Object.keys(ingredient.minerals).length === 0) && (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                            No mineral data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vitamins">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-fsw-blue">Vitamin Content</h3>
                <div className="rounded-md border border-fsw-blue/20">
                  <Table>
                    <TableHeader className="bg-fsw-blue/5">
                      <TableRow>
                        <TableHead>Vitamin</TableHead>
                        <TableHead>Amount (mg per 100g)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ingredient.vitamins &&
                        Object.entries(ingredient.vitamins)
                          .filter(([key, value]) => key !== "folicAcid")
                          .map(([key, value]: [string, any]) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium">
                                {key === "vitaminC"
                                  ? "Vitamin C"
                                  : key === "carotene"
                                    ? "Carotene"
                                    : key.charAt(0).toUpperCase() + key.slice(1)}
                              </TableCell>
                              <TableCell>{value} mg</TableCell>
                            </TableRow>
                          ))}
                      {ingredient.vitamins?.folicAcid && (
                        <>
                          <TableRow>
                            <TableCell className="font-medium">Folic Acid (Free)</TableCell>
                            <TableCell>{ingredient.vitamins.folicAcid.free} mg</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Folic Acid (Total)</TableCell>
                            <TableCell>{ingredient.vitamins.folicAcid.total} mg</TableCell>
                          </TableRow>
                        </>
                      )}
                      {(!ingredient.vitamins || Object.keys(ingredient.vitamins).length === 0) && (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                            No vitamin data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amino">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-fsw-blue">Amino Acid Profile</h3>
                <div className="rounded-md border border-fsw-blue/20">
                  <Table>
                    <TableHeader className="bg-fsw-blue/5">
                      <TableRow>
                        <TableHead>Amino Acid</TableHead>
                        <TableHead>Amount (mg per 100g)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ingredient.aminoAcids &&
                        Object.entries(ingredient.aminoAcids).map(([key, value]: [string, any]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                            <TableCell>{value} mg</TableCell>
                          </TableRow>
                        ))}
                      {(!ingredient.aminoAcids || Object.keys(ingredient.aminoAcids).length === 0) && (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                            No amino acid data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
