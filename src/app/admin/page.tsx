"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Users,
  ShoppingCart,
  Megaphone,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import DashboardPage from "@/components/adminDashboard/Dashboard";
import Insights from "@/components/adminDashboard/insights";
import Transaction from "@/components/adminDashboard/transaction";
import Customer from "@/components/adminDashboard/customer";
import Shop from "@/components/adminDashboard/shop";
import Income from "@/components/adminDashboard/income";
import Promote from "@/components/adminDashboard/promote";
import SettingsPage from "@/components/adminDashboard/settings";
import Signout from "@/components/adminDashboard/signout";
import Help from "@/components/adminDashboard/help";

const Dashboard = () => {
  const [activePage, setActivePage] = useState<string>("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "insights":
        return <Insights />;
      case "transaction":
        return <Transaction />;
      case "customer":
        return <Customer />;
      case "shop":
        return <Shop />;
      case "income":
        return <Income />;
      case "promote":
        return <Promote />;
      case "settings":
        return <SettingsPage />;
      case "signout":
        return <Signout />;
      case "help":
        return <Help />;
      default:
        return <DashboardPage />;
    }
  };

  const buttonClass =
    "flex items-center space-x-4 px-8 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-200";

  const activeButtonClass =
    "flex items-center space-x-4 px-8 py-2 bg-gradient-to-r from-green-400 to-green-700 text-white font-semibold rounded-lg shadow-md";

  return (
    <div className="flex h-full w-full bg-gray-10 columns-4">
      {/* Sidebar */}
      <div className="fixed top-2 left-0 h-full w-64 flex flex-col items-center col-span-1 space-y-3  bg-white drop-shadow-lg py-6">
        <header className='text-4xl font-semibold text-lime-600 text-center5 py-10 px-10' >Comparify</header>

        {/* Navigation Buttons */}
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActivePage("dashboard")}
            className={activePage === "dashboard" ? activeButtonClass : buttonClass}
          >
            <LayoutDashboard className="w-5 h-5" style={{ fill: activePage === "dashboard" ? "currentColor" : "none" }} />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActivePage("insights")}
            className={activePage === "insights" ? activeButtonClass : buttonClass}
          >
            <BarChart3 className="w-5 h-5" style={{ fill: activePage === "insights" ? "currentColor" : "none" }}/>
            <span>Insight</span>
          </button>
          <button
            onClick={() => setActivePage("transaction")}
            className={activePage === "transaction" ? activeButtonClass : buttonClass}
          >
            <CreditCard className="w-5 h-5" />
            <span>Transaction</span>
          </button>
          <button
            onClick={() => setActivePage("customer")}
            className={activePage === "customer" ? activeButtonClass : buttonClass}
          >
            <Users className="w-5 h-5" />
            <span>Customer</span>
          </button>
          <button
            onClick={() => setActivePage("shop")}
            className={activePage === "shop" ? activeButtonClass : buttonClass}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Shop</span>
          </button>
          <button
            onClick={() => setActivePage("income")}
            className={activePage === "income" ? activeButtonClass : buttonClass}
          >
            <ClipboardDocumentListIcon className="w-5 h-5" />
            <span>Logs</span>
          </button>
          <button
            onClick={() => setActivePage("promote")}
            className={activePage === "promote" ? activeButtonClass : buttonClass}
          >
            <Megaphone className="w-5 h-5" />
            <span>Moderation</span>
          </button>
          <button
            onClick={() => setActivePage("settings")}
            className={activePage === "settings" ? activeButtonClass : buttonClass}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Bottom Section */}
        <div className="flex-1 space-y-2">
          <div className="border-t border-gray-300"></div>
          <button
            onClick={() => setActivePage("signout")}
            className={activePage === "signout" ? activeButtonClass : buttonClass}
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
          <button
            onClick={() => setActivePage("help")}
            className={activePage === "help" ? activeButtonClass : buttonClass}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="ml-64 col-span-3 w-full">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
