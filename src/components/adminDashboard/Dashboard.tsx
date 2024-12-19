"use client";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import {
  MessageSquareIcon,
  BellIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { subDays } from "date-fns";
import { fetchUserAnalytics, fetchEarnings, fetchReferrals, updateUserEarnings } from "@/lib/api";
import { jsPDF } from "jspdf";

// Define types for the fetched data
interface UserAnalyticsData {
  date: string;
  clicks: number;
  views: number;
  signups: number;
}

interface EarningsData {
  month: string;
  revenue: number;
  earnings: number;
}

interface ReferralData {
  referrer: string;
  earnings: number;
}

export default function DashboardPage() {
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }  >({
    from: subDays(new Date(), 7),
    to: new Date()
  });

  const [userAnalytics, setUserAnalytics] = useState<UserAnalyticsData[]>([]);
  const [earnings, setEarnings] = useState<EarningsData[]>([]);
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  useEffect(()=>{
    async function updateEarnings(){
     try {
        await updateUserEarnings();
     } catch (error) {
       console.log("unable to update earnings data:" + error);
     }
    }
    updateEarnings();
  },[])

  useEffect(() => {
    async function loadData() {
      try {

        const userAnalyticsData = await  fetchUserAnalytics(date.from.toISOString().split('T')[0], date.to.toISOString().split('T')[0]);
        console.log("frontend:"+userAnalyticsData);
        const formattedUserAnalytics = userAnalyticsData.map((row) => ({
          date: new Date(row.date).toLocaleDateString(),  // Format the date as a string
          clicks: row.clicks || 0,
          views: row.views || 0,
          signups: row.signups || 0,
        }));
        console.log("formatedd user data"+formattedUserAnalytics);
        
        setUserAnalytics(formattedUserAnalytics);
        const earningsData = await fetchEarnings();
        console.log("earningsdata"+ earningsData);
        setEarnings(earningsData);
        const referalData = await fetchReferrals();
        setReferrals(referalData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    loadData();
  }, [date]);

  const exportData = (type: "pdf" | "excel") => {
    const data = JSON.stringify(userAnalytics, null, 2); // Your data
  
    if (type === "pdf") {
      const doc = new jsPDF();
      doc.text(data, 10, 10); // Add the data to the PDF
      doc.save("analytics.pdf"); // Save as PDF
    } else if (type === "excel") {
      const workbook = XLSX.utils.book_new(); // Create a new workbook
      const worksheet = XLSX.utils.json_to_sheet([userAnalytics]); // Convert your JSON to a sheet
      XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics Data");
      XLSX.writeFile(workbook, "analytics.xlsx"); // Trigger file download
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <MessageSquareIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
           
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Overview
          </h2>
          <div className="flex items-center gap-4">
            <Select defaultValue="today">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="year">This year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithRange
              className="bg-white"
              date={date}
              setDate={setDate}
            />
          </div>
        </div>

        {/* User Analytics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userAnalytics}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
                <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                <Line type="monotone" dataKey="signups" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Earnings Reports */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Earnings Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={earnings}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
                <Bar dataKey="earnings" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Referral Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {referrals.map((referrer) => (
                <li key={referrer.referrer} className="flex justify-between">
                  <span>{referrer.referrer}</span>
                  <span>{referrer.earnings}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Export Buttons */}
        <div className="mt-4 flex space-x-4">
          <Button onClick={() => exportData("pdf")}>Export as PDF</Button>
          <Button onClick={() => exportData("excel")}>Export as Excel</Button>
        </div>
      </div>
    </div>
  );
}
