"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, Shuffle, X } from "lucide-react";
import { useState } from "react";
import { Contact1 } from "@/components/blocks/contact1";

export const Header1 = () => {
  const [isOpen, setOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowContact(false);
    }
  };

  const navigationItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Product",
      description: "Managing a small business today is already tough.",
      items: [
        { title: "Reports", href: "/reports" },
        { title: "Statistics", href: "/statistics" },
        { title: "Dashboard", href: "/dashboard" },
        { title: "Recordings", href: "/recordings" },
      ],
    },
    {
      title: "Company",
      description: "Managing a small business today is already tough.",
      items: [
        { title: "Admin", href: "/admin" },
        { title: "About us", href: "/about" },
        { title: "Investors", href: "/investors" },
        { title: "Contact us", href: "/contact" },
      ],
    },
  ];

  return (
    <header className="w-full z-40 sticky top-0 left-0 bg-background px-4">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        {/* Navigation Menu */}
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <NavigationMenuLink>
                      <Button variant="ghost">{item.title}</Button>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              className="mt-10"
                              onClick={() => setShowContact(true)}
                            >
                              Book a call today
                            </Button>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Logo */}
        <div className="flex lg:justify-center items-center space-x-3">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-[0.35rem] rounded-full">
            <Shuffle className="w-6 h-6 text-white" />
          </div>
          <p
            className="font-semibold text-2xl"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Comparify
          </p>
        </div>

        {/* Right Section */}
        <div className="flex justify-end w-full gap-4 items-center">
          <div className="border-r hidden md:inline"></div>
          <ModeToggle />
          <Link href="/signup" passHref>
            <Button variant="outline">Sign in</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button>Get started</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center"
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center"
                          onClick={() => setOpen(false)}
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div
            className="relative bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg w-[90%] max-w-2xl overflow-hidden shadow-lg"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="p-6">
              <Contact1 />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
