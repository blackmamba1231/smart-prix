"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { fetchStoreData } from "@/lib/api";

interface storeData{
    id: string,
    name: string,
    url: string,
    logo: string,
    affiliateUrlTemplate: string,
    description: string,
    affiliateNetwork: string,
    affiliateId: string,
    apiKey: string,
    webhookEndpoint: string,
    trackingUrlParameters: string,
    categories: string[],
    commissionRate: string,
    activated: boolean,
    priority: number,
    apiEndpoint: string,
    apiDocumentationLink: string,
    dataFeedUrl: string,
    enableOffersDeals: boolean,
    cashbackRate: string,
    contactPersonName: string,
    email: string,
    phoneNumber: string,
    supportUrl: string,
    storeBannerImage: string,
    seoTitle: string,
    metaDescription: string,
    revenue: number,
    clicks: number,
    conversionRate: number,
  
}

export default function StorePerformance() {
  const [storesData, setStoresData] = useState<storeData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStores = storesData.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 useEffect(()=>{
   async function getStoreData() {
    {
      try {
          const response = await fetchStoreData();
          console.log(response);
          setStoresData(response);
      }catch(error){
        alert(error);
        console.log(error);
      }
    }
   }
   getStoreData();
 },[])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <h1 className="text-2xl font-bold">Partner Store Management</h1>
          <Input
            type="search"
            placeholder="Search stores..."
            className="w-64"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Store Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStores.map((store) => (
            <Card key={store.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{store.name}</CardTitle>
                {store.activated ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </CardHeader>
              <CardContent>
                <img
                  src={store.logo}
                  alt={`${store.name} logo`}
                  className="w-20 h-20 object-cover mb-4"
                />
                <p>{store.description}</p>
                <ul className="mt-4">
                  <li>
                    <strong>Revenue:</strong> ${store.revenue}
                  </li>
                  <li>
                    <strong>Clicks:</strong> {store.clicks}
                  </li>
                  <li>
                    <strong>Conversion Rate:</strong> {store.conversionRate}%
                  </li>
                  <li>
                    <strong>Cashback Rate:</strong> {store.cashbackRate}
                  </li>
                  <li>
                    <strong>Categories:</strong> {store.categories.join(", ")}
                  </li>
                </ul>
              </CardContent>
              <Button variant="secondary" className="mt-4">
                View More
              </Button>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredStores}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clicks & Conversion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredStores}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="conversionRate"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
