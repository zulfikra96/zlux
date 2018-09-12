var zlx = {}
var host = `http://${window.location.host}`
document.addEventListener('DOMContentLoaded',function(){
    // get modal toggle  
    let modal = document.getElementsByClassName('modal')
    for (let i = 0; i < modal.length; i++) {
        modal[i].addEventListener('click',function(event){
             
            if(event.target == this){
                this.setAttribute('hidden','')
            }else{
                return
            }
            
        })
    }
})


function openModal(args){
   
    let doc = document.querySelector(`#${args}`)
    let child = doc.childNodes    


    let check = doc.getAttribute("hidden")

    if(check != null){
        doc.removeAttribute("hidden")
        doc.setAttribute("visible","")
    }else{
        doc.removeAttribute("visible")
        doc.setAttribute("hidden","")
    }
    
}

function closeModal(args){
    let doc = document.querySelector(`#${args}`)
    doc.removeAttribute("visible")
    doc.setAttribute("hidden","")
}

document.addEventListener('click',function(e){
    let menu = document.getElementsByClassName('menu')
    if(e.target == document.getElementsByTagName('html')[0]){
        for (let index = 0; index < menu.length; index++) {
            menu[index].setAttribute('hidden','')     
        }
        
    }
})

function openMenu(args){
    
    let menu_hidden = document.getElementById(args)
    let attr = menu_hidden.hasAttribute('hidden')
   
    
    if(!attr){
        console.log(true);
        menu_hidden.setAttribute('hidden','')
        
    }else{
        console.log(false);
        menu_hidden.removeAttribute("hidden")
        
    }

}

function toUpperCaseLetter(args)
{
    console.log("ini to upper case " + args);
    
    if(args == undefined || args == "" ){

        return ''
    }
    return args.charAt(0).toUpperCase() + args.slice(1)

}

function zlxDate(args)
{
    
    
    args = new Date(args)
    
    
    zlx.month = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ]

    zlx.day = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jum\'at',
        'Sabtu'    
    ]
    let day = args.getDay(),
        date = args.getDate(),
        month = args.getMonth(),
        year = args.getFullYear()
        full = `${zlx.day[day]} ${date} ${zlx.month[month]} ${year}`

        console.log(full.toString());
        
        return full.toString()
}

function getListTable(start,end,url)
{
    fetch(url + start + '/' + end,{
        method:'GET',
        credentials:'same-origin'
    }).then(function(response){
        response.text().then(function(data){
            displayData(data)
        })
    })
}
  
function zlxPaginate(firsturl,lasturl)
{
    fetch(firsturl,{
        method:'GET',
        credentials:'same-origin'
    }).then(function(response){
    let start = 0
    let end = 10
        response.json().then(function(data){
            console.log(data);
            
            let panjang = data.total_personil
            let bahagi = panjang / 10;
            let display = ``
            let display_table = ``
            let no = 1;
            if(bahagi > parseInt(bahagi))
            {
                bahagi = parseInt(bahagi)
                bahagi += 1;
            }
        
            for (let index = 1; index <= parseInt(bahagi); index++) {
                display += `
                    <a href="javascript:void(0)" style="display:inline; padding:10px; " class="btn btn-blue" onclick="getListTable(${start},${end},'${lasturl}')">${index}</a>
                ` 
                start += 10
                end += 10;
            }
            document.getElementsByClassName("paginate")[0].innerHTML = display
        })              

    })  
}
// set datehtml tag
function setDateHtml(args = {
    date_id:'',
    date_placeholder:'',
    date_value,
    month_id:'',
    month_width:'',
    month_placeholder:'',
    month_value,
    year_id:'',
    year_width:'',
    year_placeholder:'',
    year_value:'',
    date_id_display:'' 
})
{
    var html_view = /*html*/ `
    <input type="number" id="${args.date_id}" class="form-control" style="display:inline-block;width:20%;" placeholder="${args.date_placeholder}" max="31" value="${(args.date_value != null) ? args.date_value : ''}">
    <select name="" id="${args.month_id}" class="form-control" style="color:black;width:42%;">
        <option value="0">Januari</option>
        <option value="1">Februari</option>
        <option value="2">Maret</option>
        <option value="3">April</option>
        <option value="4">Mei</option>
        <option value="5">Juni</option>
        <option value="6">Juli</option>
        <option value="7">Agustus</option>
        <option value="8">September</option>
        <option value="9">Oktober</option>
        <option value="10">Nopember</option>
        <option value="11">Desember</option>
    </select>
    <input type="number" id="${args.year_id}" class="form-control" style="display:inline-block;width:30%;" max="${new Date().getFullYear()}" placeholder="${args.year_placeholder}" value="${(args.year_value != null) ? args.year_value : ''}">`;
    
    setTimeout(function(){
        if(args.month_value != null)
        {
            console.log(args.month_value);
            document.getElementById(args.month_id).value = args.month_value + 1
        }
    },500)
    
    return html_view
}

function eventListen(callback)
{
    callback()
}

function setHtmlById(args)
{
    for (let index = 0; index < args.length; index++) {
        
        document.getElementById(args[index].id).innerHTML = args[index].value
    }
}

function getDataApi(url,callback,error)
{
        fetch(`${host}/api/${url}`,{
            method:'GET',
            credentials:'same-origin'
       })
       .then(function(response){
           response.json().then(function(data){
                callback(data)
           })
       })
       .catch(function(err){
            error(err)
            
       })
}

function getSessionApi(callback,error)
{
        fetch(`${host}/sessiondata`,{
            method:'GET',
            credentials:'same-origin'
       })
       .then(function(response){
           response.json().then(function(data){
                callback(data)
           })
       })
       .catch(function(err){
            error(err)
            
       })
}

function nameToUpperCase(args)
{
    let name = args.split(" ")
    let first_char
    let new_string = []
    let new_string_fix = ''
    for (let index = 0; index < name.length; index++) {
        first_char = name[index][0].toUpperCase()
        new_string.push(first_char + name[index].substr(1,name[index].length - 1))
    }
    
    for (let index = 0; index < new_string.length; index++) {
        new_string_fix += new_string[index] + " "
    }
    
    return new_string_fix
}
