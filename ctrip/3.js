
var Upload = function(input, canvas, canvasWidth, canvasHeight){
  this.input = $(input);
  this.canvas = $(canvas)[0];
  this.context = this.canvas.getContext("2d");
  this.offscreenCanvas = document.createElement('canvas');
  this.offscreenContext = this.offscreenCanvas.getContext('2d');
  this.reader = new FileReader();
  this.image = new Image();

  var that = this;
  this.reader.onload = function(e){
    that.image.onload = function(){
      if(typeof canvasWidth === 'undefined'){
        canvasWidth = 200;
      }
      if(typeof canvasHeight === 'undefined'){
        canvasHeight = 200;
      }
      var size = Upload.getRealWH(that.image.width, that.image.height, canvasWidth, canvasHeight);
      var showWidth = size.width;
      var showHeight = size.height;

      that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
      that.canvas.width = showWidth;
      that.canvas.height = showHeight;
      that.context.drawImage(that.image, 0, 0, showWidth, showHeight);
      that.offscreenContext.clearRect(0, 0, that.offscreenCanvas.width, that.offscreenCanvas.height);
      that.offscreenCanvas.width = showWidth;
      that.offscreenCanvas.height = showHeight;
      that.offscreenContext.drawImage(that.image, 0, 0, showWidth, showHeight);
    };
    that.image.setAttribute('src', e.target.result);
  };
};

//根据宽高比例进行缩放
Upload.getRealWH = function(width, height, maxWidth, maxHeight){
  var showWidth = width;
  var showHeight = height;
  //宽与高的比例
  var rate = width / height;
  //如果宽更大，则按照宽缩放
  if(rate > 1){
    //如果图片宽高小于容器宽度，则放大
    if(width < maxWidth){
      showWidth = width;
      showHeight = height;
    }else{
      //如果图片宽高大于容器宽度，则缩小
      showWidth = maxWidth;
      showHeight = showWidth / rate;
    }
  }else{
    //如果高更大，则按照高缩放
    //如果图片高度小于容器高度，则放大
    if(height < maxHeight){
      showWidth = height;
      showHeight = width;
    }else{
      //如果图片高度大于容器宽度，则缩小
      showHeight = maxHeight;
      showWidth = showHeight * rate;
    }
  }
  return {
    width: showWidth,
    height: showHeight
  }
};

Upload.prototype.showImg = function(){
  var that = this;
  that.input.on('change', function(){
    var input = this;
    if (input.files && input.files[0]) {
      var file = input.files[0];
      if(file.type && !/image/i.test(file.type)){
        return false;
      }
      that.reader.readAsDataURL(file);
      return file;
    }
  });
};


Upload.prototype.drawImage = function(opts){
  var width = opts.width || 0;
  var height = opts.height || 0;
  var quality = opts.quality || 1;
  var size = Upload.getRealWH(this.image.width, this.image.height, width, height);
  var showWidth = size.width;
  var showHeight = size.height;

  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.canvas.width = showWidth;
  this.canvas.height = showHeight;
  this.context.drawImage(this.image, 0, 0, showWidth, showHeight);
  var src = this.canvas.toDataURL('image/jpg', quality);

  return src;
};






