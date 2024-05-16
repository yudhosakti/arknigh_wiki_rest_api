const proccesData = (data)=> {
    let dataFinal = []
    let materialTemp = []
    let idTemp = 0
    let originiumTemp = 0
    
    for (let index = 0; index < data.length; index++) {
        if (idTemp == 0) {
            idTemp = data[index].id_event
        }
        

        if (data[index].id_event == idTemp ) {
            if (data[index].id_material != 97) {
                materialTemp.push({
                    id_material: data[index].id_material,
                    name: data[index].material_name,
                    image: data[index].material_image
                })
               if (index+1 == data.length) {
                 dataFinal.push({
                    id_event: data[index].id_event,
                    name: data[index].event_name,
                    image: data[index].event_image,
                    originium: originiumTemp,
                    start_date: data[index].event_start_cn,
                    materials: materialTemp
                 })
                 break
               }
            } else {
                originiumTemp = data[index].quantity
                if (index+1 == data.length) {
                    dataFinal.push({
                       id_event: data[index].id_event,
                       name: data[index].event_name,
                       image: data[index].event_image,
                       originium: originiumTemp,
                       start_date: data[index].event_start_cn,
                       materials: materialTemp
                    })
                    break
                  }
            }
            
        }else{
            dataFinal.push({
               id_event: data[index-1].id_event,
               name: data[index-1].event_name,
               image: data[index-1].event_image,
               originium: originiumTemp,
               start_date: data[index-1].event_start_cn,
               materials: materialTemp
            })
            materialTemp = []
            originiumTemp = 0
            idTemp =  data[index].id_event
            if (data[index].id_material != 97) {
                materialTemp.push({
                    id_material: data[index].id_material,
                    name: data[index].material_name,
                    image: data[index].material_image
                })
            } else {
                originiumTemp = data[index].quantity
            }
            if (index+1 == data.length) {
                dataFinal.push({
                   id_event: data[index].id_event,
                   name: data[index].event_name,
                   image: data[index].event_image,
                   originium: originiumTemp,
                   start_date: data[index].event_start_cn,
                   materials: materialTemp
                })
                break
              }
        }
    }
    return dataFinal;
}

module.exports = {
    proccesData
}