import { useEffect } from "react";

export default function ConsultantPage() {

  useEffect(() => {
    // Boot effect
    const bootText = document.getElementById("boot-text");
    const lines = [
      "INITIALIZING DARKROOT OS PRO_V2...",
      "SECURING CLOUD CHANNELS... [OK]",
      "SYSTEM READY."
    ];

    let i = 0;
    function type() {
      if (i < lines.length) {
        bootText.innerHTML += lines[i] + "<br/>";
        i++;
        setTimeout(type, 300);
      } else {
        setTimeout(() => {
          document.getElementById("boot-screen").style.display = "none";
          document.getElementById("os-interface").classList.remove("hidden");
        }, 500);
      }
    }

    setTimeout(type, 300);
  }, []);

  return (
    <div className="bg-black text-green-400 min-h-screen font-mono">

      {/* Boot */}
      <div id="boot-screen" className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div id="boot-text"></div>
      </div>

      {/* Main */}
      <div id="os-interface" className="hidden p-6">
        
        <h1 className="text-4xl mb-4 text-cyan-400">
          DARKROOT_STUDIO
        </h1>

        <p className="mb-6 text-sm">
          High-End Infrastructure & Creative Engineering
        </p>

        <button
          onClick={() => alert("Contacto")}
          className="border border-cyan-400 px-4 py-2 hover:bg-cyan-400 hover:text-black transition"
        >
          OPEN_TERMINAL_CONTACT
        </button>

      </div>
    </div>
  );
}