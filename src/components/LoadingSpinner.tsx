import React from 'react';
import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function LoadingSpinner({
  size = 'medium',
  className
}: LoadingSpinnerProps) {
  return (
    <div
      className={clsx(
        'border-2 border-gray-300 border-t-white rounded-full animate-spin', // Changed border-t to white
        {
          'w-4 h-4': size === 'small',
          'w-6 h-6': size === 'medium',
          'w-8 h-8': size === 'large',
        },
        className
      )}
    />
  );
}
