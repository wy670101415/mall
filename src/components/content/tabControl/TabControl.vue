<template>
<div class="tab-control">
<div v-for="(item,i) of titles" 
:key="i" class="tab-control-item" :class="{active:i===currentIndex}" @click="itemClick(i)">
    <span>{{item}}</span>
</div>
</div>
</template>
<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:1
        }
    },
    methods:{
        itemClick(i){
            this.currentIndex=i;
            this.$emit('tabClick',i)
        }
    }
}
</script>
<style scoped>
.tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
}
.tab-control-item{
    flex: 1;
}
.tab-control-item span{
    padding: 5px;
}
.active {
    color:var( --color-heigh-text);
    
}
.active span{
    border-bottom:3px solid red
}
</style>