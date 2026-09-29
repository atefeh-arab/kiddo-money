import React from 'react';
import {
  Gamepad2,
  Wallet,
  Target,
  User,
  CheckCircle2,
  Lock,
  Star,
  Play,
  Flame,
  Award,
  Sparkles,
  Clock,
  PiggyBank,
  Coins,
  Sprout,
  ChevronLeft,
  Info,
  Scale,
  Brain,
  Crown,
  CircleCheckBig
} from 'lucide-react';
import FantasyAvatar from './FantasyAvatar';

const renderStageIcon = (type) => {
  switch (type) {
    case 'Coins': return <Coins size={20} />;
    case 'Brain': return <Brain size={20} />;
    case 'PiggyBank': return <PiggyBank size={20} />;
    case 'Target': return <Target size={20} />;
    case 'Scale': return <Scale size={20} />;
    case 'Crown': return <Crown size={20} />;
    default: return <Coins size={20} />;
  }
};

/* progress ring (65% style) used on the "مرحله ۲" bubble */
const ProgressRing = ({ percent = 0, size = 26, color = '#2E7D5B', track = '#E2E8F0' }) => {
  const r = size / 2 - 3;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth="3" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - percent / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

export default function ChildPanel({
  child,
  stages,
  activeTab,
  setActiveTab,
  onSelectGame,
  selectedStageId,
  setSelectedStageId
}) {
  const currentStage = stages.find(s => s.id === selectedStageId) || stages[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* ======== Yellow Profile Card ======== */}
      <div style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg, #F7D774 0%, #F2C94C 100%)',
        padding: '16px',
        margin: '12px 14px 6px',
        borderRadius: '24px',
        boxShadow: '0 8px 20px rgba(242,201,76,0.35)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* name + wallet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: '3px',
              boxShadow: '0 3px 8px rgba(0,0,0,0.12)'
            }}>
              <FantasyAvatar size={52} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={16} color="#D97706" />
                {child.name}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#7A5400', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Coins size={12} />
                {child.walletBalance.toLocaleString('fa-IR')} ت
              </div>
            </div>
          </div>

          {/* level pill + flame */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.92)',
              padding: '8px 14px',
              borderRadius: '18px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A' }}>سطح {child.level}</div>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748B' }}>{child.xp}/{child.nextLevelXp} XP</div>
            </div>
            <Flame size={22} color="#EA580C" />
          </div>
        </div>

        {/* XP bar */}
        <div style={{
          marginTop: '12px',
          height: '10px',
          borderRadius: '6px',
          backgroundColor: '#FBF3D9',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${Math.min(100, (child.xp / child.nextLevelXp) * 100)}%`,
            background: 'linear-gradient(90deg, #6FCF97 0%, #27AE60 100%)',
            borderRadius: '6px',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* ======== Main Scroll Area ======== */}
      <div style={{ padding: '10px 14px 16px', flex: 1, overflowY: 'auto' }}>
        {/* ================= TAB: STAGES ================= */}
        {activeTab === 'stages' && (
          <div>
            {/* Goal mini card */}
            {child.currentGoal && (
              <div
                onClick={() => setActiveTab('goal')}
                style={{
                  backgroundColor: '#EFF5EA',
                  borderRadius: '18px',
                  padding: '12px 14px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  border: '1px solid #DFEAD4'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '14px',
                    backgroundColor: '#DCEAD2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2E7D5B'
                  }}>
                    <Target size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: '#1E4D33' }}>{child.currentGoal.title}</div>
                    <div style={{ fontSize: '11px', color: '#2E7D5B', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <PiggyBank size={12} />
                      {child.currentGoal.savedAmount.toLocaleString('fa-IR')} / {child.currentGoal.targetAmount.toLocaleString('fa-IR')} ت
                    </div>
                  </div>
                </div>
                <ChevronLeft size={18} color="#2E7D5B" />
              </div>
            )}

            {/* Stage Bubbles — ordered 1..6 */}
            <div style={{
              backgroundColor: '#EFF5EA',
              borderRadius: '20px',
              padding: '12px 10px',
              marginBottom: '12px',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              border: '1px solid #DFEAD4'
            }}>
              {stages.map((stg) => {
                const isSelected = stg.id === selectedStageId;
                return (
                  <button
                    key={stg.id}
                    onClick={() => setSelectedStageId(stg.id)}
                    disabled={!stg.unlocked}
                    style={{
                      minWidth: '84px',
                      padding: '12px 8px 10px',
                      borderRadius: '18px',
                      background: isSelected
                        ? 'linear-gradient(160deg, #34A06B 0%, #256B47 100%)'
                        : (stg.unlocked ? '#FFFFFF' : '#E3EDE0'),
                      color: isSelected ? '#FFFFFF' : (stg.unlocked ? '#1E293B' : '#94A3B8'),
                      border: 'none',
                      boxShadow: isSelected ? '0 8px 18px rgba(37,107,71,0.35)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: stg.unlocked ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ color: isSelected ? '#FFF' : '#2E7D5B' }}>
                      {renderStageIcon(stg.iconType)}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: '900' }}>مرحله {stg.id}</div>
                    {stg.completed ? (
                      <CircleCheckBig size={14} color={isSelected ? '#FFF' : '#2E7D5B'} />
                    ) : stg.unlocked && stg.progress > 0 ? (
                      <ProgressRing percent={stg.progress} color={isSelected ? '#9BE1B8' : '#2E7D5B'} />
                    ) : stg.unlocked ? (
                      <div style={{ width: 14 }} />
                    ) : (
                      <Lock size={12} color="#94A3B8" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ======== Stage Detail Card ======== */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '16px',
              border: '1px solid #E7EEDF',
              boxShadow: '0 4px 16px rgba(30,77,51,0.06)',
              marginBottom: '12px'
            }}>
              {/* title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'right', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Info size={16} color="#94A3B8" />
                    <h2 style={{ fontSize: '17px', fontWeight: '900', color: '#1E4D33' }}>
                      {currentStage.title}
                    </h2>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                    {currentStage.subtitle}
                  </div>
                </div>
              </div>

              {/* reward pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: '#FBF3D9',
                border: '1px solid #F2E3AC',
                padding: '5px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '900',
                color: '#B45309',
                marginTop: '10px'
              }}>
                <Coins size={13} />
                {currentStage.rewardAmount.toLocaleString('fa-IR')} ت
              </div>

              {/* progress */}
              <div style={{ margin: '12px 0 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '900', color: '#1E4D33', marginBottom: '5px' }}>
                  <span>{currentStage.progress}٪</span>
                  <span>پیشرفت مرحله</span>
                </div>
                <div style={{ height: '9px', borderRadius: '6px', backgroundColor: '#E7EEDF', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${currentStage.progress}%`,
                    background: 'linear-gradient(90deg, #6FCF97 0%, #27AE60 100%)',
                    borderRadius: '6px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              {/* games */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentStage.games && currentStage.games.length > 0 ? (
                  currentStage.games.map((g) => (
                    <div
                      key={g.id}
                      style={{
                        backgroundColor: '#FDFEFC',
                        borderRadius: '16px',
                        padding: '10px 12px',
                        border: '1px solid #EDF2E8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px'
                      }}
                    >
                      {/* meta (left) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '12px',
                          backgroundColor: '#EFF5EA',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2E7D5B',
                          flexShrink: 0
                        }}>
                          <Gamepad2 size={19} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: '900', color: '#1E293B' }}>
                            {g.title}
                          </div>
                          <div style={{ fontSize: '10px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px', flexWrap: 'wrap' }}>
                            <span style={{ color: '#D97706', fontWeight: '900' }}>{g.style}</span>
                            <span>·</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                              <Clock size={10} />
                              {g.duration}
                            </span>
                            <span>·</span>
                            <span style={{ color: '#2E7D5B', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '2px' }}>
                              <Award size={10} />
                              +{g.xpReward} XP
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* play + stars (right) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1, 2, 3].map(s => (
                            <Star
                              key={s}
                              size={13}
                              color={s <= g.stars ? '#F59E0B' : '#D8DEE4'}
                              fill={s <= g.stars ? '#F59E0B' : '#D8DEE4'}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => onSelectGame(g, currentStage)}
                          style={{
                            background: 'linear-gradient(160deg, #F7D774 0%, #F2C94C 100%)',
                            color: '#1E293B',
                            width: '40px',
                            height: '40px',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 5px 14px rgba(242,201,76,0.5)',
                            cursor: 'pointer'
                          }}
                        >
                          <Play size={16} fill="#1E293B" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '16px 0', color: '#94A3B8' }}>
                    <Lock size={24} style={{ margin: '0 auto 6px', opacity: 0.5 }} />
                    <div style={{ fontSize: '11px' }}>قفل</div>
                  </div>
                )}
              </div>
            </div>

            {/* ======== Sidekick Banner (Sprout mascot) ======== */}
            <div
              onClick={() => setActiveTab('profile')}
              style={{
                background: 'linear-gradient(135deg, #EAF4E2 0%, #DFEED3 100%)',
                borderRadius: '22px',
                padding: '14px 16px',
                border: '1px solid #D6E5C8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* leaf deco */}
              <div style={{ position: 'absolute', left: 90, top: -12, opacity: 0.5, transform: 'rotate(30deg)' }}>
                <Sprout size={44} color="#9CC98A" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                <SproutMascot size={54} />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '900', color: '#1E4D33' }}>
                    تو مسیر درستی هستی!
                  </div>
                  <div style={{ fontSize: '11px', color: '#4E7A5A', fontWeight: '600', marginTop: '2px' }}>
                    با هر قدم، به هدفهات نزدیک‌تر می‌شی.
                  </div>
                </div>
              </div>
              <ChevronLeft size={18} color="#2E7D5B" style={{ position: 'relative' }} />
            </div>
          </div>
        )}

        {/* ================= TAB: WALLET ================= */}
        {activeTab === 'wallet' && (
          <div>
            <div style={{
              background: 'linear-gradient(135deg, #34A06B 0%, #256B47 100%)',
              borderRadius: '24px',
              padding: '20px',
              color: '#FFFFFF',
              boxShadow: '0 8px 25px rgba(37,107,71,0.3)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Wallet size={14} />
                  کیف پول
                </span>
                <span style={{ fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
                  Blue Junior
                </span>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px' }}>
                {child.walletBalance.toLocaleString('fa-IR')} <span style={{ fontSize: '14px', fontWeight: '600' }}>تومان</span>
              </div>

              <div style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '14px',
                padding: '8px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <PiggyBank size={14} />
                  قلک هدف:
                </span>
                <span style={{ fontWeight: '800' }}>
                  {child.currentGoal ? child.currentGoal.savedAmount.toLocaleString('fa-IR') : 0} ت
                </span>
              </div>
            </div>

            {/* Transactions */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid #E7EEDF'
            }}>
              <div style={{ fontSize: '13px', fontWeight: '900', color: '#0F172A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                تراکنش‌ها
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {child.walletHistory.map(tx => (
                  <div
                    key={tx.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: '1px solid #F4F7F1'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#1E293B' }}>{tx.title}</div>
                      <div style={{ fontSize: '10px', color: '#94A3B8' }}>{tx.date}</div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '900',
                      color: tx.amount > 0 ? '#10B981' : '#F59E0B'
                    }}>
                      {tx.amount > 0 ? `+${tx.amount.toLocaleString('fa-IR')}` : tx.amount.toLocaleString('fa-IR')} ت
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: GOAL ================= */}
        {activeTab === 'goal' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '20px',
            border: '1px solid #E7EEDF'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '20px',
                backgroundColor: '#FBF3D9',
                border: '2px solid #F2C94C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B45309',
                margin: '0 auto 10px'
              }}>
                <Target size={28} />
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A' }}>
                {child.currentGoal.title}
              </h2>
              <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '2px' }}>
                <Clock size={12} />
                {child.currentGoal.deadlineDays} روز تا هدف
              </div>
            </div>

            {/* Progress */}
            <div style={{
              backgroundColor: '#F7FAF3',
              borderRadius: '16px',
              padding: '14px',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>
                <span style={{ color: '#64748B' }}>پیشرفت قلک</span>
                <span style={{ color: '#2E7D5B' }}>
                  {((child.currentGoal.savedAmount / child.currentGoal.targetAmount) * 100).toFixed(0)}٪
                </span>
              </div>
              <div style={{ height: '10px', borderRadius: '5px', backgroundColor: '#E7EEDF', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(child.currentGoal.savedAmount / child.currentGoal.targetAmount) * 100}%`,
                  background: 'linear-gradient(90deg, #6FCF97 0%, #27AE60 100%)',
                  borderRadius: '5px'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
                <span>{child.currentGoal.savedAmount.toLocaleString('fa-IR')} ت</span>
                <span>{child.currentGoal.targetAmount.toLocaleString('fa-IR')} ت</span>
              </div>
            </div>

            <div style={{
              backgroundColor: '#FBF3D9',
              borderRadius: '14px',
              padding: '10px 12px',
              border: '1px solid #F2E3AC',
              fontSize: '11px',
              color: '#92400E',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={14} color="#D97706" />
              <span>پاداش مرحله: +{child.currentGoal.rewardPerStage.toLocaleString('fa-IR')} ت با تأیید والد</span>
            </div>
          </div>
        )}

        {/* ================= TAB: PROFILE ================= */}
        {activeTab === 'profile' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '20px',
            border: '1px solid #E7EEDF'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                <FantasyAvatar size={72} />
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: '900', color: '#0F172A' }}>{child.name}</h2>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                قهرمان سواد مالی سطح {child.level} • {child.age} ساله
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ backgroundColor: '#F7FAF3', padding: '12px', borderRadius: '14px', textAlign: 'center' }}>
                <CheckCircle2 size={16} color="#2E7D5B" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '10px', color: '#64748B' }}>مراحل تکمیل</div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#2E7D5B', marginTop: '2px' }}>
                  {stages.filter(s => s.completed).length}
                </div>
              </div>
              <div style={{ backgroundColor: '#F7FAF3', padding: '12px', borderRadius: '14px', textAlign: 'center' }}>
                <Award size={16} color="#D97706" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '10px', color: '#64748B' }}>کل امتیاز</div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#D97706', marginTop: '2px' }}>{child.xp} XP</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======== White Bottom Navigation ======== */}
      <div style={{
        flexShrink: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #EDF2E8',
        padding: '10px 12px 14px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 50
      }}>
        {[
          { key: 'stages', label: 'مراحل', Icon: Gamepad2 },
          { key: 'wallet', label: 'کیف پول', Icon: Wallet },
          { key: 'goal', label: 'هدف', Icon: Target },
          { key: 'profile', label: 'پروفایل', Icon: User }
        ].map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              color: activeTab === key ? '#2E7D5B' : '#94A3B8',
              fontWeight: activeTab === key ? '900' : '600',
              fontSize: '10px',
              borderBottom: activeTab === key ? '3px solid #2E7D5B' : '3px solid transparent',
              borderRadius: '0 0 8px 8px',
              padding: '2px 10px 6px'
            }}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ Cute sprout sidekick mascot for the banner ============ */
const SproutMascot = ({ size = 54 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ flexShrink: 0 }}>
    {/* sparkles */}
    <path d="M78 30 L80 36 L86 38 L80 40 L78 46 L76 40 L70 38 L76 36 Z" fill="#F2C94C" />
    <path d="M20 22 L21.5 26.5 L26 28 L21.5 29.5 L20 34 L18.5 29.5 L14 28 L18.5 26.5 Z" fill="#F2C94C" />
    {/* body blob */}
    <ellipse cx="46" cy="62" rx="30" ry="27" fill="#7BB661" />
    <ellipse cx="46" cy="62" rx="30" ry="27" fill="none" stroke="#5E9A4B" strokeWidth="2" />
    {/* face patch */}
    <circle cx="46" cy="58" r="18" fill="#CDE8BC" />
    {/* leaf hair */}
    <path d="M46 34 Q42 18 30 16 Q40 12 48 20 Q56 10 64 14 Q54 20 52 34 Z" fill="#3E7B33" />
    {/* eyes */}
    <circle cx="40" cy="56" r="3.4" fill="#1E293B" />
    <circle cx="52" cy="56" r="3.4" fill="#1E293B" />
    <circle cx="41.2" cy="54.8" r="1.1" fill="#fff" />
    <circle cx="53.2" cy="54.8" r="1.1" fill="#fff" />
    {/* smile */}
    <path d="M41 64 Q46 68 51 64" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* arms */}
    <path d="M18 62 Q10 66 8 72" stroke="#5E9A4B" strokeWidth="5" strokeLinecap="round" fill="none" />
    {/* gold star coin */}
    <circle cx="12" cy="80" r="9" fill="#F2C94C" stroke="#D9A62E" strokeWidth="2" />
    <path d="M12 75 L13.6 78.6 L17.5 79 L14.7 81.6 L15.5 85.5 L12 83.5 L8.5 85.5 L9.3 81.6 L6.5 79 L10.4 78.6 Z" fill="#B7791F" />
  </svg>
);
