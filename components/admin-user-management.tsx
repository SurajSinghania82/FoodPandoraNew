"use client"

import { useState } from "react"
import { MoreHorizontal, Plus, Search, UserPlus, Edit, Trash, Shield, ShieldAlert, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    tokenLimit: 10000,
    tokensUsed: 4250,
    active: true,
    lastLogin: "2025-03-15T10:30:00",
    createdAt: "2025-01-15T08:20:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@nutrifoods.com",
    role: "User",
    tokenLimit: 25000,
    tokensUsed: 12340,
    active: true,
    lastLogin: "2025-03-18T14:45:00",
    createdAt: "2025-02-01T11:15:00",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@foodsafety.org",
    role: "User",
    tokenLimit: 5000,
    tokensUsed: 4980,
    active: true,
    lastLogin: "2025-03-10T09:20:00",
    createdAt: "2025-01-20T15:30:00",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@nutrifoods.com",
    role: "User",
    tokenLimit: 15000,
    tokensUsed: 3200,
    active: false,
    lastLogin: "2025-02-28T16:10:00",
    createdAt: "2025-01-05T10:45:00",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@foodtech.com",
    role: "Admin",
    tokenLimit: 50000,
    tokensUsed: 22150,
    active: true,
    lastLogin: "2025-03-19T08:30:00",
    createdAt: "2024-12-10T09:00:00",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@healthfoods.net",
    role: "User",
    tokenLimit: 8000,
    tokensUsed: 7200,
    active: true,
    lastLogin: "2025-03-17T11:25:00",
    createdAt: "2025-02-15T14:20:00",
  },
]

export function AdminUserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [isEditTokensDialogOpen, setIsEditTokensDialogOpen] = useState(false)
  const [isInviteUserDialogOpen, setIsInviteUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)

  // Form states for adding new user
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState("User")
  const [newUserTokens, setNewUserTokens] = useState("10000")

  // Form states for editing user
  const [editUserName, setEditUserName] = useState("")
  const [editUserEmail, setEditUserEmail] = useState("")
  const [editUserRole, setEditUserRole] = useState("")
  const [editUserActive, setEditUserActive] = useState(true)

  // Form state for editing tokens
  const [editTokenAmount, setEditTokenAmount] = useState("")
  const [resetUsage, setResetUsage] = useState(false)

  // Form state for inviting users
  const [inviteEmails, setInviteEmails] = useState("")
  const [inviteRole, setInviteRole] = useState("User")
  const [inviteTokens, setInviteTokens] = useState("10000")
  const [inviteMessage, setInviteMessage] = useState("")

  const filteredUsers = users.filter((user) => {
    // Filter by search query
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && user.active
    if (activeTab === "inactive") return matchesSearch && !user.active
    if (activeTab === "admin") return matchesSearch && user.role === "Admin"
    return matchesSearch
  })

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole as "Admin" | "User",
      tokenLimit: Number.parseInt(newUserTokens),
      tokensUsed: 0,
      active: true,
      lastLogin: "",
      createdAt: new Date().toISOString(),
    }

    setUsers([...users, newUser])
    setIsAddUserDialogOpen(false)

    // Reset form
    setNewUserName("")
    setNewUserEmail("")
    setNewUserRole("User")
    setNewUserTokens("10000")
  }

  const handleEditUser = () => {
    if (!selectedUser) return

    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          name: editUserName,
          email: editUserEmail,
          role: editUserRole as "Admin" | "User",
          active: editUserActive,
        }
      }
      return user
    })

    setUsers(updatedUsers)
    setIsEditUserDialogOpen(false)
    setSelectedUser(null)
  }

  const handleEditTokens = () => {
    if (!selectedUser || !editTokenAmount) return

    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          tokenLimit: Number.parseInt(editTokenAmount),
          tokensUsed: resetUsage ? 0 : user.tokensUsed,
        }
      }
      return user
    })

    setUsers(updatedUsers)
    setIsEditTokensDialogOpen(false)
    setSelectedUser(null)
    setEditTokenAmount("")
    setResetUsage(false)
  }

  const handleInviteUsers = () => {
    // In a real app, this would send invitation emails
    // For demo purposes, we'll just close the dialog
    setIsInviteUserDialogOpen(false)
    setInviteEmails("")
    setInviteRole("User")
    setInviteTokens("10000")
    setInviteMessage("")
  }

  const handleToggleUserStatus = (userId: number) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          active: !user.active,
        }
      }
      return user
    })

    setUsers(updatedUsers)
  }

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their API token limits</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Dialog open={isInviteUserDialogOpen} onOpenChange={setIsInviteUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Invite Users
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Invite Users</DialogTitle>
                    <DialogDescription>Send invitation emails to multiple users at once</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="emails">Email Addresses</Label>
                      <Textarea
                        id="emails"
                        placeholder="Enter email addresses, one per line"
                        value={inviteEmails}
                        onChange={(e) => setInviteEmails(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-gray-500">Enter one email address per line</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="invite-role">Role</Label>
                        <Select value={inviteRole} onValueChange={setInviteRole}>
                          <SelectTrigger id="invite-role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invite-tokens">Token Limit</Label>
                        <Input
                          id="invite-tokens"
                          type="number"
                          placeholder="10000"
                          value={inviteTokens}
                          onChange={(e) => setInviteTokens(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Add a personal message to the invitation email"
                        value={inviteMessage}
                        onChange={(e) => setInviteMessage(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsInviteUserDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleInviteUsers}>Send Invitations</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-red-500 hover:bg-red-600">
                    <UserPlus className="h-4 w-4" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account with API access</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={newUserRole} onValueChange={setNewUserRole}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tokens">Token Limit</Label>
                      <Input
                        id="tokens"
                        type="number"
                        placeholder="10000"
                        value={newUserTokens}
                        onChange={(e) => setNewUserTokens(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser} className="bg-red-500 hover:bg-red-600">
                      Add User
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  <TabsTrigger value="admin">Admins</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Token Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-red-100 text-red-800">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Admin" ? "default" : "outline"}>
                            {user.role === "Admin" ? (
                              <div className="flex items-center gap-1">
                                <ShieldAlert className="h-3 w-3" />
                                <span>Admin</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                <span>User</span>
                              </div>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="text-sm">
                              {user.tokensUsed.toLocaleString()} / {user.tokenLimit.toLocaleString()}
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className={`h-full ${
                                  (user.tokensUsed / user.tokenLimit) > 0.8
                                    ? "bg-red-500"
                                    : user.tokensUsed / user.tokenLimit > 0.5
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${Math.min((user.tokensUsed / user.tokenLimit) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${user.active ? "bg-green-500" : "bg-gray-300"}`} />
                            <span>{user.active ? "Active" : "Inactive"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(user.lastLogin)}</div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setEditUserName(user.name)
                                  setEditUserEmail(user.email)
                                  setEditUserRole(user.role)
                                  setEditUserActive(user.active)
                                  setIsEditUserDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setEditTokenAmount(user.tokenLimit.toString())
                                  setIsEditTokensDialogOpen(true)
                                }}
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Edit Token Limit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                                {user.active ? (
                                  <>
                                    <Trash className="h-4 w-4 mr-2 text-red-500" />
                                    <span className="text-red-500">Deactivate User</span>
                                  </>
                                ) : (
                                  <>
                                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                                    <span className="text-green-500">Activate User</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteUser(user.id)}>
                                <Trash className="h-4 w-4 mr-2 text-red-500" />
                                <span className="text-red-500">Delete User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardFooter>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" value={editUserName} onChange={(e) => setEditUserName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editUserEmail}
                onChange={(e) => setEditUserEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={editUserRole} onValueChange={setEditUserRole}>
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="edit-active" checked={editUserActive} onCheckedChange={setEditUserActive} />
              <Label htmlFor="edit-active">User is active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser} className="bg-red-500 hover:bg-red-600">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tokens Dialog */}
      <Dialog open={isEditTokensDialogOpen} onOpenChange={setIsEditTokensDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Token Limit</DialogTitle>
            <DialogDescription>Update the API token limit for {selectedUser?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="token-limit">Token Limit</Label>
              <Input
                id="token-limit"
                type="number"
                value={editTokenAmount}
                onChange={(e) => setEditTokenAmount(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="reset-usage" checked={resetUsage} onCheckedChange={setResetUsage} />
              <Label htmlFor="reset-usage">Reset current token usage</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTokensDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTokens} className="bg-red-500 hover:bg-red-600">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
