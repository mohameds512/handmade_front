<template>
  <b-row v-if="data">
    
    <b-col cols="12">
      <b-overlay :show="loading" rounded="sm">
        <b-card :no-body="title ? false : true">
          <b-card-header
            :class="title ? 'mt-0 pt-0 pb-2 p-0' : 'mt-0 pt-0 p-0'"
          >
            <div class="mt-0 d-flex align-items-center">
              <div v-if="title">
                <feather-icon icon="HelpCircleIcon" size="18" />
                <span class="mx-05" v-if="title">
                  {{ title }}
                </span>
              </div>
            </div>
            <slot name="edit" />
          </b-card-header>
          <table class="table table-striped custom_table text_nobreak">
            <tbody style="text-align: initial">
              <tr
                v-for="(item, key) in mapOrder(
                  transform(data, only, exceptData),
                  only,
                  'key'
                )"
                :key="key"
              >
                <slot
                  v-if="Object.keys($scopedSlots).includes(item.key)"
                  :data="data"
                  :name="item.key"
                />
                <template v-if="!Object.keys($scopedSlots).includes(item.key)">
                  <template v-if="item.value && typeof item.value != 'object'">
                    <th scope="row" :width="'30%'">
                      {{ $t(`Global.${item.key}`) }}
                    </th>

                    <td class="d-flex flex-wrap">
                      <div>
                        {{ item.value }}
                      </div>
                    </td>
                  </template>

                  <template v-if="item.value && typeof item.value == 'object'">
                    <th scope="row" :width="'30%'">
                      {{ $t(`Global.${item.key}`) }}
                    </th>

                    <td v-if="item.value && item.value.link">
                      <a :href="item.value.link">
                        {{ item.value.value }}
                      </a>
                    </td>

                    <td v-else class="d-flex flex-wrap">
                      <div
                        v-for="(inner1, key) in transform(
                          item.value,
                          null,
                          exceptData
                        )"
                        :key="key"
                        class="d-flex"
                      >
                        <template
                          v-if="inner1.value && typeof inner1.value != 'object'"
                        >
                          <span>{{ inner1.value || "" }}</span>
                          <span>
                            {{
                              key + 1 ==
                              checkIfEnd(
                                transform(item.value, null, exceptData)
                              )
                                ? ""
                                : ","
                            }}</span
                          >
                        </template>

                        <template
                          v-if="inner1.value && typeof inner1.value == 'object'"
                        >
                          <div
                            v-for="(inner2, key) in transform(
                              inner1.value,
                              null,
                              exceptData
                            )"
                            :key="key"
                            class="d-flex"
                          >
                            <template
                              v-if="
                                inner2.value && typeof inner2.value != 'object'
                              "
                            >
                              <span>{{ inner2.value || "" }}</span>
                              <span>
                                {{
                                  key + 1 ==
                                  checkIfEnd(
                                    transform(inner1.value, null, exceptData)
                                  )
                                    ? ""
                                    : ","
                                }}</span
                              >
                            </template>

                            <template
                              v-if="
                                inner2.value && typeof inner2.value == 'object'
                              "
                            >
                              <div
                                v-for="(inner3, key) in transform(
                                  inner2.value,
                                  null,
                                  exceptData
                                )"
                                :key="key"
                                class="d-flex"
                              >
                                <template
                                  v-if="
                                    inner3.value &&
                                    typeof inner3.value != 'object'
                                  "
                                >
                                  <span>{{ inner3.value || "" }}</span>
                                  <span>
                                    {{
                                      key + 1 ==
                                      checkIfEnd(
                                        transform(
                                          inner2.value,
                                          null,
                                          exceptData
                                        )
                                      )
                                        ? ""
                                        : ","
                                    }}</span
                                  >
                                </template>
                              </div>
                            </template>
                          </div>
                        </template>
                      </div>
                    </td>
                  </template>
                </template>
              </tr>
            </tbody>
          </table>
        </b-card>
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script>
import {
  BTabs,
  BTab,
  BCardText,
  BCard,
  BBadge,
  BCol,
  BRow,
  BCardHeader,
  BOverlay,
} from "bootstrap-vue";

export default {
  name: "List",
  components: {
    BCardText,
    BCardHeader,
    BTabs,
    BTab,
    BCard,
    BCol,
    BOverlay,
    BRow,
    BBadge,
  },
  props: {
    data: null,
    showStatus: { type: Object },
    title: null,
    only: [],
    kh: Boolean,
    status: Array,
    except: { type: Array, default: () => ["id", "removed", "parent_id"] },
    expectKey: [],
    customShow: [],
    loading: false,
  },
  computed: {
    exceptData() {
      return [...this.except, ...["id", "removed", "parent_id"]];
    },
    //    tableSlots() {
    //   const prefix = "table--";
    //   const raw = this.$scopedSlots;
    //   console.log(Object.keys(raw));
    //   const filtered = Object.keys(raw)
    //   return filtered;
    // },
  },
  destroyed() {
    // this.$store.commit('app/UPDATE_PAGE_DETAILS', null)
  },
  methods: {
    mapOrder(array, order, key) {
      if (!order) return array;
      array.sort((a, b) => {
        const A = a[key];
        const B = b[key];
        if (order.indexOf(A) > order.indexOf(B)) {
          return 1;
        }
        return -1;
      });

      return array;
    },
    checkKey(item) {
      console.log("ite", item);
      console.log(
        "Object.keys(this.$scopedSlots)",
        Object.keys(this.$scopedSlots)
      );
      console.log(
        "Object.keys(this.$scopedSlots).includes(item)",
        Object.keys(this.$scopedSlots).includes(item)
      );
      if (Object.keys(this.$scopedSlots).includes(item)) {
        return false;
      }
      true;
    },
    customOnly(slot) {
      return this.only.filters((sl) => sl != slot);
    },
    toCellName(slot) {
      return `cell(${slot})`;
    },
    checkIfEnd(data) {
      if (data && data.length) return data.length;
    },
  },
};
</script>

<style scoped></style>
