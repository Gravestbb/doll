import { useState } from 'react';
import { ConnectionScreen } from './components/ConnectionScreen';
import { HomeScreen } from './components/HomeScreen';
import { PoseAdjustmentScreen } from './components/PoseAdjustmentScreen';
import { PerformanceScreen } from './components/PerformanceScreen';
import { ScenarioScreen } from './components/ScenarioScreen';
import { ScenarioExecutionScreen } from './components/ScenarioExecutionScreen';
import { SchedulerScreen } from './components/SchedulerScreen';
import { ShopScreen } from './components/ShopScreen';
import { MenuScreen } from './components/MenuScreen';

export type Screen = 
  | 'connection' 
  | 'home' 
  | 'pose' 
  | 'performance' 
  | 'scenario' 
  | 'scenario-execution'
  | 'scheduler' 
  | 'shop' 
  | 'menu';

export interface DollStatus {
  connected: boolean;
  batteryLevel: number;
  affectionLevel: number;
  currentMode: string;
  dialogue: string;
  nextSchedule: string;
  deviceId: string;
  firmwareVersion: string;
  characterName: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('connection');
  const [dollStatus, setDollStatus] = useState<DollStatus>({
    connected: false,
    batteryLevel: 0,
    affectionLevel: 0,
    currentMode: 'スタンバイ',
    dialogue: '',
    nextSchedule: '',
    deviceId: '',
    firmwareVersion: '',
    characterName: '轟雷'
  });
  const [selectedScenario, setSelectedScenario] = useState<any>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleConnect = (status: DollStatus) => {
    setDollStatus(status);
    setCurrentScreen('home');
  };

  const handleScenarioSelect = (scenario: any) => {
    setSelectedScenario(scenario);
    setCurrentScreen('scenario-execution');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'connection':
        return <ConnectionScreen onConnect={handleConnect} />;
      case 'home':
        return <HomeScreen dollStatus={dollStatus} onNavigate={navigateTo} />;
      case 'pose':
        return <PoseAdjustmentScreen dollStatus={dollStatus} onBack={() => navigateTo('home')} />;
      case 'performance':
        return <PerformanceScreen dollStatus={dollStatus} onBack={() => navigateTo('home')} />;
      case 'scenario':
        return <ScenarioScreen dollStatus={dollStatus} onBack={() => navigateTo('home')} onSelectScenario={handleScenarioSelect} />;
      case 'scenario-execution':
        return <ScenarioExecutionScreen scenario={selectedScenario} onBack={() => navigateTo('scenario')} dollStatus={dollStatus} />;
      case 'scheduler':
        return <SchedulerScreen onBack={() => navigateTo('home')} />;
      case 'shop':
        return <ShopScreen dollStatus={dollStatus} onBack={() => navigateTo('home')} />;
      case 'menu':
        return <MenuScreen dollStatus={dollStatus} onBack={() => navigateTo('home')} onDisconnect={() => navigateTo('connection')} />;
      default:
        return <ConnectionScreen onConnect={handleConnect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50">
      {renderScreen()}
    </div>
  );
}

export default App;