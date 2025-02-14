'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../lib/store'
import DOMPurify from 'dompurify'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { toast, Toaster } from 'react-hot-toast'

// Define the Job interface
interface Job {
  id: number 
  title: string 
  company_name: string 
  category: string 
  candidate_required_location: string 
  description?: string 
}

export default function JobDetails() {
  // Extract job ID from URL parameters
  const { id } = useParams()
  const router = useRouter()

  // Retrieve jobs and applied jobs from Redux store
  const { jobs, appliedJobs } = useSelector((state: RootState) => state.jobs)

  const [job, setJob] = useState<Job | null>(null)
  const [more, setMore] = useState(false)

  // Fetch the job details based on the ID when the component mounts or when jobs change
  useEffect(() => {
    if (id) {
      const foundJob = jobs.find((job) => job.id === Number(id))
      if (foundJob) setJob(foundJob)
    }
  }, [id, jobs])

  // Show loading state if job details are not yet available
  if (!job) {
    return <p className="text-center text-gray-500">Loading job details...</p>
  }

  // Function to sanitize and truncate job description
  const cleanDescription = (desc: string | undefined) => {
    if (!desc) return 'No description available.'
    const sanitized = DOMPurify.sanitize(desc, { ALLOWED_TAGS: [] }) // Remove HTML tags for security
    return sanitized
  }

  // Function to handle job application
  const handleApply = () => {
    const alreadyApplied = appliedJobs.some(
      (appliedJob) => appliedJob.id === job.id
    )

    if (alreadyApplied) {
      toast.error('You have already applied for this job!')
    } else {
      router.push(`/apply/${job.id}`) 
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="bg-gradient-to-br from-slate-100 to-slate-300 shadow-xl rounded-lg p-8 border border-gray-200 max-w-2xl w-full">
        {/* Job Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>

        {/* Company Name */}
        <p className="text-lg text-gray-700 font-medium">
          <span className="font-bold text-gray-900">Company: </span>
          {job.company_name}
        </p>

        {/* Job Category */}
        <p className="text-sm text-red-900 font-semibold mb-4">
          <span className="font-bold text-gray-900">Category: </span>
          {job.category}
        </p>

        {/* Job Description with "Show More/Less" toggle */}
        <p className="text-gray-700 font-semibold text-base leading-relaxed mb-6">
          <span className="font-bold text-gray-900">Description: </span>
          {more
            ? cleanDescription(job.description) // Show full description if "more" is true
            : cleanDescription(job.description)
                ?.split(' ')
                .slice(0, 75)
                .join(' ') + '...'}{' '}
          {/* Show only first 75 words */}
          <span>
            {/* Show toggle button only if description length is greater than 75 words */}
            {job.description && job.description.split(' ').length > 75 && (
              <button
                className="text-blue-600 hover:underline font-semibold"
                onClick={() => setMore(!more)}
              >
                {more ? 'Show Less' : 'See More'}
              </button>
            )}
          </span>
        </p>

        {/* Job Location */}
        <p className="text-md font-semibold text-gray-900">
          <span className="font-bold text-gray-900">
            <LocationOnIcon /> Location:{' '}
          </span>
          {job.candidate_required_location}
        </p>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="mt-6 w-full bg-red-900 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          Apply Now
        </button>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-center" />
    </div>
  )
}
