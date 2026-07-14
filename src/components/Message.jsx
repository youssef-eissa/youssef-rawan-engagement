import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState } from "react";
import Skew from "./Skew";
import { GiDoorRingHandle } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";



const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd7CJHqtJp6hmV3steHyxh2rTvn-64S9v1I8TLXzJCeoV9L1g/formResponse";
const NAME_ENTRY_ID = "entry.2102763190";
const MESSAGE_ENTRY_ID = "entry.589083338";

function Message() {
  const ref = useRef(null);
 const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const isInView = useInView(ref);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus("sending");

    const formData = new FormData();
    formData.append(NAME_ENTRY_ID, name);
    formData.append(MESSAGE_ENTRY_ID, message);

    try {
      // mode: no-cors ضروري هنا لأن Google Forms مش بترجع CORS headers،
      // فمش هنقدر نقرأ الـ response، بس الإرسال بيتم فعليًا.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setStatus("sent");
      setName("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

 
  return (
    <section
      ref={ref}
      className="relative font-playwrite text-yellow-300 w-[90%]  z- mx-auto  flex items-center justify-center"
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex relative z-50 bg-black rounded-2xl p-3 flex-col items-center justify-center gap-4 text-xl flex-1 h-full! py-10"
          >
            Leave A Message
            <AnimatePresence>
              {status === "sent" ? (
                <motion.span
                  exit={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text- font-black-ops"
                >
                  Your Message has been sent
                </motion.span>
              ) : (
                <motion.form
                  transition={{ duration: 0.3 }}
                  exit={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 "
                >
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border text-black font-black-ops outline-none px-3 py-2 bg-yellow-300 rounded-2xl "
                  />
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="border text-black font-black-ops outline-none px-3 py-2 bg-yellow-300 rounded-2xl resize-none"
                  />
                  <button className="text- mt-2 border border-yellow-300 rounded-2xl h-14 flex items-center justify-center">
                    Send
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            <GiDoorRingHandle size={32} className="absolute top-5 right-5" />
            <GiDoorRingHandle size={32} className="absolute bottom-5 left-5" />
          </motion.div>
        )}
      </AnimatePresence>
      <Skew isInView={isInView} />
    </section>
  );
}

export default Message;
