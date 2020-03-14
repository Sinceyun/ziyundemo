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
        label="专业"
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
          v-model="form.zone"
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
import store from '@/store'
export default {
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
      name: '',
      phone: '',
      email: '',
      zone: '',
      profession: ''
    }
  }),
  mounted: function () {
    var params = { userID: store.getters.userID, type: 'getStudentInfo' }
    this.axios.get('getUserInfo', { params }).then((res) => {
      const oj = res
      console.log(oj)
      this.form.profession = oj[0].profession
      this.form.name = oj[0].name
      this.form.phone = oj[0].phone
      this.form.email = oj[0].email
      this.form.userID = oj[0].userID
      this.form.zone = oj[0].zone
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    handleSubmit  (e) {
      const values = {
        userID: this.form.userID,
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
        profession: this.form.profession,
        zone: this.form.zone,
        type: 'updateStudentInfo'
      }
      this.axios.post('postUserInfo', values).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
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
