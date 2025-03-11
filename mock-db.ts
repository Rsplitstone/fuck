import {
  Task,
  Case,
  TaskCategory,
  CalendarEvent,
  defaultTaskCategories,
} from "@shared/schema";

// In-memory storage
const data = {
  cases: [] as Case[],
  tasks: [] as Task[],
  taskCategories: [] as TaskCategory[],
  calendarEvents: [] as CalendarEvent[],
};

// Initialize with some default data
const initializeMockData = () => {
  // Add default task categories
  data.taskCategories = defaultTaskCategories.map((category, index) => ({
    id: index + 1,
    name: category.name,
    color: category.color,
    description: category.description,
  }));

  // Add a sample case
  const sampleCase: Case = {
    id: 1,
    name: "Sample Case - Smith v. Jones",
    caseNumber: "2023-CV-12345",
    clientName: "John Smith",
    court: "District Court",
    filingDate: new Date().toISOString(),
    status: "Active",
    notes: "This is a sample case for demonstration purposes.",
  };
  data.cases.push(sampleCase);

  // Add sample tasks
  const courtFilingsCategory = data.taskCategories.find(
    (c) => c.name === "Court Filings"
  );
  const clientCommCategory = data.taskCategories.find(
    (c) => c.name === "Client Communication"
  );

  if (courtFilingsCategory) {
    data.tasks.push({
      id: 1,
      caseId: sampleCase.id,
      categoryId: courtFilingsCategory.id,
      title: "File Motion for Summary Judgment",
      description: "Prepare and file motion for summary judgment with supporting evidence",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      status: "Pending",
      priority: "High",
      notes: "Sample task for demonstration",
      assignedTo: "Jane Lawyer",
      estimatedHours: 8,
      actualHours: 0,
      completedDate: null,
      reminderDate: null,
      tags: ["motion", "deadline", "summary judgment"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  if (clientCommCategory) {
    data.tasks.push({
      id: 2,
      caseId: sampleCase.id,
      categoryId: clientCommCategory.id,
      title: "Client Update Call",
      description: "Schedule call with client to discuss case strategy",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      status: "Not Started",
      priority: "Medium",
      notes: "Review case notes before call",
      assignedTo: "Jane Lawyer",
      estimatedHours: 1,
      actualHours: 0,
      completedDate: null,
      reminderDate: null,
      tags: ["client", "communication"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  // Add a sample calendar event
  data.calendarEvents.push({
    id: 1,
    caseId: sampleCase.id,
    taskId: 1,
    title: "Status Conference",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // 1 hour later
    location: "Courtroom 3B",
    description: "Status conference with Judge Miller",
    eventType: "Hearing",
    isAllDay: 0,
    reminderTime: null,
  });
};

// Initialize data
initializeMockData();

// Mock database operations
export const mockDb = {
  // Cases
  findAllCases: () => [...data.cases],
  findCaseById: (id: number) => data.cases.find((c) => c.id === id),
  createCase: (newCase: Omit<Case, "id">) => {
    const id = data.cases.length > 0 ? Math.max(...data.cases.map((c) => c.id)) + 1 : 1;
    const createdCase = { ...newCase, id } as Case;
    data.cases.push(createdCase);
    return createdCase;
  },
  updateCase: (id: number, caseData: Partial<Case>) => {
    const index = data.cases.findIndex((c) => c.id === id);
    if (index !== -1) {
      data.cases[index] = { ...data.cases[index], ...caseData };
      return data.cases[index];
    }
    return null;
  },
  deleteCase: (id: number) => {
    const index = data.cases.findIndex((c) => c.id === id);
    if (index !== -1) {
      const deletedCase = data.cases[index];
      data.cases.splice(index, 1);
      // Also delete related tasks and events
      data.tasks = data.tasks.filter((t) => t.caseId !== id);
      data.calendarEvents = data.calendarEvents.filter((e) => e.caseId !== id);
      return deletedCase;
    }
    return null;
  },

  // Tasks
  findAllTasks: () => [...data.tasks],
  findTasksByCaseId: (caseId: number) => data.tasks.filter((t) => t.caseId === caseId),
  findTaskById: (id: number) => data.tasks.find((t) => t.id === id),
  createTask: (newTask: Omit<Task, "id">) => {
    const id = data.tasks.length > 0 ? Math.max(...data.tasks.map((t) => t.id)) + 1 : 1;
    const createdTask = { ...newTask, id } as Task;
    data.tasks.push(createdTask);
    return createdTask;
  },
  updateTask: (id: number, taskData: Partial<Task>) => {
    const index = data.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      data.tasks[index] = { ...data.tasks[index], ...taskData, updatedAt: new Date().toISOString() };
      return data.tasks[index];
    }
    return null;
  },
  deleteTask: (id: number) => {
    const index = data.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      const deletedTask = data.tasks[index];
      data.tasks.splice(index, 1);
      // Also update any calendar events that reference this task
      data.calendarEvents = data.calendarEvents.map((e) => 
        e.taskId === id ? { ...e, taskId: null } : e
      );
      return deletedTask;
    }
    return null;
  },

  // Task Categories
  findAllTaskCategories: () => [...data.taskCategories],
  findTaskCategoryById: (id: number) => data.taskCategories.find((c) => c.id === id),
  createTaskCategory: (newCategory: Omit<TaskCategory, "id">) => {
    const id = data.taskCategories.length > 0 ? Math.max(...data.taskCategories.map((c) => c.id)) + 1 : 1;
    const createdCategory = { ...newCategory, id } as TaskCategory;
    data.taskCategories.push(createdCategory);
    return createdCategory;
  },
  updateTaskCategory: (id: number, categoryData: Partial<TaskCategory>) => {
    const index = data.taskCategories.findIndex((c) => c.id === id);
    if (index !== -1) {
      data.taskCategories[index] = { ...data.taskCategories[index], ...categoryData };
      return data.taskCategories[index];
    }
    return null;
  },
  deleteTaskCategory: (id: number) => {
    const index = data.taskCategories.findIndex((c) => c.id === id);
    if (index !== -1) {
      const deletedCategory = data.taskCategories[index];
      data.taskCategories.splice(index, 1);
      // Update tasks that use this category to use null
      data.tasks = data.tasks.map((t) => 
        t.categoryId === id ? { ...t, categoryId: null } : t
      );
      return deletedCategory;
    }
    return null;
  },

  // Calendar Events
  findAllCalendarEvents: () => [...data.calendarEvents],
  findCalendarEventsByCaseId: (caseId: number) => 
    data.calendarEvents.filter((e) => e.caseId === caseId),
  findCalendarEventsByTaskId: (taskId: number) => 
    data.calendarEvents.filter((e) => e.taskId === taskId),
  findCalendarEventById: (id: number) => 
    data.calendarEvents.find((e) => e.id === id),
  createCalendarEvent: (newEvent: Omit<CalendarEvent, "id">) => {
    const id = data.calendarEvents.length > 0 ? Math.max(...data.calendarEvents.map((e) => e.id)) + 1 : 1;
    const createdEvent = { ...newEvent, id } as CalendarEvent;
    data.calendarEvents.push(createdEvent);
    return createdEvent;
  },
  updateCalendarEvent: (id: number, eventData: Partial<CalendarEvent>) => {
    const index = data.calendarEvents.findIndex((e) => e.id === id);
    if (index !== -1) {
      data.calendarEvents[index] = { ...data.calendarEvents[index], ...eventData };
      return data.calendarEvents[index];
    }
    return null;
  },
  deleteCalendarEvent: (id: number) => {
    const index = data.calendarEvents.findIndex((e) => e.id === id);
    if (index !== -1) {
      const deletedEvent = data.calendarEvents[index];
      data.calendarEvents.splice(index, 1);
      return deletedEvent;
    }
    return null;
  },
}; 