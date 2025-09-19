import { format } from 'date-fns';
import { AttendanceRecord } from '../types';

interface ExportDataProps {
  filteredRecords: AttendanceRecord[];
}

export default function ExportData({ filteredRecords }: ExportDataProps) {
  const handleExport = () => {
    // Add attendance stats at the top
    const statsData = [
      ['Attendance Statistics'],
      ['Total Records', filteredRecords.length.toString()],
      ['Present', filteredRecords.filter(r => r.status === 'Present').length.toString()],
      ['Absent', filteredRecords.filter(r => r.status === 'Absent').length.toString()],
      ['Late', filteredRecords.filter(r => r.status === 'Late').length.toString()],
      ['Cutting', filteredRecords.filter(r => r.status === 'Cutting').length.toString()],
      [], // Empty line for separation
    ];

    // Convert the filtered records to CSV format
    const headers = ['Student ID', 'Name', 'Subject', 'Date', 'Time', 'Status'];
    const csvData = filteredRecords.map(record => [
      record.studentId,
      record.studentName,
      record.subject,
      format(new Date(record.scanTime), 'yyyy-MM-dd'),
      format(new Date(record.scanTime), 'hh:mm a'),
      record.status
    ]);
    
    // Create CSV content with stats at the top
    const csvContent = [
      ...statsData.map(row => row.map(cell => `"${cell}"`).join(',')),
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_records_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-sm font-semibold text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export Data
    </button>
  );
}