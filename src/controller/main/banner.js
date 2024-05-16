const bannerModel = require('../../models/banner')
const bannerData = require('../data/banner_data')


const getRecentBanner = async(req,response)=> {
    try {
        const [data] = await bannerModel.getRecentBanner()
        let dataFinal = []
        let ratepUpOperator =[]
        let idTemp = 0


        for (let index = 0; index < data.length; index++) {
            if (idTemp == 0) {
                idTemp = data[index].id_banner
            }

            if (idTemp == data[index].id_banner && data[index].id_operator != null) {
                ratepUpOperator.push({
                    id_operator: data[index].id_operator,
                    name: data[index].nama_operator,
                    image: data[index].image_operator
                })

                if (index+1 == data.length) {
                    const dataTemp = bannerData.dataBannerTemp(data[index],ratepUpOperator)
                    dataFinal.push(dataTemp)
                    break
                }

                
            } else {
                idTemp = data[index].id_banner
                const dataTemp = bannerData.dataBannerTemp(data[index-1],ratepUpOperator)
                dataFinal.push(dataTemp)
                ratepUpOperator = []
                if (data[index].id_operator != null) {
                    ratepUpOperator.push({
                        id_operator: data[index].id_operator,
                        name: data[index].nama_operator,
                        image: data[index].image_operator
                    })
                }
               

                if (index+1 == data.length) {
                    const dataTemp = bannerData.dataBannerTemp(data[index],ratepUpOperator)
                    dataFinal.push(dataTemp)
                    break
                }


            }
            
        }
        
        response.json({
            data: dataFinal
        })

         
    } catch (error) {
        response.json({
            message: error
        })
    }
}

const getAllBanner = async (req,response) => {
    const page = req.query.page
    try {
        const [data] = await bannerModel.getAllBanner()
        const dataFinal = bannerData.bannerProcessData(data)

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
            if (page < dataFinal.length || page > dataFinal.length) {
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
        response.json({
            message: error
        })
    }
}

const getAllBannerFilter = async (req,response) => {
    const versionQuery = req.query.version
    const page = req.query.page
    let version = "cn"
    try {
        if (versionQuery == "global" || versionQuery == "cn") {
            version = versionQuery
        }

        const [data] = await bannerModel.getAllBannerFilter(version)
        console.log(data[0])
        
        const dataFinal = bannerData.bannerProcessData(data)
        
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
            if (page < dataFinal.length || page > dataFinal.length) {
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
            message: "Internal Server Error"
        })
    }
}

const getSingleBannerDetail = async(req,response) => {
    const {id} = req.params
   try {
    const [dataRateUp] = await bannerModel.getSingleBannerRateUp(id)
    const [dataEventt] = await bannerModel.getSingleBannerEvent(id)
    const [dataBanner] = await bannerModel.getSingleBanner(id)
    
    let dataFinal = []

    let dataRateOperator = []

    let dataEventBanner = []

    for (let index = 0; index < dataRateUp.length; index++) {
        dataRateOperator.push({
            id_operator: dataRateUp[index].id_operator,
            name: dataRateUp[index].nama_operator,
            image: dataRateUp[index].image_operator,
        })
    }

    for (let index = 0; index < dataEventt.length; index++) {
        dataEventBanner.push({
            id_event: dataEventt[index].id_event,
            name: dataEventt[index].event_name,
            image: dataEventt[index].event_image
        })
        
    }
    dataFinal.push({
        id_banner: dataBanner[0].id_banner,
        name: dataBanner[0].banner_name,
        image: dataBanner[0].banner_image,
        date: {
            global: {
                start: dataBanner[0].banner_start_global,
                end: dataBanner[0].banner_end_global
            },
            cn: {
                start: dataBanner[0].banner_start_cn,
                end: dataBanner[0].banner_end_cn
            }
        },
        rate_up: dataRateOperator,
        events: dataEventBanner
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
    getRecentBanner,
    getAllBanner,
    getAllBannerFilter,
    getSingleBannerDetail
}