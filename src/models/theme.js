const dbConnection = require('../config/database')

const getAllTheme = () => {
    const query = `SELECT * FROM tbl_theme`
    return dbConnection.execute(query)
}

const getAllStageByTheme = (id) => {
    const query = `SELECT * FROM tbl_stage WHERE id_theme = ${id}`
    return dbConnection.execute(query)
}

const getSingleTheme = (id) => {
    const query = `SELECT * FROM tbl_theme INNER JOIN tbl_event_theme ON tbl_theme.id_theme = tbl_event_theme.id_theme INNER JOIN tbl_event ON tbl_event_theme.id_event = tbl_event.id_event WHERE tbl_theme.id_theme=${id}`
    return dbConnection.execute(query)
}

module.exports = {
    getAllTheme,
    getAllStageByTheme,
    getSingleTheme
}