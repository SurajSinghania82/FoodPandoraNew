"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

interface IngredientEditorProps {
  ingredient: any
  onSave: (updatedIngredient: any) => void
  onCancel: () => void
}

export function IngredientEditor({ ingredient, onSave, onCancel }: IngredientEditorProps) {
  const [formData, setFormData] = useState({ ...ingredient })
  const [activeTab, setActiveTab] = useState("basic")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = value === "" ? 0 : Number.parseFloat(value)

    // Handle nested properties
    if (name.includes(".")) {
      const parts = name.split(".")
      if (parts.length === 2) {
        const [parent, child] = parts
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: numValue,
          },
        })
      } else if (parts.length === 3) {
        const [parent, child, grandchild] = parts
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: {
              ...formData[parent][child],
              [grandchild]: numValue,
            },
          },
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: numValue,
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Basic validation
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.source) newErrors.source = "Source is required"
    if (!formData.type) newErrors.type = "Type is required"

    // Numeric validation
    if (formData.glycemicIndex < 0 || formData.glycemicIndex > 100) {
      newErrors.glycemicIndex = "Glycemic index must be between 0 and 100"
    }

    if (formData.protein < 0) newErrors.protein = "Protein cannot be negative"
    if (formData.fat < 0) newErrors.fat = "Fat cannot be negative"
    if (formData.carbohydrate < 0) newErrors.carbohydrate = "Carbohydrate cannot be negative"
    if (formData.fibre < 0) newErrors.fibre = "Fibre cannot be negative"
    if (formData.moisture < 0) newErrors.moisture = "Moisture cannot be negative"
    if (formData.energy < 0) newErrors.energy = "Energy cannot be negative"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Update the timestamp
      const updatedIngredient = {
        ...formData,
        updatedAt: new Date().toISOString(),
      }

      onSave(updatedIngredient)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-fsw-blue/20">
        <CardHeader className="border-b border-fsw-blue/10">
          <CardTitle className="text-fsw-blue">Edit Ingredient: {ingredient.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <TabsTrigger value="amino" className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white">
                Amino Acids
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">Product ID</Label>
                    <Input
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className="border-fsw-blue/20"
                      disabled
                    />
                    <p className="text-xs text-gray-500">Product ID cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`border-fsw-blue/20 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source">Source</Label>
                    <Input
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className={`border-fsw-blue/20 ${errors.source ? "border-red-500" : ""}`}
                    />
                    {errors.source && <p className="text-xs text-red-500">{errors.source}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger className={`border-fsw-blue/20 ${errors.type ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Veg">Vegetarian</SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                        <SelectItem value="Non-veg">Non-vegetarian</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergen">Allergen</Label>
                    <Input
                      id="allergen"
                      name="allergen"
                      value={formData.allergen || "None"}
                      onChange={handleInputChange}
                      className="border-fsw-blue/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="glycemicIndex">Glycemic Index</Label>
                    <Input
                      id="glycemicIndex"
                      name="glycemicIndex"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.glycemicIndex}
                      onChange={handleNumberInputChange}
                      className={`border-fsw-blue/20 ${errors.glycemicIndex ? "border-red-500" : ""}`}
                    />
                    {errors.glycemicIndex && <p className="text-xs text-red-500">{errors.glycemicIndex}</p>}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="macros" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="protein">Protein (g per 100g)</Label>
                    <Input
                      id="protein"
                      name="protein"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.protein}
                      onChange={handleNumberInputChange}
                      className={`border-fsw-blue/20 ${errors.protein ? "border-red-500" : ""}`}
                    />
                    {errors.protein && <p className="text-xs text-red-500">{errors.protein}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carbohydrate">Carbohydrates (g per 100g)</Label>
                    <Input
                      id="carbohydrate"
                      name="carbohydrate"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.carbohydrate}
                      onChange={handleNumberInputChange}
                      className={`border-fsw-blue/20 ${errors.carbohydrate ? "border-red-500" : ""}`}
                    />
                    {errors.carbohydrate && <p className="text-xs text-red-500">{errors.carbohydrate}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fat">Fat (g per 100g)</Label>
                    <Input
                      id="fat"
                      name="fat"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.fat}
                      onChange={handleNumberInputChange}
                      className={`border-fsw-blue/20 ${errors.fat ? "border-red-500" : ""}`}
                    />
                    {errors.fat && <p className="text-xs text-red-500">{errors.fat}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fibre">Fibre (g per 100g)</Label>
                    <Input
                      id="fibre"
                      name="fibre"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.fibre}
                      onChange={handleNumberInputChange}
                      className={`border-fsw-blue/20 ${errors.fibre ? "border-red-500" : ""}`}
                    />
                    {errors.fibre && <p className="text-xs text-red-500">{errors.fibre}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="moisture">Moisture (g per 100g)</Label>
                    <Input
                      id="moisture"
                      name="moisture"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.moisture}
                      onChange={handleNumberInputChange}
                      className={`border-fsw-blue/20 ${errors.moisture ? "border-red-500" : ""}`}
                    />
                    {errors.moisture && <p className="text-xs text-red-500">{errors.moisture}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="energy">Energy (kcal per 100g)</Label>
                    <Input
                      id="energy"
                      name="energy"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.energy}
                      onChange={handleNumberInputChange}
                      className={`border-fsw-blue/20 ${errors.energy ? "border-red-500" : ""}`}
                    />
                    {errors.energy && <p className="text-xs text-red-500">{errors.energy}</p>}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="minerals" className="space-y-4">
              <Alert className="bg-fsw-blue/10 border-fsw-blue/20 mb-4">
                <Info className="h-4 w-4 text-fsw-blue" />
                <AlertDescription className="text-fsw-blue">
                  All mineral values are in mg per 100g of food
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minerals.calcium">Calcium (mg)</Label>
                  <Input
                    id="minerals.calcium"
                    name="minerals.calcium"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.minerals?.calcium || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minerals.phosphorous">Phosphorous (mg)</Label>
                  <Input
                    id="minerals.phosphorous"
                    name="minerals.phosphorous"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.minerals?.phosphorous || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minerals.iron">Iron (mg)</Label>
                  <Input
                    id="minerals.iron"
                    name="minerals.iron"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.minerals?.iron || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vitamins" className="space-y-4">
              <Alert className="bg-fsw-blue/10 border-fsw-blue/20 mb-4">
                <Info className="h-4 w-4 text-fsw-blue" />
                <AlertDescription className="text-fsw-blue">
                  All vitamin values are in mg per 100g of food
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vitamins.carotene">Carotene (mg)</Label>
                  <Input
                    id="vitamins.carotene"
                    name="vitamins.carotene"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.vitamins?.carotene || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vitamins.thiamine">Thiamine (mg)</Label>
                  <Input
                    id="vitamins.thiamine"
                    name="vitamins.thiamine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.vitamins?.thiamine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vitamins.riboflavin">Riboflavin (mg)</Label>
                  <Input
                    id="vitamins.riboflavin"
                    name="vitamins.riboflavin"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.vitamins?.riboflavin || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vitamins.niacin">Niacin (mg)</Label>
                  <Input
                    id="vitamins.niacin"
                    name="vitamins.niacin"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.vitamins?.niacin || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vitamins.vitaminC">Vitamin C (mg)</Label>
                  <Input
                    id="vitamins.vitaminC"
                    name="vitamins.vitaminC"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.vitamins?.vitaminC || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-fsw-blue/10">
                <h3 className="text-sm font-medium text-fsw-blue mb-4">Folic Acid</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vitamins.folicAcid.free">Folic Acid - Free (mg)</Label>
                    <Input
                      id="vitamins.folicAcid.free"
                      name="vitamins.folicAcid.free"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.vitamins?.folicAcid?.free || 0}
                      onChange={handleNumberInputChange}
                      className="border-fsw-blue/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vitamins.folicAcid.total">Folic Acid - Total (mg)</Label>
                    <Input
                      id="vitamins.folicAcid.total"
                      name="vitamins.folicAcid.total"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.vitamins?.folicAcid?.total || 0}
                      onChange={handleNumberInputChange}
                      className="border-fsw-blue/20"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amino" className="space-y-4">
              <Alert className="bg-fsw-blue/10 border-fsw-blue/20 mb-4">
                <Info className="h-4 w-4 text-fsw-blue" />
                <AlertDescription className="text-fsw-blue">
                  All amino acid values are in mg per 100g of food
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.histidine">Histidine (mg)</Label>
                  <Input
                    id="aminoAcids.histidine"
                    name="aminoAcids.histidine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.histidine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.isoleucine">Isoleucine (mg)</Label>
                  <Input
                    id="aminoAcids.isoleucine"
                    name="aminoAcids.isoleucine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.isoleucine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.leucine">Leucine (mg)</Label>
                  <Input
                    id="aminoAcids.leucine"
                    name="aminoAcids.leucine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.leucine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.lysine">Lysine (mg)</Label>
                  <Input
                    id="aminoAcids.lysine"
                    name="aminoAcids.lysine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.lysine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.methionine">Methionine (mg)</Label>
                  <Input
                    id="aminoAcids.methionine"
                    name="aminoAcids.methionine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.methionine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.phenylalanine">Phenylalanine (mg)</Label>
                  <Input
                    id="aminoAcids.phenylalanine"
                    name="aminoAcids.phenylalanine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.phenylalanine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.threonine">Threonine (mg)</Label>
                  <Input
                    id="aminoAcids.threonine"
                    name="aminoAcids.threonine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.threonine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.tryptophan">Tryptophan (mg)</Label>
                  <Input
                    id="aminoAcids.tryptophan"
                    name="aminoAcids.tryptophan"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.tryptophan || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aminoAcids.valine">Valine (mg)</Label>
                  <Input
                    id="aminoAcids.valine"
                    name="aminoAcids.valine"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.aminoAcids?.valine || 0}
                    onChange={handleNumberInputChange}
                    className="border-fsw-blue/20"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t border-fsw-blue/10 pt-4 flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-fsw-yellow hover:bg-fsw-yellow-dark text-black">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
