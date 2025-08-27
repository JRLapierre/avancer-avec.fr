import type React from 'react';
import styles from './styles.module.css'
import { useState } from 'react';

const Contact = () => {

    type ApiResponse =
    | { curl_error: string }
    | { systeme_io_answer: SystemeIoEmailAnswer | SystemeIoError | string };

    interface SystemeIoEmailAnswer {
        id: number;
        email: string;
        registeredAt: string;
        locale: string;
        sourceURL: string;
        unsubscribed: boolean;
        bounced: boolean;
        needsConfirmation: boolean;
        fields: string[]; //unsure
        tags: string[]; //unsure
    }

    interface SystemeIoError {
        type: string;
        title: string;
        detail: string;
        violations: SystemeIoViolation[];
    }

    interface SystemeIoViolation {
        propertyPath: string;
        message: string;
        code: string;
    }

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        object: '',
        mailContent: ''
    });

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
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),//for standard JSON
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = (await response.json() as ApiResponse);
            if ('curl_error' in result) {
                console.log("curl_error : " + result.curl_error); //TODO error pop-up
            }
            else {
                let answer:SystemeIoEmailAnswer | SystemeIoError;
                if (typeof result.systeme_io_answer === "string") answer = JSON.parse(result.systeme_io_answer) as SystemeIoEmailAnswer | SystemeIoError;
                else answer = result.systeme_io_answer;

                if ('detail' in answer && answer.detail !== "email: Cette valeur est déjà utilisée.") {
                    console.log("error : ", answer.detail)
                    //TODO error pop-up
                }
                else {
                    // TODO Handle success (e.g., show a success message)
                    console.log('test 2')
                    console.log("full success")
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // TODO Handle error (e.g., show an error message)
        }
    };

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
            <div className={styles.form}>
                <form onSubmit={(e) => void handleSubmit(e)}>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='email' 
                        required 
                    />
                    <input 
                        type="text"
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder='prénom' 
                        required 
                    />
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder='nom'
                    />
                    <input 
                        type="text" 
                        name="object" 
                        value={formData.object}
                        onChange={handleChange}
                        placeholder='objet' 
                        required 
                    />
                    <textarea 
                        name="mailContent" 
                        value={formData.mailContent}
                        onChange={handleChange}
                        placeholder='contenu du mail' 
                        required 
                    >

                    </textarea>
                    <input type="submit" value="Prendre rendez-vous" />
                </form>
            </div>
            <div className={styles.deal}>
                <div>
                    <h3>Modalités :</h3>
                    <li>En présentiel chez vous, ou dans la nature, en marchant ou assis.</li>
                    <li>Via un lien de visioconférence.</li>
                </div>
                <div>
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
        </div>
        </>
    );
}

export default Contact;