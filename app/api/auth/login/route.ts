import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Missing required fields: email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = await db.users.findByEmail(body.email)
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if user is active
    if (!user.active) {
      return NextResponse.json({ error: "Account is inactive. Please contact support." }, { status: 403 })
    }

    // In a real app, you would verify the password here
    // For demo purposes, we'll just accept any password
    // const isPasswordValid = await bcrypt.compare(body.password, user.password)
    // if (!isPasswordValid) {
    //   return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    // }

    // Update last login time
    await db.users.update(user.id, {
      lastLogin: new Date().toISOString(),
    })

    // In a real app, you would generate a JWT token here
    // const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })

    // For demo purposes, we'll just return a mock token
    const token = "mock_jwt_token_" + user.id + "_" + Date.now()

    // Remove sensitive data before returning
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      data: {
        user: userWithoutPassword,
        token,
      },
    })
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
