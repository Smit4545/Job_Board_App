"use client";

import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast"; // Import toast library
import { useDispatch } from "react-redux";
import { applyForJob } from "../../../redux/jobSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.number()
    .typeError("Phone must be a number")
    .max(9999999999, "Phone number too long")
    .min(1000000000, "Phone number too short"),
  resume: Yup.mixed()
    .required("Resume is required")
    .test(
      "fileFormat",
      "PDF only",
      (value) => value && (value as File).type === "application/pdf"
    )
    .test(
      "fileSize",
      "File size too large (max 5MB)",
      (value) => value && (value as File).size <= 5 * 1024 * 1024
    ),
});

export default function ApplyForm() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-slate-100 to-slate-300 shadow-lg rounded-lg p-6 border border-gray-200 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Apply for Job #{id}
        </h1>
        <Formik
          initialValues={{ name: "", email: "", phone: "", resume: null }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (values.resume) {
              const fileName = (values.resume as File).name; // Store only file name
              console.log(values.resume);
              toast.success("Applied successfully!");
              dispatch(
                applyForJob({
                  id: Number(id),
                  name: values.name,
                  email: values.email,
                  phone: values.phone,
                  resume: fileName, // Store file name, not file itself
                })
              );
              setSubmitting(false);
              setTimeout(() => {
                router.push("/applied");
              }, 1000);
            }
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-4">
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
              <div>
                <label className="block font-semibold text-black">
                  Resume (PDF only)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) =>
                    setFieldValue("resume", event.currentTarget.files?.[0])
                  }
                  className="w-full border text-black rounded p-2"
                />
                <ErrorMessage
                  name="resume"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-900 font-bold text-white px-4 py-2 rounded shadow hover:bg-red-800 transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
