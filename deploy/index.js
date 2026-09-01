var li=Object.create;var st=Object.defineProperty;var ui=Object.getOwnPropertyDescriptor;var di=Object.getOwnPropertyNames;var ci=Object.getPrototypeOf,pi=Object.prototype.hasOwnProperty;var hi=(e,t,n)=>t in e?st(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var o=(e,t)=>st(e,"name",{value:t,configurable:!0});var se=(e,t)=>()=>(e&&(t=e(e=0)),t);var fi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var gi=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of di(t))!pi.call(e,i)&&i!==n&&st(e,i,{get:()=>t[i],enumerable:!(r=ui(t,i))||r.enumerable});return e};var mi=(e,t,n)=>(n=e!=null?li(ci(e)):{},gi(t||!e||!e.__esModule?st(n,"default",{value:e,enumerable:!0}):n,e));var cn=(e,t,n)=>(hi(e,typeof t!="symbol"?t+"":t,n),n);function U(e){return new Error(`[unenv] ${e} is not implemented yet!`)}function Ee(e){return Object.assign(o(()=>{throw U(e)},"fn"),{__unenv__:!0})}function pn(e){return class{__unenv__=!0;constructor(){throw new Error(`[unenv] ${e} is not implemented yet!`)}}}var ot=se(()=>{w();E();v();o(U,"createNotImplementedError");o(Ee,"notImplemented");o(pn,"notImplementedClass")});var It,Mt,bi,Se,Ct,Pe,He,Ze,Fe,Be,hn,fn=se(()=>{w();E();v();ot();It=globalThis.performance?.timeOrigin??Date.now(),Mt=globalThis.performance?.now?globalThis.performance.now.bind(globalThis.performance):()=>Date.now()-It,bi={name:"node",entryType:"node",startTime:0,duration:0,nodeStart:0,v8Start:0,bootstrapComplete:0,environment:0,loopStart:0,loopExit:0,idleTime:0,uvMetricsInfo:{loopCount:0,events:0,eventsWaiting:0},detail:void 0,toJSON(){return this}},Se=class{__unenv__=!0;detail;entryType="event";name;startTime;constructor(t,n){this.name=t,this.startTime=n?.startTime||Mt(),this.detail=n?.detail}get duration(){return Mt()-this.startTime}toJSON(){return{name:this.name,entryType:this.entryType,startTime:this.startTime,duration:this.duration,detail:this.detail}}};o(Se,"PerformanceEntry");Ct=o(class extends Se{entryType="mark";constructor(){super(...arguments)}get duration(){return 0}},"PerformanceMark"),Pe=class extends Se{entryType="measure"};o(Pe,"PerformanceMeasure");He=class extends Se{entryType="resource";serverTiming=[];connectEnd=0;connectStart=0;decodedBodySize=0;domainLookupEnd=0;domainLookupStart=0;encodedBodySize=0;fetchStart=0;initiatorType="";name="";nextHopProtocol="";redirectEnd=0;redirectStart=0;requestStart=0;responseEnd=0;responseStart=0;secureConnectionStart=0;startTime=0;transferSize=0;workerStart=0;responseStatus=0};o(He,"PerformanceResourceTiming");Ze=class{__unenv__=!0;getEntries(){return[]}getEntriesByName(t,n){return[]}getEntriesByType(t){return[]}};o(Ze,"PerformanceObserverEntryList");Fe=class{__unenv__=!0;timeOrigin=It;eventCounts=new Map;_entries=[];_resourceTimingBufferSize=0;navigation=void 0;timing=void 0;timerify(t,n){throw U("Performance.timerify")}get nodeTiming(){return bi}eventLoopUtilization(){return{}}markResourceTiming(){return new He("")}onresourcetimingbufferfull=null;now(){return this.timeOrigin===It?Mt():Date.now()-this.timeOrigin}clearMarks(t){this._entries=t?this._entries.filter(n=>n.name!==t):this._entries.filter(n=>n.entryType!=="mark")}clearMeasures(t){this._entries=t?this._entries.filter(n=>n.name!==t):this._entries.filter(n=>n.entryType!=="measure")}clearResourceTimings(){this._entries=this._entries.filter(t=>t.entryType!=="resource"||t.entryType!=="navigation")}getEntries(){return this._entries}getEntriesByName(t,n){return this._entries.filter(r=>r.name===t&&(!n||r.entryType===n))}getEntriesByType(t){return this._entries.filter(n=>n.entryType===t)}mark(t,n){let r=new Ct(t,n);return this._entries.push(r),r}measure(t,n,r){let i,a;typeof n=="string"?(i=this.getEntriesByName(n,"mark")[0]?.startTime,a=this.getEntriesByName(r,"mark")[0]?.startTime):(i=Number.parseFloat(n?.start)||this.now(),a=Number.parseFloat(n?.end)||this.now());let s=new Pe(t,{startTime:i,detail:{start:i,end:a}});return this._entries.push(s),s}setResourceTimingBufferSize(t){this._resourceTimingBufferSize=t}addEventListener(t,n,r){throw U("Performance.addEventListener")}removeEventListener(t,n,r){throw U("Performance.removeEventListener")}dispatchEvent(t){throw U("Performance.dispatchEvent")}toJSON(){return this}};o(Fe,"Performance");Be=class{__unenv__=!0;_callback=null;constructor(t){this._callback=t}takeRecords(){return[]}disconnect(){throw U("PerformanceObserver.disconnect")}observe(t){throw U("PerformanceObserver.observe")}bind(t){return t}runInAsyncScope(t,n,...r){return t.call(n,...r)}asyncId(){return 0}triggerAsyncId(){return 0}emitDestroy(){return this}};o(Be,"PerformanceObserver"),cn(Be,"supportedEntryTypes",[]);hn=globalThis.performance&&"addEventListener"in globalThis.performance?globalThis.performance:new Fe});var gn=se(()=>{w();E();v();fn()});var v=se(()=>{gn();globalThis.performance=hn;globalThis.Performance=Fe;globalThis.PerformanceEntry=Se;globalThis.PerformanceMark=Ct;globalThis.PerformanceMeasure=Pe;globalThis.PerformanceObserver=Be;globalThis.PerformanceObserverEntryList=Ze;globalThis.PerformanceResourceTiming=He});var Q,mn=se(()=>{w();E();v();Q=Object.assign(()=>{},{__unenv__:!0})});import{Writable as bn}from"node:stream";var G,vn,En,wn,lt,vi,ko,yo,So,Ei,_o,Ro,zo,Ao,To,$o,No,Oo,Io,Mo,Co,Lo,Do,Bo,Po,Ho,xn,kn,yn,Sn,_n=se(()=>{w();E();v();mn();ot();G=globalThis.console,vn=!0,En=new bn,wn=new bn,lt=G?.log??Q,vi=G?.info??lt,ko=G?.trace??vi,yo=G?.debug??lt,So=G?.table??lt,Ei=G?.error??lt,_o=G?.warn??Ei,Ro=G?.createTask??Ee("console.createTask"),zo=G?.clear??Q,Ao=G?.count??Q,To=G?.countReset??Q,$o=G?.dir??Q,No=G?.dirxml??Q,Oo=G?.group??Q,Io=G?.groupEnd??Q,Mo=G?.groupCollapsed??Q,Co=G?.profile??Q,Lo=G?.profileEnd??Q,Do=G?.time??Q,Bo=G?.timeEnd??Q,Po=G?.timeLog??Q,Ho=G?.timeStamp??Q,xn=G?.Console??pn("console.Console"),kn=new Map,yn=Q,Sn=Q});var Lt,Ko,Zo,Jo,Vo,Yo,Qo,Xo,el,tl,nl,rl,il,al,sl,ol,ll,ul,dl,cl,pl,hl,fl,gl,ml,Rn,zn=se(()=>{w();E();v();_n();Lt=globalThis.console,{assert:Ko,clear:Zo,context:Jo,count:Vo,countReset:Yo,createTask:Qo,debug:Xo,dir:el,dirxml:tl,error:nl,group:rl,groupCollapsed:il,groupEnd:al,info:sl,log:ol,profile:ll,profileEnd:ul,table:dl,time:cl,timeEnd:pl,timeLog:hl,timeStamp:fl,trace:gl,warn:ml}=Lt;Object.assign(Lt,{Console:xn,_ignoreErrors:vn,_stderr:En,_stderrErrorHandler:Sn,_stdout:wn,_stdoutErrorHandler:yn,_times:kn});Rn=Lt});var E=se(()=>{zn();globalThis.console=Rn});var An,Tn=se(()=>{w();E();v();An=Object.assign(o(function(t){let n=Date.now(),r=Math.trunc(n/1e3),i=n%1e3*1e6;if(t){let a=r-t[0],s=i-t[0];return s<0&&(a=a-1,s=1e9+s),[a,s]}return[r,i]},"hrtime"),{bigint:o(function(){return BigInt(Date.now()*1e6)},"bigint")})});import{Socket as wi}from"node:net";var je,$n=se(()=>{w();E();v();je=class extends wi{fd;constructor(t){super(),this.fd=t}isRaw=!1;setRawMode(t){return this.isRaw=t,this}isTTY=!1};o(je,"ReadStream")});import{Socket as xi}from"node:net";var $e,Nn=se(()=>{w();E();v();$e=class extends xi{fd;constructor(t){super(),this.fd=t}clearLine(t,n){return n&&n(),!1}clearScreenDown(t){return t&&t(),!1}cursorTo(t,n,r){return r&&typeof r=="function"&&r(),!1}moveCursor(t,n,r){return r&&r(),!1}getColorDepth(t){return 1}hasColors(t,n){return!1}getWindowSize(){return[this.columns,this.rows]}columns=80;rows=24;isTTY=!1};o($e,"WriteStream")});var On=se(()=>{w();E();v();$n();Nn()});import{EventEmitter as In}from"node:events";var Ne,Mn=se(()=>{w();E();v();On();ot();Ne=class extends In{env;hrtime;nextTick;constructor(t){super(),this.env=t.env,this.hrtime=t.hrtime,this.nextTick=t.nextTick;for(let n of[...Object.getOwnPropertyNames(Ne.prototype),...Object.getOwnPropertyNames(In.prototype)]){let r=this[n];typeof r=="function"&&(this[n]=r.bind(this))}}emitWarning(t,n,r){console.warn(`${r?`[${r}] `:""}${n?`${n}: `:""}${t}`)}emit(...t){return super.emit(...t)}listeners(t){return super.listeners(t)}#t;#e;#n;get stdin(){return this.#t??=new je(0)}get stdout(){return this.#e??=new $e(1)}get stderr(){return this.#n??=new $e(2)}#a="/";chdir(t){this.#a=t}cwd(){return this.#a}arch="";platform="";argv=[];argv0="";execArgv=[];execPath="";title="";pid=200;ppid=100;get version(){return""}get versions(){return{}}get allowedNodeEnvironmentFlags(){return new Set}get sourceMapsEnabled(){return!1}get debugPort(){return 0}get throwDeprecation(){return!1}get traceDeprecation(){return!1}get features(){return{}}get release(){return{}}get connected(){return!1}get config(){return{}}get moduleLoadList(){return[]}constrainedMemory(){return 0}availableMemory(){return 0}uptime(){return 0}resourceUsage(){return{}}ref(){}unref(){}umask(){throw U("process.umask")}getBuiltinModule(){}getActiveResourcesInfo(){throw U("process.getActiveResourcesInfo")}exit(){throw U("process.exit")}reallyExit(){throw U("process.reallyExit")}kill(){throw U("process.kill")}abort(){throw U("process.abort")}dlopen(){throw U("process.dlopen")}setSourceMapsEnabled(){throw U("process.setSourceMapsEnabled")}loadEnvFile(){throw U("process.loadEnvFile")}disconnect(){throw U("process.disconnect")}cpuUsage(){throw U("process.cpuUsage")}setUncaughtExceptionCaptureCallback(){throw U("process.setUncaughtExceptionCaptureCallback")}hasUncaughtExceptionCaptureCallback(){throw U("process.hasUncaughtExceptionCaptureCallback")}initgroups(){throw U("process.initgroups")}openStdin(){throw U("process.openStdin")}assert(){throw U("process.assert")}binding(){throw U("process.binding")}permission={has:Ee("process.permission.has")};report={directory:"",filename:"",signal:"SIGUSR2",compact:!1,reportOnFatalError:!1,reportOnSignal:!1,reportOnUncaughtException:!1,getReport:Ee("process.report.getReport"),writeReport:Ee("process.report.writeReport")};finalization={register:Ee("process.finalization.register"),unregister:Ee("process.finalization.unregister"),registerBeforeExit:Ee("process.finalization.registerBeforeExit")};memoryUsage=Object.assign(()=>({arrayBuffers:0,rss:0,external:0,heapTotal:0,heapUsed:0}),{rss:()=>0});mainModule=void 0;domain=void 0;send=void 0;exitCode=void 0;channel=void 0;getegid=void 0;geteuid=void 0;getgid=void 0;getgroups=void 0;getuid=void 0;setegid=void 0;seteuid=void 0;setgid=void 0;setgroups=void 0;setuid=void 0;_events=void 0;_eventsCount=void 0;_exiting=void 0;_maxListeners=void 0;_debugEnd=void 0;_debugProcess=void 0;_fatalException=void 0;_getActiveHandles=void 0;_getActiveRequests=void 0;_kill=void 0;_preload_modules=void 0;_rawDebug=void 0;_startProfilerIdleNotifier=void 0;_stopProfilerIdleNotifier=void 0;_tickCallback=void 0;_disconnect=void 0;_handleQueue=void 0;_pendingMessage=void 0;_channel=void 0;_send=void 0;_linkedBinding=void 0};o(Ne,"Process")});var Cn,Ln,ki,yi,Dn,Si,_i,Ri,zi,Ai,Ti,$i,Ni,Oi,Ii,Mi,Ci,Li,Di,Bi,Pi,Hi,Fi,ji,Ui,Wi,qi,Gi,Ki,Zi,Ji,Vi,Yi,Qi,Xi,ea,ta,na,ra,ia,aa,sa,oa,la,ua,da,ca,pa,ha,fa,ga,ma,ba,va,Ea,wa,xa,ka,ya,Sa,_a,Ra,za,Aa,Ta,$a,Na,Oa,Ia,Ma,Ca,La,Da,Ba,Pa,Ha,Fa,ja,Ua,Wa,qa,Ga,Ka,Za,Ja,Va,Ya,Qa,Xa,es,ts,ns,rs,is,as,ss,os,ls,us,ds,cs,ps,hs,fs,gs,ms,bs,vs,Es,ws,Bn,Pn=se(()=>{w();E();v();Tn();Mn();Cn=globalThis.process,Ln=Cn.getBuiltinModule,{exit:ki,platform:yi,nextTick:Dn}=Ln("node:process"),Si=new Ne({env:Cn.env,hrtime:An,nextTick:Dn}),{abort:_i,addListener:Ri,allowedNodeEnvironmentFlags:zi,hasUncaughtExceptionCaptureCallback:Ai,setUncaughtExceptionCaptureCallback:Ti,loadEnvFile:$i,sourceMapsEnabled:Ni,arch:Oi,argv:Ii,argv0:Mi,chdir:Ci,config:Li,connected:Di,constrainedMemory:Bi,availableMemory:Pi,cpuUsage:Hi,cwd:Fi,debugPort:ji,dlopen:Ui,disconnect:Wi,emit:qi,emitWarning:Gi,env:Ki,eventNames:Zi,execArgv:Ji,execPath:Vi,finalization:Yi,features:Qi,getActiveResourcesInfo:Xi,getMaxListeners:ea,hrtime:ta,kill:na,listeners:ra,listenerCount:ia,memoryUsage:aa,on:sa,off:oa,once:la,pid:ua,ppid:da,prependListener:ca,prependOnceListener:pa,rawListeners:ha,release:fa,removeAllListeners:ga,removeListener:ma,report:ba,resourceUsage:va,setMaxListeners:Ea,setSourceMapsEnabled:wa,stderr:xa,stdin:ka,stdout:ya,title:Sa,throwDeprecation:_a,traceDeprecation:Ra,umask:za,uptime:Aa,version:Ta,versions:$a,domain:Na,initgroups:Oa,moduleLoadList:Ia,reallyExit:Ma,openStdin:Ca,assert:La,binding:Da,send:Ba,exitCode:Pa,channel:Ha,getegid:Fa,geteuid:ja,getgid:Ua,getgroups:Wa,getuid:qa,setegid:Ga,seteuid:Ka,setgid:Za,setgroups:Ja,setuid:Va,permission:Ya,mainModule:Qa,_events:Xa,_eventsCount:es,_exiting:ts,_maxListeners:ns,_debugEnd:rs,_debugProcess:is,_fatalException:as,_getActiveHandles:ss,_getActiveRequests:os,_kill:ls,_preload_modules:us,_rawDebug:ds,_startProfilerIdleNotifier:cs,_stopProfilerIdleNotifier:ps,_tickCallback:hs,_disconnect:fs,_handleQueue:gs,_pendingMessage:ms,_channel:bs,_send:vs,_linkedBinding:Es}=Si,ws={abort:_i,addListener:Ri,allowedNodeEnvironmentFlags:zi,hasUncaughtExceptionCaptureCallback:Ai,setUncaughtExceptionCaptureCallback:Ti,loadEnvFile:$i,sourceMapsEnabled:Ni,arch:Oi,argv:Ii,argv0:Mi,chdir:Ci,config:Li,connected:Di,constrainedMemory:Bi,availableMemory:Pi,cpuUsage:Hi,cwd:Fi,debugPort:ji,dlopen:Ui,disconnect:Wi,emit:qi,emitWarning:Gi,env:Ki,eventNames:Zi,execArgv:Ji,execPath:Vi,exit:ki,finalization:Yi,features:Qi,getBuiltinModule:Ln,getActiveResourcesInfo:Xi,getMaxListeners:ea,hrtime:ta,kill:na,listeners:ra,listenerCount:ia,memoryUsage:aa,nextTick:Dn,on:sa,off:oa,once:la,pid:ua,platform:yi,ppid:da,prependListener:ca,prependOnceListener:pa,rawListeners:ha,release:fa,removeAllListeners:ga,removeListener:ma,report:ba,resourceUsage:va,setMaxListeners:Ea,setSourceMapsEnabled:wa,stderr:xa,stdin:ka,stdout:ya,title:Sa,throwDeprecation:_a,traceDeprecation:Ra,umask:za,uptime:Aa,version:Ta,versions:$a,domain:Na,initgroups:Oa,moduleLoadList:Ia,reallyExit:Ma,openStdin:Ca,assert:La,binding:Da,send:Ba,exitCode:Pa,channel:Ha,getegid:Fa,geteuid:ja,getgid:Ua,getgroups:Wa,getuid:qa,setegid:Ga,seteuid:Ka,setgid:Za,setgroups:Ja,setuid:Va,permission:Ya,mainModule:Qa,_events:Xa,_eventsCount:es,_exiting:ts,_maxListeners:ns,_debugEnd:rs,_debugProcess:is,_fatalException:as,_getActiveHandles:ss,_getActiveRequests:os,_kill:ls,_preload_modules:us,_rawDebug:ds,_startProfilerIdleNotifier:cs,_stopProfilerIdleNotifier:ps,_tickCallback:hs,_disconnect:fs,_handleQueue:gs,_pendingMessage:ms,_channel:bs,_send:vs,_linkedBinding:Es},Bn=ws});var w=se(()=>{Pn();globalThis.process=Bn});var Kr=fi((qr,Gr)=>{w();E();v();var Wr=function(){var e=o(function(N,$){var A=236,_=17,g=N,R=n[$],c=null,u=0,T=null,m=[],z={},B=o(function(b,x){u=g*4+17,c=function(h){for(var k=new Array(h),S=0;S<h;S+=1){k[S]=new Array(h);for(var O=0;O<h;O+=1)k[S][O]=null}return k}(u),P(0,0),P(u-7,0),P(0,u-7),ae(),Z(),be(b,x),g>=7&&he(b),T==null&&(T=si(g,R,m)),ve(T,x)},"makeImpl"),P=o(function(b,x){for(var h=-1;h<=7;h+=1)if(!(b+h<=-1||u<=b+h))for(var k=-1;k<=7;k+=1)x+k<=-1||u<=x+k||(0<=h&&h<=6&&(k==0||k==6)||0<=k&&k<=6&&(h==0||h==6)||2<=h&&h<=4&&2<=k&&k<=4?c[b+h][x+k]=!0:c[b+h][x+k]=!1)},"setupPositionProbePattern"),j=o(function(){for(var b=0,x=0,h=0;h<8;h+=1){B(!0,h);var k=i.getLostPoint(z);(h==0||b>k)&&(b=k,x=h)}return x},"getBestMaskPattern"),Z=o(function(){for(var b=8;b<u-8;b+=1)c[b][6]==null&&(c[b][6]=b%2==0);for(var x=8;x<u-8;x+=1)c[6][x]==null&&(c[6][x]=x%2==0)},"setupTimingPattern"),ae=o(function(){for(var b=i.getPatternPosition(g),x=0;x<b.length;x+=1)for(var h=0;h<b.length;h+=1){var k=b[x],S=b[h];if(c[k][S]==null)for(var O=-2;O<=2;O+=1)for(var C=-2;C<=2;C+=1)O==-2||O==2||C==-2||C==2||O==0&&C==0?c[k+O][S+C]=!0:c[k+O][S+C]=!1}},"setupPositionAdjustPattern"),he=o(function(b){for(var x=i.getBCHTypeNumber(g),h=0;h<18;h+=1){var k=!b&&(x>>h&1)==1;c[Math.floor(h/3)][h%3+u-8-3]=k}for(var h=0;h<18;h+=1){var k=!b&&(x>>h&1)==1;c[h%3+u-8-3][Math.floor(h/3)]=k}},"setupTypeNumber"),be=o(function(b,x){for(var h=R<<3|x,k=i.getBCHTypeInfo(h),S=0;S<15;S+=1){var O=!b&&(k>>S&1)==1;S<6?c[S][8]=O:S<8?c[S+1][8]=O:c[u-15+S][8]=O}for(var S=0;S<15;S+=1){var O=!b&&(k>>S&1)==1;S<8?c[8][u-S-1]=O:S<9?c[8][15-S-1+1]=O:c[8][15-S-1]=O}c[u-8][8]=!b},"setupTypeInfo"),ve=o(function(b,x){for(var h=-1,k=u-1,S=7,O=0,C=i.getMaskFunction(x),M=u-1;M>0;M-=2)for(M==6&&(M-=1);;){for(var W=0;W<2;W+=1)if(c[k][M-W]==null){var V=!1;O<b.length&&(V=(b[O]>>>S&1)==1);var D=C(k,M-W);D&&(V=!V),c[k][M-W]=V,S-=1,S==-1&&(O+=1,S=7)}if(k+=h,k<0||u<=k){k-=h,h=-h;break}}},"mapData"),Le=o(function(b,x){for(var h=0,k=0,S=0,O=new Array(x.length),C=new Array(x.length),M=0;M<x.length;M+=1){var W=x[M].dataCount,V=x[M].totalCount-W;k=Math.max(k,W),S=Math.max(S,V),O[M]=new Array(W);for(var D=0;D<O[M].length;D+=1)O[M][D]=255&b.getBuffer()[D+h];h+=W;var le=i.getErrorCorrectPolynomial(V),ue=s(O[M],le.getLength()-1),ln=ue.mod(le);C[M]=new Array(le.getLength()-1);for(var D=0;D<C[M].length;D+=1){var un=D+ln.getLength()-C[M].length;C[M][D]=un>=0?ln.getAt(un):0}}for(var dn=0,D=0;D<x.length;D+=1)dn+=x[D].totalCount;for(var Ot=new Array(dn),at=0,D=0;D<k;D+=1)for(var M=0;M<x.length;M+=1)D<O[M].length&&(Ot[at]=O[M][D],at+=1);for(var D=0;D<S;D+=1)for(var M=0;M<x.length;M+=1)D<C[M].length&&(Ot[at]=C[M][D],at+=1);return Ot},"createBytes"),si=o(function(b,x,h){for(var k=l.getRSBlocks(b,x),S=d(),O=0;O<h.length;O+=1){var C=h[O];S.put(C.getMode(),4),S.put(C.getLength(),i.getLengthInBits(C.getMode(),b)),C.write(S)}for(var M=0,O=0;O<k.length;O+=1)M+=k[O].dataCount;if(S.getLengthInBits()>M*8)throw"code length overflow. ("+S.getLengthInBits()+">"+M*8+")";for(S.getLengthInBits()+4<=M*8&&S.put(0,4);S.getLengthInBits()%8!=0;)S.putBit(!1);for(;!(S.getLengthInBits()>=M*8||(S.put(A,8),S.getLengthInBits()>=M*8));)S.put(_,8);return Le(S,k)},"createData");z.addData=function(b,x){x=x||"Byte";var h=null;switch(x){case"Numeric":h=p(b);break;case"Alphanumeric":h=y(b);break;case"Byte":h=I(b);break;case"Kanji":h=F(b);break;default:throw"mode:"+x}m.push(h),T=null},z.isDark=function(b,x){if(b<0||u<=b||x<0||u<=x)throw b+","+x;return c[b][x]},z.getModuleCount=function(){return u},z.make=function(){if(g<1){for(var b=1;b<40;b++){for(var x=l.getRSBlocks(b,R),h=d(),k=0;k<m.length;k++){var S=m[k];h.put(S.getMode(),4),h.put(S.getLength(),i.getLengthInBits(S.getMode(),b)),S.write(h)}for(var O=0,k=0;k<x.length;k++)O+=x[k].dataCount;if(h.getLengthInBits()<=O*8)break}g=b}B(!1,j())},z.createTableTag=function(b,x){b=b||2,x=typeof x>"u"?b*4:x;var h="";h+='<table style="',h+=" border-width: 0px; border-style: none;",h+=" border-collapse: collapse;",h+=" padding: 0px; margin: "+x+"px;",h+='">',h+="<tbody>";for(var k=0;k<z.getModuleCount();k+=1){h+="<tr>";for(var S=0;S<z.getModuleCount();S+=1)h+='<td style="',h+=" border-width: 0px; border-style: none;",h+=" border-collapse: collapse;",h+=" padding: 0px; margin: 0px;",h+=" width: "+b+"px;",h+=" height: "+b+"px;",h+=" background-color: ",h+=z.isDark(k,S)?"#000000":"#ffffff",h+=";",h+='"/>';h+="</tr>"}return h+="</tbody>",h+="</table>",h},z.createSvgTag=function(b,x,h,k){var S={};typeof arguments[0]=="object"&&(S=arguments[0],b=S.cellSize,x=S.margin,h=S.alt,k=S.title),b=b||2,x=typeof x>"u"?b*4:x,h=typeof h=="string"?{text:h}:h||{},h.text=h.text||null,h.id=h.text?h.id||"qrcode-description":null,k=typeof k=="string"?{text:k}:k||{},k.text=k.text||null,k.id=k.text?k.id||"qrcode-title":null;var O=z.getModuleCount()*b+x*2,C,M,W,V,D="",le;for(le="l"+b+",0 0,"+b+" -"+b+",0 0,-"+b+"z ",D+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',D+=S.scalable?"":' width="'+O+'px" height="'+O+'px"',D+=' viewBox="0 0 '+O+" "+O+'" ',D+=' preserveAspectRatio="xMinYMin meet"',D+=k.text||h.text?' role="img" aria-labelledby="'+De([k.id,h.id].join(" ").trim())+'"':"",D+=">",D+=k.text?'<title id="'+De(k.id)+'">'+De(k.text)+"</title>":"",D+=h.text?'<description id="'+De(h.id)+'">'+De(h.text)+"</description>":"",D+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',D+='<path d="',W=0;W<z.getModuleCount();W+=1)for(V=W*b+x,C=0;C<z.getModuleCount();C+=1)z.isDark(W,C)&&(M=C*b+x,D+="M"+M+","+V+le);return D+='" stroke="transparent" fill="black"/>',D+="</svg>",D},z.createDataURL=function(b,x){b=b||2,x=typeof x>"u"?b*4:x;var h=z.getModuleCount()*b+x*2,k=x,S=h-x;return ie(h,h,function(O,C){if(k<=O&&O<S&&k<=C&&C<S){var M=Math.floor((O-k)/b),W=Math.floor((C-k)/b);return z.isDark(W,M)?0:1}else return 1})},z.createImgTag=function(b,x,h){b=b||2,x=typeof x>"u"?b*4:x;var k=z.getModuleCount()*b+x*2,S="";return S+="<img",S+=' src="',S+=z.createDataURL(b,x),S+='"',S+=' width="',S+=k,S+='"',S+=' height="',S+=k,S+='"',h&&(S+=' alt="',S+=De(h),S+='"'),S+="/>",S};var De=o(function(b){for(var x="",h=0;h<b.length;h+=1){var k=b.charAt(h);switch(k){case"<":x+="&lt;";break;case">":x+="&gt;";break;case"&":x+="&amp;";break;case'"':x+="&quot;";break;default:x+=k;break}}return x},"escapeXml"),oi=o(function(b){var x=1;b=typeof b>"u"?x*2:b;var h=z.getModuleCount()*x+b*2,k=b,S=h-b,O,C,M,W,V,D={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},le={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},ue="";for(O=0;O<h;O+=2){for(M=Math.floor((O-k)/x),W=Math.floor((O+1-k)/x),C=0;C<h;C+=1)V="\u2588",k<=C&&C<S&&k<=O&&O<S&&z.isDark(M,Math.floor((C-k)/x))&&(V=" "),k<=C&&C<S&&k<=O+1&&O+1<S&&z.isDark(W,Math.floor((C-k)/x))?V+=" ":V+="\u2588",ue+=b<1&&O+1>=S?le[V]:D[V];ue+=`
`}return h%2&&b>0?ue.substring(0,ue.length-h-1)+Array(h+1).join("\u2580"):ue.substring(0,ue.length-1)},"_createHalfASCII");return z.createASCII=function(b,x){if(b=b||1,b<2)return oi(x);b-=1,x=typeof x>"u"?b*2:x;var h=z.getModuleCount()*b+x*2,k=x,S=h-x,O,C,M,W,V=Array(b+1).join("\u2588\u2588"),D=Array(b+1).join("  "),le="",ue="";for(O=0;O<h;O+=1){for(M=Math.floor((O-k)/b),ue="",C=0;C<h;C+=1)W=1,k<=C&&C<S&&k<=O&&O<S&&z.isDark(M,Math.floor((C-k)/b))&&(W=0),ue+=W?V:D;for(M=0;M<b;M+=1)le+=ue+`
`}return le.substring(0,le.length-1)},z.renderTo2dContext=function(b,x){x=x||2;for(var h=z.getModuleCount(),k=0;k<h;k++)for(var S=0;S<h;S++)b.fillStyle=z.isDark(k,S)?"black":"white",b.fillRect(k*x,S*x,x,x)},z},"qrcode");e.stringToBytesFuncs={default:function(N){for(var $=[],A=0;A<N.length;A+=1){var _=N.charCodeAt(A);$.push(_&255)}return $}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(N,$){var A=function(){for(var g=ye(N),R=o(function(){var Z=g.read();if(Z==-1)throw"eof";return Z},"read"),c=0,u={};;){var T=g.read();if(T==-1)break;var m=R(),z=R(),B=R(),P=String.fromCharCode(T<<8|m),j=z<<8|B;u[P]=j,c+=1}if(c!=$)throw c+" != "+$;return u}(),_="?".charCodeAt(0);return function(g){for(var R=[],c=0;c<g.length;c+=1){var u=g.charCodeAt(c);if(u<128)R.push(u);else{var T=A[g.charAt(c)];typeof T=="number"?(T&255)==T?R.push(T):(R.push(T>>>8),R.push(T&255)):R.push(_)}}return R}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},n={L:1,M:0,Q:3,H:2},r={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},i=function(){var N=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],$=1335,A=7973,_=21522,g={},R=o(function(c){for(var u=0;c!=0;)u+=1,c>>>=1;return u},"getBCHDigit");return g.getBCHTypeInfo=function(c){for(var u=c<<10;R(u)-R($)>=0;)u^=$<<R(u)-R($);return(c<<10|u)^_},g.getBCHTypeNumber=function(c){for(var u=c<<12;R(u)-R(A)>=0;)u^=A<<R(u)-R(A);return c<<12|u},g.getPatternPosition=function(c){return N[c-1]},g.getMaskFunction=function(c){switch(c){case r.PATTERN000:return function(u,T){return(u+T)%2==0};case r.PATTERN001:return function(u,T){return u%2==0};case r.PATTERN010:return function(u,T){return T%3==0};case r.PATTERN011:return function(u,T){return(u+T)%3==0};case r.PATTERN100:return function(u,T){return(Math.floor(u/2)+Math.floor(T/3))%2==0};case r.PATTERN101:return function(u,T){return u*T%2+u*T%3==0};case r.PATTERN110:return function(u,T){return(u*T%2+u*T%3)%2==0};case r.PATTERN111:return function(u,T){return(u*T%3+(u+T)%2)%2==0};default:throw"bad maskPattern:"+c}},g.getErrorCorrectPolynomial=function(c){for(var u=s([1],0),T=0;T<c;T+=1)u=u.multiply(s([1,a.gexp(T)],0));return u},g.getLengthInBits=function(c,u){if(1<=u&&u<10)switch(c){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+c}else if(u<27)switch(c){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+c}else if(u<41)switch(c){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+c}else throw"type:"+u},g.getLostPoint=function(c){for(var u=c.getModuleCount(),T=0,m=0;m<u;m+=1)for(var z=0;z<u;z+=1){for(var B=0,P=c.isDark(m,z),j=-1;j<=1;j+=1)if(!(m+j<0||u<=m+j))for(var Z=-1;Z<=1;Z+=1)z+Z<0||u<=z+Z||j==0&&Z==0||P==c.isDark(m+j,z+Z)&&(B+=1);B>5&&(T+=3+B-5)}for(var m=0;m<u-1;m+=1)for(var z=0;z<u-1;z+=1){var ae=0;c.isDark(m,z)&&(ae+=1),c.isDark(m+1,z)&&(ae+=1),c.isDark(m,z+1)&&(ae+=1),c.isDark(m+1,z+1)&&(ae+=1),(ae==0||ae==4)&&(T+=3)}for(var m=0;m<u;m+=1)for(var z=0;z<u-6;z+=1)c.isDark(m,z)&&!c.isDark(m,z+1)&&c.isDark(m,z+2)&&c.isDark(m,z+3)&&c.isDark(m,z+4)&&!c.isDark(m,z+5)&&c.isDark(m,z+6)&&(T+=40);for(var z=0;z<u;z+=1)for(var m=0;m<u-6;m+=1)c.isDark(m,z)&&!c.isDark(m+1,z)&&c.isDark(m+2,z)&&c.isDark(m+3,z)&&c.isDark(m+4,z)&&!c.isDark(m+5,z)&&c.isDark(m+6,z)&&(T+=40);for(var he=0,z=0;z<u;z+=1)for(var m=0;m<u;m+=1)c.isDark(m,z)&&(he+=1);var be=Math.abs(100*he/u/u-50)/5;return T+=be*10,T},g}(),a=function(){for(var N=new Array(256),$=new Array(256),A=0;A<8;A+=1)N[A]=1<<A;for(var A=8;A<256;A+=1)N[A]=N[A-4]^N[A-5]^N[A-6]^N[A-8];for(var A=0;A<255;A+=1)$[N[A]]=A;var _={};return _.glog=function(g){if(g<1)throw"glog("+g+")";return $[g]},_.gexp=function(g){for(;g<0;)g+=255;for(;g>=256;)g-=255;return N[g]},_}();function s(N,$){if(typeof N.length>"u")throw N.length+"/"+$;var A=function(){for(var g=0;g<N.length&&N[g]==0;)g+=1;for(var R=new Array(N.length-g+$),c=0;c<N.length-g;c+=1)R[c]=N[c+g];return R}(),_={};return _.getAt=function(g){return A[g]},_.getLength=function(){return A.length},_.multiply=function(g){for(var R=new Array(_.getLength()+g.getLength()-1),c=0;c<_.getLength();c+=1)for(var u=0;u<g.getLength();u+=1)R[c+u]^=a.gexp(a.glog(_.getAt(c))+a.glog(g.getAt(u)));return s(R,0)},_.mod=function(g){if(_.getLength()-g.getLength()<0)return _;for(var R=a.glog(_.getAt(0))-a.glog(g.getAt(0)),c=new Array(_.getLength()),u=0;u<_.getLength();u+=1)c[u]=_.getAt(u);for(var u=0;u<g.getLength();u+=1)c[u]^=a.gexp(a.glog(g.getAt(u))+R);return s(c,0).mod(g)},_}o(s,"qrPolynomial");var l=function(){var N=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],$=o(function(g,R){var c={};return c.totalCount=g,c.dataCount=R,c},"qrRSBlock"),A={},_=o(function(g,R){switch(R){case n.L:return N[(g-1)*4+0];case n.M:return N[(g-1)*4+1];case n.Q:return N[(g-1)*4+2];case n.H:return N[(g-1)*4+3];default:return}},"getRsBlockTable");return A.getRSBlocks=function(g,R){var c=_(g,R);if(typeof c>"u")throw"bad rs block @ typeNumber:"+g+"/errorCorrectionLevel:"+R;for(var u=c.length/3,T=[],m=0;m<u;m+=1)for(var z=c[m*3+0],B=c[m*3+1],P=c[m*3+2],j=0;j<z;j+=1)T.push($(B,P));return T},A}(),d=o(function(){var N=[],$=0,A={};return A.getBuffer=function(){return N},A.getAt=function(_){var g=Math.floor(_/8);return(N[g]>>>7-_%8&1)==1},A.put=function(_,g){for(var R=0;R<g;R+=1)A.putBit((_>>>g-R-1&1)==1)},A.getLengthInBits=function(){return $},A.putBit=function(_){var g=Math.floor($/8);N.length<=g&&N.push(0),_&&(N[g]|=128>>>$%8),$+=1},A},"qrBitBuffer"),p=o(function(N){var $=t.MODE_NUMBER,A=N,_={};_.getMode=function(){return $},_.getLength=function(c){return A.length},_.write=function(c){for(var u=A,T=0;T+2<u.length;)c.put(g(u.substring(T,T+3)),10),T+=3;T<u.length&&(u.length-T==1?c.put(g(u.substring(T,T+1)),4):u.length-T==2&&c.put(g(u.substring(T,T+2)),7))};var g=o(function(c){for(var u=0,T=0;T<c.length;T+=1)u=u*10+R(c.charAt(T));return u},"strToNum"),R=o(function(c){if("0"<=c&&c<="9")return c.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+c},"chatToNum");return _},"qrNumber"),y=o(function(N){var $=t.MODE_ALPHA_NUM,A=N,_={};_.getMode=function(){return $},_.getLength=function(R){return A.length},_.write=function(R){for(var c=A,u=0;u+1<c.length;)R.put(g(c.charAt(u))*45+g(c.charAt(u+1)),11),u+=2;u<c.length&&R.put(g(c.charAt(u)),6)};var g=o(function(R){if("0"<=R&&R<="9")return R.charCodeAt(0)-"0".charCodeAt(0);if("A"<=R&&R<="Z")return R.charCodeAt(0)-"A".charCodeAt(0)+10;switch(R){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+R}},"getCode");return _},"qrAlphaNum"),I=o(function(N){var $=t.MODE_8BIT_BYTE,A=N,_=e.stringToBytes(N),g={};return g.getMode=function(){return $},g.getLength=function(R){return _.length},g.write=function(R){for(var c=0;c<_.length;c+=1)R.put(_[c],8)},g},"qr8BitByte"),F=o(function(N){var $=t.MODE_KANJI,A=N,_=e.stringToBytesFuncs.SJIS;if(!_)throw"sjis not supported.";(function(c,u){var T=_(c);if(T.length!=2||(T[0]<<8|T[1])!=u)throw"sjis not supported."})("\u53CB",38726);var g=_(N),R={};return R.getMode=function(){return $},R.getLength=function(c){return~~(g.length/2)},R.write=function(c){for(var u=g,T=0;T+1<u.length;){var m=(255&u[T])<<8|255&u[T+1];if(33088<=m&&m<=40956)m-=33088;else if(57408<=m&&m<=60351)m-=49472;else throw"illegal char at "+(T+1)+"/"+m;m=(m>>>8&255)*192+(m&255),c.put(m,13),T+=2}if(T<u.length)throw"illegal char at "+(T+1)},R},"qrKanji"),H=o(function(){var N=[],$={};return $.writeByte=function(A){N.push(A&255)},$.writeShort=function(A){$.writeByte(A),$.writeByte(A>>>8)},$.writeBytes=function(A,_,g){_=_||0,g=g||A.length;for(var R=0;R<g;R+=1)$.writeByte(A[R+_])},$.writeString=function(A){for(var _=0;_<A.length;_+=1)$.writeByte(A.charCodeAt(_))},$.toByteArray=function(){return N},$.toString=function(){var A="";A+="[";for(var _=0;_<N.length;_+=1)_>0&&(A+=","),A+=N[_];return A+="]",A},$},"byteArrayOutputStream"),pe=o(function(){var N=0,$=0,A=0,_="",g={},R=o(function(u){_+=String.fromCharCode(c(u&63))},"writeEncoded"),c=o(function(u){if(!(u<0)){if(u<26)return 65+u;if(u<52)return 97+(u-26);if(u<62)return 48+(u-52);if(u==62)return 43;if(u==63)return 47}throw"n:"+u},"encode");return g.writeByte=function(u){for(N=N<<8|u&255,$+=8,A+=1;$>=6;)R(N>>>$-6),$-=6},g.flush=function(){if($>0&&(R(N<<6-$),N=0,$=0),A%3!=0)for(var u=3-A%3,T=0;T<u;T+=1)_+="="},g.toString=function(){return _},g},"base64EncodeOutputStream"),ye=o(function(N){var $=N,A=0,_=0,g=0,R={};R.read=function(){for(;g<8;){if(A>=$.length){if(g==0)return-1;throw"unexpected end of file./"+g}var u=$.charAt(A);if(A+=1,u=="=")return g=0,-1;if(u.match(/^\s$/))continue;_=_<<6|c(u.charCodeAt(0)),g+=6}var T=_>>>g-8&255;return g-=8,T};var c=o(function(u){if(65<=u&&u<=90)return u-65;if(97<=u&&u<=122)return u-97+26;if(48<=u&&u<=57)return u-48+52;if(u==43)return 62;if(u==47)return 63;throw"c:"+u},"decode");return R},"base64DecodeInputStream"),Ke=o(function(N,$){var A=N,_=$,g=new Array(N*$),R={};R.setPixel=function(m,z,B){g[z*A+m]=B},R.write=function(m){m.writeString("GIF87a"),m.writeShort(A),m.writeShort(_),m.writeByte(128),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(255),m.writeByte(255),m.writeByte(255),m.writeString(","),m.writeShort(0),m.writeShort(0),m.writeShort(A),m.writeShort(_),m.writeByte(0);var z=2,B=u(z);m.writeByte(z);for(var P=0;B.length-P>255;)m.writeByte(255),m.writeBytes(B,P,255),P+=255;m.writeByte(B.length-P),m.writeBytes(B,P,B.length-P),m.writeByte(0),m.writeString(";")};var c=o(function(m){var z=m,B=0,P=0,j={};return j.write=function(Z,ae){if(Z>>>ae)throw"length over";for(;B+ae>=8;)z.writeByte(255&(Z<<B|P)),ae-=8-B,Z>>>=8-B,P=0,B=0;P=Z<<B|P,B=B+ae},j.flush=function(){B>0&&z.writeByte(P)},j},"bitOutputStream"),u=o(function(m){for(var z=1<<m,B=(1<<m)+1,P=m+1,j=T(),Z=0;Z<z;Z+=1)j.add(String.fromCharCode(Z));j.add(String.fromCharCode(z)),j.add(String.fromCharCode(B));var ae=H(),he=c(ae);he.write(z,P);var be=0,ve=String.fromCharCode(g[be]);for(be+=1;be<g.length;){var Le=String.fromCharCode(g[be]);be+=1,j.contains(ve+Le)?ve=ve+Le:(he.write(j.indexOf(ve),P),j.size()<4095&&(j.size()==1<<P&&(P+=1),j.add(ve+Le)),ve=Le)}return he.write(j.indexOf(ve),P),he.write(B,P),he.flush(),ae.toByteArray()},"getLZWRaster"),T=o(function(){var m={},z=0,B={};return B.add=function(P){if(B.contains(P))throw"dup key:"+P;m[P]=z,z+=1},B.size=function(){return z},B.indexOf=function(P){return m[P]},B.contains=function(P){return typeof m[P]<"u"},B},"lzwTable");return R},"gifImage"),ie=o(function(N,$,A){for(var _=Ke(N,$),g=0;g<$;g+=1)for(var R=0;R<N;R+=1)_.setPixel(R,g,A(R,g));var c=H();_.write(c);for(var u=pe(),T=c.toByteArray(),m=0;m<T.length;m+=1)u.writeByte(T[m]);return u.flush(),"data:image/gif;base64,"+u},"createDataURL");return e}();(function(){Wr.stringToBytesFuncs["UTF-8"]=function(e){function t(n){for(var r=[],i=0;i<n.length;i++){var a=n.charCodeAt(i);a<128?r.push(a):a<2048?r.push(192|a>>6,128|a&63):a<55296||a>=57344?r.push(224|a>>12,128|a>>6&63,128|a&63):(i++,a=65536+((a&1023)<<10|n.charCodeAt(i)&1023),r.push(240|a>>18,128|a>>12&63,128|a>>6&63,128|a&63))}return r}return o(t,"toUTF8Array"),t(e)}})();(function(e){typeof define=="function"&&define.amd?define([],e):typeof qr=="object"&&(Gr.exports=e())})(function(){return Wr})});w();E();v();w();E();v();w();E();v();w();E();v();w();E();v();var Dt=o((e,t,n)=>(r,i)=>{let a=-1;return s(0);async function s(l){if(l<=a)throw new Error("next() called multiple times");a=l;let d,p=!1,y;if(e[l]?(y=e[l][0][0],r.req.routeIndex=l):y=l===e.length&&i||void 0,y)try{d=await y(r,()=>s(l+1))}catch(I){if(I instanceof Error&&t)r.error=I,d=await t(I,r),p=!0;else throw I}else r.finalized===!1&&n&&(d=await n(r));return d&&(r.finalized===!1||p)&&(r.res=d),r}},"compose");w();E();v();w();E();v();w();E();v();w();E();v();var Hn=Symbol();w();E();v();w();E();v();w();E();v();var Fn=o((e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,r=>r.toLowerCase())}}).formData(),"bufferToFormData");var jn=32,xs=1e4,ut=o(e=>"headers"in e,"isRawRequest"),qn=o(async(e,t=Object.create(null))=>{let{all:n=!1,dot:r=!1}=t,s=(ut(e)?e.headers:e.raw.headers).get("Content-Type")?.split(";")[0].trim().toLowerCase();return s==="multipart/form-data"||s==="application/x-www-form-urlencoded"?ks(e,{all:n,dot:r}):{}},"parseBody");async function ks(e,t){if(!ut(e)&&e.bodyCache.formData)return Un(await e.bodyCache.formData,t);let n=ut(e)?e.headers:e.raw.headers,r=await e.arrayBuffer(),i=Fn(r,n.get("Content-Type")||"");ut(e)||(e.bodyCache.formData=i);let a=await i;return a?Un(a,t):{}}o(ks,"parseFormData");function Un(e,t){let n=Object.create(null),r={count:0};return e.forEach((i,a)=>{t.all||a.endsWith("[]")?ys(n,a,i):n[a]=i}),t.dot&&Object.entries(n).forEach(([i,a])=>{i.includes(".")&&(Ss(n,i,a,r),delete n[i])}),n}o(Un,"convertFormDataToBodyData");var ys=o((e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},"handleParsingAllValues"),Ss=o((e,t,n,r)=>{if(/(?:^|\.)__proto__\./.test(t))return;let i=e,a=t.split(".",jn+2);a.length>jn+1&&Wn(),a.forEach((s,l)=>{l===a.length-1?i[s]=n:((!i[s]||typeof i[s]!="object"||Array.isArray(i[s])||i[s]instanceof File)&&(r.count++>=xs&&Wn(),i[s]=Object.create(null)),i=i[s])})},"handleParsingNestedValues"),Wn=o(()=>{throw new Error("Nesting limit exceeded")},"throwNestingLimitExceeded");w();E();v();var Pt=o(e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},"splitPath"),Gn=o(e=>{let{groups:t,path:n}=_s(e),r=Pt(n);return Rs(r,t)},"splitRoutingPath"),_s=o(e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(n,r)=>{let i=`@${r}`;return t.push([i,n]),i}),{groups:t,path:e}},"extractGroupsFromPath"),Rs=o((e,t)=>{for(let n=t.length-1;n>=0;n--){let[r]=t[n];for(let i=e.length-1;i>=0;i--)if(e[i].includes(r)){e[i]=e[i].replace(r,t[n][1]);break}}return e},"replaceGroupMarks"),dt={},Kn=o((e,t)=>{if(e==="*")return"*";let n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){let r=`${e}#${t}`;return dt[r]||(n[2]?dt[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:dt[r]=[e,n[1],!0]),dt[r]}return null},"getPattern"),Zn=o((e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},"tryDecode"),zs=o(e=>Zn(e,decodeURI),"tryDecodeURI"),Ht=o(e=>{let t=e.url,n=t.indexOf("/",t.indexOf(":")+4),r=n;for(;r<t.length;r++){let i=t.charCodeAt(r);if(i===37){let a=t.indexOf("?",r),s=t.indexOf("#",r),l=a===-1?s===-1?void 0:s:s===-1?a:Math.min(a,s),d=t.slice(n,l);return zs(d.includes("%25")?d.replace(/%25/g,"%2525"):d)}else if(i===63||i===35)break}return t.slice(n,r)},"getPath");var Jn=o(e=>{let t=Ht(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},"getPathNoStrict"),_e=o((e,t,...n)=>(n.length&&(t=_e(t,...n)),`${e?.[0]==="/"?"":"/"}${e}${t==="/"?"":`${e?.at(-1)==="/"?"":"/"}${t?.[0]==="/"?t.slice(1):t}`}`),"mergePath"),ct=o(e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;let t=e.split("/"),n=[],r="";return t.forEach(i=>{if(i!==""&&!/\:/.test(i))r+="/"+i;else if(/\:/.test(i))if(i.charCodeAt(i.length-1)===63){n.length===0&&r===""?n.push("/"):n.push(r);let a=i.slice(0,-1);r+="/"+a,n.push(r)}else r+="/"+i}),n.filter((i,a,s)=>s.indexOf(i)===a)},"checkOptionalParameter"),pt=o(e=>e.indexOf("%")!==-1?Zn(e,As):e,"tryDecodeURIComponent"),Bt=o(e=>(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),pt(e)),"_decodeURI"),Vn=o((e,t,n)=>{let r=e.indexOf("#",8);r!==-1&&(e=e.slice(0,r));let i;if(!n&&t&&t.indexOf("%")===-1&&t.indexOf("+")===-1){let l=e.indexOf("?",8);if(l===-1)return;for(e.startsWith(t,l+1)||(l=e.indexOf(`&${t}`,l+1));l!==-1;){let d=e.charCodeAt(l+t.length+1);if(d===61){let p=l+t.length+2,y=e.indexOf("&",p);return Bt(e.slice(p,y===-1?void 0:y))}else if(d==38||isNaN(d))return"";l=e.indexOf(`&${t}`,l+1)}if(i=/[%+]/.test(e),!i)return}let a=Object.create(null);i??=/[%+]/.test(e);let s=e.indexOf("?",8);for(;s!==-1;){let l=e.indexOf("&",s+1),d=e.indexOf("=",s);d>l&&l!==-1&&(d=-1);let p=e.slice(s+1,d===-1?l===-1?void 0:l:d);if(i&&(p=Bt(p)),s=l,p==="")continue;let y;d===-1?y="":(y=e.slice(d+1,l===-1?void 0:l),i&&(y=Bt(y))),n?(a[p]&&Array.isArray(a[p])||(a[p]=[]),a[p].push(y)):a[p]??=y}return t?a[t]:a},"_getQueryParam"),Yn=Vn,Qn=o((e,t)=>Vn(e,t,!0),"getQueryParams"),As=decodeURIComponent;var Xn=o(class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",n=[[]]){this.raw=e,this.path=t,this.#e=n}param(e){return e?this.#n(e):this.#a()}#n(e){let t=this.#e[0][this.routeIndex]?.[1][e],n=this.#r(t);return n&&pt(n)}#a(){let e={},t=Object.keys(this.#e[0][this.routeIndex]?.[1]??{});for(let n of t){let r=this.#r(this.#e[0][this.routeIndex][1][n]);r!==void 0&&(e[n]=pt(r))}return e}#r(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Yn(this.url,e)}queries(e){return Qn(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;let t=Object.create(null);return this.raw.headers.forEach((n,r)=>{t[r]=n}),t}async parseBody(e){return qn(this,e)}#i=e=>{let{bodyCache:t,raw:n}=this,r=t[e];if(r)return r;for(let i in t)return t[i].then(a=>(i==="json"&&(a=JSON.stringify(a)),new Response(a)[e]()));return t[e]=n[e]()};json(){return this.#i("text").then(e=>JSON.parse(e))}text(){return this.#i("text")}arrayBuffer(){return this.#i("arrayBuffer")}bytes(){return this.#i("arrayBuffer").then(e=>new Uint8Array(e))}blob(){return this.#i("blob")}formData(){return this.#i("formData")}addValidatedData(e,t){(this.#t??={})[e]=t}valid(e){return this.#t?.[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Hn](){return this.#e}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}},"HonoRequest");w();E();v();var er={Stringify:1,BeforeStream:2,Stream:3},Ts=o((e,t)=>{let n=new String(e);return n.isEscaped=!0,n.callbacks=t,n},"raw");var Ft=o(async(e,t,n,r,i)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));let a=e.callbacks;if(!a?.length)return Promise.resolve(e);i?i[0]+=e:i=[e];let s=Promise.all(a.map(l=>l({phase:t,buffer:i,context:r}))).then(l=>Promise.all(l.filter(Boolean).map(d=>Ft(d,t,!1,r,i))).then(()=>i[0]));return n?Ts(await s,a):s},"resolveCallback");var $s="text/plain; charset=UTF-8",jt=o((e,t)=>({"Content-Type":e,...t}),"setDefaultContentType"),Je=o((e,t)=>new Response(e,t),"createResponseInstance"),Ut=o(class{#t;#e;env={};#n;finalized=!1;error;#a;#r;#i;#d;#l;#u;#o;#c;#p;constructor(e,t){this.#t=e,t&&(this.#r=t.executionCtx,this.env=t.env,this.#u=t.notFoundHandler,this.#p=t.path,this.#c=t.matchResult)}get req(){return this.#e??=new Xn(this.#t,this.#p,this.#c),this.#e}get event(){if(this.#r&&"respondWith"in this.#r)return this.#r;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#r)return this.#r;throw Error("This context has no ExecutionContext")}get res(){return this.#i||=Je(null,{headers:this.#o??=new Headers})}set res(e){if(this.#i&&e){e=Je(e.body,e);for(let[t,n]of this.#i.headers.entries())if(t!=="content-type")if(t==="set-cookie"){let r=this.#i.headers.getSetCookie();e.headers.delete("set-cookie");for(let i of r)e.headers.append("set-cookie",i)}else e.headers.set(t,n)}this.#i=e,this.finalized=!0}render=(...e)=>(this.#l??=t=>this.html(t),this.#l(...e));setLayout=e=>this.#d=e;getLayout=()=>this.#d;setRenderer=e=>{this.#l=e};header=(e,t,n)=>{this.finalized&&(this.#i=Je(this.#i.body,this.#i));let r=this.#i?this.#i.headers:this.#o??=new Headers;t===void 0?r.delete(e):n?.append?r.append(e,t):r.set(e,t)};status=e=>{this.#a=e};set=(e,t)=>{this.#n??=new Map,this.#n.set(e,t)};get=e=>this.#n?this.#n.get(e):void 0;get var(){return this.#n?Object.fromEntries(this.#n):{}}#s(e,t,n){let r=this.#i?new Headers(this.#i.headers):this.#o;if(typeof t=="object"&&t.headers){r??=new Headers;for(let[a,s]of new Headers(t.headers))a==="set-cookie"?r.append(a,s):r.set(a,s)}if(n){if(!r){let a=0;for(let s in n)if(++a>1||typeof n[s]!="string"){r=new Headers;break}}if(r)for(let a in n){let s=n[a];if(typeof s=="string")r.set(a,s);else{r.delete(a);for(let l of s)r.append(a,l)}}}let i=typeof t=="number"?t:t?.status??this.#a;return Je(e,{status:i,headers:r??n})}newResponse=(...e)=>this.#s(...e);body=(e,t,n)=>this.#s(e,t,n);text=(e,t,n)=>!this.#o&&!this.#a&&!t&&!n&&!this.finalized?new Response(e):this.#s(e,t,jt($s,n));json=(e,t,n)=>this.#s(JSON.stringify(e),t,jt("application/json",n));html=(e,t,n)=>{let r=o(i=>this.#s(i,t,jt("text/html; charset=UTF-8",n)),"res");return typeof e=="object"?Ft(e,er.Stringify,!1,{}).then(r):r(e)};redirect=(e,t)=>{let n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)};notFound=()=>(this.#u??=()=>Je(),this.#u(this))},"Context");w();E();v();var ee="ALL",tr="all",nr=["get","post","put","delete","options","patch","query"],ht="Can not add a route since the matcher is already built.",ft=o(class extends Error{},"UnsupportedPathError");w();E();v();var rr="__COMPOSED_HANDLER";var Ns=o(e=>e.text("404 Not Found",404),"notFoundHandler"),ir=o((e,t)=>{if("getResponse"in e){let n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},"errorHandler"),ar=o(class sr{get;post;put;delete;options;patch;query;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(t={}){[...nr,tr].forEach(a=>{this[a]=(s,...l)=>(typeof s=="string"?this.#t=s:this.#a(a,this.#t,s),l.forEach(d=>{this.#a(a,this.#t,d)}),this)}),this.on=(a,s,...l)=>{for(let d of[s].flat()){this.#t=d;for(let p of[a].flat())l.map(y=>{this.#a(p.toUpperCase(),this.#t,y)})}return this},this.use=(a,...s)=>(typeof a=="string"?this.#t=a:(this.#t="*",s.unshift(a)),s.forEach(l=>{this.#a(ee,this.#t,l)}),this);let{strict:r,...i}=t;Object.assign(this,i),this.getPath=r??!0?t.getPath??Ht:Jn}#e(){let t=new sr({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,t.#n=this.#n,t.routes=this.routes,t}#n=Ns;errorHandler=ir;route(t,n){let r=this.basePath(t);return n.routes.map(i=>{let a;n.errorHandler===ir?a=i.handler:(a=o(async(s,l)=>(await Dt([],n.errorHandler)(s,()=>i.handler(s,l))).res,"handler"),a[rr]=i.handler),r.#a(i.method,i.path,a,i.basePath)}),this}basePath(t){let n=this.#e();return n._basePath=_e(this._basePath,t),n}onError=t=>(this.errorHandler=t,this);notFound=t=>(this.#n=t,this);mount(t,n,r){let i,a;r&&(typeof r=="function"?a=r:(a=r.optionHandler,r.replaceRequest===!1?i=o(d=>d,"replaceRequest"):i=r.replaceRequest));let s=a?d=>{let p=a(d);return Array.isArray(p)?p:[p]}:d=>{let p;try{p=d.executionCtx}catch{}return[d.env,p]};i||=(()=>{let d=_e(this._basePath,t),p=d==="/"?0:d.length;return y=>{let I=new URL(y.url);return I.pathname=this.getPath(y).slice(p)||"/",new Request(I,y)}})();let l=o(async(d,p)=>{let y=await n(i(d.req.raw),...s(d));if(y)return y;await p()},"handler");return this.#a(ee,_e(t,"*"),l),this}#a(t,n,r,i){t=t.toUpperCase(),n=_e(this._basePath,n);let a={basePath:i!==void 0?_e(this._basePath,i):this._basePath,path:n,method:t,handler:r};this.router.add(t,n,[r,a]),this.routes.push(a)}#r(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t}#i(t,n,r,i){if(i==="HEAD")return(async()=>new Response(null,await this.#i(t,n,r,"GET")))();let a=this.getPath(t,{env:r}),s=this.router.match(i,a),l=new Ut(t,{path:a,matchResult:s,env:r,executionCtx:n,notFoundHandler:this.#n});if(s[0].length===1){let p;try{p=s[0][0][0][0](l,async()=>{l.res=await this.#n(l)})}catch(y){return this.#r(y,l)}return p instanceof Promise?p.then(y=>y||(l.finalized?l.res:this.#n(l))).catch(y=>this.#r(y,l)):p??this.#n(l)}let d=Dt(s[0],this.errorHandler,this.#n);return(async()=>{try{let p=await d(l);if(!p.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return p.res}catch(p){return this.#r(p,l)}})()}fetch=(t,...n)=>this.#i(t,n[1],n[0],t.method);request=(t,n,r,i)=>t instanceof Request?this.fetch(n?new Request(t,n):t,r,i):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${_e("/",t)}`,n),r,i));fire=()=>{addEventListener("fetch",t=>{t.respondWith(this.#i(t.request,t,void 0,t.request.method))})}},"_Hono");w();E();v();w();E();v();w();E();v();var X=o(()=>Object.create(null),"createNullObject");w();E();v();var gt=[];function Wt(e,t){let n=this.buildAllMatchers(),r=o((i,a)=>{let s=n[i]||n[ee],l=s[2][a];if(l)return l;let d=a.match(s[0]);if(!d)return[[],gt];let p=d.indexOf("",1);return[s[1][p],d]},"match2");return this.match=r,r(e,t)}o(Wt,"match");w();E();v();var Ue="[^/]+",ze=".*",we="(?:|/.*)",Re=Symbol(),or=new Set(".\\+*[^]$()");function Os(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1?1:e===ze||e===we?t===we?-1:1:t===ze||t===we?-1:e===Ue?1:t===Ue?-1:e.length===t.length?e<t?-1:1:t.length-e.length}o(Os,"compareKey");var lr=o(class qt{#t;#e;#n=X();insert(t,n,r,i,a){let s=this;for(let l=0,d=t.length;l<d;l++){let p=t[l],y=p.length===1?p==="*"?l===d-1?["","",ze]:["","",Ue]:null:p==="/*"?["","",we]:p.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),I;if(y){let F=y[1],H=y[2]||Ue;if(F&&y[2]&&(H===".*"||(H=H.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(H))||H.length===1&&or.has(H)))throw Re;if(I=s.#n[H],!I){if(H!==ze&&H!==we){for(let pe in s.#n)if((H.length>1||pe.length>1)&&pe!==ze&&pe!==we)throw Re}I=s.#n[H]=new qt}F!==""&&(I.#e??=i.varIndex++,r.push([F,I.#e]))}else if(I=s.#n[p],!I){for(let F in s.#n)if(F.length>1&&F!==ze&&F!==we)throw Re;I=s.#n[p]=new qt}s=I}if(s.#t!==void 0)throw Re;s.#t=a?-1:n}buildRegExpStr(){let n=Object.keys(this.#n).sort(Os).map(r=>{let i=this.#n[r],a=i.buildRegExpStr();return a===""?"":(typeof i.#e=="number"?`(${r})@${i.#e}`:or.has(r)?`\\${r}`:r)+a}).filter(Boolean);return typeof this.#t=="number"&&this.#t!==-1&&n.unshift(`#${this.#t}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},"_Node");w();E();v();var Gt=o(class{#t={varIndex:0};#e=new lr;#n=0;paths=X();insert(e,t){if(t){this.#e.insert(e.split(""),0,[],this.#t,!0);return}let n=[],r=[],i=e;for(let s=0;;){let l=!1;if(i=i.replace(/\{[^}]+\}/g,d=>{let p=`@\\${s}`;return r[s]=[p,d],s++,l=!0,p}),!l)break}let a=i.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let s=r.length-1;s>=0;s--){let[l]=r[s];for(let d=a.length-1;d>=0;d--)if(a[d].indexOf(l)!==-1){a[d]=a[d].replace(l,r[s][1]);break}}this.#e.insert(a,this.#n,n,this.#t,!1),this.paths[e]=[this.#n++,n]}buildRegExp(){let e=this.#e.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,n=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(i,a,s)=>a!==void 0?(n[++t]=Number(a),"$()"):(s!==void 0&&(r[Number(s)]=++t),"")),[new RegExp(`^${e}`),n,r]}},"Trie");var ur=X();function dr(e){return ur[e]??=new RegExp(`^${e.replace(/\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,(t,n)=>n?`\\${n}`:t==="/*"?we:t==="*"?ze:`/:${Ue}`)}$`)}o(dr,"buildWildcardRegExp");function mt(e,t){for(let n of Object.keys(e).sort((r,i)=>i.length-r.length))if(dr(n).test(t))return[...e[n]]}o(mt,"findMiddleware");var bt=o(class{name="RegExpRouter";#t;#e;#n;constructor(){this.#t={[ee]:X()},this.#e={[ee]:X()},this.#n={[ee]:new Gt}}#a(e,t){try{this.#n[e].insert(t,!/\*|\/:/.test(t))}catch(n){throw n===Re?new ft(t):n}}add(e,t,n){let r=this.#t,i=this.#e;if(!r)throw new Error(ht);if(!r[e]){this.#n[e]=new Gt;for(let l of[r,i]){l[e]=X();for(let d in l[ee])l[e][d]=[...l[ee][d]],this.#a(e,d)}}t==="/*"&&(t="*");let a=e===ee?Object.keys(r):[e];if(/\*$/.test(t)){let l=dr(t);for(let d of a)r[d][t]||(this.#a(d,t),r[d][t]=mt(r[d],t)||mt(r[ee],t)||[]);for(let d of[r,i])for(let p of a)for(let y in d[p])l.test(y)&&d[p][y].push([n,t]);return}let s=ct(t)||[t];for(let l of s)for(let d of a)i[d][l]||(this.#a(d,l),i[d][l]=mt(r[d],l)||mt(r[ee],l)||[]),i[d][l].push([n,l])}match=Wt;buildAllMatchers(){let e=X();for(let t of Object.keys(this.#e))e[t]=this.#r(t);return this.#t=this.#e=this.#n=void 0,ur=X(),e}#r(e){let t=this.#t[e],n=this.#e[e],r=this.#n[e],i=X(),a=[],[s,l,d]=r.buildRegExp();for(let p of[t,n])for(let y in p){let I=p[y],F=r.paths[y];if(!F){i[y]=[I.map(([H])=>[H,X()]),gt];continue}a[F[0]]=I.map(([H,pe])=>[H,r.paths[pe][1].reduceRight((ye,[Ke],ie)=>(ye[Ke]=d[F[1][ie][1]],ye),X())])}return[s,l.map(p=>a[p]),i]}},"RegExpRouter");w();E();v();w();E();v();w();E();v();var Kt=o(class{name="SmartRouter";#t=[];#e=[];constructor(e){this.#t=e.routers}add(e,t,n){if(!this.#e)throw new Error(ht);this.#e.push([e,t,n])}match(e,t){if(!this.#e)throw new Error("Fatal error");let n=this.#t,r=this.#e,i=n.length,a=0,s;for(;a<i;a++){let l=n[a];try{for(let d=0,p=r.length;d<p;d++)l.add(...r[d]);s=l.match(e,t)}catch(d){if(d instanceof ft)continue;throw d}this.match=l.match.bind(l),this.#t=[l],this.#e=void 0;break}if(a===i)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,s}get activeRouter(){if(this.#e||this.#t.length!==1)throw new Error("No active router has been determined yet.");return this.#t[0]}},"SmartRouter");w();E();v();w();E();v();w();E();v();var Zt=X(),Is=0,cr=o(class pr{#t=[];#e=X();#n=[];#a;#r=Zt;insert(t,n,r){let i=this,a=Gn(n),s=new Set,l=0;for(let d of a){let p=a[++l],y=Kn(d,p)||(p===void 0&&d&&d.indexOf("*")===d.length-1?d:null),I=Array.isArray(y),F=I?y[0]:y||d,H=i.#e[F]||=new pr;y&&!H.#a&&(H.#a=y,i.#n.push(H)),i=H,I&&s.add(y[1])}i.#t.push({[t]:{handler:r,possibleKeys:[...s],score:++Is}})}#i(t,n,r,i,a){for(let s=0,l=n.#t.length;s<l;s++){let d=n.#t[s],p=d[r]||d[ee];if(p){p.params=X(),t.push(p);for(let y=0,I=p.possibleKeys.length;y<I;y++){let F=p.possibleKeys[y];p.params[F]=a?.[F]&&!y?a[F]:i[F]??a?.[F]}}}}search(t,n){let r=[];this.#r=Zt;let a=[this],s=Pt(n),l=[],d=s.length,p=null;for(let y=0;y<d;y++){let I=s[y],F=y===d-1,H=[];for(let ye=0,Ke=a.length;ye<Ke;ye++){let ie=a[ye],N=ie.#e[I];N&&(N.#r=ie.#r,F?(N.#e["*"]&&this.#i(r,N.#e["*"],t,ie.#r),this.#i(r,N,t,ie.#r)):H.push(N));for(let $ of ie.#n){let A=$.#a,_=ie.#r===Zt?{}:{...ie.#r};if(typeof A=="string"){(A==="*"||I.startsWith(A.slice(0,-1)))&&(this.#i(r,$,t,ie.#r),A==="*"&&($.#r=_,H.push($)));continue}let[,g,R]=A;if(!(!I&&R===!0)){if(R!==!0){if(!p){p=[];let T=n[0]==="/"?1:0;for(let m=0;m<d;m++)p[m]=T,T+=s[m].length+1}let c=n.slice(p[y]),u=R.exec(c);if(u){_[g]=u[0],this.#i(r,$,t,ie.#r,_),u[0].length===c.length&&$.#e["*"]&&this.#i(r,$.#e["*"],t,ie.#r,_);for(let T in $.#e){$.#r=_;let m=u[0].match(/\//g)?.length??0;(l[m]||=[]).push($);break}continue}}(R===!0||R.test(I))&&(_[g]=I,F?(this.#i(r,$,t,_,ie.#r),$.#e["*"]&&this.#i(r,$.#e["*"],t,_,ie.#r)):($.#r=_,H.push($)))}}}let pe=l.shift();a=pe?H.concat(pe):H}return r[1]&&r.sort((y,I)=>y.score-I.score),[r.map(({handler:y,params:I})=>[y,I])]}},"_Node");var Jt=o(class{name="TrieRouter";#t=new cr;add(e,t,n){for(let r of ct(t)||[t])this.#t.insert(e,r,n)}match(e,t){return this.#t.search(e,t)}},"TrieRouter");var Vt=o(class extends ar{constructor(e={}){super(e),this.router=e.router??new Kt({routers:[new bt,new Jt]})}},"Hono");w();E();v();w();E();v();w();E();v();var hr="23456789BCDFGHJKMNPQRSTVWXZ";var Ms={0:"D",O:"D",1:"J",I:"J",L:"J",A:"4",E:"F",U:"V",Y:"V"};function fr(){let e=crypto.getRandomValues(new Uint8Array(6)),t="";for(let n of e)t+=hr[n%hr.length];return t}o(fr,"tagCodeErzeugen");function de(e){return e.toUpperCase().replace(/[^0-9A-Z-]/g,"")}o(de,"kanonisch");function gr(e){let t="";for(let n of de(e).replace(/-/g,""))t+=Ms[n]??n;return t}o(gr,"tagCodeNormalisieren");function mr(){return[...crypto.getRandomValues(new Uint8Array(16))].map(t=>t.toString(16).padStart(2,"0")).join("")}o(mr,"einladungscodeErzeugen");function br(){return[...crypto.getRandomValues(new Uint8Array(32))].map(t=>t.toString(16).padStart(2,"0")).join("")}o(br,"geraetetokenErzeugen");async function We(e){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return[...new Uint8Array(t)].map(n=>n.toString(16).padStart(2,"0")).join("")}o(We,"sha256");async function Ae(e,t,n){for(let r=0;r<8;r++){let i=fr();try{return await e.DB.prepare("INSERT INTO tag (code, ziel_typ, ziel_id) VALUES (?, ?, ?)").bind(i,t,n).run(),i}catch{continue}}throw new Error("Kein freier Tag-Code gefunden")}o(Ae,"tagAnlegen");async function vr(e,t){return e.DB.prepare("SELECT code, ziel_typ, ziel_id FROM tag WHERE code = ? AND aktiv = 1").bind(t).first()}o(vr,"tagLesen");var Yt=`
  SELECT e.*, s.name AS standort_name, s.typ AS standort_typ
    FROM einheit e
    JOIN standort s ON s.id = e.standort_id`;async function qe(e,t){return e.DB.prepare(`${Yt} WHERE e.id = ?`).bind(t).first()}o(qe,"einheitLesen");async function Ve(e,t){return e.DB.prepare(`${Yt} WHERE e.code = ?`).bind(t).first()}o(Ve,"einheitPerCode");async function Ye(e,t){let{results:n}=await e.DB.prepare(`SELECT i.artikel_id, a.name, i.menge, a.mengeneinheit
       FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
      WHERE i.einheit_id = ?
      ORDER BY a.name`).bind(t).all();return n}o(Ye,"inhaltLesen");async function Qt(e,t){let{results:n}=await e.DB.prepare(`${Yt} WHERE e.standort_id = ? AND e.aktiv = 1 ORDER BY e.code`).bind(t).all();return n}o(Qt,"einheitenAmStandort");async function fe(e,t){return e.DB.prepare("SELECT * FROM standort WHERE id = ?").bind(t).first()}o(fe,"standortLesen");async function xe(e){let{results:t}=await e.DB.prepare("SELECT * FROM standort WHERE aktiv = 1 ORDER BY typ, name").all();return t}o(xe,"standorteAktiv");async function vt(e){return e.DB.prepare("SELECT * FROM standort WHERE typ = 'lager' AND aktiv = 1 ORDER BY id LIMIT 1").first()}o(vt,"hauptlager");function Cs(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let r=(t.getTime()-n.getTime())/864e5;return r<0||r>14?null:n.toISOString().slice(0,19).replace("T"," ")}o(Cs,"nachtragsZeit");async function Qe(e,t){let n=await qe(e,t.einheitId);if(!n)return null;if(n.standort_id===t.nachStandortId)return{buchungId:0,vonStandortId:n.standort_id,unveraendert:!0};let r=Cs(t.zeit),i=await e.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id,
                          mitarbeiter_id, quelle, lat, lon, notiz, zeit)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, datetime('now')))
     RETURNING id`).bind(t.einheitId,n.standort_id,t.nachStandortId,t.mitarbeiterId,t.quelle,t.lat??null,t.lon??null,r?t.notiz??"offline nachgetragen":t.notiz??null,r).first();return await e.DB.prepare("UPDATE einheit SET standort_id = ?, seit = COALESCE(?, datetime('now')) WHERE id = ?").bind(t.nachStandortId,r,t.einheitId).run(),{buchungId:i?.id??0,vonStandortId:n.standort_id,unveraendert:!1}}o(Qe,"buchen");async function Er(e,t){let n=await e.DB.prepare("SELECT * FROM buchung WHERE id = ?").bind(t).first();if(!n)return{ok:!1,grund:"Buchung nicht gefunden"};if(n.storniert)return{ok:!1,grund:"Bereits storniert"};if((await e.DB.prepare(`SELECT id FROM buchung
      WHERE einheit_id = ? AND storniert = 0
      ORDER BY zeit DESC, id DESC LIMIT 1`).bind(n.einheit_id).first())?.id!==n.id)return{ok:!1,grund:"Es gibt neuere Buchungen f\xFCr diese Einheit"};if((Date.now()-new Date(n.zeit.replace(" ","T")+"Z").getTime())/6e4>15)return{ok:!1,grund:"Zu alt \u2014 bitte zur\xFCckbuchen statt stornieren"};let a=await e.DB.prepare(`SELECT zeit FROM buchung
      WHERE einheit_id = ? AND storniert = 0 AND id <> ?
      ORDER BY zeit DESC, id DESC LIMIT 1`).bind(n.einheit_id,n.id).first(),s=await e.DB.prepare("SELECT angelegt_am FROM einheit WHERE id = ?").bind(n.einheit_id).first();return await e.DB.batch([e.DB.prepare("UPDATE buchung SET storniert = 1 WHERE id = ?").bind(n.id),e.DB.prepare("UPDATE einheit SET standort_id = ?, seit = ? WHERE id = ?").bind(n.von_standort_id,a?.zeit??s?.angelegt_am??n.zeit,n.einheit_id)]),{ok:!0}}o(Er,"stornieren");async function Et(e,t,n=50){let{results:r}=await e.DB.prepare(`SELECT b.id, b.zeit, sv.name AS von, sn.name AS nach,
            m.name AS wer, b.quelle
       FROM buchung b
       LEFT JOIN standort sv ON sv.id = b.von_standort_id
       JOIN standort sn ON sn.id = b.nach_standort_id
       LEFT JOIN mitarbeiter m ON m.id = b.mitarbeiter_id
      WHERE b.einheit_id = ? AND b.storniert = 0
      ORDER BY b.zeit DESC, b.id DESC
      LIMIT ?`).bind(t,n).all();return r}o(Et,"historie");async function Xe(e,t={}){let n=["e.aktiv = 1","e.zustand <> 'ausgemustert'"],r=[];t.standortId!==void 0&&(n.push("e.standort_id = ?"),r.push(t.standortId)),t.artikelSuche&&(n.push("a.name LIKE ?"),r.push(`%${t.artikelSuche}%`));let i=n.join(" AND "),{results:a}=await e.DB.prepare(`SELECT artikel_id, artikel, mengeneinheit, standort_id, standort, standort_typ,
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
      ORDER BY artikel, standort`).bind(...r,...r).all();return a}o(Xe,"bestand");async function et(e,t=56){let{results:n}=await e.DB.prepare(`SELECT e.id AS einheit_id, e.code, e.bezeichnung,
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
      ORDER BY baustelle_beendet DESC, tage DESC`).bind(t).all();return n}o(et,"ueberfaellig");async function wr(e,t,n=25){let r=`%${t}%`,{results:i}=await e.DB.prepare(`SELECT 'einheit' AS art, e.id, e.code || ' \xB7 ' || e.bezeichnung AS titel,
            s.name AS zusatz
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.code LIKE ?1 OR e.bezeichnung LIKE ?1
      UNION ALL
     SELECT 'standort', s.id, s.name, s.typ
       FROM standort s WHERE s.name LIKE ?1 OR s.adresse LIKE ?1
      UNION ALL
     SELECT 'artikel', a.id, a.name, a.kategorie
       FROM artikel a WHERE a.name LIKE ?1
      LIMIT ?2`).bind(r,n).all();return i}o(wr,"suche");async function xr(e,t){return e.DB.prepare("SELECT id, name, rolle, aktiv FROM mitarbeiter WHERE token_hash = ? AND aktiv = 1").bind(t).first()}o(xr,"mitarbeiterPerTokenHash");async function Xt(e){let{results:t}=await e.DB.prepare("SELECT * FROM artikel WHERE aktiv = 1 ORDER BY kategorie, name").all();return t}o(Xt,"artikelAlle");async function wt(e,t={}){let{results:n}=await e.DB.prepare(`WITH abschnitt AS (
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
      ORDER BY tage_summe DESC`).bind(t.standortId??null,t.abDatum??null).all();return n}o(wt,"vorhaltung");async function xt(e,t=120){let{results:n}=await e.DB.prepare(`SELECT e.id AS einheit_id, e.code, e.bezeichnung,
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
      ORDER BY standort_beendet DESC, tage DESC`).bind(t).all();return n}o(xt,"verlust");async function en(e,t){return e.DB.prepare(`SELECT i.*, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.standort_id = ? AND i.beendet_am IS NULL ORDER BY i.id DESC LIMIT 1`).bind(t).first()}o(en,"inventurOffen");async function kr(e,t){return e.DB.prepare(`SELECT i.*, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.id = ?`).bind(t).first()}o(kr,"inventurPerId");async function kt(e,t,n){let r=await en(e,t);if(r)return r;let i=await e.DB.prepare("SELECT COUNT(*) AS n FROM einheit WHERE standort_id = ? AND aktiv = 1").bind(t).first(),a=await e.DB.prepare(`INSERT INTO inventur (standort_id, gestartet_von, soll_anzahl) VALUES (?, ?, ?)
     RETURNING id`).bind(t,n,i?.n??0).first();return await kr(e,a.id)}o(kt,"inventurStarten");async function yr(e,t,n,r){await e.DB.prepare(`INSERT INTO inventur_treffer (inventur_id, einheit_id, war_woanders)
     VALUES (?, ?, ?) ON CONFLICT DO NOTHING`).bind(t,n,r?1:0).run()}o(yr,"inventurTreffer");async function Oe(e,t){let n=await kr(e,t);if(!n)return null;let{results:r}=await e.DB.prepare(`SELECT e.code, e.bezeichnung, t.war_woanders
       FROM inventur_treffer t JOIN einheit e ON e.id = t.einheit_id
      WHERE t.inventur_id = ? ORDER BY t.zeit DESC`).bind(t).all(),{results:i}=await e.DB.prepare(`SELECT e.id, e.code, e.bezeichnung FROM einheit e
      WHERE e.standort_id = ? AND e.aktiv = 1
        AND e.id NOT IN (SELECT einheit_id FROM inventur_treffer WHERE inventur_id = ?)
      ORDER BY e.code`).bind(n.standort_id,t).all();return{inventur:n,gefunden:r,fehlend:i}}o(Oe,"inventurStand");async function yt(e,t,n){let r=await Oe(e,t);return r?(await e.DB.prepare(`UPDATE inventur SET beendet_am = datetime('now'), ist_anzahl = ?, notiz = ?
      WHERE id = ? AND beendet_am IS NULL`).bind(r.gefunden.length,n??null,t).run(),Oe(e,t)):null}o(yt,"inventurAbschliessen");async function Sr(e,t){let n=await e.DB.prepare(`INSERT INTO meldung (einheit_id, art, text, foto_schluessel, mitarbeiter_id)
     VALUES (?, ?, ?, ?, ?) RETURNING id`).bind(t.einheitId,t.art,t.text??null,t.fotoSchluessel??null,t.mitarbeiterId).first();return(t.art==="beschaedigt"||t.art==="reparatur"||t.art==="ok")&&await e.DB.prepare("UPDATE einheit SET zustand = ? WHERE id = ?").bind(t.art,t.einheitId).run(),n?.id??0}o(Sr,"meldungAnlegen");async function St(e,t=!0){let{results:n}=await e.DB.prepare(`SELECT m.id, m.einheit_id, e.code, e.bezeichnung, m.art, m.text,
            m.foto_schluessel, m.zeit, ma.name AS wer, m.erledigt
       FROM meldung m
       JOIN einheit e ON e.id = m.einheit_id
       LEFT JOIN mitarbeiter ma ON ma.id = m.mitarbeiter_id
      WHERE (?1 = 0 OR m.erledigt = 0)
      ORDER BY m.zeit DESC LIMIT 200`).bind(t?1:0).all();return n}o(St,"meldungen");var tn="wgl_ma",_t="wgl_buero",_r=4*60*60;function Rr(e,t){let n=e.headers.get("Cookie");if(!n)return null;for(let r of n.split(";")){let[i,...a]=r.trim().split("=");if(i===t)return decodeURIComponent(a.join("="))}return null}o(Rr,"cookieLesen");function nn(e,t,n){return`${e}=${encodeURIComponent(t)}; Path=/; Max-Age=${n}; HttpOnly; Secure; SameSite=Lax`}o(nn,"cookieSetzen");function zr(e){return`${e}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`}o(zr,"cookieLoeschen");async function te(e,t){let n=Rr(e,tn);return n?xr(t,await We(n)):null}o(te,"angemeldeterMitarbeiter");var rn=o(e=>`sitzung:${e}`,"sitzungsSchluessel");async function Ie(e,t){let n=await e.SESSIONS.get(rn(t));if(!n)return null;let r=JSON.parse(n);return r.bis>Date.now()?r:null}o(Ie,"sitzungLesen");async function an(e,t,n,r){let i={standortId:n,name:r,bis:Date.now()+_r*1e3};return await e.SESSIONS.put(rn(t),JSON.stringify(i),{expirationTtl:_r}),i}o(an,"sitzungSetzen");async function Ar(e,t){await e.SESSIONS.delete(rn(t))}o(Ar,"sitzungBeenden");async function tt(e,t){let n=t.ADMIN_PASSWORT;if(!n)return!1;let r=Rr(e,_t);return r!==null&&r===await We(n)}o(tt,"istBuero");function Rt(e,t){if(e.length!==t.length)return!1;let n=0;for(let r=0;r<e.length;r++)n|=e.charCodeAt(r)^t.charCodeAt(r);return n===0}o(Rt,"gleichSicher");w();E();v();function Tr(e,t,n,r){let a=(n-e)*Math.PI/180,s=(r-t)*Math.PI/180,l=e*Math.PI/180,d=n*Math.PI/180,p=Math.sin(a/2)**2+Math.sin(s/2)**2*Math.cos(l)*Math.cos(d);return 2*6371*Math.asin(Math.min(1,Math.sqrt(p)))}o(Tr,"entfernungKm");function Ls(e){return new Date(e.replace(" ","T")+"Z")}o(Ls,"alsDatum");function zt(e,t=new Date){let n=t.getTime()-Ls(e).getTime();return Math.max(0,Math.floor(n/864e5))}o(zt,"tageSeit");function Te(e,t=new Date){let n=zt(e,t);return n===0?"seit heute":n===1?"seit gestern":`seit ${n} Tagen`}o(Te,"seitText");w();E();v();w();E();v();w();E();v();function f(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}o(f,"esc");var Ds=`
:root{
  --grund:#f2f5f8; --flaeche:#fff; --flaeche2:#f7f9fb; --flaeche3:#eef2f6;
  --linie:#e0e6ec; --linie2:#c8d2dc;
  --ink:#0d1620; --ink2:#4a5765; --ink3:#76838f;
  --gruen:#0d6e3f; --gruen2:#0a5b33; --gruen-bg:#e6f4ec; --gruen-ink:#0a5b33;
  --blau:#14508c; --blau2:#0f4074; --blau-bg:#e6eef7; --blau-ink:#0f4074;
  --amber:#8a5804; --amber-bg:#fdf1dc; --amber-ink:#7a4d03;
  --rot:#a52e22; --rot2:#8c261c; --rot-bg:#fbe9e7; --rot-ink:#8c261c;
  --signal:#f5b800;
  --r1:8px; --r2:12px; --r3:18px;
  --schatten:0 1px 2px rgba(13,22,32,.06),0 2px 8px rgba(13,22,32,.05);
  --schatten2:0 2px 4px rgba(13,22,32,.06),0 8px 24px rgba(13,22,32,.08);
}
@media (prefers-color-scheme:dark){:root{
  --grund:#0c1117; --flaeche:#151d26; --flaeche2:#1a232e; --flaeche3:#212b37;
  --linie:#26313d; --linie2:#374553;
  --ink:#e7ecf2; --ink2:#a4b1bf; --ink3:#7b8898;
  --gruen:#159154; --gruen2:#0f7b46; --gruen-bg:#0f2a1d; --gruen-ink:#6ede9f;
  --blau:#2872c4; --blau2:#215fa5; --blau-bg:#11202f; --blau-ink:#7fb6ec;
  --amber:#c07c0a; --amber-bg:#2a2011; --amber-ink:#f0bd63;
  --rot:#c0442f; --rot2:#a53a28; --rot-bg:#2b1613; --rot-ink:#f0958a;
  --schatten:0 1px 2px rgba(0,0,0,.4),0 2px 8px rgba(0,0,0,.3);
  --schatten2:0 2px 4px rgba(0,0,0,.4),0 8px 24px rgba(0,0,0,.45);
}}

*,*::before,*::after{box-sizing:border-box}
/* Muss stehen, bevor eigene display-Regeln greifen: die Browservorgabe f\xFCr
   [hidden] ist schw\xE4cher als jedes eigene display, sonst blieben verborgene
   Kn\xF6pfe (Scan beenden, Warteschlange, Hinweise) sichtbar. */
[hidden]{display:none!important}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--grund);color:var(--ink);
  font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
h1,h2,h3{margin:0;line-height:1.2;letter-spacing:-.015em;font-weight:650}
h1{font-size:27px} h2{font-size:19px} h3{font-size:16px}
p{margin:0}
a{color:var(--blau-ink);text-decoration:none}
a:hover{text-decoration:underline}
.zahl,td.zahl,th.zahl{text-align:right;font-variant-numeric:tabular-nums}
.gedaempft{color:var(--ink3)}
.klein{font-size:14px}

/* ---------------------------------------------------------- Baustelle --- */

.balken{background:var(--flaeche);border-bottom:1px solid var(--linie);
  position:sticky;top:0;z-index:20}
.balken .innen{max-width:600px;margin:0 auto;padding:13px 18px;
  display:flex;align-items:center;justify-content:space-between;gap:14px}
.balken .marke{display:flex;align-items:center;gap:9px;font-weight:650;font-size:16px;color:var(--ink)}
.balken .marke::before{content:"";width:4px;height:19px;border-radius:2px;background:var(--signal)}
.balken a{font-size:15px;color:var(--ink2)}

.sitzung{background:var(--gruen);color:#fff;position:sticky;top:53px;z-index:19}
.sitzung .innen{max-width:600px;margin:0 auto;padding:11px 18px;
  display:flex;align-items:center;justify-content:space-between;gap:14px;
  font-size:15px;font-weight:600}
.sitzung a{color:#fff;opacity:.82;font-size:14px;text-decoration:underline}

.bahn{max-width:600px;margin:0 auto;padding:20px 18px 56px}
.bahn>*+*{margin-top:15px}
.bahn h1+p{margin-top:7px}
.bahn h2{margin-top:26px}
/* Eine Auswahl endet, dann kommt etwas anderer Art \u2014 das braucht Luft,
   sonst tippt man Abbrechen statt der letzten Baustelle. */
.wahl+.knopf,.wahl+form{margin-top:24px}
p+.wahl,p+form{margin-top:18px}

.tafel{background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--r3);
  padding:20px;box-shadow:var(--schatten)}
.tafel-akzent{border-left:4px solid var(--signal)}

.kennung{display:inline-block;padding:5px 10px;border-radius:7px;background:var(--flaeche3);
  color:var(--ink2);font:650 14px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.13em}
.titel-gross{font-size:26px;font-weight:650;line-height:1.18;letter-spacing:-.02em;margin-top:12px}

.stueckliste{list-style:none;padding:0;margin:16px 0 0;
  border-top:1px solid var(--linie)}
.stueckliste li{display:flex;align-items:baseline;gap:14px;padding:9px 0;
  border-bottom:1px solid var(--linie);font-size:17px}
.stueckliste li:last-child{border-bottom:0}
.stueckliste .anzahl{flex:0 0 62px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums}
.stueckliste .was{min-width:0}

.standzeit{margin-top:18px;padding-top:16px;border-top:1px solid var(--linie)}
.standzeit .wo{font-size:20px;font-weight:650;display:block;line-height:1.25}
.standzeit .wie-lang{color:var(--ink3);font-size:15px;margin-top:2px;display:block}

/* Kn\xF6pfe: Haupt 92px, Rest 62px \u2014 mit Handschuhen sicher zu treffen. */
button,.knopf{display:block;width:100%;min-height:62px;padding:15px 18px;margin:0;
  font:650 19px/1.3 inherit;letter-spacing:-.01em;text-align:center;text-decoration:none;
  border:1px solid transparent;border-radius:var(--r2);cursor:pointer;
  -webkit-appearance:none;transition:transform .04s,filter .12s}
.knopf small{display:block;font-size:15px;font-weight:450;opacity:.86;margin-top:3px;letter-spacing:0}
.knopf:hover{text-decoration:none;filter:brightness(1.06)}
button:active,.knopf:active{transform:translateY(1px)}
form+form,form+.knopf,.knopf+form,.knopf+.knopf{margin-top:11px}
.tafel+form,.tafel+.knopf{margin-top:16px}

.knopf-haupt{background:var(--gruen);border-color:var(--gruen2);color:#fff;
  min-height:92px;font-size:23px;box-shadow:var(--schatten2)}
.knopf-lager{background:var(--blau);border-color:var(--blau2);color:#fff}
.knopf-zweit{background:var(--flaeche);border-color:var(--linie2);color:var(--ink)}
.knopf-still{background:transparent;border-color:var(--linie);color:var(--ink2);
  min-height:50px;font-size:16px;font-weight:550}
.knopf-warn{background:var(--rot);border-color:var(--rot2);color:#fff}

.wahl{list-style:none;padding:0;margin:0}
.wahl li+li{margin-top:11px}
.wahl .knopf{text-align:left;min-height:66px;font-size:18px;
  display:flex;flex-direction:column;justify-content:center;gap:3px}
.wahl .neben{font-size:14px;font-weight:450;color:var(--ink3)}
.knopf-lager .neben{color:rgba(255,255,255,.8)}

/* --------------------------------------------------------- Meldungen --- */

.notiz{border-radius:var(--r2);padding:14px 16px;border:1px solid;font-size:16px;line-height:1.45}
.notiz strong{display:block;font-weight:650}
.notiz-erfolg{background:var(--gruen-bg);border-color:color-mix(in srgb,var(--gruen) 26%,transparent);color:var(--gruen-ink)}
.notiz-hinweis{background:var(--amber-bg);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--amber-ink)}
.notiz-fehler{background:var(--rot-bg);border-color:color-mix(in srgb,var(--rot) 30%,transparent);color:var(--rot-ink)}

.pille{display:inline-block;padding:3px 9px;border-radius:99px;font-size:12.5px;font-weight:650;
  letter-spacing:.02em;white-space:nowrap}
.pille-lager{background:var(--blau-bg);color:var(--blau-ink)}
.pille-baustelle{background:var(--amber-bg);color:var(--amber-ink)}
.pille-warn{background:var(--rot-bg);color:var(--rot-ink)}
.pille-ok{background:var(--gruen-bg);color:var(--gruen-ink)}
.pille-ruhig{background:var(--flaeche3);color:var(--ink2)}

/* ------------------------------------------------------------- B\xFCro --- */

.buero{display:grid;grid-template-columns:236px minmax(0,1fr);min-height:100vh}
.leiste{background:var(--flaeche);border-right:1px solid var(--linie);padding:20px 12px 32px;
  position:sticky;top:0;height:100vh;overflow-y:auto}
.leiste .marke{display:flex;align-items:center;gap:10px;padding:0 10px 18px;
  font-weight:700;font-size:16px;letter-spacing:-.01em;color:var(--ink)}
.leiste .marke::before{content:"";width:4px;height:22px;border-radius:2px;background:var(--signal)}
.leiste .gruppe{display:block;margin-top:18px;padding:0 10px 7px;font-size:11.5px;
  font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--ink3)}
.leiste .gruppe:first-child{margin-top:0}
.leiste a{display:block;padding:9px 10px;border-radius:var(--r1);color:var(--ink2);
  font-size:15px;font-weight:550}
.leiste a:hover{background:var(--flaeche3);color:var(--ink);text-decoration:none}
.leiste a.aktiv{background:var(--blau-bg);color:var(--blau-ink);font-weight:650}
.leiste .trenner{display:block;height:1px;background:var(--linie);margin:20px 10px 12px}
.leiste a.nebensache{font-size:14px;color:var(--ink3)}

.inhalt{padding:30px 34px 72px;max-width:1120px;min-width:0}
.kopfzeile{display:flex;align-items:flex-start;justify-content:space-between;
  gap:20px;flex-wrap:wrap;margin-bottom:24px}
.kopfzeile .unter{color:var(--ink3);font-size:15px;margin-top:5px;max-width:60ch}
.kopfzeile .werkzeuge{display:flex;gap:10px;flex-wrap:wrap}
.kopfzeile .werkzeuge .knopf{width:auto;min-height:42px;padding:9px 16px;font-size:15px}

@media (max-width:900px){
  .buero{grid-template-columns:1fr}
  .leiste{position:static;height:auto;border-right:0;border-bottom:1px solid var(--linie);
    padding:12px 0 0}
  .leiste .marke{padding:0 16px 11px}
  /* Auf dem Handy wird aus der gruppierten Liste eine einzige Rolleiste \u2014
     drei umbrechende Reihen schieben den Inhalt sonst aus dem Bild. */
  .leiste .gruppe{display:none}
  .leiste .navi{display:flex;align-items:center;gap:7px;overflow-x:auto;padding:0 16px 12px;
    scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .leiste .navi::-webkit-scrollbar{display:none}
  .leiste .navi a{white-space:nowrap;padding:8px 15px;border-radius:99px;
    background:var(--flaeche3);font-size:14.5px}
  .leiste .navi a.aktiv{background:var(--blau);color:#fff}
  .leiste .trenner{flex:0 0 1px;height:22px;margin:0 3px}
  .inhalt{padding:20px 16px 64px}
}

/* ----------------------------------------------------------- Kacheln --- */

.kacheln{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(168px,1fr));
  margin-bottom:26px}
.kachel{background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--r2);
  padding:16px 18px;box-shadow:var(--schatten);position:relative;overflow:hidden}
.kachel::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--linie2)}
.kachel-blau::before{background:var(--blau)}
.kachel-gruen::before{background:var(--gruen)}
.kachel-amber::before{background:var(--amber)}
.kachel-rot::before{background:var(--rot)}
.kachel .wert{font-size:33px;font-weight:700;line-height:1.05;letter-spacing:-.03em}
.kachel-rot .wert{color:var(--rot-ink)}
.kachel .schild{font-size:14px;color:var(--ink2);margin-top:5px;font-weight:550}
.kachel .zusatz{font-size:13px;color:var(--ink3);margin-top:3px}

/* ------------------------------------------------ Abschnitte, Tabellen --- */

.abschnitt{background:var(--flaeche);border:1px solid var(--linie);border-radius:var(--r2);
  box-shadow:var(--schatten);margin-bottom:22px;overflow:hidden}
.abschnitt>.kopf{display:flex;align-items:baseline;justify-content:space-between;gap:14px;
  flex-wrap:wrap;padding:15px 18px;border-bottom:1px solid var(--linie);background:var(--flaeche2)}
.abschnitt>.kopf h2{font-size:16.5px}
.abschnitt>.kopf .beitext{font-size:13.5px;color:var(--ink3);font-weight:450}
.abschnitt>.koerper{padding:18px}
.abschnitt>.koerper>p:first-child{margin-top:0}

table{width:100%;border-collapse:collapse;font-size:15px}
thead th{text-align:left;padding:10px 18px;font-size:12px;font-weight:700;letter-spacing:.06em;
  text-transform:uppercase;color:var(--ink3);background:var(--flaeche2);
  border-bottom:1px solid var(--linie);white-space:nowrap}
tbody td{padding:12px 18px;border-bottom:1px solid var(--linie);vertical-align:top}
tbody tr:last-child td{border-bottom:0}
tbody tr:hover{background:var(--flaeche2)}
td .zweitzeile{display:block;color:var(--ink3);font-size:13.5px;margin-top:2px}
td form{display:inline}
td .knopf{width:auto;min-height:34px;padding:5px 12px;font-size:13.5px;font-weight:600}
.rollrahmen{overflow-x:auto}

@media (max-width:720px){
  .stapel thead{display:none}
  .stapel tbody tr{display:block;padding:13px 16px;border-bottom:1px solid var(--linie)}
  .stapel tbody tr:hover{background:transparent}
  .stapel tbody td{display:flex;gap:16px;justify-content:space-between;align-items:baseline;
    padding:3px 0;border:0;text-align:right}
  .stapel tbody td::before{content:attr(data-l);color:var(--ink3);font-size:13px;font-weight:650;
    text-align:left;flex:0 0 auto}
  .stapel tbody td:first-child{display:block;text-align:left;font-size:16px;
    font-weight:650;padding-bottom:8px}
  .stapel tbody td:first-child::before{display:none}
  .stapel tbody td:first-child .zweitzeile{font-weight:450}
  .stapel tbody td:empty{display:none}
}

.leer{padding:34px 18px;text-align:center;color:var(--ink3)}
.leer strong{display:block;color:var(--ink2);font-size:16px;margin-bottom:5px}

/* --------------------------------------------------------- Formulare --- */

label{display:block;font-weight:600;font-size:14.5px;margin-bottom:6px;color:var(--ink2)}
input[type=text],input[type=password],input[type=number],input[type=file],select,textarea{
  width:100%;min-height:48px;padding:11px 13px;font:16px inherit;color:var(--ink);
  background:var(--flaeche);border:1px solid var(--linie2);border-radius:var(--r1);
  transition:border-color .12s,box-shadow .12s}
input:focus,select:focus,textarea:focus{outline:0;border-color:var(--blau);
  box-shadow:0 0 0 3px color-mix(in srgb,var(--blau) 18%,transparent)}
.feld{margin-bottom:15px}
.feld:last-of-type{margin-bottom:19px}
.felder-zwei{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.filter{display:flex;gap:10px;align-items:center;margin-bottom:18px;flex-wrap:wrap}
.filter input{max-width:340px;min-height:42px}
.filter .knopf{width:auto;min-height:42px;padding:8px 16px;font-size:15px}

/* Fortschritt der Inventur */
.balkenanzeige{height:10px;border-radius:99px;background:var(--flaeche3);overflow:hidden;margin:12px 0 9px}
.balkenanzeige>span{display:block;height:100%;background:var(--gruen);border-radius:99px;
  transition:width .3s}

.fussnote{margin-top:26px;text-align:center;color:var(--ink3);font-size:14px}
`;function K(e,t){let n=t.roh?e:`${t.kopf??""}${t.banner??""}<div class="bahn">${e}</div>`;return`<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f2f5f8" media="(prefers-color-scheme:light)">
<meta name="theme-color" content="#0c1117" media="(prefers-color-scheme:dark)">
<meta name="robots" content="noindex,nofollow">
<title>${f(t.titel)}</title>
<style>${Ds}</style>
</head>
<body>
${n}
${t.scripte??""}
</body>
</html>`}o(K,"seite");function J(e,t){return`<header class="balken"><div class="innen">
    <span class="marke">${f(e)}</span>
    ${t?`<a href="${f(t.href)}">${f(t.text)}</a>`:""}
  </div></header>`}o(J,"kopf");function q(e,t=200,n={}){return new Response(e,{status:t,headers:{"Content-Type":"text/html; charset=utf-8",...n}})}o(q,"html");function Y(e,t,n){return`<div class="notiz notiz-${e}"><strong>${f(t)}</strong>${n?f(n):""}</div>`}o(Y,"notiz");function ne(e,t){return`<span class="pille pille-${t}">${f(e)}</span>`}o(ne,"pille");function oe(e,t,n){if(t.length===0)return`<div class="leer"><strong>Nichts da</strong>${f(n??"")}</div>`;let r=e.map(a=>`<th${a.zahl?' class="zahl"':""}>${f(a.titel)}</th>`).join(""),i=t.map(a=>`<tr>${a.map((s,l)=>{let d=e[l];return`<td${d?.zahl?' class="zahl"':""} data-l="${f(d?.titel??"")}">${s}</td>`}).join("")}</tr>`).join("");return`<div class="rollrahmen"><table class="stapel">
    <thead><tr>${r}</tr></thead><tbody>${i}</tbody></table></div>`}o(oe,"tabelle");function re(e,t){return`<section class="abschnitt">
    <div class="kopf"><h2>${f(e.titel)}</h2>${e.beitext?`<span class="beitext">${f(e.beitext)}</span>`:""}</div>
    ${e.gepolstert?`<div class="koerper">${t}</div>`:t}
  </section>`}o(re,"abschnitt");function $r(e){return`<div class="kacheln">${e.map(t=>`<div class="kachel${t.ton?` kachel-${t.ton}`:""}">
    <div class="wert">${f(t.wert)}</div>
    <div class="schild">${f(t.schild)}</div>
    ${t.zusatz?`<div class="zusatz">${f(t.zusatz)}</div>`:""}
  </div>`).join("")}</div>`}o($r,"kacheln");function ge(e,t,n){return`<div class="kopfzeile"><div>
      <h1>${f(e)}</h1>
      ${t?`<p class="unter">${f(t)}</p>`:""}
    </div>${n?`<div class="werkzeuge">${n}</div>`:""}</div>`}o(ge,"kopfzeile");function sn(e,t,n){let r=[],i=e.standort_typ==="lager",a=t!==null&&t.standortId===e.standort_id;return t&&!a&&r.push({art:"haupt",label:"Hierher buchen",unter:t.name,zielId:t.standortId}),n&&e.standort_id!==n.id&&r.push({art:t||r.length?"lager":"haupt",label:"Zur\xFCck ins Lager",unter:t?n.name:void 0,zielId:n.id}),r.push({art:r.length===0?"haupt":"zweit",label:i?"Auf Baustelle buchen":"Auf andere Baustelle",href:`/t/${e.code}/wohin`}),r}o(sn,"aktionenFuer");function ce(e){return Number.isInteger(e)?String(e):e.toFixed(1).replace(".",",")}o(ce,"formatMenge");function At(e){return{ok:"in Ordnung",beschaedigt:"besch\xE4digt",reparatur:"in Reparatur",ausgemustert:"ausgemustert"}[e]??e}o(At,"zustandText");function Bs(e){return e.length===0?"":`<ul class="stueckliste">${e.map(t=>`<li><span class="anzahl">${f(ce(t.menge))}\xD7</span><span class="was">${f(t.name)}</span></li>`).join("")}</ul>`}o(Bs,"stueckliste");function Ps(e,t){let n=`knopf knopf-${e.art}`,r=`${f(e.label)}${e.unter?`<small>${f(e.unter)}</small>`:""}`;if(e.href)return`<a class="${n}" href="${f(e.href)}">${r}</a>`;let i=e.posten?.url??"/api/buchung",a=e.posten?.felder??{code:t,ziel:String(e.zielId)},s=e.posten?"":" data-buchung",l=Object.entries(a).map(([d,p])=>`<input type="hidden" name="${f(d)}" value="${f(p)}">`).join("");return`<form method="post" action="${f(i)}"${s}>${l}
    <button class="${n}" type="submit">${r}</button>
  </form>`}o(Ps,"knopf");function Nr(e,t,n){return{art:"haupt",label:"\u2713 Hier gefunden",unter:`Inventur ${n}`,posten:{url:"/api/inventur/treffer",felder:{code:t,inventur:String(e)}}}}o(Nr,"inventurAktion");function Me(e){if(!e)return"";let t=Math.max(0,Math.round((e.bis-Date.now())/6e4)),n=t>=60?`noch ${Math.floor(t/60)} Std ${t%60} Min`:`noch ${t} Min`;return`<div class="sitzung"><div class="innen">
    <span>\u{1F4CD} ${f(e.name)}</span>
    <span>${f(n)} \xB7 <a href="/sitzung/beenden">beenden</a></span>
  </div></div>`}o(Me,"sitzungsBanner");function Or(e){let{einheit:t}=e,n=e.meldung?Y(e.meldung.art,e.meldung.text):"",r=e.stornoId?`<form method="post" action="/api/storno">
         <input type="hidden" name="id" value="${e.stornoId}">
         <input type="hidden" name="code" value="${f(t.code)}">
         <button class="knopf knopf-still" type="submit">\u21A9 R\xFCckg\xE4ngig</button>
       </form>`:"",i=`
${n}
<article class="tafel tafel-akzent">
  <span class="kennung">${f(t.code)}</span>
  <h1 class="titel-gross">${f(t.bezeichnung)}</h1>
  ${t.zustand!=="ok"?`<p style="margin-top:10px">${ne(At(t.zustand),"warn")}</p>`:""}
  ${Bs(e.inhalt)}
  <div class="standzeit">
    <span class="wo">${f(t.standort_name)}</span>
    <span class="wie-lang">${f(Te(t.seit))}</span>
  </div>
</article>
${e.aktionen.map(a=>Ps(a,t.code)).join("")}
${r}
<a class="knopf knopf-still" href="/t/${f(t.code)}/melden">Schaden melden</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>`;return q(K(i,{titel:`${t.code} \xB7 ${t.bezeichnung}`,kopf:J("Lager",{href:"/",text:"\xDCbersicht"}),banner:Me(e.sitzung),scripte:'<script src="/app.js"><\/script>'}))}o(Or,"einheitSeite");function Ir(e){let t=e.standorte.map(i=>{let a=i.entfernungKm!==void 0?i.entfernungKm<1?`${Math.round(i.entfernungKm*1e3)} m entfernt`:`${i.entfernungKm.toFixed(1).replace(".",",")} km entfernt`:i.adresse??"";return`<li><form method="post" action="/api/buchung" data-buchung>
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
<p class="gedaempft">${f(e.bezeichnung)}</p>
${e.standorte.length===0?`<div class="tafel"><p><strong>Keine Standorte angelegt.</strong></p>
       <p class="gedaempft klein" style="margin-top:6px">Das B\xFCro muss zuerst
       Baustellen anlegen.</p></div>`:`<ul class="wahl">${t}</ul>`}
<a class="knopf knopf-still" href="/t/${f(e.code)}">Abbrechen</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>`;return q(K(r,{titel:"Wohin?",kopf:J("Ziel w\xE4hlen",{href:`/t/${e.code}`,text:"Zur\xFCck"}),banner:Me(e.sitzung),scripte:`<script src="/app.js"><\/script>${n}`}))}o(Ir,"wohinSeite");function Mr(e,t,n){let r=`
<article class="tafel tafel-akzent" style="text-align:center">
  <p class="gedaempft" style="font-size:15px">Eigentum der</p>
  <h1 style="font-size:24px;margin-top:6px">${f(t)}</h1>
  <div class="standzeit" style="border-top-color:var(--linie)">
    <span class="wo">${f(e.bezeichnung)}</span>
    <span class="kennung" style="margin-top:9px">${f(e.code)}</span>
  </div>
</article>
<p style="text-align:center" class="gedaempft">Gefunden? Bitte melden:</p>
<a class="knopf knopf-haupt" href="tel:${f(n.replace(/\s/g,""))}">${f(n)}</a>
<p class="fussnote">Mitarbeiter? Dann fehlt auf diesem Handy die Einrichtung \u2014
  bitte im B\xFCro melden.</p>`;return q(K(r,{titel:t,kopf:J(t)}))}o(Mr,"fremdSeite");function nt(e){let t=`
${Y("fehler","Unbekannter Tag",`Der Code ${e} ist nicht vergeben.`)}
<form method="get" action="/t">
  <div class="feld"><label for="code">Vertippt? Code vom Aufkleber eingeben</label>
    <input type="text" id="code" name="code" autocapitalize="characters"
      autocomplete="off" placeholder="z. B. K7F2QX" value="${f(e)}"></div>
  <button class="knopf knopf-lager" type="submit">Suchen</button>
</form>
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return q(K(t,{titel:"Unbekannter Tag",kopf:J("Lager")}),404)}o(nt,"unbekannterTag");function Cr(e,t){let n=`
<h1>Melden</h1>
<p class="gedaempft">${f(e.code)} \xB7 ${f(e.bezeichnung)}</p>
<form method="post" action="/t/${f(e.code)}/melden" enctype="multipart/form-data">
  <div class="tafel">
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
<a class="knopf knopf-still" href="/t/${f(e.code)}">Abbrechen</a>`;return q(K(n,{titel:"Melden",kopf:J("Melden",{href:`/t/${e.code}`,text:"Zur\xFCck"})}))}o(Cr,"meldenSeite");var Hs="0.1.0",Fs="2024-11-05",Lr=[{name:"bestand",description:'Materialbestand je Artikel und Standort. Z\xE4hlt Inhalt von Ladungstr\xE4gern und separat getaggte Einzelteile zusammen. Ohne Filter kommt der Gesamtbestand \xFCber alle Standorte. F\xFCr "wie viel liegt im Lager" den Standort auf das Lager setzen.',inputSchema:{type:"object",properties:{artikel:{type:"string",description:'Filtert auf Artikel, deren Name den Text enth\xE4lt, z. B. "Rahmen"'},standort:{type:"string",description:"Filtert auf einen Standort (Name oder ID)"}}},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(t.standort&&n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await Xe(e,{standortId:n??void 0,artikelSuche:t.artikel});if(r.length===0)return"Kein Bestand gefunden.";let i=new Map;for(let s of r){let l=i.get(s.artikel)??[];l.push(s),i.set(s.artikel,l)}let a=[];for(let[s,l]of i){let d=l.reduce((I,F)=>I+F.menge,0),p=l[0].mengeneinheit,y=l.map(I=>`  ${I.standort} (${I.standort_typ}): ${ce(I.menge)}`).join(`
`);a.push(`${s} \u2014 gesamt ${ce(d)} ${p}
${y}`)}return a.join(`

`)}},{name:"einheit",description:'Alles zu einer Einheit: Bezeichnung, Inhalt, aktueller Standort, wie lange sie dort steht, und die vollst\xE4ndige Bewegungshistorie. Nimmt den sprechenden Code (z. B. "GB-047") oder den Tag-Code vom Aufkleber (z. B. "K7F2QX").',inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten-Code oder Tag-Code"}},required:["code"]},async ausfuehren(e,t){let n=await Tt(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await Ye(e,n.id),i=await Et(e,n.id,20),a=r.length?r.map(l=>`  ${ce(l.menge)}\xD7 ${l.name}`).join(`
`):"  (kein Inhalt erfasst)",s=i.length?i.map(l=>`  ${l.zeit.slice(0,16)} \xB7 ${l.von??"\u2014"} \u2192 ${l.nach} \xB7 ${l.wer??"unbekannt"} (${l.quelle})`).join(`
`):"  (noch keine Bewegungen)";return[`${n.code} \u2014 ${n.bezeichnung} (${n.typ})`,`Standort: ${n.standort_name} (${n.standort_typ}), ${Te(n.seit)}`,`Zustand: ${n.zustand}`,`Inhalt:
${a}`,`Historie:
${s}`].join(`
`)}},{name:"baustelle_bestand",description:'Was steht auf einer Baustelle, seit wann und wie viele Vorhaltetage sind aufgelaufen. Grundlage f\xFCr die Frage "k\xF6nnen wir das Ger\xFCst abrechnen" und f\xFCr die R\xE4umung nach Bauende.',inputSchema:{type:"object",properties:{standort:{type:"string",description:"Name oder ID der Baustelle"}},required:["standort"]},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await fe(e,n),i=await Qt(e,n);if(i.length===0)return`${r?.name}: kein Material vor Ort.`;let a=i.map(p=>`  ${p.code} \u2014 ${p.bezeichnung} \xB7 ${zt(p.seit)} Vorhaltetage (${Te(p.seit)})`),s=Math.max(...i.map(p=>zt(p.seit))),l=await Xe(e,{standortId:n}),d=l.length?l.map(p=>`  ${ce(p.menge)} ${p.mengeneinheit} ${p.artikel}`).join(`
`):"  (kein Inhalt erfasst)";return[`${r?.name} (${r?.typ}${r?.aktiv?"":", beendet"})`,`${i.length} Einheiten vor Ort, l\xE4ngste Vorhaltung ${s} Tage`,`Material:
${d}`,`Einheiten:
${a.join(`
`)}`].join(`
`)}},{name:"ueberfaellig",description:"Material, das zu lange drau\xDFen steht \u2014 der eigentliche Hebel gegen Materialverlust. Liefert zwei F\xE4lle: l\xE4nger als die Schwelle auf einer Baustelle, und Material auf bereits abgeschlossenen Baustellen (der teure Fall, dort r\xE4umt niemand mehr auf). Nennt auch, wer zuletzt gebucht hat \u2014 um nachfragen zu k\xF6nnen, solange sich noch jemand erinnert.",inputSchema:{type:"object",properties:{schwelle_tage:{type:"number",description:"Ab wie vielen Tagen auf einer Baustelle als \xFCberf\xE4llig gilt. Standard 56 (acht Wochen)."}}},async ausfuehren(e,t){let n=typeof t.schwelle_tage=="number"?t.schwelle_tage:56,r=await et(e,n);if(r.length===0)return`Nichts \xFCberf\xE4llig (Schwelle ${n} Tage).`;let i=r.filter(d=>d.baustelle_beendet),a=r.filter(d=>!d.baustelle_beendet),s=o(d=>d.map(p=>`  ${p.code} \u2014 ${p.bezeichnung} \xB7 ${p.standort} \xB7 ${p.tage} Tage \xB7 zuletzt gebucht von ${p.zuletzt_gebucht_von??"unbekannt"}`).join(`
`),"block"),l=[`${r.length} Einheiten \xFCberf\xE4llig (Schwelle ${n} Tage).`];return i.length&&l.push(`Auf beendeten Baustellen (${i.length}):
${s(i)}`),a.length&&l.push(`\xDCber der Schwelle (${a.length}):
${s(a)}`),l.join(`

`)}},{name:"suche",description:'Freitextsuche \xFCber Einheiten, Standorte und Artikel. N\xFCtzlich, wenn nur ein Bruchst\xFCck bekannt ist \u2014 "Elbchaussee", "Treppenturm", "GB-04".',inputSchema:{type:"object",properties:{text:{type:"string"}},required:["text"]},async ausfuehren(e,t){let n=await wr(e,String(t.text));return n.length===0?`Nichts zu "${t.text}" gefunden.`:n.map(r=>`${r.art}: ${r.titel} (${r.zusatz})`).join(`
`)}},{name:"vorhaltung",description:'Vorhaltetage je Baustelle \u2014 Grundlage f\xFCr die Abrechnung der Mietdauer. "Einheitentage" ist die Summe \xFCber alle Einheiten (3 Gitterboxen \xD7 67 Tage = 201), nicht die Kalenderdauer der Baustelle. Das ist die Zahl, die bei Streit \xFCber die Mietdauer z\xE4hlt.',inputSchema:{type:"object",properties:{standort:{type:"string",description:"Auf eine Baustelle einschr\xE4nken"},ab_datum:{type:"string",description:"Nur Abschnitte, die nach diesem Datum endeten (JJJJ-MM-TT)"}}},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(t.standort&&n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await wt(e,{standortId:n??void 0,abDatum:t.ab_datum});return r.length===0?"Keine Vorhaltung erfasst.":r.map(i=>`${i.standort}${i.aktiv?"":" (beendet)"}: ${i.tage_summe} Einheitentage \xB7 ${i.einheiten} Einheiten \xB7 l\xE4ngste ${i.tage_max} Tage \xB7 erste Lieferung ${i.erste_lieferung?.slice(0,10)??"?"}`).join(`
`)}},{name:"verlust",description:'Material, das als verloren gelten muss: auf abgeschlossener Baustelle oder l\xE4nger als die Schwelle ohne jede Bewegung. Anders als "ueberfaellig" mit Inhaltsangabe \u2014 f\xFCr die Frage, was der Schwund an St\xFCckzahlen gekostet hat.',inputSchema:{type:"object",properties:{schwelle_tage:{type:"number",description:"Standard 120 Tage"}}},async ausfuehren(e,t){let n=typeof t.schwelle_tage=="number"?t.schwelle_tage:120,r=await xt(e,n);return r.length===0?`Kein Verlustverdacht (Schwelle ${n} Tage).`:r.map(i=>`${i.code} \u2014 ${i.bezeichnung} \xB7 ${i.standort}${i.standort_beendet?" (beendet)":""} \xB7 ${i.tage} Tage \xB7 Inhalt: ${i.inhalt??"nicht erfasst"} \xB7 zuletzt gebucht von ${i.zuletzt_von??"unbekannt"}`).join(`
`)}},{name:"meldungen",description:"Schadens- und Zustandsmeldungen von der Baustelle. Standard: nur offene.",inputSchema:{type:"object",properties:{alle:{type:"boolean",description:"Auch erledigte einbeziehen"}}},async ausfuehren(e,t){let n=await St(e,!t.alle);return n.length===0?"Keine Meldungen.":n.map(r=>`${r.zeit.slice(0,16)} \xB7 ${r.code} (${r.bezeichnung}) \xB7 ${r.art}${r.text?` \xB7 "${r.text}"`:""} \xB7 ${r.wer??"unbekannt"}${r.erledigt?" [erledigt]":""}`).join(`
`)}},{name:"buchung_anlegen",description:"Bucht eine Einheit auf einen anderen Standort \u2014 f\xFCr Korrekturen aus dem B\xFCro. Der Normalweg ist das Scannen vor Ort; dieses Werkzeug ist f\xFCr F\xE4lle, in denen das nachweislich nicht passiert ist. Steht die Einheit schon dort, passiert nichts.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder Tag-Code"},standort:{type:"string",description:"Zielstandort (Name oder ID)"},notiz:{type:"string"}},required:["code","standort"]},async ausfuehren(e,t){let n=await Tt(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await Ce(e,t.standort);if(r===null)return`Standort "${t.standort}" nicht gefunden.`;if((await Qe(e,{einheitId:n.id,nachStandortId:r,mitarbeiterId:null,quelle:"mcp",notiz:t.notiz??"Korrektur aus dem B\xFCro"}))?.unveraendert)return`${n.code} stand bereits dort \u2014 nichts ge\xE4ndert.`;let a=await fe(e,r);return`${n.code} gebucht: ${n.standort_name} \u2192 ${a?.name}.`}},{name:"einheit_anlegen",description:'Legt eine neue Einheit an und erzeugt dazu einen Tag-Code. Der Code muss anschlie\xDFend \xFCber /buero/etiketten gedruckt und auf den Chip geschrieben werden. Typ "traeger" f\xFCr Gitterbox/Stapel/B\xFCndel, "einzelteil" f\xFCr Treppenturm/Winde.',inputSchema:{type:"object",properties:{code:{type:"string",description:'Sprechender Code, z. B. "GB-047"'},bezeichnung:{type:"string"},typ:{type:"string",enum:["traeger","einzelteil"]},standort:{type:"string",description:"Wo sie gerade steht"}},required:["code","bezeichnung","standort"]},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=String(t.code).trim().toUpperCase();if(await Ve(e,r))return`Code ${r} ist schon vergeben.`;let i=t.typ==="einzelteil"?"einzelteil":"traeger",a=await e.DB.prepare(`INSERT INTO einheit (code, typ, bezeichnung, standort_id) VALUES (?, ?, ?, ?)
         RETURNING id`).bind(r,i,String(t.bezeichnung),n).first(),s=await Ae(e,"einheit",a.id);return await e.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, quelle, notiz)
         VALUES (?, NULL, ?, 'mcp', 'Ersterfassung')`).bind(a.id,n).run(),`${r} angelegt. Tag-Code: ${s} \u2014 Etikett drucken und den Chip damit beschreiben.`}},{name:"inhalt_setzen",description:"Setzt die Menge eines Artikels in einem Ladungstr\xE4ger. Menge 0 entfernt die Zeile. Ersetzt die bisherige Menge, addiert nicht.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder Tag-Code"},artikel:{type:"string",description:"Artikelname (Teiltreffer gen\xFCgt)"},menge:{type:"number"}},required:["code","artikel","menge"]},async ausfuehren(e,t){let n=await Tt(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await e.DB.prepare(`SELECT id, name FROM artikel WHERE aktiv = 1 AND (name = ?1 OR name LIKE ?2)
          ORDER BY LENGTH(name) LIMIT 1`).bind(String(t.artikel),`%${t.artikel}%`).first();if(!r)return`Artikel "${t.artikel}" nicht gefunden.`;let i=Number(t.menge);return i<=0?(await e.DB.prepare("DELETE FROM inhalt WHERE einheit_id = ? AND artikel_id = ?").bind(n.id,r.id).run(),`${r.name} aus ${n.code} entfernt.`):(await e.DB.prepare(`INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES (?, ?, ?)
         ON CONFLICT (einheit_id, artikel_id) DO UPDATE SET menge = excluded.menge`).bind(n.id,r.id,i).run(),`${n.code}: ${i}\xD7 ${r.name}.`)}},{name:"standort_anlegen",description:"Legt eine Baustelle oder ein Lager an und erzeugt einen Standort-Tag. Wird der geklebt und angetippt, geht danach jede Einheit mit einem einzigen Tap dorthin. Koordinaten sorgen daf\xFCr, dass die Baustelle in der Auswahl nach oben rutscht.",inputSchema:{type:"object",properties:{name:{type:"string"},adresse:{type:"string"},typ:{type:"string",enum:["baustelle","lager"]},lat:{type:"number"},lon:{type:"number"}},required:["name"]},async ausfuehren(e,t){let n=t.typ==="lager"?"lager":"baustelle",r=await e.DB.prepare(`INSERT INTO standort (name, typ, adresse, lat, lon) VALUES (?, ?, ?, ?, ?)
         RETURNING id`).bind(String(t.name),n,t.adresse??null,typeof t.lat=="number"?t.lat:null,typeof t.lon=="number"?t.lon:null).first(),i=await Ae(e,"standort",r.id);return`${t.name} angelegt (${n}). Standort-Tag: ${i}.`}},{name:"standort_beenden",description:'Schlie\xDFt eine Baustelle ab. Material, das danach noch dort steht, taucht sofort in "ueberfaellig" und "verlust" auf \u2014 das ist der teure Fall, weil dort niemand mehr aufr\xE4umt.',inputSchema:{type:"object",properties:{standort:{type:"string"}},required:["standort"]},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;await e.DB.prepare(`UPDATE standort SET aktiv = 0, beendet_am = datetime('now')
          WHERE id = ? AND typ = 'baustelle'`).bind(n).run();let r=await Qt(e,n),i=await fe(e,n);return r.length===0?`${i?.name} beendet. Kein Material mehr vor Ort.`:`${i?.name} beendet. ACHTUNG: ${r.length} Einheiten stehen noch dort:
`+r.map(a=>`  ${a.code} \u2014 ${a.bezeichnung}`).join(`
`)}},{name:"tag_zuordnen",description:"Erzeugt einen Ersatz-Tag f\xFCr eine bestehende Einheit \u2014 f\xFCr abgerissene oder defekte Chips. Der alte Tag bleibt g\xFCltig, sofern er noch lesbar ist; die Historie der Einheit bleibt in jedem Fall erhalten.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder alter Tag-Code"}},required:["code"]},async ausfuehren(e,t){let n=await Tt(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await Ae(e,"einheit",n.id);return`Neuer Tag-Code f\xFCr ${n.code}: ${r}. Etikett drucken, Chip beschreiben, schreibsch\xFCtzen.`}},{name:"inventur_start",description:'Startet einen Inventurlauf f\xFCr einen Standort. Danach z\xE4hlt jeder Scan vor Ort als "gefunden"; Einheiten, die laut System woanders stehen, werden automatisch hierher gebucht. Was am Ende offen bleibt, ist die Fehlliste.',inputSchema:{type:"object",properties:{standort:{type:"string"}},required:["standort"]},async ausfuehren(e,t){let n=await Ce(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await kt(e,n,null);return`Inventur ${r.id} f\xFCr ${r.standort} l\xE4uft. Soll: ${r.soll_anzahl} Einheiten.`}},{name:"inventur_stand",description:"Zeigt Fortschritt und Fehlliste eines Inventurlaufs.",inputSchema:{type:"object",properties:{inventur_id:{type:"number"}},required:["inventur_id"]},async ausfuehren(e,t){let n=await Oe(e,Number(t.inventur_id));if(!n)return"Inventur nicht gefunden.";let{inventur:r,gefunden:i,fehlend:a}=n,s=i.filter(l=>l.war_woanders);return[`Inventur ${r.id} \xB7 ${r.standort} \xB7 ${r.beendet_am?"abgeschlossen":"l\xE4uft"}`,`${i.length} von ${r.soll_anzahl??i.length+a.length} gefunden, ${a.length} fehlen`,s.length?`Hier gefunden, im System woanders (${s.length}):
`+s.map(l=>`  ${l.code} \u2014 ${l.bezeichnung}`).join(`
`):"",a.length?`Fehlt:
`+a.map(l=>`  ${l.code} \u2014 ${l.bezeichnung}`).join(`
`):""].filter(Boolean).join(`
`)}},{name:"inventur_abschluss",description:"Schlie\xDFt einen Inventurlauf ab und liefert das Ergebnis samt Fehlliste.",inputSchema:{type:"object",properties:{inventur_id:{type:"number"},notiz:{type:"string"}},required:["inventur_id"]},async ausfuehren(e,t){let n=await yt(e,Number(t.inventur_id),t.notiz);if(!n)return"Inventur nicht gefunden.";let{inventur:r,gefunden:i,fehlend:a}=n;return[`Inventur ${r.id} \xB7 ${r.standort} abgeschlossen.`,`Soll ${r.soll_anzahl}, Ist ${i.length}, Differenz ${a.length}.`,a.length?`Fehlt:
`+a.map(s=>`  ${s.code} \u2014 ${s.bezeichnung}`).join(`
`):"Alles gefunden."].join(`
`)}}];async function Ce(e,t){if(t==null||t==="")return null;let n=Number(t);if(Number.isInteger(n)&&n>0)return await fe(e,n)?n:null;let r=await xe(e),i=String(t).toLowerCase(),a=r.find(l=>l.name.toLowerCase()===i);return a?a.id:r.find(l=>l.name.toLowerCase().includes(i))?.id??null}o(Ce,"standortAufloesen");async function Tt(e,t){let n=await Ve(e,t);if(n)return n;let r=await e.DB.prepare("SELECT ziel_id FROM tag WHERE code = ? AND ziel_typ = 'einheit' AND aktiv = 1").bind(t.toUpperCase()).first();return r?qe(e,r.ziel_id):null}o(Tt,"einheitAufloesen");function rt(e,t){return{jsonrpc:"2.0",id:e,result:t}}o(rt,"ergebnis");function $t(e,t,n){return{jsonrpc:"2.0",id:e,error:{code:t,message:n}}}o($t,"fehler");async function Dr(e,t){if(!t.MCP_TOKEN)return Response.json({error:"MCP_TOKEN nicht gesetzt"},{status:503});let n=e.headers.get("Authorization")??"",r=n.startsWith("Bearer ")?n.slice(7):"";if(!Rt(r,t.MCP_TOKEN))return Response.json({error:"Nicht autorisiert"},{status:401,headers:{"WWW-Authenticate":"Bearer"}});let i;try{i=await e.json()}catch{return Response.json($t(null,-32700,"Ung\xFCltiges JSON"),{status:400})}if(i.id===void 0||i.id===null)return new Response(null,{status:202});let{id:a,method:s,params:l}=i;try{switch(s){case"initialize":return Response.json(rt(a,{protocolVersion:Fs,capabilities:{tools:{}},serverInfo:{name:"nfclager",version:Hs},instructions:`Lagerverwaltung J. Werner Ger\xFCstbau.

Getaggt sind Ladungstr\xE4ger (Gitterboxen, Stapel, B\xFCndel) mit gez\xE4hltem Inhalt sowie Gro\xDFteile wie Treppent\xFCrme. Mengen sind deshalb kistengenau, nicht st\xFCckgenau \u2014 bei Zahlen dazusagen, dass sie aus dem erfassten Tr\xE4gerinhalt stammen und beim letzten Packen gez\xE4hlt wurden.

Wegweiser: "bestand" f\xFCr Bestandsfragen, "ueberfaellig" f\xFCr R\xE4umung und Materialverlust, "vorhaltung" f\xFCr Abrechnungsfragen zur Mietdauer, "baustelle_bestand" f\xFCr eine einzelne Baustelle.

Der normale Weg einer Buchung ist das Scannen vor Ort. "buchung_anlegen" ist f\xFCr Korrekturen gedacht, nicht f\xFCr die t\xE4gliche Erfassung \u2014 wer damit Bewegungen nachtr\xE4gt, die niemand gescannt hat, macht die Vorhaltezeiten wertlos. Vor schreibenden Aufrufen beim Menschen r\xFCckfragen.`}));case"ping":return Response.json(rt(a,{}));case"tools/list":return Response.json(rt(a,{tools:Lr.map(({name:d,description:p,inputSchema:y})=>({name:d,description:p,inputSchema:y}))}));case"tools/call":{let d=Lr.find(p=>p.name===l?.name);if(!d)return Response.json($t(a,-32602,`Unbekanntes Werkzeug: ${l?.name}`));try{let p=await d.ausfuehren(t,l.arguments??{});return Response.json(rt(a,{content:[{type:"text",text:p}]}))}catch(p){return Response.json(rt(a,{content:[{type:"text",text:`Fehler: ${p.message}`}],isError:!0}))}}default:return Response.json($t(a,-32601,`Unbekannte Methode: ${s}`))}}catch(d){return Response.json($t(a,-32603,d.message),{status:500})}}o(Dr,"mcpBehandeln");w();E();v();function Br(e,t){let n=`
<h1>Inventur</h1>
<p class="gedaempft">Standort abtappen, live sehen was fehlt.</p>
${t.length?`
<h2 style="margin-top:22px">L\xE4uft gerade</h2>
<ul class="wahl">${t.map(r=>`<li><a class="knopf knopf-haupt" href="/inventur/${r.id}">
       <span>${f(r.standort)}</span>
       <span class="neben" style="color:rgba(255,255,255,.82)">fortsetzen</span></a></li>`).join("")}</ul>`:""}
<h2 style="margin-top:22px">Neu starten</h2>
${e.length===0?'<div class="tafel"><p><strong>Keine Standorte angelegt.</strong></p></div>':`<ul class="wahl">${e.map(r=>`<li><form method="post" action="/inventur">
           <input type="hidden" name="standort_id" value="${r.id}">
           <button class="knopf knopf-zweit" type="submit">${f(r.name)}</button>
         </form></li>`).join("")}</ul>`}
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return q(K(n,{titel:"Inventur",kopf:J("Inventur",{href:"/",text:"\xDCbersicht"})}))}o(Br,"inventurAuswahl");function Pr(e,t){let{inventur:n,gefunden:r,fehlend:i}=e,a=r.filter(I=>I.war_woanders),s=r.length+i.length,l=s>0?Math.round(r.length/s*100):100,d=n.beendet_am!==null,p=o((I,F)=>`<ul class="stueckliste">${I.map(H=>`<li>
      <span class="anzahl" style="flex-basis:78px">${F?`<a href="/t/${f(H.code)}"><span class="kennung">${f(H.code)}</span></a>`:`<span class="kennung">${f(H.code)}</span>`}</span>
      <span class="was">${f(H.bezeichnung)}</span></li>`).join("")}</ul>`,"liste"),y=`
<h1>${f(n.standort??"")}</h1>
<p class="gedaempft">Inventur ${n.id}${d?" \xB7 abgeschlossen":""}</p>

<article class="tafel tafel-akzent">
  <p style="font-size:32px;font-weight:700;letter-spacing:-.03em;line-height:1.1">
    ${r.length} <span style="color:var(--ink3);font-weight:550">von ${s}</span></p>
  <div class="balkenanzeige"><span style="width:${l}%"></span></div>
  <p class="gedaempft">${i.length===0?"Alles gefunden.":`${i.length} ${i.length===1?"fehlt":"fehlen"} noch`}</p>
  ${n.soll_anzahl!==null&&n.soll_anzahl!==s?`<p class="gedaempft klein" style="margin-top:6px">Beim Start waren
        ${n.soll_anzahl} Einheiten hier verbucht.</p>`:""}
</article>

${d?Y("hinweis","Abgeschlossen",` am ${n.beendet_am.slice(0,16)}.`):Y("erfolg","L\xE4uft"," Einfach die Tags antippen \u2014 jede Einheit wird beim Scannen erfasst.")}

${a.length?`
<article class="tafel">
  <h2>Hier gefunden, im System woanders</h2>
  <p class="gedaempft klein" style="margin-top:4px">Automatisch hierher gebucht.</p>
  ${p(a,!1)}
</article>`:""}

<article class="tafel">
  <h2>Fehlt noch (${i.length})</h2>
  ${i.length===0?'<p class="gedaempft" style="margin-top:8px">Nichts offen.</p>':p(i,!0)}
</article>

<article class="tafel">
  <h2>Erfasst (${r.length})</h2>
  ${r.length===0?'<p class="gedaempft" style="margin-top:8px">Noch nichts.</p>':p(r.slice(0,60),!1)}
</article>

${d?"":`<form method="post" action="/inventur/${n.id}/abschliessen">
  <button class="knopf knopf-warn" type="submit">Inventur abschlie\xDFen</button></form>`}
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return q(K(y,{titel:`Inventur ${n.standort??""}`,kopf:J("Inventur",{href:"/inventur",text:"Alle"}),banner:Me(t)}))}o(Pr,"inventurSeite");w();E();v();var Hr=`
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
`,Fr=`
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
`;function jr(){let e=`
${Y("hinweis","Kein Netz"," Buchungen werden gespeichert und \xFCbertragen, sobald wieder Empfang da ist.")}
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
    ziel.innerHTML = '<article class="tafel"><span class="kennung">' + esc(code) + '</span>' +
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

  ziel.innerHTML = '<article class="tafel tafel-akzent">' +
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
<\/script>`;return q(K(e,{titel:"Kein Netz",kopf:J("Lager"),scripte:t}))}o(jr,"offlineSeite");w();E();v();function Ur(e,t){let n=e.map(a=>`<option value="${a.id}"${a.id===t?" selected":""}>${f(a.name)}</option>`).join(""),r=`
<h1>Scan-Station</h1>
<p class="gedaempft">Dauerscan f\xFCrs Be- und Entladen. Ein Ziel w\xE4hlen, dann Tag an Tag halten.</p>

<div id="nicht-unterstuetzt" hidden>
  ${Y("hinweis","Dieses Ger\xE4t kann nicht dauerscannen"," Web NFC gibt es nur in Chrome auf Android. Auf dem iPhone stattdessen den Tag direkt antippen \u2014 das Banner \xF6ffnet die Einheit.")}
</div>

<div class="tafel">
  <div class="feld" style="margin-bottom:0"><label for="ziel">Alles buchen nach</label>
    <select id="ziel">${n}</select></div>
</div>
<button id="start" class="knopf knopf-haupt" type="button">Scannen starten</button>
<button id="stop" class="knopf knopf-warn" type="button" hidden>Scannen beenden</button>

<article class="tafel tafel-akzent" id="status" hidden style="text-align:center">
  <p id="status-text" style="font-size:20px;font-weight:650">Bereit \u2014 Tag ans Handy halten</p>
  <p style="font-size:40px;font-weight:700;letter-spacing:-.03em;margin-top:6px"
     id="zaehler">0</p>
  <p class="gedaempft">gebucht</p>
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
<\/script>`;return q(K(r,{titel:"Scan-Station",kopf:J("Scan-Station",{href:"/",text:"\xDCbersicht"}),scripte:i}))}o(Ur,"stationSeite");w();E();v();w();E();v();var Zr=mi(Kr(),1);function Jr(e,t){let n=(0,Zr.default)(0,"M");n.addData(e),n.make();let r=n.getModuleCount(),i=[];for(let a=0;a<r;a++)for(let s=0;s<r;s++)n.isDark(a,s)&&i.push(`M${s} ${a}h1v1h-1z`);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ${r+2} ${r+2}" width="${t}mm" height="${t}mm" shape-rendering="crispEdges"><rect x="-1" y="-1" width="${r+2}" height="${r+2}" fill="#fff"/><path d="${i.join("")}" fill="#000"/></svg>`}o(Jr,"qrSvg");function js(e){try{return new URL(e).host}catch{return""}}o(js,"host");function Vr(e,t){let n=e.map(r=>`
<div class="etikett">
  <div class="qr">${Jr(r.url,27)}</div>
  <div class="txt">
    <div class="code">${f(r.code)}</div>
    <div class="bez">${f(r.bezeichnung)}</div>
    <div class="host">${f(js(r.url))}</div>
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
</body></html>`}o(Vr,"druckbogen");w();E();v();var Us=[{gruppe:"Lager",punkte:[["/buero","\xDCbersicht"],["/buero/bestand","Bestand"],["/buero/einheiten","Einheiten"]]},{gruppe:"Stammdaten",punkte:[["/buero/standorte","Standorte"],["/buero/artikel","Artikel"],["/buero/mitarbeiter","Mitarbeiter"]]},{gruppe:"Kontrolle",punkte:[["/buero/auswertung","Auswertung"],["/buero/meldungen","Meldungen"]]}];function Ws(e){return`<aside class="leiste">
    <div class="marke">Lager \xB7 B\xFCro</div>
    <nav class="navi">
      ${Us.map(n=>`<span class="gruppe">${f(n.gruppe)}</span>`+n.punkte.map(([r,i])=>{let a=r==="/buero"?e==="/buero":e.startsWith(r);return`<a href="${f(r)}"${a?' class="aktiv"':""}>${f(i)}</a>`}).join("")).join("")}
      <span class="trenner"></span>
      <a class="nebensache" href="/">Baustellen-Ansicht</a>
      <a class="nebensache" href="/buero/abmelden">Abmelden</a>
    </nav>
  </aside>`}o(Ws,"leiste");function ke(e,t,n,r=200){return q(K(`<div class="buero">${Ws(t)}<main class="inhalt">${n}</main></div>`,{titel:`${e} \xB7 Lager`,roh:!0}),r)}o(ke,"bueroSeite");function it(e){let t=`
<h1>B\xFCro</h1>
<p class="gedaempft">Lagerverwaltung</p>
${e?Y("fehler",e):""}
<form method="post" action="/buero/anmelden">
  <div class="tafel">
    <div class="feld"><label for="pw">Passwort</label>
      <input type="password" id="pw" name="passwort" autocomplete="current-password" required></div>
  </div>
  <button class="knopf knopf-lager" type="submit">Anmelden</button>
</form>`;return q(K(t,{titel:"B\xFCro",kopf:""}),e?401:200)}o(it,"anmeldung");function Yr(e){let t=e.ueberfaellig.filter(a=>a.baustelle_beendet).length,n=$r([{wert:e.einheiten,schild:"Einheiten",zusatz:`auf ${e.standorte} Standorten`,ton:"blau"},{wert:e.imLager,schild:"im Lager",zusatz:"verf\xFCgbar",ton:"gruen"},{wert:e.aufBaustellen,schild:"auf Baustellen",zusatz:"drau\xDFen",ton:"amber"},{wert:e.ueberfaellig.length,schild:"\xFCberf\xE4llig",zusatz:t?`davon ${t} auf beendeten Baustellen`:"\xFCber der Schwelle",ton:e.ueberfaellig.length?"rot":void 0}]),r=e.ueberfaellig.slice(0,12).map(a=>[`<a href="/buero/einheit/${a.einheit_id}"><strong>${f(a.code)}</strong></a>
     <span class="zweitzeile">${f(a.bezeichnung)}</span>`,`${f(a.standort)}${a.baustelle_beendet?` ${ne("beendet","warn")}`:""}`,`${a.tage} T`,f(a.zuletzt_gebucht_von??"\u2014")]),i=`
${ge("\xDCbersicht","Wo das Material steht und was zu lange drau\xDFen ist.")}
${n}
${e.offeneMeldungen>0?`<div class="notiz notiz-hinweis" style="margin-bottom:22px">
         <strong>${e.offeneMeldungen} offene Meldung${e.offeneMeldungen===1?"":"en"} von der Baustelle</strong>
         <a href="/buero/meldungen">Meldungen ansehen \u2192</a>
       </div>`:""}
${re({titel:"\xDCberf\xE4llig",beitext:e.ueberfaellig.length>12?`12 von ${e.ueberfaellig.length}`:void 0},e.ueberfaellig.length===0?`<div class="leer"><strong>Nichts \xFCberf\xE4llig</strong>
          Alles Material ist entweder im Lager oder noch nicht lange genug drau\xDFen.</div>`:oe([{titel:"Einheit"},{titel:"Standort"},{titel:"Steht",zahl:!0},{titel:"Zuletzt gebucht"}],r))}`;return ke("\xDCbersicht","/buero",i)}o(Yr,"uebersicht");function Qr(e,t){let n=new Map;for(let a of e){let s=n.get(a.artikel)??[];s.push(a),n.set(a.artikel,s)}let r=[...n.entries()].map(([a,s])=>{let l=s.reduce((y,I)=>y+I.menge,0),d=s.filter(y=>y.standort_typ==="lager").reduce((y,I)=>y+I.menge,0),p=s[0].mengeneinheit;return re({titel:a,beitext:`${ce(d)} von ${ce(l)} ${p} im Lager`},oe([{titel:"Standort"},{titel:"Menge",zahl:!0}],s.map(y=>[`${f(y.standort)} ${ne(y.standort_typ,y.standort_typ==="lager"?"lager":"baustelle")}`,`<strong>${f(ce(y.menge))}</strong> <span class="gedaempft">${f(y.mengeneinheit)}</span>`])))}).join(""),i=`
${ge("Bestand","Z\xE4hlt Inhalt von Ladungstr\xE4gern und separat getaggte Einzelteile zusammen.")}
<form method="get" class="filter">
  <input type="text" name="q" placeholder="Artikel filtern \u2026" value="${f(t)}">
  <button class="knopf knopf-zweit" type="submit">Filtern</button>
  ${t?'<a class="knopf knopf-still" href="/buero/bestand">Zur\xFCcksetzen</a>':""}
</form>
${e.length===0?`<div class="abschnitt"><div class="leer"><strong>Kein Bestand</strong>
        ${t?"Kein Artikel passt zum Filter.":"Sobald Einheiten mit Inhalt erfasst sind, steht hier die Summe."}</div></div>`:r}`;return ke("Bestand","/buero/bestand",i)}o(Qr,"bestandSeite");function Xr(e,t,n){let r=e.map(s=>[`<a href="/buero/einheit/${s.id}"><strong>${f(s.code)}</strong></a>`,`${f(s.bezeichnung)}${s.zustand!=="ok"?` ${ne(At(s.zustand),"warn")}`:""}`,`${f(s.standort_name)}<span class="zweitzeile">${f(Te(s.seit))}</span>`]),i=t.map(s=>`<option value="${s.id}">${f(s.name)}</option>`).join(""),a=`
${ge("Einheiten","Ladungstr\xE4ger mit gez\xE4hltem Inhalt und Gro\xDFteile. Jede bekommt beim Anlegen einen Tag-Code.",'<a class="knopf knopf-zweit" href="/buero/etiketten">Alle Etiketten drucken</a>')}
<form method="get" class="filter">
  <input type="text" name="q" placeholder="Code oder Bezeichnung \u2026" value="${f(n)}">
  <button class="knopf knopf-zweit" type="submit">Suchen</button>
  ${n?'<a class="knopf knopf-still" href="/buero/einheiten">Zur\xFCcksetzen</a>':""}
</form>
${re({titel:"Bestand an Einheiten",beitext:`${e.length} St\xFCck`},e.length===0?`<div class="leer"><strong>Keine Einheiten</strong>
          ${n?"Nichts passt zur Suche.":"Unten die erste Gitterbox anlegen."}</div>`:oe([{titel:"Code"},{titel:"Bezeichnung"},{titel:"Standort"}],r))}
${re({titel:"Neue Einheit",gepolstert:!0},`
<form method="post" action="/buero/einheiten">
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
    <select id="st" name="standort_id">${i}</select></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Tag erzeugen</button>
</form>`)}`;return ke("Einheiten","/buero/einheiten",a)}o(Xr,"einheitenSeite");function ei(e){let{einheit:t}=e,n=e.tagCodes.map(l=>[`<span class="kennung">${f(l)}</span>`,`<span class="gedaempft klein">${f(e.basisUrl)}/t/${f(l)}</span>`]),r=e.inhalt.map(l=>[f(l.name),`<strong>${f(ce(l.menge))}</strong> <span class="gedaempft">${f(l.mengeneinheit)}</span>`,`<form method="post" action="/buero/einheit/${t.id}/inhalt">
       <input type="hidden" name="artikel_id" value="${l.artikel_id}">
       <input type="hidden" name="menge" value="0">
       <button class="knopf knopf-still" type="submit">entfernen</button></form>`]),i=e.historie.map(l=>[f(l.zeit.slice(0,16).replace(" "," \xB7 ")),`${f(l.von??"\u2014")} \u2192 <strong>${f(l.nach)}</strong>`,`${f(l.wer??"\u2014")} ${ne(l.quelle,"ruhig")}`]),a=e.artikel.map(l=>`<option value="${l.id}">${f(l.name)}</option>`).join(""),s=`
${e.meldung?Y("erfolg",e.meldung):""}
${ge(t.code,`${t.bezeichnung} \xB7 ${t.standort_name} \xB7 ${Te(t.seit)} \xB7 ${At(t.zustand)}`,`<a class="knopf knopf-zweit" href="/buero/etiketten?einheit=${t.id}">Etikett drucken</a>
     <form method="post" action="/buero/einheit/${t.id}/tag">
       <button class="knopf knopf-still" type="submit">Ersatz-Tag</button></form>`)}

${re({titel:"Tags",beitext:"Der Chip tr\xE4gt diese URL"},e.tagCodes.length===0?'<div class="leer"><strong>Kein Tag zugeordnet</strong>\xDCber \u201EErsatz-Tag" einen erzeugen.</div>':oe([{titel:"Code"},{titel:"URL"}],n))}

${re({titel:"Inhalt",beitext:e.inhalt.length?`${e.inhalt.length} Positionen`:void 0},(e.inhalt.length===0?'<div class="leer"><strong>Leer</strong>Unten Artikel und Menge eintragen.</div>':oe([{titel:"Artikel"},{titel:"Menge",zahl:!0},{titel:""}],r))+`<div class="koerper" style="border-top:1px solid var(--linie)">
    <form method="post" action="/buero/einheit/${t.id}/inhalt">
      <div class="felder-zwei">
        <div class="feld"><label for="art">Artikel</label>
          <select id="art" name="artikel_id">${a}</select></div>
        <div class="feld"><label for="menge">Menge</label>
          <input type="number" id="menge" name="menge" step="0.1" min="0" value="1"></div>
      </div>
      <button class="knopf knopf-zweit" type="submit">Inhalt setzen</button>
    </form></div>`)}

${re({titel:"Historie",beitext:"Jede Bewegung, l\xFCckenlos"},e.historie.length===0?'<div class="leer"><strong>Noch keine Bewegungen</strong></div>':oe([{titel:"Wann"},{titel:"Bewegung"},{titel:"Wer"}],i))}`;return ke(t.code,"/buero/einheiten",s)}o(ei,"einheitDetail");function ti(e){let t=e.map(r=>[`<strong>${f(r.name)}</strong>${r.adresse?`<span class="zweitzeile">${f(r.adresse)}</span>`:""}`,ne(r.typ,r.typ==="lager"?"lager":"baustelle")+(r.aktiv?"":` ${ne("beendet","warn")}`),`<a href="/buero/etiketten?standort=${r.id}">Etikett</a>`,r.typ==="baustelle"&&r.aktiv?`<form method="post" action="/buero/standorte/${r.id}/beenden">
           <button class="knopf knopf-still" type="submit">beenden</button></form>`:""]),n=`
${ge("Standorte","Das Lager und die laufenden Baustellen. Jede erzeugt einen Standort-Tag: einmal am Bauzaun antippen, danach geht jede Einheit mit einem Tap dorthin.")}
${re({titel:"Alle Standorte",beitext:`${e.filter(r=>r.aktiv).length} aktiv`},oe([{titel:"Name"},{titel:"Art"},{titel:"Tag"},{titel:""}],t))}
${re({titel:"Neuer Standort",gepolstert:!0},`
<form method="post" action="/buero/standorte">
  <div class="feld"><label for="n">Name</label>
    <input type="text" id="n" name="name" required placeholder="z. B. Elbchaussee 12"></div>
  <div class="feld"><label for="a">Adresse</label>
    <input type="text" id="a" name="adresse" placeholder="optional"></div>
  <div class="feld"><label for="t">Art</label>
    <select id="t" name="typ">
      <option value="baustelle">Baustelle</option>
      <option value="lager">Lager</option>
    </select></div>
  <div class="feld"><label for="lat">Koordinaten \u2014 sortiert die Auswahl auf dem Handy nach N\xE4he</label>
    <div class="felder-zwei">
      <input type="text" id="lat" name="lat" placeholder="Breite, z. B. 53.5511">
      <input type="text" name="lon" placeholder="L\xE4nge, z. B. 9.9937"></div></div>
  <button class="knopf knopf-lager" type="submit">Anlegen</button>
</form>`)}`;return ke("Standorte","/buero/standorte",n)}o(ti,"standorteSeite");function ni(e){let t=e.map(r=>[`<strong>${f(r.name)}</strong>`,ne(r.kategorie,"ruhig"),f(r.mengeneinheit)]),n=`
${ge("Artikel","Der Materialstamm. Was hier steht, l\xE4sst sich als Inhalt einer Gitterbox erfassen.")}
${re({titel:"Materialstamm",beitext:`${e.length} Positionen`},oe([{titel:"Name"},{titel:"Kategorie"},{titel:"Einheit"}],t))}
${re({titel:"Neuer Artikel",gepolstert:!0},`
<form method="post" action="/buero/artikel">
  <div class="feld"><label for="an">Name</label>
    <input type="text" id="an" name="name" required placeholder="z. B. Rahmen 2,00 m"></div>
  <div class="felder-zwei">
    <div class="feld"><label for="ak">Kategorie</label>
      <input type="text" id="ak" name="kategorie" placeholder="z. B. rahmen"></div>
    <div class="feld"><label for="am">Mengeneinheit</label>
      <input type="text" id="am" name="mengeneinheit" value="Stk"></div>
  </div>
  <button class="knopf knopf-lager" type="submit">Anlegen</button>
</form>`)}`;return ke("Artikel","/buero/artikel",n)}o(ni,"artikelSeite");function ri(e,t,n){let r=e.map(s=>[`<strong>${f(s.standort)}</strong>${s.aktiv?"":` ${ne("beendet","warn")}`}
     <span class="zweitzeile">erste Lieferung ${f(s.erste_lieferung?.slice(0,10)??"\u2014")}</span>`,String(s.einheiten),`<strong>${s.tage_summe}</strong>`,String(s.tage_max)]),i=t.map(s=>[`<a href="/buero/einheit/${s.einheit_id}"><strong>${f(s.code)}</strong></a>
     <span class="zweitzeile">${f(s.bezeichnung)}</span>`,`${f(s.standort)}${s.standort_beendet?` ${ne("beendet","warn")}`:""}`,String(s.tage),`<span class="klein">${f(s.inhalt??"\u2014")}</span>`,f(s.zuletzt_von??"\u2014")]),a=`
${ge("Auswertung","Was die Mietdauer kostet und was vermutlich nicht zur\xFCckkommt.")}
${re({titel:"Vorhaltetage je Baustelle",beitext:"Einheitentage = Summe \xFCber alle Einheiten"},e.length===0?`<div class="leer"><strong>Noch keine Bewegungen auf Baustellen</strong>
          Sobald Material rausgeht und zur\xFCckkommt, steht hier die belastbare Mietdauer.</div>`:oe([{titel:"Baustelle"},{titel:"Einheiten",zahl:!0},{titel:"Einheitentage",zahl:!0},{titel:"L\xE4ngste",zahl:!0}],r))}
${re({titel:"Vermutlicher Verlust",beitext:`ab ${n} Tagen oder auf beendeter Baustelle`},t.length===0?`<div class="leer"><strong>Nichts auff\xE4llig</strong>
          Kein Material steht ungew\xF6hnlich lange drau\xDFen.</div>`:oe([{titel:"Einheit"},{titel:"Standort"},{titel:"Tage",zahl:!0},{titel:"Inhalt"},{titel:"Zuletzt gebucht"}],i))}`;return ke("Auswertung","/buero/auswertung",a)}o(ri,"auswertungSeite");function ii(e,t){let n=e.map(i=>[`<a href="/buero/einheit/${i.einheit_id}"><strong>${f(i.code)}</strong></a>
     <span class="zweitzeile">${f(i.bezeichnung)}</span>`,ne(i.art,i.art==="ok"?"ok":"warn"),`${f(i.text??"")}${i.foto_schluessel?`<span class="zweitzeile"><a href="/foto/${f(i.foto_schluessel)}">Foto ansehen</a></span>`:""}`,`${f(i.zeit.slice(0,16))}<span class="zweitzeile">${f(i.wer??"\u2014")}</span>`,i.erledigt?ne("erledigt","ok"):`<form method="post" action="/buero/meldung/${i.id}/erledigt">
           <button class="knopf knopf-still" type="submit">erledigt</button></form>`]),r=`
${ge("Meldungen","Sch\xE4den und Zustandsmeldungen von der Baustelle.",`<a class="knopf knopf-zweit" href="/buero/meldungen${t?"":"?alle=1"}">${t?"Nur offene":"Auch erledigte"}</a>`)}
${re({titel:t?"Alle Meldungen":"Offene Meldungen",beitext:`${e.length} St\xFCck`},e.length===0?`<div class="leer"><strong>Keine Meldungen</strong>
          ${t?"Es wurde noch nichts gemeldet.":"Nichts Offenes."}</div>`:oe([{titel:"Einheit"},{titel:"Art"},{titel:"Was"},{titel:"Wann"},{titel:""}],n))}`;return ke("Meldungen","/buero/meldungen",r)}o(ii,"meldungenSeite");function ai(e,t){let n=e.map(i=>[`<strong>${f(i.name)}</strong>${i.aktiv?"":` ${ne("gesperrt","warn")}`}`,ne(i.rolle,"ruhig"),i.token_hash?ne("eingerichtet","ok"):i.einladung?`<a href="${f(t)}/einladung/${f(i.einladung)}">Einladungslink</a>
           <span class="zweitzeile klein">einmal per WhatsApp schicken</span>`:'<span class="gedaempft">\u2014</span>',f(i.zuletzt_aktiv?.slice(0,10)??"\u2014"),`<form method="post" action="/buero/mitarbeiter/${i.id}/umschalten">
       <button class="knopf knopf-still" type="submit">${i.aktiv?"sperren":"freigeben"}</button></form>`]),r=`
${ge("Mitarbeiter","Kein Passwort, kein Login: Wer den Einladungslink einmal antippt, ist auf diesem Handy dauerhaft erkannt. Handy weg oder Mitarbeiter raus \u2192 hier sperren.")}
${re({titel:"Alle",beitext:`${e.filter(i=>i.aktiv).length} aktiv`},e.length===0?`<div class="leer"><strong>Noch niemand angelegt</strong>
          Unten den ersten Kolonnenf\xFChrer eintragen.</div>`:oe([{titel:"Name"},{titel:"Rolle"},{titel:"Status"},{titel:"Zuletzt"},{titel:""}],n))}
${re({titel:"Neuer Mitarbeiter",gepolstert:!0},`
<form method="post" action="/buero/mitarbeiter">
  <div class="feld"><label for="n">Name</label>
    <input type="text" id="n" name="name" required></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Einladung erzeugen</button>
</form>`)}`;return ke("Mitarbeiter","/buero/mitarbeiter",r)}o(ai,"mitarbeiterSeite");var L=new Vt,on=o(e=>new URL(e.url).origin,"basisUrl");L.get("/",async e=>{let t=await te(e.req.raw,e.env);if(!t)return await tt(e.req.raw,e.env)?e.redirect("/buero"):q(K(`
<article class="tafel tafel-akzent">
  <h1>${f(e.env.FIRMA)}</h1>
  <p class="gedaempft" style="margin-top:6px">Lagerverwaltung</p>
</article>
${Y("hinweis","Dieses Handy ist noch nicht eingerichtet"," Der Einladungslink kommt vom B\xFCro \u2014 einmal antippen gen\xFCgt.")}
<a class="knopf knopf-still" href="/buero">B\xFCro</a>`,{titel:e.env.FIRMA,kopf:J("Lager")}));let n=await Ie(e.env,t.id),r=await vt(e.env);return q(K(`
<h1>Hallo ${f(t.name)}</h1>
<p class="gedaempft">Tag ans Handy halten, um zu buchen.</p>
<form method="get" action="/t">
  <div class="tafel">
    <div class="feld" style="margin-bottom:0">
      <label for="code">Oder Code vom Aufkleber eintippen</label>
      <input type="text" id="code" name="code" autocapitalize="characters"
        autocomplete="off" placeholder="z. B. K7F2QX"></div>
  </div>
  <button class="knopf knopf-lager" type="submit">\xD6ffnen</button>
</form>
<a class="knopf knopf-zweit" href="/inventur">Inventur</a>
<a class="knopf knopf-still" href="/scan">Scan-Station (nur Android)</a>
<p class="fussnote" id="wgl-wartestand" hidden></p>
${r?`<p class="fussnote">Hauptlager: ${f(r.name)}</p>`:""}`,{titel:"Lager",kopf:J("Lager"),banner:Me(n),scripte:'<script src="/app.js"><\/script>'}))});L.get("/t",e=>{let t=de(e.req.query("code")??"");return t?e.redirect(`/t/${t}`):e.redirect("/")});L.get("/t/:code",async e=>{let t=e.req.param("code"),n=await Ge(e.env,t);if(!n)return nt(de(t));let r=n.code,i=await te(e.req.raw,e.env);if(n.art==="standort")return i?(await an(e.env,i.id,n.standort.id,n.standort.name),q(K(`
${Y("erfolg",`Du bist auf ${n.standort.name}`," Die n\xE4chsten 4 Stunden geht jede Einheit mit einem Tap hierher.")}
<p class="gedaempft">Jetzt die Einheiten antippen.</p>
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`,{titel:n.standort.name,kopf:J("Lager"),banner:Me(await Ie(e.env,i.id))}))):e.redirect("/");let a=n.einheit;if(!i)return Mr(a,e.env.FIRMA,e.env.FIRMA_TELEFON);let[s,l,d]=await Promise.all([Ye(e.env,a.id),Ie(e.env,i.id),vt(e.env)]),p=Number(e.req.query("ok")??0),y=p?{art:"erfolg",text:`Gebucht: ${a.standort_name}`}:e.req.query("schon")?{art:"hinweis",text:"Stand schon dort \u2014 nichts ge\xE4ndert."}:e.req.query("gemeldet")?{art:"erfolg",text:"Meldung ist im B\xFCro angekommen."}:e.req.query("storniert")?{art:"hinweis",text:"Buchung zur\xFCckgenommen."}:e.req.query("fehler")?{art:"fehler",text:String(e.req.query("fehler"))}:void 0,I=l?await en(e.env,l.standortId):null,F=I?[Nr(I.id,r,I.standort??""),...sn(a,l,d)]:sn(a,l,d);return Or({einheit:a,inhalt:s,aktionen:F,sitzung:l,meldung:y,stornoId:p||void 0})});L.get("/t/:code/wohin",async e=>{let t=await Ge(e.env,e.req.param("code"));if(!t||t.art!=="einheit")return nt(de(e.req.param("code")));let n=t.code,r=await te(e.req.raw,e.env);if(!r)return e.redirect(`/t/${n}`);let i=Number(e.req.query("lat")),a=Number(e.req.query("lon")),s=Number.isFinite(i)&&Number.isFinite(a),p=(await xe(e.env)).filter(y=>y.id!==t.einheit.standort_id).map(y=>({...y,entfernungKm:s&&y.lat!==null&&y.lon!==null?Tr(i,a,y.lat,y.lon):void 0}));return p.sort((y,I)=>y.typ!==I.typ?y.typ==="lager"?-1:1:y.entfernungKm!==void 0&&I.entfernungKm!==void 0?y.entfernungKm-I.entfernungKm:y.entfernungKm!==void 0?-1:I.entfernungKm!==void 0?1:y.name.localeCompare(I.name,"de")),Ir({code:n,bezeichnung:t.einheit.bezeichnung,standorte:p,sitzung:await Ie(e.env,r.id),hatPosition:s})});L.post("/api/buchung",async e=>{let t=(e.req.header("Accept")??"").includes("application/json"),n=await me(e.req.raw),r=de(String(n.code??"")),i=Number(n.ziel),a=o((p,y=400)=>t?e.json({ok:!1,fehler:p},y):e.redirect(`/t/${r}?fehler=${encodeURIComponent(p)}`,303),"antwortFehler"),s=await te(e.req.raw,e.env);if(!s)return a("Handy nicht eingerichtet",401);let l=await Ge(e.env,r);if(!l||l.art!=="einheit")return a("Unbekannter Tag",404);if(!Number.isInteger(i)||!await fe(e.env,i))return a("Unbekannter Standort",400);let d=await Qe(e.env,{einheitId:l.einheit.id,nachStandortId:i,mitarbeiterId:s.id,quelle:n.quelle==="nfc"?"nfc":"qr",lat:Nt(n.lat),lon:Nt(n.lon)});if(!d)return a("Einheit nicht gefunden",404);if(await e.env.DB.prepare("UPDATE mitarbeiter SET zuletzt_aktiv = datetime('now') WHERE id = ?").bind(s.id).run(),t){let p=await fe(e.env,i);return e.json({ok:!0,unveraendert:d.unveraendert,bezeichnung:l.einheit.bezeichnung,standort:p?.name??"",buchung_id:d.buchungId})}return e.redirect(d.unveraendert?`/t/${r}?schon=1`:`/t/${r}?ok=${d.buchungId}`,303)});L.post("/api/storno",async e=>{let t=await me(e.req.raw),n=de(String(t.code??""));if(!await te(e.req.raw,e.env))return e.redirect("/");let i=await Er(e.env,Number(t.id));return e.redirect(i.ok?`/t/${n}?storniert=1`:`/t/${n}?fehler=${encodeURIComponent(i.grund)}`,303)});L.get("/einladung/:code",async e=>{let t=e.req.param("code"),n=await e.env.DB.prepare("SELECT id, name FROM mitarbeiter WHERE einladung = ? AND aktiv = 1").bind(t).first();if(!n)return q(K(Y("fehler","Link nicht g\xFCltig"," Entweder schon benutzt oder abgelaufen. Bitte im B\xFCro einen neuen anfordern."),{titel:"Einladung",kopf:J("Lager")}),410);let r=br();return await e.env.DB.prepare("UPDATE mitarbeiter SET token_hash = ?, einladung = NULL WHERE id = ?").bind(await We(r),n.id).run(),q(K(`
${Y("erfolg",`Fertig, ${n.name}`," Dieses Handy ist jetzt eingerichtet. Kein Passwort, kein Login \u2014 einfach Tags antippen.")}
<a class="knopf knopf-haupt" href="/">Los geht\u2019s</a>`,{titel:"Eingerichtet",kopf:J("Lager")}),200,{"Set-Cookie":nn(tn,r,60*60*24*365*2)})});L.get("/sitzung/beenden",async e=>{let t=await te(e.req.raw,e.env);return t&&await Ar(e.env,t.id),e.redirect("/")});L.get("/scan",async e=>{let t=await te(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await Ie(e.env,t.id),r=await vt(e.env);return Ur(await xe(e.env),n?.standortId??r?.id??null)});L.get("/t/:code/melden",async e=>{let t=await Ge(e.env,e.req.param("code"));return!t||t.art!=="einheit"?nt(de(e.req.param("code"))):await te(e.req.raw,e.env)?Cr(t.einheit,e.env.FOTOS!==void 0):e.redirect(`/t/${t.code}`)});L.post("/t/:code/melden",async e=>{let t=await Ge(e.env,e.req.param("code"));if(!t||t.art!=="einheit")return nt(de(e.req.param("code")));let n=await te(e.req.raw,e.env);if(!n)return e.redirect("/");let r=await e.req.raw.formData(),i=String(r.get("art")??"hinweis"),a=String(r.get("text")??"").trim()||null,s=null,l=r.get("foto");if(e.env.FOTOS&&l&&typeof l!="string"&&l.size>0){if(l.size>8*1024*1024)return e.redirect(`/t/${t.code}?fehler=${encodeURIComponent("Foto zu gro\xDF (max. 8 MB)")}`,303);s=`${t.einheit.id}/${Date.now()}-${crypto.randomUUID().slice(0,8)}`,await e.env.FOTOS.put(s,l.stream(),{httpMetadata:{contentType:l.type||"image/jpeg"}})}return await Sr(e.env,{einheitId:t.einheit.id,art:i,text:a,fotoSchluessel:s,mitarbeiterId:n.id}),e.redirect(`/t/${t.code}?gemeldet=1`,303)});L.get("/foto/*",async e=>{if(!await tt(e.req.raw,e.env)&&!await te(e.req.raw,e.env))return new Response("Nicht berechtigt",{status:403});if(!e.env.FOTOS)return e.notFound();let t=decodeURIComponent(new URL(e.req.url).pathname.slice(6)),n=await e.env.FOTOS.get(t);return n?new Response(n.body,{headers:{"Content-Type":n.httpMetadata?.contentType??"image/jpeg","Cache-Control":"private, max-age=3600"}}):e.notFound()});L.get("/inventur",async e=>{if(!await te(e.req.raw,e.env))return e.redirect("/");let{results:t}=await e.env.DB.prepare(`SELECT i.id, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.beendet_am IS NULL ORDER BY i.id DESC`).all();return Br(await xe(e.env),t)});L.post("/inventur",async e=>{let t=await te(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await me(e.req.raw),r=Number(n.standort_id),i=await fe(e.env,r);if(!i)return e.redirect("/inventur",303);let a=await kt(e.env,r,t.id);return await an(e.env,t.id,i.id,i.name),e.redirect(`/inventur/${a.id}`,303)});L.get("/inventur/:id",async e=>{let t=await te(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await Oe(e.env,Number(e.req.param("id")));return n?Pr(n,await Ie(e.env,t.id)):e.notFound()});L.post("/inventur/:id/abschliessen",async e=>{if(!await te(e.req.raw,e.env))return e.redirect("/");let t=Number(e.req.param("id"));return await yt(e.env,t),e.redirect(`/inventur/${t}`,303)});L.post("/api/inventur/treffer",async e=>{let t=(e.req.header("Accept")??"").includes("application/json"),n=await te(e.req.raw,e.env);if(!n)return t?e.json({ok:!1,fehler:"nicht eingerichtet"},401):e.redirect("/");let r=await me(e.req.raw),i=de(String(r.code??"")),a=Number(r.inventur),s=await Ge(e.env,i),l=await Oe(e.env,a);if(!s||s.art!=="einheit"||!l||l.inventur.beendet_am)return t?e.json({ok:!1,fehler:"Inventur oder Tag unbekannt"},404):e.redirect(`/t/${i}?fehler=${encodeURIComponent("Inventur oder Tag unbekannt")}`,303);let d=l.inventur.standort_id,p=s.einheit.standort_id!==d;return p&&await Qe(e.env,{einheitId:s.einheit.id,nachStandortId:d,mitarbeiterId:n.id,quelle:"nfc",notiz:"Inventur: hier vorgefunden"}),await yr(e.env,a,s.einheit.id,p),t?e.json({ok:!0,war_woanders:p}):e.redirect(`/inventur/${a}`,303)});L.get("/app.js",()=>new Response(Hr,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"max-age=300"}}));L.get("/sw.js",()=>new Response(Fr,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"max-age=0"}}));L.get("/offline",()=>jr());L.get("/api/schnappschuss",async e=>{if(!await te(e.req.raw,e.env))return e.json({fehler:"nicht eingerichtet"},401);let{results:t}=await e.env.DB.prepare(`SELECT e.id, e.code, e.bezeichnung, e.standort_id, s.name AS standort_name,
            (SELECT group_concat(CAST(i.menge AS INTEGER) || '\xD7 ' || a.name, ', ')
               FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
              WHERE i.einheit_id = e.id) AS inhalt
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1`).all(),{results:n}=await e.env.DB.prepare("SELECT code, ziel_id FROM tag WHERE ziel_typ = 'einheit' AND aktiv = 1").all(),r=new Map(t.map(s=>[s.id,s])),i={},a=o(s=>({c:s.code,b:s.bezeichnung,s:s.standort_id,sn:s.standort_name,i:s.inhalt}),"eintrag");for(let s of t)i[s.code]=a(s);for(let s of n){let l=r.get(s.ziel_id);l&&(i[s.code]=a(l))}return e.json({zeit:new Date().toISOString(),standorte:(await xe(e.env)).map(s=>({id:s.id,name:s.name,typ:s.typ})),einheiten:i})});L.post("/mcp",e=>Dr(e.req.raw,e.env));L.get("/mcp",()=>new Response("MCP-Endpunkt. Bitte POST mit JSON-RPC.",{status:405}));L.use("/buero/*",async(e,t)=>e.req.path==="/buero/anmelden"||await tt(e.req.raw,e.env)?t():it());L.get("/buero",async e=>{if(!await tt(e.req.raw,e.env))return it();let t=await e.env.DB.prepare(`SELECT COUNT(*) AS gesamt,
            SUM(CASE WHEN s.typ = 'lager' THEN 1 ELSE 0 END) AS im_lager,
            SUM(CASE WHEN s.typ = 'baustelle' THEN 1 ELSE 0 END) AS auf_baustellen
       FROM einheit e JOIN standort s ON s.id = e.standort_id WHERE e.aktiv = 1`).first(),n=await xe(e.env),r=await e.env.DB.prepare("SELECT COUNT(*) AS n FROM meldung WHERE erledigt = 0").first();return Yr({einheiten:t?.gesamt??0,imLager:t?.im_lager??0,aufBaustellen:t?.auf_baustellen??0,ueberfaellig:await et(e.env),standorte:n.length,offeneMeldungen:r?.n??0})});L.post("/buero/anmelden",async e=>{let t=await me(e.req.raw),n=String(t.passwort??"");return e.env.ADMIN_PASSWORT?Rt(n,e.env.ADMIN_PASSWORT)?new Response(null,{status:303,headers:{Location:"/buero","Set-Cookie":nn(_t,await We(n),60*60*12)}}):it("Falsches Passwort."):it("ADMIN_PASSWORT ist nicht gesetzt.")});L.get("/buero/abmelden",()=>new Response(null,{status:303,headers:{Location:"/","Set-Cookie":zr(_t)}}));L.get("/buero/bestand",async e=>{let t=e.req.query("q")??"";return Qr(await Xe(e.env,{artikelSuche:t||void 0}),t)});L.get("/buero/einheiten",async e=>{let t=e.req.query("q")??"",n=`%${t}%`,{results:r}=await e.env.DB.prepare(`SELECT e.*, s.name AS standort_name, s.typ AS standort_typ
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1 AND (?1 = '' OR e.code LIKE ?2 OR e.bezeichnung LIKE ?2)
      ORDER BY e.code LIMIT 300`).bind(t,n).all();return Xr(r,await xe(e.env),t)});L.post("/buero/einheiten",async e=>{let t=await me(e.req.raw),n=String(t.code??"").trim(),r=String(t.bezeichnung??"").trim(),i=t.typ==="einzelteil"?"einzelteil":"traeger",a=Number(t.standort_id);if(!n||!r||!Number.isInteger(a))return e.redirect("/buero/einheiten");let s=await e.env.DB.prepare(`INSERT INTO einheit (code, typ, bezeichnung, standort_id) VALUES (?, ?, ?, ?)
     RETURNING id`).bind(n,i,r,a).first();return s?(await Ae(e.env,"einheit",s.id),await e.env.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, quelle, notiz)
     VALUES (?, NULL, ?, 'manuell', 'Ersterfassung')`).bind(s.id,a).run(),e.redirect(`/buero/einheit/${s.id}`,303)):e.redirect("/buero/einheiten")});L.get("/buero/einheit/:id",async e=>{let t=Number(e.req.param("id")),n=await qe(e.env,t);if(!n)return e.notFound();let{results:r}=await e.env.DB.prepare("SELECT code FROM tag WHERE ziel_typ = 'einheit' AND ziel_id = ? AND aktiv = 1").bind(t).all();return ei({einheit:n,inhalt:await Ye(e.env,t),historie:await Et(e.env,t),artikel:await Xt(e.env),tagCodes:r.map(i=>i.code),basisUrl:on(e.req.raw)})});L.post("/buero/einheit/:id/inhalt",async e=>{let t=Number(e.req.param("id")),n=await me(e.req.raw),r=Number(n.artikel_id),i=Number(n.menge);return Number.isInteger(r)?(!Number.isFinite(i)||i<=0?await e.env.DB.prepare("DELETE FROM inhalt WHERE einheit_id = ? AND artikel_id = ?").bind(t,r).run():await e.env.DB.prepare(`INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES (?, ?, ?)
       ON CONFLICT (einheit_id, artikel_id) DO UPDATE SET menge = excluded.menge`).bind(t,r,i).run(),e.redirect(`/buero/einheit/${t}`,303)):e.redirect(`/buero/einheit/${t}`,303)});L.post("/buero/einheit/:id/tag",async e=>{let t=Number(e.req.param("id"));return await Ae(e.env,"einheit",t),e.redirect(`/buero/einheit/${t}`,303)});L.get("/buero/standorte",async e=>{let{results:t}=await e.env.DB.prepare("SELECT * FROM standort ORDER BY aktiv DESC, typ, name").all();return ti(t)});L.post("/buero/standorte",async e=>{let t=await me(e.req.raw),n=String(t.name??"").trim();if(!n)return e.redirect("/buero/standorte",303);let r=t.typ==="lager"?"lager":"baustelle",i=await e.env.DB.prepare(`INSERT INTO standort (name, typ, adresse, lat, lon) VALUES (?, ?, ?, ?, ?)
     RETURNING id`).bind(n,r,String(t.adresse??"").trim()||null,Nt(t.lat),Nt(t.lon)).first();return i&&await Ae(e.env,"standort",i.id),e.redirect("/buero/standorte",303)});L.post("/buero/standorte/:id/beenden",async e=>(await e.env.DB.prepare("UPDATE standort SET aktiv = 0, beendet_am = datetime('now') WHERE id = ? AND typ = 'baustelle'").bind(Number(e.req.param("id"))).run(),e.redirect("/buero/standorte",303)));L.get("/buero/mitarbeiter",async e=>{let{results:t}=await e.env.DB.prepare(`SELECT id, name, rolle, aktiv, einladung, token_hash, zuletzt_aktiv
       FROM mitarbeiter ORDER BY aktiv DESC, name`).all();return ai(t,on(e.req.raw))});L.post("/buero/mitarbeiter",async e=>{let t=await me(e.req.raw),n=String(t.name??"").trim();return n&&await e.env.DB.prepare("INSERT INTO mitarbeiter (name, einladung) VALUES (?, ?)").bind(n,mr()).run(),e.redirect("/buero/mitarbeiter",303)});L.post("/buero/mitarbeiter/:id/umschalten",async e=>(await e.env.DB.prepare("UPDATE mitarbeiter SET aktiv = 1 - aktiv WHERE id = ?").bind(Number(e.req.param("id"))).run(),e.redirect("/buero/mitarbeiter",303)));L.get("/buero/artikel",async e=>ni(await Xt(e.env)));L.post("/buero/artikel",async e=>{let t=await me(e.req.raw),n=String(t.name??"").trim();return n&&await e.env.DB.prepare(`INSERT INTO artikel (name, kategorie, mengeneinheit) VALUES (?, ?, ?)
       ON CONFLICT (name) DO NOTHING`).bind(n,String(t.kategorie??"").trim()||"sonstiges",String(t.mengeneinheit??"").trim()||"Stk").run(),e.redirect("/buero/artikel",303)});L.get("/buero/auswertung",async e=>{let t=Number(e.req.query("schwelle"))||120;return ri(await wt(e.env),await xt(e.env,t),t)});L.get("/buero/meldungen",async e=>{let t=e.req.query("alle")==="1";return ii(await St(e.env,!t),t)});L.post("/buero/meldung/:id/erledigt",async e=>(await e.env.DB.prepare("UPDATE meldung SET erledigt = 1 WHERE id = ?").bind(Number(e.req.param("id"))).run(),e.redirect("/buero/meldungen",303)));L.get("/buero/etiketten",async e=>{let t=on(e.req.raw),n=e.req.query("einheit"),r=e.req.query("standort"),i;if(n){let{results:s}=await e.env.DB.prepare(`SELECT t.code, e.code || ' \xB7 ' || e.bezeichnung AS bezeichnung
         FROM tag t JOIN einheit e ON e.id = t.ziel_id
        WHERE t.ziel_typ = 'einheit' AND t.ziel_id = ? AND t.aktiv = 1`).bind(Number(n)).all();i=s}else if(r){let{results:s}=await e.env.DB.prepare(`SELECT t.code, 'Standort ' || s.name AS bezeichnung
         FROM tag t JOIN standort s ON s.id = t.ziel_id
        WHERE t.ziel_typ = 'standort' AND t.ziel_id = ? AND t.aktiv = 1`).bind(Number(r)).all();i=s}else{let{results:s}=await e.env.DB.prepare(`SELECT t.code, e.code || ' \xB7 ' || e.bezeichnung AS bezeichnung
         FROM tag t JOIN einheit e ON e.id = t.ziel_id
        WHERE t.ziel_typ = 'einheit' AND t.aktiv = 1 AND e.aktiv = 1
        ORDER BY e.code LIMIT 500`).all();i=s}let a=i.map(s=>({code:s.code,bezeichnung:s.bezeichnung,url:`${t}/t/${s.code}`}));return q(Vr(a,e.env.FIRMA))});async function Ge(e,t){let n=de(t),r=gr(t),i=n===r?[n]:[n,r];for(let a of i){if(!a)continue;let s=await vr(e,a);if(s?.ziel_typ==="einheit"){let d=await qe(e,s.ziel_id);if(d)return{art:"einheit",einheit:d,code:a}}if(s?.ziel_typ==="standort"){let d=await fe(e,s.ziel_id);if(d)return{art:"standort",standort:d,code:a}}let l=await Ve(e,a);if(l)return{art:"einheit",einheit:l,code:a}}return null}o(Ge,"zielFuerCode");async function me(e){if((e.headers.get("Content-Type")??"").includes("application/json"))try{return await e.json()}catch{return{}}let n=await e.formData();return Object.fromEntries(n.entries())}o(me,"eingabeLesen");function Nt(e){if(e==null||e==="")return null;let t=Number(String(e).replace(",","."));return Number.isFinite(t)?t:null}o(Nt,"zahlOderNull");L.notFound(()=>q(K(Y("fehler","Seite nicht gefunden")+'<a class="knopf knopf-still" href="/">\xDCbersicht</a>',{titel:"Nicht gefunden",kopf:J("Lager")}),404));async function Gs(e){let t=await et(e),n=t.map(s=>s.code).sort(),r=await e.DB.prepare("SELECT codes FROM ueberfaellig_lauf ORDER BY id DESC LIMIT 1").first(),i=new Set((r?.codes??"").split(",").filter(Boolean)),a=t.filter(s=>!i.has(s.code));if(await e.DB.prepare("INSERT INTO ueberfaellig_lauf (anzahl, neu, codes, gemeldet) VALUES (?, ?, ?, ?)").bind(t.length,a.length,n.join(","),e.MELDUNG_WEBHOOK?1:0).run(),e.MELDUNG_WEBHOOK&&a.length>0){let s=a.map(d=>`\u2022 ${d.code} \u2014 ${d.bezeichnung} \xB7 ${d.standort}${d.baustelle_beendet?" (Baustelle beendet!)":""} \xB7 ${d.tage} Tage \xB7 zuletzt ${d.zuletzt_gebucht_von??"unbekannt"}`).join(`
`),l=`*Lager \u2014 \xFCberf\xE4lliges Material*
${a.length} neu, ${t.length} insgesamt drau\xDFen.

${s}`;try{await fetch(e.MELDUNG_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:l})})}catch{}}return{anzahl:t.length,neu:a.length}}o(Gs,"wochenlauf");var wf={fetch:L.fetch,async scheduled(e,t,n){n.waitUntil(Gs(t))}};export{wf as default,Gs as wochenlauf};
//# sourceMappingURL=index.js.map
