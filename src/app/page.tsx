// Import the JobList component, which will display the list of jobs
import JobList from './components/JobList'

// Function to fetch jobs from the API **on the server side (SSR)**
// This ensures that jobs are fetched **before** rendering the page.
async function fetchJobs() {
  try {
    // Fetch job data from the API
    // `cache: "no-store"` ensures fresh data on every request (avoids caching)
    const response = await fetch(`${process.env.URL}/api/jobs`, {
      cache: 'no-store',
    })

    //Handle errors if the API request fails
    if (!response.ok) {
      const errorText = await response.text() // Get error details from the response
      console.error('Error fetching jobs:', errorText) // Log the error for debugging
      throw new Error('Failed to fetch jobs') // Throw an error to stop execution
    }

    //Parse the JSON response and return the list of jobs
    const data = await response.json()
    return data.jobs
  } catch (error) {
    console.error('Fetch error:', error) // Log unexpected errors
    return [] // Return an empty array to avoid crashing the app
  }
}

// Main Home Page Component
// This function fetches jobs **on the server** before rendering the page
export default async function Home() {
  //Fetch jobs on the server before rendering (SSR)
  const jobs = await fetchJobs()

  return (
    <main className="p-6 mx-auto">
      {/* Pass the fetched jobs to the JobList component for display */}
      <JobList initialJobs={jobs} />
    </main>
  )
}
