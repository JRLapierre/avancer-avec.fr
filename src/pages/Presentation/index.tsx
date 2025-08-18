import styles from "./styles.module.css"
import TextFrame from "../../components/TextFrame"

const Presentation = () => {

    return (
        <>
            <TextFrame
                title="Présentation"
                content="
                    Claire-Lise Lapierre, Coach professionnel accréditée par ICF (International Coaching Federation).
                    Par ma formation au coaching, mon expérience d’écoute et d’accompagnement, j’ai des techniques efficaces pour accompagner des personnes désireuses de progresser dans leur vie.
                    Je désire donc vous en faire profiter.
                    Je vous rencontre soit à votre domicile, soit en distanciel via visioconférence, soit dans la nature…
                    Je suis devenue coach après plus de vingt ans d’expérience d’infirmière scolaire où je me suis aperçue que les élèves et le personnel venaient chercher une écoute active et bienveillante.
                    J’ai vu des personnes dépasser leurs blocages. J’ai donc décidé de mieux m’outiller pour me spécialiser dans l’accompagnement de leurs objectifs.
                    C’est sur mesure, temporaire et confidentiel.
                    Ça vous intéresse ?
                "
            />
            <TextFrame
                title="Mon parcours"
                content="
                    Mère de famille (cinq enfants) et grand-mère.
                    
                    J’ai vécu dans plusieurs régions de France et y ai exercé mon métier d’infirmière dans différent secteurs.
                    
                    Avec un ancrage solide de valeurs, je m’adapte facilement partout où je passe. Pour moi chaque personne est un
                    trésor qui mérite de l’attention. Je suis curieuse de ce que je vois et aime découvrir et apprendre.
                    
                    Ma grande expérience d’accompagnement des ados (infirmière pendant plus de vingt ans dans l’éducation nationale)
                    et d’adultes (engagements bénévoles) m’ont conduit à me diriger vers la formation de coach.
                    
                    Après toutes ces années, j’ai décidé de me recentrer sur mes points forts notamment l’écoute active. Parfois
                    frustrée de mes limites, j’ai trouvé dans la formation de coach des outils efficaces.
                "
            />
            <TextFrame
                title="Ma vision"
                content="
                    Ma vision : Chaque vie est un trésor unique, parfois comme une pierre précieuse dont certaines facettes ont besoin d’être mises à jour ou parfois comme un jardin où de belles fleurs ont besoin d’être dégagées de ce qui les étouffe.
                    Mon accompagnement de coach y contribuera.
                "
            />
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
        </>
    )
}

export default Presentation;