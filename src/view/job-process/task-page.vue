<template>
  <div>

    <Card>
      <p>任务{{job_name}}的task列表</p>
      <tables border ref="selection" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-selection-change="handleSelectRow"/>
      <!--      <Button style="margin: 10px 0;" type="primary" @click="processfile">处理文件</Button>-->

    </Card>
    <Modal v-model="modal11" title="task结果界面">

      <ul>
        <div v-for="item in taskFileList">
          <li v-if="item.type==='DIRECTORY'" @click="getTaskFileListByUrl(item.url)">{{item.url.substring(item.url.lastIndexOf('/'))}}</li>
          <li v-else @click="downloadFile(item.url)">{{item.url.substring(item.url.lastIndexOf('/'))}}</li>
        </div>
<!--        <li  @click="downloadFile(item.url)">{{item.url.substring(item.url.lastIndexOf('/'))}}</li>-->
      </ul>
    </Modal>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import jquery from 'jquery'
  import { getTaskDataByID ,deleteFile, getTaskFileList} from '@/api/data'
  export default {
    name: 'tables_page',
    components: {
      Tables
    },
    data () {
      return {
        modal11:false,
        taskFileList:[],
        columns: [
          { type: 'selection' },
          { title: '任务id', key: 'id', sortable: true ,sortType: 'asc'},
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
              let activityStatus=params.row.status
              console.log(activityStatus)
              if(activityStatus=='SUCCEEDED')
              return h('div',[
                h('Button',{
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // console.log(params.row.id+'进来下载了')
                        getTaskFileList(params.row.output_dir).then(res => {
                          // console.log('进入gettaskfile')
                          // console.log(res)
                          this.taskFileList=res.data.data
                          // for( let i=0;i<this.taskFileList.length;i++)
                          //   this.taskFileList[i]=(this.taskFileList[i].substring(this.taskFileList[i].lastIndexOf('/')))
                        })

                      console.log(this.taskFileList)
                        this.modal11=true;

                    }
                  }
                }, '查看结果')
              ])
              else
                return h('div',[
                  h('Button',{
                    props: {
                      type: 'primary',
                      size: 'small',
                      disabled: true
                    }
                  }, '下载结果')
                ])
            }

          }
        ],
        tableData: [],
        selectedTableData: [],
        job_name: undefined
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
        var form = jquery("<form>");//定义一个form表单
        form.attr("id", "downloadform");
        form.attr("style", "display:none");//将表单隐藏
        form.attr("target", "");
        form.attr("method", "post");
        form.attr("action", '/api/file/download');

        var input1 = jquery("<input>");
        input1.attr("type", "hidden");
        input1.attr("name", "file_url");
        input1.attr("value", id);
        //如果有多个参数，参照上面input1 的写法

        form.append(input1);//一定要把参数添加到form里
        jquery("body").append(form);//将表单放置在页面中
        form.submit();//表单提交
        jquery("#downloadform").remove();//移除表单
        // let url = "/api/file/download?file_id=" + id;
        // window.location.href = url;
      },
      processfile(){
        console.log('processfile')
        console.log(this.selectedTableData)
        this.selectedTableData.forEach(item=>{
          console.log(item.id)
        })

      },
      getTaskFileListByUrl(url) {
        getTaskFileList(url).then(res => {
          // console.log('进入gettaskfile')
          // console.log(res)
          this.taskFileList=res.data.data
          // for( let i=0;i<this.taskFileList.length;i++)
          //   this.taskFileList[i]=(this.taskFileList[i].substring(this.taskFileList[i].lastIndexOf('/')))
        })
        this.modal11=true;
      },
      handleSelectRow(selection, index) {
        console.log('进来selectRow')
        console.log(selection,index);
        this.selectedTableData=selection
      },
    },
    mounted () {

      getTaskDataByID(this.$route.query.id).then(res => {
        this.tableData = res.data.data.job_status.tasks
        this.job_name=res.data.data.job_status.name
      })
    },
    created() {
      // console.log('打印一下param'+this.$route.query.id)
    }
  }
</script>

<style>
  li:hover{
    text-decoration: underline;
    cursor:pointer
  }
</style>
