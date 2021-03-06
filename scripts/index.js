const goog = '' // Here goes your app link
const repo = '' // Here goes your repository link e.g. ezeholz.github.io/shurl/
if (repo.slice(-1) != "/") repo = repo + "/"

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
        if(res.id) {
            form.urlsh.hidden = true
            form.idsh.hidden = true
            form.subsh.hidden = true
            document.getElementsByTagName('br')[0].hidden = true
            document.getElementsByTagName('label')[0].innerHTML = '<a href="https://'+repo+res.id+'">'+repo+res.id+'</a>'
        } else 
            alert('Ingrese una url!')
    })
}
