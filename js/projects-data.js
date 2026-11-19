/* إعدادات الموقع — عدّل الأرقام والروابط هنا */
const SITE_CONFIG = {
  facebook: 'https://www.facebook.com/KHMetalDesign',
  instagram: 'https://www.instagram.com/khmetaldesign',
  whatsapp: '',   // مثال: '201001234567' (بدون + أو مسافات)
  phone: '',      // مثال: '+201001234567'
  email: '',
  mapEmbed: ''    // رابط Embed من Google Maps (src الخاص بالـ iframe)
};
/* معرض الأعمال — مصنف حسب القسم. لإضافة مشروع: انسخ سطرًا وغيّر الصورة والعنوان والوصف.
   cat: kitchens | windows | shutters | showers
   featured:true تعني ظهور المشروع في المعرض المختار بالصفحة الرئيسية.
   الصور الحالية رسومات توضيحية، استبدلها بصور مشاريعكم داخل images/projects/ */
const PROJECTS = [
 {cat:'kitchens',featured:true,img:'images/projects/k1.svg',title:{ar:'مطبخ ألوميتال حديث',en:'Modern aluminum kitchen'},desc:{ar:'وحدات علوية وسفلية بتشطيب هادئ ومقابض مدمجة.',en:'Upper and base units with a calm finish and integrated handles.'}},
 {cat:'kitchens',img:'images/projects/k2.svg',title:{ar:'مطبخ بتشطيب داكن',en:'Dark finish kitchen'},desc:{ar:'خطوط رأسية نظيفة وألوان داكنة تناسب المساحات العصرية.',en:'Clean vertical lines and a dark palette for modern spaces.'}},
 {cat:'windows',featured:true,img:'images/projects/w1.svg',title:{ar:'شباك ألوميتال جرار',en:'Sliding aluminum window'},desc:{ar:'جرار بتقفيل محكم وعزل جيد للصوت والحرارة.',en:'Sliding window with tight sealing and good sound and heat insulation.'}},
 {cat:'windows',img:'images/projects/w2.svg',title:{ar:'شباك مفصلي / قلاب',en:'Casement / tilt window'},desc:{ar:'فتح مفصلي أو قلاب مع إكسسوارات متينة.',en:'Casement or tilt opening with durable hardware.'}},
 {cat:'shutters',featured:true,img:'images/projects/s1.svg',title:{ar:'شاتر حماية',en:'Security shutter'},desc:{ar:'شاتر قوي للمحلات والمنشآت بتشغيل يدوي أو موتور.',en:'Strong shutter for shops and buildings, manual or motorized.'}},
 {cat:'shutters',img:'images/projects/s2.svg',title:{ar:'شاتر عزل للشبابيك',en:'Insulating window shutter'},desc:{ar:'يوفر عزلًا وخصوصية مع سهولة في التشغيل.',en:'Adds insulation and privacy with easy operation.'}},
 {cat:'showers',featured:true,img:'images/projects/c1.svg',title:{ar:'كابينة شاور ركنية',en:'Corner shower cabin'},desc:{ar:'زجاج سيكوريت وإكسسوارات مقاومة للصدأ.',en:'Tempered glass with rust-resistant accessories.'}},
 {cat:'showers',img:'images/projects/c2.svg',title:{ar:'كابينة شاور جرار',en:'Sliding shower cabin'},desc:{ar:'باب جرار يوفر مساحة ويسهل التنظيف.',en:'Sliding door that saves space and cleans easily.'}}
];
