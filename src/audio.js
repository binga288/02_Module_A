class AudioPlay {
    constructor() {
        this.audio = new Audio();
        this.context = new AudioContext()
        this.PlayIndex = null;
        this.PlayList = [];
        this.NowPlay = {};
        this.Playing = false;
        this.Played = false;
        this.ListShow = false;
        this.LyricResult = [];
        this.LyricIndex = null;
    }
    reset() {
        this.LyricResult = [];
        this.LyricIndex = null;
        this.PlayIndex = null;
        this.PlayList = [];
        this.NowPlay = {};
        this.Playing = false;
        this.Played = false;
    }
    SetCurrentAudio(index) {
        this.PlayIndex = index;
        this.NowPlay = this.PlayList[index];
        this.audio.setAttribute("src", require(`@/assets/${this.NowPlay.song_path}`));
        this.audio.load();
        this.Played = true;
    }
    AddPlayList(song) {
        this.PlayList.push(song);
    }
    SetPlayList(songlist) {
        this.PlayList = songlist;
    }
    play() {
        if (this.Played) {
            this.audio.play();
            this.context.resume();
            this.Playing = true;
        }
    }
    pause() {
        if (this.Played) {
            this.audio.pause();
            this.Playing = false;
        }
    }
    chaCurrentTime(percent) {
        this.audio.currentTime = this.audio.duration * percent;
        localStorage.setItem("currentTime", this.audio.currentTime);
    }
    chaSound(num) {
        this.audio.volume = num;
        localStorage.setItem("volumn", num);
    }
    LyricPre(file, type) {
        let LyricResult = [];
        if (type == "srt") {
            let splited = file.split("\n\n");
            splited.forEach((str) => {
                let precess = str.match(/(\w|.)+/g);
                if (precess != null) {
                    let time = precess[1].match(/(\d+:)+\d+,\d+/g);
                    time = time[0].replace(/,/, ".").split(":");
                    LyricResult.push([
                        time[0] * 3600 + time[1] * 60 + time[2] * 1,
                        precess.slice(2, precess.length).join(" "),
                    ]); 
                }
            });
        } else if (type == "lrc") {
            let splited = file.split("\n");
            splited.forEach((str) => {
                if (/(\d+:\d+.\d+)/.test(str)) {
                    let time = str.match(/(\d+:\d+.\d+)/g);
                    let string = str.split("]")[time.length];
                    time.forEach((e) => {
                        let sum = e.split(":");
                        LyricResult.push([sum[0] * 60 + sum[1] * 1, string]);
                    });
                }
            });
            LyricResult.sort((a, b) => a[0] - b[0]);
        }
        return LyricResult;
    }
    LyricGet() {
        let buffer = null;
        this.LyricResult.forEach((e, i) => {
            if (e[0] < this.audio.currentTime) {
                buffer = i;
            }
        });
        this.LyricIndex = buffer;
    }
    defaultEvent() {
        window.addEventListener("keydown", (e) => {
            if (e.code == "Space") {
                if (this.Playing) {
                    this.pause();
                } else {
                    this.play();
                }
            }
        });
        let bar = document.querySelectorAll(".progress-bar");
        this.audio.ontimeupdate = function () {
            bar[0].style.width = this.audio.currentTime / this.audio.duration * 100 + "%";
            if(this.LyricResult)this.LyricGet();
            localStorage.setItem("currentTime", this.audio.currentTime);
        }.bind(this);

        this.audio.onended = function () {
            if (this.PlayList[this.PlayIndex + 1]) {
                this.SetCurrentAudio(this.PlayIndex + 1);
                this.play();
            } else {
                this.SetCurrentAudio(0);
                this.play();
            }
        }.bind(this);

        this.audio.ondurationchange = function () {
            this.LyricResult = [];
            if (this.NowPlay.lyric_path != "") {
                this.LyricType = this.NowPlay.lyric_path.match(/(srt|lrc)$/g)[0];
                fetch(`${process.env.BASE_URL}${this.NowPlay.lyric_path}`)
                    .then(res => res.text())
                    .then(res => {
                        this.LyricResult = this.LyricPre(res, this.LyricType);
                    })
            }
            window.navigator.mediaSession.metadata = new window.MediaMetadata({
                title: this.NowPlay.title,
                album: this.NowPlay.album_title,
                artist: this.NowPlay.album_artist,
                artwork: [
                    {
                        src: require(`@/assets/${this.NowPlay.album_img}`),
                        sizes: "360x180"
                    }
                ]
            })
            window.navigator.mediaSession.setActionHandler("play", function () {
                this.play();
            }.bind(this));
            window.navigator.mediaSession.setActionHandler("pause", function () {
                this.pause();
            }.bind(this));
            window.navigator.mediaSession.setActionHandler("nexttrack", function () {
                if (
                    this.PlayIndex + 1 < this.PlayList.length
                ) {
                    this.pause();
                    this.SetCurrentAudio(this.PlayIndex + 1);
                    this.play();
                }
            }.bind(this));
            window.navigator.mediaSession.setActionHandler("previoustrack", function () {
                if (
                    this.PlayIndex - 1 >= 0
                ) {
                    this.pause();
                    this.SetCurrentAudio(this.PlayIndex - 1);
                    this.play();
                }
            }.bind(this));
        }.bind(this);

        this.audio.onended = function () {
            if (this.PlayIndex + 1 < this.PlayList.length) {
                this.pause();
                this.SetCurrentAudio(this.PlayIndex + 1);
                this.play();
            } else {
                this.pause();
                this.SetCurrentAudio(0);
            }
        }.bind(this);

        bar[1].style.width = "100%";
        console.log(JSON.parse(localStorage.getItem("played")))
        if (JSON.parse(localStorage.getItem("played"))) {
            let volumn = localStorage.getItem("volumn") * 1;
            let currentTime = localStorage.getItem("currentTime") * 1;
            let PlayList = localStorage.getItem("playlist");
            let playindex = localStorage.getItem("playindex") * 1;
            this.SetPlayList(JSON.parse(PlayList));
            this.SetCurrentAudio(playindex);
            this.chaSound(volumn);
            this.audio.currentTime = currentTime;
            bar[0].style.width = currentTime / this.audio.duration * 100 + "%";
            bar[1].style.width = volumn * 100 + "%"
        }
    }
}
export default AudioPlay;