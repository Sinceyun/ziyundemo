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
          :dataSource="listDataLosting"
        >
          <a-list-item slot="renderItem" slot-scope="item" key="item.lostformid">
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
              <div>拾获时间：{{ item.losttime }}</div>
              <div>丢失地点：{{ item.place }}</div>
              <div>失物类别：{{ item.sort }}</div>
              <div>编号：{{ item.lostformid }}</div>
            </div>
            <template slot="actions"><a-popconfirm
              title="确定删除?"
              @confirm="() => deletelostForm(item.lostformid)">
              <a href="#">删除</a>
            </a-popconfirm></template>
            <template slot="actions"><a-popconfirm
              title="更改状态?"
              @confirm="() => updatelostForm(item.lostformid)">
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
          :dataSource="listDataLost"
        >
          <a-list-item slot="renderItem" slot-scope="item" key="item.lostformid">
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
              <div>拾获时间：{{ item.losttime }}</div>
              <div>丢失地点：{{ item.place }}</div>
              <div>失物类别：{{ item.sort }}</div>
              <div>编号：{{ item.lostformid }}</div>
            </div>
            <template slot="actions"><a-popconfirm
              title="确定删除?"
              @confirm="() => deletelostForm2(item.lostformid)">
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
      listDataLosting: [],
      listDataLost: [],
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
    console.log(params)
    this.axios.get('getlostform', { params }).then((res) => {
      this.listDataLosting = res
      console.log(this.listDataLosting)
    }).catch((err) => {
      console.log(err)
    })
    params = {
      status: '已找到',
      publicid: store.getters.userID,
      type: 'myform'
    }
    this.axios.get('getlostform', { params }).then((res) => {
      this.listDataLost = res
      console.log(this.listDataLost)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    deletelostForm (id) {
      const oj = this.listDataLosting.find(oj => oj.lostformid === id)
      const idx = this.listDataLosting.indexOf(oj)
      this.listDataLosting.splice(idx, 1)
      console.log(oj)
      const value = {
        lostformid: id,
        type: 'delete'
      }
      this.axios.post('postlostform', value).then((res) => {
        console(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    updatelostForm (id) {
      const oj = this.listDataLosting.find(oj => oj.lostformid === id)
      const idx = this.listDataLosting.indexOf(oj)
      oj.status = '已找到'
      this.listDataLosting.splice(idx, 1)
      this.listDataLost.splice(0, 0, oj)
      console.log('update lostform', oj)
      const value = {
        lostformid: id,
        type: 'update'
      }
      console.log(value)
      this.axios.post('postlostform', value).then((res) => {
        console(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    deletelostForm2 (id) {
      const oj = this.listDataLost.find(oj => oj.lostformid === id)
      const idx = this.listDataLost.indexOf(oj)
      this.listDataLost.splice(idx, 1)
      console.log('delete lostform' + oj)
      const value = {
        lostformid: id,
        type: 'delete'
      }
      this.axios.post('postlostform', value).then((res) => {
        console(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
