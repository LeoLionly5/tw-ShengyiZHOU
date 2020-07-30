function edit(id, message){
    $('#dataId').val(id);
    $('#dataMessage').val(message);
    $('#myModalLabel').text("Edit twitter");
}

function add(id, message){
    $('#dataId').val("");
    $('#dataMessage').val("");
    $('#myModalLabel').text("Add twitter");
}

function changeHref(){
    const dataId = $('#dataId').val();
    const dataMessage = $('#dataMessage').val();
    if (dataId != ""){
        $("#saveBtn").attr("href", "/tws/edit/" + dataId + "/" + dataMessage);
    }
    else{
        $("#saveBtn").attr("href", "javascript:create(" + dataMessage + ")");
    }
}

function create(message){  
    var form = $("<form>");
    form.attr('style','display:none');
    form.attr('method','post');  
    form.attr('action',"/tws/add/" + message);  
    $('body').append(form);
    form.submit();
} 