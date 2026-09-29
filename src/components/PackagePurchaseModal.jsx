import React, { useState } from 'react';
import { 
  Package, 
  CreditCard, 
  UploadCloud, 
  CheckCircle2, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  Sparkles,
  FileCheck
} from 'lucide-react';

export default function PackagePurchaseModal({ onClose, onSuccess }) {
  const [selectedPlan, setSelectedPlan] = useState('gold'); // 'silver' | 'gold' | 'diamond'
  const [formData, setFormData] = useState({
    parentName: 'مریم رضایی',
    phone: '09123456789',
    childName: 'سارا',
    trackingNumber: ''
  });
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cardNumber = "۶۰۳۷-۹۹۷۵-۱۲۳۴-۵۶۷۸";
  const cardOwner = "موسسه آموزش سواد مالی کیندی‌مانی";

  const plans = [
    {
      id: 'silver',
      title: 'پکیج پایه (مراحل ۱ تا ۳)',
      price: '۴۹۰,۰۰۰ تومان',
      rawPrice: 490000,
      desc: 'دسترسی کامل به بازی شبیه‌ساز، مأموریت‌های مقدماتی و کیف پول'
    },
    {
      id: 'gold',
      title: 'پکیج طلایی (تمام ۶ مرحله + مربیگری)',
      price: '۸۹۰,۰۰۰ تومان',
      rawPrice: 890000,
      desc: 'دسترسی نامحدود به تمام مراحل، پشتیبانی اختصاصی والد و چالش‌ها',
      badge: 'پیشنهاد ویژه'
    },
    {
      id: 'diamond',
      title: 'پکیج جامع سالانه هوش اقتصادی',
      price: '۱,۴۵۰,۰۰۰ تومان',
      rawPrice: 1450000,
      desc: 'تمام بازی‌های آینده، صدور گواهینامه مهارت مالی و اشتراک نامحدود'
    }
  ];

  const handleCopyCard = () => {
    navigator.clipboard.writeText("6037997512345678");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptFile(file);
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiptFile) {
      alert('لطفاً عکس فیش واریزی را آپلود نمایید.');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      if (onSuccess) onSuccess(plans.find(p => p.id === selectedPlan));
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 2500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '14px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '26px',
        maxWidth: '460px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#00A082',
          padding: '16px 20px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={22} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700' }}>خرید پکیج آموزشی</div>
              <div style={{ fontSize: '11px', opacity: 0.85 }}>ارتقای دسترسی کودک به مراحل پیشرفته</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '18px' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Plan Selection */}
              <div>
                <label style={{ fontSize: '12px', color: '#475569', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
                  انتخاب پکیج:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {plans.map((p) => {
                    const isSelected = selectedPlan === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPlan(p.id)}
                        style={{
                          border: isSelected ? '2px solid #00A082' : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? '#F0FDF4' : '#FFFFFF',
                          borderRadius: '16px',
                          padding: '12px 14px',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>{p.title}</span>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#00A082' }}>{p.price}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', lineHeight: '1.5' }}>
                          {p.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bank Card Info Box */}
              <div style={{
                backgroundColor: '#FFFBEB',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid #FCD34D'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#92400E', marginBottom: '8px' }}>
                  <CreditCard size={16} />
                  <span>اطلاعات واریز کارت به کارت:</span>
                </div>

                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  border: '1px solid #FEF3C7',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>شماره کارت بانکی:</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', letterSpacing: '1px', marginTop: '2px' }}>
                      {cardNumber}
                    </div>
                    <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>
                      به نام: {cardOwner}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCard}
                    style={{
                      backgroundColor: copied ? '#ECFDF5' : '#F1F5F9',
                      color: copied ? '#059669' : '#475569',
                      border: '1px solid #CBD5E1',
                      borderRadius: '10px',
                      padding: '6px 10px',
                      fontSize: '11px',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'کپی شد' : 'کپی'}
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '4px' }}>نام والد</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '4px' }}>شماره تماس</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', color: '#475569', display: 'block', marginBottom: '4px' }}>کد پیگیری یا شماره ارجاع واریز (اختیاری)</label>
                <input
                  type="text"
                  placeholder="مثال: ۸۹۲۳۴۱"
                  value={formData.trackingNumber}
                  onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
              </div>

              {/* Receipt File Upload */}
              <div>
                <label style={{ fontSize: '12px', color: '#1E293B', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  آپلود عکس فیش واریزی:
                </label>
                <label style={{
                  border: '2px dashed #94A3B8',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  backgroundColor: '#F8FAFC'
                }}>
                  <UploadCloud size={24} color="#64748B" />
                  <span style={{ fontSize: '12px', color: '#334155', fontWeight: '500' }}>
                    {receiptFile ? receiptFile.name : 'برای انتخاب تصویر فیش کلیک کنید'}
                  </span>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>فرمت JPG، PNG یا اسکرین‌شات</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>

                {receiptPreview && (
                  <div style={{ marginTop: '8px', textAlign: 'center' }}>
                    <img 
                      src={receiptPreview} 
                      alt="پیش‌نمایش فیش" 
                      style={{ maxHeight: '100px', borderRadius: '10px', border: '1px solid #E2E8F0' }} 
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  backgroundColor: '#00A082',
                  color: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '14px',
                  fontWeight: '700',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 15px rgba(0, 160, 130, 0.3)',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                <FileCheck size={16} />
                ارسال مشخصات و ثبت فیش پرداخت
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle2 size={54} color="#10B981" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                اطلاعات واریزی با موفقیت ارسال شد
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.6' }}>
                فیش واریزی شما در دست بررسی کارشناسان قرار گرفت. دسترسی پکیج به زودی برای حساب سارا فعال خواهد شد.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
