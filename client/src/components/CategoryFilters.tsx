import React from 'react';
import { Badge } from './ui/Badge';
import type { BadgeVariant } from './ui/Badge';

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: { value: string; label: string; variant: BadgeVariant }[] = [
    { value: 'all', label: 'All Categories', variant: 'primary' },
    { value: 'communication', label: 'Communication', variant: 'communication' },
    { value: 'fact', label: 'Fact / Event', variant: 'fact' },
    { value: 'transaction', label: 'Transaction / Sign', variant: 'transaction' },
    { value: 'incident', label: 'Incident / Dispute', variant: 'incident' },
    { value: 'legal', label: 'Legal / HR', variant: 'legal' },
    { value: 'other', label: 'Other', variant: 'other' },
  ];

  return (
    <div className="flex gap-2 py-3 px-4 sm:px-8 bg-[#131a2b]/15 border-b border-border-color overflow-x-auto shrink-0">
      {categories.map((cat) => (
        <Badge
          key={cat.value}
          variant={cat.value === selectedCategory ? cat.variant : 'primary'}
          isActive={cat.value === selectedCategory}
          onClick={() => onSelectCategory(cat.value)}
        >
          {cat.label}
        </Badge>
      ))}
    </div>
  );
};
export default CategoryFilters;
