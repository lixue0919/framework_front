const currentUser = JSON.parse(localStorage.getItem('CURRENTUSER'));
const tableheight10 = 465;
const tableheight20 = 878;
const tableheight30 = 1291;
//const tableheight = tableheight10;
//浏览器宽度 by li.xue 2019/4/2
const widthData = document.body.clientWidth;
const widthReal = 1450

export default {
  currentUser,
  tableheight10,
  tableheight20,
  tableheight30,
  //tableheight
  widthData,
  widthReal
}