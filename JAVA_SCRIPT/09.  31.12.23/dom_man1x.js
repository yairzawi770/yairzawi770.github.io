// clearing the data from the user's input after adding the row
function clear_txt() {
    id.value = ''
    user_name.value = ''
    email.value = ''
    country.value = ''
    id.focus()
}

// add row to the users table with the input type data from the user
function add_row(idv, user_namev, emailv, countryv) {
    const new_row = users_table.insertRow(-1)
    const cell_id = new_row.insertCell(0)
    const cell_name = new_row.insertCell(1)
    const cell_email = new_row.insertCell(2)
    const cell_country = new_row.insertCell(3)
    const cell_flag = new_row.insertCell(4)

    cell_id.innerHTML = idv
    cell_name.innerHTML = user_namev
    cell_email.innerHTML = emailv
    cell_country.innerHTML = countryv


    switch (countryv.toUpperCase()) {
        case 'ISRAEL':
            cell_flag.innerHTML = '<img src="images/israel.png" style="width:50px;" />'
            break;
        case 'USA':
            cell_flag.innerHTML = '<img src="images/usa.jpg" style="width:50px;"/>'
            break;
        // add country
    }

    clear_txt()
}

// add button click
function add_click() {
    const idv = parseInt(id.value)
    const user_namev = user_name.value
    const emailv = email.value
    const countryv = country.value
  
    add_row(idv, user_namev, emailv, countryv,)
}