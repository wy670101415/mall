<template>
    <div class="recommend">
        <div v-for="(item, i) of recommend" :key="i" class="recommend-item">
            <a :href="item.link">
              <img :src="require('@/assets/img/index/'+item.img)">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name:"RecommendView",
    props:{
        recommend:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>
<style scoped>
.recommend{
    display: flex;
    width: 100%;
    text-align:center;
    font-size: 12px;
    padding: 10px 0 20px 0;
    border-bottom: 8px solid #eeeeee;
}
.recommend-item {
    flex: 1;
}
.recommend-item img{
    width: 80px;
    height: 80px;
    border-radius: 40%;
    margin-bottom: 3px;
}
</style>