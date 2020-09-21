<template>
    <div class="detail">
        <detail-nav-bar @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll"
         @scroll="contentScroll" :probe-type="3"
        :pull-up-load="true">
            <detail-swiper :top-images="topImages"/>
           <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/> 
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <div class="shopde">
                <h2>商品详情</h2> 
            </div>
            <detail-param-info ref="params" :param-info="paramsInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
          </scroll> 
          <detail-bottom-bar/>
        </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail';
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodList'
import {debounce} from 'common/utlis'
import {itemListener} from 'common/mixin'
import DetailBottomBar from './childComps/DetailBottomBar'
export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar
    },
    mixins:[itemListener],
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramsInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0
        }
    },
    created(){
        //1.保存传入的id
        this.iid=this.$route.params.iid
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            // //1.获取顶部轮播数据
            this.topImages=res.itemInfo.topImages
            // //2.获取商品信息
            this.goods=new Goods(res.itemInfo,res.columns,res.services);
              // 3.创建店铺信息
              this.shop=new Shop(res.shopInfo);
              //4.保存商品详情信息
              this.detailInfo=res.detailInfo;
              //5.获取参数信息
              this.paramsInfo=new GoodsParam(res.paramsInfo.info,res.paramsInfo.rule);
             //6.获取评论信息
             if(res.rate.cRate !==0){
                 this.commentInfo=res.rate.list
             };
            //  //nextTick是当dom渲染完之后才回调的函数
            //  this.$nextTick(()=>{
            //      //根据最新的数据，dom已经渲染出来了，但是图片依然还是没有加载出来
            //      this.themeTopYs=[]
            //      this.themeTopYs.push(0);
            //      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            //      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            //      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            //     console.log(this.themeTopYs)
            //  })
        });
        //3.请求推荐数据
        getRecommend().then(res=>{
            this.recommends=res.data.list
        });
          //4.给getThemeTopY赋值
          //4.1给赋值操作进行防抖
        this.getThemeTopY=debounce(()=>{
            this.themeTopYs=[]
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE)
            console.log(this.themeTopYs)
        },100)
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh();
            this.getThemeTopY()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
        contentScroll(position){
          //1.获取y值
          const positionY=-position.y;
          //2.positionY和导航栏的对比
          let length=this.themeTopYs.length
          for(let i=0;i<length;i++){
              if(this.currentIndex !==i && ( positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
                  this.currentIndex=i;
                  this.$refs.nav.currentIndex=this.currentIndex;
                  console.log(this.currentIndex)
              }
          }
        },
    },
   
    destroyed(){
        this.$bus.$off('itemImgLoad',this.detailitem)
    }
}
</script>
<style scoped>
.detail{
    height: 100vh;
    position: relative;
    background-color: #fff;
    z-index: 1;
}
.content{
    background-color: #fff;
    /* overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */
    height: calc(100% - 44px);
}
.shopde{
    text-align: center;
    font-weight: bolder;
    color: palevioletred;
    height: 40px;
    line-height: 40px;
}
</style>