import Vue from "vue";
import VueRouter from "vue-router";

import main from "@/views/Main.vue"
import search from "@/views/SearchView.vue"
import album_list from "@/views/album_list.vue"
import playlist from "@/views/playlist.vue"

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [{
        path: "/",
        name: "home",
        component: main,
        props: true
    },
    {
        path: "/search",
        name: "search",
        component: search,
        props: { "default": "test" }
    },
    {
        path: "/album/:albumName",
        name: "album",
        props: true,
        component: album_list
    },
    {
        path: "/playlist",
        name: "playlist",
        props: true,
        component: playlist
    }
    ]
})