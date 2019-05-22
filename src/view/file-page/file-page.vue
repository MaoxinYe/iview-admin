<template>
  <div>

    <Card>
      <p>文件列表</p>
      <tables border ref="selection" v-model="tableData" :columns="columns" @on-delete="handleDelete" @on-selection-change="handleSelectRow"/>
      <Button style="margin: 10px 0;" type="primary" @click="processfile">处理文件</Button>
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
          { title: '文件id', key: 'id', sortable: true },
          { title: '文件名', key: 'name'},
          { title: '创建时间', key: 'create_time' },
          {
            title: 'Action',
            key: 'action',
            width: 150,
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
                }, '下载')
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

      getTableData().then(res => {
        this.tableData = res.data.data.file_list
      })
    },
    created() {
      // console.log('打印一下param'+this.$route.query.id)
    }
  }
</script>

<style>

</style>
