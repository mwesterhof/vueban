<template>
    <div class="board">
        <div class="row" v-for="(line, y) in boardData" :key="y">
            <div class="cell" :class="{hoshi: isHoshi(x, y)}" v-for="(cell, x) in line" :key="x" @click="placeMove(x, y)">
                <div v-if="cell" class="stone blackStone" />
                <div v-else-if="cell === false" class="stone whiteStone" />
            </div>
        </div>
        <stats-block :blacksMove="moveForBlack" :moveNr="moveNr" :prisoners="prisoners" />
    </div>
</template>

<script>
    import { countLiberties, createEmptyBoard, updateBoard } from '../lib/algorithm.js'

    export default {
        props: ['size'],
        data() {
            return {
                moveNr: 0,
                boardData: createEmptyBoard(this.$props.size),
                prisoners: {
                    black: 0,
                    white: 0
                },
                moveForBlack: true
            }
        },
        methods: {
            placeMove(x, y) {
                var killed
                this.boardData[y][x] = this.moveForBlack
                this.boardData, killed = updateBoard(this.boardData, this.moveForBlack)
                if (this.moveForBlack) {
                    this.prisoners.white += killed
                }
                else {
                    this.prisoners.black += killed
                }
                this.moveForBlack = !this.moveForBlack
                this.moveNr++
            },
            isHoshi(x, y) {
                if (x == 3 && y == 3) {
                    return true
                }
                if (x == 9 && y == 3) {
                    return true
                }
                if (x == 15 && y == 3) {
                    return true
                }

                if (x == 3 && y == 9) {
                    return true
                }
                if (x == 9 && y == 9) {
                    return true
                }
                if (x == 15 && y == 9) {
                    return true
                }

                if (x == 3 && y == 15) {
                    return true
                }
                if (x == 9 && y == 15) {
                    return true
                }
                if (x == 15 && y == 15) {
                    return true
                }
            }
        }
    }
</script>

<style scoped>
    /* 
    19: 5.3
    5: 20
    */

    @keyframes placeStone {
        0% {
            transform: translate(-5px, -20px);
            filter: drop-shadow(4px 4px 10px #664400);
            opacity: 0;
        }
        100% {
            transform: translate(0, 0);
            filter: drop-shadow(1px 2px 4px #442200);
            opacity: 1;
        }
    }

    .board {
        width: 40rem;
        height: 40rem;
        margin: 1rem auto;
    }
    .row {
        width: 100%;
        height: calc(5.3% - 3px);
    }

    .cell {
        height: 100%;
        width: calc(5.3% - 3px);
        float: left;
        border: 1px solid black;
        background-color: #EECC44;
        position: relative;
    }
    .cell.hoshi {
        background-color: #CCAA22;
    }

    .stone {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 4rem;
        filter: drop-shadow(1px 2px 4px #442200);
        z-index: 1000;
        animation-name: placeStone;
        animation-duration: .5s;
    }

    .blackStone {
        background-color: black;
    }
    .whiteStone {
        background-color: white;
    }
</style>
