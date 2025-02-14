'use client'

import { useParams, useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Toaster, toast } from 'react-hot-toast' 
import { useDispatch } from 'react-redux'
import { applyForJob } from '../../../redux/jobSlice' 

// Define form validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'), 
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'), 
  phone: Yup.number()
    .typeError('Phone must be a number') 
    .max(9999999999, 'Phone number too long') 
    .min(1000000000, 'Phone number too short'), 
  resume: Yup.mixed()
    .required('Resume is required') 
    .test(
      'fileFormat',
      'PDF only', // Ensure file format is PDF
      (value) => value && (value as File).type === 'application/pdf'
    )
    .test(
      'fileSize',
      'File size too large (max 5MB)', // Ensure file size is within 5MB
      (value) => value && (value as File).size <= 5 * 1024 * 1024
    ),
})

export default function ApplyForm() {
  const { id } = useParams() // Get job ID from URL parameters
  const router = useRouter() 
  const dispatch = useDispatch() 

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Form Container */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-300 shadow-lg rounded-lg p-6 border border-gray-200 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Apply for Job #{id}
        </h1>

        {/* Formik Form */}
        <Formik
          initialValues={{ name: '', email: '', phone: '', resume: null }} // Define initial form values
          validationSchema={validationSchema} // Attach validation schema
          onSubmit={(values, { setSubmitting }) => {
            if (values.resume) {
              const fileName = (values.resume as File).name // Extract file name for storage
              console.log(values.resume) // Log file details (for debugging)

              // Show success notification
              toast.success('Applied successfully!')

              // Dispatch Redux action to store job application details
              dispatch(
                applyForJob({
                  id: Number(id),
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  resume: fileName, // Store file name, not actual file
                })
              )

              setSubmitting(false) // Set Formik submitting state to false

              // Redirect to applied jobs page after submission
              setTimeout(() => {
                router.push('/applied')
              }, 1000)
            }
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Input Field */}
              <div>
                <label className="block font-semibold text-black">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full border bg-slate-100 text-black rounded p-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email Input Field */}
              <div>
                <label className="block font-semibold text-black">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border bg-slate-100 text-black rounded p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Phone Input Field (Optional) */}
              <div>
                <label className="block font-semibold text-black">
                  Phone (Optional)
                </label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full border bg-slate-100 text-black rounded p-2"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Resume Upload Input */}
              <div>
                <label className="block font-semibold text-black">
                  Resume (PDF only)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={
                    (event) =>
                      setFieldValue('resume', event.currentTarget.files?.[0]) // Store selected file
                  }
                  className="w-full border text-black rounded p-2"
                />
                <ErrorMessage
                  name="resume"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting} // Disable button when submitting
                className="w-full bg-red-900 font-bold text-white px-4 py-2 rounded shadow hover:bg-red-800 transition"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}{' '}
                {/* Change button text when submitting */}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Toast Notification Container */}
      <Toaster position="top-center" />
    </div>
  )
}
