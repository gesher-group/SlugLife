class Food {
    constructor(name, tags = []) {
        this.name = name
        this.tags = tags
        this.nutritionInfo = new NutritionInfo()
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

