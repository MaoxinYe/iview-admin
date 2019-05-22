<template>
  <div>

    <Card>
      <p>文件列表</p>
      <tables ref="tables" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
<!--      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>-->
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
          { title: '文件id', key: 'id', sortable: true },
          { title: '文件名', key: 'name'},
          { title: '创建时间', key: 'create_time' },
          {
            title: 'Action',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('Poptip', {
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
              ])
            }

          }
        ],
        tableData: []
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
      }
    },
    mounted () {
      getTableData().then(res => {
        this.tableData = res.data.data.file_list
      })
    }
  }
</script>

<style>

</style>
