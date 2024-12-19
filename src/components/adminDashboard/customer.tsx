"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Customer {
  id: number;
  name: string;
  email: string;
  totalSpent: number;
  orders: number;
  status: "Active" | "Inactive";
  lastOrder: string;
  comments: string[];
  reviews: string[];
  referrals: number;
}

const allCustomers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    totalSpent: 1250,
    orders: 5,
    status: "Active",
    lastOrder: "2023-06-01",
    comments: ["Great service!", "Will recommend."],
    reviews: ["Product A review", "Product B review"],
    referrals: 3,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    totalSpent: 750,
    orders: 3,
    status: "Active",
    lastOrder: "2023-05-28",
    comments: ["Quick delivery.", "Satisfied customer."],
    reviews: ["Product C review"],
    referrals: 2,
  },
  // Add more customers as needed
];


export default function Customer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState(allCustomers);
  const sortKey = "lastOrder";
  const sortOrder= "asc" 

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const filteredCustomers = allCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setCustomers(sortedCustomers);
  }, [searchQuery, sortKey, sortOrder]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleEditCustomer = (customer: Customer) => {
    console.log("Editing customer:", customer);
    // Implement edit functionality
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id));
  };

  const renderCustomerDetails = () => {
    if (!selectedCustomer) return null;

    return (
      <div className="p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-xl font-bold">User Details</h2>
        <p><strong>Name:</strong> {selectedCustomer.name}</p>
        <p><strong>Email:</strong> {selectedCustomer.email}</p>
        <p><strong>Status:</strong> {selectedCustomer.status}</p>
        <p><strong>Total Spent:</strong> ${selectedCustomer.totalSpent}</p>
        <p><strong>Orders:</strong> {selectedCustomer.orders}</p>
        <p><strong>Last Order:</strong> {selectedCustomer.lastOrder}</p>
        <h3 className="mt-4 font-bold">Activity Logs</h3>
        <p><strong>Comments:</strong> {selectedCustomer.comments.join(", ")}</p>
        <p><strong>Reviews:</strong> {selectedCustomer.reviews.join(", ")}</p>
        <p><strong>Referrals:</strong> {selectedCustomer.referrals}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button  className="bg-gradient-to-r from-green-400 to-green-700">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleViewDetails(customer)}>View details</DropdownMenuItem>
                            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleEditCustomer(customer)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleDeleteCustomer(customer.id)}>Delete</DropdownMenuItem>
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

        {selectedCustomer && renderCustomerDetails()}
      </div>
    </div>
  );
}
