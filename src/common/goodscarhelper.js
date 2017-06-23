
const key = 'goodslist'
//保存我们的商品信息到我们的localStorage当中
export function addGoods (goodsObj){
    //第一个次获取可能为null
    const goodsArr = JSON.parse(localStorage.getItem(key)||"[]")
    goodsArr.push(goodsObj)
    localStorage.setItem(key,JSON.stringify(goodsArr))
}
//获取我们的localStorage 当中的count 数量,
//这是带返回值的函数
export function getCounts(){
    var totalCount = 0
    const goodsArr = JSON.parse(localStorage.getItem(key)||"[]")
    goodsArr.forEach(function(item){
        totalCount+=item.count
    })
    //返回总共的商品数量,为我们的跟组件所用
    return totalCount
}
//得到localStorage里面的数组
export function getLocalStorageArr(){
    return JSON.parse(localStorage.getItem(key)||"[]")
}