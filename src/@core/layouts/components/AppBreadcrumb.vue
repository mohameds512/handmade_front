<template>
  <div
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    id="myHeader"
    class="floating-nav header-navbar"
  >

    <!-- Content Left -->
    <div class="breadcrumbs-top">
      <div>
        <!-- <h2 class="content-header-title float-left pr-1 mb-0">
                    {{ t($route.meta.pageTitle) }}
                  </h2> -->
        <div class="breadcrumb-wrapper">
          <b-breadcrumb>
            <b-breadcrumb-item to="/">
              <feather-icon icon="HomeIcon" size="16" class="align-text-top" />
            </b-breadcrumb-item>
            <!-- {{$route.meta.breadcrumb}} -->
            <!-- {{moreDetails}} -->
            <!-- <b-breadcrumb-item v-if="moreDetails" :active="moreDetails.active" :to="'moreDetails'">
                          {{ moreDetails ? $i18n.locale == 'ar'? moreDetails.name_local || moreDetails.name : moreDetails.name || moreDetails.name_local  : '' }}
                        </b-breadcrumb-item> -->
            <!-- <b-breadcrumb-item v-if="moreDetails.length"  v-for="item in moreDetails" :active="false" >
                          {{  $i18n.locale == 'ar'? item.name_local || item.name : item.name || item.name_local  }}
                        </b-breadcrumb-item>  -->
            <b-breadcrumb-item
              v-if="$store.getters['app/path'].length == 0"
              v-for="item in breadCrumbTree"
              :key="item.text"
              :active="item.active"
              :to="
                item.type && item.type == 'link'
                  ? item.to + $route.params.id
                  : item.to
              "
            >
              {{
                item.active && item.text != "add" && pageDetails
                  ? $i18n.locale == "ar"
                    ? pageDetails.name_local || pageDetails.name
                    : pageDetails.name || pageDetails.name_local
                  : t(item.text)
              }}
            </b-breadcrumb-item>

            <b-breadcrumb-item
              v-else
              v-for="item in $store.getters['app/path']"
              :key="item.name"
              :active="item.active"
              :to="item.route ? item.route : ''"
            >
              {{ t(item.name) }}
            </b-breadcrumb-item>
            <b-breadcrumb-item v-if="$route.query.bread" :active="true">
              {{ t($route.query.bread) }}
            </b-breadcrumb-item>
          </b-breadcrumb>
        </div>
      </div>
    </div>

    <!-- Content Right -->
    <!-- <b-col class="content-header-right text-md-right d-md-block d-none mb-1" md="3" cols="12">
              <b-dropdown variant="link" no-caret toggle-class="p-0" right>
                <template #button-content>
                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-icon">
                    <feather-icon icon="SettingsIcon" />
                  </b-button>
                </template>

                <b-dropdown-item :to="{ name: 'apps-todo' }">
                  <feather-icon icon="CheckSquareIcon" size="16" />
                  <span class="align-middle ml-50">Todo</span>
                </b-dropdown-item>

                <b-dropdown-item :to="{ name: 'apps-chat' }">
                  <feather-icon icon="MessageSquareIcon" size="16" />
                  <span class="align-middle ml-50">Chat</span>
                </b-dropdown-item>

                <b-dropdown-item :to="{ name: 'apps-email' }">
                  <feather-icon icon="MailIcon" size="16" />
                  <span class="align-middle ml-50">Email</span>
                </b-dropdown-item>

                <b-dropdown-item :to="{ name: 'apps-calendar' }">
                  <feather-icon icon="CalendarIcon" size="16" />
                  <span class="align-middle ml-50">Calendar</span>
                </b-dropdown-item>
              </b-dropdown>
            </b-col> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { useUtils as useAclUtils } from "@core/libs/acl";
import { useUtils as useI18nUtils } from "@core/libs/i18n";

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  setup(props) {
    const { t } = useI18nUtils();
    const { canViewVerticalNavMenuLink } = useAclUtils();

    return {
      t,
    };
  },
  methods: {
    addSticky() {
      var header = document.getElementById("myHeader");
      if (header) {
        var sticky = header.offsetTop;
        if (window.pageYOffset > 10) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    },
  },
  watch: {
    // pageDetails(newVal,oldVal){
    //   console.log("route",this.$route);
    //   console.log("windows",window.history);
    //   window.onpopstate = function() {
    //     this.$store.commit('app/BACK')
    //   }.bind(this);
    //   this.$store.commit('app/UPDATE_MORE_DETAILS',{active:true,text:'test',type:false,name:newVal?.name,name_local:newVal?.name_local,id:newVal?.id})
    // }
    //  $route(to, from) {
    //   console.log('from',from)
    //   console.log('to',to)
    //   console.log("moreDetails",this.moreDetails);
    //   window.onpopstate = function() {
    //     console.log("window");
    //     // console.log("beformoreditails",this.moreDetails);
    //     this.$store.commit('app/BACK')
    //     // console.log("moreditails",this.moreDetails);
    //   }.bind(this);
    //   // if(!to.params.id){
    //   //   this.$store.commit('app/UPDATE_MORE_DETAILS',[])
    //   // }
    // },
  },
  // beforeRouteLeave(to, from, next) {
  //       console.log('from',from)
  //     console.log('to',to)
  //     console.log('next',next)
  //   // if no hash then handle back button
  //   if (!to.hash) {
  //     // handleBackButton();
  //     // next(false); // this stops the navigation
  //     // return;
  //   }
  // },
  created() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.addSticky);
    });
  },
  computed: {
    ...mapGetters({
      pageDetails: "app/pageDetails",
      moreDetails: "app/moreDetails",
    }),
    breadCrumbTree() {
      // if(this.moreDetails.length){
      //   var theRemovedElement = this.$route.meta.breadcrumb.shift();
      //   return this.$route.meta.breadcrumb
      // }
      return this.$route.meta.breadcrumb;
    },
  },
};
</script>

<style lang="scss">
#myHeader {
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}
</style>
