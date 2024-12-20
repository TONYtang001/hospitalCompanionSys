import{o as te,aR as de,aS as fe,aT as _,av as ve,aK as me,M as x,ab as k,aU as se,aV as G,V as j,aW as ye,S as pe,aX as ge,R as be,aY as H,am as J,aZ as W,L as V,h as R,a_ as K,P as h,O as he,a9 as Ce,aa as we,N as Q,a$ as Ee,f as z,g as U,k as X,a0 as w,i as o,t as ke,w as E,z as q,$ as Me,q as Te,a2 as Z,a3 as ne,K as ae,b0 as Se,b1 as Be,ao as le,B as Ie,b2 as Le,ax as ee,b as O,b3 as De,b4 as Pe,b5 as Oe,W as $e,a4 as Ae,b6 as oe,b7 as Fe,at as ze,Q as Ne,b8 as Ye,Y as Re,b9 as Ve,ba as Xe,aJ as We,Z as He,bb as Ke,ad as Ue}from"./index-2biiodU7.js";import{g as _e}from"./index-CzY_ShLU.js";const je=(e,s,n,d)=>{let a={offsetX:0,offsetY:0};const r=u=>{const y=u.clientX,b=u.clientY,{offsetX:g,offsetY:v}=a,m=e.value.getBoundingClientRect(),C=m.left,c=m.top,$=m.width,M=m.height,N=document.documentElement.clientWidth,Y=document.documentElement.clientHeight,A=-C+g,T=-c+v,S=N-C-$+g,B=Y-c-M+v,I=t=>{let D=g+t.clientX-y,F=v+t.clientY-b;d!=null&&d.value||(D=Math.min(Math.max(D,A),S),F=Math.min(Math.max(F,T),B)),a={offsetX:D,offsetY:F},e.value&&(e.value.style.transform=`translate(${_(D)}, ${_(F)})`)},L=()=>{document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",L)};document.addEventListener("mousemove",I),document.addEventListener("mouseup",L)},i=()=>{s.value&&e.value&&s.value.addEventListener("mousedown",r)},f=()=>{s.value&&e.value&&s.value.removeEventListener("mousedown",r)},l=()=>{a={offsetX:0,offsetY:0},e.value&&(e.value.style.transform="none")};return te(()=>{de(()=>{n.value?i():f()})}),fe(()=>{f()}),{resetPosition:l}},qe=(e,s={})=>{ve(e)||me("[useLockscreen]","You need to pass a ref param to this function");const n=s.ns||x("popup"),d=k(()=>n.bm("parent","hidden"));if(!se||G(document.body,d.value))return;let a=0,r=!1,i="0";const f=()=>{setTimeout(()=>{typeof document>"u"||(be(document==null?void 0:document.body,d.value),r&&document&&(document.body.style.width=i))},200)};j(e,l=>{if(!l){f();return}r=!G(document.body,d.value),r&&(i=document.body.style.width),a=_e(n.namespace.value);const u=document.documentElement.clientHeight<document.body.scrollHeight,y=ye(document.body,"overflowY");a>0&&(u||y==="scroll")&&r&&(document.body.style.width=`calc(100% - ${a}px)`),pe(document.body,d.value)}),ge(()=>f())},ie=e=>{if(!e)return{onClick:H,onMousedown:H,onMouseup:H};let s=!1,n=!1;return{onClick:i=>{s&&n&&e(i),s=n=!1},onMousedown:i=>{s=i.target===i.currentTarget},onMouseup:i=>{n=i.target===i.currentTarget}}},Ze=J({mask:{type:Boolean,default:!0},customMaskEvent:Boolean,overlayClass:{type:W([String,Array,Object])},zIndex:{type:W([String,Number])}}),xe={click:e=>e instanceof MouseEvent},Je="overlay";var Ge=V({name:"ElOverlay",props:Ze,emits:xe,setup(e,{slots:s,emit:n}){const d=x(Je),a=l=>{n("click",l)},{onClick:r,onMousedown:i,onMouseup:f}=ie(e.customMaskEvent?void 0:a);return()=>e.mask?R("div",{class:[d.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:r,onMousedown:i,onMouseup:f},[h(s,"default")],K.STYLE|K.CLASS|K.PROPS,["onClick","onMouseup","onMousedown"]):he("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[h(s,"default")])}});const Qe=Ge,re=Symbol("dialogInjectionKey"),ue=J({center:Boolean,alignCenter:Boolean,closeIcon:{type:Ce},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),eo={close:()=>!0},oo=V({name:"ElDialogContent"}),to=V({...oo,props:ue,emits:eo,setup(e,{expose:s}){const n=e,{t:d}=we(),{Close:a}=Se,{dialogRef:r,headerRef:i,bodyId:f,ns:l,style:u}=Q(re),{focusTrapRef:y}=Q(Ee),b=k(()=>[l.b(),l.is("fullscreen",n.fullscreen),l.is("draggable",n.draggable),l.is("align-center",n.alignCenter),{[l.m("center")]:n.center}]),g=Be(y,r),v=k(()=>n.draggable),m=k(()=>n.overflow),{resetPosition:C}=je(r,i,v,m);return s({resetPosition:C}),(c,$)=>(z(),U("div",{ref:o(g),class:w(o(b)),style:ne(o(u)),tabindex:"-1"},[X("header",{ref_key:"headerRef",ref:i,class:w([o(l).e("header"),{"show-close":c.showClose}])},[h(c.$slots,"header",{},()=>[X("span",{role:"heading","aria-level":c.ariaLevel,class:w(o(l).e("title"))},ke(c.title),11,["aria-level"])]),c.showClose?(z(),U("button",{key:0,"aria-label":o(d)("el.dialog.close"),class:w(o(l).e("headerbtn")),type:"button",onClick:M=>c.$emit("close")},[R(o(Te),{class:w(o(l).e("close"))},{default:E(()=>[(z(),q(Me(c.closeIcon||o(a))))]),_:1},8,["class"])],10,["aria-label","onClick"])):Z("v-if",!0)],2),X("div",{id:o(f),class:w(o(l).e("body"))},[h(c.$slots,"default")],10,["id"]),c.$slots.footer?(z(),U("footer",{key:0,class:w(o(l).e("footer"))},[h(c.$slots,"footer")],2)):Z("v-if",!0)],6))}});var so=ae(to,[["__file","dialog-content.vue"]]);const no=J({...ue,appendToBody:Boolean,appendTo:{type:W([String,Object]),default:"body"},beforeClose:{type:W(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:Boolean,headerAriaLevel:{type:String,default:"2"}}),ao={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[le]:e=>Ie(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},lo=(e,s)=>{var n;const a=Ae().emit,{nextZIndex:r}=Le();let i="";const f=ee(),l=ee(),u=O(!1),y=O(!1),b=O(!1),g=O((n=e.zIndex)!=null?n:r());let v,m;const C=De("namespace",Pe),c=k(()=>{const p={},P=`--${C.value}-dialog`;return e.fullscreen||(e.top&&(p[`${P}-margin-top`]=e.top),e.width&&(p[`${P}-width`]=_(e.width))),p}),$=k(()=>e.alignCenter?{display:"flex"}:{});function M(){a("opened")}function N(){a("closed"),a(le,!1),e.destroyOnClose&&(b.value=!1)}function Y(){a("close")}function A(){m==null||m(),v==null||v(),e.openDelay&&e.openDelay>0?{stop:v}=oe(()=>I(),e.openDelay):I()}function T(){v==null||v(),m==null||m(),e.closeDelay&&e.closeDelay>0?{stop:m}=oe(()=>L(),e.closeDelay):L()}function S(){function p(P){P||(y.value=!0,u.value=!1)}e.beforeClose?e.beforeClose(p):T()}function B(){e.closeOnClickModal&&S()}function I(){se&&(u.value=!0)}function L(){u.value=!1}function t(){a("openAutoFocus")}function D(){a("closeAutoFocus")}function F(p){var P;((P=p.detail)==null?void 0:P.focusReason)==="pointer"&&p.preventDefault()}e.lockScroll&&qe(u);function ce(){e.closeOnPressEscape&&S()}return j(()=>e.modelValue,p=>{p?(y.value=!1,A(),b.value=!0,g.value=Oe(e.zIndex)?r():g.value++,$e(()=>{a("open"),s.value&&(s.value.scrollTop=0)})):u.value&&T()}),j(()=>e.fullscreen,p=>{s.value&&(p?(i=s.value.style.transform,s.value.style.transform=""):s.value.style.transform=i)}),te(()=>{e.modelValue&&(u.value=!0,b.value=!0,A())}),{afterEnter:M,afterLeave:N,beforeLeave:Y,handleClose:S,onModalClick:B,close:T,doClose:L,onOpenAutoFocus:t,onCloseAutoFocus:D,onCloseRequested:ce,onFocusoutPrevented:F,titleId:f,bodyId:l,closed:y,style:c,overlayDialogStyle:$,rendered:b,visible:u,zIndex:g}},io=V({name:"ElDialog",inheritAttrs:!1}),ro=V({...io,props:no,emits:ao,setup(e,{expose:s}){const n=e,d=Fe();ze({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},k(()=>!!d.title));const a=x("dialog"),r=O(),i=O(),f=O(),{visible:l,titleId:u,bodyId:y,style:b,overlayDialogStyle:g,rendered:v,zIndex:m,afterEnter:C,afterLeave:c,beforeLeave:$,handleClose:M,onModalClick:N,onOpenAutoFocus:Y,onCloseAutoFocus:A,onCloseRequested:T,onFocusoutPrevented:S}=lo(n,r);Ne(re,{dialogRef:r,headerRef:i,bodyId:y,ns:a,rendered:v,style:b});const B=ie(N),I=k(()=>n.draggable&&!n.fullscreen);return s({visible:l,dialogContentRef:f,resetPosition:()=>{var t;(t=f.value)==null||t.resetPosition()}}),(t,D)=>(z(),q(o(Ke),{to:t.appendTo,disabled:t.appendTo!=="body"?!1:!t.appendToBody},{default:E(()=>[R(Ye,{name:"dialog-fade",onAfterEnter:o(C),onAfterLeave:o(c),onBeforeLeave:o($),persisted:""},{default:E(()=>[Re(R(o(Qe),{"custom-mask-event":"",mask:t.modal,"overlay-class":t.modalClass,"z-index":o(m)},{default:E(()=>[X("div",{role:"dialog","aria-modal":"true","aria-label":t.title||void 0,"aria-labelledby":t.title?void 0:o(u),"aria-describedby":o(y),class:w(`${o(a).namespace.value}-overlay-dialog`),style:ne(o(g)),onClick:o(B).onClick,onMousedown:o(B).onMousedown,onMouseup:o(B).onMouseup},[R(o(Ve),{loop:"",trapped:o(l),"focus-start-el":"container",onFocusAfterTrapped:o(Y),onFocusAfterReleased:o(A),onFocusoutPrevented:o(S),onReleaseRequested:o(T)},{default:E(()=>[o(v)?(z(),q(so,Xe({key:0,ref_key:"dialogContentRef",ref:f},t.$attrs,{center:t.center,"align-center":t.alignCenter,"close-icon":t.closeIcon,draggable:o(I),overflow:t.overflow,fullscreen:t.fullscreen,"show-close":t.showClose,title:t.title,"aria-level":t.headerAriaLevel,onClose:o(M)}),We({header:E(()=>[t.$slots.title?h(t.$slots,"title",{key:1}):h(t.$slots,"header",{key:0,close:o(M),titleId:o(u),titleClass:o(a).e("title")})]),default:E(()=>[h(t.$slots,"default")]),_:2},[t.$slots.footer?{name:"footer",fn:E(()=>[h(t.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):Z("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,["aria-label","aria-labelledby","aria-describedby","onClick","onMousedown","onMouseup"])]),_:3},8,["mask","overlay-class","z-index"]),[[He,o(l)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])]),_:3},8,["to","disabled"]))}});var uo=ae(ro,[["__file","dialog.vue"]]);const vo=Ue(uo);export{vo as E};
