function start() {
  var example = document.getElementById("example"), ctx = example.getContext('2d');
  example.width = 840;
  example.height = 880;
  //addSimpleImage(ctx);
  addSpriteImage(ctx, 390, 510, 150, 180, 50, 50, 250, 380);  //Домик
  addSpriteImage(ctx, 45, 252, 160, 18, 50, 390, 250, 40);  //Травка
  addSpriteImage(ctx, 43, 198, 152, 25, 370, 20, 320, 50);   //Облачка
  addSpriteImage(ctx, 44, 160, 134, 35, 350, 350, 320, 78); //Горки
  addSpriteImage(ctx, 311, 941, 96, 17, 155, 84, 220, 40);  //Огонь
  addSpriteImage(ctx, 150, 825, 18, 36, 655, 300, 60, 130);  //Марио
}
function addSimpleImage(ctx) {
  var pic = new Image();
  pic.src = 'mario.jpg';
  pic.onload = function () {
    ctx.drawImage(pic, 0, 0);
  }
}

function addSpriteImage(ctx, sx, sy, swidth, sheight, x, y, width, height) {
  var pic = new Image();
  pic.src = 'mario_bg.gif';
  ctx.drawImage(pic, sx, sy, swidth, sheight, x, y, width, height);
}
start();