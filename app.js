const express = require('express');
const app = express();

const courses = [
  { id: 1, title: 'JavaScript', duration: 40, level: 'beginner' },
  { id: 2, title: 'Node.js', duration: 60, level: 'advanced' },
  { id: 3, title: 'HTML и CSS', duration: 30, level: 'beginner' }
];

const lessons = {
  1: ['Переменные', 'Функции', 'Массивы'],
  2: ['Модули', 'Express', 'Маршрутизация'],
  3: ['HTML', 'CSS']
};

app.get('/courses', (req, res) => {
  res.json(courses);
});

app.get('/courses/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'ID должен быть положительным числом' });
  }

  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).json({ error: 'Курс не найден' });
  }

  res.json(course);
});

app.get('/courses/:id/lessons', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'ID должен быть положительным числом' });
  }

  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).json({ error: 'Курс не найден' });
  }

  res.json({
    course: course.title,
    lessons: lessons[id] || []
  });
});

app.get('/levels/:level/courses', (req, res) => {
  const level = req.params.level.toLowerCase();
  const result = courses.filter(c => c.level === level);

  res.json({
    level,
    count: result.length,
    courses: result
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.listen(3000, () => {
  console.log('Сервер запущен: http://localhost:3000');
});