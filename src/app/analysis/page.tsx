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

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Job {
  category?: string
}

export default function JobCategoryAnalytics() {
  const { jobs } = useSelector((state: RootState) => state.jobs)

  interface ChartData {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      borderWidth: number
    }[]
  }

  const [chartData, setChartData] = useState<ChartData | null>(null)

  useEffect(() => {
    if (jobs.length > 0) {
      // Aggregate job count by category
      const jobsByCategory = jobs.reduce(
        (acc: { [key: string]: number }, job: Job) => {
          if (job.category) {
            acc[job.category] = (acc[job.category] || 0) + 1
          }
          return acc
        },
        {} //Initial value of acc (empty object)
      )

      // Prepare data for chart
      const categories = Object.keys(jobsByCategory)
      const jobCounts = categories.map((category) => jobsByCategory[category])

      // Ensure we handle edge cases
      if (categories.length === 0) {
        setChartData(null)
        return
      }

      // Set the data for the chart
      setChartData({
        labels: categories,
        datasets: [
          {
            label: 'Number of Jobs by Category',
            data: jobCounts,
            backgroundColor: 'brown',
            borderColor: 'white',
            borderWidth: 1,
          },
        ],
      })
    }
  }, [jobs])

  // Fallback in case there's no valid data for the chart
  if (!chartData || !chartData.labels.length) {
    return (
      <p className="text-center text-2xl mt-10 font-extrabold">
        No data available
      </p>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Job Categories | Job Count
      </h2>
      <div className="bg-gradient-to-br from-slate-100 to-slate-300 p-6  rounded-lg shadow-md max-w-full overflow-x-auto">
        <div className="w-full min-h-[400px] ">
          {/* Ensuring a good initial height */}
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: { display: true, text: 'Job Count for Applied Filter' },
                tooltip: { enabled: true },
              },
              animations: {
                tension: {
                  duration: 2000,
                  easing: 'easeInOutBounce',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 100, // Ensures labels appear at 0, 100, 200, etc.
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
