import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const createStore = () => {
  return new Vuex.Store({
    state: {
      hosts: {
        users: null
      }
    },
    mutations: {
      ...vuexfireMutations
    },
    actions: {
      setHostsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('hosts', ref)
      })
    },
    getters: {
      getHosts: (state: any) => state.hosts
    }
  })
}

export default createStore
