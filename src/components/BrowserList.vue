<template>
  <div class="hello">  
  <el-container style="height: 100%">
    <el-header style="height:80px">
      <div class="div-headercontent">区 块 浏 览 器</div>
    </el-header>
<el-main>
  <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="区块信息" name="first">
        <!-- 查询条件 -->
        <div class="div-search1" >
          <el-date-picker
            v-model="value1"
            align="right"
            type="date"
            placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="btn_click1('pg1')">搜索</el-button>
        </div>  

        <!-- 获取区块信息 table 列表数据 -->
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

      <el-pagination
      background
      layout="total, prev, pager, next"
      :current-page="tablePage.pageNum"
      :page-size="tablePage.pageSize"
      :total="tablePage.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />

      </el-tab-pane>
      <el-tab-pane label="出块统计" name="second">
        <div class="div-search1">
          <el-date-picker id="dpDate"
            v-model="value2"
            align="right"
            type="month"
            placeholder="选择月" format="yyyy-MM" value-format="yyyy-MM">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="btn_click2('pg2')">搜索</el-button>
        </div>
        <!-- 出块统计 table 列表数据 -->
        <el-table 
          :data="dtPieceStatistical"         
          style="width: 100%">
          <el-table-column
            prop="time"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="count"
            label="出块数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额统计">
          </el-table-column>
        </el-table> 
      </el-tab-pane>
      <el-tab-pane label="持仓排行" name="third">持仓排行</el-tab-pane>
      </el-tabs>
</el-main>
 
    
    <!-- 底栏 -->
    <el-footer style="height:80px;">浏览器 2022</el-footer>
  </el-container>
  </div>

</template>

<script>
const axios = require('axios');
export default {
  name: 'HelloWorld11',
  data1() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  //这里面放初始化数据
  data() {
    return {
     activeName: 'first',
     tableData: [],
     tablePage: {
        pageNum: 1, // 第几页
        pageSize: 10, // 每页多少条
        total: 0 // 总记录数
      },
      //pageSizes: [5, 10, 15],

     dtPieceStatistical: [],
     value1:'',
     value2:'',
     pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
    }
  }, 
  created() {
        
  },

  //这里用来初始化调用
  mounted() {
    this.initData({});
     
     let dateValue1 = this.value1;
     this.GetBlockList(dateValue1);

     let dateValue2 = this.value2.replace('-','/');
     this.GetPieceStatisticalList(dateValue2);
  },

  //这个对象里写方法（函数）
  methods: {
    
    //菜单点击事件
    handleClick(tab, event) {
        console.log(tab, event);
    },
    GetBlockList:function(pDate)
    {
        console.log('test111111111111111111');

        //这里写后台的访问接口
        var that = this;
        
let param = {
        pageNum: this.tablePage.pageNum,
        pageSize: this.tablePage.pageSize
      }

        //'api/list/table' 你的接口地址
console.log('88888888888', pDate);
        let requestUrl = '/api/BlockList/' + that.tablePage.pageNum + '/'+ that.tablePage.pageSize +'/' + pDate; 
        axios.get(requestUrl)
            .then(function (res) {
                console.log('BlockList22222', res);
                let data = res.data.blockList;
                console.log('BlockList33333', data);                
                that.tableData = data;//这里就是你后台返回的数据-具体的你得看你那是什么和你需要什么就怎么绑定就可以，
                that.tablePage.total = res.data.blockTotal; 
                
                console.log('999999999999999', res.data.blockTotal);    
                
            })
            .catch(function (error) {
                console.log(error);
            }); 
    },
    GetPieceStatisticalList:function(pDate)
    {
        console.log('test111111111111111111',pDate); 

        //这里写后台的访问接口
        var that = this;
        
        //'api/list/table' 你的接口地址
        let requestUrl = '/api/BlockStatistics/' + pDate; 
        axios.get(requestUrl)
            .then(function (res) {
                console.log('22222222222222222', res);
                let data = res.data;
                console.log('33333333333333333', data);                
                that.dtPieceStatistical = data;//这里就是你后台返回的数据-具体的你得看你那是什么和你需要什么就怎么绑定就可以，
            })
            .catch(function (error) {
                console.log(error);
            }); 
    },
    initData:function() {
      //获取当前时间
      var now   = new Date();
      var monthn = now.getMonth()+1;
      var yearn  = now.getFullYear();
      var dayn = now.getDate();
      this.value1 = yearn+"-"+monthn+"-"+dayn; 
      this.value2 = yearn+"-"+monthn;  
    },
    btn_click1: function (pg_num) {
                let dateValue = this.value1; //.replace('-','/').replace('-','/');
                console.log('77777777',dateValue);
                this.GetBlockList(dateValue); 
                this.pg = pg_num;     
    },
    btn_click2: function (pg_num) {
                 //console.log('666666666',this.value2.split('-')[1]);
                 //let monthValue = this.value2.split('-')[1];
                 let dateValue = this.value2.replace('-','/'); 
                 this.GetPieceStatisticalList(dateValue); 
                this.pg = pg_num;

    },
    handlePageChange(currentPage) {
      // 在此刷新数据
      this.tablePage.pageNum = currentPage;
      this.GetBlockList(this.value1);
      
    },
    handleSizeChange(pageSize) {
      this.tablePage.pageSize = pageSize
      // 在此刷新数据
    },
  }
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
.el-header {
   background-color: #008EFF;
}
.el-main {
  min-height: 1000px;
}
.el-footer {
  background-color: #008EFF;
  color: white;
  text-align: left; 
}
.div-search1{
  text-align: left;
}
.div-headercontent{
  color:white;
  text-align: left;
  margin: 25px 0px 0px 30px;
  font-size:20px; 
  font-family: Arial, Helvetica, sans-serif;
}
</style>
