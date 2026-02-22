// انتظر حتى يتم تحميل كل محتوى الصفحة تمامًا
document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    //  1. تعريف كل عناصر الواجهة (DOM Elements)
    // ==================================================
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

    // ==================================================
    //  2. حالة اللعبة ومتغيراتها (State)
    // ==================================================
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

    // ==================================================
    //  3. دوال اللعبة (Functions)
    // ==================================================

    // --- دوال التحكم بالواجهة ---
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        statsPage.classList.remove('active');
        if (screens[screenName]) {
            screens[screenName].classList.add('active');
        }
        currentScreenName = screenName;
    }

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

    // ✅ تعديل 3: دالة جديدة للنوافذ المنبثقة المؤقتة
    function showAutoCloseModal(title, text, duration = 2000) {
        showModal(title, text, false);
        setTimeout(() => {
            modal.element.style.display = 'none';
        }, duration);
    }

    // --- دوال الإحصائيات ---
    function saveStats() {
        localStorage.setItem('personalStats', JSON.stringify(personalStats));
    }

    function showStatistics() {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        statsBestPercentage.textContent = `${personalStats.bestPercentage}%`;
        statsTotalAttempts.textContent = personalStats.totalAttempts;
        statsHighestStage.textContent = personalStats.highestStage;
        statsHistoryList.innerHTML = '';
        if (personalStats.recentHistory.length === 0) {
            statsHistoryList.innerHTML = '<li>لا يوجد سجل محاولات بعد.</li>';
        } else {
            [...personalStats.recentHistory].reverse().forEach(attempt => {
                const li = document.createElement('li');
                li.innerHTML = `<span>النتيجة: <b>${attempt.percentage}%</b></span> <span>المرحلة: ${attempt.stage}</span>`;
                statsHistoryList.appendChild(li);
            });
        }
        statsPage.classList.add('active');
        currentScreenName = 'statistics';
    }

    // --- دوال بدء اللعبة ---
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

    // ✅ تعديل 2: دالة محدثة لترتيب الأسئلة وتتبعها
    
    // --- دوال منطق اللعبة ---
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

    // 🔴 استبدل دالة startGrandRound القديمة بهذه 🔴
function startGrandRound() {
    if (personalStats.isFirstAttempt) {
        personalStats.isFirstAttempt = false;
    }
    personalStats.totalAttempts++;
    saveStats();

    let questions;
    let usedQuestionIds = new Set(); // لتتبع الأسئلة المستخدمة

    if (personalStats.totalAttempts === 1) {
        // المحاولة الأولى تستخدم الأسئلة الأساسية بالترتيب
        questions = [
            ...challengeBank.core.easy,
            ...challengeBank.core.medium,
            ...challengeBank.core.hard
        ];
    } else {
        // المحاولات التالية تختار عشوائياً من البنك الاحتياطي وتحافظ على الترتيب
        const easyQuestions = shuffleArray([...challengeBank.reserve.easy]).slice(0, 5);
        const mediumQuestions = shuffleArray([...challengeBank.reserve.medium]).slice(0, 5);
        const hardQuestions = shuffleArray([...challengeBank.reserve.hard]).slice(0, 5);
        
        // دمج الأسئلة بالترتيب: سهل -> متوسط -> صعب
        questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    }

    // إضافة IDs الأسئلة الأولية إلى مجموعة المستخدمة
    questions.forEach(q => usedQuestionIds.add(q.id));

    gameState = {
        mode: 'grand_round',
        questions: questions,
        currentQuestionIndex: 0,
        budget: 200,
        usedQuestionIds: usedQuestionIds, // إضافة المجموعة إلى حالة اللعبة
    };
    startTimer(15 * 60, gameElements.timerDisplay);
    setupQuestion();
    showScreen('game');
}
    
    function checkAnswer(selectedAnswer) {
        document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);
        const question = gameState.questions[gameState.currentQuestionIndex];

        if (selectedAnswer === question.answer) {
            updateBudget(15);
            showAutoCloseModal('إجابة صحيحة!', `تشخيصك صحيح! لقد ربحت 15 نقطة.`);
            setTimeout(nextQuestion, 2000);
        } else {
            if (gameState.mode === 'grand_round') {
                showAutoCloseModal('إجابة خاطئة!', `للأسف، التشخيص الصحيح كان: <b>${question.answer}</b>. انتهت الجولة.`, 2500);
                setTimeout(loseGame, 2500);
            } else {
                updateBudget(-25);
                showAutoCloseModal('إجابة خاطئة!', `التشخيص الصحيح كان: <b>${question.answer}</b>. تم خصم 25 نقطة.`, 3000);
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
                showModal('التدريب انتهى!', `لقد أكملت مناوبة <b>${gameState.specialty}</b> بنجاح.`);
                setTimeout(() => showScreen('modeSelection'), 2000);
            }
        } else {
            setupQuestion();
        }
    }

    function updateBudget(amount) {
        gameState.budget += amount;
        gameElements.budgetDisplay.textContent = gameState.budget;
    }

    // --- دوال الأدوات ---
    function useTool(toolElement) {
        if (toolElement.classList.contains('used')) return;
        const cost = parseInt(toolElement.querySelector('.tool-cost').textContent);
        if (gameState.budget < cost) {
            showModal('ميزانية غير كافية!', 'لا يمكنك استخدام هذه الأداة.');
            return;
        }
        updateBudget(-cost);
        toolElement.classList.add('used');
        const toolName = toolElement.dataset.tool;
        const info = gameState.questions[gameState.currentQuestionIndex].tools[toolName];
        const toolDisplayName = toolElement.querySelector('.tool-name').textContent;
        
        if (info) {
            addInfoToPatientFile(info, toolDisplayName);
        } else {
            addInfoToPatientFile('لا توجد معلومات مفيدة من هذه الأداة لهذه الحالة.', toolDisplayName);
        }
    }

    function useAssistTool(toolElement) {
        if (toolElement.classList.contains('used')) return;
        const cost = parseInt(toolElement.querySelector('.tool-cost').textContent);
        if (gameState.budget < cost) {
            showModal('ميزانية غير كافية!', 'لا يمكنك استخدام هذه الأداة.');
            return;
        }
        updateBudget(-cost);
        toolElement.classList.add('used');
        const question = gameState.questions[gameState.currentQuestionIndex];
        let wrongChoices = shuffleArray(question.choices.filter(c => c !== question.answer)).slice(0, 2);
        document.querySelectorAll('.choice-btn').forEach(btn => {
            if (wrongChoices.includes(btn.textContent)) {
                btn.style.display = 'none';
            }
        });
        showModal('💡 مساعدة (50/50)', `لقد قمت باستشارة زميل، وقام باستبعاد إجابتين خاطئتين من أجلك.`);
    }

    // ✅ تعديل 1: دالة مساعدة للبحث عن سؤال بديل
    function findReplacementQuestion(difficulty) {
        const available = challengeBank.reserve[difficulty];
        const unused = available.filter(q => !gameState.usedQuestionIds.has(q.id));
        return unused.length > 0 ? unused[Math.floor(Math.random() * unused.length)] : null;
    }

    // ✅ تعديل 1: دالة تخطي السؤال المحدثة بمنطق الاستبدال
    function skipQuestion() {
        const penalty = 50;
        if (gameState.budget < penalty) {
            showModal('لا يمكن التخطي!', `أنت بحاجة إلى ${penalty} نقطة على الأقل لتخطي السؤال.`);
            return;
        }
        if (gameState.mode !== 'grand_round') {
            showModal('ميزة غير متاحة!', 'استبدال الأسئلة متاح فقط في وضع الجولة الكبرى.');
            return;
        }
        showModal(
            'تأكيد التخطي',
            `هل أنت متأكد؟ سيتم خصم <b>${penalty} نقطة</b> واستبدال هذا السؤال بسؤال آخر من نفس الصعوبة.`,
            true,
            () => {
                const difficulty = gameState.questions[gameState.currentQuestionIndex].level;
                const replacement = findReplacementQuestion(difficulty);
                if (!replacement) {
                    showModal('لا يمكن التخطي!', 'عذراً، لا توجد أسئلة بديلة متاحة من هذا المستوى حالياً.');
                    return;
                }
                updateBudget(-penalty);
                gameState.questions[gameState.currentQuestionIndex] = replacement;
                gameState.usedQuestionIds.add(replacement.id);
                setupQuestion();
                showAutoCloseModal('تم الاستبدال!', 'تم استبدال السؤال بنجاح.', 1500);
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

    // --- دوال إنهاء اللعبة والمساعدة ---
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

    function startTimer(duration, display) {
        let timer = duration;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;
            if (--timer < 0) {
                clearInterval(timerInterval);
                loseGame();
            }
        }, 1000);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // ==================================================
    //  4. ربط الأحداث (Event Listeners)
    // ==================================================
    function setupEventListeners() {
        buttons.startGame.onclick = () => showScreen('modeSelection');
        buttons.trainingMode.onclick = setupSpecialtySelection;
        buttons.grandRound.onclick = () => {
            showModal(
                '<h3>🏆 قواعد الجولة الكبرى</h3>',
                `<p>مرحباً بك في التحدي الأسمى! هنا، لا مجال للخطأ.</p>
                <ul>
                    <li><b>الهدف:</b> حل 15 حالة سريرية مرتبة حسب الصعوبة.</li>
                    <li><b>الميزانية:</b> تبدأ بـ <b>200 نقطة</b>.</li>
                    <li><b>الوقت:</b> لديك <b>15 دقيقة</b> فقط.</li>
                    <li><b>القاعدة الأهم:</b> <b>أي إجابة خاطئة تنهي الجولة فوراً!</b></li>
                </ul>
                <p><b>هل أنت مستعد؟</b></p>`,
                true,
                startGrandRound // استدعاء مباشر للدالة
            );
        };

        buttons.skipQuestion.onclick = skipQuestion;
        buttons.restartGrandRound.onclick = () => showScreen('modeSelection');
        buttons.backToMainMenuWin.onclick = () => showScreen('modeSelection');

        showStatsButton.onclick = showStatistics;
        statsBackButton.onclick = () => showScreen('modeSelection');

        document.querySelectorAll('.tool-item:not(.skip-btn)').forEach(tool => {
            if (tool.classList.contains('assist-tool')) {
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

    // ==================================================
    //  5. بدء تشغيل اللعبة
    // ==================================================
    showScreen('start');
    setupEventListeners();

});
