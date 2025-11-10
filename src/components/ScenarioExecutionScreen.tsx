import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, HeartCrack } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { DollStatus } from '../App';

interface ScenarioNode {
  id: number;
  speaker: string;
  text: string;
  choices?: {
    text: string;
    affectionChange: number;
    nextNode: number;
  }[];
  nextNode?: number;
}

interface ScenarioExecutionScreenProps {
  scenario: any;
  onBack: () => void;
  dollStatus: DollStatus;
}

export function ScenarioExecutionScreen({ scenario, onBack, dollStatus }: ScenarioExecutionScreenProps) {
  const [currentNodeId, setCurrentNodeId] = useState(0);
  const [totalAffectionChange, setTotalAffectionChange] = useState(0);
  const [showAffectionChange, setShowAffectionChange] = useState(false);
  const [lastAffectionChange, setLastAffectionChange] = useState(0);

  // サンプルシナリオデータ
  const scenarioNodes: ScenarioNode[] = [
    {
      id: 0,
      speaker: '轟雷',
      text: 'マスター、お時間ありますか？ちょっとお話したいことがあるんです。',
      choices: [
        { text: 'もちろん、何かな？', affectionChange: 2, nextNode: 1 },
        { text: '今は忙しいんだ', affectionChange: -1, nextNode: 2 }
      ]
    },
    {
      id: 1,
      speaker: '轟雷',
      text: 'ありがとうございます！実は最近、マスターと過ごす時間がとても楽しくて...',
      choices: [
        { text: '私も楽しいよ', affectionChange: 3, nextNode: 3 },
        { text: 'そう言ってくれて嬉しい', affectionChange: 2, nextNode: 3 }
      ]
    },
    {
      id: 2,
      speaker: '轟雷',
      text: 'そう、ですか...分かりました。また後で...',
      nextNode: 4
    },
    {
      id: 3,
      speaker: '轟雷',
      text: 'えへへ、これからもよろしくお願いしますね、マスター！',
      nextNode: 4
    },
    {
      id: 4,
      speaker: 'システム',
      text: 'シナリオが終了しました',
      nextNode: -1
    }
  ];

  const currentNode = scenarioNodes.find(n => n.id === currentNodeId) || scenarioNodes[0];
  const progress = ((currentNodeId + 1) / scenarioNodes.length) * 100;

  const handleChoice = (choice: { text: string; affectionChange: number; nextNode: number }) => {
    setLastAffectionChange(choice.affectionChange);
    setTotalAffectionChange(totalAffectionChange + choice.affectionChange);
    setShowAffectionChange(true);
    
    setTimeout(() => {
      setShowAffectionChange(false);
      setCurrentNodeId(choice.nextNode);
    }, 1500);
  };

  const handleNext = () => {
    if (currentNode.nextNode !== undefined) {
      if (currentNode.nextNode === -1) {
        onBack();
      } else {
        setCurrentNodeId(currentNode.nextNode);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 flex flex-col">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2>{scenario?.title || 'シナリオ'}</h2>
        </div>
        <Progress value={progress} className="h-1 bg-white/30" />
        <p className="text-right mt-1">進行度: {Math.round(progress)}%</p>
      </div>

      {/* 好感度変化通知 */}
      {showAffectionChange && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <Card className={`p-4 ${lastAffectionChange > 0 ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <div className="flex items-center gap-2">
              {lastAffectionChange > 0 ? (
                <>
                  <Heart className="w-6 h-6 text-blue-500 fill-blue-500" />
                  <span className="text-blue-700">
                    好感度 +{lastAffectionChange}
                  </span>
                </>
              ) : (
                <>
                  <HeartCrack className="w-6 h-6 text-gray-500" />
                  <span className="text-gray-700">
                    好感度 {lastAffectionChange}
                  </span>
                </>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* キャラクター表示エリア */}
      <div className="p-4 flex-shrink-0">
        <Card className="h-48 bg-gradient-to-b from-blue-100 to-cyan-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white">
                {currentNode.speaker === 'システム' ? '★' : currentNode.speaker.charAt(0)}
              </span>
            </div>
            <p className="text-gray-600">{currentNode.speaker}</p>
          </div>
        </Card>
      </div>

      {/* テキストエリア */}
      <div className="flex-1 p-4 flex flex-col">
        <Card className="p-6 mb-4">
          <p className="whitespace-pre-wrap leading-relaxed">
            {currentNode.text}
          </p>
        </Card>

        {/* 選択肢 */}
        {currentNode.choices && (
          <div className="space-y-3">
            {currentNode.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(choice)}
                variant="outline"
                className="w-full h-auto py-4 px-6 text-left justify-start bg-white hover:bg-blue-50"
              >
                <span className="mr-3 text-blue-500">►</span>
                {choice.text}
              </Button>
            ))}
          </div>
        )}

        {/* 次へボタン */}
        {!currentNode.choices && currentNode.nextNode !== undefined && (
          <Button
            onClick={handleNext}
            className="w-full"
          >
            {currentNode.nextNode === -1 ? '終了' : '次へ'}
          </Button>
        )}
      </div>

      {/* フッター - 現在の好感度変化 */}
      {totalAffectionChange !== 0 && (
        <div className="p-4 bg-white border-t">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-blue-500" />
            <span className="text-gray-600">
              今回の好感度変化: 
              <span className={totalAffectionChange > 0 ? 'text-blue-600' : 'text-gray-600'}>
                {totalAffectionChange > 0 ? '+' : ''}{totalAffectionChange}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}