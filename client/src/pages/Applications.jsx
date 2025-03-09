// Applications.js
import React, { useState } from 'react';
import { Search, Filter, Briefcase } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios'



const Applications = () => {
  const [applications , setApplications] = useState([]);
  

  const UpdateDetails =async(email)=>{
    
    try{


      if (!email) {
        console.error("Email not found. Please log in.");
        return;
      }

      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AppDetails`, {
        params: { email },
      });
     

      if (response.data.success && Array.isArray(response.data.applications)) {
        const formattedData = response.data.applications.map(app => ({
          id: app._id,
          company: app.company,
          position: app.role,
          status: app.status,
          date: app.receivedAt ? app.receivedAt.substring(0, 10) : "No Date",
          logo: app.company ? app.company.charAt(0).toUpperCase() : "NA", 
        }));
  
        setApplications(formattedData);
      }
    
    
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const storedEmail = localStorage.getItem("userEmail");
    UpdateDetails(storedEmail);
  },[])

  const getStatusColor = (status) => {
    const colors = {
      Applied: "bg-blue-100 text-blue-800",
      Interview: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
      Offer: "bg-green-100 text-green-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
        
        <div className="flex space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2 text-gray-500" />
            <span>Filter</span>
          </button>

          {/* Add New Button */}
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150">
            + Add New
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Company</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Position</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Date Applied</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-medium">{app.logo}</span>
                    </div>
                    <span className="font-medium">{app.company}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{app.position}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-500">{app.date}</td>
                <td className="py-4 px-4">
                  <button className="text-indigo-600 hover:text-indigo-800">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;