import './css/App.css';
// import gotopIcon from './images/btn_goTop.png'
// import Buttons from './components/Buttons';
// import Dropdown from './components/Dropdown';
// import Pagination from './components/Pagination';
// import Card from './components/Card';
import React,{useState, useEffect} from "react";
import {HashRouter,Route,Switch} from "react-router-dom";
import Home from "./views/Home";
import MyFavorite from "./views/MyFavorite";
import Layout from "./layout/Layout";



;


const App = () =>{
  //宣告變數
  const [state,setState] = useState({
    cards: [],
    error: null,
    isLoaded: false,
    itemZones:[], //宣告一個新的陣列(不重複區域)
    cardsByZone:[], //宣告一個新的陣列(下拉選單和按鈕撈到的值跟父層 API 資料做比對)，getCurrentZone 出來得到的
    currentZone:'請選擇行政區'
  });
  //分頁
  const [currentPage, setCurrentPage] = useState(1);//預設當前 page
  const [cardsPerPage] = useState(4);
  const [isDeafultPage, setIsDeafultPage] = useState(false);
  const [checkMyList, setCheckMyList] = useState([]); //從 localStorage 撈出"加入我的最愛的 id"的資料，是一個陣列格式

//API 資料
// 初始值 (一載入網頁進來要做的事，因為後面是空陣列所以只為執行一次)
useEffect(()=>{
  fetch( 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',{method:"GET"})
    .then(res => res.json())
    .then(
      (data) => {
        //setState : 要更新 state 狀態  
        setState({
          isLoaded: true,
          cards: data.result.records,
          cardsByZone:[],
          currentZone:'請選擇行政區',
          // 過濾重複的區域資料，並存在 itemZones 的新陣列中
          itemZones: data.result.records.map((item)=>(item.Zone)).filter(function(element, index, arr){
              return arr.indexOf(element) === index;
          })

        });
        //取出 localStorage 的資料
        if((localStorage.getItem('myFavorite')!==null)){
          setCheckMyList(JSON.parse(localStorage.getItem('myFavorite')));
       
        }

      },
      (sError) => {
        setState({
          isLoaded: true,
          error:sError,
          // cards:null
        });
      }
    );
    
    //scroll 效果
    function handleScroll(e) {
      // console.log("scrolling");測試用
      if (document.documentElement.scrollTop > 200) {
        document.querySelector('.goTop').style.display = 'block'; 
       } else{
         document.querySelector('.goTop').style.display = 'none';
       }
    }

    //scroll 監聽應該綁在 window
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
},[]);

// 1.fifter 篩選
// 2.綁定 state >宣告變數給他一個空陣列

const getCurrentZone =(zone) =>{
  // console 第一個變數 'getCurrentZone' 代表是子層傳給父層撈到的值(第一個變數好辨認是哪邊產生的值)
  // console.log('getCurrentZone',zone);
  
  // 在 getCurrentZone function 中，cardsByZone 在跑完 filter 後狀態會改變

  setCurrentPage(1); //修正分頁 bug:讓每一次點選新景點分頁預設值都是第一頁
  setIsDeafultPage(true);
   // console.log('setIsDefaultChange',isDefaultChange);
  setState({
      ...state, // keep 住當前的狀態 ask!
      currentZone:zone,
      // element 是一個物件，cardsByZone 是一個新陣列 物件
      cardsByZone: cards.filter(function(element){
          return element.Zone === zone;
      })

    });   
}

//handleScrollTop 監聽事件
const handleScrollTop =(e)=>{
  document.documentElement.scrollTop =0;
}

const { cards,itemZones,cardsByZone,currentZone,} = state;

// Get current cards
const indexOfLastCard = currentPage * cardsPerPage;//當下所在 page 最後一個卡片內容
const indexOfFirstCard = indexOfLastCard - cardsPerPage;//當下所在 page 第一個卡片內容
const currentCards = cardsByZone.slice(indexOfFirstCard, indexOfLastCard);//slice去頭不含尾 取得部分資料

// Change page
const paginate = pageNumber => {
 setIsDeafultPage(false);
 setCurrentPage(pageNumber);
}

return (
  <HashRouter>
          <Switch>
          <Layout getCurrentZone={getCurrentZone} itemZones= {itemZones}>
            <Route exact path="/" ><Home/></Route>
            <Route path="/myfavorite" ><MyFavorite/></Route>
          </Layout>
          </Switch>
  </HashRouter>
  // <div className="App">
  //header 內容 
  //   <header className="banner">
   
  //   <ul className="navbar">
  //     <li className="nav-item">
  //       <a className="material-icons" href="!#"><i>home</i><p><span>首頁</span></p></a>
  //     </li>
  //     <li className="nav-item"> 
  //       <a className="material-icons" href="#MyFavorite"><i>favorite</i><p><span>我的最愛</span></p></a>
  //     </li>
  //   </ul>
  //     <div className="container">
          
  //         <h1>高雄旅遊資訊網</h1>
          
  //         <Dropdown itemZones= {itemZones} getZone={getCurrentZone}/>
  //         <div className="menu">
  //             <p className="title-menu">熱門行政區</p>
  //             <ul className="buttonList">
  //                 <li><Buttons content="苓雅區" color="purple" getZone={getCurrentZone}/></li>
  //                 <li><Buttons content="三民區" color="orange" getZone={getCurrentZone}/></li>
  //                 <li><Buttons content="前鎮區" color="yellow" getZone={getCurrentZone}/></li>
  //                 <li><Buttons content="左營區" color="blue" getZone={getCurrentZone}/></li>
  //             </ul>
  //         </div>
  //         <div className="icon-menu">
  //             <hr className="icon-menu-line"/>
  //         </div> 
  //     </div>
  // </header> 
  
  // content 變數內容 
  // <div className="content container"> 
  //     <div className="main">
  //         <h2 className="title-main">{currentZone}</h2>
  //         <ul className="list">
  //             {/* 因為新增分頁功能所以要改成 currentCards */}
  //         {currentCards.map(function(card){
  //           // currentCards Id 和 checkMyList 資料比對，比對出 currentCards 的 Id 有沒有在 checkMyList 裡面，有的話並取出 index 值
  //           //indexOf() 我要找的值
  //           if(checkMyList!=null && checkMyList.indexOf(card.Id)>=0){
  //               return<Card key={card.Id} item={card} isFavorite={true} myList={checkMyList}/>
  //             }else{
  //               return<Card key={card.Id} item={card} isFavorite={false} myList={checkMyList}/>
  //             }
  //               // 通常 map 要加上 key (固定值)
  //         })}
  //         </ul>
  //     </div>

  //     <div className="goTop" onClick={handleScrollTop}>
  //         <img src={gotopIcon}  alt="gotopIcon"/>
  //     </div>
      
  //     <Pagination
  //     cardsPerPage={cardsPerPage}
  //     totalCards={cardsByZone.length}
  //     paginate={paginate}
  //     isDeafultPage = {isDeafultPage}
  //   />
  // </div>
  
   //footer 
  //  <footer>
  //     <div className="container">
  //         <p>高雄旅遊網</p>
  //         <p className="pStyle">資料來源: 高雄市政府</p>
  //     </div>
  // </footer> 
  
// </div>

);
}

export default App;