"use client"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { Search, BarChart } from "lucide-react";
import { setSearchQuery, setSelectedCategory } from "../../redux/jobSlice";
import Link from "next/link";

export default function SearchAndFilter() {
  const dispatch = useDispatch();
  const { searchQuery, selectedCategory } = useSelector(
    (state: RootState) => state.jobs
  );

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-slate-100 p-4 rounded-lg shadow-md">
      {/* Search Input */}
      <div className="relative w-full sm:w-2/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search jobs by title..."
          className="border border-gray-300 text-black bg-gray-100 pl-10 pr-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      {/* Category Dropdown */}
      <select
        className="border border-gray-300 text-black bg-gray-100 p-3 rounded w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        value={selectedCategory}
        onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
      >
        <option value="all">🌍 All Categories</option>
        <option value="customer-support">🎧 Customer Service</option>
        <option value="data">📊 Data Analysis</option>
        <option value="design">🎨 Design</option>
        <option value="finance-legal">⚖️ Finance / Legal</option>
        <option value="hr">👥 Human Resources</option>
        <option value="marketing">📢 Marketing</option>
        <option value="qa">🛠️ QA</option>
        <option value="sales-business">💼 Sales / Business</option>
        <option value="software-dev">💻 Software Development</option>
        <option value="writing">✍️ Writing</option>
      </select>

      {/* Analysis Button */}
      <Link
        href="/analysis"
        className="bg-slate-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 hover:bg-slate-500 transition-all"
      >
        <BarChart size={20} />
        Analysis
      </Link>
    </div>
  );
}
