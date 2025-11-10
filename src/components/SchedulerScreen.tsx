import { useState } from 'react';
import { ArrowLeft, Plus, Clock, Copy, Trash2, Search, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Schedule {
  id: string;
  enabled: boolean;
  title: string;
  time: string;
  days: string[];
  type: 'performance' | 'scenario';
  targetId: string;
  targetName: string;
}

interface SchedulerScreenProps {
  onBack: () => void;
}

export function SchedulerScreen({ onBack }: SchedulerScreenProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      enabled: true,
      title: 'おはよう',
      time: '07:30',
      days: ['月', '火', '水', '木', '金', '土', '日'],
      type: 'performance',
      targetId: 'p1',
      targetName: 'おはよう挨拶'
    },
    {
      id: '2',
      enabled: true,
      title: 'おやすみ',
      time: '22:00',
      days: ['月', '火', '水', '木', '金', '土', '日'],
      type: 'performance',
      targetId: 'p7',
      targetName: 'おやすみ挨拶'
    },
    {
      id: '3',
      enabled: false,
      title: '週末シナリオ',
      time: '10:00',
      days: ['土', '日'],
      type: 'scenario',
      targetId: 's3',
      targetName: '休日のお出かけ'
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(9);
  const [recurringEnabled, setRecurringEnabled] = useState(true);

  // Generate dates for current week
  const weekDays = ['月', '火', '水', '木', '金', '土', '日'];
  const dates = [4, 6, 8, 9, 10, 11, 12];

  // Time slots from 7:00 to 12:00
  const timeSlots = [
    '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00'
  ];

  const toggleSchedule = (id: string) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const getScheduleAtTime = (time: string) => {
    return schedules.find(s => s.time === time);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>スケジューラー</h1>
        </div>
        
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
          編集
        </Button>
      </div>

      {/* Calendar Week Selector */}
      <div className="bg-white border-b">
        <div className="px-4 py-3">
          <p className="text-gray-500 mb-2">4月</p>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={day} className="flex flex-col items-center">
                <span className="text-gray-500 mb-1">{day}</span>
                <button
                  onClick={() => setSelectedDate(dates[index])}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    selectedDate === dates[index]
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {dates[index]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Schedule Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          {/* Recurring Setting Toggle */}
          <div className="px-4 py-3 border-b flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3">
              <Switch 
                checked={recurringEnabled} 
                onCheckedChange={setRecurringEnabled}
                className="data-[state=checked]:bg-green-500"
              />
              <span className="text-gray-700">繰り返し日程設定</span>
            </div>
          </div>

          {/* Time Slots */}
          <div className="relative">
            {timeSlots.map((time, index) => {
              const schedule = getScheduleAtTime(time);
              
              return (
                <div key={time} className="flex border-b border-gray-100">
                  {/* Time Label */}
                  <div className="w-16 flex-shrink-0 p-3 text-gray-500">
                    {time}
                  </div>

                  {/* Schedule Content */}
                  <div className="flex-1 min-h-[60px] p-2">
                    {schedule && schedule.enabled && (
                      <div className="bg-blue-500 text-white rounded-lg p-3 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <span>🤖</span>
                          </div>
                          <span>{schedule.title}</span>
                        </div>
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t bg-white p-4">
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
                <Plus className="w-5 h-5 text-blue-500" />
                <span className="text-blue-500">追加</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>新規スケジュール</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>タイトル</Label>
                  <Input placeholder="スケジュール名" />
                </div>
                <div>
                  <Label>時刻</Label>
                  <Input type="time" defaultValue="12:00" />
                </div>
                <div>
                  <Label>種類</Label>
                  <Select defaultValue="performance">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">演出</SelectItem>
                      <SelectItem value="scenario">シナリオ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>対象</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">おはよう挨拶</SelectItem>
                      <SelectItem value="p2">敬礼モーション</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>実行曜日</Label>
                  <div className="flex gap-2 mt-2">
                    {['月', '火', '水', '木', '金', '土', '日'].map(day => (
                      <Button
                        key={day}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button className="w-full" onClick={() => setDialogOpen(false)}>
                  作成
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
            <Search className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500">検索</span>
          </Button>

          <Button variant="outline" className="flex flex-col h-auto py-3 gap-1">
            <Trash2 className="w-5 h-5 text-blue-500" />
            <span className="text-blue-500">削除</span>
          </Button>
        </div>
      </div>
    </div>
  );
}