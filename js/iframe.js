$(function(){
    

var blockArea = $("#block-area");
var modal = $("#header-modal");
var preview = $('iframe').contents();
var draggable = $(".draggable");

draggable.on('dragstart', onDragStart);
blockArea.add(modal).on('dragover', onDragOver);
blockArea.add(modal).on('drop', onDrop);

var convert = function(){
    var html = blockArea.html();
    // iframeのプロパティーについて
    // https://so-zou.jp/web-app/tech/programming/javascript/dom/node/element/html/iframe/
    var t = preview.find('body').html(html);
}

/***** ドラッグ開始時の処理 *****/
function onDragStart(event){
    console.log(event)
    //ドラッグするデータのid名をDataTransferオブジェクトにセット
    event.originalEvent.dataTransfer.setData("text", event.target.id);
}

/***** ドラッグ要素がドロップ要素に重なっている間の処理 *****/
function onDragOver(event){
    //dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
    event.preventDefault();
}

/***** ドロップ時の処理 *****/
function onDrop(event){
    //ドラッグされたデータのid名をDataTransferオブジェクトから取得
    var id_name = event.originalEvent.dataTransfer.getData("text");
    //id名からドラッグされた要素を取得
    var drag_elm =document.getElementById(id_name);
    //ドロップ先にドラッグされた要素を追加
    event.currentTarget.appendChild(drag_elm);
    convert();
    //エラー回避のため、ドロップ処理の最後にdropイベントをキャンセルしておく
    event.preventDefault();
}

$(".utils li").on("click",function(){
    
});



});