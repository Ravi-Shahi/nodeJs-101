import './App.css';
import Topsection from './components/Topsection';
import Skill from './components/Skill';
import Experience from './components/Experience';
import { header,Experiences,skill,academics } from './objValue';
import Education from './components/Education';

function App() {
  return (
    <div className='app'>
      <Topsection {...header}></Topsection>
      <Skill {...skill}></Skill>
      <h2>Experience</h2>
      {
      Experiences.map((company) => <Experience
      key={company.id}
      name= {company.name} 
      work= {company.work}
      ></Experience>)
    }
    <h2>Education</h2>
   {
    academics.map(edu=><Education
    key={edu.id}
    degree={edu.degree}
    year={edu.year}
    ></Education>)
    
   }
    </div>
  );
}

export default App;
