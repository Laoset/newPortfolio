import React, { useEffect, useState } from "react";
import { BiBot } from "react-icons/bi";
import { IconContext } from "react-icons";
import { CohereClient } from "cohere-ai";

type Message = {
  id: string;
  type: "user" | "bot";
  text: React.ReactNode;
};

const EXAMPLES = [
  { text: "Como te llamas?", label: "intro" },
  { text: "What is your name?", label: "intro" },
  { text: "De que pais eres?", label: "personal" },
  { text: "Where are you from?", label: "personal" },
  { text: "Que es lo que haces?", label: "personal" },
  { text: "What do yo do?", label: "personal" },
  { text: "Como te puedo contactar?", label: "contact" },
  { text: "Donde te puedo ubicar?", label: "contact" },
  { text: "Que redes sociales tienes?", label: "contact" },
  { text: "Redes?", label: "contact" },
  { text: "Redes sociales?", label: "contact" },
  { text: "Donde te encuentro?", label: "contact" },
  { text: "Where can i find you?", label: "contact" },
  { text: "What social networks do you have?", label: "contact" },
  { text: "What is your email?", label: "contact" },
  { text: "Cual es tu email?", label: "contact" },
  { text: "Tienes experiencia laboral?", label: "experience" },
  { text: "En que empresas trabajaste?", label: "experience" },
  { text: "You have work experience?", label: "experience" },
  { text: "Where you work?", label: "experience" },
  { text: "Estas abierto a propuestas laborales?", label: "experience" },
  { text: "Trabajas actualmente?", label: "experience" },
  { text: "Are you open to job offers?", label: "experience" },
  { text: "Que lenguajes de programacion conoces?", label: "skills" },
  { text: "What programming lenguague do you know?\n", label: "skills" },
  { text: "Cual es tu stack?", label: "skills" },
  { text: "What is your stack?", label: "skills" },
  { text: "Habilidades", label: "skills" },
  { text: "Skills", label: "skills" },

  {
    text: "Con que herramientas de trabajo tienes experiencia?",
    label: "skills",
  },
  { text: "What tools do you have experiencie with?", label: "skills" },
  { text: "Sabes otros idiomas?", label: "personal" },
  { text: "Sabes ingles?", label: "personal" },
  {
    text: "Do you know other lenguajes? Like English or French?",
    label: "personal",
  },
  { text: "Hola", label: "intro" },
  { text: "Hi", label: "intro" },
  { text: "Hello", label: "intro" },
  { text: "Quien eres?", label: "intro" },
  { text: "Quien eres", label: "intro" },
  { text: "Eres ?", label: "intro" },
  { text: "Eres", label: "intro" },
  { text: "Who are you?", label: "intro" },
  { text: "Who are you", label: "intro" },
  { text: "What are you", label: "intro" },
];
const API_KEY = "ImQGf4ec238hvore7hGMsBjXSeuTU0U3OXlkPL2Q";
const ChatBot = ({ isEnglish }: { isEnglish: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const container = React.useRef<HTMLDivElement>(null);
  const ANSWERS = {
    default: isEnglish ? (
      <p>I'm actually not Kevin, I'm an AI. Please rephrase your question.</p>
    ) : (
      <p>
        En realidad no soy Kevin, soy una IA. Por favor reformula tu pregunta.
      </p>
    ),
    intro: isEnglish ? (
      <p>Hi, how are you? I'm Kevin Corman, FrontEnd developer.</p>
    ) : (
      <p>Hola, como estas ? Soy Kevin Corman, desarrollador FrontEnd.</p>
    ),
    personal: (
      <p>
        {isEnglish
          ? "I was born in Lima, Peru, currently living in Buenos Aires, Argentina. I work full-time as a FrontEnd developer."
          : "Nací en Lima, Perú, actualmente vivo en Buenos Aires, Argentina. Trabajo a tiempo completo como desarrollador FrontEnd."}
      </p>
    ),
    contact: (
      <p>
        {isEnglish ? "You can contact me through " : "Me puedes contactar por "}
        <a
          className="underline"
          href="https://www.linkedin.com/in/kevin-corman-samanamud/"
          rel="noreferrer noopener"
          target="_blank"
        >
          LinkedIn
        </a>
        {isEnglish ? " and also via " : " y también por "}
        <a
          className="underline"
          rel="noreferrer noopener"
          target="_blank"
          href="mailto:kevin143corman@gmail.com"
          aria-label="Email"
        >
          Email
        </a>
        .{" "}
        {isEnglish
          ? "I have several projects on my "
          : "Tengo varios proyectos en mi "}
        <a
          className="underline"
          href="https://github.com/Laoset"
          rel="noreferrer noopener"
          target="_blank"
        >
          GitHub
        </a>
        {isEnglish
          ? " for you to take a look at."
          : " para que le eches un vistazo."}
      </p>
    ),
    skills: (
      <p>
        {isEnglish
          ? "My work technology stack includes React, MaterialUI, and React Admin. Personally, I often use TypeScript along with TailwindCSS instead. I also use tools like Jira, Figma, and Git. Currently, I'm studying NextJs."
          : "Mi stack tecnológico laboral comprende React, MaterialUI y React Admin. Por mi cuenta suelo utilizar TypeScript junto a TailwindCSS en reemplazo. Además hago uso de herramientas como Jira, Figma y Git. Actualmente me encuentro estudiando NextJs."}
      </p>
    ),
    experience: (
      <p>
        {isEnglish
          ? "I have 1 year of work experience in web development, I have worked in international as well as Argentine companies, and I currently hold the position of FrontEnd Developer."
          : "Tengo 1 año de experiencia laboral en el área de desarrollo web, trabajé en empresas internacionales como también argentinas, actualmente tengo el cargo de Desarrollador FrontEnd."}
      </p>
    ),
  };
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setMessage((messages) =>
      messages.concat({
        id: String(Date.now()),
        type: "user",
        text: question,
      })
    );
    setQuestion("");
    const { classifications } = await fetch(
      "https://api.cohere.ai/v1/classify",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "embed-multilingual-v3.0",
          inputs: [question],
          examples: EXAMPLES,
        }),
      }
    ).then((res) => res.json());
    setMessage((messages) =>
      messages.concat({
        id: String(Date.now()),
        type: "bot",
        text:
          classifications[0]?.confidence > 0.35
            ? ANSWERS[classifications[0]?.prediction as keyof typeof ANSWERS] ||
              ANSWERS["default"]
            : ANSWERS["default"],
      })
    );
    setLoading(false);
  }

  useEffect(() => {
    container.current?.scrollTo(0, container.current?.scrollHeight);
  }, [message]);
  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      {isOpen && (
        <div
          ref={container}
          className="flex flex-col justify-between z-50 w-64 h-[300px] mt-12 top-0 right-0 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 overflow-y-auto"
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg flex justify-between items-center sticky top-0">
            <h3 className="font-semibold text-gray-900">Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {message.map((messag) => (
            <div
              key={messag?.id}
              className={`p-4 max-w-[80%] rounded-3xl text-white ${
                messag?.type === "bot"
                  ? "bg-slate-500 text-left self-start rounded-bl-none"
                  : "bg-blue-500 text-right self-end rounded-br-none"
              }`}
            >
              {messag?.text}
            </div>
          ))}
          <form className="px-3 pb-2 align-bottom mt-1" onSubmit={handleSubmit}>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              name="question"
              placeholder={
                isEnglish ? "Type your message..." : "Escribe tu mensaje..."
              }
              className="border border-gray-200 rounded-s-md px-3 py-2"
            />
            <button
              disabled={loading}
              className={`px-4 py-2 bg-[#272325] rounded-lg rounded-l-none ${
                loading ? "bg-blue-300" : "#272325"
              }`}
              type="submit"
            >
              {isEnglish ? "Send" : "Enviar"}
            </button>
          </form>
        </div>
      )}
      <div className="relative flex justify-end">
        <button id="open-chat" onClick={() => setIsOpen(!isOpen)}>
          <IconContext.Provider
            value={{
              className: `${
                isOpen ? "text-[#BB2649]" : "text-white"
              } hover:text-[#BB2649]`,
            }}
          >
            <BiBot size={40} />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
