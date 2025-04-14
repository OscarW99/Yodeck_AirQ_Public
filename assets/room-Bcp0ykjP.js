function E(i){return console.log("Validating device ID:",i),i?!0:(console.log("Device ID is empty or null"),!1)}function D(i){if(!i)return"";const o=document.createElement("div");return o.textContent=i,o.innerHTML}function C(i){const o=i.get("deviceId"),s=i.get("name")||"Air Quality Monitor";if(!E(o))throw console.error("Invalid device ID provided"),new Error("Invalid device ID");return{id:o,name:D(s),apiUrl:`https://ezdata2.m5stack.com/api/v2/${o}/dataMacByKey/raw`}}(function(){if(typeof DEVICE_CONFIG>"u"){console.log("DEVICE_CONFIG not found, waiting for it to be defined...");const o=setInterval(function(){typeof window.DEVICE_CONFIG<"u"&&(console.log("DEVICE_CONFIG found, initializing room data"),clearInterval(o),i(window.DEVICE_CONFIG,window.themeConfig))},100)}else console.log("DEVICE_CONFIG already defined, initializing room data"),i(DEVICE_CONFIG,themeConfig);function i(o,s){async function u(){try{console.log("Attempting to fetch data from:",o.apiUrl),console.log("DEVICE_CONFIG:",o);const e=await fetch(o.apiUrl);console.log("Response received:",e.status);const t=await e.json();if(console.log("Response data:",t),!t||t.code!==200||!t.data||!t.data.value)throw new Error("Invalid data format");y(t.data.updateTime);const a=t.data.value.replace(/\\/g,""),r=JSON.parse(a),l=document.getElementById("airQualityData");l.innerHTML=b(r,s)}catch(e){console.error("Error fetching data:",e),document.getElementById("airQualityData").innerHTML=`
                    <div class="text-red-400 p-4 rounded-lg bg-red-500/10">
                        ${e.message==="Invalid data format"?"Error: Invalid response from device":"Error: Unable to connect to device"}
                    </div>
                `;const t=document.getElementById("roomStatus");t.className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300",t.textContent=e.message==="Invalid data format"?"Invalid Response":"No Connection"}}function y(e){const t=document.getElementById("roomStatus"),r=Math.floor(Date.now()/1e3)-parseInt(e);r<=90?(t.className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300",t.textContent="Online"):r<=300?(t.style.cssText="padding: 2px 8px; font-size: 0.75rem; border-radius: 9999px; background-color: rgba(234, 179, 8, 0.2); color: #facc15;",t.textContent="Stale"):(t.className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-300",t.textContent="Offline")}function b(e,t){var l,d,p,f,v,g,x,I;const a=t||{metrics:{humidity:{bg:"from-cyan-500/10 to-blue-500/10",text:"text-cyan-300"},pm:{bg:"from-violet-500/10 to-purple-500/10",text:"text-violet-300"},voc:{bg:"from-emerald-500/10 to-green-500/10",text:"text-emerald-300"},nox:{bg:"from-amber-500/10 to-yellow-500/10",text:"text-amber-300"},co2:{bg:"from-rose-500/10 to-red-500/10",text:"text-rose-300"}},values:"text-white"};return[{title:"Humidity",type:"humidity",value:(l=e.sen55)==null?void 0:l.humidity,unit:"%",description:"Relative air humidity"},{title:"Particulate Matter",type:"pm",measurements:[{label:"PM 1.0",value:(d=e.sen55)==null?void 0:d["pm1.0"],unit:"μg/m³"},{label:"PM 2.5",value:(p=e.sen55)==null?void 0:p["pm2.5"],unit:"μg/m³"},{label:"PM 4.0",value:(f=e.sen55)==null?void 0:f["pm4.0"],unit:"μg/m³"},{label:"PM 10.0",value:(v=e.sen55)==null?void 0:v["pm10.0"],unit:"μg/m³"}]},{title:"VOC Index",type:"voc",value:(g=e.sen55)==null?void 0:g.voc,unit:"ppb",description:"Volatile Organic Compounds"},{title:"NOx Index",type:"nox",value:(x=e.sen55)==null?void 0:x.nox,unit:"ppb",description:"Nitrogen Oxides"},{title:"CO2",type:"co2",value:(I=e.scd40)==null?void 0:I.co2,unit:"ppm",description:"Carbon Dioxide"}].map(n=>n.measurements?`
                        <div class="rounded-xl p-6 bg-gradient-to-br ${a.metrics[n.type].bg}">
                            <h2 class="text-lg font-semibold mb-4 ${a.metrics[n.type].text}">${n.title}</h2>
                            <div class="grid grid-cols-2 gap-4">
                                ${n.measurements.map(c=>`
                                    <div>
                                        <div class="text-sm ${a.metrics[n.type].text}">${c.label}</div>
                                        <div class="text-2xl font-bold ${a.values}">${m(c.value,c.unit)}</div>
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:`
                        <div class="rounded-xl p-6 bg-gradient-to-br ${a.metrics[n.type].bg}">
                            <h2 class="text-lg font-semibold mb-1 ${a.metrics[n.type].text}">${n.title}</h2>
                            <div class="text-3xl font-bold mb-2 ${a.values}">${m(n.value,n.unit)}</div>
                            <div class="text-sm ${a.metrics[n.type].text}">${n.description}</div>
                        </div>
                    `).join("")}function m(e,t){return e==null?"N/A":`${Number(e).toFixed(1)}${t}`}u(),setInterval(u,3e4)}})();fetchAndDisplayData();setInterval(fetchAndDisplayData,3e4);export{D as s,C as v};
