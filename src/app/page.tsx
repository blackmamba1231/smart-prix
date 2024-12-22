import Link from "next/link"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <Link href="/signup" className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-gray-100 hover:text-black">Signup</Link>
    </div>
    
  );
}
