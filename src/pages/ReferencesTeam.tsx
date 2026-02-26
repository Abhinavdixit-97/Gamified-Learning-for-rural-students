import { useTranslation } from "react-i18next";
import Section from "../components/Section";

const ReferencesTeam = () => {
  const { t } = useTranslation();

  const team = [
    "Vaishnavi Kasaudhan",
    "Vishakha Tyagi",
    "Abhinav Dikshit",
    "Vaishnavi Tiwari",
    "Dr. Pramod Kumar Sagar",
    "Dr. Pawan Kumar Goel"
  ];

  const references = [
    "J. Singh, R. Sharma, and P. Kaur, “Impact of Gamified Learning Environments on Student Engagement and Motivation,” IEEE Trans. Educ., 2024.",
    "S. Gupta and M. Rani, “A Comparative Study of Game-Based Learning and Traditional Learning for Rural Students,” IEEE Access, 2024.",
    "A. Mehta, R. Batra, and P. Jain, “Design and Implementation of a Lightweight Gamified Mobile Application for Rural Education,” IEEE GHTC, 2023.",
    "K. Rao, L. Patel, and S. Singh, “Gamification for Digital Literacy in Rural India,” IEEE Trans. Learn. Technol., 2024.",
    "P. Roy and T. Bose, “AI-Powered Gamified Learning,” IEEE Access, 2023.",
    "M. Sharma, R. Chauhan, and D. Kumar, “Gamified E-Learning Platform with Real-Time Analytics,” IEEE TENCON, 2022.",
    "S. Tyagi, V. Tiwari, and P. Singh, “Integrating AR Elements into Gamified Learning for STEM Education,” IEEE ICALT, 2023.",
    "H. Kumar and A. Pandey, “Effectiveness of Gamified Platforms in Enhancing Learning Outcomes,” IEEE EDUCON, 2024.",
    "Agarwal and R. Jha, “Data-Driven Adaptive Gamification Framework Using AI,” IEEE Trans. Artif. Intell., 2024.",
    "A. Dixit, N. Raj, and S. Verma, “Bridging the Educational Divide through Gamified Cloud Platforms,” IEEE SES, 2023.",
    "R. Goyal, A. Mishra, and K. Thakur, “Blockchain-Based Gamification Model for E-Learning Security,” IEEE Access, 2023.",
    "M. Khan, F. Rehman, and L. Alam, “Role of Gamified Assessments in Remote Education Systems,” IEEE Trans. Learn. Technol., 2023.",
    "T. Nair and P. Choudhary, “Mobile-Based Gamified Learning Solutions for Rural Learners,” IEEE ICML, 2024.",
    "S. Das, R. Kapoor, and P. Ghosh, “AI-Driven Gamification for Personalized E-Learning Content,” IEEE Access, 2024.",
    "R. Patel, M. Yadav, and S. Gupta, “Smart Game-Based Pedagogy for Science Education in Rural Areas,” IEEE ICET, 2023.",
    "A. Thomas, V. Krishnan, and R. Meena, “Deep Learning Models in Adaptive Gamification for Education,” IEEE TCSS, 2024."
  ];

  return (
    <Section title={t("references.title")}>
      <p>{t("references.lead")}</p>
      <div className="card-grid">
        <div className="card">
          <h3>Team</h3>
          <ul>
            {team.map((member) => (
              <li key={member}>{member}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>References</h3>
          <ol>
            {references.map((ref) => (
              <li key={ref}>{ref}</li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
};

export default ReferencesTeam;
