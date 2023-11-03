
import { $themeBreakpoints } from '@themeConfig'
import { getLookups } from "@/api/system/global"; 

export default {
namespaced: true,
state: {
    FCMuserToken:null,
    FCMnewMessage:null,
    windowWidth: 0,
    shallShowOverlay: false,
    load: false,
    moreDetails:[],
    pageDetails: null,
    path: [],
    uploadProgress: false,
    errors: null,
    lookups: null,
    filter: null,
},
getters: {
    FCMuserToken:state => {
        return state.FCMuserToken
    },
    FCMnewMessage:state => {
        return state.FCMnewMessage
    },
    lookups: state => {
        return state.lookups
    },
    filter: state => {
        return state.filter
    },
    load: state => {
        return state.load
    },
    pageDetails: state => {
        return state.pageDetails
    },
    path: state => {
        return state.path
    },
    moreDetails: state => {
        return JSON.parse(JSON.stringify(state.moreDetails))
    },
    uploadProgress: state => {
        return state.uploadProgress
    },
    currentBreakPoint: state => {
        const { windowWidth } = state
        if (windowWidth >= $themeBreakpoints.xl) return 'xl'
        if (windowWidth >= $themeBreakpoints.lg) return 'lg'
        if (windowWidth >= $themeBreakpoints.md) return 'md'
        if (windowWidth >= $themeBreakpoints.sm) return 'sm'
        return 'xs'
    },
},
mutations: {
    SET_FCM_USER_TOKEN(state,val){
        state.FCMuserToken = val
    },
    SET_FCM_NEW_Message(state,message){
        state.FCMnewMessage = message
    },
    UPDATE_PAGE_DETAILS(state, val) {
        state.pageDetails = val
    },
    SET_FILTER(state, val) {
        state.filter = val
    },
    SET_PATH(state, val) {
        state.path = val
    },
    BACK(state){
        state.moreDetails.pop() 
    },
    UPDATE_MORE_DETAILS(state, val) {
        state.moreDetails.push(val)
    },
    UPDATE_WINDOW_WIDTH(state, val) {
        state.windowWidth = val
    },
    ERRORS(state, val) {
        state.errors = val
    },
    UPDATE_LOAD(state, val) {
        state.load = val
    },
    TOGGLE_OVERLAY(state, val) {
        state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    SET_UPLOAD_PROGRESS(state, uploadProgress) {
        state.uploadProgress = uploadProgress
    },
    SET_LOOKUPS(state, data) {
        state.lookups = data
    },
},
actions: {
    GET_LOOKUPS({ commit }, lookupModules) {
        return new Promise((resolve, reject) => {
            getLookups(lookupModules).then(response => {
                commit('SET_LOOKUPS', response.success)
                resolve(response)
            })
        })
    },
},
}