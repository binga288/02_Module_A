import Vue from "vue";
import VueRouter from "vue-router";

import main from "@/views/Main.vue"
import search from "@/views/SearchView.vue"
import album_list from "@/views/album_list.vue"


Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [{
        path: "/",
        name: "home",
        component: main,
        props: true,
        beforeEnter(to, from, next) {
            fetch("http://127.0.0.1/XX_Module_A_API/api/albums", {
                method: "GET",
            })
                .then(($res) => $res.json())
                .then(($res) => {
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
            fetch("http://127.0.0.1/XX_Module_A_API/api/albums", {
                method: "GET",
            })
                .then(($res) => $res.json())
                .then(($res) => {
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
            fetch("http://127.0.0.1/XX_Module_A_API/api/albums", {
                method: "GET",
            })
                .then(($res) => $res.json())
                .then(($res) => {
                    to.params.album = $res.find(album => album.id == to.params.albumId);
                    next()
                });

        }
    }
    ]
})