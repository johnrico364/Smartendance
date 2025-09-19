export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  scanTime: string;
  status: 'Present' | 'Late' | 'Absent' | 'Cutting';
}

export interface StudentStats {
  present: number;
  absent: number;
  late: number;
  cutting: number;
}