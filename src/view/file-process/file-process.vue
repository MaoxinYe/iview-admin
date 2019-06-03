<template>
  <Card>

    <Form label-position="left" :label-width="100">
      <FormItem label="文件列表">
        <Select @on-change="getItemValue" v-model="model10" multiple style="width:260px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="算法列表">
        <Select @on-change="getItemValue"   multiple style="width:260px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <Button type="primary" @click="modal1 = true">处理任务</Button>
      <Modal
        v-model="modal1"
        title="确定提交吗"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>这是你选的文件</p>
        <p>这是你选的算法</p>
      </Modal>
    </Form>

<!--    <Select @on-change="getItemValue" v-model="model10" multiple style="width:260px">-->
<!--      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
<!--    </Select>-->
    <p>当前正在进行第 {{ current + 1 }} 步</p>
    <Steps :current="current">
      <Step title="步骤1" ></Step>
      <Step title="步骤2"></Step>
      <Step title="步骤3"></Step>
      <Step title="步骤4"></Step>
    </Steps>
    <Button type="primary" @click="add">下一步</Button>
  </Card>
</template>

<script>
    export default {
        name: "file-process",
      data () {
        return {
          cityList: [
            {
              value: 'New York',
              label: 'New York1'
            },
            {
              value: 'London',
              label: 'London'
            },
            {
              value: 'Sydney',
              label: 'Sydney'
            },
            {
              value: 'Ottawa',
              label: 'Ottawa'
            },
            {
              value: 'Paris',
              label: 'Paris'
            },
            {
              value: 'Canberra',
              label: 'Canberra'
            }
          ],
          model10: [],
          modal1: false,
          current:0
        }
      },
      methods:{
        getItemValue(val){
          // console.log(val)
          // console.log('---------')
          // this.model10=val
          //console.log(this.model10)
        },
        ok () {
          this.$Message.info('Clicked ok');
        },
        cancel () {
          this.$Message.info('Clicked cancel');
        },
        add()
        {
          this.current++
        }
      },
      mounted() {
        this.model10=['New York','London']
      },
      created() {
        console.log('打印一下param'+this.$route.query.id)
      }
    }
</script>

<style scoped>

</style>
