import { type NextRequest, NextResponse } from "next/server"

// Mock detailed nutrition data
const mockNutritionData = [
  {
    id: 1,
    name: "Sugar",
    macros: {
      carbohydrates: 99.8,
      proteins: 0,
      fats: 0,
      fiber: 0,
      sugar: 99.8,
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
    vitamins: {
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 0,
      vitaminK: 0,
      thiamin: 0,
      riboflavin: 0,
      niacin: 0,
      vitaminB6: 0,
      folate: 0,
      vitaminB12: 0,
      pantothenicAcid: 0,
      biotin: 0,
      choline: 0,
    },
    minerals: {
      calcium: 0,
      iron: 0.01,
      magnesium: 0,
      phosphorus: 0,
      potassium: 2,
      sodium: 1,
      zinc: 0,
      copper: 0,
      manganese: 0,
      selenium: 0,
      fluoride: 0,
    },
  },
  {
    id: 2,
    name: "Wheat Flour",
    macros: {
      carbohydrates: 76.3,
      proteins: 10.3,
      fats: 1.4,
      fiber: 2.7,
      sugar: 0.3,
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
    vitamins: {
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 0.06,
      vitaminK: 0.4,
      thiamin: 0.12,
      riboflavin: 0.04,
      niacin: 1.25,
      vitaminB6: 0.04,
      folate: 26,
      vitaminB12: 0,
      pantothenicAcid: 0.25,
      biotin: 0.4,
      choline: 11.2,
    },
    minerals: {
      calcium: 15,
      iron: 1.17,
      magnesium: 22,
      phosphorus: 108,
      potassium: 107,
      sodium: 2,
      zinc: 0.7,
      copper: 0.14,
      manganese: 0.68,
      selenium: 33.9,
      fluoride: 0,
    },
  },
  {
    id: 3,
    name: "Olive Oil",
    macros: {
      carbohydrates: 0,
      proteins: 0,
      fats: 100,
      fiber: 0,
      sugar: 0,
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
    vitamins: {
      vitaminA: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminE: 14.35,
      vitaminK: 60.2,
      thiamin: 0,
      riboflavin: 0,
      niacin: 0,
      vitaminB6: 0,
      folate: 0,
      vitaminB12: 0,
      pantothenicAcid: 0,
      biotin: 0,
      choline: 0.3,
    },
    minerals: {
      calcium: 1,
      iron: 0.56,
      magnesium: 0,
      phosphorus: 0,
      potassium: 1,
      sodium: 2,
      zinc: 0,
      copper: 0,
      manganese: 0,
      selenium: 0,
      fluoride: 0,
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

  // Find the nutrition data by ingredient ID
  const id = Number.parseInt(params.id)
  const nutritionData = mockNutritionData.find((item) => item.id === id)

  if (!nutritionData) {
    return NextResponse.json({ error: "Nutrition data not found for this ingredient" }, { status: 404 })
  }

  // Prepare response
  const response = {
    data: nutritionData,
    tokenUsage: {
      cost: 5, // Higher token cost for detailed nutrition data
      remaining: 8535, // Mock remaining tokens
    },
  }

  return NextResponse.json(response)
}
