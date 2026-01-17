
// import { useState, useEffect, useRef } from 'react';

// export default function ARViewer({ item, isOpen, onClose }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadProgress, setLoadProgress] = useState(0);
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const modelRef = useRef(null);

//   useEffect(() => {
//     if (!isOpen || !item) return;

//     setIsLoading(true);
//     setModelLoaded(false);
//     setLoadProgress(0);

//     const modelViewer = modelRef.current;
//     if (!modelViewer) return;

//     const handleProgress = (event) => {
//       const progress = event.detail.totalProgress;
//       setLoadProgress(Math.round(progress * 100));
//     };

//     const handleLoad = () => {
//       setIsLoading(false);
//       setModelLoaded(true);
//       setLoadProgress(100);
//     };

//     const handleError = (error) => {
//       setIsLoading(false);
//       console.error('Model failed to load:', error);
//     };

//     modelViewer.addEventListener('progress', handleProgress);
//     modelViewer.addEventListener('load', handleLoad);
//     modelViewer.addEventListener('error', handleError);

//     return () => {
//       if (modelViewer) {
//         modelViewer.removeEventListener('progress', handleProgress);
//         modelViewer.removeEventListener('load', handleLoad);
//         modelViewer.removeEventListener('error', handleError);
//       }
//     };
//   }, [isOpen, item]);

//   if (!isOpen || !item) return null;

//   const glbUrl = item.arModel?.glb || "";
//   const usdzUrl = item.arModel?.usdz || "";
//   const hasAR = Boolean(glbUrl || usdzUrl);

//   const openAR = () => {
//     const arViewer = modelRef.current;
//     if (!arViewer || !modelLoaded) return;

//     try {
//       if (arViewer.canActivateAR) {
//         arViewer.activateAR();
//       } else {
//         alert("AR not supported on this device. Please use Chrome on Android or Safari on iOS.");
//       }
//     } catch (err) {
//       alert("AR not supported on this device. Please use Chrome on Android or Safari on iOS.");
//       console.error('AR activation error:', err);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="relative w-full max-w-md mx-auto p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] animate-scale-in"
//       >
//         {/* CLOSE */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition text-slate-700"
//           aria-label="Close"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* TITLE */}
//         <h2 className="text-2xl font-semibold text-slate-900 mb-0.5">
//           View in AR
//         </h2>
//         <p className="text-slate-500 text-sm mb-5">
//           {item.name}
//         </p>

//         {hasAR ? (
//           <>
//             {/* 3D VIEWER */}
//             <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm relative">
//               {isLoading && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-white z-10">
//                   <div className="relative">
//                     <div className="w-16 h-16 border-4 border-slate-200 border-t-green-500 rounded-full animate-spin"></div>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <span className="text-2xl">🍽️</span>
//                     </div>
//                   </div>
//                   <p className="mt-4 text-sm text-slate-600 font-medium">Loading 3D model...</p>
//                   {loadProgress > 0 && (
//                     <p className="mt-2 text-xs text-slate-500">{loadProgress}%</p>
//                   )}
//                 </div>
//               )}
              
//               <model-viewer
//                 ref={modelRef}
//                 src={glbUrl}
//                 ios-src={usdzUrl}
//                 alt={`3D model of ${item.name}`}
//                 auto-rotate
//                 auto-rotate-delay="800"
//                 rotation-per-second="20deg"
//                 ar
//                 ar-modes="webxr scene-viewer quick-look"
//                 ar-scale="auto"
//                 scale="0.3 0.3 0.3"
//                 ar-placement="floor"
//                 camera-controls
//                 touch-action="pan-y"
//                 interaction-prompt="none"
//                 camera-orbit="0deg 75deg 1.5m"
//                 field-of-view="45deg"
//                 min-camera-orbit="auto 0deg auto"
//                 max-camera-orbit="auto 180deg auto"
//                 min-field-of-view="25deg"
//                 max-field-of-view="65deg"
//                 environment-image="neutral"
//                 exposure="1"
//                 shadow-intensity="0.7"
//                 shadow-softness="1"
//                 poster=""
//                 loading="eager"
//                 reveal="auto"
//                 style={{
//                   width: "100%",
//                   height: "320px",
//                   background: "linear-gradient(180deg,#f8fafc,#ffffff)",
//                 }}
//               />
//             </div>

//             {/* HINT */}
//             <p className="mt-3 text-xs text-slate-400 text-center">
//               Drag to rotate • Pinch to zoom
//             </p>

//             {/* CTA */}
//             <div className="mt-6 flex justify-center">
//               <button
//                 onClick={openAR}
//                 disabled={isLoading || !modelLoaded}
//                 className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-green-600 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:bg-green-500 hover:scale-[1.04] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-green-600"
//               >
//                 <span className="text-lg transition group-hover:scale-110">📱</span>
//                 <span>{isLoading ? 'Loading...' : 'Place dish on your table'}</span>
//               </button>
//             </div>

//             <p className="mt-2 text-xs text-slate-400 text-center">
//               Best on a flat surface like a table
//             </p>
//           </>
//         ) : (
//           <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
//             <p className="text-slate-900 font-semibold text-lg">
//               AR not available
//             </p>
//             <p className="text-slate-500 text-sm mt-1">
//               Contact restaurant for details
//             </p>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes scale-in {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-scale-in {
//           animation: scale-in 0.25s ease-out;
//         }

//         model-viewer {
//           --progress-bar-color: #16a34a;
//           --progress-bar-height: 3px;
//         }

//         /* Optimize rendering on mobile */
//         model-viewer::part(default-progress-bar) {
//           height: 3px;
//           background-color: #e2e8f0;
//         }
        
//         model-viewer::part(default-progress-mask) {
//           background-color: #16a34a;
//         }
//       `}</style>
//     </div>
//   );
// }




// import { useState, useEffect, useRef } from 'react';

// export default function ARViewer({ item, isOpen, onClose }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadProgress, setLoadProgress] = useState(0);
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const modelRef = useRef(null);

//   useEffect(() => {
//     if (!isOpen || !item) return;

//     setIsLoading(true);
//     setModelLoaded(false);
//     setLoadProgress(0);

//     const modelViewer = modelRef.current;
//     if (!modelViewer) return;

//     const handleProgress = (event) => {
//       const progress = event.detail.totalProgress;
//       setLoadProgress(Math.round(progress * 100));
//     };

//     const handleLoad = () => {
//       setIsLoading(false);
//       setModelLoaded(true);
//       setLoadProgress(100);
//     };

//     const handleError = (error) => {
//       setIsLoading(false);
//       console.error('Model failed to load:', error);
//     };

//     modelViewer.addEventListener('progress', handleProgress);
//     modelViewer.addEventListener('load', handleLoad);
//     modelViewer.addEventListener('error', handleError);

//     return () => {
//       if (modelViewer) {
//         modelViewer.removeEventListener('progress', handleProgress);
//         modelViewer.removeEventListener('load', handleLoad);
//         modelViewer.removeEventListener('error', handleError);
//       }
//     };
//   }, [isOpen, item]);

//   if (!isOpen || !item) return null;

//   const glbUrl = item.arModel?.glb || "";
//   const usdzUrl = item.arModel?.usdz || "";
//   const hasAR = Boolean(glbUrl || usdzUrl);

//   const openAR = () => {
//     const arViewer = modelRef.current;
//     if (!arViewer || !modelLoaded) return;

//     try {
//       if (arViewer.canActivateAR) {
//         arViewer.activateAR();
//       } else {
//         alert("AR not supported on this device. Please use Chrome on Android or Safari on iOS.");
//       }
//     } catch (err) {
//       alert("AR not supported on this device. Please use Chrome on Android or Safari on iOS.");
//       console.error('AR activation error:', err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col">
//       {/* HEADER BAR */}
//       <div className="relative flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="p-2 rounded-full hover:bg-[#2a2a2a] active:scale-95 transition text-white"
//           aria-label="Close"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Title - Center */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
//           <p className="text-white text-sm font-medium">{item.name}</p>
//         </div>

//         {/* Menu Button (3 dots) */}
//         <button
//           className="p-2 rounded-full hover:bg-[#2a2a2a] active:scale-95 transition text-white"
//           aria-label="Menu"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//           </svg>
//         </button>
//       </div>

//       {hasAR ? (
//         <>
//           {/* 3D VIEWER - FULL SCREEN DARK STUDIO */}
//           <div className="relative flex-1 bg-[#1a1a1a]">
//             {/* Subtle gradient overlay for depth */}
//             <div className="absolute inset-0 bg-gradient-to-b from-[#252525] via-[#1a1a1a] to-[#1a1a1a]">
//               {/* Very subtle grid - almost invisible */}
//               <div className="absolute inset-0 opacity-[0.02]" style={{
//                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
//                 backgroundSize: '60px 60px'
//               }}></div>
//             </div>

//             {isLoading && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
//                 <div className="relative">
//                   <div className="w-16 h-16 border-4 border-[#2a2a2a] border-t-white rounded-full animate-spin"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-2xl">🍽️</span>
//                   </div>
//                 </div>
//                 <p className="mt-4 text-sm text-gray-400 font-medium">Loading 3D model...</p>
//                 {loadProgress > 0 && (
//                   <div className="mt-3 w-48">
//                     <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-white transition-all duration-300 rounded-full"
//                         style={{ width: `${loadProgress}%` }}
//                       ></div>
//                     </div>
//                     <p className="mt-2 text-xs text-gray-500 text-center">{loadProgress}%</p>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             <model-viewer
//               ref={modelRef}
//               src={glbUrl}
//               ios-src={usdzUrl}
//               alt={`3D model of ${item.name}`}
//               auto-rotate
//               auto-rotate-delay="500"
//               rotation-per-second="30deg"
//               ar
//               ar-modes="webxr scene-viewer quick-look"
//               ar-scale="auto"
//               scale="0.3 0.3 0.3"
//               ar-placement="floor"
//               camera-controls
//               touch-action="pan-y"
//               interaction-prompt="none"
//               camera-orbit="0deg 75deg 1.2m"
//               field-of-view="40deg"
//               min-camera-orbit="auto 20deg auto"
//               max-camera-orbit="auto 160deg auto"
//               min-field-of-view="25deg"
//               max-field-of-view="60deg"
//               environment-image="neutral"
//               exposure="1.2"
//               shadow-intensity="1"
//               shadow-softness="0.8"
//               poster=""
//               loading="eager"
//               reveal="auto"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 background: "transparent",
//               }}
//             />
//           </div>

//           {/* BOTTOM CTA BUTTON */}
//           <div className="relative px-4 py-6 bg-[#1a1a1a] border-t border-[#2a2a2a]">
//             <button
//               onClick={openAR}
//               disabled={isLoading || !modelLoaded}
//               className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#4a90e2] text-white font-medium text-base transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//               </svg>
//               <span>{isLoading ? 'Loading...' : 'View in your space'}</span>
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="flex-1 flex items-center justify-center px-6">
//           <div className="text-center">
//             <div className="text-6xl mb-4">📱</div>
//             <p className="text-white font-semibold text-lg mb-2">
//               AR Model Not Available
//             </p>
//             <p className="text-gray-400 text-sm">
//               This item doesn't have a 3D model yet
//             </p>
//           </div>
//         </div>
//       )}

//       <style>{`
//         model-viewer {
//           --progress-bar-color: transparent;
//           --progress-bar-height: 0;
//         }

//         /* Hide default progress bar */
//         model-viewer::part(default-progress-bar) {
//           display: none;
//         }

//         /* Optimize rendering */
//         model-viewer {
//           will-change: transform;
//           contain: layout style paint;
//         }

//         /* Smooth interactions */
//         model-viewer:focus {
//           outline: none;
//         }
//       `}</style>
//     </div>
//   );
// }








// import { useState, useEffect, useRef } from 'react';

// export default function ARViewer({ item, isOpen, onClose }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadProgress, setLoadProgress] = useState(0);
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const modelRef = useRef(null);

//   useEffect(() => {
//     if (!isOpen || !item) return;

//     setIsLoading(true);
//     setModelLoaded(false);
//     setLoadProgress(0);

//     const modelViewer = modelRef.current;
//     if (!modelViewer) return;

//     const handleProgress = (event) => {
//       const progress = event.detail.totalProgress;
//       setLoadProgress(Math.round(progress * 100));
//     };

//     const handleLoad = () => {
//       setIsLoading(false);
//       setModelLoaded(true);
//       setLoadProgress(100);
//     };

//     const handleError = (error) => {
//       setIsLoading(false);
//       console.error('Model failed to load:', error);
//     };

//     modelViewer.addEventListener('progress', handleProgress);
//     modelViewer.addEventListener('load', handleLoad);
//     modelViewer.addEventListener('error', handleError);

//     return () => {
//       if (modelViewer) {
//         modelViewer.removeEventListener('progress', handleProgress);
//         modelViewer.removeEventListener('load', handleLoad);
//         modelViewer.removeEventListener('error', handleError);
//       }
//     };
//   }, [isOpen, item]);

//   if (!isOpen || !item) return null;

//   const glbUrl = item.arModel?.glb || "";
//   const usdzUrl = item.arModel?.usdz || "";
//   const hasAR = Boolean(glbUrl || usdzUrl);

//   const openAR = () => {
//     const arViewer = modelRef.current;
//     if (!arViewer || !modelLoaded) return;

//     try {
//       if (arViewer.canActivateAR) {
//         arViewer.activateAR();
//       } else {
//         alert("AR not supported on this device. Please use Chrome on Android or Safari on iOS.");
//       }
//     } catch (err) {
//       alert("AR not supported on this device. Please use Chrome on Android or Safari on iOS.");
//       console.error('AR activation error:', err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col">
//       {/* HEADER BAR */}
//       <div className="relative flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="p-2 rounded-full hover:bg-[#2a2a2a] active:scale-95 transition text-white"
//           aria-label="Close"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Title - Center */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
//           <p className="text-white text-sm font-medium">{item.name}</p>
//         </div>

//         {/* Menu Button (3 dots) */}
//         <button
//           className="p-2 rounded-full hover:bg-[#2a2a2a] active:scale-95 transition text-white"
//           aria-label="Menu"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//           </svg>
//         </button>
//       </div>

//       {hasAR ? (
//         <>
//           {/* 3D VIEWER - FULL SCREEN DARK STUDIO */}
//           <div className="relative flex-1 bg-[#1a1a1a]">
//             {/* Subtle gradient overlay for depth */}
//             <div className="absolute inset-0 bg-gradient-to-b from-[#252525] via-[#1a1a1a] to-[#1a1a1a]">
//               {/* Very subtle grid - almost invisible */}
//               <div className="absolute inset-0 opacity-[0.02]" style={{
//                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
//                 backgroundSize: '60px 60px'
//               }}></div>
//             </div>

//             {isLoading && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
//                 <div className="relative">
//                   <div className="w-16 h-16 border-4 border-[#2a2a2a] border-t-white rounded-full animate-spin"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-2xl">🍽️</span>
//                   </div>
//                 </div>
//                 <p className="mt-4 text-sm text-gray-400 font-medium">Loading 3D model...</p>
//                 {loadProgress > 0 && (
//                   <div className="mt-3 w-48">
//                     <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
//                       <div 
//                         className="h-full bg-white transition-all duration-300 rounded-full"
//                         style={{ width: `${loadProgress}%` }}
//                       ></div>
//                     </div>
//                     <p className="mt-2 text-xs text-gray-500 text-center">{loadProgress}%</p>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             <model-viewer
//               ref={modelRef}
//               src={glbUrl}
//               ios-src={usdzUrl}
//               alt={`3D model of ${item.name}`}
//               auto-rotate
//               auto-rotate-delay="500"
//               rotation-per-second="30deg"
//               ar
//               ar-modes="webxr scene-viewer quick-look"
//               ar-scale="auto"
//               scale="0.3 0.3 0.3"
//               ar-placement="floor"
//               camera-controls
//               touch-action="pan-y"
//               interaction-prompt="none"
//               camera-orbit="0deg 75deg 1.2m"
//               field-of-view="40deg"
//               min-camera-orbit="auto 20deg auto"
//               max-camera-orbit="auto 160deg auto"
//               min-field-of-view="25deg"
//               max-field-of-view="60deg"
//               environment-image="neutral"
//               exposure="1.2"
//               shadow-intensity="1"
//               shadow-softness="0.8"
//               poster=""
//               loading="eager"
//               reveal="auto"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 background: "transparent",
//               }}
//             />
//           </div>

//           {/* BOTTOM CTA BUTTON */}
//           <div className="relative px-4 py-6 bg-[#1a1a1a] border-t border-[#2a2a2a]">
//             <button
//               onClick={openAR}
//               disabled={isLoading || !modelLoaded}
//               className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-emerald-600"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//               </svg>
//               <span>{isLoading ? 'Loading...' : 'View in your space'}</span>
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="flex-1 flex items-center justify-center px-6">
//           <div className="text-center">
//             <div className="text-6xl mb-4">📱</div>
//             <p className="text-white font-semibold text-lg mb-2">
//               AR Model Not Available
//             </p>
//             <p className="text-gray-400 text-sm">
//               This item doesn't have a 3D model yet
//             </p>
//           </div>
//         </div>
//       )}

//       <style>{`
//         model-viewer {
//           --progress-bar-color: transparent;
//           --progress-bar-height: 0;
//         }

//         /* Hide default progress bar */
//         model-viewer::part(default-progress-bar) {
//           display: none;
//         }

//         /* Optimize rendering */
//         model-viewer {
//           will-change: transform;
//           contain: layout style paint;
//         }

//         /* Smooth interactions */
//         model-viewer:focus {
//           outline: none;
//         }
//       `}</style>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from 'react';

export default function ARViewer({ item, isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !item) return;

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    setIsLoading(true);
    setModelLoaded(false);
    setLoadProgress(0);

    const modelViewer = modelRef.current;
    if (!modelViewer) return;

    const handleProgress = (event) => {
      const progress = event.detail.totalProgress;
      setLoadProgress(Math.round(progress * 100));
    };

    const handleLoad = () => {
      setIsLoading(false);
      setModelLoaded(true);
      setLoadProgress(100);
    };

    const handleError = (error) => {
      setIsLoading(false);
      console.error('Model failed to load:', error);
    };

    modelViewer.addEventListener('progress', handleProgress);
    modelViewer.addEventListener('load', handleLoad);
    modelViewer.addEventListener('error', handleError);

    return () => {
      // Re-enable background scrolling
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      
      if (modelViewer) {
        modelViewer.removeEventListener('progress', handleProgress);
        modelViewer.removeEventListener('load', handleLoad);
        modelViewer.removeEventListener('error', handleError);
      }
    };
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const glbUrl = item.arModel?.glb || "";
  const usdzUrl = item.arModel?.usdz || "";
  const hasAR = Boolean(glbUrl || usdzUrl);

  const openAR = () => {
    const arViewer = modelRef.current;
    if (!arViewer || !modelLoaded) return;

    try {
      if (arViewer.canActivateAR) {
        arViewer.activateAR();
      } else {
        alert("AR not supported on this device. Please use Chrome on Android or Safari on iOS.");
      }
    } catch (err) {
      alert("AR not supported on this device. Please use Chrome on Android or Safari on iOS.");
      console.error('AR activation error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex flex-col">
      {/* HEADER BAR */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-[#2a2a2a]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-[#2a2a2a] active:scale-95 transition text-white"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white text-sm font-medium">{item.name}</p>
        </div>

        {/* Menu Button (3 dots) */}
        {/* <button
          className="p-2 rounded-full hover:bg-[#2a2a2a] active:scale-95 transition text-white"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button> */}
      </div>

      {hasAR ? (
        <>
          {/* 3D VIEWER - FULL SCREEN DARK STUDIO */}
          <div className="relative flex-1 bg-[#1a1a1a]">
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#252525] via-[#1a1a1a] to-[#1a1a1a]">
              {/* Very subtle grid - almost invisible */}
              <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }}></div>
            </div>

            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#2a2a2a] border-t-white rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">🍽️</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400 font-medium">Loading 3D model...</p>
                {loadProgress > 0 && (
                  <div className="mt-3 w-48">
                    <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-300 rounded-full"
                        style={{ width: `${loadProgress}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 text-center">{loadProgress}%</p>
                  </div>
                )}
              </div>
            )}
            
            <model-viewer
              ref={modelRef}
              src={glbUrl}
              ios-src={usdzUrl}
              alt={`3D model of ${item.name}`}
              auto-rotate
              auto-rotate-delay="300"
              rotation-per-second="20deg"
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="auto"
              scale="0.3 0.3 0.3"
              ar-placement="floor"
              camera-controls
              touch-action="none"
              // disable-zoom
              interaction-prompt="none"
              camera-orbit="0deg 75deg 1.2m"
              field-of-view="40deg"
              min-camera-orbit="auto 20deg auto"
              max-camera-orbit="auto 160deg auto"
              min-field-of-view="25deg"
              max-field-of-view="60deg"
              environment-image="neutral"
              exposure="1.2"
              shadow-intensity="1"
              shadow-softness="0.8"
              interpolation-decay="100"
              poster=""
              loading="eager"
              reveal="auto"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            />
          </div>

          {/* BOTTOM CTA BUTTON */}
          <div className="relative px-4 py-6 bg-[#1a1a1a] border-t border-[#2a2a2a]">
            <button
              onClick={openAR}
              disabled={isLoading || !modelLoaded}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-emerald-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{isLoading ? 'Loading...' : 'View in your space'}</span>
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="text-6xl mb-4">📱</div>
            <p className="text-white font-semibold text-lg mb-2">
              AR Model Not Available
            </p>
            <p className="text-gray-400 text-sm">
              This item doesn't have a 3D model yet
            </p>
          </div>
        </div>
      )}

      <style>{`
        model-viewer {
          --progress-bar-color: transparent;
          --progress-bar-height: 0;
        }

        /* Hide default progress bar */
        model-viewer::part(default-progress-bar) {
          display: none;
        }

        /* Optimize rendering */
        model-viewer {
          will-change: transform;
          contain: layout style paint;
        }

        /* Smooth interactions */
        model-viewer:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}