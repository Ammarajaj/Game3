document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    //                                 بنوك الأسئلة (هيكلية جديدة)
    // =================================================================================

    // 1. بنك التدريب: 8 تخصصات، 3 أسئلة لكل تخصص (سهل، متوسط، صعب)
    const trainingBank = {
        'قلبية': [
            { level: 'easy', case: 'مريض 60 عاماً، يعاني من ألم صدري ضاغط خلف القص.', tools: { ecg: 'ارتفاع وصلة ST في المساري السفلية.' }, choices: ['احتشاء عضلة قلبية سفلي', 'التهاب التامور', 'تسلخ الأبهر', 'قرحة هضمية'], answer: 'احتشاء عضلة قلبية سفلي' },
            { level: 'medium', case: 'مريضة 70 عاماً، لديها قصة قصور قلب، أتت بزلة تنفسية شديدة وسعال رغوي زهري.', tools: { auscultation: 'خراخر ناعمة منتشرة في الساحتين الرئويتين.', xray: 'علامات احتقان وريدي رئوي وخطوط كيرلي B.' }, choices: ['وذمة رئة حادة قلبية المنشأ', 'نوبة ربو حادة', 'ذات رئة', 'صمة رئوية'], answer: 'وذمة رئة حادة قلبية المنشأ' },
            { level: 'hard', case: 'رجل 65 عاماً، أتى بألم صدري حاد "كالتمزيق" ينتشر إلى الظهر بين لوحي الكتف.', tools: { inspection: 'الضغط الشرياني في الذراع اليمنى (180/100) أعلى بكثير من اليسرى (110/70).', xray: 'توسع في المنصف.' }, choices: ['تسلخ الأبهر', 'احتشاء عضلة قلبية', 'صمة رئوية', 'التهاب التامور'], answer: 'تسلخ الأبهر', dangerousTool: 'palpation' }
        ],
        'غدية': [
            { level: 'easy', case: 'شابة 25 عاماً، تشكو من خسارة وزن رغم شهيتها الجيدة وخفقان.', tools: { inspection: 'جحوظ عينين واضح.' }, choices: ['داء غريفز (فرط درق)', 'قصور درق', 'داء كوشينغ', 'ورم قواتم'], answer: 'داء غريفز (فرط درق)' },
            { level: 'medium', case: 'مريض 45 عاماً، يشكو من زيادة وزن متركزة في الجذع، مع وجه بدري.', tools: { inspection: 'وجود فزر بنفسجية على البطن.', labs: 'ارتفاع سكر الدم.' }, choices: ['داء كوشينغ', 'قصور درق', 'متلازمة الأيض', 'ضخامة نهايات'], answer: 'داء كوشينغ' },
            { level: 'hard', case: 'مريضة فاقدة للوعي، تفوح من فمها رائحة تشبه الفاكهة (الأسيتون).', tools: { labs: 'سكر دم 550 مغ/دل، وجود كيتونات في البول والدم، حماض استقلابي.', history: 'مريضة سكري من النمط الأول غير ملتزمة بالعلاج.' }, choices: ['حماض كيتوني سكري (DKA)', 'صدمة نقص سكر الدم', 'غيبوبة فرط أسمولية', 'حماض لاكتيكي'], answer: 'حماض كيتوني سكري (DKA)' }
        ],
        // يمكنك إضافة بقية التخصصات الستة هنا بنفس البنية (3 أسئلة لكل تخصص)
        'عصبية': [
            { level: 'easy', case: 'رجل 70 عاماً، يعاني من ضعف مفاجئ في الطرفين الأيمنين.', tools: { inspection: 'تدلي زاوية الفم اليمنى.' }, choices: ['جلطة دماغية (CVA)', 'نزف تحت عنكبوتي', 'نوبة صرع', 'ورم دماغي'], answer: 'جلطة دماغية (CVA)' },
            { level: 'medium', case: 'شاب 30 عاماً، يشكو من صداع شديد مفاجئ يصفه بأنه "أسوأ صداع في حياته".', tools: { inspection: 'المريض يبدو متهيجا وغير مرتاح للضوء (رهاب الضوء).', palpation: 'تصلب في عضلات الرقبة (صلابة نقرة).' }, choices: ['نزف تحت العنكبوتية (SAH)', 'التهاب سحايا', 'شقيقة حادة', 'ورم دماغي'], answer: 'نزف تحت العنكبوتية (SAH)' },
            { level: 'hard', case: 'شابة 28 عاماً، تشكو من نوب متكررة من الاضطرابات العصبية التي تأتي وتذهب، تشمل تخديراً وضعفاً بصرياً.', tools: { history: 'الأعراض تفاقمت بعد حمام ساخن (ظاهرة أوتهوف).', reflexes: 'منعكسات مشتدة وعلامة بابنسكي إيجابية خلال النوبة.' }, choices: ['تصلب لويحي (MS)', 'ذئبة حمامية جهازية', 'داء لايم', 'نقص فيتامين ب12'], answer: 'تصلب لويحي (MS)' }
        ],
        'هضمية': [
            { level: 'easy', case: 'شاب 20 عاماً، يشكو من ألم بطني توضع في الحفرة الحرقفية اليمنى.', tools: { palpation: 'إيلام في نقطة ماكبرني.' }, choices: ['التهاب زائدة دودية حاد', 'التهاب رتوج', 'حصيات كلوية', 'التهاب أمعاء'], answer: 'التهاب زائدة دودية حاد' },
            { level: 'medium', case: 'رجل 50 عاماً، مدمن على الكحول، أتى بألم شرسوفي حاد ينتشر للظهر.', tools: { labs: 'ارتفاع شديد في الأميلاز والليبار المصلي.', history: 'الألم يزداد بعد الطعام.' }, choices: ['التهاب بنكرياس حاد', 'قرحة هضمية منثقبة', 'احتشاء عضلة قلبية سفلي', 'مغص مراري'], answer: 'التهاب بنكرياس حاد' },
            { level: 'hard', case: 'مريض 60 عاماً، لديه قصة تشمع كبد، أتى بحالة من التخليط الذهني مع "رفة خافقة" في اليدين.', tools: { labs: 'ارتفاع الأمونيا في الدم.', inspection: 'يرقان، حبن، وعلامات أخرى لقصور الكبد.' }, choices: ['اعتلال دماغي كبدي', 'نزف دوالي', 'متلازمة كبدية كلوية', 'ورم في الدماغ'], answer: 'اعتلال دماغي كبدي' }
        ],
        // سيتم إضافة التخصصات الأربعة المتبقية بنفس الطريقة
    };

    // 2. بنك التحدي: مقسم حسب الصعوبة (60 سؤالاً افتراضياً، سنضع 9 كبداية)
    const challengeBank = {
        easy: [
            { id: 'C-EASY-1', case: 'مريض أتى بألم وحرقة خلف القص يزداد بالانحناء ليلاً.', tools: { history: 'يتحسن بمضادات الحموضة.' }, choices: ['القلس المعدي المريئي (GERD)', 'احتشاء عضلة قلبية', 'تشنج مريء', 'قرحة هضمية'], answer: 'القلس المعدي المريئي (GERD)' },
            { id: 'C-EASY-2', case: 'شاب لديه سيلان أنف، عطاس، وحكة في العينين كل ربيع.', tools: { inspection: 'هالات سوداء تحت العينين (Allergic shiners).' }, choices: ['التهاب أنف تحسسي', 'زكام عادي', 'التهاب جيوب', 'ربو'], answer: 'التهاب أنف تحسسي' },
            { id: 'C-EASY-3', case: 'مريضة تشكو من ألم بطني تشنجي يتحسن بعد التغوط، مع تبادل بين الإمساك والإسهال.', tools: { history: 'الأعراض تزداد مع التوتر النفسي.' }, choices: ['متلازمة القولون المتهيج (IBS)', 'داء كرون', 'التهاب قولون قرحي', 'حساسية قمح'], answer: 'متلازمة القولون المتهيج (IBS)' },
        ],
        medium: [
            { id: 'C-MED-1', case: 'مريض مسن، غير متحرك، أتى بتورم وألم واحمرار في ساق واحدة فقط.', tools: { inspection: 'الساق المصابة أشد حرارة وأكبر محيطاً من الأخرى.', history: 'علامة هومان إيجابية (ألم في ربلة الساق عند عطف القدم الظهري).' }, choices: ['خثار وريدي عميق (DVT)', 'التهاب هيج', 'وذمة لمفية', 'تمزق عضلي'], answer: 'خثار وريدي عميق (DVT)' },
            { id: 'C-MED-2', case: 'مريض لديه قصة خثار وريدي عميق، تطورت لديه فجأة زلة تنفسية وألم صدري طاعن.', tools: { ecg: 'علامة S1Q3T3 الكلاسيكية.', labs: 'ارتفاع في الـ D-dimer.' }, choices: ['صمة رئوية', 'احتشاء عضلة قلبية', 'ريح صدرية', 'ذات رئة'], answer: 'صمة رئوية' },
            { id: 'C-MED-3', case: 'رجل 40 عاماً، يشكو من ضعف تدريجي متصاعد ومتناظر في الأطراف بدأ من القدمين.', tools: { history: 'كان لديه إسهال شديد قبل أسبوعين.', reflexes: 'غياب المنعكسات الوترية العميقة.' }, choices: ['متلازمة غيلان باريه', 'تصلب لويحي', 'وهن عضلي وبيل', 'شلل أطفال'], answer: 'متلازمة غيلان باريه' },
        ],
        hard: [
            { id: 'C-HARD-1', case: 'مريض يشكو من صداع، ألم في الفك عند المضغ، واضطراب في الرؤية بعين واحدة.', tools: { labs: 'ارتفاع شديد في سرعة التثفل (ESR).', palpation: 'إيلام عند جس الشريان الصدغي.' }, choices: ['التهاب الشريان ذو الخلايا العرطلة', 'ألم عصب مثلث التوائم', 'صداع عنقودي', 'زرق حاد'], answer: 'التهاب الشريان ذو الخلايا العرطلة', nextStep: { question: 'ما هو الإجراء الفوري الأكثر أهمية؟', choices: ['بدء جرعة عالية من الستيروئيدات فوراً', 'أخذ خزعة من الشريان الصدغي', 'إجراء تصوير بالرنين المغناطيسي', 'إعطاء مسكنات ألم'], answer: 'بدء جرعة عالية من الستيروئيدات فوراً' } },
            { id: 'C-HARD-2', case: 'مريض لديه حمى، طفح جلدي راحي أخمصي، ونفخة قلبية جديدة.', tools: { history: 'المريض مدمن مخدرات وريدية.', labs: 'زرع الدم إيجابي للعنقوديات المذهبة.' }, choices: ['التهاب شغاف إنتاني', 'حمى رثوية', 'داء كاواساكي', 'زهري ثانوي'], answer: 'التهاب شغاف إنتاني' },
            { id: 'C-HARD-3', case: 'مريض أتى بألم بطني، يرقان، وحمى مع نوافض (عرواءات).', tools: { history: 'لديه قصة حصيات مرارية.', labs: 'ارتفاع البيليروبين المباشر والـ ALP و GGT.' }, choices: ['التهاب الطرق الصفراوية الصاعد (ثالوث شاركو)', 'التهاب مرارة حاد', 'التهاب كبد فيروسي', 'سرطان رأس البنكرياس'], answer: 'التهاب الطرق الصفراوية الصاعد (ثالوث شاركو)' },
        ]
    };

    // =================================================================================
    //                               عناصر الواجهة
    // =================================================================================
    // (هذا الجزء مطابق للكود السابق، يربط متغيرات جافاسكريبت بعناصر HTML)
    const screens = {
        start: document.getElementById('start-screen'),
        modeSelection: document.getElementById('mode-selection-screen'),
        specialtySelection: document.getElementById('specialty-selection-screen'),
        game: document.getElementById('game-screen'),
        lose: document.getElementById('lose-screen'),
        win: document.getElementById('win-screen'),
        // تم تعديل اسم لوحة الصدارة إلى لوحة الإحصائيات الشخصية
        stats: document.getElementById('stats-screen'), // اسم جديد
    };

    const buttons = {
        startGame: document.getElementById('start-game-btn'),
        trainingMode: document.getElementById('training-mode-btn'),
        grandRound: document.getElementById('grand-round-btn'),
        restartGrandRound: document.getElementById('restart-grand-round-btn'),
        backToMainMenuLose: document.getElementById('back-to-main-menu-lose'),
        backToMainMenuWin: document.getElementById('back-to-main-menu-win'),
        // تم تعديل أزرار لوحة الصدارة
        showStats: document.getElementById('stats-btn-main'), // اسم جديد
        backToMainMenuStats: document.getElementById('back-to-main-menu-stats'), // اسم جديد
    };

    const gameElements = {
        budgetDisplay: document.getElementById('budget-display'),
        questionCounter: document.getElementById('question-counter'),
        timerDisplay: document.getElementById('timer-display'),
        caseTitle: document.getElementById('case-title'),
        caseDescription: document.getElementById('case-description'),
        patientFileContent: document.getElementById('file-content'),
        diagnosticTools: document.getElementById('diagnostic-tools'),
        assistanceTools: document.getElementById('assistance-tools'),
        choicesContainer: document.getElementById('choices-container'),
    };
    
    // شاشة الإحصائيات الشخصية
    const statsElements = {
        bestPercentage: document.getElementById('best-percentage'),
        totalAttempts: document.getElementById('total-attempts-stats'),
        highestStage: document.getElementById('highest-stage'),
        recentHistory: document.getElementById('recent-history-list'),
    };

    const modal = {
        element: document.getElementById('modal'),
        title: document.getElementById('modal-title'),
        text: document.getElementById('modal-text'),
        closeBtn: document.querySelector('.close-btn'),
    };

    // =================================================================================
    //                                متغيرات حالة اللعبة
    // =================================================================================
    let currentScreen = 'start';
    let gameState = {};
    // بيانات الإحصائيات الشخصية
    let personalStats = JSON.parse(localStorage.getItem('personalStats')) || {
        bestPercentage: 0,
        totalAttempts: 0,
        highestStage: '0 / 15',
        recentHistory: []
    };
    let timerInterval;

    // =================================================================================
    //                                وظائف التحكم بالواجهة
    // =================================================================================

    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
        currentScreen = screenName;
    }

    function showModal(title, text) {
        modal.title.textContent = title;
        modal.text.innerHTML = text; // Use innerHTML to allow for bold tags etc.
        modal.element.style.display = 'flex';
    }

    modal.closeBtn.onclick = () => modal.element.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal.element) {
            modal.element.style.display = 'none';
        }
    };

    // --- نهاية القسم الأول ---
});
// --- بداية القسم الثاني ---

// =================================================================================
//                                وظائف إعداد اللعبة
// =================================================================================

function setupSpecialtySelection() {
    const specialtyGrid = document.getElementById('specialty-grid');
    specialtyGrid.innerHTML = '';
    // ملاحظة: يجب أن تتطابق الأسماء هنا مع مفاتيح كائن trainingBank
    const specialties = {
        'قلبية': '❤️', 'غدية': '💧', 'عصبية': '🧠', 'هضمية': '🍕',
        'بولية': '🚽', 'دموية': '🩸', 'صدرية': '🫁', 'رثوية': '🦴'
    };
    for (const specialty in specialties) {
        // تأكد من أن التخصص موجود في بنك الأسئلة قبل عرضه
        if (trainingBank[specialty]) {
            const card = document.createElement('div');
            card.className = 'specialty-card';
            card.dataset.specialty = specialty;
            card.innerHTML = `<div class="specialty-icon">${specialties[specialty]}</div><h4>${specialty}</h4>`;
            card.onclick = () => startTraining(specialty);
            specialtyGrid.appendChild(card);
        }
    }
    const backBtn = document.createElement('button');
    backBtn.className = 'back-to-mode-selection-btn secondary-btn';
    backBtn.textContent = 'العودة';
    backBtn.onclick = () => showScreen('modeSelection');
    specialtyGrid.appendChild(backBtn);
}

function startTraining(specialty) {
    // جلب الأسئلة الثلاثة للتخصص المحدد وترتيبها حسب الصعوبة
    const questions = [...trainingBank[specialty]].sort((a, b) => {
        const order = { easy: 1, medium: 2, hard: 3 };
        return order[a.level] - order[b.level];
    });

    gameState = {
        mode: 'training',
        questions: questions,
        currentQuestionIndex: 0,
        budget: 150, // ميزانية أقل للتدريب
        usedToolsCount: 0,
        specialty: specialty,
    };
    setupQuestion();
    showScreen('game');
    showModal('بدء التدريب', `أنت الآن في مناوبة <b>${specialty}</b>. ستواجه 3 حالات بصعوبة متدرجة. الخطأ لن ينهي اللعبة، لكنه سيكلفك 25 نقطة. بالتوفيق!`);
}

function startGrandRound() {
    // زيادة عداد المحاولات وحفظه
    personalStats.totalAttempts++;
    saveStats();

    // بناء الجولة الكبرى: 15 سؤالاً (5 سهل، 5 متوسط، 5 صعب)
    let grandRoundQuestions = [];

    // 1. اسحب 5 أسئلة سهلة عشوائياً
    const easyQuestions = shuffleArray([...challengeBank.easy]).slice(0, 5);
    // 2. اسحب 5 أسئلة متوسطة عشوائياً
    const mediumQuestions = shuffleArray([...challengeBank.medium]).slice(0, 5);
    // 3. اسحب 5 أسئلة صعبة عشوائياً
    const hardQuestions = shuffleArray([...challengeBank.hard]).slice(0, 5);

    // 4. ادمجها بالترتيب: السهل أولاً، ثم المتوسط، ثم الصعب
    grandRoundQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

    // تأكد من وجود 15 سؤالاً، إذا كان البنك أصغر، استخدم ما هو متاح
    if (grandRoundQuestions.length < 1) {
        showModal('خطأ', 'بنك أسئلة التحدي فارغ. لا يمكن بدء الجولة الكبرى.');
        return;
    }

    gameState = {
        mode: 'grand_round',
        questions: grandRoundQuestions,
        currentQuestionIndex: 0,
        budget: 200,
        usedToolsCount: 0,
        startTime: Date.now(), // لتسجيل وقت البدء
    };
    setupQuestion();
    showScreen('game');
    showModal('بدء الجولة الكبرى!', `هذا هو التحدي الحقيقي! ستواجه ${grandRoundQuestions.length} حالات بصعوبة متدرجة. <b>خطأ واحد يعني الخسارة الكاملة.</b> تركيزك هو مفتاح النجاح. بالتوفيق أيها المشخص المحترف!`);
}

// =================================================================================
//                                وظائف مساعدة
// =================================================================================

/**
 * دالة لخلط ترتيب عناصر مصفوفة بشكل عشوائي
 * @param {Array} array المصفوفة المراد خلطها
 * @returns {Array} مصفوفة جديدة بترتيب عشوائي
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * دالة لحفظ إحصائيات اللاعب في Local Storage
 */
function saveStats() {
    localStorage.setItem('personalStats', JSON.stringify(personalStats));
}

/**
 * دالة لتحديث وعرض شاشة الإحصائيات الشخصية
 */
function displayStats() {
    statsElements.bestPercentage.textContent = `${personalStats.bestPercentage}%`;
    statsElements.totalAttempts.textContent = personalStats.totalAttempts;
    statsElements.highestStage.textContent = personalStats.highestStage;

    statsElements.recentHistory.innerHTML = '';
    if (personalStats.recentHistory.length === 0) {
        statsElements.recentHistory.innerHTML = '<li>لا يوجد سجل محاولات بعد.</li>';
    } else {
        // عرض آخر 5 محاولات فقط
        personalStats.recentHistory.slice(-5).reverse().forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `النتيجة: ${entry.percentage}% - وصلت للمرحلة: ${entry.stage}`;
            statsElements.recentHistory.appendChild(li);
        });
    }
    showScreen('stats');
}


// --- نهاية القسم الثاني ---
// --- بداية القسم الثالث ---

// =================================================================================
//                                وظائف منطق اللعبة
// =================================================================================

function setupQuestion() {
    // إعادة تعيين الواجهة للسؤال الجديد
    gameElements.patientFileContent.innerHTML = '<p class="placeholder">استخدم الأدوات لكشف المعلومات وإضافتها إلى الملف...</p>';
    document.querySelectorAll('.tool, .assist-tool').forEach(t => {
        t.classList.remove('used');
        t.disabled = false;
    });

    const question = gameState.questions[gameState.currentQuestionIndex];
    
    // تحديث العرض
    gameElements.budgetDisplay.textContent = gameState.budget;
    gameElements.questionCounter.textContent = `${gameState.currentQuestionIndex + 1} / ${gameState.questions.length}`;
    gameElements.caseTitle.textContent = `الحالة رقم #${gameState.currentQuestionIndex + 1} (صعوبة: ${question.level || 'غير محدد'})`;
    gameElements.caseDescription.textContent = question.case;

    // إعداد الخيارات
    gameElements.choicesContainer.innerHTML = '';
    const shuffledChoices = shuffleArray([...question.choices]);
    shuffledChoices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice);
        gameElements.choicesContainer.appendChild(button);
    });
}

function useTool(toolElement) {
    if (toolElement.classList.contains('used')) return;

    const toolName = toolElement.dataset.tool;
    const cost = parseInt(toolElement.dataset.cost);

    if (gameState.budget < cost) {
        showModal('ميزانية غير كافية!', 'لا يمكنك استخدام هذه الأداة.');
        return;
    }

    updateBudget(-cost);
    gameState.usedToolsCount++;
    toolElement.classList.add('used');
    toolElement.disabled = true;

    const question = gameState.questions[gameState.currentQuestionIndex];

    // التحقق من الأداة الخطرة في الجولة الكبرى
    if (gameState.mode === 'grand_round' && question.dangerousTool === toolName) {
        loseGame(`لقد استخدمت أداة خطرة (${toolElement.innerText}) في هذا السياق، مما أدى إلى تدهور حاد في حالة المريض. التشخيص الصحيح كان: ${question.answer}`);
        return;
    }

    const info = question.tools[toolName];
    if (info) {
        addInfoToPatientFile(info, toolElement.innerText);
    } else {
        addInfoToPatientFile('لا توجد معلومات مفيدة من هذه الأداة لهذه الحالة.', toolElement.innerText);
    }
}

function useAssistTool(toolElement) {
    if (toolElement.classList.contains('used')) return;
    
    const cost = parseInt(toolElement.dataset.cost);
    if (gameState.budget < cost) {
        showModal('ميزانية غير كافية!', 'لا يمكنك استخدام هذه الأداة.');
        return;
    }
    
    updateBudget(-cost);
    toolElement.classList.add('used');
    toolElement.disabled = true;
    
    const question = gameState.questions[gameState.currentQuestionIndex];
    
    if (toolElement.id === 'consultation-tool') {
        // إزالة إجابتين خاطئتين
        let wrongChoices = question.choices.filter(c => c !== question.answer);
        wrongChoices = shuffleArray(wrongChoices).slice(0, 2);
        document.querySelectorAll('.choice-btn').forEach(btn => {
            if (wrongChoices.includes(btn.textContent)) {
                btn.style.display = 'none';
            }
        });
        showModal('💡 مساعدة (50/50)', `لقد قمت باستشارة زميل، وقام باستبعاد إجابتين خاطئتين من أجلك.`);
    } else if (toolElement.id === 'brainstorm-tool') {
        const choicesList = question.choices.map(c => `<li>${c}</li>`).join('');
        showModal('🧠 عصف ذهني', `التشخيصات التفريقية المحتملة لهذه الحالة هي:<ul>${choicesList}</ul>`);
    }
}

function addInfoToPatientFile(info, toolName) {
    if (gameElements.patientFileContent.querySelector('.placeholder')) {
        gameElements.patientFileContent.innerHTML = '';
    }
    const infoCard = document.createElement('div');
    infoCard.className = 'info-card';
    infoCard.innerHTML = `<strong>${toolName}:</strong> ${info}`;
    gameElements.patientFileContent.appendChild(infoCard);
}

function updateBudget(amount) {
    gameState.budget += amount;
    gameElements.budgetDisplay.textContent = gameState.budget;
}

function checkAnswer(selectedAnswer) {
    const question = gameState.questions[gameState.currentQuestionIndex];
    if (selectedAnswer === question.answer) {
        // إجابة صحيحة
        const reward = 15;
        updateBudget(reward);
        
        // التحقق من وجود خطوة تالية (للحالات المعقدة)
        if (question.nextStep && !gameState.nextStepCompleted) {
            showModal('تشخيص أولي صحيح!', `تشخيصك صحيح! لقد ربحت ${reward} نقطة. لكن هذه الحالة معقدة وتتطلب قراراً إضافياً.`);
            gameState.nextStepCompleted = true; // لمنع تكرار الخطوة
            // تحويل السؤال إلى الخطوة التالية
            question.case = question.nextStep.question;
            question.choices = question.nextStep.choices;
            question.answer = question.nextStep.answer;
            // إعادة إعداد السؤال بنفس الحالة ولكن بالمعلومات الجديدة
            setTimeout(setupQuestion, 2000);
        } else {
            showModal('إجابة صحيحة!', `تشخيصك صحيح! لقد ربحت ${reward} نقطة.`);
            setTimeout(nextQuestion, 1500);
        }

    } else {
        // إجابة خاطئة
        if (gameState.mode === 'grand_round') {
            loseGame(`إجابة خاطئة. التشخيص الصحيح كان: ${question.answer}`);
        } else {
            // وضع التدريب
            const penalty = 25;
            updateBudget(-penalty);
            showModal('إجابة خاطئة!', `التشخيص الصحيح كان: <b>${question.answer}</b>. تم خصم ${penalty} نقطة كعقوبة. تعلم من الخطأ وانتقل للحالة التالية.`);
            setTimeout(nextQuestion, 2500);
        }
    }
}

function nextQuestion() {
    gameState.currentQuestionIndex++;
    // إعادة تعيين حالة الخطوة التالية للسؤال القادم
    delete gameState.nextStepCompleted;

    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        // انتهاء اللعبة
        if (gameState.mode === 'grand_round') {
            winGame();
        } else {
            showModal('التدريب انتهى!', `لقد أكملت مناوبة <b>${gameState.specialty}</b> بنجاح. نتيجتك التدريبية هي ${gameState.budget} نقطة. يمكنك الآن العودة واختيار مناوبة أخرى أو تجربة الجولة الكبرى.`);
            showScreen('modeSelection');
        }
    } else {
        setupQuestion();
    }
}

function loseGame(reason) {
    updateStatsOnFinish(false); // تحديث الإحصائيات عند الخسارة
    document.getElementById('lose-reason').textContent = reason;
    showScreen('lose');
}

function winGame() {
    updateStatsOnFinish(true); // تحديث الإحصائيات عند الفوز
    showScreen('win');
}

function updateStatsOnFinish(isWin) {
    const finalScore = gameState.budget;
    const stageReached = isWin ? gameState.questions.length : gameState.currentQuestionIndex;
    const totalStages = gameState.questions.length;
    
    // معادلة حساب مؤشر الكفاءة
    // 60% من النتيجة، 40% من التقدم في المراحل
    let efficiency = ((finalScore / 200) * 60) + ((stageReached / totalStages) * 40);
    efficiency = Math.max(0, Math.min(100, efficiency)).toFixed(0);

    // تحديث أفضل نتيجة
    if (efficiency > personalStats.bestPercentage) {
        personalStats.bestPercentage = efficiency;
    }

    // تحديث أعلى مرحلة تم الوصول إليها
    const currentHighestStage = parseInt(personalStats.highestStage.split(' ')[0]);
    if (stageReached > currentHighestStage) {
        personalStats.highestStage = `${stageReached} / ${totalStages}`;
    }

    // إضافة المحاولة الحالية إلى السجل
    personalStats.recentHistory.push({
        percentage: efficiency,
        stage: `${stageReached} / ${totalStages}`
    });
    // الحفاظ على آخر 5 محاولات فقط
    if (personalStats.recentHistory.length > 5) {
        personalStats.recentHistory.shift();
    }

    saveStats(); // حفظ كل الإحصائيات المحدثة

    // عرض النتائج في شاشة الفوز/الخسارة
    if (isWin) {
        document.getElementById('final-score').textContent = finalScore;
        document.getElementById('final-percentage-display').textContent = `${efficiency}%`;
    }
}


// =================================================================================
//                                إعداد مستمعي الأحداث
// =================================================================================

function setupEventListeners() {
    buttons.startGame.onclick = () => showScreen('modeSelection');
    buttons.trainingMode.onclick = () => {
        setupSpecialtySelection();
        showScreen('specialtySelection');
    };
    buttons.grandRound.onclick = startGrandRound;
    
    buttons.restartGrandRound.onclick = startGrandRound;
    buttons.backToMainMenuLose.onclick = () => showScreen('modeSelection');
    buttons.backToMainMenuWin.onclick = () => showScreen('modeSelection');

    buttons.showStats.onclick = displayStats;
    buttons.backToMainMenuStats.onclick = () => showScreen('modeSelection');

    // ربط وظائف الأدوات بالأزرار
    document.querySelectorAll('.tool').forEach(tool => {
        tool.onclick = () => useTool(tool);
    });
    document.querySelectorAll('.assist-tool').forEach(tool => {
        tool.onclick = () => useAssistTool(tool);
    });
}

// =================================================================================
//                                نقطة انطلاق التطبيق
// =================================================================================
setupEventListeners();
showScreen('start');
showModal('مرحباً بك في منصة المشخص المحترف!', 'هذه المنصة مصممة لصقل مهاراتك السريرية. اختر "وضع التدريب" لمراجعة التخصصات، أو "الجولة الكبرى" لاختبار معرفتك في تحدٍ حقيقي. بالتوفيق!');


// --- نهاية القسم الثالث ---
});
