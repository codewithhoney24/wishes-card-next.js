"use client"
import React, { useState, useEffect } from 'react';
import { Button } from './components/GraduationCard';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';


// Dynamic import of fireworks effect component
const Fireworks = dynamic(() => import('react-confetti'), { ssr: false });

const totalCaps = 5;

export default function GraduationPage() {
  const [capsThrown, setCapsThrown] = useState<number>(0);
  const [fireworksShow, setFireworksShow] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (capsThrown === totalCaps) {
      setFireworksShow(true);
      // Stop confetti after a few seconds
      const timer = setTimeout(() => {
        setFireworksShow(false);
      }, 5000); // Adjust the duration as needed
      return () => clearTimeout(timer);
    }
  }, [capsThrown]);

  const throwCap = (index: number) => {
    if (index === capsThrown) {
      setCapsThrown(prev => prev + 1);
    }
  };

  const celebrateGraduation = () => {
    setFireworksShow(true);
    const interval = setInterval(() => {
      setCapsThrown(prev => {
        if (prev < totalCaps) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 600);
  };

  return (
    <div className= " min-h-screen  flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="  p-6 text-center bg-fuchsia-200  border-double border-8 border-fuchsia-950 rounded-xl  shadow-md">
          <h1 className=" mt-5 text-4xl font-bold text-fuchsia-900">Congratulations!</h1>
          <h1 className=" mt-5 text-4xl font-bold text-fuchsia-900">Atif Khan</h1>
          <p className=" mt-5 text-xl font-bold text-fuchsia-800">Graduate of 2024</p>
          <p className=" mt-5 text-lg text-fuchsia-700">It is time for the celebration to begin for the Class of 2024, honoring their achievements and bright futures ahead.!</p>
          <div className="mt-5 space-y-6">
            <h3 className="text-lg font-extrabold text-fuchsia-900">Toss the Grad Caps!</h3>
            <div className="flex justify-center space-x-2 ">
              {[...Array(totalCaps)].map((_, index) => (
                <AnimatePresence key={index}>
                  {index < capsThrown ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.3 }}
                    >
                      <FaGraduationCap
                        className="w-10 h-10 cursor-pointer"
                        onClick={() => throwCap(index)}
                      />
                    </motion.div>
                  ) : (
                    <FaGraduationCap
                      className="w-10 h-10 text-fuchsia-800 cursor-pointer hover:scale-110 hover:text-fuchsia-400"
                      onClick={() => throwCap(index)}
                    />
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
          <div className="mt-6 font-bold text-2xl">
            <Button onClick={celebrateGraduation}>Celebrate! 🎁🎉</Button>
          </div>
        </div>
      </motion.div>
      {fireworksShow && (
        <Fireworks
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={500}
          recycle={false} // Ensures pieces do not recycle
        />
      )}
    </div>
  );
}
