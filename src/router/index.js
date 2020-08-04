import Vue from "vue";
import VueRouter from "vue-router";

import main from "@/views/Main.vue"
import search from "@/views/SearchView.vue"
import album_list from "@/views/album_list.vue"


Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: main,
            props: true,
            beforeEnter(to, from, next) {
                fetch("http://web02/00_Module_A_API/api/albums", {
                    method: "GET",
                })
                    .then(($res) => $res.json())
                    .then(($res) => {
                        $res.forEach(album => {
                            album.songlist.forEach(song => song["album_name"] = album.title);
                            album.songlist.forEach(song => song["img_path"] = album.img_path);
                        });
                        to.params.all_album = $res;
                        next()
                    });

            }
        },
        {
            path: "/search",
            name: "search",
            component: search,
            props: true,
            beforeEnter(to, from, next) {
                fetch("http://web02/00_Module_A_API/api/albums", {
                    method: "GET",
                })
                    .then(($res) => $res.json())
                    .then(($res) => {
                        $res.forEach(album => {
                            album.songlist.forEach(song => song["album_name"] = album.title);
                            album.songlist.forEach(song => song["img_path"] = album.img_path);
                        });
                        to.params.all_album = $res;
                        next()
                    });

            }
        },
        {
            path: "/album/:albumId",
            name: "album",
            props: true,
            component: album_list,
            beforeEnter(to, from, next) {
                fetch("http://web02/00_Module_A_API/api/albums", {
                    method: "GET",
                })
                    .then(($res) => $res.json())
                    .then(($res) => {
                        $res.forEach(album => {
                            album.songlist.forEach(song => song["album_name"] = album.title);
                            album.songlist.forEach(song => song["img_path"] = album.img_path);
                        });
                        to.params.albumId *= 1;
                        to.params.album = $res.find(album => album.id == to.params.albumId);
                        next()
                    });

            }
        }
    ]
})

