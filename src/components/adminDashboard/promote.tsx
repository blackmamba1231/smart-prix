"use client"

import React, { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FlaggedContent {
  id: number
  user: string
  content: string
  type: "Review" | "Comment" | "Reply"
  flaggedBy: number
  flaggedReason: string
  timestamp: string
  status: "Pending" | "Approved" | "Rejected"
}

const initialFlaggedContent: FlaggedContent[] = [
  { id: 1, user: "John Doe", content: "This product is trash!", type: "Review", flaggedBy: 7, flaggedReason: "Inappropriate language", timestamp: "2024-12-10", status: "Pending" },
  { id: 2, user: "Jane Smith", content: "Spam link: http://example.com", type: "Comment", flaggedBy: 12, flaggedReason: "Spam", timestamp: "2024-12-09", status: "Pending" },
  { id: 3, user: "Alice Brown", content: "Reply to user XYZ", type: "Reply", flaggedBy: 5, flaggedReason: "Irrelevant content", timestamp: "2024-12-08", status: "Pending" },
]

export default function Promote() {
  const [searchQuery, setSearchQuery] = useState("")
  const [flaggedContent, setFlaggedContent] = useState(initialFlaggedContent)
  const [sortKey, setSortKey] = useState<keyof FlaggedContent>("timestamp")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    const filteredContent = initialFlaggedContent.filter((item) =>
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flaggedReason.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedContent = [...filteredContent].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1
      return 0
    })

    setFlaggedContent(sortedContent)
  }, [searchQuery, sortKey, sortOrder])

  const handleAction = (id: number, action: "Approve" | "Reject", reason?: string) => {
    setFlaggedContent((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: action === "Approve" ? "Approved" : "Rejected" } : item
      )
    )
    console.log(`Content ${action === "Approve" ? "approved" : "rejected"} for ID: ${id}, Reason: ${reason || "N/A"}`)
  }

  const handleSort = (key: keyof FlaggedContent) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Moderation</h1>
          <Input
            type="search"
            placeholder="Search flagged content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Flagged Content Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("user")}>
                        User
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("flaggedBy")}>
                        Flagged By
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("timestamp")}>
                        Timestamp
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.user}</TableCell>
                      <TableCell>{item.content}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell className="text-center">{item.flaggedBy}</TableCell>
                      <TableCell>{item.flaggedReason}</TableCell>
                      <TableCell>{item.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Pending" ? "secondary" : item.status === "Approved" ? "default" : "destructive"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="bg-gradient-to-r from-green-400 to-green-700">Actions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleAction(item.id, "Approve")}>Approve</DropdownMenuItem>
                            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleAction(item.id, "Reject")}>Reject</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
