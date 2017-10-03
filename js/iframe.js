$(function(){
    

var blockArea = $("#block-area");
var modal = $("#header-modal");
var preview = $('iframe').contents();
var draggable = $(".draggable");

var arrHtml = [];
var arrDraggable = [];

draggable.on('dragstart', onDragStart);
blockArea.add(modal).on('dragover', onDragOver);
modal.on('drop', onDrop);
blockArea.on('drop', onDropInBlock);

function getLength(dom){
    var len = dom.find(".draggable").length;
    return len;
}

var convert = function(res, dom){

    // blockAreaのdraggable数
    var blockLen = getLength(blockArea);

    // draggable要素の親要素
    var parent = dom.parent();

    // dragされた要素のID
    var id = dom.attr("id");

    // 親要素からdragされたIDを探す
    var seachID = parent.find("#" + id)

    // dragされたIDが何番目か
    var index = blockArea.find(".draggable").index($("#" + id));

    var obj = {
        id : dom.attr("id"),
        order : index,
        html : res
    }

    arrHtml.splice(index, index, res);
    arrDraggable.splice(index, index, obj);

    console.log(arrDraggable)
    
    var html = "";
    
    for(var i = 0; i < blockLen; i++){
        html += arrHtml[i];
    }
    
    var t = preview.find('body').html(html);
    
}

function reduceHtml(dom){
    
    var blockLen = getLength(blockArea);
    var parent = dom.parent();
    var id = dom.attr("id");
    var seachID = parent.find("#" + id).attr("id");
    var index = modal.find(".draggable").index($("#" + id));
    
    console.log(seachID);
    console.log(arrDraggable.length);

    for(var i = 0; i < arrDraggable.length; i++){
        if(seachID == arrDraggable[i].id){
            console.log(i);
            arrHtml.splice(i, 1);
            arrDraggable.splice(i, 1);
            // if(i == 0 && blockLen == 0){
            //     arrHtml = [];
            //     arrDraggable = [];
            // }
        }
    }
    console.log(arrDraggable.length);
    console.log(arrHtml);


    var html = "";
    
    for(var i = 0; i < blockLen; i++){
        html += arrHtml[i];
    }

    var t = preview.find('body').html(html);
}

function ajaxGetHtml(dom){
    var url = dom.find(".get-html").attr("data-url");
    var jqXHR = $.ajax({
        type: 'POST',
        url: url,
        dataType: 'html'
    });
    return jqXHR;
}

function parentSeach(dom){

    var parentID = dom.parent().attr("id");
    return parentID;
    
}


function onDragStart(event){
    //ドラッグするデータのid名をDataTransferオブジェクトにセット
    event.originalEvent.dataTransfer.setData("text", event.target.id);
}


function onDragOver(event){
    //dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
    event.preventDefault();
}


function onDrop(event){
    //ドラッグされたデータのid名をDataTransferオブジェクトから取得
    var id_name = event.originalEvent.dataTransfer.getData("text");
    
    //id名からドラッグされた要素を取得
    var drag_elm =document.getElementById(id_name);
    //ドロップ先にドラッグされた要素を追加
    event.currentTarget.appendChild(drag_elm);
    
    var $dom = $(drag_elm);
    reduceHtml($dom);
    
    //エラー回避のため、ドロップ処理の最後にdropイベントをキャンセルしておく
    event.preventDefault();
}

function onDropInBlock(event){
    var id_name = event.originalEvent.dataTransfer.getData("text");

    //id名からドラッグされた要素を取得
    var drag_elm =document.getElementById(id_name);
    //ドロップ先にドラッグされた要素を追加
    event.currentTarget.appendChild(drag_elm);

    var $dom = $(drag_elm);
    var getHtml = ajaxGetHtml($dom);
    getHtml.done(function(res){
        convert(res, $dom);
        
    });
    getHtml.fail(function(res){
        console.log(res);
    });
    getHtml.always(function(res){
        
    });

    //エラー回避のため、ドロップ処理の最後にdropイベントをキャンセルしておく
    event.preventDefault();
}


});