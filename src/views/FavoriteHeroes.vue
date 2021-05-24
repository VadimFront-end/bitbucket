<template>
    <div>
        <div
            v-for="hero in myHeroes"
            :key="/\d+/g.exec(hero.url)[0]"
        >
          <Hero :heroData="hero" :isFavoritesComponent=true />
        </div>
    </div>
</template>

<script>
import Hero from '../components/Hero'

export default {
    name: "FavoriteHeroes",
    components: {
        Hero
    },
    data: () => {
        return {
            myHeroes: JSON.parse(localStorage.getItem('my-heroes'))
        }
    }
}
</script>

<style>

</style>
