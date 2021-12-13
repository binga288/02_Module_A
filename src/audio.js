class AudioPlayer {
    constructor() {
<<<<<<< HEAD
        this.audio = new Audio();
        this.context = new AudioContext();
        this.playList = [];
        this.nowPlay = {};
        this.playIndex = null;
        this.played = false;
        this.playing = false;
        this.listShow = false;
    }
    reset() {
        this.playList = [];
        this.nowPlay = {};
        this.playIndex = null;
        this.playing = false;
    }
    chaSound(num) {
        this.audio.volume = num;
        localStorage.setItem("volume", num)
    }
    setCurrentAudio(index) {
        this.playIndex = index;
        this.nowPlay = this.playList[this.playIndex];
        this.audio.setAttribute("src", require(`@/assets/${this.nowPlay.song_path}`))
        this.audio.load();
        this.played = true;
    }
    play() {
        if (this.played) {
            this.audio.play();
            this.playing = true;
            this.context.resume();
        }
    }
    pause() {
        if (this.played) {
            this.audio.pause();
            this.playing = false;
        }
    }
    addPlayList(obj) {
        this.playList.push(obj)
    }
    chaPlayList(array) {
        this.playList = array;
    }
    chaCurrentTime(num) {
        this.audio.currentTime = this.audio.duration * num;
    }
    formatDate(num) {
        let minute = Math.floor(num / 60).toString().padStart(2, 0);
        let second = Math.floor(num % 60).toString().padStart(2, 0);
        return `${minute}:${second}`;
    }
    effectEvent() {
        let div_array = document.querySelectorAll("#effect div");
        let source = this.context.createMediaElementSource(this.audio);
        let analyser = this.context.createAnalyser();
        source.connect(analyser);
        analyser.connect(this.context.destination);
        analyser.fftSize = 256;
        let dataArray = new Uint8Array(analyser.frequencyBinCount);
        function render() {
            analyser.getByteFrequencyData(dataArray);
            div_array.forEach((i, k) => {
                i.style.transform = `scaleY(${dataArray[k] * 0.09})`;
            })
            requestAnimationFrame(render);
        }
        render();
    }
    defauleEvent() {
        let playBar = document.querySelectorAll(".progress-bar");
        let timeShow = document.getElementById("time");
        this.audio.addEventListener("timeupdate", () => {
            playBar[0].style.width = this.audio.currentTime / this.audio.duration * 100 + "%";
            timeShow.innerHTML = `${this.formatDate(this.audio.currentTime)}:${this.audio.duration?this.formatDate(this.audio.duration):"00:00"}`;
            localStorage.setItem("currentTime", this.audio.currentTime);
        })
        this.audio.addEventListener("ended", function () {
            if (this.playIndex + 1 < this.playList.length) {
                this.setCurrentAudio(this.playIndex + 1);
                this.play();
            } else {
                this.setCurrentAudio(0);
                this.play();
            }
        }.bind(this))

        if (JSON.parse(localStorage.getItem("played"))) {
            let currentTime = localStorage.getItem("currentTime") * 1;
            let playIndex = localStorage.getItem("playIndex") * 1;
            let playList = JSON.parse(localStorage.getItem("playList"));
            let volume = localStorage.getItem("volume") * 1;
            this.chaPlayList(playList);
            this.setCurrentAudio(playIndex);
            this.audio.currentTime = currentTime;
            this.chaSound(volume);
            playBar[0].style.width = this.audio.currentTime / this.audio.duration * 100 + "%";
            playBar[1].style.width = this.audio.volume * 100 + "%";
        } else {
            playBar[1].style.width = "100%";
=======
        this.Audio = new Audio();
        this.PlayIndex = null;
        this.PlayList = [];
        this.Played = false;
        this.Playing = false;
        this.NowPlaying = {};
        this.listShow = false;
    }
    reset() {
        this.pause();
        this.PlayIndex = null;
        this.PlayList = [];
        this.NowPlaying = {};
        localStorage.clear();
        localStorage.setItem("volume",this.Audio.volume);
    }
    play() {
        if (this.Played) {
            this.Audio.play();
            this.Playing = true;
        }
    }
    pause() {
        if (this.Played) {
            this.Audio.pause();
            this.Playing = false;
        }
    }
    setCurrentAudio(index) {
        this.Played = true;
        this.PlayIndex = index;
        this.NowPlaying = this.PlayList[index];
        this.Audio.setAttribute("src", require(`@/assets/${this.NowPlaying.song_path}`));
        this.Audio.load();
        this.Played = true;
        localStorage.setItem("played", this.Played);
    }
    setPlayList(array) {
        this.PlayList = array;
    }
    addPlayList(song) {
        this.PlayList.push(song);
    }
    setCurrentTime(precent) {
        this.Audio.currentTime = this.Audio.duration * precent;
        localStorage.setItem("current", this.Audio.currentTime);
    }
    setVolume(level) {
        this.Audio.volume = level;
        localStorage.setItem("volume", level);
    }
    defaultEvent() {
        let bars = document.querySelectorAll(".progress-bar");
        this.Audio.ondurationchange = function () {
            localStorage.setItem("duration", this.Audio.duration);
            window.navigator.mediaSession.metadata = new window.MediaMetadata({
                title: this.NowPlaying.title,
                artist: this.NowPlaying.album_artist,
                album: this.NowPlaying.album_title,
                artwork: [{
                    src: require(`@/assets/${this.NowPlaying.album_img}`),
                    sizes: '180x180'
                }]
            });
        }.bind(this);
        this.Audio.ontimeupdate = function () {
            bars[0].style.width = `${(this.currentTime / this.duration) * 100}%`;
            localStorage.setItem("current", this.currentTime);
        };
        this.Audio.onended = function () {
            if (this.PlayIndex + 1 < this.PlayList.length) {
                this.setCurrentAudio(this.PlayIndex + 1);
                this.play();
            } else {
                this.setCurrentAudio(0);
                this.pause();
            }
        }.bind(this);

        let Played = localStorage.getItem("played");
        if (JSON.parse(Played)) {
            let sound = localStorage.getItem("volume");
            let current = localStorage.getItem("current");
            let duration = localStorage.getItem("duration");
            let PlayIndex = localStorage.getItem("playindex");
            let PlayList = localStorage.getItem("playlist");

            this.setPlayList(JSON.parse(PlayList));
            this.setCurrentAudio(PlayIndex*1);
            this.Audio.volume = sound;
            this.Audio.currentTime = current?current:0;
            bars[0].style.width = current / duration * 100 + "%";
            bars[1].style.width = this.Audio.volume * 100 + "%";
>>>>>>> parent of 64212ad ([down]0820)
        }
    }
}

<<<<<<< HEAD
export default AudioPlayer;
=======
export default AudioPlay;
>>>>>>> parent of 64212ad ([down]0820)
