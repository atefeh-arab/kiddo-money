// Mock Data without any emojis - using clean identifiers & Lucide names
export const INITIAL_DATA = {
  parent: {
    name: "مریم رضایی",
    role: "والد ناظر",
    phone: "09123456789",
    avatarIcon: "UserCheck",
    walletBalance: 8000000,
    pendingApprovals: [
      {
        id: "approval-1",
        childId: "child-sara",
        childName: "سارا",
        stageId: 1,
        stageTitle: "مرحله ۱",
        rewardAmount: 200000,
        completedAt: "امروز ۱۰:۳۰",
        note: "تکمیل فعالیت‌های مرحله ۱",
        status: "pending"
      }
    ]
  },
  child: {
    id: "child-sara",
    name: "سارا",
    age: 9,
    avatarIcon: "User",
    walletBalance: 750000,
    level: 3,
    xp: 450,
    nextLevelXp: 600,
    currentGoal: {
      id: "goal-bike",
      title: "دوچرخه شهری",
      targetAmount: 5000000,
      savedAmount: 2000000,
      rewardPerStage: 500000,
      targetStage: 3,
      deadlineDays: 25,
      createdAt: "۱۴۰۳/۰۶/۱۵"
    },
    goalsHistory: [
      {
        id: "goal-past-1",
        title: "کتاب داستان",
        targetAmount: 400000,
        savedAmount: 400000,
        status: "achieved"
      }
    ],
    walletHistory: [
      {
        id: "tx-1",
        title: "پاداش مأموریت",
        amount: 50000,
        type: "credit",
        date: "دیروز"
      },
      {
        id: "tx-2",
        title: "چالش سریع",
        amount: 150000,
        type: "credit",
        date: "۲ روز پیش"
      },
      {
        id: "tx-3",
        title: "قلک هدف",
        amount: -500000,
        type: "saving_lock",
        date: "۳ روز پیش"
      }
    ]
  },
  stages: [
    {
      id: 1,
      title: "آشنایی با پول",
      subtitle: "ارزش پول، دخل و خرج و انتخاب",
      unlocked: true,
      completed: true,
      progress: 100,
      rewardAmount: 200000,
      iconType: "Coins",
      games: [
        {
          id: "game-1-1",
          title: "مسیر پول",
          style: "Money Path",
          desc: "در مسیر مزرعه تصمیم بگیر و سکه جمع کن",
          duration: "۳د",
          xpReward: 80,
          stars: 3,
          unlocked: true,
          type: "moneypath"
        }
      ]
    },
    {
      id: 2,
      title: "نیاز و خواسته",
      subtitle: "یادگیری تفاوت بین نیاز و خواسته",
      unlocked: true,
      completed: false,
      progress: 65,
      rewardAmount: 350000,
      iconType: "Brain",
      games: [
        {
          id: "game-2-1",
          title: "مسیر پول",
          style: "Money Path",
          desc: "در بازار شهر بین نیاز و خواسته انتخاب کن",
          duration: "۴د",
          xpReward: 90,
          stars: 2,
          unlocked: true,
          type: "moneypath"
        }
      ]
    },
    {
      id: 3,
      title: "پس‌انداز",
      subtitle: "نگه داشتن بخشی از پول برای آینده",
      unlocked: false,
      completed: false,
      progress: 0,
      rewardAmount: 500000,
      iconType: "PiggyBank",
      games: [
        {
          id: "game-3-1",
          title: "مسیر پول",
          style: "Money Path",
          desc: "کنار آبشار قلک کوچولو را پر کن",
          duration: "۵د",
          xpReward: 140,
          stars: 0,
          unlocked: false,
          type: "moneypath"
        }
      ]
    },
    {
      id: 4,
      title: "هدف‌گذاری",
      subtitle: "پس‌انداز برای رسیدن به یک هدف مشخص",
      unlocked: false,
      completed: false,
      progress: 0,
      rewardAmount: 700000,
      iconType: "Target",
      games: [
        {
          id: "game-4-1",
          title: "مسیر پول",
          style: "Money Path",
          desc: "در جنگل عجیب تصمیم‌های سخت‌تر بگیر",
          duration: "۳د",
          xpReward: 180,
          stars: 0,
          unlocked: false,
          type: "moneypath"
        }
      ]
    },
    {
      id: 5,
      title: "تصمیم‌گیری مالی",
      subtitle: "انتخاب بین چند گزینه و دیدن پیامد تصمیم",
      unlocked: false,
      completed: false,
      progress: 0,
      rewardAmount: 850000,
      iconType: "Scale",
      games: [
        {
          id: "game-5-1",
          title: "مسیر پول",
          style: "Money Path",
          desc: "در غار بلورین تله‌های پولی را دور بزن",
          duration: "۴د",
          xpReward: 200,
          stars: 0,
          unlocked: false,
          type: "moneypath"
        }
      ]
    },
    {
      id: 6,
      title: "مدیریت پول",
      subtitle: "ترکیب مهارت‌های قبلی در موقعیت‌های پیچیده‌تر",
      unlocked: false,
      completed: false,
      progress: 0,
      rewardAmount: 1200000,
      iconType: "Crown",
      games: [
        {
          id: "game-6-1",
          title: "مسیر پول",
          style: "Money Path",
          desc: "در قلعه طلایی پادشاه پولدار شو",
          duration: "۵د",
          xpReward: 250,
          stars: 0,
          unlocked: false,
          type: "moneypath"
        }
      ]
    }
  ]
};
