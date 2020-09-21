<template>
    <div class="goods-item" @click="itemClick">
        <img :src="showImage" @load="imgLoad">
        <div class="goods-info"><p>{{goodItem.title}}</p>
        <span class="price">¥{{goodItem.price}}</span>
        <span class="collect">
            {{goodItem.cfav}}
        </span>
        </div>
    </div>
</template>
<script>
export default {
    name:'GoodItem',
    props:{
        goodItem:{
            type:Object,
            default() {
                return {}
            }
        }
    },
    computed:{
      showImage(){
        return this.goodItem.itemUrl ||this.goodItem.img
      }
    },
    methods:{
      imgLoad(){
        this.$bus.$emit('itemImgLoad')
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodItem.iid)
      }
    }
}
</script>
<style scoped>
.icon-love{
    color: red;
    font-size: 20px;
}
.goods-item {
    padding-bottom: 55px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: red;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>