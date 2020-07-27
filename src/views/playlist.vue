<template>
    <div>
        <button @click="$emit('console')">asd</button>
    </div>
</template>

<script>
export default {
    props:{
        play_list:{
            type:Array
        }
    }
}
</script>