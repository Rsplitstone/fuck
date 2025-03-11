import { useState } from 'react';
import { CasesList } from '@/components/cases/CasesList';
import { AddCaseDialog } from '@/components/cases/AddCaseDialog';
import { useCases } from '@/hooks/api-hooks';
import { Button } from '@/components/ui/button';

export default function CasesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { data: cases, isLoading, error } = useCases();

  if (isLoading) return <div>Loading cases...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Cases</h1>
        <Button onClick={() => setIsAddOpen(true)}>Add New Case</Button>
      </div>

      <CasesList cases={cases} />
      <AddCaseDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}