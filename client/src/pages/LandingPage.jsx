import React from 'react';
import { ArrowRight, Mail, CheckCircle, Calendar, Bell } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";


const LandingPage = () => {

  

  const features = [
    { icon: <Mail className="w-6 h-6" />, title: "Email Integration", description: "Seamlessly connect with Gmail" },
    { icon: <CheckCircle className="w-6 h-6" />, title: "Smart Tracking", description: "AI-powered application monitoring" },
    { icon: <Calendar className="w-6 h-6" />, title: "Interview Calendar", description: "Never miss an interview" },
    { icon: <Bell className="w-6 h-6" />, title: "Real-time Updates", description: "Instant status notifications" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
    
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center ">
          <div className="inline-block mb-6 px-4 py-1 bg-indigo-100 mt-8 rounded-full">
            <span className="text-indigo-800 text-sm font-medium">
              🎉 Streamline Your Job Search
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Job Search with <br/>
            <span className="text-indigo-600"> AI-Powered </span> 
            Tracking
          </h1>

          <p className="text-xl text-gray-600 mb-8 mt-8">
          Stop struggling with messy spreadsheets and missed opportunities. 
          </p>
          
          <p className="text-xl text-gray-600 mb-8 mt-8">
            Let AI organize your job applications automatically. Track status, deadlines, and interviews—all from your Gmail inbox.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <div className='bg-indigo-600 rounded-lg  flex'>
            <FcGoogle className=' bg-white ml-0.5 mt-0.5 rounded-md' size={50} />
            <button onClick={() => window.location.href="http://localhost:3000/auth/google"} className="p-2 text-white rounded-lg font-medium shadow-lg hover:bg-indigo-700 transform hover:-translate-y-0.5 transition duration-200 flex items-center">
             Sign in with Google
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            </div>
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-medium shadow-lg hover:bg-gray-50 transform hover:-translate-y-0.5 transition duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-200">
                <div className="text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default LandingPage;