/*
  TRANSLATIONS — every visible word on the site lives here.

  To add a language (e.g. French):
    1. Copy the whole `en` block, rename it `fr`, translate every value.
    2. Fill in its `_meta` (name, short, dir, htmlLang, switchTo, locale).
    3. That's it. The language only appears in the selector once EVERY key
       of `en` exists in it (see I18N.missing('fr') in the browser console).

  Rules
  - `{name}`-style placeholders are filled in by the code. Keep them.
  - Brand and model names (Mercedes, E200, Rolls-Royce Cullinan…) are never translated.
  - Missing keys fall back to English per element, never to "undefined".
  - `v.*`  = vehicle vocabulary (trims, locations, body styles). Add a line here
             whenever a new vehicle uses a new word.
*/
window.TRANSLATIONS = {

  en: {
    _meta: { name: 'English', short: 'EN', dir: 'ltr', htmlLang: 'en', locale: 'en_US', switchTo: 'Switch to English', order: 1 },

    /* page metadata */
    'meta.title': 'Youssef Hany | Luxury & Exotic Vehicle Brokerage in Egypt',
    'meta.desc': 'Youssef Hany Luxury & Exotics — a premium selection of luxury and exotic vehicles in Egypt, with clear prices and direct contact on WhatsApp.',
    'meta.ogTitle': 'Youssef Hany | Luxury & Exotic Vehicle Brokerage in Egypt',
    'meta.ogDesc': 'A premium selection of luxury and exotic vehicles in Egypt. View details and prices, then contact Youssef Hany directly on WhatsApp.',
    'meta.twDesc': 'A premium selection of luxury and exotic vehicles in Egypt. Contact Youssef Hany directly on WhatsApp.',
    'meta.imgAlt': 'Rolls-Royce Cullinan with the Youssef Hany — Luxury & Exotics logo',
    'meta.siteName': 'Youssef Hany — Luxury & Exotics',

    /* header */
    'skip': 'Skip to content',
    'nav.label': 'Main navigation',
    'nav.home': 'Home',
    'nav.cars': 'Automobiles',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.whatsapp': 'WhatsApp',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'brand.home': 'Youssef Hany — Luxury & Exotics, home',
    'brand.logoAlt': 'Youssef Hany — Luxury & Exotics',
    'lang.label': 'Language',
    'lang.changed': 'Language changed to English',

    /* hero */
    'hero.eyebrow': 'Luxury & Exotic Vehicle Brokerage',
    'hero.name': 'Youssef Hany',
    'hero.tag': 'Luxury & Exotics',
    'hero.text': 'A premium selection of vehicles sourced for clients who value quality, specification, transparency, and market value.',
    'hero.explore': 'Explore Vehicles',
    'hero.wa': 'Contact on WhatsApp',
    'hero.factsLabel': 'Key terms',
    'hero.f1': 'Owner-to-owner',
    'hero.f2': 'Market-based pricing',
    'hero.f3': 'Fixed 1% commission',

    /* inventory */
    'inv.eyebrow': 'Current inventory',
    'inv.title': 'Available Automobiles',
    'inv.lead': 'A selection of luxury automobiles from Youssef Hany. Open a vehicle for photos and details, or message Youssef directly about it.',
    'inv.empty': 'No vehicles are listed at the moment. Message Youssef on WhatsApp to ask about current availability.',
    'filter.label': 'Filter automobiles by brand',
    'filter.all': 'All',
    'inv.status.one': 'Showing 1 automobile',
    'inv.status.other': 'Showing {n} automobiles',
    'photos.one': '1 photo',
    'photos.other': '{n} photos',

    /* card + details */
    'card.view': 'View Details',
    'card.wa': 'Inquire on WhatsApp',
    'card.viewAria': 'View details: {name}',
    'card.waAria': 'Inquire on WhatsApp about the {name}',
    'label.year': 'Year',
    'label.mileage': 'Mileage',
    'label.condition': 'Condition',
    'label.location': 'Location',
    'label.price': 'Price',
    'price.note': 'Price is negotiable upon inspection',
    'label.trim': 'Trim',
    'label.package': 'Package',
    'label.body': 'Body style',
    'label.spec': 'Specification',
    'fmt.price': '{cur} {amount}',
    'fmt.km': '{n} km',
    'cur.EGP': 'EGP',
    'alt.base': '{name} {year} {detail}',
    'alt.view': '{base} — {view}',
    'tag.zero': 'Zero',

    /* vehicle vocabulary (keyed by the values used in vehicles.js) */
    'v.amg-premium-plus': 'AMG Premium Plus',
    'v.amg-night-package': 'AMG Night Package',
    'v.black-package': 'Black Package',
    'v.fully-loaded': 'Fully Loaded',
    'v.convertible': 'Convertible',
    'v.zero': 'Zero / Brand New',
    'v.fifth-settlement': 'Fifth Settlement',
    'v.al-obour': 'Al Obour',
    'v.nasr-city': 'Nasr City',
    'view.front': 'front view',
    'view.rear': 'rear view',
    'view.interior': 'interior',
    'view.grille': 'front grille',

    /* sourcing strip */
    'src.title': 'A Specific Vehicle',
    'src.text': 'Looking for a particular make, model or specification? Tell Youssef.',
    'src.btn': 'Start a Search',

    /* approach */
    'dir.eyebrow': 'The approach',
    'dir.title': 'Direct. Transparent. Premium.',
    'dir.lead': 'Youssef Hany focuses on direct owner-to-owner transactions, avoiding unnecessary intermediary layers between buyer and seller.',
    'dir.1.t': 'Direct Dealing',
    'dir.1.p': 'Owner-to-owner automotive transactions.',
    'dir.2.t': 'Market-Based Pricing',
    'dir.2.p': 'Used vehicles are evaluated according to actual market value.',
    'dir.3.t': 'Fixed 1% Commission',
    'dir.3.p': 'A clear, fixed 1% commission structure.',

    /* brands */
    'brands.eyebrow': 'Automotive focus',
    'brands.title': 'Marques of Interest',
    'brands.lead': 'The names Youssef Hany works around. Independent brokerage — no official dealership affiliation is implied.',

    /* services */
    'svc.eyebrow': 'Services',
    'svc.title': 'Four ways to work together',
    'svc.1.t': 'Buy',
    'svc.1.p': 'Help clients identify and select suitable luxury or premium vehicles according to their needs and budget.',
    'svc.2.t': 'Sell',
    'svc.2.p': 'Facilitate the sale of used luxury and premium vehicles based on current market value.',
    'svc.3.t': 'Source',
    'svc.3.p': 'Assist clients in finding a specific vehicle or model.',
    'svc.4.t': 'Consult',
    'svc.4.p': 'Provide guidance when selecting between vehicles, models, and options.',

    /* process */
    'proc.eyebrow': 'How it works',
    'proc.title': 'Simple, from first message to final deal',
    'proc.1.t': 'Discover',
    'proc.1.p': 'Tell Youssef what vehicle you are looking for or what you want to sell.',
    'proc.2.t': 'Evaluate',
    'proc.2.p': 'Discuss the vehicle, requirements, and relevant market value.',
    'proc.3.t': 'Connect',
    'proc.3.p': 'Facilitate the direct transaction between the relevant parties.',
    'proc.4.t': 'Complete',
    'proc.4.p': 'Move toward the final transaction with clear communication and the agreed commission structure.',

    /* commission */
    'com.eyebrow': 'Commission',
    'com.title': 'One clear commission.',
    'com.label': 'Fixed commission',
    'com.lead': 'A transparent flat commission structure designed to keep the transaction clear and straightforward.',

    /* about */
    'about.eyebrow': 'About',
    'about.title': 'Youssef Hany',
    'about.lead': 'Youssef Hany — Luxury & Exotics operates around luxury and exotic automotive brokerage, helping clients buy, sell, and source premium vehicles through a direct owner-to-owner approach and market-based pricing.',

    /* social */
    'soc.eyebrow': 'Follow',
    'soc.title': 'Stay close to the cars',
    'soc.lead': 'Follow Youssef on Instagram <strong dir="ltr">@youssefhany911m4</strong> and Facebook.',
    'soc.ig': 'Instagram',
    'soc.fb': 'Facebook',

    /* faq */
    'faq.eyebrow': 'FAQ',
    'faq.title': 'Good to know',
    'faq.1.q': 'What type of vehicles do you work with?',
    'faq.1.a': 'Luxury, exotic, premium, and performance vehicles, including new and used automobiles.',
    'faq.2.q': 'How is a used vehicle priced?',
    'faq.2.a': 'Used vehicle pricing is based on current market value.',
    'faq.3.q': 'What is the commission?',
    'faq.3.a': 'The commission is a fixed 1%.',
    'faq.4.q': 'Can you help me find a specific vehicle?',
    'faq.4.a': 'Yes, clients can contact Youssef regarding sourcing a specific vehicle.',
    'faq.5.q': 'How can I contact Youssef?',
    'faq.5.a': 'Through WhatsApp, phone, email, Instagram, or Facebook.',

    /* contact */
    'con.eyebrow': 'Contact',
    'con.title': 'Looking for your next car?',
    'con.lead': "Whether you're buying, selling, or looking for a specific vehicle, start the conversation directly.",
    'con.cta': 'Contact Youssef',
    'con.call': 'Call Now',
    'con.mail': 'Send an Email',
    'con.open': 'Always Open',

    /* footer */
    'foot.nav': 'Navigate',
    'foot.navLabel': 'Footer navigation',
    'foot.contact': 'Contact',
    'foot.wa': 'WhatsApp / Phone:',
    'foot.social': 'Social',
    'foot.legal': '© {year} Youssef Hany — Luxury & Exotics',

    /* dialogs */
    'dlg.eyebrow': 'Vehicle details',
    'dlg.close': 'Close vehicle details',
    'dlg.prev': 'Previous photo',
    'dlg.next': 'Next photo',
    'dlg.zoom': 'Full screen',
    'dlg.call': 'Call Now',
    'dlg.thumb': 'Show photo {i} of {n}',
    'lb.label': 'Photo viewer',
    'lb.close': 'Close photo viewer',

    /* WhatsApp messages (URL-encoded by the code) */
    'wa.general': "Hello Youssef Hany, I'd like to ask about a vehicle.",
    'wa.search': "Hello Youssef Hany, I'm looking for a specific vehicle.",
    'wa.vehicle': 'Hello Youssef Hany, I am interested in the {name} {year} listed at {price}. I would like to know more details about this vehicle.',
    'wa.vehicleNoPrice': 'Hello Youssef Hany, I am interested in the {name} {year}. I would like to know more details about this vehicle.'
  },

  ar: {
    _meta: { name: 'العربية', short: 'AR', dir: 'rtl', htmlLang: 'ar', locale: 'ar_EG', switchTo: 'التبديل إلى العربية', order: 2 },

    'meta.title': 'يوسف هاني | وساطة السيارات الفاخرة والنادرة في مصر',
    'meta.desc': 'يوسف هاني للسيارات الفاخرة والنادرة — تشكيلة مختارة من السيارات الفاخرة والنادرة في مصر، بأسعار واضحة وتواصل مباشر عبر واتساب.',
    'meta.ogTitle': 'يوسف هاني | وساطة السيارات الفاخرة والنادرة في مصر',
    'meta.ogDesc': 'تشكيلة مختارة من السيارات الفاخرة والنادرة في مصر. اطّلع على التفاصيل والأسعار، ثم تواصل مع يوسف هاني مباشرةً عبر واتساب.',
    'meta.twDesc': 'تشكيلة مختارة من السيارات الفاخرة والنادرة في مصر. تواصل مع يوسف هاني مباشرةً عبر واتساب.',
    'meta.imgAlt': 'رولز رويس كولينان مع شعار يوسف هاني — السيارات الفاخرة والنادرة',
    'meta.siteName': 'يوسف هاني — السيارات الفاخرة والنادرة',

    'skip': 'انتقل إلى المحتوى',
    'nav.label': 'التنقل الرئيسي',
    'nav.home': 'الرئيسية',
    'nav.cars': 'السيارات',
    'nav.services': 'الخدمات',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',
    'nav.whatsapp': 'واتساب',
    'menu.open': 'فتح القائمة',
    'menu.close': 'إغلاق القائمة',
    'brand.home': 'يوسف هاني — السيارات الفاخرة والنادرة، الصفحة الرئيسية',
    'brand.logoAlt': 'يوسف هاني — السيارات الفاخرة والنادرة',
    'lang.label': 'اللغة',
    'lang.changed': 'تم تغيير اللغة إلى العربية',

    'hero.eyebrow': 'وساطة السيارات الفاخرة والنادرة',
    'hero.name': 'يوسف هاني',
    'hero.tag': 'السيارات الفاخرة والنادرة',
    'hero.text': 'تشكيلة مميزة من السيارات تُختار بعناية لعملاء يقدّرون الجودة والمواصفات والشفافية والقيمة السوقية.',
    'hero.explore': 'استكشف السيارات',
    'hero.wa': 'تواصل عبر واتساب',
    'hero.factsLabel': 'أبرز الشروط',
    'hero.f1': 'من مالك إلى مالك',
    'hero.f2': 'تسعير وفق السوق',
    'hero.f3': 'عمولة ثابتة 1%',

    'inv.eyebrow': 'المخزون الحالي',
    'inv.title': 'السيارات المتاحة',
    'inv.lead': 'تشكيلة مختارة من السيارات الفاخرة لدى يوسف هاني. افتح أي سيارة لمشاهدة الصور والتفاصيل، أو تواصل مع يوسف مباشرةً بشأنها.',
    'inv.empty': 'لا توجد سيارات معروضة حاليًا. راسل يوسف عبر واتساب للاستفسار عن المتاح.',
    'filter.label': 'تصفية السيارات حسب الماركة',
    'filter.all': 'الكل',
    'inv.status.one': 'عرض سيارة واحدة',
    'inv.status.two': 'عرض سيارتين',
    'inv.status.few': 'عرض {n} سيارات',
    'inv.status.many': 'عرض {n} سيارة',
    'inv.status.other': 'عرض {n} سيارة',
    'photos.one': 'صورة واحدة',
    'photos.two': 'صورتان',
    'photos.few': '{n} صور',
    'photos.many': '{n} صورة',
    'photos.other': '{n} صورة',

    'card.view': 'عرض التفاصيل',
    'card.wa': 'تواصل عبر واتساب',
    'card.viewAria': 'عرض تفاصيل {name}',
    'card.waAria': 'التواصل عبر واتساب بخصوص {name}',
    'label.year': 'السنة',
    'label.mileage': 'عدد الكيلومترات',
    'label.condition': 'الحالة',
    'label.location': 'الموقع',
    'label.price': 'السعر',
    'price.note': 'السعر قابل للتفاوض عند المعاينة',
    'label.trim': 'الفئة',
    'label.package': 'الباقة',
    'label.body': 'نوع الهيكل',
    'label.spec': 'التجهيزات',
    'fmt.price': '{amount} {cur}',
    'fmt.km': '{n} كم',
    'cur.EGP': 'جنيه مصري',
    'alt.base': 'سيارة {name} موديل {year} {detail}',
    'alt.view': '{base} — {view}',
    'tag.zero': 'زيرو',

    'v.amg-premium-plus': 'AMG Premium Plus',
    'v.amg-night-package': 'AMG Night Package',
    'v.black-package': 'Black Package',
    'v.fully-loaded': 'كاملة التجهيزات',
    'v.convertible': 'كابريوليه',
    'v.zero': 'زيرو / جديدة',
    'v.fifth-settlement': 'التجمع الخامس',
    'v.al-obour': 'العبور',
    'v.nasr-city': 'مدينة نصر',
    'view.front': 'منظر أمامي',
    'view.rear': 'منظر خلفي',
    'view.interior': 'المقصورة الداخلية',
    'view.grille': 'الشبك الأمامي',

    'src.title': 'سيارة محددة',
    'src.text': 'هل تبحث عن ماركة أو طراز أو مواصفات بعينها؟ أخبر يوسف بما تحتاجه.',
    'src.btn': 'ابدأ البحث',

    'dir.eyebrow': 'نهجنا',
    'dir.title': 'مباشر. شفاف. متميز.',
    'dir.lead': 'يركّز يوسف هاني على الصفقات المباشرة بين المالك والمشتري، دون وسطاء لا حاجة إليهم بين الطرفين.',
    'dir.1.t': 'تعامل مباشر',
    'dir.1.p': 'صفقات سيارات من مالك إلى مالك.',
    'dir.2.t': 'تسعير وفق السوق',
    'dir.2.p': 'تُقيَّم السيارات المستعملة وفقًا لقيمتها الفعلية في السوق.',
    'dir.3.t': 'عمولة ثابتة 1%',
    'dir.3.p': 'نظام عمولة واضح وثابت بنسبة 1%.',

    'brands.eyebrow': 'نطاق التركيز',
    'brands.title': 'الماركات محل الاهتمام',
    'brands.lead': 'الماركات التي يعمل يوسف هاني في نطاقها. وساطة مستقلة، ولا يُقصد بها أي ارتباط بالوكالات الرسمية.',

    'svc.eyebrow': 'الخدمات',
    'svc.title': 'أربع طرق للتعاون معنا',
    'svc.1.t': 'الشراء',
    'svc.1.p': 'نساعد العملاء على اختيار السيارات الفاخرة أو المميزة التي تناسب احتياجاتهم وميزانيتهم.',
    'svc.2.t': 'البيع',
    'svc.2.p': 'نُيسّر بيع السيارات الفاخرة والمميزة المستعملة بناءً على قيمتها الحالية في السوق.',
    'svc.3.t': 'البحث',
    'svc.3.p': 'نساعد العملاء في العثور على سيارة أو طراز بعينه.',
    'svc.4.t': 'الاستشارة',
    'svc.4.p': 'نقدّم الإرشاد عند المفاضلة بين السيارات والطرازات والخيارات المتاحة.',

    'proc.eyebrow': 'آلية العمل',
    'proc.title': 'بسيطة، من أول رسالة حتى إتمام الصفقة',
    'proc.1.t': 'الاستكشاف',
    'proc.1.p': 'أخبر يوسف بالسيارة التي تبحث عنها أو التي ترغب في بيعها.',
    'proc.2.t': 'التقييم',
    'proc.2.p': 'مناقشة السيارة والمتطلبات والقيمة السوقية المناسبة.',
    'proc.3.t': 'التواصل المباشر',
    'proc.3.p': 'تسهيل الاتفاق المباشر بين الأطراف المعنية.',
    'proc.4.t': 'الإتمام',
    'proc.4.p': 'الوصول إلى الصفقة النهائية بتواصل واضح ووفق نظام العمولة المتفق عليه.',

    'com.eyebrow': 'العمولة',
    'com.title': 'عمولة واحدة واضحة.',
    'com.label': 'عمولة ثابتة',
    'com.lead': 'نظام عمولة ثابتة وشفافة يُبقي الصفقة واضحة ومباشرة.',

    'about.eyebrow': 'من نحن',
    'about.title': 'يوسف هاني',
    'about.lead': 'يوسف هاني — السيارات الفاخرة والنادرة متخصص في الوساطة في سوق السيارات الفاخرة والنادرة، ويساعد العملاء على شراء السيارات المميزة وبيعها والبحث عنها، من خلال التعامل المباشر بين المالك والمشتري والتسعير وفق السوق.',

    'soc.eyebrow': 'تابعنا',
    'soc.title': 'ابقَ قريبًا من السيارات',
    'soc.lead': 'تابع يوسف على إنستغرام <strong dir="ltr">@youssefhany911m4</strong> وعلى فيسبوك.',
    'soc.ig': 'إنستغرام',
    'soc.fb': 'فيسبوك',

    'faq.eyebrow': 'الأسئلة الشائعة',
    'faq.title': 'معلومات مفيدة',
    'faq.1.q': 'ما أنواع السيارات التي تتعاملون معها؟',
    'faq.1.a': 'السيارات الفاخرة والنادرة والمميزة وعالية الأداء، الجديدة منها والمستعملة.',
    'faq.2.q': 'كيف يتم تسعير السيارة المستعملة؟',
    'faq.2.a': 'يعتمد تسعير السيارات المستعملة على قيمتها الحالية في السوق.',
    'faq.3.q': 'ما قيمة العمولة؟',
    'faq.3.a': 'العمولة ثابتة بنسبة 1%.',
    'faq.4.q': 'هل يمكنكم مساعدتي في العثور على سيارة محددة؟',
    'faq.4.a': 'نعم، يمكن للعملاء التواصل مع يوسف للبحث عن سيارة بعينها.',
    'faq.5.q': 'كيف يمكنني التواصل مع يوسف؟',
    'faq.5.a': 'عبر واتساب أو الهاتف أو البريد الإلكتروني أو إنستغرام أو فيسبوك.',

    'con.eyebrow': 'تواصل معنا',
    'con.title': 'تبحث عن سيارتك القادمة؟',
    'con.lead': 'سواء كنت ترغب في الشراء أو البيع أو البحث عن سيارة محددة، ابدأ الحديث معنا مباشرةً.',
    'con.cta': 'تواصل مع يوسف',
    'con.call': 'اتصل الآن',
    'con.mail': 'أرسل بريدًا إلكترونيًا',
    'con.open': 'متاح دائمًا',

    'foot.nav': 'التنقل',
    'foot.navLabel': 'التنقل في أسفل الصفحة',
    'foot.contact': 'التواصل',
    'foot.wa': 'واتساب / هاتف:',
    'foot.social': 'التواصل الاجتماعي',
    'foot.legal': '© {year} يوسف هاني — السيارات الفاخرة والنادرة',

    'dlg.eyebrow': 'تفاصيل السيارة',
    'dlg.close': 'إغلاق تفاصيل السيارة',
    'dlg.prev': 'الصورة السابقة',
    'dlg.next': 'الصورة التالية',
    'dlg.zoom': 'ملء الشاشة',
    'dlg.call': 'اتصل الآن',
    'dlg.thumb': 'عرض الصورة {i} من {n}',
    'lb.label': 'عارض الصور',
    'lb.close': 'إغلاق عارض الصور',

    'wa.general': 'مرحبًا يوسف هاني، أرغب في الاستفسار عن إحدى السيارات.',
    'wa.search': 'مرحبًا يوسف هاني، أبحث عن سيارة محددة وأرغب في مساعدتك.',
    'wa.vehicle': 'مرحبًا يوسف هاني، أنا مهتم بسيارة {name} موديل {year} المعروضة بسعر {price}، وأرغب في معرفة المزيد من التفاصيل عنها.',
    'wa.vehicleNoPrice': 'مرحبًا يوسف هاني، أنا مهتم بسيارة {name} موديل {year}، وأرغب في معرفة المزيد من التفاصيل عنها.'
  }
};
