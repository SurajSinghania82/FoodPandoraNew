import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""
  const role = searchParams.get("role") || ""
  const active = searchParams.get("active") || ""

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
    // Get all users
    let users = await db.users.findAll()

    // Apply filters
    if (search) {
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (role) {
      users = users.filter((user) => user.role.toLowerCase() === role.toLowerCase())
    }

    if (active) {
      const isActive = active === "true"
      users = users.filter((user) => user.active === isActive)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedUsers = users.slice(startIndex, endIndex)

    // Prepare response
    const response = {
      data: paginatedUsers.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tokenLimit: user.tokenLimit,
        tokensUsed: user.tokensUsed,
        active: user.active,
        createdAt: user.createdAt,
      })),
      pagination: {
        total: users.length,
        page,
        limit,
        pages: Math.ceil(users.length / limit),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    // Validate required fields
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and role are required" },
        { status: 400 },
      )
    }

    // Check if email already exists
    const existingUser = await db.users.findByEmail(body.email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = await db.users.create({
      name: body.name,
      email: body.email,
      role: body.role,
      tokenLimit: body.tokenLimit || 10000,
      tokensUsed: 0,
      active: body.active !== undefined ? body.active : true,
    })

    return NextResponse.json({ data: newUser }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
