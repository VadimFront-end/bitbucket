<template>
    <div id="home">
        <div class="pagination">
            <div class="search">
                <div>Поиск:</div>
                <input
                    v-model.trim="searchData"
                    type="text">
                <div>
                    <span>Только мужской</span>
                    <input
                        type="checkbox"
                        v-model="isMaleOnly">
                </div>
                <div>
                    <span>Только женский</span>
                    <input
                        type="checkbox"
                        v-model="isFemaleOnly">
                </div>

            </div>
            <button
                style="margin-right: 100px"
                class="pagination-button"
                v-if="PREVIOUS"
                @click="previous"
            >
                Назад
            </button>
            <button
                class="pagination-button"
                v-if="NEXT"
                @click="next"
            >
                Вперед
            </button>
        </div>
          <div
              v-for="hero in !searchData && !isFemaleOnly && !isMaleOnly ? HEROES: filteredHeroesData"
              :key="/\d+/g.exec(hero.url)[0]"
          >
            <Hero :heroData="hero" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hero from '../components/Hero'
import filterArray from '../functions'

export default {
    name: 'Home',
    components: {
        Hero
    },
    data: () => {
        return {
            searchData: '',
            filteredHeroesData: [],
            isMaleOnly: false,
            isFemaleOnly: false
        }
    },
    methods: {
        previous() {
            this.$store.commit('changePage', 'previous');
            this.$store.dispatch('GET_HEROES');
        },
        next() {
            this.$store.commit('changePage', 'next');
            this.$store.dispatch('GET_HEROES');
        }
    },
    computed: {
        ...mapGetters([
            'HEROES',
            'NEXT',
            'PREVIOUS'
        ])
    },
    watch: {
        searchData() {
            this.filteredHeroesData = filterArray(this.HEROES, this.searchData, this.isMaleOnly, this.isFemaleOnly);
        },
        isMaleOnly() {
            this.filteredHeroesData = filterArray(this.HEROES, this.searchData, this.isMaleOnly, this.isFemaleOnly);
        },
        isFemaleOnly() {
            this.filteredHeroesData = filterArray(this.HEROES, this.searchData, this.isMaleOnly, this.isFemaleOnly);
        }
    },
    mounted() {
        this.$store.dispatch('GET_HEROES');
    }
}
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  bottom: 30px;
  position: fixed;
  width: 100%;
}

.pagination-button {
  cursor: pointer;
  font-size: 20px;
}

.search {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>
