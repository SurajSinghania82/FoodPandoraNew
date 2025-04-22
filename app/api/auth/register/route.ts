import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and password are required" },
        { status: 400 },
      )
    }

    // Check if email already exists
    const existingUser = await db.users.findByEmail(body.email)
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    // In a real app, you would hash the password here
    // const hashedPassword = await bcrypt.hash(body.password, 10)

    // Create new user
    const newUser = await db.users.create({
      name: body.name,
      email: body.email,
      password: body.password, // In a real app, this would be the hashed password
      role: "User", // Default role for self-registration
      tokenLimit: 5000, // Default token limit for new users
      tokensUsed: 0,
      active: true,
      lastLogin: new Date().toISOString(),
    })

    // Remove sensitive data before returning
    const { password, ...userWithoutPassword } = newUser

    return NextResponse.json({ data: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
