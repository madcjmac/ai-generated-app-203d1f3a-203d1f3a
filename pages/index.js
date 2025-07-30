import { useState } from 'react';
import Head from 'next/head';
import AudioPlayer from '../components/AudioPlayer';
import Playlist from '../components/Playlist';

const defaultTracks = [
  {
    id: 1,
    title: "Sample Track 1",
    artist: "Artist 1",
    url: "/sample1.mp3"
  },
  {
    id: 2,
    title: "Sample Track 2",
    artist: "Artist 2",
    url: "/sample2.mp3"
  },
  // Add more tracks as needed
];

export default function Home() {
  const [tracks] = useState(defaultTracks);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  const handleNext = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextTrack = tracks[(currentIndex + 1) % tracks.length];
    setCurrentTrack(nextTrack);
  };

  const handlePrev = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    setCurrentTrack(prevTrack);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>Next.js MP3 Player</title>
        <meta name="description" content="A modern MP3 player built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-8">
            Next.js MP3 Player Adnan
          </h1>
          
          <AudioPlayer
            currentTrack={currentTrack}
            onNext={handleNext}
            onPrev={handlePrev}
          />
          
          <Playlist
            tracks={tracks}
            currentTrack={currentTrack}
            onTrackSelect={setCurrentTrack}
          />
        </div>
      </main>
    </div>
  );
}