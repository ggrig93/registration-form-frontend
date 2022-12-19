import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);
export default new Vuex.Store({
    state: () => ({
        countries: [],
        errorStatus:[]
    }),
    mutations:{
      setCountries(state, data){
          state.countries = data
      },
      setErrorStatue(state,error){
          state.errorStatus = error
      }
    },
    actions:{
        getCountries({commit}) {
            axios.get(process.env.VUE_APP_API_URL + 'api/countries')
                .then((data) => {
                    console.log(data);
                    commit('setCountries',data.data.data)
                })
        },
        userCreate({commit}, data) {
            axios.post(process.env.VUE_APP_API_URL + 'api/user/create',data)
                .then(() => {
                    alert("You have success")
                })
                .catch(err => {
                    commit('setErrorStatue',err.response.data.errors)
                })
        }

    },
    getters: {
        countries: state => state.countries,
        errorStatus: state => state.errorStatus
    }

});