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
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 w-full max-w-2xl transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">{student.name}'s Attendance History</h2>
            <p className="text-sm text-gray-500">Detailed attendance records and statistics</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Attendance Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="group bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200/50 shadow-sm hover:shadow-md hover:from-green-100 hover:to-green-200 hover:border-green-300/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-green-700">Present</div>
              <div className="h-2 w-2 rounded-full bg-green-400 group-hover:ring-4 ring-green-400/20 transition-all duration-300"></div>
            </div>
            <div className="text-2xl font-bold text-green-800 group-hover:scale-105 transform transition-transform duration-300">{student.stats.present}</div>
          </div>
          <div className="group bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200/50 shadow-sm hover:shadow-md hover:from-red-100 hover:to-red-200 hover:border-red-300/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-red-700">Absent</div>
              <div className="h-2 w-2 rounded-full bg-red-400 group-hover:ring-4 ring-red-400/20 transition-all duration-300"></div>
            </div>
            <div className="text-2xl font-bold text-red-800 group-hover:scale-105 transform transition-transform duration-300">{student.stats.absent}</div>
          </div>
          <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200/50 shadow-sm hover:shadow-md hover:from-yellow-100 hover:to-yellow-200 hover:border-yellow-300/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-yellow-700">Late</div>
              <div className="h-2 w-2 rounded-full bg-yellow-400 group-hover:ring-4 ring-yellow-400/20 transition-all duration-300"></div>
            </div>
            <div className="text-2xl font-bold text-yellow-800 group-hover:scale-105 transform transition-transform duration-300">{student.stats.late}</div>
          </div>
          <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200/50 shadow-sm hover:shadow-md hover:from-orange-100 hover:to-orange-200 hover:border-orange-300/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-orange-700">Cutting</div>
              <div className="h-2 w-2 rounded-full bg-orange-400 group-hover:ring-4 ring-orange-400/20 transition-all duration-300"></div>
            </div>
            <div className="text-2xl font-bold text-orange-800 group-hover:scale-105 transform transition-transform duration-300">{student.stats.cutting}</div>
          </div>
        </div>

        {/* Recent Attendance Records */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Attendance Records</h3>
            <div className="text-sm text-gray-500">{student.recentAttendance.length} records found</div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200/80">
            <table className="min-w-full divide-y divide-gray-200/80">
              <thead className="bg-gradient-to-br from-gray-50/80 to-gray-100/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200/80">
                {student.recentAttendance.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/80 group transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                        {format(new Date(record.scanTime), 'MMM dd, yyyy')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                        {format(new Date(record.scanTime), 'hh:mm a')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {record.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 group-hover:shadow-sm ${
                        record.status === 'Present' ? 'bg-green-50 text-green-700 ring-green-200/50 group-hover:bg-green-100' :
                        record.status === 'Late' ? 'bg-yellow-50 text-yellow-700 ring-yellow-200/50 group-hover:bg-yellow-100' :
                        record.status === 'Absent' ? 'bg-red-50 text-red-700 ring-red-200/50 group-hover:bg-red-100' :
                        'bg-orange-50 text-orange-700 ring-orange-200/50 group-hover:bg-orange-100'
                      } transition-all duration-200`}>
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

import AttendanceStats from './components/AttendanceStats';
import ExportData from './components/ExportData';

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<AttendanceRecord['status'] | ''>('');
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

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = 
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = !selectedDate || format(new Date(record.scanTime), 'yyyy-MM-dd') === selectedDate;
    const matchesStatus = !selectedStatus || record.status === selectedStatus;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <AttendanceStats 
          totalRecords={attendanceRecords.filter(record => 
            record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.subject.toLowerCase().includes(searchQuery.toLowerCase())
          ).filter(record => !selectedDate || format(new Date(record.scanTime), 'yyyy-MM-dd') === selectedDate).length}
          present={filteredRecords.filter(r => r.status === 'Present').length}
          absent={filteredRecords.filter(r => r.status === 'Absent').length}
          late={filteredRecords.filter(r => r.status === 'Late').length}
          cutting={filteredRecords.filter(r => r.status === 'Cutting').length}
        />
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200/80 backdrop-blur-sm">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by student name, ID, or subject..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Status</label>
                <select
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as AttendanceRecord['status'] | '')}
                >
                  <option value="">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                  <option value="Cutting">Cutting</option>
                </select>
              </div>
              <div className="flex items-center">
                <ExportData filteredRecords={filteredRecords} />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200/80">
            <table className="min-w-full divide-y divide-gray-200/80">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200/80">
                {filteredRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer"
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-800">{record.studentId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-800">{record.studentName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{record.subject}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{format(new Date(record.scanTime), 'MMM dd, yyyy')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{format(new Date(record.scanTime), 'hh:mm a')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${
                        record.status === 'Present' ? 'bg-green-50 text-green-700 ring-green-200/50' :
                        record.status === 'Late' ? 'bg-yellow-50 text-yellow-700 ring-yellow-200/50' :
                        record.status === 'Absent' ? 'bg-red-50 text-red-700 ring-red-200/50' :
                        'bg-orange-50 text-orange-700 ring-orange-200/50'
                      } transition-colors duration-200`}>
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
