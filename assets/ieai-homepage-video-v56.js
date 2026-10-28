(() => {
  "use strict";
  const video = document.getElementById("ieaiIntroVideo");
  const button = document.getElementById("ieaiFilmPlay");
  if (!video || !button) return;
  button.addEventListener("click", () => {
    const start = video.play();
    if (start && typeof start.then === "function") {
      start.then(() => { button.hidden = true; }).catch(() => { button.hidden = false; video.focus(); });
    } else {
      button.hidden = true;
    }
  });
  video.addEventListener("play", () => { button.hidden = true; });
  video.addEventListener("error", () => { button.hidden = false; button.setAttribute("aria-label", "Playback unavailable; use the download link in the video"); });
})();
