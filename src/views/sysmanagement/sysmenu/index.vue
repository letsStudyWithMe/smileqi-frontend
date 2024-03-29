<template>
  <div class="container">
    <Breadcrumb :items="['menu.sys.management', 'menu.sys.menu']" />
    <a-card class="general-card" :title="$t('menu.sys.menu')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="queryParams"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="name"
                  :label="$t('searchTable.form.name')"
                >
                  <a-input
                    v-model="queryParams.name"
                    :placeholder="$t('searchTable.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('searchTable.form.status')"
                >
                  <a-select
                    v-model="queryParams.status"
                    :options="statusOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 52px" direction="vertical" />
        <a-col :flex="'200px'" style="text-align: right">
          <a-space direction="" :size="18">
            <a-button type="primary" @click="search" style="margin-right: 25px">
              <template #icon>
                <icon-search />
              </template>
              {{ $t("searchTable.form.search") }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t("searchTable.form.reset") }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAddShow">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t("searchTable.operation.create") }}
            </a-button>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-tooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search"
            >
              <icon-refresh size="18"
              />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('searchTable.actions.density')">
              <div class="action-icon">
                <icon-line-height size="18" />
              </div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('searchTable.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon">
                <icon-settings size="18" />
              </div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === "#" ? "序列号" : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="true"
        :size="size"
        :show-empty-tree="true"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #operations="{ record }">
          <a-button @click="handleUpdateShow(record.id)" type="text" size="small">
            {{ $t("searchTable.columns.operations.update") }}
          </a-button>
          <a-popconfirm :content="$t('searchTable.columns.operations.delete.prompt')" v-if="record.status == 0" @ok="handleDelete(record.id)">
            <a-button type="text" size="small">
              {{ $t("searchTable.columns.operations.delete") }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <a-modal
      :title="isAdd ? $t('searchTable.model.add.title') : $t('searchTable.model.update.title')"
      :visible=showModel
      @ok="handleAddOrUpdate(formModel)"
      @cancel="handleCancel"
      width="700px"
      title-align="start">
      <a-form
        :model="formModel"
        label-align="center"
      >
        <a-form-item field="name" :label="$t('searchTable.form.name')">
          <a-input
            v-model="formModel.name"
            :placeholder="$t('searchTable.form.name.placeholder')"
          />
        </a-form-item>
        <a-form-item field="locale" v-if="isAdd" :label="$t('searchTable.form.locale')">
          <a-input
            v-model="formModel.locale"
            :placeholder="$t('searchTable.form.locale.placeholder')"
          />
        </a-form-item>
        <a-form-item
          field="requiresAuth"
          :label="$t('searchTable.form.requiresAuth')"
        >
          <a-select
            v-model="formModel.requiresAuth"
            :options="requiresAuthOptions"
            :placeholder="$t('searchTable.form.selectDefault')"
          />
        </a-form-item>
        <a-form-item field="parentId" :label="$t('searchTable.form.parentId')">
          <a-input
            v-model="formModel.parentId"
            :placeholder="$t('searchTable.form.parentId.placeholder')"
          />
        </a-form-item>
        <a-form-item field="orderNum" :label="$t('searchTable.form.orderNum')">
          <a-input
            v-model="formModel.orderNum"
            :placeholder="$t('searchTable.form.orderNum.placeholder')"
          />
        </a-form-item>
        <a-form-item field="path" :label="$t('searchTable.form.path')">
          <a-input
            v-model="formModel.path"
            :placeholder="$t('searchTable.form.path.placeholder')"
          />
        </a-form-item>
        <a-form-item field="perms" :label="$t('searchTable.form.perms')">
          <a-input
            v-model="formModel.perms"
            :placeholder="$t('searchTable.form.perms.placeholder')"
          />
        </a-form-item>
        <a-form-item field="icon" :label="$t('searchTable.form.icon')">
          <a-input
            v-model="formModel.icon"
            :placeholder="$t('searchTable.form.icon.placeholder')"
          />
        </a-form-item>
        <a-form-item
          field="status"
          :label="$t('searchTable.form.status')"
        >
          <a-select
            v-model="formModel.status"
            :options="statusOptions"
            :placeholder="$t('searchTable.form.selectDefault')"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import type { SelectOptionData } from "@arco-design/web-vue/es/select/interface";
import type { TableColumnData } from "@arco-design/web-vue/es/table/interface";
import cloneDeep from "lodash/cloneDeep";
import Sortable from "sortablejs";
import { Message, Notification } from "@arco-design/web-vue";
import {
  addMenuInfo,
  deleteMenuInfoById,
  getMenuInfoById,
  Menu,
  MenuParams,
  queryMenuList,
  updateMenuInfoById
} from "@/api/menu";

type SizeProps = "mini" | "small" | "medium" | "large";
type Column = TableColumnData & { checked?: true };

const generateQueryParams = () => {
  return {
    id: "",
    locale: "",
    requiresAuth: "",
    name: "",
    parentId: "",
    orderNum: "",
    path: "",
    status: "",
    perms: "",
    icon: "",
    createTime: "",
  };
};
const { loading, setLoading } = useLoading(true);
const { t } = useI18n();
const renderData = ref<Menu[]>([]);
const queryParams = ref(generateQueryParams());
const formModel = ref(generateQueryParams());
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);
const total = ref<number>();
const size = ref<SizeProps>("medium");
// 新增或修改弹窗
const showModel = ref(false);
let isAdd = true;
const handleAddShow = () => {
  formModel.value = generateQueryParams();
  isAdd = true;
  showModel.value = true;
};
const handleUpdateShow = async (id: any) => {
  const res = await getMenuInfoById(id);
  formModel.value = res.data;
  isAdd = false;
  showModel.value = true;
};
const handleCancel = () => {
  showModel.value = false;
};
const handleAddOrUpdate = async (params:any) => {
  let res = {} as any;
  if (isAdd){
    // 新增
    res = await addMenuInfo(params);
  }else {
    // 修改
    res = await updateMenuInfoById(params);
  }
  if (res.code !== 0) {
    Message.error({
      content: res.message,
      duration: 5 * 1000,
    });
  } else {
    Message.success({
      content: "SUCCESS",
      duration: 5 * 1000,
    });
    showModel.value = false;
    // 重新查询数据
    search();
  }
};

// 删除按钮
const handleDelete = async (id: any) => {
  const res = await deleteMenuInfoById(id);
  if (res.data) {
    Notification.success({
      content: "SUCCESS!"
    });
    // 删除之后重新查询数据
    search();
  } else {
    Notification.error({
      content: "FAILD!"
    });
  }
};

const basePagination: Pagination = {
  total: total.value,
  current: 1, // 默认当前叶数
  pageSize: 10, // 默认每页条数
  showJumper: true, // 是否可以显示跳转到某页
  pageSizeOptions: [10, 20, 40, 80, 100], // 可切换每叶数据条数
  showTotal: true, // 显示总数
  hideOnSinglePage: false, // 只有一页时是否隐藏分页器 true为不显示 false为显示
  size: "small", // 尺寸
  simple: false, // 简洁分页
  showPageSize: true,
  onPageChange: (current:number) => {
    pagination.current = current;
  },
  onPageSizeChange: (pageSize: number) => {
    console.log(pageSize)
    pagination.pageSize = pageSize;
  }
};
const pagination = reactive({
  ...basePagination
});
const expanded = reactive({
  expandedRowKeys: []
});
const densityList = computed(() => [
  {
    name: t("searchTable.size.mini"),
    value: "mini"
  },
  {
    name: t("searchTable.size.small"),
    value: "small"
  },
  {
    name: t("searchTable.size.medium"),
    value: "medium"
  },
  {
    name: t("searchTable.size.large"),
    value: "large"
  }
]);
const columns = computed<TableColumnData[]>(() => [
  {
    dataIndex: "expand",
    slotName: "expand",
    align: "center",
  },
  {
    title: t("searchTable.columns.id"),
    dataIndex: "id",
    slotName: "id",
    align: "center"
  },
  {
    title: t("searchTable.columns.name"),
    dataIndex: "name",
    align: "center"
  },
  {
    title: t("searchTable.columns.locale"),
    dataIndex: "locale",
    align: "center"
  },
  {
    title: t("searchTable.columns.requiresAuth"),
    dataIndex: "requiresAuth",
    align: "center"
  },
  {
    title: t("searchTable.columns.parentId"),
    dataIndex: "parentId",
    slotName: "parentId",
    align: "center"
  },
  {
    title: t("searchTable.columns.orderNum"),
    dataIndex: "orderNum",
    slotName: "orderNum",
    align: "center",
  },
  {
    title: t("searchTable.columns.path"),
    dataIndex: "path",
    slotName: "path",
    align: "center",
  },
  {
    title: t("searchTable.columns.status"),
    dataIndex: "status",
    slotName: "status",
    align: "center",
    render:(record:any)=>{
      return record.record.status==='0' ? t("searchTable.form.isDelete.normal") : t("searchTable.form.isDelete.delete")
    },
  },
  {
    title: t("searchTable.columns.perms"),
    dataIndex: "perms",
    slotName: "perms",
    align: "center",
  },
  {
    title: t("searchTable.columns.icon"),
    dataIndex: "icon",
    slotName: "icon",
    align: "center",
  },
  {
    title: t("searchTable.columns.createTime"),
    dataIndex: "createTime",
    align: "center"
  },
  {
    title: t("searchTable.columns.operations"),
    dataIndex: "operations",
    slotName: "operations",
    align: "center"
  },
]);
const requiresAuthOptions = computed<SelectOptionData[]>(() => [
  {
    label: t("searchTable.form.requiresAuth.true"),
    value: true
  },
  {
    label: t("searchTable.form.requiresAuth.false"),
    value: false
  }
]);
const statusOptions = computed<SelectOptionData[]>(() => [
  {
    label: t("searchTable.form.status.normal"),
    value: '0'
  },
  {
    label: t("searchTable.form.status.delete"),
    value: '1'
  }
]);

const fetchData = async (
  params: MenuParams = { current: 1, pageSize: 20 }
) => {
  setLoading(true);
  try {
    const { data } = await queryMenuList(params);
    total.value = data.total;
    renderData.value = data.records;
    pagination.current = params.current;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const search = () => {
  fetchData({
    ...basePagination,
    ...queryParams.value
  } as unknown as MenuParams);
};
const onPageChange = (current: number) => {
  fetchData({ ...basePagination, current });
};

fetchData();
const reset = () => {
  queryParams.value = generateQueryParams();
};

const handleSelectDensity = (
  val: string | number | Record<string, any> | undefined,
  e: Event
) => {
  size.value = val as SizeProps;
};

const handleChange = (
  checked: boolean | (string | boolean | number)[],
  column: Column,
  index: number
) => {
  if (!checked) {
    cloneColumns.value = showColumns.value.filter(
      (item) => item.dataIndex !== column.dataIndex
    );
  } else {
    cloneColumns.value.splice(index, 0, column);
  }
};

const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array;
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(
      beforeIdx,
      1,
      newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    );
  }
  return newArray;
};

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById("tableSetting") as HTMLElement;
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const { oldIndex, newIndex } = e;
          exchangeArray(cloneColumns.value, oldIndex, newIndex);
          exchangeArray(showColumns.value, oldIndex, newIndex);
        }
      });
    });
  }
};

watch(
  () => columns.value,
  (val) => {
    cloneColumns.value = cloneDeep(val);
    cloneColumns.value.forEach((item, index) => {
      item.checked = true;
    });
    showColumns.value = cloneDeep(cloneColumns.value);
  },
  { deep: true, immediate: true }
);
</script>

<script lang="ts">
export default {
  name: "SysManagement"
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}

.action-icon {
  margin-left: 12px;
  cursor: pointer;
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.setting {
  display: flex;
  align-items: center;
  width: 200px;

  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
