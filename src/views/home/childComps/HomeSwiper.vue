<template>
<div class="row no-gutters">
    <div class="col-sm-12">
         <swiper class="homeswiper">
            <swiper-item v-for="(item,i) of banners" :key="i">
                <a :href="item.href">
                    <img :src="require('@/assets/img/index/'+item.img)" 
                    @load="imageLoad" 
                    class="img-responsive"/>
                </a>
            </swiper-item>
        </swiper>
    </div>
</div>
      
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'homeswiper',
    props:{
      banners:{
          type:Array,
          default(){
              return[]
          }
      }  
    },
    data(){
        return{
            isLoad:false
        }
    },
    components:{
        SwiperItem,
        Swiper
    },
    methods:{
        imageLoad(){
            if(!this.isLoad){
                 this.$emit('swiperImageLoad');
                 this.isLoad=true;
            }
        }
    }
}
</script>
<style scoped>
.homeswiper img {
   width: 100%;
}
</style>