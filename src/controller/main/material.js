const materialModel = require('../../models/material')

const getAllMaterial  = async(req,response) => {
    const page = req.query.page
    const isShort = req.query.isShort
    let short = 0;
    try {
        if (isShort == 1) {
            short = isShort
        }
        const [data] = await materialModel.getAllMaterial(short)

        let dataFinal = []
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
                response.json({
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

const getAllMaterialByCategory = async (req,response) => {
    const page = req.query.page
    const tierQ = req.query.tier
    try {
        const [data] = await materialModel.getAllMaterialByCategory(tierQ)

        let dataFinal = []
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
                response.json({
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

const getSingleMaterialDetail = async(req,response) => {
    const {id} = req.params;
    try {
        const [data] = await materialModel.getSingleMaterialDetail(id)
        let dataMaterialLocation = []

         
        for (let index = 0; index < data.length; index++) {
            dataMaterialLocation.push({
                id_stage: data[index].id_stage,
                stage_code: data[index].stage_code,
                rarity: data[index].rarity
            })
            
        }

        response.json({
            data: {
                material_id: data[0].id_material,
                material_name: data[0].material_name,
                material_image: data[0].material_image,
                material_description: data[0].material_description,
                material_tier: data[0].material_tier,
                locations: dataMaterialLocation
            }
           

        })


        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const proccesDataMaterial = (data) => {
    
    let dataFinal = []
    let dataTemp = []

    for (let index = 0; index < data.length; index++) {
        dataTemp.push(data[index])
        if (dataTemp.length == 30 || index+1 >= data.length) {
            dataFinal.push(dataTemp)
            dataTemp = []
        }
    }

    return dataFinal
}


module.exports = {
   getSingleMaterialDetail,
   getAllMaterial,
   getAllMaterialByCategory
}