const chartColumnContainer=document.querySelector(".chart-column-container"),fetchBarDetails=async function(){const e=await fetch("./constant/data.json"),t=await e.json();addBarToDom(t)},createBarInfo=(e,t)=>{console.log(t);const n=document.createElement("div"),a=document.createElement("p");n.classList.add("info-container"),n.style.opacity="1",n.style.bottom=`calc(${t}% + 10%)`,a.classList.add("info-text"),n.appendChild(a),a.innerText=` $${t}`,e.appendChild(n)},removeBarInfo=()=>{document.querySelector(".info-container").remove()},addBarToDom=function(e){e.forEach((e=>{const t=document.createElement("div"),n=document.createElement("div"),a=document.createElement("div"),o=document.createElement("div"),c=document.createElement("p");a.style.height=`${e?.amount}%`,a.style.background=`${e?.color}`,t.classList.add("chart-column"),n.classList.add("chart-column-bar"),a.classList.add("chart-column-inner-bar"),o.classList.add("chart-column-name"),t.appendChild(n),t.appendChild(o),n.appendChild(a),o.appendChild(c),c.innerText=e?.day,chartColumnContainer.appendChild(t),a.addEventListener("mouseenter",(()=>{a.style.opacity="0.5",createBarInfo(n,e?.amount)})),a.addEventListener("mouseleave",(()=>{a.style.opacity="1",document.querySelector(".info-container").remove()}))}))};fetchBarDetails();
//# sourceMappingURL=script.js.map