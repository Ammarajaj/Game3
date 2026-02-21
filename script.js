document.addEventListener('DOMContentLoaded', () => {
    // --- تعريف بنك الأسئلة ---
    const allQuestions = [
        // المستوى 1
        {
            level: 1,
            description: "شاب عمره 20 عاماً، أتى بألم حاد في الربع السفلي الأيمن من البطن.",
            toolsInfo: {
                hand: "عند الجس، يوجد إيلام شديد في نقطة ماكبيرني مع دفاع عضلي.",
                pen: "بدأ الألم حول السرة ثم انتقل. لا يوجد غثيان أو إقياء."
            },
            choices: ["التهاب المرارة", "التهاب الزائدة الدودية", "حصاة حالب", "التهاب الرتوج", "فتق إربي"],
            correctAnswer: "التهاب الزائدة الدودية"
        },
        // المستوى 2
        {
            level: 2,
            description: "مريض عمره 65 عاماً، مدخن، يشكو من ألم صدري ضاغط بدأ منذ ساعة.",
            toolsInfo: {
                pen: "الألم ينتشر للكتف الأيسر والفك. يرافقه تعرق شديد وضيق نفس.",
                stethoscope: "الأصوات القلبية مكتومة قليلاً، لا توجد نفخات واضحة."
            },
            choices: ["تسلخ الأبهر", "صمة رئوية", "احتشاء العضلة القلبية", "التهاب التامور", "حرقة فؤاد"],
            correctAnswer: "احتشاء العضلة القلبية"
        },
        // المستوى 3
        {
            level: 3,
            description: "شابة عمرها 30 عاماً، تشكو من خفقان، فقدان وزن، وشعور دائم بالحرارة.",
            toolsInfo: {
                magnifier: "يلاحظ وجود جحوظ بسيط في العينين ورعشة ناعمة في اليدين الممدودتين.",
                stethoscope: "ضربات القلب سريعة ومنتظمة (110 ضربة/دقيقة)."
            },
            choices: ["ورم القواتم", "قلق عام", "فقر الدم", "فرط نشاط الدرق (داء غريفز)", "بداية سن اليأس"],
            correctAnswer: "فرط نشاط الدرق (داء غريفز)"
        },
        // المستوى 4
        {
            level: 4,
            description: "رجل عمره 50 عاماً، مدمن على الكحول، أتى بحالة تخليط ذهني وحركات عين غريبة.",
            toolsInfo: {
                magnifier: "يلاحظ وجود رأرأة أفقية (حركة سريعة في العينين) وشلل في عضلات العين الخارجية.",
                hammer: "عند فحص المشية، كانت مشيته رنحية (غير متوازنة) مع قاعدة عريضة."
            },
            choices: ["سكتة دماغية", "ورم في المخ", "اعتلال دماغي كبدي", "اعتلال دماغي لفيرنيكه", "جرعة زائدة من المخدرات"],
            correctAnswer: "اعتلال دماغي لفيرنيكه"
        }
    ];

    // --- متغيرات اللعبة ---
    const TOOL_COST = 10;
    const INITIAL_BUDGET = 100;
    let totalScore = 0;
    let currentBudget = 0;
    let currentQuestion;
    let usedTools = new Set();

    // --- عناصر الواجهة ---
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const diagnoseButton = document.getElementById('diagnose-button');
    const totalScoreDisplay = document.getElementById('total-score');
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

    function startGame() {
        totalScore = 0;
        // اختيار سؤال عشوائي للبدء
        currentQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        loadQuestion(currentQuestion);
        showScreen('game-screen');
    }

    function loadQuestion(question) {
        currentBudget = INITIAL_BUDGET;
        usedTools.clear();
        
        totalScoreDisplay.textContent = totalScore;
        budgetDisplay.textContent = currentBudget;
        caseDescription.textContent = question.description;
        infoBoard.innerHTML = '';
        
        tools.forEach(t => t.style.display = 'inline-flex'); // إظهار كل الأدوات
    }

    function useTool(toolName) {
        if (usedTools.has(toolName)) return; // لا تسمح باستخدام الأداة مرتين
        if (currentBudget < TOOL_COST) {
            alert("ميزانيتك لا تسمح!");
            return;
        }

        currentBudget -= TOOL_COST;
        budgetDisplay.textContent = currentBudget;
        usedTools.add(toolName);

        const info = currentQuestion.toolsInfo[toolName];
        const infoCard = document.createElement('div');
        infoCard.className = 'info-card';
        if (info) {
            infoCard.textContent = `[${document.querySelector(`.tool[data-tool="${toolName}"]`).textContent.replace('-10','').trim()}] ${info}`;
        } else {
            infoCard.textContent = `[${document.querySelector(`.tool[data-tool="${toolName}"]`).textContent.replace('-10','').trim()}] لا توجد معلومات مفيدة من هذا الفحص.`;
            infoCard.style.borderColor = '#c53030'; // لون مختلف للمعلومة غير المفيدة
        }
        infoBoard.appendChild(infoCard);
        
        // إخفاء الأداة بعد استخدامها
        document.querySelector(`.tool[data-tool="${toolName}"]`).style.display = 'none';
    }

    function showDiagnosisScreen() {
        choicesContainer.innerHTML = '';
        const shuffledChoices = [...currentQuestion.choices].sort(() => Math.random() - 0.5);
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
        if (selectedChoice === currentQuestion.correctAnswer) {
            totalScore += currentBudget; // إضافة الميزانية المتبقية للنتيجة
            gameOver("تشخيص صحيح!", true);
        } else {
            gameOver(`تشخيص خاطئ! الإجابة الصحيحة كانت: "${currentQuestion.correctAnswer}"`, false);
        }
    }

    function gameOver(reason, isWin) {
        gameOverTitle.textContent = isWin ? "أحسنت!" : "لقد خسرت!";
        gameOverReason.textContent = reason;
        gameOverScreen.className = `screen ${isWin ? 'win' : 'loss'}`;
        showScreen('game-over-screen');
    }

    // --- ربط الأحداث ---
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame); // إعادة اللعب تبدأ بسؤال عشوائي جديد
    diagnoseButton.addEventListener('click', showDiagnosisScreen);
    tools.forEach(toolEl => {
        toolEl.addEventListener('click', () => useTool(toolEl.dataset.tool));
    });
});
