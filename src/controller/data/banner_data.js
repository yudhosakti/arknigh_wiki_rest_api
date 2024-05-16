
const dataBannerTemp = (data,datarateup) => {
    let dataTemp = {
       id_banner: data.id_banner,
       name: data.banner_name,
       image: data.banner_image,
       date: {
         global: {
             start: data.banner_start_global,
             end: data.banner_end_global
         },
         cn: {
             start: data.banner_start_cn,
             end: data.banner_end_cn
         }
       },
       rate_up: datarateup
    }
    return dataTemp
 }

 
const bannerProcessData = (data) => {
    let dataFinal = []
      let dataTemp = [] 

      for (let index = 0; index < data.length; index++) {
          dataTemp.push(data[index])
          if (dataTemp.length == 30 || index+1 >= data.length) {
              dataFinal.push(dataTemp)
              dataTemp = []
          }
          
      }
      return dataFinal;
}

 module.exports = {
    dataBannerTemp,
    bannerProcessData
 }