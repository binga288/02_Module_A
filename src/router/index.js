import vue from "vue";
import VueRouter from "vue-router";
import album from "@/view/album.vue";
import search from "@/view/search.vue";
import album_content from "@/view/album_content.vue";

vue.use(VueRouter);

export default new VueRouter({
    base:"/02_Module_A/",
    mode:"history",
    routes:[
        {
            name:"home",
            path:"/",
            props:true,
            component:album,
            beforeEnter(to,from,next){
                fetch("http://web02/00_Module_A_API/api/albums")
                .then(res=>res.json())
                .then(res=>{
                    res.forEach(album=>{
                        album.songlist.forEach(song=>{
                            song.album_title = album.title;
                            song.album_img = album.img_path;
                            song.album_artist = album.artist;
                        })
                    })
                    to.params.albums = res;
                    
                    next();
                })                
            }
        },
        {
            name:"search",
            path:"/search",
            props:true,
            component:search,
            beforeEnter(to,from,next){
                fetch("http://web02/00_Module_A_API/api/albums")
                .then(res=>res.json())
                .then(res=>{
                    res.forEach(album=>{
                        album.songlist.forEach(song=>{
                            song.album_title = album.title;
                            song.album_img = album.img_path;
                            song.album_artist = album.artist;
                        })
                    })
                    to.params.albums = res;
                    
                    next();
                })                
            }
        },
        {
            name:"album",
            path:"/album/:album_id",
            props:true,
            component:album_content,
            beforeEnter(to,from,next){
                fetch("http://web02/00_Module_A_API/api/albums")
                .then(res=>res.json())
                .then(res=>{
                    res.forEach(album=>{
                        album.songlist.forEach(song=>{
                            song.album_title = album.title;
                            song.album_img = album.img_path;
                            song.album_artist = album.artist;
                        })
                    })
                    to.params.albums = res;
                    
                    next();
                })                
            }
        }
    ]
});