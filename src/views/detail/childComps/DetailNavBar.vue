<template>
    <div class="nav-bar">
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" >
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" 
                class="title-item" :key="index"
                :class="{active:index===currentIndex}"
                @click="titleClick(index)">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:"DetailNavBar",
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    components:{
        NavBar
    },
    methods:{
        titleClick(index){
            this.currentIndex=index;
            this.$emit('titleClick',index)
        },
        backClick(){
            // this.$router.go(-1)
            this.$router.back();
        }
    }
}
</script>
<style scoped>
.nav-bar{
    position: relative;
    z-index: 2;
    background-color: #fff;
}
.title{
    display: flex;
    font-size: 1;
}
.title-item{
flex:13px;
}
.active{
    color:red
}
.back img{
margin-top: 10px;
}
</style>