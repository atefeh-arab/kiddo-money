// MoneyPath Game — scenario data (kid language!)
// هر مرحله یه «question» کوتاه داره که وسطِ صفحه میاد،
// و هر گزینه یه «hint» داره که بچه منظورشو بفهمه.

export const MP_STAGES = [
  {
    id: 1,
    title: 'مزرعه شیرین',
    subtitle: 'اولین قدم‌های مسیر',
    difficulty: 'آسان',
    difficultyKid: 'آسونه!',
    difficultyColor: '#10B981',
    mapArt: 'farm',
    startCoins: 100,
    targetCoins: 160,
    bg: ['#FFF9E6', '#FFE9AE'],
    steps: [
      {
        type: 'fork',
        situation: 'bakery_line',
        question: 'توی نونوایی چی می‌خری؟',
        choices: [
          {
            label: 'نان می‌خرم',
            hint: 'مامان گفته نان بخر؛ کارِ مهمه!',
            feedback: 'اول کارِ مهمو انجام دادی! مامان خوشحال می‌شه.',
            delta: 0, correct: true, art: 'bread', reaction: 'yay'
          },
          {
            label: 'آب‌نبات می‌خرم',
            hint: 'خوشمزه‌ست، ولی پولِ نانو!',
            feedback: 'آب‌نبات تموم می‌شه، ولی پولِ نان برنمی‌گرده!',
            delta: -30, correct: false, art: 'candy', reaction: 'sad'
          }
        ]
      },
      {
        type: 'fork',
        situation: 'lemonade_stand',
        question: 'چی‌کار کنی سکه جمع بشه؟',
        choices: [
          {
            label: 'لیموناد می‌فروشم',
            hint: 'بفروشی، سکه گیرت میاد!',
            feedback: 'فروش = سکه! چه باهوشی!',
            delta: 25, correct: true, art: 'lemonade', reaction: 'yay'
          },
          {
            label: 'می‌خوابم!',
            hint: 'خواب = هیچ سکه‌ای',
            feedback: 'خوابیدی و سکه‌ای به دست نیومد.',
            delta: 0, correct: false, art: 'sleep', reaction: 'sad'
          }
        ]
      },
      { type: 'goal', scene: 'honey_pot' }
    ]
  },
  {
    id: 2,
    title: 'بازار شهر',
    subtitle: 'لازمه یا فقط دلم می‌خواد؟',
    difficulty: 'آسان',
    difficultyKid: 'آسونه!',
    difficultyColor: '#10B981',
    mapArt: 'market',
    startCoins: 160,
    targetCoins: 220,
    bg: ['#FFF4D6', '#FFDF9E'],
    steps: [
      {
        type: 'fork',
        situation: 'toy_store',
        question: 'تو بازار چی لازم داری؟',
        choices: [
          {
            label: 'دفتر و مداد می‌خرم',
            hint: 'برای مدرسه‌ت کارت میاد',
            feedback: 'چیزی که لازم بودو خریدی؛ آفرین!',
            delta: 0, correct: true, art: 'school', reaction: 'yay'
          },
          {
            label: 'همه‌شو اسباب‌بازی می‌خرم',
            hint: 'ولی دیگه پولی نمی‌مونه!',
            feedback: 'اسباب‌بازی قشنگه، ولی مونه نداشتی!',
            delta: -50, correct: false, art: 'toy', reaction: 'sad'
          }
        ]
      },
      {
        type: 'fork',
        situation: 'street_performance',
        question: 'چی‌کار کنی سکه بگیری؟',
        choices: [
          {
            label: 'هم‌خوانی می‌کنم',
            hint: 'هنرَت رو نشون بده، سکه بگیر!',
            feedback: 'هنرَت سکه ساخت!',
            delta: 30, correct: true, art: 'music', reaction: 'yay'
          },
          {
            label: 'سکه‌هامو پرت می‌کنم',
            hint: 'سکه‌ها می‌غن و می‌رن!',
            feedback: 'سکه‌ها غلطیدن و رفتن...',
            delta: -20, correct: false, art: 'drop_coins', reaction: 'sad'
          }
        ]
      },
      { type: 'goal', scene: 'honey_pot' }
    ]
  },
  {
    id: 3,
    title: 'کنار آبشار',
    subtitle: 'قلک کوچولو پر می‌شه',
    difficulty: 'متوسط',
    difficultyKid: 'یه‌کم سخته',
    difficultyColor: '#F59E0B',
    mapArt: 'waterfall',
    startCoins: 220,
    targetCoins: 290,
    bg: ['#E6F6F3', '#BFEAE2'],
    steps: [
      {
        type: 'fork',
        situation: 'broken_bike',
        question: 'دوچرخه‌ات خراب شد! چی‌کار می‌کنی؟',
        choices: [
          {
            label: 'دوچرخه‌مو تعمیر می‌کنم',
            hint: 'ارزون‌تر از نوخریدنه!',
            feedback: 'تعمیر ارزون‌تره؛ سکه‌هات موندن.',
            delta: 0, correct: true, art: 'repair', reaction: 'yay'
          },
          {
            label: 'دوچرخهٔ نو گران می‌خرم',
            hint: 'همه‌ی سکه‌هات می‌پره!',
            feedback: 'پولِ زیادی دادی!',
            delta: -60, correct: false, art: 'expensive_bike', reaction: 'sad'
          }
        ]
      },
      {
        type: 'fork',
        situation: 'lemonade_refill',
        question: 'با سودِ لیمونادت چی‌کار کنی؟',
        choices: [
          {
            label: 'نصفشو دوباره تو کار می‌ذارم',
            hint: 'پول، پول می‌سازه!',
            feedback: 'پول، پول می‌سازه! داری ثروتمند می‌شی!',
            delta: 40, correct: true, art: 'lemonade2', reaction: 'yay'
          },
          {
            label: 'همه‌شو الکی خرج می‌کنم',
            hint: 'دیگه پولِ کار نداری',
            feedback: 'همه‌ش رفت؛ دیگه لیموناد نداشتی.',
            delta: -25, correct: false, art: 'candy', reaction: 'sad'
          }
        ]
      },
      { type: 'goal', scene: 'honey_pot' }
    ]
  },
  {
    id: 4,
    title: 'جنگل عجیب',
    subtitle: 'تصمیم‌های سخت‌تر',
    difficulty: 'متوسط',
    difficultyKid: 'یه‌کم سخته',
    difficultyColor: '#F59E0B',
    mapArt: 'jungle',
    startCoins: 290,
    targetCoins: 370,
    bg: ['#E8F5E9', '#C8E6C9'],
    steps: [
      {
        type: 'fork',
        situation: 'two_doors',
        question: 'دو تا دره! کدومو باز کنی؟',
        choices: [
          {
            label: 'درِ صندوق طلا',
            hint: 'اینجا گنج داره!',
            feedback: 'گنج! چه انتخابِ خوبی!',
            delta: 50, correct: true, art: 'treasure', reaction: 'yay'
          },
          {
            label: 'درِ جعبهٔ خالی',
            hint: 'اینجا فقط کلکه!',
            feedback: 'خالی بود! جنگل کلک زد.',
            delta: -40, correct: false, art: 'empty_box', reaction: 'sad'
          }
        ]
      },
      {
        type: 'fork',
        situation: 'helping_friend',
        question: 'دوستت کمک می‌خواد. چی‌کار می‌کنی؟',
        choices: [
          {
            label: 'به دوستم کمک می‌کنم',
            hint: 'دلِ دوستو شاد می‌کنی',
            feedback: 'دوستت خوشحال شد؛ دوستی طلاست.',
            delta: 0, correct: true, art: 'friend', reaction: 'yay'
          },
          {
            label: 'سکه‌هامو تو آب می‌ندازم',
            hint: 'تو آب می‌ره ته!',
            feedback: 'سکه تو آب گم شد.',
            delta: -30, correct: false, art: 'drop_coins', reaction: 'sad'
          }
        ]
      },
      { type: 'goal', scene: 'honey_pot' }
    ]
  },
  {
    id: 5,
    title: 'غار بلورین',
    subtitle: 'هوش مالی قهرمان',
    difficulty: 'سخت',
    difficultyKid: 'سخته!',
    difficultyColor: '#EF4444',
    mapArt: 'crystal',
    startCoins: 370,
    targetCoins: 460,
    bg: ['#EDE9FE', '#DDD6FE'],
    steps: [
      {
        type: 'fork',
        situation: 'money_trap',
        question: 'یه کوهِ طلا! دست بزنی؟',
        choices: [
          {
            label: 'دست نمی‌زنم!',
            hint: 'شاید تله باشه!',
            feedback: 'تله بود! نجات پیدا کردی!',
            delta: 0, correct: true, art: 'shield', reaction: 'yay'
          },
          {
            label: 'همه‌شو برمی‌دارم',
            hint: 'طلاها تله‌ان!',
            feedback: 'تله فعال شد و سکه‌هاتو خورد!',
            delta: -70, correct: false, art: 'trap', reaction: 'sad'
          }
        ]
      },
      {
        type: 'fork',
        situation: 'market_fair',
        question: 'چطوری خرید کنی؟',
        choices: [
          {
            label: 'چونه می‌زنم، ارزون می‌خرم',
            hint: 'با حرف زدن سکه نگه می‌داری',
            feedback: 'با چونه زدن سکه‌هاتو نگه داشتی!',
            delta: 45, correct: true, art: 'haggle', reaction: 'yay'
          },
          {
            label: 'همون‌طوری گران می‌خرم',
            hint: 'پولِ اضافه می‌دی!',
            feedback: 'بدون چونه، پولِ اضافه دادی.',
            delta: -45, correct: false, art: 'expensive_bike', reaction: 'sad'
          }
        ]
      },
      { type: 'goal', scene: 'honey_pot' }
    ]
  },
  {
    id: 6,
    title: 'قلعه طلایی',
    subtitle: 'پادشاه پولدار باش!',
    difficulty: 'قهرمان',
    difficultyKid: 'مخصوصِ قهرمانا!',
    difficultyColor: '#7C3AED',
    mapArt: 'castle',
    startCoins: 460,
    targetCoins: 560,
    bg: ['#FFF7CC', '#FFE066'],
    steps: [
      {
        type: 'fork',
        situation: 'final_offer',
        question: 'همهٔ گنجت پیشته! چی‌کارش می‌کنی؟',
        choices: [
          {
            label: 'همه‌شو می‌ذارم تو قلک',
            hint: 'قلک = پولِ امن',
            feedback: 'قلک امن‌ترین جای پوله!',
            delta: 60, correct: true, art: 'piggy', reaction: 'yay'
          },
          {
            label: 'همه‌شو یه‌جا خرج می‌کنم',
            hint: 'فردا چی؟!',
            feedback: 'یه‌جا خرجی؛ فردا چی می‌خوای؟',
            delta: -90, correct: false, art: 'candy', reaction: 'sad'
          }
        ]
      },
      {
        type: 'fork',
        situation: 'crown_choice',
        question: 'حالا پادشاهی! با پولت چی‌کار کنی؟',
        choices: [
          {
            label: 'با پولم کار راه می‌ندازم',
            hint: 'پولتو به کار بنداز، بیشتر شه!',
            feedback: 'کار راه انداختی؛ پادشاهِ واقعی!',
            delta: 50, correct: true, art: 'shop', reaction: 'yay'
          },
          {
            label: 'تاجِ طلای الکی می‌خرم',
            hint: 'تاج فقط نمایشه!',
            feedback: 'تاج قشنگه، ولی پولت سوخت!',
            delta: -50, correct: false, art: 'crown', reaction: 'sad'
          }
        ]
      },
      { type: 'goal', scene: 'honey_pot' }
    ]
  }
];
