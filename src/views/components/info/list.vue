<template>
  
  <b-row v-if="data">
    
    <b-col cols="12">
      <b-overlay
        :show="loading"
        rounded="sm"
      >
      <b-card v-if="title">
        <b-card-header :class="nopading ? '' : 'pb-2'" class="mt-0 pt-0 p-0">
          <div class="mt-0 d-flex align-items-center">
           <span class="mx-05" style="    font-size: 1.286rem;font-weight: 500">
                {{ title }}
           </span>
            <div v-if="custom_status">
              <slot name="custom_status"></slot>
            </div>
            <div>
              <b-badge
                v-if="showStatus && showStatus.removed != 'null'"
                active
                pill
                :variant="`light-${getStatus(showStatus.removed).color}`"
                class="text-capitalize mr-1 justify-align-content-lg-start"
              >
                {{ getStatus(showStatus.removed).name }}
              </b-badge>
              <b-badge
                v-if="showStatus && showStatus.status && $i18n.locale == 'en'"
                active
                pill
                :variant="`light-primary`"
                class="text-capitalize mr-1 justify-align-content-lg-start"
              >
                {{ showStatus.status.name || showStatus.status.name_local }}
              </b-badge>
              <b-badge
                v-if="showStatus && showStatus.status && $i18n.locale == 'ar'"
                active
                pill
                :variant="`light-primary`"
                class="text-capitalize mr-1 justify-align-content-lg-start"
              >
                {{ showStatus.status.name_local ||  showStatus.status.name}}
              </b-badge>
              <b-badge
                v-if="
                  showStatus &&
                    showStatus.admission_type &&
                    $i18n.locale == 'en'
                "
                active
                pill
                :variant="`light-primary`"
                class="text-capitalize mr-1 justify-align-content-lg-start"
              >
                {{ showStatus.admission_type.name || showStatus.admission_type.name_local }}
              </b-badge>
              <b-badge
                v-if="
                  showStatus &&
                    showStatus.admission_type &&
                    $i18n.locale == 'ar'
                "
                active
                pill
                :variant="`light-primary`"
                class="text-capitalize mr-1 justify-align-content-lg-start"
              >
                {{ showStatus.admission_type.name_local || showStatus.admission_type.name }}
              </b-badge>
            </div>
          </div>
          <slot name="edit" />
        </b-card-header>
        <table v-if="kh">
           <slot></slot>
        </table>
          <table v-if="!kh" class="table table-striped custom_table text_nobreak">
            <tbody style="text-align: initial">
              <tr
                v-for="(item, key) in transform(data, only, except)"
                :key="key"
              >
                <th
                  scope="row"
                  :width="'20%'"
                >
                  {{ $t(`Global.${item.key}`) }}
                </th>
                <td
                  v-if="item.value && typeof item.value == 'object'"
                  class="d-flex flex-wrap"
                >
                  <div
                    v-for="(row, key) in transform(item.value, null, except)"
                    :key="key"
                    class="d-flex"
                  >
                    <div class="d-flex font-weight-bolder mr-05">
                      <!--                     <span> {{ $t(`Global.${row.key}`) }} </span> <span v-if="row.value && typeof row.value == 'object'">(</span> <span v-else>:</span>-->
                    </div>
                    <div
                      v-if="row.value && typeof row.value == 'object'"
                      class="d-flex flex-wrap"
                    >
                      <div
                        v-for="(inner, key) in transform(
                          row.value,
                          null,
                          except,
                        )"
                        :key="key"
                      >
                        <!--                       <span class="font-weight-bold">{{ $t(`Global.${inner.key}`) }} : </span> -->
                        <div
                          v-if="inner.value && typeof inner.value == 'object'"
                          class="d-flex flex-wrap"
                        >
                          <div
                            v-for="(child, key) in transform(
                              inner.value,
                              null,
                              except,
                            )"
                            :key="key"
                          >
                            <span>{{ child.value || '-' }}</span>
                            <span />
                          </div>
                        </div>
                        <span v-else>
                          <div
                            v-if="
                              (customShow && !customShow.includes(inner.key)) ||
                                !customShow
                            "
                          >
                            {{
                              expectKey && expectKey.includes(inner.key)
                                ? ''
                                : inner.value || '-'
                            }}
                            <span>{{
                              expectKey && expectKey.includes(inner.key)
                                ? ''
                                : key + 1 ==
                                  checkIfEnd(transform(row.value, null, except))
                                  ? ''
                                  : ','
                            }}</span>
                          </div>
                          <div v-else>
                            <span v-if="inner.key == 'gender'">
                              {{
                                inner.value == 1
                                  ? $t('Global.male')
                                  : $t('Global.female')
                              }}
                            </span>
                          </div>
                        </span>
                        <!-- <span>{{ inner.value || '-' }}</span>
                                            <span >,</span> -->
                      </div>
                    </div>

                    <div
                      v-if="
                        (customShow && !customShow.includes(row.key)) ||
                          !customShow
                      "
                    >
                      {{
                        expectKey && expectKey.includes(row.key)
                          ? ''
                          : row.value || '-'
                      }}
                      <span>{{
                        expectKey && expectKey.includes(row.key)
                          ? ''
                          : key + 1 ==
                            checkIfEnd(transform(item.value, null, except))
                            ? ''
                            : ','
                      }}</span>
                    </div>
                    <span v-else>
                      <div
                        v-if="
                          (customShow && !customShow.includes(row.key)) ||
                            !customShow
                        "
                      >
                        {{
                          expectKey && expectKey.includes(row.key)
                            ? ''
                            : row.value || '-'
                        }}
                        <span>{{
                          expectKey && expectKey.includes(row.key)
                            ? ''
                            : key + 1 ==
                              checkIfEnd(
                                transform(item.value, null, [
                                  null,
                                  '',
                                  'id',
                                  'removed',
                                ]),
                              )
                              ? ''
                              : ','
                        }}</span>
                      </div>
                      <div v-else>
                        <span v-if="row.key == 'gender'">
                          {{
                            row.value == 1
                              ? $t('Global.male')
                              : $t('Global.female')
                          }}
                        </span>
                      </div>
                    </span>
                  </div>
                </td>
                <td v-else>
                  <div
                    v-if="
                      (customShow && !customShow.includes(item.key)) ||
                        !customShow
                    "
                  >
                    {{
                      expectKey && expectKey.includes(item.key)
                        ? ''
                        : item.value || '-'
                    }}
                    <span>{{
                      expectKey && expectKey.includes(item.key) ? '' : ''
                    }}</span>
                  </div>
                  <div v-else>
                    <span v-if="item.key == 'gender'">
                      {{
                        item.value == 1
                          ? $t('Global.male')
                          : $t('Global.female')
                      }}
                    </span>
                  </div>
                </td>
              </tr>
              <slot name="custom_show" />
            </tbody>
          </table>
        </b-card>
      <b-card no-body v-else>
          <b-card-header
            class="mt-0 pt-0 pb-0 p-0"
          >
            <div  class="mt-0 d-flex align-items-center">
              <div  v-if="title">
                <span class="mx-05" style="font-weight: bolder;font-size: 18px">
                {{ title }}
              </span>
              </div>
            </div>
            <slot name="edit" />
          </b-card-header>
          <table class="table table-striped custom_table text_nobreak">
            <tbody style="text-align: initial">
              <tr
                v-for="(item, key) in transform(data, only, except)"
                :key="key"
              >
                <th
                  scope="row"
                  :width="'20%'"
                >
                  {{ $t(`Global.${item.key}`) }}
                </th>
                <td
                  v-if="item.value && typeof item.value == 'object'"
                  class="d-flex flex-wrap"
                >
                  <div
                    v-for="(row, key) in transform(item.value, null, except)"
                    :key="key"
                    class="d-flex"
                  >
                    <div class="d-flex font-weight-bolder mr-05">
                      <!--                     <span> {{ $t(`Global.${row.key}`) }} </span> <span v-if="row.value && typeof row.value == 'object'">(</span> <span v-else>:</span>-->
                    </div>
                    <div
                      v-if="row.value && typeof row.value == 'object'"
                      class="d-flex flex-wrap"
                    >
                      <div
                        v-for="(inner, key) in transform(
                          row.value,
                          null,
                          except,
                        )"
                        :key="key"
                      >
                        <!--                       <span class="font-weight-bold">{{ $t(`Global.${inner.key}`) }} : </span> -->
                        <div
                          v-if="inner.value && typeof inner.value == 'object'"
                          class="d-flex flex-wrap"
                        >
                          <div
                            v-for="(child, key) in transform(
                              inner.value,
                              null,
                              except,
                            )"
                            :key="key"
                          >
                            <span>{{ child.value || '-' }}</span>
                            <span />
                          </div>
                        </div>
                        <span v-else>
                          <div
                            v-if="
                              (customShow && !customShow.includes(inner.key)) ||
                                !customShow
                            "
                          >
                            {{
                              expectKey && expectKey.includes(inner.key)
                                ? ''
                                : inner.value || '-'
                            }}
                            <span>{{
                              expectKey && expectKey.includes(inner.key)
                                ? ''
                                : key + 1 ==
                                  checkIfEnd(transform(row.value, null, except))
                                  ? ''
                                  : ','
                            }}</span>
                          </div>
                          <div v-else>
                            <span v-if="inner.key == 'gender'">
                              {{
                                inner.value == 1
                                  ? $t('Global.male')
                                  : $t('Global.female')
                              }}
                            </span>
                          </div>
                        </span>
                        <!-- <span>{{ inner.value || '-' }}</span>
                                            <span >,</span> -->
                      </div>
                    </div>

                    <div
                      v-if="
                        (customShow && !customShow.includes(row.key)) ||
                          !customShow
                      "
                    >
                      {{
                        expectKey && expectKey.includes(row.key)
                          ? ''
                          : row.value || '-'
                      }}
                      <span>{{
                        expectKey && expectKey.includes(row.key)
                          ? ''
                          : key + 1 ==
                            checkIfEnd(transform(item.value, null, except))
                            ? ''
                            : ','
                      }}</span>
                    </div>
                    <span v-else>
                      <div
                        v-if="
                          (customShow && !customShow.includes(row.key)) ||
                            !customShow
                        "
                      >
                        {{
                          expectKey && expectKey.includes(row.key)
                            ? ''
                            : row.value || '-'
                        }}
                        <span>{{
                          expectKey && expectKey.includes(row.key)
                            ? ''
                            : key + 1 ==
                              checkIfEnd(
                                transform(item.value, null, [
                                  null,
                                  '',
                                  'id',
                                  'removed',
                                ]),
                              )
                              ? ''
                              : ','
                        }}</span>
                      </div>
                      <div v-else>
                        <span v-if="row.key == 'gender'">
                          {{
                            row.value == 1
                              ? $t('Global.male')
                              : $t('Global.female')
                          }}
                        </span>
                      </div>
                    </span>
                  </div>
                </td>
                <td v-else>
                  <div
                    v-if="
                      (customShow && !customShow.includes(item.key)) ||
                        !customShow
                    "
                  >
                    {{
                      expectKey && expectKey.includes(item.key)
                        ? ''
                        : item.value || '-'
                    }}
                    <span>{{
                      expectKey && expectKey.includes(item.key) ? '' : ''
                    }}</span>
                  </div>
                  <div v-else>
                    <span v-if="item.key == 'gender'">
                      {{
                        item.value == 1
                          ? $t('Global.male')
                          : $t('Global.female')
                      }}
                    </span>
                  </div>
                </td>
              </tr>
              <slot name="custom_show" />
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
  BLink,
  BBadge,
  BCol,
  BRow,
  BCardHeader,
  BOverlay,
} from 'bootstrap-vue'

export default {
  name: 'List',
  components: {
    BCardText,
    BCardHeader,
    BTabs,
    BTab,
    BLink,
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
    nopading:Boolean,
    only: [],
    custom_status:Boolean,
    kh:Boolean,
    status: Array,
    except: { type: Array,  default: () => ['id', 'removed', 'parent_id']},
    expectKey: [],
    customShow: [],
    loading: false,
  },
  destroyed() {
    // this.$store.commit('app/UPDATE_PAGE_DETAILS', null)
  },
  methods: {
    checkIfEnd(data) {
      if (data && data.length) return data.length
    },
  },
}
</script>

<style scoped></style>
