<template>
  <b-row>
    <b-col cols="12" xl="12" lg="12" md="12">
      <b-card>
        <b-row v-if="item">
          <b-col
            cols="21"
            xl="4"
            class="d-flex justify-content-between flex-column"
          >
            <div class="d-flex justify-content-start position-relative">
              <b-overlay :show="loading" rounded="sm">
                <b-avatar
                  style="width: 150px; height: 150px"
                  :src="user_photo(item.id)"
                  size="104px"
                  rounded
                />
                <div
                  class="position-absolute top_left"
                  v-if="hasPermission('edit_employees')"
                >
                  <input
                    ref="refInputEl"
                    type="file"
                    @change="changePhoto"
                    class="d-none"
                  />
                  <!-- <feather-icon style="position: absolute; left: 1rem; top: 0;"
                                               icon="EditIcon"
                                              class="d-inline" size="22"/> -->
                  <b-button
                    v-b-tooltip.hover="$t('Global.uploadPhoto')"
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="primary"
                    class="btn-icon rounded-circle"
                    @click="$refs.refInputEl.click()"
                  >
                    <feather-icon icon="UploadCloudIcon" />
                  </b-button>
                </div>
              </b-overlay>
              <div style="margin-top: 30px" class="d-flex flex-column ml-1">
                <div v-if="item.name" class="mb-1">
                  <h4
                    v-b-popover.hover.top="item.name"
                    class="mb-0 d-inline-block"
                    style="font-weight: bold"
                  >
                    {{ item.name }}
                  </h4>
                  <!--                                    <span v-if="item.email && mainData.email.length > 30" v-b-popover.hover.top="mainData.email" class="card-text">{{ mainData.email.substring(0, 25) + '...' }}</span>-->
                  <span class="card-text d-block">{{ item.email }}</span>
                </div>
                <div class="d-flex flex-wrap">
                  <b-button
                    v-if="hasPermission('edit_employees')"
                    v-b-tooltip.hover
                    class="mb-2"
                    target="_blank"
                    :title="$t('Global.edit')"
                    style="width: 100px"
                    :to="{ name: 'employee-edit', params: { id: item.id } }"
                    variant="primary"
                  >
                    {{ $t("Global.edit") }}
                  </b-button>

                  <!--                                    <b-button variant="light" class="ml-1" :to="{ name: 'role-view', params: { id: id } }">-->

                  <!--                                        <feather-icon icon="LockIcon" color="red" size="14"-->
                  <!--                                                      class="align-middle text-body"/>-->
                  <!--                                    </b-button>-->
                  <b-button
                    class="mb-2 mx-2"
                    @click="open_role(item.id)"
                    v-b-tooltip.hover
                    :title="$t('Global.roles')"
                    style="width: 100px"
                  >
                    <!--                                        <feather-icon icon="LockIcon"></feather-icon>-->
                    {{ $t("Global.roles") }}
                  </b-button>

                  <div
                    v-if="item.removed != 2 && hasPermission('edit_employees')"
                  >
                    <b-button
                      v-if="item.removed == 0"
                      @click="remove($route.params.id)"
                      id="show-btn"
                      v-b-tooltip.hover
                      style="width: 100px"
                      :title="$t('Global.delete')"
                      variant="outline-danger"
                    >
                      {{ $t("Global.delete") }}
                    </b-button>
                    <b-button
                      v-else
                      v-b-tooltip.hover
                      @click="restore($route.params.id)"
                      style="width: 100px"
                      :title="$t('Global.restore')"
                      variant="outline-danger"
                    >
                      {{ $t("Global.restore") }}
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          <b-col cols="12" xl="8">
            <table class="mt-2 mt-xl-0" style="width: 100%">
              <tr>
                <th class="pb-50 d-flex flex-wrap">
                  <feather-icon icon="UserIcon" class="mr-75" />
                  <span class="label">{{ $t("Global.name") }}</span>
                </th>
                <td class="pb-50">
                  <span> {{ item.name }}</span>
                </td>
                <th class="pb-50">
                  <feather-icon icon="FlagIcon" class="mr-75" />
                  <span class="label">{{ $t("Global.salary") }}</span>
                </th>
                <td class="pb-50">
                  {{ item.salary || "-" }}
                </td>
              </tr>

              <tr>
                <th class="pb-50 d-flex flex-wrap">
                  <feather-icon icon="AirplayIcon" class="mr-75" />
                  <span class="label">{{ $t("Global.phone") }}</span>
                </th>
                <td class="pb-50">
                  <span>{{ item.phone }}</span>
                </td>
                <th class="pb-50">
                  <feather-icon icon="FlagIcon" class="mr-75" />
                  <span class="label">{{ $t("Global.overtime") }}</span>
                </th>
                <td class="pb-50">
                  {{ item.overtime || "-" }}
                </td>
              </tr>

              <tr>
                <th class="pb-50">
                  <feather-icon icon="CheckIcon" class="mr-75" />
                  <span class="lable">{{ $t("Global.status") }}</span>
                </th>
                <td class="pb-50">
                  <span>{{ item.active }}</span>
                </td>
                 <th>
                  <feather-icon icon="PhoneIcon" class="mr-75" />
                  <span class="label">{{ $t("Global.status") }}</span>
                </th>
                <td>
                  {{ item.status }}
                </td>
              </tr>
              <tr>
                <th>
                  <feather-icon icon="PhoneIcon" class="mr-75" />
                  <span class="label">{{ $t("Global.joptitle") }}</span>
                </th>
                <td>
                  {{ item.joptitle }}
                </td>
                <th >
                  <feather-icon icon="PhoneIcon" class="mr-75" />
                  <span class="label">{{ $t("Global.department") }}</span>
                </th>
                <td>
                  {{ item.department }}
                </td>
              </tr>
              <tr>
                <th class="pb-50 d-flex flex-wrap">
                  <feather-icon icon="CodeIcon" class="mr-75" />
                  <span class="label">{{ $t("Global.address") }}</span>
                </th>
                <td class="pb-50">
                  <span>{{ item.address }}</span>
                </td>
              </tr>
            </table>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col cols="12" xl="12" lg="12" md="12">
      <b-card>
        <b-tabs lazy vertical nav-wrapper-class="nav-hidden" align="left">
          <slot name="add_tab"></slot>
        </b-tabs>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BTabs,
  BLink,
  BTab,
  BCardText,
  BCard,
  BCol,
  BRow,
  BAvatar,
  BOverlay,
} from "bootstrap-vue";
import { mapGetters } from "vuex";
import List from "@/views/components/info/list";

export default {
  components: {
    List,
    BCardText,
    BTabs,
    BLink,
    BTab,
    BCard,
    BAvatar,
    BCol,
    BRow,
    BOverlay,
  },
  props: {
    item: null,
    load: false,
  },

  data() {
    return {
      file: null,
      loading: false,
    };
  },

  computed: {
    id() {
      return this.$route.params.id ? this.$route.params.id : null;
    },
  },

  methods: {
    restore(userId) {
      this.$swal({
        title: `${this.$t("Global.deleteTitle")}`,
        text: "You Will Activate User!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: `${this.$t("Global.cancel")}`,
        confirmButtonText: "Yes, Activate!",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("users/restore", userId).then((_) => {
            this.$emit("refresh");
            this.$swal({
              icon: "success",
              text: this.$t("Global.successMessage"),
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    },
    remove(userId) {
      this.$swal({
        title: `${this.$t("Global.deleteTitle")}`,
        text: `${this.$t("Global.deleteText")}`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: `${this.$t("Global.cancel")}`,
        confirmButtonText: `${this.$t("Global.deleteBtn")}`,
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch("users/remove", userId).then((_) => {
            this.$emit("refresh");
            this.$swal({
              icon: "success",
              text: this.$t("Global.deletedUser"),
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    },
    open_role(id) {
      window.open(
        this.$router.resolve({ name: "user-role", params: { id: id } }).href,
        "_blank"
      );
    },
    uploadPhoto() {
      let data = new FormData();
      data.append("file", this.file);
      data.append("short_name", "PERSONAL_PHOTO");
      let payload = {
        id: this.item ? this.item.archive_id : null,
        photo_archive_id:
          this.item && this.item.photo_archive_id
            ? this.item.photo_archive_id
            : null,
        query: data,
      };
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(this.file.name)) {
        this.errorToast(this.$t("Global.extension_error"));
      } else {
        this.loading = true;
        this.$store.dispatch("users/uploadPhoto", payload).then((_) => {
          this.$store.dispatch("users/get", this.id);
          this.loading = false;
        });
      }
    },
    changePhoto(e) {
      this.file = e.target.files[0];
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        // this.status = true;
        // this.previewImage = e.target.result;
        this.uploadPhoto();
      };
    },
  },
};
</script>

<style lang="scss">
.top_left {
  top: -15px;
  left: -15px;
}
</style>
