import JobList from "./components/JobList";
// Fetch jobs **on the server** (SSR)
async function fetchJobs() {
  const response = await fetch(`${process.env.URL}/api/jobs`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error fetching jobs:", errorText);
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data.jobs;
}

export default async function Home() {
  const jobs = await fetchJobs();

  return (
    <main className="p-6  mx-auto">
      <JobList initialJobs={jobs} />
    </main>
  );
}
