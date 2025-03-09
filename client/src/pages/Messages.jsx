// Messages.js
import React from 'react';
import { Mail } from 'lucide-react';

const messages = [
  { id: 1, company: "Google", subject: "Interview Schedule", date: "2025-02-20", unread: true },
  { id: 2, company: "Microsoft", subject: "Application Update", date: "2025-02-19", unread: false },
  { id: 3, company: "Amazon", subject: "Thank You for Interviewing", date: "2025-02-18", unread: false }
];

const Messages = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Messages</h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <Mail className={`w-5 h-5 ${message.unread ? 'text-indigo-600' : 'text-gray-400'}`} />
              <div className="ml-4">
                <p className="font-medium text-gray-900">{message.subject}</p>
                <p className="text-sm text-gray-500">From {message.company} • {message.date}</p>
              </div>
            </div>
            {message.unread && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full">New</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages