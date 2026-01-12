import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const soundCorrect = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";
const soundWrong = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

const objectTemplates = [
  { type: "plastic", component: () => (<svg width="64" height="64" viewBox="0 0 64 64"><motion.rect width="36" height="48" x="14" y="8" rx="8" fill="#3b82f6" animate={{ rotate: [0,5,-5,0] }} transition={{ repeat: Infinity, duration: 2 }}/><motion.circle cx="32" cy="16" r="6" fill="#60a5fa" animate={{ y:[0,-6,0] }} transition={{ repeat: Infinity, duration:1.5 }}/></svg>) },
  { type: "paper", component: () => (<svg width="64" height="64" viewBox="0 0 64 64"><motion.rect width="40" height="48" x="12" y="8" fill="#facc15" animate={{ y:[0,-5,0] }} transition={{ repeat: Infinity, duration:1 }}/><line x1="16" y1="20" x2="48" y2="20" stroke="#eab308" strokeWidth="3"/><line x1="16" y1="30" x2="48" y2="30" stroke="#eab308" strokeWidth="3"/></svg>) },
  { type: "metal", component: () => (<svg width="64" height="64" viewBox="0 0 64 64"><motion.rect width="32" height="48" x="16" y="8" rx="6" fill="#9ca3af" animate={{ scale:[1,1.1,1] }} transition={{ repeat: Infinity, duration:1 }}/><line x1="18" y1="22" x2="46" y2="22" stroke="#6b7280" strokeWidth="2"/></svg>) },
  { type: "glass", component: () => (<svg width="64" height="64" viewBox="0 0 64 64"><motion.rect width="28" height="48" x="18" y="8" rx="6" fill="#22c55e" animate={{ rotate:[0,3,-3,0] }} transition={{ repeat: Infinity, duration:2 }}/><circle cx="32" cy="18" r="4" fill="#4ade80"/></svg>) },
];

const containers = [
  { type: "plastic", label: "Plástico", color: "#3b82f6" },
  { type: "paper", label: "Papel", color: "#facc15" },
  { type: "metal", label: "Metal", color: "#9ca3af" },
  { type: "glass", label: "Vidrio", color: "#22c55e" },
];

const difficulties = {
  Fácil: { fallDuration: 8, spawnInterval: 1500, time: 60 },
  Medio: { fallDuration: 6, spawnInterval: 1200, time: 60 },
  Experto: { fallDuration: 4, spawnInterval: 900, time: 60 },
  Extremo: { fallDuration: 3, spawnInterval: 700, time: 60 },
};

export default function RecyclingGame() {
  const [objects,setObjects]=useState([]);
  const [score,setScore]=useState(0);
  const [time,setTime]=useState(0);
  const [gameOver,setGameOver]=useState(false);
  const [gameStarted,setGameStarted]=useState(false);
  const [difficulty,setDifficulty]=useState("Fácil");
  const [lives,setLives]=useState(3);
  const [infiniteMode,setInfiniteMode]=useState(false);

  const audioCorrect=useRef(null);
  const audioWrong=useRef(null);

  useEffect(()=>{
    if(!gameStarted || gameOver) return;
    if(time<=0) return setGameOver(true);
    const timer=setTimeout(()=>setTime(t=>t-1),1000);
    return ()=>clearTimeout(timer);
  },[time,gameStarted,gameOver]);

  useEffect(()=>{
    if(!gameStarted || gameOver) return;
    const spawn=setInterval(()=>{
      const template=objectTemplates[Math.floor(Math.random()*objectTemplates.length)];
      setObjects(prev=>[...prev,{id:Date.now()+Math.random(),type:template.type,Component:template.component,x:Math.random()*(window.innerWidth-64)}]);
    },difficulties[difficulty].spawnInterval);
    return ()=>clearInterval(spawn);
  },[difficulty,gameStarted,gameOver]);

  const handleDrop=(objId,containerType)=>{
    const obj=objects.find(o=>o.id===objId);
    if(!obj) return;
    setObjects(prev=>prev.filter(o=>o.id!==objId));
    if(obj.type===containerType){
      setScore(s=>s+1);
      audioCorrect.current.play().catch(()=>{});
    }else{
      audioWrong.current.play().catch(()=>{});
      if(!infiniteMode){
        setLives(l=>l-1);
        if(lives-1<=0) setGameOver(true);
      }
    }
  };

  const handleMissed=(objId)=>{
    setObjects(prev=>prev.filter(o=>o.id!==objId));
    if(!infiniteMode){
      setLives(l=>l-1);
      if(lives-1<=0) setGameOver(true);
    }
  };

  if(!gameStarted){
    return(
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col items-center gap-4 w-80 text-center">
          <h1 className="text-2xl font-bold mb-2">♻️ ¡Bienvenido al juego de reciclaje! ♻️</h1>
          <label className="font-semibold">Selecciona dificultad:</label>
          <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="px-3 py-1 rounded w-full mb-2 text-black bg-white">
            {Object.keys(difficulties).map(d=><option key={d} value={d}>{d}</option>)}
          </select>
          <label className="flex items-center justify-center mb-2 text-white">
            <input type="checkbox" checked={infiniteMode} onChange={e=>setInfiniteMode(e.target.checked)} className="mr-2"/>
            Modo infinito
          </label>
          <button className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 w-full" onClick={()=>{
            setTime(difficulties[difficulty].time);
            setScore(0);
            setObjects([]);
            setLives(3);
            setGameOver(false);
            setGameStarted(true);
          }}>Jugar</button>
        </div>
      </div>
    )
  }

  if(gameOver){
    return(
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        <div className="bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col items-center gap-4 w-80 text-center">
          <h1 className="text-3xl font-bold mb-2">¡Fin del Juego!</h1>
          <p className="text-xl mb-2">Puntaje: {score}</p>
          <button className="px-6 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 w-full" onClick={()=>setGameStarted(false)}>Volver al inicio</button>
        </div>
      </div>
    )
  }

  return(
    <div className="relative w-full h-screen bg-slate-900 text-white overflow-hidden select-none">
      <audio ref={audioCorrect} src={soundCorrect} />
      <audio ref={audioWrong} src={soundWrong} />

      <div className="absolute top-4 right-4 text-right bg-slate-800/60 p-3 rounded-lg shadow-lg z-50">
        <h2 className="text-xl mb-1">Puntaje: {score}</h2>
        <h2 className="text-xl mb-1">Tiempo: {time}s</h2>
        {!infiniteMode && <h2 className="text-xl mb-1">Intentos: {lives}</h2>}
      </div>

      <AnimatePresence>
        {objects.map(obj=>(
          <motion.div key={obj.id} drag dragConstraints={{left:-50,right:window.innerWidth-64+50,top:0,bottom:window.innerHeight-200}} dragMomentum={false}
            initial={{y:-80}}
            animate={{y:window.innerHeight-200}}
            transition={{duration:difficulties[difficulty].fallDuration, ease:"linear"}}
            onDragEnd={(e,info)=>{
              const zoneWidth=window.innerWidth/containers.length;
              const index=Math.floor(info.point.x/zoneWidth);
              if(containers[index]) handleDrop(obj.id,containers[index].type);
            }}
            onAnimationComplete={()=>handleMissed(obj.id)}
            style={{position:"absolute",left:obj.x,cursor:"grab"}}
          >
            <obj.Component/>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-0 w-full flex space-x-2 p-2">
        {containers.map(c=>(
          <div key={c.type} style={{backgroundColor:c.color}} className="flex-1 h-36 flex items-center justify-center text-xl font-bold rounded-xl border-4 border-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
            {c.label}
          </div>
        ))}
      </div>
    </div>
  )
}
