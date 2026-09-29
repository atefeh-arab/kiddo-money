import React, { useState } from 'react';
import { 
  Users, 
  Wallet, 
  Target, 
  Bell, 
  Plus, 
  Check, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  AlertCircle, 
  Eye, 
  ArrowDownLeft, 
  Sparkles, 
  Award, 
  Layers, 
  ChevronRight,
  UserCheck,
  User,
  X,
  CreditCard,
  Package
} from 'lucide-react';
import PackagePurchaseModal from './PackagePurchaseModal';

export default function ParentPanel({
  parent,
  child,
  stages,
  onApproveReward,
  onTopUpParentWallet,
  onCreateGoal
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'goals' | 'wallet'
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('1000000');

  const [newGoal, setNewGoal] = useState({
    title: 'کلاس موسیقی و ساز',
    targetAmount: '3000000',
    rewardAmount: '300000',
    targetStage: '2',
    deadlineDays: '30'
  });

  const handleCreateGoalSubmit = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetAmount) return;

    onCreateGoal({
      title: newGoal.title,
      targetAmount: Number(newGoal.targetAmount),
      rewardAmount: Number(newGoal.rewardAmount),
      targetStage: Number(newGoal.targetStage),
      deadlineDays: Number(newGoal.deadlineDays)
    });

    setShowGoalModal(false);
  };

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    onTopUpParentWallet(Number(topUpAmount));
    setShowTopUpModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Scrollable Parent Content Area */}
      <div style={{ padding: '16px 14px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Parent Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0A3631 0%, #00A082 100%)',
        borderRadius: '24px',
        padding: '16px 18px',
        color: '#FFFFFF',
        boxShadow: '0 8px 25px rgba(10, 54, 49, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '22px',
            backgroundColor: '#FFC244',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1E293B'
          }}>
            <UserCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#A7F3D0', fontWeight: '500' }}>{parent.role}</div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>{parent.name}</div>
          </div>
        </div>

        {/* Parent Balance */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: '16px',
          padding: '8px 12px',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '10px', color: '#D1FAE5' }}>موجودی والد</div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#FFC244' }}>
            {parent.walletBalance.toLocaleString('fa-IR')} <span style={{ fontSize: '10px', color: '#FFF' }}>تومان</span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '4px',
        display: 'flex',
        gap: '4px',
        border: '1px solid #E5E9EC'
      }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '12px',
            backgroundColor: activeTab === 'overview' ? '#FFC244' : 'transparent',
            color: activeTab === 'overview' ? '#1E293B' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Eye size={14} />
          داشبورد
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '12px',
            backgroundColor: activeTab === 'goals' ? '#FFC244' : 'transparent',
            color: activeTab === 'goals' ? '#1E293B' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Target size={14} />
          اهداف
        </button>
        <button
          onClick={() => setActiveTab('wallet')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '12px',
            fontWeight: activeTab === 'wallet' ? '700' : '500',
            fontSize: '12px',
            backgroundColor: activeTab === 'wallet' ? '#FFC244' : 'transparent',
            color: activeTab === 'wallet' ? '#1E293B' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <Wallet size={14} />
          کیف پول
        </button>
        <button
          onClick={() => setShowPackageModal(true)}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '12px',
            backgroundColor: '#00A082',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            boxShadow: '0 2px 8px rgba(0,160,130,0.25)',
            cursor: 'pointer'
          }}
        >
          <Package size={14} />
          خرید پکیج
        </button>
      </div>

      {/* APPROVAL ALERT BANNER */}
      {parent.pendingApprovals && parent.pendingApprovals.length > 0 && (
        <div style={{
          backgroundColor: '#FFFBEB',
          borderRadius: '20px',
          padding: '14px',
          border: '1px solid #FCD34D',
          boxShadow: '0 4px 15px rgba(251, 191, 36, 0.12)'
        }}>
          {parent.pendingApprovals.map((approval) => (
            <div key={approval.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B45309', fontWeight: '900', fontSize: '13px' }}>
                  <Bell size={16} />
                  {approval.childName} • {approval.stageTitle}
                </div>
                <span style={{ fontSize: '11px', color: '#00A082', fontWeight: '900' }}>
                  +{approval.rewardAmount.toLocaleString('fa-IR')} ت
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <span style={{ fontSize: '11px', color: '#92400E' }}>شرط مرحله کامل شد</span>
                <button
                  onClick={() => onApproveReward(approval)}
                  style={{
                    backgroundColor: '#00A082',
                    color: '#FFFFFF',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Check size={14} />
                  تأیید و انتقال
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Child Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '16px',
            border: '1px solid #F1F5F9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '18px',
                  backgroundColor: '#E6F6F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00A082'
                }}>
                  <User size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A' }}>سارا</h3>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>سطح {child.level} • {child.xp} XP</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#00A082', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '8px' }}>
                فعال
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '14px' }}>
                <div style={{ fontSize: '10px', color: '#64748B' }}>مرحله جاری</div>
                <div style={{ fontSize: '13px', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>
                  مرحله ۲ (۶۵٪)
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '10px 12px', borderRadius: '14px' }}>
                <div style={{ fontSize: '10px', color: '#64748B' }}>کیف پول سارا</div>
                <div style={{ fontSize: '13px', fontWeight: '900', color: '#00A082', marginTop: '2px' }}>
                  {child.walletBalance.toLocaleString('fa-IR')} ت
                </div>
              </div>
            </div>

            {/* Stages Grid compact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {stages.map((stg) => (
                <div 
                  key={stg.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: stg.completed ? '#ECFDF5' : (stg.unlocked ? '#FFFBEB' : '#F8FAFC'),
                    border: '1px solid',
                    borderColor: stg.completed ? '#A7F3D0' : (stg.unlocked ? '#FDE68A' : '#E2E8F0')
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#1E293B' }}>
                      {stg.id}. {stg.title}
                    </span>
                  </div>

                  <span style={{ fontSize: '10px', fontWeight: '800', color: stg.completed ? '#059669' : (stg.unlocked ? `${stg.progress}٪` : 'قفل') }}>
                    {stg.completed ? 'تکمیل' : (stg.unlocked ? `${stg.progress}٪` : 'قفل')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: GOALS */}
      {activeTab === 'goals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A' }}>اهداف مالی</h3>
            <button
              onClick={() => setShowGoalModal(true)}
              style={{
                backgroundColor: '#FFC244',
                color: '#1E293B',
                padding: '6px 12px',
                borderRadius: '12px',
                fontWeight: '900',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Plus size={14} />
              هدف جدید
            </button>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '16px',
            border: '1px solid #F1F5F9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A' }}>
                {child.currentGoal.title}
              </h4>
              <span style={{ fontSize: '12px', fontWeight: '900', color: '#1E293B' }}>
                {child.currentGoal.targetAmount.toLocaleString('fa-IR')} ت
              </span>
            </div>

            <div style={{ margin: '10px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '800', marginBottom: '4px' }}>
                <span style={{ color: '#64748B' }}>پیشرفت:</span>
                <span style={{ color: '#00A082' }}>
                  {child.currentGoal.savedAmount.toLocaleString('fa-IR')} ت ({((child.currentGoal.savedAmount / child.currentGoal.targetAmount) * 100).toFixed(0)}٪)
                </span>
              </div>
              <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#E2E8F0', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(child.currentGoal.savedAmount / child.currentGoal.targetAmount) * 100}%`,
                  backgroundColor: '#00A082',
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '10px', fontSize: '11px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Coins size={14} color="#D97706" />
              <span>پاداش مرحله ۳: +{child.currentGoal.rewardPerStage.toLocaleString('fa-IR')} ت</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB: WALLET */}
      {activeTab === 'wallet' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '18px',
            border: '1px solid #F1F5F9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748B' }}>موجودی والد</span>
                <div style={{ fontSize: '22px', fontWeight: '900', color: '#0F172A', marginTop: '2px' }}>
                  {parent.walletBalance.toLocaleString('fa-IR')} ت
                </div>
              </div>
              <button
                onClick={() => setShowTopUpModal(true)}
                style={{
                  backgroundColor: '#00A082',
                  color: '#FFFFFF',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} />
                شارژ
              </button>
            </div>

            <div style={{ backgroundColor: '#EFF6FF', borderRadius: '12px', padding: '10px', fontSize: '11px', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} />
              <span>زیرساخت متصل به Blue Junior</span>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showGoalModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '16px'
        }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '24px', maxWidth: '400px', width: '100%', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '900' }}>تعیین هدف جدید</h3>
              <button onClick={() => setShowGoalModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateGoalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="عنوان هدف"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                required
              />
              <input
                type="number"
                placeholder="مبلغ هدف (تومان)"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                required
              />
              <input
                type="number"
                placeholder="پاداش مرحله (تومان)"
                value={newGoal.rewardAmount}
                onChange={(e) => setNewGoal({ ...newGoal, rewardAmount: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                required
              />
              <button
                type="submit"
                style={{ backgroundColor: '#FFC244', color: '#1E293B', padding: '12px', borderRadius: '14px', fontWeight: '900', fontSize: '13px', marginTop: '6px' }}
              >
                ثبت هدف
              </button>
            </form>
          </div>
        </div>
      )}

      {showTopUpModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '16px'
        }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '24px', maxWidth: '360px', width: '100%', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '900' }}>شارژ کیف پول</h3>
              <button onClick={() => setShowTopUpModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleTopUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="number"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                style={{ padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '14px' }}
                required
              />
              <button
                type="submit"
                style={{ backgroundColor: '#00A082', color: '#FFF', padding: '12px', borderRadius: '14px', fontWeight: '700', fontSize: '13px', marginTop: '6px' }}
              >
                پرداخت و افزایش موجودی
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Package Purchase Modal */}
      {showPackageModal && (
        <PackagePurchaseModal
          onClose={() => setShowPackageModal(false)}
          onSuccess={(plan) => {
            alert(`درخواست خرید ${plan.title} با موفقیت ثبت شد.`);
          }}
        />
      )}
      </div>

      {/* Permanently Fixed Bottom Bar */}
      <div style={{
        flexShrink: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #ECEEF0',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: '#64748B',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="#00A082" />
          <span>نظارت و مدیریت فعال والد</span>
        </div>
        <span style={{ fontWeight: '800', color: '#00A082' }}>سارا آنلاین</span>
      </div>
    </div>
  );
}
