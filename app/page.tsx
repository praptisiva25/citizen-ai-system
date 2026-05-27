"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {

  const [userId, setUserId] = useState("");

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  // -----------------------------------
  // SUBMIT
  // -----------------------------------

  const submitComplaint = async () => {

    if (!image) {

      alert("Please upload image");

      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const formData = new FormData();

          formData.append(
            "user_id",
            userId
          );

          formData.append(
            "title",
            title
          );

          formData.append(
            "description",
            description
          );

          formData.append(
            "latitude",
            position.coords.latitude.toString()
          );

          formData.append(
            "longitude",
            position.coords.longitude.toString()
          );

          formData.append(
            "image",
            image
          );

          const res = await axios.post(

            "http://localhost:8000/submit",

            formData,

            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

          alert(
            JSON.stringify(
              res.data,
              null,
              2
            )
          );

          setTitle("");
          setDescription("");
          setImage(null);

        } catch (err:any) {

          console.log(err);

          alert("Upload failed");

        } finally {

          setLoading(false);
        }
      }
    );
  };

  // -----------------------------------
  // UI
  // -----------------------------------

  return (

    <main className="max-w-2xl mx-auto p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">

          Citizen Complaint Portal

        </h1>

        <Link
          href="/clusters"
          className="bg-black text-white px-5 py-3 rounded"
        >
          View Clusters
        </Link>

      </div>

      {/* USER ID */}

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e)=>
          setUserId(e.target.value)
        }
      />

      {/* TITLE */}

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Complaint Title"
        value={title}
        onChange={(e)=>
          setTitle(e.target.value)
        }
      />

      {/* DESCRIPTION */}

      <textarea
        className="border p-3 w-full mb-4 rounded h-40"
        placeholder="Describe issue"
        value={description}
        onChange={(e)=>
          setDescription(e.target.value)
        }
      />

      {/* IMAGE */}

      <input
        type="file"
        className="mb-6"
        onChange={(e)=>{

          if (e.target.files?.[0]) {

            setImage(
              e.target.files[0]
            );
          }
        }}
      />

      {/* BUTTON */}

      <button
        onClick={submitComplaint}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded w-full"
      >

        {
          loading
            ? "Submitting..."
            : "Submit Complaint"
        }

      </button>

    </main>
  );
}