class College {
    constructor(name) {
        this.name = name
        this.foods = [ [], [], [], [] ]
    }

    get breakfast() {
        return this.foods[0]
    }

    get lunch() {
        return this.foods[1]
    }

    get dinner() {
        return this.foods[2]
    }

    get lateNight() {
        return this.foods[3]
    }

    addFood(food, x, y) {
        this.foods[x][y] = food
    }
}

module.exports = {
    College: College
}
