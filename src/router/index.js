import Vue from "vue";
import VueRouter from "vue-router";
import album from "@/view/album.vue"
import album_content from "@/view/album_content.vue"
import search from "@/view/search.vue"

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/02_Module_A",
            name: "home",
            component: album,
            props: true,
            beforeEnter(to, from, next) {
                fetch("http://web02/00_Module_A_API/api/albums")
                    .then(res => res.json())
                    .then(res => {
                        res.forEach(album => {
                            album.songlist.forEach(song => {
                                song.album_title = album.title;
                                song.album_img = album.img_path;
                                song.album_artist = album.artist;
                            })
                        })
                        to.params.Albums = res;
                        next();
                    })
            }
        },
        {
            name: "search",
            path: "/search",
            component: search,
            props: true,
            beforeEnter(to, from, next) {
                fetch("http://web02/00_Module_A_API/api/albums")
                    .then(res => res.json())
                    .then(res => {
                        res.forEach(album => {
                            album.songlist.forEach(song => {
                                song.album_title = album.title;
                                song.album_img = album.img_path;
                                song.album_artist = album.artist;
                            })
                        })
                        to.params.Albums = res;
                        next();
                    })
            }
        },
        {
            path: "/album/:id",
            name: "album_content",
            component: album_content,
            props: true,
            beforeEnter(to, from, next) {
                fetch("http://web02/00_Module_A_API/api/albums")
                    .then(res => res.json())
                    .then(res => {
                        res.forEach(album => {
                            album.songlist.forEach(song => {
                                song.album_title = album.title;
                                song.album_img = album.img_path;
                                song.album_artist = album.artist;
                            })
                        })
                        to.params.Albums = res;
                        next();
                    })
            }
        }
    ]
});