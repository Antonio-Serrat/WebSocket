const socket = io()
const cards = document.querySelector('#cards')
const div = document.createElement('div')
const h4 = document.createElement('h4')

// section NO cards
div.className='col-12 my-5 text-center'
h4.className='title'
h4.innerText='Aun no hay productos agregados'
div.appendChild(h4)



socket.on("index", () => {
    fetch('/static/database/products.json')
    .then((res) => {
        return res.json()
    })
    .then((productos) =>{
        if(productos.length == 0){
           cards.appendChild(div)
        }else{
            productos.forEach(producto => {
                console.log(producto)
                //create elements
                const div1 = document.createElement('div')
                const div2 = document.createElement('div')
                const div3 = document.createElement('div')
                const img = document.createElement('img')
                const h4_1 = document.createElement('h4')
                const h5 = document.createElement('h5')

                //assign class
                div1.className='col d-flex justify-content-center'
                div2.className='card'                
                img.className='card-img'
                img.alt='imagen producto'
                div3.className='card-body'
                h4_1.className='card-title'
                h5.className='card-text'

                //agrup all
                div3.appendChild(h4_1)
                div3.appendChild(h5)
                div2.appendChild(img)
                div2.appendChild(div3)
                div1.appendChild(div2)
                
                // set params
                img.src=producto.thumbnail
                h4_1.innerText=`${producto.title}`
                h5.innerText=`${producto.price}`    
                
                // put into index
                cards.appendChild(div1)
            });

        }
    })
     
})