const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
 listaCursos.addEventListener('click', agregarCurso);

 // elimina cursos del carrito 

 carrito.addEventListener('click', eliminarCurso);



//vaciar carrito

vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];

    limpiarHtml();
} )


}


function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        

        leerDatosCurso(cursoSeleccionado);
    }
 
}

// elimina curso seleccionado

function eliminarCurso(e){


    if(e.target.classList.contains('borrar-curso')) {
      const cursoId = e.target.getAttribute('data-id');

      articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

      carritoHtml();
    }
}

// Lee contenido de HTML para extraer informacion


function leerDatosCurso(curso) {
/*     console.log(curso) */

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe

    const existe = articulosCarrito.some( curso => curso.id == infoCurso.id)
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });

        articulosCarrito = [...cursos];

    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];

    }
    //crear objeto con contenido del curso

  // agrega elementos al carrito

  

  console.log(articulosCarrito)

  carritoHtml()

}


// muestra el carrito de compras en HTML


function carritoHtml() {

// limpiar el html
limpiarHtml();

    articulosCarrito.forEach( curso => {

        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${imagen}" width="100"</td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id = ${id} =</a> X </td>
        
        
        `;

        // agrega el HTML en el TBody
        contenedorCarrito.appendChild(row);

    })
}

//elimina los cursos del TBody

function limpiarHtml(){
   /*  contenedorCarrito.innerHTML = ''; */
while(contenedorCarrito.firstChild)
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)

}



