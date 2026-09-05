import styles from './styles.module.css'
import { useState, useEffect, type SubmitEvent } from "react";

interface MultiformProps {
    intialFormType?: '' | 'defaultMessage' | 'firstMeeting' | 'mailSubscription';
}

const Multiform : React.FC<MultiformProps> = ({ intialFormType = ''}) => {

    type ApiResponse =
    | { json_error: string }
    | { curl_error: string }
    | { mail_error: string }
    | { form_error: string }
    | { systeme_io_error: string }
    | { success: string }

    const [formData, setFormData] = useState({
        formType: intialFormType === '' ? 'defaultMessage' : intialFormType,
        email: '',
        firstName: '',
        surname: '',
        object: '',
        mailContent: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [popupMessage, setPopupMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        //short-circuit in case of redirect
        if (formData.formType === "firstMeeting") {
            window.open("https://claireliselapierre.systeme.io/cf9d214c", "_blank");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/index.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(formData),//for standard JSON
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = (await response.json() as ApiResponse);
            if ('success' in result) {
                if (formData.formType == 'defaultMessage') setPopupMessage({ text: 'Votre message a bien été envoyé', type: 'success' });
                else setPopupMessage({ text: 'Votre inscription a bien été faite', type: 'success' }); // mailSubscription
                
                setIsSubmitting(false);
                return;
            }
            setPopupMessage({ text: 'Une erreur est survenue, veuillez réessayer plus tard ou envoyer un mail à clairelise@avancer-avec.fr', type: 'error' });
            if ('json_error' in result) {
                console.log("json_error : " + result.json_error);
            }
            else if ('curl_error' in result) {
                console.log("curl_error : " + result.curl_error);
            }
            else if ('systeme_io_error' in result) {
                console.log("systeme_io_error : " + result.systeme_io_error);
            } 
            else if ('mail_error' in result) {
                console.log("mail_error : " + result.mail_error);
            } 
            else if ('form_error' in result) {
                console.log("form_error : " + result.form_error);
            } 
            else {
                console.log("something wrong in the answer");
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsSubmitting(false);
    };

    useEffect(() => {
        if (popupMessage) {
            const timer = setTimeout(() => {
                setPopupMessage(null);
            }, 4000);
            return () => {clearTimeout(timer)};
        }
    }, [popupMessage]);

    return (
        <>
        <form className={styles.form} onSubmit={(e) => void handleSubmit(e)}>
            {intialFormType === '' && <div className={styles.border}>
                <select 
                    name="formType"
                    value={formData.formType}
                    onChange={handleChange}
                    required>
                    <option value="defaultMessage">Envoyer un message</option>
                    <option value="firstMeeting">Premier rendez-vous gratuit de 30 minutes</option>
                    <option value="mailSubscription">S'inscrire à "Mes petits pas pour avancer"</option>
                </select>
            </div>}
            {formData.formType!=='firstMeeting' && <div className={styles.border}>
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='email' 
                    required 
                />
            </div>}
            {formData.formType!=='firstMeeting' && <div className={styles.border}>
                <input 
                    type="text"
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder='prénom' 
                    required 
                />
            </div>}
            {formData.formType!=='firstMeeting' && <div className={styles.border}>
                <input 
                    type="text" 
                    name="surname" 
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder='nom (facultatif)'
                />
            </div>}
            {formData.formType==='defaultMessage' && <div className={styles.border}>
                <input 
                    type="text" 
                    name="object" 
                    value={formData.object}
                    onChange={handleChange}
                    placeholder='objet' 
                    required 
                />
            </div>}
            {formData.formType==='defaultMessage' && <div className={`${styles.mailContent} ${styles.border}`}>
                <textarea 
                    name="mailContent" 
                    value={formData.mailContent}
                    onChange={handleChange}
                    placeholder='Que voulez-vous dire ?' 
                    required 
                >

                </textarea>
            </div>}

            <div className={styles.border}>                
                <input className={styles.submitButton} type="submit" disabled={isSubmitting} value={
                        formData.formType === 'mailSubscription' ? "S'inscrire" :
                        formData.formType === 'firstMeeting' ? "Prendre rendez-vous" :
                        "Envoyer"
                    }
                />
            </div>
        </form>
        {popupMessage && (
            <div className={`${styles.popupMessage} ${styles.border}`} style={{
                backgroundColor: popupMessage.type === 'error' ? 'red' : '#00f000',
            }}>
                {popupMessage.text}
            </div>
        )}
        </>
    );
};

export default Multiform;