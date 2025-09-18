'use client';

import { QRCodeSVG } from 'qrcode.react';

interface ViewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    studentId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    age: string;
    birthDate: string;
    gradeLevel: string;
    section: string;
    gender: string;
    address?: string;
    city?: string;
    province?: string;
    zipCode?: string;
    parentName?: string;
    parentContact?: string;
    emergencyContact?: string;
    emergencyContactName?: string;
    relationship?: string;
  } | null;
}

export default function ViewStudentModal({ isOpen, onClose, student }: ViewStudentModalProps) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative z-10">
        

        <div className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="text-base text-gray-900">{student.studentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-base text-gray-900">{student.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-base text-gray-900">{student.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-base text-gray-900">{student.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Birth Date</p>
                <p className="text-base text-gray-900">{student.birthDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="text-base text-gray-900">{student.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Grade Level</p>
                <p className="text-base text-gray-900">{student.gradeLevel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Section</p>
                <p className="text-base text-gray-900">{student.section}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-base text-gray-900">{student.gender}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Street Address</p>
                <p className="text-base text-gray-900">{student.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City/Municipality</p>
                <p className="text-base text-gray-900">{student.city || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Province</p>
                <p className="text-base text-gray-900">{student.province || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ZIP Code</p>
                <p className="text-base text-gray-900">{student.zipCode || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent/Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Parent/Guardian Name</p>
                <p className="text-base text-gray-900">{student.parentName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Parent/Guardian Contact</p>
                <p className="text-base text-gray-900">{student.parentContact || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Emergency Contact Name</p>
                <p className="text-base text-gray-900">{student.emergencyContactName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Emergency Contact Number</p>
                <p className="text-base text-gray-900">{student.emergencyContact || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Relationship to Student</p>
                <p className="text-base text-gray-900">{student.relationship || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student QR Code</h3>
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-white p-2 border border-gray-200 rounded-lg">
                <QRCodeSVG
                  value={JSON.stringify({
                    id: student.studentId,
                    name: student.fullName,
                    grade: student.gradeLevel,
                    section: student.section,
                    email: student.email,
                    contact: student.phoneNumber,
                    emergencyContact: student.emergencyContact,
                    timestamp: new Date().toISOString()
                  })}
                  size={192}
                  level="H"
                  includeMargin={true}
                />
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