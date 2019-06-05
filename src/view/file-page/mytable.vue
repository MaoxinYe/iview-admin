<template>
  <div>
    <div class="navigation">
      <p>
        <span>管理首页&nbsp;>&nbsp;应用&nbsp;>&nbsp;抢单侠>&nbsp;营销活动管理</span>
      </p>
    </div>

    <div class="clearfix contentcss">
      <div class="addactive">
        <Button type="info" @click="addType(1)" shape="circle" icon="plus-round" class="mr20">添加注册入驻活动</Button>
        <Button type="info" @click="addType(2)" shape="circle" icon="plus-round" class="mr20">添加邀请好友注册活动</Button>
        <Button type="info" @click="addType(3)" shape="circle" icon="plus-round">添加邀请充值(单笔)活动</Button>
      </div>
      <div class="left">
        <ul class="querysty">
          <li>
            <Select v-model="activityType" class="mr20" placeholder="活动类型" style="width:150px" @on-change="typeChange">
              <Option v-for="item in activityList" :value="item.value" >{{item.label}}</Option>
            </Select>
          </li>
          <li>
            <Select v-model="activityState" class="mr20" placeholder="活动状态" style="width:150px" @on-change="statusChange">
              <Option v-for="item in stateList" :value="item.value" >{{item.label}}</Option>
            </Select>
          </li>
          <li>
            <Select v-model="auditStatus" class="mr20" placeholder="审核状态" style="width:150px" @on-change="auditChange">
              <Option v-for="item in auditList" :value="item.value" >{{item.label}}</Option>
            </Select>
          </li>
          <li>
            <Button type="info" class="w100 mr20" :loading="loading3" @click="queryList(1)">
              <span v-if="!loading3">查询</span>
              <span v-else>查询</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
    <div id="application_table " class="contentcss mt10">
      <Table border highlight-row ref="selection" :columns="columns" :data="data1"></Table>
      <div class="tr mt15">
        <Page v-if="startRow!=0" :total="total" :current="startRow" :page-size="endRow" @on-change="pageChange" @on-page-size-change="pagesizechange" show-sizer show-total></Page>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        activityType:'',
        activityList:[
          {value:1,label:'注册入驻'},
          {value:2,label:'邀请好友注册'},
          {value:3,label:'邀请充值'}
        ],
        activityState:'',
        stateList:[
          {value:0,label:'未停止'},
          {value:1,label:'已停止'}
        ],
        auditStatus:'',
        auditList:[
          {value:0,label:'待审核'},
          {value:1,label:'审核通过'},
          {value:2,label:'审核失败'}
        ],
        loading3:false,
        columns:[
          {
            title:'活动类型',
            key:'marketType',
            align:'center',
            minWidth:180,
            render:(h,params)=>{
              let marketType = params.row.marketType
              if(marketType=='1'){
                marketType='注册入驻'
              }else if(marketType=='2'){
                marketType='邀请好友注册'
              }else{
                marketType='邀请充值(单笔)'
              }
              return h('span',marketType)
            }
          },
          {
            title:'活动标题',
            key:'marketName',
            align:'center',
            minWidth:180,
          },
          {
            title:'活动周期',
            key:'timeType',
            align:'center',
            minWidth:180,
            render:(h,params)=>{
              return h('span',params.row.timeType=='1'?'不限时间范围':'固定时间范围')
            }
          },
          {
            title:'开始时间',
            key:'marketBeginTime',
            align:'center',
            minWidth:180,
          },
          {
            title:'结束时间',
            key:'marketEndTime',
            align:'center',
            minWidth:180,
          },
          {
            title:'添加时间',
            key:'dataCreateTime',
            align:'center',
            minWidth:180,
          },
          {
            title:'活动状态',
            key:'activityStatus',
            align:'center',
            minWidth:150,
            render:(h,params)=>{
              let activityStatus = params.row.activityStatus
              if(activityStatus==1){
                activityStatus = '未开始'
              }else if(activityStatus==2){
                activityStatus = '已开始'
              }else if(activityStatus ==3){
                activityStatus = '无效'
              }else if(activityStatus ==4){
                activityStatus = '已结束'
              }else{
                activityStatus = '已停止'
              }
              return h('span',activityStatus)
            }
          },
          {
            title:'审核状态',
            key:'auditStatus ',
            align:'center',
            minWidth:150,
            render:(h,params)=>{
              let auditStatus = params.row.auditStatus
              if(auditStatus == 0){
                auditStatus = '待审核'
              }else if(auditStatus ==1){
                auditStatus = '审核通过'
              }else{
                auditStatus='审核失败'
              }
              return h('span',auditStatus)
            }
          },
          {
            title:'创建人',
            key:'operator',
            align:'center',
            minWidth:150,
          },
          {
            title:'操作',
            key:'',
            align:'center',
            minWidth:180,
            fixed: 'right',
            render: (h, params) => {
              let arr = []
              arr.push(
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        if(params.row.marketType==1){
                          this.$router.push({ path: './addRegistration?marketCode='+params.row.marketCode })
                        }
                        if(params.row.marketType==2){
                          this.$router.push({ path: './addInvitation?marketCode='+params.row.marketCode })
                        }
                        if(params.row.marketType==3){
                          this.$router.push({ path: './addInvitationrecharge?marketCode='+params.row.marketCode })
                        }
                      }
                    }
                  },
                  '查看'
                )
              )
              if(params.row.auditStatus=='1'&& (params.row.activityStatus=='1'||params.row.activityStatus=='2')){
                arr.push(
                  h(
                    'Button',
                    {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.stop(params.row.marketCode)
                        }
                      }
                    },
                    '停止'
                  )
                )
              }
              if(params.row.activityStatus=='3'||params.row.activityStatus=='4'||params.row.activityStatus=='5'){
                arr.push(
                  h(
                    'Button',
                    {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.delete(params.row.marketCode)
                        }
                      }
                    },
                    '删除'
                  )
                )
              }
              return h('div',arr)
            }
          },
        ],
        data1:[],
        total:0,
        startRow:1,
        endRow:10,
      }
    },
    methods:{
      //活动类型
      typeChange(activityType){
        this.activityType = activityType
      },
      //活动状态
      statusChange(activityState){
        this.activityState = activityState
      },
      //审核状态
      auditChange(auditStatus){
        this.auditStatus = auditStatus
      },
      //添加活动
      addType(num){
        if(num==1){
          this.$router.push('/addRegistration')
        }else if(num==2){
          this.$router.push('/addInvitation')
        }else{
          this.$router.push('/addInvitationrecharge')
        }
      },
      //分页
      pageChange(pagenumber){
        this.startRow = pagenumber
        this.queryList(pagenumber)
      },
      pagesizechange(pagesize){
        this.startRow = 1
        this.endRow = pagesize
        this.queryList(this.startRow)
      },
      //停止
      stop(marketCode){
        this.$Modal.confirm({
          title: '温馨提示',
          content: '<p>确认停止该活动？</p>',
          onOk: () => {
            this.http.post(BASE_URL+"后台接口?marketCode="+marketCode).then(data=>{
              if(data.code == 'success'){
                this.$Message.info('成功停止该活动');
                this.queryList(1)
              } else {
                this.$Message.info(data.message);
              }
            }).catch(err=>{
              console.log(err)
            })

          },
          onCancel: () => {
          }
        })
      },
      //删除
      delete(marketCode){
        this.$Modal.confirm({
          title: '温馨提示',
          content: '<p>确认删除该活动？</p>',
          onOk: () => {
            this.http.post(BASE_URL+"后台接口?marketCode="+marketCode).then(data=>{
              if(data.code == 'success'){
                this.$Message.info('成功删除该活动');
                this.queryList(1)
              } else {
                this.$Message.info(data.message);
              }
            }).catch(err=>{
              console.log(err)
            })

          },
          onCancel: () => {
          }
        })
      },
      //查询
      queryList(startRow){
        this.loading3 = true;
        let data = {
          pageNum: startRow,
          pageSize: this.endRow,
          marketType:this.activityType,
          auditStatus:this.auditStatus,
          marketStatus:this.activityState,
        }
        this.http.post(BASE_URL+'后台接口',data)
          .then(data=>{
            if(data.code == 'success'){
              this.loading3 = false;
              this.data1 = data.data.dataList;
              this.total = data.data.total;
              this.startRow1 =
                Math.ceil(data.data.startRow / this.endRow) == 0
                  ? 1
                  : Math.ceil(data.data.startRow / this.endRow);
            } else {
              this.loading3 = false;
            }
          })
      }
    },
    mounted(){
      this.queryList(1)
    }
  }
</script>
<style lang="less" scoped>
  .addactive{
    margin-bottom:40px;
  }
</style>
