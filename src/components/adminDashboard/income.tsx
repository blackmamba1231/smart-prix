"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, format } from "date-fns";

const mockLogs = [
  { id: 1, admin: "John Doe", action: "Edited product details", timestamp: "2024-12-10 10:30:00" },
  { id: 2, admin: "Jane Smith", action: "Approved refund request", timestamp: "2024-12-09 15:45:00" },
  { id: 3, admin: "Alice Johnson", action: "Deleted user account", timestamp: "2024-12-08 12:20:00" },
  { id: 4, admin: "Michael Brown", action: "Updated site settings", timestamp: "2024-12-07 14:00:00" },
  { id: 5, admin: "Sarah Wilson", action: "Created a new product", timestamp: "2024-12-06 09:15:00" },
];

export default function Income() {
  const [date, setDate] = useState({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [filteredLogs, setFilteredLogs] = useState(mockLogs);

  useEffect(() => {
    const filtered = mockLogs.filter((log) => {
      const matchesSearch = log.admin.toLowerCase().includes(searchQuery.toLowerCase()) || 
        log.action.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesActionFilter = actionFilter === "all" || log.action.toLowerCase().includes(actionFilter.toLowerCase());
      const matchesDateRange =
        new Date(log.timestamp) >= new Date(date.from) && new Date(log.timestamp) <= new Date(date.to);

      return matchesSearch && matchesActionFilter && matchesDateRange;
    });

    setFilteredLogs(filtered);
  }, [searchQuery, actionFilter, date]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Logs</h1>
          <Input
            type="search"
            placeholder="Search logs..."
            className="w-64"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <DatePickerWithRange className="bg-white" date={date} setDate={setDate} />
          <Select defaultValue="all" onValueChange={(value) => setActionFilter(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem className="hover:cursor-pointer hover:bg-gray-300" value="all">All Actions</SelectItem>
              <SelectItem className="hover:cursor-pointer hover:bg-gray-300" value="edit">Edit</SelectItem>
              <SelectItem className="hover:cursor-pointer hover:bg-gray-300" value="approve">Approve</SelectItem>
              <SelectItem className="hover:cursor-pointer hover:bg-gray-300" value="delete">Delete</SelectItem>
              <SelectItem className="hover:cursor-pointer hover:bg-gray-300" value="update">Update</SelectItem>
              <SelectItem className="hover:cursor-pointer hover:bg-gray-300" value="create">Create</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Action Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredLogs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Admin</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.admin}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">No logs found for the selected filters.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
