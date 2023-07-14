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
      }}>{t.title}</a></li>)
    
  }
  
  return <nav>
    
    <ol>
      {lis}
    </ol>
</nav>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    {/* 이 폼 태그의 온 서브밋이라고 하는 props를 제공한다. 
    onSubmit은 submit버틍을 클릭했을때 form태그에서 발생하는 이벤트이다. 
    이벤트가 발생ㅇ하면 페이지가 리로드된다.그래서prevenDefault를 사용한다. */}
      <form onSubmit={event=>{
        event.preventDefault();
          // 입력된 value를 가지고 오기 위해서 해줄것 event.target은 form태그이다.
          
        const title=event.target.title.value;
        const body=event.target.body.value;
        //그리고 이 value들을어떻게 사용자가 받을수있나? 밑에 onCreate를 통해서
        props.onCreate(title,body);
      }}>
        <p><input type="text" name="title" placeholder='title'/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create"></input></p>
      </form>
  </article>
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
  const [nextId, setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id:1, title:"html", body:"html is..."},
    {id:2, title:"CSS", body:"CSS is..."},
    {id:3, title:"JavaScript", body:"JS is..."}
  ]);
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
  }else if(mode === "CREATE"){
      content = <Create onCreate={(_title, _body)=>{
        const newTopic = {id:nextId, title:_title, body:_body};
        const newTopics = [...topics];
        // topics는 배열로 존재하기 때문에 [] 이다. 앞은 범오브젝트지만 겉을 보면 배열형태이다.
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode('READ');
        setId(nextId);
        setNextId(nextId+1);
      }}></Create>
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
  <a href="/create" onClick={event=>{
    event.preventDefault();
    setMode("CREATE");
  }}>Create</a>
  </div>
  );
}

export default App;
