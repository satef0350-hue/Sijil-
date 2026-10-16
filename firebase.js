import{initializeApp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getAuth,onAuthStateChanged,signInWithEmailAndPassword as si,createUserWithEmailAndPassword as cu,signOut}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import{initializeFirestore,persistentLocalCache,persistentMultipleTabManager,doc,collection,setDoc,updateDoc,deleteDoc,deleteField,onSnapshot}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import{firebaseConfig}from"./firebase-config.js";
const app=initializeApp(firebaseConfig),auth=getAuth(app);
const db=initializeFirestore(app,{localCache:persistentLocalCache({tabManager:persistentMultipleTabManager()})});
let uid=null;const P=p=>doc(db,'users',uid,...p.split('/')),log=e=>console.error(e);
window.FB={
 set:(p,d)=>setDoc(P(p),d,{merge:true}).catch(log),
 upd:(p,d)=>updateDoc(P(p),d).catch(log),
 rm:p=>deleteDoc(P(p)).catch(log),del:deleteField,
 in:(e,p)=>si(auth,e,p),up:(e,p)=>cu(auth,e,p),out:()=>signOut(auth),
 user:cb=>onAuthStateChanged(auth,u=>{uid=u?u.uid:null;cb(u)}),
 sub:cb=>{const us=['students','att','exams','meta'].map(k=>onSnapshot(collection(db,'users',uid,k),{includeMetadataChanges:true},s=>cb(k,s.docs.map(d=>({id:d.id,...d.data()})),s.metadata.hasPendingWrites,s.docChanges().length>0)));return()=>us.forEach(f=>f())}
};
dispatchEvent(new Event('fb'));
