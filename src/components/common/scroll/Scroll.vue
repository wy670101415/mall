<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data(){
        return {
            scroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0,
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
   mounted(){
       this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click:true,
            pullUpLoad:this.pullUpLoad
        });
    //    setTimeout(()=>{
           //1.创建betterscroll对象
        //2.监听滚动位置
        if(this.probeType===2 ||this.probeType===3){
             this.scroll.on("scroll",(position)=>{
            this.$emit('scroll',position)
        });
        }
        //3.监听上拉事件
        //需要监听时，才是true，在会调用，
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                console.log('监听上拉到底部')
            this.$emit('pullingUp')
        })
        }
    //    },30)
    },
    
    methods:{
        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time=300)
        },
        finishPullUp(){
            this.scroll&&this.scroll.finishPullUp()
            console.log(1)
        },
        refresh(){
            this.scroll.refresh()
        },
        //获取离开home页面时的y
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }
   
}
</script>
<style scoped>

</style>