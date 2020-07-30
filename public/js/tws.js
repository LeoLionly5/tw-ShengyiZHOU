function changeValue(id, message){
    $('#dataId').val(id);
    $('#dataMessage').val(message);
}

function changeSaveHref(){
    var path = $('#saveBtn').attr('href');
    const dataId = $('#dataId').val();
    const dataMessage = $('#dataMessage').val();
    console.log(" !!!!" + dataMessage);
    $("#saveBtn").attr("href", path + "/" + dataId + "/" + dataMessage);
    //console.log(p);
}