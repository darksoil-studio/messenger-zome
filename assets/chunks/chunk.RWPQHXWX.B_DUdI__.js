import{_ as e,S as h,L as l,r as d}from"./styles.D7lbDD0V.js";import{x as p}from"./messenger-client.Bks7hfH7.js";import{n as t}from"./property.BL0qaIkn.js";var i=class extends h{constructor(){super(...arguments),this.localize=new l(this),this.date=new Date,this.hourFormat="auto"}render(){const o=new Date(this.date),s=this.hourFormat==="auto"?void 0:this.hourFormat==="12";if(!isNaN(o.getMilliseconds()))return p`
      <time datetime=${o.toISOString()}>
        ${this.localize.date(o,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:s})}
      </time>
    `}};e([t()],i.prototype,"date",2);e([t()],i.prototype,"weekday",2);e([t()],i.prototype,"era",2);e([t()],i.prototype,"year",2);e([t()],i.prototype,"month",2);e([t()],i.prototype,"day",2);e([t()],i.prototype,"hour",2);e([t()],i.prototype,"minute",2);e([t()],i.prototype,"second",2);e([t({attribute:"time-zone-name"})],i.prototype,"timeZoneName",2);e([t({attribute:"time-zone"})],i.prototype,"timeZone",2);e([t({attribute:"hour-format"})],i.prototype,"hourFormat",2);i.define("sl-format-date");var y=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],r=class extends h{constructor(){super(...arguments),this.localize=new l(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const o=new Date,s=new Date(this.date);if(isNaN(s.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const n=s.getTime()-o.getTime(),{unit:m,value:c}=y.find(a=>Math.abs(n)<a.max);if(this.isoTime=s.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(n/c),m,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let a;m==="minute"?a=u("second"):m==="hour"?a=u("minute"):m==="day"?a=u("hour"):a=u("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),a)}return p` <time datetime=${this.isoTime}>${this.relativeTime}</time> `}};e([d()],r.prototype,"isoTime",2);e([d()],r.prototype,"relativeTime",2);e([t()],r.prototype,"date",2);e([t()],r.prototype,"format",2);e([t()],r.prototype,"numeric",2);e([t({type:Boolean})],r.prototype,"sync",2);function u(o){const n={second:1e3,minute:6e4,hour:36e5,day:864e5}[o];return n-Date.now()%n}r.define("sl-relative-time");
