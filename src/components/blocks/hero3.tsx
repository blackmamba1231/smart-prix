import { useState } from "react";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contact1 } from "@/components/blocks/contact1";
import Link from "next/link";

export const Hero3 = () => {
  const [showContact, setShowContact] = useState(false);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowContact(false);
    }
  };

  return (
    <div
      className="w-full py-20 lg:py-40 transform scale-90"
      style={{
        transform: "scale(0.9)", // Reduces zoom by 20%
        transformOrigin: "top center", // Keeps scaling centered
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">We&apos;re live!</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                This is the start of something!
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster
                than ever.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                size="lg"
                className="gap-4"
                variant="outline"
                onClick={() => setShowContact(true)}
              >
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
              <Link href="/signup" passHref>
                <Button size="lg" className="gap-4">
                  Sign up here <MoveRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-muted rounded-md aspect-square"></div>
        </div>
      </div>

      {/* Contact1 Modal */}
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
              transform: "translate(-50%, -50%) scale(1.1)",
            }}
          >
            <div className="p-6">
              <Contact1 />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
