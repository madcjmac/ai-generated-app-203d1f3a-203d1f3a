export default function Playlist({ tracks, currentTrack, onTrackSelect }) {
  return (
    <div className="bg-player-light p-4 rounded-lg mt-4 w-full max-w-2xl">
      <h2 className="text-white font-bold mb-4">Playlist</h2>
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`p-3 rounded cursor-pointer ${
              currentTrack.id === track.id
                ? 'bg-player-dark text-white'
                : 'text-gray-300 hover:bg-player-dark'
            }`}
            onClick={() => onTrackSelect(track)}
          >
            <div className="flex items-center">
              <span className="mr-4">{index + 1}</span>
              <div>
                <p className="font-medium">{track.title}</p>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}