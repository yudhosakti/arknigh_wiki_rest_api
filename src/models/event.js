const dbConnection = require('../config/database')

const getRecentEvent = ()=> {
   const query = `SELECT * FROM tbl_event ORDER BY tbl_event.event_start_cn DESC LIMIT 4`;
   return  dbConnection.execute(query)
}

const getRecentEventWithRewardCN = ()=> {
const query =  `SELECT * FROM tbl_event INNER JOIN tbl_event_reward ON tbl_event.id_event = tbl_event_reward.id_event INNER JOIN tbl_material ON tbl_event_reward.id_material = tbl_material.id_material WHERE datediff(CURRENT_DATE,tbl_event.event_start_cn) <= 30 AND (tbl_material.id_material = 97 OR tbl_event_reward.type = 'T3') ORDER BY tbl_event.event_start_cn DESC,tbl_event.id_event DESC;`
   return dbConnection.execute(query)
}

const getSingleEventBanner = (id)=> {
   const query = `SELECT * FROM tbl_event INNER JOIN tbl_event_banner ON tbl_event.id_event = tbl_event_banner.id_event INNER JOIN tbl_banner ON tbl_event_banner.id_banner = tbl_banner.id_banner WHERE tbl_event.id_event = ${id}`
   return dbConnection.execute(query)

}

const getSingleEventReward = (id) => {
   const query = `SELECT * FROM tbl_event_reward INNER JOIN tbl_material ON tbl_event_reward.id_material = tbl_material.id_material WHERE tbl_event_reward.id_event = ${id}`
   return dbConnection.execute(query)
}

const getSingleEvent = (id) => {
   const query = `SELECT * FROM tbl_event WHERE tbl_event.id_event = ${id}`
   return dbConnection.execute(query)
}

const getAllEvent = () => {
   const query = `SELECT * FROM tbl_event`
   return dbConnection.execute(query)
}

module.exports = {
    getRecentEvent,
    getRecentEventWithRewardCN,
    getSingleEventBanner,
    getSingleEventReward,
    getSingleEvent,
    getAllEvent
}

