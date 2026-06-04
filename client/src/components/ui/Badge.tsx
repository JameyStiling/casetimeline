import React from 'react';

export type BadgeVariant =
  | 'communication'
  | 'fact'
  | 'transaction'
  | 'incident'
  | 'legal'
  | 'other'
  | 'high'
  | 'medium'
  | 'low'
  | 'primary'
  | 'secondary';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  onClick,
  isActive = false,
}) => {
  const getClassName = () => {
    const baseCatClass = "inline-flex items-center text-[0.75rem] font-medium px-2 py-0.5 rounded-sm border shadow-sm w-fit transition-all duration-150";
    const baseBadgeClass = "inline-flex items-center text-[0.7rem] font-semibold uppercase px-2 py-0.5 rounded-full w-fit border";

    switch (variant) {
      // Categories
      case 'communication':
        return `${baseCatClass} bg-cat-communication/10 border-cat-communication/30 text-cat-communication`;
      case 'fact':
        return `${baseCatClass} bg-cat-fact/10 border-cat-fact/30 text-cat-fact`;
      case 'transaction':
        return `${baseCatClass} bg-cat-transaction/10 border-cat-transaction/30 text-cat-transaction`;
      case 'incident':
        return `${baseCatClass} bg-cat-incident/10 border-cat-incident/30 text-cat-incident`;
      case 'legal':
        return `${baseCatClass} bg-cat-legal/10 border-cat-legal/30 text-cat-legal`;
      case 'other':
        return `${baseCatClass} bg-cat-other/10 border-cat-other/30 text-cat-other`;
      
      // Confidence Badges
      case 'high':
        return `${baseBadgeClass} bg-cat-fact/15 text-cat-fact border-cat-fact/30`;
      case 'medium':
        return `${baseBadgeClass} bg-cat-communication/15 text-cat-communication border-cat-communication/30`;
      case 'low':
        return `${baseBadgeClass} bg-cat-incident/15 text-cat-incident border-cat-incident/30`;
      
      // Active states
      case 'primary':
        return `${baseBadgeClass} ${isActive ? 'bg-brand-primary text-white border-transparent' : 'bg-transparent text-text-secondary border-border-color'}`;
      case 'secondary':
        return `${baseBadgeClass} bg-brand-secondary/8 text-brand-secondary border-brand-secondary/20`;
      default:
        return `${baseBadgeClass} bg-slate-500/15 text-slate-400 border-slate-500/30`;
    }
  };

  const className = getClassName();

  if (onClick) {
    return (
      <span
        className={`${className} cursor-pointer hover:scale-[1.03] active:scale-[0.97]`}
        onClick={onClick}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={className}>
      {children}
    </span>
  );
};
export default Badge;
