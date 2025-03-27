
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Project } from '@/types';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProjectListProps {
  projects: Project[];
  activeProject: string;
  onSelectProject: (id: string) => void;
  onAddProject: (name: string) => void;
  onDeleteProject: (id: string) => void;
  className?: string;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onAddProject,
  onDeleteProject,
  className
}) => {
  const [newProjectName, setNewProjectName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      onAddProject(newProjectName);
      setNewProjectName('');
      setIsAdding(false);
    }
  };

  // Default projects (inbox, today, upcoming) shouldn't be deletable
  const defaultProjectIds = ['inbox', 'today', 'upcoming'];
  const isDefaultProject = (id: string) => defaultProjectIds.includes(id);

  return (
    <div className={cn("py-4", className)}>
      <div className="mb-3 px-4">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Projects</h2>
      </div>
      
      <ul className="space-y-1 px-2">
        {projects.map(project => (
          <li key={project.id} className="relative group">
            <button
              onClick={() => onSelectProject(project.id)}
              className={cn(
                "w-full text-left px-2 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-accent",
                activeProject === project.id ? "bg-accent" : ""
              )}
            >
              {project.name}
            </button>
            
            {!isDefaultProject(project.id) && (
              <button
                onClick={() => onDeleteProject(project.id)}
                className="absolute right-2 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Delete ${project.name}`}
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </button>
            )}
          </li>
        ))}
      </ul>
      
      {isAdding ? (
        <form onSubmit={handleSubmit} className="mt-3 px-4">
          <Input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name"
            className="mb-2"
            autoFocus
          />
          <div className="flex gap-2">
            <Button type="submit" size="sm">Add</Button>
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              onClick={() => {
                setIsAdding(false);
                setNewProjectName('');
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 w-full justify-start text-muted-foreground"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      )}
    </div>
  );
};

export default ProjectList;
