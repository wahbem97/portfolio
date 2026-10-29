/**
 * MUSTAFA — Visual Journalist & Data Storyteller
 * Interactive publication controls, market ticker, video demo simulator,
 * multilingual script previews, and project dossiers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initThemeToggle();
  initFilters();
  initBYDPlayerDemo();
  initDossierModal();
  initDispatchForm();
  initCopyEmail();
});

/* --------------------------------------------------------------------------
   1. Live Ghent / CET Newsroom Clock
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('live-time');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    // Format in CET / Ghent Timezone
    const options = {
      timeZone: 'Europe/Brussels',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockEl.textContent = `GHENT CET ${timeStr}`;
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   2. Contrast / Publication Theme Toggle
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const htmlEl = document.documentElement;

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('publication-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  // Segmented theme switch buttons (Dark / Light)
  const segmentBtns = document.querySelectorAll('.theme-segment-btn');
  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.getAttribute('data-theme-val');
      if (targetTheme) {
        htmlEl.setAttribute('data-theme', targetTheme);
        localStorage.setItem('publication-theme', targetTheme);
      }
    });
  });

  // Toggle button fallback (switches between dark and light)
  const toggleBtns = document.querySelectorAll('.btn-theme-toggle, #theme-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('publication-theme', next);
    });
  });
}

/* --------------------------------------------------------------------------
   3. Featured Explainers Category Filter
   -------------------------------------------------------------------------- */
function initFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const ytCard = document.querySelector('.youtube-feature-card');
  const tiktokSection = document.querySelector('.tiktok-showcase-wrapper');
  const tiktokCards = document.querySelectorAll('.tiktok-banner-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterVal = tab.getAttribute('data-filter');

      if (filterVal === 'all') {
        if (ytCard) ytCard.style.display = '';
        if (tiktokSection) tiktokSection.style.display = '';
        tiktokCards.forEach(c => c.style.display = '');
      } else if (filterVal === 'youtube') {
        if (ytCard) ytCard.style.display = '';
        if (tiktokSection) tiktokSection.style.display = 'none';
      } else if (filterVal === 'tiktok') {
        if (ytCard) ytCard.style.display = 'none';
        if (tiktokSection) tiktokSection.style.display = '';
        tiktokCards.forEach(c => c.style.display = '');
      } else if (filterVal === 'spatial') {
        if (ytCard) ytCard.style.display = 'none';
        if (tiktokSection) tiktokSection.style.display = '';
        tiktokCards.forEach(c => {
          c.style.display = c.getAttribute('data-category') === 'spatial' ? '' : 'none';
        });
      } else if (filterVal === 'trade') {
        if (ytCard) ytCard.style.display = '';
        if (tiktokSection) tiktokSection.style.display = '';
        tiktokCards.forEach(c => {
          c.style.display = c.getAttribute('data-category') === 'trade' ? '' : 'none';
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Interactive YouTube Video Player Simulation
   -------------------------------------------------------------------------- */
function initBYDPlayerDemo() {
  const playBtn = document.getElementById('btn-play-byd');
  const img = document.querySelector('#byd-player-wrap .featured-img');
  const statusBadge = document.querySelector('.yt-playback-text');
  const progressFill = document.querySelector('.yt-progress-fill');

  let isPlaying = false;
  let playInterval = null;
  let seconds = 204; // 03:24 start
  const totalSeconds = 765; // 12:45 total

  if (playBtn && statusBadge) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;

      if (isPlaying) {
        playBtn.querySelector('span').textContent = 'Pause Simulation';
        img.style.filter = 'brightness(1.1) contrast(1.08) saturate(1.15)';
        
        playInterval = setInterval(() => {
          seconds++;
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          const fmt = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
          statusBadge.textContent = `YOUTUBE PLAYING • ${fmt} / 12:45`;

          const pct = Math.min(100, (seconds / totalSeconds) * 100);
          if (progressFill) progressFill.style.width = `${pct}%`;

          if (seconds >= totalSeconds) {
            seconds = 0;
          }
        }, 1000);
      } else {
        playBtn.querySelector('span').textContent = 'Resume YouTube Demo';
        statusBadge.textContent = 'YOUTUBE PLAYBACK PAUSED • CLICK TO RESUME';
        img.style.filter = '';
        clearInterval(playInterval);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   5. Interactive Project Dossier Modal System
   -------------------------------------------------------------------------- */
const PROJECT_DOSSIERS = {
  'huawei-chip': {
    title: 'The New Huawei Chip: Breaking Through US Sanctions & Silicon Sovereignty',
    kicker: 'YOUTUBE LONG-FORM &bull; SEMICONDUCTOR GEOPOLITICS & TECH WAR',
    meta: 'YouTube Special Release &bull; 29,039 Views &bull; 802 Likes &bull; 12:45 Runtime',
    image: 'assets/huawei_chip_youtube.jpg?v=official',
    metrics: [
      { label: 'YouTube Views', value: '29,039' },
      { label: 'Direct Likes', value: '802' },
      { label: 'Channel Partner', value: 'Leader Group' },
      { label: 'Fabrication Node', value: '7nm SMIC' }
    ],
    editorialContext: `
      <p>This investigative visual documentary deconstructs the technological and geopolitical earthquake triggered by Huawei's Mate 60 Pro and the HiSilicon Kirin 9000S processor. We explain how SMIC achieved 7nm-class lithography using deep ultraviolet (DUV) immersion multi-patterning, bypassing comprehensive US Commerce Department export curbs designed to freeze Chinese semiconductor development at 14nm.</p>
    `,
    methodology: `
      <ul style="padding-left: 20px; line-height: 1.6; margin-top: 8px;">
        <li><strong>Microchip Architecture Teardowns:</strong> Synthesized reverse-engineering die micrographs and transistor density benchmarks from TechInsights and Bloomberg Intelligence.</li>
        <li><strong>Export Control Geopolitics:</strong> Visualized the timeline from the 2019 Entity List to the 2022 US CHIPS Act, ASML Twinscan lithography restrictions, and China's domestic supply chain substitution.</li>
        <li><strong>Motion Graphic Explainer Pipeline:</strong> 12-minute 4K documentary utilizing isometric silicon wafers, electron microscope graphics, and macroeconomic capital flows.</li>
      </ul>
    `,
    scripts: {
      en: `"When Washington imposed sweeping semiconductor export bans in 2022, the goal was explicit: freeze China's microchip industry at least two generations behind. Yet inside Huawei's latest flagship sits a 7-nanometer 5G processor manufactured in Shanghai. How did Chinese engineers breach the technological blockade—and what does this mean for the balance of global tech power?"`,
      ar: `"عندما فرضت واشنطن أشد عقوبات تكنولوجية في تاريخها عام 2022، كان الهدف واضحاً: شلّ قدرة الصين على صناعة الرقائق المتقدمة وتجميدها عند أجيال قديمة. لكن المفاجأة انفجرت مع إطلاق هاتف هواوي الجديد بمعالج سبعة نانومتر فائق السرعة صُنع بالكامل محلياً. فكيف نجحت بكين في اختراق جدار الحصار السيليكوني، وما هي التبعات الجيوسياسية لهذا التحول؟"`,
      nl: `"Toen Washington in 2022 ingrijpende halfgeleidersancties afkondigde, was het doel kristalhelder: de Chinese microchipindustrie minstens twee generaties achterop houden. Toch bevat Huawei's nieuwste vlaggenschip een 7-nanometer 5G-processor, geproduceerd in Shanghai. Hoe wist China deze technologische blokkade te omzeilen, en wat betekent dit voor de mondiale machtsverhoudingen in tech?"`
    },
    tools: ['Adobe Premiere Pro', 'After Effects 4K', 'Semiconductor Schematics', 'Micro-Die Motion Design', 'Audition']
  },

  'north-riyadh': {
    title: 'Why Have the Prices of Lands Spiked in North Riyadh?',
    kicker: 'TIKTOK VERTICAL (9:16) &bull; SPATIAL REAL ESTATE ECONOMICS',
    meta: 'TikTok Viral Release &bull; 22,700 Views &bull; 315 Likes &bull; 50 Shares',
    image: 'assets/tiktok_north_riyadh.jpg?v=official',
    metrics: [
      { label: 'TikTok Views', value: '22,700' },
      { label: 'Video Likes', value: '315' },
      { label: 'Audience Shares', value: '50' },
      { label: 'Bookmarks / Saves', value: '92' }
    ],
    editorialContext: `
      <p>A fast-paced, high-retention spatial explainer unraveling why undeveloped desert plots in Northern Riyadh suddenly commands tens of thousands of riyals per square meter. Grounded in Saudi Vision 2030 megaproject zoning.</p>
    `,
    methodology: `
      <ul style="padding-left: 20px; line-height: 1.6; margin-top: 8px;">
        <li><strong>GIS Parcel Tracking:</strong> Geocoded historical transaction logs across Al-Malqa, Al-Yasmin, and An-Narjis.</li>
        <li><strong>Infrastructure Gravity Modeling:</strong> Mapped how proximity to the upcoming King Salman International Airport and the New Murabba cubical development created speculative land-banking corridors.</li>
      </ul>
    `,
    scripts: {
      en: `"In North Riyadh, land isn't just property anymore—it's gold rush territory. Between 2020 and 2024, parcel prices jumped by over 140%. Why? Because Riyadh's master plan shifted its entire urban gravity toward King Salman Airport, triggering intense institutional speculation."`,
      ar: `"في شمال الرياض، لم تعد الأراضي مجرد عقار سكني؛ بل ساحة لسباق استثماري محموم تجاوزت فيه نسبة الارتفاع 140% خلال أربع سنوات فقط. السر يكمن في انتقال مركز الثقل العمراني للعاصمة نحو مطار الملك سلمان ومشروع المربع الجديد."`,
      nl: `"In Noord-Riyad zijn braakliggende gronden veranderd in een vastgoedgoudmijn met prijsstijgingen tot 140%. Waarom? Omdat het masterplan van Riyad 2030 het zwaartepunt van de stad resoluut naar de nieuwe megahub rond King Salman Airport heeft verlegd."`
    },
    tools: ['GeoLayers 3', 'After Effects 9:16', 'Saudi Open Data', 'Mobile Pacing Hooks']
  },

  'tallest-building': {
    title: "The 1,000M Tower: Inside the World's Tallest Skyscraper",
    kicker: 'TIKTOK VERTICAL (9:16) &bull; MEGAPROJECT ARCHITECTURE & URBAN ECONOMICS',
    meta: 'TikTok Explainer Release &bull; 394,800 Views &bull; 5,010 Likes &bull; 563 Shares',
    image: 'assets/tiktok_tallest_building.jpg?v=official',
    metrics: [
      { label: 'TikTok Views', value: '394,800' },
      { label: 'Video Likes', value: '5,010' },
      { label: 'Audience Shares', value: '563' },
      { label: 'Bookmarks / Saves', value: '770' }
    ],
    editorialContext: `
      <p>Deconstructing the structural engineering, aerodynamics, and $20B urban economic thesis behind Jeddah Tower, soaring over 1,000 meters above the Red Sea shoreline to eclipse Dubai's Burj Khalifa by more than 170 meters.</p>
    `,
    methodology: `
      <ul style="padding-left: 20px; line-height: 1.6; margin-top: 8px;">
        <li><strong>Aerodynamic Wind Vortex Shedding:</strong> Visualized the tapering aerodynamic tri-petal footprint designed to prevent vortex resonance at 800+ meters.</li>
        <li><strong>Extreme Concrete Pumping Physics:</strong> Modeled high-density polymer concrete mixes pumped vertically under 400+ bar hydraulic pressure.</li>
        <li><strong>Urban Economics & Land Value Capture:</strong> Analyzed capitalization models for the surrounding 5.3 km² Jeddah Economic City master plan.</li>
      </ul>
    `,
    scripts: {
      en: `"At 828 meters, Dubai's Burj Khalifa has dominated the global skyline for over a decade. But right on Saudi Arabia's Red Sea coast, construction has resumed on the Jeddah Tower—the world's first kilometer-tall skyscraper. How do you pump concrete 1,000 meters into the sky, and what is the economic logic behind building so high in the desert?"`,
      ar: `"لأكثر من عقد، ظل برج خليفة في دبي على ارتفاع 828 متراً يتربع على عرش أعلى مبنى في العالم. لكن على ساحل البحر الأحمر في جدة، يستأنف العمل على 'برج جدة' ليكون أول ناطحة سحاب في التاريخ تكسر حاجز الكيلومتر ارتفاعاً. كيف تضخ الخرسانة لارتفاع ألف متر، وما هي الحسابات الاقتصادية وراء هذا الصرح المعماري؟"`,
      nl: `"Met 828 meter domineerde de Burj Khalifa ruim tien jaar lang de wereldwijde skyline. Maar aan de Saoedische Rode Zeekust herleeft de bouw van de Jeddah Tower: de eerste wolkenkrabber ter wereld die de grens van één kilometer hoogte doorbreekt. Hoe pomp je vloeibaar beton een kilometer de lucht in, en welk economisch meesterplan zit achter dit megaproject?"`
    },
    tools: ['After Effects 9:16', 'Architectural 3D CAD', 'Aerodynamic Simulations', 'Premiere Pro']
  },

  'jeddah-sez': {
    title: 'Jeddah Special Economic Zone: The Red Sea Trade Engine',
    kicker: 'TIKTOK VERTICAL (9:16) &bull; GLOBAL TRADE & SUPPLY CHAIN LOGISTICS',
    meta: 'TikTok Explainer Release &bull; 42,200 Views &bull; 981 Likes &bull; 342 Shares',
    image: 'assets/tiktok_jeddah_economic_zone.jpg?v=official',
    metrics: [
      { label: 'TikTok Views', value: '42,200' },
      { label: 'Video Likes', value: '981' },
      { label: 'Audience Shares', value: '342' },
      { label: 'Bookmarks / Saves', value: '221' }
    ],
    editorialContext: `
      <p>Analyzing how Jeddah's newly designated Special Economic Zone leverages Red Sea maritime lanes carrying 13% of global container trade, combining 0% corporate tax incentives with 100% foreign ownership to capture global supply chains and foreign direct investment.</p>
    `,
    methodology: `
      <ul style="padding-left: 20px; line-height: 1.6; margin-top: 8px;">
        <li><strong>Maritime AIS Telemetry:</strong> Mapped container carrier traffic traversing the Bab el-Mandeb strait and docking at Jeddah Islamic Port.</li>
        <li><strong>Regulatory Framework Analysis:</strong> Evaluated the Economic Cities and Special Zones Authority (ECZA) 50-year fiscal covenants against regional peers like Dubai JAFZA and Singapore.</li>
        <li><strong>Multimodal Intermodal Links:</strong> Visualized freight handoffs between maritime berths, King Abdulaziz International Airport cargo hubs, and the Haramain Rail corridor.</li>
      </ul>
    `,
    scripts: {
      en: `"Thirteen percent of all global container shipping sails right past Jeddah's coastline every year. Now, Saudi Arabia is converting that maritime highway into an industrial engine with the new Jeddah Special Economic Zone—offering 0% corporate tax and direct Red Sea port access to lure global manufacturing giants away from traditional hubs."`,
      ar: `"13% من حركة التجارة البحرية العالمية تمر يومياً بمحاذاة سواحل جدة. اليوم، تحوّل المملكة هذا الشريان المائي إلى محرك اقتصادي صناعي ضخم عبر المنطقة الاقتصادية الخاصة بجدة، مقدمة إعفاءات ضريبية بنسبة 0% وربطاً لوجستياً مباشراً لجذب كبرى الشركات العالمية وسلاسل التوريد."`,
      nl: `"Dertien procent van alle wereldwijde containerhandel passeert jaarlijks langs de kust van Jeddah. Met de nieuwe Speciale Economische Zone transformeert Saoedi-Arabië deze maritieme snelweg in een industriële motor: 0% vennootschapsbelasting en directe toegang tot de Rode Zee moeten mondiale toeleveringsketens naar de havenstad trekken."`
    },
    tools: ['After Effects 9:16', 'AIS Maritime Telemetry', 'Trade Flow GIS', 'Premiere Pro']
  },

  'ghent-mobility': {
    title: "Gent Centrum: Waarom Mogen Auto's Niet Meer Door?",
    kicker: 'GHENT BUREAU &bull; URBAN MOBILITY &amp; CIRCULATION PLAN',
    meta: 'TikTok Viral Chronicle &bull; 35,000 Views &bull; 1,312 Likes &bull; 134 Shares &bull; 110 Saves',
    image: 'assets/dutch_video_1.jpg',
    metrics: [
      { label: 'TikTok Views', value: '35,000' },
      { label: 'Video Likes', value: '1,312' },
      { label: 'Audience Shares', value: '134' },
      { label: 'Bookmarks / Saves', value: '110' }
    ],
    editorialContext: `
      <p>An on-the-ground visual investigation of Ghent's historic circulation plan (Circulatieplan). Analyzing how the introduction of car-free sectors, traffic filters, and pedestrianized quays transformed the medieval core along the Graslei, boosting air quality and cyclist traffic while reshaping local commerce.</p>
    `,
    methodology: `
      <ul style="padding-left: 20px; line-height: 1.6; margin-top: 8px;">
        <li><strong>Urban Circulation Mapping:</strong> Overlaying Ghent's sectoral traffic cells and camera-enforced access gates onto 3D municipal cartography.</li>
        <li><strong>Public Data Synthesis:</strong> Analyzing Stad Gent mobility reports, pedestrian footfall data, and modal split statistics.</li>
      </ul>
    `,
    scripts: {
      en: `"Ghent city center: why are cars no longer allowed through the historic core? Since implementing its bold circulation plan, Ghent divided its city center into car-free sectors, eliminating transit traffic along the scenic Graslei canal. Here is how this urban mobility revolution actually works on the ground."`,
      ar: `"وسط مدينة غنت البلجيكية: لماذا مُنعت السيارات من العبور في قلب المدينة التاريخية؟ منذ تطبيق المخطط المروري الشهير، تحول مركز غنت إلى أكبر منطقة مشاة في أوروبا، متخلصاً من زحام المركبات ومحققاً نموذجاً عالمياً لجودة الحياة الحضرية."`,
      nl: `"Gent centrum: waarom mogen auto's hier eigenlijk niet meer door? Sinds het historische circulatieplan is de middeleeuwse kuip getransformeerd in het grootste autovrije gebied van Europa. Geen sluipverkeer meer langs de Graslei, maar een stad die ademt op het ritme van fietsers en voetgangers. Hoe werkt dit systeem in de praktijk?"`
    },
    tools: ['Field 4K Videography', 'After Effects 9:16', 'Stad Gent Mobility Data', 'Premiere Pro']
  },

  'belgian-trains-left': {
    title: 'Waarom Rijden Treinen in België Links? (Belgian Railways Explainer)',
    kicker: 'BELGIAN RAILWAYS &bull; HISTORICAL INFRASTRUCTURE &amp; MOBILITY',
    meta: 'TikTok Viral Explainer &bull; 23,600 Views &bull; 1,115 Likes &bull; 68 Shares &bull; 104 Saves',
    image: 'assets/dutch_video_2.jpg',
    metrics: [
      { label: 'TikTok Views', value: '23,600' },
      { label: 'Video Likes', value: '1,115' },
      { label: 'Audience Shares', value: '68' },
      { label: 'Bookmarks / Saves', value: '104' }
    ],
    editorialContext: `
      <p>An on-the-rails investigative explainer decoding a fascinating European infrastructure quirk: why trains across the Belgian railway network (NMBS/SNCB) run on the left-hand track, whereas road traffic travels on the right.</p>
      <p>Tracing the origins back to May 5, 1835, when the Brussels-Mechelen line opened as continental Europe's first public passenger railway. Built with British engineering assistance and Stephenson locomotives, Belgium adopted Britain's left-running convention—a standard preserved across its rail network for nearly two centuries.</p>
    `,
    methodology: `
      <ul style="padding-left: 20px; line-height: 1.6; margin-top: 8px;">
        <li><strong>Historical Infrastructure Archival:</strong> Reviewing early 19th-century railway maps, Stephenson locomotive technical logs, and Infrabel track topology.</li>
        <li><strong>Kinetic Visual Explainer:</strong> Pairing track-side high-speed train footage with animated historical maps explaining left vs. right European rail standards.</li>
      </ul>
    `,
    scripts: {
      en: `"Why do trains in Belgium run on the left while cars drive on the right? The answer dates back to May 5, 1835, when continental Europe's very first passenger railway opened between Brussels and Mechelen. Because it was constructed with British engineering and George Stephenson's locomotives, Belgium imported Britain's left-hand track convention—establishing a standard that remains in place to this day."`,
      ar: `"لماذا تسير القطارات في بلجيكا على المسار الأيسر بينما تسير السيارات على اليمين؟ يعود السر إلى الخامس من مايو عام 1835، تاريخ افتتاح أول خط سكك حديدية لنقل الركاب في القارة الأوروبية بين بروكسل وميشيلين. ولأن الخط شُيّد بمساعدة مهندسين بريطانيين وباستخدام قاطرات ستيفنسون الشهيرة، انتقل المعيار البريطاني بالسير يساراً ليصبح قاعدة شبكة القطارات البلجيكية حتى يومنا هذا."`,
      nl: `"Waarom rijden treinen in België eigenlijk links, terwijl auto's rechts rijden? Het antwoord brengt ons terug naar 5 mei 1835 en de allereerste passagiersspoorlijn op het Europese vasteland tussen Brussel en Mechelen. Die werd aangelegd met de hulp van Britse ingenieurs en Stephenson-locomotieven, waardoor de Britse gewoonte om links te rijden voorgoed verankerd werd in het Belgische spoornetwerk."`
    },
    tools: ['Field 4K Rail Footage', 'After Effects 9:16', 'Historical Cartography', 'Premiere Pro']
  },

  'leuven-knowledge': {
    title: 'Leuven Kennisstad: Het Historische Kennishart van België',
    kicker: 'FLEMISH HERITAGE &bull; HISTORIC UNIVERSITY CITIES',
    meta: 'TikTok Cultural Chronicle &bull; 511 Views &bull; 27 Likes &bull; 2 Shares',
    image: 'assets/dutch_video_3.jpg',
    metrics: [
      { label: 'TikTok Views', value: '511' },
      { label: 'Video Likes', value: '27' },
      { label: 'Audience Shares', value: '2' },
      { label: 'Bookmarks / Saves', value: '5' }
    ],
    editorialContext: `
      <p>A visual journey into Leuven, crowned the knowledge capital of Belgium. Exploring the iconic 15th-century gothic Town Hall (Stadhuis), the legacy of KU Leuven (established 1425), and how centuries of intellectual history blend with a dynamic, bike-friendly student ecosystem.</p>
    `,
    methodology: `
      <ul style="padding-left: 20px; line-height: 1.6; margin-top: 8px;">
        <li><strong>Heritage Architecture Documentation:</strong> Capturing the intricate late-gothic façade and architectural preservation on the Grote Markt.</li>
        <li><strong>Socio-Economic Urban Profile:</strong> Examining Leuven's position as a premier European university and innovation cluster.</li>
      </ul>
    `,
    scripts: {
      en: `"The best city in Belgium: Leuven knowledge city! Home to the stunning 15th-century gothic Stadhuis and KU Leuven—one of Europe's oldest universities—where centuries of academic prestige merge with vibrant Flemish cycling culture."`,
      ar: `"أجمل مدن بلجيكا: لوفين، عاصمة المعرفة! موطن أقدم جامعات أوروبا الكاثوليكية ومبنى البلدية القوطي الساحر الذي يعود للقرن الخامس عشر، حيث تلتقي عراقة التاريخ الأكاديمي بالحياة الطلابية المفعمة بالحيوية."`,
      nl: `"De beste stad van België: Leuven kennisstad! Met het adembenemende 15e-eeuwse stadhuis en KU Leuven—een van de oudste universiteiten van Europa—ademt elke straatsteen geschiedenis, wetenschap en een ongeëvenaard studentenleven."`
    },
    tools: ['On-Location 4K Video', 'After Effects 9:16', 'Heritage Documentation', 'Premiere Pro']
  }
};

function initDossierModal() {
  const modal = document.getElementById('dossier-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const closeAction = document.getElementById('modal-close-action');
  const modalTitle = document.getElementById('modal-title');
  const modalKicker = document.getElementById('modal-kicker');
  const modalMeta = document.getElementById('modal-meta');
  const modalBody = document.getElementById('modal-body-content');

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  closeAction?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Open modal triggers
  document.querySelectorAll('.btn-open-dossier, .btn-inspect-stack').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = PROJECT_DOSSIERS[projId] || PROJECT_DOSSIERS['huawei-chip'];

      modalTitle.textContent = data.title;
      modalKicker.textContent = data.kicker;
      modalMeta.innerHTML = data.meta;

      let html = '';

      if (data.image) {
        html += `
          <div class="dossier-media-embed">
            <img src="${data.image}" alt="${data.title}" width="800" height="450" loading="eager">
          </div>
        `;
      }

      const isDutchDoc = document.documentElement.lang === 'nl';
      const defaultScriptLang = isDutchDoc ? 'nl' : 'en';

      html += `
        <div class="dossier-metrics-grid">
          ${data.metrics.map(m => `
            <div class="metric-item">
              <span class="metric-val">${m.value}</span>
              <span class="metric-name">${m.label}</span>
            </div>
          `).join('')}
        </div>

        <div>
          <div class="dossier-section-title">${isDutchDoc ? 'REDACTIONEEL &amp; ECONOMISCH ONDERZOEK' : 'EDITORIAL &amp; ECONOMIC INVESTIGATION'}</div>
          <div style="font-size: 14px; line-height: 1.6; color: var(--dp-color-ink);">${data.editorialContext}</div>
        </div>

        <div>
          <div class="dossier-section-title">${isDutchDoc ? 'METHODOLOGIE &amp; DATAVERIFICATIE' : 'METHODOLOGY &amp; DATA VERIFICATION'}</div>
          <div style="font-size: 13px; color: var(--dp-color-ink-secondary);">${data.methodology}</div>
        </div>

        <div>
          <div class="dossier-section-title">${isDutchDoc ? 'MEERTALIGE SCRIPTLOKALISATIE FRAGMENTEN' : 'MULTILINGUAL SCRIPT LOCALIZATION EXCERPTS'}</div>
          <div class="script-tab-container">
            <div class="script-tab-header">
              <button class="script-tab-btn ${defaultScriptLang === 'en' ? 'active' : ''}" data-script="en">English (Newsroom)</button>
              <button class="script-tab-btn" data-script="ar">Arabic (العربية)</button>
              <button class="script-tab-btn ${defaultScriptLang === 'nl' ? 'active' : ''}" data-script="nl">Dutch (Nederlands)</button>
            </div>
            <div class="script-tab-content" id="modal-script-text">
              ${data.scripts[defaultScriptLang] || data.scripts.en}
            </div>
          </div>
        </div>

        <div>
          <div class="dossier-section-title">${isDutchDoc ? 'PRODUCTIE-INSTRUMENTEN &amp; STACK' : 'PRODUCTION TOOLS &amp; STACK'}</div>
          <ul class="skill-pills" style="margin-top: 6px;">
            ${data.tools.map(t => `<li>${t}</li>`).join('')}
          </ul>
        </div>
      `;

      modalBody.innerHTML = html;

      // Handle Script Tabs inside Modal
      const scriptBtns = modalBody.querySelectorAll('.script-tab-btn');
      const scriptDisplay = modalBody.querySelector('#modal-script-text');

      scriptBtns.forEach(sBtn => {
        sBtn.addEventListener('click', () => {
          scriptBtns.forEach(b => b.classList.remove('active'));
          sBtn.classList.add('active');
          const lang = sBtn.getAttribute('data-script');
          scriptDisplay.textContent = data.scripts[lang] || data.scripts.en;
          if (lang === 'ar') {
            scriptDisplay.style.direction = 'rtl';
            scriptDisplay.style.fontSize = '15px';
          } else {
            scriptDisplay.style.direction = 'ltr';
            scriptDisplay.style.fontSize = '13px';
          }
        });
      });

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* --------------------------------------------------------------------------
   6. Commissioning Dispatch Form Handling
   -------------------------------------------------------------------------- */
function initDispatchForm() {
  const form = document.getElementById('dispatch-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('btn-submit');

  if (!form) return;

  const targetEmail = 'wahbem97@gmail.com';
  const isDutch = document.documentElement.lang === 'nl';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (form['sender-name'] ? form['sender-name'].value : '').trim();
    const email = (form['sender-email'] ? form['sender-email'].value : '').trim();
    const selectElem = form['project-type'];
    const typeLabel = selectElem && selectElem.options[selectElem.selectedIndex]
      ? selectElem.options[selectElem.selectedIndex].text
      : 'Dispatch Inquiry';
    const msg = (form['message-content'] ? form['message-content'].value : '').trim();

    if (!name || !email || !msg) {
      showFeedback(
        isDutch
          ? 'Vul alle verplichte velden (*) in voordat u uw aanvraag verzendt.'
          : 'Please fill out all required fields (*) before submitting your dispatch.',
        'error'
      );
      return;
    }

    // Basic email format check
    if (!email.includes('@') || !email.includes('.')) {
      showFeedback(
        isDutch
          ? 'Voer een geldig zakelijk of redactioneel e-mailadres in.'
          : 'Please provide a valid newsroom or organizational email address.',
        'error'
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>${isDutch ? 'Verbinden met wahbem97@gmail.com...' : 'Connecting to wahbem97@gmail.com...'}</span>`;

    const subject = `[Dispatch Inquiry] ${typeLabel} — ${name}`;
    const bodyText = `Hello Mustafa,\n\nYou have received a new commissioning dispatch inquiry from your portfolio:\n\n• Sender: ${name}\n• Work Email: ${email}\n• Project Scope: ${typeLabel}\n\nBrief / Story Concept:\n----------------------------------------\n${msg}\n----------------------------------------\n\nSent from: ${window.location.href}`;

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    // Trigger mail client
    window.location.href = mailtoUrl;

    const checkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; margin-right: 4px;" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    const extIcon = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 3px;" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
    const mailIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 3px;" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;
    const clipIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 3px;" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`;

    setTimeout(() => {
      const successHtml = isDutch
        ? `
          <div style="font-weight: 700; margin-bottom: 6px; font-size: 14px;">
            ${checkIcon} Aanvraag gekoppeld aan ${targetEmail}
          </div>
          <div style="font-size: 13px; line-height: 1.5; margin-bottom: 12px;">
            Bedankt <strong>${escapeHtml(name)}</strong>! Uw e-mailprogramma opent automatisch. U kunt de aanvraag ook direct versturen via Gmail of de tekst kopiëren:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
            <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" style="background: #ea4335; color: #fff; padding: 7px 14px; border-radius: 4px; font-size: 12px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>Open in Gmail</span>${extIcon}
            </a>
            <a href="${mailtoUrl}" style="background: var(--dp-color-accent); color: #fff; padding: 7px 14px; border-radius: 4px; font-size: 12px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>Open E-mailapp</span>${mailIcon}
            </a>
            <button type="button" id="btn-copy-msg" style="background: var(--dp-color-panel); color: var(--dp-color-ink); border: 1px solid var(--dp-color-rule); padding: 7px 14px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>Kopieer Bericht</span>${clipIcon}
            </button>
          </div>
        `
        : `
          <div style="font-weight: 700; margin-bottom: 6px; font-size: 14px;">
            ${checkIcon} Dispatch linked to ${targetEmail}
          </div>
          <div style="font-size: 13px; line-height: 1.5; margin-bottom: 12px;">
            Thank you <strong>${escapeHtml(name)}</strong>! Your default email client should open automatically. You can also send directly via Gmail or copy the formatted brief:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
            <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" style="background: #ea4335; color: #fff; padding: 7px 14px; border-radius: 4px; font-size: 12px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>Open in Gmail</span>${extIcon}
            </a>
            <a href="${mailtoUrl}" style="background: var(--dp-color-accent); color: #fff; padding: 7px 14px; border-radius: 4px; font-size: 12px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>Open Mail App</span>${mailIcon}
            </a>
            <button type="button" id="btn-copy-msg" style="background: var(--dp-color-panel); color: var(--dp-color-ink); border: 1px solid var(--dp-color-rule); padding: 7px 14px; border-radius: 4px; font-size: 12px; cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              <span>Copy Formatted Brief</span>${clipIcon}
            </button>
          </div>
        `;

      showFeedback(successHtml, 'success', true);
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>${isDutch ? 'Verstuur Opdrachtaanvraag' : 'Send Dispatch Inquiry'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;

      const copyMsgBtn = document.getElementById('btn-copy-msg');
      if (copyMsgBtn) {
        copyMsgBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(bodyText).then(() => {
            copyMsgBtn.innerHTML = `<span>${isDutch ? 'Gekopieerd!' : 'Copied!'}</span>${checkIcon}`;
            setTimeout(() => {
              copyMsgBtn.innerHTML = `<span>${isDutch ? 'Kopieer Bericht' : 'Copy Formatted Brief'}</span>${clipIcon}`;
            }, 2000);
          });
        });
      }
    }, 500);
  });

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function showFeedback(content, type, isHtml = false) {
    if (!feedback) return;
    if (isHtml) {
      feedback.innerHTML = content;
    } else {
      feedback.textContent = content;
    }
    feedback.className = `form-feedback ${type}`;
  }
}

/* --------------------------------------------------------------------------
   7. Copy Email to Clipboard
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('btn-copy-email');
  const emailLink = document.getElementById('email-link');
  const tooltip = document.getElementById('copy-tooltip');

  if (!copyBtn || !emailLink) return;

  copyBtn.addEventListener('click', () => {
    const email = emailLink.textContent.trim();
    navigator.clipboard.writeText(email).then(() => {
      if (tooltip) {
        const original = tooltip.textContent;
        tooltip.textContent = 'Copied!';
        copyBtn.style.borderColor = 'var(--dp-color-emerald)';
        copyBtn.style.color = 'var(--dp-color-emerald)';

        setTimeout(() => {
          tooltip.textContent = original;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2200);
      }
    }).catch(() => {
      // Fallback
      if (tooltip) tooltip.textContent = 'Selected';
    });
  });
}
