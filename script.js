// =================================================================================
// ⚠️ تذكير: يجب لصق متغيرات `trainingBank` و `challengeBank` التي نسختها هنا
// =================================================================================


document.addEventListener('DOMContentLoaded', () => {

    // --- تعريف كل المتغيرات هنا، داخل المستمع ---
    
    const screens = {
        start: document.getElementById('start-screen'),
        modeSelection: document.getElementById('mode-selection-screen'),
        specialtySelection: document.getElementById('specialty-selection-screen'),
        game: document.getElementById('game-screen'),
        lose: document.getElementById('lose-screen'),
        win: document.getElementById('win-screen'),
    };
    const buttons = {
        startGame: document.getElementById('start-game-btn'),
        trainingMode: document.getElementById('training-mode-btn'),
        grandRound: document.getElementById('grand-round-btn'),
        skipQuestion: document.getElementById('skip-question-btn'),
        restartGrandRound: document.getElementById('restart-grand-round-btn'),
        backToMainMenuWin: document.getElementById('back-to-main-menu-win'),
    };
    const gameElements = {
        budgetDisplay: document.getElementById('budget-display'),
        questionCounter: document.getElementById('question-counter'),
        timerDisplay: document.getElementById('timer-display'),
        caseTitle: document.getElementById('case-title'),
        caseDescription: document.getElementById('case-description'),
        patientFileContent: document.getElementById('file-content'),
        choicesContainer: document.getElementById('choices-container'),
    };
    const modal = {
        element: document.getElementById('modal'),
        title: document.getElementById('modal-title'),
        text: document.getElementById('modal-text'),
        closeBtn: document.querySelector('.close-btn'),
        confirmBtn: document.getElementById('modal-confirm-btn'),
        cancelBtn: document.getElementById('modal-cancel-btn'),
    };

    const statsPage = document.getElementById('statistics-page');
    const showStatsButton = document.getElementById('show-stats-button');
    const statsBackButton = document.getElementById('stats-back-button');
    const statsBestPercentage = document.getElementById('stats-best-percentage');
    const statsTotalAttempts = document.getElementById('stats-total-attempts');
    const statsHighestStage = document.getElementById('stats-highest-stage');
    const statsHistoryList = document.getElementById('stats-history-list');

    let gameState = {};
    let personalStats = JSON.parse(localStorage.getItem('personalStats')) || {
        bestPercentage: 0,
        totalAttempts: 0,
        highestStage: '0 / 15',
        recentHistory: [],
        isFirstAttempt: true,
    };
    let timerInterval;

    // --- وظائف التحكم بالواجهة ---

    // =================================================================================
    // ✨ العودة إلى دالة showScreen الأصلية والموثوقة
    // =================================================================================
    function showScreen(screenName, isPoppingState = false) {
        // إخفاء كل الشاشات أولاً
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        statsPage.classList.remove('active');

        // إظهار الشاشة المطلوبة
        const targetScreen = screens[screenName] || (screenName === 'statistics' ? statsPage : null);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // فقط أضف حالة جديدة إلى السجل إذا لم يكن هذا الإجراء ناتجًا عن زر الرجوع
        if (!isPoppingState && history.state?.screen !== screenName) {
            history.pushState({ screen: screenName }, `Screen ${screenName}`);
        }
    }

    // =================================================================================
    // ✨ إصلاح دالة onpopstate بشكل نهائي وبسيط
    // =================================================================================
    window.onpopstate = function(event) {
        // أولاً، تحقق من الشاشة التي كنا فيها قبل الضغط على "رجوع".
        // الطريقة الموثوقة هي معرفة الشاشة التي يتم عرضها حاليًا.
        const currentVisibleScreen = document.querySelector('.screen.active')?.id.replace('-screen', '') 
                                  || document.querySelector('#statistics-page.active')?.id.replace('-page', '');

        // إذا كنا نحاول الخروج من شاشة اللعب
        if (currentVisibleScreen === 'game') {
            history.forward(); // امنع الرجوع فوراً
            showModal(
                'تأكيد الخروج',
                'هل أنت متأكد من رغبتك في مغادرة اللعبة؟ سيتم فقدان تقدمك الحالي.',
                true,
                () => {
                    clearInterval(timerInterval);
                    // اسمح للمتصفح بالعودة خطوة واحدة للخلف
                    history.back(); 
                }
            );
            return; // توقف هنا
        }

        // لأي حالة أخرى، اعرض الشاشة المسجلة في event.state
        // إذا كان event.state فارغًا (null)، فهذا يعني أننا في بداية السجل، لذا اذهب إلى 'start'
        const targetScreen = event.state?.screen || 'start';
        showScreen(targetScreen, true); // true لمنع إضافة حالة جديدة للسجل
    };

    function showModal(title, text, showConfirmButtons = false, onConfirm = null) {
        modal.title.innerHTML = title;
        modal.text.innerHTML = text;
        modal.element.style.display = 'flex';

        modal.cancelBtn.onclick = () => modal.element.style.display = 'none';

        if (showConfirmButtons) {
            modal.confirmBtn.style.display = 'inline-block';
            modal.cancelBtn.style.display = 'inline-block';
            modal.confirmBtn.onclick = () => {
                modal.element.style.display = 'none';
                if (onConfirm) onConfirm();
            };
        } else {
            modal.confirmBtn.style.display = 'none';
            modal.cancelBtn.style.display = 'none';
        }
    }

    // --- باقي دوال اللعبة (بدون تغيير) ---
    function shuffleArray(array) { /* ... */ }
    function saveStats() { /* ... */ }
    
    function showStatistics() {
        showScreen('statistics');
        // ... (كود عرض الإحصائيات)
    }

    function startTrainingMode(specialty) {
        gameState = { /* ... */ };
        setupQuestion();
        showScreen('game');
        clearInterval(timerInterval);
        gameElements.timerDisplay.textContent = '∞';
    }

    function startGrandRound() {
        // ... (كود بدء الجولة الكبرى)
        gameState = { /* ... */ };
        startTimer(15 * 60, gameElements.timerDisplay);
        setupQuestion();
        showScreen('game');
    }

    function setupSpecialtySelection() {
        // ... (كود إعداد التخصصات)
        showScreen('specialtySelection');
    }

    function startTimer(duration, display) { /* ... */ }
    function setupQuestion() { /* ... */ }
    function useTool(toolElement) { /* ... */ }
    function useAssistTool(toolElement) { /* ... */ }
    function skipQuestion() { /* ... */ }
    function addInfoToPatientFile(info, toolName) { /* ... */ }
    function updateBudget(amount) { /* ... */ }
    function checkAnswer(selectedAnswer) { /* ... */ }
    function nextQuestion() { /* ... */ }

    function loseGame() {
        clearInterval(timerInterval);
        updateStatsOnFinish(false);
        showScreen('lose');
    }

    function winGame() {
        clearInterval(timerInterval);
        updateStatsOnFinish(true);
        showScreen('win');
    }

    function updateStatsOnFinish(isWin) { /* ... */ }

    // --- نقطة الانطلاق وربط الأحداث ---
    function setupEventListeners() {
        buttons.startGame.onclick = () => showScreen('modeSelection');
        buttons.trainingMode.onclick = setupSpecialtySelection;
        buttons.grandRound.onclick = () => {
            showModal('<h3>🏆 قواعد الجولة الكبرى</h3>', `<p>...</p>`, true, startGrandRound);
        };
        buttons.restartGrandRound.onclick = () => showScreen('modeSelection');
        buttons.backToMainMenuWin.onclick = () => showScreen('modeSelection');
        
        showStatsButton.onclick = showStatistics;
        // ✨ هذا الزر سيعمل الآن بشكل صحيح بفضل onpopstate المصحح
        statsBackButton.onclick = () => window.history.back(); 

        // ... (باقي المستمعين)
    }

    // =================================================================================
    // ✨ العودة إلى دالة بدء التشغيل الأصلية
    // =================================================================================
    function initializeApp() {
        setupEventListeners();

        // استبدل الحالة الأولية الفارغة بحالة شاشة البداية
        // هذا يضمن أن السجل يبدأ دائمًا بحالة معروفة
        history.replaceState({ screen: 'start' }, 'Screen start');
        
        // اعرض الشاشة الأولية
        showScreen('start', true);
    }

    initializeApp();

});
