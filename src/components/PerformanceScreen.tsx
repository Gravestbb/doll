import { useState } from 'react';
import { ArrowLeft, Lock, Play, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { DollStatus } from '../App';

interface Performance {
  id: string;
  title: string;
  description: string;
  unlockCondition: string;
  isUnlocked: boolean;
  isFavorite: boolean;
  requiredAffection: number;
  isDLC: boolean;
}

interface PerformanceScreenProps {
  dollStatus: DollStatus;
  onBack: () => void;
}

export function PerformanceScreen({ dollStatus, onBack }: PerformanceScreenProps) {
  const [performances, setPerformances] = useState<Performance[]>([
    {
      id: 'p1',
      title: 'おはよう挨拶',
      description: '元気な朝の挨拶をします',
      unlockCondition: '初期解放',
      isUnlocked: true,
      isFavorite: true,
      requiredAffection: 0,
      isDLC: false
    },
    {
      id: 'p2',
      title: '敬礼モーション',
      description: 'きりっとした敬礼をします',
      unlockCondition: '好感度レベル3',
      isUnlocked: true,
      isFavorite: false,
      requiredAffection: 30,
      isDLC: false
    },
    {
      id: 'p3',
      title: '喜びのダンス',
      description: '嬉しい時の特別なダンス',
      unlockCondition: '好感度レベル5',
      isUnlocked: dollStatus.affectionLevel >= 50,
      isFavorite: false,
      requiredAffection: 50,
      isDLC: false
    },
    {
      id: 'p4',
      title: '特別な告白',
      description: '特別なメッセージを伝えます',
      unlockCondition: '好感度レベル8',
      isUnlocked: dollStatus.affectionLevel >= 80,
      isFavorite: false,
      requiredAffection: 80,
      isDLC: false
    },
    {
      id: 'p5',
      title: '水着ポーズ',
      description: '夏の特別演出',
      unlockCondition: 'DLC購入',
      isUnlocked: false,
      isFavorite: false,
      requiredAffection: 0,
      isDLC: true
    },
    {
      id: 'p6',
      title: 'クリスマスソング',
      description: 'クリスマスの特別な歌',
      unlockCondition: 'DLC購入',
      isUnlocked: false,
      isFavorite: false,
      requiredAffection: 0,
      isDLC: true
    }
  ]);

  const [selectedPerformance, setSelectedPerformance] = useState<Performance | null>(null);

  const executePerformance = (performance: Performance) => {
    if (performance.isUnlocked) {
      setSelectedPerformance(performance);
      // 実際のアプリでは、ここでBLE経由でドールに命令を送信
      setTimeout(() => {
        setSelectedPerformance(null);
      }, 3000);
    }
  };

  const toggleFavorite = (id: string) => {
    setPerformances(performances.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1>演出</h1>
      </div>

      {/* 実行中の演出 */}
      {selectedPerformance && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <Card className="p-6 text-center max-w-sm w-full">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mx-auto mb-4 animate-pulse flex items-center justify-center">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-2">{selectedPerformance.title}</h2>
            <p className="text-gray-600">実行中...</p>
          </Card>
        </div>
      )}

      <div className="p-4 space-y-3">
        <Card className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100">
          <p className="text-gray-700">
            演出を選択して実行できます。好感度やDLCによって新しい演出がアンロックされます。
          </p>
        </Card>

        {/* 演出一覧 */}
        {performances.map((performance) => (
          <Card
            key={performance.id}
            className={`p-4 ${!performance.isUnlocked ? 'opacity-60' : 'cursor-pointer hover:shadow-lg transition-shadow'}`}
            onClick={() => executePerformance(performance)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3>{performance.title}</h3>
                  {performance.isDLC && (
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                      DLC
                    </Badge>
                  )}
                  {!performance.isUnlocked && (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <p className="text-gray-600 mb-2">{performance.description}</p>
                <p className="text-gray-500">
                  解放条件: {performance.unlockCondition}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-3">
                {performance.isUnlocked && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(performance.id);
                      }}
                    >
                      <Star
                        className={`w-5 h-5 ${performance.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                      />
                    </Button>
                    <Play className="w-5 h-5 text-blue-500" />
                  </>
                )}
              </div>
            </div>

            {/* プレビューエリア */}
            {performance.isUnlocked && (
              <div className="mt-3 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center border border-gray-200">
                <p className="text-gray-500">3Dプレビュー</p>
              </div>
            )}

            {!performance.isUnlocked && performance.requiredAffection > 0 && (
              <div className="mt-3 p-2 bg-gray-100 rounded">
                <p className="text-gray-600">
                  必要好感度: {performance.requiredAffection} (現在: {dollStatus.affectionLevel})
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}