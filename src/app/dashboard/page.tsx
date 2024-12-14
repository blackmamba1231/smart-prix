"use client"
import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  BellIcon,
  CogIcon,
  ClipboardIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";
import { useRouter } from "next/navigation";


ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
interface Ticket {
    id: number;
    description: string;
    status: "Pending" | "Resolved";
    createdAt: string;
  }
  interface ReferralData {
    name: string;
    earnings: string;
    lastTransaction: string;
  }
  
const Dashboard = () => {

  const [activePage, setActivePage] = useState<string>("dashboard");
  const [selectedMonth, setSelectedMonth] = useState("May 2024");
  const [friendemail, setFriendemail] = useState("");
  const [payments, setPayments] = useState([
    {
      requestId: "",
      paymentMode: "",
      amountPaid: "",
      referenceNumber: "",
    },
  ]);
  useEffect(() => {
    const fetchPayments = async () => {
      try{
        console.log("fetching payments data");
        const response = await axios.get(process.env.NEST_PUBLIC_BACKEND_URL +"auth/payment", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        console.log(response.data);
        setPayments(response.data);

      }catch(error){
        console.log(error);
      }
    }
    fetchPayments();
  }, [])
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralcode);
    alert("Referral link copied to clipboard!");
  };
  const referralData: ReferralData[] = [
    
  ];
  

    const totalCashback = "₹0.0";
    const friendsReferred = 0;
    const [activeTab, setActiveTab] = useState<'personalDetails' | 'changePassword'>('personalDetails');
    const router = useRouter();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [phone, setPhone] =   useState("");
  const [earned, setEarned] = useState("");
  const [pending, setPending] = useState("");
  const [paid, setPaid] = useState("");
  const [rejected, setRejected] = useState("");
  const [cashback, setCashback] = useState("");
  const [referalearned, setReferalearned] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [referralcode, setReferralcode] = useState("");
  const [newList, setNewList] = useState("");
const [lists, setLists] = useState(["Cars", "Tech Gadgets", ]);
const [activities, setActivities] =  useState<string[]>([]);
const logActivity = (activityDescription: string) => {
  const newActivity = activityDescription;
  setActivities((prevActivities) => [newActivity, ...prevActivities]);
};
const handleAddList = () => {
  if (newList.trim()) {
    setLists([...lists, newList]);
    setNewList(""); // Clear the input
    logActivity(`Added ${newList}`);
  }
};

const handleRemoveList = (index: number) => {
  const updatedLists = lists.filter((_, i) => i !== index);
  setLists(updatedLists);
  logActivity(`Removed ${updatedLists[index]}`);
};
  const handleEditProfile = () => {
    setActivePage("settings");
    logActivity("Profile settings edited");
  };
  const handlereferral = () => {
    setActivePage("refer-earn");
    logActivity("Referred to a friend");
  }
useEffect(() => {
      const fetchUserDetails = async () => {
        try {

          const email = localStorage.getItem("email");
          console.log(email);
          const response = await axios.post(process.env.NEST_PUBLIC_BACKEND_URL +"auth/user", {email} );
          console.log(response)
          if (response.data) {
            const data = await response.data;
            setNewName(data.name); // Setting the fetched name to the state
            setNewEmail(data.email);
            setPhone(data.phone);
            setEarned(data.earned);
            setPending(data.pending);
            setPaid(data.paid);
            setRejected(data.rejected);
            setCashback(data.cashback);
            setReferralcode(data.referalcode);
            setReferalearned(data.referalearning);

          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
  
      fetchUserDetails();
    }, []);
    const data = {
      labels: ["Earned", "Cashback", "Referral"],
      datasets: [
        {
          data: [earned, cashback, referalearned],
          backgroundColor: ["#4C6FFF", "#34D399", "#F59E0B"],
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
      },
    };
    const handlefaqroute = () => {
      setActivePage("help");
    }
    const sendInvite = async() => {
      const response = await axios.post(process.env.NEST_PUBLIC_BACKEND_URL +"auth/invite", {email: friendemail, referalcode: referralcode} );
      console.log(friendemail);
      console.log(response);
    }
    
    const handleTicketroute = () => {
      setActivePage("missing-cashback");
    }
    const handleChatroute = () => {
      setActivePage("help");
    }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTicket.trim() === "") return;

    setIsSubmitting(true);
    logActivity(`Submitted new ticket: ${newTicket}`);
    const newTicketData: Ticket = {
      id: tickets.length + 1,
      description: newTicket,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    setTimeout(() => {
      setTickets([...tickets, newTicketData]);
      setNewTicket("");
      setIsSubmitting(false);
    }, 1000);
  };
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Management */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg p-8 max-w-sm mx-auto text-white">
  <div className="flex items-center space-x-4 mb-6">
    <div className="bg-white text-purple-500 rounded-full p-4 shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-8 h-8"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold">Profile</h2>
  </div>

  <div className="space-y-5">
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6 text-white mr-4"
      >
        <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm0 12c-5.33 0-10 2.67-10 6v2h20v-2c0-3.33-4.67-6-10-6z" />
      </svg>
      <p className="text-md font-medium">Name: {newName || 'N/A'}</p>
    </div>

    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6 text-white mr-4"
      >
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zM4 6h16l-8 5-8-5zm16 12H4V8l8 5 8-5v10z" />
      </svg>
      <p className="text-md font-medium">Email: {newEmail || 'N/A'}</p>
    </div>

    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6 text-white mr-4"
      >
        <path d="M6.62 10.79C4.66 12.33 4 13.75 4 16v1h16v-1c0-2.25-.66-3.67-2.62-5.21C15.59 9.45 13.86 8.75 12 8.75c-1.86 0-3.59.7-5.38 2.04zm6.62-3.55c2.33 0 4.18 1.9 4.18 4.26 0 .45-.05.88-.15 1.3-.93-.4-2.1-.7-3.53-.7s-2.6.3-3.53.7c-.1-.42-.15-.85-.15-1.3 0-2.36 1.85-4.26 4.18-4.26z" />
      </svg>
      <p className="text-md font-medium">Phone: {phone || 'N/A'}</p>
    </div>
  </div>

  <button
    className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg hover:shadow-lg"
    onClick={handleEditProfile}
  >
    Edit Profile
  </button>
</section>




        {/* Activity Tracking */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-6 text-white">
  <h2 className="text-lg font-semibold">Recent Activity</h2>
  <ul className="mt-4 space-y-2 text-gray-100">
    {activities.map((activity, index) => (
      <li key={index}>- {activity}</li>
    ))}
  </ul>
</section>


        {/* Lists */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg p-6 text-white">
  <h2 className="text-xl font-bold">Favorite Lists</h2>
  
  {/* Input and Add Button */}
  <div className="mt-4 flex flex-col md:flex-row items-center gap-2">
    <input
      type="text"
      placeholder="Enter Favorite Keywords ..."
      className="w-full md:w-auto flex-1 py-2 px-4 rounded-lg text-gray-700 focus:outline-none"
      value={newList}
      onChange={(e) => setNewList(e.target.value)}
    />
    <button
      className="bg-gradient-to-r from-green-400 to-blue-400 py-2 px-2 rounded-lg hover:shadow-lg"
      onClick={handleAddList}
    >
      Add List
    </button>
  </div>

  {/* List Display */}
  <ul className="mt-6 space-y-2 text-gray-100">
    {lists.map((list, index) => (
      <li
        key={index}
        className="flex items-center justify-between bg-white bg-opacity-20 p-3 rounded-lg"
      >
        <span>{list}</span>
        <button
          className="text-red-400 hover:text-red-500"
          onClick={() => handleRemoveList(index)}
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
</section>


        {/* Earnings */}
        <section className="col-span-1 md:col-span-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg p-6 text-white">
  <h2 className="text-lg font-semibold">Earnings</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
    <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center shadow-md">
      <p className="text-sm text-white">Total Earned</p>
      <p className="text-xl font-semibold"> ₹{(Number(earned) || 0) + (Number(cashback) || 0) + (Number(referalearned) || 0)}</p>
    </div>
    <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center shadow-md">
      <p className="text-sm text-white">Pending</p>
      <p className="text-xl font-semibold"> ₹{pending}</p>
    </div>
    <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center shadow-md">
      <p className="text-sm text-white">Paid</p>
      <p className="text-xl font-semibold"> ₹{paid}</p>
    </div>
    <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center shadow-md">
      <p className="text-sm text-white">Rejected</p>
      <p className="text-xl font-semibold"> ₹{rejected}</p>
    </div>
  </div>
</section>

        {/* Refer and Earn */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg p-6 text-white">
  <h2 className="text-xl font-bold">Refer and Earn</h2>
  <p className="mt-4 text-md">
    Referral ID: <span className="font-semibold">{referralcode}</span>
  </p>
  <button
    className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg hover:shadow-lg flex items-center"
    onClick={handlereferral}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="h-6 w-6 mr-2"
    >
      <path d="M13 5h-2v5h2V5zm0 8h-2v5h2v-5zm7.07-8.93L17.66 2.34C17.26 1.94 16.62 1.94 16.22 2.34l-1.41 1.41c-.4.4-.4 1.04 0 1.45l2.41 2.41c.4.4 1.04.4 1.45 0l1.41-1.41c.4-.4.4-1.04 0-1.45zM4.93 16.07L3.52 17.48c-.4.4-.4 1.04 0 1.45l1.41 1.41c.4.4 1.04.4 1.45 0l2.41-2.41c.4-.4.4-1.04 0-1.45l-1.41-1.41c-.4-.4-1.04-.4-1.45 0zm14.14 0l1.41-1.41c.4-.4.4-1.04 0-1.45l-1.41-1.41c-.4-.4-1.04-.4-1.45 0l-2.41 2.41c-.4.4-.4 1.04 0 1.45l1.41 1.41c.4.4 1.04.4 1.45 0zM7.34 2.34L5.93 3.75c-.4.4-.4 1.04 0 1.45L8.34 7.6c.4.4 1.04.4 1.45 0l1.41-1.41c.4-.4.4-1.04 0-1.45L9.75 2.34c-.4-.4-1.04-.4-1.45 0z" />
    </svg>
    Share Referral Link
  </button>
</section>


        {/* Help Section */}
        <section className="col-span-1 md:col-span-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow p-6 text-white">
  <h2 className="text-lg font-semibold">Help & Support</h2>
  <ul className="mt-4 space-y-4">
    <li className="text-gray-100 flex items-center">
      <button className="bg-white text-purple-500 py-2 px-4 rounded-lg flex items-center hover:bg-gray-200 focus:outline-none"
      onClick={handlefaqroute}>
        
        <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
        FAQs
      </button>
    </li>
    <li className="text-gray-100 flex items-center">
      <button className="bg-white text-purple-500 py-2 px-4 rounded-lg flex items-center hover:bg-gray-200 focus:outline-none"
      onClick={handleTicketroute}>
        <ClipboardIcon className="h-5 w-5 mr-2" />
        Raise a Ticket
      </button>
    </li>
    <li className="text-gray-100 flex items-center">
      <button className="bg-white text-purple-500 py-2 px-4 rounded-lg flex items-center hover:bg-gray-200 focus:outline-none"
      onClick={handleChatroute}>
        <CogIcon className="h-5 w-5 mr-2" />
        Chat Support
      </button>
    </li>
  </ul>
</section>

      </main>
          </div>
        );
      case "payments":
        return (
          <div className="min-h-screen bg-gray-100 p-4">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-6 shadow-md mb-6">
              <h2 className="text-xl font-bold">Total Earnings</h2>
              <div className="flex items-center justify-between mt-2">
                <p className="text-4xl font-semibold">
                  ₹{(Number(earned) || 0) + (Number(cashback) || 0) + (Number(referalearned) || 0)}
                </p>
                <button
                  className="text-blue-100 underline"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  Explore &gt;
                </button>
              </div>
              <p className="text-sm mt-2">
                Earnings will show here within 72 hours of your activity.
              </p>
            </div>
      
            {/* Detailed Earnings Section */}
            {isExpanded && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-blue-600">Earnings Breakdown</h3>
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Earned */}
                    <div className="text-center">
                      <p className="font-semibold text-lg">Earned Rewards</p>
                      <p className="text-2xl">₹{earned}</p>
                    </div>
                    {/* Cashback */}
                    <div className="text-center">
                      <p className="font-semibold text-lg">Cashback</p>
                      <p className="text-2xl">₹{cashback}</p>
                    </div>
                    {/* Referral */}
                    <div className="text-center">
                      <p className="font-semibold text-lg">Referral Earnings</p>
                      <p className="text-2xl">₹{referalearned}</p>
                    </div>
                  </div>
      
                  {/* Circular Chart */}
                  <div className="mt-8">
                    <Doughnut data={data} options={options} />
                  </div>
                </div>
              </div>
            )}
      
            {/* Card Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {/* My Order Details */}
              <div className="bg-blue-100 rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="bg-blue-200 p-3 rounded-full mb-4">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-600">My Order Details</h3>
                <button className="text-blue-500 underline mt-2"
                onClick={()=>{
                  router.push("/orders")
                }}>View More &gt;</button>
              </div>
      
              {/* Request Payment */}
              <div className="bg-blue-100 rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="bg-blue-200 p-3 rounded-full mb-4">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276a1 1 0 01.894 0L23 10m-8 5v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4m-6 0h16" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-600">Request Payment</h3>
                <button className="text-blue-500 underline mt-2">Get Paid &gt;</button>
              </div>
      
              {/* Get Help */}
              <div className="bg-blue-100 rounded-lg shadow-md p-6 flex flex-col items-center">
                <div className="bg-blue-200 p-3 rounded-full mb-4">
                  {/* Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1 4v-4m0 0H9m4 4h2m-2 0h2m4 0h2m-6 0H9m6 0h2m2 0h2m0-4v4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-blue-600">Get Help</h3>
                <button className="text-blue-500 underline mt-2">Learn More &gt;</button>
              </div>
            </div>
          </div>
        );
      case "payment-history":
        return (
            <div className="min-h-screen bg-gray-100 p-4">
              {/* Header Section */}
              <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        
              {/* Month Selector */}
              <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg mb-4">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="May 2024">All Transactions</option>
                 
                </select>
              </div>
        
              {/* Payment Table */}
              <div className="bg-white rounded-lg shadow p-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Request ID</th>
                      <th className="text-left p-2">Payment Mode</th>
                      <th className="text-right p-2">Amount Paid</th>
                      <th className="text-left p-2">Reference Number</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2">{payment.requestId}</td>
                        <td className="p-2">{payment.paymentMode}</td>
                        <td className="p-2 text-right">{payment.amountPaid}</td>
                        <td className="p-2">{payment.referenceNumber}</td>
                        <td className="p-2">
                          <button className="text-blue-500 underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
      case "missing-cashback":
        return (
            <div className="p-6 bg-white shadow rounded-md">
              <h2 className="text-2xl font-bold mb-4">Missing Cashback</h2>
        
              {/* Create New Ticket Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Create a New Ticket</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <textarea
                    value={newTicket}
                    onChange={(e) => setNewTicket(e.target.value)}
                    placeholder="Describe your cashback issue..."
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    rows={3}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                  </button>
                </form>
              </div>
        
              {/* Previous Tickets Section */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Previous Tickets</h3>
                {tickets.length === 0 ? (
                  <p className="text-gray-500">No tickets created yet.</p>
                ) : (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="border border-gray-300 rounded-md p-4 shadow-sm"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-indigo-600">
                            Ticket #{ticket.id}
                          </span>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              ticket.status === "Pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-1">{ticket.description}</p>
                        <small className="text-gray-500">
                          Created on: {ticket.createdAt}
                        </small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
      case "refer-earn":
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col">
              {/* Header Section */}
              <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-16">
                <h1 className="text-4xl font-extrabold">Refer & Earn Rewards</h1>
                <p className="mt-4 text-lg">
                  Invite your friends and earn <span className="font-bold">10% Cashback</span> every time they shop!
                </p>
              </header>
        
              {/* Main Content */}
              <main className="flex-grow max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
                {/* Referral Section */}
                <section className="text-center">
                  <h2 className="text-2xl font-semibold mb-4">Your Unique Referral Code</h2>
                  <p className="text-gray-600 mb-6">
                    Share the Code below with your friends to help them join and earn rewards.
                  </p>
        
                  <div className="flex items-center border rounded-lg shadow-sm overflow-hidden">
                    <input
                      type="text"
                      value={referralcode}
                      readOnly
                      className="flex-1 p-4 bg-gray-100 text-gray-800 outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 transition duration-300"
                    >
                      Copy Code
                    </button>
                  </div>
                </section>
        
                {/* Divider */}
                <div className="my-8 border-t border-gray-200"></div>
        
                {/* Invite Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Invite via Email */}
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-4">Invite by Email</h3>
                    <p className="text-gray-600 mb-4">
                      Send an invitation directly to your friends via email.
                    </p>
                    <input
                      onChange={(e) => setFriendemail(e.target.value)}
                      type="email"
                      placeholder="Enter your friend's email"
                      className="w-full border rounded-lg p-3 mb-4"
                    />
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition duration-300"
                    onClick={sendInvite}
                    >
                      Send Invite
                    </button>
                  </div>
        
                  {/* Invite via Social Media */}
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-4">Invite via Social Media</h3>
                    <p className="text-gray-600 mb-4">Share your link on social platforms.</p>
                    <div className="flex justify-center gap-4">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${referralcode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                      > Facebook
                      </a>
                      <a
                        href={`https://telegram.me/share/url?url=${referralcode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-300"
                      >
                         Telegram
                      </a>
                    </div>
                  </div>
                </section>
              </main>
        
              {/* Footer Section */}
              <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm">
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                  </p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:underline">
                      Terms & Conditions
                    </a>
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                    <a href="#" className="hover:underline">
                      Help Center
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          );
      case "referral-network":
        return (
            <div className="bg-gray-50 min-h-screen p-8">
              {/* Header Section */}
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold text-gray-700">
                    Total Referral Cashback Earned:
                    <span className="text-orange-600 ml-2">{totalCashback}</span>
                  </h1>
                  <h2 className="text-lg font-medium text-gray-600">
                    Friends Referred:
                    <span className="text-blue-600 ml-2">{friendsReferred}</span>
                  </h2>
                </div>
              </div>
        
              {/* Referral Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-600 p-4">Referral Name</th>
                      <th className="text-left text-sm font-medium text-gray-600 p-4">Referral Earnings</th>
                      <th className="text-left text-sm font-medium text-gray-600 p-4">Last Transaction</th>
                      <th className="text-center text-sm font-medium text-gray-600 p-4">Send Reminder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralData.map((referral, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition">
                        <td className="p-4 text-gray-700">{referral.name}</td>
                        <td className="p-4 text-gray-700">{referral.earnings}</td>
                        <td className="p-4 text-gray-700">
                          {referral.lastTransaction === "-" ? "No Transaction" : referral.lastTransaction}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center space-x-4">
                            <a
                              href={`https://wa.me/?text=Join%20via%20my%20referral%20link!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-500 hover:text-green-600 transition"
                            >
                              <i className="material-icons">whatsapp</i>
                            </a>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=https://example.com`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-600 transition"
                            >
                              <i className="material-icons">facebook</i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );return (
            <div className="bg-gray-50 min-h-screen p-8">
              {/* Header Section */}
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold text-gray-700">
                    Total Referral Cashback Earned:
                    <span className="text-orange-600 ml-2">{totalCashback}</span>
                  </h1>
                  <h2 className="text-lg font-medium text-gray-600">
                    Friends Referred:
                    <span className="text-blue-600 ml-2">{friendsReferred}</span>
                  </h2>
                </div>
              </div>
        
              {/* Referral Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left text-sm font-medium text-gray-600 p-4">Referral Name</th>
                      <th className="text-left text-sm font-medium text-gray-600 p-4">Referral Earnings</th>
                      <th className="text-left text-sm font-medium text-gray-600 p-4">Last Transaction</th>
                      <th className="text-center text-sm font-medium text-gray-600 p-4">Send Reminder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralData.map((referral, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50 transition">
                        <td className="p-4 text-gray-700">{referral.name}</td>
                        <td className="p-4 text-gray-700">{referral.earnings}</td>
                        <td className="p-4 text-gray-700">
                          {referral.lastTransaction === "-" ? "No Transaction" : referral.lastTransaction}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center space-x-4">
                            <a
                              href={`https://wa.me/?text=Join%20via%20my%20referral%20link!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-500 hover:text-green-600 transition"
                            >
                              <i className="material-icons">whatsapp</i>
                            </a>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=https://example.com`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-600 transition"
                            >
                              <i className="material-icons">facebook</i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
      case "help":
        return (
            <div className="min-h-screen bg-gray-50">
              {/* Header Section */}
              <header className="bg-blue-600 text-white py-6 text-center">
                <h1 className="text-3xl font-bold">What can we help you with?</h1>
              </header>
        
              {/* Main Content Section */}
              <main className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Option 1: Missing Cashback */}
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-orange-500 text-3xl mb-4">🎟️</div>
                    <h2 className="text-xl font-semibold mb-2">My cashback is missing</h2>
                    <p className="text-gray-600">Report missing cashback easily.</p>
                  </div>
        
                  {/* Option 2: Tracked Cashback Help */}
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-orange-500 text-3xl mb-4">📋</div>
                    <h2 className="text-xl font-semibold mb-2">Help with tracked cashback</h2>
                    <p className="text-gray-600">Find assistance for tracked cashback.</p>
                  </div>
        
                  {/* Option 3: FAQs */}
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-orange-500 text-3xl mb-4">❓</div>
                    <h2 className="text-xl font-semibold mb-2">Frequently asked questions</h2>
                    <p className="text-gray-600">Browse our FAQ for quick solutions.</p>
                  </div>
        
                  {/* Option 4: Connect with Us */}
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-orange-500 text-3xl mb-4">🎧</div>
                    <h2 className="text-xl font-semibold mb-2">Want to connect with us</h2>
                    <p className="text-gray-600">Reach out for personalized help.</p>
                  </div>
                  </div>

        {/* Feedback Section */}
        <div className="text-center mt-12">
          <p className="text-gray-700 text-lg mb-4">Were we able to help you?</p>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Give us feedback
          </button>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-200 py-4 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
      case "settings":
        return (
            <div className="min-h-screen bg-gray-50 p-6">
              <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
                {/* Tabs */}
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('personalDetails')}
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'personalDetails' ? 'border-orange-500 text-orange-500' : 'text-gray-600'
                    } border-b-2`}
                  >
                    Personal Details
                  </button>
                  <button
                    onClick={() => setActiveTab('changePassword')}
                    className={`flex-1 py-4 text-center font-medium ${
                      activeTab === 'changePassword' ? 'border-orange-500 text-orange-500' : 'text-gray-600'
                    } border-b-2`}
                  >
                    Change Password
                  </button>
                  
                </div>
        
                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'personalDetails' && (
                    <div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name:</label>
                          <input
                            type="text"
                            value="RAHUL AGRAWAL"
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                          />
                          </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address:</label>
                  <input
                    type="email"
                    value="mixoxxxxxxxx@gmail.com"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number:</label>
                  <input
                    type="text"
                    value="+91 93XXXXXX67"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value=""
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value=""
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood-Group</label>
                  <input
                    type="text"
                    value=""
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date-Of-Birth</label>
                  <input
                    type="text"
                    value=""
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <input
                    type="text"
                    value=""
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <input type="checkbox" className="form-checkbox text-orange-500" defaultChecked />
                  <label className="text-sm text-gray-600">Receive email when I get referral earnings</label>
                </div>
              </div>
              <button className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300">
                Delete my account
              </button>
              <div className="mt-6 text-right">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  Save Changes
                </button>
              </div>
            </div>
          )}
{activeTab === 'changePassword' && (
            <div>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password:</label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password:</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password:</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
                  />
                </div>
              </div>
              <div className="mt-6 text-right">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
      case "logout":
       return(
        <div>
          hello
        </div>
       );
      default:
        return <p>Page not found</p>;
    }
  };
 
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Comparify</h1>
          <div className="flex items-center space-x-4">
            <BellIcon className=" h-8 w-8 text-white cursor-pointer hover:text-gray-300" />
            <Menu as="div" className="relative ">
              <Menu.Button>
                <UserCircleIcon className="h-8 w-8 text-white cursor-pointer hover:text-gray-300" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-50">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#dashboard"
                      onClick={() => setActivePage("dashboard")}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
                    >
                      Dashboard
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#payments"
                      onClick={() => setActivePage("payments")}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
                    >
                      Payments
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#payment-history"
                      onClick={() => setActivePage("payment-history")}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
                    >
                      Payment History
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
      {({ active }) => (
        <a
          href="#missing-cashback"
          onClick={() => setActivePage("missing-cashback")}
          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
        >
          Missing Cashback
        </a>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <a
          href="#refer-earn"
          onClick={() => setActivePage("refer-earn")}
          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
        >
          Refer & Earn
        </a>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <a
          href="#referral-network"
          onClick={() => setActivePage("referral-network")}
          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
        >
          Referral Network
        </a>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <a
          href="#help"
          onClick={() => setActivePage("help")}
          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
        >
          Help
        </a>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <a
          href="#testimonials"
          onClick={() => setActivePage("testimonials")}
          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
        >
          Testimonials
        </a>
      )}
    </Menu.Item>
    <Menu.Item>
      {({ active }) => (
        <a
          href="#settings"
          onClick={() => setActivePage("settings")}
          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
        >
          Settings
        </a>
      )}
    </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#logout"
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${active ? "bg-gray-100" : ""}`}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
