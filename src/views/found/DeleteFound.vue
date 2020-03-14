<template>
  <div>
    <div class="table-operations">
      <a-button @click="clearFilters">重置筛选</a-button>
      <a-button @click="clearAll">重置筛选和排序</a-button>
    </div>
    <a-table :columns="columns" :dataSource="dataSource" @change="handleChange" >
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="确定删除?"
          @confirm="() => onDelete(record.findformid)">
          <a href="#">删除</a>
        </a-popconfirm>
      </template>
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <p>{{ record.description }}</p>
        <img width="150" alt="logo" :src="record.picture"/>
      </div>
    </a-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataSource: [],
      filteredInfo: null,
      sortedInfo: null
    }
  },
  computed: {
    columns () {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const columns = [{
        title: '发布者',
        dataIndex: 'publicid',
        key: 'publicid',
        filters: [{ text: '管理员', value: 'admin' }],
        filteredValue: filteredInfo.publicid || null,
        onFilter: (value, record) => record.publicid.includes(value)
      },
      {
        title: '编号',
        dataIndex: 'findformid',
        key: 'findformid'
      }, {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '发布时间',
        dataIndex: 'publictime',
        key: 'publictime',
        sorter: (a, b) => {
          let aTimeString = a.publictime
          let bTimeString = b.publictime
          aTimeString = aTimeString.replace(/-/g, '/')
          bTimeString = bTimeString.replace(/-/g, '/')
          const aTime = new Date(aTimeString).getTime()
          const bTime = new Date(bTimeString).getTime()
          return bTime - aTime
        },
        sortOrder: sortedInfo.columnKey === 'publictime' && sortedInfo.order
      }, {
        title: '当前状态',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: '寻找中', value: '寻找中' },
          { text: '已找到', value: '已找到' }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value)
      }, {
        title: '地点',
        dataIndex: 'place',
        key: 'place',
        filters: [
          { text: '华山区', value: '华山区' },
          { text: '启林区', value: '启林区' },
          { text: '泰山区', value: '泰山区' },
          { text: '其他', value: '其他' }
        ],
        filteredValue: filteredInfo.place || null,
        onFilter: (value, record) => record.place.includes(value)
      }, {
        title: '类别',
        dataIndex: 'sort',
        key: 'sort',
        filters: [
          { text: '证件', value: '证件' },
          { text: '财物', value: '财物' },
          { text: '书本', value: '书本' },
          { text: '其他', value: '其他' }
        ],
        filteredValue: filteredInfo.sort || null,
        onFilter: (value, record) => record.sort.includes(value)
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }]
      return columns
    }
  },
  mounted: function () {
    console.log('拉取失物招领')
    const params = { type: 'allfindform' }
    this.axios.get('getfindform', { params }).then((res) => {
      const ld = res
      for (let i = 0; i < ld.length; i++) {
        ld[i].key = i
      }
      this.dataSource = ld
      console.log(this.dataSource)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    handleChange (pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter)
      this.filteredInfo = filters
      this.sortedInfo = sorter
    },
    clearFilters () {
      this.filteredInfo = null
    },
    clearAll () {
      this.filteredInfo = null
      this.sortedInfo = null
    },
    onDelete (id) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter(item => item.findformid !== id)
      const value = {
        findformid: id,
        type: 'delete'
      }
      this.axios.post('postfindform', value).then((res) => {
        console(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
