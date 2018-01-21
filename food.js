class Food {
    constructor(name, tags = []) {
        this.name = name
        this.tags = tags
        this.nutritionInfo = []
    }

    addTag(tag) {
        this.tags.push(tag)
    }

    addNutritionInfo(info) {
        this.nutritionInfo = info
    }
}

class NutritionInfo {
    constructor() {
        this.info = []
        this.html = ""
        this.url = ""
    }

    addHTML(html) {
        this.html = html
    }

    add(nKey, nVal) {
        this.info[nKey] = nVal
    }
}

module.exports = {
    Food: Food,
    NutritionInfo: NutritionInfo
}

