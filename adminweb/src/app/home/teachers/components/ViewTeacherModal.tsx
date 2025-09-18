'use client';

interface ViewTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: {
    teacherId: string;
    name: string;
    role: string;
    subject: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: string;
  } | null;
}

export default function ViewTeacherModal({ isOpen, onClose, teacher }: ViewTeacherModalProps) {
  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Teacher Information</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Teacher ID</p>
                <p className="text-base text-gray-900">{teacher.teacherId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-base text-gray-900">{teacher.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-base text-gray-900">{teacher.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="text-base text-gray-900">{teacher.subject}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`text-base ${
                  teacher.status === 'Active' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {teacher.status}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-base text-gray-900">{teacher.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-base text-gray-900">{teacher.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Date Joined</p>
                <p className="text-base text-gray-900">{new Date(teacher.dateJoined).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}