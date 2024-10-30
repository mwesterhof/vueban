<template>
    <div class="root">
        <div v-if="blacksMove" class="subsection black">
            Black's move
            <button @click="$emit('doPass')">pass</button>
        </div>
        <div v-else class="subsection white">
            White's move
            <button @click="$emit('doPass')">pass</button>
        </div>
        <div class="subsection">
            move: {{ moveNr }}
            <button @click="$emit('doReset')">reset</button>
        </div>
        <div class="subsection">
            prisoners: <span class="black">{{ prisoners.black }}</span> <span class="white">{{ prisoners.white }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['blacksMove', 'moveNr', 'prisoners'],
    emits: ['doPass', 'doReset']
}
</script>

<style scoped>
    .white {
        color: white;
    }
    .black {
        color: black;
    }
    button {
        height: 100%;
        position: absolute;
        right: 0;
        border-radius: 20%;
        background-color: #EEEEEE;
    }
    button:hover {
        background-color: #FFFFFF;
    }

    .root {
        width: 40rem;
        height: 1.3rem;
        margin: 0 auto;
    }

    .subsection {
        text-align: center;
        float: left;
        width: calc(33% - 2px);
        height: 100%;
        border: 2px solid black;
        position: relative;
        background-color: #999999;
    }
</style>
