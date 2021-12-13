import Vue from "vue";
import VueRouter from "vue-router";
<<<<<<< HEAD
import album from "@/view/album.vue";
import album_content from "@/view/album_content.vue";
import search from "@/view/search.vue";
=======
import album from "@/view/album.vue"
import album_content from "@/view/album_content.vue"
import search from "@/view/search.vue"
>>>>>>> parent of 64212ad ([down]0820)

Vue.use(VueRouter);

export default new VueRouter({
<<<<<<< HEAD
    mode:"history",
    base:"/02_Module_A",
    routes:[
        {
            path:"/",
            name:"home",
            component:album,
            props:true,
            beforeEnter(to,from,next){
                fetch("http://web02/00_Module_A_API/api/albums")
                .then(res=>res.json())
                .then(res=>{
                    res.forEach(album=>{
                        album.songlist.forEach(song=>{
                            song.album_title = album.title;
                            song.img_path = album.img_path;
=======
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
>>>>>>> parent of 64212ad ([down]0820)
                        })
                        to.params.Albums = res;
                        next();
                    })
<<<<<<< HEAD
                    to.params.albums = res;
                    console.log(res);
                    next();
                })
            }
        },
        {
            path:"/search",
            name:"search",
            component:search,
            props:true,
            beforeEnter(to,from,next){
                fetch("http://web02/00_Module_A_API/api/albums")
                .then(res=>res.json())
                .then(res=>{
                    res.forEach(album=>{
                        album.songlist.forEach(song=>{
                            song.album_title = album.title;
                            song.img_path = album.img_path;
=======
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
>>>>>>> parent of 64212ad ([down]0820)
                        })
                        to.params.Albums = res;
                        next();
                    })
<<<<<<< HEAD
                    to.params.albums = res;
                    console.log(res);
                    next();
                })
            }
        },
        {
            path:"/album/:id",
            name:"album_content",
            component:album_content,
            props:true,
            beforeEnter(to,from,next){
                fetch("http://web02/00_Module_A_API/api/albums")
                .then(res=>res.json())
                .then(res=>{
                    res.forEach(album=>{
                        album.songlist.forEach(song=>{
                            song.album_title = album.title;
                            song.img_path = album.img_path;
=======
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
>>>>>>> parent of 64212ad ([down]0820)
                        })
                        to.params.Albums = res;
                        next();
                    })
<<<<<<< HEAD
                    to.params.albums = res;
                    console.log(res);
                    next();
                })
=======
>>>>>>> parent of 64212ad ([down]0820)
            }
        }
    ]
});
