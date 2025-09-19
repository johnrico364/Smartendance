import StatsCard from './StatsCard';

interface AttendanceStatsProps {
  totalRecords: number;
  present: number;
  absent: number;
  late: number;
  cutting: number;
}

export default function AttendanceStats({ totalRecords, present, absent, late, cutting }: AttendanceStatsProps) {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      <StatsCard label="Total Records" value={totalRecords} variant="default" />
      <StatsCard label="Present" value={present} variant="success" />
      <StatsCard label="Absent" value={absent} variant="danger" />
      <StatsCard label="Late" value={late} variant="warning" />
      <StatsCard label="Cutting" value={cutting} variant="caution" />
    </div>
  );
}