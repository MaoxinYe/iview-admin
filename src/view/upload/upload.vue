<template>
  <div>
<!--    <Upload action="handleAction" >-->
<!--      <Button icon="ios-cloud-upload-outline">上传Csv文件</Button>-->
<!--      &nbsp;&nbsp;&nbsp;&nbsp;点击上传Csv文件-->
<!--    </Upload>-->
    <div>
      <Upload
        ref="upload"
        :before-upload="handleUpload"
        action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
      </Upload>
      <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
    </div>
<!--    <Row>-->
<!--      <i-col span="12">-->
<!--        <Card>-->
<!--          <div class="cropper-example cropper-first">-->
<!--            <cropper-->
<!--              :src="exampleImageSrc"-->
<!--              crop-button-text="确认提交"-->
<!--              @on-crop="handleCroped"-->
<!--            ></cropper>-->
<!--          </div>-->
<!--        </Card>-->
<!--      </i-col>-->
<!--    </Row>-->
  </div>
</template>

<script>
  import Cropper from '@/components/cropper'
  import { uploadImg } from '@/api/data'
  export default {
    data () {
      return {
        file: null,
        loadingStatus: false
      }
    },
    methods: {
      handleUpload (file) {
        this.file = file;
        return false;
      },
      upload () {
        this.loadingStatus = true;
        const formData = new FormData()
        formData.append('file', this.file)
        uploadImg(formData).then(() => {
                  this.$Message.success('Upload success~')
          this.loadingStatus=false
                })
        // this.$refs.upload.post(this.file);
      }
    }
  }
  // export default {
  //   name: 'cropper_page',
  //   components: {
  //     Cropper
  //   },
  //   data () {
  //     return {
  //       exampleImageSrc: ''
  //     }
  //   },
  //   methods: {
  //     handleCroped (blob) {
  //       const formData = new FormData()
  //       formData.append('file', blob)
  //       uploadImg(formData).then(() => {
  //         this.$Message.success('Upload success~')
  //       })
  //     },
  //     handleAction (file){
  //
  //     }
  //   }
  // }
</script>

<style lang="less">
  .cropper-example{
    height: 400px;
  }
</style>

