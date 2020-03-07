<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="标题"
        v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
          name="name"
          placeholder="请输入标题" />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="失物类别"
        has-feedback
      >
        <a-select
          v-decorator="[
            'selectgoods',
            {rules: [{ required: true, message: '请选择失物类别!' }]}
          ]"
          placeholder="请选择失物类别"
        >
          <a-select-option value="certificate">
            证件
          </a-select-option>
          <a-select-option value="money">
            钱财
          </a-select-option>
          <a-select-option value="goods">
            物品
          </a-select-option>
          <a-select-option value="other">
            其他
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="拾获时间"
        v-bind="formItemLayout">
        <a-date-picker
          name="LostTime"
          style="width: 100%"
          v-decorator="['date-picker', config]" />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="拾取地点"
        has-feedback
      >
        <a-select
          v-decorator="[
            'selectplace',
            {rules: [{ required: true, message: '请选择拾取地点!' }]}
          ]"
          placeholder="请选择拾取地点"
        >
          <a-select-option value="taishan">
            泰山区
          </a-select-option>
          <a-select-option value="huashan">
            华山区
          </a-select-option>
          <a-select-option value="qilin">
            启林区
          </a-select-option>
          <a-select-option value="other">
            其他
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="详细描述"
        v-bind="formItemLayout">
        <a-textarea
          rows="4"
          placeholder="请输入详细信息"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入丢失物品描述' }]}
          ]" />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="Upload"
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <a-upload
          v-decorator="['upload', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          }]"
          name="logo"
          action="/upload.do"
          list-type="picture"
        >
          <a-button>
            <a-icon type="upload" /> 点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <!--
        <a-button htmlType="submit" type="primary" >提交</a-button> !-->
        <div>
          <a-button type="primary" @click="showModal">提交</a-button>
          <a-modal
            title="表单"
            :visible="visible"
            @ok="handleSubmit"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
          >
            <p>{{ ModalText }}</p>
          </a-modal>
        </div>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
export default {
  name: 'FormLost',
  data: () => ({
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    },
    config: {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }]
    },
    visible: false,
    ModalText: '确认提交招领信息?',
    confirmLoading: false
  }),
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit  (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const today = new Date()
          const currentday = today.toLocaleDateString()
          const values = {
            ...fieldsValue,
            'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
            'owner': 'admin',
            'public-time': currentday
          }
          console.log('Received values of form: ', values)
          this.ModalText = '发布成功！'
          this.confirmLoading = true
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
          }, 1000)
        }
      })
      this.form.resetFields()
    },
    normFile  (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    showModal (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.visible = true
        }
      })
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
      this.form.resetFields()
    }
  }
}
</script>
<style>
</style>
