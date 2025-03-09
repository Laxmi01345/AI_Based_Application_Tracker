import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Users, Calendar, BarChart } from "lucide-react";

const Stats = () => {
  const [totalApplications, setTotalApp] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [upcomingTasks, setUpcomingTasks] = useState(0);
  const [responseRate, setResponseRate] = useState(0);

  const stats = [
    { label: "Total Applications", value: totalApplications, icon: <Briefcase className="w-5 h-5" /> },
    { label: "Interviews", value: interviews, icon: <Users className="w-5 h-5" /> },
    { label: "Upcoming Tasks", value: upcomingTasks, icon: <Calendar className="w-5 h-5" /> },
    { label: "Response Rate", value: responseRate + "%", icon: <BarChart className="w-5 h-5" /> }
  ];

  const updateStats = async (email) => {
    if (!email) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/stats`, {
        params: { email },
      });

      console.log("API Response:", response.data.stats);

      if (response.data.success && Array.isArray(response.data.applications)) {
        const formattedData = response.data.applications;

        // Sum up all values across the array
        const totalApplicationsSum = formattedData.reduce((sum, app) => sum + (app.totalApplications || 0), 0);
        const interviewsSum = formattedData.reduce((sum, app) => sum + (app.interviews || 0), 0);
        const upcomingTasksSum = formattedData.reduce((sum, app) => sum + (app.upcomingTasks || 0), 0);
        const responseRateSum = formattedData.reduce((sum, app) => sum + (parseFloat(app.responseRate) || 0), 0);

        console.log(totalApplicationsSum)
        setTotalApp(totalApplicationsSum);
        setInterviews(interviewsSum);
        setUpcomingTasks(upcomingTasksSum);
        setResponseRate(responseRateSum / formattedData.length || 0); // Average response rate
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      updateStats(storedEmail);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
            <div className="text-indigo-600">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
