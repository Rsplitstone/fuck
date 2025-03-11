import React, { useState, useEffect } from 'react';
import { CalendarIcon, RefreshCwIcon, SearchIcon } from 'lucide-react';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('');
  
  useEffect(() => {
    const now = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    setCurrentMonth(monthNames[now.getMonth()] + ' ' + now.getFullYear());
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Your legal task management overview and priorities</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search cases, tasks or clients..."
              className="w-[300px] pl-8 h-9 rounded-md border border-gray-300 px-3 py-1 text-sm shadow-sm"
            />
          </div>
          <button 
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </button>
          <button 
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => alert('New Task would be created')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            New Task
          </button>
          <button 
            className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => alert('New Case would be created')}
          >
            New Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Critical Alerts Section */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
          <div className="flex items-center mb-4">
            <div className="text-red-500 mr-2">⚠️</div>
            <h2 className="text-xl font-semibold">Critical Alerts</h2>
          </div>
          <p className="text-gray-500 mb-2">Tasks requiring immediate attention</p>
          <div className="mt-8 text-center">
            <p className="text-lg">No overdue tasks</p>
          </div>
        </div>

        {/* Upcoming Deadlines Section */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
          <div className="flex items-center mb-4">
            <div className="text-blue-500 mr-2">🕒</div>
            <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
          </div>
          <p className="text-gray-500 mb-2">Next 0 tasks due in the next 7 days</p>
          <div className="mt-8 text-center">
            <p className="text-lg">No upcoming tasks</p>
          </div>
          <div className="mt-6">
            <button className="inline-flex items-center justify-center w-full h-9 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => alert('View Calendar clicked')}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              View Calendar
            </button>
          </div>
        </div>

        {/* Tasks Overview Section */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
          <div className="flex items-center mb-4">
            <div className="text-green-500 mr-2">📊</div>
            <h2 className="text-xl font-semibold">Tasks Overview</h2>
          </div>
          <p className="text-gray-500 mb-2">Task completion progress this week</p>
          <div>
            <div className="flex justify-between mb-2">
              <span>Progress</span>
              <span>0%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 mb-6">
              <div 
                className="h-full w-full bg-blue-600 transition-all" 
                style={{ transform: `translateX(-100%)` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-500">Due this week</div>
            </div>
            <div className="bg-green-50 p-4 rounded text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
          </div>
          <div className="mt-6">
            <button className="inline-flex items-center justify-center w-full h-9 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => alert('View All Tasks clicked')}>
              View All Tasks
            </button>
          </div>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="mt-8 border border-blue-200 rounded-lg p-6 shadow-sm bg-blue-50">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">AI Recommendations</h2>
          <div className="text-xs bg-blue-500 text-white px-2 py-1 rounded">AI Powered</div>
        </div>
        <p className="text-gray-500 mb-4">Intelligent recommendations based on your caseload and deadlines</p>
        
        <div className="bg-white p-4 border-l-4 border-blue-500 rounded shadow-sm">
          <h3 className="font-medium">Upcoming Events Reminder</h3>
          <p className="text-sm text-gray-600 mt-1">
            You have 0 tasks due in the next week. Consider reviewing your calendar to ensure proper preparation time.
          </p>
        </div>
      </div>

      {/* Workers' Compensation Calendar Section - RIGHT AFTER AI RECOMMENDATIONS */}
      <div className="mt-6 border-2 border-blue-500 rounded-lg p-6 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Workers' Compensation Calendar</h2>
        
        {/* Calendar Controls */}
        <div className="flex justify-between items-center mb-6">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => alert('Today clicked')}>
            Today
          </button>
          <div className="text-xl font-bold">
            {currentMonth}
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => alert('Previous Month clicked')}>
              Previous Month
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => alert('Next Month clicked')}>
              Next Month
            </button>
          </div>
        </div>
        
        {/* Calendar Table */}
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sunday
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Monday
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tuesday
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Wednesday
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thursday
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Friday
                  </th>
                  <th className="py-2 px-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Saturday
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Week 1 */}
                <tr>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-gray-300 text-sm"></div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-gray-300 text-sm"></div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">1</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">2</div>
                    <div className="mt-1">
                      <div className="text-xs my-1 p-1 truncate rounded bg-blue-500 text-white cursor-pointer">
                        Deposition: Smith v. ABC Corp
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">3</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">4</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">5</div>
                  </td>
                </tr>
                {/* Week 2 */}
                <tr>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">6</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">7</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">8</div>
                    <div className="mt-1">
                      <div className="text-xs my-1 p-1 truncate rounded bg-orange-500 text-white cursor-pointer">
                        Filing Deadline: Martinez Case
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">9</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">10</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">11</div>
                    <div className="mt-1">
                      <div className="text-xs my-1 p-1 truncate rounded bg-amber-500 text-white cursor-pointer">
                        MSC: Johnson WC Claim
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">12</div>
                  </td>
                </tr>
                {/* Week 3 */}
                <tr>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">13</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">14</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">15</div>
                    <div className="mt-1">
                      <div className="text-xs my-1 p-1 truncate rounded bg-green-500 text-white cursor-pointer">
                        IME: Dr. Wilson for Smith Case
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 h-24 align-top bg-blue-50">
                    <div className="text-sm font-bold bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">16</div>
                    <div className="mt-1">
                      <div className="text-xs my-1 p-1 truncate rounded bg-indigo-500 text-white cursor-pointer">
                        Client Meeting: Johnson
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">17</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">18</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">19</div>
                  </td>
                </tr>
                {/* Week 4 */}
                <tr>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">20</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">21</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">22</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">23</div>
                    <div className="mt-1">
                      <div className="text-xs my-1 p-1 truncate rounded bg-purple-500 text-white cursor-pointer">
                        WCAB Hearing: Martinez
                      </div>
                      <div className="text-xs my-1 p-1 truncate rounded bg-orange-500 text-white cursor-pointer">
                        Appeal Deadline: Jones
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">24</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">25</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">26</div>
                  </td>
                </tr>
                {/* Week 5 */}
                <tr>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">27</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">28</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">29</div>
                    <div className="mt-1">
                      <div className="text-xs my-1 p-1 truncate rounded bg-red-500 text-white cursor-pointer">
                        Trial: Davis v. Employer
                      </div>
                    </div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">30</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-sm">31</div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-gray-300 text-sm"></div>
                  </td>
                  <td className="border p-2 h-24 align-top">
                    <div className="text-gray-300 text-sm"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm">Hearings</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm">Depositions</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Trials</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-sm">MSCs</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">IMEs</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-indigo-500 mr-2"></div>
            <span className="text-sm">Client Meetings</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-sm">Deadlines</span>
          </div>
        </div>
        
        {/* Add New Task Button */}
        <div className="mt-6">
          <button 
            className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
            onClick={() => alert('Would open new task form')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Workers' Comp Task
          </button>
        </div>
      </div>

      {/* List/Calendar View Toggle */}
      <div className="mt-6 flex justify-between">
        <div className="flex">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            List View
          </button>
          <button className="px-4 py-2 bg-white text-blue-600 border-t border-r border-b border-blue-600 rounded-r flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Calendar View
          </button>
        </div>

        <button 
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Task
        </button>
      </div>
    </>
  );
};

export default Dashboard;