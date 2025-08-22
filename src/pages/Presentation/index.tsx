import { Element, scroller } from "react-scroll";
import styles from "./styles.module.css"
import TextFrame from "../../components/TextFrame"
import React, { useEffect, useMemo, useRef, useState } from "react";


const Presentation = () => {

    const useHeaderHeight = () => {
        const [headerHeight, setHeaderHeight] = React.useState(0);

        React.useEffect(() => {
            const header = document.querySelector('header');
            if (!header) return;

            const updateHeight = () => {setHeaderHeight(header.offsetHeight)};
            //in case the screen changes size
            updateHeight();
            window.addEventListener('resize', updateHeight);
            return () => {window.removeEventListener('resize', updateHeight)};
        }, []);

        return headerHeight;
    };

    const headerHeight = useHeaderHeight();

    interface TextBloc {
        id: number;
        title: string;
        content: string;
    }

    const sections: TextBloc[] = useMemo(() => [
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
    ], []);

    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    const scrollToSection = (index: number) => {
        scroller.scrollTo(`section${sections[index].id.toString()}`, {
            smooth: true,
            offset: -(headerHeight + 40),
        });
    };

    const goToNext = () => {
        if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
        }
    };

    const goToPrev = () => {
        if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
        }
    };

    useEffect(() => {
        const handleEntry = (entry: IntersectionObserverEntry) => {
            if (!entry.isIntersecting) return;
            const index = sectionRefs.current.findIndex(
                (el) => el === entry.target
            );
            if (index !== -1) setCurrentSectionIndex(index);
        }

        const observer = new IntersectionObserver(
            (entries) => {entries.forEach((entry) => {handleEntry(entry)});},
            {threshold: 0.5, }// 50% of the section must be visible
        );

        const currentSelectionRefs = sectionRefs.current;

        currentSelectionRefs.forEach((el) => {
        if (el) observer.observe(el);
        });

        return () => {
        currentSelectionRefs.forEach((el) => {
            if (el) observer.unobserve(el);
        });
        };
    }, [sections]);

    return (
        <>
            {sections.map((section, index) => (
                <div  key={section.id} ref={(el) => {sectionRefs.current[index] = el}}>
                    <Element name={`section${section.id.toString()}`}>
                        <TextFrame
                            title={section.title}
                            content={section.content}
                        />
                    </Element>
                </div>
            ))}

            {/* Navigation Arrows */}
            <div className={styles.navigationDiv}>
                {currentSectionIndex > 0 && (
                <button type="button" className={styles.navigationButton} onClick={goToPrev}>
                    ↑ {sections[currentSectionIndex - 1].title}
                </button>
                )}
            </div>
            <div className={`${styles.navigationDiv} ${styles.bottomNav}`}>
                {currentSectionIndex < sections.length - 1 && (
                <button type="button" className={styles.navigationButton} onClick={goToNext}>
                    {sections[currentSectionIndex + 1].title} ↓
                </button>
                )}
            </div>
        </>
    )
}

export default Presentation;