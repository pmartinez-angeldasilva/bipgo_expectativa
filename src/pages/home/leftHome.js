import React ,{ useState, Fragment } from 'react';

// components
import Timer from './timer';

//Styles
import '../../resources/styles/home/homeLeft.scss';
// images
import bipgo_iso from '../../resources/images/bipgo_iso.png';
import bipgo_fail from '../../resources/images/bipgo_fail.png';

//delete
import Bigo from '../../components/Bigo/bigo';


let num_lives = 3;

function LeftHome(props) {

  const [lives, setLives] = useState([
    {id: 'live1', src: bipgo_iso, hasLife:true },
    {id: 'live2', src: bipgo_iso, hasLife:true },
    {id: 'live3', src: bipgo_fail, hasLife:true },
  ]);

  const [youLose, setYouLose] = useState(false);


  const animButtonCV = (e) => {
    num_lives --;
    if(num_lives >= 0 ){
      const btn_cv = e.target;
      btn_cv.classList.add('shake_Button');
      btn_cv.addEventListener('animationend', () => {
        btn_cv.classList.remove('shake_Button');
        let newArray = [...lives];
        newArray[num_lives].hasLife = false;
        setLives(newArray);
      });
    }else{
      
      setYouLose(true);
    }
  }

  // check game status, if user lose
  const gameStatus = (status) => {
    props.history.push('/gameover');
  }

  return (
    <div  className="left-home">
      {!youLose ? (
          <Fragment>
            <div className="content-btn enter-elements delay-1">
              <button className="btn btn_run" onClick={animButtonCV}>Cargar tu cv</button>
            </div>
            <div className="enter-elements delay-2 lives">
              <span>LIVES:</span>
              <div className="lives_icons">
                  {
                    lives.map( life => {
                      let img_picked;
                      (life.hasLife) ? img_picked=bipgo_iso : img_picked=bipgo_fail;
                      return <div key={life.id}><img className='img-fluid' src={img_picked} alt="Bipgo" /></div>
                    })
                  }
              </div>
            </div>
            
          </Fragment>
        ):(
          <Timer seconds={10} userStatus={gameStatus}/>
        )
      }
      
    </div>
  );
};



export default LeftHome;
