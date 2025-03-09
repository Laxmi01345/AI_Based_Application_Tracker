// Calendar.js
import React from 'react';
import { Clock } from 'lucide-react';

const upcomingEvents = [
  { id: 1, type: "Interview", company: "Google", date: "2025-02-24", time: "10:00 AM" },
  { id: 2, type: "Technical Test", company: "Microsoft", date: "2025-02-25", time: "2:00 PM" },
  { id: 3, type: "Follow-up", company: "Amazon", date: "2025-02-26", time: "11:30 AM" }
];

const Calendar = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="flex items-center p-4 border rounded-lg">
            <div className="p-3 bg-indigo-100 rounded-full">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="font-medium text-gray-900">{event.type} with {event.company}</p>
              <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar