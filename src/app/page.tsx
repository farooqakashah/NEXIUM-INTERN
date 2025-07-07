"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import quotesData from '@/data/quotes.json';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic to find quotes.');
      return;
    }
    setError('');
    setIsLoading(true);
    const normalizedTopic = topic.toLowerCase().trim();
    const availableQuotes = quotesData[normalizedTopic as keyof typeof quotesData] || [];

    if (availableQuotes.length === 0) {
      setSelectedQuotes(['No quotes found for this topic. Try "motivation", "life", or "love".']);
      setIsLoading(false);
      return;
    }

    // Randomly select up to 3 quotes
    const shuffled = availableQuotes.sort(() => 0.5 - Math.random());
    setSelectedQuotes(shuffled.slice(0, 3));
    setTopic(''); // Clear input after submission
    setIsLoading(false);
  };

  const handleReset = () => {
    setTopic('');
    setSelectedQuotes([]);
    setError('');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://img.pikbest.com/wp/202408/4k-resolution-realistic-3d-rendering-of-gray-brick-stone-wallpaper-background-in-high_9783959.jpg!w700wp')",
      }}
    >
      <div
        className="max-w-4xl w-full bg-cover bg-center rounded-xl shadow-2xl"
      >
        <div className="w-full space-y-10 bg-white bg-opacity-95 p-10 rounded-lg"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/11299515/pexels-photo-11299515.jpeg?_gl=1*1ks2ojq*_ga*NjI1Mzc1OTAxLjE3NTE5MDQ3Nzc.*_ga_8JE65Q40S6*czE3NTE5MDQ3NzckbzEkZzEkdDE3NTE5MDU1OTAkajEyJGwwJGgw')",
          
        }}>
          <h1 className="text-5xl font-extrabold text-center text-black tracking-tight font-serif">
            Quote Generator
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            aria-label="Quote topic form"
          >
           <div className="flex-1">
  <Input
  type="text"
  placeholder="Enter a topic (e.g., motivation, life, love)"
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
  <Button
    type="submit"
    className="bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md transition duration-300"
    disabled={isLoading}
    aria-label="Get quotes button"
  >
    {isLoading ? (
      <span className="flex items-center">
        <Loader className="h-6 w-6 mr-2 text-white" />
        Loading...
      </span>
    ) : (
      'Get Quotes'
    )}
  </Button>
  <Button
    type="button"
    onClick={handleReset}
    className="bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md transition duration-300"
    disabled={isLoading}
    aria-label="Reset form button"
  >
    Reset
  </Button>
</div>
            
          </form>
          <AnimatePresence>
            <div className="grid gap-6">
              {selectedQuotes.length > 0 ? (
                selectedQuotes.map((quote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                  <Card
  className="relative bg-black shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
>
  <div className="relative z-10">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-white">
        Quote {index + 1}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p
        className={
          quote.includes('No quotes found')
            ? 'text-red-600 italic text-base'
            : 'text-white italic text-base'
        }
      >
        {quote}
      </p>
    </CardContent>
  </div>
</Card>

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
      </div>
    </div>
  );
}