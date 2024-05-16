const dbConnection = require('../config/database');

const getAllOperator = (isSort) => {
    if (isSort == 1) {
        const query = `SELECT tbl_operator.id_operator,nama_operator,image_operator,deskripsi_operator,kelas_operator,archetype_operator,hp_operator,attack_operator,defense_operator,dp_cost_operator,block,res,grade,redeployment_operator,tbl_tier_list.tier,tbl_tier_list.reason FROM tbl_operator LEFT JOIN tbl_tier_list ON tbl_operator.id_operator = tbl_tier_list.id_operator ORDER BY tbl_operator.grade DESC,tbl_operator.id_operator DESC`
        return dbConnection.execute(query)
    } else {
        const query = `SELECT tbl_operator.id_operator,nama_operator,image_operator,deskripsi_operator,kelas_operator,archetype_operator,hp_operator,attack_operator,defense_operator,dp_cost_operator,block,res,grade,redeployment_operator,tbl_tier_list.tier,tbl_tier_list.reason FROM tbl_operator LEFT JOIN tbl_tier_list ON tbl_operator.id_operator = tbl_tier_list.id_operator`;
    return dbConnection.execute(query);
    }
    
}

const getAllOperatorByClass = (classname,isSort) => {
    if (isSort) {
        const query = `SELECT tbl_operator.id_operator,nama_operator,image_operator,deskripsi_operator,kelas_operator,archetype_operator,hp_operator,attack_operator,defense_operator,dp_cost_operator,block,res,grade,redeployment_operator,tbl_tier_list.tier,tbl_tier_list.reason FROM tbl_operator LEFT JOIN tbl_tier_list ON tbl_operator.id_operator = tbl_tier_list.id_operator WHERE tbl_operator.kelas_operator = '${classname}' ORDER BY tbl_operator.grade DESC,tbl_operator.id_operator DESC;`;
        return dbConnection.execute(query);
    } else {
        const query = `SELECT tbl_operator.id_operator,nama_operator,image_operator,deskripsi_operator,kelas_operator,archetype_operator,hp_operator,attack_operator,defense_operator,dp_cost_operator,block,res,grade,redeployment_operator,tbl_tier_list.tier,tbl_tier_list.reason FROM tbl_operator LEFT JOIN tbl_tier_list ON tbl_operator.id_operator = tbl_tier_list.id_operator WHERE tbl_operator.kelas_operator = '${classname}'`;
       return dbConnection.execute(query);
    }
    
}

const getSingleOperatorDetail = (idOperator) => {
    const query = `SELECT * FROM tbl_operator INNER JOIN tbl_skill ON tbl_operator.id_operator=tbl_skill.id_operator WHERE tbl_operator.id_operator = ${idOperator}`
    return dbConnection.execute(query)
}

const getDescriptionChangeOperatorSkill = (idOperator) => {
    const query =  `SELECT * FROM tbl_skill INNER JOIN tbl_skill_change ON tbl_skill.id_skill=tbl_skill_change.id_skill WHERE tbl_skill.id_operator=${idOperator} ORDER BY skill_level ASC,tbl_skill_change.level ASC`
    return dbConnection.execute(query)
}

const getOperatorSkillUpgradeMaterial = (idOperator)=> {
    const query = `SELECT * FROM tbl_skill_upgrade_material INNER JOIN tbl_skill ON tbl_skill.id_skill=tbl_skill_upgrade_material.id_skill INNER JOIN tbl_material ON tbl_skill_upgrade_material.id_material = tbl_material.id_material WHERE tbl_skill.id_operator = ${idOperator} ORDER BY tbl_skill_upgrade_material.level ASC`
    return dbConnection.execute(query)
}

const getPopularOperatorByClass = (classname) => {
    const query = `SELECT * FROM tbl_operator  WHERE tbl_operator.kelas_operator = '${classname}' ORDER BY tbl_operator.like DESC LIMIT 5`
    return dbConnection.execute(query)
}

const getRecentOperator = ()=> {
    const query = `SELECT * FROM tbl_operator ORDER BY tbl_operator.id_operator DESC LIMIT 5`
    return dbConnection.execute(query)
}




module.exports = {
    getAllOperator,
    getAllOperatorByClass,
    getSingleOperatorDetail,
    getDescriptionChangeOperatorSkill,
    getOperatorSkillUpgradeMaterial,
    getPopularOperatorByClass,
    getRecentOperator
}
