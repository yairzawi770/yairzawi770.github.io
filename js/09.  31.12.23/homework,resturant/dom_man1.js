//get document elements from the HTML page  
const id = document.getElementById('id_txt')
const user_name = document.getElementById('id_name')
const Description = document.getElementById('id_description')
const Price = document.getElementById('id_price')
const id_url = document.getElementById('id_url')
const users_table = document.getElementById('users_table')

//clearing the data from the user's input after adding the row
function cler_txt() {
    id.value = ''
    user_name.value = ''
    Description.value = ''
    Price.value = ''
    id_url.value = ''
    id.focus()
}

//add row to the users table with the input type data from the user 
function add_row(idv, namev, Descriptionv, Pricev, urlv) {
    const new_row = users_table.insertRow(-1)
    const cell_id = new_row.insertCell(0)
    const cell_name = new_row.insertCell(1)
    const cell_description = new_row.insertCell(2)
    const cell_price = new_row.insertCell(3)
    const cell_url = new_row.insertCell(4)

    cell_id.innerHTML = idv
    cell_name.innerHTML = namev
    cell_description.innerHTML = Descriptionv
    cell_price.innerHTML = Pricev
    cell_url.innerHTML = '<img src="'+ urlv +'" style="width:100px;" />'

    cler_txt()
}
//add button click
function add_click() {
    const idv = parseInt(id.value)
    const user_namev = user_name.value
    const Descriptionv = Description.value
    const Pricev = parseInt(Price.value)
    const urlv = (id_url.value)
    add_row(idv, user_namev, Descriptionv, Pricev, urlv)
}
