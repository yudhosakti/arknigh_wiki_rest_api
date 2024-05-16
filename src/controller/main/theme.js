const themeModel = require('../../models/theme')
const themeData = require('../data/theme_data')

const getAllTheme = async (req,response) => {
    const page = req.query.page
    try {
        const [data] = await themeModel.getAllTheme()
        const dataFinal = themeData.themeProccesData(data)

        if (!Number.isInteger(parseInt(page))) {
            response.json({
                paginate: {
                    max_page: dataFinal.length,
                    current_page: 1,
                    total_item_page: dataFinal[0].length
                },
                data: dataFinal[0]
            })
        }else{
            if (parseInt(page) > dataFinal.length || parseInt(page) <= 0) {
                response.status(404).json({
                    message: "Data Not Found"
                })
            }else{
                response.json({
                    paginate: {
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

const getAllStageByTheme =async (req,response) => {
    const stage_id = req.query.stageId
    try {
        const [data] = await themeModel.getAllStageByTheme(stage_id)
        
        let dataFinal = []

        for (let index = 0; index < data.length; index++) {
            dataFinal.push({
                id_stage: data[index].id_stage,
                name: data[index].stage_name,
                code: data[index].stage_code,
                description: data[index].stage_description,
                image: data[index].image,
                sanity: data[index].sanity_cost
            })
            
        }

        response.json({
            data: dataFinal
        })

        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const getSingleTheme = async(req,response) => {
    const {id} = req.params
    try {
        const [data] = await themeModel.getSingleTheme(id)
        let eventData = []
        let dataFinal = []

        for (let index = 0; index < data.length; index++) {
            eventData.push({
                id_event: data[index].id_event,
                name: data[index].event_name,
                image: data[index].event_image,
                description: data[index].event_description,
                date: {
                    global: {
                        start: data[index].event_start_global,
                        end: data[index].event_end_global
                    },
                    end: {
                        start: data[index].event_start_cn,
                        end: data[index].event_end_cn
                    }
                }
            })
            
        }

        dataFinal.push({
            id_theme: data[0].id_theme,
            name: data[0].name_theme,
            image: data[0].image_theme,
            type: data[0].type_theme,
            events: eventData
        })

        response.json({
            data: dataFinal[0]
        })
        
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

module.exports = {
    getAllTheme,
    getAllStageByTheme,
    getSingleTheme

}



