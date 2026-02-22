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

    // =================================================================================
    // ✨ تم تحديث دالة showScreen لتكون أبسط وأكثر فعالية
    // =================================================================================
    function showScreen(screenName) {
        currentScreenName = screenName;
        
        // إخفاء كل الشاشات أولاً
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        statsPage.classList.remove('active');

        // إظهار الشاشة المطلوبة
        const targetScreen = screens[screenName] || (screenName === 'statistics' ? statsPage : null);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // تحديث سجل المتصفح فقط إذا كانت الحالة الجديدة مختلفة
        if (history.state?.screen !== screenName) {
            history.pushState({ screen: screenName }, `Screen ${screenName}`, `#${screenName}`);
        }
    }

    // =================================================================================
    // ✨ تم تحديث معالج onpopstate ليكون أكثر دقة
    // =================================================================================
    window.onpopstate = function(event) {
        // إذا كان المستخدم في شاشة اللعب، اظهر نافذة تأكيد
        if (currentScreenName === 'game') {
            history.forward(); // منع الرجوع الفعلي
            showModal(
                'تأكيد الخروج',
                'هل أنت متأكد من رغبتك في مغادرة اللعبة؟ سيتم فقدان تقدمك الحالي.',
                true,
                () => {
                    clearInterval(timerInterval);
                    showScreen('modeSelection'); // عند التأكيد، اذهب إلى شاشة اختيار الوضع
                }
            );
            return; // إنهاء الدالة هنا
        }

        // إذا كان هناك حالة مسجلة في event.state، انتقل إليها
        if (event.state && event.state.screen) {
            showScreen(event.state.screen);
        } else {
            // كحالة افتراضية، انتقل إلى شاشة البداية
            showScreen('start');
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

    // --- باقي دوال اللعبة (بدون تغيير) ---
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

    function showStatistics() {
        showScreen('statistics');
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

        let sourceBank = (personalStats.totalAttempts === 1) ? challengeBank.core : challengeBank.reserve;
        const easyQuestions = shuffleArray([...sourceBank.easy]).slice(0, 5);
        const mediumQuestions = shuffleArray([...sourceBank.medium]).slice(0, 5);
        const hardQuestions = shuffleArray([...sourceBank.hard]).slice(0, 5);
        let questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
        
        if (questions.length < 15) {
            showModal("خطأ في بنك الأسئلة", "لا يوجد عدد كافٍ من الأسئلة لبدء الجولة الكبرى.");
            return;
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

    function setupQuestion() {
        if (gameState.currentQuestionIndex >= gameState.questions.length) {
            if (gameState.mode === 'grand_round') winGame();
            else {
                showModal('التدريب انتهى!', `لقد أكملت مناوبة <b>${gameState.specialty}</b> بنجاح. نتيجتك التدريبية هي ${gameState.budget} نقطة.`);
                setTimeout(() => showScreen('modeSelection'), 2000);
            }
            return;
        }

        gameElements.patientFileContent.innerHTML = '<p class="placeholder">استخدم الأدوات لكشف المعلومات وإضافتها إلى الملف...</p>';
        document.querySelectorAll('.tool-item').forEach(t => { t.classList.remove('used'); t.style.display = ''; });
        
        const question = gameState.questions[gameState.currentQuestionIndex];
        gameElements.budgetDisplay.textContent = gameState.budget;
        gameElements.questionCounter.textContent = `${gameState.currentQuestionIndex + 1} / ${gameState.questions.length}`;
        gameElements.caseTitle.textContent = `الحالة رقم #${gameState.currentQuestionIndex + 1} (صعوبة: ${question.level})`;
        gameElements.caseDescription.textContent = question.case;

        gameElements.choicesContainer.innerHTML = '';
        shuffleArray([...question.choices]).forEach(choice => {
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
        const cost = parseInt(toolElement.querySelector('.tool-cost').textContent);
        if (gameState.budget < cost) {
            showModal('ميزانية غير كافية!', 'لا يمكنك استخدام هذه الأداة.');
            return;
        }
        updateBudget(-cost);
        toolElement.classList.add('used');
        const question = gameState.questions[gameState.currentQuestionIndex];
        const info = question.tools[toolName];
        addInfoToPatientFile(info || 'لا توجد معلومات مفيدة من هذه الأداة لهذه الحالة.', toolElement.querySelector('.tool-name').textContent);
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
            let wrongChoices = shuffleArray(question.choices.filter(c => c !== question.answer)).slice(0, 2);
            document.querySelectorAll('.choice-btn').forEach(btn => {
                if (wrongChoices.includes(btn.textContent)) btn.style.display = 'none';
            });
            showModal('💡 مساعدة (50/50)', `لقد قمت باستشارة زميل، وقام باستبعاد إجابتين خاطئتين من أجلك.`);
        }
    }

    function skipQuestion() {
        const penalty = 50;
        if (gameState.budget < penalty) {
            showModal('لا يمكن التخطي!', `أنت بحاجة إلى ${penalty} نقطة على الأقل لتخطي السؤال.`);
            return;
        }
        if (gameState.mode === 'training') {
            showModal('لا يمكن التخطي!', 'لا يمكن تخطي الأسئلة في وضع التدريب.');
            return;
        }
        showModal('تأكيد التخطي', `هل أنت متأكد؟ سيتم خصم <b>${penalty} نقطة</b> واستبدال السؤال.`, true, () => {
            updateBudget(-penalty);
            const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
            const difficulty = currentQuestion.level;
            const replacementPool = challengeBank.reserve[difficulty].filter(q => !gameState.questions.some(playedQ => playedQ.case === q.case));
            if (replacementPool.length > 0) {
                gameState.questions[gameState.currentQuestionIndex] = shuffleArray(replacementPool)[0];
                showModal('تم استبدال السؤال!', 'تم استبدال السؤال الحالي بسؤال جديد.');
                setTimeout(setupQuestion, 1500);
            } else {
                showModal('لا توجد أسئلة بديلة!', 'سيتم الانتقال للسؤال التالي.');
                setTimeout(nextQuestion, 1500);
            }
        });
    }

    function addInfoToPatientFile(info, toolName) {
        if (gameElements.patientFileContent.querySelector('.placeholder')) gameElements.patientFileContent.innerHTML = '';
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
            updateBudget(15);
            showModal('إجابة صحيحة!', `تشخيصك صحيح! لقد ربحت 15 نقطة.`);
            setTimeout(nextQuestion, 1500);
        } else {
            if (gameState.mode === 'grand_round') {
                loseGame();
            } else {
                updateBudget(-25);
                showModal('إجابة خاطئة!', `التشخيص الصحيح كان: <b>${question.answer}</b>. تم خصم 25 نقطة.`);
                setTimeout(nextQuestion, 3000);
            }
        }
    }

    function nextQuestion() {
        gameState.currentQuestionIndex++;
        setupQuestion();
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
        let efficiency = Math.max(0, Math.min(100, ((finalScore / 200) * 60) + ((stageReached / totalStages) * 40))).toFixed(0);
        if (efficiency > personalStats.bestPercentage) personalStats.bestPercentage = efficiency;
        if (stageReached > parseInt(personalStats.highestStage.split(' ')[0])) personalStats.highestStage = `${stageReached} / ${totalStages}`;
        personalStats.recentHistory.push({ percentage: efficiency, stage: `${stageReached} / ${totalStages}` });
        if (personalStats.recentHistory.length > 5) personalStats.recentHistory.shift();
        saveStats();
        if (isWin) {
            document.getElementById('final-score').textContent = finalScore;
            document.getElementById('final-percentage-display').textContent = `${efficiency}%`;
        }
    }

    // --- نقطة الانطلاق وربط الأحداث ---
        // --- نقطة الانطلاق وربط الأحداث ---
    function setupEventListeners() {
        buttons.startGame.onclick = () => showScreen('modeSelection');
        buttons.trainingMode.onclick = setupSpecialtySelection;
        buttons.grandRound.onclick = () => {
            showModal('<h3>🏆 قواعد الجولة الكبرى</h3>', `<p>مرحباً بك في التحدي الأسمى! هنا، لا مجال للخطأ.</p><ul><li><b>الهدف:</b> حل 15 حالة سريرية (5 سهل، 5 متوسط، 5 صعب).</li><li><b>الميزانية:</b> تبدأ بـ <b>200 نقطة</b>.</li><li><b>الوقت:</b> لديك <b>15 دقيقة</b> فقط.</li><li><b>القاعدة الأهم:</b> <b>أي إجابة خاطئة تنهي الجولة فوراً!</b></li></ul><p><b>هل أنت مستعد؟</b></p>`, true, startGrandRound);
        };
        buttons.restartGrandRound.onclick = () => showScreen('modeSelection');
        buttons.backToMainMenuWin.onclick = () => showScreen('modeSelection');
        
        // ربط الأزرار الصحيحة من HTML
        buttons.showStats.onclick = showStatistics;
        buttons.backFromStats.onclick = () => window.history.back(); 

        // ربط أدوات التشخيص والنافذة المنبثقة
        document.querySelectorAll('.tool-item:not(.skip-btn)').forEach(tool => {
            if (tool.dataset.tool === 'consultation') {
                tool.onclick = () => useAssistTool(tool);
            } else {
                tool.onclick = () => useTool(tool);
            }
        });
        buttons.skipQuestion.onclick = skipQuestion; // ربط زر التخطي
        modal.closeBtn.onclick = () => modal.element.style.display = 'none';
        window.onclick = (event) => { if (event.target == modal.element) modal.element.style.display = 'none'; };


        // =================================================================================
        // ✨✨✨  منطق برمجة زر المزاح يبدأ هنا  ✨✨✨
        // =================================================================================
        const prankBtn = document.getElementById('prank-btn');
        const prankTexts = {
            p1: document.getElementById('prank-text-1'),
            p2: document.getElementById('prank-text-2'),
            p3: document.getElementById('prank-text-3'),
            p4: document.getElementById('prank-text-4'),
            p5: document.getElementById('prank-text-5'),
        };
        let prankClickCount = 0;

        prankBtn.addEventListener('click', () => {
            prankClickCount++;

            switch (prankClickCount) {
                case 1:
                    // الخطوة الأولى: انزل الزر واظهر النص الأول
                    prankTexts.p1.textContent = 'دارس دورات وبدك تشخص حالات سريرية؟';
                    prankBtn.style.top = '30px'; // انزل الزر للأسفل
                    prankBtn.textContent = 'امزح معاك اضغط هنا';
                    break;

                case 2:
                    // الخطوة الثانية: انزل الزر مرة أخرى واظهر النص الثاني
                    prankTexts.p2.textContent = 'ههه صدقت؟ انا اصلا دارس دورات متلك لهيك حضرتلك مفاجاة';
                    prankBtn.style.top = '60px'; // انزل أكثر
                    prankBtn.textContent = 'اضغط هنا';
                    break;

                case 3:
                    // الخطوة الثالثة: اظهر النص الثالث
                    prankTexts.p3.textContent = 'هههههههه تفكر اذا كنا دارسين دورات وفارشين يعني عادي نشخص حالات؟!';
                    prankBtn.style.top = '90px'; // انزل أكثر
                    prankBtn.textContent = 'اضغط للمرة الأخيرة، أعدك!';
                    break;
                
                case 4:
                    // الخطوة الرابعة: اظهر النص الأخير واجعل الزر يقفز
                    prankTexts.p4.textContent = 'سوف ترى المفاجأة...';
                    prankTexts.p5.textContent = 'الحقني إن استطعت!';
                    prankBtn.textContent = '😂';
                    prankBtn.classList.add('jumping');

                    // ابدأ بجعل الزر يقفز عند محاولة المرور فوقه بالماوس
                    prankBtn.addEventListener('mouseover', jumpAround);
                    break;
            }
        });

        function jumpAround() {
            // احصل على أبعاد الحاوية
            const container = document.getElementById('prank-container');
            const containerRect = container.getBoundingClientRect();
            
            // احصل على أبعاد الزر
            const btnRect = prankBtn.getBoundingClientRect();

            // احسب مواقع عشوائية جديدة داخل الحاوية
            const newTop = Math.random() * (containerRect.height - btnRect.height);
            const newLeft = Math.random() * (containerRect.width - btnRect.width);

            // طبق المواقع الجديدة على الزر
            prankBtn.style.position = 'absolute'; // تأكد من أن الوضع مطلق
            prankBtn.style.top = `${newTop}px`;
            prankBtn.style.left = `${newLeft}px`;
            prankBtn.style.transform = 'none'; // ألغِ التحويل السابق ليعمل left بشكل صحيح
        }
        // =================================================================================
        // ✨✨✨  منطق برمجة زر المزاح ينتهي هنا  ✨✨✨
        // =================================================================================

    } // نهاية دالة setupEventListeners


    function initializeApp() {
        setupEventListeners();
        // استبدل الحالة الأولية الفارغة بحالة شاشة البداية
        history.replaceState({ screen: 'start' }, 'Screen start');
        showScreen('start', true);
    }

    initializeApp();

}); // نهاية مستمع `DOMContentLoaded`
