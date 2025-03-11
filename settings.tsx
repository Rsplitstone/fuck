import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  User,
  Bell,
  Users,
  Settings,
  Calendar,
  Cpu,
  Cloud,
  Lock,
  LogOut,
  Trash2,
  HelpCircle,
  Mail,
  Phone,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock team members
  const teamMembers = [
    { id: 1, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Administrator', avatar: '' },
    { id: 2, name: 'John Doe', email: 'john.doe@example.com', role: 'Attorney', avatar: '' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Paralegal', avatar: '' },
    { id: 4, name: 'Mike Wilson', email: 'mike.w@example.com', role: 'Case Manager', avatar: '' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="team" className="flex gap-2 items-center">
            <Users className="h-4 w-4" /> Team
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex gap-2 items-center">
            <Calendar className="h-4 w-4" /> Integrations
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex gap-2 items-center">
            <Cpu className="h-4 w-4" /> AI Settings
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg">JS</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" defaultValue="Jane Smith" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Your email" defaultValue="jane.smith@example.com" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Your phone number" defaultValue="(555) 123-4567" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="Your job title" defaultValue="Attorney" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america-los_angeles">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Two-factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </div>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">Log Out of All Devices</div>
                    <div className="text-sm text-muted-foreground">
                      End all active sessions on other devices
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose when and how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Task Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about upcoming task deadlines
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Calendar Events</div>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications for hearings, depositions, and other events
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Case Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified when changes are made to your cases
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Team Activity</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates when team members make changes
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Task Assignments</div>
                    <div className="text-sm text-muted-foreground">
                      Notify when tasks are assigned to you
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Task Due Dates</div>
                    <div className="text-sm text-muted-foreground">
                      Remind you of upcoming deadlines
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">AI Recommendations</div>
                    <div className="text-sm text-muted-foreground">
                      Get intelligent suggestions for task prioritization
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Schedule</h3>
                
                <div className="grid gap-2">
                  <Label>Task Reminders</Label>
                  <Select defaultValue="1-day">
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-day">Same day</SelectItem>
                      <SelectItem value="1-day">1 day before</SelectItem>
                      <SelectItem value="2-days">2 days before</SelectItem>
                      <SelectItem value="1-week">1 week before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label>Calendar Events</Label>
                  <Select defaultValue="1-day">
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-hour">1 hour before</SelectItem>
                      <SelectItem value="3-hours">3 hours before</SelectItem>
                      <SelectItem value="same-day">Same day</SelectItem>
                      <SelectItem value="1-day">1 day before</SelectItem>
                      <SelectItem value="2-days">2 days before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Team Management */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Manage team members and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Team Members ({teamMembers.length})</div>
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
              
              <div className="border rounded-md">
                <div className="flex items-center justify-between p-3 bg-muted">
                  <div className="grid grid-cols-5 w-full">
                    <div className="font-medium">Name</div>
                    <div className="font-medium col-span-2">Email</div>
                    <div className="font-medium">Role</div>
                    <div className="font-medium text-right">Actions</div>
                  </div>
                </div>
                
                <div className="divide-y">
                  {teamMembers.map(member => (
                    <div key={member.id} className="p-3">
                      <div className="grid grid-cols-5 w-full items-center">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                        <div className="col-span-2 text-muted-foreground">
                          {member.email}
                        </div>
                        <div>
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                            {member.role}
                          </span>
                        </div>
                        <div className="flex justify-end items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Team Roles</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Administrator</div>
                      <div className="text-sm text-muted-foreground">
                        Full access to all features, can manage team members
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Attorney</div>
                      <div className="text-sm text-muted-foreground">
                        Can manage cases, tasks, and documents
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Paralegal</div>
                      <div className="text-sm text-muted-foreground">
                        Can view and edit cases, but cannot delete
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Case Manager</div>
                      <div className="text-sm text-muted-foreground">
                        Limited case management and document access
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Integrations */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>App Integrations</CardTitle>
              <CardDescription>
                Connect external services to enhance functionality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Calendar Integration</h3>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-4">
                    <Calendar className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-medium">Google Calendar</div>
                      <div className="text-sm text-muted-foreground">
                        Sync your events with Google Calendar
                      </div>
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-4">
                    <Calendar className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-medium">Microsoft Outlook</div>
                      <div className="text-sm text-muted-foreground">
                        Sync your events with Outlook Calendar
                      </div>
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Document Storage</h3>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-4">
                    <Cloud className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-medium">Google Drive</div>
                      <div className="text-sm text-muted-foreground">
                        Connect to store and access documents
                      </div>
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-4">
                    <Cloud className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-medium">Dropbox</div>
                      <div className="text-sm text-muted-foreground">
                        Connect your Dropbox account
                      </div>
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-4">
                    <Cloud className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-medium">OneDrive</div>
                      <div className="text-sm text-muted-foreground">
                        Connect to Microsoft OneDrive
                      </div>
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Communication</h3>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-4">
                    <Mail className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-medium">Email Integration</div>
                      <div className="text-sm text-muted-foreground">
                        Connect your email account
                      </div>
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-4">
                    <Phone className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Enable text message notifications
                      </div>
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Integration Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* AI Settings */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>
                Customize how AI features work in your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Task Prioritization</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">AI Task Recommendations</div>
                    <div className="text-sm text-muted-foreground">
                      Enable AI to suggest task prioritization
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="space-y-2">
                  <Label>Prioritization Emphasis</Label>
                  <Select defaultValue="deadline">
                    <SelectTrigger>
                      <SelectValue placeholder="Select emphasis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deadline">Deadline-based (prioritize upcoming deadlines)</SelectItem>
                      <SelectItem value="complexity">Case complexity-based</SelectItem>
                      <SelectItem value="client">Client importance-based</SelectItem>
                      <SelectItem value="balanced">Balanced approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Document Intelligence</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Smart Document Suggestions</div>
                    <div className="text-sm text-muted-foreground">
                      Get document recommendations based on your case activity
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Document Summarization</div>
                    <div className="text-sm text-muted-foreground">
                      Enable AI to summarize long documents
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Calendar Intelligence</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Smart Scheduling</div>
                    <div className="text-sm text-muted-foreground">
                      Let AI suggest optimal meeting times
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Conflict Detection</div>
                    <div className="text-sm text-muted-foreground">
                      Get alerted about scheduling conflicts
                    </div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data & Privacy</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">AI Training Data</div>
                    <div className="text-sm text-muted-foreground">
                      Allow your anonymized data to improve AI models
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-md">
                  <div className="flex gap-2">
                    <HelpCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-700">Privacy Notice</p>
                      <p className="text-yellow-600 mt-1">
                        All AI processing is done securely. Your confidential client data is never used for general model training.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save AI Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 