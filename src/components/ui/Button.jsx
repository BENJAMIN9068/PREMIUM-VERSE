import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg shadow-primary/25 border border-transparent',
        outline: 'border border-gray-600 text-white hover:bg-white/10 glass',
        ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
        danger: 'bg-error text-white hover:bg-red-600',
    };

    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    return (
        <button
            ref={ref}
            className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="mr-2 animate-spin-slow h-4 w-4 border-2 border-white border-t-transparent rounded-full block" />
            ) : null}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
