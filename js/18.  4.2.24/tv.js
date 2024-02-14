function avg(table, info) {
    let sum = 0;
    for (let i = 0; i < table.length; i++) {
        sum += table[i][info]
    }
    const average = sum / table.length
    return average
}

const tableDetails = [
    {
        "index": 1,
        "image": "<img src=1.jpg>",
        "name of stor": "mobile",
        "address": "arlozorov 122",
        "city": "tel aviv",
        "link of the stor": "https://israelmobile.business.site/",
        "reting": "1/5"
    },
    {
        "index": 2,
        "image": "<img src=2.jpg>",
        "name of stor": "mobile number 2",
        "address": "arlozorov 200",
        "city": "jerusalem",
        "link of the stor": "https://mobileland.co.il/",
        "reting": "1/5"
    },
    {
        "index": 3,
        "image": "<img src=3.jpg>",
        "name of stor": "mobile number 3",
        "address": "arlozorov 300",
        "city": "ashdod",
        "link of the stor": "https://www.amazon.in/mobile-phones/b?ie=UTF8&node=1389401031",
        "reting": "1/5"
    },
    {
        "index": 4,
        "image": "<img src=4.jpg>",
        "name of stor": "mobile number 4",
        "address": "arlozorov 400",
        "city": "petah tikva",
        "link of the stor": "https://www.t-mobile.com/cell-phones",
        "reting": "1/5"
    }

]