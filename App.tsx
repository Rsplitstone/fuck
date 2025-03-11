import React from 'react';
import { Router, Route, Switch } from 'wouter';
import Dashboard from './pages/dashboard';
import Calendar from './pages/calendar';
import Cases from './pages/cases';
import Tasks from './pages/tasks';
import Documents from './pages/documents';
import Settings from './pages/settings';
import { LayoutDashboard, Calendar as CalendarIcon, Briefcase, CheckSquare, FileText, Settings as SettingsIcon } from 'lucide-react';

function App() {
  // Adjust base path for GitHub Pages
  const base = process.env.NODE_ENV === 'production' ? '/LegalTaskTracker' : '';
  
  return (
    <Router base={base}>
      <div className="min-h-screen bg-gray-50">
        {/* Header/Navigation */}
        <header className="border-b bg-white shadow-sm">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-blue-600">LegalTaskTracker</h1>
              <nav className="hidden md:flex items-center space-x-4">
                <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-blue-50">
                  <LayoutDashboard className="inline-block h-4 w-4 mr-2" />
                  Dashboard
                </a>
                <a href="/calendar" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <CalendarIcon className="inline-block h-4 w-4 mr-2" />
                  Calendar
                </a>
                <a href="/cases" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <Briefcase className="inline-block h-4 w-4 mr-2" />
                  Cases
                </a>
                <a href="/tasks" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <CheckSquare className="inline-block h-4 w-4 mr-2" />
                  Tasks
                </a>
                <a href="/documents" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <FileText className="inline-block h-4 w-4 mr-2" />
                  Documents
                </a>
                <a href="/settings" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <SettingsIcon className="inline-block h-4 w-4 mr-2" />
                  Settings
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <a href="/tasks/new" className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50">
                New Task
              </a>
              <a href="/cases/new" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                New Case
              </a>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/cases" component={Cases} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/documents" component={Documents} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;