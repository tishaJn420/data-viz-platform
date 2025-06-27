import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface DataPointDetailsProps {
  dataPoint: any;
  onClose: () => void;
}

const DataPointDetails = ({ dataPoint, onClose }: DataPointDetailsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200); // Wait for fade-out animation
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
        <div
          className={`bg-white rounded-lg shadow-xl border border-gray-200 p-4 sm:p-6 max-w-sm sm:max-w-md w-full pointer-events-auto transition-all duration-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Data Point Details</h3>
            <Button
              variant="close"
              onClick={handleClose}
            >
              <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Time</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{dataPoint.time}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">Variable</p>
                  <p className="text-sm sm:text-lg font-semibold text-gray-900">{dataPoint.variable}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-600">Current Value</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-900">{dataPoint.value}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs sm:text-sm text-blue-600">Status</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Normal
                  </span>
                </div>
              </div>
            </div>

            {/* Additional data points */}
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">All Values at {dataPoint.time}</h4>
              <div className="space-y-1 sm:space-y-2">
                {Object.entries(dataPoint).map(([key, value]) => {
                  if (key !== 'time' && key !== 'variable' && typeof value === 'number') {
                    return (
                      <div key={key} className="flex justify-between items-center py-1">
                        <span className="text-xs sm:text-sm text-gray-600">{key}</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">{value}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
              <Button
                variant="primary"
                onClick={handleClose}
                className="flex-1"
                size="sm"
              >
                Close
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                size="sm"
              >
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPointDetails; 