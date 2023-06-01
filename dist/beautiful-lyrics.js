var beautifulDlyrics=(()=>{var t=new Set;function r(){for(;;){var e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)});if(!1===t.has(e))return t.add(e),e}}var e,O=class{constructor(){this.Items=new Map,this.DestroyedState=!1}Push(e){var t=r();return this.Items.set(t,e),t}Get(e){return this.Items.get(e)}Remove(e){var t=this.Items.get(e);if(void 0!==t)return this.Items.delete(e),t}GetIterator(){return this.Items.entries()}IsDestroyed(){return this.DestroyedState}Destroy(){this.DestroyedState||(this.DestroyedState=!0,delete this.Items)}},i=class{constructor(e,t){this.ConnectionReferences=e,this.Disconnected=!1,this.Location=e.Push({Callback:t,Connection:this})}Disconnect(){this.Disconnected||(this.Disconnected=!0,this.ConnectionReferences.Remove(this.Location),delete this.Location,delete this.Callback,delete this.SignalConnections)}IsDisconnected(){return this.Disconnected}},A=class{constructor(e){this.Signal=e}Connect(e){return this.Signal.Connect(e)}IsDestroyed(){return this.Signal.IsDestroyed()}},n=class{constructor(){this.ConnectionReferences=new O,this.DestroyedState=!1}Connect(e){if(this.DestroyedState)throw"Cannot connect to a Destroyed Signal";return new i(this.ConnectionReferences,e)}Fire(...e){if(this.DestroyedState)throw"Cannot fire a Destroyed Signal";for(var[t,r]of this.ConnectionReferences.GetIterator())r.Callback(...e)}GetEvent(){return new A(this)}IsDestroyed(){return this.DestroyedState}Destroy(){if(!this.DestroyedState){for(var[e,t]of this.ConnectionReferences.GetIterator())t.Connection.Disconnect();this.DestroyedState=!0,delete this.ConnectionReferences}}},_=e=>e instanceof i,o=class{constructor(e,t){this.Cleaner=e,this.Id=t}Cancel(){void 0!==this.Id&&(this.Cleaner(this.Id),delete this.Id,delete this.Cleaner)}},s=(e,t)=>new o(window.clearTimeout.bind(window),setTimeout(t,1e3*e)),j=e=>e instanceof o,y=class{constructor(){this.Items=new Map,this.DestroyedState=!1,this.DestroyingSignal=new n,this.CleanedSignal=new n,this.DestroyedSignal=new n,this.Destroying=this.DestroyingSignal.GetEvent(),this.Cleaned=this.CleanedSignal.GetEvent(),this.Destroyed=this.DestroyedSignal.GetEvent()}CleanItem(e){e instanceof y?e.Destroy():j(e)?e.Cancel():e instanceof MutationObserver||e instanceof ResizeObserver?e.disconnect():_(e)?e.Disconnect():e instanceof HTMLElement?e.remove():e()}Give(e,t){return this.DestroyedState?this.CleanItem(e):(t=t??r(),this.Has(t)&&this.Clean(t),this.Items.set(t,e)),e}GiveItems(...e){for(const t of e)this.Give(t);return Array.from(arguments)}Has(e){return this.Items.has(e)}Clean(e){var t=this.Items.get(e);void 0!==t&&(this.Items.delete(e),this.CleanItem(t))}CleanUp(){for(var[e,t]of this.Items)this.Clean(e);!1===this.DestroyedState&&this.CleanedSignal.Fire()}IsDestroyed(){return this.DestroyedState}Destroy(){!1===this.DestroyedState&&(this.DestroyedState=!0,this.DestroyingSignal.Fire(),this.CleanUp(),delete this.Items,this.DestroyedSignal.Fire(),this.DestroyingSignal.Destroy(),this.CleanedSignal.Destroy(),this.DestroyedSignal.Destroy(),delete this.DestroyingSignal,delete this.CleanedSignal,delete this.DestroyedSignal)}},a=new y,c=document.currentScript,z=c.src.includes("https://xpui.app.spotify.com/"),l=new n,d=Spicetify.Player,u=Spicetify.CosmosAsync;Spicetify.showNotification;{const M=()=>{d=Spicetify.Player,u=Spicetify.CosmosAsync,e=Spicetify.showNotification,void 0===d||void 0===u||void 0===e?a.Give(s(0,M),"WaitForSpicetify"):l.Fire()};M()}var h,m,v,g,H=l.GetEvent(),f=()=>f,b=new class{constructor(){var t=localStorage.getItem("BeautifulLyrics");if(null===t)this.Store={TrackInformation:{},ISRCLyrics:{}};else{this.Store=JSON.parse(t);let e=!1;for(const r of[this.Store.ISRCLyrics,this.Store.TrackInformation])for(const i in r)r[i].ExpiresAt<Date.now()&&(e=!0,delete r[i]);e&&this.Save()}}Get(){return this.Store}Save(){localStorage.setItem("BeautifulLyrics",JSON.stringify(this.Store))}GetFromControlRecord(e,t){var r=e[t];if(void 0!==r){if(!(r.ExpiresAt<Date.now()))return r.Content;delete e[t]}}SetControlRecord(e,t,r,i){var n=new Date,i=(n.setHours(0,0,0,0),"Weeks"==i.Unit?n.setDate(n.getDate()+7*i.Duration):(n.setMonth(n.getMonth()+i.Duration),n.setDate(0)),n.getTime());e[t]={ExpiresAt:i,Content:r},this.Save()}},U={Duration:2,Unit:"Weeks"},B={Duration:1,Unit:"Months"},p=a.Give(new y),w=class{constructor(e,t){this.Id=e,this.CoverArt={Large:t.metadata.image_xlarge_url,Big:t.metadata.image_large_url,Default:t.metadata.image_url,Small:t.metadata.image_small_url}}},N=class extends w{constructor(e,t,r,i){super(e,t),this.ISRC=r.external_ids.isrc,this.LyricsData=i}},S=new n,C=new n,$=/^spotify:track:([\w\d]+)$/,x=()=>{var e=null==(e=d.data)?void 0:e.track,t=(null!=(t=null==e?void 0:e.uri.match($))?t:[])[1];if(t!==(null==h?void 0:h.Id)){if(p.Clean("Song"),(h=void 0)!==t){var n=t;var r=e;const i=p.Give(new y,"Song");h=new w(n,r),new Promise(t=>{const r=b.Get().TrackInformation;var e=b.GetFromControlRecord(r,n);void 0===e?u.request("GET","https://api.spotify.com/v1/tracks/"+n).catch(e=>{throw console.warn(e),e}).then(e=>{if(e.status<200||299<e.status)throw`Failed to load Track (${n}) Information`;e=e.body;b.SetControlRecord(r,n,e,U),t(e)}):t(e)}).then(t=>{const r=t.external_ids.isrc,i=b.Get().ISRCLyrics;var e=b.GetFromControlRecord(i,r);return void 0===e?fetch("https://beautiful-lyrics.socials-420.workers.dev/lyrics/"+r).then(e=>{if(!1===e.ok)throw`Failed to load Lyrics for Track (${n}), Error: ${e.status} `+e.statusText;return e.text()}).then(e=>{if(0!==e.length)return JSON.parse(e)}).then(e=>(b.SetControlRecord(i,r,null!=e&&e,B),[t,e])):Promise.resolve([t,e||void 0])}).then(([e,t])=>{i.IsDestroyed()||(h=new N(n,r,e,t),C.Fire(h))})}S.Fire(h)}},q=S.GetEvent(),W=(C.GetEvent(),()=>h),D=new n,k=e=>{(null==e?void 0:e.CoverArt.Default)!==(null==m?void 0:m.Default)&&(m=null==e?void 0:e.CoverArt,D.Fire(m))},J=D.GetEvent(),K=()=>m,I=e=>{e=e.match(/(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?/);if(null!==e)return{Text:e[0],Major:parseInt(e[1]),Minor:parseInt(e[2]),Patch:parseInt(e[3]),Control:e[4]?parseInt(e[4]):void 0}},G=I("2.5.0"),L=async()=>{let n=1;fetch("https://api.github.com/repos/surfbryce/beautiful-lyrics/contents/dist/beautiful-lyrics.js").then(e=>e.json()).then(e=>fetch("https://api.github.com/repos/surfbryce/beautiful-lyrics/git/blobs/"+e.sha)).then(e=>e.json()).then(e=>atob(e.content)).then(e=>{var t,r,i=I(e);void 0!==i&&([t,r]=((e,t)=>{t={Text:"",Major:t.Major-e.Major,Minor:t.Minor-e.Minor,Patch:t.Patch-e.Patch,Control:void 0===t.Control&&void 0===e.Control?0:void 0===t.Control||void 0===e.Control?e.Control:t.Control-e.Control};return[t,0!==t.Major||0!==t.Minor||0!==t.Patch||0!==t.Control]})(G,i),r&&(2<i.Major||2==i.Major&&4<=i.Minor)?(Spicetify.showNotification(`<h3>Beautiful Lyrics Updated!</h3>
				<h4 style = 'margin-top: 4px; margin-bottom: 4px; font-weight: normal;'>No need to re-install - it's already running!</h4>
				<span style = 'opacity: 0.75;'>Version ${G.Text} -> ${i.Text}</span>`,t.Major<0||t.Minor<0||t.Patch<0||0<t.Major,7500),r=e,a.Destroy(),null!=(i=document.querySelector("#beautifulDlyrics"))&&i.remove(),(i=document.createElement("script")).setAttribute("type","text/javascript"),i.innerHTML=r,document.body.appendChild(i),c.remove()):n=5)}).catch(e=>console.warn("Error: "+e)).finally(()=>a.Give(s(60*n,L),"CheckForUpdate"))};{const P=new Map,E=(P.set("VanillaFullScreen","#main:has(.os-content .lyrics-lyrics-container) .under-main-view"),P.set("VanillaSideCard","aside:has(.main-nowPlayingView-section) .os-padding"),P.set("LyricsPlusFullScreen","#main:has(.os-content .lyrics-lyricsContainer-LyricsContainer) .under-main-view"),a.Give(new y,"LiveBackgrounds"));v=()=>{for(var[e,t]of P){t=document.body.querySelector(t);(E.Has(e)?null===t:null!==t)&&(null===t?E.Clean(e):((e,t)=>{var e=E.Give(new y,e),r=e.Give(document.createElement("div"));r.classList.add("lyrics-background-container");const[i,n,o]=e.GiveItems(document.createElement("img"),document.createElement("img"),document.createElement("img"));i.classList.add("lyrics-background-color"),n.classList.add("lyrics-background-back"),o.classList.add("lyrics-background-back-center"),r.appendChild(i),r.appendChild(n),r.appendChild(o);var s=()=>{var e=null!=(e=null==(e=K())?void 0:e.Default)?e:"";i.src=e,n.src=e,o.src=e},s=(e.Give(J.Connect(s)),s(),()=>{t.classList.contains("lyrics-background")||t.classList.add("lyrics-background")});s(),e.Give(new MutationObserver(s)).observe(t,{attributes:!0,attributeFilter:["class"],childList:!1,subtree:!1}),t.prepend(r),e.Give(()=>t.classList.remove("lyrics-background"))})(e,t))}}}{const R=4,F=.5,T=a.Give(new y,"Lyrics"),V=new Map,X=(V.set("VanillaFullScreen",".lyrics-lyrics-contentWrapper"),V.set("VanillaSideCard",".main-nowPlayingView-lyricsContent"),"lyrics-lyricsContent-lyric"),Y="lyrics-lyricsContent-unsynced",Z="lyrics-lyricsContent-highlight",ee="lyrics-lyricsContent-active",te=e=>{var e=getComputedStyle(e),t=getComputedStyle(document.documentElement);return parseFloat(e.fontSize)/parseFloat(t.fontSize)},re=(e,n)=>{const o=T.Give(new y,e),s=new Map;let a=0;const c=(e,t)=>{e.style.fontSize="Active"==t.State?a+F+"rem":""},l=()=>{let t;for(var[e,r]of s){e=e.classList;e.contains(ee)?(r.State="Active",t=r.LayoutOrder):e.contains(Y)?r.State="Unsynced":e.contains(Z)?r.State="Sung":r.State="Unsung"}for(var[i,n]of s){var o="Active"===n.State||"Unsynced"===n.State;let e;e=o?0:void 0===t?R:Math.min(Math.abs(n.LayoutOrder-t),R);o=o?"var(--lyrics-color-active)":"Sung"===n.State?"var(--lyrics-color-passed)":"var(--lyrics-color-inactive)";!1===i.classList.contains("lyric")&&i.classList.add("lyric"),c(i,n),i.style.color="transparent",i.style.textShadow=`0 0 ${e}px `+o}};{const d=t=>{if(t instanceof HTMLDivElement&&t.classList.contains(X)){var i=t;var t=o.Give(new y,i),r=Array.from(n.children).indexOf(i);t.Give(new MutationObserver(l)).observe(i,{attributes:!0,attributeFilter:["class"],childList:!1,subtree:!1});let e=!1;!1===o.Has("FontResizeObserver")&&0===i.innerText.length&&(o.Give(new ResizeObserver(e=>{a=te(i);for(var[t,r]of s)c(t,r)}),"FontResizeObserver").observe(i),t.Give(()=>o.Clean("FontResizeObserver")),e=!0),s.set(i,{LayoutOrder:r,State:"Unsung",IsFontSizeObserver:e}),l()}};o.Give(new MutationObserver(e=>{for(const t of e)if("childList"===t.type){for(const r of t.removedNodes)r instanceof HTMLDivElement&&(s.delete(r),o.Clean(r));for(const i of t.addedNodes)d(i)}})).observe(n,{attributes:!1,childList:!0,subtree:!1});for(const t of n.childNodes)d(t)}};g=()=>{for(var[e,t]of V){t=document.body.querySelector(t);(T.Has(e)?null===t:null!==t)&&(null===t?T.Clean(e):re(e,t))}}}var Q=async function(){await new Promise(e=>{f()?e():H.Connect(e)}),!1===z&&L(),d.addEventListener("songchange",x),a.Give(()=>d.removeEventListener("songchange",x)),x(),a.Give(q.Connect(k)),k(W()),a.Give(new MutationObserver(()=>{v(),g()})).observe(document.body,{attributes:!1,childList:!0,subtree:!0}),v(),g()};(async()=>{await Q()})()})();(async()=>{var e;document.getElementById("beautifulDlyrics")||((e=document.createElement("style")).id="beautifulDlyrics",e.textContent=String.raw`
  .main-lyricsCinema-controls,.main-nowPlayingView-lyricsControls{mix-blend-mode:overlay}.lyric:hover{text-shadow:0 0 0 var(--lyrics-color-active)!important}.lyrics-lyricsContent-active{margin-top:.25em;margin-bottom:.25em}aside:has(.main-nowPlayingView-section) .main-nowPlayingView-content{background:0 0}aside:has(.main-nowPlayingView-section) .lyrics-background .main-trackInfo-artists{opacity:.75;filter:brightness(1.15)}aside:has(.main-nowPlayingView-section) .main-nowPlayingView-coverArt{opacity:.85;box-shadow:rgba(0,0,0,.2705882353) 0 9px 20px 0}aside:has(.main-nowPlayingView-section) .main-nowPlayingView-section{background-color:var(--background-tinted-base)!important}#lyrics-cinema .os-scrollbar,.Root__main-view:has(.lyrics-background) .os-scrollbar,.os-host:has(.lyrics-background) .os-scrollbar{padding:5px}#lyrics-cinema .os-scrollbar .os-scrollbar-handle,.Root__main-view:has(.lyrics-background) .os-scrollbar .os-scrollbar-handle,.os-host:has(.lyrics-background) .os-scrollbar .os-scrollbar-handle{mix-blend-mode:overlay;background-color:rgba(252,249,249,.117)!important}.lyrics-lyrics-container,.main-nowPlayingView-section{--lyrics-color-inactive:rgb(240 240 240 / 51%)!important}.os-viewport .lyrics-lyrics-background{background:0 0}.os-viewport .lyrics-lyrics-container{margin-top:25vh}.os-viewport .lyrics-lyrics-container.lyrics-lyrics-coverTopBar{margin-top:7.5vh}.lyrics-lyricsContainer-LyricsBackground{background-color:transparent!important;background-image:none!important}#main:has(.under-main-view.lyrics-background) .Root__top-bar{mix-blend-mode:screen}.lyrics-background{overflow:hidden;position:static}.lyrics-background.main-nowPlayingView-sectionHeaderSpacing.main-nowPlayingView-lyricsGradient{background:0 0}.lyrics-background.os-viewport:not(:has(.main-nowPlayingView-content)){overflow:initial}#main:not(:has(.lyrics-lyricsContainer-LyricsBackground)) .lyrics-background.under-main-view>.lyrics-background-container{max-width:35%;max-height:30%;scale:290% 340%;transform-origin:left top}#main:has(.lyrics-lyricsContainer-LyricsBackground) .lyrics-background.under-main-view>.lyrics-background-container{max-width:25%;max-height:40%;scale:400% 250%;transform-origin:left top}#main:has(#lyrics-cinema .lyrics-lyrics-background) .lyrics-background.under-main-view .lyrics-background-container{z-index:1}.lyrics-background.os-padding:has(.main-nowPlayingView-content) .lyrics-background-container{border-radius:8px;filter:saturate(2) brightness(.7)}.lyrics-background-container{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;filter:saturate(1.5) brightness(.8)}.lyrics-background-back,.lyrics-background-back-center,.lyrics-background-color{width:200%;position:absolute;border-radius:100em;animation:rotate 35s linear infinite}.lyrics-background-color{right:0;top:0;filter:blur(40px);z-index:10;mix-blend-mode:revert}.lyrics-background-back{left:0;bottom:0;filter:blur(40px);z-index:1;animation-direction:reverse}.lyrics-background-back-center{filter:blur(40px);z-index:0;width:300%;right:-50%;top:-20%;animation-direction:reverse}@keyframes rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}:root{--beautiful-lyrics-random-degree:258deg}@keyframes rotate{0%{transform:rotate(var(--beautiful-lyrics-random-degree))}100%{transform:rotate(calc(var(--beautiful-lyrics-random-degree) + 360deg))}}
      `.trim(),document.head.appendChild(e))})();