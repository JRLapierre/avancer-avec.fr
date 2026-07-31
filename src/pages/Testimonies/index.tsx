import Comment from "../../components/Comment";

const testimonies = () => {

    const comments = [ //TODO get automatically from google doc
        {
            author: "Sophie",
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta, conMerci Claire-Lise pour ta douceur et ton écoute. Ton accompagnement m’a vraiment aidée à y voir plus clair dans ma vie perso."
        },
        {
            author: "Cécile",
            content: "Ayant entendu parler du bon coaching de Madame Lapierre, j'ai pensé prendre moi-même des séances même si cela pouvait paraître secondaire par rapport à mon emploi du temps bien chargé. Je ne regrette pas mes séances! Cet accompagnement, mené avec bienveillance, m'a permis d'identifier mes problématiques et de trouver les solutions pour sortir des pièges dans lesquels je \"tombais\" régulièrement. C'est par des questionnements et des réflexions que Mme Lapierre m'a aidé à retrouver de la confiance en moi, une vision plus claire et une nouvelle détermination pour assumer ma propre croissance dans les domaines concernés. Le regard honnête et clair centré sur la recherche de compréhension de l'autre sans aucun jugement m'a agréablement surprise. L'écoute active, l'empathie et la confiance amenée par Mme Lapierre m'ont vraiment encouragé à rebondir avec force!"
        },
        {
            author: "Sandrine",
            content: "un bon moyen de faire le point  sur mes vrais désirs et mettre en place une stratégie pour les réaliser puisque la situation le permettait."
        },
    ]

    return <>
        <h1>Témoignages</h1>
        {comments.map((comment, index) => (
            <Comment
                key={index}
                author={comment.author}
                content={comment.content}
            />
        ))}
    </>
}

export default testimonies