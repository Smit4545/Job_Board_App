// 'use client'

// import { useEffect, useState,useRef} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../lib/store'
// import { setJobs } from '../../redux/jobSlice'
// import debounce from 'lodash.debounce'
// import { motion } from 'framer-motion'
// import Link from 'next/link'
// import LocationOnIcon from '@mui/icons-material/LocationOn'
// import SearchAndFilter from './SearchAndFilter'

// //Function to fetch jobs based on search filters (title & category)
// async function fetchFilteredJobs(title: string, category: string) {
//   let url = `/api/jobs`
//   const queryParams = new URLSearchParams()

//   // Append query parameters only if they exist
//   if (title) queryParams.append('search', title)
//   if (category && category !== 'all') queryParams.append('category', category)

//   //Construct the API URL with filters
//   if (queryParams.toString()) url += `?${queryParams.toString()}`

//   try {
//     const response = await fetch(url)
//     const data = await response.json()
//     console.log('Fetched Data:', data)
//     return data.jobs
//   } catch (error) {
//     console.error('Error fetching jobs:', error)
//     return []
//   }
// }

// // Define the structure of a Job object
// interface Job {
//   id: number
//   title: string
//   company_name: string
//   category: string
//   candidate_required_location: string
// }

// //JobList Component - Displays the job listings
// export default function JobList({ initialJobs }: { initialJobs: Job[] }) {
//   const dispatch = useDispatch()
//   const { searchQuery, selectedCategory, jobs } = useSelector(
//     (state: RootState) => state.jobs
//   )

//   const [loading, setLoading] = useState(false)
//  // const shouldFetch = useRef(false) // Avoid initial fetch duplication

//   //Animation Variants for Job Cards (Framer Motion)
//   const jobCardVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { duration: 0.4, ease: 'easeOut' },
//     },
//     hover: {
//       scale: 1.05,
//       boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
//       transition: { duration: 0.2, ease: 'easeInOut' },
//     },
//   }

//   //Container animation for staggered job cards
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15, delayChildren: 0.2 },
//     },
//   }

//   // Initialize Redux store with `initialJobs` only once
//   useEffect(() => {
//     dispatch(setJobs(initialJobs))
//     console.log("initial")
//   }, [dispatch, initialJobs])

//   //Debounced function to fetch jobs (prevents unnecessary API calls)
//   const debouncedFetchJobs = useRef(
//     debounce(async (query: string, category: string) => {
//       setLoading(true) // Start loading
//       console.log(category, query)
//       if (!query && category === 'all') {
//         // Case: No filters applied → Reset to initial jobs
//         dispatch(setJobs(initialJobs))
//         console.log('reset1')
//       }
//       else if (!query && !category) {
//         dispatch(setJobs(initialJobs))
//         console.log('reset2')
//       }
//        else {
//         // Case: Filters applied → Fetch filtered jobs
//         const filteredJobs = await fetchFilteredJobs(query, category)
//         dispatch(setJobs(filteredJobs.length === 0 ? [] : filteredJobs))
//         console.log('filtered', query, category)
//       }
//       setLoading(false) // Stop loading after operation
//     }, 1000) // 1-second debounce
//   ).current

//   // Trigger job fetching when `searchQuery` or `selectedCategory` changes
//  useEffect(() => {
//    debouncedFetchJobs(searchQuery, selectedCategory)
//  }, [searchQuery, selectedCategory])

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/*Search and Filter Component */}
//       <SearchAndFilter />

//       {/*Show loading spinner while fetching jobs */}
//       {loading ? (
//         <div className="flex justify-center my-4">
//           <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : jobs.length === 0 ? (
//         // Show message if no jobs are found
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center py-10"
//         >
//           <p className="text-3xl font-bold">No Jobs Found...</p>
//         </motion.div>
//       ) : (
//         //Display job list with animations
//         <motion.ul
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
//         >
//           {jobs.map((job) => (
//             <motion.li
//               key={job.id}
//               variants={jobCardVariants}
//               whileHover="hover"
//               className="border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out bg-gradient-to-br from-slate-100 to-slate-300 flex flex-col justify-between"
//             >
//               {/* Clicking a job redirects to job details page */}
//               <Link href={`/job/${job.id}`}>
//                 <p className="text-xl font-extrabold text-gray-900 transition-colors mb-2">
//                   {job.title}
//                 </p>

//                 <p className="text-gray-700 font-bold">
//                   <span className="font-bold text-gray-900">Company: </span>
//                   {job.company_name}
//                 </p>
//                 <p className="text-sm text-red-900 font-bold mb-4">
//                   <span className="font-bold text-gray-900">Category: </span>
//                   {job.category}
//                 </p>
//                 <p className="text-sm font-semibold text-gray-900">
//                   <span className="font-bold text-gray-900">
//                     <LocationOnIcon />
//                     Location:{' '}
//                   </span>
//                   {job.candidate_required_location}
//                 </p>
//               </Link>
//             </motion.li>
//           ))}
//         </motion.ul>
//       )}
//     </div>
//   )
// }
'use client'

import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../lib/store'
import { setJobs } from '../../redux/jobSlice'
import debounce from 'lodash.debounce'
import { motion } from 'framer-motion'
import Link from 'next/link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchAndFilter from './SearchAndFilter'

// Function to fetch jobs based on search filters (title & category)
async function fetchFilteredJobs(title: string, category: string) {
  let url = `/api/jobs`
  const queryParams = new URLSearchParams()

  if (title) queryParams.append('search', title)
  if (category && category !== 'all') queryParams.append('category', category)

  if (queryParams.toString()) url += `?${queryParams.toString()}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.jobs
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

// Define the structure of a Job object
interface Job {
  id: number
  title: string
  company_name: string
  category: string
  candidate_required_location: string
}

export default function JobList({ initialJobs }: { initialJobs: Job[] }) {
  const dispatch = useDispatch()
  const { searchQuery, selectedCategory, jobs } = useSelector(
    (state: RootState) => state.jobs
  )

  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 6

  //   Animation Variants for Job Cards (Framer Motion)
  const jobCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  }

  //Container animation for staggered job cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  // Initialize Redux store with `initialJobs` only once
  useEffect(() => {
    dispatch(setJobs(initialJobs))
  }, [dispatch, initialJobs])

  //   //Debounced function to fetch jobs (prevents unnecessary API calls)
  const debouncedFetchJobs = useRef(
    debounce(async (query: string, category: string) => {
      setLoading(true) // Start loading
      if (!query && category === 'all') {
        // Case: No filters applied → Reset to initial jobs
        dispatch(setJobs(initialJobs))
        console.log('reset1')
      } else if (!query && !category) {
        dispatch(setJobs(initialJobs))
        console.log('reset2',initialJobs)
      } else {
        // Case: Filters applied → Fetch filtered jobs
        const filteredJobs = await fetchFilteredJobs(query, category)
        dispatch(setJobs(filteredJobs.length === 0 ? [] : filteredJobs))
        console.log('filtered', query, category)
      }
      setLoading(false) // Stop loading after operation
    }, 1000) // 1-second debounce
  ).current

  useEffect(() => {
    setCurrentPage(1)
    debouncedFetchJobs(searchQuery, selectedCategory)
  }, [searchQuery, selectedCategory])

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob)

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchAndFilter />

      {loading ? (
        <div className="flex justify-center my-4">
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : jobs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <p className="text-3xl font-bold">No Jobs Found...</p>
        </motion.div>
      ) : (
        <>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
          >
            {currentJobs.map((job) => (
              <motion.li
                key={job.id}
                variants={jobCardVariants}
                whileHover="hover"
                className="border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out bg-gradient-to-br from-slate-100 to-slate-300 flex flex-col justify-between"
              >
                <Link href={`/job/${job.id}`}>
                  <p className="text-xl font-extrabold text-gray-900 transition-colors mb-2">
                    {job.title}
                  </p>
                  <p className="text-gray-700 font-bold">
                    <span className="font-bold text-gray-900">Company: </span>
                    {job.company_name}
                  </p>
                  <p className="text-sm text-red-900 font-bold mb-4">
                    <span className="font-bold text-gray-900">Category: </span>
                    {job.category}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    <span className="font-bold text-gray-900">
                      <LocationOnIcon />
                      Location:{' '}
                    </span>
                    {job.candidate_required_location}
                  </p>
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-4xl rounded-lg ${currentPage === 1 ? 'hidden' : ' text-white hover:bg-gray-700'}`}
            >
              ⏮️
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  indexOfLastJob < jobs.length ? prev + 1 : prev
                )
              }
              disabled={indexOfLastJob >= jobs.length}
              className={`px-4 py-2 text-4xl rounded-lg ${indexOfLastJob >= jobs.length ? 'hidden' : 'text-white hover:bg-gray-700'}`}
            >
              ⏭️
            </button>
          </div>
        </>
      )}
    </div>
  )
}
