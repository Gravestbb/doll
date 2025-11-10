import { ArrowLeft, Smartphone, Info, HelpCircle, Upload, Wifi, Trash2, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { DollStatus } from '../App';

interface MenuScreenProps {
  dollStatus: DollStatus;
  onBack: () => void;
  onDisconnect: () => void;
}

export function MenuScreen({ dollStatus, onBack, onDisconnect }: MenuScreenProps) {
  const handleFirmwareUpdate = () => {
    alert('ファームウェア更新を開始します...\n現在のバージョン: ' + dollStatus.firmwareVersion);
  };

  const handleDisconnect = () => {
    if (confirm('デバイスとの接続を解除しますか？')) {
      onDisconnect();
    }
  };

  const handleDeleteDevice = () => {
    if (confirm('このデバイス情報を削除しますか？\n接続も解除されます。')) {
      onDisconnect();
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
        <h1>メニュー・設定</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* 機体情報 */}
        <Card className="p-4">
          <h2 className="mb-3 flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            接続中の機体
          </h2>
          
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-600">キャラクター</span>
              <span>{dollStatus.characterName}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">デバイスID</span>
              <span className="font-mono">{dollStatus.deviceId}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">ファームウェア</span>
              <span>{dollStatus.firmwareVersion}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">バッテリー</span>
              <span>{dollStatus.batteryLevel}%</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-600">好感度レベル</span>
              <span>Lv.{Math.floor(dollStatus.affectionLevel / 10)}</span>
            </div>
          </div>
        </Card>

        {/* アップグレード */}
        <Card className="p-4">
          <h2 className="mb-3 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            アップグレード
          </h2>
          <p className="text-gray-600 mb-3">
            最新のファームウェアに更新して新機能を利用できます
          </p>
          <Button onClick={handleFirmwareUpdate} className="w-full">
            ファームウェア更新を確認
          </Button>
        </Card>

        {/* 接続管理 */}
        <Card className="p-4">
          <h2 className="mb-3 flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            接続管理
          </h2>
          
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleDisconnect}
            >
              <Wifi className="w-4 h-4 mr-2" />
              接続を解除
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:bg-red-50"
              onClick={handleDeleteDevice}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              デバイス情報を削除
            </Button>
          </div>
        </Card>

        {/* メンテナンス・サポート */}
        <Card className="p-4">
          <h2 className="mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            サポート
          </h2>
          
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              <span className="flex items-center">
                <Info className="w-4 h-4 mr-2" />
                メンテナンスガイド
              </span>
              <ExternalLink className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              <span className="flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                よくある質問
              </span>
              <ExternalLink className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              <span className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                公式サイト
              </span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* アプリ情報 */}
        <Card className="p-4 text-center bg-gradient-to-r from-blue-50 to-cyan-50">
          <p className="text-gray-600 mb-1">CutieroidDoll 操作用アプリケーション</p>
          <p className="text-gray-500">バージョン 1.0.0</p>
          <p className="text-gray-400 mt-2">© 2025 CutieroidDoll Project</p>
        </Card>
      </div>
    </div>
  );
}