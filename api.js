let elcategoryList = document.querySelector(".category")
let elprodtucts = document.querySelector(".products")
let elSearchInput = document.querySelector(".search")
let elSingleData = document.querySelector(".getSingleData")


// Categories part fetch data start
const request = async (API) => {
    const resolve = await fetch(API)
    const data = await resolve.json()
    return data
}
request("https://api.escuelajs.co/api/v1/categories")
.then(data => {
    
    data.map(item => {
        let elItem = document.createElement('li')
        elItem.className = "text-[1rem] font-bold cursor-pointer"
        elItem.innerHTML = item.name

        elcategoryList.append(elItem)


        elItem.addEventListener("click", ()=>{
            elprodtucts.innerHTML = "LOADING........"
            setTimeout(()=> renderProducts(item.id), 1000)
        })
    })
     
})
// Categories part fetch data end


// Products part fetch data start
function renderProducts(title,id){
    request(`https://api.escuelajs.co/api/v1/products/?title=${title}&categoryId=${id}`)
    .then(data => {
        elprodtucts.innerHTML = null
        data.map(item => {
            let elItem2 = document.createElement('li')
            elItem2.className = "w-[300px] bg-blue-300 rounded-md p-2 cursor-pointer"
            elItem2.innerHTML = `
            <strong>${item.category.id}</strong>
            <h2 class="text-[1.5rem] font-bold">${item.title}</h2>
            <p class="line-clamp-5">${item.description}</p>
            `
    
            elprodtucts.append(elItem2)

            elItem2.addEventListener("click", ()=> {
                renderSingleData(item.id, elSingleData)
            })
        })
         
    })
}
renderProducts("", 0)
// Products part fetch data end

// Search part start
elSearchInput.addEventListener("input", (event)=> {
    renderProducts(event.target.value, 0)
})
// Search part end


function renderSingleData(id, list){
    request(`https://api.escuelajs.co/api/v1/products/${id}`).then(res => {
        list.innerHTML = `
        <strong>${res.category.id}</strong>
        <h2 class="text-[1.5rem] font-bold">${res.title}</h2>
        <p class="line-clamp-5">${res.description}</p>
     `
    })
}