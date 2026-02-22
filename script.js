// =================================================================================
// ⚠️ تذكير: يجب لصق متغيرات `trainingBank` و `challengeBank` التي نسختها هنا
// =================================================================================


// انتظر حتى يتم تحميل كل محتوى الصفحة تمامًا
document.addEventListener('DOMContentLoaded', () => {

    // --- تعريف كل المتغيرات هنا، داخل المستمع ---
    
    // 1. عناصر الواجهة الرئيسية
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

    // ✅ 2. تعريف عناصر شاشة الإحصائيات الجديدة
    const statsPage = document.getElementById('statistics-page');
    const showStatsButton = document.getElementById('show-stats-button');
    const statsBackButton = document.getElementById('stats-back-button');
    const statsBestPercentage = document.getElementById('stats-best-percentage');
    const statsTotalAttempts = document.getElementById('stats-total-attempts');
    const statsHighestStage = document.getElementById('stats-highest-stage');
    const statsHistoryList = document.getElementById('stats-history-list');


    // 3. متغيرات حالة اللعبة
    let gameState = {};
    let personalStats = JSON.parse(localStorage.getItem('personalStats')) || {
        bestPercentage: 0,
        totalAttempts: 0,
        highestStage: '0 / 15',
        recentHistory: [],
        isFirstAttempt: true,
    };
    let timerInterval;
    let currentScreenName = 'start';

    // --- وظائف التحكم بالواجهة ---
    function showScreen(screenName, isPoppingState = false) {
        // إخفاء كل الشاشات أولاً
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        statsPage.classList.remove('active'); // التأكد من إخفاء شاشة الإحصائيات أيضاً

        if (screens[screenName]) {
            screens[screenName].classList.add('active');
        }
        currentScreenName = screenName;

        if (!isPoppingState) {
            if (history.state?.screen !== screenName) {
                history.pushState({ screen: screenName }, `Screen ${screenName}`, `#${screenName}`);
            }
        }
    }

    window.onpopstate = function(event) {
        if (currentScreenName === 'game') {
            history.forward();
            showModal(
                'تأكيد الخروج',
                'هل أنت متأكد من رغبتك في مغادرة اللعبة؟ سيتم فقدان تقدمك الحالي.',
                true,
                () => {
                    clearInterval(timerInterval);
                    showScreen('modeSelection');
                }
            );
        } else if (event.state && event.state.screen) {
            showScreen(event.state.screen, true);
        } else {
            showScreen('start', true);
        }
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

    // --- وظائف الإعداد والتحكم ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function saveStats() {
        localStorage.setItem('personalStats', JSON.stringify(personalStats));
    }

    // ✅ دالة جديدة ومحسنة لعرض الإحصائيات
    function showStatistics() {
        // 1. إخفاء كل الشاشات الأخرى
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        
        // 2. تحديث البيانات من المتغير العام personalStats
        statsBestPercentage.textContent = `${personalStats.bestPercentage}%`;
        statsTotalAttempts.textContent = personalStats.totalAttempts;
        statsHighestStage.textContent = personalStats.highestStage;

        // 3. تحديث سجل المحاولات
        statsHistoryList.innerHTML = ''; // تفريغ القائمة أولاً
        if (personalStats.recentHistory.length === 0) {
            statsHistoryList.innerHTML = '<li>لا يوجد سجل محاولات بعد.</li>';
        } else {
            // عرض المحاولات من الأحدث إلى الأقدم
            [...personalStats.recentHistory].reverse().forEach(attempt => {
                const li = document.createElement('li');
                li.innerHTML = `<span>النتيجة: <b>${attempt.percentage}%</b></span> <span>المرحلة: ${attempt.stage}</span>`;
                statsHistoryList.appendChild(li);
            });
        }

        // 4. إظهار شاشة الإحصائيات
        statsPage.classList.add('active');
        currentScreenName = 'statistics'; // تحديث اسم الشاشة الحالية
    }

    function startTrainingMode(specialty) {
        gameState = {
            mode: 'training',
            specialty: specialty,
            questions: [...trainingBank[specialty]],
            currentQuestionIndex: 0,
            budget: 150,
        };
        setupQuestion();
        showScreen('game');
        clearInterval(timerInterval);
        gameElements.timerDisplay.textContent = '∞';
    }

    function startGrandRound() {
        if (personalStats.isFirstAttempt) {
            personalStats.isFirstAttempt = false;
        }
        personalStats.totalAttempts++;
        saveStats();

        let questions;
        if (personalStats.totalAttempts === 1) {
            questions = [
                ...challengeBank.core.easy,
                ...challengeBank.core.medium,
                ...challengeBank.core.hard
            ];
        } else {
            const easyQuestions = shuffleArray([...challengeBank.reserve.easy]).slice(0, 5);
            const mediumQuestions = shuffleArray([...challengeBank.reserve.medium]).slice(0, 5);
            const hardQuestions = shuffleArray([...challengeBank.reserve.hard]).slice(0, 5);
            questions = shuffleArray([...easyQuestions, ...mediumQuestions, ...hardQuestions]);
        }

        gameState = {
            mode: 'grand_round',
            questions: questions,
            currentQuestionIndex: 0,
            budget: 200,
        };
        startTimer(15 * 60, gameElements.timerDisplay);
        setupQuestion();
        showScreen('game');
    }

    function setupSpecialtySelection() {
        const grid = document.getElementById('specialty-grid');
        grid.innerHTML = '';
        Object.keys(trainingBank).forEach(specialty => {
            const button = document.createElement('button');
            button.className = 'specialty-btn';
            button.textContent = specialty;
            button.onclick = () => startTrainingMode(specialty);
            grid.appendChild(button);
        });
        showScreen('specialtySelection');
    }

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                clearInterval(timerInterval);
                loseGame();
            }
        }, 1000);
    }

    // --- وظائف منطق اللعبة الفعلي ---
    function setupQuestion() {
        gameElements.patientFileContent.innerHTML = '<p class="placeholder">استخدم الأدوات لكشف المعلومات وإضافتها إلى الملف...</p>';
        document.querySelectorAll('.tool-item').forEach(t => {
            t.classList.remove('used');
            t.style.display = '';
        });
        
        const question = gameState.questions[gameState.currentQuestionIndex];
        
        gameElements.budgetDisplay.textContent = gameState.budget;
        gameElements.questionCounter.textContent = `${gameState.currentQuestionIndex + 1} / ${gameState.questions.length}`;
        gameElements.caseTitle.textContent = `الحالة رقم #${gameState.currentQuestionIndex + 1} (صعوبة: ${question.level})`;
        gameElements.caseDescription.textContent = question.case;

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
        const costElement = toolElement.querySelector('.tool-cost');
        if (!costElement) return;
        const cost = parseInt(costElement.textContent);
        if (gameState.budget < cost) {
            showModal('ميزانية غير كافية!', 'لا يمكنك استخدام هذه الأداة.');
            return;
        }
        updateBudget(-cost);
        toolElement.classList.add('used');
        const question = gameState.questions[gameState.currentQuestionIndex];
        const info = question.tools[toolName];
        if (info) {
            addInfoToPatientFile(info, toolElement.querySelector('.tool-name').textContent);
        } else {
            addInfoToPatientFile('لا توجد معلومات مفيدة من هذه الأداة لهذه الحالة.', toolElement.querySelector('.tool-name').textContent);
        }
    }

    function useAssistTool(toolElement) {
        if (toolElement.classList.contains('used')) return;
        const toolName = toolElement.dataset.tool;
        const cost = parseInt(toolElement.querySelector('.tool-cost').textContent);
        if (gameState.budget < cost) {
            showModal('ميزانية غير كافية!', 'لا يمكنك استخدام هذه الأداة.');
            return;
        }
        updateBudget(-cost);
        toolElement.classList.add('used');
        const question = gameState.questions[gameState.currentQuestionIndex];
        if (toolName === 'consultation') {
            let wrongChoices = question.choices.filter(c => c !== question.answer);
            wrongChoices = shuffleArray(wrongChoices).slice(0, 2);
            document.querySelectorAll('.choice-btn').forEach(btn => {
                if (wrongChoices.includes(btn.textContent)) {
                    btn.style.display = 'none';
                }
            });
            showModal('💡 مساعدة (50/50)', `لقد قمت باستشارة زميل، وقام باستبعاد إجابتين خاطئتين من أجلك.`);
        }
    }

    function skipQuestion() {
        const penalty = 30;
        if (gameState.budget < penalty) {
            showModal('لا يمكن التخطي!', `أنت بحاجة إلى ${penalty} نقطة على الأقل لتخطي السؤال.`);
            return;
        }
        showModal(
            'تأكيد التخطي',
            `هل أنت متأكد من رغبتك في تخطي هذا السؤال؟ سيتم خصم <b>${penalty} نقطة</b> من ميزانيتك.`,
            true,
            () => {
                updateBudget(-penalty);
                showModal('تم التخطي!', 'لقد تخطيت السؤال الحالي.');
                setTimeout(nextQuestion, 1500);
            }
        );
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
            const reward = 15;
            updateBudget(reward);
            showModal('إجابة صحيحة!', `تشخيصك صحيح! لقد ربحت ${reward} نقطة.`);
            setTimeout(nextQuestion, 1500);
        } else {
            if (gameState.mode === 'grand_round') {
                loseGame();
            } else {
                const penalty = 25;
                updateBudget(-penalty);
                showModal('إجابة خاطئة!', `التشخيص الصحيح كان: <b>${question.answer}</b>. تم خصم ${penalty} نقطة.`);
                setTimeout(nextQuestion, 3000);
            }
        }
    }

    function nextQuestion() {
        gameState.currentQuestionIndex++;
        if (gameState.currentQuestionIndex >= gameState.questions.length) {
            if (gameState.mode === 'grand_round') {
                winGame();
            } else {
                showModal('التدريب انتهى!', `لقد أكملت مناوبة <b>${gameState.specialty}</b> بنجاح. نتيجتك التدريبية هي ${gameState.budget} نقطة.`);
                setTimeout(() => showScreen('modeSelection'), 2000);
            }
        } else {
            setupQuestion();
        }
    }

    function loseGame() {
        clearInterval(timerInterval);
        updateStatsOnFinish(false);
        document.getElementById('lose-reason').innerHTML = "لقد خسرت وخسر المريض حياته. شكراً لجهودك المبذولة &#128513;<br>حاول مرة أخرى أو ارجع إلى القائمة الرئيسية.";
        showScreen('lose');
    }

    function winGame() {
        clearInterval(timerInterval);
        updateStatsOnFinish(true);
        showScreen('win');
    }

    function updateStatsOnFinish(isWin) {
        if (gameState.mode !== 'grand_round') return;
        const finalScore = gameState.budget;
        const stageReached = isWin ? gameState.questions.length : gameState.currentQuestionIndex;
        const totalStages = gameState.questions.length;
        let efficiency = ((finalScore / 200) * 60) + ((stageReached / totalStages) * 40);
        efficiency = Math.max(0, Math.min(100, efficiency)).toFixed(0);
        if (efficiency > personalStats.bestPercentage) {
            personalStats.bestPercentage = efficiency;
        }
        const currentHighestStage = parseInt(personalStats.highestStage.split(' ')[0]);
        if (stageReached > currentHighestStage) {
            personalStats.highestStage = `${stageReached} / ${totalStages}`;
        }
        personalStats.recentHistory.push({
            percentage: efficiency,
            stage: `${stageReached} / ${totalStages}`
        });
        if (personalStats.recentHistory.length > 5) {
            personalStats.recentHistory.shift();
        }
        saveStats();
        if (isWin) {
            document.getElementById('final-score').textContent = finalScore;
            document.getElementById('final-percentage-display').textContent = `${efficiency}%`;
        }
    }

    // --- نقطة الانطلاق وربط الأحداث ---
    function setupEventListeners() {
        buttons.startGame.onclick = () => showScreen('modeSelection');
        buttons.trainingMode.onclick = setupSpecialtySelection;
        buttons.grandRound.onclick = () => {
            showModal(
                '<h3>🏆 قواعد الجولة الكبرى</h3>',
                `<p>مرحباً بك في التحدي الأسمى! هنا، لا مجال للخطأ.</p>
                <ul>
                    <li><b>الهدف:</b> حل 15 حالة سريرية عشوائية.</li>
                    <li><b>الميزانية:</b> تبدأ بـ <b>200 نقطة</b>.</li>
                    <li><b>الوقت:</b> لديك <b>15 دقيقة</b> فقط.</li>
                    <li><b>القاعدة الأهم:</b> <b>أي إجابة خاطئة تنهي الجولة فوراً!</b></li>
                </ul>
                <p><b>هل أنت مستعد؟</b></p>`,
                true,
                startGrandRound
            );
        };
        buttons.skipQuestion.onclick = skipQuestion;
        buttons.restartGrandRound.onclick = () => showScreen('modeSelection');
        buttons.backToMainMenuWin.onclick = () => showScreen('modeSelection');
        
        // ✅ ربط الأحداث للأزرار الجديدة الخاصة بالإحصائيات
        showStatsButton.onclick = showStatistics;
        statsBackButton.onclick = () => showScreen('modeSelection');

        document.querySelectorAll('.tool-item:not(.skip-btn)').forEach(tool => {
            if (tool.dataset.tool === 'consultation') {
                tool.onclick = () => useAssistTool(tool);
            } else {
                tool.onclick = () => useTool(tool);
            }
        });
        
        modal.closeBtn.onclick = () => modal.element.style.display = 'none';
        window.onclick = (event) => {
            if (event.target == modal.element) {
                modal.element.style.display = 'none';
            }
        };
    }

    // --- بدء تشغيل التطبيق ---
    const initialScreen = location.hash ? location.hash.substring(1) : 'start';
    if (screens[initialScreen]) {
        showScreen(initialScreen, true);
    } else {
        showScreen('start', true);
    }
    setupEventListeners();

}); // نهاية مستمع `DOMContentLoaded`
