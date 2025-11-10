import { Battery, Wifi, Heart, Calendar, Hand, Sparkles, BookOpen, ShoppingBag, Settings } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { DollStatus } from '../App';
import { Screen } from '../App';

interface HomeScreenProps {
  dollStatus: DollStatus;
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ dollStatus, onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-screen pb-6">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h1>{dollStatus.characterName}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Battery className="w-4 h-4" />
              <span>{dollStatus.batteryLevel}%</span>
            </div>
            <Wifi className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-4 h-4" />
          <span>好感度</span>
        </div>
        <Progress value={dollStatus.affectionLevel} className="h-2 bg-white/30" />
        <p className="text-right mt-1">Lv.{Math.floor(dollStatus.affectionLevel / 10)}</p>
      </div>

      {/* 3Dキャラクターモデル表示エリア */}
      <div className="px-4 mt-6">
        <Card className="relative h-64 bg-gradient-to-b from-blue-100 to-cyan-100 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white">3D</span>
              </div>
              <p className="text-gray-600">キャラクターモデル</p>
              <p className="text-gray-500">(上半身表示)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* セリフ表示 */}
      <div className="px-4 mt-4">
        <Card className="p-4 bg-white/80 backdrop-blur">
          <p className="text-center text-blue-600">{dollStatus.dialogue}</p>
        </Card>
      </div>

      {/* ステータス情報 */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        <Card className="p-3">
          <p className="text-gray-600 mb-1">現在のモード</p>
          <p>{dollStatus.currentMode}</p>
        </Card>
        <Card className="p-3">
          <p className="text-gray-600 mb-1">次の予定</p>
          <p className="truncate">{dollStatus.nextSchedule}</p>
        </Card>
      </div>

      {/* ナビゲーション */}
      <div className="px-4 mt-6">
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 bg-white hover:bg-blue-50 px-6"
            onClick={() => onNavigate('scheduler')}
          >
            <Calendar className="w-6 h-6 text-blue-500" />
            <span>スケジュール</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 bg-white hover:bg-blue-50 px-6"
            onClick={() => onNavigate('pose')}
          >
            <Hand className="w-6 h-6 text-blue-500" />
            <span>ポーズ調整</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 bg-white hover:bg-blue-50 px-6"
            onClick={() => onNavigate('performance')}
          >
            <Sparkles className="w-6 h-6 text-blue-500" />
            <span>演出</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 bg-white hover:bg-blue-50 px-6"
            onClick={() => onNavigate('scenario')}
          >
            <BookOpen className="w-6 h-6 text-blue-500" />
            <span>シナリオ</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 bg-white hover:bg-blue-50 px-6"
            onClick={() => onNavigate('shop')}
          >
            <ShoppingBag className="w-6 h-6 text-blue-500" />
            <span>拡張機能</span>
          </Button>

          <Button
            variant="outline"
            className="h-16 flex items-center justify-start gap-4 bg-white hover:bg-blue-50 px-6"
            onClick={() => onNavigate('menu')}
          >
            <Settings className="w-6 h-6 text-blue-500" />
            <span>メニュー</span>
          </Button>
        </div>
      </div>
    </div>
  );
}