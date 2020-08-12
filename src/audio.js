class MainPlayer {
  constructor() {
    this.MainPlayer = new Audio();
    this.playStatus = false;
    this.playing = false;
    this.playIndex = 0;
    this.playlist = [];
    this.lyrics = [];
    this.lyric_index = 0;
    this.context = new AudioContext()
  }
  setLyricIndex(index) {
    this.lyric_index = index;
    localStorage.setItem("lyrics_index", index);
  }
  setSonglist(array) {
    this.playlist = array;
    localStorage.setItem("list",JSON.stringify(array));
  }
  requireTry(song) {
    try {
      require("@/assets/" + song.song_path);
    } catch{
      alert("無法讀取檔案");
      return true;
    }
    return false;
  }
  setCurrentAudio(index) {
    if (this.requireTry(this.playlist[index])) {
      this.playlist.splice(index, 1);
      this.setCurrentAudio(index);
    }
    this.MainPlayer.setAttribute("src", require("@/assets/" + this.playlist[index].song_path));
    this.lyrics = [];
    this.playing = true;
    this.playIndex = index;
    localStorage.setItem("playIndex", index);
    this.MainPlayer.load();
  }
  play() {
    this.playStatus = true;
    this.MainPlayer.play();
    this.context.resume();
  }
  stop() {
    this.playStatus = false;
    this.MainPlayer.pause()
  }
  chaSound(number) {
    this.MainPlayer.volume = number
    localStorage.setItem("sound", number);
  }
  getCurrentTime() {
    return this.MainPlayer.currentTime;
  }
  getDurationTime(){
    return this.MainPlayer.duration;
  }
  setCurrentTime(number) {
    this.MainPlayer.currentTime = number;
  }
  on(event, callback) {
    this.MainPlayer.addEventListener(event, callback);
  }
  formatTime(sec = this) {
    let hour = Math.floor(sec / 3600).toString().padStart(2, 0);
    let minute = Math.floor(sec % 3600 / 60).toString().padStart(2, 0);
    let second = Math.floor(sec % 3600 % 60).toString().padStart(2, 0);

    return (hour > 0) ? `${hour}:${minute}:${second}` : `${minute}:${second}`
  }
  getAudioInfo() {
    return this.MainPlayer;
  }
  audioEffect() {
    var divArray = document.querySelectorAll("#effect div");
    var source = this.context.createMediaElementSource(this.MainPlayer);
    var analyser = this.context.createAnalyser();
    source.connect(analyser);
    analyser.connect(this.context.destination);

    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);
      divArray.forEach((i, k) => {
        i.style.transform = `scale(1,${dataArray[k] * 0.09})`;
        i.style.background = `hsl(120,90%,60%)`;
      })
    }
    renderFrame();
  }
}

function getAudio(message) {
  console.log(message)
  return new MainPlayer();
}

export default getAudio;