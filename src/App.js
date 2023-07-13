import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
function Header(props){
  // { }는 표현식으로 표시되기때문에 써줘야한다.
  // console.log('props', props, props.titl);
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();//리로드하는것을 방지하는것. 굳이 새로 로드할 필요없기때문에
    props.onChangeMode();
  }}>{props.titl}</a></h1>
</header>
}
function Nav(props){
  const lis = [
    //각각의 링크들이 들어가 있어야함.
  ]
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i]
    lis.push(<li key={t.id}>
      <a id={t.id} href={'read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));//컨버팅한것
      }}>{t.title}{t.body}</a></li>)
    
  }
  
  return <nav>
    
    <ol>
      {lis}
    </ol>
</nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}  
</article>
}
function App() {
  // const _mode = useState("WELCOME");//지역변수
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode,setMode] = useState("WELCOME");//이렇게 요약할 수 있다.
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:"html", body:"html is..."},
    {id:2, title:"CSS", body:"CSS is..."},
    {id:3, title:"JavaScript", body:"JS is..."}
  ]
  let content = null;
  if(mode === "WELCOME"){
      content = <Article title="Welcome!" body="Hello, WEB"></Article>
  }else if(mode === "READ"){
    let title,body = null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        console.log(topics[i].id, id);
        title = topics[i].title;
        body = topics[i].body;
      }
    }
      content = <Article title={title} body={body}></Article>
  }
  return (
    // <div> 처음에 한것
    //   <Header titl="WEB" onChangeMode={()=>{
    //     setMode("WELCOME");//이것만 이렇게 적었을때 아무 변화가 없는 이유는
    //     //APP()은 한번하고 다시 실행되지 않기 떄문에 return값에는 변화가 없는것이다.
    //     //우리가 하고싶은것은 모두의 값이 바뀌면 이 component함수가 새로 실행되면서 새로운 리턴값이 만들어지고 
    //     //그 리턴값이 UI반영하게 하는것이 우리 목표. 이떄 state가 필요함
    //   }}></Header>
    //   <Nav topics={topics} onChangeMode={(_id)=>{
    //     setMode(_id);
    //   }}></Nav>
    // {content}
    // </div>
    <div>
    <Header titl="WEB" onChangeMode={()=>{
      setMode("WELCOME");//이것만 이렇게 적었을때 아무 변화가 없는 이유는
      //APP()은 한번하고 다시 실행되지 않기 떄문에 return값에는 변화가 없는것이다.
      //우리가 하고싶은것은 모두의 값이 바뀌면 이 component함수가 새로 실행되면서 새로운 리턴값이 만들어지고 
      //그 리턴값이 UI반영하게 하는것이 우리 목표. 이떄 state가 필요함
    }}></Header>
    <Nav topics={topics} onChangeMode={(_id)=>{
      setMode("READ");
      setId(_id);
    }}></Nav>
  {content}
  </div>
  );
}

export default App;
