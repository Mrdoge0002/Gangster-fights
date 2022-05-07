const gc = document.querySelector('#game_console')
const gc_loc = gc.getBoundingClientRect()
const player = document.querySelector('#player')
const player_loc = player.getBoundingClientRect()
const pl_hit_box = document.querySelector('#player_hit_box')

var k = {},
    x = 100,
    y = Math.round(gc_loc.height*.55),
    move_speed = 10,
    attack = false,
    particles = 15;

for(var i=0;i<particles;i++) {
  var p = document.createElement('div')
  p.className = 'particle'
  pl_hit_box.appendChild(p)
}
var ps = document.querySelectorAll('.particle')

function blowItUp(e) {
  ps.forEach(function(elm) {
    elm.style.transition = '.275s'
    elm.style.background = 'white'
    var x = Math.random() < .5 ? -1 : 1;
    var y = Math.random() < .5 ? -1 : 1;
    elm.style.transform = 'translate('+Math.random()*100*x+'px,'+Math.random()*100*y+'px)'
    elm.style.opacity = '0'

    setTimeout(function(){
      elm.style.transition = ''
      elm.style.transform = ''
      elm.style.background = ''
      elm.style.opacity = ''
    }, 300)
  })  
}

function addBox() {
  document.documentElement.style.setProperty('--box', "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDBJREFUeNrsW01PE0EYnv1qt6VA4kXjT/GkF2M0UbCSCMRAhF/gxcQDMR5MPOjFqwcMkUSMAWMkRi/8JBOQj0K77rPt1O2yndn52Nml9CVA6IbsvO/zzPs5Q8hYxjKWyywW49nNEdd9Dz/sy84AN/nBxsuFoOZ7xHNsYtsWhyQXQQLS6QSkHX4fnZySxbVPt5gGgPLTEz6peA5xbJtYlnXB1e8a4KzdCfWx+AwA8lDec50RcXIWsR2LuGC0VTv3/JwPAO2B/CgKgOUyILIZg/Yv3qyXWsnXz5fVnGDmvRVgf5Unjsu6KlfGwgeHJ2Rz82upkF9YaJJGvSr8f1KbPSgh9WXXxGXAq3cfo99rz5b6n/kVlzTnHpD9kAm/fvwsVPHb9+6QyRD5WtXjrltpC4D2QU95JwwpjVo1iq9FC9YxFeYtCHO5MOD4NIgc3of1L9HfTxZno5dGRggtP9u8Tw6OWuTbzq5RxWdm70brmG74AzmLaJRyRfcXaA/kobzbM0JQEPJJ5ZNRCoK12ralLwrsbHeRXpyf6RsBexB/m2ACD/mgp/y1qa5qf49b0fq05wFQFi+bNMwEFvJBPz/5vxLUAEpbwPcsAl9Xrww6md+7Xe8PH5DGBPpcp7dPU556+2q4Tih/fdpLbIWuDxuWKLmqCzPFhEzIB+JvVjbAMCbQ6KDKBB7yVPkk8sYMkDcTVJHnkSJTHgAfcNhiOxPq/ZPRQTZPEPX2vPXlzgDdTBD19rKi3QDDmJA1TxBFvnQGYDGhTMgr5wEy0aHByBNk43xpGRBnQoRsqDwUQ+WW1nIDU/BMd5wv3ABxJlAFgfLj+Yf9chrFSt2vDJS0uuJ84QaIMwHIU4pnabvnibz2PCBrdHi69IipvO44n0tPUEWydpF0e/vCt4CI6IzzpWMAqztThOSWB6RVdQh18PYswdzhz/4R2fq8PVoMEOnempxI577ReBkelXj/vu57xuYOrgnks3RvQXsgD+VNzh1yywNEq7r1je6s0fTcwS0CeVZVZ3ruoN0AqvW86bmDWxbk8+osGcsDdNfzpuYOrlHkJaq6vJmgbIC8+/Z5zx3csiJvignSeYCpvn2yn6Br7qDMANPdW1km8MqKTAawNMZ5VVGdOygzIFP31kAnR3buIJUHQFaX56IX4jRWWvc2r769SHSgcwecCqFVJAos1jbIzACWhU10b1lMoOtLmzs4nA7Uuaff364EV6bqXOdhqm+fVeJzh3anQ45bZ9HnE35loA13Y/U9vS+wpyUPKAr5pID2onMHKQPEz+FB76s59+2zCq0iV0JfJXLXYXxnKM2l4csaclcofh4fjQtQD0fR4tvA1I6I+ynQHw5vgtN15hoASkWnKx1+ZxbOhR5CLNoNaLsv0O5dMBI9fHyB7lbtMQ2Aq2WgEi4Ypd2xGctYRkv+CTAAmy9vSBc3+H0AAAAASUVORK5CYII=')")
  var b = document.createElement('div')
  b.className = 'enemy'
  b.dataset.hp = '5'
  var xx = (Math.random()*55) + 15
  b.style.left = xx + '%'
  b.style.top = '-200px'
  b.style.transition = '4s'
  gc.appendChild(b)

  setTimeout(function(){
    var yy = (Math.random()*25) + 50
    document.querySelector('.enemy').style.top = yy + '%'  

    var s = document.createElement('div')
    s.className = 'boxShadow'
    s.style.width = '150px'
    s.style.height = '25px'
    s.style.position = 'absolute'
    s.style.left = xx + '%'
    s.style.top = yy + 19 + '%'
    s.style.borderRadius = '25%'
    s.style.background = 'rgba(0,0,0,.45)'
    s.style.filter = 'blur(2px)'
    gc.appendChild(s)
  }, 100)
}

function shakeIt() {
  document.querySelector('.enemy').classList.add('shakeIt')
  setTimeout(function(){
    document.querySelector('.enemy').classList.remove('shakeIt')
  }, 150)
}

function updatePlayer(){
  var pl_hb = pl_hit_box.getBoundingClientRect(),
      pl_spot = document.elementFromPoint(pl_hb.x + (pl_hb.width*.5), pl_hb.y + (pl_hb.height*.5)),
      pl_spot_loc = pl_spot.getBoundingClientRect(),
      pl_loc = player.getBoundingClientRect()

  // d 68
  if((k[68] || k[83]) && !attack) {

    if(k[68] && k[83]) {
      attack = true
      player.classList.add('player_jump_kick')
      setTimeout(function(){
        player.classList.remove('player_jump_kick')
        attack = false
      }, 550)
    } else {
      // d 68
      if(k[68]) {
        attack = true
        player.classList.add('player_kick')
        setTimeout(function(){
          player.classList.remove('player_kick')
          attack = false
        },250)
      }

      // s 83
      if(k[83]) {
        attack = true
        player.classList.add('player_punch')
        setTimeout(function(){
          player.classList.remove('player_punch')
          attack = false
        },250)
      }
    }

    if(attack && pl_spot.classList.contains('enemy') && Math.abs(pl_loc.bottom - pl_spot_loc.bottom) < 50) {
      var hp = Number(pl_spot.dataset.hp)
      if(player.classList.contains('player_jump_kick')) {
        hp = hp - 3
      } else {
        hp--
      }
      pl_spot.dataset.hp =  hp
      // pl_spot.innerHTML = hp
      shakeIt()
      blowItUp()

      if(hp <= 0) {
        document.documentElement.style.setProperty('--box', "url('https://cdn.discordapp.com/attachments/492131244587483138/972337140363063296/unnamed.gif')")

        var delayInMilliseconds = 4000;
        setTimeout(function() {
          pl_spot.remove()
          document.querySelector('.boxShadow').remove()
        }, delayInMilliseconds)
      }
    }
  } else {
    if(!attack) {
      if(k[37] && x > 0) { 
        x = x - move_speed     
        player.style.transform = 'scaleX(-1)'
      }
      if(k[39] && x < gc_loc.width - player_loc.width) { 
        x = x + move_speed 
        player.style.transform = 'scaleX(1)'
      }

      if(k[38] && y > (gc_loc.height*.65) - player_loc.height + move_speed) { y = y - move_speed }
      if(k[40] && y < gc_loc.height - player_loc.height - move_speed) { y = y + move_speed }

      if(k[37] || k[38] || k[39] || k[40]) {
        player.classList.add('player_run')
      } else {
        player.classList.remove('player_run')
      }

      player.style.left = x + 'px'
      player.style.top = y + 'px'
    }
  } 

  if(!document.querySelector('.enemy')) {
    addBox()
  }

  // set player zIndex relative to box enemy
  var pl_y = parseInt(player.style.top) / 675 * 100
  var e_y = parseInt(document.querySelector('.enemy').style.top)
  // console.log(pl_y + ' / ' + e_y)
  if(pl_y + 6 < e_y) {
    player.style.zIndex = '49'
  } else {
    player.style.zIndex = '100'
  }
  
  // set bg x based on player location
  var bg_x = (parseInt(player.style.left) / 1200 * 10)
  // gc.style.backgroundPosition = ''+bg_x+'% 100%'
  // console.log(bg_x)

  setTimeout(updatePlayer, 1000/30)
}
updatePlayer()

window.addEventListener('keydown', function(e){
  k[e.which] = true;
  // console.log(k)
})
window.addEventListener('keyup', function(e){
  k[e.which] = false; 
  // console.log(k)
})

window.focus()