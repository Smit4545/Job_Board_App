import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: number;
  title: string;
  company_name: string;
  category: string;
  candidate_required_location: string;
  salary?: string;
}

interface JobState {
  jobs: Job[];
  searchQuery: string;
  selectedCategory: string;
  appliedJobs: AppliedJob[];
}

interface AppliedJob {
  id: number;
  name: string;
  email: string;
  phone?: string;
  resume: string;
}

const initialState: JobState = {
  jobs: [],
  searchQuery: "",
  selectedCategory: "",
  appliedJobs: [],
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs(state, action: PayloadAction<Job[]>) {
      state.jobs = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    applyForJob: (state, action: PayloadAction<AppliedJob>) => {
      state.appliedJobs?.push(action.payload);
    },
    
  },
});

export const { setJobs, setSearchQuery, setSelectedCategory, applyForJob } =jobSlice.actions;
export default jobSlice.reducer;
