<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" v-model="datalist">
      <a-form-item
        label="新密码"
        v-bind="formItemLayout">
        <a-input-password
          name="newPsg"
          v-model="datalist.newPsg"
          placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item
        label="确认新密码"
        v-bind="formItemLayout">
        <a-input-password
          name="confirmPsg"
          v-model="datalist.confirmPsg"
          placeholder="请再次输入新密码" />
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <div>
          {{ this.errmsg }}
        </div>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <div>
          <a-button type="primary" @click="showModal">确认修改</a-button>
          <a-modal
            title="修改密码"
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
  name: 'FormFound',
  data: () => ({
    visible: false,
    ModalText: '确认修改?',
    confirmLoading: false,
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    },
    errmsg: '',
    msgid: 1,
    datalist: {
      newPsg: null,
      confirmPsg: null
    }
  }),
  methods: {
    handleSubmit  (e) {
      const values = {
        password: this.datalist.newPsg,
        userID: store.getters.userID,
        type: 'updateStudentPsw'
      }
      console.log(values)
      this.axios.post('postUserInfo', values).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
      this.ModalText = '修改成功！'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    showModal (e) {
      if (this.datalist.newPsg !== null && this.datalist.confirmPsg !== null) {
        if (this.datalist.newPsg === this.datalist.confirmPsg) {
          this.visible = true
        } else {
          this.errmsg = '密码不一致！'
          this.datalist.newPsg = null
          this.datalists.confirmPsg = null
        }
      } else {
        this.errmsg = '密码不能为空！'
        this.datalist.newPsg = null
        this.datalist.confirmPsg = null
      }
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
