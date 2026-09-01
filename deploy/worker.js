var fi=Object.create;var st=Object.defineProperty;var gi=Object.getOwnPropertyDescriptor;var mi=Object.getOwnPropertyNames;var bi=Object.getPrototypeOf,vi=Object.prototype.hasOwnProperty;var Ei=(e,t,n)=>t in e?st(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var s=(e,t)=>st(e,"name",{value:t,configurable:!0});var ie=(e,t)=>()=>(e&&(t=e(e=0)),t);var wi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var xi=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of mi(t))!vi.call(e,i)&&i!==n&&st(e,i,{get:()=>t[i],enumerable:!(r=gi(t,i))||r.enumerable});return e};var yi=(e,t,n)=>(n=e!=null?fi(bi(e)):{},xi(t||!e||!e.__esModule?st(n,"default",{value:e,enumerable:!0}):n,e));var mn=(e,t,n)=>(Ei(e,typeof t!="symbol"?t+"":t,n),n);function U(e){return new Error(`[unenv] ${e} is not implemented yet!`)}function ve(e){return Object.assign(s(()=>{throw U(e)},"fn"),{__unenv__:!0})}function bn(e){return class{__unenv__=!0;constructor(){throw new Error(`[unenv] ${e} is not implemented yet!`)}}}var lt=ie(()=>{E();v();b();s(U,"createNotImplementedError");s(ve,"notImplemented");s(bn,"notImplementedClass")});var Dt,Lt,ki,ke,Bt,Be,Pe,Ze,He,Le,vn,En=ie(()=>{E();v();b();lt();Dt=globalThis.performance?.timeOrigin??Date.now(),Lt=globalThis.performance?.now?globalThis.performance.now.bind(globalThis.performance):()=>Date.now()-Dt,ki={name:"node",entryType:"node",startTime:0,duration:0,nodeStart:0,v8Start:0,bootstrapComplete:0,environment:0,loopStart:0,loopExit:0,idleTime:0,uvMetricsInfo:{loopCount:0,events:0,eventsWaiting:0},detail:void 0,toJSON(){return this}},ke=class{__unenv__=!0;detail;entryType="event";name;startTime;constructor(t,n){this.name=t,this.startTime=n?.startTime||Lt(),this.detail=n?.detail}get duration(){return Lt()-this.startTime}toJSON(){return{name:this.name,entryType:this.entryType,startTime:this.startTime,duration:this.duration,detail:this.detail}}};s(ke,"PerformanceEntry");Bt=s(class extends ke{entryType="mark";constructor(){super(...arguments)}get duration(){return 0}},"PerformanceMark"),Be=class extends ke{entryType="measure"};s(Be,"PerformanceMeasure");Pe=class extends ke{entryType="resource";serverTiming=[];connectEnd=0;connectStart=0;decodedBodySize=0;domainLookupEnd=0;domainLookupStart=0;encodedBodySize=0;fetchStart=0;initiatorType="";name="";nextHopProtocol="";redirectEnd=0;redirectStart=0;requestStart=0;responseEnd=0;responseStart=0;secureConnectionStart=0;startTime=0;transferSize=0;workerStart=0;responseStatus=0};s(Pe,"PerformanceResourceTiming");Ze=class{__unenv__=!0;getEntries(){return[]}getEntriesByName(t,n){return[]}getEntriesByType(t){return[]}};s(Ze,"PerformanceObserverEntryList");He=class{__unenv__=!0;timeOrigin=Dt;eventCounts=new Map;_entries=[];_resourceTimingBufferSize=0;navigation=void 0;timing=void 0;timerify(t,n){throw U("Performance.timerify")}get nodeTiming(){return ki}eventLoopUtilization(){return{}}markResourceTiming(){return new Pe("")}onresourcetimingbufferfull=null;now(){return this.timeOrigin===Dt?Lt():Date.now()-this.timeOrigin}clearMarks(t){this._entries=t?this._entries.filter(n=>n.name!==t):this._entries.filter(n=>n.entryType!=="mark")}clearMeasures(t){this._entries=t?this._entries.filter(n=>n.name!==t):this._entries.filter(n=>n.entryType!=="measure")}clearResourceTimings(){this._entries=this._entries.filter(t=>t.entryType!=="resource"||t.entryType!=="navigation")}getEntries(){return this._entries}getEntriesByName(t,n){return this._entries.filter(r=>r.name===t&&(!n||r.entryType===n))}getEntriesByType(t){return this._entries.filter(n=>n.entryType===t)}mark(t,n){let r=new Bt(t,n);return this._entries.push(r),r}measure(t,n,r){let i,a;typeof n=="string"?(i=this.getEntriesByName(n,"mark")[0]?.startTime,a=this.getEntriesByName(r,"mark")[0]?.startTime):(i=Number.parseFloat(n?.start)||this.now(),a=Number.parseFloat(n?.end)||this.now());let o=new Be(t,{startTime:i,detail:{start:i,end:a}});return this._entries.push(o),o}setResourceTimingBufferSize(t){this._resourceTimingBufferSize=t}addEventListener(t,n,r){throw U("Performance.addEventListener")}removeEventListener(t,n,r){throw U("Performance.removeEventListener")}dispatchEvent(t){throw U("Performance.dispatchEvent")}toJSON(){return this}};s(He,"Performance");Le=class{__unenv__=!0;_callback=null;constructor(t){this._callback=t}takeRecords(){return[]}disconnect(){throw U("PerformanceObserver.disconnect")}observe(t){throw U("PerformanceObserver.observe")}bind(t){return t}runInAsyncScope(t,n,...r){return t.call(n,...r)}asyncId(){return 0}triggerAsyncId(){return 0}emitDestroy(){return this}};s(Le,"PerformanceObserver"),mn(Le,"supportedEntryTypes",[]);vn=globalThis.performance&&"addEventListener"in globalThis.performance?globalThis.performance:new He});var wn=ie(()=>{E();v();b();En()});var b=ie(()=>{wn();globalThis.performance=vn;globalThis.Performance=He;globalThis.PerformanceEntry=ke;globalThis.PerformanceMark=Bt;globalThis.PerformanceMeasure=Be;globalThis.PerformanceObserver=Le;globalThis.PerformanceObserverEntryList=Ze;globalThis.PerformanceResourceTiming=Pe});var Y,xn=ie(()=>{E();v();b();Y=Object.assign(()=>{},{__unenv__:!0})});import{Writable as yn}from"node:stream";var G,kn,Sn,_n,ut,Si,As,$s,Ns,_i,Os,Is,Cs,Ms,Ds,Ls,Bs,Ps,Hs,Fs,js,Us,Ws,qs,Gs,Ks,Rn,zn,Tn,An,$n=ie(()=>{E();v();b();xn();lt();G=globalThis.console,kn=!0,Sn=new yn,_n=new yn,ut=G?.log??Y,Si=G?.info??ut,As=G?.trace??Si,$s=G?.debug??ut,Ns=G?.table??ut,_i=G?.error??ut,Os=G?.warn??_i,Is=G?.createTask??ve("console.createTask"),Cs=G?.clear??Y,Ms=G?.count??Y,Ds=G?.countReset??Y,Ls=G?.dir??Y,Bs=G?.dirxml??Y,Ps=G?.group??Y,Hs=G?.groupEnd??Y,Fs=G?.groupCollapsed??Y,js=G?.profile??Y,Us=G?.profileEnd??Y,Ws=G?.time??Y,qs=G?.timeEnd??Y,Gs=G?.timeLog??Y,Ks=G?.timeStamp??Y,Rn=G?.Console??bn("console.Console"),zn=new Map,Tn=Y,An=Y});var Pt,el,tl,nl,rl,il,al,ol,sl,ll,ul,dl,cl,pl,hl,fl,gl,ml,bl,vl,El,wl,xl,yl,kl,Nn,On=ie(()=>{E();v();b();$n();Pt=globalThis.console,{assert:el,clear:tl,context:nl,count:rl,countReset:il,createTask:al,debug:ol,dir:sl,dirxml:ll,error:ul,group:dl,groupCollapsed:cl,groupEnd:pl,info:hl,log:fl,profile:gl,profileEnd:ml,table:bl,time:vl,timeEnd:El,timeLog:wl,timeStamp:xl,trace:yl,warn:kl}=Pt;Object.assign(Pt,{Console:Rn,_ignoreErrors:kn,_stderr:Sn,_stderrErrorHandler:An,_stdout:_n,_stdoutErrorHandler:Tn,_times:zn});Nn=Pt});var v=ie(()=>{On();globalThis.console=Nn});var In,Cn=ie(()=>{E();v();b();In=Object.assign(s(function(t){let n=Date.now(),r=Math.trunc(n/1e3),i=n%1e3*1e6;if(t){let a=r-t[0],o=i-t[0];return o<0&&(a=a-1,o=1e9+o),[a,o]}return[r,i]},"hrtime"),{bigint:s(function(){return BigInt(Date.now()*1e6)},"bigint")})});import{Socket as Ri}from"node:net";var Fe,Mn=ie(()=>{E();v();b();Fe=class extends Ri{fd;constructor(t){super(),this.fd=t}isRaw=!1;setRawMode(t){return this.isRaw=t,this}isTTY=!1};s(Fe,"ReadStream")});import{Socket as zi}from"node:net";var Ae,Dn=ie(()=>{E();v();b();Ae=class extends zi{fd;constructor(t){super(),this.fd=t}clearLine(t,n){return n&&n(),!1}clearScreenDown(t){return t&&t(),!1}cursorTo(t,n,r){return r&&typeof r=="function"&&r(),!1}moveCursor(t,n,r){return r&&r(),!1}getColorDepth(t){return 1}hasColors(t,n){return!1}getWindowSize(){return[this.columns,this.rows]}columns=80;rows=24;isTTY=!1};s(Ae,"WriteStream")});var Ln=ie(()=>{E();v();b();Mn();Dn()});import{EventEmitter as Bn}from"node:events";var $e,Pn=ie(()=>{E();v();b();Ln();lt();$e=class extends Bn{env;hrtime;nextTick;constructor(t){super(),this.env=t.env,this.hrtime=t.hrtime,this.nextTick=t.nextTick;for(let n of[...Object.getOwnPropertyNames($e.prototype),...Object.getOwnPropertyNames(Bn.prototype)]){let r=this[n];typeof r=="function"&&(this[n]=r.bind(this))}}emitWarning(t,n,r){console.warn(`${r?`[${r}] `:""}${n?`${n}: `:""}${t}`)}emit(...t){return super.emit(...t)}listeners(t){return super.listeners(t)}#t;#e;#n;get stdin(){return this.#t??=new Fe(0)}get stdout(){return this.#e??=new Ae(1)}get stderr(){return this.#n??=new Ae(2)}#a="/";chdir(t){this.#a=t}cwd(){return this.#a}arch="";platform="";argv=[];argv0="";execArgv=[];execPath="";title="";pid=200;ppid=100;get version(){return""}get versions(){return{}}get allowedNodeEnvironmentFlags(){return new Set}get sourceMapsEnabled(){return!1}get debugPort(){return 0}get throwDeprecation(){return!1}get traceDeprecation(){return!1}get features(){return{}}get release(){return{}}get connected(){return!1}get config(){return{}}get moduleLoadList(){return[]}constrainedMemory(){return 0}availableMemory(){return 0}uptime(){return 0}resourceUsage(){return{}}ref(){}unref(){}umask(){throw U("process.umask")}getBuiltinModule(){}getActiveResourcesInfo(){throw U("process.getActiveResourcesInfo")}exit(){throw U("process.exit")}reallyExit(){throw U("process.reallyExit")}kill(){throw U("process.kill")}abort(){throw U("process.abort")}dlopen(){throw U("process.dlopen")}setSourceMapsEnabled(){throw U("process.setSourceMapsEnabled")}loadEnvFile(){throw U("process.loadEnvFile")}disconnect(){throw U("process.disconnect")}cpuUsage(){throw U("process.cpuUsage")}setUncaughtExceptionCaptureCallback(){throw U("process.setUncaughtExceptionCaptureCallback")}hasUncaughtExceptionCaptureCallback(){throw U("process.hasUncaughtExceptionCaptureCallback")}initgroups(){throw U("process.initgroups")}openStdin(){throw U("process.openStdin")}assert(){throw U("process.assert")}binding(){throw U("process.binding")}permission={has:ve("process.permission.has")};report={directory:"",filename:"",signal:"SIGUSR2",compact:!1,reportOnFatalError:!1,reportOnSignal:!1,reportOnUncaughtException:!1,getReport:ve("process.report.getReport"),writeReport:ve("process.report.writeReport")};finalization={register:ve("process.finalization.register"),unregister:ve("process.finalization.unregister"),registerBeforeExit:ve("process.finalization.registerBeforeExit")};memoryUsage=Object.assign(()=>({arrayBuffers:0,rss:0,external:0,heapTotal:0,heapUsed:0}),{rss:()=>0});mainModule=void 0;domain=void 0;send=void 0;exitCode=void 0;channel=void 0;getegid=void 0;geteuid=void 0;getgid=void 0;getgroups=void 0;getuid=void 0;setegid=void 0;seteuid=void 0;setgid=void 0;setgroups=void 0;setuid=void 0;_events=void 0;_eventsCount=void 0;_exiting=void 0;_maxListeners=void 0;_debugEnd=void 0;_debugProcess=void 0;_fatalException=void 0;_getActiveHandles=void 0;_getActiveRequests=void 0;_kill=void 0;_preload_modules=void 0;_rawDebug=void 0;_startProfilerIdleNotifier=void 0;_stopProfilerIdleNotifier=void 0;_tickCallback=void 0;_disconnect=void 0;_handleQueue=void 0;_pendingMessage=void 0;_channel=void 0;_send=void 0;_linkedBinding=void 0};s($e,"Process")});var Hn,Fn,Ti,Ai,jn,$i,Ni,Oi,Ii,Ci,Mi,Di,Li,Bi,Pi,Hi,Fi,ji,Ui,Wi,qi,Gi,Ki,Zi,Ji,Vi,Yi,Qi,Xi,ea,ta,na,ra,ia,aa,oa,sa,la,ua,da,ca,pa,ha,fa,ga,ma,ba,va,Ea,wa,xa,ya,ka,Sa,_a,Ra,za,Ta,Aa,$a,Na,Oa,Ia,Ca,Ma,Da,La,Ba,Pa,Ha,Fa,ja,Ua,Wa,qa,Ga,Ka,Za,Ja,Va,Ya,Qa,Xa,eo,to,no,ro,io,ao,oo,so,lo,uo,co,po,ho,fo,go,mo,bo,vo,Eo,wo,xo,yo,ko,So,_o,Ro,zo,Un,Wn=ie(()=>{E();v();b();Cn();Pn();Hn=globalThis.process,Fn=Hn.getBuiltinModule,{exit:Ti,platform:Ai,nextTick:jn}=Fn("node:process"),$i=new $e({env:Hn.env,hrtime:In,nextTick:jn}),{abort:Ni,addListener:Oi,allowedNodeEnvironmentFlags:Ii,hasUncaughtExceptionCaptureCallback:Ci,setUncaughtExceptionCaptureCallback:Mi,loadEnvFile:Di,sourceMapsEnabled:Li,arch:Bi,argv:Pi,argv0:Hi,chdir:Fi,config:ji,connected:Ui,constrainedMemory:Wi,availableMemory:qi,cpuUsage:Gi,cwd:Ki,debugPort:Zi,dlopen:Ji,disconnect:Vi,emit:Yi,emitWarning:Qi,env:Xi,eventNames:ea,execArgv:ta,execPath:na,finalization:ra,features:ia,getActiveResourcesInfo:aa,getMaxListeners:oa,hrtime:sa,kill:la,listeners:ua,listenerCount:da,memoryUsage:ca,on:pa,off:ha,once:fa,pid:ga,ppid:ma,prependListener:ba,prependOnceListener:va,rawListeners:Ea,release:wa,removeAllListeners:xa,removeListener:ya,report:ka,resourceUsage:Sa,setMaxListeners:_a,setSourceMapsEnabled:Ra,stderr:za,stdin:Ta,stdout:Aa,title:$a,throwDeprecation:Na,traceDeprecation:Oa,umask:Ia,uptime:Ca,version:Ma,versions:Da,domain:La,initgroups:Ba,moduleLoadList:Pa,reallyExit:Ha,openStdin:Fa,assert:ja,binding:Ua,send:Wa,exitCode:qa,channel:Ga,getegid:Ka,geteuid:Za,getgid:Ja,getgroups:Va,getuid:Ya,setegid:Qa,seteuid:Xa,setgid:eo,setgroups:to,setuid:no,permission:ro,mainModule:io,_events:ao,_eventsCount:oo,_exiting:so,_maxListeners:lo,_debugEnd:uo,_debugProcess:co,_fatalException:po,_getActiveHandles:ho,_getActiveRequests:fo,_kill:go,_preload_modules:mo,_rawDebug:bo,_startProfilerIdleNotifier:vo,_stopProfilerIdleNotifier:Eo,_tickCallback:wo,_disconnect:xo,_handleQueue:yo,_pendingMessage:ko,_channel:So,_send:_o,_linkedBinding:Ro}=$i,zo={abort:Ni,addListener:Oi,allowedNodeEnvironmentFlags:Ii,hasUncaughtExceptionCaptureCallback:Ci,setUncaughtExceptionCaptureCallback:Mi,loadEnvFile:Di,sourceMapsEnabled:Li,arch:Bi,argv:Pi,argv0:Hi,chdir:Fi,config:ji,connected:Ui,constrainedMemory:Wi,availableMemory:qi,cpuUsage:Gi,cwd:Ki,debugPort:Zi,dlopen:Ji,disconnect:Vi,emit:Yi,emitWarning:Qi,env:Xi,eventNames:ea,execArgv:ta,execPath:na,exit:Ti,finalization:ra,features:ia,getBuiltinModule:Fn,getActiveResourcesInfo:aa,getMaxListeners:oa,hrtime:sa,kill:la,listeners:ua,listenerCount:da,memoryUsage:ca,nextTick:jn,on:pa,off:ha,once:fa,pid:ga,platform:Ai,ppid:ma,prependListener:ba,prependOnceListener:va,rawListeners:Ea,release:wa,removeAllListeners:xa,removeListener:ya,report:ka,resourceUsage:Sa,setMaxListeners:_a,setSourceMapsEnabled:Ra,stderr:za,stdin:Ta,stdout:Aa,title:$a,throwDeprecation:Na,traceDeprecation:Oa,umask:Ia,uptime:Ca,version:Ma,versions:Da,domain:La,initgroups:Ba,moduleLoadList:Pa,reallyExit:Ha,openStdin:Fa,assert:ja,binding:Ua,send:Wa,exitCode:qa,channel:Ga,getegid:Ka,geteuid:Za,getgid:Ja,getgroups:Va,getuid:Ya,setegid:Qa,seteuid:Xa,setgid:eo,setgroups:to,setuid:no,permission:ro,mainModule:io,_events:ao,_eventsCount:oo,_exiting:so,_maxListeners:lo,_debugEnd:uo,_debugProcess:co,_fatalException:po,_getActiveHandles:ho,_getActiveRequests:fo,_kill:go,_preload_modules:mo,_rawDebug:bo,_startProfilerIdleNotifier:vo,_stopProfilerIdleNotifier:Eo,_tickCallback:wo,_disconnect:xo,_handleQueue:yo,_pendingMessage:ko,_channel:So,_send:_o,_linkedBinding:Ro},Un=zo});var E=ie(()=>{Wn();globalThis.process=Un});var ri=wi((ti,ni)=>{E();v();b();var ei=function(){var e=s(function(N,$){var T=236,_=17,g=N,R=n[$],c=null,u=0,A=null,m=[],z={},H=s(function(w,x){u=g*4+17,c=function(h){for(var y=new Array(h),k=0;k<h;k+=1){y[k]=new Array(h);for(var O=0;O<h;O+=1)y[k][O]=null}return y}(u),F(0,0),F(u-7,0),F(0,u-7),re(),J(),me(w,x),g>=7&&he(w),A==null&&(A=pi(g,R,m)),be(A,x)},"makeImpl"),F=s(function(w,x){for(var h=-1;h<=7;h+=1)if(!(w+h<=-1||u<=w+h))for(var y=-1;y<=7;y+=1)x+y<=-1||u<=x+y||(0<=h&&h<=6&&(y==0||y==6)||0<=y&&y<=6&&(h==0||h==6)||2<=h&&h<=4&&2<=y&&y<=4?c[w+h][x+y]=!0:c[w+h][x+y]=!1)},"setupPositionProbePattern"),j=s(function(){for(var w=0,x=0,h=0;h<8;h+=1){H(!0,h);var y=i.getLostPoint(z);(h==0||w>y)&&(w=y,x=h)}return x},"getBestMaskPattern"),J=s(function(){for(var w=8;w<u-8;w+=1)c[w][6]==null&&(c[w][6]=w%2==0);for(var x=8;x<u-8;x+=1)c[6][x]==null&&(c[6][x]=x%2==0)},"setupTimingPattern"),re=s(function(){for(var w=i.getPatternPosition(g),x=0;x<w.length;x+=1)for(var h=0;h<w.length;h+=1){var y=w[x],k=w[h];if(c[y][k]==null)for(var O=-2;O<=2;O+=1)for(var D=-2;D<=2;D+=1)O==-2||O==2||D==-2||D==2||O==0&&D==0?c[y+O][k+D]=!0:c[y+O][k+D]=!1}},"setupPositionAdjustPattern"),he=s(function(w){for(var x=i.getBCHTypeNumber(g),h=0;h<18;h+=1){var y=!w&&(x>>h&1)==1;c[Math.floor(h/3)][h%3+u-8-3]=y}for(var h=0;h<18;h+=1){var y=!w&&(x>>h&1)==1;c[h%3+u-8-3][Math.floor(h/3)]=y}},"setupTypeNumber"),me=s(function(w,x){for(var h=R<<3|x,y=i.getBCHTypeInfo(h),k=0;k<15;k+=1){var O=!w&&(y>>k&1)==1;k<6?c[k][8]=O:k<8?c[k+1][8]=O:c[u-15+k][8]=O}for(var k=0;k<15;k+=1){var O=!w&&(y>>k&1)==1;k<8?c[8][u-k-1]=O:k<9?c[8][15-k-1+1]=O:c[8][15-k-1]=O}c[u-8][8]=!w},"setupTypeInfo"),be=s(function(w,x){for(var h=-1,y=u-1,k=7,O=0,D=i.getMaskFunction(x),C=u-1;C>0;C-=2)for(C==6&&(C-=1);;){for(var W=0;W<2;W+=1)if(c[y][C-W]==null){var V=!1;O<w.length&&(V=(w[O]>>>k&1)==1);var L=D(y,C-W);L&&(V=!V),c[y][C-W]=V,k-=1,k==-1&&(O+=1,k=7)}if(y+=h,y<0||u<=y){y-=h,h=-h;break}}},"mapData"),Me=s(function(w,x){for(var h=0,y=0,k=0,O=new Array(x.length),D=new Array(x.length),C=0;C<x.length;C+=1){var W=x[C].dataCount,V=x[C].totalCount-W;y=Math.max(y,W),k=Math.max(k,V),O[C]=new Array(W);for(var L=0;L<O[C].length;L+=1)O[C][L]=255&w.getBuffer()[L+h];h+=W;var se=i.getErrorCorrectPolynomial(V),le=o(O[C],se.getLength()-1),hn=le.mod(se);D[C]=new Array(se.getLength()-1);for(var L=0;L<D[C].length;L+=1){var fn=L+hn.getLength()-D[C].length;D[C][L]=fn>=0?hn.getAt(fn):0}}for(var gn=0,L=0;L<x.length;L+=1)gn+=x[L].totalCount;for(var Mt=new Array(gn),ot=0,L=0;L<y;L+=1)for(var C=0;C<x.length;C+=1)L<O[C].length&&(Mt[ot]=O[C][L],ot+=1);for(var L=0;L<k;L+=1)for(var C=0;C<x.length;C+=1)L<D[C].length&&(Mt[ot]=D[C][L],ot+=1);return Mt},"createBytes"),pi=s(function(w,x,h){for(var y=l.getRSBlocks(w,x),k=d(),O=0;O<h.length;O+=1){var D=h[O];k.put(D.getMode(),4),k.put(D.getLength(),i.getLengthInBits(D.getMode(),w)),D.write(k)}for(var C=0,O=0;O<y.length;O+=1)C+=y[O].dataCount;if(k.getLengthInBits()>C*8)throw"code length overflow. ("+k.getLengthInBits()+">"+C*8+")";for(k.getLengthInBits()+4<=C*8&&k.put(0,4);k.getLengthInBits()%8!=0;)k.putBit(!1);for(;!(k.getLengthInBits()>=C*8||(k.put(T,8),k.getLengthInBits()>=C*8));)k.put(_,8);return Me(k,y)},"createData");z.addData=function(w,x){x=x||"Byte";var h=null;switch(x){case"Numeric":h=p(w);break;case"Alphanumeric":h=S(w);break;case"Byte":h=I(w);break;case"Kanji":h=B(w);break;default:throw"mode:"+x}m.push(h),A=null},z.isDark=function(w,x){if(w<0||u<=w||x<0||u<=x)throw w+","+x;return c[w][x]},z.getModuleCount=function(){return u},z.make=function(){if(g<1){for(var w=1;w<40;w++){for(var x=l.getRSBlocks(w,R),h=d(),y=0;y<m.length;y++){var k=m[y];h.put(k.getMode(),4),h.put(k.getLength(),i.getLengthInBits(k.getMode(),w)),k.write(h)}for(var O=0,y=0;y<x.length;y++)O+=x[y].dataCount;if(h.getLengthInBits()<=O*8)break}g=w}H(!1,j())},z.createTableTag=function(w,x){w=w||2,x=typeof x>"u"?w*4:x;var h="";h+='<table style="',h+=" border-width: 0px; border-style: none;",h+=" border-collapse: collapse;",h+=" padding: 0px; margin: "+x+"px;",h+='">',h+="<tbody>";for(var y=0;y<z.getModuleCount();y+=1){h+="<tr>";for(var k=0;k<z.getModuleCount();k+=1)h+='<td style="',h+=" border-width: 0px; border-style: none;",h+=" border-collapse: collapse;",h+=" padding: 0px; margin: 0px;",h+=" width: "+w+"px;",h+=" height: "+w+"px;",h+=" background-color: ",h+=z.isDark(y,k)?"#000000":"#ffffff",h+=";",h+='"/>';h+="</tr>"}return h+="</tbody>",h+="</table>",h},z.createSvgTag=function(w,x,h,y){var k={};typeof arguments[0]=="object"&&(k=arguments[0],w=k.cellSize,x=k.margin,h=k.alt,y=k.title),w=w||2,x=typeof x>"u"?w*4:x,h=typeof h=="string"?{text:h}:h||{},h.text=h.text||null,h.id=h.text?h.id||"qrcode-description":null,y=typeof y=="string"?{text:y}:y||{},y.text=y.text||null,y.id=y.text?y.id||"qrcode-title":null;var O=z.getModuleCount()*w+x*2,D,C,W,V,L="",se;for(se="l"+w+",0 0,"+w+" -"+w+",0 0,-"+w+"z ",L+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',L+=k.scalable?"":' width="'+O+'px" height="'+O+'px"',L+=' viewBox="0 0 '+O+" "+O+'" ',L+=' preserveAspectRatio="xMinYMin meet"',L+=y.text||h.text?' role="img" aria-labelledby="'+De([y.id,h.id].join(" ").trim())+'"':"",L+=">",L+=y.text?'<title id="'+De(y.id)+'">'+De(y.text)+"</title>":"",L+=h.text?'<description id="'+De(h.id)+'">'+De(h.text)+"</description>":"",L+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',L+='<path d="',W=0;W<z.getModuleCount();W+=1)for(V=W*w+x,D=0;D<z.getModuleCount();D+=1)z.isDark(W,D)&&(C=D*w+x,L+="M"+C+","+V+se);return L+='" stroke="transparent" fill="black"/>',L+="</svg>",L},z.createDataURL=function(w,x){w=w||2,x=typeof x>"u"?w*4:x;var h=z.getModuleCount()*w+x*2,y=x,k=h-x;return ne(h,h,function(O,D){if(y<=O&&O<k&&y<=D&&D<k){var C=Math.floor((O-y)/w),W=Math.floor((D-y)/w);return z.isDark(W,C)?0:1}else return 1})},z.createImgTag=function(w,x,h){w=w||2,x=typeof x>"u"?w*4:x;var y=z.getModuleCount()*w+x*2,k="";return k+="<img",k+=' src="',k+=z.createDataURL(w,x),k+='"',k+=' width="',k+=y,k+='"',k+=' height="',k+=y,k+='"',h&&(k+=' alt="',k+=De(h),k+='"'),k+="/>",k};var De=s(function(w){for(var x="",h=0;h<w.length;h+=1){var y=w.charAt(h);switch(y){case"<":x+="&lt;";break;case">":x+="&gt;";break;case"&":x+="&amp;";break;case'"':x+="&quot;";break;default:x+=y;break}}return x},"escapeXml"),hi=s(function(w){var x=1;w=typeof w>"u"?x*2:w;var h=z.getModuleCount()*x+w*2,y=w,k=h-w,O,D,C,W,V,L={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},se={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},le="";for(O=0;O<h;O+=2){for(C=Math.floor((O-y)/x),W=Math.floor((O+1-y)/x),D=0;D<h;D+=1)V="\u2588",y<=D&&D<k&&y<=O&&O<k&&z.isDark(C,Math.floor((D-y)/x))&&(V=" "),y<=D&&D<k&&y<=O+1&&O+1<k&&z.isDark(W,Math.floor((D-y)/x))?V+=" ":V+="\u2588",le+=w<1&&O+1>=k?se[V]:L[V];le+=`
`}return h%2&&w>0?le.substring(0,le.length-h-1)+Array(h+1).join("\u2580"):le.substring(0,le.length-1)},"_createHalfASCII");return z.createASCII=function(w,x){if(w=w||1,w<2)return hi(x);w-=1,x=typeof x>"u"?w*2:x;var h=z.getModuleCount()*w+x*2,y=x,k=h-x,O,D,C,W,V=Array(w+1).join("\u2588\u2588"),L=Array(w+1).join("  "),se="",le="";for(O=0;O<h;O+=1){for(C=Math.floor((O-y)/w),le="",D=0;D<h;D+=1)W=1,y<=D&&D<k&&y<=O&&O<k&&z.isDark(C,Math.floor((D-y)/w))&&(W=0),le+=W?V:L;for(C=0;C<w;C+=1)se+=le+`
`}return se.substring(0,se.length-1)},z.renderTo2dContext=function(w,x){x=x||2;for(var h=z.getModuleCount(),y=0;y<h;y++)for(var k=0;k<h;k++)w.fillStyle=z.isDark(y,k)?"black":"white",w.fillRect(y*x,k*x,x,x)},z},"qrcode");e.stringToBytesFuncs={default:function(N){for(var $=[],T=0;T<N.length;T+=1){var _=N.charCodeAt(T);$.push(_&255)}return $}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(N,$){var T=function(){for(var g=ye(N),R=s(function(){var J=g.read();if(J==-1)throw"eof";return J},"read"),c=0,u={};;){var A=g.read();if(A==-1)break;var m=R(),z=R(),H=R(),F=String.fromCharCode(A<<8|m),j=z<<8|H;u[F]=j,c+=1}if(c!=$)throw c+" != "+$;return u}(),_="?".charCodeAt(0);return function(g){for(var R=[],c=0;c<g.length;c+=1){var u=g.charCodeAt(c);if(u<128)R.push(u);else{var A=T[g.charAt(c)];typeof A=="number"?(A&255)==A?R.push(A):(R.push(A>>>8),R.push(A&255)):R.push(_)}}return R}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},n={L:1,M:0,Q:3,H:2},r={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},i=function(){var N=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],$=1335,T=7973,_=21522,g={},R=s(function(c){for(var u=0;c!=0;)u+=1,c>>>=1;return u},"getBCHDigit");return g.getBCHTypeInfo=function(c){for(var u=c<<10;R(u)-R($)>=0;)u^=$<<R(u)-R($);return(c<<10|u)^_},g.getBCHTypeNumber=function(c){for(var u=c<<12;R(u)-R(T)>=0;)u^=T<<R(u)-R(T);return c<<12|u},g.getPatternPosition=function(c){return N[c-1]},g.getMaskFunction=function(c){switch(c){case r.PATTERN000:return function(u,A){return(u+A)%2==0};case r.PATTERN001:return function(u,A){return u%2==0};case r.PATTERN010:return function(u,A){return A%3==0};case r.PATTERN011:return function(u,A){return(u+A)%3==0};case r.PATTERN100:return function(u,A){return(Math.floor(u/2)+Math.floor(A/3))%2==0};case r.PATTERN101:return function(u,A){return u*A%2+u*A%3==0};case r.PATTERN110:return function(u,A){return(u*A%2+u*A%3)%2==0};case r.PATTERN111:return function(u,A){return(u*A%3+(u+A)%2)%2==0};default:throw"bad maskPattern:"+c}},g.getErrorCorrectPolynomial=function(c){for(var u=o([1],0),A=0;A<c;A+=1)u=u.multiply(o([1,a.gexp(A)],0));return u},g.getLengthInBits=function(c,u){if(1<=u&&u<10)switch(c){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+c}else if(u<27)switch(c){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+c}else if(u<41)switch(c){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+c}else throw"type:"+u},g.getLostPoint=function(c){for(var u=c.getModuleCount(),A=0,m=0;m<u;m+=1)for(var z=0;z<u;z+=1){for(var H=0,F=c.isDark(m,z),j=-1;j<=1;j+=1)if(!(m+j<0||u<=m+j))for(var J=-1;J<=1;J+=1)z+J<0||u<=z+J||j==0&&J==0||F==c.isDark(m+j,z+J)&&(H+=1);H>5&&(A+=3+H-5)}for(var m=0;m<u-1;m+=1)for(var z=0;z<u-1;z+=1){var re=0;c.isDark(m,z)&&(re+=1),c.isDark(m+1,z)&&(re+=1),c.isDark(m,z+1)&&(re+=1),c.isDark(m+1,z+1)&&(re+=1),(re==0||re==4)&&(A+=3)}for(var m=0;m<u;m+=1)for(var z=0;z<u-6;z+=1)c.isDark(m,z)&&!c.isDark(m,z+1)&&c.isDark(m,z+2)&&c.isDark(m,z+3)&&c.isDark(m,z+4)&&!c.isDark(m,z+5)&&c.isDark(m,z+6)&&(A+=40);for(var z=0;z<u;z+=1)for(var m=0;m<u-6;m+=1)c.isDark(m,z)&&!c.isDark(m+1,z)&&c.isDark(m+2,z)&&c.isDark(m+3,z)&&c.isDark(m+4,z)&&!c.isDark(m+5,z)&&c.isDark(m+6,z)&&(A+=40);for(var he=0,z=0;z<u;z+=1)for(var m=0;m<u;m+=1)c.isDark(m,z)&&(he+=1);var me=Math.abs(100*he/u/u-50)/5;return A+=me*10,A},g}(),a=function(){for(var N=new Array(256),$=new Array(256),T=0;T<8;T+=1)N[T]=1<<T;for(var T=8;T<256;T+=1)N[T]=N[T-4]^N[T-5]^N[T-6]^N[T-8];for(var T=0;T<255;T+=1)$[N[T]]=T;var _={};return _.glog=function(g){if(g<1)throw"glog("+g+")";return $[g]},_.gexp=function(g){for(;g<0;)g+=255;for(;g>=256;)g-=255;return N[g]},_}();function o(N,$){if(typeof N.length>"u")throw N.length+"/"+$;var T=function(){for(var g=0;g<N.length&&N[g]==0;)g+=1;for(var R=new Array(N.length-g+$),c=0;c<N.length-g;c+=1)R[c]=N[c+g];return R}(),_={};return _.getAt=function(g){return T[g]},_.getLength=function(){return T.length},_.multiply=function(g){for(var R=new Array(_.getLength()+g.getLength()-1),c=0;c<_.getLength();c+=1)for(var u=0;u<g.getLength();u+=1)R[c+u]^=a.gexp(a.glog(_.getAt(c))+a.glog(g.getAt(u)));return o(R,0)},_.mod=function(g){if(_.getLength()-g.getLength()<0)return _;for(var R=a.glog(_.getAt(0))-a.glog(g.getAt(0)),c=new Array(_.getLength()),u=0;u<_.getLength();u+=1)c[u]=_.getAt(u);for(var u=0;u<g.getLength();u+=1)c[u]^=a.gexp(a.glog(g.getAt(u))+R);return o(c,0).mod(g)},_}s(o,"qrPolynomial");var l=function(){var N=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],$=s(function(g,R){var c={};return c.totalCount=g,c.dataCount=R,c},"qrRSBlock"),T={},_=s(function(g,R){switch(R){case n.L:return N[(g-1)*4+0];case n.M:return N[(g-1)*4+1];case n.Q:return N[(g-1)*4+2];case n.H:return N[(g-1)*4+3];default:return}},"getRsBlockTable");return T.getRSBlocks=function(g,R){var c=_(g,R);if(typeof c>"u")throw"bad rs block @ typeNumber:"+g+"/errorCorrectionLevel:"+R;for(var u=c.length/3,A=[],m=0;m<u;m+=1)for(var z=c[m*3+0],H=c[m*3+1],F=c[m*3+2],j=0;j<z;j+=1)A.push($(H,F));return A},T}(),d=s(function(){var N=[],$=0,T={};return T.getBuffer=function(){return N},T.getAt=function(_){var g=Math.floor(_/8);return(N[g]>>>7-_%8&1)==1},T.put=function(_,g){for(var R=0;R<g;R+=1)T.putBit((_>>>g-R-1&1)==1)},T.getLengthInBits=function(){return $},T.putBit=function(_){var g=Math.floor($/8);N.length<=g&&N.push(0),_&&(N[g]|=128>>>$%8),$+=1},T},"qrBitBuffer"),p=s(function(N){var $=t.MODE_NUMBER,T=N,_={};_.getMode=function(){return $},_.getLength=function(c){return T.length},_.write=function(c){for(var u=T,A=0;A+2<u.length;)c.put(g(u.substring(A,A+3)),10),A+=3;A<u.length&&(u.length-A==1?c.put(g(u.substring(A,A+1)),4):u.length-A==2&&c.put(g(u.substring(A,A+2)),7))};var g=s(function(c){for(var u=0,A=0;A<c.length;A+=1)u=u*10+R(c.charAt(A));return u},"strToNum"),R=s(function(c){if("0"<=c&&c<="9")return c.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+c},"chatToNum");return _},"qrNumber"),S=s(function(N){var $=t.MODE_ALPHA_NUM,T=N,_={};_.getMode=function(){return $},_.getLength=function(R){return T.length},_.write=function(R){for(var c=T,u=0;u+1<c.length;)R.put(g(c.charAt(u))*45+g(c.charAt(u+1)),11),u+=2;u<c.length&&R.put(g(c.charAt(u)),6)};var g=s(function(R){if("0"<=R&&R<="9")return R.charCodeAt(0)-"0".charCodeAt(0);if("A"<=R&&R<="Z")return R.charCodeAt(0)-"A".charCodeAt(0)+10;switch(R){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+R}},"getCode");return _},"qrAlphaNum"),I=s(function(N){var $=t.MODE_8BIT_BYTE,T=N,_=e.stringToBytes(N),g={};return g.getMode=function(){return $},g.getLength=function(R){return _.length},g.write=function(R){for(var c=0;c<_.length;c+=1)R.put(_[c],8)},g},"qr8BitByte"),B=s(function(N){var $=t.MODE_KANJI,T=N,_=e.stringToBytesFuncs.SJIS;if(!_)throw"sjis not supported.";(function(c,u){var A=_(c);if(A.length!=2||(A[0]<<8|A[1])!=u)throw"sjis not supported."})("\u53CB",38726);var g=_(N),R={};return R.getMode=function(){return $},R.getLength=function(c){return~~(g.length/2)},R.write=function(c){for(var u=g,A=0;A+1<u.length;){var m=(255&u[A])<<8|255&u[A+1];if(33088<=m&&m<=40956)m-=33088;else if(57408<=m&&m<=60351)m-=49472;else throw"illegal char at "+(A+1)+"/"+m;m=(m>>>8&255)*192+(m&255),c.put(m,13),A+=2}if(A<u.length)throw"illegal char at "+(A+1)},R},"qrKanji"),P=s(function(){var N=[],$={};return $.writeByte=function(T){N.push(T&255)},$.writeShort=function(T){$.writeByte(T),$.writeByte(T>>>8)},$.writeBytes=function(T,_,g){_=_||0,g=g||T.length;for(var R=0;R<g;R+=1)$.writeByte(T[R+_])},$.writeString=function(T){for(var _=0;_<T.length;_+=1)$.writeByte(T.charCodeAt(_))},$.toByteArray=function(){return N},$.toString=function(){var T="";T+="[";for(var _=0;_<N.length;_+=1)_>0&&(T+=","),T+=N[_];return T+="]",T},$},"byteArrayOutputStream"),pe=s(function(){var N=0,$=0,T=0,_="",g={},R=s(function(u){_+=String.fromCharCode(c(u&63))},"writeEncoded"),c=s(function(u){if(!(u<0)){if(u<26)return 65+u;if(u<52)return 97+(u-26);if(u<62)return 48+(u-52);if(u==62)return 43;if(u==63)return 47}throw"n:"+u},"encode");return g.writeByte=function(u){for(N=N<<8|u&255,$+=8,T+=1;$>=6;)R(N>>>$-6),$-=6},g.flush=function(){if($>0&&(R(N<<6-$),N=0,$=0),T%3!=0)for(var u=3-T%3,A=0;A<u;A+=1)_+="="},g.toString=function(){return _},g},"base64EncodeOutputStream"),ye=s(function(N){var $=N,T=0,_=0,g=0,R={};R.read=function(){for(;g<8;){if(T>=$.length){if(g==0)return-1;throw"unexpected end of file./"+g}var u=$.charAt(T);if(T+=1,u=="=")return g=0,-1;if(u.match(/^\s$/))continue;_=_<<6|c(u.charCodeAt(0)),g+=6}var A=_>>>g-8&255;return g-=8,A};var c=s(function(u){if(65<=u&&u<=90)return u-65;if(97<=u&&u<=122)return u-97+26;if(48<=u&&u<=57)return u-48+52;if(u==43)return 62;if(u==47)return 63;throw"c:"+u},"decode");return R},"base64DecodeInputStream"),Ke=s(function(N,$){var T=N,_=$,g=new Array(N*$),R={};R.setPixel=function(m,z,H){g[z*T+m]=H},R.write=function(m){m.writeString("GIF87a"),m.writeShort(T),m.writeShort(_),m.writeByte(128),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(255),m.writeByte(255),m.writeByte(255),m.writeString(","),m.writeShort(0),m.writeShort(0),m.writeShort(T),m.writeShort(_),m.writeByte(0);var z=2,H=u(z);m.writeByte(z);for(var F=0;H.length-F>255;)m.writeByte(255),m.writeBytes(H,F,255),F+=255;m.writeByte(H.length-F),m.writeBytes(H,F,H.length-F),m.writeByte(0),m.writeString(";")};var c=s(function(m){var z=m,H=0,F=0,j={};return j.write=function(J,re){if(J>>>re)throw"length over";for(;H+re>=8;)z.writeByte(255&(J<<H|F)),re-=8-H,J>>>=8-H,F=0,H=0;F=J<<H|F,H=H+re},j.flush=function(){H>0&&z.writeByte(F)},j},"bitOutputStream"),u=s(function(m){for(var z=1<<m,H=(1<<m)+1,F=m+1,j=A(),J=0;J<z;J+=1)j.add(String.fromCharCode(J));j.add(String.fromCharCode(z)),j.add(String.fromCharCode(H));var re=P(),he=c(re);he.write(z,F);var me=0,be=String.fromCharCode(g[me]);for(me+=1;me<g.length;){var Me=String.fromCharCode(g[me]);me+=1,j.contains(be+Me)?be=be+Me:(he.write(j.indexOf(be),F),j.size()<4095&&(j.size()==1<<F&&(F+=1),j.add(be+Me)),be=Me)}return he.write(j.indexOf(be),F),he.write(H,F),he.flush(),re.toByteArray()},"getLZWRaster"),A=s(function(){var m={},z=0,H={};return H.add=function(F){if(H.contains(F))throw"dup key:"+F;m[F]=z,z+=1},H.size=function(){return z},H.indexOf=function(F){return m[F]},H.contains=function(F){return typeof m[F]<"u"},H},"lzwTable");return R},"gifImage"),ne=s(function(N,$,T){for(var _=Ke(N,$),g=0;g<$;g+=1)for(var R=0;R<N;R+=1)_.setPixel(R,g,T(R,g));var c=P();_.write(c);for(var u=pe(),A=c.toByteArray(),m=0;m<A.length;m+=1)u.writeByte(A[m]);return u.flush(),"data:image/gif;base64,"+u},"createDataURL");return e}();(function(){ei.stringToBytesFuncs["UTF-8"]=function(e){function t(n){for(var r=[],i=0;i<n.length;i++){var a=n.charCodeAt(i);a<128?r.push(a):a<2048?r.push(192|a>>6,128|a&63):a<55296||a>=57344?r.push(224|a>>12,128|a>>6&63,128|a&63):(i++,a=65536+((a&1023)<<10|n.charCodeAt(i)&1023),r.push(240|a>>18,128|a>>12&63,128|a>>6&63,128|a&63))}return r}return s(t,"toUTF8Array"),t(e)}})();(function(e){typeof define=="function"&&define.amd?define([],e):typeof ti=="object"&&(ni.exports=e())})(function(){return ei})});E();v();b();E();v();b();E();v();b();E();v();b();E();v();b();var Ht=s((e,t,n)=>(r,i)=>{let a=-1;return o(0);async function o(l){if(l<=a)throw new Error("next() called multiple times");a=l;let d,p=!1,S;if(e[l]?(S=e[l][0][0],r.req.routeIndex=l):S=l===e.length&&i||void 0,S)try{d=await S(r,()=>o(l+1))}catch(I){if(I instanceof Error&&t)r.error=I,d=await t(I,r),p=!0;else throw I}else r.finalized===!1&&n&&(d=await n(r));return d&&(r.finalized===!1||p)&&(r.res=d),r}},"compose");E();v();b();E();v();b();E();v();b();E();v();b();var qn=Symbol();E();v();b();E();v();b();E();v();b();var Gn=s((e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,r=>r.toLowerCase())}}).formData(),"bufferToFormData");var Kn=32,To=1e4,dt=s(e=>"headers"in e,"isRawRequest"),Vn=s(async(e,t=Object.create(null))=>{let{all:n=!1,dot:r=!1}=t,o=(dt(e)?e.headers:e.raw.headers).get("Content-Type")?.split(";")[0].trim().toLowerCase();return o==="multipart/form-data"||o==="application/x-www-form-urlencoded"?Ao(e,{all:n,dot:r}):{}},"parseBody");async function Ao(e,t){if(!dt(e)&&e.bodyCache.formData)return Zn(await e.bodyCache.formData,t);let n=dt(e)?e.headers:e.raw.headers,r=await e.arrayBuffer(),i=Gn(r,n.get("Content-Type")||"");dt(e)||(e.bodyCache.formData=i);let a=await i;return a?Zn(a,t):{}}s(Ao,"parseFormData");function Zn(e,t){let n=Object.create(null),r={count:0};return e.forEach((i,a)=>{t.all||a.endsWith("[]")?$o(n,a,i):n[a]=i}),t.dot&&Object.entries(n).forEach(([i,a])=>{i.includes(".")&&(No(n,i,a,r),delete n[i])}),n}s(Zn,"convertFormDataToBodyData");var $o=s((e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},"handleParsingAllValues"),No=s((e,t,n,r)=>{if(/(?:^|\.)__proto__\./.test(t))return;let i=e,a=t.split(".",Kn+2);a.length>Kn+1&&Jn(),a.forEach((o,l)=>{l===a.length-1?i[o]=n:((!i[o]||typeof i[o]!="object"||Array.isArray(i[o])||i[o]instanceof File)&&(r.count++>=To&&Jn(),i[o]=Object.create(null)),i=i[o])})},"handleParsingNestedValues"),Jn=s(()=>{throw new Error("Nesting limit exceeded")},"throwNestingLimitExceeded");E();v();b();var jt=s(e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},"splitPath"),Yn=s(e=>{let{groups:t,path:n}=Oo(e),r=jt(n);return Io(r,t)},"splitRoutingPath"),Oo=s(e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(n,r)=>{let i=`@${r}`;return t.push([i,n]),i}),{groups:t,path:e}},"extractGroupsFromPath"),Io=s((e,t)=>{for(let n=t.length-1;n>=0;n--){let[r]=t[n];for(let i=e.length-1;i>=0;i--)if(e[i].includes(r)){e[i]=e[i].replace(r,t[n][1]);break}}return e},"replaceGroupMarks"),ct={},Qn=s((e,t)=>{if(e==="*")return"*";let n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){let r=`${e}#${t}`;return ct[r]||(n[2]?ct[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:ct[r]=[e,n[1],!0]),ct[r]}return null},"getPattern"),Xn=s((e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},"tryDecode"),Co=s(e=>Xn(e,decodeURI),"tryDecodeURI"),Ut=s(e=>{let t=e.url,n=t.indexOf("/",t.indexOf(":")+4),r=n;for(;r<t.length;r++){let i=t.charCodeAt(r);if(i===37){let a=t.indexOf("?",r),o=t.indexOf("#",r),l=a===-1?o===-1?void 0:o:o===-1?a:Math.min(a,o),d=t.slice(n,l);return Co(d.includes("%25")?d.replace(/%25/g,"%2525"):d)}else if(i===63||i===35)break}return t.slice(n,r)},"getPath");var er=s(e=>{let t=Ut(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},"getPathNoStrict"),Se=s((e,t,...n)=>(n.length&&(t=Se(t,...n)),`${e?.[0]==="/"?"":"/"}${e}${t==="/"?"":`${e?.at(-1)==="/"?"":"/"}${t?.[0]==="/"?t.slice(1):t}`}`),"mergePath"),pt=s(e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;let t=e.split("/"),n=[],r="";return t.forEach(i=>{if(i!==""&&!/\:/.test(i))r+="/"+i;else if(/\:/.test(i))if(i.charCodeAt(i.length-1)===63){n.length===0&&r===""?n.push("/"):n.push(r);let a=i.slice(0,-1);r+="/"+a,n.push(r)}else r+="/"+i}),n.filter((i,a,o)=>o.indexOf(i)===a)},"checkOptionalParameter"),ht=s(e=>e.indexOf("%")!==-1?Xn(e,Mo):e,"tryDecodeURIComponent"),Ft=s(e=>(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),ht(e)),"_decodeURI"),tr=s((e,t,n)=>{let r=e.indexOf("#",8);r!==-1&&(e=e.slice(0,r));let i;if(!n&&t&&t.indexOf("%")===-1&&t.indexOf("+")===-1){let l=e.indexOf("?",8);if(l===-1)return;for(e.startsWith(t,l+1)||(l=e.indexOf(`&${t}`,l+1));l!==-1;){let d=e.charCodeAt(l+t.length+1);if(d===61){let p=l+t.length+2,S=e.indexOf("&",p);return Ft(e.slice(p,S===-1?void 0:S))}else if(d==38||isNaN(d))return"";l=e.indexOf(`&${t}`,l+1)}if(i=/[%+]/.test(e),!i)return}let a=Object.create(null);i??=/[%+]/.test(e);let o=e.indexOf("?",8);for(;o!==-1;){let l=e.indexOf("&",o+1),d=e.indexOf("=",o);d>l&&l!==-1&&(d=-1);let p=e.slice(o+1,d===-1?l===-1?void 0:l:d);if(i&&(p=Ft(p)),o=l,p==="")continue;let S;d===-1?S="":(S=e.slice(d+1,l===-1?void 0:l),i&&(S=Ft(S))),n?(a[p]&&Array.isArray(a[p])||(a[p]=[]),a[p].push(S)):a[p]??=S}return t?a[t]:a},"_getQueryParam"),nr=tr,rr=s((e,t)=>tr(e,t,!0),"getQueryParams"),Mo=decodeURIComponent;var ir=s(class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",n=[[]]){this.raw=e,this.path=t,this.#e=n}param(e){return e?this.#n(e):this.#a()}#n(e){let t=this.#e[0][this.routeIndex]?.[1][e],n=this.#r(t);return n&&ht(n)}#a(){let e={},t=Object.keys(this.#e[0][this.routeIndex]?.[1]??{});for(let n of t){let r=this.#r(this.#e[0][this.routeIndex][1][n]);r!==void 0&&(e[n]=ht(r))}return e}#r(e){return this.#e[1]?this.#e[1][e]:e}query(e){return nr(this.url,e)}queries(e){return rr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;let t=Object.create(null);return this.raw.headers.forEach((n,r)=>{t[r]=n}),t}async parseBody(e){return Vn(this,e)}#i=e=>{let{bodyCache:t,raw:n}=this,r=t[e];if(r)return r;for(let i in t)return t[i].then(a=>(i==="json"&&(a=JSON.stringify(a)),new Response(a)[e]()));return t[e]=n[e]()};json(){return this.#i("text").then(e=>JSON.parse(e))}text(){return this.#i("text")}arrayBuffer(){return this.#i("arrayBuffer")}bytes(){return this.#i("arrayBuffer").then(e=>new Uint8Array(e))}blob(){return this.#i("blob")}formData(){return this.#i("formData")}addValidatedData(e,t){(this.#t??={})[e]=t}valid(e){return this.#t?.[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[qn](){return this.#e}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}},"HonoRequest");E();v();b();var ar={Stringify:1,BeforeStream:2,Stream:3},Do=s((e,t)=>{let n=new String(e);return n.isEscaped=!0,n.callbacks=t,n},"raw");var Wt=s(async(e,t,n,r,i)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));let a=e.callbacks;if(!a?.length)return Promise.resolve(e);i?i[0]+=e:i=[e];let o=Promise.all(a.map(l=>l({phase:t,buffer:i,context:r}))).then(l=>Promise.all(l.filter(Boolean).map(d=>Wt(d,t,!1,r,i))).then(()=>i[0]));return n?Do(await o,a):o},"resolveCallback");var Lo="text/plain; charset=UTF-8",qt=s((e,t)=>({"Content-Type":e,...t}),"setDefaultContentType"),Je=s((e,t)=>new Response(e,t),"createResponseInstance"),Gt=s(class{#t;#e;env={};#n;finalized=!1;error;#a;#r;#i;#d;#l;#u;#s;#c;#p;constructor(e,t){this.#t=e,t&&(this.#r=t.executionCtx,this.env=t.env,this.#u=t.notFoundHandler,this.#p=t.path,this.#c=t.matchResult)}get req(){return this.#e??=new ir(this.#t,this.#p,this.#c),this.#e}get event(){if(this.#r&&"respondWith"in this.#r)return this.#r;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#r)return this.#r;throw Error("This context has no ExecutionContext")}get res(){return this.#i||=Je(null,{headers:this.#s??=new Headers})}set res(e){if(this.#i&&e){e=Je(e.body,e);for(let[t,n]of this.#i.headers.entries())if(t!=="content-type")if(t==="set-cookie"){let r=this.#i.headers.getSetCookie();e.headers.delete("set-cookie");for(let i of r)e.headers.append("set-cookie",i)}else e.headers.set(t,n)}this.#i=e,this.finalized=!0}render=(...e)=>(this.#l??=t=>this.html(t),this.#l(...e));setLayout=e=>this.#d=e;getLayout=()=>this.#d;setRenderer=e=>{this.#l=e};header=(e,t,n)=>{this.finalized&&(this.#i=Je(this.#i.body,this.#i));let r=this.#i?this.#i.headers:this.#s??=new Headers;t===void 0?r.delete(e):n?.append?r.append(e,t):r.set(e,t)};status=e=>{this.#a=e};set=(e,t)=>{this.#n??=new Map,this.#n.set(e,t)};get=e=>this.#n?this.#n.get(e):void 0;get var(){return this.#n?Object.fromEntries(this.#n):{}}#o(e,t,n){let r=this.#i?new Headers(this.#i.headers):this.#s;if(typeof t=="object"&&t.headers){r??=new Headers;for(let[a,o]of new Headers(t.headers))a==="set-cookie"?r.append(a,o):r.set(a,o)}if(n){if(!r){let a=0;for(let o in n)if(++a>1||typeof n[o]!="string"){r=new Headers;break}}if(r)for(let a in n){let o=n[a];if(typeof o=="string")r.set(a,o);else{r.delete(a);for(let l of o)r.append(a,l)}}}let i=typeof t=="number"?t:t?.status??this.#a;return Je(e,{status:i,headers:r??n})}newResponse=(...e)=>this.#o(...e);body=(e,t,n)=>this.#o(e,t,n);text=(e,t,n)=>!this.#s&&!this.#a&&!t&&!n&&!this.finalized?new Response(e):this.#o(e,t,qt(Lo,n));json=(e,t,n)=>this.#o(JSON.stringify(e),t,qt("application/json",n));html=(e,t,n)=>{let r=s(i=>this.#o(i,t,qt("text/html; charset=UTF-8",n)),"res");return typeof e=="object"?Wt(e,ar.Stringify,!1,{}).then(r):r(e)};redirect=(e,t)=>{let n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)};notFound=()=>(this.#u??=()=>Je(),this.#u(this))},"Context");E();v();b();var ee="ALL",or="all",sr=["get","post","put","delete","options","patch","query"],ft="Can not add a route since the matcher is already built.",gt=s(class extends Error{},"UnsupportedPathError");E();v();b();var lr="__COMPOSED_HANDLER";var Bo=s(e=>e.text("404 Not Found",404),"notFoundHandler"),ur=s((e,t)=>{if("getResponse"in e){let n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},"errorHandler"),dr=s(class cr{get;post;put;delete;options;patch;query;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(t={}){[...sr,or].forEach(a=>{this[a]=(o,...l)=>(typeof o=="string"?this.#t=o:this.#a(a,this.#t,o),l.forEach(d=>{this.#a(a,this.#t,d)}),this)}),this.on=(a,o,...l)=>{for(let d of[o].flat()){this.#t=d;for(let p of[a].flat())l.map(S=>{this.#a(p.toUpperCase(),this.#t,S)})}return this},this.use=(a,...o)=>(typeof a=="string"?this.#t=a:(this.#t="*",o.unshift(a)),o.forEach(l=>{this.#a(ee,this.#t,l)}),this);let{strict:r,...i}=t;Object.assign(this,i),this.getPath=r??!0?t.getPath??Ut:er}#e(){let t=new cr({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,t.#n=this.#n,t.routes=this.routes,t}#n=Bo;errorHandler=ur;route(t,n){let r=this.basePath(t);return n.routes.map(i=>{let a;n.errorHandler===ur?a=i.handler:(a=s(async(o,l)=>(await Ht([],n.errorHandler)(o,()=>i.handler(o,l))).res,"handler"),a[lr]=i.handler),r.#a(i.method,i.path,a,i.basePath)}),this}basePath(t){let n=this.#e();return n._basePath=Se(this._basePath,t),n}onError=t=>(this.errorHandler=t,this);notFound=t=>(this.#n=t,this);mount(t,n,r){let i,a;r&&(typeof r=="function"?a=r:(a=r.optionHandler,r.replaceRequest===!1?i=s(d=>d,"replaceRequest"):i=r.replaceRequest));let o=a?d=>{let p=a(d);return Array.isArray(p)?p:[p]}:d=>{let p;try{p=d.executionCtx}catch{}return[d.env,p]};i||=(()=>{let d=Se(this._basePath,t),p=d==="/"?0:d.length;return S=>{let I=new URL(S.url);return I.pathname=this.getPath(S).slice(p)||"/",new Request(I,S)}})();let l=s(async(d,p)=>{let S=await n(i(d.req.raw),...o(d));if(S)return S;await p()},"handler");return this.#a(ee,Se(t,"*"),l),this}#a(t,n,r,i){t=t.toUpperCase(),n=Se(this._basePath,n);let a={basePath:i!==void 0?Se(this._basePath,i):this._basePath,path:n,method:t,handler:r};this.router.add(t,n,[r,a]),this.routes.push(a)}#r(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t}#i(t,n,r,i){if(i==="HEAD")return(async()=>new Response(null,await this.#i(t,n,r,"GET")))();let a=this.getPath(t,{env:r}),o=this.router.match(i,a),l=new Gt(t,{path:a,matchResult:o,env:r,executionCtx:n,notFoundHandler:this.#n});if(o[0].length===1){let p;try{p=o[0][0][0][0](l,async()=>{l.res=await this.#n(l)})}catch(S){return this.#r(S,l)}return p instanceof Promise?p.then(S=>S||(l.finalized?l.res:this.#n(l))).catch(S=>this.#r(S,l)):p??this.#n(l)}let d=Ht(o[0],this.errorHandler,this.#n);return(async()=>{try{let p=await d(l);if(!p.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return p.res}catch(p){return this.#r(p,l)}})()}fetch=(t,...n)=>this.#i(t,n[1],n[0],t.method);request=(t,n,r,i)=>t instanceof Request?this.fetch(n?new Request(t,n):t,r,i):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${Se("/",t)}`,n),r,i));fire=()=>{addEventListener("fetch",t=>{t.respondWith(this.#i(t.request,t,void 0,t.request.method))})}},"_Hono");E();v();b();E();v();b();E();v();b();var Q=s(()=>Object.create(null),"createNullObject");E();v();b();var mt=[];function Kt(e,t){let n=this.buildAllMatchers(),r=s((i,a)=>{let o=n[i]||n[ee],l=o[2][a];if(l)return l;let d=a.match(o[0]);if(!d)return[[],mt];let p=d.indexOf("",1);return[o[1][p],d]},"match2");return this.match=r,r(e,t)}s(Kt,"match");E();v();b();var je="[^/]+",Re=".*",Ee="(?:|/.*)",_e=Symbol(),pr=new Set(".\\+*[^]$()");function Po(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1?1:e===Re||e===Ee?t===Ee?-1:1:t===Re||t===Ee?-1:e===je?1:t===je?-1:e.length===t.length?e<t?-1:1:t.length-e.length}s(Po,"compareKey");var hr=s(class Zt{#t;#e;#n=Q();insert(t,n,r,i,a){let o=this;for(let l=0,d=t.length;l<d;l++){let p=t[l],S=p.length===1?p==="*"?l===d-1?["","",Re]:["","",je]:null:p==="/*"?["","",Ee]:p.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),I;if(S){let B=S[1],P=S[2]||je;if(B&&S[2]&&(P===".*"||(P=P.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(P))||P.length===1&&pr.has(P)))throw _e;if(I=o.#n[P],!I){if(P!==Re&&P!==Ee){for(let pe in o.#n)if((P.length>1||pe.length>1)&&pe!==Re&&pe!==Ee)throw _e}I=o.#n[P]=new Zt}B!==""&&(I.#e??=i.varIndex++,r.push([B,I.#e]))}else if(I=o.#n[p],!I){for(let B in o.#n)if(B.length>1&&B!==Re&&B!==Ee)throw _e;I=o.#n[p]=new Zt}o=I}if(o.#t!==void 0)throw _e;o.#t=a?-1:n}buildRegExpStr(){let n=Object.keys(this.#n).sort(Po).map(r=>{let i=this.#n[r],a=i.buildRegExpStr();return a===""?"":(typeof i.#e=="number"?`(${r})@${i.#e}`:pr.has(r)?`\\${r}`:r)+a}).filter(Boolean);return typeof this.#t=="number"&&this.#t!==-1&&n.unshift(`#${this.#t}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},"_Node");E();v();b();var Jt=s(class{#t={varIndex:0};#e=new hr;#n=0;paths=Q();insert(e,t){if(t){this.#e.insert(e.split(""),0,[],this.#t,!0);return}let n=[],r=[],i=e;for(let o=0;;){let l=!1;if(i=i.replace(/\{[^}]+\}/g,d=>{let p=`@\\${o}`;return r[o]=[p,d],o++,l=!0,p}),!l)break}let a=i.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=r.length-1;o>=0;o--){let[l]=r[o];for(let d=a.length-1;d>=0;d--)if(a[d].indexOf(l)!==-1){a[d]=a[d].replace(l,r[o][1]);break}}this.#e.insert(a,this.#n,n,this.#t,!1),this.paths[e]=[this.#n++,n]}buildRegExp(){let e=this.#e.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,n=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(i,a,o)=>a!==void 0?(n[++t]=Number(a),"$()"):(o!==void 0&&(r[Number(o)]=++t),"")),[new RegExp(`^${e}`),n,r]}},"Trie");var fr=Q();function gr(e){return fr[e]??=new RegExp(`^${e.replace(/\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,(t,n)=>n?`\\${n}`:t==="/*"?Ee:t==="*"?Re:`/:${je}`)}$`)}s(gr,"buildWildcardRegExp");function bt(e,t){for(let n of Object.keys(e).sort((r,i)=>i.length-r.length))if(gr(n).test(t))return[...e[n]]}s(bt,"findMiddleware");var vt=s(class{name="RegExpRouter";#t;#e;#n;constructor(){this.#t={[ee]:Q()},this.#e={[ee]:Q()},this.#n={[ee]:new Jt}}#a(e,t){try{this.#n[e].insert(t,!/\*|\/:/.test(t))}catch(n){throw n===_e?new gt(t):n}}add(e,t,n){let r=this.#t,i=this.#e;if(!r)throw new Error(ft);if(!r[e]){this.#n[e]=new Jt;for(let l of[r,i]){l[e]=Q();for(let d in l[ee])l[e][d]=[...l[ee][d]],this.#a(e,d)}}t==="/*"&&(t="*");let a=e===ee?Object.keys(r):[e];if(/\*$/.test(t)){let l=gr(t);for(let d of a)r[d][t]||(this.#a(d,t),r[d][t]=bt(r[d],t)||bt(r[ee],t)||[]);for(let d of[r,i])for(let p of a)for(let S in d[p])l.test(S)&&d[p][S].push([n,t]);return}let o=pt(t)||[t];for(let l of o)for(let d of a)i[d][l]||(this.#a(d,l),i[d][l]=bt(r[d],l)||bt(r[ee],l)||[]),i[d][l].push([n,l])}match=Kt;buildAllMatchers(){let e=Q();for(let t of Object.keys(this.#e))e[t]=this.#r(t);return this.#t=this.#e=this.#n=void 0,fr=Q(),e}#r(e){let t=this.#t[e],n=this.#e[e],r=this.#n[e],i=Q(),a=[],[o,l,d]=r.buildRegExp();for(let p of[t,n])for(let S in p){let I=p[S],B=r.paths[S];if(!B){i[S]=[I.map(([P])=>[P,Q()]),mt];continue}a[B[0]]=I.map(([P,pe])=>[P,r.paths[pe][1].reduceRight((ye,[Ke],ne)=>(ye[Ke]=d[B[1][ne][1]],ye),Q())])}return[o,l.map(p=>a[p]),i]}},"RegExpRouter");E();v();b();E();v();b();E();v();b();var Vt=s(class{name="SmartRouter";#t=[];#e=[];constructor(e){this.#t=e.routers}add(e,t,n){if(!this.#e)throw new Error(ft);this.#e.push([e,t,n])}match(e,t){if(!this.#e)throw new Error("Fatal error");let n=this.#t,r=this.#e,i=n.length,a=0,o;for(;a<i;a++){let l=n[a];try{for(let d=0,p=r.length;d<p;d++)l.add(...r[d]);o=l.match(e,t)}catch(d){if(d instanceof gt)continue;throw d}this.match=l.match.bind(l),this.#t=[l],this.#e=void 0;break}if(a===i)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(this.#e||this.#t.length!==1)throw new Error("No active router has been determined yet.");return this.#t[0]}},"SmartRouter");E();v();b();E();v();b();E();v();b();var Yt=Q(),Ho=0,mr=s(class br{#t=[];#e=Q();#n=[];#a;#r=Yt;insert(t,n,r){let i=this,a=Yn(n),o=new Set,l=0;for(let d of a){let p=a[++l],S=Qn(d,p)||(p===void 0&&d&&d.indexOf("*")===d.length-1?d:null),I=Array.isArray(S),B=I?S[0]:S||d,P=i.#e[B]||=new br;S&&!P.#a&&(P.#a=S,i.#n.push(P)),i=P,I&&o.add(S[1])}i.#t.push({[t]:{handler:r,possibleKeys:[...o],score:++Ho}})}#i(t,n,r,i,a){for(let o=0,l=n.#t.length;o<l;o++){let d=n.#t[o],p=d[r]||d[ee];if(p){p.params=Q(),t.push(p);for(let S=0,I=p.possibleKeys.length;S<I;S++){let B=p.possibleKeys[S];p.params[B]=a?.[B]&&!S?a[B]:i[B]??a?.[B]}}}}search(t,n){let r=[];this.#r=Yt;let a=[this],o=jt(n),l=[],d=o.length,p=null;for(let S=0;S<d;S++){let I=o[S],B=S===d-1,P=[];for(let ye=0,Ke=a.length;ye<Ke;ye++){let ne=a[ye],N=ne.#e[I];N&&(N.#r=ne.#r,B?(N.#e["*"]&&this.#i(r,N.#e["*"],t,ne.#r),this.#i(r,N,t,ne.#r)):P.push(N));for(let $ of ne.#n){let T=$.#a,_=ne.#r===Yt?{}:{...ne.#r};if(typeof T=="string"){(T==="*"||I.startsWith(T.slice(0,-1)))&&(this.#i(r,$,t,ne.#r),T==="*"&&($.#r=_,P.push($)));continue}let[,g,R]=T;if(!(!I&&R===!0)){if(R!==!0){if(!p){p=[];let A=n[0]==="/"?1:0;for(let m=0;m<d;m++)p[m]=A,A+=o[m].length+1}let c=n.slice(p[S]),u=R.exec(c);if(u){_[g]=u[0],this.#i(r,$,t,ne.#r,_),u[0].length===c.length&&$.#e["*"]&&this.#i(r,$.#e["*"],t,ne.#r,_);for(let A in $.#e){$.#r=_;let m=u[0].match(/\//g)?.length??0;(l[m]||=[]).push($);break}continue}}(R===!0||R.test(I))&&(_[g]=I,B?(this.#i(r,$,t,_,ne.#r),$.#e["*"]&&this.#i(r,$.#e["*"],t,_,ne.#r)):($.#r=_,P.push($)))}}}let pe=l.shift();a=pe?P.concat(pe):P}return r[1]&&r.sort((S,I)=>S.score-I.score),[r.map(({handler:S,params:I})=>[S,I])]}},"_Node");var Qt=s(class{name="TrieRouter";#t=new mr;add(e,t,n){for(let r of pt(t)||[t])this.#t.insert(e,r,n)}match(e,t){return this.#t.search(e,t)}},"TrieRouter");var Xt=s(class extends dr{constructor(e={}){super(e),this.router=e.router??new Vt({routers:[new vt,new Qt]})}},"Hono");E();v();b();E();v();b();E();v();b();var vr="23456789BCDFGHJKMNPQRSTVWXZ";var Fo={0:"D",O:"D",1:"J",I:"J",L:"J",A:"4",E:"F",U:"V",Y:"V"};function Er(){let e=crypto.getRandomValues(new Uint8Array(6)),t="";for(let n of e)t+=vr[n%vr.length];return t}s(Er,"tagCodeErzeugen");function ce(e){return e.toUpperCase().replace(/[^0-9A-Z-]/g,"")}s(ce,"kanonisch");function wr(e){let t="";for(let n of ce(e).replace(/-/g,""))t+=Fo[n]??n;return t}s(wr,"tagCodeNormalisieren");function xr(){return[...crypto.getRandomValues(new Uint8Array(16))].map(t=>t.toString(16).padStart(2,"0")).join("")}s(xr,"einladungscodeErzeugen");function yr(){return[...crypto.getRandomValues(new Uint8Array(32))].map(t=>t.toString(16).padStart(2,"0")).join("")}s(yr,"geraetetokenErzeugen");async function Ue(e){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return[...new Uint8Array(t)].map(n=>n.toString(16).padStart(2,"0")).join("")}s(Ue,"sha256");async function ze(e,t,n){for(let r=0;r<8;r++){let i=Er();try{return await e.DB.prepare("INSERT INTO tag (code, ziel_typ, ziel_id) VALUES (?, ?, ?)").bind(i,t,n).run(),i}catch{continue}}throw new Error("Kein freier Tag-Code gefunden")}s(ze,"tagAnlegen");async function kr(e,t){return e.DB.prepare("SELECT code, ziel_typ, ziel_id FROM tag WHERE code = ? AND aktiv = 1").bind(t).first()}s(kr,"tagLesen");var en=`
  SELECT e.*, s.name AS standort_name, s.typ AS standort_typ
    FROM einheit e
    JOIN standort s ON s.id = e.standort_id`;async function We(e,t){return e.DB.prepare(`${en} WHERE e.id = ?`).bind(t).first()}s(We,"einheitLesen");async function Ve(e,t){return e.DB.prepare(`${en} WHERE e.code = ?`).bind(t).first()}s(Ve,"einheitPerCode");async function Ye(e,t){let{results:n}=await e.DB.prepare(`SELECT i.artikel_id, a.name, i.menge, a.mengeneinheit
       FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
      WHERE i.einheit_id = ?
      ORDER BY a.name`).bind(t).all();return n}s(Ye,"inhaltLesen");async function tn(e,t){let{results:n}=await e.DB.prepare(`${en} WHERE e.standort_id = ? AND e.aktiv = 1 ORDER BY e.code`).bind(t).all();return n}s(tn,"einheitenAmStandort");async function fe(e,t){return e.DB.prepare("SELECT * FROM standort WHERE id = ?").bind(t).first()}s(fe,"standortLesen");async function we(e){let{results:t}=await e.DB.prepare("SELECT * FROM standort WHERE aktiv = 1 ORDER BY typ, name").all();return t}s(we,"standorteAktiv");async function Et(e){return e.DB.prepare("SELECT * FROM standort WHERE typ = 'lager' AND aktiv = 1 ORDER BY id LIMIT 1").first()}s(Et,"hauptlager");function jo(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let r=(t.getTime()-n.getTime())/864e5;return r<0||r>14?null:n.toISOString().slice(0,19).replace("T"," ")}s(jo,"nachtragsZeit");async function Qe(e,t){let n=await We(e,t.einheitId);if(!n)return null;if(n.standort_id===t.nachStandortId)return{buchungId:0,vonStandortId:n.standort_id,unveraendert:!0};let r=jo(t.zeit),i=await e.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id,
                          mitarbeiter_id, quelle, lat, lon, notiz, zeit)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, datetime('now')))
     RETURNING id`).bind(t.einheitId,n.standort_id,t.nachStandortId,t.mitarbeiterId,t.quelle,t.lat??null,t.lon??null,r?t.notiz??"offline nachgetragen":t.notiz??null,r).first();return await e.DB.prepare("UPDATE einheit SET standort_id = ?, seit = COALESCE(?, datetime('now')) WHERE id = ?").bind(t.nachStandortId,r,t.einheitId).run(),{buchungId:i?.id??0,vonStandortId:n.standort_id,unveraendert:!1}}s(Qe,"buchen");async function Sr(e,t){let n=await e.DB.prepare("SELECT * FROM buchung WHERE id = ?").bind(t).first();if(!n)return{ok:!1,grund:"Buchung nicht gefunden"};if(n.storniert)return{ok:!1,grund:"Bereits storniert"};if((await e.DB.prepare(`SELECT id FROM buchung
      WHERE einheit_id = ? AND storniert = 0
      ORDER BY zeit DESC, id DESC LIMIT 1`).bind(n.einheit_id).first())?.id!==n.id)return{ok:!1,grund:"Es gibt neuere Buchungen f\xFCr diese Einheit"};if((Date.now()-new Date(n.zeit.replace(" ","T")+"Z").getTime())/6e4>15)return{ok:!1,grund:"Zu alt \u2014 bitte zur\xFCckbuchen statt stornieren"};let a=await e.DB.prepare(`SELECT zeit FROM buchung
      WHERE einheit_id = ? AND storniert = 0 AND id <> ?
      ORDER BY zeit DESC, id DESC LIMIT 1`).bind(n.einheit_id,n.id).first(),o=await e.DB.prepare("SELECT angelegt_am FROM einheit WHERE id = ?").bind(n.einheit_id).first();return await e.DB.batch([e.DB.prepare("UPDATE buchung SET storniert = 1 WHERE id = ?").bind(n.id),e.DB.prepare("UPDATE einheit SET standort_id = ?, seit = ? WHERE id = ?").bind(n.von_standort_id,a?.zeit??o?.angelegt_am??n.zeit,n.einheit_id)]),{ok:!0}}s(Sr,"stornieren");async function wt(e,t,n=50){let{results:r}=await e.DB.prepare(`SELECT b.id, b.zeit, sv.name AS von, sn.name AS nach,
            m.name AS wer, b.quelle
       FROM buchung b
       LEFT JOIN standort sv ON sv.id = b.von_standort_id
       JOIN standort sn ON sn.id = b.nach_standort_id
       LEFT JOIN mitarbeiter m ON m.id = b.mitarbeiter_id
      WHERE b.einheit_id = ? AND b.storniert = 0
      ORDER BY b.zeit DESC, b.id DESC
      LIMIT ?`).bind(t,n).all();return r}s(wt,"historie");async function Xe(e,t={}){let n=["e.aktiv = 1","e.zustand <> 'ausgemustert'"],r=[];t.standortId!==void 0&&(n.push("e.standort_id = ?"),r.push(t.standortId)),t.artikelSuche&&(n.push("a.name LIKE ?"),r.push(`%${t.artikelSuche}%`));let i=n.join(" AND "),{results:a}=await e.DB.prepare(`SELECT artikel_id, artikel, mengeneinheit, standort_id, standort, standort_typ,
            SUM(menge) AS menge
       FROM (
         SELECT a.id AS artikel_id, a.name AS artikel, a.mengeneinheit,
                s.id AS standort_id, s.name AS standort, s.typ AS standort_typ,
                i.menge AS menge
           FROM inhalt i
           JOIN einheit e  ON e.id = i.einheit_id
           JOIN artikel a  ON a.id = i.artikel_id
           JOIN standort s ON s.id = e.standort_id
          WHERE ${i}
         UNION ALL
         SELECT a.id, a.name, a.mengeneinheit,
                s.id, s.name, s.typ,
                1
           FROM einheit e
           JOIN artikel a  ON a.id = e.artikel_id
           JOIN standort s ON s.id = e.standort_id
          WHERE ${i} AND e.typ = 'einzelteil'
       )
      GROUP BY artikel_id, standort_id
      HAVING SUM(menge) > 0
      ORDER BY artikel, standort`).bind(...r,...r).all();return a}s(Xe,"bestand");async function et(e,t=56){let{results:n}=await e.DB.prepare(`SELECT e.id AS einheit_id, e.code, e.bezeichnung,
            s.id AS standort_id, s.name AS standort, e.seit,
            CAST(julianday('now') - julianday(e.seit) AS INTEGER) AS tage,
            CASE WHEN s.aktiv = 0 OR s.beendet_am IS NOT NULL THEN 1 ELSE 0 END AS baustelle_beendet,
            (SELECT m.name FROM buchung b
               LEFT JOIN mitarbeiter m ON m.id = b.mitarbeiter_id
              WHERE b.einheit_id = e.id AND b.storniert = 0
              ORDER BY b.zeit DESC, b.id DESC LIMIT 1) AS zuletzt_gebucht_von
       FROM einheit e
       JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1
        AND s.typ = 'baustelle'
        AND (julianday('now') - julianday(e.seit) >= ?
             OR s.aktiv = 0 OR s.beendet_am IS NOT NULL)
      ORDER BY baustelle_beendet DESC, tage DESC`).bind(t).all();return n}s(et,"ueberfaellig");async function _r(e,t,n=25){let r=`%${t}%`,{results:i}=await e.DB.prepare(`SELECT 'einheit' AS art, e.id, e.code || ' \xB7 ' || e.bezeichnung AS titel,
            s.name AS zusatz
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.code LIKE ?1 OR e.bezeichnung LIKE ?1
      UNION ALL
     SELECT 'standort', s.id, s.name, s.typ
       FROM standort s WHERE s.name LIKE ?1 OR s.adresse LIKE ?1
      UNION ALL
     SELECT 'artikel', a.id, a.name, a.kategorie
       FROM artikel a WHERE a.name LIKE ?1
      LIMIT ?2`).bind(r,n).all();return i}s(_r,"suche");async function Rr(e,t){return e.DB.prepare("SELECT id, name, rolle, aktiv FROM mitarbeiter WHERE token_hash = ? AND aktiv = 1").bind(t).first()}s(Rr,"mitarbeiterPerTokenHash");async function nn(e){let{results:t}=await e.DB.prepare("SELECT * FROM artikel WHERE aktiv = 1 ORDER BY kategorie, name").all();return t}s(nn,"artikelAlle");async function xt(e,t={}){let{results:n}=await e.DB.prepare(`WITH abschnitt AS (
       SELECT b.nach_standort_id AS standort_id,
              b.einheit_id,
              b.zeit AS von,
              COALESCE((SELECT MIN(n.zeit) FROM buchung n
                         WHERE n.einheit_id = b.einheit_id
                           AND n.storniert = 0
                           AND (n.zeit > b.zeit OR (n.zeit = b.zeit AND n.id > b.id))),
                       datetime('now')) AS bis
         FROM buchung b
         JOIN standort s ON s.id = b.nach_standort_id
        WHERE b.storniert = 0 AND s.typ = 'baustelle'
     )
     SELECT s.id AS standort_id, s.name AS standort, s.aktiv,
            COUNT(DISTINCT a.einheit_id) AS einheiten,
            CAST(SUM(julianday(a.bis) - julianday(a.von)) AS INTEGER) AS tage_summe,
            CAST(MAX(julianday(a.bis) - julianday(a.von)) AS INTEGER) AS tage_max,
            MIN(a.von) AS erste_lieferung
       FROM abschnitt a
       JOIN standort s ON s.id = a.standort_id
      WHERE (?1 IS NULL OR s.id = ?1)
        AND (?2 IS NULL OR a.bis >= ?2)
      GROUP BY s.id
      ORDER BY tage_summe DESC`).bind(t.standortId??null,t.abDatum??null).all();return n}s(xt,"vorhaltung");async function yt(e,t=120){let{results:n}=await e.DB.prepare(`SELECT e.id AS einheit_id, e.code, e.bezeichnung,
            s.name AS standort,
            CASE WHEN s.aktiv = 0 OR s.beendet_am IS NOT NULL THEN 1 ELSE 0 END AS standort_beendet,
            CAST(julianday('now') - julianday(e.seit) AS INTEGER) AS tage,
            (SELECT m.name FROM buchung b LEFT JOIN mitarbeiter m ON m.id = b.mitarbeiter_id
              WHERE b.einheit_id = e.id AND b.storniert = 0
              ORDER BY b.zeit DESC, b.id DESC LIMIT 1) AS zuletzt_von,
            (SELECT group_concat(CAST(i.menge AS INTEGER) || '\xD7 ' || a.name, ', ')
               FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
              WHERE i.einheit_id = e.id) AS inhalt
       FROM einheit e
       JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1 AND s.typ = 'baustelle'
        AND (julianday('now') - julianday(e.seit) >= ?1
             OR s.aktiv = 0 OR s.beendet_am IS NOT NULL)
      ORDER BY standort_beendet DESC, tage DESC`).bind(t).all();return n}s(yt,"verlust");async function rn(e,t){return e.DB.prepare(`SELECT i.*, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.standort_id = ? AND i.beendet_am IS NULL ORDER BY i.id DESC LIMIT 1`).bind(t).first()}s(rn,"inventurOffen");async function zr(e,t){return e.DB.prepare(`SELECT i.*, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.id = ?`).bind(t).first()}s(zr,"inventurPerId");async function kt(e,t,n){let r=await rn(e,t);if(r)return r;let i=await e.DB.prepare("SELECT COUNT(*) AS n FROM einheit WHERE standort_id = ? AND aktiv = 1").bind(t).first(),a=await e.DB.prepare(`INSERT INTO inventur (standort_id, gestartet_von, soll_anzahl) VALUES (?, ?, ?)
     RETURNING id`).bind(t,n,i?.n??0).first();return await zr(e,a.id)}s(kt,"inventurStarten");async function Tr(e,t,n,r){await e.DB.prepare(`INSERT INTO inventur_treffer (inventur_id, einheit_id, war_woanders)
     VALUES (?, ?, ?) ON CONFLICT DO NOTHING`).bind(t,n,r?1:0).run()}s(Tr,"inventurTreffer");async function Ne(e,t){let n=await zr(e,t);if(!n)return null;let{results:r}=await e.DB.prepare(`SELECT e.code, e.bezeichnung, t.war_woanders
       FROM inventur_treffer t JOIN einheit e ON e.id = t.einheit_id
      WHERE t.inventur_id = ? ORDER BY t.zeit DESC`).bind(t).all(),{results:i}=await e.DB.prepare(`SELECT e.id, e.code, e.bezeichnung FROM einheit e
      WHERE e.standort_id = ? AND e.aktiv = 1
        AND e.id NOT IN (SELECT einheit_id FROM inventur_treffer WHERE inventur_id = ?)
      ORDER BY e.code`).bind(n.standort_id,t).all();return{inventur:n,gefunden:r,fehlend:i}}s(Ne,"inventurStand");async function St(e,t,n){let r=await Ne(e,t);return r?(await e.DB.prepare(`UPDATE inventur SET beendet_am = datetime('now'), ist_anzahl = ?, notiz = ?
      WHERE id = ? AND beendet_am IS NULL`).bind(r.gefunden.length,n??null,t).run(),Ne(e,t)):null}s(St,"inventurAbschliessen");async function Ar(e,t){let n=await e.DB.prepare(`INSERT INTO meldung (einheit_id, art, text, foto_schluessel, mitarbeiter_id)
     VALUES (?, ?, ?, ?, ?) RETURNING id`).bind(t.einheitId,t.art,t.text??null,t.fotoSchluessel??null,t.mitarbeiterId).first();return(t.art==="beschaedigt"||t.art==="reparatur"||t.art==="ok")&&await e.DB.prepare("UPDATE einheit SET zustand = ? WHERE id = ?").bind(t.art,t.einheitId).run(),n?.id??0}s(Ar,"meldungAnlegen");async function _t(e,t=!0){let{results:n}=await e.DB.prepare(`SELECT m.id, m.einheit_id, e.code, e.bezeichnung, m.art, m.text,
            m.foto_schluessel, m.zeit, ma.name AS wer, m.erledigt
       FROM meldung m
       JOIN einheit e ON e.id = m.einheit_id
       LEFT JOIN mitarbeiter ma ON ma.id = m.mitarbeiter_id
      WHERE (?1 = 0 OR m.erledigt = 0)
      ORDER BY m.zeit DESC LIMIT 200`).bind(t?1:0).all();return n}s(_t,"meldungen");var an="wgl_ma",Rt="wgl_buero",$r=4*60*60;function Nr(e,t){let n=e.headers.get("Cookie");if(!n)return null;for(let r of n.split(";")){let[i,...a]=r.trim().split("=");if(i===t)return decodeURIComponent(a.join("="))}return null}s(Nr,"cookieLesen");function on(e,t,n){return`${e}=${encodeURIComponent(t)}; Path=/; Max-Age=${n}; HttpOnly; Secure; SameSite=Lax`}s(on,"cookieSetzen");function Or(e){return`${e}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`}s(Or,"cookieLoeschen");async function te(e,t){let n=Nr(e,an);return n?Rr(t,await Ue(n)):null}s(te,"angemeldeterMitarbeiter");var sn=s(e=>`sitzung:${e}`,"sitzungsSchluessel");async function Oe(e,t){let n=await e.SESSIONS.get(sn(t));if(!n)return null;let r=JSON.parse(n);return r.bis>Date.now()?r:null}s(Oe,"sitzungLesen");async function ln(e,t,n,r){let i={standortId:n,name:r,bis:Date.now()+$r*1e3};return await e.SESSIONS.put(sn(t),JSON.stringify(i),{expirationTtl:$r}),i}s(ln,"sitzungSetzen");async function Ir(e,t){await e.SESSIONS.delete(sn(t))}s(Ir,"sitzungBeenden");async function tt(e,t){let n=t.ADMIN_PASSWORT;if(!n)return!1;let r=Nr(e,Rt);return r!==null&&r===await Ue(n)}s(tt,"istBuero");function zt(e,t){if(e.length!==t.length)return!1;let n=0;for(let r=0;r<e.length;r++)n|=e.charCodeAt(r)^t.charCodeAt(r);return n===0}s(zt,"gleichSicher");E();v();b();function Cr(e,t,n,r){let a=(n-e)*Math.PI/180,o=(r-t)*Math.PI/180,l=e*Math.PI/180,d=n*Math.PI/180,p=Math.sin(a/2)**2+Math.sin(o/2)**2*Math.cos(l)*Math.cos(d);return 2*6371*Math.asin(Math.min(1,Math.sqrt(p)))}s(Cr,"entfernungKm");function Uo(e){return new Date(e.replace(" ","T")+"Z")}s(Uo,"alsDatum");function Tt(e,t=new Date){let n=t.getTime()-Uo(e).getTime();return Math.max(0,Math.floor(n/864e5))}s(Tt,"tageSeit");function Te(e,t=new Date){let n=Tt(e,t);return n===0?"seit heute":n===1?"seit gestern":`seit ${n} Tagen`}s(Te,"seitText");E();v();b();E();v();b();E();v();b();E();v();b();var xe="R\xFCstzeug";var Wo="#1E2A38",un="#F5B800",Mr=s(e=>`<g fill="none" stroke="${e}" stroke-width="6.5" stroke-linecap="round"><path d="M12 13v38M32 13v38M52 13v38"/><path d="M12 13h40M12 36h40"/></g>`,"STRICHE"),Dr=s(e=>`<path fill="none" stroke="${e}" stroke-width="6.5" stroke-linecap="round" d="M14 34 50 15"/>`,"DIAGONALE");function qo(e="#fff",t=un){return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'+Mr(e)+Dr(t)+"</svg>"}s(qo,"zeichenInner");function At(e=22,t="currentColor"){return`<svg class="zeichen" viewBox="0 0 64 64" width="${e}" height="${e}" aria-hidden="true" focusable="false">${Mr(t)}${Dr(un)}</svg>`}s(At,"zeichen");function Go(e=64){let t=Math.round(e*.219),r=e*.78/64,i=(e-64*r)/2,a=qo("#fff",un).replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"");return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${e} ${e}"><rect width="${e}" height="${e}" rx="${t}" fill="${Wo}"/><g transform="translate(${i.toFixed(1)} ${i.toFixed(1)}) scale(${r.toFixed(4)})">${a}</g></svg>`}s(Go,"kachel");var dn=`data:image/svg+xml,${encodeURIComponent(Go(64))}`;function f(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}s(f,"esc");var Ko=`
:root{
  --papier:#fff; --papier2:#f2f2f0; --tinte:#000; --tinte2:#565654; --tinte3:#83837f;
  --linie:#000; --linie2:#c9c9c4;
  --gelb:#ffd400; --rot:#d0250f; --gruen:#0a6b34;
}
@media (prefers-color-scheme:dark){:root{
  --papier:#0a0a0a; --papier2:#171716; --tinte:#fff; --tinte2:#b4b4b0; --tinte3:#8a8a85;
  --linie:#fff; --linie2:#3a3a37;
  --gelb:#ffd400; --rot:#ff6a52; --gruen:#3ec97a;
}}

*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--papier);color:var(--tinte);
  font:16px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
  font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
h1,h2,h3{margin:0;line-height:1.08;font-weight:800;letter-spacing:-.02em}
h1{font-size:30px} h2{font-size:15px;text-transform:uppercase;letter-spacing:.1em;font-weight:800}
h3{font-size:17px}
p{margin:0}
a{color:var(--tinte);text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1.5px}
.still{color:var(--tinte2)}
.leise{color:var(--tinte3);font-size:14px}
.mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.zahl,td.zahl,th.zahl{text-align:right;font-variant-numeric:tabular-nums}

/* \u2550\u2550\u2550 Kopfbalken \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

.balken{background:var(--tinte);color:var(--papier);position:sticky;top:0;z-index:20}
.balken .innen{max-width:640px;margin:0 auto;padding:13px 18px;
  display:flex;align-items:center;justify-content:space-between;gap:14px}
.balken .marke{display:flex;align-items:center;gap:10px;
  font-weight:800;font-size:16px;text-transform:uppercase;letter-spacing:.1em}
.balken a{color:var(--papier);font-size:14px;text-transform:uppercase;
  letter-spacing:.07em;font-weight:700;text-decoration:none;border-bottom:2px solid var(--gelb)}
.zeichen{flex:0 0 auto;display:block}

.sitzung{background:var(--gelb);color:#000;border-bottom:3px solid #000}
.sitzung .innen{max-width:640px;margin:0 auto;padding:11px 18px;
  display:flex;justify-content:space-between;align-items:center;gap:12px;
  font-weight:800;font-size:15px}
.sitzung a{color:#000;font-size:13px;font-weight:700}

.bahn{max-width:640px;margin:0 auto;padding:22px 18px 60px}
.bahn>*+*{margin-top:18px}
.bahn h1+p{margin-top:8px}
.bahn h2{margin-top:32px}

/* \u2550\u2550\u2550 Einheitenblatt \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

.blatt{border:3px solid var(--linie);padding:20px}
.kennung{display:inline-block;font:800 15px/1 ui-monospace,SFMono-Regular,Menlo,monospace;
  letter-spacing:.16em;background:var(--tinte);color:var(--papier);padding:7px 10px}
.titel-gross{font-size:26px;font-weight:800;line-height:1.12;letter-spacing:-.02em;
  margin-top:14px;text-wrap:balance}

.stueckliste{list-style:none;padding:0;margin:18px 0 0;border-top:2px solid var(--linie)}
.stueckliste li{display:flex;align-items:baseline;gap:16px;padding:10px 0;
  border-bottom:1px solid var(--linie2);font-size:17px}
.stueckliste li:last-child{border-bottom:0}
.stueckliste .anzahl{flex:0 0 56px;text-align:right;font-weight:800;font-size:19px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.stueckliste .was{min-width:0}

.standzeit{margin-top:18px;padding-top:16px;border-top:2px solid var(--linie)}
.standzeit .wo{display:block;font-size:22px;font-weight:800;line-height:1.15;
  text-transform:uppercase;letter-spacing:-.01em}
.standzeit .wie-lang{display:block;margin-top:3px;color:var(--tinte2);font-size:15px}

/* \u2550\u2550\u2550 Kn\xF6pfe \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

button,.knopf{display:block;width:100%;min-height:62px;padding:16px 18px;margin:0;
  font:800 19px/1.25 inherit;text-transform:uppercase;letter-spacing:.06em;
  text-align:center;text-decoration:none;border:3px solid var(--linie);border-radius:0;
  background:var(--papier);color:var(--tinte);cursor:pointer;-webkit-appearance:none}
.knopf small{display:block;margin-top:4px;font-size:14px;font-weight:600;
  letter-spacing:.03em;text-transform:none;opacity:.75}
.knopf:hover{text-decoration:none}
button:active,.knopf:active{transform:translate(1px,1px)}
form+form,form+.knopf,.knopf+form,.knopf+.knopf{margin-top:12px}
.blatt+form,.blatt+.knopf{margin-top:20px}

.knopf-haupt{background:var(--gelb);color:#000;border-color:#000;min-height:96px;font-size:24px}
.knopf-haupt small{color:#000;opacity:.7}
.knopf-lager{background:var(--tinte);color:var(--papier);border-color:var(--linie)}
.knopf-zweit{background:var(--papier);color:var(--tinte)}
.knopf-still{display:inline-block;width:auto;border-width:0 0 2px 0;min-height:auto;
  padding:9px 0;font-size:15px;letter-spacing:.08em;color:var(--tinte2)}
.knopf-warn{background:var(--rot);color:#fff;border-color:var(--rot)}

.wahl{list-style:none;padding:0;margin:0}
.wahl li+li{margin-top:12px}
.wahl .knopf{text-align:left;min-height:66px;display:flex;flex-direction:column;
  justify-content:center;gap:3px;letter-spacing:.02em;font-size:18px}
.wahl .neben{font-size:14px;font-weight:600;letter-spacing:.02em;text-transform:none;
  color:var(--tinte2)}
.knopf-lager .neben{color:var(--papier);opacity:.72}
.wahl+.knopf,.wahl+form{margin-top:26px}
p+.wahl,p+form{margin-top:18px}

/* \u2550\u2550\u2550 Meldungen und Marken \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

.notiz{border:3px solid var(--linie);padding:14px 16px;font-size:16px}
.notiz strong{display:block;font-weight:800;text-transform:uppercase;letter-spacing:.05em;
  font-size:15px;margin-bottom:3px}
.notiz-erfolg{border-color:var(--linie);background:var(--gelb);color:#000}
.notiz-hinweis{border-color:var(--linie);background:var(--papier2)}
.notiz-fehler{border-color:var(--rot);color:var(--rot)}
.notiz-fehler strong{color:var(--rot)}

.status{display:inline-block;padding:3px 7px;font-size:12px;font-weight:800;
  text-transform:uppercase;letter-spacing:.08em;border:2px solid currentColor;white-space:nowrap}
.status-warn{color:var(--rot)}
.status-ok{color:var(--gruen)}
.status-ruhig{color:var(--tinte2)}
.status-voll{background:var(--tinte);color:var(--papier);border-color:var(--tinte)}

/* \u2550\u2550\u2550 B\xFCro \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

.buerokopf{background:var(--tinte);color:var(--papier);position:sticky;top:0;z-index:20}
.buerokopf .oben{max-width:1080px;margin:0 auto;padding:14px 22px 0;
  display:flex;align-items:center;justify-content:space-between;gap:16px}
.buerokopf .marke{display:flex;align-items:center;gap:10px;font-weight:800;
  font-size:17px;text-transform:uppercase;letter-spacing:.1em}
.buerokopf .abmelden{color:var(--papier);font-size:13px;text-transform:uppercase;
  letter-spacing:.07em;font-weight:700;text-decoration:none;opacity:.7}
.buerokopf .abmelden:hover{opacity:1}
.reiter{max-width:1080px;margin:0 auto;padding:12px 22px 0;display:flex;gap:26px;
  overflow-x:auto;scrollbar-width:none}
.reiter::-webkit-scrollbar{display:none}
.reiter a{color:var(--papier);opacity:.62;font-size:15px;font-weight:800;
  text-transform:uppercase;letter-spacing:.09em;text-decoration:none;white-space:nowrap;
  padding:0 0 11px;border-bottom:4px solid transparent}
.reiter a:hover{opacity:.9}
.reiter a.aktiv{opacity:1;border-bottom-color:var(--gelb)}

.inhalt{max-width:1080px;margin:0 auto;padding:30px 22px 80px}
.kopfzeile{display:flex;align-items:flex-start;justify-content:space-between;
  gap:20px;flex-wrap:wrap;padding-bottom:18px;border-bottom:3px solid var(--linie)}
.kopfzeile .unter{color:var(--tinte2);font-size:15px;margin-top:7px;max-width:62ch}
.kopfzeile .werkzeuge{display:flex;gap:12px;flex-wrap:wrap}
.kopfzeile .werkzeuge .knopf{width:auto;min-height:40px;padding:8px 16px;font-size:13px}

/* Zahlenreihe: nur Zahl und Wort, getrennt durch Linien. Keine Kacheln. */
.zahlen{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
  border-bottom:3px solid var(--linie);margin-bottom:34px}
.zahlen>div{padding:20px 20px 20px 0;border-right:1px solid var(--linie2)}
.zahlen>div:last-child{border-right:0}
.zahlen .wert{font-size:44px;font-weight:800;line-height:.95;letter-spacing:-.04em}
.zahlen .achtung .wert{color:var(--rot)}
.zahlen .wort{margin-top:8px;font-size:13px;font-weight:800;text-transform:uppercase;
  letter-spacing:.09em}
.zahlen .zusatz{margin-top:3px;font-size:13px;color:var(--tinte2)}

.block{margin-bottom:44px}
.block>.kopf{display:flex;align-items:baseline;justify-content:space-between;gap:14px;
  flex-wrap:wrap;padding-bottom:9px;border-bottom:3px solid var(--linie);margin-bottom:0}
.block>.kopf .beitext{font-size:13px;color:var(--tinte2);text-transform:none;letter-spacing:0;
  font-weight:400}
.block>.koerper{padding-top:18px}

table{width:100%;border-collapse:collapse;font-size:15px}
thead th{text-align:left;padding:10px 14px 10px 0;font-size:12px;font-weight:800;
  letter-spacing:.09em;text-transform:uppercase;color:var(--tinte2);
  border-bottom:2px solid var(--linie);white-space:nowrap}
tbody td{padding:13px 14px 13px 0;border-bottom:1px solid var(--linie2);vertical-align:top}
tbody tr:hover{background:var(--papier2)}
td .zweitzeile{display:block;color:var(--tinte2);font-size:13px;margin-top:2px}
td form{display:inline}
td .knopf{width:auto;min-height:30px;padding:4px 10px;font-size:12px;border-width:2px}
.rollrahmen{overflow-x:auto}

@media (max-width:760px){
  .stapel thead{display:none}
  .stapel tbody tr{display:block;padding:14px 0;border-bottom:2px solid var(--linie)}
  .stapel tbody tr:hover{background:transparent}
  .stapel tbody td{display:flex;gap:16px;justify-content:space-between;align-items:baseline;
    padding:3px 0;border:0;text-align:right}
  .stapel tbody td::before{content:attr(data-l);color:var(--tinte2);font-size:12px;
    font-weight:800;text-transform:uppercase;letter-spacing:.07em;text-align:left;flex:0 0 auto}
  .stapel tbody td:first-child{display:block;text-align:left;font-size:17px;
    font-weight:800;padding-bottom:8px}
  .stapel tbody td:first-child::before{display:none}
  .stapel tbody td:first-child .zweitzeile{font-weight:400}
  .stapel tbody td:empty{display:none}
  .inhalt{padding:22px 16px 70px}
  .zahlen>div{padding:16px 14px 16px 0}
  .zahlen .wert{font-size:34px}
}

.leer{padding:30px 0;color:var(--tinte2);border-bottom:1px solid var(--linie2)}
.leer strong{display:block;color:var(--tinte);font-size:16px;font-weight:800;
  text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}

/* \u2550\u2550\u2550 Formulare \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

label{display:block;font-weight:800;font-size:12px;text-transform:uppercase;
  letter-spacing:.09em;margin-bottom:6px;color:var(--tinte2)}
input[type=text],input[type=password],input[type=number],input[type=file],select,textarea{
  width:100%;min-height:50px;padding:12px 13px;font:17px inherit;color:var(--tinte);
  background:var(--papier);border:2px solid var(--linie);border-radius:0}
input:focus,select:focus,textarea:focus{outline:3px solid var(--gelb);outline-offset:-1px}
.feld{margin-bottom:16px}
.feld:last-of-type{margin-bottom:20px}
.felder-zwei{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.filter{display:flex;gap:12px;align-items:center;margin:20px 0;flex-wrap:wrap}
.filter input{max-width:320px;min-height:42px}
.filter .knopf{width:auto;min-height:42px;padding:8px 16px;font-size:13px}

.balkenanzeige{height:14px;border:2px solid var(--linie);margin:14px 0 10px}
.balkenanzeige>span{display:block;height:100%;background:var(--gelb)}

.fussnote{margin-top:30px;color:var(--tinte2);font-size:14px}

/* Im Dunkeln w\xE4re der umgekehrte Balken die hellste Fl\xE4che auf dem Schirm \u2014
   also bleibt er schwarz und trennt sich \xFCber die Linie. */
@media (prefers-color-scheme:dark){
  .balken,.buerokopf{background:var(--papier);color:var(--tinte);
    border-bottom:3px solid var(--tinte)}
  .balken a,.buerokopf .abmelden,.reiter a{color:var(--tinte)}
  .knopf-lager{background:var(--tinte);color:var(--papier)}
}
`;function K(e,t){let n=t.roh?e:`${t.kopf??""}${t.banner??""}<div class="bahn">${e}</div>`;return`<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#000000">
<meta name="robots" content="noindex,nofollow">
<link rel="icon" href="${dn}">
<link rel="apple-touch-icon" href="${dn}">
<title>${f(t.titel)}</title>
<style>${Ko}</style>
</head>
<body>
${n}
${t.scripte??""}
</body>
</html>`}s(K,"seite");function Z(e=xe,t){return`<header class="balken"><div class="innen">
    <span class="marke">${At(21,"currentColor")}${f(e)}</span>
    ${t?`<a href="${f(t.href)}">${f(t.text)}</a>`:""}
  </div></header>`}s(Z,"kopf");function q(e,t=200,n={}){return new Response(e,{status:t,headers:{"Content-Type":"text/html; charset=utf-8",...n}})}s(q,"html");function X(e,t,n){return`<div class="notiz notiz-${e}"><strong>${f(t)}</strong>${n?f(n):""}</div>`}s(X,"notiz");function oe(e,t="ruhig"){return`<span class="status status-${t}">${f(e)}</span>`}s(oe,"marke");function ue(e,t,n){if(t.length===0)return`<div class="leer"><strong>Nichts da</strong>${f(n??"")}</div>`;let r=e.map(a=>`<th${a.zahl?' class="zahl"':""}>${f(a.titel)}</th>`).join(""),i=t.map(a=>`<tr>${a.map((o,l)=>{let d=e[l];return`<td${d?.zahl?' class="zahl"':""} data-l="${f(d?.titel??"")}">${o}</td>`}).join("")}</tr>`).join("");return`<div class="rollrahmen"><table class="stapel">
    <thead><tr>${r}</tr></thead><tbody>${i}</tbody></table></div>`}s(ue,"tabelle");function ae(e,t){return`<section class="block">
    <div class="kopf"><h2>${f(e.titel)}</h2>${e.beitext?`<span class="beitext">${f(e.beitext)}</span>`:""}</div>
    ${e.gepolstert?`<div class="koerper">${t}</div>`:t}
  </section>`}s(ae,"block");function Lr(e){return`<div class="zahlen">${e.map(t=>`<div${t.achtung?' class="achtung"':""}>
    <div class="wert">${f(t.wert)}</div>
    <div class="wort">${f(t.wort)}</div>
    ${t.zusatz?`<div class="zusatz">${f(t.zusatz)}</div>`:""}
  </div>`).join("")}</div>`}s(Lr,"zahlen");function qe(e,t,n){return`<div class="kopfzeile"><div>
      <h1>${f(e)}</h1>
      ${t?`<p class="unter">${f(t)}</p>`:""}
    </div>${n?`<div class="werkzeuge">${n}</div>`:""}</div>`}s(qe,"kopfzeile");function cn(e,t,n){let r=[],i=e.standort_typ==="lager",a=t!==null&&t.standortId===e.standort_id;return t&&!a&&r.push({art:"haupt",label:"Hierher buchen",unter:t.name,zielId:t.standortId}),n&&e.standort_id!==n.id&&r.push({art:t||r.length?"lager":"haupt",label:"Zur\xFCck ins Lager",unter:t?n.name:void 0,zielId:n.id}),r.push({art:r.length===0?"haupt":"zweit",label:i?"Auf Baustelle buchen":"Auf andere Baustelle",href:`/t/${e.code}/wohin`}),r}s(cn,"aktionenFuer");function de(e){return Number.isInteger(e)?String(e):e.toFixed(1).replace(".",",")}s(de,"formatMenge");function $t(e){return{beschaedigt:"besch\xE4digt",reparatur:"Reparatur",ok:"in Ordnung",hinweis:"Hinweis"}[e]??e}s($t,"meldungsArt");function Nt(e){return{ok:"in Ordnung",beschaedigt:"besch\xE4digt",reparatur:"in Reparatur",ausgemustert:"ausgemustert"}[e]??e}s(Nt,"zustandText");function Zo(e){return e.length===0?"":`<ul class="stueckliste">${e.map(t=>`<li><span class="anzahl">${f(de(t.menge))}\xD7</span><span class="was">${f(t.name)}</span></li>`).join("")}</ul>`}s(Zo,"stueckliste");function Jo(e,t){let n=`knopf knopf-${e.art}`,r=`${f(e.label)}${e.unter?`<small>${f(e.unter)}</small>`:""}`;if(e.href)return`<a class="${n}" href="${f(e.href)}">${r}</a>`;let i=e.posten?.url??"/api/buchung",a=e.posten?.felder??{code:t,ziel:String(e.zielId)},o=e.posten?"":" data-buchung",l=Object.entries(a).map(([d,p])=>`<input type="hidden" name="${f(d)}" value="${f(p)}">`).join("");return`<form method="post" action="${f(i)}"${o}>${l}
    <button class="${n}" type="submit">${r}</button>
  </form>`}s(Jo,"knopf");function Br(e,t,n){return{art:"haupt",label:"\u2713 Hier gefunden",unter:`Inventur ${n}`,posten:{url:"/api/inventur/treffer",felder:{code:t,inventur:String(e)}}}}s(Br,"inventurAktion");function Ie(e){if(!e)return"";let t=Math.max(0,Math.round((e.bis-Date.now())/6e4)),n=t>=60?`noch ${Math.floor(t/60)} Std ${t%60} Min`:`noch ${t} Min`;return`<div class="sitzung"><div class="innen">
    <span>\u{1F4CD} ${f(e.name)}</span>
    <span>${f(n)} \xB7 <a href="/sitzung/beenden">beenden</a></span>
  </div></div>`}s(Ie,"sitzungsBanner");function Pr(e){let{einheit:t}=e,n=e.meldung?X(e.meldung.art,e.meldung.text):"",r=e.stornoId?`<form method="post" action="/api/storno">
         <input type="hidden" name="id" value="${e.stornoId}">
         <input type="hidden" name="code" value="${f(t.code)}">
         <button class="knopf knopf-still" type="submit">\u21A9 R\xFCckg\xE4ngig</button>
       </form>`:"",i=`
${n}
<article class="blatt">
  <span class="kennung">${f(t.code)}</span>
  <h1 class="titel-gross">${f(t.bezeichnung)}</h1>
  ${t.zustand!=="ok"?`<p style="margin-top:12px">${oe(Nt(t.zustand),"warn")}</p>`:""}
  ${Zo(e.inhalt)}
  <div class="standzeit">
    <span class="wo">${f(t.standort_name)}</span>
    <span class="wie-lang">${f(Te(t.seit))}</span>
  </div>
</article>
${e.aktionen.map(a=>Jo(a,t.code)).join("")}
${r}
<a class="knopf knopf-still" href="/t/${f(t.code)}/melden">Schaden melden</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>`;return q(K(i,{titel:`${t.code} \xB7 ${t.bezeichnung}`,kopf:Z(void 0,{href:"/",text:"\xDCbersicht"}),banner:Ie(e.sitzung),scripte:'<script src="/app.js"><\/script>'}))}s(Pr,"einheitSeite");function Hr(e){let t=e.standorte.map(i=>{let a=i.entfernungKm!==void 0?i.entfernungKm<1?`${Math.round(i.entfernungKm*1e3)} m entfernt`:`${i.entfernungKm.toFixed(1).replace(".",",")} km entfernt`:i.adresse??"";return`<li><form method="post" action="/api/buchung" data-buchung>
      <input type="hidden" name="code" value="${f(e.code)}">
      <input type="hidden" name="ziel" value="${i.id}">
      <button class="knopf ${i.typ==="lager"?"knopf-lager":"knopf-zweit"}" type="submit">
        <span>${f(i.name)}</span>
        ${a?`<span class="neben">${f(a)}</span>`:""}
      </button></form></li>`}).join(""),n=e.hatPosition?"":`<script>
navigator.geolocation && navigator.geolocation.getCurrentPosition(function(p){
  var u = new URL(location.href);
  u.searchParams.set('lat', p.coords.latitude.toFixed(5));
  u.searchParams.set('lon', p.coords.longitude.toFixed(5));
  location.replace(u);
}, function(){}, {enableHighAccuracy:false, timeout:4000, maximumAge:120000});
<\/script>`,r=`
<h1>Wohin?</h1>
<p class="still">${f(e.bezeichnung)}</p>
${e.standorte.length===0?`<div class="blatt"><p><strong>Keine Standorte angelegt.</strong></p>
       <p class="leise" style="margin-top:6px">Das B\xFCro muss zuerst
       Baustellen anlegen.</p></div>`:`<ul class="wahl">${t}</ul>`}
<a class="knopf knopf-still" href="/t/${f(e.code)}">Abbrechen</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>`;return q(K(r,{titel:"Wohin?",kopf:Z("Ziel w\xE4hlen",{href:`/t/${e.code}`,text:"Zur\xFCck"}),banner:Ie(e.sitzung),scripte:`<script src="/app.js"><\/script>${n}`}))}s(Hr,"wohinSeite");function Fr(e,t,n){let r=`
<article class="blatt" style="text-align:center">
  <p class="still" style="font-size:15px">Eigentum der</p>
  <h1 style="font-size:24px;margin-top:6px">${f(t)}</h1>
  <div class="standzeit">
    <span class="wo">${f(e.bezeichnung)}</span>
    <p style="margin-top:12px"><span class="kennung">${f(e.code)}</span></p>
  </div>
</article>
<p style="text-align:center" class="still">Gefunden? Bitte melden:</p>
<a class="knopf knopf-haupt" href="tel:${f(n.replace(/\s/g,""))}">${f(n)}</a>
<p class="fussnote">Mitarbeiter? Dann fehlt auf diesem Handy die Einrichtung \u2014
  bitte im B\xFCro melden.</p>`;return q(K(r,{titel:t,kopf:Z(t)}))}s(Fr,"fremdSeite");function nt(e){let t=`
${X("fehler","Unbekannter Tag",`Der Code ${e} ist nicht vergeben.`)}
<form method="get" action="/t">
  <div class="feld"><label for="code">Vertippt? Code vom Aufkleber eingeben</label>
    <input type="text" id="code" name="code" autocapitalize="characters"
      autocomplete="off" placeholder="z. B. K7F2QX" value="${f(e)}"></div>
  <button class="knopf knopf-lager" type="submit">Suchen</button>
</form>
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return q(K(t,{titel:"Unbekannter Tag",kopf:Z()}),404)}s(nt,"unbekannterTag");function jr(e,t){let n=`
<h1>Melden</h1>
<p class="still">${f(e.code)} \xB7 ${f(e.bezeichnung)}</p>
<form method="post" action="/t/${f(e.code)}/melden" enctype="multipart/form-data">
  <div class="blatt">
    <div class="feld"><label for="art">Was ist los?</label>
      <select id="art" name="art">
        <option value="beschaedigt">Besch\xE4digt</option>
        <option value="reparatur">Muss in die Reparatur</option>
        <option value="hinweis">Nur ein Hinweis</option>
        <option value="ok">Wieder in Ordnung</option>
      </select></div>
    <div class="feld"><label for="text">Kurz was (optional)</label>
      <input type="text" id="text" name="text" placeholder="z. B. Belag verbogen"></div>
    ${t?`<div class="feld"><label for="foto">Foto (optional)</label>
      <input type="file" id="foto" name="foto" accept="image/*" capture="environment"></div>`:""}
  </div>
  <button class="knopf knopf-haupt" type="submit">Melden</button>
</form>
<a class="knopf knopf-still" href="/t/${f(e.code)}">Abbrechen</a>`;return q(K(n,{titel:"Melden",kopf:Z("Melden",{href:`/t/${e.code}`,text:"Zur\xFCck"})}))}s(jr,"meldenSeite");var Ur="0.1.0",Vo="2024-11-05",Wr=[{name:"bestand",readOnly:!0,description:'Materialbestand je Artikel und Standort. Z\xE4hlt Inhalt von Ladungstr\xE4gern und separat getaggte Einzelteile zusammen. Ohne Filter kommt der Gesamtbestand \xFCber alle Standorte. F\xFCr "wie viel liegt im Lager" den Standort auf das Lager setzen.',inputSchema:{type:"object",properties:{artikel:{type:"string",description:'Filtert auf Artikel, deren Name den Text enth\xE4lt, z. B. "Rahmen"'},standort:{type:"string",description:"Filtert auf einen Standort (Name oder ID)"}}},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(t.standort&&n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await Xe(e,{standortId:n??void 0,artikelSuche:t.artikel});if(r.length===0)return"Kein Bestand gefunden.";let i=new Map;for(let o of r){let l=i.get(o.artikel)??[];l.push(o),i.set(o.artikel,l)}let a=[];for(let[o,l]of i){let d=l.reduce((I,B)=>I+B.menge,0),p=l[0].mengeneinheit,S=l.map(I=>`  ${I.standort} (${I.standort_typ}): ${de(I.menge)}`).join(`
`);a.push(`${o} \u2014 gesamt ${de(d)} ${p}
${S}`)}return a.join(`

`)}},{name:"einheit",readOnly:!0,description:'Alles zu einer Einheit: Bezeichnung, Inhalt, aktueller Standort, wie lange sie dort steht, und die vollst\xE4ndige Bewegungshistorie. Nimmt den sprechenden Code (z. B. "GB-047") oder den Tag-Code vom Aufkleber (z. B. "K7F2QX").',inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten-Code oder Tag-Code"}},required:["code"]},async ausfuehren(e,t){let n=await Ot(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await Ye(e,n.id),i=await wt(e,n.id,20),a=r.length?r.map(l=>`  ${de(l.menge)}\xD7 ${l.name}`).join(`
`):"  (kein Inhalt erfasst)",o=i.length?i.map(l=>`  ${l.zeit.slice(0,16)} \xB7 ${l.von??"\u2014"} \u2192 ${l.nach} \xB7 ${l.wer??"unbekannt"} (${l.quelle})`).join(`
`):"  (noch keine Bewegungen)";return[`${n.code} \u2014 ${n.bezeichnung} (${n.typ})`,`Standort: ${n.standort_name} (${n.standort_typ}), ${Te(n.seit)}`,`Zustand: ${n.zustand}`,`Inhalt:
${a}`,`Historie:
${o}`].join(`
`)}},{name:"baustelle_bestand",readOnly:!0,description:'Was steht auf einer Baustelle, seit wann und wie viele Vorhaltetage sind aufgelaufen. Grundlage f\xFCr die Frage "k\xF6nnen wir das Ger\xFCst abrechnen" und f\xFCr die R\xE4umung nach Bauende.',inputSchema:{type:"object",properties:{standort:{type:"string",description:"Name oder ID der Baustelle"}},required:["standort"]},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await fe(e,n),i=await tn(e,n);if(i.length===0)return`${r?.name}: kein Material vor Ort.`;let a=i.map(p=>`  ${p.code} \u2014 ${p.bezeichnung} \xB7 ${Tt(p.seit)} Vorhaltetage (${Te(p.seit)})`),o=Math.max(...i.map(p=>Tt(p.seit))),l=await Xe(e,{standortId:n}),d=l.length?l.map(p=>`  ${de(p.menge)} ${p.mengeneinheit} ${p.artikel}`).join(`
`):"  (kein Inhalt erfasst)";return[`${r?.name} (${r?.typ}${r?.aktiv?"":", beendet"})`,`${i.length} Einheiten vor Ort, l\xE4ngste Vorhaltung ${o} Tage`,`Material:
${d}`,`Einheiten:
${a.join(`
`)}`].join(`
`)}},{name:"ueberfaellig",readOnly:!0,description:"Material, das zu lange drau\xDFen steht \u2014 der eigentliche Hebel gegen Materialverlust. Liefert zwei F\xE4lle: l\xE4nger als die Schwelle auf einer Baustelle, und Material auf bereits abgeschlossenen Baustellen (der teure Fall, dort r\xE4umt niemand mehr auf). Nennt auch, wer zuletzt gebucht hat \u2014 um nachfragen zu k\xF6nnen, solange sich noch jemand erinnert.",inputSchema:{type:"object",properties:{schwelle_tage:{type:"number",description:"Ab wie vielen Tagen auf einer Baustelle als \xFCberf\xE4llig gilt. Standard 56 (acht Wochen)."}}},async ausfuehren(e,t){let n=typeof t.schwelle_tage=="number"?t.schwelle_tage:56,r=await et(e,n);if(r.length===0)return`Nichts \xFCberf\xE4llig (Schwelle ${n} Tage).`;let i=r.filter(d=>d.baustelle_beendet),a=r.filter(d=>!d.baustelle_beendet),o=s(d=>d.map(p=>`  ${p.code} \u2014 ${p.bezeichnung} \xB7 ${p.standort} \xB7 ${p.tage} Tage \xB7 zuletzt gebucht von ${p.zuletzt_gebucht_von??"unbekannt"}`).join(`
`),"block"),l=[`${r.length} Einheiten \xFCberf\xE4llig (Schwelle ${n} Tage).`];return i.length&&l.push(`Auf beendeten Baustellen (${i.length}):
${o(i)}`),a.length&&l.push(`\xDCber der Schwelle (${a.length}):
${o(a)}`),l.join(`

`)}},{name:"suche",readOnly:!0,description:'Freitextsuche \xFCber Einheiten, Standorte und Artikel. N\xFCtzlich, wenn nur ein Bruchst\xFCck bekannt ist \u2014 "Elbchaussee", "Treppenturm", "GB-04".',inputSchema:{type:"object",properties:{text:{type:"string"}},required:["text"]},async ausfuehren(e,t){let n=await _r(e,String(t.text));return n.length===0?`Nichts zu "${t.text}" gefunden.`:n.map(r=>`${r.art}: ${r.titel} (${r.zusatz})`).join(`
`)}},{name:"vorhaltung",readOnly:!0,description:'Vorhaltetage je Baustelle \u2014 Grundlage f\xFCr die Abrechnung der Mietdauer. "Einheitentage" ist die Summe \xFCber alle Einheiten (3 Gitterboxen \xD7 67 Tage = 201), nicht die Kalenderdauer der Baustelle. Das ist die Zahl, die bei Streit \xFCber die Mietdauer z\xE4hlt.',inputSchema:{type:"object",properties:{standort:{type:"string",description:"Auf eine Baustelle einschr\xE4nken"},ab_datum:{type:"string",description:"Nur Abschnitte, die nach diesem Datum endeten (JJJJ-MM-TT)"}}},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(t.standort&&n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await xt(e,{standortId:n??void 0,abDatum:t.ab_datum});return r.length===0?"Keine Vorhaltung erfasst.":r.map(i=>`${i.standort}${i.aktiv?"":" (beendet)"}: ${i.tage_summe} Einheitentage \xB7 ${i.einheiten} Einheiten \xB7 l\xE4ngste ${i.tage_max} Tage \xB7 erste Lieferung ${i.erste_lieferung?.slice(0,10)??"?"}`).join(`
`)}},{name:"verlust",readOnly:!0,description:'Material, das als verloren gelten muss: auf abgeschlossener Baustelle oder l\xE4nger als die Schwelle ohne jede Bewegung. Anders als "ueberfaellig" mit Inhaltsangabe \u2014 f\xFCr die Frage, was der Schwund an St\xFCckzahlen gekostet hat.',inputSchema:{type:"object",properties:{schwelle_tage:{type:"number",description:"Standard 120 Tage"}}},async ausfuehren(e,t){let n=typeof t.schwelle_tage=="number"?t.schwelle_tage:120,r=await yt(e,n);return r.length===0?`Kein Verlustverdacht (Schwelle ${n} Tage).`:r.map(i=>`${i.code} \u2014 ${i.bezeichnung} \xB7 ${i.standort}${i.standort_beendet?" (beendet)":""} \xB7 ${i.tage} Tage \xB7 Inhalt: ${i.inhalt??"nicht erfasst"} \xB7 zuletzt gebucht von ${i.zuletzt_von??"unbekannt"}`).join(`
`)}},{name:"meldungen",readOnly:!0,description:"Schadens- und Zustandsmeldungen von der Baustelle. Standard: nur offene.",inputSchema:{type:"object",properties:{alle:{type:"boolean",description:"Auch erledigte einbeziehen"}}},async ausfuehren(e,t){let n=await _t(e,!t.alle);return n.length===0?"Keine Meldungen.":n.map(r=>`${r.zeit.slice(0,16)} \xB7 ${r.code} (${r.bezeichnung}) \xB7 ${$t(r.art)}${r.text?` \xB7 "${r.text}"`:""} \xB7 ${r.wer??"unbekannt"}${r.erledigt?" [erledigt]":""}`).join(`
`)}},{name:"buchung_anlegen",description:"Bucht eine Einheit auf einen anderen Standort \u2014 f\xFCr Korrekturen aus dem B\xFCro. Der Normalweg ist das Scannen vor Ort; dieses Werkzeug ist f\xFCr F\xE4lle, in denen das nachweislich nicht passiert ist. Steht die Einheit schon dort, passiert nichts.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder Tag-Code"},standort:{type:"string",description:"Zielstandort (Name oder ID)"},notiz:{type:"string"}},required:["code","standort"]},async ausfuehren(e,t){let n=await Ot(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await Ce(e,t.standort);if(r===null)return`Standort "${t.standort}" nicht gefunden.`;if((await Qe(e,{einheitId:n.id,nachStandortId:r,mitarbeiterId:null,quelle:"mcp",notiz:t.notiz??"Korrektur aus dem B\xFCro"}))?.unveraendert)return`${n.code} stand bereits dort \u2014 nichts ge\xE4ndert.`;let a=await fe(e,r);return`${n.code} gebucht: ${n.standort_name} \u2192 ${a?.name}.`}},{name:"einheit_anlegen",description:'Legt eine neue Einheit an und erzeugt dazu einen Tag-Code. Der Code muss anschlie\xDFend \xFCber /buero/etiketten gedruckt und auf den Chip geschrieben werden. Typ "traeger" f\xFCr Gitterbox/Stapel/B\xFCndel, "einzelteil" f\xFCr Treppenturm/Winde.',inputSchema:{type:"object",properties:{code:{type:"string",description:'Sprechender Code, z. B. "GB-047"'},bezeichnung:{type:"string"},typ:{type:"string",enum:["traeger","einzelteil"]},standort:{type:"string",description:"Wo sie gerade steht"}},required:["code","bezeichnung","standort"]},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=String(t.code).trim().toUpperCase();if(await Ve(e,r))return`Code ${r} ist schon vergeben.`;let i=t.typ==="einzelteil"?"einzelteil":"traeger",a=await e.DB.prepare(`INSERT INTO einheit (code, typ, bezeichnung, standort_id) VALUES (?, ?, ?, ?)
         RETURNING id`).bind(r,i,String(t.bezeichnung),n).first(),o=await ze(e,"einheit",a.id);return await e.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, quelle, notiz)
         VALUES (?, NULL, ?, 'mcp', 'Ersterfassung')`).bind(a.id,n).run(),`${r} angelegt. Tag-Code: ${o} \u2014 Etikett drucken und den Chip damit beschreiben.`}},{name:"inhalt_setzen",description:"Setzt die Menge eines Artikels in einem Ladungstr\xE4ger. Menge 0 entfernt die Zeile. Ersetzt die bisherige Menge, addiert nicht.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder Tag-Code"},artikel:{type:"string",description:"Artikelname (Teiltreffer gen\xFCgt)"},menge:{type:"number"}},required:["code","artikel","menge"]},async ausfuehren(e,t){let n=await Ot(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await e.DB.prepare(`SELECT id, name FROM artikel WHERE aktiv = 1 AND (name = ?1 OR name LIKE ?2)
          ORDER BY LENGTH(name) LIMIT 1`).bind(String(t.artikel),`%${t.artikel}%`).first();if(!r)return`Artikel "${t.artikel}" nicht gefunden.`;let i=Number(t.menge);return i<=0?(await e.DB.prepare("DELETE FROM inhalt WHERE einheit_id = ? AND artikel_id = ?").bind(n.id,r.id).run(),`${r.name} aus ${n.code} entfernt.`):(await e.DB.prepare(`INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES (?, ?, ?)
         ON CONFLICT (einheit_id, artikel_id) DO UPDATE SET menge = excluded.menge`).bind(n.id,r.id,i).run(),`${n.code}: ${i}\xD7 ${r.name}.`)}},{name:"standort_anlegen",description:"Legt eine Baustelle oder ein Lager an und erzeugt einen Standort-Tag. Wird der geklebt und angetippt, geht danach jede Einheit mit einem einzigen Tap dorthin. Koordinaten sorgen daf\xFCr, dass die Baustelle in der Auswahl nach oben rutscht.",inputSchema:{type:"object",properties:{name:{type:"string"},adresse:{type:"string"},typ:{type:"string",enum:["baustelle","lager"]},lat:{type:"number"},lon:{type:"number"}},required:["name"]},async ausfuehren(e,t){let n=t.typ==="lager"?"lager":"baustelle",r=await e.DB.prepare(`INSERT INTO standort (name, typ, adresse, lat, lon) VALUES (?, ?, ?, ?, ?)
         RETURNING id`).bind(String(t.name),n,t.adresse??null,typeof t.lat=="number"?t.lat:null,typeof t.lon=="number"?t.lon:null).first(),i=await ze(e,"standort",r.id);return`${t.name} angelegt (${n}). Standort-Tag: ${i}.`}},{name:"standort_beenden",description:'Schlie\xDFt eine Baustelle ab. Material, das danach noch dort steht, taucht sofort in "ueberfaellig" und "verlust" auf \u2014 das ist der teure Fall, weil dort niemand mehr aufr\xE4umt.',inputSchema:{type:"object",properties:{standort:{type:"string"}},required:["standort"]},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;await e.DB.prepare(`UPDATE standort SET aktiv = 0, beendet_am = datetime('now')
          WHERE id = ? AND typ = 'baustelle'`).bind(n).run();let r=await tn(e,n),i=await fe(e,n);return r.length===0?`${i?.name} beendet. Kein Material mehr vor Ort.`:`${i?.name} beendet. ACHTUNG: ${r.length} Einheiten stehen noch dort:
`+r.map(a=>`  ${a.code} \u2014 ${a.bezeichnung}`).join(`
`)}},{name:"tag_zuordnen",description:"Erzeugt einen Ersatz-Tag f\xFCr eine bestehende Einheit \u2014 f\xFCr abgerissene oder defekte Chips. Der alte Tag bleibt g\xFCltig, sofern er noch lesbar ist; die Historie der Einheit bleibt in jedem Fall erhalten.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder alter Tag-Code"}},required:["code"]},async ausfuehren(e,t){let n=await Ot(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await ze(e,"einheit",n.id);return`Neuer Tag-Code f\xFCr ${n.code}: ${r}. Etikett drucken, Chip beschreiben, schreibsch\xFCtzen.`}},{name:"inventur_start",description:'Startet einen Inventurlauf f\xFCr einen Standort. Danach z\xE4hlt jeder Scan vor Ort als "gefunden"; Einheiten, die laut System woanders stehen, werden automatisch hierher gebucht. Was am Ende offen bleibt, ist die Fehlliste.',inputSchema:{type:"object",properties:{standort:{type:"string"}},required:["standort"]},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await kt(e,n,null);return`Inventur ${r.id} f\xFCr ${r.standort} l\xE4uft. Soll: ${r.soll_anzahl} Einheiten.`}},{name:"inventur_stand",readOnly:!0,description:"Zeigt Fortschritt und Fehlliste eines Inventurlaufs.",inputSchema:{type:"object",properties:{inventur_id:{type:"number"}},required:["inventur_id"]},async ausfuehren(e,t){let n=await Ne(e,Number(t.inventur_id));if(!n)return"Inventur nicht gefunden.";let{inventur:r,gefunden:i,fehlend:a}=n,o=i.filter(l=>l.war_woanders);return[`Inventur ${r.id} \xB7 ${r.standort} \xB7 ${r.beendet_am?"abgeschlossen":"l\xE4uft"}`,`${i.length} von ${r.soll_anzahl??i.length+a.length} gefunden, ${a.length} fehlen`,o.length?`Hier gefunden, im System woanders (${o.length}):
`+o.map(l=>`  ${l.code} \u2014 ${l.bezeichnung}`).join(`
`):"",a.length?`Fehlt:
`+a.map(l=>`  ${l.code} \u2014 ${l.bezeichnung}`).join(`
`):""].filter(Boolean).join(`
`)}},{name:"inventur_abschluss",description:"Schlie\xDFt einen Inventurlauf ab und liefert das Ergebnis samt Fehlliste.",inputSchema:{type:"object",properties:{inventur_id:{type:"number"},notiz:{type:"string"}},required:["inventur_id"]},async ausfuehren(e,t){let n=await St(e,Number(t.inventur_id),t.notiz);if(!n)return"Inventur nicht gefunden.";let{inventur:r,gefunden:i,fehlend:a}=n;return[`Inventur ${r.id} \xB7 ${r.standort} abgeschlossen.`,`Soll ${r.soll_anzahl}, Ist ${i.length}, Differenz ${a.length}.`,a.length?`Fehlt:
`+a.map(o=>`  ${o.code} \u2014 ${o.bezeichnung}`).join(`
`):"Alles gefunden."].join(`
`)}}];async function Ce(e,t){if(t==null||t==="")return null;let n=Number(t);if(Number.isInteger(n)&&n>0)return await fe(e,n)?n:null;let r=await we(e),i=String(t).toLowerCase(),a=r.find(l=>l.name.toLowerCase()===i);return a?a.id:r.find(l=>l.name.toLowerCase().includes(i))?.id??null}s(Ce,"standortAufloesen");async function Ot(e,t){let n=await Ve(e,t);if(n)return n;let r=await e.DB.prepare("SELECT ziel_id FROM tag WHERE code = ? AND ziel_typ = 'einheit' AND aktiv = 1").bind(t.toUpperCase()).first();return r?We(e,r.ziel_id):null}s(Ot,"einheitAufloesen");function qr(){return Wr.map(({name:e,description:t,inputSchema:n,readOnly:r})=>({name:e,description:t,inputSchema:n,annotations:{readOnlyHint:!!r}}))}s(qr,"werkzeugliste");function Gr(){return Response.json({server:{name:"nfclager",version:Ur},tools:qr()},{headers:{"Cache-Control":"public, max-age=300","Access-Control-Allow-Origin":"*"}})}s(Gr,"toolsJson");function rt(e,t){return{jsonrpc:"2.0",id:e,result:t}}s(rt,"ergebnis");function It(e,t,n){return{jsonrpc:"2.0",id:e,error:{code:t,message:n}}}s(It,"fehler");async function Kr(e,t){if(!t.MCP_TOKEN)return Response.json({error:"MCP_TOKEN nicht gesetzt"},{status:503});let n=e.headers.get("Authorization")??"",r=n.startsWith("Bearer ")?n.slice(7):"";if(!zt(r,t.MCP_TOKEN))return Response.json({error:"Nicht autorisiert"},{status:401,headers:{"WWW-Authenticate":"Bearer"}});let i;try{i=await e.json()}catch{return Response.json(It(null,-32700,"Ung\xFCltiges JSON"),{status:400})}if(i.id===void 0||i.id===null)return new Response(null,{status:202});let{id:a,method:o,params:l}=i;try{switch(o){case"initialize":return Response.json(rt(a,{protocolVersion:Vo,capabilities:{tools:{}},serverInfo:{name:"nfclager",version:Ur},instructions:`Lagerverwaltung J. Werner Ger\xFCstbau.

Getaggt sind Ladungstr\xE4ger (Gitterboxen, Stapel, B\xFCndel) mit gez\xE4hltem Inhalt sowie Gro\xDFteile wie Treppent\xFCrme. Mengen sind deshalb kistengenau, nicht st\xFCckgenau \u2014 bei Zahlen dazusagen, dass sie aus dem erfassten Tr\xE4gerinhalt stammen und beim letzten Packen gez\xE4hlt wurden.

Wegweiser: "bestand" f\xFCr Bestandsfragen, "ueberfaellig" f\xFCr R\xE4umung und Materialverlust, "vorhaltung" f\xFCr Abrechnungsfragen zur Mietdauer, "baustelle_bestand" f\xFCr eine einzelne Baustelle.

Der normale Weg einer Buchung ist das Scannen vor Ort. "buchung_anlegen" ist f\xFCr Korrekturen gedacht, nicht f\xFCr die t\xE4gliche Erfassung \u2014 wer damit Bewegungen nachtr\xE4gt, die niemand gescannt hat, macht die Vorhaltezeiten wertlos. Vor schreibenden Aufrufen beim Menschen r\xFCckfragen.`}));case"ping":return Response.json(rt(a,{}));case"tools/list":return Response.json(rt(a,{tools:qr()}));case"tools/call":{let d=Wr.find(p=>p.name===l?.name);if(!d)return Response.json(It(a,-32602,`Unbekanntes Werkzeug: ${l?.name}`));try{let p=await d.ausfuehren(t,l.arguments??{});return Response.json(rt(a,{content:[{type:"text",text:p}]}))}catch(p){return Response.json(rt(a,{content:[{type:"text",text:`Fehler: ${p.message}`}],isError:!0}))}}default:return Response.json(It(a,-32601,`Unbekannte Methode: ${o}`))}}catch(d){return Response.json(It(a,-32603,d.message),{status:500})}}s(Kr,"mcpBehandeln");E();v();b();function Zr(e,t){let n=`
<h1>Inventur</h1>
<p class="still">Standort abtappen, live sehen was fehlt.</p>
${t.length?`
<h2 style="margin-top:22px">L\xE4uft gerade</h2>
<ul class="wahl">${t.map(r=>`<li><a class="knopf knopf-haupt" href="/inventur/${r.id}">
       <span>${f(r.standort)}</span>
       <span class="neben" style="color:rgba(255,255,255,.82)">fortsetzen</span></a></li>`).join("")}</ul>`:""}
<h2 style="margin-top:22px">Neu starten</h2>
${e.length===0?'<div class="blatt"><p><strong>Keine Standorte angelegt.</strong></p></div>':`<ul class="wahl">${e.map(r=>`<li><form method="post" action="/inventur">
           <input type="hidden" name="standort_id" value="${r.id}">
           <button class="knopf knopf-zweit" type="submit">${f(r.name)}</button>
         </form></li>`).join("")}</ul>`}
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return q(K(n,{titel:"Inventur",kopf:Z("Inventur",{href:"/",text:"\xDCbersicht"})}))}s(Zr,"inventurAuswahl");function Jr(e,t){let{inventur:n,gefunden:r,fehlend:i}=e,a=r.filter(I=>I.war_woanders),o=r.length+i.length,l=o>0?Math.round(r.length/o*100):100,d=n.beendet_am!==null,p=s((I,B)=>`<ul class="stueckliste">${I.map(P=>`<li>
      <span class="anzahl" style="flex-basis:78px">${B?`<a href="/t/${f(P.code)}"><span class="kennung">${f(P.code)}</span></a>`:`<span class="kennung">${f(P.code)}</span>`}</span>
      <span class="was">${f(P.bezeichnung)}</span></li>`).join("")}</ul>`,"liste"),S=`
<h1>${f(n.standort??"")}</h1>
<p class="still">Inventur ${n.id}${d?" \xB7 abgeschlossen":""}</p>

<article class="blatt">
  <p style="font-size:32px;font-weight:700;letter-spacing:-.03em;line-height:1.1">
    ${r.length} <span style="color:var(--ink3);font-weight:550">von ${o}</span></p>
  <div class="balkenanzeige"><span style="width:${l}%"></span></div>
  <p class="still">${i.length===0?"Alles gefunden.":`${i.length} ${i.length===1?"fehlt":"fehlen"} noch`}</p>
  ${n.soll_anzahl!==null&&n.soll_anzahl!==o?`<p class="leise" style="margin-top:6px">Beim Start waren
        ${n.soll_anzahl} Einheiten hier verbucht.</p>`:""}
</article>

${d?X("hinweis","Abgeschlossen",` am ${n.beendet_am.slice(0,16)}.`):X("erfolg","L\xE4uft"," Einfach die Tags antippen \u2014 jede Einheit wird beim Scannen erfasst.")}

${a.length?`
<article class="blatt">
  <h2>Hier gefunden, im System woanders</h2>
  <p class="leise" style="margin-top:4px">Automatisch hierher gebucht.</p>
  ${p(a,!1)}
</article>`:""}

<article class="blatt">
  <h2>Fehlt noch (${i.length})</h2>
  ${i.length===0?'<p class="still" style="margin-top:8px">Nichts offen.</p>':p(i,!0)}
</article>

<article class="blatt">
  <h2>Erfasst (${r.length})</h2>
  ${r.length===0?'<p class="still" style="margin-top:8px">Noch nichts.</p>':p(r.slice(0,60),!1)}
</article>

${d?"":`<form method="post" action="/inventur/${n.id}/abschliessen">
  <button class="knopf knopf-warn" type="submit">Inventur abschlie\xDFen</button></form>`}
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return q(K(S,{titel:`Inventur ${n.standort??""}`,kopf:Z("Inventur",{href:"/inventur",text:"Alle"}),banner:Ie(t)}))}s(Jr,"inventurSeite");E();v();b();var Vr=`
(function () {
  var SCHNAPPSCHUSS = 'wgl.schnappschuss';
  var WARTESCHLANGE = 'wgl.warteschlange';

  function lies(schluessel, standard) {
    try { return JSON.parse(localStorage.getItem(schluessel)) || standard; }
    catch (e) { return standard; }
  }
  function schreib(schluessel, wert) {
    try { localStorage.setItem(schluessel, JSON.stringify(wert)); } catch (e) {}
  }

  /* --------------------------------------------------- Warteschlange --- */

  function einreihen(code, zielId) {
    var q = lies(WARTESCHLANGE, []);
    q.push({ code: code, ziel: Number(zielId), quelle: 'qr', zeit: new Date().toISOString() });
    schreib(WARTESCHLANGE, q);
    zeigeWartestand();
  }
  window.wglEinreihen = einreihen;
  window.wglBestaetigen = function (code, zielId) { bestaetigen(code, zielId); };

  async function abarbeiten() {
    var q = lies(WARTESCHLANGE, []);
    if (!q.length) { zeigeWartestand(); return; }
    var rest = [];
    for (var i = 0; i < q.length; i++) {
      try {
        var a = await fetch('/api/buchung', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(q[i])
        });
        // 4xx heisst: diese Buchung wird auch beim naechsten Versuch nicht
        // klappen (unbekannter Tag, geloeschter Standort). Weglegen statt
        // die Warteschlange ewig blockieren.
        if (!a.ok && a.status >= 500) rest.push(q[i]);
      } catch (e) {
        rest.push(q[i]);
      }
    }
    schreib(WARTESCHLANGE, rest);
    zeigeWartestand();
    if (rest.length === 0 && q.length > 0 && document.getElementById('wgl-wartestand')) {
      location.reload();
    }
  }

  function zeigeWartestand() {
    var n = lies(WARTESCHLANGE, []).length;
    var el = document.getElementById('wgl-wartestand');
    if (!el) return;
    el.hidden = n === 0;
    el.textContent = n === 1
      ? '1 Buchung wartet auf \xDCbertragung'
      : n + ' Buchungen warten auf \xDCbertragung';
  }

  /* ----------------------------------------------------- Schnappschuss --- */

  async function schnappschussHolen() {
    try {
      var a = await fetch('/api/schnappschuss', { headers: { Accept: 'application/json' } });
      if (a.ok) schreib(SCHNAPPSCHUSS, await a.json());
    } catch (e) {}
  }

  window.wglSchnappschuss = function () { return lies(SCHNAPPSCHUSS, null); };

  /* --------------------------------------------------- Formularfang --- */

  function fangen() {
    document.querySelectorAll('form[data-buchung]').forEach(function (f) {
      f.addEventListener('submit', function (ev) {
        if (navigator.onLine) return;   // normaler Formular-POST, kein JS im kritischen Pfad
        ev.preventDefault();
        var d = new FormData(f);
        einreihen(d.get('code'), d.get('ziel'));
        bestaetigen(d.get('code'), Number(d.get('ziel')));
      });
    });
  }

  function bestaetigen(code, zielId) {
    var s = lies(SCHNAPPSCHUSS, null);
    var name = '';
    if (s && s.standorte) {
      for (var i = 0; i < s.standorte.length; i++) {
        if (s.standorte[i].id === zielId) name = s.standorte[i].name;
      }
    }
    document.body.innerHTML =
      '<div class="bahn"><div class="notiz notiz-erfolg"><strong>Gespeichert' +
      (name ? ': ' + name : '') + '</strong>' +
      'Kein Netz \u2014 wird \xFCbertragen, sobald wieder Empfang da ist.</div>' +
      '<a class="knopf knopf-haupt" href="/">Weiter</a></div>';
  }

  /* ------------------------------------------------------------ Start --- */

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  }
  window.addEventListener('online', abarbeiten);
  document.addEventListener('DOMContentLoaded', function () {
    fangen();
    zeigeWartestand();
    if (navigator.onLine) { abarbeiten(); schnappschussHolen(); }
  });
})();
`,Yr=`
var CACHE = 'wgl-v1';
var HUELLE = ['/offline', '/app.js'];

self.addEventListener('install', function (ev) {
  ev.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(HUELLE); })
    .then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(caches.keys().then(function (namen) {
    return Promise.all(namen.filter(function (n) { return n !== CACHE; })
      .map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (ev) {
  var url = new URL(ev.request.url);
  if (ev.request.method !== 'GET' || url.origin !== location.origin) return;

  if (ev.request.mode === 'navigate') {
    ev.respondWith(fetch(ev.request).catch(function () {
      return caches.match('/offline');
    }));
    return;
  }
  if (url.pathname === '/app.js') {
    ev.respondWith(caches.match(ev.request).then(function (t) {
      return t || fetch(ev.request);
    }));
  }
});
`;function Qr(){let e=`
${X("hinweis","Kein Netz"," Buchungen werden gespeichert und \xFCbertragen, sobald wieder Empfang da ist.")}
<div id="einheit"></div>
<div id="knoepfe"></div>
<p class="fussnote" id="wgl-wartestand" hidden></p>`,t=`<script src="/app.js"><\/script>
<script>
(function () {
  var treffer = location.pathname.match(/\\/t\\/([^/?#]+)/);
  var code = treffer ? decodeURIComponent(treffer[1]).toUpperCase() : '';
  var s = window.wglSchnappschuss ? window.wglSchnappschuss() : null;
  var e = s && s.einheiten ? s.einheiten[code] : null;
  var ziel = document.getElementById('einheit');
  var knoepfe = document.getElementById('knoepfe');

  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  if (!e) {
    ziel.innerHTML = '<article class="blatt"><span class="kennung">' + esc(code) + '</span>' +
      '<p style="margin-top:14px">Zu diesem Tag liegen keine Daten auf dem Handy. ' +
      'Sobald wieder Empfang da ist, die Seite neu laden.</p></article>';
    return;
  }

  var inhalt = e.i ? '<ul class="stueckliste">' + e.i.split(', ').map(function (z) {
    var t = z.match(/^(S+\xD7)s*(.*)$/);
    return t
      ? '<li><span class="anzahl">' + esc(t[1]) + '</span><span class="was">' + esc(t[2]) + '</span></li>'
      : '<li><span class="was">' + esc(z) + '</span></li>';
  }).join('') + '</ul>' : '';

  ziel.innerHTML = '<article class="blatt">' +
    '<span class="kennung">' + esc(e.c) + '</span>' +
    '<h1 class="titel-gross">' + esc(e.b) + '</h1>' + inhalt +
    '<div class="standzeit"><span class="wo">' + esc(e.sn || '') + '</span>' +
    '<span class="wie-lang">Stand vom letzten Empfang</span></div></article>';

  var kandidaten = (s.standorte || []).filter(function (st) { return st.id !== e.s; });
  var lager = kandidaten.filter(function (st) { return st.typ === 'lager'; });
  var rest = kandidaten.filter(function (st) { return st.typ !== 'lager'; });

  // Hier bewusst keine Formulare: diese Seite erscheint nur, weil das Netz
  // nachweislich tot ist. Jeder Klick geht direkt in die Warteschlange \u2014
  // unabhaengig davon, was navigator.onLine gerade behauptet.
  var sortiert = lager.concat(rest);
  knoepfe.innerHTML = sortiert.map(function (st, i) {
    return '<button class="knopf ' + (i === 0 ? 'knopf-haupt' : 'knopf-zweit') +
      '" type="button" data-ziel="' + st.id + '">' + esc(st.name) + '</button>';
  }).join('');

  knoepfe.addEventListener('click', function (ev) {
    var knopf = ev.target.closest('button[data-ziel]');
    if (!knopf) return;
    window.wglEinreihen(code, knopf.getAttribute('data-ziel'));
    window.wglBestaetigen(code, Number(knopf.getAttribute('data-ziel')));
  });
})();
<\/script>`;return q(K(e,{titel:"Kein Netz",kopf:Z(),scripte:t}))}s(Qr,"offlineSeite");E();v();b();function Xr(e,t){let n=e.map(a=>`<option value="${a.id}"${a.id===t?" selected":""}>${f(a.name)}</option>`).join(""),r=`
<h1>Scan-Station</h1>
<p class="still">Dauerscan f\xFCrs Be- und Entladen. Ein Ziel w\xE4hlen, dann Tag an Tag halten.</p>

<div id="nicht-unterstuetzt" hidden>
  ${X("hinweis","Dieses Ger\xE4t kann nicht dauerscannen"," Web NFC gibt es nur in Chrome auf Android. Auf dem iPhone stattdessen den Tag direkt antippen \u2014 das Banner \xF6ffnet die Einheit.")}
</div>

<div class="blatt">
  <div class="feld" style="margin-bottom:0"><label for="ziel">Alles buchen nach</label>
    <select id="ziel">${n}</select></div>
</div>
<button id="start" class="knopf knopf-haupt" type="button">Scannen starten</button>
<button id="stop" class="knopf knopf-warn" type="button" hidden>Scannen beenden</button>

<article class="blatt" id="status" hidden style="text-align:center">
  <p id="status-text" style="font-size:20px;font-weight:650">Bereit \u2014 Tag ans Handy halten</p>
  <p style="font-size:40px;font-weight:700;letter-spacing:-.03em;margin-top:6px"
     id="zaehler">0</p>
  <p class="still">gebucht</p>
</article>

<ul class="stueckliste" id="protokoll" style="margin-top:4px"></ul>
<p class="fussnote"><a href="/">\xDCbersicht</a></p>`,i=`<script>
(function () {
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var status = document.getElementById('status');
  var statusText = document.getElementById('status-text');
  var protokoll = document.getElementById('protokoll');
  var zaehler = document.getElementById('zaehler');
  var zielFeld = document.getElementById('ziel');
  var n = 0, abbruch = null;
  var zuletzt = {};

  if (!('NDEFReader' in window)) {
    document.getElementById('nicht-unterstuetzt').hidden = false;
    start.disabled = true;
    start.style.opacity = '.45';
    return;
  }

  function melden(zeichen, code, text, farbe) {
    var li = document.createElement('li');
    var a = document.createElement('span');
    a.className = 'anzahl';
    a.textContent = zeichen;
    if (farbe) a.style.color = farbe;
    var b = document.createElement('span');
    b.className = 'was';
    b.textContent = code + (text ? ' \u2014 ' + text : '');
    li.appendChild(a); li.appendChild(b);
    protokoll.insertBefore(li, protokoll.firstChild);
    while (protokoll.children.length > 40) protokoll.removeChild(protokoll.lastChild);
  }

  function codeAus(nachricht) {
    for (var i = 0; i < nachricht.records.length; i++) {
      var r = nachricht.records[i];
      if (r.recordType !== 'url' && r.recordType !== 'absolute-url') continue;
      var url = new TextDecoder().decode(r.data);
      var treffer = url.match(/\\/t\\/([0-9A-Z-]{4,12})/i);
      if (treffer) return treffer[1].toUpperCase();
    }
    return null;
  }

  async function buchen(code) {
    // Derselbe Tag zweimal in f\xFCnf Sekunden ist ein Doppelkontakt, keine
    // zweite Buchung \u2014 auf dem Stapel liegen die Tags dicht beieinander.
    var jetzt = Date.now();
    if (zuletzt[code] && jetzt - zuletzt[code] < 5000) return;
    zuletzt[code] = jetzt;

    try {
      var antwort = await fetch('/api/buchung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ code: code, ziel: Number(zielFeld.value), quelle: 'nfc' })
      });
      var daten = await antwort.json();
      if (!antwort.ok || !daten.ok) {
        melden('\u2717', code, daten.fehler || 'Fehler', 'var(--rot-ink)');
        if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
        return;
      }
      if (daten.unveraendert) {
        melden('\u2022', code, 'stand schon hier', 'var(--ink3)');
      } else {
        n++;
        zaehler.textContent = String(n);
        melden('\u2713', code, daten.bezeichnung, 'var(--gruen)');
      }
      if (navigator.vibrate) navigator.vibrate(40);
    } catch (e) {
      melden('\u2717', code, 'kein Netz, bitte wiederholen', 'var(--rot-ink)');
    }
  }

  start.addEventListener('click', async function () {
    try {
      var leser = new NDEFReader();
      abbruch = new AbortController();
      await leser.scan({ signal: abbruch.signal });
      leser.onreading = function (ev) {
        var code = codeAus(ev.message);
        if (code) buchen(code);
        else melden('\u2717', 'Tag', 'ohne g\xFCltige URL', 'var(--rot-ink)');
      };
      leser.onreadingerror = function () {
        melden('\u2717', 'Tag', 'nicht lesbar', 'var(--rot-ink)');
      };
      start.hidden = true;
      stop.hidden = false;
      status.hidden = false;
      zielFeld.disabled = true;
      statusText.textContent = 'Bereit \u2014 Tag ans Handy halten';
    } catch (e) {
      melden('\u2717', 'Start', e.message, 'var(--rot-ink)');
    }
  });

  stop.addEventListener('click', function () {
    if (abbruch) abbruch.abort();
    start.hidden = false;
    stop.hidden = true;
    zielFeld.disabled = false;
    statusText.textContent = 'Beendet';
  });
})();
<\/script>`;return q(K(r,{titel:"Scan-Station",kopf:Z("Scan-Station",{href:"/",text:"\xDCbersicht"}),scripte:i}))}s(Xr,"stationSeite");E();v();b();E();v();b();var ii=yi(ri(),1);function ai(e,t){let n=(0,ii.default)(0,"M");n.addData(e),n.make();let r=n.getModuleCount(),i=[];for(let a=0;a<r;a++)for(let o=0;o<r;o++)n.isDark(a,o)&&i.push(`M${o} ${a}h1v1h-1z`);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ${r+2} ${r+2}" width="${t}mm" height="${t}mm" shape-rendering="crispEdges"><rect x="-1" y="-1" width="${r+2}" height="${r+2}" fill="#fff"/><path d="${i.join("")}" fill="#000"/></svg>`}s(ai,"qrSvg");function Yo(e){try{return new URL(e).host}catch{return""}}s(Yo,"host");function oi(e,t){let n=e.map(r=>`
<div class="etikett">
  <div class="qr">${ai(r.url,27)}</div>
  <div class="txt">
    <div class="code">${f(r.code)}</div>
    <div class="bez">${f(r.bezeichnung)}</div>
    <div class="host">${f(Yo(r.url))}</div>
    <div class="firma">${f(t)}</div>
  </div>
</div>`).join("");return`<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<title>Etiketten \u2014 ${e.length} St\xFCck</title>
<style>
@page{size:A4;margin:9mm}
body{margin:0;color:#000;background:#fff;
  font:12px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
.anleitung{padding:14px 16px;background:#f2f5f8;border:1px solid #d9e0e7;border-radius:10px;
  margin-bottom:14px;font-size:13px;line-height:1.55;max-width:170mm}
.anleitung h1{font-size:15px;margin:0 0 6px}
.anleitung ol{margin:6px 0 0;padding-left:18px}
.anleitung li{margin-bottom:3px}
.bogen{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.etikett{display:flex;gap:3.5mm;align-items:center;border:1px dashed #9aa5b1;border-radius:2.5mm;
  padding:3mm;height:33mm;break-inside:avoid;page-break-inside:avoid;overflow:hidden}
.qr{flex:0 0 auto;line-height:0}
.txt{min-width:0;display:flex;flex-direction:column;gap:1.5mm}
.code{font:700 15px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em}
.bez{font-size:10.5px;line-height:1.25;overflow:hidden;display:-webkit-box;
  -webkit-line-clamp:2;-webkit-box-orient:vertical;color:#1c2733}
.host{font-size:8px;color:#5a6672;letter-spacing:.02em}
.firma{font-size:7.5px;color:#7b8794}
@media print{.anleitung{display:none}.etikett{border-color:#c9d1d9}}
</style></head>
<body>
<div class="anleitung">
  <h1>${e.length} Etiketten</h1>
  <ol>
    <li>Auf wetterfestes Material drucken \u2014 Papier \xFCberlebt eine Ger\xFCstbau-Baustelle nicht.</li>
    <li>Den NFC-Chip mit <strong>derselben URL</strong> beschreiben, die im QR steckt
        (NFC Tools oder NXP TagWriter, Typ <strong>URI-Record</strong>).</li>
    <li>Chip anschlie\xDFend <strong>schreibsch\xFCtzen</strong>, damit niemand eine fremde
        URL darauflegen kann.</li>
    <li>On-Metal-Tags verwenden \u2014 an Stahl-Gitterboxen funktionieren normale Chips nicht.</li>
  </ol>
</div>
<div class="bogen">${n}</div>
</body></html>`}s(oi,"druckbogen");E();v();b();var Qo=[["/buero","\xDCbersicht"],["/buero/lager","Lager"],["/buero/einstellungen","Einstellungen"]];function it(e,t,n,r=200){let i=Qo.map(([a,o])=>{let l=a==="/buero"?t==="/buero":t.startsWith(a);return`<a href="${f(a)}"${l?' class="aktiv"':""}>${f(o)}</a>`}).join("");return q(K(`
<header class="buerokopf">
  <div class="oben">
    <span class="marke">${At(21,"currentColor")}${f(xe)}</span>
    <a class="abmelden" href="/buero/abmelden">Abmelden</a>
  </div>
  <nav class="reiter">${i}</nav>
</header>
<main class="inhalt">${n}</main>`,{titel:`${e} \xB7 ${xe}`,roh:!0}),r)}s(it,"gestell");function at(e){let t=`
<h1>${f(xe)}</h1>
<p class="still">Ger\xFCstlager der J. Werner Ger\xFCstbau</p>
${e?X("fehler",e):""}
<form method="post" action="/buero/anmelden">
  <div class="feld"><label for="pw">Passwort</label>
    <input type="password" id="pw" name="passwort" autocomplete="current-password" required></div>
  <button class="knopf knopf-lager" type="submit">Anmelden</button>
</form>`;return q(K(t,{titel:`B\xFCro \xB7 ${xe}`,kopf:Z()}),e?401:200)}s(at,"anmeldung");function si(e){let t=e.ueberfaellig.filter(o=>o.baustelle_beendet).length,n=e.ueberfaellig.map(o=>[`<a href="/buero/einheit/${o.einheit_id}"><strong>${f(o.code)}</strong></a>
     <span class="zweitzeile">${f(o.bezeichnung)}</span>`,`${f(o.standort)}${o.baustelle_beendet?` ${oe("beendet","warn")}`:""}`,`<strong>${o.tage}</strong>`,f(o.zuletzt_gebucht_von??"\u2014")]),r=e.meldungen.map(o=>[`<a href="/buero/einheit/${o.einheit_id}"><strong>${f(o.code)}</strong></a>
     <span class="zweitzeile">${f(o.bezeichnung)}</span>`,oe($t(o.art),o.art==="ok"?"ok":"warn"),`${f(o.text??"")}${o.foto_schluessel?`<span class="zweitzeile"><a href="/foto/${f(o.foto_schluessel)}">Foto</a></span>`:""}`,`${f(o.zeit.slice(0,10))}<span class="zweitzeile">${f(o.wer??"\u2014")}</span>`,`<form method="post" action="/buero/meldung/${o.id}/erledigt">
       <button class="knopf knopf-zweit" type="submit">erledigt</button></form>`]),i=e.vorhaltung.map(o=>[`<strong>${f(o.standort)}</strong>${o.aktiv?"":` ${oe("beendet","warn")}`}`,String(o.einheiten),`<strong>${o.tage_summe}</strong>`,String(o.tage_max)]),a=`
${qe("\xDCbersicht")}
${Lr([{wert:e.imLager,wort:"im Lager",zusatz:"verf\xFCgbar"},{wert:e.aufBaustellen,wort:"drau\xDFen",zusatz:`auf ${e.standorte} Standorten`},{wert:e.ueberfaellig.length,wort:"\xFCberf\xE4llig",zusatz:t?`${t} auf beendeten Baustellen`:"\xFCber der Schwelle",achtung:e.ueberfaellig.length>0},{wert:e.meldungen.length,wort:"Meldungen",zusatz:"offen",achtung:e.meldungen.length>0}])}

${ae({titel:"\xDCberf\xE4llig",beitext:"l\xE4nger als 8 Wochen drau\xDFen oder auf beendeter Baustelle"},e.ueberfaellig.length===0?`<div class="leer"><strong>Nichts \xFCberf\xE4llig</strong>Alles Material ist im Lager oder
          noch nicht lange genug drau\xDFen.</div>`:ue([{titel:"Einheit"},{titel:"Standort"},{titel:"Tage",zahl:!0},{titel:"Zuletzt gebucht"}],n))}

${ae({titel:"Offene Meldungen",beitext:"Sch\xE4den von der Baustelle"},e.meldungen.length===0?'<div class="leer"><strong>Keine Meldungen</strong>Nichts Offenes.</div>':ue([{titel:"Einheit"},{titel:"Art"},{titel:"Was"},{titel:"Wann"},{titel:""}],r))}

${ae({titel:"Vorhaltetage",beitext:"Einheitentage = Summe \xFCber alle Einheiten"},e.vorhaltung.length===0?`<div class="leer"><strong>Noch keine Bewegungen</strong>Sobald Material rausgeht und
          zur\xFCckkommt, steht hier die belastbare Mietdauer.</div>`:ue([{titel:"Baustelle"},{titel:"Einheiten",zahl:!0},{titel:"Einheitentage",zahl:!0},{titel:"L\xE4ngste",zahl:!0}],i))}`;return it("\xDCbersicht","/buero",a)}s(si,"uebersicht");function li(e){let t=["einheiten","artikel"].map(l=>`<a class="knopf ${e.sicht===l?"knopf-lager":"knopf-zweit"}"
        href="/buero/lager?sicht=${l}${e.filter?`&q=${encodeURIComponent(e.filter)}`:""}">
       ${l==="einheiten"?"Nach Einheit":"Nach Artikel"}</a>`).join(""),n=e.einheiten.map(l=>[`<a href="/buero/einheit/${l.id}"><strong class="mono">${f(l.code)}</strong></a>`,`${f(l.bezeichnung)}${l.zustand!=="ok"?` ${oe(Nt(l.zustand),"warn")}`:""}`,`${f(l.standort_name)}<span class="zweitzeile">${f(Te(l.seit))}</span>`]),r=new Map;for(let l of e.bestand){let d=r.get(l.artikel)??[];d.push(l),r.set(l.artikel,d)}let i=[...r.entries()].map(([l,d])=>{let p=d.reduce((B,P)=>B+P.menge,0),S=d.filter(B=>B.standort_typ==="lager").reduce((B,P)=>B+P.menge,0),I=d.filter(B=>B.standort_typ!=="lager");return[`<strong>${f(l)}</strong>`,`<strong>${f(de(S))}</strong>`,f(de(p-S)),f(de(p)),I.length?`<span class="leise">${I.map(B=>`${f(B.standort)} (${de(B.menge)})`).join(" \xB7 ")}</span>`:""]}),a=e.standorte.map(l=>`<option value="${l.id}">${f(l.name)}</option>`).join(""),o=`
${qe("Lager",void 0,'<a class="knopf knopf-zweit" href="/buero/etiketten">Etiketten drucken</a>')}
<div class="filter">
  ${t}
  <form method="get" style="display:flex;gap:12px;flex:1;min-width:240px">
    <input type="hidden" name="sicht" value="${f(e.sicht)}">
    <input type="text" name="q" placeholder="Suchen \u2026" value="${f(e.filter)}">
    <button class="knopf knopf-zweit" type="submit">Suchen</button>
  </form>
</div>

${e.sicht==="artikel"?ae({titel:"Material",beitext:`${i.length} Artikel im Umlauf`},i.length===0?`<div class="leer"><strong>Kein Bestand</strong>Sobald Einheiten mit Inhalt erfasst
              sind, steht hier die Summe.</div>`:ue([{titel:"Artikel"},{titel:"Lager",zahl:!0},{titel:"Drau\xDFen",zahl:!0},{titel:"Gesamt",zahl:!0},{titel:"Wo drau\xDFen"}],i)):ae({titel:"Einheiten",beitext:`${e.einheiten.length} St\xFCck`},e.einheiten.length===0?`<div class="leer"><strong>Keine Einheiten</strong>${e.filter?"Nichts passt zur Suche.":"Unten die erste Gitterbox anlegen."}</div>`:ue([{titel:"Code"},{titel:"Bezeichnung"},{titel:"Standort"}],n))}

${ae({titel:"Neue Einheit",gepolstert:!0},`
<form method="post" action="/buero/lager">
  <div class="feld"><label for="bez">Bezeichnung</label>
    <input type="text" id="bez" name="bezeichnung" required
      placeholder="z. B. Gitterbox Rahmen 2,00 m"></div>
  <div class="felder-zwei">
    <div class="feld"><label for="code">Code</label>
      <input type="text" id="code" name="code" required placeholder="z. B. GB-047"></div>
    <div class="feld"><label for="typ">Art</label>
      <select id="typ" name="typ">
        <option value="traeger">Ladungstr\xE4ger</option>
        <option value="einzelteil">Einzelteil</option>
      </select></div>
  </div>
  <div class="feld"><label for="st">Steht aktuell</label>
    <select id="st" name="standort_id">${a}</select></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Tag erzeugen</button>
</form>`)}`;return it("Lager","/buero/lager",o)}s(li,"lagerSeite");function ui(e){let{einheit:t}=e,n=e.inhalt.map(l=>[f(l.name),`<strong>${f(de(l.menge))}</strong> <span class="leise">${f(l.mengeneinheit)}</span>`,`<form method="post" action="/buero/einheit/${t.id}/inhalt">
       <input type="hidden" name="artikel_id" value="${l.artikel_id}">
       <input type="hidden" name="menge" value="0">
       <button class="knopf knopf-zweit" type="submit">entfernen</button></form>`]),r=e.historie.map(l=>[`<span class="mono">${f(l.zeit.slice(0,16))}</span>`,`${f(l.von??"\u2014")} \u2192 <strong>${f(l.nach)}</strong>`,`${f(l.wer??"\u2014")} ${oe(l.quelle,"ruhig")}`]),i=e.artikel.map(l=>`<option value="${l.id}">${f(l.name)}</option>`).join(""),a=e.tagCodes.map(l=>`<li><span class="mono"><strong>${f(l)}</strong></span>
       <span class="leise">${f(e.basisUrl)}/t/${f(l)}</span></li>`).join(""),o=`
${qe(t.code,`${t.bezeichnung} \xB7 ${t.standort_name} \xB7 ${Te(t.seit)} \xB7 ${Nt(t.zustand)}`,`<a class="knopf knopf-zweit" href="/buero/etiketten?einheit=${t.id}">Etikett drucken</a>
     <form method="post" action="/buero/einheit/${t.id}/tag">
       <button class="knopf knopf-zweit" type="submit">Ersatz-Tag</button></form>`)}

${ae({titel:"Inhalt",gepolstert:!0},(e.inhalt.length===0?'<div class="leer"><strong>Leer</strong>Unten Artikel und Menge eintragen.</div>':ue([{titel:"Artikel"},{titel:"Menge",zahl:!0},{titel:""}],n))+`<form method="post" action="/buero/einheit/${t.id}/inhalt" style="margin-top:22px">
      <div class="felder-zwei">
        <div class="feld"><label for="art">Artikel</label>
          <select id="art" name="artikel_id">${i}</select></div>
        <div class="feld"><label for="menge">Menge</label>
          <input type="number" id="menge" name="menge" step="0.1" min="0" value="1"></div>
      </div>
      <button class="knopf knopf-zweit" type="submit">Inhalt setzen</button>
    </form>`)}

${ae({titel:"Tags",beitext:"der Chip tr\xE4gt diese URL",gepolstert:!0},e.tagCodes.length===0?'<div class="leer"><strong>Kein Tag</strong>Oben \xFCber \u201EErsatz-Tag" einen erzeugen.</div>':`<ul class="stueckliste" style="border-top:0;margin-top:0">${a}</ul>`)}

${ae({titel:"Historie",beitext:"jede Bewegung, l\xFCckenlos"},e.historie.length===0?'<div class="leer"><strong>Noch keine Bewegungen</strong></div>':ue([{titel:"Wann"},{titel:"Bewegung"},{titel:"Wer"}],r))}`;return it(t.code,"/buero/lager",o)}s(ui,"einheitDetail");function di(e){let t=e.standorte.map(a=>[`<strong>${f(a.name)}</strong>${a.adresse?`<span class="zweitzeile">${f(a.adresse)}</span>`:""}`,oe(a.typ,a.typ==="lager"?"voll":"ruhig")+(a.aktiv?"":` ${oe("beendet","warn")}`),`<a href="/buero/etiketten?standort=${a.id}">Etikett</a>`,a.typ==="baustelle"&&a.aktiv?`<form method="post" action="/buero/standorte/${a.id}/beenden">
           <button class="knopf knopf-zweit" type="submit">beenden</button></form>`:""]),n=e.leute.map(a=>[`<strong>${f(a.name)}</strong>${a.aktiv?"":` ${oe("gesperrt","warn")}`}`,a.token_hash?oe("eingerichtet","ok"):a.einladung?`<a href="${f(e.basisUrl)}/einladung/${f(a.einladung)}">Einladungslink</a>`:'<span class="leise">\u2014</span>',f(a.zuletzt_aktiv?.slice(0,10)??"\u2014"),`<form method="post" action="/buero/mitarbeiter/${a.id}/umschalten">
       <button class="knopf knopf-zweit" type="submit">${a.aktiv?"sperren":"freigeben"}</button></form>`]),r=e.artikel.map(a=>[`<strong>${f(a.name)}</strong>`,f(a.kategorie),f(a.mengeneinheit)]),i=`
${qe("Einstellungen")}

${ae({titel:"Standorte",beitext:`${e.standorte.filter(a=>a.aktiv).length} aktiv \xB7 jeder erzeugt einen Standort-Tag`,gepolstert:!0},ue([{titel:"Name"},{titel:"Art"},{titel:"Tag"},{titel:""}],t)+`<form method="post" action="/buero/standorte" style="margin-top:24px">
      <div class="felder-zwei">
        <div class="feld"><label for="n">Name</label>
          <input type="text" id="n" name="name" required placeholder="z. B. Elbchaussee 12"></div>
        <div class="feld"><label for="a">Adresse</label>
          <input type="text" id="a" name="adresse" placeholder="optional"></div>
      </div>
      <div class="felder-zwei">
        <div class="feld"><label for="t">Art</label>
          <select id="t" name="typ">
            <option value="baustelle">Baustelle</option>
            <option value="lager">Lager</option>
          </select></div>
        <div class="feld"><label for="lat">Koordinaten \u2014 sortiert die Auswahl nach N\xE4he</label>
          <div class="felder-zwei">
            <input type="text" id="lat" name="lat" placeholder="53.5511">
            <input type="text" name="lon" placeholder="9.9937"></div></div>
      </div>
      <button class="knopf knopf-lager" type="submit">Standort anlegen</button>
    </form>`)}

${ae({titel:"Mitarbeiter",beitext:"Einladungslink einmal schicken \u2014 kein Passwort, kein Login",gepolstert:!0},ue([{titel:"Name"},{titel:"Status"},{titel:"Zuletzt"},{titel:""}],n)+`<form method="post" action="/buero/mitarbeiter" style="margin-top:24px">
      <div class="feld"><label for="mn">Name</label>
        <input type="text" id="mn" name="name" required></div>
      <button class="knopf knopf-lager" type="submit">Anlegen und Einladung erzeugen</button>
    </form>`)}

${ae({titel:"Artikel",beitext:`${e.artikel.length} Positionen im Materialstamm`,gepolstert:!0},ue([{titel:"Name"},{titel:"Kategorie"},{titel:"Einheit"}],r)+`<form method="post" action="/buero/artikel" style="margin-top:24px">
      <div class="felder-zwei">
        <div class="feld"><label for="an">Name</label>
          <input type="text" id="an" name="name" required placeholder="z. B. Rahmen 2,00 m"></div>
        <div class="feld"><label for="am">Mengeneinheit</label>
          <input type="text" id="am" name="mengeneinheit" value="Stk"></div>
      </div>
      <div class="feld"><label for="ak">Kategorie</label>
        <input type="text" id="ak" name="kategorie" placeholder="z. B. rahmen"></div>
      <button class="knopf knopf-lager" type="submit">Artikel anlegen</button>
    </form>`)}

${ae({titel:"Vermuteter Verlust",beitext:"nur zur Kenntnis \u2014 Details auf der \xDCbersicht"},`<p class="still" style="padding:18px 0">Material, das seit \xFCber 120 Tagen drau\xDFen steht
      oder auf einer beendeten Baustelle liegt, findest du auf der
      <a href="/buero">\xDCbersicht</a> unter \u201E\xDCberf\xE4llig".</p>`)}`;return it("Einstellungen","/buero/einstellungen",i)}s(di,"einstellungen");function ci(e,t){let n=e.map(i=>[`<a href="/buero/einheit/${i.einheit_id}"><strong>${f(i.code)}</strong></a>
     <span class="zweitzeile">${f(i.bezeichnung)}</span>`,`${f(i.standort)}${i.standort_beendet?` ${oe("beendet","warn")}`:""}`,String(i.tage),`<span class="leise">${f(i.inhalt??"\u2014")}</span>`,f(i.zuletzt_von??"\u2014")]),r=`
${qe("Vermuteter Verlust",`ab ${t} Tagen oder auf beendeter Baustelle`)}
<div style="margin-top:26px">
${e.length===0?'<div class="leer"><strong>Nichts auff\xE4llig</strong></div>':ue([{titel:"Einheit"},{titel:"Standort"},{titel:"Tage",zahl:!0},{titel:"Inhalt"},{titel:"Zuletzt gebucht"}],n)}
</div>`;return it("Verlust","/buero",r)}s(ci,"verlustListe");var M=new Xt,pn=s(e=>new URL(e.url).origin,"basisUrl");M.get("/",async e=>{let t=await te(e.req.raw,e.env);if(!t)return await tt(e.req.raw,e.env)?e.redirect("/buero"):q(K(`
<article class="blatt">
  <h1>${f(e.env.FIRMA)}</h1>
  <p class="still" style="margin-top:6px">Lagerverwaltung</p>
</article>
${X("hinweis","Dieses Handy ist noch nicht eingerichtet"," Der Einladungslink kommt vom B\xFCro \u2014 einmal antippen gen\xFCgt.")}
<a class="knopf knopf-still" href="/buero">B\xFCro</a>`,{titel:e.env.FIRMA,kopf:Z()}));let n=await Oe(e.env,t.id),r=await Et(e.env);return q(K(`
<h1>Hallo ${f(t.name)}</h1>
<p class="still">Tag ans Handy halten, um zu buchen.</p>
<form method="get" action="/t">
  <div class="blatt">
    <div class="feld" style="margin-bottom:0">
      <label for="code">Oder Code vom Aufkleber eintippen</label>
      <input type="text" id="code" name="code" autocapitalize="characters"
        autocomplete="off" placeholder="z. B. K7F2QX"></div>
  </div>
  <button class="knopf knopf-lager" type="submit">\xD6ffnen</button>
</form>
<a class="knopf knopf-zweit" href="/inventur">Inventur</a>
<a class="knopf knopf-zweit" href="/scan" id="dauerscan" hidden>Dauerscan</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>
${r?`<p class="fussnote">Hauptlager: ${f(r.name)}</p>`:""}`,{titel:xe,kopf:Z(),banner:Ie(n),scripte:`<script src="/app.js"><\/script><script>if('NDEFReader' in window)document.getElementById('dauerscan').hidden=false;<\/script>`}))});M.get("/t",e=>{let t=ce(e.req.query("code")??"");return t?e.redirect(`/t/${t}`):e.redirect("/")});M.get("/t/:code",async e=>{let t=e.req.param("code"),n=await Ge(e.env,t);if(!n)return nt(ce(t));let r=n.code,i=await te(e.req.raw,e.env);if(n.art==="standort")return i?(await ln(e.env,i.id,n.standort.id,n.standort.name),q(K(`
${X("erfolg",`Du bist auf ${n.standort.name}`," Die n\xE4chsten 4 Stunden geht jede Einheit mit einem Tap hierher.")}
<p class="still">Jetzt die Einheiten antippen.</p>
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`,{titel:n.standort.name,kopf:Z(),banner:Ie(await Oe(e.env,i.id))}))):e.redirect("/");let a=n.einheit;if(!i)return Fr(a,e.env.FIRMA,e.env.FIRMA_TELEFON);let[o,l,d]=await Promise.all([Ye(e.env,a.id),Oe(e.env,i.id),Et(e.env)]),p=Number(e.req.query("ok")??0),S=p?{art:"erfolg",text:`Gebucht: ${a.standort_name}`}:e.req.query("schon")?{art:"hinweis",text:"Stand schon dort \u2014 nichts ge\xE4ndert."}:e.req.query("gemeldet")?{art:"erfolg",text:"Meldung ist im B\xFCro angekommen."}:e.req.query("storniert")?{art:"hinweis",text:"Buchung zur\xFCckgenommen."}:e.req.query("fehler")?{art:"fehler",text:String(e.req.query("fehler"))}:void 0,I=l?await rn(e.env,l.standortId):null,B=I?[Br(I.id,r,I.standort??""),...cn(a,l,d)]:cn(a,l,d);return Pr({einheit:a,inhalt:o,aktionen:B,sitzung:l,meldung:S,stornoId:p||void 0})});M.get("/t/:code/wohin",async e=>{let t=await Ge(e.env,e.req.param("code"));if(!t||t.art!=="einheit")return nt(ce(e.req.param("code")));let n=t.code,r=await te(e.req.raw,e.env);if(!r)return e.redirect(`/t/${n}`);let i=Number(e.req.query("lat")),a=Number(e.req.query("lon")),o=Number.isFinite(i)&&Number.isFinite(a),p=(await we(e.env)).filter(S=>S.id!==t.einheit.standort_id).map(S=>({...S,entfernungKm:o&&S.lat!==null&&S.lon!==null?Cr(i,a,S.lat,S.lon):void 0}));return p.sort((S,I)=>S.typ!==I.typ?S.typ==="lager"?-1:1:S.entfernungKm!==void 0&&I.entfernungKm!==void 0?S.entfernungKm-I.entfernungKm:S.entfernungKm!==void 0?-1:I.entfernungKm!==void 0?1:S.name.localeCompare(I.name,"de")),Hr({code:n,bezeichnung:t.einheit.bezeichnung,standorte:p,sitzung:await Oe(e.env,r.id),hatPosition:o})});M.post("/api/buchung",async e=>{let t=(e.req.header("Accept")??"").includes("application/json"),n=await ge(e.req.raw),r=ce(String(n.code??"")),i=Number(n.ziel),a=s((p,S=400)=>t?e.json({ok:!1,fehler:p},S):e.redirect(`/t/${r}?fehler=${encodeURIComponent(p)}`,303),"antwortFehler"),o=await te(e.req.raw,e.env);if(!o)return a("Handy nicht eingerichtet",401);let l=await Ge(e.env,r);if(!l||l.art!=="einheit")return a("Unbekannter Tag",404);if(!Number.isInteger(i)||!await fe(e.env,i))return a("Unbekannter Standort",400);let d=await Qe(e.env,{einheitId:l.einheit.id,nachStandortId:i,mitarbeiterId:o.id,quelle:n.quelle==="nfc"?"nfc":"qr",lat:Ct(n.lat),lon:Ct(n.lon)});if(!d)return a("Einheit nicht gefunden",404);if(await e.env.DB.prepare("UPDATE mitarbeiter SET zuletzt_aktiv = datetime('now') WHERE id = ?").bind(o.id).run(),t){let p=await fe(e.env,i);return e.json({ok:!0,unveraendert:d.unveraendert,bezeichnung:l.einheit.bezeichnung,standort:p?.name??"",buchung_id:d.buchungId})}return e.redirect(d.unveraendert?`/t/${r}?schon=1`:`/t/${r}?ok=${d.buchungId}`,303)});M.post("/api/storno",async e=>{let t=await ge(e.req.raw),n=ce(String(t.code??""));if(!await te(e.req.raw,e.env))return e.redirect("/");let i=await Sr(e.env,Number(t.id));return e.redirect(i.ok?`/t/${n}?storniert=1`:`/t/${n}?fehler=${encodeURIComponent(i.grund)}`,303)});M.get("/einladung/:code",async e=>{let t=e.req.param("code"),n=await e.env.DB.prepare("SELECT id, name FROM mitarbeiter WHERE einladung = ? AND aktiv = 1").bind(t).first();if(!n)return q(K(X("fehler","Link nicht g\xFCltig"," Entweder schon benutzt oder abgelaufen. Bitte im B\xFCro einen neuen anfordern."),{titel:"Einladung",kopf:Z()}),410);let r=yr();return await e.env.DB.prepare("UPDATE mitarbeiter SET token_hash = ?, einladung = NULL WHERE id = ?").bind(await Ue(r),n.id).run(),q(K(`
${X("erfolg",`Fertig, ${n.name}`," Dieses Handy ist jetzt eingerichtet. Kein Passwort, kein Login \u2014 einfach Tags antippen.")}
<a class="knopf knopf-haupt" href="/">Los geht\u2019s</a>`,{titel:"Eingerichtet",kopf:Z()}),200,{"Set-Cookie":on(an,r,60*60*24*365*2)})});M.get("/sitzung/beenden",async e=>{let t=await te(e.req.raw,e.env);return t&&await Ir(e.env,t.id),e.redirect("/")});M.get("/scan",async e=>{let t=await te(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await Oe(e.env,t.id),r=await Et(e.env);return Xr(await we(e.env),n?.standortId??r?.id??null)});M.get("/t/:code/melden",async e=>{let t=await Ge(e.env,e.req.param("code"));return!t||t.art!=="einheit"?nt(ce(e.req.param("code"))):await te(e.req.raw,e.env)?jr(t.einheit,e.env.FOTOS!==void 0):e.redirect(`/t/${t.code}`)});M.post("/t/:code/melden",async e=>{let t=await Ge(e.env,e.req.param("code"));if(!t||t.art!=="einheit")return nt(ce(e.req.param("code")));let n=await te(e.req.raw,e.env);if(!n)return e.redirect("/");let r=await e.req.raw.formData(),i=String(r.get("art")??"hinweis"),a=String(r.get("text")??"").trim()||null,o=null,l=r.get("foto");if(e.env.FOTOS&&l&&typeof l!="string"&&l.size>0){if(l.size>8*1024*1024)return e.redirect(`/t/${t.code}?fehler=${encodeURIComponent("Foto zu gro\xDF (max. 8 MB)")}`,303);o=`${t.einheit.id}/${Date.now()}-${crypto.randomUUID().slice(0,8)}`,await e.env.FOTOS.put(o,l.stream(),{httpMetadata:{contentType:l.type||"image/jpeg"}})}return await Ar(e.env,{einheitId:t.einheit.id,art:i,text:a,fotoSchluessel:o,mitarbeiterId:n.id}),e.redirect(`/t/${t.code}?gemeldet=1`,303)});M.get("/foto/*",async e=>{if(!await tt(e.req.raw,e.env)&&!await te(e.req.raw,e.env))return new Response("Nicht berechtigt",{status:403});if(!e.env.FOTOS)return e.notFound();let t=decodeURIComponent(new URL(e.req.url).pathname.slice(6)),n=await e.env.FOTOS.get(t);return n?new Response(n.body,{headers:{"Content-Type":n.httpMetadata?.contentType??"image/jpeg","Cache-Control":"private, max-age=3600"}}):e.notFound()});M.get("/inventur",async e=>{if(!await te(e.req.raw,e.env))return e.redirect("/");let{results:t}=await e.env.DB.prepare(`SELECT i.id, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.beendet_am IS NULL ORDER BY i.id DESC`).all();return Zr(await we(e.env),t)});M.post("/inventur",async e=>{let t=await te(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await ge(e.req.raw),r=Number(n.standort_id),i=await fe(e.env,r);if(!i)return e.redirect("/inventur",303);let a=await kt(e.env,r,t.id);return await ln(e.env,t.id,i.id,i.name),e.redirect(`/inventur/${a.id}`,303)});M.get("/inventur/:id",async e=>{let t=await te(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await Ne(e.env,Number(e.req.param("id")));return n?Jr(n,await Oe(e.env,t.id)):e.notFound()});M.post("/inventur/:id/abschliessen",async e=>{if(!await te(e.req.raw,e.env))return e.redirect("/");let t=Number(e.req.param("id"));return await St(e.env,t),e.redirect(`/inventur/${t}`,303)});M.post("/api/inventur/treffer",async e=>{let t=(e.req.header("Accept")??"").includes("application/json"),n=await te(e.req.raw,e.env);if(!n)return t?e.json({ok:!1,fehler:"nicht eingerichtet"},401):e.redirect("/");let r=await ge(e.req.raw),i=ce(String(r.code??"")),a=Number(r.inventur),o=await Ge(e.env,i),l=await Ne(e.env,a);if(!o||o.art!=="einheit"||!l||l.inventur.beendet_am)return t?e.json({ok:!1,fehler:"Inventur oder Tag unbekannt"},404):e.redirect(`/t/${i}?fehler=${encodeURIComponent("Inventur oder Tag unbekannt")}`,303);let d=l.inventur.standort_id,p=o.einheit.standort_id!==d;return p&&await Qe(e.env,{einheitId:o.einheit.id,nachStandortId:d,mitarbeiterId:n.id,quelle:"nfc",notiz:"Inventur: hier vorgefunden"}),await Tr(e.env,a,o.einheit.id,p),t?e.json({ok:!0,war_woanders:p}):e.redirect(`/inventur/${a}`,303)});M.get("/app.js",()=>new Response(Vr,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"max-age=300"}}));M.get("/sw.js",()=>new Response(Yr,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"max-age=0"}}));M.get("/offline",()=>Qr());M.get("/api/schnappschuss",async e=>{if(!await te(e.req.raw,e.env))return e.json({fehler:"nicht eingerichtet"},401);let{results:t}=await e.env.DB.prepare(`SELECT e.id, e.code, e.bezeichnung, e.standort_id, s.name AS standort_name,
            (SELECT group_concat(CAST(i.menge AS INTEGER) || '\xD7 ' || a.name, ', ')
               FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
              WHERE i.einheit_id = e.id) AS inhalt
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1`).all(),{results:n}=await e.env.DB.prepare("SELECT code, ziel_id FROM tag WHERE ziel_typ = 'einheit' AND aktiv = 1").all(),r=new Map(t.map(o=>[o.id,o])),i={},a=s(o=>({c:o.code,b:o.bezeichnung,s:o.standort_id,sn:o.standort_name,i:o.inhalt}),"eintrag");for(let o of t)i[o.code]=a(o);for(let o of n){let l=r.get(o.ziel_id);l&&(i[o.code]=a(l))}return e.json({zeit:new Date().toISOString(),standorte:(await we(e.env)).map(o=>({id:o.id,name:o.name,typ:o.typ})),einheiten:i})});M.post("/mcp",e=>Kr(e.req.raw,e.env));M.get("/tools.json",()=>Gr());M.get("/mcp",()=>new Response("MCP-Endpunkt. Bitte POST mit JSON-RPC.",{status:405}));M.use("/buero/*",async(e,t)=>e.req.path==="/buero/anmelden"||await tt(e.req.raw,e.env)?t():at());M.get("/buero",async e=>{if(!await tt(e.req.raw,e.env))return at();let t=await e.env.DB.prepare(`SELECT COUNT(*) AS gesamt,
            SUM(CASE WHEN s.typ = 'lager' THEN 1 ELSE 0 END) AS im_lager,
            SUM(CASE WHEN s.typ = 'baustelle' THEN 1 ELSE 0 END) AS auf_baustellen
       FROM einheit e JOIN standort s ON s.id = e.standort_id WHERE e.aktiv = 1`).first(),n=await we(e.env);return si({einheiten:t?.gesamt??0,imLager:t?.im_lager??0,aufBaustellen:t?.auf_baustellen??0,standorte:n.filter(r=>r.typ==="baustelle").length,ueberfaellig:await et(e.env),meldungen:await _t(e.env,!0),vorhaltung:await xt(e.env)})});M.post("/buero/anmelden",async e=>{let t=await ge(e.req.raw),n=String(t.passwort??"");return e.env.ADMIN_PASSWORT?zt(n,e.env.ADMIN_PASSWORT)?new Response(null,{status:303,headers:{Location:"/buero","Set-Cookie":on(Rt,await Ue(n),60*60*12)}}):at("Falsches Passwort."):at("ADMIN_PASSWORT ist nicht gesetzt.")});M.get("/buero/abmelden",()=>new Response(null,{status:303,headers:{Location:"/","Set-Cookie":Or(Rt)}}));M.get("/buero/lager",async e=>{let t=e.req.query("q")??"",n=e.req.query("sicht")==="artikel"?"artikel":"einheiten",r=`%${t}%`,{results:i}=await e.env.DB.prepare(`SELECT e.*, s.name AS standort_name, s.typ AS standort_typ
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1 AND (?1 = '' OR e.code LIKE ?2 OR e.bezeichnung LIKE ?2)
      ORDER BY e.code LIMIT 300`).bind(t,r).all();return li({sicht:n,einheiten:i,bestand:await Xe(e.env,{artikelSuche:t||void 0}),standorte:await we(e.env),filter:t})});M.post("/buero/lager",async e=>{let t=await ge(e.req.raw),n=String(t.code??"").trim(),r=String(t.bezeichnung??"").trim(),i=t.typ==="einzelteil"?"einzelteil":"traeger",a=Number(t.standort_id);if(!n||!r||!Number.isInteger(a))return e.redirect("/buero/lager",303);let o=await e.env.DB.prepare("INSERT INTO einheit (code, typ, bezeichnung, standort_id) VALUES (?, ?, ?, ?) RETURNING id").bind(n,i,r,a).first();return o?(await ze(e.env,"einheit",o.id),await e.env.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, quelle, notiz)
     VALUES (?, NULL, ?, 'manuell', 'Ersterfassung')`).bind(o.id,a).run(),e.redirect(`/buero/einheit/${o.id}`,303)):e.redirect("/buero/lager",303)});M.get("/buero/bestand",e=>e.redirect("/buero/lager?sicht=artikel",301));M.get("/buero/einheiten",e=>e.redirect("/buero/lager",301));M.get("/buero/meldungen",e=>e.redirect("/buero",301));M.get("/buero/standorte",e=>e.redirect("/buero/einstellungen",301));M.get("/buero/artikel",e=>e.redirect("/buero/einstellungen",301));M.get("/buero/mitarbeiter",e=>e.redirect("/buero/einstellungen",301));M.get("/buero/einheit/:id",async e=>{let t=Number(e.req.param("id")),n=await We(e.env,t);if(!n)return e.notFound();let{results:r}=await e.env.DB.prepare("SELECT code FROM tag WHERE ziel_typ = 'einheit' AND ziel_id = ? AND aktiv = 1").bind(t).all();return ui({einheit:n,inhalt:await Ye(e.env,t),historie:await wt(e.env,t),artikel:await nn(e.env),tagCodes:r.map(i=>i.code),basisUrl:pn(e.req.raw)})});M.post("/buero/einheit/:id/inhalt",async e=>{let t=Number(e.req.param("id")),n=await ge(e.req.raw),r=Number(n.artikel_id),i=Number(n.menge);return Number.isInteger(r)?(!Number.isFinite(i)||i<=0?await e.env.DB.prepare("DELETE FROM inhalt WHERE einheit_id = ? AND artikel_id = ?").bind(t,r).run():await e.env.DB.prepare(`INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES (?, ?, ?)
       ON CONFLICT (einheit_id, artikel_id) DO UPDATE SET menge = excluded.menge`).bind(t,r,i).run(),e.redirect(`/buero/einheit/${t}`,303)):e.redirect(`/buero/einheit/${t}`,303)});M.post("/buero/einheit/:id/tag",async e=>{let t=Number(e.req.param("id"));return await ze(e.env,"einheit",t),e.redirect(`/buero/einheit/${t}`,303)});M.post("/buero/standorte",async e=>{let t=await ge(e.req.raw),n=String(t.name??"").trim();if(!n)return e.redirect("/buero/einstellungen",303);let r=t.typ==="lager"?"lager":"baustelle",i=await e.env.DB.prepare(`INSERT INTO standort (name, typ, adresse, lat, lon) VALUES (?, ?, ?, ?, ?)
     RETURNING id`).bind(n,r,String(t.adresse??"").trim()||null,Ct(t.lat),Ct(t.lon)).first();return i&&await ze(e.env,"standort",i.id),e.redirect("/buero/einstellungen",303)});M.post("/buero/standorte/:id/beenden",async e=>(await e.env.DB.prepare("UPDATE standort SET aktiv = 0, beendet_am = datetime('now') WHERE id = ? AND typ = 'baustelle'").bind(Number(e.req.param("id"))).run(),e.redirect("/buero/einstellungen",303)));M.post("/buero/mitarbeiter",async e=>{let t=await ge(e.req.raw),n=String(t.name??"").trim();return n&&await e.env.DB.prepare("INSERT INTO mitarbeiter (name, einladung) VALUES (?, ?)").bind(n,xr()).run(),e.redirect("/buero/einstellungen",303)});M.post("/buero/mitarbeiter/:id/umschalten",async e=>(await e.env.DB.prepare("UPDATE mitarbeiter SET aktiv = 1 - aktiv WHERE id = ?").bind(Number(e.req.param("id"))).run(),e.redirect("/buero/einstellungen",303)));M.post("/buero/artikel",async e=>{let t=await ge(e.req.raw),n=String(t.name??"").trim();return n&&await e.env.DB.prepare(`INSERT INTO artikel (name, kategorie, mengeneinheit) VALUES (?, ?, ?)
       ON CONFLICT (name) DO NOTHING`).bind(n,String(t.kategorie??"").trim()||"sonstiges",String(t.mengeneinheit??"").trim()||"Stk").run(),e.redirect("/buero/einstellungen",303)});M.get("/buero/auswertung",async e=>{let t=Number(e.req.query("schwelle"))||120;return ci(await yt(e.env,t),t)});M.get("/buero/einstellungen",async e=>{let{results:t}=await e.env.DB.prepare("SELECT * FROM standort ORDER BY aktiv DESC, typ, name").all(),{results:n}=await e.env.DB.prepare(`SELECT id, name, rolle, aktiv, einladung, token_hash, zuletzt_aktiv
       FROM mitarbeiter ORDER BY aktiv DESC, name`).all();return di({standorte:t,leute:n,artikel:await nn(e.env),basisUrl:pn(e.req.raw)})});M.post("/buero/meldung/:id/erledigt",async e=>(await e.env.DB.prepare("UPDATE meldung SET erledigt = 1 WHERE id = ?").bind(Number(e.req.param("id"))).run(),e.redirect("/buero",303)));M.get("/buero/etiketten",async e=>{let t=pn(e.req.raw),n=e.req.query("einheit"),r=e.req.query("standort"),i;if(n){let{results:o}=await e.env.DB.prepare(`SELECT t.code, e.code || ' \xB7 ' || e.bezeichnung AS bezeichnung
         FROM tag t JOIN einheit e ON e.id = t.ziel_id
        WHERE t.ziel_typ = 'einheit' AND t.ziel_id = ? AND t.aktiv = 1`).bind(Number(n)).all();i=o}else if(r){let{results:o}=await e.env.DB.prepare(`SELECT t.code, 'Standort ' || s.name AS bezeichnung
         FROM tag t JOIN standort s ON s.id = t.ziel_id
        WHERE t.ziel_typ = 'standort' AND t.ziel_id = ? AND t.aktiv = 1`).bind(Number(r)).all();i=o}else{let{results:o}=await e.env.DB.prepare(`SELECT t.code, e.code || ' \xB7 ' || e.bezeichnung AS bezeichnung
         FROM tag t JOIN einheit e ON e.id = t.ziel_id
        WHERE t.ziel_typ = 'einheit' AND t.aktiv = 1 AND e.aktiv = 1
        ORDER BY e.code LIMIT 500`).all();i=o}let a=i.map(o=>({code:o.code,bezeichnung:o.bezeichnung,url:`${t}/t/${o.code}`}));return q(oi(a,e.env.FIRMA))});async function Ge(e,t){let n=ce(t),r=wr(t),i=n===r?[n]:[n,r];for(let a of i){if(!a)continue;let o=await kr(e,a);if(o?.ziel_typ==="einheit"){let d=await We(e,o.ziel_id);if(d)return{art:"einheit",einheit:d,code:a}}if(o?.ziel_typ==="standort"){let d=await fe(e,o.ziel_id);if(d)return{art:"standort",standort:d,code:a}}let l=await Ve(e,a);if(l)return{art:"einheit",einheit:l,code:a}}return null}s(Ge,"zielFuerCode");async function ge(e){if((e.headers.get("Content-Type")??"").includes("application/json"))try{return await e.json()}catch{return{}}let n=await e.formData();return Object.fromEntries(n.entries())}s(ge,"eingabeLesen");function Ct(e){if(e==null||e==="")return null;let t=Number(String(e).replace(",","."));return Number.isFinite(t)?t:null}s(Ct,"zahlOderNull");M.notFound(()=>q(K(X("fehler","Seite nicht gefunden")+'<a class="knopf knopf-still" href="/">\xDCbersicht</a>',{titel:"Nicht gefunden",kopf:Z()}),404));async function es(e){let t=await et(e),n=t.map(o=>o.code).sort(),r=await e.DB.prepare("SELECT codes FROM ueberfaellig_lauf ORDER BY id DESC LIMIT 1").first(),i=new Set((r?.codes??"").split(",").filter(Boolean)),a=t.filter(o=>!i.has(o.code));if(await e.DB.prepare("INSERT INTO ueberfaellig_lauf (anzahl, neu, codes, gemeldet) VALUES (?, ?, ?, ?)").bind(t.length,a.length,n.join(","),e.MELDUNG_WEBHOOK?1:0).run(),e.MELDUNG_WEBHOOK&&a.length>0){let o=a.map(d=>`\u2022 ${d.code} \u2014 ${d.bezeichnung} \xB7 ${d.standort}${d.baustelle_beendet?" (Baustelle beendet!)":""} \xB7 ${d.tage} Tage \xB7 zuletzt ${d.zuletzt_gebucht_von??"unbekannt"}`).join(`
`),l=`*Lager \u2014 \xFCberf\xE4lliges Material*
${a.length} neu, ${t.length} insgesamt drau\xDFen.

${o}`;try{await fetch(e.MELDUNG_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:l})})}catch{}}return{anzahl:t.length,neu:a.length}}s(es,"wochenlauf");var Mf={fetch:M.fetch,async scheduled(e,t,n){n.waitUntil(es(t))}};export{Mf as default,es as wochenlauf};
//# sourceMappingURL=index.js.map
