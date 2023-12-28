import React, { useState, useEffect, useCallback } from 'react';
import DonhiA from '../component/DonhiA.mp3';
import Donhi from '../component/Donhi.gif';
import Confetti from 'react-confetti';

function Thala() {
  const [input, setInput] = useState('');
  const [showGif, setShowGif] = useState(false);
  const [showAltGif, setShowAltGif] = useState(false);
  const [audio] = useState(new Audio(DonhiA));
  const [isPlaying, setIsPlaying] = useState(false);
  const [transformedInput, setTransformedInput] = useState('');

  const confettiConfig = {
    angle: 180,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 5000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '800px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handlePlay = useCallback(() => {
    if (input.length === 7 || input === '7') {
      setShowGif(true);
      audio.play();
      setIsPlaying(true);

      if (!isNaN(input)) {
        setTransformedInput(input.split('').map(Number).join(' + ') + ' = 7');
      } else {
        setTransformedInput(input.split('').join(' + ') + ' = 7');
      }
    } else {
      setShowAltGif(true);
    }
  }, [input, audio]);

  const handleStop = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setShowGif(false);
    setShowAltGif(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '7') {
        handlePlay();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handlePlay]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
     <iframe src="https://giphy.com/embed/SsDiGCnZRtCCazWec0" width="100" height="100" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/thala-ms-dhoni-for-a-reason-SsDiGCnZRtCCazWec0">via GIPHY</a></p>
        
      <h1 className="text-3xl mb-4">Thala for a reason</h1>
      {showGif && <h2 className="text-lg">{transformedInput}</h2>}
      {showAltGif && <h2 className="text-lg">{transformedInput}</h2>}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="CHECK IF IT IS THALA OR NOT"
        className="border border-gray-400 rounded-md py-2 px-4 mb-4 text-black" 
      />

      <div className="mb-8">
        <Confetti active={showGif} config={confettiConfig} />
        {!showAltGif && !showGif && (
          <button
            onClick={handlePlay}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Check
          </button>
        )}
        {isPlaying && (
          <button
            onClick={handleStop}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Another
          </button>
        )}
        {showAltGif && (
          <button
            onClick={handleStop}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Another
          </button>
        )}
      </div>
      {showGif && <img src={Donhi} alt="Thala gif" className="mb-4" />}
      <div className="absolute bottom-0 right-0 p-4 text-white">
  <a href="https://twitter.com/JatinFoujdar" target="_blank" rel="noopener noreferrer" className="mr-4">
    Twitter
  </a>
  <a href="https://github.com/jatinfoujdar" target="_blank" rel="noopener noreferrer" className="mr-4">
    Github
  </a>
  <a href="https://www.linkedin.com/in/jatinfoujdar10/" target="_blank" rel="noopener noreferrer">
    Linkedin
  </a>
</div>

    </main>
  );
}

export default Thala;
