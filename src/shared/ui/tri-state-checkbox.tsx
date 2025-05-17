import React from "react";
import { cn } from "@/shared/lib/utils";
import { Check, Minus, X } from "lucide-react";

export type TriStateValue = true | false | null;

export interface TriStateCheckboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: TriStateValue;
  onChange: (value: TriStateValue) => void;
  showClearButton?: boolean;
  onClear?: () => void;
}

export const TriStateCheckbox: React.FC<TriStateCheckboxProps> = ({
  value,
  onChange,
  className,
  showClearButton = false,
  onClear,
  ...props
}) => {
  const handleClick = () => {
    if (value === null) {
      onChange(true);
    } else if (value === true) {
      onChange(false);
    } else {
      onChange(null);
    }
  };

  const getIcon = () => {
    if (value === true) {
      return <Check className="w-3 h-3" />;
    } else if (value === false) {
      return <X className="w-3 h-3" />;
    } else {
      return <Minus className="w-3 h-3 opacity-50" />;
    }
  };

  const getLabel = () => {
    if (value === true) {
      return "Да";
    } else if (value === false) {
      return "Нет";
    } else {
      return "Не важно";
    }
  };

  const getBgClass = () => {
    if (value === true) {
      return "bg-info text-info-foreground";
    } else if (value === false) {
      return "bg-destructive text-destructive-foreground";
    } else {
      return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex items-center gap-2" {...props}>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all",
          getBgClass(),
          className
        )}
      >
        <div className={cn("flex-shrink-0 flex items-center justify-center")}>
          {getIcon()}
        </div>
        <span className="text-sm">{getLabel()}</span>
      </button>
      
      {showClearButton && (
        <button
          type="button"
          onClick={onClear}
          className="p-1 rounded-md hover:bg-muted cursor-pointer"
          aria-label="Очистить"
        >
          <X className="w-3 h-3 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}; 