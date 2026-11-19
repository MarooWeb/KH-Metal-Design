KH Metal Design — موقع متعدد الصفحات (7 صفحات)
الصفحات: index.html (الرئيسية) | kitchens.html (المطابخ) | windows.html (الشبابيك) | shutters.html (الشاتر) | shower-cabins.html (كبائن الشاور) | about.html (من نحن) | contact.html (تواصل معنا)
- رفع الموقع: ارفع كل محتويات المجلد إلى public_html في cPanel (لا يحتاج أي تثبيت).
- الأرقام والروابط والخريطة: js/projects-data.js ← SITE_CONFIG (واتساب، هاتف، بريد، رابط Google Maps Embed). المكان المخصص للخريطة ونموذج الطلب في صفحة contact.html، ويظهر تلقائيًا بمجرد وضع رابط mapEmbed.
- معرض الأعمال: في نفس الملف داخل PROJECTS انسخ سطر مشروع وغيّر الصورة والعنوان والوصف. cat يحدد الصفحة (kitchens/windows/shutters/showers)، و featured:true يعرضه أيضًا في الرئيسية. ضع صورك داخل images/projects/.
- النصوص (عربي/إنجليزي) لكل الصفحات: js/translations.js. اللغة المختارة تُحفظ في localStorage وتبقى ثابتة بين الصفحات.
- الألوان: المتغيرات في أول css/style.css (الوضع الفاتح والداكن).
- إضافة رابط في القائمة أو الفوتر: عدّله في كل صفحة HTML (الهيدر والفوتر متطابقان في الصفحات السبع).
