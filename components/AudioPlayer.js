import { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaForward, 
  FaBackward,
  FaVolumeUp
} from 'react-icons/fa';

export default function AudioPlayer({ currentTrack, onNext, onPrev }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioPlayer = useRef();
  const progressBar = useRef();
  
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  const onProgressChange = (e) => {
    audioPlayer.current.currentTime = e.target.value;
  };

  return (
    <div className="bg-player-dark p-6 rounded-lg w-full max-w-2xl">
      <audio
        ref={audioPlayer}
        src={currentTrack.url}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
      />
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-white">
          <h3 className="font-bold">{currentTrack.title}</h3>
          <p className="text-gray-400">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">
            {calculateTime(currentTime)}
          </span>
          <input
            type="range"
            ref={progressBar}
            defaultValue="0"
            onChange={onProgressChange}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-white text-sm">
            {calculateTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-center space-x-6">
          <button
            className="text-white hover:text-gray-300"
            onClick={onPrev}
          >
            <FaBackward size={24} />
          </button>
          
          <button
            className="bg-white rounded-full p-3 hover:bg-gray-200"
            onClick={togglePlayPause}
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          
          <button
            className="text-white hover:text-gray-300"
            onClick={onNext}
          >
            <FaForward size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}