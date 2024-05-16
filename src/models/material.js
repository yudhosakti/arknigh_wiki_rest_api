const dbConnection = require('../config/database')

const getAllMaterial = (isShort)=> {
    if (isShort == 0) {
    const query = `SELECT * FROM tbl_material`
    return dbConnection.execute(query)
    } else {
    const query = `SELECT * FROM tbl_material ORDER BY tbl_material.material_tier DESC`
    return dbConnection.execute(query)
    }
    
}

const getAllMaterialByCategory = (tier)=> {
    const query =  `SELECT * FROM tbl_material WHERE tbl_material.material_tier='${tier}'`
    return dbConnection.execute(query)
}

const getSingleMaterialDetail = (id)=> {
    const query = `SELECT * FROM tbl_material_location INNER JOIN tbl_material ON tbl_material_location.id_material=tbl_material.id_material INNER JOIN tbl_stage ON tbl_material_location.id_stage = tbl_stage.id_stage WHERE tbl_material_location.id_material = ${id}`
    return dbConnection.execute(query)
}

module.exports = {
    getAllMaterial,
    getAllMaterialByCategory,
    getSingleMaterialDetail
}