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
          @confirm="() => onDelete(record.id)">
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
      dataSource: [
        {
          id: '0001',
          owner: 'admin',
          key: '0001',
          title: '捡到一把钥匙',
          publictime: '2020-4-03',
          status: '寻找中',
          place: '华山区',
          sort: '财物',
          description: '这是详细描述',
          picture: 'http://img5.imgtn.bdimg.com/it/u=2079730006,405640849&fm=15&gp=0.jpg'
        }, {
          id: '0002',
          owner: '201625022850',
          key: '0002',
          title: '捡到一本书',
          publictime: '2020-4-05',
          status: '寻找中',
          place: '泰山区',
          sort: '书本',
          description: '这是详细描述'
        }, {
          id: '0003',
          owner: 'admin',
          key: '0003',
          title: '捡到一把钥匙',
          publictime: '2020-4-04',
          status: '已找到',
          place: '华山区',
          sort: '财物',
          description: '这是详细描述'
        }, {
          id: '0004',
          owner: '201625040227',
          key: '0004',
          title: '捡到一本书',
          publictime: '2020-4-19',
          status: '已找到',
          place: '华山区',
          sort: '书本',
          description: '这是详细描述'
        }, {
          id: '0005',
          owner: 'admin',
          key: '0005',
          title: '捡到一把钥匙',
          publictime: '2020-4-03',
          status: '寻找中',
          place: '泰山区',
          sort: '财物',
          description: '这是详细描述'
        }, {
          id: '0006',
          owner: '201625060448',
          key: '0006',
          title: '捡到一本书',
          publictime: '2020-4-05',
          status: '寻找中',
          place: '其他',
          sort: '书本',
          description: '这是详细描述'
        }, {
          id: '0007',
          owner: 'admin',
          key: '0007',
          title: '捡到一把钥匙',
          publictime: '2020-4-04',
          status: '寻找中',
          place: '启林区',
          sort: '财物',
          description: '这是详细描述'
        }, {
          id: '0008',
          owner: '201625010227',
          key: '0008',
          title: '捡到一本书',
          publictime: '2020-4-19',
          status: '已找到',
          place: '泰山区',
          sort: '书本',
          description: '这是详细描述'
        }, {
          id: '0009',
          owner: 'admin',
          key: '0009',
          title: '捡到一把钥匙',
          publictime: '2020-4-03',
          status: '寻找中',
          place: '华山区',
          sort: '财物',
          description: '这是详细描述'
        }, {
          id: '0010',
          owner: '201625022850',
          key: '0010',
          title: '捡到一本书',
          publictime: '2020-4-05',
          status: '寻找中',
          place: '泰山区',
          sort: '书本',
          description: '这是详细描述'
        }, {
          id: '0011',
          owner: 'admin',
          key: '0011',
          title: '捡到一把钥匙',
          publictime: '2020-4-04',
          status: '已找到',
          place: '华山区',
          sort: '财物',
          description: '这是详细描述'
        }, {
          id: '0012',
          owner: '201625040227',
          key: '0012',
          title: '捡到一本书',
          publictime: '2020-4-19',
          status: '已找到',
          place: '华山区',
          sort: '书本',
          description: '这是详细描述'
        }, {
          id: '0013',
          owner: 'admin',
          key: '0013',
          title: '捡到一把钥匙',
          publictime: '2020-4-03',
          status: '寻找中',
          place: '泰山区',
          sort: '财物',
          description: '这是详细描述'
        }, {
          id: '0014',
          owner: '201625060448',
          key: '0014',
          title: '捡到一本书',
          publictime: '2020-4-05',
          status: '寻找中',
          place: '其他',
          sort: '书本',
          description: '这是详细描述'
        }, {
          id: '0015',
          owner: 'admin',
          key: '0015',
          title: '捡到一把钥匙',
          publictime: '2020-4-04',
          status: '寻找中',
          place: '启林区',
          sort: '财物',
          description: '这是详细描述'
        }, {
          owner: '201625010227',
          id: '0016',
          title: '捡到一本书',
          publictime: '2020-4-19',
          status: '已找到',
          place: '泰山区',
          sort: '书本',
          description: '这是详细描述'
        }
      ],
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
        dataIndex: 'owner',
        key: 'owner',
        filters: [{ text: '管理员', value: 'admin' }],
        filteredValue: filteredInfo.owner || null,
        onFilter: (value, record) => record.owner.includes(value)
      },
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id'
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
        title: '失物地点',
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
        title: '失物类别',
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
      this.dataSource = dataSource.filter(item => item.id !== id)
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
