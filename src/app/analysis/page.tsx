'use client'

import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'

// Register chart.js components to enable chart functionalities
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Define Job interface to match job data structure
interface Job {
  category?: string // Category field is optional
}

export default function JobCategoryAnalytics() {
  // Fetch jobs from Redux state
  const { jobs } = useSelector((state: RootState) => state.jobs)

  // Define the structure of the chart data
  interface ChartData {
    labels: string[] // Labels for the X-axis (categories)
    datasets: {
      label: string
      data: number[] // Data points corresponding to each category
      backgroundColor: string
      borderColor: string
      borderWidth: number
    }[]
  }

  // State to store the chart data
  const [chartData, setChartData] = useState<ChartData | null>(null)

  // Effect hook to process job data and update chart
  useEffect(() => {
    if (jobs.length > 0) {
      // Aggregate job count by category using reduce function
      const jobsByCategory = jobs.reduce(
        (acc: { [key: string]: number }, job: Job) => {
          if (job.category) {
            acc[job.category] = (acc[job.category] || 0) + 1 // Increment count for the category
          }
          return acc
        },
        {} // Initial value of accumulator (empty object)
      )

      // Extract categories and corresponding job counts
      const categories = Object.keys(jobsByCategory)
      const jobCounts = categories.map((category) => jobsByCategory[category])

      // Handle case where no valid categories are found
      if (categories.length === 0) {
        setChartData(null)
        return
      }

      // Set the processed data for the chart
      setChartData({
        labels: categories, // X-axis labels
        datasets: [
          {
            label: 'Number of Jobs by Category',
            data: jobCounts, // Y-axis values
            backgroundColor: 'brown', // Bar color
            borderColor: 'white', // Border color for bars
            borderWidth: 1, // Border thickness
          },
        ],
      })
    }
  }, [jobs]) // Runs when jobs data changes

  // Display a message when there is no data available
  if (!chartData || !chartData.labels.length) {
    return (
      <p className="text-center text-2xl mt-10 font-extrabold">
        No data available
      </p>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading for the analytics section */}
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Job Categories | Job Count
      </h2>

      {/* Chart container with styling */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-300 p-6 rounded-lg shadow-md max-w-full overflow-x-auto">
        <div className="w-full min-h-[400px]">
          {/* Ensuring a good initial height for the chart */}
          <Bar
            data={chartData}
            options={{
              responsive: true, // Make chart responsive
              maintainAspectRatio: false, // Allow height adjustments
              plugins: {
                title: { display: true, text: 'Job Count for Applied Filter' }, // Chart title
                tooltip: { enabled: true }, // Enable tooltips on hover
              },
              animations: {
                tension: {
                  duration: 2000, // Animation duration
                  easing: 'easeInOutBounce', // Easing function for smooth animation
                },
              },
              scales: {
                y: {
                  beginAtZero: true, // Ensure the Y-axis starts at zero
                  ticks: {
                    stepSize: 100, // Control the step size for Y-axis labels (e.g., 0, 100, 200)
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
