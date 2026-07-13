import { useState, useRef, useEffect } from "react";

function MusicPlayer({ src }) {
  const [isMuted, setIsMuted] = useState(true); // يبدأ muted عشان autoplay يشتغل
  const audioRef = useRef(null);

  useEffect(() => {
    // يحاول يشغّل الأغنية أول ما الصفحة تفتح (muted)
    audioRef.current.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioRef.current.muted = next;
    // أول تفاعل من اليوزر بيسمح بتشغيل الصوت فعليًا
    if (!next) audioRef.current.play().catch(() => {});
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop autoPlay muted={isMuted} />
      <button
        onClick={toggleMute}
        className="fixed bottom-5 left-5 w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg"
        style={{ background: "#9b1b46" }}
        title={isMuted ? "شغّل الصوت" : "كتم الصوت"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
