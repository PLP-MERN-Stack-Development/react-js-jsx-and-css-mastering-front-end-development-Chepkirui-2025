import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { filterTasks, getTaskStats, createTask } from '../utils/taskUtils';
import Card from '../components/Card';
import Button from '../components/Button';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    console.log('Tasks loaded from localStorage:', tasks.length);
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      setTasks([...tasks, createTask(taskInput)]);
      setTaskInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = filterTasks(tasks, filter);
  const stats = getTaskStats(tasks);

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
            Manage your tasks efficiently. Add, complete, and organize your to-do list.
          </p>

          <form onSubmit={handleAddTask} className="w-full mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
              />
              <Button type="submit">Add Task</Button>
            </div>
          </form>

          <div className="w-full mb-4">
            <div className="flex gap-2 flex-wrap justify-center">
              <Button
                variant={filter === 'all' ? 'primary' : 'secondary'}
                onClick={() => setFilter('all')}
                className="text-sm"
              >
                All ({stats.total})
              </Button>
              <Button
                variant={filter === 'active' ? 'primary' : 'secondary'}
                onClick={() => setFilter('active')}
                className="text-sm"
              >
                Active ({stats.active})
              </Button>
              <Button
                variant={filter === 'completed' ? 'primary' : 'secondary'}
                onClick={() => setFilter('completed')}
                className="text-sm"
              >
                Completed ({stats.completed})
              </Button>
            </div>
          </div>

          <div className="w-full space-y-2 max-h-96 overflow-y-auto">
            {filteredTasks.length === 0 ? (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                {filter === 'all' ? 'No tasks yet. Add one above!' : `No ${filter} tasks.`}
              </p>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                    {task.text}
                  </span>
                  <Button 
                    variant="danger" 
                    onClick={() => deleteTask(task.id)} 
                    className="text-sm px-3 py-1"
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TaskManager;