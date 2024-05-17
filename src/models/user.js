const dbConnection = require('../config/database')

const getAllUser = ()=> {
   const query = `SELECT * FROM tbl_user`
   return dbConnection.execute(query)
}

const getSingleUser = (id) => {
    const query = `SELECT * FROM tbl_user WHERE id_user = ${id}`
    return dbConnection.execute(query)
}

const getAllBookmarkById = (id) => {
    const query = `SELECT * FROM tbl_bookmark_operator INNER JOIN tbl_user ON tbl_bookmark_operator.id_user = tbl_user.id_user INNER JOIN tbl_operator ON tbl_bookmark_operator.id_operator = tbl_operator.id_operator WHERE tbl_bookmark_operator.id_user = ${id}`
    return dbConnection.execute(query)
}

const getAllLikeById = (id) => {
    const query = `SELECT * FROM tbl_like INNER JOIN tbl_operator ON tbl_like.id_operator = tbl_operator.id_operator WHERE tbl_like.id_user = ${id}`
    return dbConnection.execute(query)
}

const addBookmark = (idUser,idOperator,date) => {
    const query = `INSERT INTO tbl_bookmark_operator(id_operator,id_user,mark_at) VALUES (${idOperator},${idUser},'${date}')`
    return dbConnection.execute(query)
}

const addLike = (idUser,idOperator,date) => {
    const query = `INSERT INTO tbl_like(id_operator,id_user,like_at) VALUES (${idOperator},${idUser},'${date}')`
    return dbConnection.execute(query)
}

const deleteBookmark = (idBookmark) => {
    const query =  `DELETE FROM tbl_bookmark_operator WHERE id_bookmark_op = ${idBookmark}`
    return dbConnection.execute(query)
}

const deleteLike = (idLike) => {
    const query = `DELETE FROM tbl_like WHERE id_like = ${idLike}`
    return dbConnection.execute(query)
}

const addUser = (email,username, password) => {
    const query = `INSERT INTO tbl_user(name_user,password,email) VALUES ('${username}',SHA1('${password}'),'${email}')`
    return dbConnection.execute(query)
}

const updateUser = (username,avatar,id) => {
    const query = `UPDATE tbl_user SET name_user='${username}',avatar_user='${avatar}' WHERE id_user = ${id}`
    return dbConnection.execute(query)
}

const updatePassword = (newPassword,id) => {
    const query = `UPDATE tbl_user SET password=SHA1('${newPassword}') WHERE id_user = ${id}`
    return dbConnection.execute(query)
}

const validateUser = (email,password) => {
    const query = `SELECT * FROM tbl_user WHERE tbl_user.email = '${email}' AND tbl_user.password = SHA1('${password}')`
    return dbConnection.execute(query)
}

module.exports = {
    getAllUser,
    addBookmark,
    addLike,
    deleteBookmark,
    deleteLike,
    updateUser,
    updatePassword,
    addUser,
    getSingleUser,
    getAllBookmarkById,
    getAllLikeById,
    validateUser
}

