export const filterTasks = (tasks, filter) => {
  if (filter === 'active') return tasks.filter(task => !task.completed);
  if (filter === 'completed') return tasks.filter(task => task.completed);
  return tasks;
};

export const getTaskStats = (tasks) => ({
  total: tasks.length,
  active: tasks.filter(t => !t.completed).length,
  completed: tasks.filter(t => t.completed).length
});

export const createTask = (text) => ({
  id: Date.now(),
  text: text.trim(),
  completed: false,
  createdAt: new Date().toISOString()
});