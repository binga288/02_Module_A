import Vue from "vue";
import VueRouter from "vue-router";

import main from "@/views/Main.vue"
import search from "@/views/SearchView.vue"
import album_list from "@/views/album_list.vue"
import playlist from "@/views/playlist.vue"
// import all_album from "@/albums" q

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
            props: true
        },
        {
            path: "/album/:albumName",
            name: "album",
            props: true,
            component: album_list
                // beforeEnter: (to, from, next) => {
                //     const album = all_album.albums.find((resort) => resort.name == to.params.albumName)
                //     if (album) {
                //         next()
                //     } else {
                //         next({
                //             name: "home"
                //         })
                //     }
                // }
        },
        {
            path: "/playlist",
            name: "playlist",
            component: playlist
        }
    ]
})