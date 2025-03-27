
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TaskInputProps {
  onAddTask: (title: string) => void;
  className?: string;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, className }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title);
      setTitle('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("flex items-center gap-2 p-4 border-b", className)}
    >
      <div className="flex-1 relative">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
          className="pl-10 bg-accent border-none focus-visible:ring-1"
        />
        <Plus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
    </form>
  );
};

export default TaskInput;
