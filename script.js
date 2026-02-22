document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    //                                 بنوك الأسئلة (كاملة وجاهزة)
    // =================================================================================

    // 1. بنك التدريب: 24 سؤالاً (3 لكل تخصص)
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
        'بولية': [
            { level: 'easy', case: 'مريضة 30 عاماً، تشكو من حرقة وتبوال وإلحاح بولي.', tools: { labs: 'تحليل البول يظهر وجود كريات بيض ونتريت إيجابي.' }, choices: ['التهاب مثانة حاد', 'التهاب حويضة وكلية', 'التهاب مهبل', 'حصاة مثانة'], answer: 'التهاب مثانة حاد' },
            { level: 'medium', case: 'رجل 40 عاماً، استيقظ فجأة على ألم شديد في الخاصرة ينتشر لمنطقة العانة.', tools: { history: 'لديه غثيان وبيلة دموية.', labs: 'وجود كريات دم حمراء كثيرة في تحليل البول.' }, choices: ['مغص كلوي (حصاة حالب)', 'التهاب حويضة وكلية', 'التهاب زائدة دودية', 'أم دم أبهرية'], answer: 'مغص كلوي (حصاة حالب)' },
            { level: 'hard', case: 'مريض يعاني من قصور كلوي مزمن، أتى بزلة تنفسية، ولديه صوت "احتكاك" مميز عند إصغاء القلب.', tools: { auscultation: 'صوت احتكاك تاموري (pericardial friction rub).', labs: 'ارتفاع شديد في البولة والكرياتينين.' }, choices: ['التهاب تامور يوريميائي', 'وذمة رئة', 'فرط بوتاسيوم الدم', 'فقر دم'], answer: 'التهاب تامور يوريميائي' }
        ],
        'دموية': [
            { level: 'easy', case: 'شاب يعاني من تعب وشحوب، تحليل دمه يظهر كريات صغيرة ناقصة الصباغ.', tools: { labs: 'نقص فيرّيتين المصل.' }, choices: ['فقر دم بعوز الحديد', 'ثلاسيميا', 'فقر دم منجلي', 'فقر دم بعوز فيتامين ب12'], answer: 'فقر دم بعوز الحديد' },
            { level: 'medium', case: 'طفل 8 سنوات، أتى بكدمات متعددة على جلده ونزف من اللثة بعد عدوى فيروسية.', tools: { labs: 'نقص شديد في عدد الصفيحات الدموية (أقل من 20,000).', history: 'كان لديه عدوى فيروسية في الجهاز التنفسي العلوي قبل أسبوعين.' }, choices: ['فرفرية قليلة الصفيحات مجهولة السبب (ITP)', 'لوكيميا حادة', 'ناعور (هيموفيليا)', 'داء فون فيليبراند'], answer: 'فرفرية قليلة الصفيحات مجهولة السبب (ITP)' },
            { level: 'hard', case: 'مريض أتى بحمى، تعرق ليلي، ونقص وزن. عند الفحص، تم جس عقد لمفاوية غير مؤلمة ومطاطية في الرقبة.', tools: { labs: 'خزعة العقدة اللمفاوية تظهر وجود خلايا ريد-ستيرنبرغ.', xray: 'صورة الصدر قد تظهر كتلة في المنصف.' }, choices: ['لمفوما هودجكين', 'لمفوما لاهودجكين', 'داء وحيدات النوى الخمجي', 'سل'], answer: 'لمفوما هودجكين' }
        ],
        'صدرية': [
            { level: 'easy', case: 'مريض 65 عاماً، مدخن شره، يشكو من سعال مزمن منتج للقشع معظم أيام السنة.', tools: { history: 'لديه زلة تنفسية تزداد على الجهد.' }, choices: ['التهاب قصبات مزمن (COPD)', 'ربو', 'توسع قصبات', 'سرطان رئة'], answer: 'التهاب قصبات مزمن (COPD)' },
            { level: 'medium', case: 'شاب طويل ونحيل، 25 عاماً، شعر بألم صدري حاد مفاجئ مع زلة تنفسية.', tools: { auscultation: 'غياب الأصوات التنفسية في قمة الصدر الأيمن.', percussion: 'فرط رنين بالقرع على الجانب المصاب.' }, choices: ['ريح صدرية عفوية أولية', 'صمة رئوية', 'احتشاء عضلة قلبية', 'ذات رئة'], answer: 'ريح صدرية عفوية أولية' },
            { level: 'hard', case: 'مريض في العناية المشددة، تطورت لديه زلة تنفسية شديدة ونقص أكسجة معند.', tools: { xray: 'ارتشاحات رئوية ثنائية الجانب منتشرة (رئة بيضاء).', labs: 'نسبة PaO2/FiO2 أقل من 300.' }, choices: ['متلازمة الضائقة التنفسية الحادة (ARDS)', 'ذات رئة مكتسبة من المستشفى', 'صمة رئوية', 'وذمة رئة قلبية'], answer: 'متلازمة الضائقة التنفسية الحادة (ARDS)' }
        ],
        'رثوية': [
            { level: 'easy', case: 'امرأة مسنة تشكو من ألم في الركبة يزداد بالحركة ويخف بالراحة.', tools: { xray: 'تضيق المسافة المفصلية وظهور نوابت عظمية.' }, choices: ['فصال عظمي (خشونة المفصل)', 'التهاب المفاصل الرثياني', 'داء النقرس', 'التهاب مفصل إنتاني'], answer: 'فصال عظمي (خشونة المفصل)' },
            { level: 'medium', case: 'رجل 50 عاماً، استيقظ صباحاً على ألم شديد واحمرار وتورم في مفصل إبهام القدم.', tools: { history: 'تناول وجبة دسمة من اللحوم وشرب الكحول في الليلة السابقة.', labs: 'ارتفاع حمض البول في المصل.' }, choices: ['داء النقرس الحاد', 'التهاب مفصل إنتاني', 'التهاب مفصل رثياني', 'رض'], answer: 'داء النقرس الحاد' },
            { level: 'hard', case: 'شابة 22 عاماً، تشكو من حمى، ألم مفاصل، وطفح جلدي على الوجه يأخذ شكل "الفراشة" بعد التعرض للشمس.', tools: { labs: 'إيجابية أضداد النواة (ANA) و Anti-dsDNA.', history: 'تشكو أيضاً من تقرحات فموية غير مؤلمة.' }, choices: ['ذئبة حمامية جهازية (SLE)', 'التهاب جلد وعضل', 'وردية الوجه', 'حساسية ضوئية دوائية'], answer: 'ذئبة حمامية جهازية (SLE)' }
        ]
    };

    // 2. بنك التحدي: 60 سؤالاً (20 سهل، 20 متوسط، 20 صعب)
    const challengeBank = {
        easy: [
            // 20 سؤال سهل
            { id: 'C-EASY-1', case: 'مريض أتى بألم وحرقة خلف القص يزداد بالانحناء ليلاً.', tools: { history: 'يتحسن بمضادات الحموضة.' }, choices: ['القلس المعدي المريئي (GERD)', 'احتشاء عضلة قلبية', 'تشنج مريء', 'قرحة هضمية'], answer: 'القلس المعدي المريئي (GERD)' },
            { id: 'C-EASY-2', case: 'شاب لديه سيلان أنف، عطاس، وحكة في العينين كل ربيع.', tools: { inspection: 'هالات سوداء تحت العينين (Allergic shiners).' }, choices: ['التهاب أنف تحسسي', 'زكام عادي', 'التهاب جيوب', 'ربو'], answer: 'التهاب أنف تحسسي' },
            { id: 'C-EASY-3', case: 'مريضة تشكو من ألم بطني تشنجي يتحسن بعد التغوط، مع تبادل بين الإمساك والإسهال.', tools: { history: 'الأعراض تزداد مع التوتر النفسي.' }, choices: ['متلازمة القولون المتهيج (IBS)', 'داء كرون', 'التهاب قولون قرحي', 'حساسية قمح'], answer: 'متلازمة القولون المتهيج (IBS)' },
            { id: 'C-EASY-4', case: 'طفل يعاني من حكة شديدة ليلاً، خاصة بين الأصابع.', tools: { inspection: 'وجود أنفاق صغيرة ومرتفعة عن سطح الجلد.' }, choices: ['الجرب', 'إكزيما', 'صدفية', 'شرى'], answer: 'الجرب' },
            { id: 'C-EASY-5', case: 'شاب يعاني من ظهور مفاجئ لآفات جلدية حمامية مرتفعة وشديدة الحكة تختفي خلال ساعات.', tools: { history: 'تناول الفراولة قبل ظهور الأعراض.' }, choices: ['الشرى (الأرتيكاريا)', 'التهاب جلد تماسي', 'حساسية دوائية', 'جدري الماء'], answer: 'الشرى (الأرتيكاريا)' },
            { id: 'C-EASY-6', case: 'مريض يشكو من ألم حارق عند التبول.', tools: { history: 'لا توجد أعراض أخرى.' }, choices: ['التهاب إحليل', 'التهاب مثانة', 'التهاب بروستات', 'حصاة حالب'], answer: 'التهاب إحليل' },
            { id: 'C-EASY-7', case: 'امرأة حامل تشكو من غثيان وقيء صباحي.', tools: { history: 'في الثلث الأول من الحمل.' }, choices: ['القيء الحملي', 'تسمم غذائي', 'التهاب معدة', 'قرحة هضمية'], answer: 'القيء الحملي' },
            { id: 'C-EASY-8', case: 'رجل مسن يشكو من صعوبة في بدء التبول وضعف في رشق البول.', tools: { history: 'يستيقظ ليلاً للتبول عدة مرات.' }, choices: ['ضخامة بروستات حميدة (BPH)', 'سرطان بروستات', 'تضيق إحليل', 'مثانة عصبية'], answer: 'ضخامة بروستات حميدة (BPH)' },
            { id: 'C-EASY-9', case: 'شخص عاد من رحلة وظهر لديه إسهال مائي شديد.', tools: { history: 'شرب ماء من مصدر غير معروف.' }, choices: ['إسهال المسافرين', 'زحار أميبي', 'كوليرا', 'تسمم غذائي'], answer: 'إسهال المسافرين' },
            { id: 'C-EASY-10', case: 'طفل لديه حرارة وطفح جلدي بقعي حطاطي بدأ على الوجه ثم انتشر للجذع.', tools: { inspection: 'وجود بقع كوبليك على باطن الخد.' }, choices: ['الحصبة', 'الحصبة الألمانية', 'المرض الخامس', 'الحمى القرمزية'], answer: 'الحصبة' },
            { id: 'C-EASY-11', case: 'مريض يشكو من ألم في الحلق وصعوبة في البلع.', tools: { inspection: 'احمرار اللوزتين مع وجود نتحات قيحية.' }, choices: ['التهاب لوزات جرثومي', 'التهاب لوزات فيروسي', 'داء وحيدات النوى', 'خناق'], answer: 'التهاب لوزات جرثومي' },
            { id: 'C-EASY-12', case: 'شاب رياضي يشكو من ألم حاد في الكاحل بعد التوائه أثناء اللعب.', tools: { inspection: 'تورم وكدمات حول الكاحل.' }, choices: ['وثي (التواء) الكاحل', 'كسر في الكاحل', 'تمزق وتر أخيل', 'التهاب مفاصل'], answer: 'وثي (التواء) الكاحل' },
            { id: 'C-EASY-13', case: 'مريض يشكو من دوار شديد عند تحريك رأسه بسرعة.', tools: { history: 'يشعر بأن الغرفة تدور به.' }, choices: ['دوار الوضعة الانتيابي الحميد (BPPV)', 'داء مينيير', 'التهاب تيه', 'ورم العصب السمعي'], answer: 'دوار الوضعة الانتيابي الحميد (BPPV)' },
            { id: 'C-EASY-14', case: 'مريض يشكو من ألم في الأذن يزداد عند شد الصيوان.', tools: { inspection: 'احمرار وتورم في قناة السمع الظاهرة.' }, choices: ['التهاب أذن خارجية (أذن السبّاح)', 'التهاب أذن وسطى', 'جسم أجنبي في الأذن', 'التهاب الخشاء'], answer: 'التهاب أذن خارجية (أذن السبّاح)' },
            { id: 'C-EASY-15', case: 'شخص تعرض للدغة حشرة، وظهر لديه تورم موضعي واحمرار وحكة.', tools: { inspection: 'لا توجد علامات جهازية مثل ضيق التنفس.' }, choices: ['رد فعل موضعي للدغة حشرة', 'صدمة تحسسية', 'التهاب هيج', 'شرى'], answer: 'رد فعل موضعي للدغة حشرة' },
            { id: 'C-EASY-16', case: 'مريض يشكو من صداع يشعر به كأنه "شريط يضغط على رأسه".', tools: { history: 'يزداد في نهاية اليوم ولا يوجد غثيان أو رهاب ضوء.' }, choices: ['صداع التوتر', 'الشقيقة (الصداع النصفي)', 'صداع عنقودي', 'التهاب جيوب'], answer: 'صداع التوتر' },
            { id: 'C-EASY-17', case: 'مريض يشكو من ألم في الظهر بعد أن حمل شيئاً ثقيلاً.', tools: { history: 'الألم عضلي ولا ينتشر للساقين.' }, choices: ['تشنج عضلي قطني', 'انزلاق غضروفي', 'تضيق قناة شوكية', 'حصاة كلوية'], answer: 'تشنج عضلي قطني' },
            { id: 'C-EASY-18', case: 'طفل يعاني من سعال جاف ونباحي يزداد ليلاً.', tools: { auscultation: 'صوت صرير شهيقي.' }, choices: ['الخانوق (Croup)', 'التهاب لسان المزمار', 'ربو', 'جسم أجنبي'], answer: 'الخانوق (Croup)' },
            { id: 'C-EASY-19', case: 'مريض يشكو من ظهور بقع بيضاء مؤلمة داخل الفم.', tools: { inspection: 'تقرحات صغيرة بيضاء محاطة بهالة حمراء.' }, choices: ['قُلاع فموي', 'هربس فموي', 'مبيضات الفم (Soral thrush)', 'سرطان الفم'], answer: 'قُلاع فموي' },
            { id: 'C-EASY-20', case: 'شخص يعاني من نزف من الأنف بعد التعرض لهواء جاف.', tools: { history: 'يتوقف النزف بالضغط على الأنف.' }, choices: ['رعاف أمامي بسيط', 'رعاف خلفي', 'ارتفاع توتر شرياني', 'اضطراب تخثر'], answer: 'رعاف أمامي بسيط' }
        ],
// --- نهاية الجزء الأول من القسم الأول ---
                                                                                              // --- بداية الجزء الثاني من القسم الأول ---
        medium: [
            // 20 سؤال متوسط
            { id: 'C-MED-1', case: 'مريض مسن، غير متحرك، أتى بتورم وألم واحمرار في ساق واحدة فقط.', tools: { inspection: 'الساق المصابة أشد حرارة وأكبر محيطاً من الأخرى.', history: 'علامة هومان إيجابية (ألم في ربلة الساق عند عطف القدم الظهري).' }, choices: ['خثار وريدي عميق (DVT)', 'التهاب هيج', 'وذمة لمفية', 'تمزق عضلي'], answer: 'خثار وريدي عميق (DVT)' },
            { id: 'C-MED-2', case: 'مريض لديه قصة خثار وريدي عميق، تطورت لديه فجأة زلة تنفسية وألم صدري طاعن.', tools: { ecg: 'علامة S1Q3T3 الكلاسيكية.', labs: 'ارتفاع في الـ D-dimer.' }, choices: ['صمة رئوية', 'احتشاء عضلة قلبية', 'ريح صدرية', 'ذات رئة'], answer: 'صمة رئوية' },
            { id: 'C-MED-3', case: 'رجل 40 عاماً، يشكو من ضعف تدريجي متصاعد ومتناظر في الأطراف بدأ من القدمين.', tools: { history: 'كان لديه إسهال شديد قبل أسبوعين.', reflexes: 'غياب المنعكسات الوترية العميقة.' }, choices: ['متلازمة غيلان باريه', 'تصلب لويحي', 'وهن عضلي وبيل', 'شلل أطفال'], answer: 'متلازمة غيلان باريه' },
            { id: 'C-MED-4', case: 'مريض سكري يشكو من ألم حارق وتنميل في قدميه.', tools: { inspection: 'نقص في الإحساس باللمس والاهتزاز في القدمين.' }, choices: ['اعتلال أعصاب سكري محيطي', 'نقص تروية طرفي', 'عرق النسا', 'نقص فيتامين ب12'], answer: 'اعتلال أعصاب سكري محيطي' },
            { id: 'C-MED-5', case: 'شابة تشكو من تعب، ألم مفاصل، وطفح جلدي على وجهها يزداد بالتعرض للشمس.', tools: { labs: 'وجود أضداد النواة (ANA) في الدم.' }, choices: ['ذئبة حمامية جهازية (SLE)', 'التهاب جلد وعضل', 'وردية الوجه', 'حساسية ضوئية'], answer: 'ذئبة حمامية جهازية (SLE)' },
            { id: 'C-MED-6', case: 'مريض يعاني من يرقان، بول غامق، وبراز شاحب اللون.', tools: { labs: 'ارتفاع البيليروبين المباشر بشكل أساسي.' }, choices: ['يرقان انسدادي (بسبب حصاة مثلاً)', 'التهاب كبد فيروسي', 'فقر دم انحلالي', 'متلازمة جيلبرت'], answer: 'يرقان انسدادي (بسبب حصاة مثلاً)' },
            { id: 'C-MED-7', case: 'مريض يشكو من نوبات من الصداع النصفي الشديد مع غثيان ورهاب من الضوء والصوت.', tools: { history: 'تسبق النوبة أحياناً رؤية ومضات ضوئية (أورة).' }, choices: ['الشقيقة (الصداع النصفي) مع أورة', 'صداع عنقودي', 'ألم عصب مثلث التوائم', 'ورم دماغي'], answer: 'الشقيقة (الصداع النصفي) مع أورة' },
            { id: 'C-MED-8', case: 'مريض مدخن يشكو من سعال مع نفث دم ونقص وزن.', tools: { xray: 'وجود كتلة في قمة الرئة اليمنى.' }, choices: ['سرطان رئة', 'سل', 'توسع قصبات', 'خراجة رئوية'], answer: 'سرطان رئة' },
            { id: 'C-MED-9', case: 'شابة تشكو من ضعف عضلي يزداد في نهاية اليوم ويتحسن بالراحة.', tools: { history: 'تشكو أيضاً من تدلي الجفن وازدواج في الرؤية.' }, choices: ['وهن عضلي وبيل', 'متلازمة لامبرت-إيتون', 'تصلب لويحي', 'متلازمة غيلان باريه'], answer: 'وهن عضلي وبيل' },
            { id: 'C-MED-10', case: 'مريض يعاني من ألم بطني مزمن، إسهال دهني، ونقص وزن.', tools: { labs: 'خزعة من الأمعاء الدقيقة تظهر ضمور الزغابات.' }, choices: ['الداء الزلاقي (حساسية القمح)', 'داء كرون', 'التهاب قولون قرحي', 'متلازمة القولون المتهيج'], answer: 'الداء الزلاقي (حساسية القمح)' },
            { id: 'C-MED-11', case: 'مريض يشكو من ألم شديد في الخاصرة، حمى، وعرواءات.', tools: { percussion: 'إيلام شديد بالقرع على الزاوية الضلعية الفقرية.' }, choices: ['التهاب حويضة وكلية حاد', 'مغص كلوي', 'التهاب زائدة دودية خلفي', 'التهاب رتوج'], answer: 'التهاب حويضة وكلية حاد' },
            { id: 'C-MED-12', case: 'مريض يعاني من رجفان في اليدين يزداد بالحركة ويختفي بالراحة.', tools: { history: 'يتحسن قليلاً بعد شرب كمية صغيرة من الكحول.' }, choices: ['رعاش أساسي', 'داء باركنسون', 'رعاش مخيخي', 'فرط نشاط درق'], answer: 'رعاش أساسي' },
            { id: 'C-MED-13', case: 'مريض يشكو من ألم وتورم في مفصل واحد كبير (الركبة مثلاً) مع حمى.', tools: { labs: 'بزل المفصل يظهر سائل قيحي مع عدد كريات بيض مرتفع.' }, choices: ['التهاب مفصل إنتاني', 'داء النقرس', 'التهاب مفصل رثياني', 'فصال عظمي'], answer: 'التهاب مفصل إنتاني' },
            { id: 'C-MED-14', case: 'مريض يعاني من نوبات من الدوار، طنين في الأذن، ونقص سمع مترقٍ في أذن واحدة.', tools: { history: 'يشعر بامتلاء في الأذن المصابة.' }, choices: ['داء مينيير', 'ورم العصب السمعي', 'التهاب تيه', 'BPPV'], answer: 'داء مينيير' },
            { id: 'C-MED-15', case: 'مريض يعاني من سعال جاف مستمر، خاصة ليلاً، مع أزيز صدري.', tools: { history: 'تزداد الأعراض عند التعرض للغبار أو الهواء البارد.' }, choices: ['الربو', 'التهاب قصبات مزمن', 'قلس معدي مريئي', 'قصور قلب'], answer: 'الربو' },
            { id: 'C-MED-16', case: 'مريض يشكو من ظهور مفاجئ لآفات جلدية دائرية حمامية مع قشور فضية.', tools: { history: 'ظهرت الآفات بعد التهاب في الحلق.' }, choices: ['الصدفية النقطية', 'النخالية الوردية', 'زهري ثانوي', 'فطور جلدية'], answer: 'الصدفية النقطية' },
            { id: 'C-MED-17', case: 'مريض يعاني من ألم بطني في الربع العلوي الأيمن يزداد بعد تناول وجبة دسمة.', tools: { history: 'ينتشر الألم إلى الكتف الأيمن.' }, choices: ['مغص مراري (حصيات مرارية)', 'قرحة هضمية', 'التهاب بنكرياس', 'التهاب كبد'], answer: 'مغص مراري (حصيات مرارية)' },
            { id: 'C-MED-18', case: 'شاب أفريقي الأصل، أتى بألم شديد في العظام والصدر.', tools: { labs: 'لطاخة الدم المحيطية تظهر كريات دم حمراء منجلية الشكل.' }, choices: ['نوبة ألم في فقر الدم المنجلي', 'لوكيميا', 'التهاب العظم والنقي', 'احتشاء عضلة قلبية'], answer: 'نوبة ألم في فقر الدم المنجلي' },
            { id: 'C-MED-19', case: 'مريض يشكو من ألم حارق ينتشر على مسار عصب واحد في جهة واحدة من الجذع.', tools: { inspection: 'ظهور حويصلات على قاعدة حمامية في توزع قطعي.' }, choices: ['الحلأ النطاقي (Zona)', 'التهاب جلد تماسي', 'لدغة حشرة', 'ألم عضلي'], answer: 'الحلأ النطاقي (Zona)' },
            { id: 'C-MED-20', case: 'مريض يعاني من إسهال دموي، ألم بطني، وحمى.', tools: { history: 'خزعة القولون تظهر التهاباً مستمراً يبدأ من المستقيم.' }, choices: ['التهاب القولون القرحي', 'داء كرون', 'زحار أميبي', 'سرطان قولون'], answer: 'التهاب القولون القرحي' }
        ],
        hard: [
            // 20 سؤال صعب
            { id: 'C-HARD-1', case: 'مريض يشكو من صداع، ألم في الفك عند المضغ، واضطراب في الرؤية بعين واحدة.', tools: { labs: 'ارتفاع شديد في سرعة التثفل (ESR).', palpation: 'إيلام عند جس الشريان الصدغي.' }, choices: ['التهاب الشريان ذو الخلايا العرطلة', 'ألم عصب مثلث التوائم', 'صداع عنقودي', 'زرق حاد'], answer: 'التهاب الشريان ذو الخلايا العرطلة', nextStep: { question: 'ما هو الإجراء الفوري الأكثر أهمية؟', choices: ['بدء جرعة عالية من الستيروئيدات فوراً', 'أخذ خزعة من الشريان الصدغي', 'إجراء تصوير بالرنين المغناطيسي', 'إعطاء مسكنات ألم'], answer: 'بدء جرعة عالية من الستيروئيدات فوراً' } },
            { id: 'C-HARD-2', case: 'مريض لديه حمى، طفح جلدي راحي أخمصي، ونفخة قلبية جديدة.', tools: { history: 'المريض مدمن مخدرات وريدية.', labs: 'زرع الدم إيجابي للعنقوديات المذهبة.' }, choices: ['التهاب شغاف إنتاني', 'حمى رثوية', 'داء كاواساكي', 'زهري ثانوي'], answer: 'التهاب شغاف إنتاني' },
            { id: 'C-HARD-3', case: 'مريض أتى بألم بطني، يرقان، وحمى مع نوافض (عرواءات).', tools: { history: 'لديه قصة حصيات مرارية.', labs: 'ارتفاع البيليروبين المباشر والـ ALP و GGT.' }, choices: ['التهاب الطرق الصفراوية الصاعد (ثالوث شاركو)', 'التهاب مرارة حاد', 'التهاب كبد فيروسي', 'سرطان رأس البنكرياس'], answer: 'التهاب الطرق الصفراوية الصاعد (ثالوث شاركو)' },
            { id: 'C-HARD-4', case: 'مريض لديه ضخامة في اليدين والقدمين وتغير في ملامح الوجه.', tools: { labs: 'ارتفاع هرمون النمو (GH) و IGF-1.', history: 'يشكو من تعرق وصداع.' }, choices: ['ضخامة النهايات (Acromegaly)', 'قصور درق', 'داء كوشينغ', 'عملقة'], answer: 'ضخامة النهايات (Acromegaly)' },
            { id: 'C-HARD-5', case: 'مريض يشكو من بطء في الحركة، رجفان راحة (pill-rolling)، وصلابة عضلية.', tools: { inspection: 'وجه "مقنع" (Masked face) ومشية مترددة.' }, choices: ['داء باركنسون', 'رعاش أساسي', 'ضمور أجهزة متعدد', 'شلل فوق النوى المترقي'], answer: 'داء باركنسون' },
            { id: 'C-HARD-6', case: 'مريض يعاني من إسهال مائي غزير جداً "يشبه ماء الأرز".', tools: { history: 'تناول مأكولات بحرية غير مطهوة جيداً.', labs: 'فقدان شديد للشوارد.' }, choices: ['الكوليرا', 'إسهال المسافرين', 'زحار شيغيلي', 'تسمم غذائي بالعنقوديات'], answer: 'الكوليرا' },
            { id: 'C-HARD-7', case: 'مريض أتى بارتفاع توتر شرياني شديد ومقاوم للعلاج مع نوبات من الصداع والخفقان والتعرق.', tools: { labs: 'ارتفاع الميتانفرين في بول 24 ساعة.' }, choices: ['ورم القواتم (Pheochromocytoma)', 'فرط ألدوستيرونية أولية', 'تضيق الشريان الكلوي', 'فرط نشاط درق'], answer: 'ورم القواتم (Pheochromocytoma)' },
            { id: 'C-HARD-8', case: 'مريض لديه قصة سرطان رئة، أتى بنقص صوديوم شديد في الدم.', tools: { labs: 'صوديوم المصل منخفض، أسمولالية المصل منخفضة، أسمولالية البول مرتفعة بشكل غير مناسب.' }, choices: ['متلازمة الإفراز غير الملائم للهرمون المضاد للإدرار (SIADH)', 'قصور كظر', 'قصور درق', 'تجفاف'], answer: 'متلازمة الإفراز غير الملائم للهرمون المضاد للإدرار (SIADH)' },
            { id: 'C-HARD-9', case: 'مريض يعاني من ضعف عضلي داني (في الحزامين الكتفي والحوضي) مع طفح جلدي أرجواني حول العينين (heliotrope rash).', tools: { labs: 'ارتفاع إنزيمات العضلات (CK) وأضداد Jo-1.' }, choices: ['التهاب الجلد والعضل (Dermatomyositis)', 'ذئبة حمامية جهازية', 'تصلب جلد', 'وهن عضلي وبيل'], answer: 'التهاب الجلد والعضل (Dermatomyositis)' },
            { id: 'C-HARD-10', case: 'مريض يعاني من حمى، ألم بطني، وطفح جلدي palpable purpura على الأطراف السفلية.', tools: { history: 'لديه قصة التهاب كبد B.', labs: 'خزعة الجلد تظهر التهاب أوعية ناخر.' }, choices: ['التهاب الشرايين عديد العقيدات (PAN)', 'فرفرية هينوخ شونلاين', 'التهاب الأوعية المجهري', 'ورم حبيبي مع التهاب أوعية (فيغينر)'], answer: 'التهاب الشرايين عديد العقيدات (PAN)' },
            { id: 'C-HARD-11', case: 'مريض يعاني من وهن، نقص وزن، وتصبغ جلدي برونزي اللون.', tools: { labs: 'نقص صوديوم، ارتفاع بوتاسيوم، ونقص سكر الدم.', history: 'يشعر برغبة شديدة في تناول الملح.' }, choices: ['داء أديسون (قصور كظر أولي)', 'داء كوشينغ', 'متلازمة نلسون', 'ورم قواتم'], answer: 'داء أديسون (قصور كظر أولي)' },
            { id: 'C-HARD-12', case: 'مريض لديه قصة رجفان أذيني، أتى بألم شديد ومفاجئ في ساق واحدة مع شحوب وبرودة وغياب النبض فيها.', tools: { inspection: 'الساق المصابة شاحبة وباردة مقارنة بالأخرى.' }, choices: ['صمة شريانية حادة في الطرف السفلي', 'خثار وريدي عميق', 'تسلخ أبهر', 'متلازمة الحجرات'], answer: 'صمة شريانية حادة في الطرف السفلي' },
            { id: 'C-HARD-13', case: 'مريض يعاني من ألم بطني، إسهال دموي، وحمى. تنظير القولون يظهر التهاباً متقطعاً (skip lesions) مع مظهر "حجر الرصف".', tools: { labs: 'خزعة تظهر التهاباً عبر الجدار مع وجود أورام حبيبية.' }, choices: ['داء كرون', 'التهاب القولون القرحي', 'سل الأمعاء', 'لمفوما الأمعاء'], answer: 'داء كرون' },
            { id: 'C-HARD-14', case: 'مريض لديه قصة سرطان، أتى بتورم في الوجه والذراعين مع توسع في أوردة الصدر.', tools: { inspection: 'احتقان في الوجه والرقبة (plethora).', xray: 'قد تظهر كتلة في المنصف العلوي.' }, choices: ['متلازمة الوريد الأجوف العلوي (SVCS)', 'صدمة تحسسية', 'قصور قلب أيمن', 'التهاب تامور عاصر'], answer: 'متلازمة الوريد الأجوف العلوي (SVCS)' },
            { id: 'C-HARD-15', case: 'مريض يعاني من حمى، التهاب جيوب مزمن، وأعراض كلوية (بيلة دموية).', tools: { labs: 'وجود أضداد c-ANCA في المصل.', xray: 'صورة الصدر تظهر وجود عقيدات وتكهفات.' }, choices: ['ورم حبيبي مع التهاب أوعية (فيغينر)', 'متلازمة شيرغ شتراوس', 'التهاب الأوعية المجهري', 'متلازمة غودباستشر'], answer: 'ورم حبيبي مع التهاب أوعية (فيغينر)' },
            { id: 'C-HARD-16', case: 'مريض يعاني من ضعف عضلي يتحسن مع الجهد، جفاف فم، وغياب منعكسات.', tools: { history: 'لديه قصة سرطان رئة صغير الخلايا.', labs: 'التخطيط الكهربائي للعضلات يظهر زيادة في السعة بعد التحفيز المتكرر.' }, choices: ['متلازمة لامبرت-إيتون', 'وهن عضلي وبيل', 'تصلب جانبي ضموري', 'اعتلال عضلي'], answer: 'متلازمة لامبرت-إيتون' },
            { id: 'C-HARD-17', case: 'مريض يعاني من حمى مرتفعة، تصلب نقرة، وتخليط ذهني.', tools: { labs: 'بزل قطني يظهر سائل دماغي شوكي عكر، ارتفاع بروتين، نقص سكر، وعدد كريات بيض مرتفع (معظمها عدلات).' }, choices: ['التهاب سحايا جرثومي حاد', 'التهاب سحايا فيروسي', 'نزف تحت عنكبوتي', 'التهاب دماغ'], answer: 'التهاب سحايا جرثومي حاد' },
            { id: 'C-HARD-18', case: 'مريض يعاني من نفث دم واضطراب في وظائف الكلى (بيلة دموية وبروتينية).', tools: { labs: 'وجود أضداد الغشاء القاعدي للكبيبات (Anti-GBM).', xray: 'ارتشاحات رئوية منتشرة.' }, choices: ['متلازمة غودباستشر', 'ورم حبيبي مع التهاب أوعية (فيغينر)', 'ذئبة حمامية جهازية', 'التهاب الشرايين عديد العقيدات'], answer: 'متلازمة غودباستشر' },
            { id: 'C-HARD-19', case: 'مريض يعاني من إسهال مائي مزمن، نقص بوتاسيوم، وانعدام حمض المعدة (achlorhydria).', tools: { labs: 'مستويات مرتفعة جداً من الببتيد المعوي الفعال وعائياً (VIP).', xray: 'تصوير البطن يظهر ورماً في البنكرياس.' }, choices: ['ورم الفيبوما (VIPoma) - متلازمة فيرنر موريسون', 'متلازمة زولينجر إيليسون', 'ورم غلوكاغوني', 'ورم سرطاوي'], answer: 'ورم الفيبوما (VIPoma) - متلازمة فيرنر موريسون' },
            { id: 'C-HARD-20', case: 'مريض يعاني من نوبات من احمرار الوجه، إسهال، وأزيز صدري.', tools: { labs: 'ارتفاع مستوى 5-HIAA في بول 24 ساعة.', history: 'تزداد الأعراض بعد تناول الكحول أو الجبن.' }, choices: ['متلازمة السرطاوي (Carcinoid Syndrome)', 'ورم القواتم', 'حساسية طعام', 'وردية الوجه'], answer: 'متلازمة السرطاوي (Carcinoid Syndrome)' }
        ]
    };

    // =================================================================================
    //                               عناصر الواجهة
    // =================================================================================
    const screens = {
        start: document.getElementById('start-screen'),
        modeSelection: document.getElementById('mode-selection-screen'),
        specialtySelection: document.getElementById('specialty-selection-screen'),
        game: document.getElementById('game-screen'),
        lose: document.getElementById('lose-screen'),
        win: document.getElementById('win-screen'),
        stats: document.getElementById('stats-screen'),
    };

    const buttons = {
        startGame: document.getElementById('start-game-btn'),
        trainingMode: document.getElementById('training-mode-btn'),
        grandRound: document.getElementById('grand-round-btn'),
        restartGrandRound: document.getElementById('restart-grand-round-btn'),
        backToMainMenuLose: document.getElementById('back-to-main-menu-lose'),
        backToMainMenuWin: document.getElementById('back-to-main-menu-win'),
        showStats: document.getElementById('stats-btn-main'),
        backToMainMenuStats: document.getElementById('back-to-main-menu-stats'),
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
        modal.text.innerHTML = text;
        modal.element.style.display = 'flex';
    }

    modal.closeBtn.onclick = () => modal.element.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal.element) {
            modal.element.style.display = 'none';
        }
    };

// --- نهاية القسم الأول بالكامل ---
});
// =================================================================================
//                                القسم الثاني: كل وظائف اللعبة
// =================================================================================

// --- وظائف التحكم بالواجهة (معرفة مرة واحدة فقط) ---
function showScreen(screenName) {
    // التأكد من أن كل الشاشات معرفة قبل محاولة إخفائها
    if (screens && Object.values(screens).every(s => s)) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
    }
    // التأكد من أن الشاشة المطلوبة موجودة قبل إظهارها
    if (screens && screens[screenName]) {
        screens[screenName].classList.add('active');
    }
    currentScreen = screenName;
}

function showModal(title, text) {
    if (modal && modal.element) {
        modal.title.innerHTML = title;
        modal.text.innerHTML = text;
        modal.element.style.display = 'flex';
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

function displayStats() {
    statsElements.bestPercentage.textContent = `${personalStats.bestPercentage}%`;
    statsElements.totalAttempts.textContent = personalStats.totalAttempts;
    statsElements.highestStage.textContent = personalStats.highestStage;

    statsElements.recentHistory.innerHTML = '';
    if (personalStats.recentHistory.length === 0) {
        statsElements.recentHistory.innerHTML = '<li>لا يوجد سجل محاولات بعد.</li>';
    } else {
        [...personalStats.recentHistory].reverse().forEach(attempt => {
            const li = document.createElement('li');
            li.innerHTML = `<span>النتيجة: <b>${attempt.percentage}%</b></span> <span>المرحلة: ${attempt.stage}</span>`;
            statsElements.recentHistory.appendChild(li);
        });
    }
    showScreen('stats');
}

function startTrainingMode(specialty) {
    gameState = {
        mode: 'training',
        specialty: specialty,
        questions: shuffleArray([...trainingBank[specialty]]),
        currentQuestionIndex: 0,
        budget: 150,
        usedToolsCount: 0,
    };
    setupQuestion();
    showScreen('game');
    clearInterval(timerInterval);
    gameElements.timerDisplay.textContent = '∞';
}

function startGrandRound() {
    personalStats.totalAttempts++;
    saveStats();

    const easyQuestions = shuffleArray([...challengeBank.easy]).slice(0, 5);
    const mediumQuestions = shuffleArray([...challengeBank.medium]).slice(0, 5);
    const hardQuestions = shuffleArray([...challengeBank.hard]).slice(0, 5);

    gameState = {
        mode: 'grand_round',
        questions: [...easyQuestions, ...mediumQuestions, ...hardQuestions],
        currentQuestionIndex: 0,
        budget: 200,
        usedToolsCount: 0,
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
            loseGame("انتهى الوقت!");
        }
    }, 1000);
}

// --- وظائف منطق اللعبة الفعلي ---
function setupQuestion() {
    gameElements.patientFileContent.innerHTML = '<p class="placeholder">استخدم الأدوات لكشف المعلومات وإضافتها إلى الملف...</p>';
    document.querySelectorAll('.tool, .assist-tool').forEach(t => {
        t.classList.remove('used');
        t.disabled = false;
    });
    const question = gameState.questions[gameState.currentQuestionIndex];
    gameElements.budgetDisplay.textContent = gameState.budget;
    gameElements.questionCounter.textContent = `${gameState.currentQuestionIndex + 1} / ${gameState.questions.length}`;
    gameElements.caseTitle.textContent = `الحالة رقم #${gameState.currentQuestionIndex + 1} (صعوبة: ${question.level || 'غير محدد'})`;
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
        const reward = 15;
        updateBudget(reward);
        if (question.nextStep && !gameState.nextStepCompleted) {
            showModal('تشخيص أولي صحيح!', `تشخيصك صحيح! لقد ربحت ${reward} نقطة. لكن هذه الحالة معقدة وتتطلب قراراً إضافياً.`);
            gameState.nextStepCompleted = true;
            question.case = question.nextStep.question;
            question.choices = question.nextStep.choices;
            question.answer = question.nextStep.answer;
            setTimeout(setupQuestion, 2000);
        } else {
            showModal('إجابة صحيحة!', `تشخيصك صحيح! لقد ربحت ${reward} نقطة.`);
            setTimeout(nextQuestion, 1500);
        }
    } else {
        if (gameState.mode === 'grand_round') {
            loseGame(`إجابة خاطئة. التشخيص الصحيح كان: ${question.answer}`);
        } else {
            const penalty = 25;
            updateBudget(-penalty);
            showModal('إجابة خاطئة!', `التشخيص الصحيح كان: <b>${question.answer}</b>. تم خصم ${penalty} نقطة كعقوبة. تعلم من الخطأ وانتقل للحالة التالية.`);
            setTimeout(nextQuestion, 2500);
        }
    }
}

function nextQuestion() {
    gameState.currentQuestionIndex++;
    delete gameState.nextStepCompleted;
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        if (gameState.mode === 'grand_round') {
            winGame();
        } else {
            showModal('التدريب انتهى!', `لقد أكملت مناوبة <b>${gameState.specialty}</b> بنجاح. نتيجتك التدريبية هي ${gameState.budget} نقطة.`);
            showScreen('modeSelection');
        }
    } else {
        setupQuestion();
    }
}

function loseGame(reason) {
    clearInterval(timerInterval);
    updateStatsOnFinish(false);
    document.getElementById('lose-reason').textContent = reason;
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

// =================================================================================
//                                القسم الثالث: نقطة الانطلاق
// =================================================================================

// --- دالة ربط الأزرار (معرفة مرة واحدة فقط) ---
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

    document.querySelectorAll('.tool').forEach(tool => {
        tool.onclick = () => useTool(tool);
    });
    document.querySelectorAll('.assist-tool').forEach(tool => {
        tool.onclick = () => useAssistTool(tool);
    });
    
    modal.closeBtn.onclick = () => modal.element.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal.element) {
            modal.element.style.display = 'none';
        }
    };
}

// --- الكود الذي يتم تشغيله بعد تحميل الصفحة ---
try {
    setupEventListeners();
    showScreen('start');
    showModal('مرحباً بك في منصة المشخص المحترف!', 'هذه المنصة مصممة لصقل مهاراتك السريرية. اختر "وضع التدريب" لمراجعة التخصصات، أو "الجولة الكبرى" لاختبار معرفتك في تحدٍ حقيقي. بالتوفيق!');
} catch (error) {
    // كاشف الأخطاء القوي
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <h3 style="color: red;">❌ خطأ فادح ❌</h3>
            <p>حدث خطأ منع اللعبة من العمل. الرجاء نسخ هذا النص:</p>
            <div style="background: #f0f0f0; padding: 10px; border-radius: 5px; text-align: left; direction: ltr; font-family: monospace;">
                <strong>${error.name}:</strong> ${error.message}<br>
                <small>${error.stack.split('\n')[1].trim()}</small>
            </div>
        `;
        document.getElementById('modal').style.display = 'flex';
    } else {
        alert(`Critical Error: ${error.name} - ${error.message}`);
    }
}
    
