import { TasksHeader } from '@/components/tasks/TasksHeader';
import { TasksFilters } from '@/components/tasks/TasksFilters';
import { TasksTable } from '@/components/tasks/TasksTable';
import { TasksRecommendations } from '@/components/tasks/TasksRecommendations';
import { useTasksWithFilters } from '@/hooks/useTasksWithFilters';

export default function TasksPage() {
  const {
    tasks,
    filters,
    setFilters,
    sorting,
    setSorting,
    isLoading,
    error
  } = useTasksWithFilters();

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
      </div>

      <TasksHeader />
      <TasksRecommendations tasks={tasks} />
      <TasksFilters 
        filters={filters} 
        onFiltersChange={setFilters}
      />
      <TasksTable 
        tasks={tasks}
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  );
}