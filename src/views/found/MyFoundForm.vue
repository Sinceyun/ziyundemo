<template>
  <a-tabs @change="callback" type="card">
    <a-tab-pane tab="寻找中" key="1">
      <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
        <a-row :gutter="16">
        </a-row>
        <a-list
          itemLayout="vertical"
          size="small"
          :pagination="pagination"
          :dataSource="listDataFinding"
        >
          <a-list-item slot="renderItem" slot-scope="item" key="item.findformid">
            <img slot="extra" width="150" alt="logo" :src="item.picture"/>
            <a-list-item-meta
              :description="item.status"
              :title="item.title"
            >
            </a-list-item-meta>
            <div>
              <div>
                <span>发布时间：{{ item.publictime }}</span>
              </div>
              <b>{{ item.description }}</b>
              <div>拾获时间：{{ item.findtime }}</div>
              <div>丢失地点：{{ item.place }}</div>
              <div>失物类别：{{ item.sort }}</div>
              <div>编号：{{ item.findformid }}</div>
            </div>
            <template slot="actions"><a-popconfirm
              title="确定删除?"
              @confirm="() => deletefindForm(item.findformid)">
              <a href="#">删除</a>
            </a-popconfirm></template>
            <template slot="actions"><a-popconfirm
              title="更改状态?"
              @confirm="() => updatefindForm(item.findformid)">
              <a href="#">已找到</a>
            </a-popconfirm></template>
            <!-- <template>
              <a-button type="primary" @click="deleteLostForm(index)">删除</a-button>
              <a-button @click="foudingToFounded(index)">已找到</a-button>
            </template> -->
          </a-list-item>
        </a-list>
      </a-card>
    </a-tab-pane>
    <a-tab-pane tab="已找到" key="2">
      <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
        <a-row :gutter="16">
        </a-row>
        <a-list
          itemLayout="vertical"
          size="small"
          :pagination="pagination"
          :dataSource="listDataFound"
        >
          <a-list-item slot="renderItem" slot-scope="item" key="item.findformid">
            <img slot="extra" width="150" alt="logo" :src="item.picture"/>
            <a-list-item-meta
              :description="item.status"
              :title="item.title"
            >
            </a-list-item-meta>
            <div>
              <div>
                <span>发布时间：{{ item.publictime }}</span>
              </div>
              <b>{{ item.description }}</b>
              <div>拾获时间：{{ item.findtime }}</div>
              <div>丢失地点：{{ item.place }}</div>
              <div>失物类别：{{ item.sort }}</div>
              <div>编号：{{ item.findformid }}</div>
            </div>
            <template slot="actions"><a-popconfirm
              title="确定删除?"
              @confirm="() => deletefindForm2(item.findformid)">
              <a href="#">删除</a>
            </a-popconfirm></template>
            <!-- <template>
              <a-button type="primary" @click="deleteLostForm2(index)">删除</a-button>
            </template> -->
          </a-list-item>
        </a-list>
      </a-card>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      listDataFinding: [],
      listDataFound: [],
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
    var params = {
      status: '寻找中',
      publicid: store.getters.userID,
      type: 'myform'
    }
    this.axios.get('getfindform', { params }).then((res) => {
      this.listDataFinding = res
      console.log(this.listDataFinding)
    }).catch((err) => {
      console.log(err)
    })
    params = {
      status: '已找到',
      publicid: store.getters.userID,
      type: 'myform'
    }
    this.axios.get('getfindform', { params }).then((res) => {
      this.listDataFound = res
      console.log(this.listDataFound)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    deletefindForm (id) {
      const oj = this.listDataFinding.find(oj => oj.findformid === id)
      const idx = this.listDataFinding.indexOf(oj)
      this.listDataFinding.splice(idx, 1)
      console.log(oj)
      const value = {
        findformid: id,
        type: 'delete'
      }
      this.axios.post('postfindform', value).then((res) => {
        console(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    updatefindForm (id) {
      const oj = this.listDataFinding.find(oj => oj.findformid === id)
      const idx = this.listDataFinding.indexOf(oj)
      oj.status = '已找到'
      this.listDataFinding.splice(idx, 1)
      this.listDataFound.splice(0, 0, oj)
      console.log('update findform' + oj)
      const value = {
        findformid: id,
        type: 'update'
      }
      this.axios.post('postfindform', value).then((res) => {
        console(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    deletefindForm2 (id) {
      const oj = this.listDataFound.find(oj => oj.findformid === id)
      const idx = this.listDataFound.indexOf(oj)
      this.listDataFound.splice(idx, 1)
      console.log('delete findform' + oj)
      const value = {
        findformid: id,
        type: 'delete'
      }
      this.axios.post('postfindform', value).then((res) => {
        console(res)
      }).catch((err) => {
        console.log(err)
      })
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
