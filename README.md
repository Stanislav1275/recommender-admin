# ReFlowML Recommender Admin

Административная панель для управления рекомендательной ML-системой, позволяющая настраивать, обучать и отслеживать работу рекомендательных алгоритмов.

## Возможности

- 🔄 Создание и редактирование конфигураций для рекомендательных моделей
- 🚀 Запуск обучения моделей с визуальной анимацией прогресса
- 📊 Мониторинг производительности моделей
- 📋 Интерактивная фильтрация наборов данных
- 🌐 Адаптивный интерфейс для мобильных и десктопных устройств

## Технологический стек

- **Frontend**: React, TypeScript, Vite
- **UI компоненты**: shadcn/ui, Tailwind CSS, Lucide Icons
- **Состояние**: TanStack Query (React Query)
- **Маршрутизация**: React Router
- **Валидация форм**: React Hook Form, Zod
- **API интеграция**: Kubb для генерации клиентов API
- **Уведомления**: Sonner Toast

## Особенности использования Kubb

В проекте активно используется [Kubb](https://github.com/kubb-project/kubb) - для генерации клиентов API на основе OpenAPI-спецификаций. Kubb автоматически создает:

- Строго типизированные хуки на основе React Query
- Типы моделей, основанные на схемах API
- Типобезопасные запросы с валидацией параметров

Конфигурация Kubb находится в файле `kubb.config.ts`:

```typescript
import { defineConfig } from '@kubb/core'
import createSwagger from '@kubb/swagger'
import createSwaggerTanstackQuery from '@kubb/swagger-tanstack-query'
import createSwaggerTS from '@kubb/swagger-ts'
import createSwaggerZod from '@kubb/swagger-zod'

export default defineConfig({
  root: '.',
  input: {
    path: 'http://77.2232.37.2532:80030/openapi.json',
  },
  output: {
    path: './src/shared/api/generated',
    clean: true,
  },
  hooks: {
    done: ['prettier --write "src/shared/api/generated/**/*.{ts,tsx}"'],
  },
  plugins: [
    // API документация
    createSwagger({
      output: false,
    }),
    
    // TypeScript типы
    createSwaggerTS({
      output: {
        path: './types',
      },
    }),
    
    // Zod схемы для валидации запросов/ответов
    createSwaggerZod({
      output: {
        path: './schemas',
      },
    }),
    
    // React Query хуки для работы с API
    createSwaggerTanstackQuery({
      output: {
        path: './',
      },
      client: {
        // Настройка HTTP-клиента
        implementation: 'axios',
        instance: {
          path: '../../api-instance/instance',
          default: true, 
        }
      },
    }),
  ],
})
```



## Установка и запуск

### Требования

- Node.js 22+ или выше
- PNPM 8.x или выше

### Установка зависимостей

```bash
pnpm install
```

### Генерация API-клиента

```bash
pnpm kubb
```

### Запуск проекта в режиме разработки

```bash
pnpm dev
```

### Сборка для production

```bash
pnpm build
```

## Работа с рекомендательной системой

1. **Создание конфигурации**: Установите параметры обучения модели через удобные формы
2. **Настройка фильтров**: Выберите данные для обучения модели с помощью интерактивных фильтров
3. **Запуск обучения**: Запустите процесс обучения модели с анимированным отображением прогресса
4. **Мониторинг**: Отслеживайте статус и производительность моделей в реальном времени

## Лицензия

MIT
