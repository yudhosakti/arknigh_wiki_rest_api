const dbConnection = require('../config/database')

const getRecentBanner = ()=> {
    const query = `SELECT tbl_banner.id_banner,tbl_banner.banner_name,tbl_banner.banner_image,tbl_banner.banner_start_cn,tbl_banner.banner_end_cn,tbl_banner.banner_start_global,tbl_banner.banner_end_global,tbl_operator.id_operator,tbl_operator.nama_operator,tbl_operator.image_operator FROM tbl_banner LEFT JOIN tbl_rate_up_operator ON tbl_banner.id_banner = tbl_rate_up_operator.id_banner LEFT JOIN tbl_operator ON tbl_rate_up_operator.id_operator = tbl_operator.id_operator WHERE datediff(CURRENT_DATE,tbl_banner.banner_start_cn) <= 30 ORDER BY tbl_banner.banner_start_cn DESC,tbl_banner.id_banner DESC`
   return dbConnection.execute(query)
}

const getAllBanner = ()=> {
    const query = `SELECT * FROM tbl_banner`
    return dbConnection.execute(query)
}
const getAllBannerFilter = (version) => {
    if (version == "global") {
      const query = `SELECT * FROM tbl_banner WHERE tbl_banner.banner_start_cn IS NULL`
      return dbConnection.execute(query)
    }else{
     const query = `SELECT * FROM tbl_banner WHERE tbl_banner.banner_start_global IS NULL`
     return dbConnection.execute(query)
    }
    
    
}

const getSingleBannerRateUp = (id) => {
    const query = `SELECT * FROM tbl_banner INNER JOIN tbl_rate_up_operator ON tbl_banner.id_banner = tbl_rate_up_operator.id_banner INNER JOIN tbl_operator ON tbl_rate_up_operator.id_operator = tbl_operator.id_operator WHERE tbl_banner.id_banner = ${id}`
    return dbConnection.execute(query)
}

const getSingleBannerEvent = (id) => {
    const query = `SELECT * FROM tbl_event_banner INNER JOIN tbl_banner ON tbl_event_banner.id_banner = tbl_banner.id_banner INNER JOIN tbl_event ON tbl_event_banner.id_event = tbl_event.id_event WHERE tbl_event_banner.id_banner = ${id}`
    return dbConnection.execute(query)
}

const getSingleBanner = (id) => {
    const query = `SELECT * FROM tbl_banner WHERE tbl_banner.id_banner = ${id}`
    return dbConnection.execute(query)
}

module.exports = {
    getRecentBanner,
    getAllBanner,
    getAllBannerFilter,
    getSingleBannerRateUp,
    getSingleBannerEvent,
    getSingleBanner
}