const userModel = require('../../models/user')

const getSingleUser = async(req,response) => {
    const id = req.query.id
    try {
        const [dataUser] = await userModel.getSingleUser(id)

        const [dataLike] = await userModel.getAllLikeById(id)

        const [dataBookmark] = await userModel.getAllBookmarkById(id)

        let dataFinal = []

        let dataLikeUser = []

        let dataBookmarkUser = []

        for (let index = 0; index < dataLike.length; index++) {
            dataLikeUser.push({
                id_operator: dataLike[index].id_operator,
                name: dataLike[index].nama_operator,
                image: dataLike[index].image_operator
            })
            
        }

        for (let index = 0; index < dataBookmark.length; index++) {
            dataBookmarkUser.push({
                id_operator: dataBookmark[index].id_operator,
                name: dataBookmark[index].nama_operator,
                image: dataBookmark[index].image_operator
            })
            
        }

        dataFinal.push({
            id_user: dataUser[0].id_user,
            name: dataUser[0].name_user,
            avatar: dataUser[0].avatar_user,
            bookmark: dataUser[0].bookmark_count,
            like: dataUser[0].like_count,
            operator_likes: dataLikeUser,
            operator_bookmarks: dataBookmarkUser
        })

        response.json({
            data: dataFinal[0]
        })



        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const getAllUser = async(req,response)=> {
    const page = req.query.page
    try {
        const [data] = await userModel.getAllUser()

        let dataFinal = []

        let dataTemp = []

        for (let index = 0; index < data.length; index++) {
            dataTemp.push({
                id_user: data[index].id_user,
                name: data[index].name_user,
                avatar: data[index].avatar_user,
                bookmark: data[index].bookmark_count,
                like: data[index].like_count
            })
            if (dataTemp.length == 30 || index+1 >= data.length) {
                dataFinal.push(dataTemp)
                dataTemp = []
            }
            
        }

        if (!Number.isInteger(parseInt(page))) {
            response.json({
                paginate: {
                    max_page: dataFinal.length,
                    current_page: 1,
                    total_item_page: dataFinal[0].length
                },
                data: dataFinal[0]
            })
        } else {
            if (parseInt(page) > dataFinal.length || parseInt(page) <= 0) {
                response.status(404).json({
                    message: "Data Not Found"
                })
            } else {
                response.json({
                    paginate: {
                        max_page: dataFinal.length,
                        current_page: parseInt(page),
                        total_item_page: dataFinal[parseInt(page)-1].length
                    },
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

const addUser = async (req,response) => {
    const username = req.body
    const password = req.body
    try {
        await userModel.addUser(username.username,password.password).then((value) => {
            console.log(value)
            response.json({
                message: "User Created",
                username: username
            })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const addBookmark = async (req,response) => {
    const idUser = req.body
    const idOperator = req.body
    const date = req.body
    try {
        await userModel.addBookmark(idUser.id_user,idOperator.id_operator,date.date).then((value)=> {
             response.json({
                message: "Create Bookmark Succes",
                data: idUser
             })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const deleteBookmark = async(req,response) => {
    const id = req.query.idBookmark
    try {
        await userModel.deleteBookmark(id).then(()=> {
            response.json({
                message: "Bookmark Deleted",
                id: id
            })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const addLike = async (req,response) => {
    const idUser = req.body
    const idOperator = req.body
    const date = req.body
    try {
        await userModel.addLike(idUser.id_user,idOperator.id_operator,date.date).then(()=> {
            response.json({
                message: "Like Success",
                data: idUser
            })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const deleteLike = async (req,response) => {
    const id = req.query.idLike
    try {
        await userModel.deleteLike(id).then(()=> {
            response.json({
                message: "Like Removed",
                id_like: id
            })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const updateUser = async (req,response) => {
    const username = req.body
    const avatar = req.body
    const id = req.body
    try {
       await userModel.updateUser(username.username,avatar.avatar,id.id).then(()=>{
           response.json({
               message: "Data Updated",
               data:username
           })
       })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

const updatePassword = async(req,response) => {
    const newPassword = req.body
    const id = req.body
    try {
        await userModel.updatePassword(newPassword.newPassword,id.id).then(()=>{
            response.json({
                message: "Update Password Success"
            })
        })
        
    } catch (error) {
        response.status(500).json({
            message: error
        })
    }
}

module.exports = {
    getSingleUser,
    getAllUser,
    addUser,
    addBookmark,
    deleteBookmark,
    addLike,
    deleteLike,
    updateUser,
    updatePassword
}