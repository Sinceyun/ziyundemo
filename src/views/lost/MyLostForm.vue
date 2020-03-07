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
          :dataSource="listDataFounding"
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
              <div>丢失时间：{{ item.foundTime }}</div>
              <div>丢失地点：{{ item.foundplace }}</div>
              <div>失物类别：{{ item.foundsort }}</div>
            </div>
            <template>
              <a-button type="primary" @click="deleteLostForm(index)">删除</a-button>
              <a-button @click="foudingToFounded(index)">已找到</a-button>
            </template>
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
              <div>丢失时间：{{ item.foundTime }}</div>
              <div>丢失地点：{{ item.foundplace }}</div>
              <div>失物类别：{{ item.foundsort }}</div>
            </div>
            <template>
              <a-button type="primary" @click="deleteLostForm2(index)">删除</a-button>
            </template>
          </a-list-item>
        </a-list>
      </a-card>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
var listDataFounding = [{
  owner: 'admin',
  title: '丢失一把钥匙',
  content: '在西园丢的，钥匙圈有皮卡丘挂件',
  publicTime: '2020-03-06',
  foundTime: '2020-03-05',
  foundplace: '华山区',
  foundsort: '财物',
  id: '0001',
  currentStatus: '寻找中',
  weight: 0,
  picturesrc: ''
}, {
  owner: 'admin',
  title: '丢失一本书《幽默散文读本》',
  content: '在教三丢失的',
  publicTime: '2020-03-06',
  foundTime: '2020-03-06',
  foundplace: '华山区',
  foundsort: '书本',
  id: '0002',
  currentStatus: '寻找中',
  weith: 1,
  picturesrc: 'http://img5.imgtn.bdimg.com/it/u=2079730006,405640849&fm=15&gp=0.jpg'
}]
export default {
  data () {
    return {
      listDataFounding,
      listDataFounded: [{
        owner: '201625022850',
        title: '捡到一把钥匙',
        content: '在西园一楼食堂捡到的，钥匙圈有皮卡丘挂件',
        publicTime: '2020-03-06',
        foundTime: '2020-03-05',
        foundplace: '华山区',
        foundsort: '财物',
        id: '0003',
        currentStatus: '已找到',
        weight: 0,
        picturesrc: 'http://img5.imgtn.bdimg.com/it/u=2079730006,405640849&fm=15&gp=0.jpg'
      }, {
        owner: '201625022851',
        title: '捡到一本书《幽默散文读本》',
        content: '在教三405室捡到的',
        publicTime: '2020-03-06',
        foundTime: '2020-03-06',
        foundplace: '华山区',
        foundsort: '书本',
        id: '0004',
        currentStatus: '已找到',
        weith: 1,
        picturesrc: 'http://img5.imgtn.bdimg.com/it/u=2079730006,405640849&fm=15&gp=0.jpg'
      }],
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
  methods: {
    callback (key) {
      console.log(key)
    },
    deleteLostForm (index) {
      console.log('数组下标：' + ((this.currentPage - 1) * 5 + index))
      this.listDataFounding.splice((this.currentPage - 1) * 5 + index, 1)
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
