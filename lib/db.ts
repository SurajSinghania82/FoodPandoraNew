// This is a mock database implementation
// In a real application, you would use a real database like PostgreSQL

// User model
export interface User {
  id: number
  name: string
  email: string
  role: "Admin" | "User"
  tokenLimit: number
  tokensUsed: number
  active: boolean
  createdAt: Date
  lastLogin?: string
  password?: string
}

// Ingredient model
export interface Ingredient {
  id: number
  name: string
  description: string
  category: string
  macros: {
    carbohydrates: number
    proteins: number
    fats: number
  }
  aminoAcids?: Record<string, number>
  vitamins?: Record<string, number>
  minerals?: Record<string, number>
  createdAt: Date
  updatedAt: Date
}

// API Token Usage model
export interface TokenUsage {
  id: number
  userId: number
  endpoint: string
  tokensUsed: number
  timestamp: Date
}

// Mock database tables
const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@foodpandora.com",
    password: "admin123", // In a real app, this would be hashed
    role: "Admin",
    tokenLimit: 100000,
    tokensUsed: 0,
    active: true,
    createdAt: new Date("2025-01-01"),
    lastLogin: "2025-03-19T08:30:00",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "User",
    tokenLimit: 10000,
    tokensUsed: 4250,
    active: true,
    createdAt: new Date("2025-01-15"),
    lastLogin: "2025-03-15T10:30:00",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@nutrifoods.com",
    password: "password123", // In a real app, this would be hashed
    role: "User",
    tokenLimit: 25000,
    tokensUsed: 12340,
    active: true,
    createdAt: new Date("2025-02-01"),
    lastLogin: "2025-03-18T14:45:00",
  },
  {
    id: 4,
    name: "Robert Johnson",
    email: "robert@foodsafety.org",
    password: "password123", // In a real app, this would be hashed
    role: "User",
    tokenLimit: 5000,
    tokensUsed: 4980,
    active: true,
    createdAt: new Date("2025-01-20"),
    lastLogin: "2025-03-10T09:20:00",
  },
  {
    id: 5,
    name: "Sarah Williams",
    email: "sarah@nutrifoods.com",
    password: "password123", // In a real app, this would be hashed
    role: "User",
    tokenLimit: 15000,
    tokensUsed: 3200,
    active: false,
    createdAt: new Date("2025-01-05"),
    lastLogin: "2025-02-28T16:10:00",
  },
  {
    id: 6,
    name: "Michael Brown",
    email: "michael.brown@foodtech.com",
    password: "password123", // In a real app, this would be hashed
    role: "Admin",
    tokenLimit: 50000,
    tokensUsed: 22150,
    active: true,
    createdAt: new Date("2024-12-10"),
    lastLogin: "2025-03-19T08:30:00",
  },
]

let ingredients: Ingredient[] = [
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
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
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
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
  },
]

const tokenUsages: TokenUsage[] = [
  {
    id: 1,
    userId: 2,
    endpoint: "/api/ingredients",
    tokensUsed: 1,
    timestamp: new Date("2025-03-01T10:30:00"),
  },
  {
    id: 2,
    userId: 2,
    endpoint: "/api/ingredients/1/nutrition",
    tokensUsed: 5,
    timestamp: new Date("2025-03-01T11:45:00"),
  },
]

// Mock database functions
export const db = {
  // User operations
  users: {
    findAll: async () => users,
    findById: async (id: number) => users.find((user) => user.id === id),
    findByEmail: async (email: string) => users.find((user) => user.email === email),
    create: async (userData: Omit<User, "id" | "createdAt">) => {
      const newUser = {
        ...userData,
        id: users.length + 1,
        createdAt: new Date(),
      }
      users.push(newUser)
      return newUser
    },
    update: async (id: number, userData: Partial<User>) => {
      const index = users.findIndex((user) => user.id === id)
      if (index === -1) return null

      users[index] = { ...users[index], ...userData }
      return users[index]
    },
    delete: async (id: number) => {
      const index = users.findIndex((user) => user.id === id)
      if (index === -1) return false

      users.splice(index, 1)
      return true
    },
  },

  // Ingredient operations
  ingredients: {
    findAll: async (limit?: number, offset?: number) => {
      if (limit && offset) {
        return ingredients.slice(offset, offset + limit)
      }
      return ingredients
    },
    findById: async (id: number) => ingredients.find((ingredient) => ingredient.id === id),
    search: async (query: string) => {
      return ingredients.filter(
        (ingredient) =>
          ingredient.name.toLowerCase().includes(query.toLowerCase()) ||
          ingredient.description.toLowerCase().includes(query.toLowerCase()) ||
          ingredient.category.toLowerCase().includes(query.toLowerCase()),
      )
    },
    create: async (ingredientData: Omit<Ingredient, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date()
      const newIngredient = {
        ...ingredientData,
        id: ingredients.length + 1,
        createdAt: now,
        updatedAt: now,
      }
      ingredients.push(newIngredient)
      return newIngredient
    },
    bulkCreate: async (ingredientsData: Omit<Ingredient, "id" | "createdAt" | "updatedAt">[]) => {
      const now = new Date()
      const newIngredients = ingredientsData.map((data, index) => ({
        ...data,
        id: ingredients.length + index + 1,
        createdAt: now,
        updatedAt: now,
      }))

      ingredients = [...ingredients, ...newIngredients]
      return newIngredients
    },
    update: async (id: number, ingredientData: Partial<Ingredient>) => {
      const index = ingredients.findIndex((ingredient) => ingredient.id === id)
      if (index === -1) return null

      ingredients[index] = {
        ...ingredients[index],
        ...ingredientData,
        updatedAt: new Date(),
      }
      return ingredients[index]
    },
    delete: async (id: number) => {
      const index = ingredients.findIndex((ingredient) => ingredient.id === id)
      if (index === -1) return false

      ingredients.splice(index, 1)
      return true
    },
  },

  // Token usage operations
  tokenUsage: {
    recordUsage: async (usage: Omit<TokenUsage, "id" | "timestamp">) => {
      const newUsage = {
        ...usage,
        id: tokenUsages.length + 1,
        timestamp: new Date(),
      }
      tokenUsages.push(newUsage)

      // Update user's token usage
      const userIndex = users.findIndex((user) => user.id === usage.userId)
      if (userIndex !== -1) {
        users[userIndex].tokensUsed += usage.tokensUsed
      }

      return newUsage
    },
    getUserUsage: async (userId: number) => {
      return tokenUsages.filter((usage) => usage.userId === userId)
    },
    getTotalUserUsage: async (userId: number) => {
      return tokenUsages
        .filter((usage) => usage.userId === userId)
        .reduce((total, usage) => total + usage.tokensUsed, 0)
    },
  },
}
