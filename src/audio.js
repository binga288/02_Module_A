class MainPlayer {
  constructor() {
    this.MainPlayer = new Audio();
    this.playStatus = false;
    this.playing = false;
    this.playIndex = 0;
    this.playlist = [];
  }

  setSonglist(array) {
    array.forEach((v, i) => {
      let source = document.createElement("source");
      source.src = require("@/assets/" + v);
      source.type = "audio/mp3";
      this.MainPlayer.appendChild(source);
      this.playlist[i] = v;
    });
  }
  setCurrentAudio(index) {
    this.MainPlayer.setAttribute("src", require("@/assets/" + this.playlist[index]));
    this.playing = true;
    this.playIndex = index;
    localStorage.setItem("playIndex", index);
    this.MainPlayer.load();    
  }
  play() {
    this.playStatus = true;
    this.MainPlayer.play();
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
  setCurrentTime(number) {
    this.MainPlayer.currentTime = number;
  }
  getDuration() {
    return this.MainPlayer.duration;
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
}
function getAudio() {
  return new MainPlayer();
}

export default getAudio;