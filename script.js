document.addEventListener('DOMContentLoaded', () => {
    // --- تعريف بنك الأسئلة الكامل (15 سؤال) ---
    const allQuestions = [
        // --- المستوى 1: الأساسيات (5 أسئلة) ---
        { level: 1, description: "شاب عمره 20 عاماً، أتى بألم حاد في الربع السفلي الأيمن من البطن.", toolsInfo: { hand: "عند الجس، يوجد إيلام شديد في نقطة ماكبيرني مع دفاع عضلي." }, choices: ["التهاب المرارة", "التهاب الزائدة الدودية", "حصاة حالب", "التهاب الرتوج", "فتق إربي"], correctAnswer: "التهاب الزائدة الدودية" },
        { level: 1, description: "طفل عمره 8 سنوات، يعاني من التهاب في الحلق وحرارة، مع طفح جلدي أحمر ناعم الملمس.", toolsInfo: { magnifier: "اللسان يبدو أحمر اللون ومغطى بحليمات بارزة (لسان الفراولة)." }, choices: ["الحصبة", "الحمى القرمزية", "جدري الماء", "الوردية الطفولية", "مرض اليد والقدم والفم"], correctAnswer: "الحمى القرمزية" },
        { level: 1, description: "سيدة عمرها 45 عاماً، بدينة، تشكو من ألم حاد في الربع العلوي الأيمن من البطن بعد وجبة دسمة.", toolsInfo: { hand: "عند وضع اليد تحت الحافة الضلعية اليمنى والطلب من المريضة أخذ نفس عميق، تتوقف عن التنفس بسبب الألم (علامة مورفي إيجابية)." }, choices: ["التهاب الكبد", "قرحة هضمية", "التهاب المرارة الحاد", "التهاب البنكرياس", "قولون عصبي"], correctAnswer: "التهاب المرارة الحاد" },
        { level: 1, description: "شاب طويل ونحيل، شعر فجأة بألم حاد في الصدر وضيق نفس شديد.", toolsInfo: { stethoscope: "غياب أصوات التنفس في الجانب الأيمن من الصدر، مع فرط رنين عند القرع." }, choices: ["احتشاء القلب", "صمة رئوية", "استرواح الصدر التلقائي", "ذات رئة", "تشنج عضلي"], correctAnswer: "استرواح الصدر التلقائي" },
        { level: 1, description: "مريض سكري معروف، لم يأخذ جرعة الأنسولين، وأتى بحالة تخليط ذهني.", toolsInfo: { pen: "تفوح من فم المريض رائحة تشبه الفاكهة المتعفنة (رائحة الأسيتون)." }, choices: ["نقص سكر الدم", "غيبوبة فرط الحلولية", "الحماض الكيتوني السكري", "سكتة دماغية", "تسمم كحولي"], correctAnswer: "الحماض الكيتوني السكري" },
        // --- المستوى 2: التخصص (5 أسئلة) ---
        { level: 2, description: "مريض عمره 65 عاماً، مدخن، يشكو من ألم صدري ضاغط بدأ منذ ساعة.", toolsInfo: { pen: "الألم ينتشر للكتف الأيسر والفك. يرافقه تعرق شديد وغثيان.", stethoscope: "الأصوات القلبية مكتومة قليلاً، لا توجد نفخات واضحة." }, choices: ["تسلخ الأبهر", "صمة رئوية", "احتشاء العضلة القلبية", "التهاب التامور", "حرقة فؤاد"], correctAnswer: "احتشاء العضلة القلبية" },
        { level: 2, description: "شابة عمرها 30 عاماً، تشكو من خفقان، فقدان وزن، وشعور دائم بالحرارة.", toolsInfo: { magnifier: "يلاحظ وجود جحوظ بسيط في العينين ورعشة ناعمة في اليدين الممدودتين.", stethoscope: "ضربات القلب سريعة ومنتظمة (110 ضربة/دقيقة)." }, choices: ["ورم القواتم", "قلق عام", "فقر الدم", "فرط نشاط الدرق (داء غريفز)", "بداية سن اليأس"], correctAnswer: "فرط نشاط الدرق (داء غريفز)" },
        { level: 2, description: "مريض يعاني من قصور كلوي مزمن، يشكو من حكة شديدة وتشنجات في العضلات.", toolsInfo: { hand: "عند نفخ كم جهاز الضغط على ذراعه، تحدث تشنجات في يده (علامة تروسو إيجابية).", hammer: "عند نقر العصب الوجهي أمام الأذن، تحدث تقلصات في عضلات الوجه (علامة شفوستيك إيجابية)." }, choices: ["نقص صوديوم الدم", "فرط بوتاسيوم الدم", "نقص كالسيوم الدم", "فرط مغنيزيوم الدم", "نقص فوسفات الدم"], correctAnswer: "نقص كالسيوم الدم" },
        { level: 2, description: "رجل عمره 60 عاماً، أتى بألم بطني شديد ينتشر إلى الظهر، مع غثيان وإقياء.", toolsInfo: { pen: "المريض لديه تاريخ من إدمان الكحول وحصيات المرارة.", magnifier: "توجد كدمات زرقاء حول السرة (علامة كولن)." }, choices: ["انثقاب قرحة", "التهاب البنكرياس الحاد", "انسداد الأمعاء", "احتشاء المساريقا", "أم دم أبهرية بطنية"], correctAnswer: "التهاب البنكرياس الحاد" },
        { level: 2, description: "مريضة شابة لديها تاريخ من الإجهاضات المتكررة، أتت بجلطة وريدية عميقة في الساق.", toolsInfo: { pen: "تذكر المريضة وجود طفح جلدي على وجهها عند التعرض للشمس.", magnifier: "يوجد طفح جلدي أحمر على الخدين وجسر الأنف يشبه الفراشة." }, choices: ["متلازمة أضداد الفوسفولبيد", "عوز العامل الخامس لايدن", "الذئبة الحمامية الجهازية", "فقر الدم المنجلي", "كثرة الصفيحات الأساسية"], correctAnswer: "الذئبة الحمامية الجهازية" },
        // --- المستوى 3: النخبة (5 أسئلة) ---
        { level: 3, description: "رجل عمره 50 عاماً، مدمن على الكحول، أتى بحالة تخليط ذهني وحركات عين غريبة.", toolsInfo: { magnifier: "يلاحظ وجود رأرأة أفقية (حركة سريعة في العينين) وشلل في عضلات العين الخارجية.", hammer: "عند فحص المشية، كانت مشيته رنحية (غير متوازنة) مع قاعدة عريضة." }, choices: ["سكتة دماغية", "ورم في المخ", "اعتلال دماغي كبدي", "اعتلال دماغي لفيرنيكه", "جرعة زائدة من المخدرات"], correctAnswer: "اعتلال دماغي لفيرنيكه" },
        { level: 3, description: "مريض يشكو من نوبات صداع شديد، تعرق، وخفقان.", toolsInfo: { pen: "يذكر المريض أن هذه النوبات تحدث بشكل مفاجئ وتستمر لدقائق. ضغطه الانقباضي أثناء النوبة 220/120.", stethoscope: "لا توجد نفخات قلبية، لكن النبض سريع جداً وقوي أثناء النوبة." }, choices: ["نوبة هلع", "فرط نشاط الدرق", "ورم القواتم (Pheochromocytoma)", "صداع عنقودي", "ارتفاع ضغط الدم الأساسي"], correctAnswer: "ورم القواتم (Pheochromocytoma)" },
        { level: 3, description: "مزارع أتى بحمى، سعال، وألم عضلي شديد، خاصة في عضلات الربلة.", toolsInfo: { pen: "يذكر أنه كان ينظف حظيرة فئران قبل أسبوع.", magnifier: "يوجد احمرار شديد في ملتحمة العينين دون وجود قيح (احتقان الملتحمة)." }, choices: ["الإنفلونزا", "داء البريميات (Leptospirosis)", "حمى التيفوئيد", "الملاريا", "التهاب الكبد الفيروسي"], correctAnswer: "داء البريميات (Leptospirosis)" },
        { level: 3, description: "مريض يعاني من ضعف مترقٍ يبدأ من قدميه ويتصاعد للأعلى خلال الأيام القليلة الماضية.", toolsInfo: { pen: "يذكر المريض أنه أصيب بإسهال خفيف قبل أسبوعين.", hammer: "المنعكسات الوترية العميقة غائبة تماماً في الطرفين السفليين والعلويين." }, choices: ["التصلب اللويحي", "الوهن العضلي الوبيل", "متلازمة غيلان باريه", "شلل الأطفال", "التصلب الجانبي الضموري"], correctAnswer: "متلازمة غيلان باريه" },
        { level: 3, description: "طفل لديه بقع بنية اللون على جلده (بقع القهوة بحليب)، مع صعوبات في التعلم.", toolsInfo: { magnifier: "يوجد نمش في منطقة الإبط (علامة كرو). عند فحص العين، توجد عقيدات صغيرة بنية على القزحية (عقيدات ليش).", pen: "لدى والده نفس البقع الجلدية." }, choices: ["التصلب الحدبي", "متلازمة ستيرج ويبر", "الورم العصبي الليفي من النوع الأول", "متلازمة ماكون أولبرايت", "الجذام"], correctAnswer: "الورم العصبي الليفي من النوع الأول" }
    ];

    // --- متغيرات اللعبة ---
    const TOOL_COST = 10;
    const INITIAL_BUDGET = 200;
    const REWARDS = { 1: 15, 2: 25, 3: 40 };
    let journeyQuestions = [];
    let currentQuestionIndex = 0;
    let currentBudget = 0;
    let usedTools = new Set();

    // --- عناصر الواجهة ---
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const diagnoseButton = document.getElementById('diagnose-button');
    const progressDisplay = document.getElementById('progress');
    const budgetDisplay = document.getElementById('budget');
    const caseDescription = document.getElementById('case-description');
    const infoBoard = document.getElementById('info-board');
    const choicesContainer = document.getElementById('choices-container');
    const gameOverTitle = document.getElementById('game-over-title');
    const gameOverReason = document.getElementById('game-over-reason');
    const gameOverScreen = document.getElementById('game-over-screen');
    const tools = document.querySelectorAll('.tool');

    // --- دوال اللعبة ---
    function showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    }

    function setupJourney() {
        journeyQuestions = [];
        [1, 2, 3].forEach(level => {
            const questionsOfLevel = allQuestions.filter(q => q.level === level);
            // خلط الأسئلة داخل كل مستوى
            const shuffled = questionsOfLevel.sort(() => 0.5 - Math.random());
            // أخذ 5 أسئلة من كل مستوى
            journeyQuestions.push(...shuffled.slice(0, 5));
        });
    }

    function startGame() {
        setupJourney();
        currentQuestionIndex = 0;
        currentBudget = INITIAL_BUDGET;
        loadQuestion(journeyQuestions[0]);
        showScreen('game-screen');
    }

    function loadQuestion(question) {
        usedTools.clear();
        budgetDisplay.textContent = currentBudget;
        progressDisplay.textContent = `${currentQuestionIndex + 1}/${journeyQuestions.length}`;
        caseDescription.textContent = question.description;
        infoBoard.innerHTML = '';
        tools.forEach(t => t.style.display = 'flex');
    }

    function useTool(toolName) {
        if (usedTools.has(toolName)) return;
        if (currentBudget < TOOL_COST) {
            alert("ميزانيتك لا تسمح!");
            return;
        }

        currentBudget -= TOOL_COST;
        budgetDisplay.textContent = currentBudget;
        usedTools.add(toolName);

        const question = journeyQuestions[currentQuestionIndex];
        const info = question.toolsInfo[toolName];
        const infoCard = document.createElement('div');
        infoCard.className = 'info-card';
        const toolIcon = document.querySelector(`.tool[data-tool="${toolName}"]`).textContent.replace(/-10|\w+/g, '').trim();
        
        if (info) {
            infoCard.textContent = `[${toolIcon}] ${info}`;
        } else {
            infoCard.textContent = `[${toolIcon}] لا توجد معلومات مفيدة من هذا الفحص.`;
            infoCard.style.borderColor = '#c53030';
        }
        infoBoard.appendChild(infoCard);
        document.querySelector(`.tool[data-tool="${toolName}"]`).style.display = 'none';
    }

    function showDiagnosisScreen() {
        const question = journeyQuestions[currentQuestionIndex];
        choicesContainer.innerHTML = '';
        const shuffledChoices = [...question.choices].sort(() => Math.random() - 0.5);
        shuffledChoices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice;
            button.onclick = () => checkAnswer(choice);
            choicesContainer.appendChild(button);
        });
        showScreen('diagnosis-screen');
    }

    function checkAnswer(selectedChoice) {
        const question = journeyQuestions[currentQuestionIndex];
        if (selectedChoice === question.correctAnswer) {
            // إجابة صحيحة
            const reward = REWARDS[question.level];
            currentBudget += reward;
            currentQuestionIndex++;

            if (currentQuestionIndex < journeyQuestions.length) {
                alert(`تشخيص صحيح! تمت إضافة ${reward} نقطة لميزانيتك.`);
                loadQuestion(journeyQuestions[currentQuestionIndex]);
                showScreen('game-screen');
            } else {
                gameOver(`تهانينا! لقد أكملت رحلة المشخّص بنجاح! نتيجتك النهائية: ${currentBudget} نقطة.`, true);
            }
        } else {
            // إجابة خاطئة
            gameOver(`تشخيص خاطئ! الإجابة الصحيحة كانت: "${question.correctAnswer}"`, false);
        }
    }

    function gameOver(reason, isWin) {
        gameOverTitle.textContent = isWin ? "لقد فزت!" : "لقد خسرت!";
        gameOverReason.textContent = reason;
        gameOverScreen.className = `screen active ${isWin ? 'win' : 'loss'}`;
        showScreen('game-over-screen');
    }

    // --- ربط الأحداث ---
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    diagnoseButton.addEventListener('click', showDiagnosisScreen);
    tools.forEach(toolEl => {
        toolEl.addEventListener('click', () => useTool(toolEl.dataset.tool));
    });
});
            
