import Vue from 'vue'
import Cookies from 'js-cookie'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import Fuse from 'fuse.js'
import store from '@/store/index'
import locale from "@core/layouts/components/app-navbar/components/Locale";

const { t } = useI18nUtils()

Vue.mixin({
  methods: {
    removeObject(data, excepts) {
      excepts.forEach(el => {
        delete data[el]
      })
      return data
    },
    getSelectLabel() {
      return this.$i18n.locale == 'en' ? 'name' : 'name_local'
    },
    setMoreDetails(data) {
      this.$store.commit('app/UPDATE_MORE_DETAILS', data)
    },
    shortMyText(text, n = null) {
      if (text) {
        if (n) {
          if (text.length <= n) return text
          return `${text.substr(0, n)}...`
        }
        if (text.length <= 15) return text
        return `${text.substr(0, 18)}...`
      }
    },
    fuseSearch(options, search) {
      const fuse = new Fuse(options, {
        keys: ['name', 'name_local'],
        shouldSort: true,
      })
      return search.length
        ? fuse.search(search).map(({ item }) => item)
        : fuse.list
    },
    hasPermission(permission, checkFromUserAccess = false) {
      if (permission === 'public') return true

      const userAccessPermissions = store.getters['roles/userAccessPermissions']
      if (checkFromUserAccess) {
        return permissions.includes(permission)
      }

      return store.getters['roles/authUserRolesPermissionsName'].includes(permission) || store.getters['roles/authUserPermissionsName'].includes(permission) || (userAccessPermissions && userAccessPermissions.includes(permission))
    },
    hasNoPermission(permission) {
      return store.getters['roles/authUserRolesPermissionsName'].includes(permission)
    },
    getOptions(lookups, option) {
      let data = []
      if (option) {
        if (lookups.some(el => el.id == option.id)) {
          data = lookups
        } else {
          data = [...lookups, option]
        }
      } else {
        data = lookups
      }
      return data
    },
    transform(item, includes, excepts) {
      if (includes && item) {
        let arKey
        arKey = Object.keys(item).filter(param => param.includes('local'))
        let enKey
        enKey = arKey.map(key => key.toString().replace('_local', ''))
        if (this.$i18n.locale == 'ar') {
          return Object.entries(item)
            .map(([key, value]) => ({ key, value }))
            .filter(param => includes.includes(param.key) && !enKey.includes(param.key) && !param.key.includes('_id'))
        }
        return Object.entries(item)
          .map(([key, value]) => ({ key, value }))
          .filter(param => includes.includes(param.key) && !arKey.includes(param.key) && !param.key.includes('_id'))
      }
      if (excepts && item) {
        let arKey
        arKey = Object.keys(item).filter(param => param.includes('local'))
        let enKey
        enKey = arKey.map(key => key.toString().replace('_local', ''))
        if (this.$i18n.locale == 'ar') {
          return Object.entries(item)
            .map(([key, value]) => ({ key, value }))
            .filter(param => !excepts.includes(param.key) && !param.key.includes('_id'))
        }
        return Object.entries(item)
          .map(([key, value]) => ({ key, value }))
          .filter(param => !excepts.includes(param.key) && !param.key.includes('_id'))
      }
    },
    avatarText(value) {
      if (!value) return ''
      return value.charAt(0).toUpperCase()
    },
    user_photo(id) {
      return `${process.env.VUE_APP_BASE_URL}/photo/${id}?hash=${Math.random()}`
    },
    authUser() {
      if (Cookies.get('user')) {
        const auth = JSON.parse(Cookies.get('user'))
        if (auth) {
          return auth
        }
      }
      return {}
    },

    getStatus(status, state = 'removed') {
      if (state == 'status') {
        if (status === 0 || !status || status == 'incomplete') {
          return {
            color: 'danger',
            name: 'incomplete',
          }
        }
        if (status === 1 || status == 'incomplete') {
          return {
            color: 'danger',
            name: 'danger',
          }
        }
        if (status === 2 || status == 'submitted') {
          return {
            color: 'primary',
            name: 'submitted',
          }
        }
        if (status === 4 || status == 'feedback') {
          return {
            color: 'primary',
            name: 'feedback',
          }
        }
        if (status === 5 || status == 'updated') {
          return {
            color: 'warning',
            name: 'updated',
          }
        }
        if (status === 5 || status == 'examFeesRequired') {
          return {
            color: 'primary',
            name: 'exam fees required',
          }
        }
        if (status === 6 || status == 'examRequired') {
          return {
            color: 'primary',
            name: 'exam required',
          }
        }
        if (status === 7 || status == 'distributionRequired') {
          return {
            color: 'info',
            name: 'distribution required',
          }
        }
        if (status === 9 || status == 'finalFeesRequired') {
          return {
            color: 'primary',
            name: 'final fees required',
          }
        }
        if (status === 10 || status == 'accepted') {
          return {
            color: 'primary',
            name: 'accepted',
          }
        }
        if (status === 10 || status == 'rejected') {
          return {
            color: 'danger',
            name: 'rejected',
          }
        }
        if (status === 12 || status == 'approved') {
          return {
            color: 'success',
            name: 'approved',
          }
        }
      } else {
        if (status === 2) {
          return {
            color: 'warning',
            name: 'pending',
          }
        }
        if (status === 0 || !status || status == 'paid') {
          return {
            color: 'success',
            name: `${t('Global.active')}`,
          }
        }
        if (status === 1 || status == 'unpaid') {
          console.log('in_active')
          return {
            color: 'danger',
            name: `${t('Global.in_active')}`,
          }
        }
      }

      return 'primary'
    },
    getStatusList(translate) {
      const list = [
        {
          label: translate ? 'active' : t('Global.active'),
          value: 0,
        },
        {
          label: translate ? 'in_active' :t('Global.in_active'),
          value: 1,
        },
        // {
        //   label: `${t('Global.pending')}`,
        //   value: 2,
        // },
      ]
      return list
    },
    getReviewsList(status) {
      if (status === 0) {
        return {
          color: 'success',
          name: 'active',
        }
      }
      if (status === 1) {
        return {
          color: 'danger',
          name: 'inactive',
        }
      }

      return 'primary'
    },
    getStatusList2() {
      const list = [
        {
          label: 'Activate',
          value: 0,
        },
        {
          label: 'Inactivate',
          value: 1,
        },
      ]
      return list
    },
    underPostGraduate(flag) {
      if (flag === 1) {
        return {
          color: 'success',
          name: `${t('Global.undergraduate')}`,
        }
      }
      if (flag === 2) {
        return {
          color: 'success',
          name: `${t('Global.postgraduate')}`,
        }
      }
    },
    isAuthUser(user_id) {
      const auth = JSON.parse(Cookies.get('user'))
      if (auth && user_id) {
        return auth.id === user_id
      }
    },

    isAuth(user) {
      const auth = JSON.parse(Cookies.get('user'))
      if (auth && user) {
        return auth.id === user.id
      }
    },
    isEqualStatus(s1, s2) {
      if (s1) {
        return s1.status === s2
      }
    },
    isEqualCurrentStatus(s1, s2) {
      if (s1) {
        return s1.current_status === s2
      }
    },
    isGthCurrentStatus(s1, s2) {
      if (s1) {
        return s1.current_status > s2
      }
    },
    isNotEqualStatus(s1, s2) {
      if (s1) {
        return s1.status !== s2
      }
    },
    isGthStatus(s1, s2) {
      if (s1) {
        return s1.status > s2
      }
    },
    isLthStatus(s1, s2) {
      if (s1) {
        return s1.status < s2
      }
    },
    isLthEqStatus(s1, s2) {
      if (s1) {
        return s1.status <= s2
      }
    },
    ntBr(string) {
      if (string) {
        return string.replace(/\n/g, '<br />')
      }
    },

    compare(oldReport, newReport) {
      let dif = ' '
      Diff.diffWords(oldReport, newReport).forEach(part => {
        dif += part.added ? `<ins style="text-decoration: none; color: #00796B;background: #E0F2F1">${`${part.value} `}</ins>` : part.removed ? `<del style="color: #b30000;background: #fadad7">${`${part.value} `}</del>` : `<span>${`${part.value} `}</span>`
      })
      return dif
    },
    numberWithCommas(x) {
      return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x
    },
    toLocalDatetime(input, lang = 'ar', time = false, year = true) {
      const datetime = new Date(input)
      datetime.getTimezoneOffset()
      if (time) {
        if (year) {
          return datetime.toLocaleTimeString(`${lang == 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'}`, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        }
        return datetime.toLocaleTimeString(`${lang == 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'}`, {
          month: 'short',
          day: 'numeric',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })
      }
      return datetime.toLocaleDateString(`${lang == 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'}`, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
    toLocalYear(input, lang = 'ar', time = false) {
      const datetime = new Date(input)
      datetime.getTimezoneOffset()
      if (time) {
        return datetime.toLocaleTimeString(`${lang == 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'}`, {
          year: 'numeric',
        })
      }
      return datetime.toLocaleDateString(`${lang == 'ar' ? 'ar-EG-u-nu-latn' : 'en-US'}`, {
        year: 'numeric',
      })
    },
    isGthEqStatus(s1, s2) {
      if (s1) {
        return s1.status >= s2
      }
    },
    getTeamElements(team, role) {
      if (team) {
        const teamByRole = team.all_members.filter(member => member.team_job === role)
        switch (role) {
          case this.constants('LEADER'):
            return teamByRole[0] ? teamByRole[0].id : null
          case this.constants('MEMBER'):
            return teamByRole ? Array.from(teamByRole, member => member.id) : []
          case this.constants('COMMITTEE'):
            return teamByRole ? Array.from(teamByRole, member => member.id) : []
          case this.constants('OBSERVE'):
            return teamByRole ? Array.from(teamByRole, member => member.id) : []
          default:
            return teamByRole
        }
      }
    },
    getRepresentative(Representative) {
      if (Representative) {
        return Representative ? Representative.id : null
      }
    },
    getTrainers(trainers) {
      if (trainers && trainers.length) {
        return Array.from(trainers, member => member.pivot.member_id)
      }
      return []
    },
    getTeamMember(team, role) {
      if (team) {
        const teamByRole = team.all_members.filter(member => member.team_job === role)
        switch (role) {
          case this.constants('LEADER'):
            return teamByRole[0] ? teamByRole[0].id : null
          case this.constants('MEMBER'):
            return teamByRole ? Array.from(teamByRole, member => member.id) : []
          case this.constants('COMMITTEE'):
            return teamByRole ? Array.from(teamByRole, member => member.id) : []
          case this.constants('REVIEWERS'):
            return teamByRole ? Array.from(teamByRole, member => member.id) : []
          case this.constants('OBSERVE'):
            return teamByRole ? Array.from(teamByRole, member => member.id) : []
          default:
            return teamByRole
        }
      }
    },
    hideClass(className) {
      const elementName = this.$el.querySelectorAll(`${className}`)
      elementName.forEach(element => {
        element.style.display = 'none'
      })
    },
    // checkIfDone(){
    // //   let elementName = this.$el.querySelectorAll('#parent_true');

    // //   if(this.$store.getters['submission/allDocuments'][1].folders.length == elementName.length) return true;
    // },
    checkSubIfExist(uploadedDocs, subDocs) {
      const shortUploadedDocs = []
      const shortSubDocs = []
      uploadedDocs.forEach(element => {
        shortUploadedDocs.push(element.short_name)
      })
      subDocs.forEach(element => {
        shortSubDocs.push(element.short_name)
      })
      const found = shortUploadedDocs.some(r => shortSubDocs.indexOf(r) >= 0)
      return found
    },
    getCountOfUploadsFiles(uploadedDocs, short_names, form) {
      const count = []
      if (uploadedDocs) {
        short_names.forEach((element, index) => {
          const document = this.getDocByShortName(uploadedDocs, element.short_name)
          if (document && element.form == form) {
            count.push(document)
          }
        })
        return count.length
      }
    },
    getUploadsFiles(uploadedDocs, short_names) {
      if (uploadedDocs) {
        short_names.forEach((element, index) => {
          const document = this.getDocByShortName(uploadedDocs, element.short_name)
          short_names[index].document = document || false
        })
        return short_names
      }
    },
    documentsDone(uploadedDocs, short_names) {
      if (uploadedDocs) {
        let status = true
        short_names.forEach((element, index) => {
          const document = this.getDocByShortName(uploadedDocs, element.short_name)
          if (!document) {
            status = false
          }
        })
        return status
      }
    },
    checkIfExist(docs, short_name) {
      const existFiles = []
      docs.forEach(element => {
        existFiles.push(element.short_name)
      })
      return existFiles.includes(short_name)
    },
    getDocSize(docs, short_name) {
      let document = ''
      docs.forEach(element => {
        if (element.short_name == short_name) {
          document = `(${element.size})`
        }
      })
      return document
    },
    getDocDate(docs, short_name) {
      let document = ''
      docs.forEach(element => {
        if (element.short_name == short_name) {
          document = `(${this.toLocalDatetime(element.updated_at)})`
        }
      })
      return document
    },
    getDocId(docs, short_name) {
      let document = null
      docs.forEach(element => {
        if (element.short_name == short_name) {
          document = element.id
        }
      })
      return document
    },
    getDocByShortName(docs, short_name) {
      let document = false
      docs.forEach(element => {
        if (element.short_name === short_name) {
          document = element
        }
      })
      return document
    },
    getDocUrl(docs, short_name) {
      let document = null
      docs.forEach(element => {
        if (element.short_name == short_name) {
          document = element.url
        }
      })
      return document
    },
    documentType(index) {
      const APPROVAL_ORGANIZATION = 1
      const AUTHORIZATION_ORGANIZATION = 2
      const INTERNAL_FIRST_REGULATION = 3
      const FINANCIAL_LETTER = 4

      const STRATEGIC_PLAN = 5
      const SELF_STUDY = 6
      const PROGRAMS_FIRST_DESCRIPTION = 7
      const PROGRAM_REPORTS = 8
      const INTERNAL_REGULATION = 9
      const PROGRAMS_HIGH_DESCRIPTION = 10
      const YEAR_REPORTS = 11
      const ORGANIZATION_VIDEO = 12
      const EXTENSION_SELF_REPORT = 13
      const IMPROVEMENT_PLAN = 14
      const SUPPORT_FILE = 15

      switch (index) {
        case APPROVAL_ORGANIZATION:
          return 'APPROVAL_ORGANIZATION'
        case AUTHORIZATION_ORGANIZATION:
          return 'AUTHORIZATION_ORGANIZATION'
        case INTERNAL_FIRST_REGULATION:
          return 'INTERNAL_FIRST_REGULATION'
        case FINANCIAL_LETTER:
          return 'FINANCIAL_LETTER'
        case STRATEGIC_PLAN:
          return 'STRATEGIC_PLAN'
        case SELF_STUDY:
          return 'SELF_STUDY'
        case PROGRAMS_FIRST_DESCRIPTION:
          return 'PROGRAMS_FIRST_DESCRIPTION'
        case PROGRAM_REPORTS:
          return 'PROGRAM_REPORTS'
        case INTERNAL_REGULATION:
          return 'INTERNAL_REGULATION'
        case PROGRAMS_HIGH_DESCRIPTION:
          return 'PROGRAMS_HIGH_DESCRIPTION'
        case YEAR_REPORTS:
          return 'YEAR_REPORTS'
        case ORGANIZATION_VIDEO:
          return 'ORGANIZATION_VIDEO'
        case EXTENSION_SELF_REPORT:
          return 'EXTENSION_SELF_REPORT'
        case IMPROVEMENT_PLAN:
          return 'IMPROVEMENT_PLAN'
        case SUPPORT_FILE:
          return 'SUPPORT_FILE'
      }
    },
    mandatoryDocs(mandatoryFiles, uploadedFile) {
      const document = []
      if (mandatoryFiles[0]) {
        mandatoryFiles[0].documents.forEach(reqFile => {
          uploadedFile.forEach(uploadedFile => {
            if (reqFile.short_name == uploadedFile.short_name) {
              document.push(reqFile)
            }
          })
        })
      }
      return document
    },

    showConstants(type, key) {
      const showTypes = [
        {
          id: 1,
          name: 'DEFUALT_APPROVAL',
        },
        {
          id: 2,
          name: 'SUBMISSION_UPDATE',
        },
        {
          id: 3,
          name: 'FINANCE_UPDATE',
        },
        {
          id: 4,
          name: 'TEAM_UPDATE',
        },
        {
          id: 8,
          name: 'VISIT_UPDATE',
        },
        {
          id: 5,
          name: 'MEMBER_APPROVAL',
        },
        {
          id: 6,
          name: 'REPORT_APPROVAL',
        },
        {
          id: 7,
          name: 'REPORT_APPROVAL_TEAM_COMMITTEE',
        },
        {
          id: 9,
          name: 'LEADER_APPROVAL',
        },
        {
          id: 10,
          name: 'NO_CHANGE',
        },
      ]
      if (type == 'array') {
        return showTypes
      } if (type == 'num') {
        if (key) {
          const filtered = showTypes.find(el => el.id == key)
          return filtered.name
        }
      } else if (type == 'string') {
        if (key) {
          const filtered = showTypes.find(el => el.name == key)
          return filtered.id
        }
      }
    },

    // tr_taskConstants: function (type, key) {
    //     let tasks = [
    //         {id: 1, name: 'coach'},
    //         {id: 2, name: 'trainee'},
    //         {id: 3, name: 'plan_manager'},
    //     ];
    //     if (type == 'array') {
    //         return tasks;
    //     } else if (type == 'num') {
    //         if (key) {
    //             let filtered = tasks.find(el => el.id == key);
    //             return filtered.name;
    //         }
    //     } else if (type == 'string') {
    //         if (key) {
    //             let filtered = tasks.find(el => el.name == key);
    //             return filtered.id;
    //         }
    //     }
    // },

    taskConstants(type, key, system = 1) {
      let tasks = []
      if (system == 3) {
        tasks = [
          {
            id: 1,
            name: 'COACH_TASK',
          },
          {
            id: 2,
            name: 'TRAINEE_TASK',
          },
          {
            id: 14,
            name: 'TRAINING_MANAGER_TASK',
          },
          {
            id: 5,
            name: 'VICE_TASK',
          },
          {
            id: 6,
            name: 'PRESIDENT_TASK',
          },
          {
            id: 7,
            name: 'FINANCE_TASK',
          },
        ]
      } else {
        tasks = [
          {
            id: 1,
            name: 'TEAM_TASK',
          },
          {
            id: 2,
            name: 'ORGANIZATION_TASK',
          },
          {
            id: 3,
            name: 'COMMITTEE_TASK',
          },
          {
            id: 4,
            name: 'ACCREDITATION_TASK',
          },
          {
            id: 5,
            name: 'VICE_TASK',
          },
          {
            id: 6,
            name: 'PRESIDENT_TASK',
          },
          {
            id: 7,
            name: 'FINANCE_TASK',
          },
          {
            id: 8,
            name: 'MANAGER_TASK',
          },
          {
            id: 9,
            name: 'TEAM_COMMITTEE_TASK',
          },
          {
            id: 11,
            name: 'TEAM_LEADER_TASK',
          },
          {
            id: 12,
            name: 'MANAGER_ACCREDITATION_TASK',
          },
          {
            id: 13,
            name: 'PUBLIC_RELATIONS_LEADER_TASK',
          },
        ]
      }
      if (type == 'array') {
        return tasks
      } if (type == 'num') {
        if (key) {
          const filtered = tasks.find(el => el.id == key)
          return filtered.name
        }
      } else if (type == 'string') {
        if (key) {
          const filtered = tasks.find(el => el.name == key)
          return filtered.id
        }
      }
    },

    updateConstants(type, key) {
      const updates = [
        {
          id: 1,
          name: 'DOCUMENTS_UPDATE',
        },
        {
          id: 2,
          name: 'REPORT_UPDATE',
        },
        {
          id: 3,
          name: 'ADD_COMMENT',
        },
        {
          id: 4,
          name: 'TAKE_DECISION',
        },
        {
          id: 0,
          name: 'NO_CHANGE',
        },
      ]
      if (type == 'array') {
        return updates
      } if (type == 'num') {
        if (key) {
          const filtered = updates.find(el => el.id == key)
          return filtered.name
        }
      } else if (type == 'string') {
        if (key) {
          const filtered = updates.find(el => el.name == key)
          return filtered.id
        }
      }
    },

    evaluatorCheck(arr, system = 1) {
      const checkArray = this.evaluatorConstants('string', arr, system)
      const AuthArray = this.$store.state.evaluation.evaluator
      if (AuthArray) {
        return checkArray.some(type => AuthArray.some(f => f == type))
      }
    },

    createdByConstants(type, key, system = 1) {
      let evaluators = []
      if (system == 3) {
        evaluators = [
          {
            id: 1,
            name: 'COACH_TYPE',
          },
          {
            id: 2,
            name: 'TRAINEE_TYPE',
          },
          {
            id: 4,
            name: 'TRAINING_MANAGER_TYPE',
          },
          {
            id: 5,
            name: 'VICE_TYPE',
          },
          {
            id: 6,
            name: 'PRESIDENT_TYPE',
          },
          {
            id: 12,
            name: 'FINANCE_TYPE',
          },
        ]
      } else {
        evaluators = [
          {
            id: 1,
            name: 'TEAM_TYPE',
          },
          {
            id: 2,
            name: 'ORGANIZATION_TYPE',
          },
          {
            id: 3,
            name: 'COMMITTEE_TYPE',
          },
          {
            id: 4,
            name: 'ACCREDITATION_TYPE',
          },
          {
            id: 5,
            name: 'VICE_TYPE',
          },
          {
            id: 6,
            name: 'PRESIDENT_TYPE',
          },
          {
            id: 7,
            name: 'MANAGER_TYPE',
          },
          {
            id: 8,
            name: 'LEADER_TYPE',
          },
          {
            id: 9,
            name: 'MEMBER_TYPE',
          },
          {
            id: 10,
            name: 'REVIEWER_TYPE',
          },
          {
            id: 11,
            name: 'MANAGER_ACCREDITATION_TYPE',
          },
          {
            id: 12,
            name: 'FINANCE_TYPE',
          },
        ]
      }
      if (type == 'array') {
        return evaluators
      } if (type == 'num') {
        if (key) {
          const filtered = evaluators.find(el => el.id == key)
          return filtered.name
        }
      } else if (type == 'string' && typeof key === 'string') {
        if (key) {
          const filtered = evaluators.find(el => el.name == key)
          return filtered ? filtered.id : null
        }
      } else if (type == 'string' && Array.isArray(key)) {
        if (key) {
          const ids = evaluators.filter(type => key.some(f => f == type.name))
          return ids.map(el => el.id)
        }
        // if (key) {
        //   let filtered = evaluators.find(el => el.name == key);
        //   return filtered.id;
        // }
      }
    },

    evaluatorConstants(type, key, system = 1) {
      let evaluators = []
      if (system == 3) {
        evaluators = [
          {
            id: 1,
            name: 'COACH_TYPE',
          },
          {
            id: 2,
            name: 'TRAINEE_TYPE',
          },
          {
            id: 13,
            name: 'TRAINING_MANAGER_TYPE',
          },
          {
            id: 5,
            name: 'VICE_TYPE',
          },
          {
            id: 6,
            name: 'PRESIDENT_TYPE',
          },
          {
            id: 12,
            name: 'FINANCE_TYPE',
          },
        ]
      } else {
        evaluators = [
          {
            id: 1,
            name: 'TEAM_TYPE',
          },
          {
            id: 2,
            name: 'ORGANIZATION_TYPE',
          },
          {
            id: 3,
            name: 'COMMITTEE_TYPE',
          },
          {
            id: 4,
            name: 'ACCREDITATION_TYPE',
          },
          {
            id: 5,
            name: 'VICE_TYPE',
          },
          {
            id: 6,
            name: 'PRESIDENT_TYPE',
          },
          {
            id: 7,
            name: 'MANAGER_TYPE',
          },
          {
            id: 8,
            name: 'LEADER_TYPE',
          },
          {
            id: 9,
            name: 'MEMBER_TYPE',
          },
          {
            id: 10,
            name: 'REVIEWER_TYPE',
          },
          {
            id: 11,
            name: 'MANAGER_ACCREDITATION_TYPE',
          },
          {
            id: 12,
            name: 'FINANCE_TYPE',
          },
        ]
      }
      if (type == 'array') {
        return evaluators
      } if (type == 'num') {
        if (key) {
          const filtered = evaluators.find(el => el.id == key)
          return filtered.name
        }
      } else if (type == 'string' && typeof key === 'string') {
        if (key) {
          const filtered = evaluators.find(el => el.name == key)
          return filtered ? filtered.id : null
        }
      } else if (type == 'string' && Array.isArray(key)) {
        if (key) {
          const ids = evaluators.filter(type => key.some(f => f == type.name))
          return ids.map(el => el.id)
        }
        // if (key) {
        //   let filtered = evaluators.find(el => el.name == key);
        //   return filtered.id;
        // }
      }
    },

    constants(key) {
      const REFUSE_STATUS = 0
      const FILL_INFO_STATUS = 1
      const FINANCE_STATUS = 2
      const QUALITY_STATUS = 3
      const ACTIVE_VISIT_STATUS = 4
      const ACTIVE_TEAM_STATUS = 5
      const APPROVE_STATUS = 6
      const UPDATE_REQUIREMENT_STATUS = 7
      const REPRESENTATIVE_REFUSE_STATUS = 8
      const REPRESENTATIVE_APPROVE_VISIT_STATUS = 9
      const REPRESENTATIVE_APPROVE_TEAM_STATUS = 10
      const NOT_ACTIVE_TEAM_STATUS = 11
      const FINAL_APPROVE_STATUS = 12
      const PRESIDENT_APPROVE_STATUS = 13
      const PRESIDENT_REFUSE_STATUS = 14
      const FINANCE_APPROVE_STATUS = 15
      const FINANCE_REFUSE_STATUS = 16
      const NOT_EXCUSED__STATUS = 0
      const EXCUSED_STATUS = 1

      const PRE_APPROVE_STATUS = 1
      const PRE_REFUSE_STATUS = 0

      const LEADER = 1
      const MEMBER = 2
      const OBSERVE = 5
      const COMMITTEE = 6
      const REVIEWERS = 7

      switch (key) {
        case 'REFUSE_STATUS':
          return Number(REFUSE_STATUS)
        case 'PRESIDENT_APPROVE_STATUS':
          return Number(PRESIDENT_APPROVE_STATUS)
        case 'PRESIDENT_REFUSE_STATUS':
          return Number(PRESIDENT_REFUSE_STATUS)
        case 'FILL_INFO_STATUS':
          return FILL_INFO_STATUS
        case 'FINANCE_STATUS':
          return FINANCE_STATUS
        case 'QUALITY_STATUS':
          return QUALITY_STATUS
        case 'ACTIVE_VISIT_STATUS':
          return ACTIVE_VISIT_STATUS
        case 'ACTIVE_TEAM_STATUS':
          return ACTIVE_TEAM_STATUS
        case 'APPROVE_STATUS':
          return APPROVE_STATUS
        case 'UPDATE_REQUIREMENT_STATUS':
          return UPDATE_REQUIREMENT_STATUS
        case 'REPRESENTATIVE_REFUSE_STATUS':
          return REPRESENTATIVE_REFUSE_STATUS
        case 'REPRESENTATIVE_APPROVE_VISIT_STATUS':
          return REPRESENTATIVE_APPROVE_VISIT_STATUS
        case 'REPRESENTATIVE_APPROVE_TEAM_STATUS':
          return REPRESENTATIVE_APPROVE_TEAM_STATUS
        case 'FINANCE_APPROVE_STATUS':
          return Number(FINANCE_APPROVE_STATUS)
        case 'FINANCE_REFUSE_STATUS':
          return Number(FINANCE_REFUSE_STATUS)
        case 'NOT_ACTIVE_TEAM_STATUS':
          return NOT_ACTIVE_TEAM_STATUS
        case 'FINAL_APPROVE_STATUS':
          return FINAL_APPROVE_STATUS
        case 'NOT_EXCUSED__STATUS':
          return NOT_EXCUSED__STATUS
        case 'EXCUSED_STATUS':
          return EXCUSED_STATUS
        case 'PRE_APPROVE_STATUS':
          return PRE_APPROVE_STATUS
        case 'PRE_REFUSE_STATUS':
          return PRE_REFUSE_STATUS
        case 'LEADER':
          return LEADER
        case 'MEMBER':
          return MEMBER
        case 'OBSERVE':
          return OBSERVE
        case 'COMMITTEE':
          return COMMITTEE
        case 'REVIEWERS':
          return REVIEWERS
        default:
          return null
      }
    },
    getTypeOfUser(type) {
      switch (type) {
        case 1:
          return `${this.$t('Global.member')}`
        case 2:
          return `${this.$t('Global.Creator')}`
        case 3:
          return `${this.$t('Global.committee_type')}`
        case 4:
          return `${this.$t('Global.ACCREDITATION_TYPE')}`
        case 5:
          return `${this.$t('Global.VICE_TYPE')}`
        case 6:
          return `${this.$t('Global.PRESIDENT_TYPE')}`
        case 7:
          return `${this.$t('Global.MANAGEMENT_TYPE')}`
        case 8:
          return `${this.$t('Global.team')}`
        default:
          return null
      }
    },
    getTypeOfReq(key) {
      switch (key) {
        case 'TRAINEE_COORDINATOR':
          return 1
        case 'PRE_UNIVERSITY_COORDINATOR':
          return 2
        case 'HIGHER_EDUCATION_COORDINATOR':
          return 3
        case 'HIGH_REVIEWER':
          return 4
        case 'PRE_REVIEWER':
          return 5
        default:
          return null
      }
    },

    evConstants(key) {
      const REJECT_STATUS = 0
      const TEAM_TYPE = 1
      const ORGANIZATION_TYPE = 2
      const COMMITTEE_TYPE = 3
      const ACCREDITATION_TYPE = 4
      const VICE_TYPE = 5
      const PRESIDENT_TYPE = 6
      const MANAGER_TYPE = 7
      const REVIEWER_TYPE = 10

      switch (key) {
        case 'APPROVE_STATUS':
          return APPROVE_STATUS
        case 'REJECT_STATUS':
          return REJECT_STATUS
        case 'TEAM_TYPE':
          return TEAM_TYPE
        case 'ORGANIZATION_TYPE':
          return ORGANIZATION_TYPE
        case 'COMMITTEE_TYPE':
          return COMMITTEE_TYPE
        case 'ACCREDITATION_TYPE':
          return ACCREDITATION_TYPE
        case 'VICE_TYPE':
          return VICE_TYPE
        case 'PRESIDENT_TYPE':
          return PRESIDENT_TYPE
        case 'MANAGER_TYPE':
          return MANAGER_TYPE
        case 'REVIEWER_TYPE':
          return REVIEWER_TYPE
        default:
          return null
      }
      const APPROVE_STATUS = 1
    },

    isImage(ex) {
      if (ex) {
        const extension = ex.toLowerCase()
        if (extension == 'jpg' || extension == 'png' || extension == 'gif' || extension == 'tif' || extension == 'jpeg' || extension == 'bmp') {
          return true
        }
      }
    },

    validation(message = null, type = 0) {
      console.log('LLLLLLLL')
      let Valid = []
      if (!message) {
        message = `${this.$t('Validation.selectFiled')}`
      }
      if (message) {
        message = this.$t(`${message}`)
      }
      if (type == 0) {
        Valid = { rule: 'required', message }
      }
      if (type == 1) {
        Valid = { rule: 'required', message }
      }
      if (type == 'textarea') {
        Valid = { rule: { regex: /\S$|\S[\s\S]*\S+/ }, message }
      }
      if (type == 'checkbox') {
        Valid = { rule: 'required', message }
      }
      if (type == 'n_id') {
        Valid = { rule: { regex: /[0-9]{14,14}/ }, message }
      }
      if (type == 'email') {
        Valid = { rule: { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ }, message }
      }
      if (type == 'phone') {
        Valid = { rule: { regex: /^[0-9]{7,15}$/, message: 'test' }, message }
      }
      if (type == 'ssn') {
        console.log('we are here !! dude ? ')
        Valid = {
          regex: /^.{1,3}$/,
        }
      }
      console.log(message)
      console.log(Valid)
      return Valid
    },
    validationMessages(message = null) {
      if (!message) {
        message = `${this.$t('Validation.selectFiled')}`
      }
      return this.$t(message)
    },
    validationRules(type = 0) {
      let rules = null
      if (type == 0 || type == 1) {
        rules = 'required'
      }
      if (type == 'textarea') {
        rules = { regex: /\S$|\S[\s\S]*\S+/ }
      }
      if (type == 'checkbox') {
        rules = 'required'
      }
      if (type == 'n_id') {
        rules = { regex: /[0-9]{14,14}/ }
      }
      if (type == 'email') {
        rules = { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ }
      }
      if (type == 'phone') {
        rules = {
          regex:
                        /(297|93|244|1264|358|355|376|971|54|374|1684|1268|61|43|994|257|32|229|226|880|359|973|1242|387|590|375|501|1441|591|55|1246|673|975|267|236|1|61|41|56|86|225|237|243|242|682|57|269|238|506|53|5999|61|1345|357|420|49|253|1767|45|1809|1829|1849|213|593|20|291|212|34|372|251|358|679|500|33|298|691|241|44|995|44|233|350|224|590|220|245|240|30|1473|299|502|594|1671|592|852|504|385|509|36|62|44|91|246|353|98|964|354|972|39|1876|44|962|81|76|77|254|996|855|686|1869|82|383|965|856|961|231|218|1758|423|94|266|370|352|371|853|590|212|377|373|261|960|52|692|389|223|356|95|382|976|1670|258|222|1664|596|230|265|60|262|264|687|227|672|234|505|683|31|47|977|674|64|968|92|507|64|51|63|680|675|48|1787|1939|850|351|595|970|689|974|262|40|7|250|966|249|221|65|500|4779|677|232|503|378|252|508|381|211|239|597|421|386|46|268|1721|248|963|1649|235|228|66|992|690|993|670|676|1868|216|90|688|886|255|256|380|598|1|998|3906698|379|1784|58|1284|1340|84|678|681|685|967|27|260|263)(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{4,14}$/,
        }
      }
      if (type == 'ssn') {
        console.log('we are here !! dude ? ')
        rules = {
          regex: /^.{1,3}$/,
          message: 'oh no oh no',
        }
      }

      return rules
    },

    getLevelText(level) {
      return `approvals_status_${level}_ensure`
    },
    getRefuseText(level) {
      return `refuse_status_${level}`
    },
    getLastReportStatus(evNote, allNotes, noteId) {
      if (allNotes.length > 1) {
        const note = allNotes.find(note => note.level == evNote.level)
        console.log('evNote', allNotes)
        if (note.id == noteId) {
          return true
        }
        return false
      }
      return false
    },
    oneLineToLines(N, string) {
      if (string) {
        const app = string.split(' ')
        const arrayApp = []
        let stringApp = ''
        app.forEach((sentence, index) => {
          stringApp += `${sentence} `

          if ((index + 1) % N === 0) {
            arrayApp.push(stringApp)
            stringApp = ''
          } else if (app.length === index + 1 && stringApp !== '') {
            arrayApp.push(stringApp)
            stringApp = ''
          }
        })
        return arrayApp
      }
    },
    getLastStatus(current, lastStatus) {
      if (lastStatus && current.status in [1, 2, 3, 4, 5, 12]) {
        return true
      }
      return false
    },
    getLevelOut(level) {
      return `approvals_status_${level}`
    },
    getpreAnswer(index) {
      switch (index) {
        case 1:
          return {
            name: `${this.$t('Global.level_1')}`,
            type: 'success',
            color: '#2eb85c',
          }
        case 2:
          return {
            name: `${this.$t('Global.level_2')}`,
            type: 'info',
            color: '#39f',
          }
        case 3:
          return {
            name: `${this.$t('Global.level_3')}`,
            type: 'warning',
            color: '#f9b115',
          }
        case 4:
          return {
            name: `${this.$t('Global.level_4')}`,
            type: 'danger',
            color: '#e55353',
          }
        default:
          return {
            name: `${this.$t('Global.noAnswer')}`,
            type: 'danger',
            color: '#e2e2e2',
          }
          break
      }
    },
    getpreAnswerAsk(index) {
      switch (index) {
        case 1:
          return {
            name: `${this.$t('Global.level_1')}`,
            type: 'info',
            color: '#2eb85c',
          }
        case 2:
          return {
            name: `${this.$t('Global.level_2')}`,
            type: 'danger',
            color: '#39f',
          }
        case 3:
          return {
            name: `${this.$t('Global.level_3')}`,
            type: 'warning',
            color: '#f9b115',
          }
        case 4:
          return {
            name: `${this.$t('Global.level_4')}`,
            type: 'danger',
            color: '#e55353',
          }
        default:
          return {
            name: `${this.$t('Global.noAnswer')}`,
            type: 'danger',
            color: '#e2e2e2',
          }
          break
      }
    },
    getPreAnswer(index) {
      switch (index) {
        case 1:
          return {
            name: `${this.$t('Global.ok')}`,
            type: 'success',
            color: '#2eb85c',
          }
        case 0:
          return {
            name: `${this.$t('Global.notOk')}`,
            type: 'danger',
            color: '#e55353',
          }
        default:
          return {
            name: `${this.$t('Global.noAnswer')}`,
            type: 'danger',
            color: '#e2e2e2',
          }
          break
      }
    },
    getAnswer(index) {
      switch (index) {
        case 1:
          return {
            name: `${this.$t('Global.ok')}`,
            type: 'success',
            color: '#2eb85c',
          }
        case 0:
          return {
            name: `${this.$t('Global.notOk')}`,
            type: 'danger',
            color: '#e55353',
          }
        case 30:
          return {
            name: `${this.$t('Global.agree')}`,
            type: 'success',
            color: '#2eb85c',
          }
        case 31:
          return {
            name: `${this.$t('Global.midagree')}`,
            type: 'info',
            color: '#39f',
          }
        case 32:
          return {
            name: `${this.$t('Global.disagree')}`,
            type: 'warning',
            color: '#f9b115',
          }
        case 33:
          return {
            name: `${this.$t('Global.disApply')}`,
            type: 'danger',
            color: '#e55353',
          }
        default:
          return {
            name: `${this.$t('Global.noAnswer')}`,
            type: 'danger',
            color: '#e2e2e2',
          }
          break
      }
    },
    getLogo(type) {
      switch (type) {
        case 1:
          return '/img/avatars/uni.png'
        case 2:
          return '/img/avatars/uni.png'
        case 3:
          return '/img/avatars/prog.png'
        default:
          return '/img/avatars/prog.png'
          break
      }
    },

    errorToast(message) {
      this.$toast({
        component: ToastificationContent,
        position: this.$i18n.locale == 'en'?'top-left':'top-right',
        props: {
          title: this.$t('error'),
          variant: 'danger',
          text: `${this.$t(message) || this.$t('msg.errorMessage')}`,
        },
      })
    },
    successToast(message) {
      this.$toast({
        component: ToastificationContent,
        position: this.$i18n.locale == 'en'?'top-left':'top-right',
        props: {
          title: this.$t('Success'),
          variant: 'success',
          text: `${this.$t(message) || this.$t('Global.successMessage')}`,
        },
      })
    },
    sanitizeArabic($event) {
      // console.log($event); //will display the keyCode value
      // console.log($event.key); //will show the key value
      const arabic = /[\u0600-\u06FF0-9_(@./#&+)  ]/
      if (!arabic.test($event.key)) {
        $event.preventDefault()
      }
    },
    // only accept letters
    isLetter($event) {
      const char = /^[\u0600-\u06FFA-Za-z]+$/
      if (!char.test($event.key)) {
        $event.preventDefault()
      }
    },
    writeNumber($event) {
      const numbers = /[0-9]/
      if (!numbers.test($event.key)) {
        $event.preventDefault()
      }
    },
    sanitizeNumber($event) {
      const numbers = /[0-9]/
      if (numbers.test($event.key)) {
        $event.preventDefault()
      }
    },
    sanitizeEnglish($event) {
      const arabic = /[\u0600-\u06FF]/
      if (arabic.test($event.key)) {
        $event.preventDefault()
      }
    },
    clean(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj
    },
    sanitizePhone($event) {
      const numbers = /[0-9+]/
      if (!numbers.test($event.key)) {
        $event.preventDefault()
      }
    },
    handleBackendError(errors) {
      return errors
    },
    getBackendFieldError(errors, fieldName) {
      const errorMessage = errors ? (errors[fieldName] ? errors[fieldName][0][this.$i18n.locale] : '') : ''
      return errorMessage
    },
    //  we will use this function to store filter in Query params of screens
    updateFilterQueryParams(filter,remove) {
      const newFilter = {}
      for (const [key, value] of Object.entries(filter)) {
        if (value !== null) {
          newFilter[key] = value
        }
      }
      let query = {...this.$route.query,...newFilter};
      if(remove){
        delete query[remove]
      }
      this.$router.replace({query},() => {},)
      // if(remove){
      //   this.$router.replace('bread',null)
      // }
    },
    getIntValue(val){
      return val >= 0 ? parseInt(val) : val
    },
    getFilterFromQueryParams(filter) {
      // ?faculty_id=2&removed=0&export=0&bylaw_id=31&program_id=194&registration_status_id=2&registration_status_id=3&registration_status_id=[1,2,3]
      // filter: {
      //       term_id: null,
      //       faculty_id: 2,
      //       bylaw_id: 31,
      //       program_id: null,
      //       course_id: null,
      //       section_id: null,
      //       offering_id: null,
      //       removed: 0,
      //       export: 0,
      // },
      console.log(this.$route.query)
      console.log("test23456789876545");

      if (this.$route.query) {
        for (const [key] of Object.entries(filter)) {
          let routeParamValue=this.$route.query[key];
          if (routeParamValue) {
            if(Array.isArray(filter[key])){
              if(Array.isArray(routeParamValue)){
                routeParamValue.forEach(element => {
                  filter[key].push(this.getIntValue(element));
                });
              }else{
                filter[key].push(this.getIntValue(routeParamValue));
              }
            }else{
              filter[key] = this.getIntValue(routeParamValue)
            }
            console.log("test23456789876545",filter);

          }
        }
        return true
      }
      return false
    },
    getTranslatedName(object) {
      if(!object) return '-';
      if (this.$i18n.locale == 'en') {
        return object.name
      }
      return object.name_local
    },
    handleStatusNaming(lookups,id){
      let statusName = null
      lookups.statuses.forEach(element => {
        element.id == id ? statusName = element.name : false
      });
      return statusName
    }
  },
})
