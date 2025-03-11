import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Case, Task, TaskCategory, CalendarEvent, InsertTask, InsertCase, InsertTaskCategory, InsertCalendarEvent } from 'shared/schema';

// Check if we're running on GitHub Pages
const isGitHubPages = () => {
  return window.location.hostname.includes('github.io');
};

// Get the base URL for API requests
const getBaseUrl = () => {
  return isGitHubPages() ? import.meta.env.BASE_URL || '/' : '';
};

// Fetch data
const fetchData = async <T>(url: string): Promise<T> => {
  try {
    // If on GitHub Pages, use the mock data
    if (isGitHubPages()) {
      const mockDataUrl = `${getBaseUrl()}mock-data.json`;
      const response = await fetch(mockDataUrl);
      if (!response.ok) {
        throw new Error(`Error fetching mock data: ${response.statusText}`);
      }
      
      const mockData = await response.json();
      
      // Parse the URL to determine what data to return
      if (url.includes('/cases/') && url.includes('/tasks')) {
        // Case-specific tasks
        const caseId = parseInt(url.split('/cases/')[1].split('/')[0]);
        return mockData.tasks.filter((task: Task) => task.caseId === caseId) as T;
      } else if (url.includes('/cases/') && url.includes('/events')) {
        // Case-specific events
        const caseId = parseInt(url.split('/cases/')[1].split('/')[0]);
        return mockData.calendarEvents.filter((event: CalendarEvent) => event.caseId === caseId) as T;
      } else if (url.includes('/cases/') && !url.includes('/tasks') && !url.includes('/events')) {
        // Specific case
        const caseId = parseInt(url.split('/cases/')[1]);
        return mockData.cases.find((c: Case) => c.id === caseId) as T;
      } else if (url === '/api/cases') {
        return mockData.cases as T;
      } else if (url === '/api/tasks') {
        return mockData.tasks as T;
      } else if (url === '/api/categories' || url === '/api/task-categories') {
        return mockData.taskCategories as T;
      } else if (url === '/api/events') {
        return mockData.calendarEvents as T;
      } else if (url.includes('/tasks/')) {
        // Specific task
        const taskId = parseInt(url.split('/tasks/')[1]);
        return mockData.tasks.find((t: Task) => t.id === taskId) as T;
      }
      
      // Default case - return empty array
      return [] as unknown as T;
    }
    
    // Normal API fetch for non-GitHub Pages environment
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error; // Re-throw to be handled by React Query
  }
};

// Post data
const postData = async <T, R>(url: string, data: T): Promise<R> => {
  // If on GitHub Pages, simulate a successful response with the posted data
  if (isGitHubPages()) {
    // For GitHub Pages, just return the data with an ID
    const mockResponse = {
      ...data,
      id: Math.floor(Math.random() * 1000) + 100,
      createdAt: new Date().toISOString()
    };
    return mockResponse as unknown as R;
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error posting data: ${response.statusText}`);
  }
  return response.json() as Promise<R>;
};

// Update data
const updateData = async <T, R>(url: string, data: T): Promise<R> => {
  // If on GitHub Pages, simulate a successful response
  if (isGitHubPages()) {
    // For GitHub Pages, just return the updated data
    const id = parseInt(url.split('/').pop() || '0');
    const mockResponse = {
      ...data,
      id,
      updatedAt: new Date().toISOString()
    };
    return mockResponse as unknown as R;
  }
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error updating data: ${response.statusText}`);
  }
  return response.json() as Promise<R>;
};

// Delete data
const deleteData = async <R>(url: string): Promise<R> => {
  // If on GitHub Pages, simulate a successful response
  if (isGitHubPages()) {
    return {} as R;
  }
  
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Error deleting data: ${response.statusText}`);
  }
  return response.json() as Promise<R>;
};

// Cases
export const useCases = () => {
  return useQuery<Case[]>({
    queryKey: ['cases'],
    queryFn: () => fetchData<Case[]>('/api/cases'),
  });
};

export const useCase = (id: number) => {
  return useQuery<Case>({
    queryKey: ['case', id],
    queryFn: () => fetchData<Case>(`/api/cases/${id}`),
    enabled: !!id,
  });
};

export const useCreateCase = () => {
  const queryClient = useQueryClient();
  return useMutation<Case, Error, InsertCase>({
    mutationFn: (data) => postData<InsertCase, Case>('/api/cases', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
};

export const useUpdateCase = () => {
  const queryClient = useQueryClient();
  return useMutation<Case, Error, { id: number; data: Partial<Case> }>({
    mutationFn: ({ id, data }) => updateData<Partial<Case>, Case>(`/api/cases/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
      queryClient.invalidateQueries({ queryKey: ['case', variables.id] });
    },
  });
};

export const useDeleteCase = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteData<void>(`/api/cases/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });
};

// Tasks
export const useTasks = (caseId?: number) => {
  return useQuery<Task[], Error>({
    queryKey: ['tasks', { caseId }],
    queryFn: () => fetchData<Task[]>(caseId ? `/api/cases/${caseId}/tasks` : '/api/tasks'),
    retry: 2, // Retry failed requests twice
    staleTime: 30000, // Consider data fresh for 30 seconds
    onError: (error) => {
      console.error('Failed to fetch tasks:', error);
    }
  });
};

export const useTask = (id: number) => {
  return useQuery<Task>({
    queryKey: ['task', id],
    queryFn: () => fetchData<Task>(`/api/tasks/${id}`),
    enabled: !!id,
  });
};

// Categories
export const useCategories = () => {
  return useQuery<TaskCategory[]>({
    queryKey: ['categories'],
    queryFn: () => fetchData<TaskCategory[]>('/api/categories'),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, InsertTask>({
    mutationFn: (data) => postData<InsertTask, Task>('/api/tasks', data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (data.caseId) {
        queryClient.invalidateQueries({ queryKey: ['tasks', { caseId: data.caseId }] });
      }
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, { id: number; data: Partial<Task> }>({
    mutationFn: ({ id, data }) => updateData<Partial<Task>, Task>(`/api/tasks/${id}`, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
      if (data.caseId) {
        queryClient.invalidateQueries({ queryKey: ['tasks', { caseId: data.caseId }] });
      }
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteData<void>(`/api/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// Task Categories
export const useTaskCategories = () => {
  return useQuery<TaskCategory[]>({
    queryKey: ['taskCategories'],
    queryFn: () => fetchData<TaskCategory[]>('/api/task-categories'),
  });
};

export const useCreateTaskCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<TaskCategory, Error, InsertTaskCategory>({
    mutationFn: (data) => postData<InsertTaskCategory, TaskCategory>('/api/task-categories', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskCategories'] });
    },
  });
};

// Calendar Events
export const useCalendarEvents = (caseId?: number) => {
  return useQuery<CalendarEvent[]>({
    queryKey: ['calendarEvents', { caseId }],
    queryFn: () => fetchData<CalendarEvent[]>(caseId ? `/api/cases/${caseId}/events` : '/api/events'),
  });
};

export const useCreateCalendarEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<CalendarEvent, Error, InsertCalendarEvent>({
    mutationFn: (data) => postData<InsertCalendarEvent, CalendarEvent>('/api/events', data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
      if (data.caseId) {
        queryClient.invalidateQueries({ queryKey: ['calendarEvents', { caseId: data.caseId }] });
      }
    },
  });
};

export const useUpdateCalendarEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<CalendarEvent, Error, { id: number; data: Partial<CalendarEvent> }>({
    mutationFn: ({ id, data }) => updateData<Partial<CalendarEvent>, CalendarEvent>(`/api/events/${id}`, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
      queryClient.invalidateQueries({ queryKey: ['calendarEvent', variables.id] });
      if (data.caseId) {
        queryClient.invalidateQueries({ queryKey: ['calendarEvents', { caseId: data.caseId }] });
      }
    },
  });
};

export const useDeleteCalendarEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteData<void>(`/api/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
    },
  });
};