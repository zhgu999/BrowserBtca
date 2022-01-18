<template>
  <div class="hello">  
    <!-- table 列表数据 -->
    <el-table 
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="height"
        label="高度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="reward_address"
        label="广播方"
        width="180">
      </el-table-column>
      <el-table-column
        prop="reward_money"
        label="挖矿收益">
      </el-table-column>
      <el-table-column
        prop="time"
        label="出块时间">
      </el-table-column>
      <el-table-column
        prop="hash"
        label="块哈希">
      </el-table-column>
      <el-table-column
        prop="type"
        label="出块类型">
      </el-table-column>
    </el-table>   
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'HelloWorld',
  data1() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  //这里面放初始化数据
  data() {
    return {
     tableData: [],
     page:1, //显示第几页
     pageSize:10, //每页显示条数
     total:100, //记录总数
     maxPage:9 //最大的页面
    }
  }, 
  //这个对象里写方法（函数）
  methods: {
    
    GetList:function()
    {
        console.log('test111111111111111111');

        //这里写后台的访问接口
        var that = this;
        
        //'api/list/table' 你的接口地址
        let requestUrl = '/api/BlockList/1/20/2022-01-16'; 
        axios.get(requestUrl)
            .then(function (res) {
                console.log('22222222222222222', res);
                let data = res.data.blockList;
                console.log('33333333333333333', data);                
                that.tableData = data;//这里就是你后台返回的数据-具体的你得看你那是什么和你需要什么就怎么绑定就可以，
            })
            .catch(function (error) {
                console.log(error);
            }); 
    }

  },
  //这里用来初始化调用
  mounted() {
     this.GetList();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
