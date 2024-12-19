import Link from "next/link"; 

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3 min-h-screen bg-gray-100">
      <Link href="/signup" className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-gray-100 hover:text-black">Signup</Link>
      <Link href="/admin" className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-gray-100 hover:text-black">Admin Dasboard</Link>
      <Link href="/dashboard" className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-gray-100 hover:text-black">User Dasboard</Link>
    </div>
    
  );
}
