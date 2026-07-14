import { useState } from "react";

// 1) هات لينك الفورم من "Get pre-filled link" في Google Forms،
//    ابعت أي قيمة تجريبية، وشوف اللينك الناتج هيبقى فيه entry.XXXXXXX لكل حقل.
// 2) الـ action URL بتاع الفورم = نفس لينك الفورم بس تستبدل /viewform بـ /formResponse
const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd7CJHqtJp6hmV3steHyxh2rTvn-64S9v1I8TLXzJCeoV9L1g/formResponse";
const NAME_ENTRY_ID = "entry.2102763190";
const MESSAGE_ENTRY_ID = "entry.589083338";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent

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

  if (status === "sent") {
    return <p className="text-green-500">تم الإرسال، شكرًا!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
      <input
        type="text"
        placeholder="الاسم"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border rounded px-3 py-2 bg-transparent"
      />
      <textarea
        placeholder="الرسالة"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className="border rounded px-3 py-2 bg-transparent resize-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {status === "sending" ? "جاري الإرسال..." : "إرسال"}
      </button>
    </form>
  );
}
