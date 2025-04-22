import type { NextRequest } from "next/server"
import { db } from "@/lib/db"

export async function authenticateRequest(request: NextRequest) {
  // Check for authorization header
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authenticated: false, error: "Unauthorized. Missing or invalid token." }
  }

  // Extract token
  const token = authHeader.split(" ")[1]

  // In a real app, you would verify the JWT token here
  // For demo purposes, we'll check if the token starts with "mock_jwt_token_"
  if (!token.startsWith("mock_jwt_token_")) {
    return { authenticated: false, error: "Unauthorized. Invalid token." }
  }

  // Extract user ID from token (in a real app, you would decode the JWT)
  const userId = Number.parseInt(token.split("_")[2])

  // Find user by ID
  const user = await db.users.findById(userId)
  if (!user) {
    return { authenticated: false, error: "Unauthorized. User not found." }
  }

  // Check if user is active
  if (!user.active) {
    return { authenticated: false, error: "Unauthorized. Account is inactive." }
  }

  return { authenticated: true, user }
}

export async function authenticateAdminRequest(request: NextRequest) {
  const result = await authenticateRequest(request)

  if (!result.authenticated) {
    return result
  }

  // Check if user is an admin
  if (result.user.role !== "Admin") {
    return { authenticated: false, error: "Forbidden. Admin access required." }
  }

  return result
}
