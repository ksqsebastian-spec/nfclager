var ni=Object.create;var tt=Object.defineProperty;var ri=Object.getOwnPropertyDescriptor;var ii=Object.getOwnPropertyNames;var ai=Object.getPrototypeOf,si=Object.prototype.hasOwnProperty;var oi=(e,t,n)=>t in e?tt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var o=(e,t)=>tt(e,"name",{value:t,configurable:!0});var re=(e,t)=>()=>(e&&(t=e(e=0)),t);var li=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var di=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ii(t))!si.call(e,i)&&i!==n&&tt(e,i,{get:()=>t[i],enumerable:!(r=ri(t,i))||r.enumerable});return e};var ui=(e,t,n)=>(n=e!=null?ni(ai(e)):{},di(t||!e||!e.__esModule?tt(n,"default",{value:e,enumerable:!0}):n,e));var sn=(e,t,n)=>(oi(e,typeof t!="symbol"?t+"":t,n),n);function U(e){return new Error(`[unenv] ${e} is not implemented yet!`)}function pe(e){return Object.assign(o(()=>{throw U(e)},"fn"),{__unenv__:!0})}function on(e){return class{__unenv__=!0;constructor(){throw new Error(`[unenv] ${e} is not implemented yet!`)}}}var nt=re(()=>{w();E();v();o(U,"createNotImplementedError");o(pe,"notImplemented");o(on,"notImplementedClass")});var At,Nt,ci,Ee,$t,Ce,De,Ue,Me,Ie,ln,dn=re(()=>{w();E();v();nt();At=globalThis.performance?.timeOrigin??Date.now(),Nt=globalThis.performance?.now?globalThis.performance.now.bind(globalThis.performance):()=>Date.now()-At,ci={name:"node",entryType:"node",startTime:0,duration:0,nodeStart:0,v8Start:0,bootstrapComplete:0,environment:0,loopStart:0,loopExit:0,idleTime:0,uvMetricsInfo:{loopCount:0,events:0,eventsWaiting:0},detail:void 0,toJSON(){return this}},Ee=class{__unenv__=!0;detail;entryType="event";name;startTime;constructor(t,n){this.name=t,this.startTime=n?.startTime||Nt(),this.detail=n?.detail}get duration(){return Nt()-this.startTime}toJSON(){return{name:this.name,entryType:this.entryType,startTime:this.startTime,duration:this.duration,detail:this.detail}}};o(Ee,"PerformanceEntry");$t=o(class extends Ee{entryType="mark";constructor(){super(...arguments)}get duration(){return 0}},"PerformanceMark"),Ce=class extends Ee{entryType="measure"};o(Ce,"PerformanceMeasure");De=class extends Ee{entryType="resource";serverTiming=[];connectEnd=0;connectStart=0;decodedBodySize=0;domainLookupEnd=0;domainLookupStart=0;encodedBodySize=0;fetchStart=0;initiatorType="";name="";nextHopProtocol="";redirectEnd=0;redirectStart=0;requestStart=0;responseEnd=0;responseStart=0;secureConnectionStart=0;startTime=0;transferSize=0;workerStart=0;responseStatus=0};o(De,"PerformanceResourceTiming");Ue=class{__unenv__=!0;getEntries(){return[]}getEntriesByName(t,n){return[]}getEntriesByType(t){return[]}};o(Ue,"PerformanceObserverEntryList");Me=class{__unenv__=!0;timeOrigin=At;eventCounts=new Map;_entries=[];_resourceTimingBufferSize=0;navigation=void 0;timing=void 0;timerify(t,n){throw U("Performance.timerify")}get nodeTiming(){return ci}eventLoopUtilization(){return{}}markResourceTiming(){return new De("")}onresourcetimingbufferfull=null;now(){return this.timeOrigin===At?Nt():Date.now()-this.timeOrigin}clearMarks(t){this._entries=t?this._entries.filter(n=>n.name!==t):this._entries.filter(n=>n.entryType!=="mark")}clearMeasures(t){this._entries=t?this._entries.filter(n=>n.name!==t):this._entries.filter(n=>n.entryType!=="measure")}clearResourceTimings(){this._entries=this._entries.filter(t=>t.entryType!=="resource"||t.entryType!=="navigation")}getEntries(){return this._entries}getEntriesByName(t,n){return this._entries.filter(r=>r.name===t&&(!n||r.entryType===n))}getEntriesByType(t){return this._entries.filter(n=>n.entryType===t)}mark(t,n){let r=new $t(t,n);return this._entries.push(r),r}measure(t,n,r){let i,a;typeof n=="string"?(i=this.getEntriesByName(n,"mark")[0]?.startTime,a=this.getEntriesByName(r,"mark")[0]?.startTime):(i=Number.parseFloat(n?.start)||this.now(),a=Number.parseFloat(n?.end)||this.now());let s=new Ce(t,{startTime:i,detail:{start:i,end:a}});return this._entries.push(s),s}setResourceTimingBufferSize(t){this._resourceTimingBufferSize=t}addEventListener(t,n,r){throw U("Performance.addEventListener")}removeEventListener(t,n,r){throw U("Performance.removeEventListener")}dispatchEvent(t){throw U("Performance.dispatchEvent")}toJSON(){return this}};o(Me,"Performance");Ie=class{__unenv__=!0;_callback=null;constructor(t){this._callback=t}takeRecords(){return[]}disconnect(){throw U("PerformanceObserver.disconnect")}observe(t){throw U("PerformanceObserver.observe")}bind(t){return t}runInAsyncScope(t,n,...r){return t.call(n,...r)}asyncId(){return 0}triggerAsyncId(){return 0}emitDestroy(){return this}};o(Ie,"PerformanceObserver"),sn(Ie,"supportedEntryTypes",[]);ln=globalThis.performance&&"addEventListener"in globalThis.performance?globalThis.performance:new Me});var un=re(()=>{w();E();v();dn()});var v=re(()=>{un();globalThis.performance=ln;globalThis.Performance=Me;globalThis.PerformanceEntry=Ee;globalThis.PerformanceMark=$t;globalThis.PerformanceMeasure=Ce;globalThis.PerformanceObserver=Ie;globalThis.PerformanceObserverEntryList=Ue;globalThis.PerformanceResourceTiming=De});var Y,cn=re(()=>{w();E();v();Y=Object.assign(()=>{},{__unenv__:!0})});import{Writable as hn}from"node:stream";var G,fn,pn,gn,rt,hi,go,mo,bo,fi,vo,Eo,wo,yo,xo,So,_o,ko,Ro,To,Ao,No,$o,zo,Oo,Io,mn,bn,vn,En,wn=re(()=>{w();E();v();cn();nt();G=globalThis.console,fn=!0,pn=new hn,gn=new hn,rt=G?.log??Y,hi=G?.info??rt,go=G?.trace??hi,mo=G?.debug??rt,bo=G?.table??rt,fi=G?.error??rt,vo=G?.warn??fi,Eo=G?.createTask??pe("console.createTask"),wo=G?.clear??Y,yo=G?.count??Y,xo=G?.countReset??Y,So=G?.dir??Y,_o=G?.dirxml??Y,ko=G?.group??Y,Ro=G?.groupEnd??Y,To=G?.groupCollapsed??Y,Ao=G?.profile??Y,No=G?.profileEnd??Y,$o=G?.time??Y,zo=G?.timeEnd??Y,Oo=G?.timeLog??Y,Io=G?.timeStamp??Y,mn=G?.Console??on("console.Console"),bn=new Map,vn=Y,En=Y});var zt,Ho,Fo,jo,Uo,qo,Wo,Go,Ko,Zo,Jo,Vo,Yo,Qo,Xo,el,tl,nl,rl,il,al,sl,ol,ll,dl,yn,xn=re(()=>{w();E();v();wn();zt=globalThis.console,{assert:Ho,clear:Fo,context:jo,count:Uo,countReset:qo,createTask:Wo,debug:Go,dir:Ko,dirxml:Zo,error:Jo,group:Vo,groupCollapsed:Yo,groupEnd:Qo,info:Xo,log:el,profile:tl,profileEnd:nl,table:rl,time:il,timeEnd:al,timeLog:sl,timeStamp:ol,trace:ll,warn:dl}=zt;Object.assign(zt,{Console:mn,_ignoreErrors:fn,_stderr:pn,_stderrErrorHandler:En,_stdout:gn,_stdoutErrorHandler:vn,_times:bn});yn=zt});var E=re(()=>{xn();globalThis.console=yn});var Sn,_n=re(()=>{w();E();v();Sn=Object.assign(o(function(t){let n=Date.now(),r=Math.trunc(n/1e3),i=n%1e3*1e6;if(t){let a=r-t[0],s=i-t[0];return s<0&&(a=a-1,s=1e9+s),[a,s]}return[r,i]},"hrtime"),{bigint:o(function(){return BigInt(Date.now()*1e6)},"bigint")})});import{Socket as pi}from"node:net";var Le,kn=re(()=>{w();E();v();Le=class extends pi{fd;constructor(t){super(),this.fd=t}isRaw=!1;setRawMode(t){return this.isRaw=t,this}isTTY=!1};o(Le,"ReadStream")});import{Socket as gi}from"node:net";var ke,Rn=re(()=>{w();E();v();ke=class extends gi{fd;constructor(t){super(),this.fd=t}clearLine(t,n){return n&&n(),!1}clearScreenDown(t){return t&&t(),!1}cursorTo(t,n,r){return r&&typeof r=="function"&&r(),!1}moveCursor(t,n,r){return r&&r(),!1}getColorDepth(t){return 1}hasColors(t,n){return!1}getWindowSize(){return[this.columns,this.rows]}columns=80;rows=24;isTTY=!1};o(ke,"WriteStream")});var Tn=re(()=>{w();E();v();kn();Rn()});import{EventEmitter as An}from"node:events";var Re,Nn=re(()=>{w();E();v();Tn();nt();Re=class extends An{env;hrtime;nextTick;constructor(t){super(),this.env=t.env,this.hrtime=t.hrtime,this.nextTick=t.nextTick;for(let n of[...Object.getOwnPropertyNames(Re.prototype),...Object.getOwnPropertyNames(An.prototype)]){let r=this[n];typeof r=="function"&&(this[n]=r.bind(this))}}emitWarning(t,n,r){console.warn(`${r?`[${r}] `:""}${n?`${n}: `:""}${t}`)}emit(...t){return super.emit(...t)}listeners(t){return super.listeners(t)}#t;#e;#n;get stdin(){return this.#t??=new Le(0)}get stdout(){return this.#e??=new ke(1)}get stderr(){return this.#n??=new ke(2)}#a="/";chdir(t){this.#a=t}cwd(){return this.#a}arch="";platform="";argv=[];argv0="";execArgv=[];execPath="";title="";pid=200;ppid=100;get version(){return""}get versions(){return{}}get allowedNodeEnvironmentFlags(){return new Set}get sourceMapsEnabled(){return!1}get debugPort(){return 0}get throwDeprecation(){return!1}get traceDeprecation(){return!1}get features(){return{}}get release(){return{}}get connected(){return!1}get config(){return{}}get moduleLoadList(){return[]}constrainedMemory(){return 0}availableMemory(){return 0}uptime(){return 0}resourceUsage(){return{}}ref(){}unref(){}umask(){throw U("process.umask")}getBuiltinModule(){}getActiveResourcesInfo(){throw U("process.getActiveResourcesInfo")}exit(){throw U("process.exit")}reallyExit(){throw U("process.reallyExit")}kill(){throw U("process.kill")}abort(){throw U("process.abort")}dlopen(){throw U("process.dlopen")}setSourceMapsEnabled(){throw U("process.setSourceMapsEnabled")}loadEnvFile(){throw U("process.loadEnvFile")}disconnect(){throw U("process.disconnect")}cpuUsage(){throw U("process.cpuUsage")}setUncaughtExceptionCaptureCallback(){throw U("process.setUncaughtExceptionCaptureCallback")}hasUncaughtExceptionCaptureCallback(){throw U("process.hasUncaughtExceptionCaptureCallback")}initgroups(){throw U("process.initgroups")}openStdin(){throw U("process.openStdin")}assert(){throw U("process.assert")}binding(){throw U("process.binding")}permission={has:pe("process.permission.has")};report={directory:"",filename:"",signal:"SIGUSR2",compact:!1,reportOnFatalError:!1,reportOnSignal:!1,reportOnUncaughtException:!1,getReport:pe("process.report.getReport"),writeReport:pe("process.report.writeReport")};finalization={register:pe("process.finalization.register"),unregister:pe("process.finalization.unregister"),registerBeforeExit:pe("process.finalization.registerBeforeExit")};memoryUsage=Object.assign(()=>({arrayBuffers:0,rss:0,external:0,heapTotal:0,heapUsed:0}),{rss:()=>0});mainModule=void 0;domain=void 0;send=void 0;exitCode=void 0;channel=void 0;getegid=void 0;geteuid=void 0;getgid=void 0;getgroups=void 0;getuid=void 0;setegid=void 0;seteuid=void 0;setgid=void 0;setgroups=void 0;setuid=void 0;_events=void 0;_eventsCount=void 0;_exiting=void 0;_maxListeners=void 0;_debugEnd=void 0;_debugProcess=void 0;_fatalException=void 0;_getActiveHandles=void 0;_getActiveRequests=void 0;_kill=void 0;_preload_modules=void 0;_rawDebug=void 0;_startProfilerIdleNotifier=void 0;_stopProfilerIdleNotifier=void 0;_tickCallback=void 0;_disconnect=void 0;_handleQueue=void 0;_pendingMessage=void 0;_channel=void 0;_send=void 0;_linkedBinding=void 0};o(Re,"Process")});var $n,zn,mi,bi,On,vi,Ei,wi,yi,xi,Si,_i,ki,Ri,Ti,Ai,Ni,$i,zi,Oi,Ii,Ci,Di,Mi,Li,Bi,Pi,Hi,Fi,ji,Ui,qi,Wi,Gi,Ki,Zi,Ji,Vi,Yi,Qi,Xi,ea,ta,na,ra,ia,aa,sa,oa,la,da,ua,ca,ha,fa,pa,ga,ma,ba,va,Ea,wa,ya,xa,Sa,_a,ka,Ra,Ta,Aa,Na,$a,za,Oa,Ia,Ca,Da,Ma,La,Ba,Pa,Ha,Fa,ja,Ua,qa,Wa,Ga,Ka,Za,Ja,Va,Ya,Qa,Xa,es,ts,ns,rs,is,as,ss,os,ls,ds,us,cs,hs,fs,ps,In,Cn=re(()=>{w();E();v();_n();Nn();$n=globalThis.process,zn=$n.getBuiltinModule,{exit:mi,platform:bi,nextTick:On}=zn("node:process"),vi=new Re({env:$n.env,hrtime:Sn,nextTick:On}),{abort:Ei,addListener:wi,allowedNodeEnvironmentFlags:yi,hasUncaughtExceptionCaptureCallback:xi,setUncaughtExceptionCaptureCallback:Si,loadEnvFile:_i,sourceMapsEnabled:ki,arch:Ri,argv:Ti,argv0:Ai,chdir:Ni,config:$i,connected:zi,constrainedMemory:Oi,availableMemory:Ii,cpuUsage:Ci,cwd:Di,debugPort:Mi,dlopen:Li,disconnect:Bi,emit:Pi,emitWarning:Hi,env:Fi,eventNames:ji,execArgv:Ui,execPath:qi,finalization:Wi,features:Gi,getActiveResourcesInfo:Ki,getMaxListeners:Zi,hrtime:Ji,kill:Vi,listeners:Yi,listenerCount:Qi,memoryUsage:Xi,on:ea,off:ta,once:na,pid:ra,ppid:ia,prependListener:aa,prependOnceListener:sa,rawListeners:oa,release:la,removeAllListeners:da,removeListener:ua,report:ca,resourceUsage:ha,setMaxListeners:fa,setSourceMapsEnabled:pa,stderr:ga,stdin:ma,stdout:ba,title:va,throwDeprecation:Ea,traceDeprecation:wa,umask:ya,uptime:xa,version:Sa,versions:_a,domain:ka,initgroups:Ra,moduleLoadList:Ta,reallyExit:Aa,openStdin:Na,assert:$a,binding:za,send:Oa,exitCode:Ia,channel:Ca,getegid:Da,geteuid:Ma,getgid:La,getgroups:Ba,getuid:Pa,setegid:Ha,seteuid:Fa,setgid:ja,setgroups:Ua,setuid:qa,permission:Wa,mainModule:Ga,_events:Ka,_eventsCount:Za,_exiting:Ja,_maxListeners:Va,_debugEnd:Ya,_debugProcess:Qa,_fatalException:Xa,_getActiveHandles:es,_getActiveRequests:ts,_kill:ns,_preload_modules:rs,_rawDebug:is,_startProfilerIdleNotifier:as,_stopProfilerIdleNotifier:ss,_tickCallback:os,_disconnect:ls,_handleQueue:ds,_pendingMessage:us,_channel:cs,_send:hs,_linkedBinding:fs}=vi,ps={abort:Ei,addListener:wi,allowedNodeEnvironmentFlags:yi,hasUncaughtExceptionCaptureCallback:xi,setUncaughtExceptionCaptureCallback:Si,loadEnvFile:_i,sourceMapsEnabled:ki,arch:Ri,argv:Ti,argv0:Ai,chdir:Ni,config:$i,connected:zi,constrainedMemory:Oi,availableMemory:Ii,cpuUsage:Ci,cwd:Di,debugPort:Mi,dlopen:Li,disconnect:Bi,emit:Pi,emitWarning:Hi,env:Fi,eventNames:ji,execArgv:Ui,execPath:qi,exit:mi,finalization:Wi,features:Gi,getBuiltinModule:zn,getActiveResourcesInfo:Ki,getMaxListeners:Zi,hrtime:Ji,kill:Vi,listeners:Yi,listenerCount:Qi,memoryUsage:Xi,nextTick:On,on:ea,off:ta,once:na,pid:ra,platform:bi,ppid:ia,prependListener:aa,prependOnceListener:sa,rawListeners:oa,release:la,removeAllListeners:da,removeListener:ua,report:ca,resourceUsage:ha,setMaxListeners:fa,setSourceMapsEnabled:pa,stderr:ga,stdin:ma,stdout:ba,title:va,throwDeprecation:Ea,traceDeprecation:wa,umask:ya,uptime:xa,version:Sa,versions:_a,domain:ka,initgroups:Ra,moduleLoadList:Ta,reallyExit:Aa,openStdin:Na,assert:$a,binding:za,send:Oa,exitCode:Ia,channel:Ca,getegid:Da,geteuid:Ma,getgid:La,getgroups:Ba,getuid:Pa,setegid:Ha,seteuid:Fa,setgid:ja,setgroups:Ua,setuid:qa,permission:Wa,mainModule:Ga,_events:Ka,_eventsCount:Za,_exiting:Ja,_maxListeners:Va,_debugEnd:Ya,_debugProcess:Qa,_fatalException:Xa,_getActiveHandles:es,_getActiveRequests:ts,_kill:ns,_preload_modules:rs,_rawDebug:is,_startProfilerIdleNotifier:as,_stopProfilerIdleNotifier:ss,_tickCallback:os,_disconnect:ls,_handleQueue:ds,_pendingMessage:us,_channel:cs,_send:hs,_linkedBinding:fs},In=ps});var w=re(()=>{Cn();globalThis.process=In});var Fr=li((Pr,Hr)=>{w();E();v();var Br=function(){var e=o(function(z,$){var A=236,k=17,g=z,R=n[$],c=null,d=0,N=null,m=[],T={},B=o(function(b,y){d=g*4+17,c=function(p){for(var x=new Array(p),_=0;_<p;_+=1){x[_]=new Array(p);for(var O=0;O<p;O+=1)x[_][O]=null}return x}(d),P(0,0),P(d-7,0),P(0,d-7),ne(),J(),he(b,y),g>=7&&de(b),N==null&&(N=ei(g,R,m)),fe(N,y)},"makeImpl"),P=o(function(b,y){for(var p=-1;p<=7;p+=1)if(!(b+p<=-1||d<=b+p))for(var x=-1;x<=7;x+=1)y+x<=-1||d<=y+x||(0<=p&&p<=6&&(x==0||x==6)||0<=x&&x<=6&&(p==0||p==6)||2<=p&&p<=4&&2<=x&&x<=4?c[b+p][y+x]=!0:c[b+p][y+x]=!1)},"setupPositionProbePattern"),j=o(function(){for(var b=0,y=0,p=0;p<8;p+=1){B(!0,p);var x=i.getLostPoint(T);(p==0||b>x)&&(b=x,y=p)}return y},"getBestMaskPattern"),J=o(function(){for(var b=8;b<d-8;b+=1)c[b][6]==null&&(c[b][6]=b%2==0);for(var y=8;y<d-8;y+=1)c[6][y]==null&&(c[6][y]=y%2==0)},"setupTimingPattern"),ne=o(function(){for(var b=i.getPatternPosition(g),y=0;y<b.length;y+=1)for(var p=0;p<b.length;p+=1){var x=b[y],_=b[p];if(c[x][_]==null)for(var O=-2;O<=2;O+=1)for(var D=-2;D<=2;D+=1)O==-2||O==2||D==-2||D==2||O==0&&D==0?c[x+O][_+D]=!0:c[x+O][_+D]=!1}},"setupPositionAdjustPattern"),de=o(function(b){for(var y=i.getBCHTypeNumber(g),p=0;p<18;p+=1){var x=!b&&(y>>p&1)==1;c[Math.floor(p/3)][p%3+d-8-3]=x}for(var p=0;p<18;p+=1){var x=!b&&(y>>p&1)==1;c[p%3+d-8-3][Math.floor(p/3)]=x}},"setupTypeNumber"),he=o(function(b,y){for(var p=R<<3|y,x=i.getBCHTypeInfo(p),_=0;_<15;_+=1){var O=!b&&(x>>_&1)==1;_<6?c[_][8]=O:_<8?c[_+1][8]=O:c[d-15+_][8]=O}for(var _=0;_<15;_+=1){var O=!b&&(x>>_&1)==1;_<8?c[8][d-_-1]=O:_<9?c[8][15-_-1+1]=O:c[8][15-_-1]=O}c[d-8][8]=!b},"setupTypeInfo"),fe=o(function(b,y){for(var p=-1,x=d-1,_=7,O=0,D=i.getMaskFunction(y),C=d-1;C>0;C-=2)for(C==6&&(C-=1);;){for(var q=0;q<2;q+=1)if(c[x][C-q]==null){var V=!1;O<b.length&&(V=(b[O]>>>_&1)==1);var L=D(x,C-q);L&&(V=!V),c[x][C-q]=V,_-=1,_==-1&&(O+=1,_=7)}if(x+=p,x<0||d<=x){x-=p,p=-p;break}}},"mapData"),ze=o(function(b,y){for(var p=0,x=0,_=0,O=new Array(y.length),D=new Array(y.length),C=0;C<y.length;C+=1){var q=y[C].dataCount,V=y[C].totalCount-q;x=Math.max(x,q),_=Math.max(_,V),O[C]=new Array(q);for(var L=0;L<O[C].length;L+=1)O[C][L]=255&b.getBuffer()[L+p];p+=q;var ie=i.getErrorCorrectPolynomial(V),ae=s(O[C],ie.getLength()-1),nn=ae.mod(ie);D[C]=new Array(ie.getLength()-1);for(var L=0;L<D[C].length;L+=1){var rn=L+nn.getLength()-D[C].length;D[C][L]=rn>=0?nn.getAt(rn):0}}for(var an=0,L=0;L<y.length;L+=1)an+=y[L].totalCount;for(var Tt=new Array(an),et=0,L=0;L<x;L+=1)for(var C=0;C<y.length;C+=1)L<O[C].length&&(Tt[et]=O[C][L],et+=1);for(var L=0;L<_;L+=1)for(var C=0;C<y.length;C+=1)L<D[C].length&&(Tt[et]=D[C][L],et+=1);return Tt},"createBytes"),ei=o(function(b,y,p){for(var x=l.getRSBlocks(b,y),_=u(),O=0;O<p.length;O+=1){var D=p[O];_.put(D.getMode(),4),_.put(D.getLength(),i.getLengthInBits(D.getMode(),b)),D.write(_)}for(var C=0,O=0;O<x.length;O+=1)C+=x[O].dataCount;if(_.getLengthInBits()>C*8)throw"code length overflow. ("+_.getLengthInBits()+">"+C*8+")";for(_.getLengthInBits()+4<=C*8&&_.put(0,4);_.getLengthInBits()%8!=0;)_.putBit(!1);for(;!(_.getLengthInBits()>=C*8||(_.put(A,8),_.getLengthInBits()>=C*8));)_.put(k,8);return ze(_,x)},"createData");T.addData=function(b,y){y=y||"Byte";var p=null;switch(y){case"Numeric":p=f(b);break;case"Alphanumeric":p=S(b);break;case"Byte":p=I(b);break;case"Kanji":p=H(b);break;default:throw"mode:"+y}m.push(p),N=null},T.isDark=function(b,y){if(b<0||d<=b||y<0||d<=y)throw b+","+y;return c[b][y]},T.getModuleCount=function(){return d},T.make=function(){if(g<1){for(var b=1;b<40;b++){for(var y=l.getRSBlocks(b,R),p=u(),x=0;x<m.length;x++){var _=m[x];p.put(_.getMode(),4),p.put(_.getLength(),i.getLengthInBits(_.getMode(),b)),_.write(p)}for(var O=0,x=0;x<y.length;x++)O+=y[x].dataCount;if(p.getLengthInBits()<=O*8)break}g=b}B(!1,j())},T.createTableTag=function(b,y){b=b||2,y=typeof y>"u"?b*4:y;var p="";p+='<table style="',p+=" border-width: 0px; border-style: none;",p+=" border-collapse: collapse;",p+=" padding: 0px; margin: "+y+"px;",p+='">',p+="<tbody>";for(var x=0;x<T.getModuleCount();x+=1){p+="<tr>";for(var _=0;_<T.getModuleCount();_+=1)p+='<td style="',p+=" border-width: 0px; border-style: none;",p+=" border-collapse: collapse;",p+=" padding: 0px; margin: 0px;",p+=" width: "+b+"px;",p+=" height: "+b+"px;",p+=" background-color: ",p+=T.isDark(x,_)?"#000000":"#ffffff",p+=";",p+='"/>';p+="</tr>"}return p+="</tbody>",p+="</table>",p},T.createSvgTag=function(b,y,p,x){var _={};typeof arguments[0]=="object"&&(_=arguments[0],b=_.cellSize,y=_.margin,p=_.alt,x=_.title),b=b||2,y=typeof y>"u"?b*4:y,p=typeof p=="string"?{text:p}:p||{},p.text=p.text||null,p.id=p.text?p.id||"qrcode-description":null,x=typeof x=="string"?{text:x}:x||{},x.text=x.text||null,x.id=x.text?x.id||"qrcode-title":null;var O=T.getModuleCount()*b+y*2,D,C,q,V,L="",ie;for(ie="l"+b+",0 0,"+b+" -"+b+",0 0,-"+b+"z ",L+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',L+=_.scalable?"":' width="'+O+'px" height="'+O+'px"',L+=' viewBox="0 0 '+O+" "+O+'" ',L+=' preserveAspectRatio="xMinYMin meet"',L+=x.text||p.text?' role="img" aria-labelledby="'+Oe([x.id,p.id].join(" ").trim())+'"':"",L+=">",L+=x.text?'<title id="'+Oe(x.id)+'">'+Oe(x.text)+"</title>":"",L+=p.text?'<description id="'+Oe(p.id)+'">'+Oe(p.text)+"</description>":"",L+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',L+='<path d="',q=0;q<T.getModuleCount();q+=1)for(V=q*b+y,D=0;D<T.getModuleCount();D+=1)T.isDark(q,D)&&(C=D*b+y,L+="M"+C+","+V+ie);return L+='" stroke="transparent" fill="black"/>',L+="</svg>",L},T.createDataURL=function(b,y){b=b||2,y=typeof y>"u"?b*4:y;var p=T.getModuleCount()*b+y*2,x=y,_=p-y;return te(p,p,function(O,D){if(x<=O&&O<_&&x<=D&&D<_){var C=Math.floor((O-x)/b),q=Math.floor((D-x)/b);return T.isDark(q,C)?0:1}else return 1})},T.createImgTag=function(b,y,p){b=b||2,y=typeof y>"u"?b*4:y;var x=T.getModuleCount()*b+y*2,_="";return _+="<img",_+=' src="',_+=T.createDataURL(b,y),_+='"',_+=' width="',_+=x,_+='"',_+=' height="',_+=x,_+='"',p&&(_+=' alt="',_+=Oe(p),_+='"'),_+="/>",_};var Oe=o(function(b){for(var y="",p=0;p<b.length;p+=1){var x=b.charAt(p);switch(x){case"<":y+="&lt;";break;case">":y+="&gt;";break;case"&":y+="&amp;";break;case'"':y+="&quot;";break;default:y+=x;break}}return y},"escapeXml"),ti=o(function(b){var y=1;b=typeof b>"u"?y*2:b;var p=T.getModuleCount()*y+b*2,x=b,_=p-b,O,D,C,q,V,L={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},ie={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},ae="";for(O=0;O<p;O+=2){for(C=Math.floor((O-x)/y),q=Math.floor((O+1-x)/y),D=0;D<p;D+=1)V="\u2588",x<=D&&D<_&&x<=O&&O<_&&T.isDark(C,Math.floor((D-x)/y))&&(V=" "),x<=D&&D<_&&x<=O+1&&O+1<_&&T.isDark(q,Math.floor((D-x)/y))?V+=" ":V+="\u2588",ae+=b<1&&O+1>=_?ie[V]:L[V];ae+=`
`}return p%2&&b>0?ae.substring(0,ae.length-p-1)+Array(p+1).join("\u2580"):ae.substring(0,ae.length-1)},"_createHalfASCII");return T.createASCII=function(b,y){if(b=b||1,b<2)return ti(y);b-=1,y=typeof y>"u"?b*2:y;var p=T.getModuleCount()*b+y*2,x=y,_=p-y,O,D,C,q,V=Array(b+1).join("\u2588\u2588"),L=Array(b+1).join("  "),ie="",ae="";for(O=0;O<p;O+=1){for(C=Math.floor((O-x)/b),ae="",D=0;D<p;D+=1)q=1,x<=D&&D<_&&x<=O&&O<_&&T.isDark(C,Math.floor((D-x)/b))&&(q=0),ae+=q?V:L;for(C=0;C<b;C+=1)ie+=ae+`
`}return ie.substring(0,ie.length-1)},T.renderTo2dContext=function(b,y){y=y||2;for(var p=T.getModuleCount(),x=0;x<p;x++)for(var _=0;_<p;_++)b.fillStyle=T.isDark(x,_)?"black":"white",b.fillRect(x*y,_*y,y,y)},T},"qrcode");e.stringToBytesFuncs={default:function(z){for(var $=[],A=0;A<z.length;A+=1){var k=z.charCodeAt(A);$.push(k&255)}return $}},e.stringToBytes=e.stringToBytesFuncs.default,e.createStringToBytes=function(z,$){var A=function(){for(var g=ve(z),R=o(function(){var J=g.read();if(J==-1)throw"eof";return J},"read"),c=0,d={};;){var N=g.read();if(N==-1)break;var m=R(),T=R(),B=R(),P=String.fromCharCode(N<<8|m),j=T<<8|B;d[P]=j,c+=1}if(c!=$)throw c+" != "+$;return d}(),k="?".charCodeAt(0);return function(g){for(var R=[],c=0;c<g.length;c+=1){var d=g.charCodeAt(c);if(d<128)R.push(d);else{var N=A[g.charAt(c)];typeof N=="number"?(N&255)==N?R.push(N):(R.push(N>>>8),R.push(N&255)):R.push(k)}}return R}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},n={L:1,M:0,Q:3,H:2},r={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},i=function(){var z=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],$=1335,A=7973,k=21522,g={},R=o(function(c){for(var d=0;c!=0;)d+=1,c>>>=1;return d},"getBCHDigit");return g.getBCHTypeInfo=function(c){for(var d=c<<10;R(d)-R($)>=0;)d^=$<<R(d)-R($);return(c<<10|d)^k},g.getBCHTypeNumber=function(c){for(var d=c<<12;R(d)-R(A)>=0;)d^=A<<R(d)-R(A);return c<<12|d},g.getPatternPosition=function(c){return z[c-1]},g.getMaskFunction=function(c){switch(c){case r.PATTERN000:return function(d,N){return(d+N)%2==0};case r.PATTERN001:return function(d,N){return d%2==0};case r.PATTERN010:return function(d,N){return N%3==0};case r.PATTERN011:return function(d,N){return(d+N)%3==0};case r.PATTERN100:return function(d,N){return(Math.floor(d/2)+Math.floor(N/3))%2==0};case r.PATTERN101:return function(d,N){return d*N%2+d*N%3==0};case r.PATTERN110:return function(d,N){return(d*N%2+d*N%3)%2==0};case r.PATTERN111:return function(d,N){return(d*N%3+(d+N)%2)%2==0};default:throw"bad maskPattern:"+c}},g.getErrorCorrectPolynomial=function(c){for(var d=s([1],0),N=0;N<c;N+=1)d=d.multiply(s([1,a.gexp(N)],0));return d},g.getLengthInBits=function(c,d){if(1<=d&&d<10)switch(c){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+c}else if(d<27)switch(c){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+c}else if(d<41)switch(c){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+c}else throw"type:"+d},g.getLostPoint=function(c){for(var d=c.getModuleCount(),N=0,m=0;m<d;m+=1)for(var T=0;T<d;T+=1){for(var B=0,P=c.isDark(m,T),j=-1;j<=1;j+=1)if(!(m+j<0||d<=m+j))for(var J=-1;J<=1;J+=1)T+J<0||d<=T+J||j==0&&J==0||P==c.isDark(m+j,T+J)&&(B+=1);B>5&&(N+=3+B-5)}for(var m=0;m<d-1;m+=1)for(var T=0;T<d-1;T+=1){var ne=0;c.isDark(m,T)&&(ne+=1),c.isDark(m+1,T)&&(ne+=1),c.isDark(m,T+1)&&(ne+=1),c.isDark(m+1,T+1)&&(ne+=1),(ne==0||ne==4)&&(N+=3)}for(var m=0;m<d;m+=1)for(var T=0;T<d-6;T+=1)c.isDark(m,T)&&!c.isDark(m,T+1)&&c.isDark(m,T+2)&&c.isDark(m,T+3)&&c.isDark(m,T+4)&&!c.isDark(m,T+5)&&c.isDark(m,T+6)&&(N+=40);for(var T=0;T<d;T+=1)for(var m=0;m<d-6;m+=1)c.isDark(m,T)&&!c.isDark(m+1,T)&&c.isDark(m+2,T)&&c.isDark(m+3,T)&&c.isDark(m+4,T)&&!c.isDark(m+5,T)&&c.isDark(m+6,T)&&(N+=40);for(var de=0,T=0;T<d;T+=1)for(var m=0;m<d;m+=1)c.isDark(m,T)&&(de+=1);var he=Math.abs(100*de/d/d-50)/5;return N+=he*10,N},g}(),a=function(){for(var z=new Array(256),$=new Array(256),A=0;A<8;A+=1)z[A]=1<<A;for(var A=8;A<256;A+=1)z[A]=z[A-4]^z[A-5]^z[A-6]^z[A-8];for(var A=0;A<255;A+=1)$[z[A]]=A;var k={};return k.glog=function(g){if(g<1)throw"glog("+g+")";return $[g]},k.gexp=function(g){for(;g<0;)g+=255;for(;g>=256;)g-=255;return z[g]},k}();function s(z,$){if(typeof z.length>"u")throw z.length+"/"+$;var A=function(){for(var g=0;g<z.length&&z[g]==0;)g+=1;for(var R=new Array(z.length-g+$),c=0;c<z.length-g;c+=1)R[c]=z[c+g];return R}(),k={};return k.getAt=function(g){return A[g]},k.getLength=function(){return A.length},k.multiply=function(g){for(var R=new Array(k.getLength()+g.getLength()-1),c=0;c<k.getLength();c+=1)for(var d=0;d<g.getLength();d+=1)R[c+d]^=a.gexp(a.glog(k.getAt(c))+a.glog(g.getAt(d)));return s(R,0)},k.mod=function(g){if(k.getLength()-g.getLength()<0)return k;for(var R=a.glog(k.getAt(0))-a.glog(g.getAt(0)),c=new Array(k.getLength()),d=0;d<k.getLength();d+=1)c[d]=k.getAt(d);for(var d=0;d<g.getLength();d+=1)c[d]^=a.gexp(a.glog(g.getAt(d))+R);return s(c,0).mod(g)},k}o(s,"qrPolynomial");var l=function(){var z=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],$=o(function(g,R){var c={};return c.totalCount=g,c.dataCount=R,c},"qrRSBlock"),A={},k=o(function(g,R){switch(R){case n.L:return z[(g-1)*4+0];case n.M:return z[(g-1)*4+1];case n.Q:return z[(g-1)*4+2];case n.H:return z[(g-1)*4+3];default:return}},"getRsBlockTable");return A.getRSBlocks=function(g,R){var c=k(g,R);if(typeof c>"u")throw"bad rs block @ typeNumber:"+g+"/errorCorrectionLevel:"+R;for(var d=c.length/3,N=[],m=0;m<d;m+=1)for(var T=c[m*3+0],B=c[m*3+1],P=c[m*3+2],j=0;j<T;j+=1)N.push($(B,P));return N},A}(),u=o(function(){var z=[],$=0,A={};return A.getBuffer=function(){return z},A.getAt=function(k){var g=Math.floor(k/8);return(z[g]>>>7-k%8&1)==1},A.put=function(k,g){for(var R=0;R<g;R+=1)A.putBit((k>>>g-R-1&1)==1)},A.getLengthInBits=function(){return $},A.putBit=function(k){var g=Math.floor($/8);z.length<=g&&z.push(0),k&&(z[g]|=128>>>$%8),$+=1},A},"qrBitBuffer"),f=o(function(z){var $=t.MODE_NUMBER,A=z,k={};k.getMode=function(){return $},k.getLength=function(c){return A.length},k.write=function(c){for(var d=A,N=0;N+2<d.length;)c.put(g(d.substring(N,N+3)),10),N+=3;N<d.length&&(d.length-N==1?c.put(g(d.substring(N,N+1)),4):d.length-N==2&&c.put(g(d.substring(N,N+2)),7))};var g=o(function(c){for(var d=0,N=0;N<c.length;N+=1)d=d*10+R(c.charAt(N));return d},"strToNum"),R=o(function(c){if("0"<=c&&c<="9")return c.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+c},"chatToNum");return k},"qrNumber"),S=o(function(z){var $=t.MODE_ALPHA_NUM,A=z,k={};k.getMode=function(){return $},k.getLength=function(R){return A.length},k.write=function(R){for(var c=A,d=0;d+1<c.length;)R.put(g(c.charAt(d))*45+g(c.charAt(d+1)),11),d+=2;d<c.length&&R.put(g(c.charAt(d)),6)};var g=o(function(R){if("0"<=R&&R<="9")return R.charCodeAt(0)-"0".charCodeAt(0);if("A"<=R&&R<="Z")return R.charCodeAt(0)-"A".charCodeAt(0)+10;switch(R){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+R}},"getCode");return k},"qrAlphaNum"),I=o(function(z){var $=t.MODE_8BIT_BYTE,A=z,k=e.stringToBytes(z),g={};return g.getMode=function(){return $},g.getLength=function(R){return k.length},g.write=function(R){for(var c=0;c<k.length;c+=1)R.put(k[c],8)},g},"qr8BitByte"),H=o(function(z){var $=t.MODE_KANJI,A=z,k=e.stringToBytesFuncs.SJIS;if(!k)throw"sjis not supported.";(function(c,d){var N=k(c);if(N.length!=2||(N[0]<<8|N[1])!=d)throw"sjis not supported."})("\u53CB",38726);var g=k(z),R={};return R.getMode=function(){return $},R.getLength=function(c){return~~(g.length/2)},R.write=function(c){for(var d=g,N=0;N+1<d.length;){var m=(255&d[N])<<8|255&d[N+1];if(33088<=m&&m<=40956)m-=33088;else if(57408<=m&&m<=60351)m-=49472;else throw"illegal char at "+(N+1)+"/"+m;m=(m>>>8&255)*192+(m&255),c.put(m,13),N+=2}if(N<d.length)throw"illegal char at "+(N+1)},R},"qrKanji"),F=o(function(){var z=[],$={};return $.writeByte=function(A){z.push(A&255)},$.writeShort=function(A){$.writeByte(A),$.writeByte(A>>>8)},$.writeBytes=function(A,k,g){k=k||0,g=g||A.length;for(var R=0;R<g;R+=1)$.writeByte(A[R+k])},$.writeString=function(A){for(var k=0;k<A.length;k+=1)$.writeByte(A.charCodeAt(k))},$.toByteArray=function(){return z},$.toString=function(){var A="";A+="[";for(var k=0;k<z.length;k+=1)k>0&&(A+=","),A+=z[k];return A+="]",A},$},"byteArrayOutputStream"),le=o(function(){var z=0,$=0,A=0,k="",g={},R=o(function(d){k+=String.fromCharCode(c(d&63))},"writeEncoded"),c=o(function(d){if(!(d<0)){if(d<26)return 65+d;if(d<52)return 97+(d-26);if(d<62)return 48+(d-52);if(d==62)return 43;if(d==63)return 47}throw"n:"+d},"encode");return g.writeByte=function(d){for(z=z<<8|d&255,$+=8,A+=1;$>=6;)R(z>>>$-6),$-=6},g.flush=function(){if($>0&&(R(z<<6-$),z=0,$=0),A%3!=0)for(var d=3-A%3,N=0;N<d;N+=1)k+="="},g.toString=function(){return k},g},"base64EncodeOutputStream"),ve=o(function(z){var $=z,A=0,k=0,g=0,R={};R.read=function(){for(;g<8;){if(A>=$.length){if(g==0)return-1;throw"unexpected end of file./"+g}var d=$.charAt(A);if(A+=1,d=="=")return g=0,-1;if(d.match(/^\s$/))continue;k=k<<6|c(d.charCodeAt(0)),g+=6}var N=k>>>g-8&255;return g-=8,N};var c=o(function(d){if(65<=d&&d<=90)return d-65;if(97<=d&&d<=122)return d-97+26;if(48<=d&&d<=57)return d-48+52;if(d==43)return 62;if(d==47)return 63;throw"c:"+d},"decode");return R},"base64DecodeInputStream"),je=o(function(z,$){var A=z,k=$,g=new Array(z*$),R={};R.setPixel=function(m,T,B){g[T*A+m]=B},R.write=function(m){m.writeString("GIF87a"),m.writeShort(A),m.writeShort(k),m.writeByte(128),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(0),m.writeByte(255),m.writeByte(255),m.writeByte(255),m.writeString(","),m.writeShort(0),m.writeShort(0),m.writeShort(A),m.writeShort(k),m.writeByte(0);var T=2,B=d(T);m.writeByte(T);for(var P=0;B.length-P>255;)m.writeByte(255),m.writeBytes(B,P,255),P+=255;m.writeByte(B.length-P),m.writeBytes(B,P,B.length-P),m.writeByte(0),m.writeString(";")};var c=o(function(m){var T=m,B=0,P=0,j={};return j.write=function(J,ne){if(J>>>ne)throw"length over";for(;B+ne>=8;)T.writeByte(255&(J<<B|P)),ne-=8-B,J>>>=8-B,P=0,B=0;P=J<<B|P,B=B+ne},j.flush=function(){B>0&&T.writeByte(P)},j},"bitOutputStream"),d=o(function(m){for(var T=1<<m,B=(1<<m)+1,P=m+1,j=N(),J=0;J<T;J+=1)j.add(String.fromCharCode(J));j.add(String.fromCharCode(T)),j.add(String.fromCharCode(B));var ne=F(),de=c(ne);de.write(T,P);var he=0,fe=String.fromCharCode(g[he]);for(he+=1;he<g.length;){var ze=String.fromCharCode(g[he]);he+=1,j.contains(fe+ze)?fe=fe+ze:(de.write(j.indexOf(fe),P),j.size()<4095&&(j.size()==1<<P&&(P+=1),j.add(fe+ze)),fe=ze)}return de.write(j.indexOf(fe),P),de.write(B,P),de.flush(),ne.toByteArray()},"getLZWRaster"),N=o(function(){var m={},T=0,B={};return B.add=function(P){if(B.contains(P))throw"dup key:"+P;m[P]=T,T+=1},B.size=function(){return T},B.indexOf=function(P){return m[P]},B.contains=function(P){return typeof m[P]<"u"},B},"lzwTable");return R},"gifImage"),te=o(function(z,$,A){for(var k=je(z,$),g=0;g<$;g+=1)for(var R=0;R<z;R+=1)k.setPixel(R,g,A(R,g));var c=F();k.write(c);for(var d=le(),N=c.toByteArray(),m=0;m<N.length;m+=1)d.writeByte(N[m]);return d.flush(),"data:image/gif;base64,"+d},"createDataURL");return e}();(function(){Br.stringToBytesFuncs["UTF-8"]=function(e){function t(n){for(var r=[],i=0;i<n.length;i++){var a=n.charCodeAt(i);a<128?r.push(a):a<2048?r.push(192|a>>6,128|a&63):a<55296||a>=57344?r.push(224|a>>12,128|a>>6&63,128|a&63):(i++,a=65536+((a&1023)<<10|n.charCodeAt(i)&1023),r.push(240|a>>18,128|a>>12&63,128|a>>6&63,128|a&63))}return r}return o(t,"toUTF8Array"),t(e)}})();(function(e){typeof define=="function"&&define.amd?define([],e):typeof Pr=="object"&&(Hr.exports=e())})(function(){return Br})});w();E();v();w();E();v();w();E();v();w();E();v();w();E();v();var Ot=o((e,t,n)=>(r,i)=>{let a=-1;return s(0);async function s(l){if(l<=a)throw new Error("next() called multiple times");a=l;let u,f=!1,S;if(e[l]?(S=e[l][0][0],r.req.routeIndex=l):S=l===e.length&&i||void 0,S)try{u=await S(r,()=>s(l+1))}catch(I){if(I instanceof Error&&t)r.error=I,u=await t(I,r),f=!0;else throw I}else r.finalized===!1&&n&&(u=await n(r));return u&&(r.finalized===!1||f)&&(r.res=u),r}},"compose");w();E();v();w();E();v();w();E();v();w();E();v();var Dn=Symbol();w();E();v();w();E();v();w();E();v();var Mn=o((e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,r=>r.toLowerCase())}}).formData(),"bufferToFormData");var Ln=32,gs=1e4,it=o(e=>"headers"in e,"isRawRequest"),Hn=o(async(e,t=Object.create(null))=>{let{all:n=!1,dot:r=!1}=t,s=(it(e)?e.headers:e.raw.headers).get("Content-Type")?.split(";")[0].trim().toLowerCase();return s==="multipart/form-data"||s==="application/x-www-form-urlencoded"?ms(e,{all:n,dot:r}):{}},"parseBody");async function ms(e,t){if(!it(e)&&e.bodyCache.formData)return Bn(await e.bodyCache.formData,t);let n=it(e)?e.headers:e.raw.headers,r=await e.arrayBuffer(),i=Mn(r,n.get("Content-Type")||"");it(e)||(e.bodyCache.formData=i);let a=await i;return a?Bn(a,t):{}}o(ms,"parseFormData");function Bn(e,t){let n=Object.create(null),r={count:0};return e.forEach((i,a)=>{t.all||a.endsWith("[]")?bs(n,a,i):n[a]=i}),t.dot&&Object.entries(n).forEach(([i,a])=>{i.includes(".")&&(vs(n,i,a,r),delete n[i])}),n}o(Bn,"convertFormDataToBodyData");var bs=o((e,t,n)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]:t.endsWith("[]")?e[t]=[n]:e[t]=n},"handleParsingAllValues"),vs=o((e,t,n,r)=>{if(/(?:^|\.)__proto__\./.test(t))return;let i=e,a=t.split(".",Ln+2);a.length>Ln+1&&Pn(),a.forEach((s,l)=>{l===a.length-1?i[s]=n:((!i[s]||typeof i[s]!="object"||Array.isArray(i[s])||i[s]instanceof File)&&(r.count++>=gs&&Pn(),i[s]=Object.create(null)),i=i[s])})},"handleParsingNestedValues"),Pn=o(()=>{throw new Error("Nesting limit exceeded")},"throwNestingLimitExceeded");w();E();v();var Ct=o(e=>{let t=e.split("/");return t[0]===""&&t.shift(),t},"splitPath"),Fn=o(e=>{let{groups:t,path:n}=Es(e),r=Ct(n);return ws(r,t)},"splitRoutingPath"),Es=o(e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(n,r)=>{let i=`@${r}`;return t.push([i,n]),i}),{groups:t,path:e}},"extractGroupsFromPath"),ws=o((e,t)=>{for(let n=t.length-1;n>=0;n--){let[r]=t[n];for(let i=e.length-1;i>=0;i--)if(e[i].includes(r)){e[i]=e[i].replace(r,t[n][1]);break}}return e},"replaceGroupMarks"),at={},jn=o((e,t)=>{if(e==="*")return"*";let n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){let r=`${e}#${t}`;return at[r]||(n[2]?at[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,n[1],new RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],new RegExp(`^${n[2]}$`)]:at[r]=[e,n[1],!0]),at[r]}return null},"getPattern"),Un=o((e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,n=>{try{return t(n)}catch{return n}})}},"tryDecode"),ys=o(e=>Un(e,decodeURI),"tryDecodeURI"),Dt=o(e=>{let t=e.url,n=t.indexOf("/",t.indexOf(":")+4),r=n;for(;r<t.length;r++){let i=t.charCodeAt(r);if(i===37){let a=t.indexOf("?",r),s=t.indexOf("#",r),l=a===-1?s===-1?void 0:s:s===-1?a:Math.min(a,s),u=t.slice(n,l);return ys(u.includes("%25")?u.replace(/%25/g,"%2525"):u)}else if(i===63||i===35)break}return t.slice(n,r)},"getPath");var qn=o(e=>{let t=Dt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},"getPathNoStrict"),we=o((e,t,...n)=>(n.length&&(t=we(t,...n)),`${e?.[0]==="/"?"":"/"}${e}${t==="/"?"":`${e?.at(-1)==="/"?"":"/"}${t?.[0]==="/"?t.slice(1):t}`}`),"mergePath"),st=o(e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;let t=e.split("/"),n=[],r="";return t.forEach(i=>{if(i!==""&&!/\:/.test(i))r+="/"+i;else if(/\:/.test(i))if(i.charCodeAt(i.length-1)===63){n.length===0&&r===""?n.push("/"):n.push(r);let a=i.slice(0,-1);r+="/"+a,n.push(r)}else r+="/"+i}),n.filter((i,a,s)=>s.indexOf(i)===a)},"checkOptionalParameter"),ot=o(e=>e.indexOf("%")!==-1?Un(e,xs):e,"tryDecodeURIComponent"),It=o(e=>(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),ot(e)),"_decodeURI"),Wn=o((e,t,n)=>{let r=e.indexOf("#",8);r!==-1&&(e=e.slice(0,r));let i;if(!n&&t&&t.indexOf("%")===-1&&t.indexOf("+")===-1){let l=e.indexOf("?",8);if(l===-1)return;for(e.startsWith(t,l+1)||(l=e.indexOf(`&${t}`,l+1));l!==-1;){let u=e.charCodeAt(l+t.length+1);if(u===61){let f=l+t.length+2,S=e.indexOf("&",f);return It(e.slice(f,S===-1?void 0:S))}else if(u==38||isNaN(u))return"";l=e.indexOf(`&${t}`,l+1)}if(i=/[%+]/.test(e),!i)return}let a=Object.create(null);i??=/[%+]/.test(e);let s=e.indexOf("?",8);for(;s!==-1;){let l=e.indexOf("&",s+1),u=e.indexOf("=",s);u>l&&l!==-1&&(u=-1);let f=e.slice(s+1,u===-1?l===-1?void 0:l:u);if(i&&(f=It(f)),s=l,f==="")continue;let S;u===-1?S="":(S=e.slice(u+1,l===-1?void 0:l),i&&(S=It(S))),n?(a[f]&&Array.isArray(a[f])||(a[f]=[]),a[f].push(S)):a[f]??=S}return t?a[t]:a},"_getQueryParam"),Gn=Wn,Kn=o((e,t)=>Wn(e,t,!0),"getQueryParams"),xs=decodeURIComponent;var Zn=o(class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",n=[[]]){this.raw=e,this.path=t,this.#e=n}param(e){return e?this.#n(e):this.#a()}#n(e){let t=this.#e[0][this.routeIndex]?.[1][e],n=this.#r(t);return n&&ot(n)}#a(){let e={},t=Object.keys(this.#e[0][this.routeIndex]?.[1]??{});for(let n of t){let r=this.#r(this.#e[0][this.routeIndex][1][n]);r!==void 0&&(e[n]=ot(r))}return e}#r(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Gn(this.url,e)}queries(e){return Kn(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;let t=Object.create(null);return this.raw.headers.forEach((n,r)=>{t[r]=n}),t}async parseBody(e){return Hn(this,e)}#i=e=>{let{bodyCache:t,raw:n}=this,r=t[e];if(r)return r;for(let i in t)return t[i].then(a=>(i==="json"&&(a=JSON.stringify(a)),new Response(a)[e]()));return t[e]=n[e]()};json(){return this.#i("text").then(e=>JSON.parse(e))}text(){return this.#i("text")}arrayBuffer(){return this.#i("arrayBuffer")}bytes(){return this.#i("arrayBuffer").then(e=>new Uint8Array(e))}blob(){return this.#i("blob")}formData(){return this.#i("formData")}addValidatedData(e,t){(this.#t??={})[e]=t}valid(e){return this.#t?.[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Dn](){return this.#e}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}},"HonoRequest");w();E();v();var Jn={Stringify:1,BeforeStream:2,Stream:3},Ss=o((e,t)=>{let n=new String(e);return n.isEscaped=!0,n.callbacks=t,n},"raw");var Mt=o(async(e,t,n,r,i)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));let a=e.callbacks;if(!a?.length)return Promise.resolve(e);i?i[0]+=e:i=[e];let s=Promise.all(a.map(l=>l({phase:t,buffer:i,context:r}))).then(l=>Promise.all(l.filter(Boolean).map(u=>Mt(u,t,!1,r,i))).then(()=>i[0]));return n?Ss(await s,a):s},"resolveCallback");var _s="text/plain; charset=UTF-8",Lt=o((e,t)=>({"Content-Type":e,...t}),"setDefaultContentType"),qe=o((e,t)=>new Response(e,t),"createResponseInstance"),Bt=o(class{#t;#e;env={};#n;finalized=!1;error;#a;#r;#i;#u;#l;#d;#o;#c;#h;constructor(e,t){this.#t=e,t&&(this.#r=t.executionCtx,this.env=t.env,this.#d=t.notFoundHandler,this.#h=t.path,this.#c=t.matchResult)}get req(){return this.#e??=new Zn(this.#t,this.#h,this.#c),this.#e}get event(){if(this.#r&&"respondWith"in this.#r)return this.#r;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#r)return this.#r;throw Error("This context has no ExecutionContext")}get res(){return this.#i||=qe(null,{headers:this.#o??=new Headers})}set res(e){if(this.#i&&e){e=qe(e.body,e);for(let[t,n]of this.#i.headers.entries())if(t!=="content-type")if(t==="set-cookie"){let r=this.#i.headers.getSetCookie();e.headers.delete("set-cookie");for(let i of r)e.headers.append("set-cookie",i)}else e.headers.set(t,n)}this.#i=e,this.finalized=!0}render=(...e)=>(this.#l??=t=>this.html(t),this.#l(...e));setLayout=e=>this.#u=e;getLayout=()=>this.#u;setRenderer=e=>{this.#l=e};header=(e,t,n)=>{this.finalized&&(this.#i=qe(this.#i.body,this.#i));let r=this.#i?this.#i.headers:this.#o??=new Headers;t===void 0?r.delete(e):n?.append?r.append(e,t):r.set(e,t)};status=e=>{this.#a=e};set=(e,t)=>{this.#n??=new Map,this.#n.set(e,t)};get=e=>this.#n?this.#n.get(e):void 0;get var(){return this.#n?Object.fromEntries(this.#n):{}}#s(e,t,n){let r=this.#i?new Headers(this.#i.headers):this.#o;if(typeof t=="object"&&t.headers){r??=new Headers;for(let[a,s]of new Headers(t.headers))a==="set-cookie"?r.append(a,s):r.set(a,s)}if(n){if(!r){let a=0;for(let s in n)if(++a>1||typeof n[s]!="string"){r=new Headers;break}}if(r)for(let a in n){let s=n[a];if(typeof s=="string")r.set(a,s);else{r.delete(a);for(let l of s)r.append(a,l)}}}let i=typeof t=="number"?t:t?.status??this.#a;return qe(e,{status:i,headers:r??n})}newResponse=(...e)=>this.#s(...e);body=(e,t,n)=>this.#s(e,t,n);text=(e,t,n)=>!this.#o&&!this.#a&&!t&&!n&&!this.finalized?new Response(e):this.#s(e,t,Lt(_s,n));json=(e,t,n)=>this.#s(JSON.stringify(e),t,Lt("application/json",n));html=(e,t,n)=>{let r=o(i=>this.#s(i,t,Lt("text/html; charset=UTF-8",n)),"res");return typeof e=="object"?Mt(e,Jn.Stringify,!1,{}).then(r):r(e)};redirect=(e,t)=>{let n=String(e);return this.header("Location",/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)};notFound=()=>(this.#d??=()=>qe(),this.#d(this))},"Context");w();E();v();var X="ALL",Vn="all",Yn=["get","post","put","delete","options","patch","query"],lt="Can not add a route since the matcher is already built.",dt=o(class extends Error{},"UnsupportedPathError");w();E();v();var Qn="__COMPOSED_HANDLER";var ks=o(e=>e.text("404 Not Found",404),"notFoundHandler"),Xn=o((e,t)=>{if("getResponse"in e){let n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text("Internal Server Error",500)},"errorHandler"),er=o(class tr{get;post;put;delete;options;patch;query;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(t={}){[...Yn,Vn].forEach(a=>{this[a]=(s,...l)=>(typeof s=="string"?this.#t=s:this.#a(a,this.#t,s),l.forEach(u=>{this.#a(a,this.#t,u)}),this)}),this.on=(a,s,...l)=>{for(let u of[s].flat()){this.#t=u;for(let f of[a].flat())l.map(S=>{this.#a(f.toUpperCase(),this.#t,S)})}return this},this.use=(a,...s)=>(typeof a=="string"?this.#t=a:(this.#t="*",s.unshift(a)),s.forEach(l=>{this.#a(X,this.#t,l)}),this);let{strict:r,...i}=t;Object.assign(this,i),this.getPath=r??!0?t.getPath??Dt:qn}#e(){let t=new tr({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,t.#n=this.#n,t.routes=this.routes,t}#n=ks;errorHandler=Xn;route(t,n){let r=this.basePath(t);return n.routes.map(i=>{let a;n.errorHandler===Xn?a=i.handler:(a=o(async(s,l)=>(await Ot([],n.errorHandler)(s,()=>i.handler(s,l))).res,"handler"),a[Qn]=i.handler),r.#a(i.method,i.path,a,i.basePath)}),this}basePath(t){let n=this.#e();return n._basePath=we(this._basePath,t),n}onError=t=>(this.errorHandler=t,this);notFound=t=>(this.#n=t,this);mount(t,n,r){let i,a;r&&(typeof r=="function"?a=r:(a=r.optionHandler,r.replaceRequest===!1?i=o(u=>u,"replaceRequest"):i=r.replaceRequest));let s=a?u=>{let f=a(u);return Array.isArray(f)?f:[f]}:u=>{let f;try{f=u.executionCtx}catch{}return[u.env,f]};i||=(()=>{let u=we(this._basePath,t),f=u==="/"?0:u.length;return S=>{let I=new URL(S.url);return I.pathname=this.getPath(S).slice(f)||"/",new Request(I,S)}})();let l=o(async(u,f)=>{let S=await n(i(u.req.raw),...s(u));if(S)return S;await f()},"handler");return this.#a(X,we(t,"*"),l),this}#a(t,n,r,i){t=t.toUpperCase(),n=we(this._basePath,n);let a={basePath:i!==void 0?we(this._basePath,i):this._basePath,path:n,method:t,handler:r};this.router.add(t,n,[r,a]),this.routes.push(a)}#r(t,n){if(t instanceof Error)return this.errorHandler(t,n);throw t}#i(t,n,r,i){if(i==="HEAD")return(async()=>new Response(null,await this.#i(t,n,r,"GET")))();let a=this.getPath(t,{env:r}),s=this.router.match(i,a),l=new Bt(t,{path:a,matchResult:s,env:r,executionCtx:n,notFoundHandler:this.#n});if(s[0].length===1){let f;try{f=s[0][0][0][0](l,async()=>{l.res=await this.#n(l)})}catch(S){return this.#r(S,l)}return f instanceof Promise?f.then(S=>S||(l.finalized?l.res:this.#n(l))).catch(S=>this.#r(S,l)):f??this.#n(l)}let u=Ot(s[0],this.errorHandler,this.#n);return(async()=>{try{let f=await u(l);if(!f.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return f.res}catch(f){return this.#r(f,l)}})()}fetch=(t,...n)=>this.#i(t,n[1],n[0],t.method);request=(t,n,r,i)=>t instanceof Request?this.fetch(n?new Request(t,n):t,r,i):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${we("/",t)}`,n),r,i));fire=()=>{addEventListener("fetch",t=>{t.respondWith(this.#i(t.request,t,void 0,t.request.method))})}},"_Hono");w();E();v();w();E();v();w();E();v();var Q=o(()=>Object.create(null),"createNullObject");w();E();v();var ut=[];function Pt(e,t){let n=this.buildAllMatchers(),r=o((i,a)=>{let s=n[i]||n[X],l=s[2][a];if(l)return l;let u=a.match(s[0]);if(!u)return[[],ut];let f=u.indexOf("",1);return[s[1][f],u]},"match2");return this.match=r,r(e,t)}o(Pt,"match");w();E();v();var Be="[^/]+",xe=".*",ge="(?:|/.*)",ye=Symbol(),nr=new Set(".\\+*[^]$()");function Rs(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1?1:e===xe||e===ge?t===ge?-1:1:t===xe||t===ge?-1:e===Be?1:t===Be?-1:e.length===t.length?e<t?-1:1:t.length-e.length}o(Rs,"compareKey");var rr=o(class Ht{#t;#e;#n=Q();insert(t,n,r,i,a){let s=this;for(let l=0,u=t.length;l<u;l++){let f=t[l],S=f.length===1?f==="*"?l===u-1?["","",xe]:["","",Be]:null:f==="/*"?["","",ge]:f.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),I;if(S){let H=S[1],F=S[2]||Be;if(H&&S[2]&&(F===".*"||(F=F.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(F))||F.length===1&&nr.has(F)))throw ye;if(I=s.#n[F],!I){if(F!==xe&&F!==ge){for(let le in s.#n)if((F.length>1||le.length>1)&&le!==xe&&le!==ge)throw ye}I=s.#n[F]=new Ht}H!==""&&(I.#e??=i.varIndex++,r.push([H,I.#e]))}else if(I=s.#n[f],!I){for(let H in s.#n)if(H.length>1&&H!==xe&&H!==ge)throw ye;I=s.#n[f]=new Ht}s=I}if(s.#t!==void 0)throw ye;s.#t=a?-1:n}buildRegExpStr(){let n=Object.keys(this.#n).sort(Rs).map(r=>{let i=this.#n[r],a=i.buildRegExpStr();return a===""?"":(typeof i.#e=="number"?`(${r})@${i.#e}`:nr.has(r)?`\\${r}`:r)+a}).filter(Boolean);return typeof this.#t=="number"&&this.#t!==-1&&n.unshift(`#${this.#t}`),n.length===0?"":n.length===1?n[0]:"(?:"+n.join("|")+")"}},"_Node");w();E();v();var Ft=o(class{#t={varIndex:0};#e=new rr;#n=0;paths=Q();insert(e,t){if(t){this.#e.insert(e.split(""),0,[],this.#t,!0);return}let n=[],r=[],i=e;for(let s=0;;){let l=!1;if(i=i.replace(/\{[^}]+\}/g,u=>{let f=`@\\${s}`;return r[s]=[f,u],s++,l=!0,f}),!l)break}let a=i.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let s=r.length-1;s>=0;s--){let[l]=r[s];for(let u=a.length-1;u>=0;u--)if(a[u].indexOf(l)!==-1){a[u]=a[u].replace(l,r[s][1]);break}}this.#e.insert(a,this.#n,n,this.#t,!1),this.paths[e]=[this.#n++,n]}buildRegExp(){let e=this.#e.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0,n=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(i,a,s)=>a!==void 0?(n[++t]=Number(a),"$()"):(s!==void 0&&(r[Number(s)]=++t),"")),[new RegExp(`^${e}`),n,r]}},"Trie");var ir=Q();function ar(e){return ir[e]??=new RegExp(`^${e.replace(/\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,(t,n)=>n?`\\${n}`:t==="/*"?ge:t==="*"?xe:`/:${Be}`)}$`)}o(ar,"buildWildcardRegExp");function ct(e,t){for(let n of Object.keys(e).sort((r,i)=>i.length-r.length))if(ar(n).test(t))return[...e[n]]}o(ct,"findMiddleware");var ht=o(class{name="RegExpRouter";#t;#e;#n;constructor(){this.#t={[X]:Q()},this.#e={[X]:Q()},this.#n={[X]:new Ft}}#a(e,t){try{this.#n[e].insert(t,!/\*|\/:/.test(t))}catch(n){throw n===ye?new dt(t):n}}add(e,t,n){let r=this.#t,i=this.#e;if(!r)throw new Error(lt);if(!r[e]){this.#n[e]=new Ft;for(let l of[r,i]){l[e]=Q();for(let u in l[X])l[e][u]=[...l[X][u]],this.#a(e,u)}}t==="/*"&&(t="*");let a=e===X?Object.keys(r):[e];if(/\*$/.test(t)){let l=ar(t);for(let u of a)r[u][t]||(this.#a(u,t),r[u][t]=ct(r[u],t)||ct(r[X],t)||[]);for(let u of[r,i])for(let f of a)for(let S in u[f])l.test(S)&&u[f][S].push([n,t]);return}let s=st(t)||[t];for(let l of s)for(let u of a)i[u][l]||(this.#a(u,l),i[u][l]=ct(r[u],l)||ct(r[X],l)||[]),i[u][l].push([n,l])}match=Pt;buildAllMatchers(){let e=Q();for(let t of Object.keys(this.#e))e[t]=this.#r(t);return this.#t=this.#e=this.#n=void 0,ir=Q(),e}#r(e){let t=this.#t[e],n=this.#e[e],r=this.#n[e],i=Q(),a=[],[s,l,u]=r.buildRegExp();for(let f of[t,n])for(let S in f){let I=f[S],H=r.paths[S];if(!H){i[S]=[I.map(([F])=>[F,Q()]),ut];continue}a[H[0]]=I.map(([F,le])=>[F,r.paths[le][1].reduceRight((ve,[je],te)=>(ve[je]=u[H[1][te][1]],ve),Q())])}return[s,l.map(f=>a[f]),i]}},"RegExpRouter");w();E();v();w();E();v();w();E();v();var jt=o(class{name="SmartRouter";#t=[];#e=[];constructor(e){this.#t=e.routers}add(e,t,n){if(!this.#e)throw new Error(lt);this.#e.push([e,t,n])}match(e,t){if(!this.#e)throw new Error("Fatal error");let n=this.#t,r=this.#e,i=n.length,a=0,s;for(;a<i;a++){let l=n[a];try{for(let u=0,f=r.length;u<f;u++)l.add(...r[u]);s=l.match(e,t)}catch(u){if(u instanceof dt)continue;throw u}this.match=l.match.bind(l),this.#t=[l],this.#e=void 0;break}if(a===i)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,s}get activeRouter(){if(this.#e||this.#t.length!==1)throw new Error("No active router has been determined yet.");return this.#t[0]}},"SmartRouter");w();E();v();w();E();v();w();E();v();var Ut=Q(),Ts=0,sr=o(class or{#t=[];#e=Q();#n=[];#a;#r=Ut;insert(t,n,r){let i=this,a=Fn(n),s=new Set,l=0;for(let u of a){let f=a[++l],S=jn(u,f)||(f===void 0&&u&&u.indexOf("*")===u.length-1?u:null),I=Array.isArray(S),H=I?S[0]:S||u,F=i.#e[H]||=new or;S&&!F.#a&&(F.#a=S,i.#n.push(F)),i=F,I&&s.add(S[1])}i.#t.push({[t]:{handler:r,possibleKeys:[...s],score:++Ts}})}#i(t,n,r,i,a){for(let s=0,l=n.#t.length;s<l;s++){let u=n.#t[s],f=u[r]||u[X];if(f){f.params=Q(),t.push(f);for(let S=0,I=f.possibleKeys.length;S<I;S++){let H=f.possibleKeys[S];f.params[H]=a?.[H]&&!S?a[H]:i[H]??a?.[H]}}}}search(t,n){let r=[];this.#r=Ut;let a=[this],s=Ct(n),l=[],u=s.length,f=null;for(let S=0;S<u;S++){let I=s[S],H=S===u-1,F=[];for(let ve=0,je=a.length;ve<je;ve++){let te=a[ve],z=te.#e[I];z&&(z.#r=te.#r,H?(z.#e["*"]&&this.#i(r,z.#e["*"],t,te.#r),this.#i(r,z,t,te.#r)):F.push(z));for(let $ of te.#n){let A=$.#a,k=te.#r===Ut?{}:{...te.#r};if(typeof A=="string"){(A==="*"||I.startsWith(A.slice(0,-1)))&&(this.#i(r,$,t,te.#r),A==="*"&&($.#r=k,F.push($)));continue}let[,g,R]=A;if(!(!I&&R===!0)){if(R!==!0){if(!f){f=[];let N=n[0]==="/"?1:0;for(let m=0;m<u;m++)f[m]=N,N+=s[m].length+1}let c=n.slice(f[S]),d=R.exec(c);if(d){k[g]=d[0],this.#i(r,$,t,te.#r,k),d[0].length===c.length&&$.#e["*"]&&this.#i(r,$.#e["*"],t,te.#r,k);for(let N in $.#e){$.#r=k;let m=d[0].match(/\//g)?.length??0;(l[m]||=[]).push($);break}continue}}(R===!0||R.test(I))&&(k[g]=I,H?(this.#i(r,$,t,k,te.#r),$.#e["*"]&&this.#i(r,$.#e["*"],t,k,te.#r)):($.#r=k,F.push($)))}}}let le=l.shift();a=le?F.concat(le):F}return r[1]&&r.sort((S,I)=>S.score-I.score),[r.map(({handler:S,params:I})=>[S,I])]}},"_Node");var qt=o(class{name="TrieRouter";#t=new sr;add(e,t,n){for(let r of st(t)||[t])this.#t.insert(e,r,n)}match(e,t){return this.#t.search(e,t)}},"TrieRouter");var Wt=o(class extends er{constructor(e={}){super(e),this.router=e.router??new jt({routers:[new ht,new qt]})}},"Hono");w();E();v();w();E();v();w();E();v();var lr="23456789BCDFGHJKMNPQRSTVWXZ";var As={0:"D",O:"D",1:"J",I:"J",L:"J",A:"4",E:"F",U:"V",Y:"V"};function dr(){let e=crypto.getRandomValues(new Uint8Array(6)),t="";for(let n of e)t+=lr[n%lr.length];return t}o(dr,"tagCodeErzeugen");function se(e){return e.toUpperCase().replace(/[^0-9A-Z-]/g,"")}o(se,"kanonisch");function ur(e){let t="";for(let n of se(e).replace(/-/g,""))t+=As[n]??n;return t}o(ur,"tagCodeNormalisieren");function cr(){return[...crypto.getRandomValues(new Uint8Array(16))].map(t=>t.toString(16).padStart(2,"0")).join("")}o(cr,"einladungscodeErzeugen");function hr(){return[...crypto.getRandomValues(new Uint8Array(32))].map(t=>t.toString(16).padStart(2,"0")).join("")}o(hr,"geraetetokenErzeugen");async function Pe(e){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return[...new Uint8Array(t)].map(n=>n.toString(16).padStart(2,"0")).join("")}o(Pe,"sha256");async function Se(e,t,n){for(let r=0;r<8;r++){let i=dr();try{return await e.DB.prepare("INSERT INTO tag (code, ziel_typ, ziel_id) VALUES (?, ?, ?)").bind(i,t,n).run(),i}catch{continue}}throw new Error("Kein freier Tag-Code gefunden")}o(Se,"tagAnlegen");async function fr(e,t){return e.DB.prepare("SELECT code, ziel_typ, ziel_id FROM tag WHERE code = ? AND aktiv = 1").bind(t).first()}o(fr,"tagLesen");var Gt=`
  SELECT e.*, s.name AS standort_name, s.typ AS standort_typ
    FROM einheit e
    JOIN standort s ON s.id = e.standort_id`;async function He(e,t){return e.DB.prepare(`${Gt} WHERE e.id = ?`).bind(t).first()}o(He,"einheitLesen");async function We(e,t){return e.DB.prepare(`${Gt} WHERE e.code = ?`).bind(t).first()}o(We,"einheitPerCode");async function Ge(e,t){let{results:n}=await e.DB.prepare(`SELECT i.artikel_id, a.name, i.menge, a.mengeneinheit
       FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
      WHERE i.einheit_id = ?
      ORDER BY a.name`).bind(t).all();return n}o(Ge,"inhaltLesen");async function Kt(e,t){let{results:n}=await e.DB.prepare(`${Gt} WHERE e.standort_id = ? AND e.aktiv = 1 ORDER BY e.code`).bind(t).all();return n}o(Kt,"einheitenAmStandort");async function ue(e,t){return e.DB.prepare("SELECT * FROM standort WHERE id = ?").bind(t).first()}o(ue,"standortLesen");async function me(e){let{results:t}=await e.DB.prepare("SELECT * FROM standort WHERE aktiv = 1 ORDER BY typ, name").all();return t}o(me,"standorteAktiv");async function ft(e){return e.DB.prepare("SELECT * FROM standort WHERE typ = 'lager' AND aktiv = 1 ORDER BY id LIMIT 1").first()}o(ft,"hauptlager");function Ns(e,t=new Date){if(!e)return null;let n=new Date(e);if(Number.isNaN(n.getTime()))return null;let r=(t.getTime()-n.getTime())/864e5;return r<0||r>14?null:n.toISOString().slice(0,19).replace("T"," ")}o(Ns,"nachtragsZeit");async function Ke(e,t){let n=await He(e,t.einheitId);if(!n)return null;if(n.standort_id===t.nachStandortId)return{buchungId:0,vonStandortId:n.standort_id,unveraendert:!0};let r=Ns(t.zeit),i=await e.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id,
                          mitarbeiter_id, quelle, lat, lon, notiz, zeit)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, datetime('now')))
     RETURNING id`).bind(t.einheitId,n.standort_id,t.nachStandortId,t.mitarbeiterId,t.quelle,t.lat??null,t.lon??null,r?t.notiz??"offline nachgetragen":t.notiz??null,r).first();return await e.DB.prepare("UPDATE einheit SET standort_id = ?, seit = COALESCE(?, datetime('now')) WHERE id = ?").bind(t.nachStandortId,r,t.einheitId).run(),{buchungId:i?.id??0,vonStandortId:n.standort_id,unveraendert:!1}}o(Ke,"buchen");async function pr(e,t){let n=await e.DB.prepare("SELECT * FROM buchung WHERE id = ?").bind(t).first();if(!n)return{ok:!1,grund:"Buchung nicht gefunden"};if(n.storniert)return{ok:!1,grund:"Bereits storniert"};if((await e.DB.prepare(`SELECT id FROM buchung
      WHERE einheit_id = ? AND storniert = 0
      ORDER BY zeit DESC, id DESC LIMIT 1`).bind(n.einheit_id).first())?.id!==n.id)return{ok:!1,grund:"Es gibt neuere Buchungen f\xFCr diese Einheit"};if((Date.now()-new Date(n.zeit.replace(" ","T")+"Z").getTime())/6e4>15)return{ok:!1,grund:"Zu alt \u2014 bitte zur\xFCckbuchen statt stornieren"};let a=await e.DB.prepare(`SELECT zeit FROM buchung
      WHERE einheit_id = ? AND storniert = 0 AND id <> ?
      ORDER BY zeit DESC, id DESC LIMIT 1`).bind(n.einheit_id,n.id).first(),s=await e.DB.prepare("SELECT angelegt_am FROM einheit WHERE id = ?").bind(n.einheit_id).first();return await e.DB.batch([e.DB.prepare("UPDATE buchung SET storniert = 1 WHERE id = ?").bind(n.id),e.DB.prepare("UPDATE einheit SET standort_id = ?, seit = ? WHERE id = ?").bind(n.von_standort_id,a?.zeit??s?.angelegt_am??n.zeit,n.einheit_id)]),{ok:!0}}o(pr,"stornieren");async function pt(e,t,n=50){let{results:r}=await e.DB.prepare(`SELECT b.id, b.zeit, sv.name AS von, sn.name AS nach,
            m.name AS wer, b.quelle
       FROM buchung b
       LEFT JOIN standort sv ON sv.id = b.von_standort_id
       JOIN standort sn ON sn.id = b.nach_standort_id
       LEFT JOIN mitarbeiter m ON m.id = b.mitarbeiter_id
      WHERE b.einheit_id = ? AND b.storniert = 0
      ORDER BY b.zeit DESC, b.id DESC
      LIMIT ?`).bind(t,n).all();return r}o(pt,"historie");async function Ze(e,t={}){let n=["e.aktiv = 1","e.zustand <> 'ausgemustert'"],r=[];t.standortId!==void 0&&(n.push("e.standort_id = ?"),r.push(t.standortId)),t.artikelSuche&&(n.push("a.name LIKE ?"),r.push(`%${t.artikelSuche}%`));let i=n.join(" AND "),{results:a}=await e.DB.prepare(`SELECT artikel_id, artikel, mengeneinheit, standort_id, standort, standort_typ,
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
      ORDER BY artikel, standort`).bind(...r,...r).all();return a}o(Ze,"bestand");async function Je(e,t=56){let{results:n}=await e.DB.prepare(`SELECT e.id AS einheit_id, e.code, e.bezeichnung,
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
      ORDER BY baustelle_beendet DESC, tage DESC`).bind(t).all();return n}o(Je,"ueberfaellig");async function gr(e,t,n=25){let r=`%${t}%`,{results:i}=await e.DB.prepare(`SELECT 'einheit' AS art, e.id, e.code || ' \xB7 ' || e.bezeichnung AS titel,
            s.name AS zusatz
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.code LIKE ?1 OR e.bezeichnung LIKE ?1
      UNION ALL
     SELECT 'standort', s.id, s.name, s.typ
       FROM standort s WHERE s.name LIKE ?1 OR s.adresse LIKE ?1
      UNION ALL
     SELECT 'artikel', a.id, a.name, a.kategorie
       FROM artikel a WHERE a.name LIKE ?1
      LIMIT ?2`).bind(r,n).all();return i}o(gr,"suche");async function mr(e,t){return e.DB.prepare("SELECT id, name, rolle, aktiv FROM mitarbeiter WHERE token_hash = ? AND aktiv = 1").bind(t).first()}o(mr,"mitarbeiterPerTokenHash");async function Zt(e){let{results:t}=await e.DB.prepare("SELECT * FROM artikel WHERE aktiv = 1 ORDER BY kategorie, name").all();return t}o(Zt,"artikelAlle");async function gt(e,t={}){let{results:n}=await e.DB.prepare(`WITH abschnitt AS (
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
      ORDER BY tage_summe DESC`).bind(t.standortId??null,t.abDatum??null).all();return n}o(gt,"vorhaltung");async function mt(e,t=120){let{results:n}=await e.DB.prepare(`SELECT e.id AS einheit_id, e.code, e.bezeichnung,
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
      ORDER BY standort_beendet DESC, tage DESC`).bind(t).all();return n}o(mt,"verlust");async function Jt(e,t){return e.DB.prepare(`SELECT i.*, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.standort_id = ? AND i.beendet_am IS NULL ORDER BY i.id DESC LIMIT 1`).bind(t).first()}o(Jt,"inventurOffen");async function br(e,t){return e.DB.prepare(`SELECT i.*, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.id = ?`).bind(t).first()}o(br,"inventurPerId");async function bt(e,t,n){let r=await Jt(e,t);if(r)return r;let i=await e.DB.prepare("SELECT COUNT(*) AS n FROM einheit WHERE standort_id = ? AND aktiv = 1").bind(t).first(),a=await e.DB.prepare(`INSERT INTO inventur (standort_id, gestartet_von, soll_anzahl) VALUES (?, ?, ?)
     RETURNING id`).bind(t,n,i?.n??0).first();return await br(e,a.id)}o(bt,"inventurStarten");async function vr(e,t,n,r){await e.DB.prepare(`INSERT INTO inventur_treffer (inventur_id, einheit_id, war_woanders)
     VALUES (?, ?, ?) ON CONFLICT DO NOTHING`).bind(t,n,r?1:0).run()}o(vr,"inventurTreffer");async function Te(e,t){let n=await br(e,t);if(!n)return null;let{results:r}=await e.DB.prepare(`SELECT e.code, e.bezeichnung, t.war_woanders
       FROM inventur_treffer t JOIN einheit e ON e.id = t.einheit_id
      WHERE t.inventur_id = ? ORDER BY t.zeit DESC`).bind(t).all(),{results:i}=await e.DB.prepare(`SELECT e.id, e.code, e.bezeichnung FROM einheit e
      WHERE e.standort_id = ? AND e.aktiv = 1
        AND e.id NOT IN (SELECT einheit_id FROM inventur_treffer WHERE inventur_id = ?)
      ORDER BY e.code`).bind(n.standort_id,t).all();return{inventur:n,gefunden:r,fehlend:i}}o(Te,"inventurStand");async function vt(e,t,n){let r=await Te(e,t);return r?(await e.DB.prepare(`UPDATE inventur SET beendet_am = datetime('now'), ist_anzahl = ?, notiz = ?
      WHERE id = ? AND beendet_am IS NULL`).bind(r.gefunden.length,n??null,t).run(),Te(e,t)):null}o(vt,"inventurAbschliessen");async function Er(e,t){let n=await e.DB.prepare(`INSERT INTO meldung (einheit_id, art, text, foto_schluessel, mitarbeiter_id)
     VALUES (?, ?, ?, ?, ?) RETURNING id`).bind(t.einheitId,t.art,t.text??null,t.fotoSchluessel??null,t.mitarbeiterId).first();return(t.art==="beschaedigt"||t.art==="reparatur"||t.art==="ok")&&await e.DB.prepare("UPDATE einheit SET zustand = ? WHERE id = ?").bind(t.art,t.einheitId).run(),n?.id??0}o(Er,"meldungAnlegen");async function Et(e,t=!0){let{results:n}=await e.DB.prepare(`SELECT m.id, m.einheit_id, e.code, e.bezeichnung, m.art, m.text,
            m.foto_schluessel, m.zeit, ma.name AS wer, m.erledigt
       FROM meldung m
       JOIN einheit e ON e.id = m.einheit_id
       LEFT JOIN mitarbeiter ma ON ma.id = m.mitarbeiter_id
      WHERE (?1 = 0 OR m.erledigt = 0)
      ORDER BY m.zeit DESC LIMIT 200`).bind(t?1:0).all();return n}o(Et,"meldungen");var Vt="wgl_ma",wt="wgl_buero",wr=4*60*60;function yr(e,t){let n=e.headers.get("Cookie");if(!n)return null;for(let r of n.split(";")){let[i,...a]=r.trim().split("=");if(i===t)return decodeURIComponent(a.join("="))}return null}o(yr,"cookieLesen");function Yt(e,t,n){return`${e}=${encodeURIComponent(t)}; Path=/; Max-Age=${n}; HttpOnly; Secure; SameSite=Lax`}o(Yt,"cookieSetzen");function xr(e){return`${e}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`}o(xr,"cookieLoeschen");async function ee(e,t){let n=yr(e,Vt);return n?mr(t,await Pe(n)):null}o(ee,"angemeldeterMitarbeiter");var Qt=o(e=>`sitzung:${e}`,"sitzungsSchluessel");async function Ae(e,t){let n=await e.SESSIONS.get(Qt(t));if(!n)return null;let r=JSON.parse(n);return r.bis>Date.now()?r:null}o(Ae,"sitzungLesen");async function Xt(e,t,n,r){let i={standortId:n,name:r,bis:Date.now()+wr*1e3};return await e.SESSIONS.put(Qt(t),JSON.stringify(i),{expirationTtl:wr}),i}o(Xt,"sitzungSetzen");async function Sr(e,t){await e.SESSIONS.delete(Qt(t))}o(Sr,"sitzungBeenden");async function Ve(e,t){let n=t.ADMIN_PASSWORT;if(!n)return!1;let r=yr(e,wt);return r!==null&&r===await Pe(n)}o(Ve,"istBuero");function yt(e,t){if(e.length!==t.length)return!1;let n=0;for(let r=0;r<e.length;r++)n|=e.charCodeAt(r)^t.charCodeAt(r);return n===0}o(yt,"gleichSicher");w();E();v();function _r(e,t,n,r){let a=(n-e)*Math.PI/180,s=(r-t)*Math.PI/180,l=e*Math.PI/180,u=n*Math.PI/180,f=Math.sin(a/2)**2+Math.sin(s/2)**2*Math.cos(l)*Math.cos(u);return 2*6371*Math.asin(Math.min(1,Math.sqrt(f)))}o(_r,"entfernungKm");function $s(e){return new Date(e.replace(" ","T")+"Z")}o($s,"alsDatum");function xt(e,t=new Date){let n=t.getTime()-$s(e).getTime();return Math.max(0,Math.floor(n/864e5))}o(xt,"tageSeit");function _e(e,t=new Date){let n=xt(e,t);return n===0?"seit heute":n===1?"seit gestern":`seit ${n} Tagen`}o(_e,"seitText");w();E();v();w();E();v();w();E();v();function h(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}o(h,"esc");var zs=`
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font:17px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  color:#111;background:#f4f5f7;-webkit-text-size-adjust:100%}
.wrap{max-width:560px;margin:0 auto;padding:16px 16px 48px}
h1{font-size:26px;margin:0 0 4px;line-height:1.2}
h2{font-size:19px;margin:28px 0 10px}
p{margin:0 0 12px}
a{color:#0b5cab}
.karte{background:#fff;border-radius:14px;padding:18px;margin-bottom:16px;
  box-shadow:0 1px 3px rgba(0,0,0,.12)}
.kopf{background:#1d2b3a;color:#fff;padding:14px 16px}
.kopf .zeile{max-width:560px;margin:0 auto;display:flex;align-items:center;
  justify-content:space-between;gap:12px}
.kopf a{color:#cfe0f2;text-decoration:none;font-size:15px}
.code{font:700 15px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;
  background:#eef1f5;border-radius:6px;padding:6px 9px;display:inline-block}
.gross{font-size:30px;font-weight:700;line-height:1.15;margin:0 0 6px}
.inhalt{list-style:none;padding:0;margin:10px 0 0;font-size:19px}
.inhalt li{padding:7px 0;border-top:1px solid #e6e9ee}
.inhalt li:first-child{border-top:0}
.menge{font-weight:700;font-variant-numeric:tabular-nums}
.ort{margin-top:14px;padding-top:14px;border-top:2px solid #e6e9ee;font-size:19px}
.ort b{font-size:22px;display:block}
.ort .seit{color:#5a6472;font-size:16px}

button,.knopf{display:block;width:100%;min-height:64px;margin:0 0 12px;padding:16px;
  font:700 21px/1.25 inherit;text-align:center;text-decoration:none;
  border:0;border-radius:12px;cursor:pointer;-webkit-appearance:none}
.knopf-haupt{background:#0a7d3c;color:#fff;min-height:96px;font-size:24px}
.knopf-haupt small{display:block;font-size:16px;font-weight:400;opacity:.9;margin-top:4px}
.knopf-lager{background:#12508f;color:#fff}
.knopf-zweit{background:#fff;color:#12508f;border:2px solid #b8c6d6}
.knopf-still{background:#eceff3;color:#39424e;min-height:52px;font-size:17px}
.knopf-warn{background:#a3231d;color:#fff}
button:active,.knopf:active{transform:translateY(1px)}

.hinweis{background:#fff8e1;border-left:5px solid #e0a800;padding:14px;border-radius:8px;
  margin-bottom:16px}
.fehler{background:#fdecea;border-left:5px solid #a3231d;padding:14px;border-radius:8px;
  margin-bottom:16px}
.erfolg{background:#e7f6ec;border-left:5px solid #0a7d3c;padding:14px;border-radius:8px;
  margin-bottom:16px}
.sitzung{background:#0a7d3c;color:#fff;padding:12px 16px;font-weight:600}
.sitzung .zeile{max-width:560px;margin:0 auto;display:flex;justify-content:space-between;
  align-items:center;gap:12px}
.sitzung a{color:#fff;opacity:.85;font-size:15px}

.liste{list-style:none;padding:0;margin:0}
.liste li{margin-bottom:10px}
.liste .knopf{text-align:left;min-height:60px;padding:14px 16px;font-size:19px}
.liste .entf{display:block;font-size:15px;font-weight:400;color:#5a6472;margin-top:2px}

table{width:100%;border-collapse:collapse;font-size:16px;background:#fff}
th,td{text-align:left;padding:10px 8px;border-bottom:1px solid #e6e9ee}
th{background:#eef1f5;font-size:14px;text-transform:uppercase;letter-spacing:.04em;color:#4a5563}
td.zahl,th.zahl{text-align:right;font-variant-numeric:tabular-nums}
.tabelle-rahmen{overflow-x:auto;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.12)}
.pill{display:inline-block;padding:3px 9px;border-radius:99px;font-size:13px;font-weight:600}
.pill-lager{background:#dbe8f6;color:#12508f}
.pill-baustelle{background:#fde9c8;color:#8a5a00}
.pill-warn{background:#fbd9d6;color:#a3231d}
.leer{color:#5a6472;padding:24px 0;text-align:center}
input[type=text],input[type=password],input[type=number],select{width:100%;min-height:52px;
  padding:12px;font:17px inherit;border:2px solid #c3ccd7;border-radius:10px;background:#fff}
label{display:block;font-weight:600;margin:0 0 6px;font-size:16px}
.feld{margin-bottom:16px}
.fuss{margin-top:32px;color:#6b7480;font-size:14px;text-align:center}
@media (prefers-color-scheme:dark){
  body{background:#12161c;color:#e8eaed}
  .karte,table{background:#1b2129}
  .code{background:#262e38;color:#e8eaed}
  .inhalt li,.ort,th,td{border-color:#2c343e}
  th{background:#232a33;color:#a8b2bf}
  .knopf-zweit{background:#1b2129;color:#7fb2ea;border-color:#39434f}
  .knopf-still{background:#262e38;color:#c9d1da}
  .ort .seit,.liste .entf,.leer,.fuss{color:#9aa4b1}
  input,select{background:#1b2129;color:#e8eaed;border-color:#39434f}
  .hinweis{background:#2e2712;color:#f2e2b8}
  .fehler{background:#2e1917;color:#f3cdc9}
  .erfolg{background:#132a1c;color:#c6ecd3}
}
`;function K(e,t){return`<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#1d2b3a">
<meta name="robots" content="noindex,nofollow">
<title>${h(t.titel)}</title>
<style>${zs}</style>
</head>
<body>
${t.kopf??""}
${t.banner??""}
<div class="wrap">
${e}
</div>
${t.scripte??""}
</body>
</html>`}o(K,"seite");function Z(e,t){return`<div class="kopf"><div class="zeile">
    <strong>${h(e)}</strong>
    ${t?`<a href="${h(t.href)}">${h(t.text)}</a>`:""}
  </div></div>`}o(Z,"kopf");function W(e,t=200,n={}){return new Response(e,{status:t,headers:{"Content-Type":"text/html; charset=utf-8",...n}})}o(W,"html");function en(e,t,n){let r=[],i=e.standort_typ==="lager",a=t!==null&&t.standortId===e.standort_id;return t&&!a&&r.push({art:"haupt",label:"Hierher buchen",unter:t.name,zielId:t.standortId}),n&&e.standort_id!==n.id&&r.push({art:t||r.length?"lager":"haupt",label:"Zur\xFCck ins Lager",unter:t?n.name:void 0,zielId:n.id}),r.push({art:r.length===0?"haupt":"zweit",label:i?"Auf Baustelle buchen":"Auf andere Baustelle",href:`/t/${e.code}/wohin`}),r}o(en,"aktionenFuer");function Os(e){return e.length===0?"":`<ul class="inhalt">${e.map(t=>`<li><span class="menge">${h(oe(t.menge))}\xD7</span> ${h(t.name)}</li>`).join("")}</ul>`}o(Os,"inhaltListe");function oe(e){return Number.isInteger(e)?String(e):e.toFixed(1).replace(".",",")}o(oe,"formatMenge");function Is(e,t){let n=`knopf knopf-${e.art}`,r=`${h(e.label)}${e.unter?`<small>${h(e.unter)}</small>`:""}`;if(e.href)return`<a class="${n}" href="${h(e.href)}">${r}</a>`;let i=e.posten?.url??"/api/buchung",a=e.posten?.felder??{code:t,ziel:String(e.zielId)},s=e.posten?"":" data-buchung",l=Object.entries(a).map(([u,f])=>`<input type="hidden" name="${h(u)}" value="${h(f)}">`).join("");return`<form method="post" action="${h(i)}"${s}>${l}
    <button class="${n}" type="submit">${r}</button>
  </form>`}o(Is,"knopf");function kr(e,t,n){return{art:"haupt",label:"\u2713 Hier gefunden",unter:`Inventur ${n}`,posten:{url:"/api/inventur/treffer",felder:{code:t,inventur:String(e)}}}}o(kr,"inventurAktion");function Ne(e){if(!e)return"";let t=Math.max(0,Math.round((e.bis-Date.now())/6e4)),n=t>=60?`noch ${Math.floor(t/60)} Std ${t%60} Min`:`noch ${t} Min`;return`<div class="sitzung"><div class="zeile">
    <span>\u{1F4CD} ${h(e.name)} \xB7 ${h(n)}</span>
    <a href="/sitzung/beenden">beenden</a>
  </div></div>`}o(Ne,"sitzungsBanner");function Rr(e){let{einheit:t}=e,n=e.meldung?`<div class="${e.meldung.art}">${h(e.meldung.text)}</div>`:"",r=e.stornoId?`<form method="post" action="/api/storno">
         <input type="hidden" name="id" value="${e.stornoId}">
         <input type="hidden" name="code" value="${h(t.code)}">
         <button class="knopf knopf-still" type="submit">\u21A9 R\xFCckg\xE4ngig</button>
       </form>`:"",i=`
${n}
<div class="karte">
  <span class="code">${h(t.code)}</span>
  <p class="gross" style="margin-top:10px">${h(t.bezeichnung)}</p>
  ${Os(e.inhalt)}
  <div class="ort">
    <b>${h(t.standort_name)}</b>
    <span class="seit">${h(_e(t.seit))}</span>
  </div>
  ${t.zustand!=="ok"?`<p style="margin-top:12px"><span class="pill pill-warn">${h(St(t.zustand))}</span></p>`:""}
</div>
${e.aktionen.map(a=>Is(a,t.code)).join("")}
${r}
<a class="knopf knopf-still" href="/t/${h(t.code)}/melden">Schaden melden</a>
<p class="fuss" id="wgl-wartestand" hidden></p>
<p class="fuss"><a href="/">\xDCbersicht</a></p>`;return W(K(i,{titel:`${t.code} \xB7 ${t.bezeichnung}`,kopf:Z("Lager",{href:"/",text:"\xDCbersicht"}),banner:Ne(e.sitzung),scripte:'<script src="/app.js"><\/script>'}))}o(Rr,"einheitSeite");function St(e){return{ok:"in Ordnung",beschaedigt:"besch\xE4digt",reparatur:"in Reparatur",ausgemustert:"ausgemustert"}[e]??e}o(St,"zustandText");function Tr(e){let t=e.standorte.map(i=>{let a=i.entfernungKm!==void 0?`<span class="entf">${i.entfernungKm<1?`${Math.round(i.entfernungKm*1e3)} m entfernt`:`${i.entfernungKm.toFixed(1).replace(".",",")} km entfernt`}</span>`:i.adresse?`<span class="entf">${h(i.adresse)}</span>`:"";return`<li><form method="post" action="/api/buchung" data-buchung>
      <input type="hidden" name="code" value="${h(e.code)}">
      <input type="hidden" name="ziel" value="${i.id}">
      <button class="knopf ${i.typ==="lager"?"knopf-lager":"knopf-zweit"}" type="submit">
        ${h(i.name)}${a}
      </button></form></li>`}).join(""),n=e.hatPosition?"":`<script>
navigator.geolocation && navigator.geolocation.getCurrentPosition(function(p){
  var u = new URL(location.href);
  u.searchParams.set('lat', p.coords.latitude.toFixed(5));
  u.searchParams.set('lon', p.coords.longitude.toFixed(5));
  location.replace(u);
}, function(){}, {enableHighAccuracy:false, timeout:4000, maximumAge:120000});
<\/script>`,r=`
<h1>Wohin?</h1>
<p style="color:#5a6472;margin-bottom:20px">${h(e.bezeichnung)}</p>
${e.standorte.length===0?'<p class="leer">Keine aktiven Standorte angelegt.</p>':`<ul class="liste">${t}</ul>`}
<a class="knopf knopf-still" href="/t/${h(e.code)}">Abbrechen</a>
<p class="fuss" id="wgl-wartestand" hidden></p>`;return W(K(r,{titel:"Wohin?",kopf:Z("Ziel w\xE4hlen",{href:`/t/${e.code}`,text:"Zur\xFCck"}),banner:Ne(e.sitzung),scripte:`<script src="/app.js"><\/script>${n}`}))}o(Tr,"wohinSeite");function Ar(e,t,n){let r=`
<div class="karte" style="text-align:center">
  <p class="gross">Eigentum der</p>
  <p class="gross" style="color:#12508f">${h(t)}</p>
  <p style="font-size:19px;margin-top:16px">${h(e.bezeichnung)}<br>
    <span class="code" style="margin-top:8px">${h(e.code)}</span></p>
  <p style="margin-top:24px;font-size:18px">Gefunden? Bitte melden:</p>
  <a class="knopf knopf-lager" href="tel:${h(n.replace(/\s/g,""))}">
    ${h(n)}</a>
</div>
<p class="fuss">Mitarbeiter? Dann fehlt auf diesem Handy die Einrichtung \u2014
  bitte im B\xFCro melden.</p>`;return W(K(r,{titel:t,kopf:Z(t)}))}o(Ar,"fremdSeite");function Ye(e){let t=`
<div class="fehler"><strong>Unbekannter Tag</strong><br>
  Der Code <span class="code">${h(e)}</span> ist nicht vergeben.</div>
<p>Vertippt? Code hier eingeben:</p>
<form method="get" action="/t">
  <div class="feld"><input type="text" name="code" autocapitalize="characters"
    autocomplete="off" placeholder="z. B. K7F2QX" value="${h(e)}"></div>
  <button class="knopf knopf-lager" type="submit">Suchen</button>
</form>
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return W(K(t,{titel:"Unbekannter Tag",kopf:Z("Lager")}),404)}o(Ye,"unbekannterTag");function Nr(e,t){let n=`
<h1>Melden</h1>
<p style="color:#5a6472;margin-bottom:20px">${h(e.code)} \xB7 ${h(e.bezeichnung)}</p>
<form method="post" action="/t/${h(e.code)}/melden" enctype="multipart/form-data">
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
    <input type="file" id="foto" name="foto" accept="image/*" capture="environment"
      style="min-height:52px;padding:10px"></div>`:""}
  <button class="knopf knopf-haupt" type="submit">Melden</button>
</form>
<a class="knopf knopf-still" href="/t/${h(e.code)}">Abbrechen</a>`;return W(K(n,{titel:"Melden",kopf:Z("Melden",{href:`/t/${e.code}`,text:"Zur\xFCck"})}))}o(Nr,"meldenSeite");var Cs="0.1.0",Ds="2024-11-05",$r=[{name:"bestand",description:'Materialbestand je Artikel und Standort. Z\xE4hlt Inhalt von Ladungstr\xE4gern und separat getaggte Einzelteile zusammen. Ohne Filter kommt der Gesamtbestand \xFCber alle Standorte. F\xFCr "wie viel liegt im Lager" den Standort auf das Lager setzen.',inputSchema:{type:"object",properties:{artikel:{type:"string",description:'Filtert auf Artikel, deren Name den Text enth\xE4lt, z. B. "Rahmen"'},standort:{type:"string",description:"Filtert auf einen Standort (Name oder ID)"}}},async ausfuehren(e,t){let n=await $e(e,t.standort);if(t.standort&&n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await Ze(e,{standortId:n??void 0,artikelSuche:t.artikel});if(r.length===0)return"Kein Bestand gefunden.";let i=new Map;for(let s of r){let l=i.get(s.artikel)??[];l.push(s),i.set(s.artikel,l)}let a=[];for(let[s,l]of i){let u=l.reduce((I,H)=>I+H.menge,0),f=l[0].mengeneinheit,S=l.map(I=>`  ${I.standort} (${I.standort_typ}): ${oe(I.menge)}`).join(`
`);a.push(`${s} \u2014 gesamt ${oe(u)} ${f}
${S}`)}return a.join(`

`)}},{name:"einheit",description:'Alles zu einer Einheit: Bezeichnung, Inhalt, aktueller Standort, wie lange sie dort steht, und die vollst\xE4ndige Bewegungshistorie. Nimmt den sprechenden Code (z. B. "GB-047") oder den Tag-Code vom Aufkleber (z. B. "K7F2QX").',inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten-Code oder Tag-Code"}},required:["code"]},async ausfuehren(e,t){let n=await _t(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await Ge(e,n.id),i=await pt(e,n.id,20),a=r.length?r.map(l=>`  ${oe(l.menge)}\xD7 ${l.name}`).join(`
`):"  (kein Inhalt erfasst)",s=i.length?i.map(l=>`  ${l.zeit.slice(0,16)} \xB7 ${l.von??"\u2014"} \u2192 ${l.nach} \xB7 ${l.wer??"unbekannt"} (${l.quelle})`).join(`
`):"  (noch keine Bewegungen)";return[`${n.code} \u2014 ${n.bezeichnung} (${n.typ})`,`Standort: ${n.standort_name} (${n.standort_typ}), ${_e(n.seit)}`,`Zustand: ${n.zustand}`,`Inhalt:
${a}`,`Historie:
${s}`].join(`
`)}},{name:"baustelle_bestand",description:'Was steht auf einer Baustelle, seit wann und wie viele Vorhaltetage sind aufgelaufen. Grundlage f\xFCr die Frage "k\xF6nnen wir das Ger\xFCst abrechnen" und f\xFCr die R\xE4umung nach Bauende.',inputSchema:{type:"object",properties:{standort:{type:"string",description:"Name oder ID der Baustelle"}},required:["standort"]},async ausfuehren(e,t){let n=await $e(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await ue(e,n),i=await Kt(e,n);if(i.length===0)return`${r?.name}: kein Material vor Ort.`;let a=i.map(f=>`  ${f.code} \u2014 ${f.bezeichnung} \xB7 ${xt(f.seit)} Vorhaltetage (${_e(f.seit)})`),s=Math.max(...i.map(f=>xt(f.seit))),l=await Ze(e,{standortId:n}),u=l.length?l.map(f=>`  ${oe(f.menge)} ${f.mengeneinheit} ${f.artikel}`).join(`
`):"  (kein Inhalt erfasst)";return[`${r?.name} (${r?.typ}${r?.aktiv?"":", beendet"})`,`${i.length} Einheiten vor Ort, l\xE4ngste Vorhaltung ${s} Tage`,`Material:
${u}`,`Einheiten:
${a.join(`
`)}`].join(`
`)}},{name:"ueberfaellig",description:"Material, das zu lange drau\xDFen steht \u2014 der eigentliche Hebel gegen Materialverlust. Liefert zwei F\xE4lle: l\xE4nger als die Schwelle auf einer Baustelle, und Material auf bereits abgeschlossenen Baustellen (der teure Fall, dort r\xE4umt niemand mehr auf). Nennt auch, wer zuletzt gebucht hat \u2014 um nachfragen zu k\xF6nnen, solange sich noch jemand erinnert.",inputSchema:{type:"object",properties:{schwelle_tage:{type:"number",description:"Ab wie vielen Tagen auf einer Baustelle als \xFCberf\xE4llig gilt. Standard 56 (acht Wochen)."}}},async ausfuehren(e,t){let n=typeof t.schwelle_tage=="number"?t.schwelle_tage:56,r=await Je(e,n);if(r.length===0)return`Nichts \xFCberf\xE4llig (Schwelle ${n} Tage).`;let i=r.filter(u=>u.baustelle_beendet),a=r.filter(u=>!u.baustelle_beendet),s=o(u=>u.map(f=>`  ${f.code} \u2014 ${f.bezeichnung} \xB7 ${f.standort} \xB7 ${f.tage} Tage \xB7 zuletzt gebucht von ${f.zuletzt_gebucht_von??"unbekannt"}`).join(`
`),"block"),l=[`${r.length} Einheiten \xFCberf\xE4llig (Schwelle ${n} Tage).`];return i.length&&l.push(`Auf beendeten Baustellen (${i.length}):
${s(i)}`),a.length&&l.push(`\xDCber der Schwelle (${a.length}):
${s(a)}`),l.join(`

`)}},{name:"suche",description:'Freitextsuche \xFCber Einheiten, Standorte und Artikel. N\xFCtzlich, wenn nur ein Bruchst\xFCck bekannt ist \u2014 "Elbchaussee", "Treppenturm", "GB-04".',inputSchema:{type:"object",properties:{text:{type:"string"}},required:["text"]},async ausfuehren(e,t){let n=await gr(e,String(t.text));return n.length===0?`Nichts zu "${t.text}" gefunden.`:n.map(r=>`${r.art}: ${r.titel} (${r.zusatz})`).join(`
`)}},{name:"vorhaltung",description:'Vorhaltetage je Baustelle \u2014 Grundlage f\xFCr die Abrechnung der Mietdauer. "Einheitentage" ist die Summe \xFCber alle Einheiten (3 Gitterboxen \xD7 67 Tage = 201), nicht die Kalenderdauer der Baustelle. Das ist die Zahl, die bei Streit \xFCber die Mietdauer z\xE4hlt.',inputSchema:{type:"object",properties:{standort:{type:"string",description:"Auf eine Baustelle einschr\xE4nken"},ab_datum:{type:"string",description:"Nur Abschnitte, die nach diesem Datum endeten (JJJJ-MM-TT)"}}},async ausfuehren(e,t){let n=await $e(e,t.standort);if(t.standort&&n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await gt(e,{standortId:n??void 0,abDatum:t.ab_datum});return r.length===0?"Keine Vorhaltung erfasst.":r.map(i=>`${i.standort}${i.aktiv?"":" (beendet)"}: ${i.tage_summe} Einheitentage \xB7 ${i.einheiten} Einheiten \xB7 l\xE4ngste ${i.tage_max} Tage \xB7 erste Lieferung ${i.erste_lieferung?.slice(0,10)??"?"}`).join(`
`)}},{name:"verlust",description:'Material, das als verloren gelten muss: auf abgeschlossener Baustelle oder l\xE4nger als die Schwelle ohne jede Bewegung. Anders als "ueberfaellig" mit Inhaltsangabe \u2014 f\xFCr die Frage, was der Schwund an St\xFCckzahlen gekostet hat.',inputSchema:{type:"object",properties:{schwelle_tage:{type:"number",description:"Standard 120 Tage"}}},async ausfuehren(e,t){let n=typeof t.schwelle_tage=="number"?t.schwelle_tage:120,r=await mt(e,n);return r.length===0?`Kein Verlustverdacht (Schwelle ${n} Tage).`:r.map(i=>`${i.code} \u2014 ${i.bezeichnung} \xB7 ${i.standort}${i.standort_beendet?" (beendet)":""} \xB7 ${i.tage} Tage \xB7 Inhalt: ${i.inhalt??"nicht erfasst"} \xB7 zuletzt gebucht von ${i.zuletzt_von??"unbekannt"}`).join(`
`)}},{name:"meldungen",description:"Schadens- und Zustandsmeldungen von der Baustelle. Standard: nur offene.",inputSchema:{type:"object",properties:{alle:{type:"boolean",description:"Auch erledigte einbeziehen"}}},async ausfuehren(e,t){let n=await Et(e,!t.alle);return n.length===0?"Keine Meldungen.":n.map(r=>`${r.zeit.slice(0,16)} \xB7 ${r.code} (${r.bezeichnung}) \xB7 ${r.art}${r.text?` \xB7 "${r.text}"`:""} \xB7 ${r.wer??"unbekannt"}${r.erledigt?" [erledigt]":""}`).join(`
`)}},{name:"buchung_anlegen",description:"Bucht eine Einheit auf einen anderen Standort \u2014 f\xFCr Korrekturen aus dem B\xFCro. Der Normalweg ist das Scannen vor Ort; dieses Werkzeug ist f\xFCr F\xE4lle, in denen das nachweislich nicht passiert ist. Steht die Einheit schon dort, passiert nichts.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder Tag-Code"},standort:{type:"string",description:"Zielstandort (Name oder ID)"},notiz:{type:"string"}},required:["code","standort"]},async ausfuehren(e,t){let n=await _t(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await $e(e,t.standort);if(r===null)return`Standort "${t.standort}" nicht gefunden.`;if((await Ke(e,{einheitId:n.id,nachStandortId:r,mitarbeiterId:null,quelle:"mcp",notiz:t.notiz??"Korrektur aus dem B\xFCro"}))?.unveraendert)return`${n.code} stand bereits dort \u2014 nichts ge\xE4ndert.`;let a=await ue(e,r);return`${n.code} gebucht: ${n.standort_name} \u2192 ${a?.name}.`}},{name:"einheit_anlegen",description:'Legt eine neue Einheit an und erzeugt dazu einen Tag-Code. Der Code muss anschlie\xDFend \xFCber /buero/etiketten gedruckt und auf den Chip geschrieben werden. Typ "traeger" f\xFCr Gitterbox/Stapel/B\xFCndel, "einzelteil" f\xFCr Treppenturm/Winde.',inputSchema:{type:"object",properties:{code:{type:"string",description:'Sprechender Code, z. B. "GB-047"'},bezeichnung:{type:"string"},typ:{type:"string",enum:["traeger","einzelteil"]},standort:{type:"string",description:"Wo sie gerade steht"}},required:["code","bezeichnung","standort"]},async ausfuehren(e,t){let n=await $e(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=String(t.code).trim().toUpperCase();if(await We(e,r))return`Code ${r} ist schon vergeben.`;let i=t.typ==="einzelteil"?"einzelteil":"traeger",a=await e.DB.prepare(`INSERT INTO einheit (code, typ, bezeichnung, standort_id) VALUES (?, ?, ?, ?)
         RETURNING id`).bind(r,i,String(t.bezeichnung),n).first(),s=await Se(e,"einheit",a.id);return await e.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, quelle, notiz)
         VALUES (?, NULL, ?, 'mcp', 'Ersterfassung')`).bind(a.id,n).run(),`${r} angelegt. Tag-Code: ${s} \u2014 Etikett drucken und den Chip damit beschreiben.`}},{name:"inhalt_setzen",description:"Setzt die Menge eines Artikels in einem Ladungstr\xE4ger. Menge 0 entfernt die Zeile. Ersetzt die bisherige Menge, addiert nicht.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder Tag-Code"},artikel:{type:"string",description:"Artikelname (Teiltreffer gen\xFCgt)"},menge:{type:"number"}},required:["code","artikel","menge"]},async ausfuehren(e,t){let n=await _t(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await e.DB.prepare(`SELECT id, name FROM artikel WHERE aktiv = 1 AND (name = ?1 OR name LIKE ?2)
          ORDER BY LENGTH(name) LIMIT 1`).bind(String(t.artikel),`%${t.artikel}%`).first();if(!r)return`Artikel "${t.artikel}" nicht gefunden.`;let i=Number(t.menge);return i<=0?(await e.DB.prepare("DELETE FROM inhalt WHERE einheit_id = ? AND artikel_id = ?").bind(n.id,r.id).run(),`${r.name} aus ${n.code} entfernt.`):(await e.DB.prepare(`INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES (?, ?, ?)
         ON CONFLICT (einheit_id, artikel_id) DO UPDATE SET menge = excluded.menge`).bind(n.id,r.id,i).run(),`${n.code}: ${i}\xD7 ${r.name}.`)}},{name:"standort_anlegen",description:"Legt eine Baustelle oder ein Lager an und erzeugt einen Standort-Tag. Wird der geklebt und angetippt, geht danach jede Einheit mit einem einzigen Tap dorthin. Koordinaten sorgen daf\xFCr, dass die Baustelle in der Auswahl nach oben rutscht.",inputSchema:{type:"object",properties:{name:{type:"string"},adresse:{type:"string"},typ:{type:"string",enum:["baustelle","lager"]},lat:{type:"number"},lon:{type:"number"}},required:["name"]},async ausfuehren(e,t){let n=t.typ==="lager"?"lager":"baustelle",r=await e.DB.prepare(`INSERT INTO standort (name, typ, adresse, lat, lon) VALUES (?, ?, ?, ?, ?)
         RETURNING id`).bind(String(t.name),n,t.adresse??null,typeof t.lat=="number"?t.lat:null,typeof t.lon=="number"?t.lon:null).first(),i=await Se(e,"standort",r.id);return`${t.name} angelegt (${n}). Standort-Tag: ${i}.`}},{name:"standort_beenden",description:'Schlie\xDFt eine Baustelle ab. Material, das danach noch dort steht, taucht sofort in "ueberfaellig" und "verlust" auf \u2014 das ist der teure Fall, weil dort niemand mehr aufr\xE4umt.',inputSchema:{type:"object",properties:{standort:{type:"string"}},required:["standort"]},async ausfuehren(e,t){let n=await $e(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;await e.DB.prepare(`UPDATE standort SET aktiv = 0, beendet_am = datetime('now')
          WHERE id = ? AND typ = 'baustelle'`).bind(n).run();let r=await Kt(e,n),i=await ue(e,n);return r.length===0?`${i?.name} beendet. Kein Material mehr vor Ort.`:`${i?.name} beendet. ACHTUNG: ${r.length} Einheiten stehen noch dort:
`+r.map(a=>`  ${a.code} \u2014 ${a.bezeichnung}`).join(`
`)}},{name:"tag_zuordnen",description:"Erzeugt einen Ersatz-Tag f\xFCr eine bestehende Einheit \u2014 f\xFCr abgerissene oder defekte Chips. Der alte Tag bleibt g\xFCltig, sofern er noch lesbar ist; die Historie der Einheit bleibt in jedem Fall erhalten.",inputSchema:{type:"object",properties:{code:{type:"string",description:"Einheiten- oder alter Tag-Code"}},required:["code"]},async ausfuehren(e,t){let n=await _t(e,String(t.code));if(!n)return`Keine Einheit zu "${t.code}" gefunden.`;let r=await Se(e,"einheit",n.id);return`Neuer Tag-Code f\xFCr ${n.code}: ${r}. Etikett drucken, Chip beschreiben, schreibsch\xFCtzen.`}},{name:"inventur_start",description:'Startet einen Inventurlauf f\xFCr einen Standort. Danach z\xE4hlt jeder Scan vor Ort als "gefunden"; Einheiten, die laut System woanders stehen, werden automatisch hierher gebucht. Was am Ende offen bleibt, ist die Fehlliste.',inputSchema:{type:"object",properties:{standort:{type:"string"}},required:["standort"]},async ausfuehren(e,t){let n=await $e(e,t.standort);if(n===null)return`Standort "${t.standort}" nicht gefunden.`;let r=await bt(e,n,null);return`Inventur ${r.id} f\xFCr ${r.standort} l\xE4uft. Soll: ${r.soll_anzahl} Einheiten.`}},{name:"inventur_stand",description:"Zeigt Fortschritt und Fehlliste eines Inventurlaufs.",inputSchema:{type:"object",properties:{inventur_id:{type:"number"}},required:["inventur_id"]},async ausfuehren(e,t){let n=await Te(e,Number(t.inventur_id));if(!n)return"Inventur nicht gefunden.";let{inventur:r,gefunden:i,fehlend:a}=n,s=i.filter(l=>l.war_woanders);return[`Inventur ${r.id} \xB7 ${r.standort} \xB7 ${r.beendet_am?"abgeschlossen":"l\xE4uft"}`,`${i.length} von ${r.soll_anzahl??i.length+a.length} gefunden, ${a.length} fehlen`,s.length?`Hier gefunden, im System woanders (${s.length}):
`+s.map(l=>`  ${l.code} \u2014 ${l.bezeichnung}`).join(`
`):"",a.length?`Fehlt:
`+a.map(l=>`  ${l.code} \u2014 ${l.bezeichnung}`).join(`
`):""].filter(Boolean).join(`
`)}},{name:"inventur_abschluss",description:"Schlie\xDFt einen Inventurlauf ab und liefert das Ergebnis samt Fehlliste.",inputSchema:{type:"object",properties:{inventur_id:{type:"number"},notiz:{type:"string"}},required:["inventur_id"]},async ausfuehren(e,t){let n=await vt(e,Number(t.inventur_id),t.notiz);if(!n)return"Inventur nicht gefunden.";let{inventur:r,gefunden:i,fehlend:a}=n;return[`Inventur ${r.id} \xB7 ${r.standort} abgeschlossen.`,`Soll ${r.soll_anzahl}, Ist ${i.length}, Differenz ${a.length}.`,a.length?`Fehlt:
`+a.map(s=>`  ${s.code} \u2014 ${s.bezeichnung}`).join(`
`):"Alles gefunden."].join(`
`)}}];async function $e(e,t){if(t==null||t==="")return null;let n=Number(t);if(Number.isInteger(n)&&n>0)return await ue(e,n)?n:null;let r=await me(e),i=String(t).toLowerCase(),a=r.find(l=>l.name.toLowerCase()===i);return a?a.id:r.find(l=>l.name.toLowerCase().includes(i))?.id??null}o($e,"standortAufloesen");async function _t(e,t){let n=await We(e,t);if(n)return n;let r=await e.DB.prepare("SELECT ziel_id FROM tag WHERE code = ? AND ziel_typ = 'einheit' AND aktiv = 1").bind(t.toUpperCase()).first();return r?He(e,r.ziel_id):null}o(_t,"einheitAufloesen");function Qe(e,t){return{jsonrpc:"2.0",id:e,result:t}}o(Qe,"ergebnis");function kt(e,t,n){return{jsonrpc:"2.0",id:e,error:{code:t,message:n}}}o(kt,"fehler");async function zr(e,t){if(!t.MCP_TOKEN)return Response.json({error:"MCP_TOKEN nicht gesetzt"},{status:503});let n=e.headers.get("Authorization")??"",r=n.startsWith("Bearer ")?n.slice(7):"";if(!yt(r,t.MCP_TOKEN))return Response.json({error:"Nicht autorisiert"},{status:401,headers:{"WWW-Authenticate":"Bearer"}});let i;try{i=await e.json()}catch{return Response.json(kt(null,-32700,"Ung\xFCltiges JSON"),{status:400})}if(i.id===void 0||i.id===null)return new Response(null,{status:202});let{id:a,method:s,params:l}=i;try{switch(s){case"initialize":return Response.json(Qe(a,{protocolVersion:Ds,capabilities:{tools:{}},serverInfo:{name:"nfclager",version:Cs},instructions:`Lagerverwaltung J. Werner Ger\xFCstbau.

Getaggt sind Ladungstr\xE4ger (Gitterboxen, Stapel, B\xFCndel) mit gez\xE4hltem Inhalt sowie Gro\xDFteile wie Treppent\xFCrme. Mengen sind deshalb kistengenau, nicht st\xFCckgenau \u2014 bei Zahlen dazusagen, dass sie aus dem erfassten Tr\xE4gerinhalt stammen und beim letzten Packen gez\xE4hlt wurden.

Wegweiser: "bestand" f\xFCr Bestandsfragen, "ueberfaellig" f\xFCr R\xE4umung und Materialverlust, "vorhaltung" f\xFCr Abrechnungsfragen zur Mietdauer, "baustelle_bestand" f\xFCr eine einzelne Baustelle.

Der normale Weg einer Buchung ist das Scannen vor Ort. "buchung_anlegen" ist f\xFCr Korrekturen gedacht, nicht f\xFCr die t\xE4gliche Erfassung \u2014 wer damit Bewegungen nachtr\xE4gt, die niemand gescannt hat, macht die Vorhaltezeiten wertlos. Vor schreibenden Aufrufen beim Menschen r\xFCckfragen.`}));case"ping":return Response.json(Qe(a,{}));case"tools/list":return Response.json(Qe(a,{tools:$r.map(({name:u,description:f,inputSchema:S})=>({name:u,description:f,inputSchema:S}))}));case"tools/call":{let u=$r.find(f=>f.name===l?.name);if(!u)return Response.json(kt(a,-32602,`Unbekanntes Werkzeug: ${l?.name}`));try{let f=await u.ausfuehren(t,l.arguments??{});return Response.json(Qe(a,{content:[{type:"text",text:f}]}))}catch(f){return Response.json(Qe(a,{content:[{type:"text",text:`Fehler: ${f.message}`}],isError:!0}))}}default:return Response.json(kt(a,-32601,`Unbekannte Methode: ${s}`))}}catch(u){return Response.json(kt(a,-32603,u.message),{status:500})}}o(zr,"mcpBehandeln");w();E();v();function Or(e,t){let n=`
<h1>Inventur</h1>
${t.length?`<h2>L\xE4uft gerade</h2><ul class="liste">${t.map(r=>`<li><a class="knopf knopf-haupt" href="/inventur/${r.id}">${h(r.standort)}</a></li>`).join("")}</ul>`:""}
<h2>Neu starten</h2>
<p style="color:#5a6472">Danach jede Einheit antippen. Was am Ende offen bleibt, ist die Fehlliste.</p>
<ul class="liste">${e.map(r=>`<li><form method="post" action="/inventur">
       <input type="hidden" name="standort_id" value="${r.id}">
       <button class="knopf knopf-zweit" type="submit">${h(r.name)}</button></form></li>`).join("")}</ul>
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return W(K(n,{titel:"Inventur",kopf:Z("Inventur",{href:"/",text:"\xDCbersicht"})}))}o(Or,"inventurAuswahl");function Ir(e,t){let{inventur:n,gefunden:r,fehlend:i}=e,a=r.filter(S=>S.war_woanders),s=r.length+i.length,l=s>0?Math.round(r.length/s*100):100,u=n.beendet_am!==null,f=`
<h1>${h(n.standort??"")}</h1>
<div class="karte">
  <p class="gross">${r.length} von ${s}</p>
  <div style="background:#e6e9ee;border-radius:99px;height:14px;overflow:hidden;margin:10px 0">
    <div style="background:#0a7d3c;height:100%;width:${l}%"></div>
  </div>
  <p style="color:#5a6472;margin:0">${i.length===0?"Alles gefunden.":`${i.length} ${i.length===1?"fehlt":"fehlen"} noch`}</p>
  ${n.soll_anzahl!==null&&n.soll_anzahl!==s?`<p style="color:#5a6472;margin:6px 0 0;font-size:15px">Beim Start waren
        ${n.soll_anzahl} Einheiten hier verbucht.</p>`:""}
</div>

${u?`<div class="hinweis">Abgeschlossen am ${h(n.beendet_am.slice(0,16))}.</div>`:'<p style="color:#5a6472">Einfach die Tags antippen \u2014 jede Einheit wird beim Scannen erfasst.</p>'}

${a.length?`<h2>Hier gefunden, im System woanders (${a.length})</h2>
<ul class="inhalt">${a.map(S=>`<li><span class="code">${h(S.code)}</span> ${h(S.bezeichnung)}</li>`).join("")}</ul>
<p style="color:#5a6472;font-size:15px">Diese Einheiten wurden automatisch hierher gebucht.</p>`:""}

<h2>Fehlt noch (${i.length})</h2>
${i.length===0?'<p class="leer">Nichts offen.</p>':`<ul class="inhalt">${i.map(S=>`<li><a href="/t/${h(S.code)}"><span class="code">${h(S.code)}</span></a>
        ${h(S.bezeichnung)}</li>`).join("")}</ul>`}

<h2>Erfasst (${r.length})</h2>
${r.length===0?'<p class="leer">Noch nichts.</p>':`<ul class="inhalt">${r.slice(0,60).map(S=>`<li><span class="code">${h(S.code)}</span> ${h(S.bezeichnung)}</li>`).join("")}</ul>`}

${u?"":`<form method="post" action="/inventur/${n.id}/abschliessen" style="margin-top:24px">
  <button class="knopf knopf-warn" type="submit">Inventur abschlie\xDFen</button></form>`}
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`;return W(K(f,{titel:`Inventur ${n.standort??""}`,kopf:Z("Inventur",{href:"/inventur",text:"Alle"}),banner:Ne(t)}))}o(Ir,"inventurSeite");w();E();v();var Cr=`
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
      '<div class="wrap"><div class="erfolg"><strong>Gespeichert' +
      (name ? ': ' + name : '') + '</strong><br>' +
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
`,Dr=`
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
`;function Mr(){return W(K(`
<div class="hinweis" id="kein-netz"><strong>Kein Netz.</strong>
  Buchungen werden gespeichert und sp\xE4ter \xFCbertragen.</div>
<div id="einheit"></div>
<div id="knoepfe"></div>
<p class="fuss" id="wgl-wartestand" hidden></p>`,{titel:"Kein Netz",scripte:`<script src="/app.js"><\/script>
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
    ziel.innerHTML = '<div class="karte"><span class="code">' + esc(code) + '</span>' +
      '<p style="margin-top:12px">Zu diesem Tag liegen keine Daten auf dem Handy. ' +
      'Sobald wieder Empfang da ist, die Seite neu laden.</p></div>';
    return;
  }

  var inhalt = e.i ? '<ul class="inhalt">' + e.i.split(', ').map(function (z) {
    return '<li>' + esc(z) + '</li>'; }).join('') + '</ul>' : '';
  ziel.innerHTML = '<div class="karte"><span class="code">' + esc(e.c) + '</span>' +
    '<p class="gross" style="margin-top:10px">' + esc(e.b) + '</p>' + inhalt +
    '<div class="ort"><b>' + esc(e.sn || '') + '</b>' +
    '<span class="seit">Stand vom letzten Empfang</span></div></div>';

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
<\/script>`}))}o(Mr,"offlineSeite");w();E();v();function Lr(e,t){let r=`
<h1>Scan-Station</h1>
<div id="nicht-unterstuetzt" class="hinweis" hidden>
  <strong>Dieses Ger\xE4t kann nicht dauerscannen.</strong>
  Web NFC gibt es nur in Chrome auf Android. Auf dem iPhone stattdessen den Tag
  direkt antippen \u2014 das Banner \xF6ffnet die Einheit.
</div>

<div class="karte">
  <div class="feld"><label for="ziel">Alles buchen nach</label>
    <select id="ziel">${e.map(a=>`<option value="${a.id}"${a.id===t?" selected":""}>${h(a.name)}</option>`).join("")}</select></div>
  <button id="start" class="knopf knopf-haupt" type="button">Scannen starten</button>
  <button id="stop" class="knopf knopf-warn" type="button" hidden>Scannen beenden</button>
</div>

<div id="status" class="karte" hidden style="text-align:center">
  <p class="gross" id="status-text">Bereit \u2014 Tag ans Handy halten</p>
  <p style="color:#5a6472"><span id="zaehler">0</span> gebucht</p>
</div>

<ul class="inhalt" id="protokoll"></ul>
<p class="fuss"><a href="/">\xDCbersicht</a></p>`,i=`<script>
(function () {
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var status = document.getElementById('status');
  var statusText = document.getElementById('status-text');
  var protokoll = document.getElementById('protokoll');
  var zaehler = document.getElementById('zaehler');
  var zielFeld = document.getElementById('ziel');
  var n = 0, laeuft = false, abbruch = null;
  var zuletzt = {};

  if (!('NDEFReader' in window)) {
    document.getElementById('nicht-unterstuetzt').hidden = false;
    start.disabled = true;
    start.style.opacity = '.5';
    return;
  }

  function melden(text, klasse) {
    var li = document.createElement('li');
    li.textContent = text;
    if (klasse) li.style.color = klasse;
    protokoll.insertBefore(li, protokoll.firstChild);
    while (protokoll.children.length > 40) protokoll.removeChild(protokoll.lastChild);
  }

  function codeAus(nachricht) {
    for (var i = 0; i < nachricht.records.length; i++) {
      var r = nachricht.records[i];
      if (r.recordType !== 'url' && r.recordType !== 'absolute-url') continue;
      var url = new TextDecoder().decode(r.data);
      var treffer = url.match(/\\/t\\/([0-9A-Z]{4,12})/i);
      if (treffer) return treffer[1].toUpperCase();
    }
    return null;
  }

  async function buchen(code) {
    // Derselbe Tag zweimal in fuenf Sekunden ist ein Doppelkontakt, keine
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
        melden('\u2717 ' + code + ' \u2014 ' + (daten.fehler || 'Fehler'), '#a3231d');
        if (navigator.vibrate) navigator.vibrate([80, 60, 80]);
        return;
      }
      if (daten.unveraendert) {
        melden('\u2022 ' + code + ' \u2014 stand schon hier', '#5a6472');
      } else {
        n++;
        zaehler.textContent = String(n);
        melden('\u2713 ' + code + ' \u2014 ' + daten.bezeichnung);
      }
      if (navigator.vibrate) navigator.vibrate(40);
    } catch (e) {
      melden('\u2717 ' + code + ' \u2014 kein Netz, bitte wiederholen', '#a3231d');
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
        else melden('\u2717 Tag ohne g\xFCltige URL', '#a3231d');
      };
      leser.onreadingerror = function () { melden('\u2717 Tag nicht lesbar', '#a3231d'); };
      laeuft = true;
      start.hidden = true;
      stop.hidden = false;
      status.hidden = false;
      zielFeld.disabled = true;
      statusText.textContent = 'Bereit \u2014 Tag ans Handy halten';
    } catch (e) {
      melden('\u2717 Scannen nicht m\xF6glich: ' + e.message, '#a3231d');
    }
  });

  stop.addEventListener('click', function () {
    if (abbruch) abbruch.abort();
    laeuft = false;
    start.hidden = false;
    stop.hidden = true;
    zielFeld.disabled = false;
    statusText.textContent = 'Beendet \u2014 ' + n + ' gebucht';
  });
})();
<\/script>`;return W(K(r,{titel:"Scan-Station",kopf:Z("Scan-Station",{href:"/",text:"\xDCbersicht"}),scripte:i}))}o(Lr,"stationSeite");w();E();v();w();E();v();var jr=ui(Fr(),1);function Ur(e,t){let n=(0,jr.default)(0,"M");n.addData(e),n.make();let r=n.getModuleCount(),i=[];for(let a=0;a<r;a++)for(let s=0;s<r;s++)n.isDark(a,s)&&i.push(`M${s} ${a}h1v1h-1z`);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 ${r+2} ${r+2}" width="${t}mm" height="${t}mm" shape-rendering="crispEdges"><rect x="-1" y="-1" width="${r+2}" height="${r+2}" fill="#fff"/><path d="${i.join("")}" fill="#000"/></svg>`}o(Ur,"qrSvg");function Ms(e){try{return new URL(e).host}catch{return""}}o(Ms,"host");function qr(e,t){let n=e.map(r=>`
<div class="etikett">
  <div class="qr">${Ur(r.url,28)}</div>
  <div class="txt">
    <div class="code">${h(r.code)}</div>
    <div class="bez">${h(r.bezeichnung)}</div>
    <div class="firma">${h(Ms(r.url))} \xB7 ${h(t)}</div>
  </div>
</div>`).join("");return`<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<title>Etiketten \u2014 ${e.length} St\xFCck</title>
<style>
@page{size:A4;margin:10mm}
body{margin:0;font:12px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#000;background:#fff}
.hinweis{padding:12px;background:#eef1f5;border-radius:8px;margin-bottom:12px;font-size:13px}
.bogen{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.etikett{display:flex;gap:3mm;align-items:center;border:1px dashed #999;border-radius:3mm;
  padding:3mm;height:34mm;break-inside:avoid;page-break-inside:avoid}
.qr{flex:0 0 auto;line-height:0}
.txt{min-width:0}
.code{font:700 15px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em}
.bez{font-size:11px;margin-top:3px;overflow:hidden;display:-webkit-box;
  -webkit-line-clamp:2;-webkit-box-orient:vertical}
.firma{font-size:8px;color:#444;margin-top:4px}
@media print{.hinweis{display:none}.etikett{border-color:#ccc}}
</style></head>
<body>
<div class="hinweis"><strong>${e.length} Etiketten.</strong>
  Auf wetterfestes Material drucken. Der NFC-Chip bekommt dieselbe URL wie der
  QR-Code \u2014 beim Programmieren mit NFC Tools oder NXP TagWriter als URI-Record
  schreiben und anschlie\xDFend schreibsch\xFCtzen.</div>
<div class="bogen">${n}</div>
</body></html>`}o(qr,"druckbogen");w();E();v();var Ls=`<p style="margin:0 0 20px;display:flex;flex-wrap:wrap;gap:8px 16px;font-size:16px">
  <a href="/buero">\xDCbersicht</a>
  <a href="/buero/bestand">Bestand</a>
  <a href="/buero/einheiten">Einheiten</a>
  <a href="/buero/standorte">Standorte</a>
  <a href="/buero/artikel">Artikel</a>
  <a href="/buero/auswertung">Auswertung</a>
  <a href="/buero/meldungen">Meldungen</a>
  <a href="/buero/mitarbeiter">Mitarbeiter</a>
</p>`;function be(e,t,n=200){return W(K(Ls+t,{titel:`${e} \xB7 B\xFCro`,kopf:Z("Lager \u2014 B\xFCro",{href:"/buero/abmelden",text:"Abmelden"})}),n)}o(be,"bueroSeite");function Xe(e){let t=`
<h1>B\xFCro</h1>
${e?`<div class="fehler">${h(e)}</div>`:""}
<form method="post" action="/buero/anmelden">
  <div class="feld"><label for="pw">Passwort</label>
    <input type="password" id="pw" name="passwort" autocomplete="current-password" required></div>
  <button class="knopf knopf-lager" type="submit">Anmelden</button>
</form>`;return W(K(t,{titel:"B\xFCro",kopf:Z("Lager \u2014 B\xFCro")}),e?401:200)}o(Xe,"anmeldung");function Wr(e){let t=e.ueberfaellig.slice(0,15).map(r=>`<tr>
    <td><a href="/buero/einheit/${r.einheit_id}">${h(r.code)}</a><br>
      <span style="font-size:14px;color:#5a6472">${h(r.bezeichnung)}</span></td>
    <td>${h(r.standort)}${r.baustelle_beendet?' <span class="pill pill-warn">beendet</span>':""}</td>
    <td class="zahl">${r.tage} T</td>
    <td>${h(r.zuletzt_gebucht_von??"\u2014")}</td>
  </tr>`).join(""),n=`
<h1>\xDCbersicht</h1>
<div class="karte" style="display:flex;gap:24px;flex-wrap:wrap">
  <div><div style="font-size:32px;font-weight:700">${e.einheiten}</div>
    <div style="color:#5a6472">Einheiten</div></div>
  <div><div style="font-size:32px;font-weight:700">${e.imLager}</div>
    <div style="color:#5a6472">im Lager</div></div>
  <div><div style="font-size:32px;font-weight:700">${e.aufBaustellen}</div>
    <div style="color:#5a6472">auf Baustellen</div></div>
  <div><div style="font-size:32px;font-weight:700;${e.ueberfaellig.length?"color:#a3231d":""}">${e.ueberfaellig.length}</div>
    <div style="color:#5a6472">\xFCberf\xE4llig</div></div>
</div>

<h2>\xDCberf\xE4llig</h2>
${e.ueberfaellig.length===0?'<p class="leer">Nichts \xFCberf\xE4llig. Gut.</p>':`<div class="tabelle-rahmen"><table>
      <thead><tr><th>Einheit</th><th>Standort</th><th class="zahl">Steht</th>
        <th>Zuletzt gebucht</th></tr></thead>
      <tbody>${t}</tbody></table></div>
      ${e.ueberfaellig.length>15?`<p style="margin-top:10px">\u2026 und ${e.ueberfaellig.length-15} weitere.</p>`:""}`}`;return be("\xDCbersicht",n)}o(Wr,"uebersicht");function Gr(e,t){let n=new Map;for(let a of e){let s=n.get(a.artikel)??{einheit:a.mengeneinheit,orte:[]};s.orte.push(a),n.set(a.artikel,s)}let r=[...n.entries()].map(([a,{einheit:s,orte:l}])=>{let u=l.reduce((I,H)=>I+H.menge,0),f=l.filter(I=>I.standort_typ==="lager").reduce((I,H)=>I+H.menge,0),S=l.map(I=>`<tr>
      <td>${h(I.standort)} <span class="pill pill-${I.standort_typ==="lager"?"lager":"baustelle"}">${h(I.standort_typ)}</span></td>
      <td class="zahl">${h(oe(I.menge))}</td></tr>`).join("");return`<h2>${h(a)}
      <span style="font-weight:400;font-size:16px;color:#5a6472">
        \u2014 ${h(oe(f))} von ${h(oe(u))} ${h(s)} im Lager</span></h2>
      <div class="tabelle-rahmen"><table><tbody>${S}</tbody></table></div>`}).join(""),i=`
<h1>Bestand</h1>
<form method="get" class="feld">
  <input type="text" name="q" placeholder="Artikel filtern \u2026" value="${h(t)}">
</form>
${e.length===0?'<p class="leer">Kein Bestand erfasst.</p>':r}`;return be("Bestand",i)}o(Gr,"bestandSeite");function Kr(e,t,n){let r=e.map(s=>`<tr>
    <td><a href="/buero/einheit/${s.id}">${h(s.code)}</a></td>
    <td>${h(s.bezeichnung)}${s.zustand!=="ok"?` <span class="pill pill-warn">${h(St(s.zustand))}</span>`:""}</td>
    <td>${h(s.standort_name)}<br>
      <span style="font-size:14px;color:#5a6472">${h(_e(s.seit))}</span></td>
  </tr>`).join(""),i=t.map(s=>`<option value="${s.id}">${h(s.name)}</option>`).join(""),a=`
<h1>Einheiten <span style="font-weight:400;color:#5a6472">(${e.length})</span></h1>
<form method="get" class="feld">
  <input type="text" name="q" placeholder="Code oder Bezeichnung \u2026" value="${h(n)}">
</form>
${e.length===0?'<p class="leer">Keine Einheiten gefunden.</p>':`<div class="tabelle-rahmen"><table>
        <thead><tr><th>Code</th><th>Bezeichnung</th><th>Standort</th></tr></thead>
        <tbody>${r}</tbody></table></div>`}

<h2>Neue Einheit</h2>
<form method="post" action="/buero/einheiten">
  <div class="feld"><label for="bez">Bezeichnung</label>
    <input type="text" id="bez" name="bezeichnung" required
      placeholder="z. B. Gitterbox Rahmen 2,00 m"></div>
  <div class="feld"><label for="code">Code</label>
    <input type="text" id="code" name="code" required placeholder="z. B. GB-047"></div>
  <div class="feld"><label for="typ">Art</label>
    <select id="typ" name="typ">
      <option value="traeger">Ladungstr\xE4ger (Gitterbox, Stapel, B\xFCndel)</option>
      <option value="einzelteil">Einzelteil (Treppenturm, Winde \u2026)</option>
    </select></div>
  <div class="feld"><label for="st">Steht aktuell</label>
    <select id="st" name="standort_id">${i}</select></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Tag erzeugen</button>
</form>`;return be("Einheiten",a)}o(Kr,"einheitenSeite");function Zr(e){let{einheit:t}=e,n=e.inhalt.map(l=>`<tr>
    <td>${h(l.name)}</td><td class="zahl">${h(oe(l.menge))} ${h(l.mengeneinheit)}</td>
    <td class="zahl"><form method="post" action="/buero/einheit/${t.id}/inhalt">
      <input type="hidden" name="artikel_id" value="${l.artikel_id}">
      <input type="hidden" name="menge" value="0">
      <button class="knopf knopf-still" style="min-height:36px;font-size:14px;margin:0"
        type="submit">entfernen</button></form></td>
  </tr>`).join(""),r=e.historie.map(l=>`<tr>
    <td>${h(l.zeit.slice(0,16).replace(" "," \xB7 "))}</td>
    <td>${h(l.von??"\u2014")} \u2192 <strong>${h(l.nach)}</strong></td>
    <td>${h(l.wer??"\u2014")} <span style="color:#5a6472">${h(l.quelle)}</span></td>
  </tr>`).join(""),i=e.artikel.map(l=>`<option value="${l.id}">${h(l.name)}</option>`).join(""),a=e.tagCodes.map(l=>`<li><span class="code">${h(l)}</span>
      <span style="color:#5a6472;font-size:14px">${h(e.basisUrl)}/t/${h(l)}</span></li>`).join(""),s=`
${e.meldung?`<div class="erfolg">${h(e.meldung)}</div>`:""}
<h1>${h(t.code)}</h1>
<p style="font-size:20px;margin-bottom:4px">${h(t.bezeichnung)}</p>
<p style="color:#5a6472">${h(t.standort_name)} \xB7 ${h(_e(t.seit))} \xB7
  ${h(St(t.zustand))}</p>

<h2>Tags</h2>
${e.tagCodes.length===0?'<p class="leer">Kein Tag zugeordnet.</p>':`<ul class="liste" style="list-style:none">${a}</ul>`}
<p style="display:flex;gap:8px;flex-wrap:wrap">
  <a class="knopf knopf-zweit" style="width:auto;min-height:48px;font-size:16px"
    href="/buero/etiketten?einheit=${t.id}">Etikett drucken</a>
  <form method="post" action="/buero/einheit/${t.id}/tag" style="margin:0">
    <button class="knopf knopf-still" style="width:auto;min-height:48px;font-size:16px"
      type="submit">Ersatz-Tag erzeugen</button></form>
</p>

<h2>Inhalt</h2>
${e.inhalt.length===0?'<p class="leer">Leer.</p>':`<div class="tabelle-rahmen"><table><tbody>${n}</tbody></table></div>`}
<form method="post" action="/buero/einheit/${t.id}/inhalt" style="margin-top:12px">
  <div class="feld"><label for="art">Artikel</label>
    <select id="art" name="artikel_id">${i}</select></div>
  <div class="feld"><label for="menge">Menge</label>
    <input type="number" id="menge" name="menge" step="0.1" min="0" value="1"></div>
  <button class="knopf knopf-zweit" type="submit">Inhalt setzen</button>
</form>

<h2>Historie</h2>
${e.historie.length===0?'<p class="leer">Noch keine Bewegungen.</p>':`<div class="tabelle-rahmen"><table>
        <thead><tr><th>Wann</th><th>Bewegung</th><th>Wer</th></tr></thead>
        <tbody>${r}</tbody></table></div>`}`;return be(t.code,s)}o(Zr,"einheitDetail");function Jr(e){let n=`
<h1>Standorte</h1>
<div class="tabelle-rahmen"><table>
  <thead><tr><th>Name</th><th>Art</th><th></th><th></th><th></th></tr></thead>
  <tbody>${e.map(r=>`<tr>
    <td>${h(r.name)}<br><span style="font-size:14px;color:#5a6472">${h(r.adresse??"")}</span></td>
    <td><span class="pill pill-${r.typ==="lager"?"lager":"baustelle"}">${h(r.typ)}</span></td>
    <td>${r.aktiv?"":'<span class="pill pill-warn">beendet</span>'}</td>
    <td><a href="/buero/etiketten?standort=${r.id}">Etikett</a></td>
    <td>${r.typ==="baustelle"&&r.aktiv?`<form method="post" action="/buero/standorte/${r.id}/beenden">
           <button class="knopf knopf-still" style="min-height:36px;font-size:14px;margin:0"
             type="submit">beenden</button></form>`:""}</td>
  </tr>`).join("")}</tbody></table></div>

<h2>Neuer Standort</h2>
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
  <div class="feld"><label for="lat">Koordinaten (optional, f\xFCr Sortierung nach N\xE4he)</label>
    <div style="display:flex;gap:8px">
      <input type="text" id="lat" name="lat" placeholder="Breite, z. B. 53.5511">
      <input type="text" name="lon" placeholder="L\xE4nge, z. B. 9.9937"></div></div>
  <button class="knopf knopf-lager" type="submit">Anlegen</button>
</form>`;return be("Standorte",n)}o(Jr,"standorteSeite");function Vr(e,t){let r=`
<h1>Mitarbeiter</h1>
<p style="color:#5a6472">Einladungslink einmal per WhatsApp schicken. Wer ihn antippt,
  ist auf diesem Handy dauerhaft eingerichtet \u2014 kein Passwort, kein Login.</p>
<div class="tabelle-rahmen"><table>
  <thead><tr><th>Name</th><th>Rolle</th><th>Status</th><th>Zuletzt</th><th></th></tr></thead>
  <tbody>${e.map(i=>{let a=i.token_hash?'<span class="pill pill-lager">eingerichtet</span>':i.einladung?`<a href="${h(t)}/einladung/${h(i.einladung)}">Einladungslink</a>`:"\u2014";return`<tr>
      <td>${h(i.name)}${i.aktiv?"":' <span class="pill pill-warn">gesperrt</span>'}</td>
      <td>${h(i.rolle)}</td>
      <td>${a}</td>
      <td>${h(i.zuletzt_aktiv?.slice(0,10)??"\u2014")}</td>
      <td><form method="post" action="/buero/mitarbeiter/${i.id}/umschalten">
        <button class="knopf knopf-still" style="min-height:36px;font-size:14px;margin:0"
          type="submit">${i.aktiv?"sperren":"freigeben"}</button></form></td>
    </tr>`}).join("")}</tbody></table></div>

<h2>Neuer Mitarbeiter</h2>
<form method="post" action="/buero/mitarbeiter">
  <div class="feld"><label for="n">Name</label>
    <input type="text" id="n" name="name" required></div>
  <button class="knopf knopf-lager" type="submit">Anlegen und Einladung erzeugen</button>
</form>`;return be("Mitarbeiter",r)}o(Vr,"mitarbeiterSeite");function Yr(e){let t=e.map(r=>`<tr>
    <td>${h(r.name)}</td><td>${h(r.kategorie)}</td><td>${h(r.mengeneinheit)}</td>
  </tr>`).join(""),n=`
<h1>Artikel <span style="font-weight:400;color:#5a6472">(${e.length})</span></h1>
<p style="color:#5a6472">Der Materialstamm. Was hier steht, kann als Inhalt einer
  Gitterbox erfasst werden.</p>
${e.length===0?'<p class="leer">Noch keine Artikel.</p>':`<div class="tabelle-rahmen"><table>
        <thead><tr><th>Name</th><th>Kategorie</th><th>Einheit</th></tr></thead>
        <tbody>${t}</tbody></table></div>`}

<h2>Neuer Artikel</h2>
<form method="post" action="/buero/artikel">
  <div class="feld"><label for="an">Name</label>
    <input type="text" id="an" name="name" required placeholder="z. B. Rahmen 2,00 m"></div>
  <div class="feld"><label for="ak">Kategorie</label>
    <input type="text" id="ak" name="kategorie" placeholder="z. B. rahmen"></div>
  <div class="feld"><label for="am">Mengeneinheit</label>
    <input type="text" id="am" name="mengeneinheit" value="Stk"></div>
  <button class="knopf knopf-lager" type="submit">Anlegen</button>
</form>`;return be("Artikel",n)}o(Yr,"artikelSeite");function Qr(e,t,n){let r=e.map(s=>`<tr>
    <td>${h(s.standort)}${s.aktiv?"":' <span class="pill pill-warn">beendet</span>'}</td>
    <td class="zahl">${s.einheiten}</td>
    <td class="zahl">${s.tage_summe}</td>
    <td class="zahl">${s.tage_max}</td>
    <td>${h(s.erste_lieferung?.slice(0,10)??"\u2014")}</td>
  </tr>`).join(""),i=t.map(s=>`<tr>
    <td><a href="/buero/einheit/${s.einheit_id}">${h(s.code)}</a><br>
      <span style="font-size:14px;color:#5a6472">${h(s.bezeichnung)}</span></td>
    <td>${h(s.standort)}${s.standort_beendet?' <span class="pill pill-warn">beendet</span>':""}</td>
    <td class="zahl">${s.tage}</td>
    <td style="font-size:14px">${h(s.inhalt??"\u2014")}</td>
    <td>${h(s.zuletzt_von??"\u2014")}</td>
  </tr>`).join(""),a=`
<h1>Auswertung</h1>

<h2>Vorhaltetage je Baustelle</h2>
<p style="color:#5a6472">Summe \xFCber alle Einheiten (Einheitentage) \u2014 die Zahl, die bei
  Streit \xFCber die Mietdauer z\xE4hlt, nicht die Kalenderdauer der Baustelle.</p>
${e.length===0?'<p class="leer">Noch keine Bewegungen auf Baustellen.</p>':`<div class="tabelle-rahmen"><table>
        <thead><tr><th>Baustelle</th><th class="zahl">Einheiten</th>
          <th class="zahl">Einheitentage</th><th class="zahl">l\xE4ngste</th>
          <th>erste Lieferung</th></tr></thead>
        <tbody>${r}</tbody></table></div>`}

<h2>Vermutlicher Verlust <span style="font-weight:400;font-size:16px;color:#5a6472">
  (ab ${n} Tagen oder auf beendeter Baustelle)</span></h2>
${t.length===0?'<p class="leer">Nichts. Gut.</p>':`<div class="tabelle-rahmen"><table>
        <thead><tr><th>Einheit</th><th>Standort</th><th class="zahl">Tage</th>
          <th>Inhalt</th><th>Zuletzt gebucht</th></tr></thead>
        <tbody>${i}</tbody></table></div>`}`;return be("Auswertung",a)}o(Qr,"auswertungSeite");function Xr(e,t){let n=e.map(i=>`<tr>
    <td>${h(i.zeit.slice(0,16))}</td>
    <td><a href="/buero/einheit/${i.einheit_id}">${h(i.code)}</a><br>
      <span style="font-size:14px;color:#5a6472">${h(i.bezeichnung)}</span></td>
    <td><span class="pill ${i.art==="ok"?"pill-lager":"pill-warn"}">${h(i.art)}</span></td>
    <td>${h(i.text??"")}${i.foto_schluessel?`<br><a href="/foto/${h(i.foto_schluessel)}">Foto</a>`:""}</td>
    <td>${h(i.wer??"\u2014")}</td>
    <td>${i.erledigt?"":`<form method="post" action="/buero/meldung/${i.id}/erledigt">
      <button class="knopf knopf-still" style="min-height:36px;font-size:14px;margin:0"
        type="submit">erledigt</button></form>`}</td>
  </tr>`).join(""),r=`
<h1>Meldungen</h1>
<p><a href="/buero/meldungen${t?"":"?alle=1"}">${t?"Nur offene zeigen":"Auch erledigte zeigen"}</a></p>
${e.length===0?'<p class="leer">Keine Meldungen.</p>':`<div class="tabelle-rahmen"><table>
        <thead><tr><th>Wann</th><th>Einheit</th><th>Art</th><th>Was</th><th>Wer</th><th></th></tr></thead>
        <tbody>${n}</tbody></table></div>`}`;return be("Meldungen",r)}o(Xr,"meldungenSeite");var M=new Wt,tn=o(e=>new URL(e.url).origin,"basisUrl");M.get("/",async e=>{let t=await ee(e.req.raw,e.env);if(!t)return await Ve(e.req.raw,e.env)?e.redirect("/buero"):W(K(`
<div class="karte">
  <h1>${h(e.env.FIRMA)}</h1>
  <p>Lagerverwaltung. Zum Buchen einen Tag ans Handy halten.</p>
</div>
<p class="hinweis">Dieses Handy ist noch nicht eingerichtet. Der Einladungslink kommt
  vom B\xFCro \u2014 einmal antippen gen\xFCgt.</p>
<a class="knopf knopf-still" href="/buero">B\xFCro</a>`,{titel:e.env.FIRMA,kopf:Z("Lager")}));let n=await Ae(e.env,t.id),r=await ft(e.env);return W(K(`
<h1>Hallo ${h(t.name)}</h1>
<p style="color:#5a6472;margin-bottom:20px">Tag ans Handy halten, um zu buchen.</p>
<form method="get" action="/t">
  <div class="feld"><label for="code">Oder Code vom Aufkleber eintippen</label>
    <input type="text" id="code" name="code" autocapitalize="characters"
      autocomplete="off" placeholder="z. B. K7F2QX"></div>
  <button class="knopf knopf-lager" type="submit">\xD6ffnen</button>
</form>
<a class="knopf knopf-zweit" href="/scan">Scan-Station (Android)</a>
${r?`<p class="fuss">Hauptlager: ${h(r.name)}</p>`:""}`,{titel:"Lager",kopf:Z("Lager"),banner:Ne(n)}))});M.get("/t",e=>{let t=se(e.req.query("code")??"");return t?e.redirect(`/t/${t}`):e.redirect("/")});M.get("/t/:code",async e=>{let t=e.req.param("code"),n=await Fe(e.env,t);if(!n)return Ye(se(t));let r=n.code,i=await ee(e.req.raw,e.env);if(n.art==="standort")return i?(await Xt(e.env,i.id,n.standort.id,n.standort.name),W(K(`
<div class="erfolg"><strong>Du bist auf ${h(n.standort.name)}.</strong><br>
  Die n\xE4chsten 4 Stunden geht jede Einheit mit einem Tap hierher.</div>
<p>Jetzt die Einheiten antippen.</p>
<a class="knopf knopf-still" href="/">\xDCbersicht</a>`,{titel:n.standort.name,kopf:Z("Lager"),banner:Ne(await Ae(e.env,i.id))}))):e.redirect("/");let a=n.einheit;if(!i)return Ar(a,e.env.FIRMA,e.env.FIRMA_TELEFON);let[s,l,u]=await Promise.all([Ge(e.env,a.id),Ae(e.env,i.id),ft(e.env)]),f=Number(e.req.query("ok")??0),S=f?{art:"erfolg",text:`Gebucht: ${a.standort_name}`}:e.req.query("schon")?{art:"hinweis",text:"Stand schon dort \u2014 nichts ge\xE4ndert."}:e.req.query("gemeldet")?{art:"erfolg",text:"Meldung ist im B\xFCro angekommen."}:e.req.query("storniert")?{art:"hinweis",text:"Buchung zur\xFCckgenommen."}:e.req.query("fehler")?{art:"fehler",text:String(e.req.query("fehler"))}:void 0,I=l?await Jt(e.env,l.standortId):null,H=I?[kr(I.id,r,I.standort??""),...en(a,l,u)]:en(a,l,u);return Rr({einheit:a,inhalt:s,aktionen:H,sitzung:l,meldung:S,stornoId:f||void 0})});M.get("/t/:code/wohin",async e=>{let t=await Fe(e.env,e.req.param("code"));if(!t||t.art!=="einheit")return Ye(se(e.req.param("code")));let n=t.code,r=await ee(e.req.raw,e.env);if(!r)return e.redirect(`/t/${n}`);let i=Number(e.req.query("lat")),a=Number(e.req.query("lon")),s=Number.isFinite(i)&&Number.isFinite(a),f=(await me(e.env)).filter(S=>S.id!==t.einheit.standort_id).map(S=>({...S,entfernungKm:s&&S.lat!==null&&S.lon!==null?_r(i,a,S.lat,S.lon):void 0}));return f.sort((S,I)=>S.typ!==I.typ?S.typ==="lager"?-1:1:S.entfernungKm!==void 0&&I.entfernungKm!==void 0?S.entfernungKm-I.entfernungKm:S.entfernungKm!==void 0?-1:I.entfernungKm!==void 0?1:S.name.localeCompare(I.name,"de")),Tr({code:n,bezeichnung:t.einheit.bezeichnung,standorte:f,sitzung:await Ae(e.env,r.id),hatPosition:s})});M.post("/api/buchung",async e=>{let t=(e.req.header("Accept")??"").includes("application/json"),n=await ce(e.req.raw),r=se(String(n.code??"")),i=Number(n.ziel),a=o((f,S=400)=>t?e.json({ok:!1,fehler:f},S):e.redirect(`/t/${r}?fehler=${encodeURIComponent(f)}`,303),"antwortFehler"),s=await ee(e.req.raw,e.env);if(!s)return a("Handy nicht eingerichtet",401);let l=await Fe(e.env,r);if(!l||l.art!=="einheit")return a("Unbekannter Tag",404);if(!Number.isInteger(i)||!await ue(e.env,i))return a("Unbekannter Standort",400);let u=await Ke(e.env,{einheitId:l.einheit.id,nachStandortId:i,mitarbeiterId:s.id,quelle:n.quelle==="nfc"?"nfc":"qr",lat:Rt(n.lat),lon:Rt(n.lon)});if(!u)return a("Einheit nicht gefunden",404);if(await e.env.DB.prepare("UPDATE mitarbeiter SET zuletzt_aktiv = datetime('now') WHERE id = ?").bind(s.id).run(),t){let f=await ue(e.env,i);return e.json({ok:!0,unveraendert:u.unveraendert,bezeichnung:l.einheit.bezeichnung,standort:f?.name??"",buchung_id:u.buchungId})}return e.redirect(u.unveraendert?`/t/${r}?schon=1`:`/t/${r}?ok=${u.buchungId}`,303)});M.post("/api/storno",async e=>{let t=await ce(e.req.raw),n=se(String(t.code??""));if(!await ee(e.req.raw,e.env))return e.redirect("/");let i=await pr(e.env,Number(t.id));return e.redirect(i.ok?`/t/${n}?storniert=1`:`/t/${n}?fehler=${encodeURIComponent(i.grund)}`,303)});M.get("/einladung/:code",async e=>{let t=e.req.param("code"),n=await e.env.DB.prepare("SELECT id, name FROM mitarbeiter WHERE einladung = ? AND aktiv = 1").bind(t).first();if(!n)return W(K(`
<div class="fehler"><strong>Link nicht g\xFCltig.</strong><br>
  Entweder schon benutzt oder abgelaufen. Bitte im B\xFCro einen neuen anfordern.</div>`,{titel:"Einladung",kopf:Z("Lager")}),410);let r=hr();return await e.env.DB.prepare("UPDATE mitarbeiter SET token_hash = ?, einladung = NULL WHERE id = ?").bind(await Pe(r),n.id).run(),W(K(`
<div class="erfolg"><strong>Fertig, ${h(n.name)}.</strong><br>
  Dieses Handy ist jetzt eingerichtet. Kein Passwort, kein Login \u2014 einfach Tags antippen.</div>
<a class="knopf knopf-haupt" href="/">Los geht's</a>`,{titel:"Eingerichtet",kopf:Z("Lager")}),200,{"Set-Cookie":Yt(Vt,r,60*60*24*365*2)})});M.get("/sitzung/beenden",async e=>{let t=await ee(e.req.raw,e.env);return t&&await Sr(e.env,t.id),e.redirect("/")});M.get("/scan",async e=>{let t=await ee(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await Ae(e.env,t.id),r=await ft(e.env);return Lr(await me(e.env),n?.standortId??r?.id??null)});M.get("/t/:code/melden",async e=>{let t=await Fe(e.env,e.req.param("code"));return!t||t.art!=="einheit"?Ye(se(e.req.param("code"))):await ee(e.req.raw,e.env)?Nr(t.einheit,e.env.FOTOS!==void 0):e.redirect(`/t/${t.code}`)});M.post("/t/:code/melden",async e=>{let t=await Fe(e.env,e.req.param("code"));if(!t||t.art!=="einheit")return Ye(se(e.req.param("code")));let n=await ee(e.req.raw,e.env);if(!n)return e.redirect("/");let r=await e.req.raw.formData(),i=String(r.get("art")??"hinweis"),a=String(r.get("text")??"").trim()||null,s=null,l=r.get("foto");if(e.env.FOTOS&&l&&typeof l!="string"&&l.size>0){if(l.size>8*1024*1024)return e.redirect(`/t/${t.code}?fehler=${encodeURIComponent("Foto zu gro\xDF (max. 8 MB)")}`,303);s=`${t.einheit.id}/${Date.now()}-${crypto.randomUUID().slice(0,8)}`,await e.env.FOTOS.put(s,l.stream(),{httpMetadata:{contentType:l.type||"image/jpeg"}})}return await Er(e.env,{einheitId:t.einheit.id,art:i,text:a,fotoSchluessel:s,mitarbeiterId:n.id}),e.redirect(`/t/${t.code}?gemeldet=1`,303)});M.get("/foto/*",async e=>{if(!await Ve(e.req.raw,e.env)&&!await ee(e.req.raw,e.env))return new Response("Nicht berechtigt",{status:403});if(!e.env.FOTOS)return e.notFound();let t=decodeURIComponent(new URL(e.req.url).pathname.slice(6)),n=await e.env.FOTOS.get(t);return n?new Response(n.body,{headers:{"Content-Type":n.httpMetadata?.contentType??"image/jpeg","Cache-Control":"private, max-age=3600"}}):e.notFound()});M.get("/inventur",async e=>{if(!await ee(e.req.raw,e.env))return e.redirect("/");let{results:t}=await e.env.DB.prepare(`SELECT i.id, s.name AS standort FROM inventur i JOIN standort s ON s.id = i.standort_id
      WHERE i.beendet_am IS NULL ORDER BY i.id DESC`).all();return Or(await me(e.env),t)});M.post("/inventur",async e=>{let t=await ee(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await ce(e.req.raw),r=Number(n.standort_id),i=await ue(e.env,r);if(!i)return e.redirect("/inventur",303);let a=await bt(e.env,r,t.id);return await Xt(e.env,t.id,i.id,i.name),e.redirect(`/inventur/${a.id}`,303)});M.get("/inventur/:id",async e=>{let t=await ee(e.req.raw,e.env);if(!t)return e.redirect("/");let n=await Te(e.env,Number(e.req.param("id")));return n?Ir(n,await Ae(e.env,t.id)):e.notFound()});M.post("/inventur/:id/abschliessen",async e=>{if(!await ee(e.req.raw,e.env))return e.redirect("/");let t=Number(e.req.param("id"));return await vt(e.env,t),e.redirect(`/inventur/${t}`,303)});M.post("/api/inventur/treffer",async e=>{let t=(e.req.header("Accept")??"").includes("application/json"),n=await ee(e.req.raw,e.env);if(!n)return t?e.json({ok:!1,fehler:"nicht eingerichtet"},401):e.redirect("/");let r=await ce(e.req.raw),i=se(String(r.code??"")),a=Number(r.inventur),s=await Fe(e.env,i),l=await Te(e.env,a);if(!s||s.art!=="einheit"||!l||l.inventur.beendet_am)return t?e.json({ok:!1,fehler:"Inventur oder Tag unbekannt"},404):e.redirect(`/t/${i}?fehler=${encodeURIComponent("Inventur oder Tag unbekannt")}`,303);let u=l.inventur.standort_id,f=s.einheit.standort_id!==u;return f&&await Ke(e.env,{einheitId:s.einheit.id,nachStandortId:u,mitarbeiterId:n.id,quelle:"nfc",notiz:"Inventur: hier vorgefunden"}),await vr(e.env,a,s.einheit.id,f),t?e.json({ok:!0,war_woanders:f}):e.redirect(`/inventur/${a}`,303)});M.get("/app.js",()=>new Response(Cr,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"max-age=300"}}));M.get("/sw.js",()=>new Response(Dr,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"max-age=0"}}));M.get("/offline",()=>Mr());M.get("/api/schnappschuss",async e=>{if(!await ee(e.req.raw,e.env))return e.json({fehler:"nicht eingerichtet"},401);let{results:t}=await e.env.DB.prepare(`SELECT e.id, e.code, e.bezeichnung, e.standort_id, s.name AS standort_name,
            (SELECT group_concat(CAST(i.menge AS INTEGER) || '\xD7 ' || a.name, ', ')
               FROM inhalt i JOIN artikel a ON a.id = i.artikel_id
              WHERE i.einheit_id = e.id) AS inhalt
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1`).all(),{results:n}=await e.env.DB.prepare("SELECT code, ziel_id FROM tag WHERE ziel_typ = 'einheit' AND aktiv = 1").all(),r=new Map(t.map(s=>[s.id,s])),i={},a=o(s=>({c:s.code,b:s.bezeichnung,s:s.standort_id,sn:s.standort_name,i:s.inhalt}),"eintrag");for(let s of t)i[s.code]=a(s);for(let s of n){let l=r.get(s.ziel_id);l&&(i[s.code]=a(l))}return e.json({zeit:new Date().toISOString(),standorte:(await me(e.env)).map(s=>({id:s.id,name:s.name,typ:s.typ})),einheiten:i})});M.post("/mcp",e=>zr(e.req.raw,e.env));M.get("/mcp",()=>new Response("MCP-Endpunkt. Bitte POST mit JSON-RPC.",{status:405}));M.use("/buero/*",async(e,t)=>e.req.path==="/buero/anmelden"||await Ve(e.req.raw,e.env)?t():Xe());M.get("/buero",async e=>{if(!await Ve(e.req.raw,e.env))return Xe();let t=await e.env.DB.prepare(`SELECT COUNT(*) AS gesamt,
            SUM(CASE WHEN s.typ = 'lager' THEN 1 ELSE 0 END) AS im_lager,
            SUM(CASE WHEN s.typ = 'baustelle' THEN 1 ELSE 0 END) AS auf_baustellen
       FROM einheit e JOIN standort s ON s.id = e.standort_id WHERE e.aktiv = 1`).first(),n=await me(e.env);return Wr({einheiten:t?.gesamt??0,imLager:t?.im_lager??0,aufBaustellen:t?.auf_baustellen??0,ueberfaellig:await Je(e.env),standorte:n.length})});M.post("/buero/anmelden",async e=>{let t=await ce(e.req.raw),n=String(t.passwort??"");return e.env.ADMIN_PASSWORT?yt(n,e.env.ADMIN_PASSWORT)?new Response(null,{status:303,headers:{Location:"/buero","Set-Cookie":Yt(wt,await Pe(n),60*60*12)}}):Xe("Falsches Passwort."):Xe("ADMIN_PASSWORT ist nicht gesetzt.")});M.get("/buero/abmelden",()=>new Response(null,{status:303,headers:{Location:"/","Set-Cookie":xr(wt)}}));M.get("/buero/bestand",async e=>{let t=e.req.query("q")??"";return Gr(await Ze(e.env,{artikelSuche:t||void 0}),t)});M.get("/buero/einheiten",async e=>{let t=e.req.query("q")??"",n=`%${t}%`,{results:r}=await e.env.DB.prepare(`SELECT e.*, s.name AS standort_name, s.typ AS standort_typ
       FROM einheit e JOIN standort s ON s.id = e.standort_id
      WHERE e.aktiv = 1 AND (?1 = '' OR e.code LIKE ?2 OR e.bezeichnung LIKE ?2)
      ORDER BY e.code LIMIT 300`).bind(t,n).all();return Kr(r,await me(e.env),t)});M.post("/buero/einheiten",async e=>{let t=await ce(e.req.raw),n=String(t.code??"").trim(),r=String(t.bezeichnung??"").trim(),i=t.typ==="einzelteil"?"einzelteil":"traeger",a=Number(t.standort_id);if(!n||!r||!Number.isInteger(a))return e.redirect("/buero/einheiten");let s=await e.env.DB.prepare(`INSERT INTO einheit (code, typ, bezeichnung, standort_id) VALUES (?, ?, ?, ?)
     RETURNING id`).bind(n,i,r,a).first();return s?(await Se(e.env,"einheit",s.id),await e.env.DB.prepare(`INSERT INTO buchung (einheit_id, von_standort_id, nach_standort_id, quelle, notiz)
     VALUES (?, NULL, ?, 'manuell', 'Ersterfassung')`).bind(s.id,a).run(),e.redirect(`/buero/einheit/${s.id}`,303)):e.redirect("/buero/einheiten")});M.get("/buero/einheit/:id",async e=>{let t=Number(e.req.param("id")),n=await He(e.env,t);if(!n)return e.notFound();let{results:r}=await e.env.DB.prepare("SELECT code FROM tag WHERE ziel_typ = 'einheit' AND ziel_id = ? AND aktiv = 1").bind(t).all();return Zr({einheit:n,inhalt:await Ge(e.env,t),historie:await pt(e.env,t),artikel:await Zt(e.env),tagCodes:r.map(i=>i.code),basisUrl:tn(e.req.raw)})});M.post("/buero/einheit/:id/inhalt",async e=>{let t=Number(e.req.param("id")),n=await ce(e.req.raw),r=Number(n.artikel_id),i=Number(n.menge);return Number.isInteger(r)?(!Number.isFinite(i)||i<=0?await e.env.DB.prepare("DELETE FROM inhalt WHERE einheit_id = ? AND artikel_id = ?").bind(t,r).run():await e.env.DB.prepare(`INSERT INTO inhalt (einheit_id, artikel_id, menge) VALUES (?, ?, ?)
       ON CONFLICT (einheit_id, artikel_id) DO UPDATE SET menge = excluded.menge`).bind(t,r,i).run(),e.redirect(`/buero/einheit/${t}`,303)):e.redirect(`/buero/einheit/${t}`,303)});M.post("/buero/einheit/:id/tag",async e=>{let t=Number(e.req.param("id"));return await Se(e.env,"einheit",t),e.redirect(`/buero/einheit/${t}`,303)});M.get("/buero/standorte",async e=>{let{results:t}=await e.env.DB.prepare("SELECT * FROM standort ORDER BY aktiv DESC, typ, name").all();return Jr(t)});M.post("/buero/standorte",async e=>{let t=await ce(e.req.raw),n=String(t.name??"").trim();if(!n)return e.redirect("/buero/standorte",303);let r=t.typ==="lager"?"lager":"baustelle",i=await e.env.DB.prepare(`INSERT INTO standort (name, typ, adresse, lat, lon) VALUES (?, ?, ?, ?, ?)
     RETURNING id`).bind(n,r,String(t.adresse??"").trim()||null,Rt(t.lat),Rt(t.lon)).first();return i&&await Se(e.env,"standort",i.id),e.redirect("/buero/standorte",303)});M.post("/buero/standorte/:id/beenden",async e=>(await e.env.DB.prepare("UPDATE standort SET aktiv = 0, beendet_am = datetime('now') WHERE id = ? AND typ = 'baustelle'").bind(Number(e.req.param("id"))).run(),e.redirect("/buero/standorte",303)));M.get("/buero/mitarbeiter",async e=>{let{results:t}=await e.env.DB.prepare(`SELECT id, name, rolle, aktiv, einladung, token_hash, zuletzt_aktiv
       FROM mitarbeiter ORDER BY aktiv DESC, name`).all();return Vr(t,tn(e.req.raw))});M.post("/buero/mitarbeiter",async e=>{let t=await ce(e.req.raw),n=String(t.name??"").trim();return n&&await e.env.DB.prepare("INSERT INTO mitarbeiter (name, einladung) VALUES (?, ?)").bind(n,cr()).run(),e.redirect("/buero/mitarbeiter",303)});M.post("/buero/mitarbeiter/:id/umschalten",async e=>(await e.env.DB.prepare("UPDATE mitarbeiter SET aktiv = 1 - aktiv WHERE id = ?").bind(Number(e.req.param("id"))).run(),e.redirect("/buero/mitarbeiter",303)));M.get("/buero/artikel",async e=>Yr(await Zt(e.env)));M.post("/buero/artikel",async e=>{let t=await ce(e.req.raw),n=String(t.name??"").trim();return n&&await e.env.DB.prepare(`INSERT INTO artikel (name, kategorie, mengeneinheit) VALUES (?, ?, ?)
       ON CONFLICT (name) DO NOTHING`).bind(n,String(t.kategorie??"").trim()||"sonstiges",String(t.mengeneinheit??"").trim()||"Stk").run(),e.redirect("/buero/artikel",303)});M.get("/buero/auswertung",async e=>{let t=Number(e.req.query("schwelle"))||120;return Qr(await gt(e.env),await mt(e.env,t),t)});M.get("/buero/meldungen",async e=>{let t=e.req.query("alle")==="1";return Xr(await Et(e.env,!t),t)});M.post("/buero/meldung/:id/erledigt",async e=>(await e.env.DB.prepare("UPDATE meldung SET erledigt = 1 WHERE id = ?").bind(Number(e.req.param("id"))).run(),e.redirect("/buero/meldungen",303)));M.get("/buero/etiketten",async e=>{let t=tn(e.req.raw),n=e.req.query("einheit"),r=e.req.query("standort"),i;if(n){let{results:s}=await e.env.DB.prepare(`SELECT t.code, e.code || ' \xB7 ' || e.bezeichnung AS bezeichnung
         FROM tag t JOIN einheit e ON e.id = t.ziel_id
        WHERE t.ziel_typ = 'einheit' AND t.ziel_id = ? AND t.aktiv = 1`).bind(Number(n)).all();i=s}else if(r){let{results:s}=await e.env.DB.prepare(`SELECT t.code, 'Standort ' || s.name AS bezeichnung
         FROM tag t JOIN standort s ON s.id = t.ziel_id
        WHERE t.ziel_typ = 'standort' AND t.ziel_id = ? AND t.aktiv = 1`).bind(Number(r)).all();i=s}else{let{results:s}=await e.env.DB.prepare(`SELECT t.code, e.code || ' \xB7 ' || e.bezeichnung AS bezeichnung
         FROM tag t JOIN einheit e ON e.id = t.ziel_id
        WHERE t.ziel_typ = 'einheit' AND t.aktiv = 1 AND e.aktiv = 1
        ORDER BY e.code LIMIT 500`).all();i=s}let a=i.map(s=>({code:s.code,bezeichnung:s.bezeichnung,url:`${t}/t/${s.code}`}));return W(qr(a,e.env.FIRMA))});async function Fe(e,t){let n=se(t),r=ur(t),i=n===r?[n]:[n,r];for(let a of i){if(!a)continue;let s=await fr(e,a);if(s?.ziel_typ==="einheit"){let u=await He(e,s.ziel_id);if(u)return{art:"einheit",einheit:u,code:a}}if(s?.ziel_typ==="standort"){let u=await ue(e,s.ziel_id);if(u)return{art:"standort",standort:u,code:a}}let l=await We(e,a);if(l)return{art:"einheit",einheit:l,code:a}}return null}o(Fe,"zielFuerCode");async function ce(e){if((e.headers.get("Content-Type")??"").includes("application/json"))try{return await e.json()}catch{return{}}let n=await e.formData();return Object.fromEntries(n.entries())}o(ce,"eingabeLesen");function Rt(e){if(e==null||e==="")return null;let t=Number(String(e).replace(",","."));return Number.isFinite(t)?t:null}o(Rt,"zahlOderNull");M.notFound(()=>W(K('<div class="fehler">Seite nicht gefunden.</div><a class="knopf knopf-still" href="/">\xDCbersicht</a>',{titel:"Nicht gefunden",kopf:Z("Lager")}),404));async function Ps(e){let t=await Je(e),n=t.map(s=>s.code).sort(),r=await e.DB.prepare("SELECT codes FROM ueberfaellig_lauf ORDER BY id DESC LIMIT 1").first(),i=new Set((r?.codes??"").split(",").filter(Boolean)),a=t.filter(s=>!i.has(s.code));if(await e.DB.prepare("INSERT INTO ueberfaellig_lauf (anzahl, neu, codes, gemeldet) VALUES (?, ?, ?, ?)").bind(t.length,a.length,n.join(","),e.MELDUNG_WEBHOOK?1:0).run(),e.MELDUNG_WEBHOOK&&a.length>0){let s=a.map(u=>`\u2022 ${u.code} \u2014 ${u.bezeichnung} \xB7 ${u.standort}${u.baustelle_beendet?" (Baustelle beendet!)":""} \xB7 ${u.tage} Tage \xB7 zuletzt ${u.zuletzt_gebucht_von??"unbekannt"}`).join(`
`),l=`*Lager \u2014 \xFCberf\xE4lliges Material*
${a.length} neu, ${t.length} insgesamt drau\xDFen.

${s}`;try{await fetch(e.MELDUNG_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:l})})}catch{}}return{anzahl:t.length,neu:a.length}}o(Ps,"wochenlauf");var fp={fetch:M.fetch,async scheduled(e,t,n){n.waitUntil(Ps(t))}};export{fp as default,Ps as wochenlauf};
//# sourceMappingURL=index.js.map
