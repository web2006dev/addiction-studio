/**
 * Fitness Addiction Studio (FAS) - Beleghata Branch
 * Interactive Engine: Operating Hours, BMI Calc, Lightbox, Schedule, Trial Pass
 */

document.addEventListener('DOMContentLoaded', () => {
  initOperatingHours();
  initMobileMenu();
  initGalleryLightbox();
  initBmiCalculator();
  initScheduleTabs();
  initPricingToggle();
  initTrialPassModal();
  initQuickBookingButtons();
});

/* -------------------------------------------------------------
 * 1. Live Operating Hours & Status Indicator
 * ------------------------------------------------------------- */
function initOperatingHours() {
  const statusPills = document.querySelectorAll('.live-status-pill');
  const now = new Date();
  const currentHour = now.getHours();
  
  // Gym is open from 6:00 AM to 1:00 AM (midnight into next day)
  const isOpen = (currentHour >= 6 || currentHour < 1);
  
  statusPills.forEach(pill => {
    if (isOpen) {
      pill.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span><span class="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5"></span>OPEN NOW · Closes 1:00 AM`;
      pill.classList.remove('bg-red-950/40', 'border-red-500/40', 'text-red-400');
      pill.classList.add('bg-emerald-950/40', 'border-emerald-500/40', 'text-emerald-400');
    } else {
      pill.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-red-400 mr-1.5"></span>CLOSED NOW · Opens 6:00 AM`;
      pill.classList.remove('bg-emerald-950/40', 'border-emerald-500/40', 'text-emerald-400');
      pill.classList.add('bg-red-950/40', 'border-red-500/40', 'text-red-400');
    }
  });

  // Highlight today in operating hours table
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayName = days[now.getDay()];
  const todayRow = document.querySelector(`[data-day="${todayName}"]`);
  if (todayRow) {
    todayRow.classList.add('bg-[#FFE600]/15', 'border-l-4', 'border-[#FFE600]', 'font-bold');
  }
}

/* -------------------------------------------------------------
 * 2. Mobile Menu Navigation
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* -------------------------------------------------------------
 * 3. Studio Photo Tour & Lightbox
 * ------------------------------------------------------------- */
const galleryData = [
  {
    src: 'assets/reception.png',
    title: 'FAS Welcome Lounge & Front Desk',
    category: 'lounge',
    desc: 'Futuristic welcome counter with custom glowing hexagonal ceiling lighting, neon "GET ADDICTED TO FITNESS" signage, and illuminated wire mesh diamond emblem.'
  },
  {
    src: 'assets/mma-poster.png',
    title: 'MMA & Combat Striking Arena',
    category: 'mma',
    desc: 'Dedicated combat zone for heavy bag strikes, kickboxing, agility footwork, and fight conditioning with certified combat coaches.'
  },
  {
    src: 'assets/interior-hazard.png',
    title: 'Strength Zone & Industrial Hazard Wall',
    category: 'main-floor',
    desc: 'High-intensity free weights area featuring hexagonal suspended light rings, red ambient mood lighting, and signature industrial hazard diagonals.'
  },
  {
    src: 'assets/runway-neon.png',
    title: 'Neon Chevron Sprint & Cable Runway',
    category: 'runway',
    desc: 'Signature dual-tone cyan & magenta chevron ceiling LED runway, lush green turf moss accent wall, street art mural, and multi-station cable machines.'
  },
  {
    src: 'assets/logo.jpg',
    title: 'Official Fitness Addiction Studio Emblem',
    category: 'lounge',
    desc: 'Official Beleghata Branch diamond emblem symbolizing strength, endurance, and unbreakable fitness passion.'
  }
];

let currentLightboxIndex = 0;

function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'bg-[#FFE600]', 'text-black'));
      filterBtns.forEach(b => b.classList.add('bg-[#141724]', 'text-gray-300'));
      btn.classList.add('active', 'bg-[#FFE600]', 'text-black');
      btn.classList.remove('bg-[#141724]', 'text-gray-300');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.classList.add('flex');
        } else {
          item.classList.add('hidden');
          item.classList.remove('flex');
        }
      });
    });
  });

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = galleryData[currentLightboxIndex];
    if (item) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
      lightboxTitle.textContent = item.title;
      lightboxDesc.textContent = item.desc;
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
      updateLightboxContent();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
      updateLightboxContent();
    });
  }

  // Close when clicking outside image
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-overlay')) {
        closeLightbox();
      }
    });
  }

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
      updateLightboxContent();
    }
    if (e.key === 'ArrowRight') {
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
      updateLightboxContent();
    }
  });
}

/* -------------------------------------------------------------
 * 4. Interactive BMI, BMR & Caloric Goal Calculator
 * ------------------------------------------------------------- */
function initBmiCalculator() {
  const heightSlider = document.getElementById('calc-height');
  const heightValDisplay = document.getElementById('calc-height-val');
  const weightSlider = document.getElementById('calc-weight');
  const weightValDisplay = document.getElementById('calc-weight-val');
  const ageSlider = document.getElementById('calc-age');
  const ageValDisplay = document.getElementById('calc-age-val');
  const genderInputs = document.querySelectorAll('input[name="calc-gender"]');
  const goalSelect = document.getElementById('calc-goal');
  const activitySelect = document.getElementById('calc-activity');

  const bmiScoreEl = document.getElementById('bmi-score');
  const bmiBadgeEl = document.getElementById('bmi-badge');
  const bmiBarEl = document.getElementById('bmi-bar-fill');
  const bmrScoreEl = document.getElementById('bmr-score');
  const tdeeScoreEl = document.getElementById('tdee-score');
  const targetCalorieEl = document.getElementById('target-calorie-score');
  const programRecEl = document.getElementById('calc-program-rec');
  const claimPlanBtn = document.getElementById('claim-calc-plan-btn');

  function calculate() {
    if (!heightSlider || !weightSlider) return;

    const heightCm = parseFloat(heightSlider.value);
    const weightKg = parseFloat(weightSlider.value);
    const age = parseInt(ageSlider.value, 10);
    
    let gender = 'male';
    genderInputs.forEach(input => {
      if (input.checked) gender = input.value;
    });

    const goal = goalSelect ? goalSelect.value : 'fat-loss';
    const activityFactor = activitySelect ? parseFloat(activitySelect.value) : 1.55;

    // Display values
    if (heightValDisplay) heightValDisplay.textContent = `${heightCm} cm (${(heightCm / 30.48).toFixed(1)} ft)`;
    if (weightValDisplay) weightValDisplay.textContent = `${weightKg} kg (${(weightKg * 2.20462).toFixed(1)} lbs)`;
    if (ageValDisplay) ageValDisplay.textContent = `${age} yrs`;

    // 1. BMI = weight(kg) / (height(m))^2
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    if (bmiScoreEl) bmiScoreEl.textContent = bmi.toFixed(1);

    // BMI Badge & Color
    let category = 'Normal Weight';
    let badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    let barPercent = Math.min(100, Math.max(5, ((bmi - 15) / 25) * 100));

    if (bmi < 18.5) {
      category = 'Underweight';
      badgeClass = 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    } else if (bmi <= 24.9) {
      category = 'Normal / Healthy';
      badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    } else if (bmi <= 29.9) {
      category = 'Overweight';
      badgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    } else {
      category = 'High BMI / Obese';
      badgeClass = 'bg-red-500/20 text-red-400 border-red-500/40';
    }

    if (bmiBadgeEl) {
      bmiBadgeEl.textContent = category;
      bmiBadgeEl.className = `px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${badgeClass}`;
    }

    if (bmiBarEl) {
      bmiBarEl.style.width = `${barPercent}%`;
    }

    // 2. BMR (Mifflin-St Jeor)
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    bmr = (gender === 'male') ? bmr + 5 : bmr - 161;
    if (bmrScoreEl) bmrScoreEl.textContent = `${Math.round(bmr)} kcal`;

    // 3. TDEE
    const tdee = bmr * activityFactor;
    if (tdeeScoreEl) tdeeScoreEl.textContent = `${Math.round(tdee)} kcal`;

    // 4. Target Calories
    let targetCal = tdee;
    let recommendedProgram = 'MMA Combat Conditioning & HIIT';
    
    if (goal === 'fat-loss') {
      targetCal = tdee - 500;
      recommendedProgram = 'HIIT Metabolic Shred + Cardio Arena';
    } else if (goal === 'muscle-gain') {
      targetCal = tdee + 400;
      recommendedProgram = 'Heavy Hypertrophy & Power Strength';
    } else if (goal === 'endurance') {
      targetCal = tdee;
      recommendedProgram = 'CrossFit Functional Circuit & Zumba';
    } else if (goal === 'mma-stamina') {
      targetCal = tdee - 200;
      recommendedProgram = 'MMA Striking, Heavy Bag & Core Circuit';
    }

    if (targetCalorieEl) targetCalorieEl.textContent = `${Math.round(targetCal)} kcal / day`;
    if (programRecEl) programRecEl.textContent = recommendedProgram;

    // Update CTA button action
    if (claimPlanBtn) {
      claimPlanBtn.onclick = () => {
        openTrialPassModal(`Goal: ${goal.toUpperCase()} | Target: ${Math.round(targetCal)} kcal/day | Rec Program: ${recommendedProgram}`);
      };
    }
  }

  // Attach event listeners
  [heightSlider, weightSlider, ageSlider, goalSelect, activitySelect].forEach(el => {
    if (el) el.addEventListener('input', calculate);
  });
  genderInputs.forEach(radio => radio.addEventListener('change', calculate));

  // Run initial calculation
  calculate();
}

/* -------------------------------------------------------------
 * 5. Interactive Pricing Switcher
 * ------------------------------------------------------------- */
function initPricingToggle() {
  const toggleBtn = document.getElementById('pricing-toggle-checkbox');
  const annualHighlight = document.getElementById('annual-plan-card');

  if (toggleBtn) {
    toggleBtn.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      const annualPrices = document.querySelectorAll('.price-annual');
      const monthlyPrices = document.querySelectorAll('.price-monthly');

      if (isAnnual) {
        annualPrices.forEach(el => el.classList.remove('hidden'));
        monthlyPrices.forEach(el => el.classList.add('hidden'));
        if (annualHighlight) annualHighlight.classList.add('ring-2', 'ring-[#FFE600]');
      } else {
        annualPrices.forEach(el => el.classList.add('hidden'));
        monthlyPrices.forEach(el => el.classList.remove('hidden'));
        if (annualHighlight) annualHighlight.classList.remove('ring-2', 'ring-[#FFE600]');
      }
    });
  }
}

/* -------------------------------------------------------------
 * 6. Interactive Class Timetable & Schedule Tabs
 * ------------------------------------------------------------- */
const scheduleData = {
  monday: [
    { time: '06:30 AM - 07:30 AM', name: 'Early Bird Heavy Strength', trainer: 'Coach Rahul', type: 'Strength', intensity: 'High' },
    { time: '08:00 AM - 09:00 AM', name: 'CrossFit Core Blitz', trainer: 'Coach Priya', type: 'CrossFit', intensity: 'Very High' },
    { time: '10:00 AM - 11:00 AM', name: 'Power Flow Yoga', trainer: 'Coach Ananya', type: 'Yoga', intensity: 'Moderate' },
    { time: '05:30 PM - 06:30 PM', name: 'Zumba Beats Cardio', trainer: 'Coach Sneha', type: 'Zumba', intensity: 'Moderate' },
    { time: '07:00 PM - 08:30 PM', name: 'MMA Striking & Bag Drills', trainer: 'Master Vikram (Pro Fighter)', type: 'MMA', intensity: 'Extreme' },
    { time: '09:00 PM - 10:30 PM', name: 'Late Night Hypertrophy', trainer: 'Coach Rahul', type: 'Strength', intensity: 'High' },
    { time: '11:00 PM - 01:00 AM', name: 'Midnight Open Floor & Heavy Lifting', trainer: 'Staff Supervised', type: 'Open Floor', intensity: 'Custom' }
  ],
  tuesday: [
    { time: '06:30 AM - 07:30 AM', name: 'HIIT Tabata Fat Shred', trainer: 'Coach Priya', type: 'HIIT', intensity: 'Extreme' },
    { time: '08:30 AM - 09:30 AM', name: 'Olympic Deadlift & Squat Clinic', trainer: 'Coach Rahul', type: 'Strength', intensity: 'Very High' },
    { time: '05:00 PM - 06:00 PM', name: 'Mobility & Joint Rehab', trainer: 'Coach Ananya', type: 'Yoga', intensity: 'Low' },
    { time: '06:30 PM - 07:30 PM', name: 'Kickboxing & Conditioning', trainer: 'Master Vikram', type: 'MMA', intensity: 'High' },
    { time: '08:00 PM - 09:30 PM', name: 'Functional Kettlebell & Battle Ropes', trainer: 'Coach Sneha', type: 'CrossFit', intensity: 'High' },
    { time: '10:00 PM - 01:00 AM', name: 'Late Night Athletic Iron Zone', trainer: 'Staff Supervised', type: 'Open Floor', intensity: 'Custom' }
  ],
  wednesday: [
    { time: '06:30 AM - 07:30 AM', name: 'CrossFit Sleds & Agility', trainer: 'Coach Rahul', type: 'CrossFit', intensity: 'Extreme' },
    { time: '08:30 AM - 09:30 AM', name: 'Cardio Blast & Core Sculpt', trainer: 'Coach Sneha', type: 'Zumba', intensity: 'Moderate' },
    { time: '05:30 PM - 06:30 PM', name: 'MMA Defense & Ground Movement', trainer: 'Master Vikram', type: 'MMA', intensity: 'High' },
    { time: '07:00 PM - 08:30 PM', name: 'Upper Body Pump & Shoulders', trainer: 'Coach Rahul', type: 'Strength', intensity: 'High' },
    { time: '09:00 PM - 10:30 PM', name: 'HIIT Afterburn Shred', trainer: 'Coach Priya', type: 'HIIT', intensity: 'Very High' },
    { time: '11:00 PM - 01:00 AM', name: 'Midnight Cardio & Recovery Area', trainer: 'Staff Supervised', type: 'Open Floor', intensity: 'Custom' }
  ],
  thursday: [
    { time: '06:30 AM - 07:30 AM', name: 'Chest & Back Hypertrophy', trainer: 'Coach Rahul', type: 'Strength', intensity: 'High' },
    { time: '08:00 AM - 09:00 AM', name: 'Dynamic Vinyasa Power Yoga', trainer: 'Coach Ananya', type: 'Yoga', intensity: 'Moderate' },
    { time: '05:30 PM - 06:30 PM', name: 'Latin Zumba Aerobics', trainer: 'Coach Sneha', type: 'Zumba', intensity: 'Moderate' },
    { time: '07:00 PM - 08:30 PM', name: 'Muay Thai Clinch & Striking', trainer: 'Master Vikram', type: 'MMA', intensity: 'Extreme' },
    { time: '09:00 PM - 10:30 PM', name: 'Leg Day Annihilation', trainer: 'Coach Rahul', type: 'Strength', intensity: 'Extreme' },
    { time: '11:00 PM - 01:00 AM', name: 'Midnight Free Weights & Turf', trainer: 'Staff Supervised', type: 'Open Floor', intensity: 'Custom' }
  ],
  friday: [
    { time: '06:30 AM - 07:30 AM', name: 'HIIT Sprint & Row Intervals', trainer: 'Coach Priya', type: 'HIIT', intensity: 'Extreme' },
    { time: '08:30 AM - 09:30 AM', name: 'Functional Core & Calisthenics', trainer: 'Coach Sneha', type: 'CrossFit', intensity: 'High' },
    { time: '05:30 PM - 06:30 PM', name: 'Zumba Party Night', trainer: 'Coach Sneha', type: 'Zumba', intensity: 'Moderate' },
    { time: '07:00 PM - 08:30 PM', name: 'MMA Sparring & Cage Conditioning', trainer: 'Master Vikram', type: 'MMA', intensity: 'Extreme' },
    { time: '09:00 PM - 10:30 PM', name: 'Arm Farm & Delts Friday Pump', trainer: 'Coach Rahul', type: 'Strength', intensity: 'High' },
    { time: '11:00 PM - 01:00 AM', name: 'Friday Midnight Iron Session', trainer: 'Staff Supervised', type: 'Open Floor', intensity: 'Custom' }
  ],
  saturday: [
    { time: '07:00 AM - 08:30 AM', name: 'Weekend Warrior Super Circuit', trainer: 'Coach Priya & Rahul', type: 'CrossFit', intensity: 'Extreme' },
    { time: '09:00 AM - 10:30 AM', name: 'MMA Striking Masterclass', trainer: 'Master Vikram', type: 'MMA', intensity: 'High' },
    { time: '11:00 AM - 12:00 PM', name: 'Ashtanga Yoga & Deep Mobility', trainer: 'Coach Ananya', type: 'Yoga', intensity: 'Low' },
    { time: '05:00 PM - 06:30 PM', name: 'Bolly-Zumba Dance Blast', trainer: 'Coach Sneha', type: 'Zumba', intensity: 'Moderate' },
    { time: '07:00 PM - 09:00 PM', name: 'Powerlifting Heavy Singles', trainer: 'Coach Rahul', type: 'Strength', intensity: 'Very High' },
    { time: '09:30 PM - 01:00 AM', name: 'Saturday Night Open Heavy Arena', trainer: 'Staff Supervised', type: 'Open Floor', intensity: 'Custom' }
  ],
  sunday: [
    { time: '08:00 AM - 09:30 AM', name: 'Sunday Functional Stamina', trainer: 'Coach Priya', type: 'CrossFit', intensity: 'High' },
    { time: '10:00 AM - 11:30 AM', name: 'Full Body Mobility & Sound Healing', trainer: 'Coach Ananya', type: 'Yoga', intensity: 'Relaxing' },
    { time: '05:00 PM - 06:30 PM', name: 'Combat Boxing & Glove Drills', trainer: 'Master Vikram', type: 'MMA', intensity: 'High' },
    { time: '07:00 PM - 09:00 PM', name: 'Strength Reconstruction Clinic', trainer: 'Coach Rahul', type: 'Strength', intensity: 'Moderate' },
    { time: '09:30 PM - 01:00 AM', name: 'Sunday Midnight Late Session', trainer: 'Staff Supervised', type: 'Open Floor', intensity: 'Custom' }
  ]
};

function initScheduleTabs() {
  const dayTabs = document.querySelectorAll('.schedule-day-btn');
  const scheduleContainer = document.getElementById('schedule-list-container');
  const timeFilter = document.getElementById('schedule-time-filter');

  let currentDay = 'monday';

  function renderDaySchedule(day) {
    if (!scheduleContainer) return;
    const slots = scheduleData[day] || [];
    const filter = timeFilter ? timeFilter.value : 'all';

    const filteredSlots = slots.filter(slot => {
      if (filter === 'all') return true;
      const isMorning = slot.time.includes('AM');
      if (filter === 'morning') return isMorning;
      if (filter === 'evening') return !isMorning;
      return true;
    });

    scheduleContainer.innerHTML = filteredSlots.map(slot => {
      let typeBadge = 'bg-[#FFE600]/20 text-[#FFE600] border-[#FFE600]/30';
      if (slot.type === 'MMA') typeBadge = 'bg-red-500/20 text-red-400 border-red-500/30';
      if (slot.type === 'Yoga') typeBadge = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      if (slot.type === 'Zumba') typeBadge = 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      if (slot.type === 'CrossFit') typeBadge = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';

      return `
        <div class="glass-card p-4 sm:p-5 rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#FFE600]/40 transition-all">
          <div class="flex items-start sm:items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-white/5 flex flex-col items-center justify-center shrink-0 border border-white/10 text-center">
              <i class="fa-solid fa-clock text-[#FFE600] text-sm mb-0.5"></i>
              <span class="text-[10px] font-bold text-gray-400 uppercase">Live</span>
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <span class="text-xs font-mono font-bold text-gray-400">${slot.time}</span>
                <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border ${typeBadge}">${slot.type}</span>
                <span class="text-[10px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">${slot.intensity} Intensity</span>
              </div>
              <h4 class="text-base sm:text-lg font-bold text-white">${slot.name}</h4>
              <p class="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                <i class="fa-solid fa-user-tie text-[#FFE600]"></i> Guided by: <span class="text-gray-200 font-medium">${slot.trainer}</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0 self-end md:self-center">
            <button onclick="bookSpecificSlot('${slot.name}', '${slot.time}')" class="px-4 py-2 rounded-lg bg-white/5 hover:bg-[#FFE600] text-gray-200 hover:text-black border border-white/10 hover:border-[#FFE600] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5">
              <span>Reserve Slot</span>
              <i class="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  dayTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      dayTabs.forEach(b => b.classList.remove('active', 'bg-[#FFE600]', 'text-black'));
      dayTabs.forEach(b => b.classList.add('bg-[#141724]', 'text-gray-300'));
      btn.classList.add('active', 'bg-[#FFE600]', 'text-black');
      btn.classList.remove('bg-[#141724]', 'text-gray-300');

      currentDay = btn.getAttribute('data-day');
      renderDaySchedule(currentDay);
    });
  });

  if (timeFilter) {
    timeFilter.addEventListener('change', () => renderDaySchedule(currentDay));
  }

  // Initial render
  renderDaySchedule('monday');
}

/* -------------------------------------------------------------
 * 7. Free 1-Day Trial Pass Generator & Modal Logic
 * ------------------------------------------------------------- */
function initTrialPassModal() {
  const modal = document.getElementById('trial-modal');
  const openBtns = document.querySelectorAll('.open-trial-btn');
  const closeBtn = document.getElementById('close-trial-modal');
  const trialForm = document.getElementById('trial-pass-form');
  const passResultContainer = document.getElementById('trial-pass-result');
  const modalTitle = document.getElementById('trial-modal-title');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const customGoal = btn.getAttribute('data-preset-goal') || '';
      openTrialPassModal(customGoal);
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-overlay')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('trial-name').value.trim();
      const phone = document.getElementById('trial-phone').value.trim();
      const goal = document.getElementById('trial-goal').value;
      const timing = document.getElementById('trial-timing').value;

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      // Generate Pass
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const passId = `FAS-KOL-${randomId}`;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3);
      const expiryStr = expiryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

      // Render digital pass card
      trialForm.classList.add('hidden');
      if (modalTitle) modalTitle.textContent = '🎉 Your VIP 1-Day Pass is Ready!';

      if (passResultContainer) {
        passResultContainer.classList.remove('hidden');
        passResultContainer.innerHTML = `
          <div class="digital-pass-card rounded-2xl p-6 text-white border border-[#FFE600] relative">
            <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-[#FFE600] flex items-center justify-center font-black text-black text-lg">
                  FAS
                </div>
                <div>
                  <h4 class="font-black text-base tracking-wider text-white">FITNESS ADDICTION STUDIO</h4>
                  <p class="text-[10px] text-[#FFE600] font-bold tracking-widest uppercase">★ BELEGHATA BRANCH ★</p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded bg-[#FFE600]/20 text-[#FFE600] text-[10px] font-mono font-bold border border-[#FFE600]/40">1-DAY VIP PASS</span>
            </div>

            <div class="grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <p class="text-gray-400 text-[10px] uppercase">Pass Holder</p>
                <p class="font-bold text-white text-sm">${name}</p>
              </div>
              <div>
                <p class="text-gray-400 text-[10px] uppercase">Pass ID</p>
                <p class="font-mono font-bold text-[#FFE600] text-sm">${passId}</p>
              </div>
              <div>
                <p class="text-gray-400 text-[10px] uppercase">Goal Focus</p>
                <p class="font-semibold text-gray-200 capitalize">${goal}</p>
              </div>
              <div>
                <p class="text-gray-400 text-[10px] uppercase">Valid Until</p>
                <p class="font-semibold text-emerald-400">${expiryStr}</p>
              </div>
              <div>
                <p class="text-gray-400 text-[10px] uppercase">Preferred Timing</p>
                <p class="font-semibold text-gray-200">${timing}</p>
              </div>
              <div>
                <p class="text-gray-400 text-[10px] uppercase">Access Facility</p>
                <p class="font-semibold text-gray-200">Main Floor, MMA & Cardio</p>
              </div>
            </div>

            <!-- Simulated Barcode / QR Section -->
            <div class="bg-black/60 rounded-xl p-3 flex items-center justify-between border border-white/5 mb-4">
              <div class="flex flex-col">
                <span class="text-[9px] text-gray-400 font-mono">AUTHORIZED ENTRY PASS</span>
                <span class="text-xs font-mono font-bold tracking-widest text-[#FFE600]">${passId} • KOL-CIT-RD</span>
              </div>
              <div class="w-10 h-10 bg-white rounded p-1 flex items-center justify-center">
                <i class="fa-solid fa-qrcode text-black text-2xl"></i>
              </div>
            </div>

            <p class="text-[11px] text-gray-400 text-center mb-4">
              📍 Present this digital pass at the FAS reception desk on CIT Road, Beleghata to activate your trial session.
            </p>

            <!-- WhatsApp Confirmation Trigger -->
            <div class="flex flex-col sm:flex-row gap-2">
              <a href="https://wa.me/918697416184?text=Hi%20Fitness%20Addiction%20Studio!%20I%20have%20generated%20my%201-Day%20Free%20VIP%20Pass%20(ID:%20${passId}).%20Name:%20${encodeURIComponent(name)},%20Goal:%20${encodeURIComponent(goal)},%20Slot:%20${encodeURIComponent(timing)}.%20Please%20confirm%20my%20visit!" target="_blank" class="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2">
                <i class="fa-brands fa-whatsapp text-base"></i>
                <span>Confirm on WhatsApp</span>
              </a>
              <button onclick="window.print()" class="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2">
                <i class="fa-solid fa-print"></i>
                <span>Print Pass</span>
              </button>
            </div>
          </div>
        `;
      }
    });
  }
}

function openTrialPassModal(presetGoal = '') {
  const modal = document.getElementById('trial-modal');
  const trialForm = document.getElementById('trial-pass-form');
  const passResultContainer = document.getElementById('trial-pass-result');
  const modalTitle = document.getElementById('trial-modal-title');
  const goalInput = document.getElementById('trial-goal');

  if (modal) {
    if (trialForm) trialForm.classList.remove('hidden');
    if (passResultContainer) passResultContainer.classList.add('hidden');
    if (modalTitle) modalTitle.textContent = 'Claim Your 1-Day Free VIP Trial Pass';
    if (goalInput && presetGoal) {
      // Find matching option or set value
      goalInput.value = 'mma';
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function initQuickBookingButtons() {
  window.openTrialPassModal = openTrialPassModal;
  window.bookSpecificSlot = (className, classTime) => {
    openTrialPassModal(`Class: ${className} (${classTime})`);
  };
}
