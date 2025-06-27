import React from 'react';
import { SparklesIcon, CheckIcon } from '@heroicons/react/24/solid';

export interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'tab' | 'pill' | 'icon' | 'close' | 'dropdown' | 'kpi' | 'checkbox';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  selected = false,
  className = '',
  style = {},
  icon,
  iconPosition = 'right',
  onMouseEnter,
  onMouseLeave,
}) => {
  const baseClasses = 'flex items-center justify-center font-medium transition-all cursor-pointer';
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
  };

  const variantClasses = {
    primary: `bg-[#242424] border border-[#5A5A5A] text-white hover:bg-[#2A2A2A]`,
    secondary: `bg-[#23291E] border border-[#5A5A5A] text-[#C9FF3B] hover:bg-[#2A2F1E]`,
    tab: `text-white font-medium transition-all ${
      selected 
        ? 'bg-[#242424] border-[#5A5A5A]' 
        : 'bg-[#000000] border-transparent'
    }`,
    pill: `flex items-center h-[33px] px-4 py-1 rounded-full font-medium text-[15px] gap-2 transition ${
      selected 
        ? 'bg-[#CCFF001A] border-[#C9FF3B] text-[#C8E972FD]' 
        : 'bg-[#5959594D] border-[#EEEEEE] text-[#D5D5D5]'
    }`,
    icon: `w-[39px] h-[41px] bg-[#242424] rounded-[4px] border border-[#5A5A5A] flex items-center justify-center`,
    close: `text-white text-2xl hover:text-gray-300`,
    dropdown: `h-[32px] bg-[#18181A80] border border-[#5A5A5A] rounded-[5px] px-3 flex items-center text-[#FCFCFC]`,
    kpi: `bg-[#232323] text-white flex rounded text-sm items-center gap-2 px-1 border border-[#5A5A5A]`,
    checkbox: `w-4 h-4 rounded-full border-2 transition-colors ${
      selected
        ? 'bg-indigo-600 border-indigo-600'
        : 'bg-white border-gray-300'
    }`,
  };

  const renderPillContent = () => (
    <>
      <span className="flex-1 text-left">{children}</span>
      <span className="flex items-center gap-2">
        <span className={`flex items-center justify-center w-5 h-5 rounded-full p-[3px] ${
          !selected ? 'text-[#D5D5D5]' : 'text-[#C8E972FD]'
        }`}>
          <SparklesIcon className="size-[16px]" />
        </span>
        <span className={`flex items-center justify-center w-5 h-5 rounded-full p-[3px]`}>
          {selected ? (
            <CheckIcon className="size-[16px] text-[#C9FF3B]" />
          ) : (
            <svg width="16" height="16" fill="none" color='#D5D5D5' viewBox="0 0 20 20">
              <path d="M10 4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </span>
    </>
  );

  const renderIconContent = () => {
    if (!icon) return children;
    
    if (iconPosition === 'left') {
      return (
        <>
          <span className="flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
            {icon}
          </span>
          <span className="font-[Roobert_TRIAL] font-medium rounded">{children}</span>
        </>
      );
    }

    return (
      <>
        <span className="font-[Roobert_TRIAL] font-medium rounded">{children}</span>
        <span className="flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
          {icon}
        </span>
      </>
    );
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'tab':
        return {
          background: selected ? '#242424' : '#000000',
          border: selected ? '0.67px solid #5A5A5A' : '0.67px solid transparent',
          padding: '4px 12px',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          color: '#FFFFFF'
        };
      case 'pill':
        return {
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: '150%',
          letterSpacing: '-2%',
          backgroundColor: selected ? '#CCFF001A' : '#5959594D',
          borderRadius: '100px',
          border: selected ? '1px solid #C9FF3B' : '1px solid #EEEEEE',
          color: selected ? '#C8E972FD' : '#D5D5D5',
        };
      case 'primary':
        return {
          border: '1px solid rgba(90, 90, 90, 0.63)',
          backgroundColor: 'rgba(36, 36, 36, 1)',
        };
      case 'secondary':
        return {
          backgroundColor: '#23291E',
          color: '#C9FF3B'
        };
      case 'dropdown':
        return {
          border: '1px solid rgba(90, 90, 90, 0.63)',
          backgroundColor: 'rgba(36, 36, 36, 1)',
        };
      case 'kpi':
        return {
          border: '1px solid rgba(90, 90, 90, 0.63)',
          paddingTop: 0,
          paddingBottom: 0,
        };
      case 'checkbox':
        return {
          padding: 0,
          minWidth: '16px',
          minHeight: '16px',
        };
      default:
        return {};
    }
  };

  const combinedStyle = { ...getVariantStyles(), ...style };

  const renderContent = () => {
    if (variant === 'pill') {
      return renderPillContent();
    }
    if (variant === 'icon') {
      return icon || children;
    }
    if (variant === 'checkbox') {
      return selected ? (
        <svg className="w-2 h-2 text-white mx-auto" fill="currentColor" viewBox="0 0 8 8">
          <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z" />
        </svg>
      ) : null;
    }
    if (icon) {
      return renderIconContent();
    }
    return children;
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      style={combinedStyle}
    >
      {renderContent()}
    </button>
  );
};

export default Button; 