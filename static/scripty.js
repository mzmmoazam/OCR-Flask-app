$(document).on('click', '#close-preview', function(){
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function () {
           $('.image-preview').popover('show');
        },
         function () {
           $('.image-preview').popover('hide');
        }
    );
});

$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function(){
        $('.image-preview').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function (){
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
        };
        reader.readAsDataURL(file);
    });

//     $("form").submit(function(e) {
//         // var formData = new FormData(document.querySelector('form'));
//         // formData.append("preprocess",$("input:radio[name='preprocess']:checked").val());
//         var form = document.querySelector('form');
//   var formData = new FormData(form);
// var params = {};
// for (var [key, value] of formData.entries()) {
//   // console.log(key, value);
//   params[key] = value;
// }
// console.log(params);
//
//         $.ajax({
//             url: "/api/ocr",
//             type: "POST",
//             data: params,
//             async: false,
//             success: function (msg) {
//                 alert(msg)
//             },
//             cache: false,
//             contentType: false,
//             processData: false
//         });
//         alert("dkf");
//         e.preventDefault();
//     });


    $("#form").submit(function(e) {
    var formData = new FormData(document.querySelector('#form'));

    // $.post($(this).attr("action"), formData, function(data) {
    //     alert(data);
    // });
        console.log(formData);

        $.ajax({
     type: 'POST',
     url: '/api/ocr',
     data: formData,
     processData: false,
     contentType: false ,
     // beforeSend: function()
     // {
     //     alert('Fetching....');
     // },
     success: function(data)
     {
         console.log(data.text);
         var text = data.text.split('\n').join('<br/>');
         $("body").append('<div class="container">\n' +
             '      <div class="row">\n' +
             '          <div class="col-sm-2"></div>\n' +
             '          <div class="col-sm-8">\n' +
             '  <div class="alert alert-success" role="alert">\n' +
             '  <h4 class="alert-heading">Image contains text :</h4>\n' +
             '  <!--<p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>-->\n' +
             '  <hr>\n' +
             '  <p class="mb-0">' + text + '</p>\n' +
             '</div>\n' +
             '          </div>\n' +
             '          <div class="col-sm-2"></div>\n' +
             '      </div>\n' +
             '  </div>');
     },
     error: function(err)
     {
         alert(err);
     }
 });
    e.preventDefault();

});

    $('#show_api').click(function () {
        var newtext = " Api end point \nCscurl -i -X POST -F files=@test.png http://127.0.0.1:5000/api/ocrCC";
        var obj  = $('#chntxt').text(newtext);
        obj.html(obj.html().replace(/\n/g,'<br/>'));
        obj.html(obj.html().replace(/Cs/g,'<code>'));
        obj.html(obj.html().replace(/CC/g,'<code/>'));
    });

});
