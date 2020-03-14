<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="标题"
        v-bind="formItemLayout">
        <a-input
          v-decorator="[
            'title',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
          name="title"
          placeholder="请输入标题" />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="失物类别"
        has-feedback
      >
        <a-select
          v-decorator="[
            'sort',
            {rules: [{ required: true, message: '请选择失物类别!' }]}
          ]"
          placeholder="请选择失物类别"
        >
          <a-select-option value="证件">
            证件
          </a-select-option>
          <a-select-option value="钱财">
            财物
          </a-select-option>
          <a-select-option value="书本">
            书本
          </a-select-option>
          <a-select-option value="其他">
            其他
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="丢失时间"
        v-bind="formItemLayout">
        <a-date-picker
          name="losttime"
          style="width: 100%"
          v-decorator="['losttime', config]" />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="丢失地点"
        has-feedback
      >
        <a-select
          v-decorator="[
            'place',
            {rules: [{ required: true, message: '请选择拾取地点!' }]}
          ]"
          placeholder="请选择拾取地点"
        >
          <a-select-option value="泰山区">
            泰山区
          </a-select-option>
          <a-select-option value="华山区">
            华山区
          </a-select-option>
          <a-select-option value="启林区">
            启林区
          </a-select-option>
          <a-select-option value="其他">
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
        label="图片"
        v-bind="formItemLayout">
        <a-input
          name="picture"
          v-decorator="[
            'picture',
            {rules: [{ required: false, message: '请输入图片url（可不填）' }]}
          ]"
          placeholder="请输入图片url（可不填）" />
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
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
import store from '@/store'
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
          const values = {
            ...fieldsValue,
            'losttime': fieldsValue['losttime'].format('YYYY-MM-DD'),
            'publicid': store.getters.userID,
            'status': '寻找中'
          }
          this.axios.post('addlostform', values).then((res) => {
            console(res)
          }).catch((err) => {
            console.log(err)
          })
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
