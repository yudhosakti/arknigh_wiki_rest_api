
const processSkillChangeData = (dataskillchange) => {
    let skillChangeData = []
     for (let index = 0; index < dataskillchange.length; index++) {
          skillChangeData.push({
              id_skill: dataskillchange[index].id_skill,
              description_change: dataskillchange[index].description_change,
              initial_sp: dataskillchange[index].sp_initial,
              sp_cost: dataskillchange[index].sp_cost,
              level: dataskillchange[index].level,
          })
        
     }
     return skillChangeData
}

const processSkillMaterial = (dataMaterial) => {
    let materialFinal = []
    let materialTemp = []

    for (let index = 0; index < dataMaterial.length; index++) {
        materialTemp.push({
            id_material: dataMaterial[index].id_material,
            name: dataMaterial[index].material_name,
            image: dataMaterial[index].material_image,
            quantity: dataMaterial[index].quantity,
            level: dataMaterial[index].level
        })
        
    }
    
    materialFinal.push(materialTemp)

    return materialFinal

}



const processSkillData = (data) => {
    let skillData = []
    for (let index = 0; index < data.length; index++) {
        skillData.push({
            id_skill: data[index].id_skill,
            name: data[index].skill_name,
            description: data[index].skill_description,
            image: data[index].skill_image,
            skill_number: data[index].skill_level,
            activation: data[index].skill_activation,
            sp_charge: data[index].sp_charge_type,
            duration: data[index].duration
        })
     }
     return skillData
}

const processOperatorData = (data) => {
    let dataCustom = [];
    let dataFinal = [];

    for (let index = 0; index < data.length; index++) {
        dataCustom.push({
            id_operator: data[index].id_operator,
            name: data[index].nama_operator,
            image: data[index].image_operator,
            deskripsi: data[index].deskripsi_operator,
            class: data[index].kelas_operator,
            archtype: data[index].archetype_operator,
            attack: data[index].attack_operator,
            hp: data[index].hp_operator,
            defense: data[index].defense_operator,
            dp_cost: data[index].dp_cost_operator,
            redeployment: data[index].redeployment_operator,
            rarity: data[index].grade,
            trait: data[index].trait,
            like: data[index].like,
            tier: data[index].tier,
            reason: data[index].reason
        });

        if (dataCustom.length == 30 || index + 1 >= data.length) {
            dataFinal.push(dataCustom);
            dataCustom = [];
        }
    }

    return dataFinal;
};

module.exports = {
    processOperatorData,
    processSkillChangeData,
    processSkillData,
    processSkillMaterial
}