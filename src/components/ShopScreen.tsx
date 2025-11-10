import { ArrowLeft, Download, ShoppingCart, Package, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { DollStatus } from '../App';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'dlc' | 'physical';
  category: string;
  status: 'available' | 'purchased' | 'installed';
  thumbnail: string;
}

interface ShopScreenProps {
  dollStatus: DollStatus;
  onBack: () => void;
}

export function ShopScreen({ dollStatus, onBack }: ShopScreenProps) {
  const shopItems: ShopItem[] = [
    {
      id: 'dlc1',
      name: '水着コスチュームパック',
      description: '夏の特別な水着姿と専用演出を追加',
      price: 1200,
      type: 'dlc',
      category: 'コスチューム',
      status: 'available',
      thumbnail: '水着'
    },
    {
      id: 'dlc2',
      name: 'クリスマスボイスパック',
      description: 'クリスマス限定のボイスと演出',
      price: 800,
      type: 'dlc',
      category: 'ボイス',
      status: 'purchased',
      thumbnail: 'Xmas'
    },
    {
      id: 'dlc3',
      name: 'バトルモーションセット',
      description: '戦闘シーン風のかっこいいモーション集',
      price: 1500,
      type: 'dlc',
      category: 'モーション',
      status: 'installed',
      thumbnail: '戦闘'
    },
    {
      id: 'dlc4',
      name: '日常会話拡張パック',
      description: '500以上の新しいセリフを追加',
      price: 1000,
      type: 'dlc',
      category: 'ボイス',
      status: 'available',
      thumbnail: '会話'
    },
    {
      id: 'phy1',
      name: '武装パーツセットA',
      description: 'ライフル＆ブレード（実物パーツ）',
      price: 3800,
      type: 'physical',
      category: '武装',
      status: 'available',
      thumbnail: '武装A'
    },
    {
      id: 'phy2',
      name: 'ドレスアップセット',
      description: 'パーティードレス（実物衣装）',
      price: 2500,
      type: 'physical',
      category: '衣装',
      status: 'purchased',
      thumbnail: 'ドレス'
    },
    {
      id: 'phy3',
      name: '追加表情パーツ',
      description: '笑顔・照れ顔など5種類（実物フェイスパーツ）',
      price: 2000,
      type: 'physical',
      category: '表情',
      status: 'available',
      thumbnail: '表情'
    }
  ];

  const handlePurchase = (item: ShopItem) => {
    // 購入処理シミュレーション
    alert(`${item.name}を購入しますか？\n価格: ¥${item.price.toLocaleString()}`);
  };

  const handleInstall = (item: ShopItem) => {
    // インストール処理シミュレーション
    alert(`${item.name}を機体にインストールしています...`);
  };

  const renderItemCard = (item: ShopItem) => (
    <Card key={item.id} className="p-4">
      <div className="flex gap-4">
        {/* サムネイル */}
        <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600">{item.thumbnail}</span>
        </div>

        {/* 情報 */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3>{item.name}</h3>
            <Badge variant="outline" className="ml-2">
              {item.category}
            </Badge>
          </div>

          <p className="text-gray-600 mb-2 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-purple-600">¥{item.price.toLocaleString()}</p>
            
            {item.status === 'installed' && (
              <Badge className="bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                インストール済み
              </Badge>
            )}
            
            {item.status === 'purchased' && item.type === 'dlc' && (
              <Button size="sm" onClick={() => handleInstall(item)}>
                <Download className="w-4 h-4 mr-1" />
                インストール
              </Button>
            )}
            
            {item.status === 'purchased' && item.type === 'physical' && (
              <Badge className="bg-blue-500">購入済み</Badge>
            )}
            
            {item.status === 'available' && (
              <Button size="sm" onClick={() => handlePurchase(item)}>
                <ShoppingCart className="w-4 h-4 mr-1" />
                購入
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

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
        <h1>拡張機能ショップ</h1>
      </div>

      <div className="p-4">
        {/* 説明 */}
        <Card className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 mb-4">
          <p className="text-gray-700">
            デジタルコンテンツ（DLC）と物理パーツを購入できます。DLCはアカウント認証後に機体へインストールできます。
          </p>
        </Card>

        {/* QRコード入力（物理パーツ特典用） */}
        <Card className="p-4 mb-4">
          <h2 className="mb-3">物理パーツ特典コード</h2>
          <p className="text-gray-600 mb-3">
            購入した物理パーツに付属のQRコードを入力してロック解除
          </p>
          <div className="flex gap-2">
            <Input placeholder="特典コードを入力" />
            <Button>認証</Button>
          </div>
        </Card>

        {/* タブ */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">すべて</TabsTrigger>
            <TabsTrigger value="dlc">DLC</TabsTrigger>
            <TabsTrigger value="physical">物理パーツ</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {shopItems.map(renderItemCard)}
          </TabsContent>

          <TabsContent value="dlc" className="space-y-3 mt-4">
            {shopItems.filter(item => item.type === 'dlc').map(renderItemCard)}
          </TabsContent>

          <TabsContent value="physical" className="space-y-3 mt-4">
            {shopItems.filter(item => item.type === 'physical').map(renderItemCard)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}