function validarCode(src) {
    src.value = src.value.replace(/([^\w\d]*[_\W])/gi, '')
}

function createid(length,result='') {
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = ''
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createShurl(e, form) {
    e.preventDefault();
    
    var goog = 'https://script.google.com/macros/s/AKfycbyz-a8pyXp5r9vSIWyd9ISLM98nB9E1WE6kRbuoVik-rRi1z7MY/exec'

    let id = form.idsh.value || form.idsh.placeholder

    let headers = new Headers();
    let data = {
    method: 'POST',
    header: headers.append('Content-Type', 'application/json'),
    body: JSON.stringify({
        'use': 'addshort',
        'url': form.urlsh.value,
        'id': id
        })
    }

    fetch(goog,data).then((res) => res.json()).then(function(res){
        console.log(res.id)
    })
}

document.getElementById('idsh').placeholder = createid(6)