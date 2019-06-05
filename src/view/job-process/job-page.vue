<template>
  <div>

    <Card>
      <p>任务列表</p>
      <tables border ref="selection" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-selection-change="handleSelectRow" style="width: 100%"/>
<!--      <Button style="margin: 10px 0;" type="primary" @click="processfile">处理文件</Button>-->
    </Card>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import { getJobData ,deleteFile} from '@/api/data'
  export default {
    name: 'tables_page',
    components: {
      Tables
    },
    data () {
      return {
        columns: [
          { type: 'selection' ,maxWidth: 60,align:'center'},
          { title: '任务id', key: 'id', sortable: true,maxWidth: 90,align:'center' },
          { title: '任务名', key: 'name'},
          { title: '创建时间', key: 'create_time' },
          { title: '任务状态', key: 'status' ,
            render:(h,params)=>{
              let activityStatus = params.row.status
              if(activityStatus==null){
                activityStatus = '暂无'
              }else if(activityStatus=='READY'){
                activityStatus = '已开始'
              }else if(activityStatus =='RUNNING'){
                activityStatus = '运行'
              }else if(activityStatus =='FAILED'){
                activityStatus = '失败'
              }else{
                activityStatus = '成功'
              }
              return h('span',activityStatus)
            }},

          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div',[
                h('Button',{
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.id+'进来下载了')
                      this.$router.push({ path: '/job-page/task_page',query:{id:params.row.id} })
                    }
                  }
                }, '查看详情')
              ])
            }

          }
        ],
        tableData: [],
        selectedTableData: []
      }
    },
    methods: {
      handleDelete (params) {
        console.log(params)
      },
      exportExcel () {
        this.$refs.tables.exportCsv({
          filename: `table-${(new Date()).valueOf()}.csv`
        })
      },
      getFileList(){
        getTableData().then(res => {
          this.tableData = res.data.data.file_list
        })

      },
      deleteFile(id){
        deleteFile(id)
      },
      downloadFile(id){
        // downloadFile(id)
        let url = "/api/file/download?file_id=" + id;
        window.location.href = url;
      },
      processfile(){
        console.log('processfile')
        console.log(this.selectedTableData)
        this.selectedTableData.forEach(item=>{
          console.log(item.id)
        })

      },
      handleSelectRow(selection, index) {
        console.log('进来selectRow')
        console.log(selection,index);
        this.selectedTableData=selection
      },
    },
    mounted () {

      getJobData().then(res => {
        this.tableData = res.data.data.job_list
      })
    },
    created() {
      // console.log('打印一下param'+this.$route.query.id)
    }
  }
</script>

<style>

</style>
