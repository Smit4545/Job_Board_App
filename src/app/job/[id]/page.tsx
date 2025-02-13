"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store";
import DOMPurify from "dompurify";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast, Toaster } from "react-hot-toast";

interface Job {
  id: number;
  title: string;
  company_name: string;
  category: string;
  candidate_required_location: string;
  description?: string;
}

export default function JobDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { jobs, appliedJobs } = useSelector((state: RootState) => state.jobs); // Get appliedJobs from Redux
  const [job, setJob] = useState<Job | null>(null);
  const [more, setMore] = useState(false);
  

  useEffect(() => {
    if (id) {
      const foundJob = jobs.find((job) => job.id === Number(id));
      if (foundJob) setJob(foundJob);
    }
  }, [id, jobs]);

  if (!job) {
    return <p className="text-center text-gray-500">Loading job details...</p>;
  }

  // Function to clean and limit description
  const cleanDescription = (desc: string | undefined) => {
    if (!desc) return "No description available.";
    const sanitized = DOMPurify.sanitize(desc, { ALLOWED_TAGS: [] }); // Remove HTML tags
    return sanitized;
  };

  // Function to handle job application
  const handleApply = () => {
    const alreadyApplied = appliedJobs.some(
      (appliedJob) => appliedJob.id === job.id
    );

    if (alreadyApplied) {
      toast.error("You have already applied for this job!");
    } else {
      router.push(`/apply/${job.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="bg-gradient-to-br from-slate-100 to-slate-300 shadow-xl rounded-lg p-8 border border-gray-200 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>

        <p className="text-lg text-gray-700 font-medium">
          <span className="font-bold text-gray-900">Company: </span>
          {job.company_name}
        </p>

        <p className="text-sm text-red-900 font-semibold mb-4">
          <span className="font-bold text-gray-900">Category: </span>
          {job.category}
        </p>

        <p className="text-gray-700 font-semibold text-base leading-relaxed mb-6">
          <span className="font-bold text-gray-900">Description: </span>
          <span className="font-bold text-gray-900">Description: </span>
          {more
            ? cleanDescription(job.description)
            : cleanDescription(job.description)
                ?.split(" ")
                .slice(0, 75)
                .join(" ") + "..."}
          <span>
            {job.description && job.description.split(" ").length > 75 && (
              <button
                className="text-blue-600 hover:underline font-semibold"
                onClick={() => setMore(!more)}
              >
                {more ? "Show Less" : "See More"}
              </button>
            )}
          </span>
        </p>
        <p className="text-md font-semibold text-gray-900">
          <span className="font-bold text-gray-900">
            <LocationOnIcon /> Location:{" "}
          </span>
          {job.candidate_required_location}
        </p>
        <button
          onClick={handleApply}
          className="mt-6 w-full bg-red-900 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition-all"
        >
          Apply Now
        </button>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
