<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table class="info-size" v-for="(table, index) in paramInfo.sizes" :key="index">
      <tr>
        <td v-for="(tr, indey) in table" :key="indey">{{tr}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td >{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailParamInfo",
    props: {
		  paramInfo: {
		    type: Object,
        default() {
		      return {}
        }
      }
    }
	}
</script>

<style scoped>
.param-info{
  border-top: 1px solid rgba(100,100,100,.1);
}
.param-info table {
    width: 100%;
    border-collapse: collapse;
  }
  .param-info table tr {
    height: 40px;
  }
  .param-info table tr {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
.info-size tr,.info-param tr{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
}
.info-size tr td:not(:first-child){
    color: #eb4868;
}
.info-param tr td:first-child{
  padding-right: 30px;
  width: 120px;
}
.info-param tr td:nth-child(2){
 width: 98px;
 text-align: center;
}
  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>
