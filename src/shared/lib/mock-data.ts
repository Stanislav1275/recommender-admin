import { FieldMetadata, FieldMetadataTypeEnum } from '@/shared/api/generated/types/FieldMetadata';

export const mockTitleFields: FieldMetadata[] = [
  {
    name: 'is_erotic',
    description: 'Эротическое',
    type: 'boolean' as FieldMetadataTypeEnum,
    operators: ['equals', 'not_equals'],
    values: [
      { name: 'Да', value: true },
      { name: 'Нет', value: false }
    ]
  },
  {
    name: 'author',
    description: 'Автор',
    type: 'reference' as FieldMetadataTypeEnum,
    operators: ['equals', 'not_equals', 'in', 'not_in'],
    values: [
      { name: 'Пушкин А.С.', value: 'pushkin' },
      { name: 'Толстой Л.Н.', value: 'tolstoy' },
      { name: 'Достоевский Ф.М.', value: 'dostoevsky' }
    ]
  },
  {
    name: 'genre',
    description: 'Жанр',
    type: 'reference' as FieldMetadataTypeEnum,
    operators: ['equals', 'not_equals', 'in', 'not_in'],
    values: [
      { name: 'Роман', value: 'novel' },
      { name: 'Поэзия', value: 'poetry' },
      { name: 'Фантастика', value: 'sci-fi' },
      { name: 'Детектив', value: 'detective' }
    ]
  },
  {
    name: 'publish_year',
    description: 'Год издания',
    type: 'integer' as FieldMetadataTypeEnum,
    operators: ['equals', 'not_equals', 'greater_than', 'less_than'],
    values: null
  }
]; 