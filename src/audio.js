class AudioPlay {
    constructor() {
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
        }
    }
}

export default AudioPlay;