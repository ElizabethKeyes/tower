import{_ as B,b as S,w as F,d as _,P as i,t as f,l as u,E as D,M as P,e as N,c as r,a as t,F as m,r as x,f as v,g as A,A as n,h as l,o as a,i as V,j,k as p,p as L,m as U,n as Y}from"./index.3f91c9ab.js";const $={setup(){async function o(){try{await f.getTicketsByAccountId()}catch(s){u.log(s),i.error(s.message)}}async function g(){try{await Y.getEventsByCreatorId(n.account.id)}catch(s){u.log(s),i.error(s.message)}}return S(()=>{o()}),F(()=>{var s;(s=n.account)!=null&&s.id&&g()}),{account:_(()=>n.account),tickets:_(()=>n.tickets),myTowerEvents:_(()=>n.towerEvents.filter(s=>s.creatorId==n.account.id)),async cancelTicket(s){try{await i.confirm("Are you sure you'd like to cancel your ticket?","This action can't be undone.","Yes, I'm sure","warning")&&await f.cancelTicket(s)}catch(c){u.error(c),i.error(c.message)}}}},components:{EventCard:D,Modal:P,EditAccountForm:N}},h=o=>(L("data-v-31646925"),o=o(),U(),o),q={class:"row px-4"},z={class:"col-12"},G=h(()=>t("div",{class:"d-flex"},[t("h4",{class:"text-success mt-5"},"My Events"),t("button",{class:"btn btn-success text-black w-25 h-50 mt-5 ms-3 mb-3",type:"button","data-bs-toggle":"collapse","data-bs-target":"#collapseMyEvents","aria-expanded":"false","aria-controls":"collapseMyEvents"}," Expand/Collapse Events "),t("button",{class:"btn btn-info h-50 mt-5 ms-3","data-bs-toggle":"modal","data-bs-target":"#editAccountModal"},"Edit Account")],-1)),H={class:"row"},J={class:"collapse show",id:"collapseMyEvents"},K={class:"row"},O={class:"col-12"},Q=h(()=>t("h4",{class:"text-success mt-5"},"Upcoming Events",-1)),R={class:"row justify-content-center mt-4"},W={class:"bg-grey mb-4 ticket-card"},X=["src","alt"],Z={class:"mt-2 ms-2"},tt={class:"text-light"},et={class:"text-info"},st={class:"text-info"},ct=h(()=>t("div",{class:"bg-dark ticket-circle"},null,-1)),ot=["onClick"];function nt(o,g,s,c,at,rt){const C=l("EventCard"),I=l("router-link"),M=l("EditAccountForm"),T=l("Modal");return a(),r(m,null,[t("section",q,[t("div",z,[G,t("section",H,[t("div",J,[t("div",K,[(a(!0),r(m,null,x(c.myTowerEvents,e=>(a(),r("div",{class:"col-md-3",key:e.id},[v(C,{towerEvent:e},null,8,["towerEvent"])]))),128))])])])]),t("div",O,[Q,t("section",R,[(a(!0),r(m,null,x(c.tickets,e=>{var k,y,E,b;return a(),r("div",{class:"col-md-10",key:e==null?void 0:e.id},[t("div",W,[c.tickets?(a(),V(I,{key:0,to:{name:"EventDetails",params:{towerEventId:(k=e.event)==null?void 0:k.id}},class:"my-link"},{default:A(()=>{var d,w;return[t("img",{src:(d=e.event)==null?void 0:d.coverImg,alt:((w=e.event)==null?void 0:w.name)+" cover image",role:"link to event",class:"ticket-img"},null,8,X)]}),_:2},1032,["to"])):j("",!0),t("div",Z,[t("h6",tt,p((y=e.event)==null?void 0:y.name),1),t("h6",et,p((E=e.event)==null?void 0:E.location),1),t("h6",st,p(new Date((b=e.event)==null?void 0:b.startDate).toLocaleDateString()),1),ct]),t("button",{class:"btn btn-danger text-black cancel-button",onClick:d=>c.cancelTicket(e==null?void 0:e.id)},"Cancel Ticket",8,ot)])])}),128))])])]),v(T,{id:"editAccountModal"},{modalFormContent:A(()=>[v(M)]),_:1})],64)}const lt=B($,[["render",nt],["__scopeId","data-v-31646925"]]);export{lt as default};