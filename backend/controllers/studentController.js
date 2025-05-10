
const Exam = require('../models/Exam');
const Question = require('../models/Question');

// 🟦 Contrôleur pour récupérer les questions d’un examen spécifique
exports.getExamQuestions = async (req, res) => {
    try {
        // Récupération de l'ID de l'examen depuis les paramètres de l'URL
        const examId = req.params.examId;

        // Recherche de l'examen dans la base de données avec le populate pour récupérer les questions associées
        const exam = await Exam.findById(examId).populate({
  path: 'questions',
  strictPopulate: false
});
        if (!exam) {
            // Si l'examen n'est pas trouvé dans la base de données
            return res.status(404).json({ message: 'Examen non trouvé' });
        }

        // Réponse avec le titre de l'examen et les questions associées
        // On renvoie le titre de l'examen et les questions sous une forme plus simple
        res.status(200).json({
            examTitle: exam.title,  // Titre de l'examen
            questions: exam.questions.map(q => ({
                id: q._id,              // ID de la question
                text: q.text,           // Texte de la question
                type: q.type,           // Type de la question (par exemple QCM, réponse directe, etc.)
                options: q.options,     // Options pour les questions de type QCM
                duration: q.duration,   // Durée de la question (si applicable)
                note: q.note            // Note associée à la question
            }))
        });
    } catch (err) {
        // Si une erreur serveur se produit, on la gère ici
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// 🟩 Contrôleur pour soumettre les réponses et calculer le score
exports.submitExam = async (req, res) => {
    try {
        // Récupération de l'ID de l'examen depuis les paramètres de l'URL
        const examId = req.params.examId;
        // Récupération des réponses envoyées par l'étudiant
        const { answers } = req.body;

        // Vérification de l'existence de l'examen dans la base de données
        const exam = await Exam.findById(examId);
        if (!exam) {
            // Si l'examen n'existe pas
            return res.status(404).json({ message: 'Examen non trouvé' });
        }

        // Récupération des questions associées à cet examen
        const questions = await Question.find({ examId });

        let totalScore = 0; // Score total obtenu par l'étudiant
        let maxScore = 0;   // Score total possible pour l'examen

        // Parcours des questions pour vérifier les réponses de l'étudiant
        questions.forEach(q => {
            // Réponse donnée par l'étudiant pour chaque question
            const studentAnswer = answers[q._id];
            maxScore += q.note || 1; // On ajoute la note de la question à la note maximale possible

            // Si la question est de type QCM
            if (q.type === 'QCM') {
                // Comparaison des réponses triées (QCM)
                const correct = JSON.stringify((q.correctAnswers || []).sort());  // Réponses correctes triées
                const userAns = JSON.stringify((studentAnswer || []).sort());    // Réponses de l'étudiant triées
                if (correct === userAns) {
                    totalScore += q.note || 1; // Si les réponses sont correctes, on ajoute la note de la question
                }
            } else if (q.type === 'direct') {
                // Comparaison insensible à la casse et aux espaces pour les réponses directes
                if ((studentAnswer || '').trim().toLowerCase() === (q.correctAnswer || '').trim().toLowerCase()) {
                    totalScore += q.note || 1; // Si la réponse est correcte, on ajoute la note de la question
                }
            }
        });

        // Calcul du score final en pourcentage
        const finalScore = (totalScore / maxScore) * 100;

        // Retour du score final sous forme de pourcentage avec 2 décimales
        res.status(200).json({ score: finalScore.toFixed(2) });

    } catch (err) {
        // Gestion des erreurs serveur
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};
