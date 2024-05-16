
const themeProccesData = (data) => {
    let dataFinal = []
        let dataTemp = []

        for (let index = 0; index < data.length; index++) {
            dataTemp.push({
                id_theme: data[index].id_theme,
                name: data[index].name_theme,
                image: data[index].image_theme,
                type: data[index].type_theme
            })
            if (dataTemp.length == 30 || index+1 >= data.length) {
                dataFinal.push(dataTemp)
                dataTemp = []
            }
            
        }
        return dataFinal
}

module.exports = {
    themeProccesData
}