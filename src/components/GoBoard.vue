<template>
    <stats-block
        :blacksMove="moveForBlack"
        :moveNr="moveNr"
        :prisoners="prisoners"
        @doReset="reset"
        @doPass="pass"
    />
    <div class="board">
        <div class="row" v-for="(line, y) in boardData" :key="y">
            <div class="cell" v-for="(cell, x) in line" :key="x" @click="placeMove(x, y)">
                <div class="line horizontal" /><div class="line vertical" />
                <div v-if="isHoshi(x, y)" class="hoshi" />

                <div v-if="cell" class="stone blackStone" />
                <div v-else-if="cell === false" class="stone whiteStone" />
            </div>
        </div>
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
            pass() {
                this.moveForBlack = !this.moveForBlack
            },
            reset() {
                this.moveNr = 0
                this.boardData = createEmptyBoard(this.$props.size)
                this.prisoners.black = 0
                this.prisoners.white = 0
                this.moveForBlack = true
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
            transform: translate(-30%, -80%);
            filter: drop-shadow(4px 4px 10px #664400);
            opacity: 0;
            width: 120%;
            height: 120;
        }
        100% {
            transform: translate(0, 0);
            filter: drop-shadow(1px 2px 4px #442200);
            opacity: 1;
            width: calc(100% - 2px);
            height: calc(100% - 2px);
        }
    }

    .board {
        width: 40rem;
        height: 40rem;
        margin: 1rem auto;
        border: 5px solid #000000;
    }
    .row {
        width: calc(100% - 0px);
        height: calc(5.263157894% - 0px);
    }

    .cell {
        height: 100%;
        width: calc(5.263157894% - 0px);
        float: left;
        background-color: #EECC44;
        position: relative;
    }

    .cell .line {
        position: absolute;
        background-color: black;
    }
    .cell .line.horizontal {
        width: 100%;
        height: 1px;
        top: 50%;
    }
    .cell .line.vertical {
        width: 1px;
        height: 100%;
        left: 50%;
    }
    .cell .hoshi {
        width: 20%;
        height: 20%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #000000;
        border-radius: 50%;
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
        animation-duration: .3s;
    }
    .blackStone {
        background-color: black;
        background-image: radial-gradient(circle at 30% 30%, #666666 0, #000000 40%);
    }
    .whiteStone {
        background-color: white;
        background-image: radial-gradient(circle at 30% 30%, #FFFFFF 0, #CCCCCC 30%);
    }
</style>
