# سجل الطلاب — خطوات التشغيل

## 1) Firebase (مجاني)
1. ادخلي console.firebase.google.com ← Add project.
2. من Project settings ← Your apps ← أيقونة الويب `</>` ← سجّلي التطبيق وانسخي بيانات `firebaseConfig`.
3. الصقيها في ملف `firebase-config.js`.
4. Build ← Authentication ← Get started ← Sign-in method ← فعّلي **Email/Password**.
5. Build ← Firestore Database ← Create database (Production mode).
6. تبويب **Rules** ← امسحي المكتوب والصقي محتوى `firestore.rules` ← Publish.

## 2) GitHub Pages
1. أنشئي Repository جديد (Public) وارفعي كل الملفات في الجذر (بدون مجلد داخلي).
2. Settings ← Pages ← Source: Deploy from a branch ← main / root ← Save.
3. بعد دقيقة الرابط هيبقى `https://USERNAME.github.io/REPO/`.
4. في Firebase: Authentication ← Settings ← Authorized domains ← Add domain ← `USERNAME.github.io`.

## 3) الاستخدام
- افتحي الرابط **مرة واحدة وفيه نت** وسجّلي حساب جديد (أو دخول).
- من المتصفح: ⋮ ← Add to Home screen لتثبيته كتطبيق.
- أوفلاين: سجّلي حضور/درجات عادي، وأول ما النت يرجع بتترفع للسحابة تلقائيًا (الشريط فوق بيوضح الحالة).
- كل حساب بياناته منفصلة ومحمية بالقواعد.
