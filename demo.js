// 定义变量 保存start按钮的标识位 （初始为true）
var pause=true;

// d的各个下标对应的数字是随着同编号的div变动的
var d=[,1,2,3,4,5,6,7,8,0];

// d_direct中的各个数组中的数字对应的是d的下标，用来储存每个div可以去的位置
var d_direct=[
  ,
  [2,4],
  [1,3,5],
  [2,6],
  [1,5,7],
  [2,4,6,8],
  [3,5,9],
  [4,8],
  [5,7,9],
  [6,8]
];
// d_posXY中的9个数组分别对应大div9个空间的坐标
var d_posXY=[
  ,
  [0,0],
  [150,0],
  [300,0],
  [0,150],
  [150,150],
  [300,150],
  [0,300],
  [150,300],
  [300,300]
]

// 定义move函数控制元素移动
function move(id) {
// 捕获当前被点击的div
  for(var i=1;i<9;i++){
    console.log(id);
      if (d[i]==id) {
        console.log(d[i]);
        break;
      }
  }

  // 保存小div可以去的编号，0表示不能移动
  var target_d=whereCanTo(i);

  // 如果target_d为0，则表示当前被点击的小div无法进行移动
  if(target_d!=0){
    d[i]=0;//移动进行时把当前位置编号置为0，即表示此空间没有放置小div
    d[target_d]=id;//把当前的id编号赋给要移动到的位置上

    //修改当前被点击的div的位置
    $('#d'+id).css({left:d_posXY[target_d][0],top:d_posXY[target_d][1]});
  }

  // 设置游戏结束标志位
  var finish_flag=true;
  //从0开始，把每个大DIV保存的编号遍历一下，判断是否完成
  for(var k=1; k<9;k++){
      if( d[k] != k){
        //如果大DIV保存的编号和它本身的编号不同，则表示还不是全部按照顺序排的，那么设置为false，跳出循环
          finish_flag=false;
          break;
      }
  }
  //如果为true，则表示游戏完成，如果当前没有暂停，则调用暂停函数，并且弹出提示框，完成游戏。
  //start()这个函数是开始，暂停一起的函数，如果暂停，调用后会开始，如果开始，则调用后会暂停
  if(finish_flag){
      if(!pause)
          start();
      alert("congratulation");
  }
}

function whereCanTo(i) {
  var move_flag=false;
  for(var j=0;j<d_direct[i].length;j++){
    // 当d[d_direct[id]][j]为0时则表明，该处没有盛放小div则证明可以移动 此刻可以跳出循环
    if(d[d_direct[i][j]]==0){
      move_flag=true;
      break;
    }
  }
  //可以移动，则返回目标位置的编号，否则返回0，表示不可移动
  if(move_flag){
    return d_direct[i][j];
  }else {
    return 0;
  }

}

// 开始函数
function start() {
  if(pause){
    $('#start').text('暂停');
    pause=false;
  }else {
    $('#start').text('开始');
    pause=true;
  }
}

// 重置函数
function reset(){
  //随机打乱方块函数，我们的思路是从第九块开始，随机生成一个数，然后他们两块对调一下
  for (var i=9;i>1;i--) {
    //产生随机数，范围为1到i，不能超出范围，因为没这个id的DIV
    var ra=parseInt(Math.random()*(i-1)+1);
    //把当前的DIV位置设置为随机产生的DIV的位置
    if(d[i]!=0){
      $('#d'+d[i]).css({left:d_posXY[ra][0],top:d_posXY[ra][1]});
    }
    //把随机产生的DIV的位置设置为当前的DIV的位置
    if(d[ra]!=0){
      $('#d'+d[ra]).css({left:d_posXY[i][0],top:d_posXY[i][1]});
    }
    //然后把它们两个的DIV保存的编号对调一下
    var tem=d[i];
    d[i]=d[ra];
    d[ra]=tem;
  }
}
