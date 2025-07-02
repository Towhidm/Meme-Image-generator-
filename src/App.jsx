import "./App.css";
import {useState,useEffect} from "react"
function App() {

  const [memeValue,setmemeValue] = useState({
    topText:"Hellow phucking boy",
    bottomText:"What's up?" ,
    Imgurl:"http://i.imgflip.com/1bij.jpg" 
  })

  function handleChange(evt){
    const {value ,name} = evt.currentTarget;
    setmemeValue(prev =>({
        ...prev,
        [name]:value
    }))
  }
  const [allMemes,setMemes] = useState([]);
  
  useEffect(() => {
   fetch("https://api.imgflip.com/get_memes")
    .then((res)=> res.json())
    .then(data => setMemes(data.data.memes))
      
  },[])

  function showImage(){
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const memeUrl = allMemes[randomNumber].url
    setmemeValue( prevmeme => ({
      ...prevmeme,
      Imgurl :memeUrl
    }))
  }
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-130 w-100 bg-[#dbecf7] rounded-2xl">
          <div className="header h-17 w-[100%] bg-fuchsia-700 flex justify-center items-center gap-4 rounded-t-2xl">
            <img src="https://i.imgflip.com/2/1295ic.jpg" alt="sigma" className="h-12 w-12 sigma"/>
            <h1 className="font-bold text-white text-3xl">Meme Generator</h1>
          </div>
          <div className="flex justify-around mt-12 button-holder ">
            <div className="Top-Text">
              <h2>Top Text</h2>
            <input type="text" placeholder="Hellow phucking boy" name="topText" value={memeValue.topText}  onChange={handleChange} className="border-1 border-solid border-blue-300 input"/>
            </div>
            <div>
              <h2>Bottom Text</h2>
            <input type="text" placeholder="What's up?" name="bottomText" value={memeValue.bottomText} onChange={handleChange} className="border-1 border-solid border-blue-300 input"/>
            </div>
          </div>
          <button onClick={showImage} className=" pointer">Get Image Meme with text</button>
          <div className="meme relative h-60 w-[100%] flex flex-col items-center">
          <img src={memeValue.Imgurl} alt="meme-image" className="h-60 w-[100%] absolute meme-image"/>
          <h3 className="z-20 absolute top" >{memeValue.topText}</h3>
          <h3 className="z-10 absolute bottom">{memeValue.bottomText}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
