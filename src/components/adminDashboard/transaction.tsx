"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon, MessageSquareIcon, BellIcon, ArrowUpDown} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CashbackRequest {
  id: number;
  user: string;
  store: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected" | "Disputed";
  date: string;
  comments?: string;
}

const initialRequests: CashbackRequest[] = [
  { id: 1, user: "John Doe", store: "Amazon", amount: 50, status: "Pending", date: "2023-06-01" },
  { id: 2, user: "Jane Smith", store: "eBay", amount: 20, status: "Approved", date: "2023-06-02" },
  { id: 3, user: "Alice Brown", store: "Walmart", amount: 30, status: "Disputed", date: "2023-06-03", comments: "User claims incorrect amount." },
];

type SortKey = "user" | "store" | "amount" | "status" | "date";

export default function EarningsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState(initialRequests);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const filteredRequests = initialRequests.filter(
      (request) =>
        request.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.amount.toString().includes(searchQuery) ||
        request.date.includes(searchQuery)
    );

    const sortedRequests = [...filteredRequests].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setRequests(sortedRequests);
  }, [searchQuery, sortKey, sortOrder]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const updateStatus = (id: number, status: CashbackRequest["status"], comments?: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status, comments } : request
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Earnings Management</h1>
            <div className="relative">
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <MessageSquareIcon className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Cashback Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      <Button variant="ghost" onClick={() => handleSort("user")}>
                        User
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("amount")}>
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("status")}>
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">
                      <Button variant="ghost" onClick={() => handleSort("date")}>
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.user}</TableCell>
                      <TableCell>{request.store}</TableCell>
                      <TableCell>${request.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "Approved"
                              ? "default"
                              : request.status === "Pending"
                              ? "secondary"
                              : request.status === "Rejected"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{request.date}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              Resolve
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Resolve Request</DialogTitle>
                            </DialogHeader>
                            <div>
                              <Button
                                onClick={() => updateStatus(request.id, "Approved")}
                                className="mr-2"
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() => updateStatus(request.id, "Rejected")}
                                variant="destructive"
                              >
                                Reject
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
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
  );
}
