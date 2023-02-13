function Skill({language,tools,os}){
    return(
        <>
        <h2>Skills</h2>
            <h4>Language: <span>{language}</span></h4>
            <h4>Tools: <span>{tools}</span></h4>
            <h4>OS: <span>{os} </span></h4>
        </>
    )
}
export default Skill;