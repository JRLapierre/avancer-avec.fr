import { Element, Link } from "react-scroll";
import styles from "./styles.module.css"
import TextFrame from "../../components/TextFrame"
import React from "react";


const Presentation = () => {
//TODO : make the arrows at the top and bottom
//TODO : make the arrow dissapear if we have no previous or next section

    const useHeaderHeight = () => {
        const [headerHeight, setHeaderHeight] = React.useState(0);

        React.useEffect(() => {
            const header = document.querySelector('header');
            if (!header) return;

            const updateHeight = () => setHeaderHeight(header.offsetHeight);
            //in case the screen changes size
            updateHeight();
            window.addEventListener('resize', updateHeight);
            return () => window.removeEventListener('resize', updateHeight);
        }, []);

        return headerHeight;
    };

    const headerHeight = useHeaderHeight();

    interface TextBloc {
        id: number;
        title: string;
        content: string;
    }

    const sections: TextBloc[] = [
        {
            id: 1,
            title: "Présentation",
            content: `
                Claire-Lise Lapierre, Coach professionnel accréditée par ICF (International Coaching Federation).
                Par ma formation au coaching, mon expérience d’écoute et d’accompagnement, j’ai des techniques efficaces pour accompagner des personnes désireuses de progresser dans leur vie.
                Je désire donc vous en faire profiter.
                Je vous rencontre soit à votre domicile, soit en distanciel via visioconférence, soit dans la nature…
                Je suis devenue coach après plus de vingt ans d’expérience d’infirmière scolaire où je me suis aperçue que les élèves et le personnel venaient chercher une écoute active et bienveillante.
                J’ai vu des personnes dépasser leurs blocages. J’ai donc décidé de mieux m’outiller pour me spécialiser dans l’accompagnement de leurs objectifs.
                C’est sur mesure, temporaire et confidentiel.
                Ça vous intéresse ?
            `
        }, 
        {
            id: 2,
            title: "Mon parcours",
            content: `
                Mère de famille (cinq enfants) et grand-mère.
                
                J’ai vécu dans plusieurs régions de France et y ai exercé mon métier d’infirmière dans différent secteurs.
                
                Avec un ancrage solide de valeurs, je m’adapte facilement partout où je passe. Pour moi chaque personne est un
                trésor qui mérite de l’attention. Je suis curieuse de ce que je vois et aime découvrir et apprendre.
                
                Ma grande expérience d’accompagnement des ados (infirmière pendant plus de vingt ans dans l’éducation nationale)
                et d’adultes (engagements bénévoles) m’ont conduit à me diriger vers la formation de coach.
                
                Après toutes ces années, j’ai décidé de me recentrer sur mes points forts notamment l’écoute active. Parfois
                frustrée de mes limites, j’ai trouvé dans la formation de coach des outils efficaces.
            `
        }, 
        {
            id: 3,
            title: "Ma vision",
            content: `
                Ma vision : Chaque vie est un trésor unique, parfois comme une pierre précieuse dont certaines facettes ont besoin d’être mises à jour ou parfois comme un jardin où de belles fleurs ont besoin d’être dégagées de ce qui les étouffe.
                Mon accompagnement de coach y contribuera.
            `
        }
    ];

    return (
        <>
            <li><Link activeClass="active" to="section1" spy={true} smooth={true} duration={500} offset={-headerHeight}>Test 1</Link></li>
            <li><Link activeClass="active" to="section2" spy={true} smooth={true} duration={500} offset={-headerHeight}>Test 2</Link></li>
            <li><Link activeClass="active" to="section3" spy={true} smooth={true} duration={500} offset={-headerHeight}>Test 3</Link></li>
            
            {sections.map((section) => (
                <Element name={"section" + section.id} key={section.id}>
                    <TextFrame
                        title={section.title}
                        content={section.content}
                    />
                </Element>
            ))}
        </>
    )
}

export default Presentation;