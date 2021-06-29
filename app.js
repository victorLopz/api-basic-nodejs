const express = require('express');
const mysql  = require('mysql');
const morgan  = require('morgan');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3200;
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

try {

    const pool = mysql.createPool({
        host: 'us-cdbr-east-03.cleardb.com',
        user: 'b8d545eb08c5f4',
        password: '7dd82646',
        database: 'heroku_075b99ae8ada68b'
    });

    //Revisar la pool
    pool.query('select 1 + 1', (err, rows) => {
        return console.log(err)
    });

    app.listen(PORT, ()=>{
        console.log(`server runing on port  ${PORT}`);
    })

    //RUTAS DE ACCESO 
    app.get('/', (req, res)=>{
        res.send('Bienvenido a la Api');
    });

    // TODOS LOS CLIENTES
    app.get('/productos', (req, res)=>{
        const sql = "SELECT * FROM almacen WHERE isVisible = 1";
        pool.query(sql, (error, results)=>{
            if(error) throw error;
            
            if(results.length > 0){
                res.json(results);
            }else{
                res.send('No hay resultados');
            }
        })
    });

    app.get('/cantidad', (req, res)=>{
        const sql = "SELECT COUNT(IDCodigoAlmacen) as Productos FROM almacen WHERE isVisible = 1";
        pool.query(sql, (error, results)=>{
            if(error) throw error;
            
            if(results.length > 0){
                res.json(results);
            }else{
                res.send('No hay resultados');
            }
        })
    });

    // UN SOLO CLIENTE
    app.get('/productos/:id', (req, res)=>{
        const {id} = req.params;
        const sql = `SELECT * FROM almacen WHERE IDCodigoAlmacen = ${id}`; 

        pool.query(sql, (error, result)=>{
            if(error) throw error;
            
            if(result.length > 0){
                res.json(result);
            }else{
                res.send('No hay resultados');
            }
        })
    });

    // METODO POST PARA AÑADIR
    app.post('/add', (req, res)=>{
        const sql = 'INSERT INTO almacen SET ?'
        
        const almacenObj = {
            NombreArticulo: req.body.NombreArticulo,
            Codigo1: req.body.Codigo1,
            Codigo2: req.body.Codigo2,
            marca: req.body.marca,
            Modelopresentacion: req.body.Modelopresentacion,
            precioVenta: req.body.precioVenta,
            PrecioCompra: req.body.PrecioCompra,
            Stock: req.body.Stock,
            Notas: req.body.Notas
        }

        pool.query(sql, almacenObj, error =>{
            if(error) throw error;
            res.send("Producto creado");
        })
    });

    //RUTA PARA EDITAR
    app.put('/update/:id', (req, res)=>{
        const {id} = req.params;
        const {NombreArticulo, Codigo1, Codigo2, marca, Modelopresentacion, precioVenta, PrecioCompra, Stock, Notas } = req.body;
        const sql = `UPDATE almacen SET NombreArticulo = '${NombreArticulo}', Codigo1 = '${Codigo1}', Codigo2 = '${Codigo2}', marca = '${marca}', Modelopresentacion = '${Modelopresentacion}', precioVenta = '${precioVenta}', PrecioCompra = '${PrecioCompra}', Stock = '${Stock}', Notas = '${Notas}'  WHERE IDCodigoAlmacen = '${id}'`;

        pool.query(sql, error =>{
            if(error) throw error;
            res.send("Producto Editado con Exito");
        })

    });
    //RUTA PARA ELIMINAR
    app.delete('/delete/:id', (req, res)=>{
        const {id} = req.params;
        const sql = `UPDATE almacen SET isVisible = 0 WHERE IDCodigoAlmacen = '${id}'`;

        pool.query(sql, error =>{
            if(error) throw error;
            res.send("Producto Eliminado con Exito");
        })
    });

}catch (error) {
    console.log(error)
}