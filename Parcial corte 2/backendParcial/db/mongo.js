const { connect, set } = require('mongoose');

const DB_URI = 'mongodb+srv://estebancastano01:0ySy9EysFRenCeyb@cluster0.je9mb.mongodb.net/rifas?retryWrites=true&w=majority&appName=Cluster0'

const dbInit = async () => {
    set("strictQuery", false);
    await connect(`${DB_URI}`);
};

module.exports = {
    dbInit
}