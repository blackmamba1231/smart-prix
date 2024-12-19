import axios from "axios";

// Fetch user analytics
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
