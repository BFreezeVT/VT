import { useState, useEffect } from "react";
import { X, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

export default function EbookPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem("ebook_dismissed")) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPct >= 0.25 && !dismissed) {
        setShow(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const close = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("ebook_dismissed", "true");
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" data-testid="ebook-popup">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />

      {/* Modal */}
      <div className="relative bg-[#0b1626] border border-[#0077B3]/30 rounded-lg p-8 sm:p-10 max-w-md w-full shadow-2xl shadow-[#0077B3]/10 animate-fade-in-up">
        <button onClick={close} className="absolute top-4 right-4 text-[#94a8be] hover:text-white transition-colors" data-testid="ebook-popup-close">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 rounded-full mb-5">
            <BookOpen className="w-7 h-7 text-[#0077B3]" />
          </div>
          <h3 className="text-white font-bold text-xl sm:text-2xl mb-3" style={{ fontFamily: "Outfit" }}>
            Download Our Free E-Book!
          </h3>
          <p className="text-[#94a8be] text-sm mb-6 leading-relaxed">
            <span className="text-white font-semibold">Mastering AI for Business Success</span> - an Amazon bestselling guide by Veracity Technologies leadership on implementing AI strategies that drive real business outcomes.
          </p>
          <a href="https://www.veracitytech.com/mastering-ai" target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-md font-semibold h-12 text-base mb-3">
              Get Your Free Copy <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <button onClick={close} className="text-[#94a8be] text-xs hover:text-white transition-colors">
            No thanks, maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
