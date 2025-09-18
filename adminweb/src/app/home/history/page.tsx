'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  scanTime: string;
  status: 'Present' | 'Late' | 'Absent' | 'Cutting';
}

interface StudentStats {
  present: number;
  absent: number;
  late: number;
  cutting: number;
}

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: string;
    name: string;
    stats: StudentStats;
    recentAttendance: AttendanceRecord[];
  } | null;
}

function StudentDetailsModal({ isOpen, onClose, student }: StudentDetailsModalProps) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{student.name}'s Attendance History</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Attendance Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <div className="font-semibold text-green-800">Present</div>
            <div className="text-2xl text-green-900">{student.stats.present}</div>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <div className="font-semibold text-red-800">Absent</div>
            <div className="text-2xl text-red-900">{student.stats.absent}</div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <div className="font-semibold text-yellow-800">Late</div>
            <div className="text-2xl text-yellow-900">{student.stats.late}</div>
          </div>
          <div className="bg-orange-100 p-4 rounded-lg">
            <div className="font-semibold text-orange-800">Cutting</div>
            <div className="text-2xl text-orange-900">{student.stats.cutting}</div>
          </div>
        </div>

        {/* Recent Attendance Records */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Recent Attendance Records</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.recentAttendance.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(record.scanTime), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(record.scanTime), 'hh:mm a')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === 'Present' ? 'bg-green-100 text-green-800' :
                        record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                        record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  type SelectedStudent = {
    id: string;
    name: string;
    stats: StudentStats;
    recentAttendance: AttendanceRecord[];
  };
  const [selectedStudent, setSelectedStudent] = useState<SelectedStudent | null>(null);

  // Mock data for demonstration
  const attendanceRecords: (AttendanceRecord & { stats: StudentStats; recentAttendance: AttendanceRecord[] })[] = [
    {
      id: '1',
      studentId: 'STU-001',
      studentName: 'John Doe',
      subject: 'Mathematics',
      scanTime: '2025-09-18T08:15:00',
      status: 'Present' as const,
      stats: {
        present: 15,
        absent: 1,
        late: 2,
        cutting: 2
      },
      recentAttendance: [
        { id: 'a1', studentId: 'STU-001', studentName: 'John Doe', subject: 'Mathematics', scanTime: '2025-09-18T08:15:00', status: 'Present' as const },
        { id: 'a2', studentId: 'STU-001', studentName: 'John Doe', subject: 'English', scanTime: '2025-09-17T09:30:00', status: 'Late' as const },
        { id: 'a3', studentId: 'STU-001', studentName: 'John Doe', subject: 'Science', scanTime: '2025-09-16T10:00:00', status: 'Cutting' as const }
      ]
    },
    {
      id: '2',
      studentId: 'STU-002',
      studentName: 'Jane Smith',
      subject: 'English',
      scanTime: '2025-09-18T09:00:00',
      status: 'Late' as const,
      stats: {
        present: 12,
        absent: 2,
        late: 3,
        cutting: 1
      },
      recentAttendance: [
        { id: 'b1', studentId: 'STU-002', studentName: 'Jane Smith', subject: 'English', scanTime: '2025-09-18T09:00:00', status: 'Late' as const },
        { id: 'b2', studentId: 'STU-002', studentName: 'Jane Smith', subject: 'Mathematics', scanTime: '2025-09-17T08:00:00', status: 'Present' as const },
        { id: 'b3', studentId: 'STU-002', studentName: 'Jane Smith', subject: 'Science', scanTime: '2025-09-16T10:15:00', status: 'Absent' as const }
      ]
    }
  ];

  const filteredRecords = attendanceRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Attendance History</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by student name, ID, or subject..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setSelectedStudent({
                        id: record.studentId,
                        name: record.studentName,
                        stats: record.stats,
                        recentAttendance: record.recentAttendance
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.studentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(record.scanTime), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(record.scanTime), 'hh:mm a')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        record.status === 'Present' ? 'bg-green-100 text-green-800' :
                        record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                        record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <StudentDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </div>
  );
}
