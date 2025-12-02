import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Plus, ChevronLeft, ChevronRight,
  Clock, Users
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const shifts = [
  { id: 1, employee: "Sarah Chen", role: "Cashier", time: "6:00 AM - 2:00 PM", type: "Morning" },
  { id: 2, employee: "Mike Johnson", role: "Stockkeeper", time: "6:00 AM - 2:00 PM", type: "Morning" },
  { id: 3, employee: "John Smith", role: "Office", time: "8:00 AM - 4:00 PM", type: "Morning" },
  { id: 4, employee: "Emma Wilson", role: "Cashier", time: "2:00 PM - 10:00 PM", type: "Evening" },
  { id: 5, employee: "David Brown", role: "Cashier", time: "2:00 PM - 10:00 PM", type: "Evening" },
  { id: 6, employee: "Lisa Park", role: "Stockkeeper", time: "10:00 PM - 6:00 AM", type: "Night" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const shiftTypeColors: Record<string, string> = {
  Morning: "bg-blue-500/20 text-blue-400",
  Evening: "bg-orange-500/20 text-orange-400",
  Night: "bg-purple-500/20 text-purple-400",
};

export default function ManagerSchedules() {
  const [currentWeek, setCurrentWeek] = useState("Dec 2 - Dec 8, 2024");

  return (
    <DashboardLayout role="manager">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Schedules</h1>
            <p className="text-white/60">Manage team shifts and schedules</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Shift
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-sm text-white/60">Morning Shifts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">2</p>
                  <p className="text-sm text-white/60">Evening Shifts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1</p>
                  <p className="text-sm text-white/60">Night Shifts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Weekly Schedule
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <span className="text-white font-medium px-4">{currentWeek}</span>
                <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm text-white/60 pb-3 pr-4">Employee</th>
                    {weekDays.map(day => (
                      <th key={day} className="text-center text-sm text-white/60 pb-3 px-2 min-w-[100px]">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shifts.map((shift) => (
                    <tr key={shift.id} className="border-b border-white/5">
                      <td className="py-4 pr-4">
                        <div>
                          <p className="text-white font-medium">{shift.employee}</p>
                          <p className="text-xs text-white/60">{shift.role}</p>
                        </div>
                      </td>
                      {weekDays.map((day, i) => (
                        <td key={day} className="py-4 px-2 text-center">
                          {i < 5 && (
                            <Badge className={`${shiftTypeColors[shift.type]} text-xs`}>
                              {shift.type}
                            </Badge>
                          )}
                          {i >= 5 && shift.role === 'Cashier' && (
                            <Badge className={`${shiftTypeColors[shift.type]} text-xs`}>
                              {shift.type}
                            </Badge>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Today's Shifts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shifts.map((shift, i) => (
                <motion.div
                  key={shift.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {shift.employee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white font-medium">{shift.employee}</p>
                        <p className="text-xs text-white/60">{shift.role}</p>
                      </div>
                    </div>
                    <Badge className={shiftTypeColors[shift.type]}>
                      {shift.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Clock className="w-4 h-4" />
                    {shift.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
