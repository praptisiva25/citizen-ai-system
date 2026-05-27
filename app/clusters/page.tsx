"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import Link from "next/link";

export default function ClustersPage() {

  const [clusters, setClusters] = useState([]);

  const [loading, setLoading] = useState(true);

  // -----------------------------------
  // FETCH CLUSTERS
  // -----------------------------------

  async function fetchClusters() {

    try {

      const res = await axios.get(
        "http://localhost:8000/clusters"
      );

      setClusters(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  }

  // -----------------------------------
  // DELETE CLUSTER
  // -----------------------------------

  async function deleteCluster(
    clusterId:number
  ){

    try {

      await axios.delete(
        `http://localhost:8000/cluster/${clusterId}`
      );

      fetchClusters();

    } catch(err){

      console.log(err);
    }
  }

  // -----------------------------------
  // LOAD
  // -----------------------------------

  useEffect(()=>{

    fetchClusters();

  },[]);

  // -----------------------------------
  // UI
  // -----------------------------------

  if(loading){

    return (

      <div className="p-10 text-2xl">

        Loading clusters...

      </div>
    )
  }

  return (

    <main className="p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">

          All Clusters

        </h1>

        <Link
          href="/"
          className="bg-black text-white px-5 py-3 rounded"
        >
          Back
        </Link>

      </div>

      {/* NO CLUSTERS */}

      {
        clusters.length === 0 && (

          <div className="text-xl">

            No clusters found

          </div>
        )
      }

      {/* CLUSTERS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          clusters.map((cluster:any)=>(

            <div
              key={cluster.cluster_id}
              className="border rounded-xl p-6 shadow"
            >

              <h2 className="text-2xl font-bold mb-4">

                Cluster #{cluster.cluster_id}

              </h2>

              <p className="mb-2">

                <b>Category:</b>
                {" "}
                {cluster.category}

              </p>

              <p className="mb-2">

                <b>Department:</b>
                {" "}
                {cluster.department}

              </p>

              <p className="mb-2">

                <b>Status:</b>
                {" "}
                {cluster.status}

              </p>

              <p className="mb-5">

                <b>Total Complaints:</b>
                {" "}
                {cluster.complaints.length}

              </p>

              <div className="flex gap-3">

                {/* VIEW */}

                <Link
                  href={`/clusters/${cluster.cluster_id}`}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  View
                </Link>

                {/* DELETE */}

                <button
                  onClick={()=>
                    deleteCluster(
                      cluster.cluster_id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </main>
  );
}