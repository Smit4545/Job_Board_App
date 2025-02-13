import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const category = url.searchParams.get("category");

  // Base URL for the remote job API
  let apiUrl = "https://remotive.com/api/remote-jobs";

  // Append search and category filters to the API request if present
  if (search || category) {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search);
    if (category) queryParams.append("category", category);
    apiUrl += `?${queryParams.toString()}`;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Return the fetched data with CORS headers
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
