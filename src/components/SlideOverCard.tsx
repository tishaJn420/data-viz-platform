import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { closeSlideOver } from '../store/slices/uiSlice';
import { updateVariable } from '../store/slices/variablesSlice';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const SlideOverCard = () => {
  const dispatch = useDispatch();
  const { variables } = useSelector((state: RootState) => state.variables);

  const handleClose = () => {
    dispatch(closeSlideOver());
  };

  const handleVariableChange = (variableId: string, value: number) => {
    dispatch(updateVariable({ id: variableId, value }));
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-xs sm:max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="px-3 sm:px-4 py-4 sm:py-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-medium text-gray-900">Edit Variables</h2>
                <Button
                  variant="close"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex-1 px-3 sm:px-4 sm:px-6 overflow-y-auto">
              <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
                {variables.map((variable) => (
                  <div key={variable.id} className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {variable.name}
                      </label>
                      <p className="mt-1 text-xs sm:text-sm text-gray-500">{variable.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-gray-600 gap-1">
                        <span>Current: {variable.value} {variable.unit}</span>
                        <span>Range: {variable.min} - {variable.max}</span>
                      </div>
                      
                      <input
                        type="range"
                        min={variable.min}
                        max={variable.max}
                        step={(variable.max - variable.min) / 100}
                        value={variable.value}
                        onChange={(e) => handleVariableChange(variable.id, parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{variable.min} {variable.unit}</span>
                        <span>{variable.max} {variable.unit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-3 sm:px-4 py-3 sm:py-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 bg-gray-50">
              <Button
                variant="secondary"
                onClick={handleClose}
                size="sm"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleClose}
                size="sm"
                className="w-full sm:w-auto"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideOverCard; 