import React from 'react';
import { filtersInfo } from '@/shared/lib/filters-helpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { HelpCircle } from 'lucide-react';
import { ScrollArea } from '@/shared/ui/scroll-area';

interface FiltersInfoProps {
  className?: string;
}

export function FiltersInfo({ className }: FiltersInfoProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          {filtersInfo.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p>{filtersInfo.description}</p>
        <p>{filtersInfo.schedulesInfo}</p>
        <p>{filtersInfo.defaultScheduleInfo}</p>
        <p>{filtersInfo.activeStateInfo}</p>
        
        <div className="border-t pt-2">
          <h4 className="font-medium mb-2">Доступные операторы:</h4>
          <div className="grid grid-cols-1 gap-1">
            <ScrollArea className="h-40 min-h-[8rem] w-auto">
              <div className="grid grid-cols-2 gap-2">
                <div>🟰 Равно</div>
                <div>🚫 Не равно</div>
                <div>📋 Содержит</div>
                <div>❌ Не содержит</div>
                <div>✅ Существует</div>
                <div>❎ Не существует</div>
                <div>📈 Больше чем</div>
                <div>📉 Меньше чем</div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 