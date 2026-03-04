import React, { useState, useRef } from "react";

function ProposalSite() {
  // CHANGE these URLs to your actual URLs
  const defaultPreRecordedUrl =
    "https://www.w3schools.com/html/mov_bbb.mp4"; // <--- Replace with your actual pre-recorded video MP4 URL!

  const [preRecordedUrl, setPreRecordedUrl] = useState(defaultPreRecordedUrl);
  const [liveStreamUrl, setLiveStreamUrl] = useState(""); // to be set by user
  const [playingLive, setPlayingLive] = useState(false);

  const [videoReady, setVideoReady] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const preRecordedRef = useRef(null);

  // Responsive proportions for video container
  const aspectClass = "aspect-video bg-black rounded shadow-lg overflow-hidden";

  // Handle missed live URL
  function handleToLive() {
    if (!liveStreamUrl || !/^https?:\/\//i.test(liveStreamUrl)) {
      setErrorMsg("Please enter a valid live stream URL (starting with http:// or https://).");
      return;
    }
    setErrorMsg("");
    setPlayingLive(true);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-200 to-indigo-200 flex flex-col items-center justify-center py-8 px-2">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 flex flex-col items-center">
        <h1 className="font-bold text-2xl md:text-3xl text-rose-600 mb-4 text-center drop-shadow">
          💍 Will You Marry Me?
        </h1>

        {/* Video Stage */}
        <div className={`w-full ${aspectClass} mb-4`}>
          {!playingLive ? (
            <video
              ref={preRecordedRef}
              className="w-full h-full object-contain"
              src={preRecordedUrl}
              controls
              autoPlay
              playsInline
              onEnded={handleToLive}
              onError={() => setErrorMsg("Could not load pre-recorded video.")}
              onCanPlay={() => setVideoReady(true)}
              poster="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=600&q=80"
            >
              Sorry, your browser doesn't support embedded videos.
            </video>
          ) : (
            <video
              className="w-full h-full object-contain"
              src={liveStreamUrl}
              autoPlay
              controls
              playsInline
              onError={() =>
                setErrorMsg(
                  "Unable to load live stream. Make sure your phone app is running, and both devices are on the same Wi-Fi network."
                )
              }
            >
              Sorry, your browser doesn't support live video playback.
            </video>
          )}
        </div>

        {/* Step below video: Live stream setup */}
        {!playingLive && (
          <>
            <label className="block mb-2 text-gray-700 text-center">
              <b>1️⃣ Set Up Live Stream</b>
              <br />
              Open your phone app (e.g., IP Webcam) and enter its local stream URL here, e.g.<br/>
              <code className="text-xs bg-gray-100 p-0.5 rounded mt-1">
                http://192.168.x.x:8080/video
              </code>
            </label>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 rounded mb-3"
              placeholder="Enter your phone's live stream URL"
              value={liveStreamUrl}
              onChange={(e) => setLiveStreamUrl(e.target.value)}
              autoFocus
            />

            <label className="block mb-2 text-gray-700 text-center">
              <b>2️⃣ Pre-recorded Video</b>
              <br />
              <span className="text-xs">
                (To use your own, change the code or upload a new video and put its URL above.)
              </span>
            </label>
          </>
        )}

        {errorMsg && (
          <div className="w-full text-center my-2 text-rose-500 text-sm bg-rose-50 border border-rose-200 p-2 rounded">
            {errorMsg}
          </div>
        )}

        <div className="w-full flex flex-col items-center mt-4">
          {!playingLive ? (
            <div className="flex flex-col items-center gap-3 w-full">
              <p className="text-gray-600 text-sm text-center">
                The proposal video will play first.
                <br />
                <b>When it ends, it will switch to your phone's live camera automatically.</b>
              </p>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded transition"
                onClick={() => {
                  if (!preRecordedRef.current) return;
                  setPlayingLive(false);
                  preRecordedRef.current.currentTime = 0;
                  preRecordedRef.current.play();
                }}
                disabled={!videoReady}
              >
                ▶️ Replay Video
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 w-full">
              <p className="text-green-700 font-semibold">
                🎥 Live video from your phone should now appear above.
              </p>
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded mt-2 transition"
                onClick={() => {
                  setPlayingLive(false);
                  setErrorMsg("");
                  if (preRecordedRef.current) {
                    preRecordedRef.current.currentTime = 0;
                    preRecordedRef.current.play();
                  }
                }}
              >
                ⏪ Go Back & Replay Proposal
              </button>
            </div>
          )}
        </div>

        <footer className="w-full mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Your Names ❤️ • Made with React, by <a href="https://github.com/kirbergerconnor" className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer">kirbergerconnor</a>
        </footer>
      </div>
    </div>
  );
}

export default ProposalSite;
