<template>
  <div class="hello">  
    <!-- table 列表数据 -->
    <el-table 
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
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
     tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]//这里你不用他的就写空[]
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
        axios.get('/api/releationByUpper/1632srrskscs1d809y3x5ttf50f0gabf86xjz2s6aetc9h9ewwhm58dj3')
            .then(function (res) {
              console.log('22222222222222222222', res);
                let data = res.data;
                console.log('res', res)
                console.log('333333333333333', data);
                
                   that.tableData = data;//这里就是你后台返回的数据-具体的你得看你那是什么和你需要什么就怎么绑定就可以，
                   console.log('44444444444444444444', that.tableData); 
                
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
