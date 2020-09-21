import {debounce} from './utlis'
export const itemListener={
    data(){
        return{
            detailitem:null
        }
    },
    mounted(){
        const refresh=debounce(this.$refs.scroll.refresh,200);
    this.detailitem=()=>{refresh()}
    this.$bus.$on('itemImgLoad', this.detailitem)
    console.log('我是mixinjs中的混入')
    }
}