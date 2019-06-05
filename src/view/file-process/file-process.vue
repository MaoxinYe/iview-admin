<template>
  <Card>

    <Form label-position="left" :label-width="100">
      <FormItem label="文件列表">
        <Select @on-change="getFileValue"   style="width:260px">
          <Option v-for="item in fileList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="算法列表">
        <Select @on-change="getMethodValue"   multiple style="width:260px">
          <Option v-for="item in methodList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="任务名称">
        <Input v-model="processForm.job_name" placeholder="任务名称" style="width:260px"></Input>
      </FormItem>
      <Button type="primary" @click="modal1 = true">处理任务</Button>
      <Modal
        v-model="modal1"
        title="确定提交吗"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>这是你选的文件 {{processForm.file_id}}</p>
        <p>这是你选的算法 {{processForm.methods}}</p>
        <p>这是你设置的名称 {{processForm.job_name}}</p>
      </Modal>
    </Form>

<!--    <Select @on-change="getItemValue" v-model="model10" multiple style="width:260px">-->
<!--      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
<!--    </Select>-->
<!--    <p>当前正在进行第 {{ current + 1 }} 步</p>-->
<!--    <Steps :current="current">-->
<!--      <Step title="步骤1" ></Step>-->
<!--      <Step title="步骤2"></Step>-->
<!--      <Step title="步骤3"></Step>-->
<!--      <Step title="步骤4"></Step>-->
<!--    </Steps>-->
<!--    <Button type="primary" @click="add">下一步</Button>-->
  </Card>
</template>

<script>
  import { getTableData , getMethodData, fileProcess} from '@/api/data'
    export default {
        name: "file-process",
      data () {
        return {
          fileList: [],
          methodList: [],
          processForm: {
            "file_id": undefined,
            "job_name": "",
            "methods": []
          },
          model10: [],
          //这个可以用来预设选中了那些文件
          modal1: false,
          current:0
        }
      },
      methods:{
        getItemValue(val){
          console.log('打印一下val')

          console.log(val)

          // console.log('---------')
          // this.model10=val
          //console.log(this.model10)
        },
        getFileValue(val){
          this.processForm.file_id=val
          // console.log('---------')
          // this.model10=val
          //console.log(this.model10)
        },
        getMethodValue(val){
          this.processForm.methods=val

          // console.log('---------')
          // this.model10=val
          //console.log(this.model10)
        },
        ok () {
          fileProcess(this.processForm).then(() => {
            this.$Message.info('提交成功');
          },() => {
            this.$Message.info('提交失败');
          })
        },
        cancel () {
          this.$Message.info('取消了');
        },
        add()
        {
          this.current++
        }
      },
      mounted() {
        this.model10=[]
        getTableData().then(res => {
          this.fileList = res.data.data.file_list
        })
        getMethodData().then(res => {
          this.methodList = res.data.data.algo_configs

        })
      },
      created() {
        console.log('打印一下param'+this.$route.query.id)
      }
    }
</script>

<style scoped>

</style>
