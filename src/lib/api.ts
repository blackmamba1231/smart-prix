import axios from "axios";
import { storeData } from "@/types/store";
import { toast } from "react-toastify";
// Fetch user analytics

export async function createStore(storeData: Partial<storeData>) {
  try {
    console.log("creating store with data:"+ storeData)
    const { data } = await axios.post(process.env.NEST_PUBLIC_BACKEND_URL + `stores/create`,storeData,{
       headers: {'Content-Type': 'application/json'
       },
   }
    );
    console.log("Successfully created a store -> "+ data)
    
    if (!data) {
      toast.error('Failed to create store');
      throw new Error('Failed to create store');
    }
    
    return await data;
  } catch (error) {
    toast.error('Failed to create store');
    console.error ('Error creating store:', error);
    throw error;
  }
}
export async function fetchUserAnalytics(datefrom: string, dateto: string) {
  const { data } = await axios.get(process.env.NEST_PUBLIC_BACKEND_URL+"analytics/user-analytics",
    {
      params: {
        startDate: datefrom,
        endDate: dateto,
      },
    }
  );
  console.log("fetcheddata", data);
  if (Array.isArray(data)) {
    const userAnalyticsData = data.map((row) => ({
      date: row.date,  // Ensure date is formatted as string or Date, based on your frontend needs
      clicks: row.clicks || 0, // Default to 0 if not present
      views: row.views || 0,  // Default to 0 if not present
      signups: row.signups || 0,  // Default to 0 if not present
    }));
    console.log("User Analytics:", userAnalyticsData);
    return userAnalyticsData;
  } else {
    toast.error('Failed to fetch user analytics');
    console.error("Expected data to be an array, but received:", data);
    return [];
  }
 
}

export async function updateUserEarnings(){
  await axios.get(process.env.NEST_PUBLIC_BACKEND_URL+"analytics/update-earnings");
}
// Fetch earnings
export async function fetchEarnings() {
  const { data } = await axios.get(`${process.env.NEST_PUBLIC_BACKEND_URL}analytics/earnings`);
  
  return data;
}

export async function fetchStoreData(){
  const {data} = await axios.get(`${process.env.NEST_PUBLIC_BACKEND_URL}stores/getAllStores`);
  return data;
}
// Fetch referrals
export async function fetchReferrals() {
  const { data } = await axios.get(process.env.NEST_PUBLIC_BACKEND_URL+"analytics/referrals");
  return data;
}

