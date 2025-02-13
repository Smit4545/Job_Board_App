"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

export default function AppliedJobs() {
  const { appliedJobs } = useSelector((state: RootState) => state.jobs);
  

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Back to Home Button */}
      <div className="absolute  right-4 mb-6">
        <Link href="/">
          <button className="bg-white text-black font-semibold px-4 py-2 rounded-lg shadow-lg hover:opacity-90 transition">
          <HomeIcon/>
          </button>
        </Link>
      </div>

      <h1 className="text-3xl text-center font-extrabold mb-6">Applied Jobs</h1>
      <ul className="space-y-4 text-black font-bold bg-gradient-to-br from-slate-100 to-slate-300 p-4 rounded-lg">
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job, index) => (
            <li
              key={index}
              className="border border-gray-300 p-4 rounded-lg shadow-md"
            >
              <p className="font-semibold">Job ID: {job.id}</p>
              <p>Name: {job.name}</p>
              <p>Email: {job.email}</p>
              {job.phone && <p>Phone: {job.phone}</p>}
              <p className="text-red-900">Resume uploaded</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No applications submitted.</p>
        )}
      </ul>
    </div>
  );
}
