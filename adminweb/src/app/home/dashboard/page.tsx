export default function DashboardPage() {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: '👥' },
    { title: 'Present Today', value: '1,180', icon: '✅' },
    { title: 'Absent Today', value: '54', icon: '❌' },
    { title: 'Total Classes', value: '32', icon: '📚' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of school attendance statistics</p>
      </div>

      <div className="dashboard-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-lg font-semibold text-gray-600">{stat.title}</div>
            <div className="text-2xl font-bold text-primary-dark">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="content-section">
        <h2 className="text-xl font-semibold mb-4 text-primary-dark">Recent Activity</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Student</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09:00 AM</td>
                <td>John Doe</td>
                <td>Mathematics</td>
                <td><span className="text-green-600">Present</span></td>
              </tr>
              <tr>
                <td>08:45 AM</td>
                <td>Jane Smith</td>
                <td>Physics</td>
                <td><span className="text-yellow-600">Late</span></td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
