const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/api-docs.C5cT8J9d.js","assets/chunks/api-viewer-tabs.DJtnaqXD.js","assets/chunks/reactive-element.CHpx6ykd.js","assets/chunks/tslib.es6.kHcLnhpD.js","assets/chunks/api-demo.D7YEWR1J.js","assets/chunks/profiles-context.CjwX_wkm.js","assets/chunks/context.BuuDXMv4.js","assets/chunks/property.BL0qaIkn.js","assets/chunks/messenger-client.Bks7hfH7.js","assets/chunks/signal-watcher.CurgRbfO.js","assets/chunks/messenger-context.BfKl_-6H.js","assets/chunks/context.w4qY2tFk.js","assets/chunks/context.DmZ_f8Qc.js","assets/chunks/group-chat.B4GISpaJ.js","assets/chunks/show-avatar-image.Bt_Btw72.js","assets/chunks/styles.D7lbDD0V.js","assets/chunks/chunk.LXDTFLWU.BbeSkk_T.js","assets/chunks/live.BiKC474q.js","assets/chunks/chunk.RWPQHXWX.B_DUdI__.js","assets/chunks/message-input.pgpO83H3.js"])))=>i.map(i=>d[i]);
import{v as h,V as a,c as p,a2 as o,j as r,o as d}from"./chunks/framework.CdOzaYFd.js";import{d as k,M as c,a as g,b as u,B as E,u as m,P as b,c as y,e as v,s as _,f}from"./chunks/messenger-client.Bks7hfH7.js";const P=JSON.parse('{"title":"<group-chat>","description":"","frontmatter":{},"headers":[],"relativePath":"elements/group-chat.md","filePath":"elements/group-chat.md"}'),C={name:"elements/group-chat.md"},x=Object.assign(C,{setup(F){return h(async()=>{await a(()=>import("./chunks/api-docs.C5cT8J9d.js"),__vite__mapDeps([0,1,2,3])),await a(()=>import("./chunks/api-demo.D7YEWR1J.js"),__vite__mapDeps([4,1,2,3])),await a(()=>import("./chunks/profiles-context.CjwX_wkm.js"),__vite__mapDeps([5,3,6,7,8,9])),customElements.get("messenger-context")||await a(()=>import("./chunks/messenger-context.BfKl_-6H.js"),__vite__mapDeps([10,11,7,8,6,12])),customElements.get("group-chat")||await a(()=>import("./chunks/group-chat.B4GISpaJ.js"),__vite__mapDeps([13,14,3,8,7,15,9,2,16,17,18,19,12]));const e=await k(),s=Array.from(e.keys()),i=new c(s[0]),t=new g(i,"messenger_test"),l=await t.createGroupChat([s[1]],{name:"Demo group",description:"Demo group",avatar_hash:void 0},{only_admins_can_add_members:!1,only_admins_can_update_group_info:!1,sync_message_history_with_new_members:!1}),n=new u(t);E(m`
  <profiles-context .store=${new b(new y(new v(e),"messenger_test"))}>
    <messenger-context .store=${n}>
      <api-demo src="custom-elements.json" only="group-chat" exclude-knobs="store">
        <template data-element="group-chat" data-target="host">
          <group-chat style="height: 400px; width: 350px" group-chat-hash="${_(f(l))}"></group-chat>
        </template>
      </api-demo>
    </messenger-context>
  </profiles-context>
  `,document.querySelector("element-demo"))}),(e,s)=>(d(),p("div",null,s[0]||(s[0]=[o(`<h1 id="group-chat" tabindex="-1"><code>&lt;group-chat&gt;</code> <a class="header-anchor" href="#group-chat" aria-label="Permalink to &quot;\`&lt;group-chat&gt;\`&quot;">​</a></h1><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><ol start="0"><li><p>If you haven&#39;t already, <a href="./../setup.html">go through the setup for the module</a>.</p></li><li><p>Import the <code>&lt;group-chat&gt;</code> element somewhere in the javascript side of your web-app like this:</p></li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@darksoil-studio/messenger-zome/dist/elements/group-chat.js&#39;</span></span></code></pre></div><ol start="2"><li>Use it in the html side of your web-app like this:</li></ol><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-ZEzbs" id="tab-9Gu8PP5" checked><label data-title="Lit" for="tab-9Gu8PP5">Lit</label><input type="radio" name="group-ZEzbs" id="tab-Vg2_kX4"><label data-title="React" for="tab-Vg2_kX4">React</label><input type="radio" name="group-ZEzbs" id="tab-CAwoOMO"><label data-title="Angular" for="tab-CAwoOMO">Angular</label><input type="radio" name="group-ZEzbs" id="tab-ls55HW4"><label data-title="Vue" for="tab-ls55HW4">Vue</label><input type="radio" name="group-ZEzbs" id="tab-bFpZ2I9"><label data-title="Svelte" for="tab-bFpZ2I9">Svelte</label></div><div class="blocks"><div class="language-html vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> .groupChatHash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${groupChatHash}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> groupChatHash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{groupChatHash}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> [groupChatHash]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;groupChatHash&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :groupChatHash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;groupChatHash&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> groupChatHash</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">{groupChatHash}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">group-chat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></div></div><div class="warning custom-block github-alert"><p class="custom-block-title">WARNING</p><p>Like all the elements in this module, <code>&lt;group-chat&gt;</code> needs to be placed inside an initialized <code>&lt;messenger-context&gt;</code>.</p></div><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Here is an interactive demo of the element:</p><element-demo></element-demo><h2 id="api-reference" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference" aria-label="Permalink to &quot;API Reference&quot;">​</a></h2><p><code>&lt;group-chat&gt;</code> is a <a href="https://web.dev/articles/custom-elements-v1" target="_blank" rel="noreferrer">custom element</a>, which means that it can be used in any web app or website. Here is the reference for its API:</p>`,12),r("api-docs",{src:"custom-elements.json",only:"group-chat"},null,-1)])))}});export{P as __pageData,x as default};
