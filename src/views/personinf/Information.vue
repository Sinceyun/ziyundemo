<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" v-model="form">
      <a-form-item
        label="姓名"
        v-bind="formItemLayout">
        <a-input
          name="name"
          v-model="form.name"
          :placeholder="form.name" />
      </a-form-item>
      <a-form-item
        label="联系电话"
        v-bind="formItemLayout">
        <a-input
          name="phone"
          v-model="form.phone"
          placeholder="请输入手机号码" />
      </a-form-item>
      <a-form-item
        label="邮箱"
        v-bind="formItemLayout">
        <a-input
          name="email"
          v-model="form.email"
          placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item
        label="职务"
        v-bind="formItemLayout">
        <a-input
          name="profession"
          v-model="form.profession"
          placeholder="请输入职务" />
      </a-form-item>
      <a-form-item
        v-bind="formItemLayout"
        label="校区"
        has-feedback
      >
        <a-select
          v-model="form.selectplace"
          placeholder="请选择校区"
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
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <div>
          <a-button type="primary" @click="showModal">确认修改</a-button>
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
  name: 'FormFound',
  data: () => ({
    visible: false,
    ModalText: '确定修改??',
    confirmLoading: false,
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    },
    currentStatus: '寻找中...',
    msgid: 1,
    form: {
      name: 'admin',
      phone: '15888208820',
      profession: '管理员',
      selectplace: '其他',
      email: ''
    }
  }),
  methods: {
    handleSubmit  (e) {
      console.log(this.form)
      this.ModalText = '修改成功！'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    showModal (e) {
      this.visible = true
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
