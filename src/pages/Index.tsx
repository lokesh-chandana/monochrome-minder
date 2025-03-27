
import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import Header from '@/components/Header';
import ProjectList from '@/components/ProjectList';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';

const Index = () => {
  const {
    tasks,
    projects,
    activeProject,
    addTask,
    toggleTask,
    deleteTask,
    addProject,
    deleteProject,
    setActiveProject
  } = useTasks();

  // Find the active project name
  const activeProjectName = projects.find(p => p.id === activeProject)?.name || 'Tasks';

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 border-r hidden md:block overflow-y-auto">
          <ProjectList
            projects={projects}
            activeProject={activeProject}
            onSelectProject={setActiveProject}
            onAddProject={addProject}
            onDeleteProject={deleteProject}
          />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-medium">{activeProjectName}</h1>
          </div>
          
          <TaskInput onAddTask={addTask} />
          
          <div className="flex-1 overflow-y-auto">
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
