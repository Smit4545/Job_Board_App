import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the structure of a Job object
interface Job {
  id: number 
  title: string
  company_name: string 
  category: string 
  candidate_required_location: string
  salary?: string 
}

// Define the structure of an AppliedJob object
interface AppliedJob {
  id: number 
  name: string
  email: string 
  phone?: string 
  resume: string 
}

// Define the structure of the Redux store's state for jobs
interface JobState {
  jobs: Job[] 
  searchQuery: string 
  selectedCategory: string 
  appliedJobs: AppliedJob[] 
}

// Define the initial state of the job slice
const initialState: JobState = {
  jobs: [], 
  searchQuery: '',
  selectedCategory: '', 
  appliedJobs: [], 
}

// Create a Redux slice for job management
const jobSlice = createSlice({
  name: 'jobs', 
  initialState, 
  reducers: {
    // Action to update the job list
    setJobs(state, action: PayloadAction<Job[]>) {
      state.jobs = action.payload
    },

    // Action to update the search query
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload 
    },

    // Action to update the selected category
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload 
    },

    // Action to apply for a job
    applyForJob(state, action: PayloadAction<AppliedJob>) {
      state.appliedJobs.push(action.payload) 
    },
  },
})

// Export actions for use in components
export const { setJobs, setSearchQuery, setSelectedCategory, applyForJob } =
  jobSlice.actions

// Export the reducer to be included in the Redux store
export default jobSlice.reducer
