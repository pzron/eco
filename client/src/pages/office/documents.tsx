import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Search, Filter, Upload, Download,
  Folder, File, MoreVertical, Eye, Trash2, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const documents = [
  { id: 1, name: "Sales Report Q4 2024.pdf", type: "pdf", size: "2.4 MB", modified: "Today, 11:30 AM", category: "Reports" },
  { id: 2, name: "Employee Handbook.docx", type: "doc", size: "1.8 MB", modified: "Yesterday", category: "HR" },
  { id: 3, name: "Inventory Audit.xlsx", type: "excel", size: "890 KB", modified: "Dec 1, 2024", category: "Operations" },
  { id: 4, name: "Customer Feedback Summary.pdf", type: "pdf", size: "1.2 MB", modified: "Nov 30, 2024", category: "Support" },
  { id: 5, name: "Marketing Campaign Assets.zip", type: "zip", size: "45 MB", modified: "Nov 28, 2024", category: "Marketing" },
  { id: 6, name: "Financial Statement Nov.xlsx", type: "excel", size: "2.1 MB", modified: "Nov 25, 2024", category: "Finance" },
];

const folders = [
  { name: "Reports", count: 24, color: "bg-blue-500/20 text-blue-400" },
  { name: "HR Documents", count: 15, color: "bg-green-500/20 text-green-400" },
  { name: "Operations", count: 32, color: "bg-orange-500/20 text-orange-400" },
  { name: "Finance", count: 18, color: "bg-purple-500/20 text-purple-400" },
];

const typeIcons: Record<string, string> = {
  pdf: "📄",
  doc: "📝",
  excel: "📊",
  zip: "📦",
};

export default function OfficeDocuments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<'grid' | 'list'>('list');

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="office_member">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Documents</h1>
            <p className="text-white/60">Manage and organize store documents</p>
          </div>
          <Button className="bg-gradient-to-r from-indigo-500 to-violet-500">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {folders.map((folder, i) => (
            <motion.div
              key={folder.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/[0.08] transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${folder.color}`}>
                      <Folder className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{folder.name}</p>
                      <p className="text-sm text-white/60">{folder.count} files</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Recent Documents
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <Button variant="outline" className="border-white/10 bg-white/5">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm text-white/60 pb-3">Name</th>
                    <th className="text-center text-sm text-white/60 pb-3">Category</th>
                    <th className="text-center text-sm text-white/60 pb-3">Size</th>
                    <th className="text-center text-sm text-white/60 pb-3">Modified</th>
                    <th className="text-right text-sm text-white/60 pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map((doc, i) => (
                    <motion.tr
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{typeIcons[doc.type]}</span>
                          <span className="text-white font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <Badge variant="outline" className="border-white/10 text-white/60">
                          {doc.category}
                        </Badge>
                      </td>
                      <td className="py-4 text-center text-white/60">{doc.size}</td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-white/40">
                          <Clock className="w-3 h-3" />
                          <span className="text-sm">{doc.modified}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" className="h-8 text-white/60 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 text-white/60 hover:text-white">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
