import { useState } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskManager from './pages/TaskManager';
import PostsGallery from './pages/PostsGallery';

function App() {
  const [currentPage, setCurrentPage] = useState('tasks');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">PLP Task Manager</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-1 w-full">
          {currentPage === 'tasks' ? <TaskManager /> : <PostsGallery />}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
