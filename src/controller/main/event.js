const eventModel = require('../../models/event')
const eventData = require('../data/event_data')

const getRecentEvent = async(req,res)=> {
    try {
        const [data] = await eventModel.getRecentEvent()
        res.json({
            data: data
        })
        
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

const getRecentEventWithRewardCN = async(req,response) => {
    try {
        const [data] = await eventModel.getRecentEventWithRewardCN()
        const dataFinal = eventData.proccesData(data)

        response.json({
            data: dataFinal
        })



        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const getSingleEventDetail = async(req,response) => {
    const {id} = req.params
    try {
        const [dataEventBanner] = await eventModel.getSingleEventBanner(id)
        const [dataEventReward] = await eventModel.getSingleEventReward(id)
        const [dataEvent] = await eventModel.getSingleEvent(id)

        let dataFinal = []

        let dataEventBannerTemp = []

        let dataEventRewardTemp = []

        for (let index = 0; index < dataEventBanner.length; index++) {
            dataEventBannerTemp.push({
                id_banner: dataEventBanner[index].id_banner,
                name: dataEventBanner[index].banner_name,
                image: dataEventBanner[index].banner_image
            })
        }

        for (let index = 0; index < dataEventReward.length; index++) {
            dataEventRewardTemp.push({
                id_material: dataEventReward[index].id_material,
                name: dataEventReward[index].material_name,
                image: dataEventReward[index].material_image,
                quantity: dataEventReward[index].quantity
            })
            
        }

        dataFinal.push({
            id_event: dataEvent[0].id_event,
            name: dataEvent[0].event_name,
            image: dataEvent[0].event_image,
            description: dataEvent[0].event_description,
            type: dataEvent[0].type,
            date: {
                global : {
                    start: dataEvent[0].event_start_global,
                    end: dataEvent[0].event_end_global
                },
                cn : {
                    start: dataEvent[0].event_start_cn,
                    end: dataEvent[0].event_end_cn
                }
            },
            banners: dataEventBannerTemp,
            rewards: dataEventRewardTemp
        })

        response.json({
            data: dataFinal[0]
        })
        
    } catch (error) {
        console.log(error)
        response.status(500).json({
            message: error
        })
    }
}

const getAllEvent = async(req,response) => {
    const page = req.query.page
    try {
        const [data] = await eventModel.getAllEvent()
        let dataTemp = []
        let dataFinal = []

        for (let index = 0; index < data.length; index++) {
            
            
        }
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}







module.exports = {
    getRecentEvent,
    getRecentEventWithRewardCN,
    getSingleEventDetail
}