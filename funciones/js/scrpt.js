const fs = require('fs')


class Contenedor {
    constructor(ruta){
        this.ruta = ruta       
    }   
    
    async save(obj){ // [].length = 0 => false , pread ...[] o {} -> copio al contenido
        try {             
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8') //[1, 2, 3 ,4]
            let dataArchParse = JSON.parse(dataArch) // dataArchParse[dataArchParse.length - 1].id + 1 -> ultimo elemento 
            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataArchParse, { ...obj, id: dataArchParse[dataArchParse.length - 1].id + 1 } ], null, 2))                              
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [{ ...obj, id: 1 }], null, 2))                
            }
            // return dataArchParse.length + 1
             console.log(`El archivo tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
        } catch (error) {
            console.log(error)
        }            
       
    }

    //traer producto por id
    async getById(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)

            let producto = dataArchParse.find(producto => producto.id === id)

            if (producto) {                
                console.log(producto)
            } else {               
                console.log('No se encontro el producto')  
            }           
        } catch (error) {
            console.log(error)
        }
    }

    //traer todos los productos
    async getAll(){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)

            if (dataArchParse.length) {
                // return dataArchParse
                console.log(dataArchParse)                
            } else {
                console.log('No hay productos')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    // eliminar producto por id
    async delete(id){

        let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
        let dataArchParse = JSON.parse(dataArch)// leer y concertir a objeto

        let producto = dataArchParse.find(prod => prod.id === id)
        if (producto) {
            const dataArchParseFiltrado = dataArchParse.filter(prod => prod.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
            console.log('Producto eliminado')
        }else{
            console.log('no existe el producto')
        }
    }

    // eliminar todos los productos
    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
    }
}

module.exports = Contenedor
