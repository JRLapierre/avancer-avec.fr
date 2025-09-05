import styles from './styles.module.css'
import { useAutoResizeTextArea } from "../../hooks/useAutoResizeTextArea";
import type { ChangeEventHandler } from 'react';

interface QuestionTextAreaProps {
    question : string;
    value : string;
    name : string;
    handleChange : ChangeEventHandler<HTMLTextAreaElement>;
}

const QuestionTextArea : React.FC<QuestionTextAreaProps> = ({question, value, name, handleChange}) => {

    const resizeRef = useAutoResizeTextArea();

    return (
        <>
        <div className={styles.question}>{question}</div>
        <textarea
            className={styles.answer}
            ref={resizeRef}
            rows={1}
            value={value}
            name={name}
            onChange={handleChange}
            placeholder='Votre réponse...' 
            required 
        ></textarea>
        
        </>

    );
};

export default QuestionTextArea;