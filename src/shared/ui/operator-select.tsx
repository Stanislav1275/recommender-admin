import React from 'react';
import { Repeat } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { operatorsMap, FilterOperator } from '@/shared/lib/filters-helpers';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/shared/ui/select';

interface OperatorSelectProps {
  operator: string;
  operators: string[];
  onChange: (operator: string) => void;
  className?: string;
}

export function OperatorSelect({ operator, operators, onChange, className }: OperatorSelectProps) {
  const isValidOperator = operator in operatorsMap;
  
  const operatorInfo = isValidOperator ? operatorsMap[operator as FilterOperator] : null;
  
  const oppositeOperator = operatorInfo?.opposite;
  
  const handleChange = (op: string) => {
    onChange(op);
  };
  
  const handleToggle = () => {
    if (operatorInfo?.opposite && operators.includes(operatorInfo.opposite)) {
      onChange(operatorInfo.opposite);
    }
  };
  
  return (
    <div className="flex items-center gap-1">
      <Select
        value={operator}
        onValueChange={handleChange}
      >
        <SelectTrigger className="bg-background cursor-pointer">
          <SelectValue placeholder="Оператор">
            {isValidOperator && (
              <span className="flex items-center gap-1">
                <span>{operatorInfo.emoji}</span>
                <span>{operatorInfo.label}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-background backdrop-blur-lg shadow-lg">
          {operators.map((op) => (
            <SelectItem
              key={op}
              value={op}
              className="cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {op in operatorsMap && operatorsMap[op as FilterOperator]?.emoji}
                {op in operatorsMap ? operatorsMap[op as FilterOperator]?.label : op}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {oppositeOperator && operators.includes(oppositeOperator) && (
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          title={`Изменить на ${operatorsMap[oppositeOperator as FilterOperator]?.label || oppositeOperator}`}
          onClick={handleToggle}
        >
          <Repeat className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
} 