import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Map as MapIcon,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Star,
  RotateCcw,
  Wallet,
  X,
  Play,
  Lock
} from 'lucide-react';
import { MP_STAGES } from '../data/moneyPathData';
import {
  BeeHero,
  BeeHoney,
  ChoiceArt,
  SceneArt,
  StageBackdrop,
  MapNode,
  MapStageArt,
  CoinIcon,
  Cloud,
  Sparkle
} from './gameArt';

const fa = (n) => n.toLocaleString('fa-IR');

/* Node positions on the map — STAGE 1 AT THE TOP, others below in order */
const NODE_POS = [
  { x: 62, y: 62 },
  { x: 196, y: 112 },
  { x: 88, y: 168 },
  { x: 216, y: 222 },
  { x: 90, y: 276 },
  { x: 190, y: 330 }
];

/* Where the honey-bee buddy floats for each selected stage (top-left corner) */
const BEE_POS = [
  { x: 118, y: 18 },
  { x: 128, y: 70 },
  { x: 140, y: 120 },
  { x: 110, y: 178 },
  { x: 136, y: 234 },
  { x: 120, y: 292 }
];

export default function MoneyPathGame({ onExit, onComplete }) {
  const [view, setView] = useState('intro'); // 'intro' | 'map' | 'play' | 'result'
  const [stageIdx, setStageIdx] = useState(0);
  const [unlockedUpTo, setUnlockedUpTo] = useState(0); // furthest stage index unlocked this session
  const [stepIdx, setStepIdx] = useState(0);
  const [coins, setCoins] = useState(MP_STAGES[0].startCoins);
  const [outcome, setOutcome] = useState(null); // {correct, delta, choice, reaction}
  const [stageResult, setStageResult] = useState(null); // {coins, correctCount, total}
  const [goodCount, setGoodCount] = useState(0);

  const stage = MP_STAGES[stageIdx];
  const step = stage?.steps[stepIdx];

  /* ---------- flow handlers ---------- */
  const startStage = (idx) => {
    setStageIdx(idx);
    setStepIdx(0);
    setCoins(MP_STAGES[idx].startCoins);
    setGoodCount(0);
    setOutcome(null);
    setStageResult(null);
    setView('play');
  };

  const choose = (choice) => {
    if (outcome) return; // already answered
    setCoins((c) => c + choice.delta);
    setOutcome(choice);
    if (choice.correct) setGoodCount((g) => g + 1);
  };

  const nextAfterFeedback = () => {
    setOutcome(null);
    const nextIdx = stepIdx + 1;
    if (nextIdx < stage.steps.length) {
      setStepIdx(nextIdx);
    } else {
      // stage finished → report & unlock next
      const result = {
        stageId: stage.id,
        stageTitle: stage.title,
        coins,
        correctCount: goodCount,
        total: stage.steps.filter((s) => s.type === 'fork').length
      };
      setStageResult(result);
      if (onComplete) onComplete(result);
      setUnlockedUpTo((u) => Math.min(MP_STAGES.length - 1, Math.max(u, stageIdx + 1)));
      setView('result');
    }
  };

  const backToMap = () => setView('map');

  /* ---------- report stage result to parent ---------- */
  useEffect(() => {
    if (stageResult && onComplete) onComplete(stageResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageResult]);

  /* ==================== INTRO VIEW (short & sweet) ==================== */
  if (view === 'intro') {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg,#FFFBEB 0%, #FDE68A 100%)',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        <div style={{ position: 'absolute', top: '10%', left: '10%' }}>
          <Cloud x={0} y={0} s={0.9} o={0.7} />
        </div>
        <div style={{ position: 'absolute', top: '14%', right: '8%' }}>
          <Sparkle x={0} y={0} s={1.2} c="#FBBF24" />
        </div>
        <div style={{ position: 'absolute', bottom: '18%', left: '14%' }}>
          <Sparkle x={0} y={0} s={0.9} c="#F59E0B" />
        </div>

        <div className="animate-float">
          <BeeHoney size={140} />
        </div>

        <div style={{ fontSize: '24px', fontWeight: '900', color: '#1E293B', marginTop: '10px' }}>
          مسیر پول
        </div>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#92400E', marginTop: '6px', maxWidth: '260px', lineHeight: 1.9 }}>
          من زنبورم!
          <br />
          کمکم کن سکه‌هامو درست خرج کنم 🍯
        </div>

        <button
          onClick={() => setView('map')}
          style={{
            marginTop: '26px',
            backgroundColor: '#FFC244',
            color: '#1E293B',
            fontWeight: '900',
            fontSize: '16px',
            padding: '14px 40px',
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 20px rgba(255,194,68,0.5)',
            border: '3px solid #fff'
          }}
        >
          <Play size={18} fill="#1E293B" />
          بریم!
        </button>

        <button
          onClick={onExit}
          style={{
            marginTop: '14px',
            color: '#B45309',
            fontWeight: '800',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          برو بیرون
        </button>
      </div>
    );
  }

  /* ==================== MAP VIEW (stage 1 on TOP) ==================== */
  if (view === 'map') {
    const doneCount = MP_STAGES.filter((_, i) => i < unlockedUpTo).length;
    return (
      <div style={{ height: '100%', overflowY: 'auto', background: 'linear-gradient(180deg,#0E1726 0%, #1E293B 100%)', position: 'relative' }}>
        {/* header */}
        <div style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onExit}
            style={{
              width: '34px', height: '34px', borderRadius: '12px',
              backgroundColor: '#334155', color: '#CBD5E1',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#FFC244' }}>مسیر پول</div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>بالا شروع کن، پایین بیا!</div>
          </div>
          <div style={{
            backgroundColor: '#334155', padding: '6px 10px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', gap: '5px', color: '#FCD34D', fontSize: '12px', fontWeight: '800'
          }}>
            <CoinIcon size={15} />
            {fa(doneCount * 100)}
          </div>
        </div>

        {/* map card */}
        <div style={{ padding: '0 14px 20px' }}>
          <div style={{
            backgroundColor: '#F8FAFC', borderRadius: '24px', padding: '10px 8px 14px',
            border: '2px solid #FDE68A'
          }}>
            <svg viewBox="0 0 340 400" style={{ width: '100%', display: 'block' }}>
              <defs>
                <linearGradient id="mp-mapbg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF9E6" />
                  <stop offset="100%" stopColor="#FFF4D6" />
                </linearGradient>
              </defs>
              <rect width="340" height="400" rx="18" fill="url(#mp-mapbg)" />
              <Cloud x={62} y={28} s={0.7} o={0.6} />
              <Cloud x={292} y={120} s={0.55} o={0.5} />
              <Cloud x={40} y={330} s={0.6} o={0.5} />

              {/* winding path — top to bottom */}
              <path
                d="M62 62 C 140 70, 196 86, 196 112 C 196 140, 88 138, 88 168 C 88 198, 216 192, 216 222 C 216 252, 90 246, 90 276 C 90 306, 190 300, 190 330"
                fill="none" stroke="#FDE68A" strokeWidth="14" strokeLinecap="round" />
              <path
                d="M62 62 C 140 70, 196 86, 196 112 C 196 140, 88 138, 88 168 C 88 198, 216 192, 216 222 C 216 252, 90 246, 90 276 C 90 306, 190 300, 190 330"
                fill="none" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 12" />

              {/* start flag (top) & treasure chest (bottom) */}
              <g transform="translate(24,52)">
                <rect x="0" y="0" width="3" height="22" rx="1.5" fill="#B45309" />
                <path d="M3 2 L20 7 L3 12 Z" fill="#10B981" />
              </g>
              <g transform="translate(226,318)">
                <path d="M0 10 Q0 0 12 0 Q24 0 24 10 L24 20 Q12 26 0 20 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
                <rect x="8" y="4" width="8" height="3" rx="1.5" fill="#B45309" />
              </g>

              {/* stage nodes — index 0 is drawn first => TOP of the map */}
              {MP_STAGES.map((stg, i) => {
                const pos = NODE_POS[i];
                const done = i < unlockedUpTo;
                const current = i === unlockedUpTo;
                const locked = i > unlockedUpTo;
                return (
                  <g key={stg.id} onClick={() => { if (!locked) { setStageIdx(i); } }} style={{ cursor: locked ? 'not-allowed' : 'pointer' }}>
                    <MapNode
                      x={pos.x} y={pos.y}
                      r={26}
                      color={stg.difficultyColor}
                      done={done} current={current && !stageResult} locked={locked}
                    >
                      <text textAnchor="middle" dy="5" fontSize="15" fontWeight="900" fill={locked ? '#94A3B8' : '#fff'}>
                        {fa(stg.id)}
                      </text>
                    </MapNode>
                    {/* stage name right under each node */}
                    <text
                      x={pos.x}
                      textAnchor="middle"
                      y={pos.y + 44}
                      fontSize="11"
                      fontWeight="900"
                      fill={locked ? '#94A3B8' : '#1E293B'}
                    >
                      {stg.title}
                    </text>
                  </g>
                );
              })}

              {/* bee buddy holding honey — floats beside the selected stage */}
              <g transform={`translate(${BEE_POS[stageIdx].x},${BEE_POS[stageIdx].y}) scale(0.5)`}>
                <BeeHoney size={110} />
              </g>
            </svg>
          </div>

          {/* selected stage card */}
          {(() => {
            const stg = MP_STAGES[stageIdx];
            const isDone = stageIdx < unlockedUpTo;
            const isLocked = stageIdx > unlockedUpTo;
            return (
              <div style={{
                backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '14px',
                marginTop: '12px', border: '1px solid #F1F5F9',
                display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                {/* mini art for this stage's theme */}
                <div style={{
                  backgroundColor: stg.bg[0],
                  borderRadius: '16px', padding: '6px',
                  border: '2px solid ' + stg.difficultyColor + '44',
                  flexShrink: 0
                }}>
                  <MapStageArt kind={stg.mapArt} size={64} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#0F172A' }}>
                    مرحله {fa(stg.id)}: {stg.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{stg.subtitle}</div>
                  <div style={{
                    fontSize: '10px', fontWeight: '800', marginTop: '5px', display: 'inline-block',
                    backgroundColor: stg.difficultyColor + '18', color: stg.difficultyColor,
                    padding: '2px 10px', borderRadius: '10px'
                  }}>
                    {stg.difficultyKid}
                  </div>
                </div>

                {isLocked ? (
                  <div style={{
                    backgroundColor: '#F1F5F9', color: '#94A3B8', fontWeight: '900',
                    padding: '10px 14px', borderRadius: '14px', fontSize: '12px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
                  }}>
                    <Lock size={15} />
                    قفله!
                  </div>
                ) : (
                  <button
                    onClick={() => startStage(stageIdx)}
                    style={{
                      backgroundColor: '#FFC244', color: '#1E293B', fontWeight: '900',
                      padding: '10px 18px', borderRadius: '14px', fontSize: '13px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      boxShadow: '0 4px 12px rgba(255,194,68,0.4)',
                      cursor: 'pointer'
                    }}
                  >
                    {isDone ? <RotateCcw size={15} /> : <Play size={15} fill="#1E293B" />}
                    {isDone ? 'دوباره' : 'بازی!'}
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    );
  }

  /* ==================== RESULT VIEW ==================== */
  if (view === 'result' && stageResult) {
    const stars = stageResult.correctCount >= 2 ? 3 : stageResult.correctCount === 1 ? 2 : 1;
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', background: 'linear-gradient(180deg,#FFFBEB 0%, #FDE68A 100%)', padding: '20px', position: 'relative'
      }}>
        <div className="animate-pop" style={{ textAlign: 'center' }}>
          <BeeHero size={130} mood={stageResult.correctCount > 0 ? 'happy' : 'sad'} />
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#1E293B', marginTop: '8px' }}>
            {stageResult.correctCount > 0 ? 'ایول! مرحله تموم شد! 🎉' : 'اشکالی نداره، دوباره تلاش کن!'}
          </div>
          <div style={{ fontSize: '12px', color: '#92400E', fontWeight: '600', marginTop: '2px' }}>
            مرحله {fa(stageResult.stageId)}: {stageResult.stageTitle}
          </div>

          {/* stars */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '10px 0' }}>
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                size={30}
                color={s <= stars ? '#F59E0B' : '#D1D5DB'}
                fill={s <= stars ? '#F59E0B' : '#D1D5DB'}
              />
            ))}
          </div>

          {/* honey jar result — the bee's piggy bank */}
          <div style={{
            backgroundColor: '#FFFFFF', borderRadius: '18px', padding: '12px 20px',
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
          }}>
            <Wallet size={18} color="#00A082" />
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#334155' }}>کوزهٔ عسلت:</span>
            <span style={{ fontSize: '16px', fontWeight: '900', color: '#00A082' }}>{fa(stageResult.coins)} سکه</span>
          </div>

          <div style={{ fontSize: '11px', color: '#B45309', marginTop: '8px', fontWeight: '700' }}>
            {stageResult.correctCount > 0
              ? `${fa(stageResult.correctCount)} انتخابِ درست از ${fa(stageResult.total)} تا → سکه‌ها رفتن تو کوزه‌ات!`
              : 'این‌بار سکه‌ای نرفت تو کوزه؛ دوباره امتحان کن!'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button
            onClick={() => startStage(stageIdx)}
            style={{
              backgroundColor: '#00A082', color: '#fff', fontWeight: '900',
              padding: '12px 20px', borderRadius: '16px', fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} />
            دوباره بازی
          </button>
          <button
            onClick={backToMap}
            style={{
              backgroundColor: '#FFC244', color: '#1E293B', fontWeight: '900',
              padding: '12px 20px', borderRadius: '16px', fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'
            }}
          >
            <MapIcon size={16} />
            برگرد به نقشه
          </button>
        </div>
      </div>
    );
  }

  /* ==================== PLAY VIEW ==================== */
  const isFork = step?.type === 'fork';
  const isGoal = step?.type === 'goal';

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* animated backdrop */}
      <StageBackdrop from={stage.bg[0]} to={stage.bg[1]} variant={stage.id} />

      {/* top bar */}
      <div style={{ position: 'relative', zIndex: 5, padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={backToMap}
          style={{
            width: '34px', height: '34px', borderRadius: '12px',
            backgroundColor: '#FFFFFFCC', display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #E2E8F0'
          }}
        >
          <ArrowRight size={16} color="#1E293B" style={{ transform: 'rotate(180deg)' }} />
        </button>

        {/* progress dots */}
        <div style={{ display: 'flex', gap: '5px', backgroundColor: '#FFFFFFCC', padding: '6px 10px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          {stage.steps.filter((s) => s.type === 'fork').map((_, i) => (
            <div key={i} style={{
              width: i === stepIdx ? '18px' : '8px',
              height: '8px',
              borderRadius: '6px',
              backgroundColor: i < stepIdx ? '#00A082' : i === stepIdx ? '#FFC244' : '#E2E8F0',
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>

        {/* coin wallet */}
        <div style={{
          backgroundColor: '#FFFFFF', padding: '6px 10px', borderRadius: '14px',
          display: 'flex', alignItems: 'center', gap: '4px',
          border: '1px solid #FDE68A', fontWeight: '900', fontSize: '12px', color: '#B45309'
        }}>
          <CoinIcon size={15} />
          {fa(coins)}
        </div>
      </div>

      {/* main scene */}
      <div style={{ position: 'relative', zIndex: 4, flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 16px 12px', minHeight: 0, overflowY: 'auto' }}>
        {/* bee buddy */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
          <div className="animate-float">
            <BeeHoney size={78} mood={outcome ? (outcome.correct ? 'happy' : 'sad') : 'happy'} />
          </div>
        </div>

        {/* QUESTION — big center card */}
        {isFork && (
          <div
            className="animate-pop"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '12px 16px',
              border: '2.5px solid #FDE68A',
              boxShadow: '0 8px 20px rgba(0,0,0,0.07)',
              textAlign: 'center',
              marginTop: '2px'
            }}
          >
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#D97706', letterSpacing: '0.5px' }}>
              سوال
            </div>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#1E293B', marginTop: '3px', lineHeight: 1.7 }}>
              {step.question}
            </div>
          </div>
        )}

        {/* situation scene */}
        <div style={{
          backgroundColor: '#FFFFFFD9', borderRadius: '22px', padding: '8px',
          border: '2px solid #fff', boxShadow: '0 10px 26px rgba(0,0,0,0.08)',
          display: 'flex', justifyContent: 'center', marginTop: '10px'
        }}>
          {isFork ? (
            <SceneArt scene={step.situation} size={170} />
          ) : (
            <SceneArt scene={step.scene} size={170} />
          )}
        </div>

        {/* CHOICES with kid hints */}
        {isFork && !outcome && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '12px' }}>
            {step.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => choose(choice)}
                style={{
                  backgroundColor: '#fff',
                  border: '2.5px solid #FDE68A',
                  borderRadius: '20px',
                  padding: '10px 8px 12px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                  transition: 'transform 0.15s ease'
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <ChoiceArt kind={choice.art} size={84} />
                <div style={{ fontSize: '12.5px', fontWeight: '900', color: '#1E293B', textAlign: 'center' }}>
                  {choice.label}
                </div>
                {/* kid explanation */}
                <div style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#64748B',
                  textAlign: 'center',
                  lineHeight: 1.7,
                  backgroundColor: '#FFF9E6',
                  borderRadius: '10px',
                  padding: '3px 7px',
                  width: '100%'
                }}>
                  {choice.hint}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* FEEDBACK — what happened & why */}
        {isFork && outcome && (
          <div
            className="animate-pop"
            style={{
              marginTop: '12px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '12px 14px',
              border: `2.5px solid ${outcome.correct ? '#10B981' : '#F87171'}`,
              boxShadow: '0 10px 24px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {outcome.correct ? <ThumbsUp size={20} color="#10B981" /> : <ThumbsDown size={20} color="#EF4444" />}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12.5px', fontWeight: '900', color: outcome.correct ? '#065F46' : '#991B1B' }}>
                {outcome.correct ? 'ایول! 🎉' : 'اوه! 😕'}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginTop: '2px', lineHeight: 1.7 }}>
                {outcome.feedback}
              </div>
            </div>
            <div style={{
              fontSize: '15px', fontWeight: '900', whiteSpace: 'nowrap',
              color: outcome.delta > 0 ? '#10B981' : outcome.delta === 0 ? '#0A3631' : '#EF4444'
            }}>
              {outcome.delta > 0
                ? `+${fa(outcome.delta)} سکه`
                : outcome.delta === 0
                  ? 'سکه‌هات موند!'
                  : `${fa(outcome.delta)} سکه`}
            </div>
          </div>
        )}

        {/* goal celebration */}
        {isGoal && (
          <div className="animate-pop" style={{ textAlign: 'center', marginTop: '8px' }}>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#92400E' }}>
              🍯 کوزهٔ عسلت پر شد: {fa(coins)} سکه!
            </div>
          </div>
        )}

        {/* next button */}
        {(outcome || isGoal) && (
          <button
            onClick={nextAfterFeedback}
            style={{
              marginTop: '12px',
              backgroundColor: '#00A082',
              color: '#fff',
              fontWeight: '900',
              fontSize: '14px',
              padding: '13px',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              boxShadow: '0 6px 16px rgba(0,160,130,0.35)'
            }}
          >
            <Sparkles size={16} />
            {isGoal ? 'پایان مرحله' : 'ادامه مسیر'}
            <ArrowRight size={16} style={{ transform: 'scaleX(-1)' }} />
          </button>
        )}
      </div>

      {/* floating sparkles deco */}
      <div style={{ position: 'absolute', top: '30%', left: '6%', zIndex: 1 }}>
        <Sparkle x={0} y={0} s={1} c="#FBBF24" />
      </div>
      <div style={{ position: 'absolute', top: '20%', right: '8%', zIndex: 1 }}>
        <Sparkle x={0} y={0} s={0.8} c="#F59E0B" />
      </div>
    </div>
  );
}
