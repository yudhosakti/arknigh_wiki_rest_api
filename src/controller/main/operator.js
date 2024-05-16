const operatorModel = require('../../models/operator');
const operatorData = require('../data/operator_data')

const getAllOperator = async (req,response)=> {
    const page = req.query.page;
    const isShort = req.query.isShort;

    try {
        const [data] =  await operatorModel.getAllOperator(isShort);
        const dataFinal = operatorData.processOperatorData(data);

        if (!Number.isInteger(parseInt(page))) {
            response.json({
                paginate: ({
                    max_page: dataFinal.length,
                    current_page: 1,
                    total_item_page: dataFinal[0].length
                }),
                data: dataFinal[0]
            })
        } else {
            if (parseInt(page) <=0 || parseInt(page) > dataFinal.length ) {
                response.status(500).json({
                  message: 'Data Not Found'
                })
            } else {
              response.json({
                  paginate: ({
                      max_page : dataFinal.length,
                      current_page : parseInt(page),
                      total_item_page : dataFinal[parseInt(page)-1].length
                  }),
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

const getAllOperatorByClass = async (req,response)=> {
    const {className} = req.params;
    const page = req.query.page;
    const isShort = req.query.isShort;

    try {
        const [data] = await operatorModel.getAllOperatorByClass(className,isShort)
        const dataFinal = operatorData.processOperatorData(data)

        if (!Number.isInteger(parseInt(page))) {
            response.json({
                paginate: ({
                    max_page: dataFinal.length,
                    current_page: 1,
                    total_item_page: dataFinal[0].length
                }),
                data: dataFinal[0]
            })
        } else {
            if (parseInt(page) <=0 || parseInt(page) > dataFinal.length ) {
                response.status(500).json({
                  message: 'Data Not Found'
                })
            } else {
              response.json({
                  paginate: ({
                      max_page : dataFinal.length,
                      current_page : parseInt(page),
                      total_item_page : dataFinal[parseInt(page)-1].length
                  }),
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

const getSingleOperatorDetail = async(req,response)=> {
    const {id} = req.params

    try {
     const [data] = await operatorModel.getSingleOperatorDetail(parseInt(id))
     const [dataskillchange] = await operatorModel.getDescriptionChangeOperatorSkill(parseInt(id))
     const [dataskillupgrade] = await operatorModel.getOperatorSkillUpgradeMaterial(parseInt(id))

     const skillData = operatorData.processSkillData(data)
     const skillChangeData = operatorData.processSkillChangeData(dataskillchange)
     const materialData = operatorData.processSkillMaterial(dataskillupgrade)

     response.json({
        data : {
            id_operator: data[0].id_operator,
            name: data[0].nama_operator,
            image: data[0].image_operator,
            deskripsi: data[0].deskripsi_operator,
            class: data[0].kelas_operator,
            archtype: data[0].archetype_operator,
            attack: data[0].attack_operator,
            hp: data[0].hp_operator,
            defense: data[0].defense_operator,
            dp_cost: data[0].dp_cost_operator,
            redeployment: data[0].redeployment_operator,
            rarity: data[0].grade,
            trait: data[0].trait,
            like: data[0].like,
            skills: skillData,
            materials: materialData,
            skill_upgrade: skillChangeData
        }
     })

        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const getRecentOperator =async (req,response) => {
    try {
        const [data] = await operatorModel.getRecentOperator();
        const dataFinal = operatorData.processOperatorData(data)
        console.log(dataFinal[0])

        response.json({
            data: dataFinal[0]
        })
        
    } catch (error) {
        response.status(500).json({
            message:error
        })
    }
}

const getPopularOperatorByClass = async (req,response) => {
    const kelas = req.query.class 
    try {
        const [data] = await operatorModel.getPopularOperatorByClass(kelas)

        const dataFinal = operatorData.processOperatorData(data)

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
    getAllOperator,
    getAllOperatorByClass,
    getSingleOperatorDetail,
    getRecentOperator,
    getPopularOperatorByClass
}