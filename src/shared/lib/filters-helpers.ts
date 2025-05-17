export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'less_than'
  | 'in'
  | 'not_in'
  | 'exists'
  | 'not_exists';

export interface OperatorInfo {
  label: string;        
  description: string;  
  emoji: string;       
  opposite?: FilterOperator; 
}

export const operatorsMap: Record<FilterOperator, OperatorInfo> = {
  'equals': { 
    label: 'Равно', 
    description: 'Выбирает значения, равные указанному',
    emoji: '🟰',
    opposite: 'not_equals'
  },
  'not_equals': { 
    label: 'Не равно', 
    description: 'Исключает значения, равные указанному',
    emoji: '🚫',
    opposite: 'equals'
  },
  'in': { 
    label: 'Содержит', 
    description: 'Выбирает значения, содержащиеся в указанном списке',
    emoji: '📋',
    opposite: 'not_in'
  },
  'not_in': { 
    label: 'Не содержит', 
    description: 'Исключает значения, содержащиеся в указанном списке',
    emoji: '❌',
    opposite: 'in'
  },
  'exists': { 
    label: 'Существует', 
    description: 'Выбирает записи, в которых поле существует',
    emoji: '✅',
    opposite: 'not_exists'
  },
  'not_exists': { 
    label: 'Не существует', 
    description: 'Исключает записи, в которых поле существует',
    emoji: '❎',
    opposite: 'exists'
  },
  'greater_than': { 
    label: 'Больше чем', 
    description: 'Выбирает значения, больше указанного',
    emoji: '📈',
    opposite: 'less_than'
  },
  'less_than': { 
    label: 'Меньше чем', 
    description: 'Выбирает значения, меньше указанного',
    emoji: '📉',
    opposite: 'greater_than'
  }
};

export const filtersInfo = {
  title: '📊 Как работают фильтры',
  description: 'Фильтры применяются во время обучения модели рекомендаций. По этим параметрам отбираются произведения, используемые для обучения модели.',
  schedulesInfo: '⏰ Расписание необходимо для определения частоты и времени обучения модели.',
  defaultScheduleInfo: '🔄 После создания конфигурации автоматически ставится обучение на 04:00 каждый день.',
  activeStateInfo: '🚀 После создания конфигурации параметр is_active=false. После установки is_active=true начнется процесс обучения.'
}; 