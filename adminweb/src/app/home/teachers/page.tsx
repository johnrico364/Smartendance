'use client';

import { useState } from 'react';
import ViewTeacherModal from '../teachers/components/ViewTeacherModal';
import AddTeacherModal from '../teachers/components/AddTeacherModal';

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // Removed unused selectedStudent state to fix the error

  const teachers = [
    {
      teacherId: 'TCH-001',
      username: 'sthompson',
      name: 'Dr. Sarah Thompson',
      role: 'Teacher',
      subject: 'Mathematics',
      email: 'sarah.thompson@school.edu',
      phoneNumber: '123-456-7890',
      dateJoined: '2020-08-15',
      status: 'Active'
    },
    {
      teacherId: 'TCH-002',
      name: 'Prof. James Wilson',
      role: 'Teacher',
      subject: 'Physics',
      email: 'james.wilson@school.edu',
      phoneNumber: '123-456-7891',
      dateJoined: '2018-06-20',
      status: 'Active'
    },
    {
      teacherId: 'TCH-003',
      name: 'Ms. Emily Rodriguez',
      role: 'Teacher',
      subject: 'English Literature',
      email: 'emily.rodriguez@school.edu',
      phoneNumber: '123-456-7892',
      dateJoined: '2021-09-01',
      status: 'Active'
    },
    {
      teacherId: 'TCH-004',
      name: 'Mr. Michael Chen',
      role: 'Teacher',
      subject: 'Computer Science',
      email: 'michael.chen@school.edu',
      phoneNumber: '123-456-7893',
      dateJoined: '2019-07-10',
      status: 'Active'
    },
    {
      teacherId: 'TCH-005',
      name: 'Mrs. Lisa Anderson',
      role: 'Teacher',
      subject: 'History',
      email: 'lisa.anderson@school.edu',
      phoneNumber: '123-456-7894',
      dateJoined: '2017-08-25',
      status: 'Active'
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Teachers</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add Teacher
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search teachers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.teacherId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.teacherId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        teacher.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        className="bg-gray-900 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors"
                        onClick={() => {
                          setSelectedTeacher(teacher);
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

      <ViewTeacherModal 
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
      />

      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(teacherData) => {
          console.log('New teacher data:', teacherData);
          // Here you would typically make an API call to add the teacher
          setIsAddModalOpen(false);
        }}
      />
    </div>
  );
}
