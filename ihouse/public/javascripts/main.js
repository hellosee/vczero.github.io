$(document).ready(function(){
    //轮播动画
    (function(){
      var index_slider = $("#index_slider");
      var imgIndex = 1;
      setInterval(function(){
        var n = imgIndex % 4;
        index_slider[0].src = 'public/images/silder_0'+ (++n) +'.jpg';
        imgIndex++;
      },3000);
    })();

    $('#my_shoucang').hide();

    $('#index_soucangjia').click(function(){
        $('#my_shoucang').show();
    });
   
    $('#my_close').click(function(){
        $('#my_shoucang').hide();
    });
    
}); 

