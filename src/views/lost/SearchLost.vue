<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
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
const listData = []
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
      pagination: {
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 5
      },
      form: this.$form.createForm(this)
    }
  }
}
</script>
<style>

</style>
