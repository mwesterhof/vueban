<template>
    <div class="root">
        <div v-if="blacksMove" class="subsection black">
            Black's move
        </div>
        <div v-else class="subsection white">
            White's move
        </div>
        <div class="subsection">
            move: {{ moveNr }}
        </div>
        <div class="subsection">
            prisoners: <span class="black">{{ prisoners.black }}</span> <span class="white">{{ prisoners.white }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['blacksMove', 'moveNr', 'prisoners']
}
</script>

<style scoped>
    .white {
        color: white;
    }
    .black {
        color: black;
    }

    .root {
        width: calc(100% - 15px);
    }

    .subsection {
        text-align: center;
        float: left;
        width: 33%;
        height: 100%;
        border: 1px solid black;
    }
</style>
