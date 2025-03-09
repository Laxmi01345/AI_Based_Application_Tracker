import React from 'react';
import { FileText, Paperclip } from 'lucide-react';

const documents = [
  { id: 1, name: "Resume_Software_Dev.pdf", type: "Resume", date: "2025-02-20" },
  { id: 2, name: "Cover_Letter_Google.pdf", type: "Cover Letter", date: "2025-02-19" },
  { id: 3, name: "Portfolio_2025.pdf", type: "Portfolio", date: "2025-02-18" }
];

const Documents = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Documents</h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-gray-400" />
              <div className="ml-4">
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
              </div>
            </div>
            <button className="flex items-center text-indigo-600 hover:text-indigo-800">
              <Paperclip className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents ;