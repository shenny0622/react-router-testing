import React from "react";
import {Link} from 'react-router-dom';
import Buttons from '../components/Buttons';
import Dropdown from '../components/Dropdown';

const Layout = (props) =>{
    const {itemZones,getCurrentZone} =  props;
    // console.log(getCurrentZone);

  return (
<div className="App">
       {/* header */}
    <header className="banner">
      {/* navbar */}
        <ul className="navbar">
            <li className="nav-item">
              <Link to="/" className="material-icons"><i>home</i><p><span>首頁</span></p></Link>
            </li>
            <li className="nav-item"> 
              <Link to="/myfavorite" className="material-icons"><i>favorite</i><p><span>我的最愛</span></p></Link>
            </li>
        </ul>
        <div className="container">
            <h1>高雄旅遊資訊網</h1>
           {/*子傳父的值，定義 getZone 變數 ，且會觸發 getCurrentZone 函式， */}
            <Dropdown itemZones= {itemZones} getZone={getCurrentZone}/>
            <div className="menu">
                <p className="title-menu">熱門行政區</p>
                <ul className="buttonList">
                    <li><Buttons content="苓雅區" color="purple" getZone={getCurrentZone}/></li>
                    <li><Buttons content="三民區" color="orange" getZone={getCurrentZone}/></li>
                    <li><Buttons content="前鎮區" color="yellow" getZone={getCurrentZone}/></li>
                    <li><Buttons content="左營區" color="blue" getZone={getCurrentZone}/></li>
                </ul>
            </div>
            <div className="icon-menu">
               <hr className="icon-menu-line"/>
            </div> 
        </div>
    </header>

       {/* 塞分頁的變數內容 */}
       {props.children}
       {/* footer */}
    <footer>
        <div className="container">
            <p>高雄旅遊網</p>
            <p className="pStyle">資料來源: 高雄市政府</p>
        </div>
    </footer>
</div>
  );
};


export default Layout;