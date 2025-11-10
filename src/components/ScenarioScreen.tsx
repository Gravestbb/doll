import { ArrowLeft, Lock, Play, Battery, BatteryWarning } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { DollStatus } from '../App';

interface Scenario {
  id: string;
  title: string;
  description: string;
  unlockCondition: string;
  isUnlocked: boolean;
  thumbnail: string;
  requiredAffection: number;
  estimatedTime: number;
}

interface ScenarioScreenProps {
  dollStatus: DollStatus;
  onBack: () => void;
  onSelectScenario: (scenario: Scenario) => void;
}

export function ScenarioScreen({ dollStatus, onBack, onSelectScenario }: ScenarioScreenProps) {
  const isPowered = dollStatus.batteryLevel > 20; // 給電状態シミュレーション

  const scenarios: Scenario[] = [
    {
      id: 's1',
      title: '初めての出会い',
      description: '轟雷との初めての対話。お互いのことを知りましょう。',
      unlockCondition: '初期解放',
      isUnlocked: true,
      thumbnail: '初回',
      requiredAffection: 0,
      estimatedTime: 5
    },
    {
      id: 's2',
      title: '訓練の日々',
      description: '一緒に訓練をする日常のストーリー。',
      unlockCondition: '好感度レベル2',
      isUnlocked: true,
      thumbnail: '訓練',
      requiredAffection: 20,
      estimatedTime: 8
    },
    {
      id: 's3',
      title: '休日のお出かけ',
      description: 'オフの日に一緒に過ごす特別な時間。',
      unlockCondition: '好感度レベル4',
      isUnlocked: dollStatus.affectionLevel >= 40,
      thumbnail: '休日',
      requiredAffection: 40,
      estimatedTime: 12
    },
    {
      id: 's4',
      title: '夕暮れの約束',
      description: '夕日の中で交わす大切な約束のストーリー。',
      unlockCondition: '好感度レベル6',
      isUnlocked: dollStatus.affectionLevel >= 60,
      thumbnail: '夕暮れ',
      requiredAffection: 60,
      estimatedTime: 10
    },
    {
      id: 's5',
      title: '心を通わせて',
      description: 'お互いの本当の気持ちを知る特別なシナリオ。',
      unlockCondition: '好感度レベル9',
      isUnlocked: dollStatus.affectionLevel >= 90,
      thumbnail: '告白',
      requiredAffection: 90,
      estimatedTime: 15
    }
  ];

  const handleScenarioClick = (scenario: Scenario) => {
    if (scenario.isUnlocked && isPowered) {
      onSelectScenario(scenario);
    }
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
        <h1>シナリオ</h1>
      </div>

      <div className="p-4 space-y-3">
        {/* 電源状態警告 */}
        {!isPowered && (
          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center gap-2 text-orange-700">
              <BatteryWarning className="w-5 h-5" />
              <div>
                <p>シナリオ実行には給電が必要です</p>
                <p className="text-orange-600">
                  ドールを充電してください（バッテリー: {dollStatus.batteryLevel}%）
                </p>
              </div>
            </div>
          </Card>
        )}

        {isPowered && (
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-2 text-green-700">
              <Battery className="w-5 h-5" />
              <p>給電OK - シナリオを実行できます</p>
            </div>
          </Card>
        )}

        {/* 説明 */}
        <Card className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100">
          <p className="text-gray-700">
            対話形式のストーリーを楽しめます。選択肢によって好感度が変化し、ドールが実際に動作します。
          </p>
        </Card>

        {/* シナリオ一覧 */}
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={`p-4 ${
              scenario.isUnlocked && isPowered
                ? 'cursor-pointer hover:shadow-lg transition-shadow'
                : 'opacity-60'
            }`}
            onClick={() => handleScenarioClick(scenario)}
          >
            <div className="flex gap-4">
              {/* サムネイル */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600">{scenario.thumbnail}</span>
              </div>

              {/* 情報 */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3>{scenario.title}</h3>
                  {!scenario.isUnlocked && (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {scenario.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-gray-600">
                    約{scenario.estimatedTime}分
                  </Badge>
                  {scenario.isUnlocked && isPowered && (
                    <Badge className="bg-blue-500">
                      <Play className="w-3 h-3 mr-1" />
                      実行可能
                    </Badge>
                  )}
                </div>

                {!scenario.isUnlocked && (
                  <p className="text-gray-500 mt-2">
                    解放条件: {scenario.unlockCondition}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}