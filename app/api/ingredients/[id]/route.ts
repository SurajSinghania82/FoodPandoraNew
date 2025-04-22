import { type NextRequest, NextResponse } from "next/server"

// Mock data for ingredients
const mockIngredients = [
  {
    id: 1,
    name: "Sugar",
    description: "Refined white sugar",
    category: "Sweeteners",
    macros: {
      carbohydrates: 99.8,
      proteins: 0,
      fats: 0,
    },
    aminoAcids: {
      leucine: 0,
      isoleucine: 0,
      valine: 0,
      lysine: 0,
      methionine: 0,
      phenylalanine: 0,
      threonine: 0,
      tryptophan: 0,
      histidine: 0,
    },
  },
  {
    id: 2,
    name: "Wheat Flour",
    description: "Refined wheat flour, all-purpose",
    category: "Grains",
    macros: {
      carbohydrates: 76.3,
      proteins: 10.3,
      fats: 1.4,
    },
    aminoAcids: {
      leucine: 0.78,
      isoleucine: 0.42,
      valine: 0.44,
      lysine: 0.25,
      methionine: 0.17,
      phenylalanine: 0.57,
      threonine: 0.29,
      tryptophan: 0.12,
      histidine: 0.21,
    },
  },
  {
    id: 3,
    name: "Olive Oil",
    description: "Extra virgin olive oil",
    category: "Oils",
    macros: {
      carbohydrates: 0,
      proteins: 0,
      fats: 100,
    },
    aminoAcids: {
      leucine: 0,
      isoleucine: 0,
      valine: 0,
      lysine: 0,
      methionine: 0,
      phenylalanine: 0,
      threonine: 0,
      tryptophan: 0,
      histidine: 0,
    },
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Check for authorization header
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized. Missing or invalid API key." }, { status: 401 })
  }

  // Extract API key
  const apiKey = authHeader.split(" ")[1]

  // In a real app, validate the API key and check token balance
  // For demo purposes, we'll assume the API key is valid

  // Find the ingredient by ID
  const id = Number.parseInt(params.id)
  const ingredient = mockIngredients.find((item) => item.id === id)

  if (!ingredient) {
    return NextResponse.json({ error: "Ingredient not found" }, { status: 404 })
  }

  // Prepare response
  const response = {
    data: ingredient,
    tokenUsage: {
      cost: 1,
      remaining: 8539, // Mock remaining tokens
    },
  }

  return NextResponse.json(response)
}
