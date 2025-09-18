'use client';

import { useState } from 'react';
import AddStudentModal from './components/AddStudentModal';
import ViewStudentModal from './components/ViewStudentModal';

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    { 
      studentId: 'STU-001', 
      fullName: 'Alice Johnson', 
      gradeLevel: 'Grade 10', 
      section: 'A', 
      gender: 'Female',
      email: 'alice.j@school.edu',
      phoneNumber: '123-456-7890',
      age: '16',
      birthDate: '2009-05-15',
      address: '123 Main St',
      city: 'Springfield',
      province: 'State',
      zipCode: '12345',
      parentName: 'Mary Johnson',
      parentContact: '123-456-7891',
      emergencyContactName: 'John Johnson',
      emergencyContact: '123-456-7892',
      relationship: 'Father'
    },
    { 
      studentId: 'STU-002', 
      fullName: 'Brian Chen', 
      gradeLevel: 'Grade 10', 
      section: 'A', 
      gender: 'Male',
      email: 'brian.c@school.edu',
      phoneNumber: '123-456-7893',
      age: '16',
      birthDate: '2009-03-20',
      address: '456 Oak St',
      city: 'Springfield',
      province: 'State',
      zipCode: '12345',
      parentName: 'Wei Chen',
      parentContact: '123-456-7894',
      emergencyContactName: 'Li Chen',
      emergencyContact: '123-456-7895',
      relationship: 'Mother'
    },
  ];

  const filteredStudents = students.filter(student =>
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Removed status color function as it's no longer needed

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add
        </button>
        
        <AddStudentModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(studentData) => {
            console.log('New student data:', studentData);
            // Here you would typically make an API call to add the student
          }}
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.studentId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.gradeLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        className="bg-gray-900 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors"
                        onClick={() => {
                          setSelectedStudent(student);
                          setIsViewModalOpen(true);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ViewStudentModal 
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </div>
  );
}