<template>
      <swiper class="details-swiper">
          <swiper-item 
            v-for="(item,index) in topImages" :key="index">
            <img :src="item" class="img-responsive">
          </swiper-item>
      </swiper>
</template>
<script>
import{Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'DetailSwiper',
    props:{
        topImages:{
            type:Array,
           default(){
               return []
           }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>
<style scoped>
 .details-swiper{
        height: 53vmin;
        overflow: hidden;
    }
    .details-swiper img{
        width: 100%;
        height:53vmin ;
    }
/* @media screen and (orientation: portrait) {
  
}  */
/* @media screen and (orientation: landscape) {
  /*竖屏 css*/
    /* .details-swiper{
        height: 80vmin;
    } */
/* } */
</style>