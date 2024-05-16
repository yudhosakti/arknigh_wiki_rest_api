const enemyModel = require('../../models/enemy')

const getAllEnemy = async(req,response) => {
    const page = req.query.page
    const short = req.query.isShort
    let isShort = 0
    try {
        if (short == 1) {
            isShort = short
        }
        const [data] = await enemyModel.getAllEnemy(isShort)
        let dataFinal  =[]
        let dataTemp = []

        for (let index = 0; index < data.length; index++) {
            dataTemp.push(data[index])
            if (dataTemp.length == 30 || index+1 >= data.length) {
                dataFinal.push(dataTemp)
                dataTemp = []
            }
        }

        if (!Number.isInteger(parseInt(page))) {
            response.json({
                pagination: {
                    max_page: dataFinal.length,
                    current_page: 1,
                    total_item_page: dataFinal[0].length
                },
                data: dataFinal[0]
            })
        } else {
            if (parseInt(page) > dataFinal.length || parseInt(page) <= 0) {
                response.status(404).json({
                    message: "Data Not Found"
                })
            } else {
                response.json({
                    pagination: {
                        max_page: dataFinal.length,
                        current_page: parseInt(page),
                        total_item_page: dataFinal[parseInt(page)-1].length
                    },
                    data: dataFinal[parseInt(page)-1]
                })
            }
        }


        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const getAllEnemyFilter = async (req,response) => {
    const type = req.query.type
    const page = req.query.page
    try {
        const [data] = await enemyModel.getAllEnemyFilter(type)
        console.log(data[0])
        let dataFinal = []
        let dataTemp = []

        for (let index = 0; index < data.length; index++) {
            dataTemp.push(data[index])
            if (dataTemp.length == 30 || index+1 >= data.length) {
                dataFinal.push(dataTemp)
                dataTemp = []
            }
            
        }
        console.log(dataFinal[0].length)

        if (!Number.isInteger(parseInt(page))) {
            response.json({
                pagination: {
                    max_page: dataFinal.length,
                    current_page: 1,
                    total_item_page: dataFinal[0].length
                },
                data: dataFinal[0]
            })
        } else {
            if (parseInt(page) > dataFinal.length || parseInt(page) <= 0) {
                response.status(404).json({
                    message: "Data Not Found"
                })
            } else {
                response.json({
                    pagination: {
                        max_page: dataFinal.length,
                        current_page: parseInt(page),
                        total_item_page: dataFinal[parseInt(page)-1].length
                    },
                    data: dataFinal[parseInt(page)-1]
                })
            }
        }


    } catch (error) {
        response.status(500).json({
            message:error
        })
    }
}

const getSingleEnemyDetail = async(req,response) => {
    const {id} = req.params
    try {
      
        const [data] = await enemyModel.getSingleEnemyDetail(id)
        const enemy_location = []

        for (let index = 0; index < data.length; index++) {
            enemy_location.push({
                id_stage: data[index].id_stage,
                stage_code: data[index].stage_code,
                count: data[index].count
            })
            
        }

        response.json({
            data: {
                id_enemy: data[0].id_enemy,
                enemy_name: data[0].enemy_name,
                enemy_image: data[0].enemy_image,
                enemy_description: data[0].enemy_description,
                hp: data[0].enemy_hp,
                attack: data[0].enemy_attack,
                def: data[0].enemy_def,
                res: data[0].enemy_res,
                type: data[0].enemy_type,
                appearances: enemy_location

            }
        })

        
    } catch (error) {
        response.status(500).json({
            message:error
        })
    }
}

module.exports = {
    getAllEnemy,
    getAllEnemyFilter,
    getSingleEnemyDetail
}