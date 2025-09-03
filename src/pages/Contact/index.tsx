import type React from 'react';
import styles from './styles.module.css'
import { useEffect, useState } from 'react';

const Contact = () => {

    type ApiResponse =
    | { json_error: string }
    | { curl_error: string }
    | { mail_error: string }
    | { systeme_io_error: string }
    | { success: string }

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        surname: '',
        object: '',
        mailContent: ''
    });

    const [popupMessage, setPopupMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                setPopupMessage({ text: 'Votre message a bien été envoyé', type: 'success' });
                return;
            }
            setPopupMessage({ text: 'Une erreur est survenue, veuillez réessayer plus tard ou envoyer un mail à clairelise@avancer-avec.fr', type: 'error' });
            if ('json_error' in result) {
                console.log("json_error : " + result.json_error);
            }
            if ('curl_error' in result) {
                console.log("curl_error : " + result.curl_error);
            }
            else if ('systeme_io_error' in result) {
                console.log("systeme_io_error : " + result.systeme_io_error);
            } 
            else if ('mail_error' in result) {
                console.log("mail_error : " + result.mail_error);
            } 
            else {
                console.log("something wrong in the answer");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (popupMessage) {
            const timer = setTimeout(() => {
                setPopupMessage(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [popupMessage]);

    return (
        <>
        <div className={styles.firstRow}>
            {/* Column 1 */}
            <div>
                <h3>Où ?</h3>
                <p>A domicile, via visioconférence ou en extérieur</p>
                <p>Basée à Hénin-Beaumont</p>
            </div>
            {/* Column 2 */}

            <div>
                <h3>Horaires</h3>
                <p>Lundi 9h - 12h</p>
                <p>Mardi au Vendredi 9h - 20h</p>
                <p>Samedi matin 9h - 13h</p>
            </div>
            {/* Column 3 */}
            <div>
                <h3>Contact</h3>
                <p><a className={styles.contact} href='tel:0637243540'>06.37.24.35.40</a></p>
                <p><a className={styles.contact} href='mailto:clairelise@avancer-avec.fr'>clairelise@avancer-avec.fr</a></p>
            </div>
        </div>
        <div className={styles.secondRow}>
            <div className={`${styles.deal} ${styles.border}`}>
                <div className={styles.modalites}>
                    <h3>Modalités :</h3>
                    <li>En présentiel chez vous, ou dans la nature, en marchant ou assis.</li>
                    <li>Via un lien de visioconférence.</li>
                    <li>Au rythme de chacun.</li>
                    <li>Avec souplesse et rigueur (si si c’est compatible…).</li>
                    <li>Une première séance sans engagement de poursuivre.</li>
                    <li>Puis selon la progression, 4 à 10 séances dont une séance bilan.</li>
                </div>
                <div>
                    <h3>Tarifs :</h3>
                    <p>
                        60 euros pour 45 minutes.<br/>
                        Plus si dépassement<br/>
                        <br/>
                        Payables à la séance : espèces, chèque, virement.<br/>
                    </p>
                </div>
            </div>
            <div className={styles.form}>
                <form onSubmit={(e) => void handleSubmit(e)}>
                    <div className={styles.formRow}>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='email' 
                            required 
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input 
                            type="text"
                            name="firstName" 
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder='prénom' 
                            required 
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input 
                            type="text" 
                            name="surname" 
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder='nom (facultatif)'
                        />
                    </div>
                    <div className={styles.formRow}>
                        <input 
                            type="text" 
                            name="object" 
                            value={formData.object}
                            onChange={handleChange}
                            placeholder='objet' 
                            required 
                        />
                    </div>
                    <div className={`${styles.formRow} ${styles.mailContent}`}>
                        <textarea 
                            name="mailContent" 
                            value={formData.mailContent}
                            onChange={handleChange}
                            placeholder='Que voulez-vous dire ?' 
                            required 
                        >

                        </textarea>
                    </div>
                    <div className={styles.formRow}>
                        <input className={styles.submitButton} type="submit" value="Envoyer" />
                    </div>
                </form>
            </div>
        </div>
        {popupMessage && (
            <div className={`${styles.popupMessage} ${styles.border}`} style={{
                backgroundColor: popupMessage.type === 'error' ? 'red' : '#00f000',
            }}>
                {popupMessage.text}
            </div>
        )}
        </>
    );
}

export default Contact;