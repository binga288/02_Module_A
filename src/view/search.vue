<template>
    <div class="wrapper">
        <input type="text" v-model="searchWord" class="form-control ml-3 mt-3 px-4 rounded-pill" style="width:20%;" placeholder="輸入關鍵字">
    </div>
</template>
<script>
export default {
    props:{
        Albums:Array
    },
    data(){
        return{
            searchWord:""
        }
    },
    watch:{
        searchWord:function(str){
            let normal = str.match(/(title|artist|composer|album):\w{3}/g);
            console.log(normal)
        }
    }
}
</script>