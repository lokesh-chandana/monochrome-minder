
import { useState, useEffect } from 'react';
import { Task, Project } from '@/types';
import { toast } from '@/components/ui/use-toast';

// Default projects
const defaultProjects: Project[] = [
  { id: 'inbox', name: 'Inbox' },
  { id: 'today', name: 'Today' },
  { id: 'upcoming', name: 'Upcoming' }
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });

  const [activeProject, setActiveProject] = useState<string>('inbox');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Get filtered tasks based on active project
  const filteredTasks = tasks.filter(task => task.projectId === activeProject);

  // Add a new task
  const addTask = (title: string) => {
    if (!title.trim()) return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      projectId: activeProject,
      createdAt: new Date()
    };
    
    setTasks(prev => [newTask, ...prev]);
    toast({
      description: "Task added",
    });
  };

  // Toggle task completion
  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      description: "Task deleted",
    });
  };

  // Add a new project
  const addProject = (name: string) => {
    if (!name.trim()) return;
    
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: name.trim()
    };
    
    setProjects(prev => [...prev, newProject]);
    toast({
      description: "Project added",
    });
  };

  // Delete a project and all its tasks
  const deleteProject = (id: string) => {
    // Don't allow deleting default projects
    if (defaultProjects.some(p => p.id === id)) return;
    
    setProjects(prev => prev.filter(project => project.id !== id));
    setTasks(prev => prev.filter(task => task.projectId !== id));
    
    // If the active project is deleted, switch to inbox
    if (activeProject === id) {
      setActiveProject('inbox');
    }
    
    toast({
      description: "Project deleted",
    });
  };

  return {
    tasks: filteredTasks,
    projects,
    activeProject,
    addTask,
    toggleTask,
    deleteTask,
    addProject,
    deleteProject,
    setActiveProject
  };
}
