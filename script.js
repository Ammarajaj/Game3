// =================================================================================
//                                 القسم الأول: كل المتغيرات
// =================================================================================

// 1. بنوك الأسئلة (84 سؤالاً كاملاً)
const trainingBank = {
    'قلبية': [
        { level: 'easy', case: 'مريض 60 عاماً، يعاني من ألم صدري ضاغط خلف القص.', tools: { ecg: 'ارتفاع وصلة ST في المساري السفلية.' }, choices: ['احتشاء عضلة قلبية سفلي', 'التهاب التامور', 'تسلخ الأبهر', 'قرحة هضمية'], answer: 'احتشاء عضلة قلبية سفلي' },
        { level: 'medium', case: 'مريضة 70 عاماً، لديها قصة قصور قلب، أتت بزلة تنفسية شديدة وسعال رغوي زهري.', tools: { auscultation: 'خراخر ناعمة منتشرة في الساحتين الرئويتين.', xray: 'علامات احتقان وريدي رئوي وخطوط كيرلي B.' }, choices: ['وذمة رئة حادة قلبية المنشأ', 'نوبة ربو حادة', 'ذات رئة', 'صمة رئوية'], answer: 'وذمة رئة حادة قلبية المنشأ' },
        { level: 'hard', case: 'رجل 65 عاماً، أتى بألم صدري حاد "كالتمزيق" ينتشر إلى الظهر بين لوحي الكتف.', tools: { inspection: 'الضغط الشرياني في الذراع اليمنى (180/100) أعلى بكثير من اليسرى (110/70).', xray: 'توسع في المنصف.' }, choices: ['تسلخ الأبهر', 'احتشاء عضلة قلبية', 'صمة رئوية', 'التهاب التامور'], answer: 'تسلخ الأبهر', dangerousTool: 'palpation' }
    ],
    'غدية': [
        { level: 'easy', case: 'شابة تشكو من زيادة في الوزن، عدم تحمل البرد، وإمساك.', tools: { inspection: 'وجه متورم (وذمة مخاطية) وبحة في الصوت.', labs: 'ارتفاع TSH وانخفاض T4.' }, choices: ['قصور درق أولي', 'فرط درق', 'داء كوشينغ', 'داء أديسون'], answer: 'قصور درق أولي' },
        { level: 'medium', case: 'مريض سكري النوع الأول أتى إلى الإسعاف بحالة تغيم وعي ورائحة أسيتون في نفسه.', tools: { labs: 'ارتفاع سكر الدم، حماض استقلابي، ووجود كيتونات في البول والدم.' }, choices: ['حماض كيتوني سكري (DKA)', 'سبات فرط حلولية', 'نقص سكر الدم', 'حماض لاكتيكي'], answer: 'حماض كيتوني سكري (DKA)' },
        { level: 'hard', case: 'مريض يشكو من نوب من الصداع، التعرق، والخفقان، مع ارتفاع شديد في الضغط الشرياني خلال هذه النوب.', tools: { labs: 'ارتفاع الميتانفرينات في بلازما الدم وبول 24 ساعة.', history: 'تتحرض النوب بالضغط على البطن أو التوتر.' }, choices: ['ورم القواتم (Pheochromocytoma)', 'فرط الدرق', 'قلق وهلع', 'ارتفاع ضغط أساسي'], answer: 'ورم القواتم (Pheochromocytoma)' }
    ],
    'عصبية': [
        { level: 'easy', case: 'شاب أتى بشلل وجهي مفاجئ في نصف الوجه، مع عدم القدرة على إغماض العين أو رفع الحاجب في نفس الجهة.', tools: { history: 'لا يوجد ضعف في الأطراف أو اضطراب في الكلام.' }, choices: ['شلل بيل (شلل العصب الوجهي المحيطي)', 'جلطة دماغية', 'ورم في الدماغ', 'تصلب لويحي'], answer: 'شلل بيل (شلل العصب الوجهي المحيطي)' },
        { level: 'medium', case: 'رجل 70 عاماً، يشكو من رجفان في اليدين وقت الراحة، بطء في الحركة، وصلابة في العضلات.', tools: { inspection: 'مشية بخطوات قصيرة مع انحناء الجذع للأمام (مشية عابثة). وجه قناعي قليل التعابير.' }, choices: ['داء باركنسون', 'رجفان أساسي', 'شلل فوق النوى المترقي', 'ضمور أجهزة متعدد'], answer: 'داء باركنسون' },
        { level: 'hard', case: 'مريض أتى بصداع شديد مفاجئ هو "الأسوأ في حياته"، مع صلابة في النقرة وغثيان.', tools: { reflexes: 'علامات السحايا (كيرنيغ وبرودزينسكي) إيجابية.', history: 'لا يوجد قصة حمى.' }, choices: ['نزف تحت عنكبوتي (SAH)', 'التهاب سحايا جرثومي', 'صداع نصفي', 'ورم دماغي'], answer: 'نزف تحت عنكبوتي (SAH)' }
    ],
    'هضمية': [
        { level: 'easy', case: 'شاب يعاني من ألم شرسوفي يزداد بالطعام الحامض ويخف بمضادات الحموضة.', tools: { history: 'يتناول مضادات الالتهاب غير الستيروئيدية بكثرة بسبب ألم ظهره.' }, choices: ['قرحة هضمية', 'التهاب بنكرياس', 'حصيات مرارية', 'قلس معدي مريئي'], answer: 'قرحة هضمية' },
        { level: 'medium', case: 'مريض كحولي أتى بألم بطني شديد في الشرسوف ينتشر بشكل "حزامي" إلى الظهر.', tools: { labs: 'ارتفاع شديد في الأميلاز والليبار المصلي.', palpation: 'إيلام شديد في الشرسوف مع غياب الأصوات المعوية.' }, choices: ['التهاب بنكرياس حاد', 'انثقاب قرحة', 'احتشاء مساريقي', 'مغص مراري'], answer: 'التهاب بنكرياس حاد' },
        { level: 'hard', case: 'مريض 60 عاماً، لديه قصة تشمع كبد، أتى بقيء دموي غزير أحمر قانئ.', tools: { inspection: 'يرقان، حبن، وعلامات تشمع أخرى.', history: 'ضغط منخفض وتسارع في النبض.' }, choices: ['نزف دوالي المريء', 'قرحة نازفة', 'متلازمة مالوري فايس', 'سرطان المعدة'], answer: 'نزف دوالي المريء' }
    ],
    'بولية': [
        { level: 'easy', case: 'شابة تشكو من حرقة وتبوال متكرر وإلحاح بولي.', tools: { labs: 'وجود كريات بيض ونتريت إيجابي في تحليل البول.' }, choices: ['التهاب مثانة حاد (عدوى بولية سفلية)', 'التهاب حويضة وكلية', 'حصاة حالب', 'التهاب مهبل'], answer: 'التهاب مثانة حاد (عدوى بولية سفلية)' },
        { level: 'medium', case: 'رجل يعاني من ألم شديد مفاجئ في الخاصرة ينتشر إلى منطقة العانة، مع غثيان وبيلة دموية.', tools: { history: 'لا يستطيع المريض أن يهدأ في مكانه من شدة الألم.' }, choices: ['مغص كلوي (حصاة حالب)', 'التهاب حويضة وكلية', 'التهاب زائدة دودية', 'أمه دم أبهرية بطنية'], answer: 'مغص كلوي (حصاة حالب)' },
        { level: 'hard', case: 'رجل كبير في السن، لديه قصة ضخامة بروستات، أتى بعدم قدرة تامة على التبول منذ 12 ساعة مع ألم شديد فوق العانة.', tools: { palpation: 'جس كرة مؤلمة فوق العانة (مثانة ممتلئة).', percussion: 'أصمية عند قرع منطقة فوق العانة.' }, choices: ['احتباس بولي حاد', 'قصور كلوي حاد', 'التهاب بروستات حاد', 'حصاة مثانة'], answer: 'احتباس بولي حاد' }
    ],
    'دموية': [
        { level: 'easy', case: 'شابة تشكو من تعب، خفقان، وشحوب. نظامها الغذائي نباتي.', tools: { labs: 'فقر دم صغير الكريات ناقص الصباغ، مع انخفاض فيرّيتين المصل.' }, choices: ['فقر دم بعوز الحديد', 'فقر دم بعوز فيتامين B12', 'ثلاسيميا', 'فقر دم الأمراض المزمنة'], answer: 'فقر دم بعوز الحديد' },
        { level: 'medium', case: 'طفل أتى بنزوف من الأنف واللثة وكدمات متعددة على جسمه بعد أسبوع من إصابة فيروسية.', tools: { labs: 'نقص شديد في عدد الصفيحات الدموية مع سلامة بقية عناصر الدم.' }, choices: ['فرفرية قليلة الصفيحات مجهولة السبب (ITP)', 'لوكيميا حادة', 'ناعور', 'داء فون فيليبراند'], answer: 'فرفرية قليلة الصفيحات مجهولة السبب (ITP)' },
        { level: 'hard', case: 'شاب من أصل أفريقي، لديه قصة فقر دم مزمن، أتى بألم شديد في العظام والصدر والبطن.', tools: { labs: 'لطاخة الدم المحيطية تظهر كريات دم حمراء بشكل "منجلي".', history: 'الحالة بدأت بعد تعرضه للبرد والجفاف.' }, choices: ['نوبة مؤلمة في سياق فقر الدم المنجلي', 'احتشاء عظمي', 'متلازمة الصدر الحادة', 'التهاب العظم والنقي'], answer: 'نوبة مؤلمة في سياق فقر الدم المنجلي' }
    ],
    'صدرية': [
        { level: 'easy', case: 'شاب يعاني من سعال و صفير في الصدر يزداد ليلاً وبعد ممارسة الرياضة.', tools: { auscultation: 'وزيز منتشر في الساحتين الرئويتين.' }, choices: ['ربو قصبي', 'التهاب قصبات حاد', 'ذات رئة', 'توسع قصبات'], answer: 'ربو قصبي' },
        { level: 'medium', case: 'مدخن مزمن، يعاني من سعال منتج للقشع معظم أيام السنة، مع زلة تنفسية تزداد تدريجياً.', tools: { xray: 'فرط انتفاخ في الرئتين وتسطح في الحجاب الحاجز.', auscultation: 'أصوات تنفسية منخفضة و وزيز.' }, choices: ['داء الانسداد الرئوي المزمن (COPD)', 'ربو', 'تليف رئوي', 'سرطان رئة'], answer: 'داء الانسداد الرئوي المزمن (COPD)' },
        { level: 'hard', case: 'شاب طويل ونحيل، أتى بألم صدري حاد ومفاجئ مع زلة تنفسية شديدة.', tools: { auscultation: 'غياب الأصوات التنفسية في جهة واحدة من الصدر.', percussion: 'فرط رنين عند القرع في نفس الجهة.' }, choices: ['ريح صدرية عفوية أولية', 'صمة رئوية', 'احتشاء عضلة قلبية', 'ذات رئة'], answer: 'ريح صدرية عفوية أولية' }
    ],
    'رثوية': [
        { level: 'easy', case: 'امرأة مسنة تشكو من ألم في الركبة يزداد بالحركة ويخف بالراحة.', tools: { xray: 'تضيق المسافة المفصلية وظهور نوابت عظمية.' }, choices: ['فصال عظمي (خشونة المفصل)', 'التهاب المفاصل الرثياني', 'داء النقرس', 'التهاب مفصل إنتاني'], answer: 'فصال عظمي (خشونة المفصل)' },
        { level: 'medium', case: 'رجل 50 عاماً، استيقظ صباحاً على ألم شديد واحمرار وتورم في مفصل إبهام القدم.', tools: { history: 'تناول وجبة دسمة من اللحوم وشرب الكحول في الليلة السابقة.', labs: 'ارتفاع حمض البول في المصل.' }, choices: ['داء النقرس الحاد', 'التهاب مفصل إنتاني', 'التهاب مفصل رثياني', 'رض'], answer: 'داء النقرس الحاد' },
        { level: 'hard', case: 'شابة 22 عاماً، تشكو من حمى، ألم مفاصل، وطفح جلدي على الوجه يأخذ شكل "الفراشة" بعد التعرض للشمس.', tools: { labs: 'إيجابية أضداد النواة (ANA) و Anti-dsDNA.', history: 'تشكو أيضاً من تقرحات فموية غير مؤلمة.' }, choices: ['ذئبة حمامية جهازية (SLE)', 'التهاب جلد وعضل', 'وردية الوجه', 'حساسية ضوئية دوائية'], answer: 'ذئبة حمامية جهازية (SLE)' }
    ]
};

const challengeBank = {
    easy: [
        { id: 'C-EASY-1', level: 'easy', case: 'مريض أتى بألم وحرقة خلف القص يزداد بالانحناء ليلاً.', tools: { history: 'يتحسن بمضادات الحموضة.' }, choices: ['القلس المعدي المريئي (GERD)', 'احتشاء عضلة قلبية', 'تشنج مريء', 'قرحة هضمية'], answer: 'القلس المعدي المريئي (GERD)' },
        { id: 'C-EASY-2', level: 'easy', case: 'شاب يعاني من عطاس، سيلان أنف مائي، وحكة في العينين كل فصل ربيع.', tools: { history: 'لا يوجد حمى أو ألم في الجسم.' }, choices: ['التهاب أنف تحسسي (حمى القش)', 'زكام (رشح شائع)', 'التهاب جيوب', 'كوفيد-19'], answer: 'التهاب أنف تحسسي (حمى القش)' },
        { id: 'C-EASY-3', level: 'easy', case: 'مريض يشكو من ألم بطني معمم مع تبدل في عادات التغوط (إسهال يتناوب مع إمساك).', tools: { history: 'الأعراض تزداد بالتوتر وتتحسن بعد التغوط. لا يوجد دم في البراز أو نقص وزن.' }, choices: ['متلازمة القولون المتهيج (IBS)', 'داء كرون', 'التهاب قولون قرحي', 'سرطان قولون'], answer: 'متلازمة القولون المتهيج (IBS)' },
        { id: 'C-EASY-4', level: 'easy', case: 'امرأة تشكو من تعب، زيادة في الوزن، وشعر جاف ومتقصف.', tools: { labs: 'TSH مرتفع، T4 منخفض.' }, choices: ['قصور درق', 'فرط درق', 'فقر دم', 'اكتئاب'], answer: 'قصور درق' },
        { id: 'C-EASY-5', level: 'easy', case: 'طفل لديه حمى وطفح جلدي حاك على شكل بقع حمراء ثم حويصلات تنتشر في كل الجسم.', tools: { history: 'بدأ الطفح على الجذع ثم انتشر للأطراف والوجه.' }, choices: ['جدري الماء (الحماق)', 'الحصبة', 'الحصبة الألمانية', 'مرض اليد والقدم والفم'], answer: 'جدري الماء (الحماق)' },
        { id: 'C-EASY-6', level: 'easy', case: 'مريض أتى بألم حاد في الأذن بعد السباحة.', tools: { inspection: 'ألم شديد عند سحب صيوان الأذن للخارج.' }, choices: ['التهاب أذن خارجية (أذن السبّاح)', 'التهاب أذن وسطى', 'جسم غريب في الأذن', 'تجمع صملاخ'], answer: 'التهاب أذن خارجية (أذن السبّاح)' },
        { id: 'C-EASY-7', level: 'easy', case: 'شاب يعاني من ألم بطني حول السرة ثم انتقل إلى الحفرة الحرقفية اليمنى.', tools: { palpation: 'إيلام في نقطة ماكبرني.', labs: 'ارتفاع كريات الدم البيضاء.' }, choices: ['التهاب زائدة دودية حاد', 'التهاب رتوج', 'حصاة حالب أيمن', 'كيسة مبيضية ملتوية'], answer: 'التهاب زائدة دودية حاد' }
    ],
    medium: [
        { id: 'C-MED-1', level: 'medium', case: 'مريض مسن، غير متحرك، أتى بتورم وألم واحمرار في ساق واحدة فقط.', tools: { inspection: 'الساق المصابة أشد حرارة وأكبر محيطاً من الأخرى.', history: 'علامة هومان إيجابية (ألم في ربلة الساق عند عطف القدم الظهري).' }, choices: ['خثار وريدي عميق (DVT)', 'التهاب هيج', 'وذمة لمفية', 'تمزق عضلي'], answer: 'خثار وريدي عميق (DVT)' },
        { id: 'C-MED-2', level: 'medium', case: 'مريض لديه قصة خثار وريدي عميق (DVT) أتى بزلة تنفسية حادة وألم صدري طاعن.', tools: { ecg: 'تسرع قلب جيبي، انقلاب T في V1-V3، علامة S1Q3T3.', labs: 'ارتفاع D-dimer.' }, choices: ['صمة رئوية (PE)', 'احتشاء عضلة قلبية', 'ريح صدرية', 'ذات رئة'], answer: 'صمة رئوية (PE)' },
        { id: 'C-MED-3', level: 'medium', case: 'مريض كحولي مزمن، أتى بيرقان، حبن (تجمع سائل في البطن)، وقيء دموي.', tools: { inspection: 'توسع أوردة حول السرة (رأس ميدوزا)، حمامى راحية.', labs: 'ارتفاع البيليروبين، نقص الألبومين، اضطراب في عوامل التخثر.' }, choices: ['تشمع كبد لا معاوض', 'التهاب كبد حاد', 'سرطان كبد', 'متلازمة بود-كياري'], answer: 'تشمع كبد لا معاوض' },
        { id: 'C-MED-4', level: 'medium', case: 'شابة تشكو من نوب من الخدر والتنميل، ضعف في ساق واحدة، وتشوش في الرؤية استمر لأيام ثم تحسن.', tools: { history: 'حدثت لها نوبة مشابهة من اضطراب الرؤية في العين الأخرى قبل عام.', reflexes: 'اشتداد المنعكسات مع علامة بابنسكي إيجابية.' }, choices: ['تصلب لويحي (MS)', 'ذئبة حمامية جهازية', 'نقص فيتامين B12', 'متلازمة غيلان باريه'], answer: 'تصلب لويحي (MS)' },
        { id: 'C-MED-5', level: 'medium', case: 'مريض سكري يعاني من حمى، قشعريرة، وألم في الخاصرة.', tools: { labs: 'بيلة قيحية (كريات بيض كثيرة في البول).', palpation: 'إيلام شديد في الزاوية الضلعية الفقرية.' }, choices: ['التهاب حويضة وكلية حاد', 'التهاب مثانة', 'مغص كلوي', 'خراجة حول الكلية'], answer: 'التهاب حويضة وكلية حاد' },
        { id: 'C-MED-6', level: 'medium', case: 'امرأة في منتصف العمر تشكو من ألم وتيبس صباحي في مفاصل اليدين الصغيرة (المفاصل السنعية السلامية والبروكسيمالية بين السلامية) مع تورم.', tools: { labs: 'العامل الرثياني (RF) و Anti-CCP إيجابيان.', history: 'التيبس يستمر لأكثر من ساعة.' }, choices: ['التهاب المفاصل الرثياني (RA)', 'فصال عظمي', 'ذئبة حمامية جهازية', 'التهاب مفاصل صدافي'], answer: 'التهاب المفاصل الرثياني (RA)' }
    ],
    hard: [
        { id: 'C-HARD-1', level: 'hard', case: 'مريض يشكو من صداع، ألم في الفك عند المضغ، واضطراب في الرؤية بعين واحدة.', tools: { labs: 'ارتفاع شديد في سرعة التثفل (ESR).', palpation: 'إيلام عند جس الشريان الصدغي.' }, choices: ['التهاب الشريان ذو الخلايا العرطلة', 'ألم عصب مثلث التوائم', 'صداع عنقودي', 'زرق حاد'], answer: 'التهاب الشريان ذو الخلايا العرطلة', nextStep: { question: 'ما هو الإجراء الفوري الأكثر أهمية؟', choices: ['بدء جرعة عالية من الستيروئيدات فوراً', 'أخذ خزعة من الشريان الصدغي', 'إجراء تصوير بالرنين المغناطيسي', 'إعطاء مسكنات ألم'], answer: 'بدء جرعة عالية من الستيروئيدات فوراً' } },
        { id: 'C-HARD-2', level: 'hard', case: 'مريض لديه حمى، طفح جلدي، ألم مفصلي، وقصة تناول دواء جديد (مثل البنسلين) قبل أسبوع.', tools: { labs: 'ارتفاع الكريات البيض (خاصة الحمضات)، ارتفاع الكرياتينين.', history: 'لا يوجد انخفاض في ضغط الدم.' }, choices: ['التهاب كلية خلالي حاد دوائي المنشأ', 'التهاب كبب وكلية تالٍ للعقديات', 'ذئبة حمامية جهازية', 'تفاعل تأقي'], answer: 'التهاب كلية خلالي حاد دوائي المنشأ' },
        { id: 'C-HARD-3', level: 'hard', case: 'مريض يعاني من ضعف مترقٍ صاعد يبدأ من القدمين ويمتد للأعلى، مع غياب المنعكسات الوترية العميقة.', tools: { history: 'أصيب بإسهال قبل أسبوعين.', reflexes: 'غياب منعكس الرضفة ومنعكس أخيل في الطرفين.' }, choices: ['متلازمة غيلان باريه (GBS)', 'تصلب لويحي', 'وهن عضلي وبيل', 'تسمم وشيقي (Botulism)'], answer: 'متلازمة غيلان باريه (GBS)' },
        { id: 'C-HARD-4', level: 'hard', case: 'مريض لديه قصة رجفان أذيني، أتى بألم بطني شديد ومفاجئ وغير متناسب مع الموجودات القليلة بالفحص السريري.', tools: { labs: 'حماض استقلابي مع ارتفاع اللاكتات.', history: 'توقف عن تناول مميعات الدم منذ يومين.' }, choices: ['احتشاء مساريقي حاد', 'التهاب بنكرياس حاد', 'انثقاب أحشاء', 'انسداد أمعاء'], answer: 'احتشاء مساريقي حاد', dangerousTool: 'palpation' }
    ]
};

// 2. عناصر الواجهة
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

// 3. متغيرات حالة اللعبة
let currentScreen = 'start';
let gameState = {};
let personalStats = JSON.parse(localStorage.getItem('personalStats')) || {
    bestPercentage: 0,
    totalAttempts: 0,
    highestStage: '0 / 15',
    recentHistory: []
};
let timerInterval;
let grandRoundRulesShown = false; // متغير لتتبع عرض القواعد

// =================================================================================
//                                 القسم الثاني: كل الدوال
// =================================================================================

// --- وظائف التحكم بالواجهة ---
function showScreen(screenName) {
    if (screens && Object.values(screens).every(s => s)) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
    }
    if (screens && screens[screenName]) {
        screens[screenName].classList.add('active');
    }
    currentScreen = screenName;
}

function showModal(title, text, autoCloseDelay = null) {
    if (modal && modal.element) {
        modal.title.innerHTML = title;
        modal.text.innerHTML = text;
        modal.element.style.display = 'flex';

        if (autoCloseDelay) {
            setTimeout(() => {
                modal.element.style.display = 'none';
            }, autoCloseDelay);
        }
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
    // **الإصلاح: ترتيب الأسئلة حسب الصعوبة**
    const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
    const sortedQuestions = [...trainingBank[specialty]].sort((a, b) => {
        return difficultyOrder[a.level] - difficultyOrder[b.level];
    });

    gameState = {
        mode: 'training',
        specialty: specialty,
        questions: sortedQuestions, // استخدام الأسئلة المرتبة
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
    // **التحسين: عرض القواعد عند أول مرة فقط**
    if (!grandRoundRulesShown) {
        showModal(
            '🏆 قواعد الجولة الكبرى',
            `<ul>
                <li><b>الهدف:</b> حل 15 حالة متتالية.</li>
                <li><b>الميزانية:</b> تبدأ بـ 200 نقطة.</li>
                <li><b>الوقت:</b> لديك 15 دقيقة فقط.</li>
                <li><b>الخطر:</b> أي إجابة خاطئة تنهي الجولة فوراً!</li>
                <li><b>التقييم:</b> سيتم تقييمك بنسبة مئوية بناءً على نتيجتك.</li>
            </ul>
            <p><b>هل أنت مستعد للتحدي؟</b></p>`
        );
        grandRoundRulesShown = true;
        return; // توقف هنا، سيبدأ اللاعب اللعبة بالضغط على الزر مرة أخرى
    }

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

// ... بداية الكود من الرد السابق ...

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
        loseGame(`لقد استخدمت أداة خطرة (${toolElement.innerText}) في هذا السياق، مما أدى إلى تدهور حاد في حالة المريض.`);
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
            showModal('تشخيص أولي صحيح!', `تشخيصك صحيح! لقد ربحت ${reward} نقطة. <br> لكن هذه الحالة معقدة وتتطلب قراراً إضافياً.`, 2000);
            gameState.nextStepCompleted = true;
            question.case = question.nextStep.question;
            question.choices = question.nextStep.choices;
            question.answer = question.nextStep.answer;
            setTimeout(setupQuestion, 2000);
        } else {
            // **التحسين: إغلاق تلقائي للنافذة**
            showModal('إجابة صحيحة!', `تشخيصك صحيح! لقد ربحت ${reward} نقطة.`, 1500);
            setTimeout(nextQuestion, 1500);
        }
    } else {
        if (gameState.mode === 'grand_round') {
            // **التحسين: عدم إظهار الإجابة الصحيحة**
            loseGame(`إجابة خاطئة. انتهت الجولة.`);
        } else {
            const penalty = 25;
            updateBudget(-penalty);
            showModal('إجابة خاطئة!', `التشخيص الصحيح كان: <b>${question.answer}</b>. تم خصم ${penalty} نقطة كعقوبة. تعلم من الخطأ وانتقل للحالة التالية.`);
            setTimeout(nextQuestion, 3000);
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
            setTimeout(() => showScreen('modeSelection'), 2000);
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

function setupEventListeners() {
    buttons.startGame.onclick = () => showScreen('modeSelection');
    buttons.trainingMode.onclick = () => {
        setupSpecialtySelection();
        showScreen('specialtySelection');
    };
    buttons.grandRound.onclick = startGrandRound;
    buttons.restartGrandRound.onclick = () => {
        grandRoundRulesShown = false; // إعادة السماح بظهور القواعد
        startGrandRound();
    };
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

document.addEventListener('DOMContentLoaded', () => {
    try {
        setupEventListeners();
        showScreen('start');
        showModal('مرحباً بك في منصة المشخص المحترف!', 'هذه المنصة مصممة لصقل مهاراتك السريرية. اختر "وضع التدريب" لمراجعة التخصصات، أو "الجولة الكبرى" لاختبار معرفتك في تحدٍ حقيقي. بالتوفيق!');
    } catch (error) {
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
});

// --- نهاية الملف ---
