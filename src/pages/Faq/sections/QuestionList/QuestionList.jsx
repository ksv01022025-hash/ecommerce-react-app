import styles from './QuestionList.module.css'
import { questions } from '../../data/faqData'
export default function QuestionList(){return <section className={styles.questions} id="all-questions"><h2>All Frequently Asked Questions</h2>{questions.map(([question,lines],index)=><details open={index===0} key={question}><summary>{index+1}. {question}</summary><p>{lines.map((line,i)=><span key={line}>{line}{i<lines.length-1&&<br/>}</span>)}</p></details>)}<button type="button">Show More Questions ⌄</button></section>}
