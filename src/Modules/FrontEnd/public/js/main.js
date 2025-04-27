let sidebarStatus = false;

function toggleSidebar(){
    sidebarStatus = !sidebarStatus;
    sessionStorage.setItem('sidebarStatus', sidebarStatus)
    if(document.getElementById("sidebar")){
        if(sidebarStatus || sidebarStatus == "true"){
            document.getElementById("sidebar").style.width = "250px";
            //document.getElementById("header").style.marginLeft = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }else{
            document.getElementById("sidebar").style.width = "3.5rem";
            //document.getElementById("header").style.marginLeft = "3.5rem";
            document.getElementById("main").style.marginLeft = "3.5rem";
        }
    }
}


