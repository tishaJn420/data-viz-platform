import type { Variable } from '../store/slices/variablesSlice';
import Button from './Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface VariablesPanelProps {
  variables: Variable[];
  onClose: () => void;
  onVariableChange: (variableId: string, newValue: number) => void;
}

const VariablesPanel = ({ variables, onClose, onVariableChange }: VariablesPanelProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">Variables</h3>
          <Button
            variant="icon"
            onClick={onClose}
            size="sm"
          >
            <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        {variables.map((variable) => {
          const step = (variable.max - variable.min) / 100;
          return (
            <div key={variable.id} className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  {variable.name}
                </label>
                <span className="text-xs sm:text-sm text-gray-500">
                  {variable.value} {variable.unit}
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-500">{variable.description}</p>
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-600 gap-1">
                  <span>Range: {variable.min} - {variable.max}</span>
                  <span>Step: {step.toFixed(2)}</span>
                </div>
                
                <input
                  type="range"
                  min={variable.min}
                  max={variable.max}
                  step={step}
                  value={variable.value}
                  onChange={(e) => onVariableChange(variable.id, parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            size="sm"
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            size="sm"
            className="w-full sm:w-auto"
          >
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VariablesPanel; 