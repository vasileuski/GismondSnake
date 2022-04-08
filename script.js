const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'images/ground.png';

const kostyaImg = new Image();
kostyaImg.src = 'images/Kostya.png';

let box = 32;

let score = 0;

let kostya = {
   x: Math.floor((Math.random() * 17 + 1)) * box,
   y: Math.floor((Math.random() * 15 + 3)) * box,
};

let cat = [];
cat[0] = {
   x: 9 * box,
   y: 10 * box
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
   if(event.keyCode == 37 && dir != 'right')
      dir = 'left';
   else if(event.keyCode == 38 && dir != 'down')
      dir = 'up';
   else if(event.keyCode == 39 && dir != 'left')
      dir = 'right';
   else if(event.keyCode == 40 && dir != 'up')
      dir = 'down';
}

function eatTail(head, arr) {
   for(let i = 0; i < arr.length; i++) {
      if(head.x == arr[i].x && head.y == arr[i].y)
      clearInterval(game);
   }
}

function drawGame() {
   ctx.drawImage(ground, 0, 0);

   ctx.drawImage(kostyaImg, kostya.x, kostya.y);

   for( let i = 0; i < cat.length; i++) {
      ctx.fillStyle = i == 0 ? "green" : "red";
      ctx.fillRect(cat[i].x, cat[i].y, box, box);
   }

   ctx.fillStyle = "white";
   ctx.font = "50px Arial";
   ctx.fillText(score, box * 2.5, box * 1.7)

   let catX = cat[0].x;
   let catY = cat[0].y;

   if(catX == kostya.x && catY == kostya.y) {
      score++;
      kostya = {
         x: Math.floor((Math.random() * 17 + 1)) * box,
         y: Math.floor((Math.random() * 15 + 3)) * box,
      };
   } else {
      cat.pop();
   }

   if(catX < box || catX > box * 17
      || catY < 3 * box || catY > box * 17)
      clearInterval(game);

   if(dir == 'left') catX -= box;
   if(dir == 'right') catX += box;
   if(dir == 'up') catY -= box;
   if(dir == 'down') catY += box;

   let newHead = {
      x: catX,
      y: catY
   };

   eatTail(newHead, cat)

   cat.unshift(newHead);
}

let game = setInterval(drawGame, 100);