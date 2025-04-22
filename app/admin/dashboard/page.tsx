"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, FileSpreadsheet, Home, LogOut, Menu, Settings, Upload, Users, Database } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AdminExcelUpload } from "@/components/admin-excel-upload"
import { AdminUserManagement } from "@/components/admin-user-management"
import { useAuth } from "@/components/auth-provider"
import { ProtectedRoute } from "@/components/protected-route"
import { Logo } from "@/components/logo"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="grid gap-2 text-lg font-medium">
                <Logo className="mb-6" />
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 rounded-lg bg-fsw-blue/10 px-3 py-2 text-fsw-blue"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/dashboard?tab=upload"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-fsw-blue"
                >
                  <Upload className="h-5 w-5" />
                  Excel Upload
                </Link>
                <Link
                  href="/admin/ingredients"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-fsw-blue"
                >
                  <Database className="h-5 w-5" />
                  Ingredients
                </Link>
                <Link
                  href="/admin/dashboard?tab=users"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-fsw-blue"
                >
                  <Users className="h-5 w-5" />
                  User Management
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-fsw-blue"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Logo />
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm hidden md:inline-block">Welcome, {user?.name || "Admin"}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-fsw-yellow text-fsw-yellow hover:bg-fsw-yellow hover:text-black"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden w-64 border-r bg-gray-50 md:block">
            <nav className="grid gap-2 p-4 text-sm">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 rounded-lg bg-fsw-blue/10 px-3 py-2 text-fsw-blue"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/admin/dashboard?tab=upload"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-fsw-blue"
                onClick={() => setActiveTab("upload")}
              >
                <Upload className="h-5 w-5" />
                Excel Upload
              </Link>
              <Link
                href="/admin/ingredients"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-fsw-blue"
              >
                <Database className="h-5 w-5" />
                Ingredients
              </Link>
              <Link
                href="/admin/dashboard?tab=users"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-fsw-blue"
                onClick={() => setActiveTab("users")}
              >
                <Users className="h-5 w-5" />
                User Management
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-fsw-blue"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </aside>
          <main className="flex-1 p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-fsw-blue">Admin Dashboard</h1>
                <TabsList>
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="upload"
                    className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white"
                  >
                    Excel Upload
                  </TabsTrigger>
                  <TabsTrigger value="users" className="data-[state=active]:bg-fsw-blue data-[state=active]:text-white">
                    User Management
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="border-fsw-blue/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Ingredients</CardTitle>
                      <FileSpreadsheet className="h-4 w-4 text-fsw-blue" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,254</div>
                      <p className="text-xs text-gray-500">+24 from last upload</p>
                    </CardContent>
                  </Card>
                  <Card className="border-fsw-yellow/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                      <Users className="h-4 w-4 text-fsw-yellow" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42</div>
                      <p className="text-xs text-gray-500">+3 since last month</p>
                    </CardContent>
                  </Card>
                  <Card className="border-fsw-green/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                      <BarChart3 className="h-4 w-4 text-fsw-green" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,845</div>
                      <p className="text-xs text-gray-500">+12% from last week</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="border-fsw-blue/20">
                  <CardHeader>
                    <CardTitle className="text-fsw-blue">Recent Activity</CardTitle>
                    <CardDescription>Recent uploads and user activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-fsw-blue/10 p-2">
                          <Upload className="h-4 w-4 text-fsw-blue" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Ingredients-Q2-2025.xlsx uploaded</p>
                          <p className="text-xs text-gray-500">2 hours ago by Admin</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-fsw-yellow/10 p-2">
                          <Users className="h-4 w-4 text-fsw-yellow" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">New user added: john.doe@example.com</p>
                          <p className="text-xs text-gray-500">Yesterday by Admin</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-fsw-green/10 p-2">
                          <Settings className="h-4 w-4 text-fsw-green" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Token limit updated for user: sarah@nutrifoods.com</p>
                          <p className="text-xs text-gray-500">2 days ago by Admin</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="upload" className="space-y-4">
                <AdminExcelUpload />
              </TabsContent>
              <TabsContent value="users" className="space-y-4">
                <AdminUserManagement />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
