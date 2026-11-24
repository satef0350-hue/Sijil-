const B='https://www.gstatic.com/firebasejs/10.14.1/';
(async()=>{try{
const [ap,au,fs,cfg]=await Promise.all([import(B+'firebase-app.js'),import(B+'firebase-auth.js'),import(B+'firebase-firestore.js'),import('./firebase-config.js')]);
// اختبار IndexedDB: لو مش شغال (آيفون/تصفح خاص/ذاكرة ممتلئة) بنشتغل بدونه بدل ما التطبيق يعلّق
const idb=await new Promise(r=>{let d=false;const f=v=>{if(!d){d=true;r(v)}};try{const q=indexedDB.open('_sijil_test');q.onsuccess=()=>{try{q.result.close()}catch(e){}f(true)};q.onerror=()=>f(false);q.onblocked=()=>f(false)}catch(e){f(false)}setTimeout(()=>f(false),2500)});
const app=ap.initializeApp(cfg.firebaseConfig);
const auth=au.initializeAuth(app,{persistence:idb?[au.indexedDBLocalPersistence,au.browserLocalPersistence,au.browserSessionPersistence]:[au.browserLocalPersistence,au.browserSessionPersistence,au.inMemoryPersistence]});
const db=fs.initializeFirestore(app,{localCache:idb?fs.persistentLocalCache({tabManager:fs.persistentMultipleTabManager()}):fs.memoryLocalCache(),experimentalAutoDetectLongPolling:true});
let uid=null;const P=p=>fs.doc(db,'users',uid,...p.split('/')),log=e=>console.error(e);
window.FB={
 set:(p,d)=>fs.setDoc(P(p),d,{merge:true}).catch(log),
 upd:(p,d)=>fs.updateDoc(P(p),d).catch(log),
 rm:p=>fs.deleteDoc(P(p)).catch(log),del:fs.deleteField,
 in:(e,p)=>au.signInWithEmailAndPassword(auth,e,p),up:(e,p)=>au.createUserWithEmailAndPassword(auth,e,p),out:()=>au.signOut(auth),
 user:cb=>au.onAuthStateChanged(auth,u=>{uid=u?u.uid:null;cb(u)}),
 sub:cb=>{const us=['students','att','exams','meta'].map(k=>fs.onSnapshot(fs.collection(db,'users',uid,k),{includeMetadataChanges:true},s=>cb(k,s.docs.map(d=>({id:d.id,...d.data()})),s.metadata.hasPendingWrites,s.docChanges().length>0)));return()=>us.forEach(f=>f())}
};
window.FBMODE=idb?'persistent':'memory';
dispatchEvent(new Event('fb'));
}catch(e){window.FBERR=String(e&&e.message||e)}})();
