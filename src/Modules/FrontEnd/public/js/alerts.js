
// mensajes flash
var timeAlert1;
var timeDanger;
var timeSuccess;
var timeWarning;

timeAlert();

function timeAlert() {
    var alerts = document.getElementsByClassName('alert-dismissible');
    console.log(alerts)
    if (alerts.length > 0) {
        // existe el mensaje y lo quita
        for (let i = 0; i < alerts.length; i++) {
            if(alerts[i].style.display == 'block'){
                console.log(alerts[i].dataset)
                if(alerts[i].dataset.id == 'timeDanger'){
                    console.log('start timeout timeDanger')
                    timeDanger = setTimeout(function () {
                        alerts[i].style.display = 'none';
                        console.log('end timeout timeDanger');
                        clearTimeout(timeDanger);
                    }, 5000);
                }else if(alerts[i].dataset.id == 'timeSuccess'){
                    console.log('start timeout timeSuccess')
                    timeSuccess = setTimeout(function () {
                        alerts[i].style.display = 'none';
                        console.log('end timeout timeSuccess' );
                        clearTimeout(timeSuccess);
                    }, 5000);
                }else if(alerts[i].dataset.id == 'timeWarning'){
                    console.log('start timeout timeWarning')
                    timeWarning = setTimeout(function () {
                        alerts[i].style.display = 'none';
                        console.log('end timeout timeWarning');
                        clearTimeout(timeWarning);
                    }, 5000);
                }else{
                    console.log('start timeout timeAlert1')

                    timeAlert1 = setTimeout(function () {
                        alerts[i].style.display = 'none';
                        console.log('end timeout timeAlert1');
                        clearTimeout(timeAlert1);
                    }, 5000);
                }
            }
        }
    }
}

function closeAlert(elementAlert){
    elementAlert.getElementsByClassName('alert')[0].style.display = 'none';
    var id = elementAlert.getElementsByClassName('alert')[0].dataset.id;
    
    console.log('id', id)
    switch (id) {
        case 'timeDanger':
            clearTimeout(timeDanger);
            break;
         
        case 'timeSuccess':
            clearTimeout(timeSuccess);
            break;

        case 'timeWarning':
            clearTimeout(timeWarning);
            break;

        default:
            clearTimeout(timeDanger);
            break;
    }
}

// para alertas de respuesta del back
function showAlerts(elementAlert, elementMessage, messageText){

    if($(".modal-body")){
        console.log('el boton existe')
        $(".modal-body").scrollTop(0);
    }
    elementAlert.hidden = false;
    elementMessage.innerHTML = messageText;

    elementAlert.getElementsByClassName('alert')[0].style.display = 'block';
    timeAlert();

}