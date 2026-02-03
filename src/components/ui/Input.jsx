import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ label, error, icon: Icon, className, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>}
            <div className="relative group">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    ref={ref}
                    className={twMerge(
                        clsx(
                            'w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all glass',
                            Icon ? 'pl-10' : 'pl-4',
                            'pr-4 py-2.5',
                            error && 'border-error focus:ring-error/50',
                            className
                        )
                    )}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-xs text-error">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
