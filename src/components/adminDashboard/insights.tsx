import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { CreateStoreDialog } from "@/components/stores/create-store-dialog";
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
  CartesianGrid 
} from "recharts";
import { fetchStoreData } from "@/lib/api";
import { 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Users,
  DollarSign,
  PercentIcon,
  Download
} from "lucide-react";
import { storeData } from "@/types/store";

export default function StoreInsights() {
  const [storesData, setStoresData] = useState<storeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<{ store: string; issue: string }[]>([]);
  type store = {
    name: string;
    conversionRate: number;
    clicks: number;
    revenue: number;
  };
  useEffect(() => {
    async function getStoreData() {
      try {
        const response = await fetchStoreData();
        setStoresData(response);
        const newAlerts = response
          .filter((store: store) => store.conversionRate < 2 || store.clicks < 100)
          .map((store: store) => ({
            store: store.name,
            issue: store.conversionRate < 2 ? 'Low conversion rate' : 'Low traffic'
          }));
        setAlerts(newAlerts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getStoreData();
  }, []);

  const totalRevenue = storesData.reduce((sum, store) => sum + store.revenue, 0);
  const averageConversion = storesData.reduce((sum, store) => sum + store.conversionRate, 0) / storesData.length;
  const totalClicks = storesData.reduce((sum, store) => sum + store.clicks, 0);

  const columns = [
    {
      accessorKey: "name",
      header: "Store Name",
    },
    {
      accessorKey: "clicks",
      header: "Traffic",
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }: { row: { original: store } }) => `$${row.original.revenue.toLocaleString()}`,
    },
    {
      accessorKey: "conversionRate",
      header: "Conversion Rate",
      cell: ({ row }: { row: { original: store } }) => `${row.original.conversionRate}%`,
    },
  ];

  const handleExportData = () => {
    const csvContent = [
      ["Store Name", "Traffic", "Revenue", "Conversion Rate"],
      ...storesData.map(store => [
        store.name,
        store.clicks,
        store.revenue,
        store.conversionRate
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'store-insights.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
       <div className="flex items-center justify-between">
       <h1 className="text-3xl font-bold mb-4">Store Insights Dashboard</h1>
       <CreateStoreDialog />
       </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Traffic</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
              <PercentIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageConversion.toFixed(2)}%</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-bold mb-4">Performance Alerts</h2>
          {alerts.map((alert, index) => (
            <Alert key={index} variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Performance Issue</AlertTitle>
              <AlertDescription>
                {alert.store}: {alert.issue}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={storesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic vs Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={storesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="clicks"
                  stroke="#82ca9d"
                  name="Traffic"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversionRate"
                  stroke="#ffc658"
                  name="Conversion Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Store Performance Details</h2>
          <Button onClick={handleExportData} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
        <DataTable columns={columns} data={storesData} />
      </div>
    </div>
  );
}