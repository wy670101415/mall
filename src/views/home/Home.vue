<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control" v-show="isTabFixed"
        /> 
        <scroll class="cs" ref="scroll" 
        :probe-type="3" @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore"
        >
            <home-swiper :banners="banners"
            @swiperImageLoad="swiperImageLoad"
            />
        <recommend-view :recommend="recommend"/>
        <feature/>
        <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick"
        ref="tabControl2"
        /> 
        <good-list :goods="showGoods" class="dd"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShow"/>
    </div>
</template>
<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import Feature from './childComps/Feature'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import {getHome,getHomeGoods} from 'network/home'
import {debounce} from 'common/utlis'
import {itemListener} from 'common/mixin'
export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        Feature,
        TabControl,
        GoodList,
        Scroll,
        BackTop
    },
    mixins:[itemListener],
    data(){
        return{
            banners:[],
            recommend:[],
            goods:{
                'pop':{pageNum:0,pageSize:10,list:[]},
                'news':{pageNum:0,pageSize:10,list:[]},
                'sc':{pageNum:0,pageSize:10,list:[]}
            },
            currentType:'news',
            isShow:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    created(){
        this.getHome(),
        this.getHomeGoods("pop")
        this.getHomeGoods("news")
        this.getHomeGoods("sc")
    },
    mounted(){
        // //1.监听图片加载完成,监听事件最好放在mounted中，而调用可以在created中
        // const refresh=debounce(this.$refs.scroll.refresh,200)
        // this.homeItemListen=()=>{refresh()}
        // this.$bus.$on('itemImgLoad', this.homeItemListen)
        // //2.获取tabcontrol的offsettop
        // //所有组件都有$el这个属性：用于获取组件中的元素
    },
    destroyed(){
        console.log('毁灭了')
    },
    //进入home页面
    activated(){
        this.saveY
    },
    //离开home页面,此方法只能用于有缓存的，即有keepalive的
    deactivated(){
        this.saveY=this.$refs.scroll.getScrollY();
        //取消goodsitem里图片加载的监听
        this.$bus.$off('itemImgLoad',this.homeItemListen)
    },
    methods:{
        
        // 网络请求的方法
        getHome(){
            //1.请求多个数据
            getHome().then(res=>{
            this.banners=res.data.banners;
            this.recommend=res.data.recommend;
            });
        },
        getHomeGoods(type){
            const t = type=='pop'?2:type=='news'?1:0;
             //获取当前页码
            let pageNum= this.goods[type].pageNum+1;
            let pageSize= this.goods[type].pageSize;
            getHomeGoods(t,pageNum,pageSize).then(res=>{
                 this.goods[type].list.push(...res.data);
                this.goods[type].pageNum+=1
                this.$refs.scroll.finishPullUp()
            })
        },
        // 事件监听的方法
        tabClick(i){
            switch (i){
                case 0:
                this.currentType="pop"
                break
                case 1:
                this.currentType="news"
                break
                case 2:
                this.currentType="sc"
            }
            this.$refs.tabControl1.currentIndex=i;
            this.$refs.tabControl2.currentIndex=i;
        },
        //backtop
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
        },
        contentScroll(position){
           this.isShow=-(position.y)>1000,
           this.isTabFixed=-(position.y)>this.tabOffsetTop
        },
        loadMore(){
            //上拉加载更多数据
           this.getHomeGoods(this.currentType)
        //    this.$refs.scroll.scroll.refresh()
        },
        swiperImageLoad(){
            this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop

        }
    }
}
</script>
<style scoped>
#home {
    height: 100vh; 
    position: relative;
}
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
}
.cs{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
.tab-control{
    position: relative;
    z-index: 9;
}

</style>