<template>
  <div>
<!--    <Upload action="handleAction" >-->
<!--      <Button icon="ios-cloud-upload-outline">上传Csv文件</Button>-->
<!--      &nbsp;&nbsp;&nbsp;&nbsp;点击上传Csv文件-->
<!--    </Upload>-->
    <Row>
      <i-col span="12">
        <Card>
          <div class="cropper-example cropper-first">
            <cropper
              :src="exampleImageSrc"
              crop-button-text="确认提交"
              @on-crop="handleCroped"
            ></cropper>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import Cropper from '@/components/cropper'
  import { uploadImg } from '@/api/data'
  export default {
    name: 'cropper_page',
    components: {
      Cropper
    },
    data () {
      return {
        exampleImageSrc: ''
      }
    },
    methods: {
      handleCroped (blob) {
        const formData = new FormData()
        formData.append('file', blob)
        uploadImg(formData).then(() => {
          this.$Message.success('Upload success~')
        })
      },
      handleAction (file){

      }
    }
  }
</script>

<style lang="less">
  .cropper-example{
    height: 400px;
  }
</style>

