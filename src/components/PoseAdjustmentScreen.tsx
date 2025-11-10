import { useState } from 'react';
import { ArrowLeft, Power, RotateCcw, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { DollStatus } from '../App';

interface PoseAdjustmentScreenProps {
  dollStatus: DollStatus;
  onBack: () => void;
}

export function PoseAdjustmentScreen({ dollStatus, onBack }: PoseAdjustmentScreenProps) {
  const [motorHold, setMotorHold] = useState(false);
  const [savedPoses, setSavedPoses] = useState<string[]>([
    'デフォルトポーズ',
    '敬礼ポーズ',
    'ピースサイン'
  ]);

  const toggleMotorHold = () => {
    setMotorHold(!motorHold);
  };

  const savePose = () => {
    const poseName = `ポーズ ${savedPoses.length + 1}`;
    setSavedPoses([...savedPoses, poseName]);
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
        <h1>ポーズ調整</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* ステータス */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span>接続状態</span>
            <span className="text-green-600">●接続中</span>
          </div>
          <div className="flex items-center justify-between">
            <span>現在のモード</span>
            <span className="text-purple-600">
              {motorHold ? 'ポーズ調整モード' : dollStatus.currentMode}
            </span>
          </div>
        </Card>

        {/* モーター保持制御 */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p>モーター保持</p>
              <p className="text-gray-500">ONにすると手動でポーズを調整できます</p>
            </div>
            <Switch checked={motorHold} onCheckedChange={toggleMotorHold} />
          </div>
          
          {motorHold && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-blue-700">
                ✓ モーター保持が有効です
              </p>
              <p className="text-gray-600 mt-1">
                ドールの関節を手動で動かすことができます
              </p>
            </div>
          )}
        </Card>

        {/* 操作指示 */}
        {motorHold && (
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <h2 className="mb-3 text-blue-700">操作方法</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• 各関節を直接動かしてポーズを調整</li>
              <li>• 無理な力をかけないでください</li>
              <li>• 調整後は必ず保存してください</li>
              <li>• モーターOFF時は自動で復帰します</li>
            </ul>
          </Card>
        )}

        {/* 3Dプレビュー */}
        <Card className="p-6 bg-gradient-to-b from-blue-100 to-cyan-100">
          <div className="h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white">3D</span>
              </div>
              <p className="text-gray-600">現在のポーズプレビュー</p>
            </div>
          </div>
        </Card>

        {/* アクション */}
        <div className="flex gap-3">
          <Button
            onClick={savePose}
            disabled={!motorHold}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            現在のポーズを保存
          </Button>
          <Button
            variant="outline"
            disabled={!motorHold}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            リセット
          </Button>
        </div>

        {/* 保存済みポーズ */}
        <Card className="p-4">
          <h2 className="mb-3">保存済みポーズ</h2>
          <div className="space-y-2">
            {savedPoses.map((pose, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 cursor-pointer"
              >
                <span>{pose}</span>
                <Button variant="ghost" size="sm">
                  適用
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}