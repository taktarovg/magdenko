# Команды для обновления базы данных

## Применить новую миграцию
```bash
npx prisma migrate dev --name add_experts_and_events
```

## Сгенерировать Prisma Client
```bash
npx prisma generate
```

## Запустить проект
```bash
npm run dev
```

## Что добавлено:

### Новые модели:
1. **Expert** - эксперты/коллеги
2. **ExpertSlot** - слоты времени для записи
3. **Event** - события/афиша
4. **EventRegistration** - регистрации на события

### Новые страницы:
1. `/colleagues` - каталог экспертов
2. `/colleagues/[id]` - страница эксперта с записью
3. `/events` - афиша событий
4. `/events/[id]` - страница события (нужно создать)

### Обновлено:
- Header - новая навигация (Коллеги, Афиша)
- Footer - перенесены Тесты, Книги, Контакты

### API endpoints нужно создать:
- GET `/api/experts/[id]` - получить эксперта
- GET `/api/experts/[id]/slots` - получить слоты эксперта
- POST `/api/appointments` - запись на консультацию
- GET `/api/events/[id]` - получить событие
- POST `/api/events/[id]/register` - регистрация на событие
