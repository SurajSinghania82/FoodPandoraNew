"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface Ingredient {
  id: string
  name: string
  description: string
  isAllergen: boolean
  category: string
}

const AdminIngredientsPage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [newIngredient, setNewIngredient] = useState<Omit<Ingredient, "id">>({
    name: "",
    description: "",
    isAllergen: false,
    category: "Vegetable",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const response = await fetch("/api/ingredients")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setIngredients(data)
    } catch (error: any) {
      console.error("Failed to fetch ingredients:", error)
      toast({
        title: "Error fetching ingredients",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const createIngredient = async () => {
    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredient),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast({
        title: "Ingredient created",
        description: "Ingredient has been created successfully.",
        variant: "default",
      })

      setNewIngredient({
        name: "",
        description: "",
        isAllergen: false,
        category: "Vegetable",
      })
      fetchIngredients()
    } catch (error: any) {
      console.error("Failed to create ingredient:", error)
      toast({
        title: "Error creating ingredient",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const updateIngredient = async (id: string, updatedIngredient: Partial<Ingredient>) => {
    try {
      const response = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIngredient),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast({
        title: "Ingredient updated",
        description: "Ingredient has been updated successfully.",
        variant: "default",
      })
      fetchIngredients()
    } catch (error: any) {
      console.error("Failed to update ingredient:", error)
      toast({
        title: "Error updating ingredient",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const deleteIngredient = async (id: string) => {
    try {
      const response = await fetch(`/api/ingredients/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      toast({
        title: "Ingredient deleted",
        description: "Ingredient has been deleted successfully.",
        variant: "default",
      })
      fetchIngredients()
    } catch (error: any) {
      console.error("Failed to delete ingredient:", error)
      toast({
        title: "Error deleting ingredient",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredient({ ...newIngredient, [e.target.name]: e.target.value })
  }

  const handleAllergenChange = (checked: boolean, id: string) => {
    updateIngredient(id, { isAllergen: checked })
  }

  const handleCategoryChange = (value: string) => {
    setNewIngredient({ ...newIngredient, category: value })
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin - Ingredients</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Ingredient</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={newIngredient.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={newIngredient.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={newIngredient.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetable">Vegetable</SelectItem>
                  <SelectItem value="Fruit">Fruit</SelectItem>
                  <SelectItem value="Grain">Grain</SelectItem>
                  <SelectItem value="Protein">Protein</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Spice">Spice</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={createIngredient}>Create Ingredient</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Allergen</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.description}</TableCell>
                  <TableCell>{ingredient.category}</TableCell>
                  <TableCell>
                    <Switch
                      checked={ingredient.isAllergen}
                      onCheckedChange={(checked) => handleAllergenChange(checked, ingredient.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newName = prompt("Enter new name", ingredient.name)
                          if (newName) {
                            updateIngredient(ingredient.id, { name: newName })
                          }
                        }}
                      >
                        Update Name
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteIngredient(ingredient.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {ingredients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No ingredients found. Please add some!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminIngredientsPage
