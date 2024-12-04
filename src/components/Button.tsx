import React from 'react';
import clsx from 'clsx';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'black'; // Added 'black' variant
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-md font-medium transition-colors flex items-center justify-center',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
          'bg-black text-white hover:bg-gray-800': variant === 'black', // Added black variant
          'px-3 py-1.5 text-sm': size === 'small',
          'px-4 py-2': size === 'medium',
          'px-6 py-3 text-lg': size === 'large',
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner 
          size={size === 'large' ? 'medium' : 'small'} 
          className="border-current border-t-transparent"
        />
      ) : (
        children
      )}
    </button>
  );
}
