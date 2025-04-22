import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Check for authorization header
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized. Missing or invalid API key." }, { status: 401 })
  }

  // Extract API key
  const apiKey = authHeader.split(" ")[1]

  // In a real app, validate the API key and check if user has admin permissions
  // For demo purposes, we'll assume the API key is valid and user is admin

  try {
    // Get user by ID
    const id = Number.parseInt(params.id)
    const user = await db.users.findById(id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Prepare response
    const response = {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tokenLimit: user.tokenLimit,
        tokensUsed: user.tokensUsed,
        active: user.active,
        createdAt: user.createdAt,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Check for authorization header
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized. Missing or invalid API key." }, { status: 401 })
  }

  // Extract API key
  const apiKey = authHeader.split(" ")[1]

  // In a real app, validate the API key and check if user has admin permissions
  // For demo purposes, we'll assume the API key is valid and user is admin

  try {
    // Parse request body
    const body = await request.json()

    // Get user by ID
    const id = Number.parseInt(params.id)
    const user = await db.users.findById(id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if email already exists (if email is being updated)
    if (body.email && body.email !== user.email) {
      const existingUser = await db.users.findByEmail(body.email)
      if (existingUser) {
        return NextResponse.json({ error: "Email already exists" }, { status: 409 })
      }
    }

    // Update user
    const updatedUser = await db.users.update(id, {
      name: body.name !== undefined ? body.name : user.name,
      email: body.email !== undefined ? body.email : user.email,
      role: body.role !== undefined ? body.role : user.role,
      tokenLimit: body.tokenLimit !== undefined ? body.tokenLimit : user.tokenLimit,
      tokensUsed: body.tokensUsed !== undefined ? body.tokensUsed : user.tokensUsed,
      active: body.active !== undefined ? body.active : user.active,
    })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }

    return NextResponse.json({ data: updatedUser })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Check for authorization header
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized. Missing or invalid API key." }, { status: 401 })
  }

  // Extract API key
  const apiKey = authHeader.split(" ")[1]

  // In a real app, validate the API key and check if user has admin permissions
  // For demo purposes, we'll assume the API key is valid and user is admin

  try {
    // Delete user by ID
    const id = Number.parseInt(params.id)
    const success = await db.users.delete(id)

    if (!success) {
      return NextResponse.json({ error: "User not found or could not be deleted" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
