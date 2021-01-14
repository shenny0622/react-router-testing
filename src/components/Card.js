import React,{useState} from "react";
import clock from '../images/icons_clock.png'
import pin from '../images/icons_pin.png'
import phone from '../images/icons_phone.png'
import tag from '../images/icons_tag.png'


const Card = (props) => {
  //isFavorite = true > add favorite already
  //isFavorite = false > haven't added in  favorite list
  const [isFavorite,setIsFavorite] = useState(props.isFavorite);//based localstorage
  // const [isFavorite,setIsFavorite] = useState(false);//based localstorage

  const {item,myList} =  props;
  // const checkMyList = JSON.parse(localStorage.getItem('myFavoirite'));

  
  // useEffect(()=>{
  //   if(checkMyList!==null){
  //     let checkIndex = checkMyList.indexOf(item.Id);
  //     if(checkIndex !=null && checkIndex>=0){
  //       setIsFavorite(true);
  //       // console.log('isFavorite',isFavorite);
  //     }
  //   }
    


    
  // },[item,checkMyList])


  const onLikeClick=(e) =>{
    e.preventDefault()
    
    //1. check isFavorite 
    if (isFavorite === false) 
    {
      //2. change style
      //style
      e.target.textContent="favorite"
      //control data
      // console.log('id', e.target.parentNode.parentNode.parentNode.id)
      let currentId =  e.target.parentNode.parentNode.parentNode.id;
    
      // if(localStorage.getItem('myFavoirite')!== null){
      if(myList!== null){

        
        // let myFavoirite = JSON.parse(localStorage.getItem('myFavoirite'));
        let myFavoirite = myList

        if(currentId !=='')
          myFavoirite.push(currentId);
        localStorage.setItem('myFavoirite',JSON.stringify(myFavoirite));
      }else{
        let myFavoirite = [];
        if(currentId !=='')
          myFavoirite.push(currentId);
        localStorage.setItem('myFavoirite',JSON.stringify(myFavoirite));
      }
     
    } 
    else{
      //style
      e.target.textContent="favorite-border"
      //control data
      // console.log('id', e.target.parentNode.parentNode.parentNode.id)
      let currentId =  e.target.parentNode.parentNode.parentNode.id;
    
      // if(localStorage.getItem('myFavoirite')!== null){
      if(myList!== null){
        
        // let myFavoirite = JSON.parse(localStorage.getItem('myFavoirite'));
        let myFavoirite = myList;

        if(currentId !==''){
          let index = myFavoirite.indexOf(currentId);
          myFavoirite.splice(index,1);
        }
         
        localStorage.setItem('myFavoirite',JSON.stringify(myFavoirite));
      }else{
        alert('程式有誤請聯絡管理員');
      }
    }
    

       
   
    //3. udate isFavorite
    setIsFavorite(!isFavorite);
    
 }
    
  // const {item} =  props;

  return(
    <li className="list-card" id={item.Id}>
      <div className="img" style={{backgroundImage: `url(${item.Picture1})`}}>
      <a className="material-icons" onClick={onLikeClick} href="!#"><i>{!isFavorite?'favorite_border':'favorite'}</i>
      
      </a>
          <div className="img-title">
              <h3 className="title-24px">{item.Name}</h3>
              <p className="title-16px">{item.Zone}</p>
          </div>
      </div>
      <div className="content-card">
      {/* <a onClick={onLikeClick} href="#"><span className="circle"><i className="material-icons color like">favorite_border</i></span></a> */}
          <p><img src={clock}  alt="icon"/>{item.Opentime}</p>
          <p><img src={pin}  alt="icon"/>{item.Add}</p>
          <div className="card_down_area">
            <p><img src={phone}  alt="icon"/>{item.Tel}</p>
            <p><img src={tag}  alt="icon"/>{item.Ticketinfo}</p>
          </div>
      </div>
    </li>

  )
};
export default Card;