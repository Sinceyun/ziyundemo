<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-row :gutter="16">
      <a-col :span="8">
        <label for="lostplace"><b>丢失地点: </b></label>
        <a-select id="lostplace" defaultValue="all" style="width: 120px" @change="placeChange">
          <a-select-option value="taishan">泰山区</a-select-option>
          <a-select-option value="huashan">华山区</a-select-option>
          <a-select-option value="qilin">启林区</a-select-option>
          <a-select-option value="other">其他</a-select-option>
          <a-select-option value="all">全部</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="8">
        <label for="lostsort"><b>失物类别: </b></label>
        <a-select id="lostsort" defaultValue="all" style="width: 120px" @change="sortChange">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="certificat">证件</a-select-option>
          <a-select-option value="money">财物</a-select-option>
          <a-select-option value="other">其他</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="8">
        <a-button type="primary" @click="handleSearch">查询</a-button>
      </a-col>
    </a-row>
    <a-row :gutter="16">
    </a-row>
    <a-list
      itemLayout="vertical"
      size="small"
      :pagination="pagination"
      :dataSource="listData"
    >
      <a-list-item slot="renderItem" slot-scope="item" key="item.title">
        <img slot="extra" width="272" alt="logo" src="https://c-ssl.duitang.com/uploads/item/201711/21/20171121234138_ez53k.png"/>
        <a-list-item-meta
          :description="item.description"
          :title="item.title"
        >
        </a-list-item-meta>
        <div>
          <div>发布时间：{{ item.publictime }}</div>
          <div>丢失地点：{{ item.lostplace }}</div>
          <div>失物类别：{{ item.lostsort }}</div>
          <b>{{ item.content }}</b>
        </div>
      </a-list-item>
    </a-list>
  </a-card>
</template>
<script>
var listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    title: `找男朋友 ${i}`,
    content: '  图中是我要找的朋友的类型',
    publictime: '2020/2/20',
    lostplace: '华山区',
    lostsort: '其他',
    id: `${i}`,
    description: `编号： ${i}`
  })
}

export default {
  name: 'SearchLost',
  data () {
    return {
      listData,
      selectplace: 'all',
      selectsort: 'all',
      pagination: {
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 5
      },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    deleteLostForm (e) {

    },
    placeChange (value) {
      this.selectplace = value
      console.log('丢失地点：' + this.selectplace)
    },
    sortChange (value) {
      this.selectsort = value
      console.log(`selected ${value}`)
      console.log('失物类别' + this.selectsort)
    },
    handleSearch () {
      console.log('current :丢失地点-' + this.selectplace + '&失物类别-' + this.selectsort)
    }
  }
}
</script>
<style>

</style>
