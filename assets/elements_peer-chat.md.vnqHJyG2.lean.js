const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.DNHmXKYU.js","assets/chunks/api-viewer-tabs.CX3g7Nrf.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.HXDE9Rl5.js","assets/chunks/profiles-context.CI3VJ0rJ.js","assets/chunks/context.CP7mVcaJ.js","assets/chunks/messenger-client.CrBQT6S4.js","assets/chunks/property.COiWTaZV.js","assets/chunks/context.iwCtUv_o.js","assets/chunks/messenger-context.C3dcOECm.js","assets/chunks/context.lHSmWYFG.js","assets/chunks/context.BUoRP9Rb.js","assets/chunks/peer-chat.tbjFNc9T.js","assets/chunks/chunk.UG6RICOR.KWXIwe3b.js","assets/chunks/styles.1LkFSSyP.js","assets/chunks/chunk.UJ4C5V3J.BgoNkNvF.js","assets/chunks/message-input.DQKNX8xp.js"])))=>i.map(i=>d[i]);
import{v as n,V as s,c as p,o as r,ag as o,j as d}from"./chunks/framework.Do02_DaK.js";import{d as k,M as c,a as g,b as E,B as m,P as u,s as y,c as b,e as v,f as _,u as C}from"./chunks/messenger-client.CrBQT6S4.js";const P=JSON.parse('{"title":"<peer-chat>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/peer-chat.md","filePath":"elements/peer-chat.md"}'),f={name:"elements/peer-chat.md"},R=Object.assign(f,{setup(F){return n(async()=>{await s(()=>import("./chunks/api-docs.DNHmXKYU.js"),__vite__mapDeps([0,1,2])),await s(()=>import("./chunks/api-demo.HXDE9Rl5.js"),__vite__mapDeps([3,1,2])),await s(()=>import("./chunks/profiles-context.CI3VJ0rJ.js"),__vite__mapDeps([4,2,5,6,7,8])),customElements.get("messenger-context")||await s(()=>import("./chunks/messenger-context.C3dcOECm.js"),__vite__mapDeps([9,10,7,6,8,11])),customElements.get("peer-chat")||await s(()=>import("./chunks/peer-chat.tbjFNc9T.js"),__vite__mapDeps([12,10,7,6,5,13,14,2,15,16,11]));const a=await k(),e=Array.from(a.keys()),i=new c(e[0]),t=new g(i,"messenger_test"),l=await t.createPeerChat(e[1]),h=new E(t);m(C`
  <profiles-context .store=${new u(new b(new v(a),"messenger_test"))}>
    <messenger-context .store=${h}>
      <api-demo src="custom-elements.json" only="peer-chat" exclude-knobs="store">
        <template data-element="peer-chat" data-target="host">
          <peer-chat style="height: 400px; width: 350px" peer-chat-hash="${y(_(l))}"></peer-chat>
        </template>
      </api-demo>
    </messenger-context>
  </profiles-context>
  `,document.querySelector("element-demo"))}),(a,e)=>(r(),p("div",null,e[0]||(e[0]=[o("",12),d("api-docs",{src:"custom-elements.json",only:"peer-chat"},null,-1)])))}});export{P as __pageData,R as default};
