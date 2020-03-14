<template>
  <a-tabs @change="callback" type="card">
    <a-tab-pane tab="接收" key="1">
      <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
        <a-row :gutter="16">
        </a-row>
        <a-list
          itemLayout="horizontal"
          size="small"
          :pagination="pagination"
          :dataSource="listDataReceive"
        >
          <a-list-item slot="renderItem" slot-scope="item" key="item.id">
            <template slot="actions"><a-popconfirm
              title="确定删除?"
              @confirm="() => onDeleteReceive(item.id)">
              <a href="#">delete</a>
            </a-popconfirm></template>
            <a-list-item-meta
              :description="item.time"
              :title="item.sendid"
            >
            </a-list-item-meta>
            <div>
              <b>{{ item.msg }}</b>
            </div>
            <!-- <template slot="action">
              <a-popconfirm
                title="确定删除?"
                @confirm="() => onDelete(item.id)">
                <a href="#">删除</a>
              </a-popconfirm>
            </template> -->
          </a-list-item>
        </a-list>
      </a-card>
    </a-tab-pane>
  <!--
    <a-tab-pane tab="已找到" key="2">
      <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
        <a-row :gutter="16">
        </a-row>
        <a-list
          itemLayout="vertical"
          size="small"
          :pagination="pagination"
          :dataSource="listDataFounded"
        >
          <a-list-item slot="renderItem" slot-scope="item, index" key="item.id">
            <img slot="extra" width="150" alt="logo" :src="item.picturesrc"/>
            <a-list-item-meta
              :description="item.currentStatus"
              :title="item.title"
            >
            </a-list-item-meta>
            <div>
              <div>
                <span>发布时间：{{ item.publicTime }}</span>
                <span>编号：{{ item.id }}</span>
              </div>
              <b>{{ item.content }}</b>
              <div>拾获时间：{{ item.foundTime }}</div>
              <div>丢失地点：{{ item.foundplace }}</div>
              <div>失物类别：{{ item.foundsort }}</div>
            </div>
            <template>
              <a-button type="primary" @click="deleteLostForm2(index)">删除</a-button>
            </template>
          </a-list-item>
        </a-list>
      </a-card>
    </a-tab-pane> -->
  </a-tabs>
</template>

<script>
export default {
  data () {
    return {
      listDataSendMsg: [],
      listDataReceive: [],
      currentPage: 1,
      pagination: {
        onChange: (page) => {
          this.currentPage = page
          console.log(page)
        },
        pageSize: 5
      },
      form: this.$form.createForm(this)
    }
  },
  mounted: function () {
    const params = { receiveid: 'admin' }
    this.axios.get('/getMsg', { params }).then((res) => {
      const ld = res
      for (let i = 0; i < ld.length; i++) {
        res[i].id = i
      }
      this.listDataReceive = ld
      console.log(this.listDataReceive)
    })
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    onDeleteReceive (id) {
      const oj = this.listDataReceive.find(oj => oj.id === id)
      const idx = this.listDataReceive.indexOf(oj)
      console.log(idx)
    },
    deleteLostForm (index) {
      console.log('数组下标：' + ((this.currentPage - 1) * 5 + index))
      this.listDataFounding.splice((this.currentPage - 1) * 5 + index, 1)
      this.axios.get('login').then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteLostForm2 (index) {
      console.log('数组下标：' + ((this.currentPage - 1) * 5 + index))
      this.listDataFounded.splice((this.currentPage - 1) * 5 + index, 1)
    },
    foudingToFounded (index) {
      console.log('数组下标：' + ((this.currentPage - 1) * 5 + index))
      const formoj = this.listDataFounding[(this.currentPage - 1) * 5 + index]
      formoj.currentStatus = '已找到'
      console.log(formoj)
      this.listDataFounding.splice((this.currentPage - 1) * 5 + index, 1)
      this.listDataFounded.push(formoj)
    }
  }
}
</script>
