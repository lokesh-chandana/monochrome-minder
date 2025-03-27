
import React from 'react';
import { Task } from '@/types';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, className }) => {
  return (
    <div 
      className={cn(
        "group flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors",
        className
      )}
    >
      <Checkbox 
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="data-[state=checked]:bg-black data-[state=checked]:border-black"
      />
      
      <div className="flex-1">
        <p className={cn("text-sm font-medium transition-all", task.completed && "task-done")}>
          {task.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
      
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </button>
    </div>
  );
};

export default TaskItem;
