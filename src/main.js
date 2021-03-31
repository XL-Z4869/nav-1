 $siteList = $(".siteList")
 $lastLi = $siteList.find("li.last")

 const x = localStorage.getItem("x")
 const xObject = JSON.parse(x)

 const hashMap = xObject || [{
         url: "https://www.acfun.cn/",
         logo: "A"

     },
     {
         url: "https://www.bilibili.com/",
         logo: "B"
     }
 ]

 const simplify = (url) => {
     return url.replace('https://', '')
         .replace('http://', '')
         .replace("www.", '')
         .replace(/\/.*/, '')
 }
 const render = () => {
     $("li:not(.last)").remove()
     hashMap.forEach((node, index) => {
         const $li = $(`
        <li>     
            <div class="site">
                <div class="logo">
                ${node.logo}
                </div>
                <div class="link">${simplify(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-delete"></use>
                    </svg>
                </div>
            </div>   
    </li>
        `).insertBefore($lastLi);
         $li.on('click', () => {
             window.open(node.url)
         })
         $li.on("click", ".close", (e) => {
             e.stopPropagation()
             hashMap.splice(index, 1)
             render()
         })
     })

 }

 render()
 $(".addButton").on('click', () => {
     let url = prompt("请输入想要添加的网址")
     if (url.indexOf("http") !== 0) {
         url = "https://" + url
     }

     console.log($lastLi);
     hashMap.push({
         url: url,
         logo: simplify(url)[0].toUpperCase()
     })
     render()
 })

 window.onbeforeunload = () => {
         let string = JSON.stringify(hashMap)
         localStorage.setItem("x", string)
     }
     //  var oTxt = document.getElementById('txt');

 //  function isNull(val) {
 //      var str = val
 //          //  var str = val.replace(/(^\s*)|(\s*$)/g, ''); //去除空格;
 //      console.log(str.length);
 //      if (str == '' || str == undefined || str == null) {
 //          //return true;
 //          console.log('空')
 //      } else {
 //          //return false;
 //          console.log('非空');
 //      }
 //  }
 //  var myInput = document.getElementById('input');
 $(document).on('keypress', (e) => {
     const { key } = e;
     //  const key = e.key;
     //  console.log(11);
     if ($('input:focus').length == 0) {
         console.log(11);
         for (let i = 0; i < hashMap.length; i++) {
             console.log(11);
             if (hashMap[i].logo.toLowerCase() === key) {
                 window.open(hashMap[i].url)
             }
         }
     }
 })