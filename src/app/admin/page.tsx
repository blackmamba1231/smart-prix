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
  Clipboard,
  Menu,
  X,
} from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
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
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

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
    "flex items-center space-x-4 px-8 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition duration-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100";

  const activeButtonClass =
    "flex items-center space-x-4 px-8 py-2 bg-gradient-to-r from-green-400 to-green-700 text-white font-semibold rounded-lg shadow-md";

  return (
    <ThemeProvider>
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <div className="flex h-full w-full bg-gray-10">
          {/* Sidebar */}
          {isSidebarVisible && (
            <div className="fixed top-0 left-0 h-full w-64 flex flex-col items-center bg-white dark:bg-gray-800 drop-shadow-lg py-6 transition">
              {/* Toggle Button at Top Left */}
              <button
                className="absolute top-4 left-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-200" />
              </button>

              <header className="mt-14 text-4xl font-semibold text-lime-600 text-center py-10 px-10">
                Comparify
              </header>

              {/* Navigation Buttons */}
              <nav className="flex-1 space-y-2">
                <button
                  onClick={() => setActivePage("dashboard")}
                  className={
                    activePage === "dashboard"
                      ? activeButtonClass
                      : buttonClass
                  }
                >
                  <LayoutDashboard
                    className="w-5 h-5"
                    style={{
                      fill:
                        activePage === "dashboard" ? "currentColor" : "none",
                    }}
                  />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActivePage("insights")}
                  className={
                    activePage === "insights"
                      ? activeButtonClass
                      : buttonClass
                  }
                >
                  <BarChart3
                    className="w-5 h-5"
                    style={{
                      fill:
                        activePage === "insights" ? "currentColor" : "none",
                    }}
                  />
                  <span>Insight</span>
                </button>
                <button
                  onClick={() => setActivePage("transaction")}
                  className={
                    activePage === "transaction"
                      ? activeButtonClass
                      : buttonClass
                  }
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Transaction</span>
                </button>
                <button
                  onClick={() => setActivePage("customer")}
                  className={
                    activePage === "customer" ? activeButtonClass : buttonClass
                  }
                >
                  <Users className="w-5 h-5" />
                  <span>Customer</span>
                </button>
                <button
                  onClick={() => setActivePage("shop")}
                  className={
                    activePage === "shop" ? activeButtonClass : buttonClass
                  }
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Shop</span>
                </button>
                <button
                  onClick={() => setActivePage("income")}
                  className={
                    activePage === "income" ? activeButtonClass : buttonClass
                  }
                >
                  <Clipboard className="w-5 h-5" />
                  <span>Logs</span>
                </button>
                <button
                  onClick={() => setActivePage("promote")}
                  className={
                    activePage === "promote" ? activeButtonClass : buttonClass
                  }
                >
                  <Megaphone className="w-5 h-5" />
                  <span>Moderation</span>
                </button>
                <button
                  onClick={() => setActivePage("settings")}
                  className={
                    activePage === "settings" ? activeButtonClass : buttonClass
                  }
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </nav>

              {/* Bottom Section */}
              <div className="flex-1 space-y-2">
                <div className="border-t border-gray-300 dark:border-gray-600"></div>
                <button
                  onClick={() => setActivePage("signout")}
                  className={
                    activePage === "signout" ? activeButtonClass : buttonClass
                  }
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={() => setActivePage("help")}
                  className={
                    activePage === "help" ? activeButtonClass : buttonClass
                  }
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>Help</span>
                </button>
              </div>
            </div>
          )}

          {/* Toggle Button (Menu Icon) */}
          {!isSidebarVisible && (
            <button
              className="fixed top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            </button>
          )}

          {/* Content */}
          <div
            className={`transition-all duration-300 ${
              isSidebarVisible ? "ml-64" : "ml-0 pl-[3.5rem]"
            } w-full`}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
