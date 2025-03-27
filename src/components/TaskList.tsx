
import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask,
  className
}) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className={cn("divide-y animate-in", className)}>
      {sortedTasks.length > 0 ? (
        sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No tasks yet</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
