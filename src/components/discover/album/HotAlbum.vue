<script>
import { inject } from '@vue/runtime-core'
export default {
    name:'HotAlbum',
   async setup() {
        const axios = inject("axios")
        const list = await axios.get('/album/newest').then(res=>res.albums.slice(0,10))
        return {
            list,
        }
    },
}
</script>
<template>
    <div class="hot-head">
        <h2>热门新碟</h2>
    </div>
    <div class="hot-list">
        <div v-for="item in list" :key="item.id" class="item-box">
            <div class="img-box">
                <img :src="item.picUrl" width="130" :alt="item.name">
            </div>
            <p class="item-name">{{item.name}}</p>
            <p class="item-artist">{{item.artist.name}}</p>
        </div>
    </div>
</template>
<style scoped>
.hot-head{
    width: 100%;
    border-bottom: 2px solid #c20c0c;
    padding:10px;
}
.hot-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.item-box{
    width: 150px;
    margin: 10px;
}
.img-box{
    height: 130px;
    width: 100%;
    background-image: url('../../../assets/coverall.png');
    background-position: 0 -845px;
}
.item-name{
    font-size: 1.1em;
    padding: 5px;
}
.item-artist{
    font-size: 0.9em;
    color: gray;
    padding: 0 5px;
}
</style>