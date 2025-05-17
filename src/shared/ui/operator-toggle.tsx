import React from 'react';
import { Switch } from '@/shared/ui/switch';
import { operatorsMap, FilterOperator } from '@/shared/lib/filters-helpers';
import { cn } from '@/shared/lib/utils';

interface OperatorToggleProps {
  operator: FilterOperator;
  onChange: (operator: FilterOperator) => void;
  className?: string;
}

export function OperatorToggle({ operator, onChange, className }: OperatorToggleProps) {
  const operatorInfo = operatorsMap[operator];
  
  if (!operatorInfo || !operatorInfo.opposite) {
    return null; // Если нет противоположного оператора, не показываем переключатель
  }

  const oppositeOperator = operatorInfo.opposite;
  const oppositeInfo = operatorsMap[oppositeOperator];

  const handleToggle = (checked: boolean) => {
    onChange(checked ? oppositeOperator : operator);
  };

  const isNegative = operator === oppositeOperator;
  
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <span className="flex items-center gap-1">
        <span>{operatorInfo.emoji}</span>
        <span>{operatorInfo.label}</span>
      </span>
      
      <Switch 
        checked={isNegative}
        onCheckedChange={handleToggle}
      />
      
      <span className="flex items-center gap-1">
        <span>{oppositeInfo.emoji}</span>
        <span>{oppositeInfo.label}</span>
      </span>
    </div>
  );
} 