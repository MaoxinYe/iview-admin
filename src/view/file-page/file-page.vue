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
  import { getTableData ,deleteFile,downloadFileById} from '@/api/data'
  import axios from 'axios'
  import jquery from 'jquery'
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
                      this.downloadFile(params.row.url)
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
        //这里可以添加一个如果是dir的话就不显示
      },
      deleteFile(id){
        deleteFile(id)
      },
      downloadFile(file_url){
        var form = jquery("<form>");//定义一个form表单
        form.attr("id", "downloadform");
        form.attr("style", "display:none");//将表单隐藏
        form.attr("target", "");
        form.attr("method", "post");
        form.attr("action", '/api/file/download');

        var input1 = jquery("<input>");
        input1.attr("type", "hidden");
        input1.attr("name", "file_url");
        input1.attr("value", file_url);
        //如果有多个参数，参照上面input1 的写法

        form.append(input1);//一定要把参数添加到form里
        jquery("body").append(form);//将表单放置在页面中
        form.submit();//表单提交
        jquery("#downloadform").remove();//移除表单
        // axios({ // 用axios发送post请求
        //   method: 'post',
        //   url: '/api/file/download', // 请求地址
        //   data: {file_url}, // 参数
        //   responseType: 'blob' // 表明返回服务器返回的数据类型
        // }).then((res) => res.blob())

        // downloadFileById(file_url).then(res => res.blob())
        //   .then(data => {
        //     let blobUrl = window.URL.createObjectURL(data);
        //     this.download(blobUrl);
        //   })
        // let url = "/api/file/download?file_id=" + id;
        // window.location.href = url;
      },
     // download(blobUrl) {
     //  const a = document.createElement('a');
     //  a.style.display = 'none';
     //  a.download = '导出的文件名';
     //  a.href = blobUrl;
     //  a.click();
     //  document.body.removeChild(a);
     //  },
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
        console.log(res)
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
