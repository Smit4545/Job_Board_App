'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { toast, Toaster } from 'react-hot-toast'

export default function ResumeGenerator() {
  // State to manage form input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
  })

  // Handle changes in input fields and update state accordingly
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Function to generate a resume in PDF format
  const generatePDF = () => {
    const doc = new jsPDF() // Create a new PDF document
    doc.setFontSize(22)
    doc.text(`Resume of ${formData.name}`, 20, 20) // Set title
    doc.setFontSize(16)

    // Create a table with resume details
    autoTable(doc, {
      startY: 30, // Position where the table starts
      head: [['Field', 'Details']], // Table headers
      body: [
        ['Name', formData.name],
        ['Email', formData.email],
        ['Phone', formData.phone],
        ['Education', formData.education],
        ['Experience', formData.experience],
        ['Skills', formData.skills],
      ],
    })

    // Save the PDF with a dynamic filename based on the user's name
    doc.save(`resume_${formData.name}.pdf`)

    // Show a success message using toast notifications
    toast.success('Resume generated successfully')
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      {/* Toast notification container */}
      <Toaster position="top-right" />

      {/* Form container */}
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">
          Resume Generator
        </h2>

        {/* Resume input form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault() // Prevent default form submission behavior

            // Check if all fields are filled
            if (
              !formData.name ||
              !formData.email ||
              !formData.phone ||
              !formData.education ||
              !formData.experience ||
              !formData.skills
            ) {
              alert('Please fill out all fields before generating the resume.')
              return
            }

            generatePDF() // Call function to generate the PDF
          }}
        >
          {/* Input field for Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Input field for Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Input field for Phone Number */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            maxLength={10}
            minLength={10}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* Textarea for Education */}
          <textarea
            name="education"
            placeholder="Education"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.education}
            onChange={handleChange}
            required
          ></textarea>

          {/* Textarea for Experience */}
          <textarea
            name="experience"
            placeholder="Experience"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.experience}
            onChange={handleChange}
            required
          ></textarea>

          {/* Textarea for Skills */}
          <textarea
            name="skills"
            placeholder="Skills"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.skills}
            onChange={handleChange}
            required
          ></textarea>

          {/* Button to generate and download resume */}
          <button
            type="submit"
            className="w-full bg-red-900 font-bold text-white py-3 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Generate & Download Resume
          </button>
        </form>
      </div>
    </div>
  )
}
