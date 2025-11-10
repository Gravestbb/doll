import { useState } from 'react';
import { Bluetooth, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DollStatus } from '../App';

interface ConnectionScreenProps {
  onConnect: (status: DollStatus) => void;
}

interface Device {
  id: string;
  name: string;
  rssi: number;
}

export function ConnectionScreen({ onConnect }: ConnectionScreenProps) {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  const startScan = () => {
    setScanning(true);
    setDevices([]);
    
    // シミュレーション: 2秒後にデバイスを表示
    setTimeout(() => {
      setDevices([
        { id: 'CD-001-GOURAI', name: 'CutieroidDoll 轟雷', rssi: -45 },
        { id: 'CD-002-STYLET', name: 'CutieroidDoll スティレット', rssi: -67 },
        { id: 'CD-003-BASELARD', name: 'CutieroidDoll バーゼラルド', rssi: -82 }
      ]);
      setScanning(false);
    }, 2000);
  };

  const connectToDevice = (device: Device) => {
    // 接続シミュレーション
    const dollStatus: DollStatus = {
      connected: true,
      batteryLevel: 85,
      affectionLevel: 42,
      currentMode: 'スタンバイ',
      dialogue: 'おかえりなさい、マスター！',
      nextSchedule: '今日 18:00 - おやすみの挨拶',
      deviceId: device.id,
      firmwareVersion: 'v1.2.3',
      characterName: device.name.split(' ')[1]
    };
    onConnect(dollStatus);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bluetooth className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-blue-600 mb-2">CutieroidDoll</h1>
          <p className="text-gray-600">操作用アプリケーション</p>
        </div>

        <Card className="w-full p-6 mb-6">
          <h2 className="mb-4">デバイスを接続</h2>
          <p className="text-gray-600 mb-4">
            お持ちのCutieroidDollをBluetooth経由で接続します。
          </p>
          
          <Button 
            onClick={startScan} 
            disabled={scanning}
            className="w-full mb-4"
          >
            {scanning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                スキャン中...
              </>
            ) : (
              <>
                <Bluetooth className="w-4 h-4 mr-2" />
                デバイスをスキャン
              </>
            )}
          </Button>

          {devices.length > 0 && (
            <div className="space-y-2">
              <p className="text-gray-600 mb-2">検出されたデバイス:</p>
              {devices.map((device) => (
                <Card
                  key={device.id}
                  className="p-4 cursor-pointer hover:bg-pink-50 transition-colors"
                  onClick={() => connectToDevice(device)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p>{device.name}</p>
                      <p className="text-gray-500">{device.id}</p>
                    </div>
                    <div className="text-gray-400">
                      信号: {device.rssi} dBm
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>

        <p className="text-gray-500 text-center">
          バージョン 1.0.0 (プロトタイプ)
        </p>
      </div>
    </div>
  );
}