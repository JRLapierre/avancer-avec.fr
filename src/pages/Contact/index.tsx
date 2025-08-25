import styles from './styles.module.css'

const Contact = () => {
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
                <form method="POST" action="https://avancer-avec.fr/newsletter.php">
                    <input type="email" name="email" />
                    <input type="text" name="first name" />
                    <input type="text" name="last name" />
                    <input type="submit" value="S'inscrire" />
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