<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-row :gutter="16">
      <a-col :span="7">
        <label for="foundplace"><b>拾取地点: </b></label>
        <a-select id="foundplace" defaultValue="all" style="width: 100px" @change="placeChange">
          <a-select-option value="taishan">泰山区</a-select-option>
          <a-select-option value="huashan">华山区</a-select-option>
          <a-select-option value="qilin">启林区</a-select-option>
          <a-select-option value="other">其他</a-select-option>
          <a-select-option value="all">全部</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <label for="foundsort"><b>失物类别: </b></label>
        <a-select id="foundsort" defaultValue="all" style="width: 100px" @change="sortChange">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="certificat">证件</a-select-option>
          <a-select-option value="money">财物</a-select-option>
          <a-select-option value="books">书本</a-select-option>
          <a-select-option value="other">其他</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="7">
        <label for="foundplace"><b>当前状态: </b></label>
        <a-select id="foundstatus" defaultValue="all" style="width: 100px" @change="statusChange">
          <a-select-option value="寻找中...">寻找中...</a-select-option>
          <a-select-option value="founded">已找到</a-select-option>
          <a-select-option value="all">全部</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="3">
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
      <a-list-item slot="renderItem" slot-scope="item" key="item.id">
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
          <a-button type="primary" @click="handleOk (item.id)">留言</a-button>
        </template>
        <div v-if="item.visible">
          <a-textarea
            v-model="item.textareaMsg"
            placeholder="请留下你的手机号码等信息，已便发布者联系你！"
            :rows="4">
          </a-textarea>
          <a-button @click="handleSure (item.id)">确定</a-button>
          <a-button @click="handleCancel(item.id)">取消</a-button>
        </div>
      </a-list-item>
    </a-list>
  </a-card>
</template>
<script>
export default {
  name: 'SearchFound',
  data () {
    return {
      listData: [{
        owner: '201625022850',
        title: '捡到一把钥匙',
        content: '在西园一楼食堂捡到的，钥匙圈有皮卡丘挂件',
        publicTime: '2020-03-06',
        foundTime: '2020-03-05',
        foundplace: '华山区',
        foundsort: '财物',
        id: '0002',
        currentStatus: '寻找中...',
        weight: 0,
        picturesrc: '',
        textareaMsg: '',
        visible: false
      }, {
        owner: '201625022851',
        title: '捡到一本书《幽默散文读本》',
        content: '在教三405室捡到的',
        publicTime: '2020-03-06',
        foundTime: '2020-03-06',
        foundplace: '华山区',
        foundsort: '书本',
        id: '0001',
        currentStatus: '寻找中...',
        weith: 1,
        picturesrc: 'http://img5.imgtn.bdimg.com/it/u=2079730006,405640849&fm=15&gp=0.jpg',
        textareaMsg: '',
        visible: false
      }],
      selectplace: 'all',
      selectsort: 'all',
      selectstatus: 'all',
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
      console.log('拾取地点：' + this.selectplace)
    },
    sortChange (value) {
      this.selectsort = value
      console.log(`selected ${value}`)
      console.log('失物类别' + this.selectsort)
    },
    statusChange (value) {
      this.selectstatus = value
      console.log('current :当前状态-' + this.selectstatus)
    },
    handleSearch () {
      console.log('current :拾取地点-' + this.selectplace + '&失物类别-' + this.selectsort)
    },
    handleOk (id) {
      const oj = this.listData.find(oj => oj.id === id)
      const idx = this.listData.indexOf(oj)
      this.listData[idx].visible = true
      console.log(idx)
    },
    handleSure (id, index) {
      const oj = this.listData.find(oj => oj.id === id)
      const idx = this.listData.indexOf(oj)
      console.log('留言：' + id + this.listData[idx].textareaMsg + idx)
    },
    handleCancel (id) {
      const oj = this.listData.find(oj => oj.id === id)
      const idx = this.listData.indexOf(oj)
      this.listData[idx].textareaMsg = ''
      this.listData[idx].visible = false
    }
  }
}
</script>
<style>

</style>
