const {ipcRenderer} = require('electron');
const Dexie = require('dexie');

 
    const db = new Dexie("registro");
    db.version(1).stores({
        inforegistro: "cédula,nombre,apellido,dirección,teléfono,fecha"
    });
     
    db.open();
    
    const connect = db.inforegistro;
    
    const addUser = (data) => {
        connect.put(data);
        ipcRenderer.send('registrar',data);
    };

    const print = (inforegistro) => {
        let tablebody=
            `<tr>
                <td>`+inforegistro.nombre+`</td>
                <td>`+inforegistro.apellido+`</td>
                <td>`+inforegistro.cédula+`</td>
                <td>`+inforegistro.dirección+`</td>
                <td>`+inforegistro.teléfono+`</td>
                <td>`+inforegistro.fecha+`</td>
                <td>
                    <button onclick="edit()" style="border:none;background:transparent">
                        <img  src="./icons/edit.png" id="trash">
                    </button>
                    <button onclick="borrar('`+inforegistro.cédula+`')" style="border:none;background:transparent">
                        <img  src="./icons/trash.png" id="trash">
                    </button>
                </td>
            </tr>`;
        document.getElementById('tablebody').innerHTML+=tablebody;
    };

    const searchUser = (data) =>{
        tablebody.textContent = '';
        connect.each(inforegistro =>{ 
            if (inforegistro.cédula.indexOf(data) !== -1){
                print(inforegistro)
            };
            if(tablebody.textContent === ''){
                tablebody.textContent += `no encontrado...`
            };
            //form.reset();
        });
    };
    
    const showUsers = () => {
        users.textContent='';
        tablebody.textContent= '';
        connect.each(inforegistro => print(inforegistro));
        connect.count(_value => document.getElementById('users').innerText += _value);
    };

    const deleteUser = (deleted) => {
        connect.delete(deleted);
        showUsers();
    };

    const updateUser = (a,d)=>{
        connect.update(a,d);
    };

    exports.addUser = addUser;
    exports.showUsers = showUsers;
    exports.searchUser = searchUser;
    exports.updateUser = updateUser;
    exports.deleteUser = deleteUser;