"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom components
import { FlipText } from "@/components/magicui/flip-text";
import { Particles } from "@/components/magicui/particles";
import { MorphingText } from "@/components/magicui/morphing-text";
import { MagicCard } from "@/components/magicui/magic-card";
import { Meteors } from "@/components/magicui/meteors";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import quotesData from "@/data/quotes.json";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Please enter a topic to find quotes.");
      return;
    }

    setError("");
    setIsLoading(true);

    const normalizedTopic = topic.toLowerCase().trim();
    const availableQuotes =
      quotesData[normalizedTopic as keyof typeof quotesData] || [];

    if (availableQuotes.length === 0) {
      setSelectedQuotes([
        'No quotes found for this topic. Try "motivation", "life", or "love".',
      ]);
      setIsLoading(false);
      return;
    }

    const shuffled = availableQuotes.sort(() => 0.5 - Math.random());
    setSelectedQuotes(shuffled.slice(0, 3));
    setTopic("");
    setIsLoading(false);
  };

  const handleReset = () => {
    setTopic("");
    setSelectedQuotes([]);
    setError("");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-black">
      {/* ✅ Fullscreen particles background */}
      <Particles className="absolute inset-0 z-0" color="#ffffff" size={2} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        <MagicCard
          className="w-full rounded-xl shadow-2xl overflow-hidden"
          gradientFrom="#FFFFFF" // White fade background if you want!
          gradientTo="#FFFFFF"
          gradientColor="#FFFFFF"
          gradientSize={300}
          gradientOpacity={0.7}
        >
          <Meteors number={30} />

          <div
            className="w-full space-y-8 bg-white bg-opacity-90 p-12 rounded-lg"
            style={{
              backgroundImage:
                "url('https://mcdn.wallpapersafari.com/medium/47/66/YWbNFU.jpg')",
            }}
          >
            <MorphingText
              className="text-lg font-extrabold text-center text-black tracking-tight font-serif"
              texts={[
                "Quote Generator",
                "Inspiring Words",
                "Find Your Quote",
                "Wisdom Awaits",
              ]}
            />

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              aria-label="Quote topic form"
            >
              <div className="flex-1 text-black">
  <Input
    type="text"
    placeholder="Enter a topic"
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    className="w-full rounded-lg border border-black text-black placeholder-black transition focus:ring-2 focus:ring-black"
    disabled={isLoading}
    aria-label="Topic input"
  />
  {error && (
    <p className="mt-2 text-sm text-black" role="alert">
      {error}
    </p>
  )}
</div>

              <div className="flex gap-3">
                <ShinyButton
                  type="submit"
                  disabled={isLoading}
                  aria-label="Get quotes button"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader className="h-6 w-6 mr-2 text-white animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    "Get Quotes"
                  )}
                </ShinyButton>

                <ShinyButton
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  aria-label="Reset form button"
                >
                  Reset
                </ShinyButton>
              </div>
            </form>

            {/* ✅ Quick Topics Tray */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["motivation", "life", "love", "success", "happiness", "wisdom"].map(
                (option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setTopic(option);
                      setTimeout(
                        () =>
                          handleSubmit({
                            preventDefault: () => {},
                          } as React.FormEvent),
                        0
                      );
                    }}
                    className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                )
              )}
            </div>

            <AnimatePresence>
              <div className="grid gap-6 justify-start">
                {selectedQuotes.length > 0 ? (
                  selectedQuotes.map((quote, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <MagicCard
                        className="relative shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        gradientFrom="#FFFFFF"
                        gradientTo="#FFFFFF"
                        gradientColor="#FFFFFF"
                        gradientSize={200}
                        gradientOpacity={0.8}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 z-0"
                        >
                          <Particles color="#ffffff" size={2} />
                        </motion.div>

                        <div className="relative z-10 p-6 bg-gray-800 bg-opacity-90 rounded-lg text-left">
                          <FlipText
                            className="text-left text-xl font-semibold text-white"
                            words={[`Quote ${index + 1}`]}
                          />
                          <p
                            className={
                              quote.includes("No quotes found")
                                ? "text-red-300 italic text-base mt-2"
                                : "text-white italic text-base mt-2"
                            }
                          >
                            {quote}
                          </p>
                        </div>
                      </MagicCard>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-black text-lg font-medium">
                    Enter a topic to discover inspiring quotes.
                  </p>
                )}
              </div>
            </AnimatePresence>
          </div>
        </MagicCard>
      </div>
    </main>
  );
}
