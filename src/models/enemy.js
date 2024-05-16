const dbConnection = require('../config/database')

const getAllEnemy = (isShort)=> {
    if (isShort == 0) {
    const query = `SELECT * FROM tbl_enemy`
    return dbConnection.execute(query)
    } else {
    const query = `SELECT * FROM tbl_enemy ORDER BY tbl_enemy.enemy_type DESC`
    return dbConnection.execute(query)
    }
    
}

const getAllEnemyFilter = (type) => {
    const query = `SELECT * FROM tbl_enemy WHERE tbl_enemy.enemy_type = '${type}'`
    return dbConnection.execute(query)
}

const getSingleEnemyDetail = (id) => {
    const query = `SELECT * FROM tbl_enemy_appearance INNER JOIN tbl_enemy ON tbl_enemy_appearance.id_enemy=tbl_enemy.id_enemy INNER JOIN tbl_stage ON tbl_stage.id_stage=tbl_enemy_appearance.id_stage WHERE tbl_enemy_appearance.id_enemy = ${id}`
    return dbConnection.execute(query)
}

module.exports = {
    getAllEnemy,
    getAllEnemyFilter,
    getSingleEnemyDetail
}