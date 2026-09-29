import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Sparkles,
  Users,
  Bell
} from 'lucide-react';
import { INITIAL_DATA } from './data/mockData';
import MoneyPathGame from './game/MoneyPathGame';
import AppLogo from './components/AppLogo';
import ChildPanel from './components/ChildPanel';
import ParentPanel from './components/ParentPanel';

export default function App() {
  const [currentRole, setCurrentRole] = useState('child'); // 'child' | 'parent'
  const [data, setData] = useState(INITIAL_DATA);
  const [childTab, setChildTab] = useState('stages');
  const [selectedStageId, setSelectedStageId] = useState(1);
  const [activePlayableGame, setActivePlayableGame] = useState(false);
  const [selectedGameInfo, setSelectedGameInfo] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Launch the Money Path decision game
  const handleSelectGame = (game, stage) => {
    setSelectedGameInfo({
      title: game.title,
      style: game.style,
      stageId: stage.id,
      stageTitle: `مرحله ${stage.id}: ${stage.title}`
    });
    setActivePlayableGame(true);
  };

  // Sync MoneyPath stage completion → XP for the child + progress on that stage
  const handleGameSync = (result) => {
    setData(prev => {
      const stageId = result.stageId;
      const correctRatio = result.total > 0 ? result.correctCount / result.total : 0;
      const stageProgress = Math.round(correctRatio * 100);
      const xpGain = 30 + result.correctCount * 25;

      const updatedStages = prev.stages.map(stg => {
        if (stg.id === stageId) {
          return {
            ...stg,
            progress: Math.max(stg.progress, stageProgress),
            completed: stg.completed || correctRatio >= 0.5
          };
        }
        return stg;
      });

      // unlock next stage after finishing this one
      const nextIdx = updatedStages.findIndex(s => s.id === stageId) + 1;
      if (nextIdx < updatedStages.length && correctRatio >= 0.5) {
        updatedStages[nextIdx] = { ...updatedStages[nextIdx], unlocked: true };
      }

      const newXp = Math.min(prev.child.nextLevelXp, prev.child.xp + xpGain);

      return {
        ...prev,
        child: {
          ...prev.child,
          xp: newXp
        },
        stages: updatedStages
      };
    });
  };

  // Parent Approves reward
  const handleApproveReward = (approval) => {
    setData(prev => {
      const reward = approval.rewardAmount;
      if (prev.parent.walletBalance < reward) {
        showToast('موجودی والد ناکافی است!');
        return prev;
      }

      const newParentBalance = prev.parent.walletBalance - reward;
      const newChildBalance = prev.child.walletBalance + reward;

      const newSavedGoal = prev.child.currentGoal 
        ? Math.min(prev.child.currentGoal.targetAmount, prev.child.currentGoal.savedAmount + reward) 
        : 0;

      const nextStageId = approval.stageId + 1;
      const updatedStages = prev.stages.map(s => {
        if (s.id === nextStageId) {
          return { ...s, unlocked: true };
        }
        return s;
      });

      const updatedTx = [
        {
          id: `tx-${Date.now()}`,
          title: `پاداش مرحله ${approval.stageId}`,
          amount: reward,
          type: 'credit',
          date: 'هم‌اکنون'
        },
        ...prev.child.walletHistory
      ];

      return {
        ...prev,
        parent: {
          ...prev.parent,
          walletBalance: newParentBalance,
          pendingApprovals: prev.parent.pendingApprovals.filter(a => a.id !== approval.id)
        },
        child: {
          ...prev.child,
          walletBalance: newChildBalance,
          walletHistory: updatedTx,
          currentGoal: prev.child.currentGoal ? {
            ...prev.child.currentGoal,
            savedAmount: newSavedGoal
          } : null
        },
        stages: updatedStages
      };
    });

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    } catch (e) {}

    showToast(`انتقال ${approval.rewardAmount.toLocaleString('fa-IR')} ت انجام شد`);
  };

  // Top up parent wallet
  const handleTopUpParentWallet = (amount) => {
    setData(prev => ({
      ...prev,
      parent: {
        ...prev.parent,
        walletBalance: prev.parent.walletBalance + amount
      }
    }));
    showToast(`شارژ ${amount.toLocaleString('fa-IR')} ت انجام شد`);
  };

  // Create new goal by parent
  const handleCreateGoal = (goalData) => {
    setData(prev => ({
      ...prev,
      child: {
        ...prev.child,
        currentGoal: {
          id: `goal-${Date.now()}`,
          title: goalData.title,
          targetAmount: goalData.targetAmount,
          savedAmount: 0,
          rewardPerStage: goalData.rewardAmount,
          targetStage: goalData.targetStage,
          deadlineDays: goalData.deadlineDays,
          createdAt: 'امروز'
        }
      }
    }));
    showToast(`هدف جدید فعال شد`);
  };

  return (
    <div style={{
      height: '100dvh',
      backgroundColor: '#E9F0DC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 8px 16px',
      fontFamily: 'Vazirmatn, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Top Green Wave App Bar */}
      <header style={{
        maxWidth: '520px',
        width: '100%',
        flexShrink: 0,
        background: 'linear-gradient(180deg, #A9D295 0%, #CBE5B4 100%)',
        borderRadius: '0 0 30px 30px',
        padding: '14px 16px 24px',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 22px rgba(62,155,99,0.22)'
      }}>
        {/* soft wave deco at the bottom of the header */}
        <svg viewBox="0 0 520 40" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 26, opacity: 0.55 }}>
          <path d="M0 26 Q130 0 260 18 Q390 34 520 10 L520 40 L0 40 Z" fill="#DCEBD4" />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          <AppLogo size={34} />
          <div>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#1E4D33', lineHeight: 1.1 }}>
              مانی بی
            </div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#3E7B4F', letterSpacing: '0.5px' }}>
              MONEY BEE
            </div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#4E7A5A' }}>
              همبازی پول‌های کوچولو
            </div>
          </div>
        </div>

        {/* Role Toggle + Notification Bell */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            gap: '4px',
            backgroundColor: 'rgba(255,255,255,0.45)',
            padding: '3px',
            borderRadius: '999px'
          }}>
            <button
              onClick={() => {
                setCurrentRole('child');
                setActivePlayableGame(false);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '700',
                backgroundColor: currentRole === 'child' ? '#F2C94C' : 'transparent',
                color: currentRole === 'child' ? '#1E4D33' : '#2F5D46',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Gamepad2 size={14} />
              کودک
            </button>

            <button
              onClick={() => {
                setCurrentRole('parent');
                setActivePlayableGame(false);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '700',
                backgroundColor: currentRole === 'parent' ? '#2E7D5B' : 'transparent',
                color: currentRole === 'parent' ? '#FFFFFF' : '#2F5D46',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                position: 'relative'
              }}
            >
              <Users size={14} />
              والد
              {data.parent.pendingApprovals.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#EF4444'
                }} />
              )}
            </button>
          </div>

          {/* Notification bell with red dot */}
          <div style={{
            position: 'relative',
            color: '#1E4D33',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Bell size={18} />
            {data.parent.pendingApprovals.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                border: '1.5px solid #FFFFFF'
              }} />
            )}
          </div>
        </div>
      </header>

      {/* Main Canvas Frame with fixed viewport & internal scroll */}
      <main style={{
        maxWidth: activePlayableGame ? '820px' : '460px',
        width: '100%',
        backgroundColor: '#F7F9F0',
        borderRadius: '30px',
        overflow: 'hidden',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
      }}>
        {activePlayableGame ? (
          <MoneyPathGame
            onExit={() => setActivePlayableGame(false)}
            onComplete={handleGameSync}
            activeGameInfo={selectedGameInfo}
          />
        ) : (
          currentRole === 'child' ? (
            <ChildPanel
              child={data.child}
              stages={data.stages}
              activeTab={childTab}
              setActiveTab={setChildTab}
              onSelectGame={handleSelectGame}
              selectedStageId={selectedStageId}
              setSelectedStageId={setSelectedStageId}
            />
          ) : (
            <ParentPanel
              parent={data.parent}
              child={data.child}
              stages={data.stages}
              onApproveReward={handleApproveReward}
              onTopUpParentWallet={handleTopUpParentWallet}
              onCreateGoal={handleCreateGoal}
            />
          )
        )}
      </main>

      {/* Floating Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1E293B',
          color: '#FFFFFF',
          padding: '8px 18px',
          borderRadius: '20px',
          zIndex: 3000,
          fontSize: '12px',
          fontWeight: '800',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid #475569'
        }}>
          <Sparkles size={14} color="#FFC244" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
