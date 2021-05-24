import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
      state: {
            currentPage: 1,
            heroes: [],
            next: null,
          previous: null
      },
      mutations: {
          changePage: (state, data) => data === 'next' ? state.currentPage++: state.currentPage--,
          getHeroesList: (state, newList) => {
              state.heroes = newList.results;
              state.next = newList.next;
              state.previous = newList.previous;
          }
      },
      actions: {
          async GET_HEROES({commit}) {
              fetch(`https://swapi.dev/api/people/?page=${this.state.currentPage}`)
                  .then(response => response.json())
                  .then(data => commit('getHeroesList', data));
          }
      },
      getters: {
            HEROES: state => state.heroes,
            PREVIOUS: state => state.previous,
            NEXT: state => state.next
      }
})
