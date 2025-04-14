import"./output-B_l4csH6.js";import{initializeApp as T}from"https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";import{getAuth as N,onAuthStateChanged as x,signInWithEmailAndPassword as D,signOut as L}from"https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";import{getDatabase as C,get as V,ref as E,set as k,remove as M}from"https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";window.ENV={VITE_API_URL:"https://production-api-url.com",VITE_APP_TITLE:"Air Quality Monitor",VITE_FIREBASE_API_KEY:"AIzaSyDS-Nk3hefhYqri9fntp0vNtX7wThrAIsE",VITE_FIREBASE_APP_ID:"1:529860642391:web:e01858f90587f5d77c0512",VITE_FIREBASE_AUTH_DOMAIN:"yodeckairq.firebaseapp.com",VITE_FIREBASE_DATABASE_URL:"https://yodeckairq-default-rtdb.europe-west1.firebasedatabase.app",VITE_FIREBASE_MESSAGING_SENDER_ID:"529860642391",VITE_FIREBASE_PROJECT_ID:"yodeckairq",VITE_FIREBASE_STORAGE_BUCKET:"yodeckairq.firebasestorage.app"};var p,y,I,f,h,w,b;const U={apiKey:((p=window.ENV)==null?void 0:p.VITE_FIREBASE_API_KEY)||"AIzaSyDS-Nk3hefhYqri9fntp0vNtX7wThrAIsE",authDomain:((y=window.ENV)==null?void 0:y.VITE_FIREBASE_AUTH_DOMAIN)||"yodeckairq.firebaseapp.com",databaseURL:((I=window.ENV)==null?void 0:I.VITE_FIREBASE_DATABASE_URL)||"https://yodeckairq-default-rtdb.europe-west1.firebasedatabase.app",projectId:((f=window.ENV)==null?void 0:f.VITE_FIREBASE_PROJECT_ID)||"yodeckairq",storageBucket:((h=window.ENV)==null?void 0:h.VITE_FIREBASE_STORAGE_BUCKET)||"yodeckairq.firebasestorage.app",messagingSenderId:((w=window.ENV)==null?void 0:w.VITE_FIREBASE_MESSAGING_SENDER_ID)||"529860642391",appId:((b=window.ENV)==null?void 0:b.VITE_FIREBASE_APP_ID)||"1:529860642391:web:e01858f90587f5d77c0512"},S=T(U),l=N(S),g=C(S),$=async(e,t)=>{try{const o=await D(l,e,t);return new Promise(n=>{const r=x(l,s=>{s&&(r(),n({success:!0,user:o.user}))})})}catch(o){return{success:!1,error:o.message}}},O=async()=>{try{return await L(l),{success:!0}}catch(e){return{success:!1,error:e.message}}},R=async e=>{try{const t=l.currentUser;if(!t)throw new Error("Not authenticated");const o=e.template||"default";if(!["default","glass"].includes(o))throw new Error("Invalid template selection");return await k(E(g,`rooms/${e.id}`),{...e,template:o,updatedAt:Date.now(),updatedBy:t.email}),{success:!0}}catch(t){return{success:!1,error:t.message}}},q=async()=>{try{const e=await V(E(g,"rooms"));return e.exists()?{success:!0,rooms:Object.values(e.val())}:{success:!0,rooms:[]}}catch(e){return{success:!1,error:e.message}}},F=async e=>{try{if(!l.currentUser)throw new Error("Not authenticated");return await M(E(g,`rooms/${e}`)),{success:!0}}catch(t){return{success:!1,error:t.message}}},P=e=>x(l,e);let A=null,d=[];const i={dark:{container:"bg-gradient-to-br from-slate-900 to-slate-800",text:"text-white",subtext:"text-slate-400",card:"bg-white/5 backdrop-blur-sm",select:"bg-slate-700 border-slate-600 text-white",stats:"bg-white/5",button:"bg-blue-500 hover:bg-blue-600 text-white",header:"text-white/90",description:"text-slate-400"}};let m="dark";P(e=>{console.log("Auth state changed:",e),A=e,e||(d=[])});document.getElementById("loginForm").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("loginEmail").value,o=document.getElementById("loginPassword").value,n=document.getElementById("loginError"),r=e.target.querySelector('button[type="submit"]'),s=document.getElementById("loginScreen"),c=document.getElementById("dashboard");try{console.log("Attempting login..."),r.disabled=!0,r.textContent="Signing in...",n.classList.add("hidden");const a=await $(t,o);if(console.log("Login result:",a),!a.success)throw new Error(a.error||"Login failed");await u(),s.style.display="none",c.style.display="block",c.classList.remove("hidden")}catch(a){console.error("Login error:",a),n.textContent=a.message,n.classList.remove("hidden")}finally{r.disabled=!1,r.textContent="Sign In"}});window.handleLogout=async()=>{try{await O(),window.location.reload()}catch(e){console.error("Logout error:",e)}};async function u(){try{console.log("Loading rooms...");const e=await q();if(console.log("Rooms result:",e),e.success)d=e.rooms||[],H(),B();else throw new Error(e.error)}catch(e){console.error("Error loading rooms:",e)}}window.showAddRoomModal=()=>{document.getElementById("addRoomModal").classList.remove("hidden"),document.getElementById("addRoomModal").classList.add("flex")};window.hideAddRoomModal=()=>{document.getElementById("addRoomModal").classList.remove("flex"),document.getElementById("addRoomModal").classList.add("hidden")};window.handleAddRoom=async e=>{e.preventDefault();const t=document.getElementById("roomName").value,o=document.getElementById("deviceId").value,n=document.getElementById("templateStyle").value,r={id:o,name:t,templateStyle:n,apiUrl:`https://ezdata2.m5stack.com/api/v2/${o}/dataMacByKey/raw`};try{(await R(r)).success&&(await u(),hideAddRoomModal(),e.target.reset())}catch(s){console.error("Error adding room:",s)}};window.editRoom=e=>{const t=d.find(n=>n.id===e);if(!t)return;document.getElementById("roomName").value=t.name,document.getElementById("deviceId").value=t.id,document.getElementById("templateStyle").value=t.templateStyle||"default";const o=document.querySelector("#addRoomModal form");o.onsubmit=n=>handleEditRoom(n,e),document.querySelector("#addRoomModal h2").textContent="Edit Room",document.getElementById("roomSubmitButton").textContent="Update",showAddRoomModal()};window.handleEditRoom=async(e,t)=>{e.preventDefault();const o=document.getElementById("roomName").value,n=document.getElementById("deviceId").value,r=document.getElementById("templateStyle").value,s={id:n,name:o,templateStyle:r,apiUrl:`https://ezdata2.m5stack.com/api/v2/${n}/dataMacByKey/raw`};try{(await R(s)).success&&(await u(),hideAddRoomModal(),e.target.reset(),e.target.onsubmit=handleAddRoom,document.querySelector("#addRoomModal h2").textContent="Add New Room",document.getElementById("roomSubmitButton").textContent="Add Room")}catch(c){console.error("Error updating room:",c)}};window.deleteRoom=async e=>{if(confirm("Are you sure you want to delete this room?"))try{(await F(e)).success&&await u()}catch(t){console.error("Error deleting room:",t)}};function H(){const e=document.getElementById("roomsGrid");e.innerHTML="",d.forEach(t=>{e.appendChild(G(t)),_(t.id)})}function G(e){const t=document.createElement("div");return t.className=`${i[m].card} rounded-xl p-6`,t.innerHTML=`
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-1">
                            <h2 class="text-xl font-bold ${i[m].text}">${e.name}</h2>
                            <span id="status-${e.id}" class="px-2 py-0.5 text-xs rounded-full bg-slate-500/20 text-slate-300">Checking...</span>
                        </div>
                        <p class="${i[m].subtext} text-sm">Device ID: ${e.id}</p>
                        <a href="https://airq.m5stack.com/${e.id}" 
                           target="_blank" 
                           class="text-blue-400 hover:text-blue-300 text-sm mt-1 inline-block transition-colors">
                            View Original Dashboard →
                        </a>
                    </div>
                    <div class="flex gap-3">
                        <a href="./templates/room.html?deviceId=${e.id}&name=${encodeURIComponent(e.name)}&templateStyle=${e.templateStyle}" 
                           target="_blank" 
                           class="${i[m].button} px-4 py-2 rounded-lg text-sm transition-colors">
                            View Widget
                        </a>
                        <button onclick="editRoom('${e.id}')" 
                                class="px-4 py-2 bg-slate-500/20 hover:bg-slate-500/30 text-slate-300 rounded-lg text-sm transition-colors">
                            Edit
                        </button>
                        <button onclick="deleteRoom('${e.id}')" 
                                class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-colors">
                            Delete
                        </button>
                    </div>
                </div>
            `,t}async function _(e){const t=document.getElementById(`status-${e}`);try{const o=d.find(v=>v.id===e),r=await(await fetch(o.apiUrl)).json();if(!r||r.code!==200||!r.data)throw new Error("Invalid response format");const s=parseInt(r.data.updateTime),a=Math.floor(Date.now()/1e3)-s;a<=90?(t.className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300",t.textContent="Online"):a<=300?(t.className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-300",t.textContent="Stale"):(t.className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300",t.textContent="Offline")}catch(o){t.className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300",t.textContent=o.message==="Invalid response format"?"Invalid Response":"No Connection"}}function B(){document.getElementById("totalRooms").textContent=d.length;const e=new Date,t=e.toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}),o=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});document.getElementById("lastUpdateDate").textContent=t,document.getElementById("lastUpdateTime").textContent=o}setInterval(()=>{A&&(d.forEach(e=>_(e.id)),B())},3e4);
