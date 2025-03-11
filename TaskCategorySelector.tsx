import React from 'react';
import { Check, Plus } from 'lucide-react';
import { TaskCategory } from '@shared/schema';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface TaskCategorySelectorProps {
  categories: TaskCategory[];
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number) => void;
  onAddCategory?: () => void;
  disabled?: boolean;
}

const TaskCategorySelector: React.FC<TaskCategorySelectorProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onAddCategory,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          {selectedCategory ? (
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: selectedCategory.color || '#CBD5E1' }}
              />
              {selectedCategory.name}
            </div>
          ) : (
            "Select category..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading="Categories">
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => {
                    onSelectCategory(category.id);
                    setOpen(false);
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color || '#CBD5E1' }}
                  />
                  {category.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCategoryId === category.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {onAddCategory && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    onAddCategory();
                    setOpen(false);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create category
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TaskCategorySelector; 