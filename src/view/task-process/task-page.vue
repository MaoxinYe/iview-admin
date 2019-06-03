<template>
  <div>

    <Card>
      <p>文件列表</p>
      <tables border ref="selection" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-selection-change="handleSelectRow"/>
      <Button style="margin: 10px 0;" type="primary" @click="processfile">处理文件</Button>
      <Modal
        v-model="modal1"
        title="当前任务状态"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>处理到第三个算法</p>
        <a>点我下载第一次结果</a>
        <br>
        <a>点我下载第二次结果</a>
        <br>

      </Modal>
    </Card>
  </div>
</template>

<script>
  import Tables from '_c/tables'
  import { getTableData ,deleteFile} from '@/api/data'
  export default {
    name: 'tables_page',
    components: {
      Tables
    },
    data () {
      return {
        columns: [
          { type: 'selection' },
          { title: '任务id', key: 'id', sortable: true },
          { title: '任务名', key: 'name'},
          { title: '任务状态', key: 'status' },
          { title: '创建时间', key: 'create_time' },

          {
            title: '操作',
            key: 'action',
            width: 500,
            align: 'center',
            render: (h, params) => {
              return h('div',[
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': () => {
                      console.log(params.row.id)
                      deleteFile(params.row.id)
                      this.$router.go(0)
                      // vm.$emit('on-delete', params)
                      // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                    }
                  }
                }, [
                  h('Button',{
                    props: {
                      type: 'error',
                      size: 'small'
                    }
                  }, '删除')
                ]),
                h('Button',{
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.id+'进来下载了')
                      this.downloadFile(params.row.id)
                    }
                  }
                }, '下载'),
                h('Button',{
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.id+'进来下载了')
                      this.downloadFile(params.row.id)
                    }
                  }
                }, '暂停'),
                h('Button',{
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // console.log(params.row.id+'进来下载了')
                      // this.downloadFile(params.row.id)
                      this.modal1 = true
                    }
                  }
                }, '查看状态'),

              ])
            }

          }
        ],
        tableData: [{
          "id": 1,
          "name": '卫星任务',
          "status": '第三个算法处理中',
          "create_time": '2019-5-30'
        }],
        selectedTableData: [],
        modal1:false
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
        // getTableData().then(res => {
        //   this.tableData = res.data.data.file_list
        // })
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

      // getTableData().then(res => {
      //   this.tableData = res.data.data.file_list
      // })
    },
    created() {
      // console.log('打印一下param'+this.$route.query.id)
    }
  }
</script>

<style>

</style>
