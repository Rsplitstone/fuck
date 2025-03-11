import { useState } from 'react';
import { 
  Search, 
  PlusCircle, 
  Filter, 
  FileText, 
  FolderOpen,
  File,
  Download,
  Share2,
  MoreHorizontal,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { useCases } from '@/hooks/api-hooks';

// Mock document templates
const documentTemplates = [
  { id: 1, name: 'Deposition Notice', category: 'Depositions', dateCreated: '2023-10-01', docType: 'DOCX' },
  { id: 2, name: 'Trial Brief Template', category: 'Trial', dateCreated: '2023-09-15', docType: 'DOCX' },
  { id: 3, name: 'Settlement Agreement', category: 'Settlement', dateCreated: '2023-08-22', docType: 'DOCX' },
  { id: 4, name: 'Medical Records Request', category: 'Discovery', dateCreated: '2023-07-30', docType: 'PDF' },
  { id: 5, name: 'Client Intake Form', category: 'Intake', dateCreated: '2023-06-12', docType: 'PDF' },
  { id: 6, name: 'Motion to Compel', category: 'Motions', dateCreated: '2023-05-28', docType: 'DOCX' },
];

// Mock files (uploaded documents)
const files = [
  { id: 1, name: 'Smith v. Johnson - Medical Records.pdf', caseId: 1, uploadDate: '2023-10-05', fileSize: '4.2 MB', fileType: 'PDF' },
  { id: 2, name: 'Martinez Deposition Transcript.pdf', caseId: 2, uploadDate: '2023-09-28', fileSize: '1.8 MB', fileType: 'PDF' },
  { id: 3, name: 'Exhibit A - Accident Photos.zip', caseId: 1, uploadDate: '2023-09-15', fileSize: '12.5 MB', fileType: 'ZIP' },
  { id: 4, name: 'Expert Witness Report - Dr. Williams.pdf', caseId: 3, uploadDate: '2023-08-22', fileSize: '3.7 MB', fileType: 'PDF' },
  { id: 5, name: 'Settlement Terms - Rodriguez Case.docx', caseId: 4, uploadDate: '2023-07-10', fileSize: '680 KB', fileType: 'DOCX' },
];

// Document categories for filter
const documentCategories = [
  'All Categories',
  'Depositions',
  'Trial',
  'Settlement',
  'Discovery',
  'Intake',
  'Motions',
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('templates');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [caseFilter, setCaseFilter] = useState('all');
  
  const { data: cases = [] } = useCases();

  // Get case name by ID
  const getCaseName = (caseId: number) => {
    const foundCase = cases.find(c => c.id === caseId);
    return foundCase ? foundCase.name : 'Unknown Case';
  };

  // Filter templates based on search and category
  const filteredTemplates = documentTemplates.filter(template => {
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (categoryFilter !== 'All Categories' && template.category !== categoryFilter) {
      return false;
    }
    
    return true;
  });

  // Filter files based on search and case
  const filteredFiles = files.filter(file => {
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (caseFilter !== 'all' && file.caseId !== parseInt(caseFilter)) {
      return false;
    }
    
    return true;
  });

  // File icon based on type
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return <FileText className="h-10 w-10 text-red-500" />;
      case 'docx': return <FileText className="h-10 w-10 text-blue-500" />;
      case 'zip': return <File className="h-10 w-10 text-yellow-500" />;
      default: return <File className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents & Templates</h1>
          <p className="text-muted-foreground">
            Manage your documents, forms, and legal templates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>

      {/* Search and tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Templates tab content */}
      <TabsContent value="templates" className="mt-0">
        <div className="flex justify-between items-center mb-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {documentCategories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map(template => (
            <Card key={template.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                  </div>
                  <Badge>{template.docType}</Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between pt-0">
                <div className="text-xs text-muted-foreground">
                  Created: {template.dateCreated}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Template</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="col-span-full p-8 text-center">
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-muted">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">No templates match your search criteria</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('All Categories');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </TabsContent>

      {/* Documents tab content */}
      <TabsContent value="documents" className="mt-0">
        <div className="flex justify-between items-center mb-4">
          <Select value={caseFilter} onValueChange={setCaseFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by case" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              {cases.map(caseItem => (
                <SelectItem key={caseItem.id} value={caseItem.id.toString()}>
                  {caseItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="divide-y">
          {filteredFiles.map(file => (
            <div key={file.id} className="py-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                {getFileIcon(file.fileType)}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium mb-1">{file.name}</h3>
                <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                  <span>Case: {getCaseName(file.caseId)}</span>
                  <span>Uploaded: {file.uploadDate}</span>
                  <span>Size: {file.fileSize}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Share2 className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Move to Case</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {filteredFiles.length === 0 && (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-muted">
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-4">No documents match your search criteria</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setCaseFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </TabsContent>

      {/* AI-powered recommendations */}
      <Card className="border-dashed border-primary/50 mt-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>AI Document Recommendations</CardTitle>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">AI Powered</span>
          </div>
          <CardDescription>
            Intelligent document suggestions based on your upcoming events
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <FileText className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium mb-1">Deposition Notice</h3>
            <p className="text-sm text-muted-foreground mb-2">
              You have a deposition scheduled next week. Prepare using this template.
            </p>
            <Button variant="outline" size="sm">Use Template</Button>
          </div>
          
          <div className="p-4 border rounded-md">
            <FileText className="h-8 w-8 text-orange-500 mb-2" />
            <h3 className="font-medium mb-1">Trial Brief</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Trial for Smith case approaching. Consider preparing a brief.
            </p>
            <Button variant="outline" size="sm">Use Template</Button>
          </div>
          
          <div className="p-4 border rounded-md">
            <FileText className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-medium mb-1">Settlement Agreement</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Case shows settlement potential. Have this template ready.
            </p>
            <Button variant="outline" size="sm">Use Template</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 