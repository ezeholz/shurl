function addShort(Url,idt) {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var lastRow = sheets[0].getLastRow()
  var now = new Date()
  
  var id = createid(6,idt)
  
  if(Url != undefined){
    let vals = [[id,Url,now]]
    sheets[0].getRange(lastRow+1, 1, 1, 3).setValues(vals)
    return id
  } else {
    return false
  }
}

function searchShort(id) {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var data = sheets[0].getDataRange().getValues();
  var lastRow = sheets[0].getLastRow()
  
  for(var i=1;i<lastRow;i++){
    if(data[i][0]==id) return data[i][1]
  }
  return false
}

function createid(length,result='') {
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   if(result=='' || !(result.length <= 6 && result.replace(/([\w\d]*[^_\W])/gi,"").length == 0)) {
     result = ''
     for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
   }
   if(searchShort(result)) return createid(6);
   else return result;
}

function doGet(e) {
    if(e.parameter.use=='addshort' && e.parameter.url) {
      return ContentService.createTextOutput(JSON.stringify({'id': ''+addShort(e.parameter.url,e.parameter.id)})).setMimeType(ContentService.MimeType.JSON);
    }
    if(e.parameter.use=='searchshort' && e.parameter.id) {
      return ContentService.createTextOutput(JSON.stringify({'url': ''+searchShort(e.parameter.id)})).setMimeType(ContentService.MimeType.JSON);
    }
}
  
function doPost(e) {
    var contents = JSON.parse(e.postData.contents);
    
    if(contents.use=='addshort' && contents.url) {
        return ContentService.createTextOutput(JSON.stringify({'id': ''+addShort(contents.url,contents.id)})).setMimeType(ContentService.MimeType.JSON);
    }
}
  