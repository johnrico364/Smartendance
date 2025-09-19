'use client';

interface LoadingSkeletonProps {
  type?: 'table' | 'card' | 'stats';
  count?: number;
}

export default function LoadingSkeleton({ type = 'table', count = 5 }: LoadingSkeletonProps) {
  if (type === 'stats') {
    return (
      <div className="dashboard-grid">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="stat-card animate-pulse">
            <div className="h-8 w-8 bg-gray-200 rounded-full mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="content-section animate-pulse">
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="content-section">
      <div className="table-container animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              {[...Array(6)].map((_, index) => (
                <th key={index}>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(count)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(6)].map((_, colIndex) => (
                  <td key={colIndex}>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}