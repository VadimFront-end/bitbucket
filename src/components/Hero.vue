<template>
    <div class="hero">
        <h2>{{heroData.name}}</h2>
        <img
            alt="hero"
            :src="`https://starwars-visualguide.com/assets/img/characters/${/\d+/g.exec(heroData.url)[0]}.jpg`">
        <div>Home world: {{city}}</div>
        <button
            v-show="!isFavoritesComponent"
            class="like"
            @click="addHero">♥️</button>
        <hr>
    </div>
</template>

<script>
export default {
    name: "Hero",
    props: {
        heroData: {
            type: Object,
            default: () => {}
        },
        isFavoritesComponent: {
            type: Boolean,
            default: () => false
        }
    },
    data: () => {
        return {
          city: null
        }
    },
    methods: {
        addHero() {
            const data = localStorage.getItem('my-heroes') !== null ? JSON.parse(localStorage.getItem('my-heroes')): [];
            for(let i = 0; i < data.length; i++)
                if(data[i].name === this.heroData.name)
                    return;
            localStorage.setItem('my-heroes', JSON.stringify([ ...data, this.heroData ]));
        }
    },
    mounted() {
        fetch(this.heroData.homeworld)
            .then(response => response.json())
            .then(data => this.city = data.name);
    }
}
</script>

<style>
.hero {
    margin-bottom: 30px;
}

.like {
    font-size: 50px;
    cursor: pointer;
}

</style>
