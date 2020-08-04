class MainPlayer {
  constructor() {
    this.MainPlayer = new Audio();
    this.playStatus = false;
    this.playing = false;
    this.playIndex = 0;
    this.playlist = [];
    this.lyrics = [];
    this.lyric_index = 0;
  }
  setLyricIndex(index) {
    this.lyric_index = index;
    localStorage.setItem("lyrics_index", index);
  }
  setSonglist(array) {
    this.playlist = array;
  }
  requireTry(song){
    try {
      require("@/assets/" + song.song_path);
    }catch{
      alert("無法讀取檔案");
      return true;
    }
    return false;
  }
  setCurrentAudio(index) {
    if (this.requireTry(this.playlist[index])) {
      this.playlist.splice(index,1);
      this.setCurrentAudio(index);
    }
    this.MainPlayer.setAttribute("src", require("@/assets/" + this.playlist[index].song_path));
    this.lyrics = [];
    this.playing = true;
    this.playIndex = index;
    localStorage.setItem("playIndex", index);
    this.MainPlayer.load();
    this.audioEffect();
    return true;
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
  audioEffect(){
    var context = new AudioContext();
    var source = context.createMediaElementSource(this.MainPlayer);
    var analyser = context.createAnalyser();

    source.connect(analyser);
    analyser.connect(context.destination);

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var bar_width = this.can.width / bufferLength;
    function renderFrame(){
      requestAnimationFrame(renderFrame);
      var x = 0;
      analyser.getByteFrequencyData(dataArray);

      for (var i = 0; i < bufferLength; i++) {
        let bar_height = dataArray[i];
        this.ctx.fillRect(x,this.can.height - bar_height,bar_width,bar_height);
        x += bar_width + 1;        
      }
    }
    renderFrame();
  }
}
function getAudio() {
  return new MainPlayer();
}

export default getAudio;